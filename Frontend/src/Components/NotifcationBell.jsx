// import React, { useState, useEffect } from "react";
// import {
//   FaBell,
//   FaTrash,
//   FaCog,
//   FaBellSlash,
//   FaBell as FaBellSolid,
// } from "react-icons/fa";
// import { IoNotifications } from "react-icons/io5";
// import { motion, AnimatePresence } from "framer-motion";
// import { fetchWithAuth } from "../utils/auth";
// import { usePushNotifications } from "../hooks/UsePushNotifications";
// import "./NotificationBell.css";

// const BACKEND_URL = import.meta.env.VITE_API_URL;

// function NotificationBell() {
//   const [notifications, setNotifications] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [settingsOpen, setSettingsOpen] = useState(false);

//   const {
//     isSupported,
//     isSubscribed,
//     permission,
//     subscribe,
//     unsubscribe,
//     sendTestNotification,
//   } = usePushNotifications();

//   const fetchNotifications = async () => {
//     try {
//       const res = await fetchWithAuth(
//         `${BACKEND_URL}/api/notifications?limit=10&read=false`
//       );
//       if (!res.ok) return;
//       const data = await res.json();
//       setNotifications(data.data || []);
//     } catch (err) {
//       console.error("Notification fetch error:", err);
//     }
//   };

//   useEffect(() => {
//     fetchNotifications();
//     const interval = setInterval(fetchNotifications, 30000);
//     return () => clearInterval(interval);
//   }, []);

//   const unreadCount = notifications.filter((n) => !n.read).length;

//   const handleMarkRead = async (id) => {
//     try {
//       await fetchWithAuth(`${BACKEND_URL}/api/notifications/${id}/read`, {
//         method: "PUT",
//       });
//       setNotifications((prev) =>
//         prev.map((n) => (n._id === id ? { ...n, read: true } : n))
//       );
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleMarkAllRead = async () => {
//     try {
//       await fetchWithAuth(`${BACKEND_URL}/api/notifications/read-all`, {
//         method: "PUT",
//       });
//       setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await fetchWithAuth(`${BACKEND_URL}/api/notifications/${id}`, {
//         method: "DELETE",
//       });
//       setNotifications((prev) => prev.filter((n) => n._id !== id));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handlePushToggle = async () => {
//     setLoading(true);
//     try {
//       if (isSubscribed) {
//         await unsubscribe();
//       } else {
//         await subscribe();
//       }
//     } catch (err) {
//       console.error("Push toggle error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTestPush = async () => {
//     try {
//       await sendTestNotification();
//     } catch (err) {
//       console.error("Test push error:", err);
//     }
//   };

//   return (
//     <div className="relative">
//       {/* Notification Bell */}
//       <button
//         onClick={() => setOpen(!open)}
//         className="relative p-2 group"
//         aria-label="Notifications"
//       >
//         <div className="relative">
//           <IoNotifications className="text-2xl text-amber-500 group-hover:text-amber-400 transition-colors" />

//           {unreadCount > 0 && (
//             <motion.span
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse"
//             >
//               {unreadCount > 9 ? "9+" : unreadCount}
//             </motion.span>
//           )}
//         </div>
//       </button>

//       {/* Notification Dropdown */}
//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{ opacity: 0, y: -10, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: -10, scale: 0.95 }}
//             className="absolute right-0 mt-2 w-96 max-h-[80vh] bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden"
//           >
//             {/* Header */}
//             <div className="p-4 border-b border-slate-700 bg-slate-800/50">
//               <div className="flex items-center justify-between mb-2">
//                 <h3 className="font-bold text-white text-lg flex items-center gap-2">
//                   <IoNotifications className="text-amber-400" />
//                   Notifications
//                 </h3>
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => setSettingsOpen(!settingsOpen)}
//                     className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
//                     title="Notification settings"
//                   >
//                     <FaCog className="text-slate-400 hover:text-white" />
//                   </button>
//                   {unreadCount > 0 && (
//                     <button
//                       onClick={handleMarkAllRead}
//                       className="text-sm text-amber-400 hover:text-amber-300 transition-colors"
//                     >
//                       Mark all read
//                     </button>
//                   )}
//                 </div>
//               </div>

