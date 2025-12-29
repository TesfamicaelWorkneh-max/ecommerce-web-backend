// import React, { useState, useEffect, useRef } from "react";
// import {
//   FaBars,
//   FaBell,
//   FaUser,
//   FaSun,
//   FaMoon,
//   FaTimes,
//   FaKey,
//   FaSave,
//   FaTrash,
//   FaUserCircle,
// } from "react-icons/fa";
// import { Search, Settings, HelpCircle, CheckCircle, Bell } from "lucide-react";
// import { fetchWithAuth } from "../utils/auth";
// import { initSocket } from "../utils/socket";

// const BACKEND_URL = import.meta.env.VITE_API_URL;

// const AdminTop = ({
//   setMobileOpen,
//   pageTitle,
//   collapsed,
//   setCollapsed,
//   isMobile,
// }) => {
//   const [open, setOpen] = useState(false);
//   const [darkMode, setDarkMode] = useState(true);
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [showProfileModal, setShowProfileModal] = useState(false);
//   const [profileForm, setProfileForm] = useState({
//     name: "",
//     email: "",
//     bio: "",
//     avatar: "",
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });
//   const [profileLoading, setProfileLoading] = useState(false);
//   const [profileError, setProfileError] = useState("");
//   const [profileSuccess, setProfileSuccess] = useState("");
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [deletePassword, setDeletePassword] = useState("");

//   const socketRef = useRef(null);
//   const profileModalRef = useRef(null);

//   const user = JSON.parse(localStorage.getItem("user")) || {
//     name: "Administrator",
//     email: "admin@example.com",
//     avatar: "",
//     role: "admin",
//   };

//   useEffect(() => {
//     fetchNotifications();
//     setupSocket();

//     // Initialize profile form
//     setProfileForm({
//       name: user.name || "",
//       email: user.email || "",
//       bio: user.bio || "",
//       avatar: user.avatar || "",
//       currentPassword: "",
//       newPassword: "",
//       confirmPassword: "",
//     });

//     return () => {
//       if (socketRef.current) {
//         socketRef.current.disconnect();
//       }
//     };
//   }, []);

//   // Close modals when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         profileModalRef.current &&
//         !profileModalRef.current.contains(event.target)
//       ) {
//         setShowProfileModal(false);
//         setShowDeleteConfirm(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const fetchNotifications = async () => {
//     try {
//       setLoading(true);
//       const res = await fetchWithAuth(
//         `${BACKEND_URL}/api/notifications?limit=10`
//       );
//       const data = await res.json();
//       if (data.success) {
//         setNotifications(data.data || []);
//         setUnreadCount(data.data?.filter((n) => !n.read).length || 0);
//       }
//     } catch (err) {
//       console.error("Failed to fetch notifications:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const setupSocket = () => {
//     try {
//       const socket = initSocket();
//       socketRef.current = socket;

//       socket.on("notification", (newNotification) => {
//         setNotifications((prev) => [newNotification, ...prev.slice(0, 9)]);
//         setUnreadCount((prev) => prev + 1);

//         try {
//           const audio = new Audio("/sounds/notification.mp3");
//           audio.volume = 0.5;
//           audio.play().catch(() => {});
//         } catch (e) {}
//       });
//     } catch (error) {
//       console.error("Socket setup error:", error);
//     }
//   };

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//     document.documentElement.classList.toggle("dark");
//   };

//   const handleProfileChange = (e) => {
//     const { name, value } = e.target;
//     setProfileForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     setProfileError("");
//     setProfileSuccess("");
//   };

//   const validateProfileForm = () => {
//     if (profileForm.newPassword && profileForm.newPassword.length < 6) {
//       setProfileError("New password must be at least 6 characters");
//       return false;
//     }

//     if (
//       profileForm.newPassword &&
//       profileForm.newPassword !== profileForm.confirmPassword
//     ) {
//       setProfileError("New passwords do not match");
//       return false;
//     }

//     return true;
//   };

//   const handleProfileSubmit = async (e) => {
//     e.preventDefault();
//     setProfileError("");
//     setProfileSuccess("");

//     if (!validateProfileForm()) return;

//     setProfileLoading(true);

//     try {
//       const updateData = {
//         name: profileForm.name,
//         email: profileForm.email,
//         bio: profileForm.bio,
//         avatar: profileForm.avatar,
//       };

//       if (profileForm.currentPassword && profileForm.newPassword) {
//         updateData.currentPassword = profileForm.currentPassword;
//         updateData.newPassword = profileForm.newPassword;
//       }

//       const res = await fetchWithAuth(`${BACKEND_URL}/api/users/profile`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updateData),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         throw new Error(data.message || "Failed to update profile");
//       }

//       // Update user in localStorage
//       const updatedUser = { ...user, ...data.user };
//       localStorage.setItem("user", JSON.stringify(updatedUser));

//       setProfileSuccess("Profile updated successfully!");

//       // Clear password fields
//       setProfileForm((prev) => ({
//         ...prev,
//         currentPassword: "",
//         newPassword: "",
//         confirmPassword: "",
//       }));

//       setTimeout(() => setProfileSuccess(""), 3000);
//     } catch (err) {
//       setProfileError(err.message || "Failed to update profile");
//     } finally {
//       setProfileLoading(false);
//     }
//   };

