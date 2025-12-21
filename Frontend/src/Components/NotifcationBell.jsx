import React, { useState, useEffect } from "react";
import {
  FaBell,
  FaTrash,
  FaCog,
  FaBellSlash,
  FaBell as FaBellSolid,
} from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { fetchWithAuth } from "../utils/auth";
import { usePushNotifications } from "../hooks/UsePushNotifications";
import "./NotificationBell.css";

const BACKEND_URL = import.meta.env.VITE_API_URL;

function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const {
    isSupported,
    isSubscribed,
    permission,
    subscribe,
    unsubscribe,
    sendTestNotification,
  } = usePushNotifications();

  const fetchNotifications = async () => {
    try {
      const res = await fetchWithAuth(
        `${BACKEND_URL}/api/notifications?limit=10&read=false`
      );
      if (!res.ok) return;
      const data = await res.json();
      setNotifications(data.data || []);
    } catch (err) {
      console.error("Notification fetch error:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkRead = async (id) => {
    try {
      await fetchWithAuth(`${BACKEND_URL}/api/notifications/${id}/read`, {
        method: "PUT",
      });
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await fetchWithAuth(`${BACKEND_URL}/api/notifications/read-all`, {
        method: "PUT",
      });
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetchWithAuth(`${BACKEND_URL}/api/notifications/${id}`, {
        method: "DELETE",
      });
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handlePushToggle = async () => {
    setLoading(true);
    try {
      if (isSubscribed) {
        await unsubscribe();
      } else {
        await subscribe();
      }
    } catch (err) {
      console.error("Push toggle error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleTestPush = async () => {
    try {
      await sendTestNotification();
    } catch (err) {
      console.error("Test push error:", err);
    }
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 group"
        aria-label="Notifications"
      >
        <div className="relative">
          <IoNotifications className="text-2xl text-amber-500 group-hover:text-amber-400 transition-colors" />

          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </motion.span>
          )}
        </div>
      </button>

      {/* Notification Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute right-0 mt-2 w-96 max-h-[80vh] bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-slate-700 bg-slate-800/50">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-white text-lg flex items-center gap-2">
                  <IoNotifications className="text-amber-400" />
                  Notifications
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSettingsOpen(!settingsOpen)}
                    className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
                    title="Notification settings"
                  >
                    <FaCog className="text-slate-400 hover:text-white" />
                  </button>
                  {unreadCount > 0 && (
                    <button
                      onClick={handleMarkAllRead}
                      className="text-sm text-amber-400 hover:text-amber-300 transition-colors"
                    >
                      Mark all read
                    </button>
                  )}
                </div>
              </div>

              {/* Settings Panel */}
              <AnimatePresence>
                {settingsOpen && isSupported && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 p-3 bg-slate-800/30 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <p className="font-medium text-white">
                            Push Notifications
                          </p>
                          <p className="text-xs text-slate-400">
                            {permission === "granted"
                              ? "Enabled in browser"
                              : permission === "denied"
                                ? "Blocked in browser"
                                : "Click to enable"}
                          </p>
                        </div>
                        <button
                          onClick={handlePushToggle}
                          disabled={loading || permission === "denied"}
                          className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                            isSubscribed
                              ? "bg-red-500/20 text-red-300 hover:bg-red-500/30"
                              : "bg-green-500/20 text-green-300 hover:bg-green-500/30"
                          } ${(loading || permission === "denied") && "opacity-50 cursor-not-allowed"}`}
                        >
                          {loading
                            ? "..."
                            : isSubscribed
                              ? "Disable"
                              : "Enable"}
                        </button>
                      </div>
                      {isSubscribed && (
                        <button
                          onClick={handleTestPush}
                          className="w-full py-2 text-sm bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 rounded-lg transition-colors"
                        >
                          Test Push Notification
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Notifications List */}
            <div className="overflow-y-auto max-h-96">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="inline-flex p-3 rounded-full bg-slate-800/50 mb-3">
                    <FaBellSlash className="text-3xl text-slate-600" />
                  </div>
                  <p className="text-slate-400">No notifications yet</p>
                  <p className="text-sm text-slate-500 mt-1">
                    We'll notify you when something arrives
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-slate-800">
                  {notifications.map((notification) => (
                    <div
                      key={notification._id}
                      className={`p-4 hover:bg-slate-800/30 transition-colors ${
                        !notification.read ? "bg-slate-800/10" : ""
                      }`}
                    >
                      <div className="flex gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            notification.priority === "high"
                              ? "bg-red-500/20 text-red-300"
                              : notification.priority === "urgent"
                                ? "bg-orange-500/20 text-orange-300"
                                : "bg-blue-500/20 text-blue-300"
                          }`}
                        >
                          {notification.icon === "shopping-bag"
                            ? "🛍️"
                            : notification.icon === "package"
                              ? "📦"
                              : notification.icon === "alert-circle"
                                ? "⚠️"
                                : notification.icon === "bell"
                                  ? "🔔"
                                  : "📢"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <p className="font-medium text-white">
                              {notification.title}
                            </p>
                            <span className="text-xs text-slate-500 ml-2 whitespace-nowrap">
                              {notification.timeAgo || "Recently"}
                            </span>
                          </div>
                          <p className="text-sm text-slate-300 mt-1">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-3 mt-3">
                            {!notification.read && (
                              <button
                                onClick={() => handleMarkRead(notification._id)}
                                className="text-xs text-amber-400 hover:text-amber-300 transition-colors"
                              >
                                Mark as read
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(notification._id)}
                              className="text-xs text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
                            >
                              <FaTrash size={10} />
                              Delete
                            </button>
                            {notification.actionUrl && (
                              <a
                                href={notification.actionUrl}
                                className="text-xs text-blue-400 hover:text-blue-300 transition-colors ml-auto"
                              >
                                {notification.actionLabel || "View"}
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-slate-700 bg-slate-800/50">
              <a
                href="/notifications"
                className="block text-center py-2 text-sm text-slate-300 hover:text-white transition-colors"
              >
                View all notifications →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default NotificationBell;
