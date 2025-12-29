// // frontend/src/hooks/usePushNotifications.js
// import { useState, useEffect, useCallback } from "react";
// import { fetchWithAuth } from "../utils/auth";

// const BACKEND_URL = import.meta.env.VITE_API_URL;

// export const usePushNotifications = () => {
//   const [isSupported, setIsSupported] = useState(false);
//   const [isSubscribed, setIsSubscribed] = useState(false);
//   const [subscription, setSubscription] = useState(null);
//   const [permission, setPermission] = useState("default");

//   useEffect(() => {
//     setIsSupported("serviceWorker" in navigator && "PushManager" in window);
//     checkSubscription();
//   }, []);

//   const checkSubscription = useCallback(async () => {
//     if (!isSupported) return;

//     const reg = await navigator.serviceWorker.ready;
//     const sub = await reg.pushManager.getSubscription();

//     setSubscription(sub);
//     setIsSubscribed(!!sub);
//     setPermission(Notification.permission);
//   }, [isSupported]);

//   const requestPermission = useCallback(async () => {
//     if (!isSupported) {
//       console.warn("Push notifications not supported");
//       return false;
//     }

//     try {
//       const result = await Notification.requestPermission();
//       setPermission(result);
//       return result === "granted";
//     } catch (error) {
//       console.error("Permission request failed:", error);
//       return false;
//     }
//   }, [isSupported]);

//   const subscribe = useCallback(async () => {
//     if (!isSupported) {
//       throw new Error("Push notifications not supported");
//     }

//     if (permission !== "granted") {
//       const granted = await requestPermission();
//       if (!granted) {
//         throw new Error("Notification permission denied");
//       }
//     }

//     try {
//       // Register service worker
//       const reg = await navigator.serviceWorker.register("/service-worker.js");

//       // Subscribe to push notifications
//       const sub = await reg.pushManager.subscribe({
//         userVisibleOnly: true,
//         applicationServerKey: urlBase64ToUint8Array(
//           import.meta.env.VITE_VAPID_PUBLIC_KEY
//         ),
//       });

//       // Send subscription to server
//       await fetchWithAuth(`${BACKEND_URL}/api/notifications/push/subscribe`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           subscription: sub.toJSON(),
//         }),
//       });

//       setSubscription(sub);
//       setIsSubscribed(true);

//       return sub;
//     } catch (error) {
//       console.error("Subscription failed:", error);
//       throw error;
//     }
//   }, [isSupported, permission, requestPermission]);

//   const unsubscribe = useCallback(async () => {
//     if (!subscription) return;

//     try {
//       await subscription.unsubscribe();

//       await fetchWithAuth(`${BACKEND_URL}/api/notifications/push/unsubscribe`, {
//         method: "DELETE",
//       });

//       setSubscription(null);
//       setIsSubscribed(false);
//     } catch (error) {
//       console.error("Unsubscribe failed:", error);
//       throw error;
//     }
//   }, [subscription]);

//   const sendTestNotification = useCallback(async () => {
//     try {
//       await fetchWithAuth(`${BACKEND_URL}/api/notifications/push/test`, {
//         method: "POST",
//       });
//     } catch (error) {
//       console.error("Test notification failed:", error);
//       throw error;
//     }
//   }, []);

//   return {
//     isSupported,
//     isSubscribed,
//     subscription,
//     permission,
//     requestPermission,
//     subscribe,
//     unsubscribe,
//     sendTestNotification,
//     checkSubscription,
//   };
// };

// function urlBase64ToUint8Array(base64String) {
//   const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
//   const base64 = (base64String + padding)
//     .replace(/\-/g, "+")
//     .replace(/_/g, "/");

//   const rawData = window.atob(base64);
//   const outputArray = new Uint8Array(rawData.length);

//   for (let i = 0; i < rawData.length; ++i) {
//     outputArray[i] = rawData.charCodeAt(i);
//   }
//   return outputArray;
// }
// frontend/hooks/UsePushNotifications.js
import { useState, useEffect, useCallback } from "react";
import { fetchWithAuth } from "../utils/auth";

const BACKEND_URL = import.meta.env.VITE_API_URL;