//   const handleDeleteAccount = async () => {
//     if (!deletePassword.trim()) {
//       setProfileError("Please enter your password to confirm account deletion");
//       return;
//     }

//     setProfileLoading(true);

//     try {
//       const res = await fetchWithAuth(`${BACKEND_URL}/api/users/profile`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ password: deletePassword }),
//       });

//       if (!res.ok) {
//         const data = await res.json();
//         throw new Error(data.message || "Failed to delete account");
//       }

//       // Logout and redirect
//       localStorage.removeItem("user");
//       localStorage.removeItem("token");
//       sessionStorage.clear();
//       window.location.href = "/login";
//     } catch (err) {
//       setProfileError(err.message || "Failed to delete account");
//       setProfileLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     sessionStorage.clear();
//     window.location.href = "/login";
//   };

//   const handleMarkAsRead = async (id) => {
//     try {
//       await fetchWithAuth(`${BACKEND_URL}/api/notifications/${id}/read`, {
//         method: "PUT",
//       });

//       setNotifications((prev) =>
//         prev.map((n) => (n._id === id ? { ...n, read: true } : n))
//       );
//       setUnreadCount((prev) => Math.max(0, prev - 1));
//     } catch (err) {
//       console.error("Failed to mark as read:", err);
//     }
//   };

//   const handleMarkAllRead = async () => {
//     try {
//       await fetchWithAuth(`${BACKEND_URL}/api/notifications/read-all`, {
//         method: "PUT",
//       });

//       setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
//       setUnreadCount(0);
//     } catch (err) {
//       console.error("Failed to mark all as read:", err);
//     }
//   };

//   const formatTime = (dateString) => {
//     if (!dateString) return "Just now";
//     const date = new Date(dateString);
//     const now = new Date();
//     const diffInMinutes = Math.floor((now - date) / (1000 * 60));

//     if (diffInMinutes < 1) return "Just now";
//     if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
//     if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
//     return `${Math.floor(diffInMinutes / 1440)}d ago`;
//   };

//   const getNotificationIcon = (type) => {
//     switch (type) {
//       case "order":
//         return "🛒";
//       case "user":
//         return "👤";
//       case "product":
//         return "📦";
//       case "payment":
//         return "💰";
//       default:
//         return "🔔";
//     }
//   };

//   return (
//     <>
//       <div className="bg-slate-800/90 backdrop-blur-md border-b border-slate-700/50 shadow-lg">
//         <div className="px-4 md:px-6 py-3">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={() => setMobileOpen(true)}
//                 className="md:hidden p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
//                 aria-label="Open menu"
//               >
//                 <FaBars size={20} />
//               </button>

//               <button
//                 onClick={() => setCollapsed(!collapsed)}
//                 className="hidden md:flex p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
//                 aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
//               >
//                 <FaBars size={18} />
//               </button>

//               <div className="hidden md:block relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   placeholder="Search users, products, orders..."
//                   className="pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-64"
//                 />
//               </div>
//             </div>

//             <div className="flex items-center space-x-3">
//               <button
//                 onClick={toggleDarkMode}
//                 className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
//                 aria-label="Toggle theme"
//               >
//                 {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
//               </button>

//               <button
//                 className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
//                 aria-label="Help"
//               >
//                 <HelpCircle className="w-5 h-5" />
//               </button>

//               <button
//                 className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
//                 aria-label="Settings"
//               >
//                 <Settings className="w-5 h-5" />
//               </button>

//               <div className="relative">
//                 <button
//                   onClick={() =>
//                     setOpen(open === "notifications" ? null : "notifications")
//                   }
//                   className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white transition-all relative"
//                   aria-label="Notifications"
//                 >
//                   <Bell className="w-5 h-5" />
//                   {unreadCount > 0 && (
//                     <span className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
//                       {unreadCount > 9 ? "9+" : unreadCount}
//                     </span>
//                   )}
//                 </button>

