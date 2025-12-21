let accessToken = null;
let isRefreshing = false;
let refreshWaiters = [];

const BACKEND_URL = import.meta.env.VITE_API_URL;

export const setAccessToken = (token) => {
  accessToken = token;
  console.log("🔑 Access token set");
};

export const getAccessToken = () => {
  return accessToken;
};

export const clearAccessToken = () => {
  accessToken = null;
  console.log("🔑 Access token cleared");
};

export const fetchWithAuth = async (url, options = {}) => {
  const token = getAccessToken();

  // Don't automatically set Content-Type if it's FormData
  const isFormData = options.body instanceof FormData;

  const headers = {
    ...options.headers,
  };

  // Only set Content-Type if not FormData and not already set
  if (!isFormData && !headers["Content-Type"]) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const request = {
    ...options,
    headers,
    credentials: "include",
  };

  console.log(`🌐 Fetching: ${url}`, {
    method: options.method || "GET",
    hasToken: !!token,
    isFormData,
    bodyType: options.body?.constructor?.name,
  });

  try {
    let response = await fetch(url, request);
    console.log(`📨 Response: ${response.status} ${response.statusText}`);

    if (response.status !== 401) {
      return response;
    }

    // 401 = access token expired
    console.log("🔄 Token expired, attempting refresh...");

    if (!isRefreshing) {
      isRefreshing = true;
      try {
        // Try to refresh token
        const refreshRes = await fetch(
          `${BACKEND_URL}/api/auth/refresh-token`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (refreshRes.ok) {
          const data = await refreshRes.json();
          setAccessToken(data.accessToken);
          console.log("✅ Token refreshed successfully");

          // Update authorization header with new token
          if (data.accessToken) {
            request.headers.Authorization = `Bearer ${data.accessToken}`;
          }

          // Retry the original request with new token
          response = await fetch(url, request);
          console.log("🔄 Retry successful:", response.status);

          // Notify all waiting requests
          refreshWaiters.forEach((cb) => cb(data.accessToken));
          refreshWaiters = [];

          return response;
        } else {
          // Refresh failed
          console.log("❌ Token refresh failed");
          clearAccessToken();
          localStorage.removeItem("user");
          throw new Error("Session expired. Please login again.");
        }
      } catch (refreshError) {
        console.error("Refresh error:", refreshError);
        clearAccessToken();
        localStorage.removeItem("user");
        throw new Error("Session expired. Please login again.");
      } finally {
        isRefreshing = false;
      }
    } else {
      // Already refreshing, wait and retry
      console.log("⏳ Already refreshing, waiting...");
      return new Promise((resolve, reject) => {
        refreshWaiters.push((newToken) => {
          request.headers.Authorization = `Bearer ${newToken}`;
          fetch(url, request).then(resolve).catch(reject);
        });
      });
    }
  } catch (error) {
    console.error("❌ Fetch with auth error:", error.message);
    throw error;
  }
};

export const refreshToken = async () => {
  try {
    console.log("🔄 Manual token refresh...");
    const res = await fetch(`${BACKEND_URL}/api/auth/refresh-token`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      console.error("❌ Refresh failed with status:", res.status);
      throw new Error("Refresh failed");
    }

    const data = await res.json();
    setAccessToken(data.accessToken);
    console.log("✅ Manual refresh successful");
    return data.accessToken;
  } catch (err) {
    console.error("❌ Refresh token error:", err);
    throw err;
  }
};

export const logout = () => {
  console.log("🚪 Logging out...");
  clearAccessToken();
  localStorage.removeItem("user");
  window.location.href = "/login";
};
