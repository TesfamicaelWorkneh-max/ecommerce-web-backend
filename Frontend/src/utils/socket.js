import { io } from "socket.io-client";

const BACKEND_URL = import.meta.env.VITE_API_URL;

let socket;

export const initSocket = () => {
  if (socket) return socket;

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.accessToken;

  socket = io(BACKEND_URL, {
    auth: { token },
    transports: ["websocket"],
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
    if (user?._id) socket.emit("join", user._id);
  });

  socket.on("notification", (data) => {
    try {
      // SOUND
      const audio = new Audio(sounds[data.type] || sounds.general);
      audio.volume = 1.0;
      audio.play().catch(() => {});

      // BROWSER NOTIFICATION
      if (Notification.permission === "granted") {
        new Notification(data.title || "New Notification", {
          body: data.message,
        });
      }

      // Dispatch global event for React components (NotificationBell)
      window.dispatchEvent(
        new CustomEvent("app-notification", { detail: data })
      );
    } catch (err) {
      console.log("Notification error:", err);
    }
  });

  return socket;
};

export const getSocket = () => socket;