//                 {open === "notifications" && (
//                   <div className="absolute right-0 mt-2 w-96 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 max-h-[80vh] overflow-hidden">
//                     <div className="p-4 border-b border-slate-700">
//                       <div className="flex justify-between items-center">
//                         <div>
//                           <h3 className="font-semibold text-white">
//                             Notifications
//                           </h3>
//                           <p className="text-sm text-slate-400">
//                             {unreadCount} unread{" "}
//                             {unreadCount === 1
//                               ? "notification"
//                               : "notifications"}
//                           </p>
//                         </div>
//                         {unreadCount > 0 && (
//                           <button
//                             onClick={handleMarkAllRead}
//                             className="text-sm text-green-400 hover:text-green-300 px-3 py-1 bg-green-900/20 rounded-lg"
//                           >
//                             Mark all read
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                     <div className="overflow-y-auto max-h-96">
//                       {loading ? (
//                         <div className="p-8 text-center">
//                           <div className="w-8 h-8 border-2 border-slate-600 border-t-green-500 rounded-full animate-spin mx-auto mb-3"></div>
//                           <p className="text-slate-400">
//                             Loading notifications...
//                           </p>
//                         </div>
//                       ) : notifications.length === 0 ? (
//                         <div className="p-8 text-center">
//                           <Bell className="w-12 h-12 text-slate-600 mx-auto mb-3" />
//                           <p className="text-slate-400">No notifications yet</p>
//                           <p className="text-sm text-slate-500 mt-1">
//                             New notifications will appear here
//                           </p>
//                         </div>
//                       ) : (
//                         notifications.map((notification) => (
//                           <div
//                             key={notification._id}
//                             className={`p-4 border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors ${
//                               !notification.read ? "bg-slate-700/20" : ""
//                             }`}
//                           >
//                             <div className="flex items-start space-x-3">
//                               <div className="text-xl">
//                                 {getNotificationIcon(notification.type)}
//                               </div>
//                               <div className="flex-1 min-w-0">
//                                 <div className="flex items-start justify-between">
//                                   <h4 className="font-medium text-white text-sm">
//                                     {notification.title || "Notification"}
//                                   </h4>
//                                   <button
//                                     onClick={() =>
//                                       handleMarkAsRead(notification._id)
//                                     }
//                                     className="ml-2 text-xs text-green-400 hover:text-green-300 opacity-0 group-hover:opacity-100 transition-opacity"
//                                   >
//                                     <CheckCircle size={14} />
//                                   </button>
//                                 </div>
//                                 <p className="text-sm text-slate-300 mt-1">
//                                   {notification.message}
//                                 </p>
//                                 <div className="flex items-center justify-between mt-2">
//                                   <span className="text-xs text-slate-400">
//                                     {formatTime(notification.createdAt)}
//                                   </span>
//                                   {notification.actionUrl && (
//                                     <a
//                                       href={notification.actionUrl}
//                                       className="text-xs text-green-400 hover:text-green-300"
//                                     >
//                                       View →
//                                     </a>
//                                   )}
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         ))
//                       )}
//                     </div>
//                     <div className="p-4 border-t border-slate-700">
//                       <a
//                         href="/admin/notifications"
//                         className="block text-center text-green-400 hover:text-green-300 text-sm font-medium"
//                       >
//                         View all notifications
//                       </a>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div className="relative">
//                 <button
//                   onClick={() => setOpen(open === "user" ? null : "user")}
//                   className="flex items-center space-x-3 p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-all"
//                   aria-label="User menu"
//                 >
//                   {user.avatar ? (
//                     <img
//                       src={user.avatar}
//                       alt={user.name}
//                       className="w-8 h-8 rounded-full border-2 border-slate-600"
//                     />
//                   ) : (
//                     <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
//                       <span className="text-white font-bold text-sm">
//                         {user.name.charAt(0)}
//                       </span>
//                     </div>
//                   )}
//                   <div className="hidden md:block text-left">
//                     <div className="text-sm font-medium text-white">
//                       {user.name}
//                     </div>
//                     <div className="text-xs text-slate-400">
//                       {user.role || "Administrator"}
//                     </div>
//                   </div>
//                   <svg
//                     className={`w-4 h-4 text-slate-400 transition-transform ${
//                       open === "user" ? "rotate-180" : ""
//                     }`}
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M19 9l-7 7-7-7"
//                     />
//                   </svg>
//                 </button>

//                 {open === "user" && (
//                   <div className="absolute right-0 mt-2 w-64 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50">
//                     <div className="p-4 border-b border-slate-700">
//                       <div className="flex items-center space-x-3">
//                         {user.avatar ? (
//                           <img
//                             src={user.avatar}
//                             alt={user.name}
//                             className="w-10 h-10 rounded-full border-2 border-slate-600"
//                           />
//                         ) : (
//                           <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
//                             <span className="text-white font-bold">
//                               {user.name.charAt(0)}
//                             </span>
//                           </div>
//                         )}
//                         <div>
//                           <h4 className="font-semibold text-white">
//                             {user.name}
//                           </h4>
//                           <p className="text-sm text-slate-400">{user.email}</p>
//                           <div className="text-xs text-green-400 font-semibold mt-1">
//                             Administrator
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="p-2">
//                       <button
//                         onClick={() => {
//                           setShowProfileModal(true);
//                           setOpen(null);
//                         }}
//                         className="w-full flex items-center space-x-3 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors text-left"
//                       >
//                         <FaUser className="w-5 h-5" />
//                         <span>My Profile</span>
//                       </button>
//                       <a
//                         href="/settings"
//                         className="flex items-center space-x-3 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
//                       >
//                         <Settings className="w-5 h-5" />
//                         <span>Settings</span>
//                       </a>
//                       <a
//                         href="/help"
//                         className="flex items-center space-x-3 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
//                       >
//                         <HelpCircle className="w-5 h-5" />
//                         <span>Help & Support</span>
//                       </a>
//                     </div>
//                     <div className="p-2 border-t border-slate-700">
//                       <button
//                         onClick={handleLogout}
//                         className="flex items-center space-x-3 w-full px-3 py-2 text-rose-400 hover:text-rose-300 hover:bg-rose-900/20 rounded-lg transition-colors"
//                       >
//                         <svg
//                           className="w-5 h-5"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                           xmlns="http://www.w3.org/2000/svg"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
//                           />
//                         </svg>
//                         <span>Logout</span>
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="md:hidden mt-4">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
//               />
//             </div>
//           </div>
//         </div>