//               {/* Settings Panel */}
//               <AnimatePresence>
//                 {settingsOpen && isSupported && (
//                   <motion.div
//                     initial={{ height: 0, opacity: 0 }}
//                     animate={{ height: "auto", opacity: 1 }}
//                     exit={{ height: 0, opacity: 0 }}
//                     className="overflow-hidden"
//                   >
//                     <div className="mt-3 p-3 bg-slate-800/30 rounded-lg">
//                       <div className="flex items-center justify-between mb-3">
//                         <div>
//                           <p className="font-medium text-white">
//                             Push Notifications
//                           </p>
//                           <p className="text-xs text-slate-400">
//                             {permission === "granted"
//                               ? "Enabled in browser"
//                               : permission === "denied"
//                                 ? "Blocked in browser"
//                                 : "Click to enable"}
//                           </p>
//                         </div>
//                         <button
//                           onClick={handlePushToggle}
//                           disabled={loading || permission === "denied"}
//                           className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
//                             isSubscribed
//                               ? "bg-red-500/20 text-red-300 hover:bg-red-500/30"
//                               : "bg-green-500/20 text-green-300 hover:bg-green-500/30"
//                           } ${(loading || permission === "denied") && "opacity-50 cursor-not-allowed"}`}
//                         >
//                           {loading
//                             ? "..."
//                             : isSubscribed
//                               ? "Disable"
//                               : "Enable"}
//                         </button>
//                       </div>
//                       {isSubscribed && (
//                         <button
//                           onClick={handleTestPush}
//                           className="w-full py-2 text-sm bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 rounded-lg transition-colors"
//                         >
//                           Test Push Notification
//                         </button>
//                       )}
//                     </div>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>

//             {/* Notifications List */}
//             <div className="overflow-y-auto max-h-96">
//               {notifications.length === 0 ? (
//                 <div className="p-8 text-center">
//                   <div className="inline-flex p-3 rounded-full bg-slate-800/50 mb-3">
//                     <FaBellSlash className="text-3xl text-slate-600" />
//                   </div>
//                   <p className="text-slate-400">No notifications yet</p>
//                   <p className="text-sm text-slate-500 mt-1">
//                     We'll notify you when something arrives
//                   </p>
//                 </div>
//               ) : (
//                 <div className="divide-y divide-slate-800">
//                   {notifications.map((notification) => (
//                     <div
//                       key={notification._id}
//                       className={`p-4 hover:bg-slate-800/30 transition-colors ${
//                         !notification.read ? "bg-slate-800/10" : ""
//                       }`}
//                     >
//                       <div className="flex gap-3">
//                         <div
//                           className={`p-2 rounded-lg ${
//                             notification.priority === "high"
//                               ? "bg-red-500/20 text-red-300"
//                               : notification.priority === "urgent"
//                                 ? "bg-orange-500/20 text-orange-300"
//                                 : "bg-blue-500/20 text-blue-300"
//                           }`}
//                         >
//                           {notification.icon === "shopping-bag"
//                             ? "🛍️"
//                             : notification.icon === "package"
//                               ? "📦"
//                               : notification.icon === "alert-circle"
//                                 ? "⚠️"
//                                 : notification.icon === "bell"
//                                   ? "🔔"
//                                   : "📢"}
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <div className="flex justify-between items-start">
//                             <p className="font-medium text-white">
//                               {notification.title}
//                             </p>
//                             <span className="text-xs text-slate-500 ml-2 whitespace-nowrap">
//                               {notification.timeAgo || "Recently"}
//                             </span>
//                           </div>
//                           <p className="text-sm text-slate-300 mt-1">
//                             {notification.message}
//                           </p>
//                           <div className="flex items-center gap-3 mt-3">
//                             {!notification.read && (
//                               <button
//                                 onClick={() => handleMarkRead(notification._id)}
//                                 className="text-xs text-amber-400 hover:text-amber-300 transition-colors"
//                               >
//                                 Mark as read
//                               </button>
//                             )}
//                             <button
//                               onClick={() => handleDelete(notification._id)}
//                               className="text-xs text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
//                             >
//                               <FaTrash size={10} />
//                               Delete
//                             </button>
//                             {notification.actionUrl && (
//                               <a
//                                 href={notification.actionUrl}
//                                 className="text-xs text-blue-400 hover:text-blue-300 transition-colors ml-auto"
//                               >
//                                 {notification.actionLabel || "View"}
//                               </a>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Footer */}
//             <div className="p-3 border-t border-slate-700 bg-slate-800/50">
//               <a
//                 href="/notifications"
//                 className="block text-center py-2 text-sm text-slate-300 hover:text-white transition-colors"
//               >
//                 View all notifications →
//               </a>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// export default NotificationBell;
// // frontend/components/NotificationBell.jsx
// // import React, { useState, useEffect, useRef, useContext } from "react";
// // import {
// //   FaBell,
// //   FaTrash,
// //   FaCog,
// //   FaBellSlash,
// //   FaCheck,
// //   FaEnvelope,
// //   FaExclamationTriangle,
// //   FaShoppingCart,
// //   FaTruck,
// //   FaCheckCircle,
// //   FaTimesCircle,
// //   FaSync,
// // } from "react-icons/fa";
// // import { IoNotifications } from "react-icons/io5";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { fetchWithAuth } from "../utils/auth";
// // import { usePushNotifications } from "../hooks/UsePushNotifications";
// // import { authContext } from "../Context/authContext";
// // import "./NotificationBell.css";

