// import React, { useEffect, useState, useRef } from "react";
// import { initSocket } from "../utils/socket";
// import { Trash2, CheckCircle, Bell, Filter, Loader2 } from "lucide-react";
// import { fetchWithAuth } from "../utils/auth";

// const BACKEND_URL = import.meta.env.VITE_API_URL;

// export default function AdminNotificationsPage() {
//   const [notifications, setNotifications] = useState([]);
//   const [deletingId, setDeletingId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState("all"); // all, unread, read
//   const user = JSON.parse(localStorage.getItem("user"));

//   // Refs for cleanup and preventing re-renders
//   const filterRef = useRef(filter);
//   const mountedRef = useRef(true);
//   const socketRef = useRef(null);
//   const userRef = useRef(user);

//   // Update ref when filter changes
//   useEffect(() => {
//     filterRef.current = filter;
//   }, [filter]);

//   // Update user ref when user changes
//   useEffect(() => {
//     userRef.current = user;
//   }, [user]);

//   // Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       mountedRef.current = false;
//       cleanup();
//     };
//   }, []);

//   const fetchNotifs = async () => {
//     if (!mountedRef.current || !userRef.current) return;

//     try {
//       setLoading(true);
//       const currentFilter = filterRef.current;

//       // Add filter query parameter
//       let url = `${BACKEND_URL}/api/notifications`;
//       if (currentFilter !== "all") {
//         url += `?read=${currentFilter === "read"}`;
//       }

//       const res = await fetchWithAuth(url);
//       const response = await res.json();

//       if (response.success) {
//         setNotifications(response.data || []);
//       } else {
//         console.error("API error:", response.message);
//         setNotifications([]);
//       }
//     } catch (err) {
//       console.error("Fetch error:", err);
//       setNotifications([]);
//     } finally {
//       if (mountedRef.current) {
//         setLoading(false);
//       }
//     }
//   };

//   const setupSocket = () => {
//     try {
//       // Initialize socket if not already done
//       const socket = initSocket();
//       socketRef.current = socket;

//       const handleNewNotification = (data) => {
//         if (!mountedRef.current) return;
//         setNotifications((prev) => [data, ...prev]);
//       };

//       // Also set up custom event listener
//       const notificationHandler = (e) => {
//         const notificationData = e.detail || e.data;
//         if (notificationData) {
//           handleNewNotification(notificationData);
//         }
//       };

//       window.addEventListener("notification", notificationHandler);

//       // Listen for socket.io events
//       if (socket) {
//         socket.on("notification", handleNewNotification);
//       }

//       return () => {
//         window.removeEventListener("notification", notificationHandler);
//         if (socket) {
//           socket.off("notification", handleNewNotification);
//         }
//       };
//     } catch (error) {
//       console.error("Socket setup error:", error);
//     }
//   };

//   const cleanup = () => {
//     if (socketRef.current) {
//       socketRef.current.disconnect();
//       socketRef.current = null;
//     }
//   };

//   // Main effect for initial load and socket setup
//   useEffect(() => {
//     if (!userRef.current) return;

//     // Fetch initial notifications
//     fetchNotifs();

//     // Setup socket
//     const socketCleanup = setupSocket();

//     return () => {
//       if (socketCleanup && typeof socketCleanup === "function") {
//         socketCleanup();
//       }
//       cleanup();
//     };
//   }, []); // Empty dependency array - runs once on mount

//   // Separate effect for filter changes
//   useEffect(() => {
//     if (userRef.current) {
//       fetchNotifs();
//     }
//   }, [filter]); // Only depend on filter

//   // MARK READ
//   const markRead = async (id) => {
//     try {
//       const res = await fetchWithAuth(
//         `${BACKEND_URL}/api/notifications/${id}/read`,
//         {
//           method: "PUT",
//         }
//       );

//       if (res.ok) {
//         setNotifications((prev) =>
//           prev.map((n) => (n._id === id ? { ...n, read: true } : n))
//         );
//       }
//     } catch (err) {
//       console.error("Mark read error:", err);
//     }
//   };