//         {open && (
//           <div className="fixed inset-0 z-40" onClick={() => setOpen(null)} />
//         )}
//       </div>

//       {/* Admin Profile Modal */}
//       {showProfileModal && (
//         <>
//           <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]" />

//           <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
//             <div
//               ref={profileModalRef}
//               className="w-full max-w-2xl bg-gradient-to-b from-slate-900 to-slate-800 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden max-h-[90vh] overflow-y-auto"
//             >
//               <div className="p-6 border-b border-slate-700 bg-gradient-to-r from-green-600/10 to-emerald-600/10">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <FaUserCircle className="text-3xl text-green-500" />
//                     <div>
//                       <h2 className="text-2xl font-bold text-white">
//                         Admin Profile
//                       </h2>
//                       <p className="text-slate-400">
//                         Manage your administrator account
//                       </p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => setShowProfileModal(false)}
//                     className="p-2 hover:bg-slate-800 rounded-xl transition-colors"
//                   >
//                     <FaTimes className="text-slate-400 text-xl" />
//                   </button>
//                 </div>
//               </div>

//               <div className="p-6">
//                 {profileSuccess && (
//                   <div className="mb-6 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl">
//                     <p className="text-green-400 text-center">
//                       {profileSuccess}
//                     </p>
//                   </div>
//                 )}

//                 {profileError && (
//                   <div className="mb-6 p-4 bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/20 rounded-xl">
//                     <p className="text-red-400 text-center">{profileError}</p>
//                   </div>
//                 )}

//                 <div className="grid md:grid-cols-3 gap-6">
//                   <div className="md:col-span-1">
//                     <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
//                       <div className="flex flex-col items-center">
//                         <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center mb-4">
//                           {user.avatar ? (
//                             <img
//                               src={user.avatar}
//                               alt={user.name}
//                               className="w-24 h-24 rounded-full object-cover"
//                             />
//                           ) : (
//                             <span className="text-white text-2xl font-bold">
//                               {user.name?.charAt(0)?.toUpperCase() || "A"}
//                             </span>
//                           )}
//                         </div>

//                         <h3 className="text-xl font-bold text-white mb-1">
//                           {user.name || "Admin"}
//                         </h3>
//                         <p className="text-slate-400 mb-4">{user.email}</p>

//                         <div className="w-full bg-slate-700/50 rounded-lg p-3 mt-4">
//                           <h4 className="text-white font-semibold mb-2">
//                             Admin Status
//                           </h4>
//                           <div className="flex items-center justify-between mb-2">
//                             <span className="text-slate-400">Role</span>
//                             <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400">
//                               Administrator
//                             </span>
//                           </div>
//                           <div className="flex items-center justify-between">
//                             <span className="text-slate-400">Verified</span>
//                             <span
//                               className={`px-2 py-1 rounded-full text-xs font-semibold ${user.isVerified ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}
//                             >
//                               {user.isVerified ? "Yes" : "No"}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="md:col-span-2">
//                     <form onSubmit={handleProfileSubmit} className="space-y-6">
//                       <div className="space-y-4">
//                         <h3 className="text-lg font-semibold text-white flex items-center gap-2">
//                           <FaUser className="text-green-500" />
//                           Admin Information
//                         </h3>

//                         <div>
//                           <label className="block text-slate-300 mb-2">
//                             Full Name
//                           </label>
//                           <input
//                             type="text"
//                             name="name"
//                             value={profileForm.name}
//                             onChange={handleProfileChange}
//                             className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300"
//                             required
//                           />
//                         </div>

//                         <div>
//                           <label className="block text-slate-300 mb-2">
//                             Email Address
//                           </label>
//                           <input
//                             type="email"
//                             name="email"
//                             value={profileForm.email}
//                             onChange={handleProfileChange}
//                             className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300"
//                             required
//                           />
//                         </div>

//                         <div>
//                           <label className="block text-slate-300 mb-2">
//                             Bio
//                           </label>
//                           <textarea
//                             name="bio"
//                             value={profileForm.bio}
//                             onChange={handleProfileChange}
//                             rows="2"
//                             className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300"
//                             placeholder="About yourself..."
//                           />
//                         </div>

//                         <div>
//                           <label className="block text-slate-300 mb-2">
//                             Avatar URL
//                           </label>
//                           <input
//                             type="url"
//                             name="avatar"
//                             value={profileForm.avatar}
//                             onChange={handleProfileChange}
//                             className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300"
//                             placeholder="https://example.com/avatar.jpg"
//                           />
//                         </div>
//                       </div>

//                       <div className="space-y-4 pt-6 border-t border-slate-700">
//                         <h3 className="text-lg font-semibold text-white flex items-center gap-2">
//                           <FaKey className="text-green-500" />
//                           Change Password
//                         </h3>