// // const BACKEND_URL = import.meta.env.VITE_API_URL;

// // function NotificationBell() {
// //   const [notifications, setNotifications] = useState([]);
// //   const [open, setOpen] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [settingsOpen, setSettingsOpen] = useState(false);
// //   const [unreadCount, setUnreadCount] = useState(0);
// //   const [pollingInterval, setPollingInterval] = useState(null);
// //   const { user } = useContext(authContext);

// //   const {
// //     isSupported,
// //     isSubscribed,
// //     permission,
// //     subscribe,
// //     unsubscribe,
// //     sendTestNotification,
// //     vapidPublicKey,
// //   } = usePushNotifications();

// //   // Fetch notifications
// //   const fetchNotifications = async () => {
// //     if (!user) return;

// //     try {
// //       const res = await fetchWithAuth(
// //         `${BACKEND_URL}/api/notifications?limit=10`
// //       );
// //       if (!res.ok) return;

// //       const data = await res.json();
// //       if (data.success) {
// //         setNotifications(data.data || []);
// //         // Calculate unread count
// //         const unread = data.data.filter((n) => !n.read).length;
// //         setUnreadCount(unread);

// //         // Update document title if there are unread notifications
// //         if (unread > 0) {
// //           document.title = `(${unread}) ${document.title.replace(/^\(\d+\)\s*/, "")}`;
// //         } else {
// //           document.title = document.title.replace(/^\(\d+\)\s*/, "");
// //         }
// //       }
// //     } catch (err) {
// //       console.error("Notification fetch error:", err);
// //     }
// //   };

// //   // Fetch unread count separately for badge
// //   const fetchUnreadCount = async () => {
// //     if (!user) return;

// //     try {
// //       const res = await fetchWithAuth(
// //         `${BACKEND_URL}/api/notifications/unread-count`
// //       );
// //       if (!res.ok) return;

// //       const data = await res.json();
// //       if (data.success) {
// //         setUnreadCount(data.data.count || 0);

// //         // Update document title
// //         if (data.data.count > 0) {
// //           document.title = `(${data.data.count}) ${document.title.replace(/^\(\d+\)\s*/, "")}`;
// //         } else {
// //           document.title = document.title.replace(/^\(\d+\)\s*/, "");
// //         }
// //       }
// //     } catch (err) {
// //       console.error("Unread count fetch error:", err);
// //     }
// //   };

// //   // Setup WebSocket for real-time updates
// //   useEffect(() => {
// //     if (!user) return;

// //     // Setup polling for notifications
// //     fetchNotifications();
// //     fetchUnreadCount();

// //     // Poll every 30 seconds for new notifications
// //     const interval = setInterval(() => {
// //       fetchUnreadCount();
// //     }, 30000);

// //     setPollingInterval(interval);

// //     // Listen for custom notification events
// //     const handleNewNotification = (event) => {
// //       const notification = event.detail;
// //       if (notification) {
// //         setNotifications((prev) => [notification, ...prev]);
// //         setUnreadCount((prev) => prev + 1);

// //         // Show browser notification if permission granted
// //         if (Notification.permission === "granted") {
// //           new Notification(notification.title || "New Notification", {
// //             body: notification.message,
// //             icon: "/logo.png",
// //             tag: notification._id,
// //             data: { url: notification.actionUrl },
// //           });
// //         }
// //       }
// //     };

// //     window.addEventListener("new-notification", handleNewNotification);

// //     // Listen for notification read events
// //     const handleNotificationRead = (event) => {
// //       const { notificationId } = event.detail;
// //       if (notificationId) {
// //         setNotifications((prev) =>
// //           prev.map((n) => (n._id === notificationId ? { ...n, read: true } : n))
// //         );
// //         setUnreadCount((prev) => Math.max(0, prev - 1));
// //       }
// //     };

