// import { io } from "socket.io-client";

// const BACKEND_URL = import.meta.env.VITE_API_URL;

// let socket;

// export const initSocket = () => {
//   if (socket) return socket;

//   const user = JSON.parse(localStorage.getItem("user"));
//   const token = user?.accessToken;

//   socket = io(BACKEND_URL, {
//     auth: { token },
//     transports: ["websocket"],
//   });

//   // Local sounds inside /public/sounds
//   const sounds = {
//     order: "/sounds/notification.mp3",
//     status: "/sounds/notification.mp3",
//     admin: "/sounds/notification.mp3",
//     system: "/sounds/notification.mp3",
//     general: "/sounds/notification.mp3",
//   };

//   socket.on("connect", () => {
//     if (user?._id) socket.emit("join", user._id);
//   });

//   socket.on("notification", (data) => {
//     try {
//       // SOUND
//       const audio = new Audio(sounds[data.type] || sounds.general);
//       audio.volume = 1.0;
//       audio.play().catch(() => {});

//       // BROWSER NOTIFICATION
//       if (Notification.permission === "granted") {
//         new Notification(data.title || "New Notification", {
//           body: data.message,
//         });
//       }

//       // Dispatch global event for React components (NotificationBell)
//       window.dispatchEvent(
//         new CustomEvent("app-notification", { detail: data })
//       );
//     } catch (err) {
//       console.log("Notification error:", err);
//     }
//   });

//   return socket;
// };

// export const getSocket = () => socket;
import { io } from "socket.io-client";

const BACKEND_URL = import.meta.env.VITE_API_URL;

let socket = null;

export const initSocket = () => {
  if (socket && socket.connected) {
    return socket;
  }

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.accessToken;

  if (!token) {
    console.error("No token found for socket connection");
    return null;
  }

  // Disconnect existing socket
  if (socket) {
    socket.disconnect();
  }

  socket = io(BACKEND_URL, {
    auth: { token },
    transports: ["websocket", "polling"],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    timeout: 20000,
  });

  // Local sounds inside /public/sounds
  const sounds = {
    order: "/sounds/notification.mp3",
    status: "/sounds/notification.mp3",
    admin: "/sounds/notification.mp3",
    system: "/sounds/notification.mp3",
    general: "/sounds/notification.mp3",
  };

  socket.on("connect", () => {
    console.log("🟢 Socket connected:", socket.id);

    if (user?._id) {
      socket.emit("join", user._id);
      console.log(`👤 User ${user._id} joined socket room`);
    }

    // Update connection status
    window.dispatchEvent(new CustomEvent("socket-connected"));
  });

  socket.on("connect_error", (error) => {
    console.error("🔴 Socket connection error:", error.message);

    // Try reconnection with polling as fallback
    if (error.message.includes("websocket")) {
      console.log("🔄 Falling back to polling transport");
      socket.io.opts.transports = ["polling"];
    }
  });

  socket.on("disconnect", (reason) => {
    console.log("🔴 Socket disconnected:", reason);

    if (reason === "io server disconnect" || reason === "transport error") {
      // Try to reconnect
      setTimeout(() => {
        if (socket) {
          socket.connect();
        }
      }, 1000);
    }
  });

  socket.on("reconnect", (attempt) => {
    console.log(`🔄 Socket reconnected after ${attempt} attempts`);

    // Re-join rooms
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?._id) {
      socket.emit("join", user._id);
    }
  });

  socket.on("notification", (data) => {
    try {
      console.log("📢 Received notification:", data);

      // PLAY SOUND
      try {
        const audio = new Audio(sounds[data.type] || sounds.general);
        audio.volume = 0.7;
        audio.play().catch((e) => {
          console.log("Sound play failed:", e);
        });
      } catch (soundError) {
        console.log("Sound error:", soundError);
      }

      // BROWSER NOTIFICATION
      if ("Notification" in window && Notification.permission === "granted") {
        try {
          new Notification(data.title || "New Notification", {
            body: data.message || "You have a new notification",
            icon: "/logo.png",
            badge: "/logo.png",
            tag: data._id || Date.now().toString(),
            requireInteraction: false,
            silent: false,
          });
        } catch (notificationError) {
          console.log("Browser notification error:", notificationError);
        }
      } else if (
        "Notification" in window &&
        Notification.permission === "default"
      ) {
        // Request permission if not yet asked
        Notification.requestPermission();
      }

      // Dispatch global event for React components
      const event = new CustomEvent("app-notification", {
        detail: { ...data, receivedAt: new Date() },
      });
      window.dispatchEvent(event);

      // Update badge count
      updateNotificationBadge();
    } catch (err) {
      console.error("Notification processing error:", err);
    }
  });

  // Request notification permission on socket connection
  if ("Notification" in window && Notification.permission === "default") {
    Notification.requestPermission();
  }

  return socket;
};

export const getSocket = () => {
  if (!socket || !socket.connected) {
    return initSocket();
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
    console.log("🔌 Socket disconnected");
  }
};

// Helper to update notification badge
const updateNotificationBadge = () => {
  const event = new CustomEvent("update-notification-count", {
    detail: { increment: 1 },
  });
  window.dispatchEvent(event);
};

// Join specific rooms
export const joinProductRoom = (productId) => {
  const socket = getSocket();
  if (socket) {
    socket.emit("joinProduct", productId);
  }
};

export const joinOrderRoom = (orderId) => {
  const socket = getSocket();
  if (socket) {
    socket.emit("joinOrder", orderId);
  }
};

// Emit events
export const emitEvent = (eventName, data) => {
  const socket = getSocket();
  if (socket) {
    socket.emit(eventName, data);
  }
};

// Check connection status
export const isSocketConnected = () => {
  return socket && socket.connected;
};