//                         <div>
//                           <label className="block text-slate-300 mb-2">
//                             Current Password
//                           </label>
//                           <input
//                             type="password"
//                             name="currentPassword"
//                             value={profileForm.currentPassword}
//                             onChange={handleProfileChange}
//                             className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300"
//                             placeholder="Leave blank to keep current password"
//                           />
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           <div>
//                             <label className="block text-slate-300 mb-2">
//                               New Password
//                             </label>
//                             <input
//                               type="password"
//                               name="newPassword"
//                               value={profileForm.newPassword}
//                               onChange={handleProfileChange}
//                               className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300"
//                               placeholder="At least 6 characters"
//                             />
//                           </div>

//                           <div>
//                             <label className="block text-slate-300 mb-2">
//                               Confirm Password
//                             </label>
//                             <input
//                               type="password"
//                               name="confirmPassword"
//                               value={profileForm.confirmPassword}
//                               onChange={handleProfileChange}
//                               className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300"
//                               placeholder="Confirm new password"
//                             />
//                           </div>
//                         </div>
//                       </div>

//                       <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-700">
//                         <button
//                           type="submit"
//                           disabled={profileLoading}
//                           className="flex-1 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
//                         >
//                           {profileLoading ? (
//                             "Saving..."
//                           ) : (
//                             <>
//                               <FaSave />
//                               Save Changes
//                             </>
//                           )}
//                         </button>

//                         <button
//                           type="button"
//                           onClick={() => setShowDeleteConfirm(true)}
//                           className="py-3 px-6 bg-gradient-to-r from-rose-600/10 to-pink-600/10 border border-rose-500/20 text-rose-400 hover:text-rose-300 hover:from-rose-600/20 hover:to-pink-600/20 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
//                         >
//                           <FaTrash />
//                           Delete Account
//                         </button>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}

//       {/* Delete Confirmation Modal */}
//       {showDeleteConfirm && (
//         <>
//           <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[102]" />

//           <div className="fixed inset-0 z-[103] flex items-center justify-center p-4">
//             <div className="w-full max-w-md bg-gradient-to-b from-slate-900 to-slate-800 rounded-2xl shadow-2xl border border-slate-700 p-6">
//               <div className="text-center">
//                 <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-rose-600/20 to-pink-600/20 flex items-center justify-center">
//                   <FaTrash className="text-rose-500 text-2xl" />
//                 </div>

//                 <h3 className="text-2xl font-bold text-white mb-2">
//                   Delete Admin Account
//                 </h3>
//                 <p className="text-slate-400 mb-6">
//                   This action cannot be undone. All your data will be
//                   permanently removed.
//                 </p>

//                 <div className="mb-6">
//                   <label className="block text-slate-300 mb-2 text-left">
//                     Enter your password to confirm:
//                   </label>
//                   <input
//                     type="password"
//                     value={deletePassword}
//                     onChange={(e) => setDeletePassword(e.target.value)}
//                     className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500/50 transition-all duration-300"
//                     placeholder="Your password"
//                   />
//                 </div>

//                 <div className="flex gap-4">
//                   <button
//                     onClick={() => setShowDeleteConfirm(false)}
//                     className="flex-1 py-3 bg-slate-700 text-white rounded-xl font-semibold hover:bg-slate-600 transition-all duration-300"
//                   >
//                     Cancel
//                   </button>

//                   <button
//                     onClick={handleDeleteAccount}
//                     disabled={profileLoading}
//                     className="flex-1 py-3 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-rose-500/25 transition-all duration-300 disabled:opacity-50"
//                   >
//                     {profileLoading ? "Deleting..." : "Delete Account"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// };

// export default AdminTop;import React, { useState, useEffect, useRef } from "react";
import {
  FaBars,
  FaBell,
  FaUser,
  FaSun,
  FaMoon,
  FaTimes,
  FaKey,
  FaSave,
  FaTrash,
  FaUserCircle,
  FaEnvelope,
  FaCamera,
  FaCheck,
} from "react-icons/fa";
import { Search, Settings, HelpCircle, CheckCircle, Bell } from "lucide-react";
import { fetchWithAuth } from "../utils/auth";
import { initSocket } from "../utils/socket";
import { useState, useEffect, useRef } from "react";
const BACKEND_URL = import.meta.env.VITE_API_URL;