// //     window.addEventListener("notification-read", handleNotificationRead);

// //     return () => {
// //       clearInterval(interval);
// //       window.removeEventListener("new-notification", handleNewNotification);
// //       window.removeEventListener("notification-read", handleNotificationRead);
// //     };
// //   }, [user]);

// //   // Mark notification as read
// //   const handleMarkRead = async (id) => {
// //     try {
// //       await fetchWithAuth(`${BACKEND_URL}/api/notifications/${id}/read`, {
// //         method: "PUT",
// //       });

// //       // Update local state
// //       setNotifications((prev) =>
// //         prev.map((n) => (n._id === id ? { ...n, read: true } : n))
// //       );
// //       setUnreadCount((prev) => Math.max(0, prev - 1));

// //       // Trigger event
// //       window.dispatchEvent(
// //         new CustomEvent("notification-read", {
// //           detail: { notificationId: id },
// //         })
// //       );
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   const handleMarkAllRead = async () => {
// //     try {
// //       await fetchWithAuth(`${BACKEND_URL}/api/notifications/read-all`, {
// //         method: "PUT",
// //       });

// //       // Update all notifications to read
// //       setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
// //       setUnreadCount(0);
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   const handleDelete = async (id) => {
// //     try {
// //       await fetchWithAuth(`${BACKEND_URL}/api/notifications/${id}`, {
// //         method: "DELETE",
// //       });

// //       const wasUnread = notifications.find((n) => n._id === id && !n.read);
// //       setNotifications((prev) => prev.filter((n) => n._id !== id));

// //       if (wasUnread) {
// //         setUnreadCount((prev) => Math.max(0, prev - 1));
// //       }
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   const handlePushToggle = async () => {
// //     setLoading(true);
// //     try {
// //       if (isSubscribed) {
// //         await unsubscribe();
// //       } else {
// //         await subscribe();
// //       }
// //       // Refresh notifications after toggle
// //       fetchNotifications();
// //     } catch (err) {
// //       console.error("Push toggle error:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleTestPush = async () => {
// //     try {
// //       await sendTestNotification();
// //     } catch (err) {
// //       console.error("Test push error:", err);
// //     }
// //   };

// //   // Get icon for notification type
// //   const getNotificationIcon = (notification) => {
// //     switch (notification.type) {
// //       case "order":
// //       case "order_status":
// //         return notification.status === "delivered"
// //           ? FaCheckCircle
// //           : notification.status === "shipped"
// //             ? FaTruck
// //             : notification.status === "cancelled"
// //               ? FaTimesCircle
// //               : FaShoppingCart;
// //       case "admin_alert":
// //         return FaExclamationTriangle;
// //       case "payment":
// //         return FaCheckCircle;
// //       case "return_request":
// //       case "return_status":
// //         return FaSync;
// //       case "promotion":
// //         return FaEnvelope;
// //       default:
// //         return FaBell;
// //     }
// //   };

// //   // Get color for notification type
// //   const getNotificationColor = (notification) => {
// //     switch (notification.priority) {
// //       case "high":
// //       case "urgent":
// //         return "text-red-500";
// //       case "medium":
// //         return "text-amber-500";
// //       default:
// //         return "text-blue-500";
// //     }
// //   };

// //   return (
// //     <div className="relative">
// //       {/* Notification Bell */}
// //       <button
// //         onClick={() => setOpen(!open)}
// //         className="relative p-2 group"
// //         aria-label="Notifications"
// //       >
// //         <div className="relative">
// //           <IoNotifications className="text-2xl text-amber-500 group-hover:text-amber-400 transition-colors" />

// //           {unreadCount > 0 && (
// //             <motion.span
// //               initial={{ scale: 0 }}
// //               animate={{ scale: 1 }}
// //               className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse shadow-lg"
// //             >
// //               {unreadCount > 9 ? "9+" : unreadCount}
// //             </motion.span>
// //           )}
// //         </div>
// //       </button>

// //       {/* Notification Dropdown */}
// //       <AnimatePresence>
// //         {open && (
// //           <motion.div
// //             initial={{ opacity: 0, y: -10, scale: 0.95 }}
// //             animate={{ opacity: 1, y: 0, scale: 1 }}
// //             exit={{ opacity: 0, y: -10, scale: 0.95 }}
// //             className="absolute right-0 mt-2 w-96 max-h-[80vh] bg-gradient-to-b from-slate-900 to-slate-800 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden"
// //             style={{ backdropFilter: "blur(20px)" }}
// //           >
// //             {/* Header */}
// //             <div className="p-4 border-b border-slate-700 bg-slate-800/50">
// //               <div className="flex items-center justify-between mb-2">
// //                 <h3 className="font-bold text-white text-lg flex items-center gap-2">
// //                   <IoNotifications className="text-amber-400" />
// //                   Notifications
// //                   {unreadCount > 0 && (
// //                     <span className="px-2 py-0.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs rounded-full">
// //                       {unreadCount} new
// //                     </span>
// //                   )}
// //                 </h3>
// //                 <div className="flex items-center gap-2">
// //                   <button
// //                     onClick={() => setSettingsOpen(!settingsOpen)}
// //                     className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
// //                     title="Notification settings"
// //                   >
// //                     <FaCog className="text-slate-400 hover:text-white" />
// //                   </button>
// //                   {unreadCount > 0 && (
// //                     <button
// //                       onClick={handleMarkAllRead}
// //                       className="text-sm text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1"
// //                     >
// //                       <FaCheck size={12} />
// //                       Mark all read
// //                     </button>
// //                   )}
// //                 </div>
// //               </div>

// //               {/* Settings Panel */}
// //               <AnimatePresence>
// //                 {settingsOpen && isSupported && (
// //                   <motion.div
// //                     initial={{ height: 0, opacity: 0 }}
// //                     animate={{ height: "auto", opacity: 1 }}
// //                     exit={{ height: 0, opacity: 0 }}
// //                     className="overflow-hidden"
// //                   >
// //                     <div className="mt-3 p-3 bg-gradient-to-r from-slate-800/50 to-slate-900/50 rounded-lg border border-slate-700">
// //                       <div className="flex items-center justify-between mb-3">
// //                         <div>
// //                           <p className="font-medium text-white">
// //                             Push Notifications
// //                           </p>
// //                           <p className="text-xs text-slate-400">
// //                             {permission === "granted"
// //                               ? "Enabled in browser"
// //                               : permission === "denied"
// //                                 ? "Blocked in browser"
// //                                 : "Click to enable"}
// //                           </p>
// //                         </div>
// //                         <button
// //                           onClick={handlePushToggle}
// //                           disabled={loading || permission === "denied"}
// //                           className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 ${
// //                             isSubscribed
// //                               ? "bg-gradient-to-r from-red-500/80 to-red-600/80 hover:from-red-500 hover:to-red-600 text-white shadow-lg shadow-red-500/20"
// //                               : "bg-gradient-to-r from-green-500/80 to-green-600/80 hover:from-green-500 hover:to-green-600 text-white shadow-lg shadow-green-500/20"
// //                           } ${(loading || permission === "denied") && "opacity-50 cursor-not-allowed"}`}
// //                         >
// //                           {loading
// //                             ? "..."
// //                             : isSubscribed
// //                               ? "Disable"
// //                               : "Enable"}
// //                         </button>
// //                       </div>
// //                       {isSubscribed && (
// //                         <button
// //                           onClick={handleTestPush}
// //                           className="w-full py-2 text-sm bg-gradient-to-r from-blue-500/20 to-blue-600/20 hover:from-blue-500/30 hover:to-blue-600/30 text-blue-300 hover:text-white font-medium border border-blue-500/30 rounded-lg transition-all duration-300"
// //                         >
// //                           Test Push Notification
// //                         </button>
// //                       )}
// //                     </div>
// //                   </motion.div>
// //                 )}
// //               </AnimatePresence>
// //             </div>

// //             {/* Notifications List */}
// //             <div className="overflow-y-auto max-h-96">
// //               {notifications.length === 0 ? (
// //                 <div className="p-8 text-center">
// //                   <div className="inline-flex p-3 rounded-full bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-slate-700 mb-3">
// //                     <FaBellSlash className="text-3xl text-slate-600" />
// //                   </div>
// //                   <p className="text-slate-400">No notifications yet</p>
// //                   <p className="text-sm text-slate-500 mt-1">
// //                     We'll notify you when something arrives
// //                   </p>
// //                 </div>
// //               ) : (
// //                 <div className="divide-y divide-slate-800">
// //                   {notifications.map((notification) => {
// //                     const Icon = getNotificationIcon(notification);
// //                     const color = getNotificationColor(notification);

// //                     return (
// //                       <div
// //                         key={notification._id}
// //                         className={`p-4 hover:bg-gradient-to-r hover:from-slate-800/30 hover:to-slate-900/30 transition-all duration-300 ${
// //                           !notification.read
// //                             ? "bg-gradient-to-r from-amber-500/5 to-amber-600/5 border-l-2 border-amber-500"
// //                             : ""
// //                         }`}
// //                       >
// //                         <div className="flex gap-3">
// //                           <div
// //                             className={`p-2 rounded-lg ${color} bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-slate-700`}
// //                           >
// //                             <Icon className="text-lg" />
// //                           </div>
// //                           <div className="flex-1 min-w-0">
// //                             <div className="flex justify-between items-start">
// //                               <p
// //                                 className={`font-medium ${notification.read ? "text-slate-300" : "text-white"}`}
// //                               >
// //                                 {notification.title}
// //                               </p>
// //                               <span className="text-xs text-slate-500 ml-2 whitespace-nowrap">
// //                                 {notification.timeAgo ||
// //                                   new Date(
// //                                     notification.createdAt
// //                                   ).toLocaleTimeString([], {
// //                                     hour: "2-digit",
// //                                     minute: "2-digit",
// //                                   })}
// //                               </span>
// //                             </div>
// //                             <p className="text-sm text-slate-300 mt-1">
// //                               {notification.message}
// //                             </p>

// //                             {/* Notification data preview */}
// //                             {notification.data &&
// //                               Object.keys(notification.data).length > 0 && (
// //                                 <div className="mt-2 text-xs text-slate-400">
// //                                   {notification.data.orderNumber && (
// //                                     <span className="mr-3">
// //                                       Order: {notification.data.orderNumber}
// //                                     </span>
// //                                   )}
// //                                   {notification.data.total && (
// //                                     <span>
// //                                       Total: ${notification.data.total}
// //                                     </span>
// //                                   )}
// //                                 </div>
// //                               )}

// //                             <div className="flex items-center gap-3 mt-3">
// //                               {!notification.read && (
// //                                 <button
// //                                   onClick={() =>
// //                                     handleMarkRead(notification._id)
// //                                   }
// //                                   className="text-xs text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1"
// //                                 >
// //                                   <FaCheck size={10} />
// //                                   Mark as read
// //                                 </button>
// //                               )}
// //                               <button
// //                                 onClick={() => handleDelete(notification._id)}
// //                                 className="text-xs text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
// //                               >
// //                                 <FaTrash size={10} />
// //                                 Delete
// //                               </button>
// //                               {notification.actionUrl && (
// //                                 <a
// //                                   href={notification.actionUrl}
// //                                   className="text-xs text-blue-400 hover:text-blue-300 transition-colors ml-auto"
// //                                 >
// //                                   {notification.actionLabel || "View"}
// //                                 </a>
// //                               )}
// //                             </div>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     );
// //                   })}
// //                 </div>
// //               )}
// //             </div>

// //             {/* Footer */}
// //             <div className="p-3 border-t border-slate-700 bg-gradient-to-r from-slate-800/50 to-slate-900/50">
// //               <a
// //                 href="/notifications"
// //                 className="block text-center py-2 text-sm text-slate-300 hover:text-white transition-colors flex items-center justify-center gap-2"
// //                 onClick={() => setOpen(false)}
// //               >
// //                 <IoNotifications />
// //                 View all notifications →
// //               </a>
// //             </div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>
// //     </div>
// //   );
// // }

// // export default NotificationBell;
import React, { useState, useEffect, useRef, useContext } from "react";
import {
  FaBell,
  FaTrash,
  FaCog,
  FaBellSlash,
  FaCheck,
  FaEnvelope,
  FaExclamationTriangle,
  FaShoppingCart,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
  FaSync,
} from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { fetchWithAuth } from "../utils/auth";
import { usePushNotifications } from "../hooks/UsePushNotifications";
import { authContext } from "../Context/authContext";
import { initSocket } from "../utils/socket";
import "./NotificationBell.css";

const BACKEND_URL = import.meta.env.VITE_API_URL;

function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [badgeAnimation, setBadgeAnimation] = useState(false);
  const { user } = useContext(authContext);

  const socketRef = useRef(null);
  const soundRef = useRef(null);
  const mountedRef = useRef(true);

  const {
    isSupported,
    isSubscribed,
    permission,
    subscribe,
    unsubscribe,
    sendTestNotification,
  } = usePushNotifications();

  // Initialize sound
  useEffect(() => {
    soundRef.current = new Audio("/sounds/notification.mp3");
    soundRef.current.volume = 0.3;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Play notification sound
  const playNotificationSound = () => {
    if (soundRef.current) {
      soundRef.current.currentTime = 0;
      soundRef.current
        .play()
        .catch((e) => console.log("Sound play failed:", e));
    }
  };

  // Fetch notifications - EXACTLY LIKE AdminTop
  const fetchNotifications = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const res = await fetchWithAuth(
        `${BACKEND_URL}/api/notifications?limit=10&sort=-createdAt`
      );
      if (!res.ok) return;

      const data = await res.json();
      if (data.success) {
        setNotifications(data.data || []);
        const unread = data.data.filter((n) => !n.read).length;
        setUnreadCount(unread);
        updateDocumentTitle(unread);
      }
    } catch (err) {
      console.error("Notification fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Update document title
  const updateDocumentTitle = (count) => {
    const baseTitle = document.title.replace(/^\(\d+\)\s*/, "") || "Your App";
    if (count > 0) {
      document.title = `(${count}) ${baseTitle}`;
    } else {
      document.title = baseTitle;
    }
  };

  // Setup socket EXACTLY LIKE AdminTop
  useEffect(() => {
    if (!user) return;

    // Initial fetch
    fetchNotifications();

    // Setup socket connection
    try {
      const socket = initSocket();
      socketRef.current = socket;

      // Listen for new notifications - SAME AS AdminTop
      socket.on("notification", (newNotification) => {
        console.log(
          "📢 NotificationBell received notification:",
          newNotification
        );

        // Update notifications list - keep only latest 10 like AdminTop
        setNotifications((prev) => [newNotification, ...prev.slice(0, 9)]);

        // Increment unread count
        setUnreadCount((prev) => {
          const newCount = prev + 1;
          updateDocumentTitle(newCount);
          return newCount;
        });

        // Trigger badge animation
        setBadgeAnimation(true);
        playNotificationSound();
        setTimeout(() => setBadgeAnimation(false), 500);

        // Show browser notification if permission granted
        if ("Notification" in window && Notification.permission === "granted") {
          try {
            new Notification(newNotification.title || "New Notification", {
              body: newNotification.message,
              icon: "/logo.png",
              badge: "/logo.png",
              tag: newNotification._id || Date.now().toString(),
              requireInteraction: false,
            });
          } catch (notificationError) {
            console.log("Browser notification error:", notificationError);
          }
        }
      });

      // Join user room
      if (user._id) {
        socket.emit("join", user._id);
        console.log(
          `👤 User ${user._id} joined socket room in NotificationBell`
        );
      }
    } catch (error) {
      console.error("Socket setup error:", error);
    }

    // Setup polling interval (every 30 seconds) as fallback
    const pollingInterval = setInterval(() => {
      if (mountedRef.current && user) {
        fetchNotifications();
      }
    }, 30000);

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      clearInterval(pollingInterval);
    };
  }, [user]);

  // Mark notification as read
  const handleMarkRead = async (id) => {
    try {
      await fetchWithAuth(`${BACKEND_URL}/api/notifications/${id}/read`, {
        method: "PUT",
      });

      // Update local state
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
      setUnreadCount((prev) => {
        const newCount = Math.max(0, prev - 1);
        updateDocumentTitle(newCount);
        return newCount;
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await fetchWithAuth(`${BACKEND_URL}/api/notifications/read-all`, {
        method: "PUT",
      });

      // Update all notifications to read
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);
      updateDocumentTitle(0);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      const wasUnread = notifications.find((n) => n._id === id && !n.read);

      await fetchWithAuth(`${BACKEND_URL}/api/notifications/${id}`, {
        method: "DELETE",
      });

      setNotifications((prev) => prev.filter((n) => n._id !== id));

      if (wasUnread) {
        setUnreadCount((prev) => {
          const newCount = Math.max(0, prev - 1);
          updateDocumentTitle(newCount);
          return newCount;
        });
      }
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

  // Format time like AdminTop
  const formatTime = (dateString) => {
    if (!dateString) return "Just now";
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  // Get notification icon like AdminTop but with React Icons
  const getNotificationIcon = (notification) => {
    const type = notification.type?.toLowerCase() || "";

    switch (type) {
      case "order":
        return FaShoppingCart;
      case "user":
        return FaEnvelope;
      case "product":
        return FaTruck;
      case "payment":
        return FaCheckCircle;
      case "return":
        return FaSync;
      case "admin_alert":
      case "alert":
        return FaExclamationTriangle;
      default:
        return FaBell;
    }
  };

  // Get notification color
  const getNotificationColor = (notification) => {
    if (notification.read) return "text-slate-500";

    switch (notification.priority?.toLowerCase()) {
      case "high":
      case "urgent":
        return "text-red-500";
      case "medium":
        return "text-amber-500";
      default:
        return "text-blue-500";
    }
  };

  // Get notification emoji icon like AdminTop
  const getNotificationEmoji = (type) => {
    switch (type?.toLowerCase()) {
      case "order":
        return "🛒";
      case "user":
        return "👤";
      case "product":
        return "📦";
      case "payment":
        return "💰";
      case "return":
        return "🔄";
      default:
        return "🔔";
    }
  };

  return (
    <div className="relative">
      {/* Notification Bell with Badge - LIKE AdminTop */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 group"
        aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ""}`}
      >
        <div className="relative">
          <IoNotifications className="text-2xl text-amber-500 group-hover:text-amber-400 transition-colors" />

          {/* Badge - EXACTLY LIKE AdminTop */}
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse shadow-lg">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}

          {/* Ping animation for new notifications */}
          {badgeAnimation && (
            <span className="absolute -top-1 -right-1 flex h-6 w-6">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            </span>
          )}
        </div>
      </button>

      {/* Notification Dropdown */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute right-0 mt-2 w-96 max-h-[80vh] bg-gradient-to-b from-slate-900 to-slate-800 border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden"
              style={{ backdropFilter: "blur(20px)" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header - LIKE AdminTop */}
              <div className="p-4 border-b border-slate-700 bg-slate-800/50">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold text-white">Notifications</h3>
                    <p className="text-sm text-slate-400">
                      {unreadCount} unread{" "}
                      {unreadCount === 1 ? "notification" : "notifications"}
                    </p>
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={handleMarkAllRead}
                      className="text-sm text-green-400 hover:text-green-300 px-3 py-1 bg-green-900/20 rounded-lg"
                    >
                      Mark all read
                    </button>
                  )}
                </div>
              </div>

              {/* Notifications List */}
              <div className="overflow-y-auto max-h-96">
                {loading ? (
                  <div className="p-8 text-center">
                    <div className="w-8 h-8 border-2 border-slate-600 border-t-green-500 rounded-full animate-spin mx-auto mb-3"></div>
                    <p className="text-slate-400">Loading notifications...</p>
                  </div>
                ) : notifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <div className="inline-flex p-3 rounded-full bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-slate-700 mb-3">
                      <FaBellSlash className="text-3xl text-slate-600" />
                    </div>
                    <p className="text-slate-400">No notifications yet</p>
                    <p className="text-sm text-slate-500 mt-1">
                      New notifications will appear here
                    </p>
                  </div>
                ) : (
                  notifications.map((notification) => {
                    const Icon = getNotificationIcon(notification);
                    const color = getNotificationColor(notification);
                    const emoji = getNotificationEmoji(notification.type);

                    return (
                      <div
                        key={notification._id}
                        className={`p-4 border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors ${
                          !notification.read ? "bg-slate-700/20" : ""
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          {/* Emoji like AdminTop */}
                          <div className="text-xl flex-shrink-0">{emoji}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <h4 className="font-medium text-white text-sm break-words">
                                {notification.title || "Notification"}
                              </h4>
                              {!notification.read && (
                                <button
                                  onClick={() =>
                                    handleMarkRead(notification._id)
                                  }
                                  className="ml-2 text-xs text-green-400 hover:text-green-300 flex-shrink-0 flex items-center gap-1"
                                >
                                  <FaCheck size={10} />
                                  Mark read
                                </button>
                              )}
                            </div>
                            <p className="text-sm text-slate-300 mt-1 break-words">
                              {notification.message}
                            </p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-xs text-slate-400">
                                {formatTime(notification.createdAt)}
                              </span>
                              {notification.actionUrl && (
                                <a
                                  href={notification.actionUrl}
                                  className="text-xs text-green-400 hover:text-green-300"
                                  onClick={() => setOpen(false)}
                                >
                                  View →
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Footer - LIKE AdminTop */}
              <div className="p-4 border-t border-slate-700">
                <a
                  href="/notifications"
                  className="block text-center text-green-400 hover:text-green-300 text-sm font-medium"
                  onClick={() => setOpen(false)}
                >
                  View all notifications
                </a>
              </div>
            </motion.div>

            {/* Click outside to close */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default NotificationBell;
