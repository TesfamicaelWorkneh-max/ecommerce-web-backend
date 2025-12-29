// // import { createContext, useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { initSocket } from "../utils/socket";
// import { setAccessToken, clearAccessToken } from "../utils/auth";

// const BACKEND_URL = import.meta.env.VITE_API_URL;

// export const authContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // ===== UPDATE USER FUNCTION =====
//   const updateUser = (updatedUserData) => {
//     setUser(prev => {
//       const updatedUser = {
//         ...prev,
//         ...updatedUserData
//       };

//       // Update localStorage
//       localStorage.setItem("user", JSON.stringify(updatedUser));

//       return updatedUser;
//     });
//   };

//   // ===== INITIALIZE AUTH =====
//   const initializeAuth = useCallback(() => {
//     try {
//       const savedUser = localStorage.getItem("user");

//       if (!savedUser) {
//         setLoading(false);
//         return;
//       }

//       const parsedUser = JSON.parse(savedUser);

//       if (parsedUser?.accessToken) {
//         // Fetch complete user data from backend
//         const fetchUserData = async () => {
//           try {
//             const res = await fetch(`${BACKEND_URL}/api/users/profile`, {
//               headers: {
//                 'Authorization': `Bearer ${parsedUser.accessToken}`
//               }
//             });

//             if (res.ok) {
//               const data = await res.json();
//               if (data.success) {
//                 const fullUserData = {
//                   ...parsedUser,
//                   ...data.user, // Add bio, isVerified, etc.
//                   name: data.user.name || parsedUser.name,
//                   email: data.user.email || parsedUser.email
//                 };

//                 setUser(fullUserData);
//                 localStorage.setItem("user", JSON.stringify(fullUserData));
//               }
//             } else {
//               // If token is invalid, logout
//               logout();
//             }
//           } catch (error) {
//             console.error("Failed to fetch user data:", error);
//           }
//         };

//         fetchUserData();
//         setUser(parsedUser);
//         setAccessToken(parsedUser.accessToken);

//         try {
//           initSocket(parsedUser._id);
//         } catch (socketError) {
//           console.warn("Socket init failed:", socketError);
//         }
//       } else {
//         localStorage.removeItem("user");
//       }
//     } catch (error) {
//       console.error("Auth initialization error:", error);
//       localStorage.removeItem("user");
//     } finally {
//       setTimeout(() => {
//         setLoading(false);
//       }, 300);
//     }
//   }, []);

//   useEffect(() => {
//     initializeAuth();
//   }, [initializeAuth]);

//   // ===== LOGIN =====
//   const login = async (email, password) => {
//     try {
//       const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Login failed");
//       }

//       // Fetch full user profile
//       const profileRes = await fetch(`${BACKEND_URL}/api/users/profile`, {
//         headers: {
//           'Authorization': `Bearer ${data.accessToken}`
//         }
//       });

//       const profileData = await profileRes.json();

//       const userData = {
//         _id: data.user._id,
//         name: data.user.name,
//         email: data.user.email,
//         role: data.user.role,
//         accessToken: data.accessToken,
//         ...(profileData.success && profileData.user) // Add bio, isVerified, etc.
//       };

//       localStorage.setItem("user", JSON.stringify(userData));
//       setUser(userData);
//       setAccessToken(userData.accessToken);

//       try {
//         initSocket(userData._id);
//       } catch (error) {
//         console.warn("Socket init failed:", error);
//       }

//       return { success: true, user: userData };
//     } catch (err) {
//       console.error("Login error:", err);
//       throw err;
//     }
//   };

//   // ===== LOGOUT =====
//   const logout = async () => {
//     try {
//       await fetch(`${BACKEND_URL}/api/auth/logout`, {
//         method: "POST",
//         credentials: "include",
//       });
//     } catch (err) {
//       console.error("Logout error:", err);
//     }

//     localStorage.removeItem("user");
//     setUser(null);
//     clearAccessToken();
//     navigate("/login");
//   };

//   // ===== REFRESH TOKEN =====
//   const refreshToken = async () => {
//     if (!user) return null;

//     try {
//       const res = await fetch(`${BACKEND_URL}/api/auth/refresh-token`, {
//         method: "GET",
//         credentials: "include",
//       });

//       if (!res.ok) {
//         throw new Error("Refresh failed");
//       }

//       const data = await res.json();
//       const updatedUser = { ...user, accessToken: data.accessToken };

//       localStorage.setItem("user", JSON.stringify(updatedUser));
//       setUser(updatedUser);
//       setAccessToken(data.accessToken);

//       return data.accessToken;
//     } catch (err) {
//       console.error("Refresh token error:", err);
//       return null;
//     }
//   };

//   // ===== FORGOT PASSWORD =====
//   const forgotPassword = async (email) => {
//     try {
//       const res = await fetch(`${BACKEND_URL}/api/auth/forgot-password`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Failed to send reset email");
//       }

//       return {
//         success: true,
//         message: data.message || "Reset link sent to your email.",
//       };
//     } catch (err) {
//       console.error("Forgot password error:", err);
//       throw new Error(err.message || "Something went wrong");
//     }
//   };

