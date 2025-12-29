// public/service-worker.js
self.addEventListener("install", (event) => {
  console.log("🔧 Service Worker installing...");
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  console.log("✅ Service Worker activated");
  event.waitUntil(self.clients.claim());
});

// Handle push notifications
self.addEventListener("push", (event) => {
  console.log("📨 Push notification received:", event);

  if (!event.data) return;

  let data;
  try {
    data = event.data.json();
  } catch (error) {
    console.error("Failed to parse push data:", error);
    return;
  }

  const options = {
    body: data.body || "New notification",
    icon: data.icon || "/logo.png",
    badge: data.badge || "/badge.png",
    image: data.image || null,
    tag: data.tag || "notification",
    data: data.data || {},
    actions: data.actions || [],
    requireInteraction: data.requireInteraction || false,
    silent: data.silent || false,
    vibrate: [200, 100, 200],
    timestamp: data.timestamp || Date.now(),
    renotify: data.renotify || false,
    dir: "ltr",
    lang: "en-US",
    priority: data.priority || "default",
    showTrigger: data.showTrigger || null,
  };

  // Show notification
  event.waitUntil(
    self.registration.showNotification(data.title || "Notification", options)
  );
});

// Handle notification click
self.addEventListener("notificationclick", (event) => {
  console.log("🖱️ Notification clicked:", event.notification);

  event.notification.close();

  const urlToOpen = event.notification.data?.url || "/";
  const notificationId = event.notification.data?.notificationId;
  const action = event.action;

  // Handle different actions
  if (action === "dismiss") {
    console.log("Notification dismissed");
    return;
  }

  // Send notification read event to all clients
  const readEvent = new CustomEvent("notification-read", {
    detail: { notificationId },
  });

  // Focus or open the URL
  event.waitUntil(
    self.clients
      .matchAll({
        type: "window",
        includeUncontrolled: true,
      })
      .then((windowClients) => {
        // Check if there's already a window/tab open
        for (const client of windowClients) {
          if (client.url.includes(urlToOpen) && "focus" in client) {
            // Focus the existing window
            client.focus();
            client.postMessage({
              type: "NOTIFICATION_CLICKED",
              notificationId,
            });
            return;
          }
        }

        // If no window found, open a new one
        if (self.clients.openWindow) {
          return self.clients.openWindow(urlToOpen);
        }
      })
  );
});

// Handle notification close
self.addEventListener("notificationclose", (event) => {
  console.log("❌ Notification closed:", event.notification);

  // Optional: Send analytics or perform cleanup
  const notificationId = event.notification.data?.notificationId;
  if (notificationId) {
    // You could send a request to mark as read
    fetch("/api/notifications/" + notificationId + "/read", {
      method: "PUT",
    }).catch(console.error);
  }
});

// Handle push subscription changes
self.addEventListener("pushsubscriptionchange", (event) => {
  console.log("🔄 Push subscription changed");

  event.waitUntil(
    self.registration.pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array("YOUR_VAPID_PUBLIC_KEY"),
      })
      .then((subscription) => {
        // Send new subscription to server
        return fetch("/api/notifications/push/subscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subscription: subscription,
          }),
        });
      })
  );
});

// Utility function for VAPID key conversion
function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = self.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Handle messages from clients
self.addEventListener("message", (event) => {
  console.log("📨 Message from client:", event.data);

  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Background sync for offline notifications
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-notifications") {
    console.log("🔄 Background sync for notifications");
    event.waitUntil(syncNotifications());
  }
});

async function syncNotifications() {
  try {
    // Get stored notifications to sync
    const cache = await caches.open("notifications-cache");
    const requests = await cache.keys();

    for (const request of requests) {
      const response = await cache.match(request);
      if (response) {
        // Try to send to server
        await fetch(request.url, {
          method: request.method,
          headers: request.headers,
          body: await response.text(),
        });
        // Remove from cache if successful
        await cache.delete(request);
      }
    }
  } catch (error) {
    console.error("Sync error:", error);
  }
}
