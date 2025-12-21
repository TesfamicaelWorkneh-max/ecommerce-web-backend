import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBell,
  FaCheck,
  FaExclamationCircle,
  FaShoppingBag,
  FaTag,
  FaShippingFast,
  FaFilter,
  FaTrash,
  FaVolumeUp,
  FaVolumeMute,
  FaArrowLeft,
  FaStar,
  FaUserCheck,
  FaFire,
  FaGift,
  FaCreditCard,
  FaBoxOpen,
  FaSpinner,
} from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import { initSocket } from "../utils/socket";
import { fetchWithAuth } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_API_URL;
const SOUND_URL =
  "https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg";

export default function MyNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  // Refs for cleanup and preventing re-renders
  const filterRef = useRef(filter);
  const mountedRef = useRef(true);
  const socketRef = useRef(null);
  const pollingRef = useRef(null);
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
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    };
  }, []);

  // Main effect for initial load and socket setup
  useEffect(() => {
    if (!userRef.current) {
      navigate("/login");
      return;
    }

    // Fetch initial notifications
    fetchInitialNotifications();

    // Initialize socket
    setupSocket();

    // Set up polling interval
    setupPolling();

    return () => {
      cleanup();
    };
  }, [navigate]);

  // Separate effect for filter changes
  useEffect(() => {
    if (userRef.current) {
      fetchNotifications();
    }
  }, [filter]);

  const fetchInitialNotifications = async () => {
    if (!mountedRef.current) return;

    try {
      setLoading(true);
      await fetchNotifications();
    } catch (error) {
      console.error("Initial fetch error:", error);
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  };

  const fetchNotifications = async () => {
    if (!mountedRef.current || !userRef.current) return;

    try {
      const currentFilter = filterRef.current;

      // Add filter query parameter
      let url = `${BACKEND_URL}/api/notifications`;
      if (currentFilter !== "all") {
        url += `?read=${currentFilter === "read"}`;
      }

      const res = await fetchWithAuth(url);
      if (!res.ok) {
        console.error("Failed to fetch notifications:", res.status);
        return;
      }

      const response = await res.json();

      if (response.success) {
        setNotifications(response.data || []);
      } else {
        console.error("API error:", response.message);
        setNotifications([]);
      }
    } catch (err) {
      console.error("Fetch notifications error:", err);
      if (mountedRef.current) {
        setNotifications([]);
      }
    }
  };

  const setupSocket = () => {
    try {
      const socket = initSocket(userRef.current._id);
      socketRef.current = socket;

      const onNotif = (notif) => {
        if (!mountedRef.current) return;

        setNotifications((prev) => {
          if (soundEnabled) {
            playSound();
          }
          return [notif, ...prev];
        });
      };

      socket.on("notification", onNotif);
    } catch (error) {
      console.error("Socket initialization error:", error);
    }
  };

  const setupPolling = () => {
    // Clear any existing interval
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
    }

    // Set up new polling interval (30 seconds)
    pollingRef.current = setInterval(() => {
      if (mountedRef.current && userRef.current) {
        fetchNotifications();
      }
    }, 30000);
  };

  const cleanup = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  };

  const playSound = () => {
    try {
      const audio = new Audio(SOUND_URL);
      audio.volume = 0.3;
      audio.play().catch(() => {});
    } catch (e) {
      console.error("Sound play error:", e);
    }
  };

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

  const markAllAsRead = async () => {
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

  const clearAll = async () => {
    if (!window.confirm("Clear all notifications?")) return;
    try {
      const res = await fetchWithAuth(`${BACKEND_URL}/api/notifications`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: notifications.map((n) => n._id) }),
      });

      if (res.ok) {
        setNotifications([]);
      }
    } catch (err) {
      console.error("Clear all error:", err);
    }
  };

  const getNotificationIcon = (message, type, icon) => {
    if (icon) {
      if (icon === "shopping-bag") return FaShoppingBag;
      if (icon === "alert-circle") return FaExclamationCircle;
      if (icon === "package") return FaShippingFast;
      if (icon === "bell") return FaBell;
      if (icon === "rotate-ccw") return FaBoxOpen;
      if (icon === "check-circle") return FaCheck;
    }

    const lowerMsg = message.toLowerCase();
    if (
      lowerMsg.includes("order") ||
      lowerMsg.includes("purchase") ||
      type === "order"
    )
      return FaShoppingBag;
    if (
      lowerMsg.includes("discount") ||
      lowerMsg.includes("sale") ||
      lowerMsg.includes("offer") ||
      lowerMsg.includes("deal")
    )
      return FaTag;
    if (
      lowerMsg.includes("shipped") ||
      lowerMsg.includes("delivery") ||
      lowerMsg.includes("shipping") ||
      lowerMsg.includes("dispatch") ||
      type === "shipping"
    )
      return FaShippingFast;
    if (
      lowerMsg.includes("important") ||
      lowerMsg.includes("alert") ||
      lowerMsg.includes("urgent")
    )
      return FaExclamationCircle;
    if (lowerMsg.includes("welcome") || lowerMsg.includes("account"))
      return FaUserCheck;
    if (lowerMsg.includes("review") || lowerMsg.includes("rating"))
      return FaStar;
    if (lowerMsg.includes("trending") || lowerMsg.includes("hot"))
      return FaFire;
    if (lowerMsg.includes("gift") || lowerMsg.includes("reward")) return FaGift;
    if (
      lowerMsg.includes("payment") ||
      lowerMsg.includes("invoice") ||
      type === "payment"
    )
      return FaCreditCard;
    if (
      lowerMsg.includes("return") ||
      lowerMsg.includes("refund") ||
      type.includes("return")
    )
      return FaBoxOpen;
    return FaBell;
  };

  const getNotificationColor = (message, read, type, priority) => {
    if (read) return "text-slate-400";

    if (priority === "high" || priority === "urgent") return "text-red-400";
    if (priority === "medium") return "text-amber-400";

    if (type === "order" || type === "order_status") return "text-blue-400";
    if (type === "return_request" || type === "return_status")
      return "text-amber-400";
    if (type === "payment") return "text-green-400";
    if (type === "shipping") return "text-purple-400";
    if (type === "promotion") return "text-pink-400";

    const lowerMsg = message.toLowerCase();
    if (lowerMsg.includes("order") || lowerMsg.includes("purchase"))
      return "text-blue-400";
    if (
      lowerMsg.includes("discount") ||
      lowerMsg.includes("sale") ||
      lowerMsg.includes("deal")
    )
      return "text-green-400";
    if (
      lowerMsg.includes("shipped") ||
      lowerMsg.includes("delivery") ||
      lowerMsg.includes("dispatch")
    )
      return "text-amber-400";
    if (
      lowerMsg.includes("important") ||
      lowerMsg.includes("alert") ||
      lowerMsg.includes("urgent")
    )
      return "text-red-400";
    if (lowerMsg.includes("welcome") || lowerMsg.includes("account"))
      return "text-purple-400";
    if (lowerMsg.includes("review") || lowerMsg.includes("rating"))
      return "text-yellow-400";
    if (lowerMsg.includes("trending") || lowerMsg.includes("hot"))
      return "text-orange-400";
    if (lowerMsg.includes("gift") || lowerMsg.includes("reward"))
      return "text-pink-400";
    if (lowerMsg.includes("payment") || lowerMsg.includes("invoice"))
      return "text-indigo-400";
    if (lowerMsg.includes("return") || lowerMsg.includes("refund"))
      return "text-rose-400";
    return "text-cyan-400";
  };

  const getNotificationBg = (message, read, type, priority) => {
    if (read) return "bg-slate-800/30";

    if (priority === "high" || priority === "urgent") return "bg-red-500/10";
    if (priority === "medium") return "bg-amber-500/10";

    if (type === "order" || type === "order_status") return "bg-blue-500/10";
    if (type === "return_request" || type === "return_status")
      return "bg-amber-500/10";
    if (type === "payment") return "bg-green-500/10";
    if (type === "shipping") return "bg-purple-500/10";

    return "bg-blue-500/10";
  };

  const getNotificationBorder = (message, read, type, priority) => {
    if (read) return "border-slate-700/50";

    if (priority === "high" || priority === "urgent")
      return "border-red-500/20";
    if (priority === "medium") return "border-amber-500/20";

    if (type === "order" || type === "order_status")
      return "border-blue-500/20";
    if (type === "return_request" || type === "return_status")
      return "border-amber-500/20";

    return "border-blue-500/20";
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "unread") return !n.read;
    if (filter === "read") return n.read;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;
  const totalCount = notifications.length;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: diffDays < 365 ? undefined : "numeric",
    });
  };

  const getTimeIndicator = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / 3600000);

    if (diffHours < 1) return "text-green-400";
    if (diffHours < 24) return "text-amber-400";
    if (diffHours < 168) return "text-yellow-400";
    return "text-slate-400";
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Please log in to view notifications
          </h2>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Animation styles object
  const animationStyles = {
    blob: {
      animation: "blob 7s infinite",
    },
    animationDelay2000: {
      animationDelay: "2s",
    },
    animationDelay4000: {
      animationDelay: "4s",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 -left-4 w-72 h-72 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          style={animationStyles.blob}
        ></div>
        <div
          className="absolute top-0 -right-4 w-72 h-72 bg-amber-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          style={{
            ...animationStyles.blob,
            ...animationStyles.animationDelay2000,
          }}
        ></div>
        <div
          className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          style={{
            ...animationStyles.blob,
            ...animationStyles.animationDelay4000,
          }}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto relative">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500/10 to-amber-600/10 hover:from-amber-500/20 hover:to-amber-600/20 text-amber-300 font-medium border border-amber-500/30 transition-all duration-300 mb-8 backdrop-blur-sm"
        >
          <FaArrowLeft />
          <span className="text-sm font-medium">Go Back</span>
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="relative">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-amber-600/20 to-rose-500/20 border border-amber-500/30 backdrop-blur-sm">
                  <FaBell className="text-4xl text-amber-400" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                    <IoSparkles className="text-white text-xs" />
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  <span className="text-white">Notifications</span>
                  <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-rose-400 bg-clip-text text-transparent ml-3">
                    Hub
                  </span>
                </h1>
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-slate-400">
                    {unreadCount > 0
                      ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
                      : "All caught up! 🎉"}
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-xs text-slate-500">Live updates</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
              <div className="px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm">
                <div className="text-2xl font-bold text-white">
                  {totalCount}
                </div>
                <div className="text-xs text-slate-400">Total</div>
              </div>
              <div className="px-4 py-3 rounded-xl bg-gradient-to-r from-amber-500/10 to-amber-600/10 border border-amber-500/20 backdrop-blur-sm">
                <div className="text-2xl font-bold text-amber-400">
                  {unreadCount}
                </div>
                <div className="text-xs text-amber-300/80">Unread</div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 backdrop-blur-xl mb-8">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-300 ${
                  soundEnabled
                    ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 hover:from-green-500/30 hover:to-emerald-500/30 border border-green-500/30"
                    : "bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700/50 border border-slate-700"
                }`}
              >
                {soundEnabled ? <FaVolumeUp /> : <FaVolumeMute />}
                <span className="text-sm font-medium">
                  Sound {soundEnabled ? "On" : "Off"}
                </span>
              </button>

              {unreadCount > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={markAllAsRead}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-600/20 hover:from-amber-500/30 hover:to-amber-600/30 text-amber-300 font-medium border border-amber-500/30 transition-all duration-300 flex items-center gap-2"
                >
                  <FaCheck />
                  <span className="text-sm font-medium">Mark All Read</span>
                </motion.button>
              )}

              {totalCount > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearAll}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500/30 hover:to-pink-500/30 text-red-300 font-medium border border-red-500/30 transition-all duration-300 flex items-center gap-2"
                >
                  <FaTrash />
                  <span className="text-sm font-medium">Clear All</span>
                </motion.button>
              )}
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 p-4 rounded-2xl bg-slate-800/20 border border-slate-700/30 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <FaFilter className="text-amber-400" />
              <span className="font-medium text-slate-300">Filter by:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {["all", "unread", "read"].map((f) => (
                <motion.button
                  key={f}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2.5 rounded-xl transition-all duration-300 font-medium text-sm ${
                    filter === f
                      ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30"
                      : "bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700/50"
                  }`}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                  {f === "unread" && unreadCount > 0 && (
                    <span className="ml-2 px-1.5 py-0.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <FaSpinner className="animate-spin text-amber-400 text-4xl mb-4" />
            <p className="text-slate-400">Loading notifications...</p>
          </div>
        ) : (
          <>
            {/* Notifications List */}
            <div className="space-y-4">
              {filteredNotifications.length > 0 ? (
                <AnimatePresence>
                  {filteredNotifications.map((n, index) => {
                    const Icon = getNotificationIcon(n.message, n.type, n.icon);
                    const color = getNotificationColor(
                      n.message,
                      n.read,
                      n.type,
                      n.priority
                    );
                    const bg = getNotificationBg(
                      n.message,
                      n.read,
                      n.type,
                      n.priority
                    );
                    const border = getNotificationBorder(
                      n.message,
                      n.read,
                      n.type,
                      n.priority
                    );
                    const timeColor = getTimeIndicator(n.createdAt);

                    return (
                      <motion.div
                        key={n._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        exit={{ opacity: 0, x: -20 }}
                        layout
                        className={`rounded-2xl border transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:shadow-slate-900/20 overflow-hidden backdrop-blur-sm ${
                          n.read
                            ? "bg-slate-800/30 border-slate-700/50"
                            : "bg-gradient-to-r from-slate-800/40 to-slate-800/20"
                        } ${border}`}
                      >
                        <div className="p-6">
                          <div className="flex items-start gap-4">
                            {/* Icon Container with Glow Effect */}
                            <div className="relative">
                              <div
                                className={`p-3.5 rounded-xl ${bg} ${color} border ${border}`}
                              >
                                <Icon className="text-xl" />
                              </div>
                              {!n.read && (
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full animate-pulse"></div>
                              )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                                <div className="flex-1">
                                  <p
                                    className={`font-medium ${
                                      n.read ? "text-slate-300" : "text-white"
                                    }`}
                                  >
                                    {n.title || n.message}
                                  </p>
                                  {n.title &&
                                    n.message &&
                                    n.title !== n.message && (
                                      <p className="text-sm text-gray-400 mt-1">
                                        {n.message}
                                      </p>
                                    )}
                                  <div className="flex flex-wrap items-center gap-3 mt-2">
                                    <span className={`text-sm ${timeColor}`}>
                                      {formatDate(n.createdAt)}
                                    </span>
                                    {!n.read && (
                                      <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-gradient-to-r from-amber-500/20 to-amber-600/20 text-amber-300 border border-amber-500/30">
                                        New
                                      </span>
                                    )}
                                    {n.type && (
                                      <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-slate-700/50 text-slate-300">
                                        {n.type}
                                      </span>
                                    )}
                                    <div className="flex items-center gap-1">
                                      <div className="w-1 h-1 rounded-full bg-slate-600"></div>
                                      <span className="text-xs text-slate-500">
                                        {n.read ? "Read" : "Unread"}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                {!n.read && (
                                  <div className="flex items-center gap-3">
                                    <motion.button
                                      whileHover={{ scale: 1.05 }}
                                      whileTap={{ scale: 0.95 }}
                                      onClick={() => markRead(n._id)}
                                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-600/20 hover:from-amber-500/30 hover:to-amber-600/30 text-amber-300 font-medium border border-amber-500/30 transition-all duration-300 text-sm flex items-center gap-2 whitespace-nowrap"
                                    >
                                      <FaCheck className="text-xs" />
                                      Mark Read
                                    </motion.button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16 bg-slate-800/30 rounded-2xl border border-slate-700/50 backdrop-blur-xl"
                >
                  <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-r from-amber-500/10 to-rose-500/10 border border-amber-500/20 mb-6">
                    <FaBell className="text-amber-400 text-5xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {filter === "all"
                      ? "No Notifications Yet"
                      : filter === "unread"
                        ? "All Caught Up! 🎉"
                        : "No Read Notifications"}
                  </h3>
                  <p className="text-slate-400 max-w-md mx-auto mb-8">
                    {filter === "all"
                      ? "You're all caught up! We'll notify you when something arrives."
                      : filter === "unread"
                        ? "No unread notifications. Great job staying updated!"
                        : "No read notifications yet. New ones will appear here."}
                  </p>
                  {filter !== "all" && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFilter("all")}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-600/20 hover:from-amber-500/30 hover:to-amber-600/30 text-amber-300 font-medium border border-amber-500/30 transition-all duration-300"
                    >
                      View All Notifications
                    </motion.button>
                  )}
                </motion.div>
              )}
            </div>

            {/* Footer Stats */}
            {!loading && filteredNotifications.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-10 text-center"
              >
                <p className="text-slate-500 text-sm">
                  Showing {filteredNotifications.length} of {totalCount}{" "}
                  notifications
                  {filter !== "all" && ` (filtered by ${filter})`}
                </p>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