//   // ===== RESET PASSWORD =====
//   const resetPassword = async (token, password) => {
//     try {
//       const res = await fetch(
//         `${BACKEND_URL}/api/auth/reset-password/${token}`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ password }),
//         }
//       );

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Failed to reset password");
//       }

//       return {
//         success: true,
//         message: data.message || "Password reset successful.",
//       };
//     } catch (err) {
//       console.error("Reset password error:", err);
//       throw new Error(err.message || "Failed to reset password");
//     }
//   };

//   return (
//     <authContext.Provider
//       value={{
//         user,
//         loading,
//         login,
//         logout,
//         refreshToken,
//         forgotPassword,
//         resetPassword,
//         updateUser, // Add this line
//       }}
//     >
//       {children}
//     </authContext.Provider>
//   );
// };

import { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { initSocket } from "../utils/socket";
import { setAccessToken, clearAccessToken } from "../utils/auth";

const BACKEND_URL = import.meta.env.VITE_API_URL;

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ===== UPDATE USER FUNCTION =====
  const updateUser = (updatedUserData) => {
    setUser((prev) => {
      const updatedUser = {
        ...prev,
        ...updatedUserData,
      };

      // Update localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser));

      return updatedUser;
    });
  };

  // ===== INITIALIZE AUTH =====
  const initializeAuth = useCallback(() => {
    try {
      const savedUser = localStorage.getItem("user");

      if (!savedUser) {
        setLoading(false);
        return;
      }

      const parsedUser = JSON.parse(savedUser);

      if (parsedUser?.accessToken) {
        // Fetch complete user data from backend
        const fetchUserData = async () => {
          try {
            const res = await fetch(`${BACKEND_URL}/api/users/profile`, {
              headers: {
                Authorization: `Bearer ${parsedUser.accessToken}`,
              },
            });

            if (res.ok) {
              const data = await res.json();
              if (data.success) {
                const fullUserData = {
                  ...parsedUser,
                  ...data.user, // Add bio, isVerified, etc.
                  name: data.user.name || parsedUser.name,
                  email: data.user.email || parsedUser.email,
                };

                setUser(fullUserData);
                localStorage.setItem("user", JSON.stringify(fullUserData));
              }
            } else {
              // If token is invalid, logout
              logout();
            }
          } catch (error) {
            console.error("Failed to fetch user data:", error);
          }
        };

        fetchUserData();
        setUser(parsedUser);
        setAccessToken(parsedUser.accessToken);

        try {
          initSocket(parsedUser._id);
        } catch (socketError) {
          console.warn("Socket init failed:", socketError);
        }
      } else {
        localStorage.removeItem("user");
      }
    } catch (error) {
      console.error("Auth initialization error:", error);
      localStorage.removeItem("user");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  }, []);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // ===== LOGIN =====
  const login = async (email, password) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Fetch full user profile
      const profileRes = await fetch(`${BACKEND_URL}/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${data.accessToken}`,
        },
      });

      const profileData = await profileRes.json();

      const userData = {
        _id: data.user._id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
        accessToken: data.accessToken,
        ...(profileData.success && profileData.user), // Add bio, isVerified, etc.
      };

      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      setAccessToken(userData.accessToken);

      try {
        initSocket(userData._id);
      } catch (error) {
        console.warn("Socket init failed:", error);
      }

      return { success: true, user: userData };
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    }
  };

  // ===== LOGOUT =====
  const logout = async () => {
    try {
      await fetch(`${BACKEND_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout error:", err);
    }

    localStorage.removeItem("user");
    setUser(null);
    clearAccessToken();
    navigate("/login");
  };

  // ===== REFRESH TOKEN =====
  const refreshToken = async () => {
    if (!user) return null;

    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/refresh-token`, {
        method: "GET",
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Refresh failed");
      }

      const data = await res.json();
      const updatedUser = { ...user, accessToken: data.accessToken };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setAccessToken(data.accessToken);

      return data.accessToken;
    } catch (err) {
      console.error("Refresh token error:", err);
      return null;
    }
  };

  // ===== FORGOT PASSWORD =====
  const forgotPassword = async (email) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to send reset email");
      }

      return {
        success: true,
        message: data.message || "Reset link sent to your email.",
      };
    } catch (err) {
      console.error("Forgot password error:", err);
      throw new Error(err.message || "Something went wrong");
    }
  };

  // ===== RESET PASSWORD =====
  const resetPassword = async (token, password) => {
    try {
      const res = await fetch(
        `${BACKEND_URL}/api/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to reset password");
      }

      return {
        success: true,
        message: data.message || "Password reset successful.",
      };
    } catch (err) {
      console.error("Reset password error:", err);
      throw new Error(err.message || "Failed to reset password");
    }
  };

  return (
    <authContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        refreshToken,
        forgotPassword,
        resetPassword,
        updateUser, // Add this line
      }}
    >
      {children}
    </authContext.Provider>
  );
};
