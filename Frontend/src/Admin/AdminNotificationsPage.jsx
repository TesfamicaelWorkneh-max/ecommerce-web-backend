import React, { useEffect, useState, useRef } from "react";
import { initSocket } from "../utils/socket";
import { Trash2, CheckCircle, Bell, Filter, Loader2 } from "lucide-react";
import { fetchWithAuth } from "../utils/auth";

const BACKEND_URL = import.meta.env.VITE_API_URL;

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all, unread, read
  const user = JSON.parse(localStorage.getItem("user"));

  // Refs for cleanup and preventing re-renders
  const filterRef = useRef(filter);
  const mountedRef = useRef(true);
  const socketRef = useRef(null);
  const userRef = useRef(user);

  // Update ref when filter changes
  useEffect(() => {
    filterRef.current = filter;
  }, [filter]);

  // Update user ref when user changes
  useEffect(() => {
    userRef.current = user;
  }, [user]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
      cleanup();
    };
  }, []);

  const fetchNotifs = async () => {
    if (!mountedRef.current || !userRef.current) return;

    try {
      setLoading(true);
      const currentFilter = filterRef.current;

      // Add filter query parameter
      let url = `${BACKEND_URL}/api/notifications`;
      if (currentFilter !== "all") {
        url += `?read=${currentFilter === "read"}`;
      }

      const res = await fetchWithAuth(url);
      const response = await res.json();

      if (response.success) {
        setNotifications(response.data || []);
      } else {
        console.error("API error:", response.message);
        setNotifications([]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setNotifications([]);
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  };

  const setupSocket = () => {
    try {
      // Initialize socket if not already done
      const socket = initSocket();
      socketRef.current = socket;

      const handleNewNotification = (data) => {
        if (!mountedRef.current) return;
        setNotifications((prev) => [data, ...prev]);
      };

      // Also set up custom event listener
      const notificationHandler = (e) => {
        const notificationData = e.detail || e.data;
        if (notificationData) {
          handleNewNotification(notificationData);
        }
      };

      window.addEventListener("notification", notificationHandler);

      // Listen for socket.io events
      if (socket) {
        socket.on("notification", handleNewNotification);
      }

      return () => {
        window.removeEventListener("notification", notificationHandler);
        if (socket) {
          socket.off("notification", handleNewNotification);
        }
      };
    } catch (error) {
      console.error("Socket setup error:", error);
    }
  };

  const cleanup = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
  };

  // Main effect for initial load and socket setup
  useEffect(() => {
    if (!userRef.current) return;

    // Fetch initial notifications
    fetchNotifs();

    // Setup socket
    const socketCleanup = setupSocket();

    return () => {
      if (socketCleanup && typeof socketCleanup === "function") {
        socketCleanup();
      }
      cleanup();
    };
  }, []); // Empty dependency array - runs once on mount

  // Separate effect for filter changes
  useEffect(() => {
    if (userRef.current) {
      fetchNotifs();
    }
  }, [filter]); // Only depend on filter

  // MARK READ
  const markRead = async (id) => {
    try {
      const res = await fetchWithAuth(
        `${BACKEND_URL}/api/notifications/${id}/read`,
        {
          method: "PUT",
        }
      );

      if (res.ok) {
        setNotifications((prev) =>
          prev.map((n) => (n._id === id ? { ...n, read: true } : n))
        );
      }
    } catch (err) {
      console.error("Mark read error:", err);
    }
  };

  // MARK ALL READ
  const markAllRead = async () => {
    try {
      const res = await fetchWithAuth(
        `${BACKEND_URL}/api/notifications/read-all`,
        {
          method: "PUT",
        }
      );

      if (res.ok) {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      }
    } catch (err) {
      console.error("Mark all read error:", err);
    }
  };

  // DELETE NOTIFICATION
  const deleteNotif = async (id) => {
    setDeletingId(id);
    try {
      const res = await fetchWithAuth(
        `${BACKEND_URL}/api/notifications/${id}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        setNotifications((prev) => prev.filter((n) => n._id !== id));
      }
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setDeletingId(null);
    }
  };

  // DELETE MULTIPLE NOTIFICATIONS
  const deleteMultiple = async (ids) => {
    try {
      const res = await fetchWithAuth(`${BACKEND_URL}/api/notifications`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids }),
      });

      if (res.ok) {
        setNotifications((prev) => prev.filter((n) => !ids.includes(n._id)));
      }
    } catch (err) {
      console.error("Delete multiple error:", err);
    }
  };

  // GET UNREAD COUNT
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <Bell className="text-blue-400" size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Admin Notifications</h1>
              <p className="text-gray-400">
                {unreadCount > 0
                  ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
                  : "All caught up!"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Filter dropdown */}
            <div className="relative">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="appearance-none bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Notifications</option>
                <option value="unread">Unread Only</option>
                <option value="read">Read Only</option>
              </select>
              <Filter
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                size={16}
              />
            </div>

            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="px-4 py-2 bg-green-500/20 text-green-300 hover:bg-green-500/30 rounded-lg transition-colors flex items-center gap-2"
              >
                <CheckCircle size={18} />
                Mark All Read
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-blue-400" size={32} />
            <span className="ml-3">Loading notifications...</span>
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-16 bg-slate-800/30 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-800 mb-6">
              <Bell className="text-gray-500 text-3xl" />
            </div>
            <h3 className="text-xl font-semibold mb-3">No notifications yet</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              {filter === "all"
                ? "You're all caught up! New notifications will appear here."
                : filter === "unread"
                  ? "No unread notifications at the moment."
                  : "No read notifications yet."}
            </p>
          </div>
        ) : (
          <>
            {/* Notifications Grid */}
            <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-6">
              {notifications.map((n) => (
                <div
                  key={n._id}
                  className={`p-5 rounded-2xl shadow-lg backdrop-blur-xl border 
                    transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl
                    ${
                      n.read
                        ? "bg-slate-800/30 border-slate-700/50"
                        : "bg-blue-950/20 border-blue-500/30"
                    }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      {/* Notification Header */}
                      <div className="flex items-center gap-3 mb-3">
                        {n.icon && (
                          <div
                            className={`p-2 rounded-lg ${
                              n.priority === "high"
                                ? "bg-red-500/20 text-red-300"
                                : n.priority === "urgent"
                                  ? "bg-orange-500/20 text-orange-300"
                                  : "bg-blue-500/20 text-blue-300"
                            }`}
                          >
                            <span className="text-lg">
                              {n.icon === "shopping-bag"
                                ? "🛍️"
                                : n.icon === "alert-circle"
                                  ? "⚠️"
                                  : n.icon === "bell"
                                    ? "🔔"
                                    : n.icon === "package"
                                      ? "📦"
                                      : "📢"}
                            </span>
                          </div>
                        )}
                        <div className="flex-1">
                          {n.title && (
                            <h3 className="font-semibold text-lg">{n.title}</h3>
                          )}
                          <div className="text-xs text-gray-400">
                            {new Date(n.createdAt).toLocaleString()}
                          </div>
                        </div>
                      </div>

                      {/* Notification Message */}
                      <div className="mb-4">
                        <p className="text-gray-200">{n.message}</p>

                        {/* Notification Data */}
                        {n.data && Object.keys(n.data).length > 0 && (
                          <div className="mt-3 p-3 bg-slate-800/50 rounded-lg text-sm">
                            {Object.entries(n.data).map(([key, value]) => (
                              <div
                                key={key}
                                className="flex justify-between py-1"
                              >
                                <span className="text-gray-400 capitalize">
                                  {key}:
                                </span>
                                <span className="text-gray-200">
                                  {String(value)}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* DELETE BUTTON */}
                    <button
                      onClick={() => deleteNotif(n._id)}
                      disabled={deletingId === n._id}
                      className="ml-2 p-2 rounded-lg hover:bg-red-600/20 transition-colors"
                      title="Delete notification"
                    >
                      <Trash2
                        size={18}
                        className={`${
                          deletingId === n._id
                            ? "animate-pulse text-red-400"
                            : "text-red-400"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700/50">
                    {/* Mark as Read */}
                    {!n.read && (
                      <button
                        onClick={() => markRead(n._id)}
                        className="px-3 py-1.5 text-sm bg-green-500/20 text-green-300 hover:bg-green-500/30 rounded-lg transition-colors flex items-center gap-2"
                      >
                        <CheckCircle size={14} />
                        Mark Read
                      </button>
                    )}

                    {/* Action URL */}
                    {n.actionUrl && (
                      <a
                        href={n.actionUrl}
                        className="px-3 py-1.5 text-sm bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 rounded-lg transition-colors"
                      >
                        {n.actionLabel || "View Details"}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Bulk Actions */}
            {notifications.length > 0 && (
              <div className="mt-8 p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">
                    Showing {notifications.length} notification
                    {notifications.length > 1 ? "s" : ""}
                  </span>
                  <button
                    onClick={() => {
                      const allIds = notifications.map((n) => n._id);
                      if (
                        window.confirm(
                          `Delete all ${notifications.length} notifications?`
                        )
                      ) {
                        deleteMultiple(allIds);
                      }
                    }}
                    className="px-4 py-2 bg-red-500/20 text-red-300 hover:bg-red-500/30 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Trash2 size={16} />
                    Clear All
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