export const usePushNotifications = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [permission, setPermission] = useState("default");
  const [vapidPublicKey, setVapidPublicKey] = useState("");
  const [loading, setLoading] = useState(true);

  // Check support and initialize
  useEffect(() => {
    const checkSupport = async () => {
      if ("serviceWorker" in navigator && "PushManager" in window) {
        setIsSupported(true);
        setPermission(Notification.permission);

        try {
          // Get VAPID public key
          const res = await fetchWithAuth(
            `${BACKEND_URL}/api/notifications/push/public-key`
          );
          if (res.ok) {
            const data = await res.json();
            setVapidPublicKey(data.data.publicKey);
          }
        } catch (error) {
          console.error("Failed to get VAPID key:", error);
        }
      }

      setLoading(false);
    };

    checkSupport();
  }, []);

  // Check existing subscription
  useEffect(() => {
    if (!isSupported) return;

    const checkSubscription = async () => {
      try {
        const registration = await navigator.serviceWorker.ready;
        const existingSubscription =
          await registration.pushManager.getSubscription();

        if (existingSubscription) {
          setSubscription(existingSubscription);
          setIsSubscribed(true);
        }
      } catch (error) {
        console.error("Error checking subscription:", error);
      }
    };

    checkSubscription();
  }, [isSupported]);

  // Request notification permission
  const requestPermission = useCallback(async () => {
    if (!isSupported) {
      console.warn("Push notifications not supported");
      return false;
    }

    try {
      const permissionResult = await Notification.requestPermission();
      setPermission(permissionResult);
      return permissionResult === "granted";
    } catch (error) {
      console.error("Error requesting permission:", error);
      return false;
    }
  }, [isSupported]);

  // Subscribe to push notifications
  const subscribe = useCallback(async () => {
    if (!isSupported || !vapidPublicKey) {
      console.warn("Push notifications not supported or VAPID key missing");
      return false;
    }

    try {
      // Request permission if not already granted
      if (permission !== "granted") {
        const granted = await requestPermission();
        if (!granted) {
          console.warn("Notification permission denied");
          return false;
        }
      }

      // Get service worker registration
      const registration = await navigator.serviceWorker.ready;

      // Convert VAPID key
      const applicationServerKey = urlBase64ToUint8Array(vapidPublicKey);

      // Subscribe to push
      const newSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey,
      });

      // Send subscription to server
      const res = await fetchWithAuth(
        `${BACKEND_URL}/api/notifications/push/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subscription: newSubscription,
          }),
        }
      );

      if (res.ok) {
        setSubscription(newSubscription);
        setIsSubscribed(true);

        // Save to localStorage
        localStorage.setItem(
          "pushSubscription",
          JSON.stringify(newSubscription)
        );

        return true;
      } else {
        console.error("Failed to save subscription to server");
        return false;
      }
    } catch (error) {
      console.error("Error subscribing to push:", error);
      return false;
    }
  }, [isSupported, vapidPublicKey, permission, requestPermission]);

  // Unsubscribe from push notifications
  const unsubscribe = useCallback(async () => {
    if (!subscription || !isSubscribed) return false;

    try {
      // Unsubscribe from push service
      const success = await subscription.unsubscribe();

      if (success) {
        // Remove from server
        await fetchWithAuth(
          `${BACKEND_URL}/api/notifications/push/unsubscribe`,
          {
            method: "DELETE",
          }
        );

        // Clear local state
        setSubscription(null);
        setIsSubscribed(false);
        localStorage.removeItem("pushSubscription");

        return true;
      }
      return false;
    } catch (error) {
      console.error("Error unsubscribing from push:", error);
      return false;
    }
  }, [subscription, isSubscribed]);

  // Send test notification
  const sendTestNotification = useCallback(async () => {
    try {
      const res = await fetchWithAuth(
        `${BACKEND_URL}/api/notifications/push/test`,
        {
          method: "POST",
        }
      );

      return res.ok;
    } catch (error) {
      console.error("Error sending test notification:", error);
      return false;
    }
  }, []);

  // Toggle subscription
  const toggleSubscription = useCallback(async () => {
    if (isSubscribed) {
      return await unsubscribe();
    } else {
      return await subscribe();
    }
  }, [isSubscribed, subscribe, unsubscribe]);

  // Utility function for VAPID key conversion
  const urlBase64ToUint8Array = (base64String) => {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  return {
    isSupported,
    isSubscribed,
    subscription,
    permission,
    vapidPublicKey,
    loading,
    requestPermission,
    subscribe,
    unsubscribe,
    sendTestNotification,
    toggleSubscription,
  };
};