//   // MARK ALL READ
//   const markAllRead = async () => {
//     try {
//       const res = await fetchWithAuth(
//         `${BACKEND_URL}/api/notifications/read-all`,
//         {
//           method: "PUT",
//         }
//       );

//       if (res.ok) {
//         setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
//       }
//     } catch (err) {
//       console.error("Mark all read error:", err);
//     }
//   };

//   // DELETE NOTIFICATION
//   const deleteNotif = async (id) => {
//     setDeletingId(id);
//     try {
//       const res = await fetchWithAuth(
//         `${BACKEND_URL}/api/notifications/${id}`,
//         {
//           method: "DELETE",
//         }
//       );

//       if (res.ok) {
//         setNotifications((prev) => prev.filter((n) => n._id !== id));
//       }
//     } catch (err) {
//       console.error("Delete error:", err);
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   // DELETE MULTIPLE NOTIFICATIONS
//   const deleteMultiple = async (ids) => {
//     try {
//       const res = await fetchWithAuth(`${BACKEND_URL}/api/notifications`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ ids }),
//       });

//       if (res.ok) {
//         setNotifications((prev) => prev.filter((n) => !ids.includes(n._id)));
//       }
//     } catch (err) {
//       console.error("Delete multiple error:", err);
//     }
//   };

//   // GET UNREAD COUNT
//   const unreadCount = notifications.filter((n) => !n.read).length;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 text-white p-4 md:p-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex items-center justify-between mb-8">
//           <div className="flex items-center gap-4">
//             <div className="p-3 bg-blue-500/20 rounded-xl">
//               <Bell className="text-blue-400" size={32} />
//             </div>
//             <div>
//               <h1 className="text-3xl font-bold">Admin Notifications</h1>
//               <p className="text-gray-400">
//                 {unreadCount > 0
//                   ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
//                   : "All caught up!"}
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center gap-3">
//             {/* Filter dropdown */}
//             <div className="relative">
//               <select
//                 value={filter}
//                 onChange={(e) => setFilter(e.target.value)}
//                 className="appearance-none bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="all">All Notifications</option>
//                 <option value="unread">Unread Only</option>
//                 <option value="read">Read Only</option>
//               </select>
//               <Filter
//                 className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
//                 size={16}
//               />
//             </div>

//             {unreadCount > 0 && (
//               <button
//                 onClick={markAllRead}
//                 className="px-4 py-2 bg-green-500/20 text-green-300 hover:bg-green-500/30 rounded-lg transition-colors flex items-center gap-2"
//               >
//                 <CheckCircle size={18} />
//                 Mark All Read
//               </button>
//             )}
//           </div>
//         </div>

//         {loading ? (
//           <div className="flex justify-center items-center h-64">
//             <Loader2 className="animate-spin text-blue-400" size={32} />
//             <span className="ml-3">Loading notifications...</span>
//           </div>
//         ) : notifications.length === 0 ? (
//           <div className="text-center py-16 bg-slate-800/30 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
//             <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-800 mb-6">
//               <Bell className="text-gray-500 text-3xl" />
//             </div>
//             <h3 className="text-xl font-semibold mb-3">No notifications yet</h3>
//             <p className="text-gray-400 max-w-md mx-auto">
//               {filter === "all"
//                 ? "You're all caught up! New notifications will appear here."
//                 : filter === "unread"
//                   ? "No unread notifications at the moment."
//                   : "No read notifications yet."}
//             </p>
//           </div>
//         ) : (
//           <>
//             {/* Notifications Grid */}
//             <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-6">
//               {notifications.map((n) => (
//                 <div
//                   key={n._id}
//                   className={`p-5 rounded-2xl shadow-lg backdrop-blur-xl border
//                     transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl
//                     ${
//                       n.read
//                         ? "bg-slate-800/30 border-slate-700/50"
//                         : "bg-blue-950/20 border-blue-500/30"
//                     }`}
//                 >
//                   <div className="flex justify-between items-start">
//                     <div className="flex-1">
//                       {/* Notification Header */}
//                       <div className="flex items-center gap-3 mb-3">
//                         {n.icon && (
//                           <div
//                             className={`p-2 rounded-lg ${
//                               n.priority === "high"
//                                 ? "bg-red-500/20 text-red-300"
//                                 : n.priority === "urgent"
//                                   ? "bg-orange-500/20 text-orange-300"
//                                   : "bg-blue-500/20 text-blue-300"
//                             }`}
//                           >
//                             <span className="text-lg">
//                               {n.icon === "shopping-bag"
//                                 ? "🛍️"
//                                 : n.icon === "alert-circle"
//                                   ? "⚠️"
//                                   : n.icon === "bell"
//                                     ? "🔔"
//                                     : n.icon === "package"
//                                       ? "📦"
//                                       : "📢"}
//                             </span>
//                           </div>
//                         )}
//                         <div className="flex-1">
//                           {n.title && (
//                             <h3 className="font-semibold text-lg">{n.title}</h3>
//                           )}
//                           <div className="text-xs text-gray-400">
//                             {new Date(n.createdAt).toLocaleString()}
//                           </div>
//                         </div>
//                       </div>