const AdminTop = ({
  setMobileOpen,
  pageTitle,
  collapsed,
  setCollapsed,
  isMobile,
}) => {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    bio: "",
    avatar: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState("");
  const [profileSuccess, setProfileSuccess] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");

  const socketRef = useRef(null);
  const profileModalRef = useRef(null);
  const dropdownRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "Administrator",
    email: "admin@example.com",
    avatar: "",
    role: "admin",
    isVerified: true,
  };

  useEffect(() => {
    fetchNotifications();
    setupSocket();

    // Initialize profile form
    const userData = JSON.parse(localStorage.getItem("user")) || {};
    setProfileForm({
      name: userData.name || "",
      email: userData.email || "",
      bio: userData.bio || "",
      avatar: userData.avatar || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Handle profile dropdown
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        open === "user"
      ) {
        setOpen(null);
      }

      // Handle modals
      if (
        profileModalRef.current &&
        !profileModalRef.current.contains(event.target) &&
        (showProfileModal || showDeleteConfirm)
      ) {
        setShowProfileModal(false);
        setShowDeleteConfirm(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, showProfileModal, showDeleteConfirm]);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await fetchWithAuth(
        `${BACKEND_URL}/api/notifications?limit=10`
      );
      const data = await res.json();
      if (data.success) {
        setNotifications(data.data || []);
        setUnreadCount(data.data ? data.data.filter((n) => !n.read).length : 0);
      }
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  const setupSocket = () => {
    try {
      const socket = initSocket();
      socketRef.current = socket;

      socket.on("notification", (newNotification) => {
        setNotifications((prev) => [newNotification, ...prev.slice(0, 9)]);
        setUnreadCount((prev) => prev + 1);

        try {
          const audio = new Audio("/sounds/notification.mp3");
          audio.volume = 0.5;
          audio.play().catch(() => {});
        } catch (e) {
          console.log("Audio play failed:", e);
        }
      });
    } catch (error) {
      console.error("Socket setup error:", error);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    setProfileError("");
    setProfileSuccess("");
  };

  const validateProfileForm = () => {
    if (profileForm.newPassword && profileForm.newPassword.length < 6) {
      setProfileError("New password must be at least 6 characters");
      return false;
    }

    if (
      profileForm.newPassword &&
      profileForm.newPassword !== profileForm.confirmPassword
    ) {
      setProfileError("New passwords do not match");
      return false;
    }

    return true;
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileError("");
    setProfileSuccess("");

    if (!validateProfileForm()) return;

    setProfileLoading(true);

    try {
      const updateData = {
        name: profileForm.name,
        email: profileForm.email,
        bio: profileForm.bio,
        avatar: profileForm.avatar,
      };

      if (profileForm.currentPassword && profileForm.newPassword) {
        updateData.currentPassword = profileForm.currentPassword;
        updateData.newPassword = profileForm.newPassword;
      }

      const res = await fetchWithAuth(`${BACKEND_URL}/api/users/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      // Update user in localStorage
      const updatedUser = { ...user, ...data.user };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setProfileSuccess("Profile updated successfully!");

      // Clear password fields
      setProfileForm((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));

      setTimeout(() => setProfileSuccess(""), 3000);
    } catch (err) {
      setProfileError(err.message || "Failed to update profile");
    } finally {
      setProfileLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword.trim()) {
      setProfileError("Please enter your password to confirm account deletion");
      return;
    }

    setProfileLoading(true);

    try {
      const res = await fetchWithAuth(`${BACKEND_URL}/api/users/profile`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: deletePassword }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to delete account");
      }

      // Logout and redirect
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      sessionStorage.clear();
      window.location.href = "/login";
    } catch (err) {
      setProfileError(err.message || "Failed to delete account");
      setProfileLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.clear();
    window.location.href = "/login";
  };

  const handleMarkAsRead = async (id) => {
    try {
      await fetchWithAuth(`${BACKEND_URL}/api/notifications/${id}/read`, {
        method: "PUT",
      });

      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, read: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (err) {
      console.error("Failed to mark as read:", err);
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await fetchWithAuth(`${BACKEND_URL}/api/notifications/read-all`, {
        method: "PUT",
      });

      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error("Failed to mark all as read:", err);
    }
  };

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

  const getNotificationIcon = (type) => {
    switch (type) {
      case "order":
        return "🛒";
      case "user":
        return "👤";
      case "product":
        return "📦";
      case "payment":
        return "💰";
      default:
        return "🔔";
    }
  };

  const handleImageError = (e) => {
    e.target.style.display = "none";
    const fallback = e.target.parentElement.querySelector(".avatar-fallback");
    if (fallback) {
      fallback.style.display = "flex";
    }
  };

  return (
    <>
      <div className="bg-slate-800/90 backdrop-blur-md border-b border-slate-700/50 shadow-lg">
        <div className="px-4 md:px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
                aria-label="Open menu"
              >
                <FaBars size={20} />
              </button>

              <button
                onClick={() => setCollapsed(!collapsed)}
                className="hidden md:flex p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                <FaBars size={18} />
              </button>

              <div className="hidden md:block relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search users, products, orders..."
                  className="pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-64"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
                aria-label="Toggle theme"
              >
                {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
              </button>

              <button
                className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
                aria-label="Help"
              >
                <HelpCircle className="w-5 h-5" />
              </button>

              <button
                className="hidden sm:flex p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
                aria-label="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>

              <div className="relative">
                <button
                  onClick={() =>
                    setOpen(open === "notifications" ? null : "notifications")
                  }
                  className="p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white transition-all relative"
                  aria-label="Notifications"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </span>
                  )}
                </button>

                {open === "notifications" && (
                  <div className="fixed md:absolute right-0 mt-2 w-screen md:w-96 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 max-h-[80vh] overflow-hidden md:max-w-[90vw] md:max-w-none">
                    <div className="p-4 border-b border-slate-700">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold text-white">
                            Notifications
                          </h3>
                          <p className="text-sm text-slate-400">
                            {unreadCount} unread{" "}
                            {unreadCount === 1
                              ? "notification"
                              : "notifications"}
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
                    <div className="overflow-y-auto max-h-96">
                      {loading ? (
                        <div className="p-8 text-center">
                          <div className="w-8 h-8 border-2 border-slate-600 border-t-green-500 rounded-full animate-spin mx-auto mb-3"></div>
                          <p className="text-slate-400">
                            Loading notifications...
                          </p>
                        </div>
                      ) : notifications.length === 0 ? (
                        <div className="p-8 text-center">
                          <Bell className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                          <p className="text-slate-400">No notifications yet</p>
                          <p className="text-sm text-slate-500 mt-1">
                            New notifications will appear here
                          </p>
                        </div>
                      ) : (
                        notifications.map((notification) => (
                          <div
                            key={notification._id}
                            className={`p-4 border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors ${
                              !notification.read ? "bg-slate-700/20" : ""
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              <div className="text-xl">
                                {getNotificationIcon(notification.type)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between">
                                  <h4 className="font-medium text-white text-sm break-words">
                                    {notification.title || "Notification"}
                                  </h4>
                                  <button
                                    onClick={() =>
                                      handleMarkAsRead(notification._id)
                                    }
                                    className="ml-2 text-xs text-green-400 hover:text-green-300 flex-shrink-0"
                                  >
                                    <CheckCircle size={14} />
                                  </button>
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
                                    >
                                      View →
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="p-4 border-t border-slate-700">
                      <a
                        href="/admin/notifications"
                        className="block text-center text-green-400 hover:text-green-300 text-sm font-medium"
                      >
                        View all notifications
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setOpen(open === "user" ? null : "user")}
                  className="flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-all"
                  aria-label="User menu"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full border-2 border-slate-600 flex-shrink-0"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">
                        {user.name ? user.name.charAt(0) : "A"}
                      </span>
                    </div>
                  )}
                  <div className="hidden md:block text-left min-w-0">
                    <div className="text-sm font-medium text-white truncate max-w-[120px]">
                      {user.name}
                    </div>
                    <div className="text-xs text-slate-400 truncate max-w-[120px]">
                      {user.role || "Administrator"}
                    </div>
                  </div>
                  <svg
                    className={`w-4 h-4 text-slate-400 transition-transform flex-shrink-0 ${
                      open === "user" ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {open === "user" && (
                  <div className="fixed md:absolute right-0 mt-2 w-screen md:w-64 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 md:max-w-[90vw] md:max-w-none">
                    <div className="p-4 border-b border-slate-700">
                      <div className="flex items-center space-x-3">
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-10 h-10 rounded-full border-2 border-slate-600 flex-shrink-0"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold">
                              {user.name ? user.name.charAt(0) : "A"}
                            </span>
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <h4 className="font-semibold text-white truncate">
                            {user.name}
                          </h4>
                          <p className="text-sm text-slate-400 truncate">
                            {user.email}
                          </p>
                          <div className="text-xs text-green-400 font-semibold mt-1">
                            Administrator
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={() => {
                          setShowProfileModal(true);
                          setOpen(null);
                        }}
                        className="w-full flex items-center space-x-3 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors text-left"
                      >
                        <FaUser className="w-5 h-5 flex-shrink-0" />
                        <span className="truncate">My Profile</span>
                      </button>
                      <a
                        href="/settings"
                        className="flex items-center space-x-3 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
                      >
                        <Settings className="w-5 h-5 flex-shrink-0" />
                        <span className="truncate">Settings</span>
                      </a>
                      <a
                        href="/help"
                        className="flex items-center space-x-3 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
                      >
                        <HelpCircle className="w-5 h-5 flex-shrink-0" />
                        <span className="truncate">Help & Support</span>
                      </a>
                    </div>
                    <div className="p-2 border-t border-slate-700">
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-3 w-full px-3 py-2 text-rose-400 hover:text-rose-300 hover:bg-rose-900/20 rounded-lg transition-colors"
                      >
                        <svg
                          className="w-5 h-5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        <span className="truncate">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="md:hidden mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {open && (
          <div
            className="fixed inset-0 z-40 md:hidden"
            onClick={() => setOpen(null)}
          />
        )}
      </div>

      {/* Profile Modal - Clean and Responsive */}
      {showProfileModal && (
        <>
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]" />

          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <div
              ref={profileModalRef}
              className="w-full max-w-lg bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden my-auto"
            >
              {/* Header */}
              <div className="p-4 sm:p-6 bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-b border-slate-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl">
                      <FaUserCircle className="text-2xl text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-white">
                        Profile Settings
                      </h2>
                      <p className="text-sm text-slate-400">
                        Update your account information
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowProfileModal(false)}
                    className="p-2 hover:bg-slate-800 rounded-xl transition-colors"
                  >
                    <FaTimes className="text-slate-400 text-lg" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6 max-h-[70vh] overflow-y-auto">
                {/* Messages */}
                {profileSuccess && (
                  <div className="mb-4 p-3 bg-green-900/20 border border-green-500/20 rounded-lg">
                    <div className="flex items-center gap-2">
                      <FaCheck className="text-green-500" />
                      <p className="text-green-400 text-sm">{profileSuccess}</p>
                    </div>
                  </div>
                )}

                {profileError && (
                  <div className="mb-4 p-3 bg-red-900/20 border border-red-500/20 rounded-lg">
                    <p className="text-red-400 text-sm text-center">
                      {profileError}
                    </p>
                  </div>
                )}

                {/* Avatar Section */}
                <div className="flex flex-col items-center mb-6">
                  <div className="relative mb-4">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 overflow-hidden border-4 border-slate-800">
                      {profileForm.avatar ? (
                        <>
                          <img
                            src={profileForm.avatar}
                            alt="Avatar"
                            className="w-full h-full object-cover"
                            onError={handleImageError}
                          />
                          <div className="avatar-fallback hidden w-full h-full items-center justify-center bg-gradient-to-br from-green-600 to-emerald-600">
                            <span className="text-white text-2xl font-bold">
                              {profileForm.name
                                ? profileForm.name.charAt(0).toUpperCase()
                                : "A"}
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-white text-2xl font-bold">
                            {profileForm.name
                              ? profileForm.name.charAt(0).toUpperCase()
                              : "A"}
                          </span>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() =>
                        document.querySelector('input[name="avatar"]')?.focus()
                      }
                      className="absolute bottom-0 right-0 p-2 bg-slate-800 rounded-full border-2 border-slate-700 hover:bg-slate-700 transition-colors"
                    >
                      <FaCamera className="text-green-500 text-sm" />
                    </button>
                  </div>

                  <div className="text-center">
                    <h3 className="text-lg font-bold text-white mb-1">
                      {profileForm.name || user.name || "Admin"}
                    </h3>
                    <div className="flex items-center justify-center gap-2 text-slate-400 mb-3">
                      <FaEnvelope className="text-sm" />
                      <span className="text-sm">
                        {profileForm.email || user.email}
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <span className="px-3 py-1 bg-green-900/30 text-green-400 text-xs font-semibold rounded-full">
                        Administrator
                      </span>
                      <span className="px-3 py-1 bg-blue-900/30 text-blue-400 text-xs font-semibold rounded-full">
                        {user.isVerified ? "Verified" : "Unverified"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleProfileSubmit} className="space-y-6">
                  {/* Personal Info */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <div className="p-2 bg-green-900/30 rounded-lg">
                        <FaUser className="text-green-500" />
                      </div>
                      <span>Personal Information</span>
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-slate-300 mb-2 text-sm">
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={profileForm.name}
                          onChange={handleProfileChange}
                          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 mb-2 text-sm">
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={profileForm.email}
                          onChange={handleProfileChange}
                          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Enter your email"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 mb-2 text-sm">
                          Bio
                        </label>
                        <textarea
                          name="bio"
                          value={profileForm.bio}
                          onChange={handleProfileChange}
                          rows="3"
                          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                          placeholder="Tell us about yourself..."
                        />
                      </div>

                      <div>
                        <label className="block text-slate-300 mb-2 text-sm">
                          Avatar URL
                        </label>
                        <input
                          type="url"
                          name="avatar"
                          value={profileForm.avatar}
                          onChange={handleProfileChange}
                          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="https://example.com/avatar.jpg"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Password Section */}
                  <div className="space-y-4 pt-6 border-t border-slate-700">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <div className="p-2 bg-green-900/30 rounded-lg">
                        <FaKey className="text-green-500" />
                      </div>
                      <span>Change Password</span>
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-slate-300 mb-2 text-sm">
                          Current Password
                        </label>
                        <input
                          type="password"
                          name="currentPassword"
                          value={profileForm.currentPassword}
                          onChange={handleProfileChange}
                          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Enter current password"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-slate-300 mb-2 text-sm">
                            New Password
                          </label>
                          <input
                            type="password"
                            name="newPassword"
                            value={profileForm.newPassword}
                            onChange={handleProfileChange}
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="At least 6 characters"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-300 mb-2 text-sm">
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            name="confirmPassword"
                            value={profileForm.confirmPassword}
                            onChange={handleProfileChange}
                            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                            placeholder="Confirm new password"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-700">
                    <button
                      type="submit"
                      disabled={profileLoading}
                      className="flex-1 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {profileLoading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <FaSave />
                          <span>Save Changes</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowDeleteConfirm(true)}
                      className="py-3 px-6 border border-rose-500/20 text-rose-400 hover:text-rose-300 hover:bg-rose-900/10 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                    >
                      <FaTrash />
                      <span>Delete Account</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <>
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[102]" />

          <div className="fixed inset-0 z-[103] flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 p-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-rose-600/20 to-pink-600/20 flex items-center justify-center">
                  <FaTrash className="text-rose-500 text-2xl" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">
                  Delete Account
                </h3>
                <p className="text-slate-400 mb-6">
                  This action cannot be undone. All your data will be
                  permanently removed.
                </p>

                <div className="mb-6">
                  <label className="block text-slate-300 mb-2 text-left">
                    Enter your password to confirm:
                  </label>
                  <input
                    type="password"
                    value={deletePassword}
                    onChange={(e) => setDeletePassword(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="Your password"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 py-3 bg-slate-800 text-white rounded-xl font-semibold hover:bg-slate-700 transition-all"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleDeleteAccount}
                    disabled={profileLoading}
                    className="flex-1 py-3 bg-gradient-to-r from-rose-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-rose-500/25 transition-all disabled:opacity-50"
                  >
                    {profileLoading ? "Deleting..." : "Delete Account"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AdminTop;
