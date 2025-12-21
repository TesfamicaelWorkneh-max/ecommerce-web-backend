// frontend/src/hooks/usePushNotifications.js
import { useState, useEffect, useCallback } from "react";
import { fetchWithAuth } from "../utils/auth";

const BACKEND_URL = import.meta.env.VITE_API_URL;

export const usePushNotifications = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [permission, setPermission] = useState("default");

  useEffect(() => {
    setIsSupported("serviceWorker" in navigator && "PushManager" in window);
    checkSubscription();
  }, []);

  const checkSubscription = useCallback(async () => {
    if (!isSupported) return;

    const reg = await navigator.serviceWorker.ready;
    const sub = await reg.pushManager.getSubscription();

    setSubscription(sub);
    setIsSubscribed(!!sub);
    setPermission(Notification.permission);
  }, [isSupported]);

  const requestPermission = useCallback(async () => {
    if (!isSupported) {
      console.warn("Push notifications not supported");
      return false;
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result === "granted";
    } catch (error) {
      console.error("Permission request failed:", error);
      return false;
    }
  }, [isSupported]);

  const subscribe = useCallback(async () => {
    if (!isSupported) {
      throw new Error("Push notifications not supported");
    }

    if (permission !== "granted") {
      const granted = await requestPermission();
      if (!granted) {
        throw new Error("Notification permission denied");
      }
    }

    try {
      // Register service worker
      const reg = await navigator.serviceWorker.register("/service-worker.js");

      // Subscribe to push notifications
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          import.meta.env.VITE_VAPID_PUBLIC_KEY
        ),
      });

      // Send subscription to server
      await fetchWithAuth(`${BACKEND_URL}/api/notifications/push/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscription: sub.toJSON(),
        }),
      });

      setSubscription(sub);
      setIsSubscribed(true);

      return sub;
    } catch (error) {
      console.error("Subscription failed:", error);
      throw error;
    }
  }, [isSupported, permission, requestPermission]);

  const unsubscribe = useCallback(async () => {
    if (!subscription) return;

    try {
      await subscription.unsubscribe();

      await fetchWithAuth(`${BACKEND_URL}/api/notifications/push/unsubscribe`, {
        method: "DELETE",
      });

      setSubscription(null);
      setIsSubscribed(false);
    } catch (error) {
      console.error("Unsubscribe failed:", error);
      throw error;
    }
  }, [subscription]);

  const sendTestNotification = useCallback(async () => {
    try {
      await fetchWithAuth(`${BACKEND_URL}/api/notifications/push/test`, {
        method: "POST",
      });
    } catch (error) {
      console.error("Test notification failed:", error);
      throw error;
    }
  }, []);

  return {
    isSupported,
    isSubscribed,
    subscription,
    permission,
    requestPermission,
    subscribe,
    unsubscribe,
    sendTestNotification,
    checkSubscription,
  };
};

function urlBase64ToUint8Array(base64String) {
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
}