//                       {/* Notification Message */}
//                       <div className="mb-4">
//                         <p className="text-gray-200">{n.message}</p>

//                         {/* Notification Data */}
//                         {n.data && Object.keys(n.data).length > 0 && (
//                           <div className="mt-3 p-3 bg-slate-800/50 rounded-lg text-sm">
//                             {Object.entries(n.data).map(([key, value]) => (
//                               <div
//                                 key={key}
//                                 className="flex justify-between py-1"
//                               >
//                                 <span className="text-gray-400 capitalize">
//                                   {key}:
//                                 </span>
//                                 <span className="text-gray-200">
//                                   {String(value)}
//                                 </span>
//                               </div>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     {/* DELETE BUTTON */}
//                     <button
//                       onClick={() => deleteNotif(n._id)}
//                       disabled={deletingId === n._id}
//                       className="ml-2 p-2 rounded-lg hover:bg-red-600/20 transition-colors"
//                       title="Delete notification"
//                     >
//                       <Trash2
//                         size={18}
//                         className={`${
//                           deletingId === n._id
//                             ? "animate-pulse text-red-400"
//                             : "text-red-400"
//                         }`}
//                       />
//                     </button>
//                   </div>

//                   {/* Action Buttons */}
//                   <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700/50">
//                     {/* Mark as Read */}
//                     {!n.read && (
//                       <button
//                         onClick={() => markRead(n._id)}
//                         className="px-3 py-1.5 text-sm bg-green-500/20 text-green-300 hover:bg-green-500/30 rounded-lg transition-colors flex items-center gap-2"
//                       >
//                         <CheckCircle size={14} />
//                         Mark Read
//                       </button>
//                     )}

//                     {/* Action URL */}
//                     {n.actionUrl && (
//                       <a
//                         href={n.actionUrl}
//                         className="px-3 py-1.5 text-sm bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 rounded-lg transition-colors"
//                       >
//                         {n.actionLabel || "View Details"}
//                       </a>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Bulk Actions */}
//             {notifications.length > 0 && (
//               <div className="mt-8 p-4 bg-slate-800/30 rounded-xl border border-slate-700/50">
//                 <div className="flex items-center justify-between">
//                   <span className="text-gray-400">
//                     Showing {notifications.length} notification
//                     {notifications.length > 1 ? "s" : ""}
//                   </span>
//                   <button
//                     onClick={() => {
//                       const allIds = notifications.map((n) => n._id);
//                       if (
//                         window.confirm(
//                           `Delete all ${notifications.length} notifications?`
//                         )
//                       ) {
//                         deleteMultiple(allIds);
//                       }
//                     }}
//                     className="px-4 py-2 bg-red-500/20 text-red-300 hover:bg-red-500/30 rounded-lg transition-colors flex items-center gap-2"
//                   >
//                     <Trash2 size={16} />
//                     Clear All
//                   </button>
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState, useRef } from "react";
import { initSocket } from "../utils/socket";
import {
  Trash2,
  CheckCircle,
  Bell,
  Filter,
  Loader2,
  ExternalLink,
  Sun,
  Moon,
  CheckSquare,
  Square,
} from "lucide-react";
import { fetchWithAuth } from "../utils/auth";

const BACKEND_URL = import.meta.env.VITE_API_URL;

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selectedForDelete, setSelectedForDelete] = useState(new Set());
  const [theme, setTheme] = useState(() => {
    // Check localStorage or system preference
    const savedTheme = localStorage.getItem("admin-notifications-theme");
    if (savedTheme) return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });
  const user = JSON.parse(localStorage.getItem("user"));

  const filterRef = useRef(filter);
  const mountedRef = useRef(true);
  const socketRef = useRef(null);
  const userRef = useRef(user);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("admin-notifications-theme", newTheme);
  };

  // Apply theme class to body for global styles
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    filterRef.current = filter;
  }, [filter]);

  useEffect(() => {
    userRef.current = user;
  }, [user]);

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

      let url = `${BACKEND_URL}/api/notifications`;
      if (currentFilter !== "all") {
        url += `?read=${currentFilter === "read"}`;
      }

      const res = await fetchWithAuth(url);
      const response = await res.json();

      if (response.success) {
        setNotifications(response.data || []);
        setSelectedForDelete(new Set());
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
      const socket = initSocket();
      socketRef.current = socket;

      const handleNewNotification = (data) => {
        if (!mountedRef.current) return;
        setNotifications((prev) => [data, ...prev]);
      };

      const notificationHandler = (e) => {
        const notificationData = e.detail || e.data;
        if (notificationData) {
          handleNewNotification(notificationData);
        }
      };

      window.addEventListener("notification", notificationHandler);

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

  useEffect(() => {
    if (!userRef.current) return;
    fetchNotifs();
    const socketCleanup = setupSocket();

    return () => {
      if (socketCleanup && typeof socketCleanup === "function") {
        socketCleanup();
      }
      cleanup();
    };
  }, []);

  useEffect(() => {
    if (userRef.current) {
      fetchNotifs();
    }
  }, [filter]);

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
        const newSelected = new Set(selectedForDelete);
        newSelected.delete(id);
        setSelectedForDelete(newSelected);
      }
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setDeletingId(null);
    }
  };

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
        setSelectedForDelete(new Set());
      }
    } catch (err) {
      console.error("Delete multiple error:", err);
    }
  };

  const toggleSelectNotification = (id) => {
    const newSelected = new Set(selectedForDelete);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedForDelete(newSelected);
  };

  const selectAllNotifications = () => {
    if (selectedForDelete.size === notifications.length) {
      setSelectedForDelete(new Set());
    } else {
      setSelectedForDelete(new Set(notifications.map((n) => n._id)));
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationIcon = (icon) => {
    switch (icon) {
      case "shopping-bag":
        return "🛍️";
      case "alert-circle":
        return "⚠️";
      case "bell":
        return "🔔";
      case "package":
        return "📦";
      default:
        return "📢";
    }
  };

  // Theme-based styles
  const themeClasses = {
    container:
      theme === "dark"
        ? "bg-gradient-to-br from-slate-900 to-slate-950 text-white"
        : "bg-gradient-to-br from-slate-50 to-gray-100 text-gray-900",
    card:
      theme === "dark"
        ? "bg-slate-800/30 border-slate-700/50"
        : "bg-white/70 border-gray-200/70 shadow-md",
    unreadCard:
      theme === "dark"
        ? "bg-blue-950/20 border-blue-500/30"
        : "bg-blue-50/80 border-blue-200/80",
    iconBg: theme === "dark" ? "bg-blue-500/20" : "bg-blue-100 text-blue-600",
    filterSelect:
      theme === "dark"
        ? "bg-slate-800 border-slate-700"
        : "bg-white border-gray-300",
    buttonPrimary:
      theme === "dark"
        ? "bg-green-500/20 text-green-300 hover:bg-green-500/30"
        : "bg-green-100 text-green-700 hover:bg-green-200",
    buttonSecondary:
      theme === "dark"
        ? "bg-blue-500/20 text-blue-300 hover:bg-blue-500/30"
        : "bg-blue-100 text-blue-700 hover:bg-blue-200",
    buttonDanger:
      theme === "dark"
        ? "bg-red-500/20 text-red-300 hover:bg-red-500/30"
        : "bg-red-100 text-red-700 hover:bg-red-200",
    textMuted: theme === "dark" ? "text-gray-400" : "text-gray-600",
    textSecondary: theme === "dark" ? "text-gray-300" : "text-gray-700",
    borderColor:
      theme === "dark" ? "border-slate-700/50" : "border-gray-200/70",
    dataContainer: theme === "dark" ? "bg-slate-800/50" : "bg-gray-50/80",
    emptyState:
      theme === "dark"
        ? "bg-slate-800/30 border-slate-700/50"
        : "bg-white/50 border-gray-200/50",
    bulkActions:
      theme === "dark"
        ? "bg-slate-800/50 border-slate-700"
        : "bg-gray-100/80 border-gray-300",
    checkbox:
      theme === "dark"
        ? "border-slate-600 bg-slate-800/80 hover:bg-slate-700"
        : "border-gray-400 bg-white/90 hover:bg-gray-100",
    priorityHigh:
      theme === "dark"
        ? "bg-red-500/20 text-red-300"
        : "bg-red-100 text-red-600",
    priorityUrgent:
      theme === "dark"
        ? "bg-orange-500/20 text-orange-300"
        : "bg-orange-100 text-orange-600",
    priorityNormal:
      theme === "dark"
        ? "bg-blue-500/20 text-blue-300"
        : "bg-blue-100 text-blue-600",
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${themeClasses.container} p-3 sm:p-4 md:p-6 lg:p-8`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-3 sm:gap-4">
            <div
              className={`p-2 sm:p-3 rounded-lg sm:rounded-xl ${themeClasses.iconBg}`}
            >
              <Bell
                className={`${theme === "dark" ? "text-blue-400" : "text-blue-600"} w-6 h-6 sm:w-8 sm:h-8`}
              />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
                Admin Notifications
              </h1>
              <p className={`text-sm sm:text-base ${themeClasses.textMuted}`}>
                {unreadCount > 0
                  ? `${unreadCount} unread notification${unreadCount > 1 ? "s" : ""}`
                  : "All caught up!"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${theme === "dark" ? "bg-slate-800 hover:bg-slate-700" : "bg-gray-200 hover:bg-gray-300"} transition-colors`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-yellow-300" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              {/* Filter dropdown */}
              <div className="relative w-full sm:w-auto">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className={`appearance-none w-full rounded-lg px-3 sm:px-4 py-2 pr-8 sm:pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base transition-colors ${themeClasses.filterSelect}`}
                >
                  <option value="all">All Notifications</option>
                  <option value="unread">Unread Only</option>
                  <option value="read">Read Only</option>
                </select>
                <Filter
                  className={`absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 pointer-events-none w-4 h-4 sm:w-5 sm:h-5 ${themeClasses.textMuted}`}
                />
              </div>

              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className={`w-full sm:w-auto px-3 sm:px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm sm:text-base ${themeClasses.buttonPrimary}`}
                >
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Mark All Read</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bulk Actions & Select All */}
        {notifications.length > 0 && (
          <div className="mb-6 p-4 rounded-xl border transition-colors flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={selectAllNotifications}
                className={`p-2 rounded-lg transition-colors flex items-center gap-2 ${selectedForDelete.size === notifications.length ? "text-blue-600" : themeClasses.textMuted}`}
              >
                {selectedForDelete.size === notifications.length ? (
                  <CheckSquare className="w-5 h-5" />
                ) : (
                  <Square className="w-5 h-5" />
                )}
                <span className="text-sm sm:text-base">
                  {selectedForDelete.size === notifications.length
                    ? "Deselect All"
                    : "Select All"}
                </span>
              </button>
            </div>

            {selectedForDelete.size > 0 && (
              <div className="flex gap-3 w-full sm:w-auto">
                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        `Delete ${selectedForDelete.size} selected notification${selectedForDelete.size > 1 ? "s" : ""}?`
                      )
                    ) {
                      deleteMultiple(Array.from(selectedForDelete));
                    }
                  }}
                  className={`flex-1 sm:flex-none px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm sm:text-base ${themeClasses.buttonDanger}`}
                >
                  <Trash2 className="w-4 h-4" />
                  Delete Selected ({selectedForDelete.size})
                </button>
              </div>
            )}
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <Loader2
              className={`animate-spin ${theme === "dark" ? "text-blue-400" : "text-blue-600"} w-10 h-10 sm:w-12 sm:h-12`}
            />
            <span className={`mt-4 ${themeClasses.textMuted}`}>
              Loading notifications...
            </span>
          </div>
        ) : notifications.length === 0 ? (
          <div
            className={`text-center py-12 sm:py-16 rounded-xl sm:rounded-2xl border backdrop-blur-sm transition-colors ${themeClasses.emptyState}`}
          >
            <div
              className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full mb-4 sm:mb-6 ${theme === "dark" ? "bg-slate-800" : "bg-gray-200"}`}
            >
              <Bell
                className={`${theme === "dark" ? "text-gray-500" : "text-gray-400"} w-8 h-8 sm:w-10 sm:h-10`}
              />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
              No notifications yet
            </h3>
            <p
              className={`text-sm sm:text-base max-w-md mx-auto px-4 ${themeClasses.textMuted}`}
            >
              {filter === "all"
                ? "You're all caught up! New notifications will appear here."
                : filter === "unread"
                  ? "No unread notifications at the moment."
                  : "No read notifications yet."}
            </p>
          </div>
        ) : (
          <>
            {/* Notifications Grid - 2 columns on large devices */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6">
              {notifications.map((n) => (
                <div
                  key={n._id}
                  className={`relative rounded-xl sm:rounded-2xl shadow-lg backdrop-blur-xl border transition-all duration-300 hover:shadow-xl min-w-0 break-words ${
                    n.read
                      ? `${themeClasses.card}`
                      : `${themeClasses.unreadCard}`
                  } ${selectedForDelete.has(n._id) ? "ring-2 ring-blue-500" : ""}`}
                >
                  {/* Selection checkbox */}
                  <button
                    onClick={() => toggleSelectNotification(n._id)}
                    className={`absolute top-3 left-3 z-10 w-5 h-5 sm:w-6 sm:h-6 rounded border flex items-center justify-center transition-colors ${themeClasses.checkbox}`}
                    title={
                      selectedForDelete.has(n._id)
                        ? "Deselect"
                        : "Select for bulk delete"
                    }
                  >
                    {selectedForDelete.has(n._id) && (
                      <div
                        className={`w-3 h-3 sm:w-4 sm:h-4 rounded-sm ${theme === "dark" ? "bg-blue-500" : "bg-blue-600"}`}
                      />
                    )}
                  </button>

                  <div className="p-4 sm:p-5">
                    <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                      {/* Icon */}
                      <div
                        className={`p-2 sm:p-3 rounded-lg self-start ${
                          n.priority === "high"
                            ? themeClasses.priorityHigh
                            : n.priority === "urgent"
                              ? themeClasses.priorityUrgent
                              : themeClasses.priorityNormal
                        }`}
                      >
                        <span className="text-lg sm:text-xl">
                          {getNotificationIcon(n.icon)}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 ml-0 sm:ml-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                          <div className="min-w-0 flex-1">
                            {n.title && (
                              <h3
                                className={`font-semibold text-base sm:text-lg mb-1 ${themeClasses.textSecondary}`}
                              >
                                {n.title}
                              </h3>
                            )}
                            <div
                              className={`text-xs ${themeClasses.textMuted}`}
                            >
                              {new Date(n.createdAt).toLocaleString([], {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                          </div>

                          {/* Delete button */}
                          <button
                            onClick={() => deleteNotif(n._id)}
                            disabled={deletingId === n._id}
                            className={`self-end sm:self-start p-2 rounded-lg hover:opacity-80 transition-all ${deletingId === n._id ? "animate-pulse" : ""} ${theme === "dark" ? "hover:bg-red-600/20" : "hover:bg-red-100"}`}
                            title="Delete notification"
                          >
                            <Trash2
                              className={`w-4 h-4 sm:w-5 sm:h-5 ${theme === "dark" ? "text-red-400" : "text-red-600"}`}
                            />
                          </button>
                        </div>

                        {/* Message */}
                        <div className="mb-3 sm:mb-4">
                          <p
                            className={`text-sm sm:text-base break-words whitespace-pre-wrap ${themeClasses.textSecondary}`}
                          >
                            {n.message}
                          </p>
                        </div>

                        {/* Notification Data */}
                        {n.data && Object.keys(n.data).length > 0 && (
                          <div
                            className={`mt-3 p-3 rounded-lg transition-colors ${themeClasses.dataContainer}`}
                          >
                            <div
                              className={`text-xs mb-2 font-medium ${themeClasses.textMuted}`}
                            >
                              Details:
                            </div>
                            <div className="space-y-1 max-h-40 overflow-y-auto pr-2">
                              {Object.entries(n.data).map(([key, value]) => (
                                <div
                                  key={key}
                                  className="flex flex-col xs:flex-row xs:items-center justify-between py-1 text-sm break-words"
                                >
                                  <span
                                    className={`capitalize min-w-[80px] xs:min-w-[100px] ${themeClasses.textMuted}`}
                                  >
                                    {key}:
                                  </span>
                                  <span
                                    className={`text-right break-all xs:break-words xs:text-left ${themeClasses.textSecondary}`}
                                  >
                                    {String(value)}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 mt-4 pt-4 transition-colors">
                      {/* Mark as Read button */}
                      {!n.read && (
                        <button
                          onClick={() => markRead(n._id)}
                          className={`flex-1 sm:flex-none px-3 py-2 text-sm rounded-lg transition-colors flex items-center justify-center gap-2 ${themeClasses.buttonPrimary}`}
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>Mark Read</span>
                        </button>
                      )}

                      {/* Spacer when both buttons are present */}
                      {!n.read && n.actionUrl && (
                        <div className="hidden sm:block flex-1" />
                      )}

                      {/* Action URL button */}
                      {n.actionUrl && (
                        <a
                          href={n.actionUrl}
                          className={`flex-1 sm:flex-none px-3 py-2 text-sm rounded-lg transition-colors flex items-center justify-center gap-2 ${themeClasses.buttonSecondary}`}
                          target={
                            n.actionUrl.startsWith("http") ? "_blank" : "_self"
                          }
                          rel="noopener noreferrer"
                        >
                          <span>{n.actionLabel || "View Details"}</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Stats */}
            {notifications.length > 0 && (
              <div
                className={`mt-6 sm:mt-8 p-4 rounded-xl border transition-colors ${themeClasses.bulkActions}`}
              >
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <span
                      className={`text-sm sm:text-base ${themeClasses.textMuted}`}
                    >
                      Total: {notifications.length} • Unread: {unreadCount} •
                      Read: {notifications.length - unreadCount}
                    </span>
                    {selectedForDelete.size > 0 && (
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          theme === "dark"
                            ? "bg-blue-500/20 text-blue-300"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {selectedForDelete.size} selected
                      </span>
                    )}
                  </div>

                  <div className="flex gap-3 w-full sm:w-auto">
                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            `Delete all ${notifications.length} notifications?`
                          )
                        ) {
                          const allIds = notifications.map((n) => n._id);
                          deleteMultiple(allIds);
                        }
                      }}
                      className={`flex-1 sm:flex-none px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm sm:text-base ${themeClasses.buttonDanger}`}
                    >
                      <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      Clear All
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
