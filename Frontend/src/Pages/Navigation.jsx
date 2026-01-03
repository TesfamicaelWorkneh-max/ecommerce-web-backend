// import React, { useState, useContext, useEffect, useRef } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import {
//   FaBars,
//   FaTimes,
//   FaShoppingCart,
//   FaChevronDown,
//   FaUser,
//   FaBell,
//   FaSearch,
//   FaKey,
//   FaTrash,
//   FaSave,
//   FaUserCircle,
//   FaSignOutAlt,
//   FaCheckCircle,
//   FaTimesCircle,
//   FaSpinner,
//   FaBox,
//   FaTag,
//   FaFire,
//   FaHistory,
// } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";
// import ThemeToggle from "../Components/ThemeToggle";
// import { authContext } from "../Context/authContext";
// import { cartContext } from "../Context/cartContext";
// import { initSocket } from "../utils/socket";
// import { fetchWithAuth } from "../utils/auth";

// const API = import.meta.env.VITE_API_URL;

// const Navigation = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [openDropdown, setOpenDropdown] = useState(null);
//   const [userMenuOpen, setUserMenuOpen] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [allCategories, setAllCategories] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(() => {
//     const saved = localStorage.getItem("notification_unread_count");
//     return saved ? parseInt(saved, 10) : 0;
//   });
//   const [scrolled, setScrolled] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [cartPulse, setCartPulse] = useState(false);
//   const [showProfileModal, setShowProfileModal] = useState(false);
//   const [profileForm, setProfileForm] = useState({
//     name: "",
//     email: "",
//     bio: "",
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   });
//   const [profileLoading, setProfileLoading] = useState(false);
//   const [profileError, setProfileError] = useState("");
//   const [profileSuccess, setProfileSuccess] = useState("");
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
//   const [deletePassword, setDeletePassword] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [isSearching, setIsSearching] = useState(false);
//   const [recentSearches, setRecentSearches] = useState([]);
//   const [popularSearches, setPopularSearches] = useState([]);
//   const [searchHistoryOpen, setSearchHistoryOpen] = useState(true);
//   const [showAllCategories, setShowAllCategories] = useState(false);
//   const [badgeAnimation, setBadgeAnimation] = useState(false);
//   const [socketConnected, setSocketConnected] = useState(false);

//   const searchRef = useRef(null);
//   const searchInputRef = useRef(null);
//   const profileModalRef = useRef(null);
//   const userMenuRef = useRef(null);
//   const socketRef = useRef(null);
//   const soundRef = useRef(null);
//   const mountedRef = useRef(true);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { user, logout, updateUser } = useContext(authContext);
//   const { cart } = useContext(cartContext);

//   // Main page section links
//   const mainPageLinks = [
//     { name: "Home", path: "/", hash: "#home" },
//     { name: "Categories", path: "/#categories", hash: "#categories" },
//     { name: "Products", path: "/#products", hash: "#products" },
//     { name: "About-us", path: "/#about", hash: "#about" },

//     { name: "Contact-us", path: "/#contact", hash: "#contact" },
//     { name: "Blog", path: "/blog" },
//   ];

//   // Initialize sound
//   useEffect(() => {
//     soundRef.current = new Audio("/sounds/notification.mp3");
//     soundRef.current.volume = 0.3;

//     return () => {
//       mountedRef.current = false;
//       if (socketRef.current) {
//         socketRef.current.disconnect();
//         socketRef.current = null;
//       }
//     };
//   }, []);

//   // Update localStorage and document title when unreadCount changes
//   useEffect(() => {
//     localStorage.setItem("notification_unread_count", unreadCount.toString());
//     updateDocumentTitle(unreadCount);
//   }, [unreadCount]);

//   // Update document title
//   const updateDocumentTitle = (count) => {
//     const baseTitle = document.title.replace(/^\(\d+\)\s*/, "") || "E-Commerce";
//     if (count > 0) {
//       document.title = `(${count}) ${baseTitle}`;
//     } else {
//       document.title = baseTitle;
//     }
//   };

//   // Play notification sound
//   const playNotificationSound = () => {
//     if (soundRef.current) {
//       soundRef.current.currentTime = 0;
//       soundRef.current
//         .play()
//         .catch((e) => console.log("Sound play failed:", e));
//     }
//   };

//   // Fetch categories for dropdown
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await fetchWithAuth(`${API}/api/categories`);
//         const data = await res.json();
//         setCategories(data || []);
//       } catch (err) {
//         console.error("Categories fetch error:", err);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // Fetch all categories for search
//   useEffect(() => {
//     const fetchAllCategories = async () => {
//       try {
//         const res = await fetchWithAuth(
//           `${API}/api/products/categories-for-search`
//         );
//         if (res.ok) {
//           const data = await res.json();
//           setAllCategories(data);
//         }
//       } catch (err) {
//         console.error("All categories fetch error:", err);
//       }
//     };
//     fetchAllCategories();
//   }, []);

//   // Fetch popular searches
//   useEffect(() => {
//     const fetchPopularSearches = async () => {
//       try {
//         const res = await fetchWithAuth(`${API}/api/products/popular-searches`);
//         if (res.ok) {
//           const data = await res.json();
//           setPopularSearches(data || []);
//         }
//       } catch (err) {
//         console.error("Popular searches error:", err);
//       }
//     };
//     fetchPopularSearches();
//   }, []);

//   // Load recent searches
//   useEffect(() => {
//     const savedSearches = localStorage.getItem("recent_searches");
//     if (savedSearches) {
//       try {
//         setRecentSearches(JSON.parse(savedSearches));
//       } catch (e) {
//         console.error("Error parsing recent searches:", e);
//       }
//     }
//   }, []);

//   // Save recent searches
//   const saveRecentSearches = (searches) => {
//     setRecentSearches(searches);
//     localStorage.setItem("recent_searches", JSON.stringify(searches));
//   };

//   // Scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Cart pulse animation
//   useEffect(() => {
//     if (cart?.items?.length > 0) {
//       setCartPulse(true);
//       const timer = setTimeout(() => setCartPulse(false), 1000);
//       return () => clearTimeout(timer);
//     }
//   }, [cart?.items]);

//   // Fetch initial unread count
//   useEffect(() => {
//     if (!user) {
//       setUnreadCount(0);
//       localStorage.setItem("notification_unread_count", "0");
//       return;
//     }

//     fetchUnreadCount();
//     setupSocketConnection();

//     const pollingInterval = setInterval(() => {
//       if (mountedRef.current && user) {
//         fetchUnreadCount();
//       }
//     }, 60000);

//     return () => {
//       clearInterval(pollingInterval);
//     };
//   }, [user]);

//   // Setup socket connection for notifications
//   const setupSocketConnection = () => {
//     if (!user || !mountedRef.current) return;

//     console.log("🔌 Setting up socket connection for user:", user._id);

//     try {
//       const socket = initSocket();
//       socketRef.current = socket;

//       socket.on("connect", () => {
//         console.log("✅ Navigation socket connected:", socket.id);
//         setSocketConnected(true);

//         if (user._id) {
//           socket.emit("join", user._id);
//           console.log(`👤 User ${user._id} joined socket room`);
//         }
//       });

//       socket.on("connect_error", (error) => {
//         console.error("❌ Navigation socket connect error:", error);
//         setSocketConnected(false);
//       });

//       socket.on("disconnect", (reason) => {
//         console.log("🔌 Navigation socket disconnected:", reason);
//         setSocketConnected(false);
//       });

//       socket.on("notification", (newNotification) => {
//         console.log("🔔 Navigation received notification:", newNotification);

//         if (!mountedRef.current) return;

//         setUnreadCount((prev) => {
//           const newCount = prev + 1;
//           localStorage.setItem(
//             "notification_unread_count",
//             newCount.toString()
//           );
//           return newCount;
//         });

//         setBadgeAnimation(true);
//         playNotificationSound();
//         setTimeout(() => setBadgeAnimation(false), 500);

//         if ("Notification" in window && Notification.permission === "granted") {
//           try {
//             new Notification(newNotification.title || "New Notification", {
//               body: newNotification.message,
//               icon: "/logo.png",
//               badge: "/logo.png",
//               tag: newNotification._id || Date.now().toString(),
//               requireInteraction: false,
//             });
//           } catch (notificationError) {
//             console.log("Browser notification error:", notificationError);
//           }
//         }
//       });

//       socket.on("notification-count", (data) => {
//         console.log("📊 Navigation received notification count:", data);

//         if (!mountedRef.current) return;

//         const newCount = data.count || 0;
//         setUnreadCount(newCount);
//         localStorage.setItem("notification_unread_count", newCount.toString());
//         setBadgeAnimation(true);
//         setTimeout(() => setBadgeAnimation(false), 300);
//       });

//       socket.on("notification-count-response", (data) => {
//         console.log(
//           "📊 Navigation received notification count response:",
//           data
//         );

//         if (!mountedRef.current) return;

//         const newCount = data.count || 0;
//         setUnreadCount(newCount);
//         localStorage.setItem("notification_unread_count", newCount.toString());
//         setBadgeAnimation(true);
//         setTimeout(() => setBadgeAnimation(false), 300);
//       });

//       const handleAppNotification = (event) => {
//         const newNotification = event.detail;
//         console.log(
//           "📢 Navigation received app-notification:",
//           newNotification
//         );

//         if (!mountedRef.current) return;

//         setUnreadCount((prev) => {
//           const newCount = prev + 1;
//           localStorage.setItem(
//             "notification_unread_count",
//             newCount.toString()
//           );
//           return newCount;
//         });

//         setBadgeAnimation(true);
//         playNotificationSound();
//         setTimeout(() => setBadgeAnimation(false), 500);
//       };

//       const handleUpdateNotificationCount = (event) => {
//         const { increment, decrement, count } = event.detail;
//         console.log(
//           "🔢 Navigation received update-notification-count:",
//           event.detail
//         );

//         setUnreadCount((prev) => {
//           let newCount = prev;

//           if (count !== undefined) {
//             newCount = count;
//           } else if (increment !== undefined) {
//             newCount = prev + (increment || 1);
//           } else if (decrement !== undefined) {
//             newCount = Math.max(0, prev - (decrement || 1));
//           }

//           console.log(`🔄 Updating badge count: ${prev} -> ${newCount}`);
//           localStorage.setItem(
//             "notification_unread_count",
//             newCount.toString()
//           );
//           return newCount;
//         });

//         setBadgeAnimation(true);
//         setTimeout(() => setBadgeAnimation(false), 300);
//       };

//       const handleNotificationAction = (event) => {
//         const { action, count } = event.detail;
//         console.log("📢 Navigation received notification action:", action);

//         if (count !== undefined) {
//           setUnreadCount(count);
//           localStorage.setItem("notification_unread_count", count.toString());
//         } else if (action === "mark-all-read" || action === "delete-all") {
//           setUnreadCount(0);
//           localStorage.setItem("notification_unread_count", "0");
//         }
//         setBadgeAnimation(true);
//         setTimeout(() => setBadgeAnimation(false), 300);
//       };

//       window.addEventListener("app-notification", handleAppNotification);
//       window.addEventListener(
//         "update-notification-count",
//         handleUpdateNotificationCount
//       );
//       window.addEventListener(
//         "notification-action-completed",
//         handleNotificationAction
//       );

//       return () => {
//         if (socketRef.current) {
//           socketRef.current.disconnect();
//           socketRef.current = null;
//         }
//         window.removeEventListener("app-notification", handleAppNotification);
//         window.removeEventListener(
//           "update-notification-count",
//           handleUpdateNotificationCount
//         );
//         window.removeEventListener(
//           "notification-action-completed",
//           handleNotificationAction
//         );
//         setSocketConnected(false);
//       };
//     } catch (error) {
//       console.error("❌ Socket setup error:", error);
//     }
//   };

//   // Fetch unread count function
//   const fetchUnreadCount = async (retryCount = 0) => {
//     if (!user) {
//       setUnreadCount(0);
//       localStorage.setItem("notification_unread_count", "0");
//       return;
//     }

//     try {
//       console.log("📊 Fetching unread count from server...");
//       const res = await fetchWithAuth(`${API}/api/notifications/unread-count`);

//       if (!res.ok) {
//         throw new Error(`Failed to fetch unread count: ${res.status}`);
//       }

//       const data = await res.json();

//       if (data.success) {
//         const newCount = data.data?.count || 0;
//         console.log("✅ Unread count fetched from server:", newCount);

//         setUnreadCount(newCount);
//         localStorage.setItem("notification_unread_count", newCount.toString());

//         window.dispatchEvent(
//           new CustomEvent("update-notification-count", {
//             detail: { count: newCount },
//           })
//         );
//       } else {
//         console.error("❌ API error:", data.message);
//         setUnreadCount(0);
//         localStorage.setItem("notification_unread_count", "0");
//       }
//     } catch (err) {
//       console.error("❌ Fetch unread count error:", err);

//       if (retryCount < 2) {
//         console.log(`🔄 Retrying fetch unread count (${retryCount + 1}/2)...`);
//         setTimeout(() => fetchUnreadCount(retryCount + 1), 2000);
//       } else {
//         setUnreadCount(0);
//         localStorage.setItem("notification_unread_count", "0");
//       }
//     }
//   };

//   // Close search when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (searchRef.current && !searchRef.current.contains(event.target)) {
//         setSearchOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Focus search input when search opens
//   useEffect(() => {
//     if (searchOpen && searchInputRef.current) {
//       setTimeout(() => {
//         searchInputRef.current.focus();
//         setSearchHistoryOpen(true);
//       }, 100);
//     }
//   }, [searchOpen]);

//   // Close modals and dropdowns when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
//         setUserMenuOpen(false);
//       }

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

//   // Initialize profile form when user data changes
//   useEffect(() => {
//     if (user) {
//       setProfileForm({
//         name: user.name || "",
//         email: user.email || "",
//         bio: user.bio || "",
//         currentPassword: "",
//         newPassword: "",
//         confirmPassword: "",
//       });
//     }
//   }, [user]);

//   // Handle navigation to sections
//   const handleNavigation = (link) => {
//     if (link.hash) {
//       // If we're already on the main page, scroll to section
//       if (location.pathname === "/") {
//         const element = document.getElementById(link.hash.replace("#", ""));
//         if (element) {
//           element.scrollIntoView({ behavior: "smooth" });
//         }
//       } else {
//         // Navigate to main page with hash
//         navigate(`/${link.hash}`);
//       }
//     } else {
//       // Regular navigation
//       navigate(link.path);
//     }
//     setMenuOpen(false);
//     setOpenDropdown(null);
//   };

//   // 🔍 SEARCH FUNCTION
//   const searchProducts = async (query) => {
//     if (!query || query.trim() === "") {
//       setSearchResults([]);
//       setIsSearching(false);
//       return;
//     }

//     setIsSearching(true);
//     try {
//       const res = await fetchWithAuth(
//         `${API}/api/products/quick-search?q=${encodeURIComponent(query)}`
//       );

//       if (res.ok) {
//         const data = await res.json();
//         setSearchResults(data);

//         if (data.length > 0 && !recentSearches.includes(query)) {
//           const updated = [query, ...recentSearches].slice(0, 8);
//           saveRecentSearches(updated);
//         }
//       } else {
//         console.error("Search failed with status:", res.status);
//         setSearchResults([]);
//       }
//     } catch (err) {
//       console.error("Search error:", err);
//       setSearchResults([]);
//     } finally {
//       setIsSearching(false);
//     }
//   };

//   // Debounced search
//   useEffect(() => {
//     if (!searchOpen) return;

//     const timer = setTimeout(() => {
//       if (searchQuery.trim()) {
//         searchProducts(searchQuery);
//       } else {
//         setSearchResults([]);
//         setSearchHistoryOpen(true);
//       }
//     }, 350);

//     return () => clearTimeout(timer);
//   }, [searchQuery, searchOpen]);

//   // Add to recent searches
//   const addToRecentSearches = (query) => {
//     const updated = [
//       query,
//       ...recentSearches.filter((s) => s.toLowerCase() !== query.toLowerCase()),
//     ].slice(0, 8);
//     saveRecentSearches(updated);
//   };

//   // Clear recent searches
//   const clearRecentSearches = () => {
//     saveRecentSearches([]);
//   };

//   // Handle search submission
//   const handleSearch = (e, query = null, category = null) => {
//     e?.preventDefault();
//     const searchTerm = query || searchQuery.trim();

//     if (searchTerm) {
//       addToRecentSearches(searchTerm);

//       if (category) {
//         navigate(`/search?category=${encodeURIComponent(category)}`);
//       } else {
//         navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
//       }

//       setSearchOpen(false);
//       setSearchQuery("");
//       setSearchResults([]);
//     }
//   };

//   // Handle category click from search
//   const handleCategorySearch = (categoryName) => {
//     addToRecentSearches(categoryName);
//     navigate(`/search?category=${encodeURIComponent(categoryName)}`);
//     setSearchOpen(false);
//   };

//   // Format price
//   const formatPrice = (price) => {
//     return new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//       minimumFractionDigits: 0,
//     }).format(price);
//   };

//   const toggleDropdown = (key) =>
//     setOpenDropdown(openDropdown === key ? null : key);

//   const handleCategoryClick = (path) => {
//     navigate(path);
//     setMenuOpen(false);
//     setOpenDropdown(null);
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
//       };

//       if (profileForm.currentPassword && profileForm.newPassword) {
//         updateData.currentPassword = profileForm.currentPassword;
//         updateData.newPassword = profileForm.newPassword;
//       }

//       console.log("Sending update to:", `${API}/api/users/profile`);
//       console.log("Update data:", updateData);

//       const res = await fetchWithAuth(`${API}/api/users/profile`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updateData),
//       });

//       console.log("Response status:", res.status);

//       const contentType = res.headers.get("content-type");
//       if (!contentType || !contentType.includes("application/json")) {
//         const text = await res.text();
//         console.error("Non-JSON response from server:", text.substring(0, 200));
//         throw new Error(
//           "Server returned non-JSON response. Please check if the API endpoint exists."
//         );
//       }

//       const data = await res.json();
//       console.log("Response data:", data);

//       if (!res.ok) {
//         throw new Error(
//           data.message || `Failed to update profile (${res.status})`
//         );
//       }

//       if (!data.success) {
//         throw new Error(data.message || "Profile update failed");
//       }

//       if (data.user) {
//         updateUser(data.user);
//         setProfileSuccess("Profile updated successfully!");
//       } else {
//         throw new Error("No user data returned from server");
//       }

//       setProfileForm((prev) => ({
//         ...prev,
//         currentPassword: "",
//         newPassword: "",
//         confirmPassword: "",
//       }));

//       setTimeout(() => setProfileSuccess(""), 3000);
//     } catch (err) {
//       console.error("Profile update error:", err);
//       setProfileError(
//         err.message || "Failed to update profile. Please try again."
//       );
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
//       console.log(
//         "Sending delete request to:",
//         `${API}/api/users/delete-account`
//       );

//       const res = await fetchWithAuth(`${API}/api/users/delete-account`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ password: deletePassword }),
//       });

//       console.log("Delete response status:", res.status);

//       const contentType = res.headers.get("content-type");
//       if (!contentType || !contentType.includes("application/json")) {
//         const text = await res.text();
//         console.error("Non-JSON response from server:", text.substring(0, 200));
//         throw new Error(
//           "Server returned non-JSON response. Please check if the API endpoint exists."
//         );
//       }

//       const data = await res.json();
//       console.log("Delete response data:", data);

//       if (!res.ok || !data.success) {
//         throw new Error(data.message || "Failed to delete account");
//       }

//       logout();
//       setShowProfileModal(false);
//       navigate("/login");
//     } catch (err) {
//       console.error("Delete account error:", err);
//       setProfileError(
//         err.message || "Failed to delete account. Please try again."
//       );
//       setProfileLoading(false);
//     }
//   };

//   const cartItemCount =
//     cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

//   return (
//     <>
//       {/* Navigation Container */}
//       <motion.nav
//         initial={{ y: -100 }}
//         animate={{ y: 0 }}
//         transition={{ duration: 0.5, type: "spring" }}
//         className="fixed top-0 w-full z-50 transition-all duration-300"
//       >
//         {/* Top Announcement Bar */}
//         <div className="bg-gradient-to-r from-[#E1A95F]/20 via-[#d4a259]/20 to-[#c5954d]/20 py-2 px-4 text-center">
//           <p className="text-xs text-white/90 font-medium">
//             🚚{" "}
//             <span className="text-[#E1A95F] font-semibold">Free Shipping</span>{" "}
//             on orders over $100 •
//             <span className="text-green-300 font-semibold ml-2">
//               🎁 30% OFF
//             </span>{" "}
//             for new customers
//           </p>
//         </div>

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             {/* Logo */}
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="flex items-center"
//             >
//               <button
//                 onClick={() => navigate("/")}
//                 className="flex items-center"
//               >
//                 <img
//                   src="/logo.png"
//                   alt="Logo"
//                   className="w-28 md:w-32 h-auto drop-shadow-lg"
//                 />
//               </button>
//             </motion.div>

//             {/* Desktop Navigation */}
//             <ul className="hidden lg:flex items-center gap-1">
//               {mainPageLinks.map((link, index) => (
//                 <motion.li
//                   key={index}
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                   className="relative"
//                 >
//                   <button
//                     onClick={() => handleNavigation(link)}
//                     className={`relative px-4 py-2.5 mx-1 rounded-xl transition-all duration-300 font-medium ${
//                       (location.pathname === link.path && !link.hash) ||
//                       (location.hash === link.hash && location.pathname === "/")
//                         ? "text-[#E1A95F] bg-[#E1A95F]/10"
//                         : "text-slate-200 hover:text-[#E1A95F] hover:bg-white/5"
//                     }`}
//                   >
//                     {link.name}
//                     {(location.pathname === link.path && !link.hash) ||
//                     (location.hash === link.hash &&
//                       location.pathname === "/") ? (
//                       <motion.div
//                         layoutId="underline"
//                         className="absolute left-4 right-4 h-0.5 bottom-1.5 bg-[#E1A95F] rounded-full"
//                       />
//                     ) : null}
//                   </button>
//                 </motion.li>
//               ))}

//               {/* Dynamic Shop Dropdown */}
//               <motion.li className="relative">
//                 <button
//                   onClick={() => toggleDropdown("shop")}
//                   className={`flex items-center gap-2 px-4 py-2.5 mx-1 rounded-xl transition-all duration-300 font-medium ${
//                     openDropdown === "shop"
//                       ? "text-[#E1A95F] bg-[#E1A95F]/10"
//                       : "text-slate-200 hover:text-[#E1A95F] hover:bg-white/5"
//                   }`}
//                 >
//                   Shop
//                   <motion.span
//                     animate={{ rotate: openDropdown === "shop" ? 180 : 0 }}
//                     transition={{ duration: 0.3 }}
//                   >
//                     <FaChevronDown className="text-sm" />
//                   </motion.span>
//                 </button>
//                 <AnimatePresence>
//                   {openDropdown === "shop" && (
//                     <motion.div
//                       className="absolute left-0 top-full mt-2 min-w-[220px] bg-slate-900/95 dark:bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-700 dark:border-gray-300 p-3"
//                       initial={{ opacity: 0, y: -10, scale: 0.95 }}
//                       animate={{ opacity: 1, y: 0, scale: 1 }}
//                       exit={{ opacity: 0, y: -10, scale: 0.95 }}
//                       transition={{ duration: 0.2 }}
//                     >
//                       <div className="space-y-2">
//                         {categories.map((cat, i) => (
//                           <motion.button
//                             key={i}
//                             initial={{ opacity: 0, x: -10 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ duration: 0.2, delay: i * 0.05 }}
//                             onClick={() =>
//                               handleCategoryClick(
//                                 `/category/${cat.name.toLowerCase()}`
//                               )
//                             }
//                             className="w-full text-left px-3 py-2.5 rounded-lg text-slate-300 dark:text-gray-700 hover:text-[#E1A95F] hover:bg-slate-800/50 dark:hover:bg-gray-200 transition-all duration-300 flex items-center gap-3 group"
//                           >
//                             <div className="w-2 h-2 bg-[#E1A95F]/50 rounded-full group-hover:bg-[#E1A95F] transition-all duration-300"></div>
//                             <span className="font-medium">{cat.name}</span>
//                           </motion.button>
//                         ))}
//                       </div>
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </motion.li>

//               <li className="ml-2">
//                 <ThemeToggle />
//               </li>
//             </ul>

//             {/* Right Icons */}
//             <div className="flex items-center gap-3 md:gap-4">
//               {/* Enhanced Search */}
//               <div ref={searchRef} className="">
//                 <motion.button
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   onClick={() => {
//                     setSearchOpen(!searchOpen);
//                     setSearchHistoryOpen(true);
//                   }}
//                   className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 dark:bg-gray-800/50 dark:hover:bg-gray-800 transition-all duration-300 group"
//                 >
//                   <FaSearch className="text-slate-300 dark:text-gray-600 group-hover:text-[#E1A95F] text-lg transition-colors duration-300" />
//                 </motion.button>

//                 <AnimatePresence>
//                   {searchOpen && (
//                     <motion.div
//                       initial={{ opacity: 0, scale: 0.9, y: 10 }}
//                       animate={{ opacity: 1, scale: 1, y: 0 }}
//                       exit={{ opacity: 0, scale: 0.9, y: 10 }}
//                       className="absolute max-sm:right-0 right-10 top-full mt-2 max-sm:w-full w-[50%] max-w-2xl backdrop-blur-sm rounded-xl shadow-2xl border border-slate-700 dark:border-gray-300 overflow-hidden z-50"
//                     >
//                       {/* Search Input */}
//                       <div className="p-4 border-b border-slate-700 dark:border-gray-300 bg-slate-900/50 dark:bg-white">
//                         <form
//                           onSubmit={(e) => handleSearch(e)}
//                           className="relative"
//                         >
//                           <div className="relative">
//                             <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 dark:text-gray-500" />
//                             <input
//                               ref={searchInputRef}
//                               type="text"
//                               value={searchQuery}
//                               onChange={(e) => {
//                                 setSearchQuery(e.target.value);
//                                 setSearchHistoryOpen(e.target.value === "");
//                               }}
//                               placeholder="Search products, brands, categories..."
//                               className="w-full pl-10 pr-10 py-3 bg-slate-800/50 dark:bg-gray-100 border border-slate-700 dark:border-gray-300 rounded-xl text-white dark:text-gray-900 placeholder-slate-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E1A95F]/50 focus:border-[#E1A95F]/50 transition-all duration-300"
//                             />
//                             {searchQuery && (
//                               <button
//                                 type="button"
//                                 onClick={() => {
//                                   setSearchQuery("");
//                                   setSearchResults([]);
//                                   setSearchHistoryOpen(true);
//                                 }}
//                                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 dark:text-gray-500 hover:text-slate-300 dark:hover:text-gray-700 transition-colors"
//                               >
//                                 <FaTimesCircle />
//                               </button>
//                             )}
//                           </div>
//                           {isSearching && (
//                             <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
//                               <FaSpinner className="animate-spin text-[#E1A95F]" />
//                             </div>
//                           )}
//                         </form>
//                       </div>

//                       {/* Search Content */}
//                       <div className="max-h-96 overflow-y-auto bg-slate-900/95 dark:bg-white/95">
//                         {/* Recent Searches */}
//                         {searchHistoryOpen &&
//                           recentSearches.length > 0 &&
//                           !searchQuery && (
//                             <div className="p-4 border-b border-slate-700 dark:border-gray-300">
//                               <div className="flex items-center justify-between mb-3">
//                                 <div className="flex items-center gap-2">
//                                   <FaHistory className="text-slate-500 dark:text-gray-500 text-sm" />
//                                   <h3 className="text-sm font-semibold text-slate-400 dark:text-gray-600">
//                                     Recent Searches
//                                   </h3>
//                                 </div>
//                                 <button
//                                   onClick={clearRecentSearches}
//                                   className="text-xs text-slate-500 dark:text-gray-500 hover:text-slate-300 dark:hover:text-gray-700 transition-colors"
//                                 >
//                                   Clear All
//                                 </button>
//                               </div>
//                               <div className="space-y-2">
//                                 {recentSearches.map((search, index) => (
//                                   <button
//                                     key={index}
//                                     onClick={() => {
//                                       setSearchQuery(search);
//                                       handleSearch(null, search);
//                                     }}
//                                     className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-800/50 dark:hover:bg-gray-200 transition-all duration-300 group"
//                                   >
//                                     <div className="flex items-center gap-3">
//                                       <FaSearch className="text-slate-500 dark:text-gray-500 text-sm group-hover:text-[#E1A95F]" />
//                                       <span className="text-slate-300 dark:text-gray-700 group-hover:text-white dark:group-hover:text-gray-900">
//                                         {search}
//                                       </span>
//                                     </div>
//                                     <FaTimesCircle
//                                       onClick={(e) => {
//                                         e.stopPropagation();
//                                         const updated = recentSearches.filter(
//                                           (_, i) => i !== index
//                                         );
//                                         saveRecentSearches(updated);
//                                       }}
//                                       className="text-slate-600 dark:text-gray-400 hover:text-slate-400 dark:hover:text-gray-600 text-sm opacity-0 group-hover:opacity-100 transition-all"
//                                     />
//                                   </button>
//                                 ))}
//                               </div>
//                             </div>
//                           )}

//                         {/* Popular Searches */}
//                         {searchHistoryOpen &&
//                           popularSearches.length > 0 &&
//                           !searchQuery && (
//                             <div className="p-4 border-b border-slate-700 dark:border-gray-300">
//                               <div className="flex items-center gap-2 mb-3">
//                                 <FaFire className="text-amber-500 text-sm" />
//                                 <h3 className="text-sm font-semibold text-slate-400 dark:text-gray-600">
//                                   Popular Searches
//                                 </h3>
//                               </div>
//                               <div className="flex flex-wrap gap-2">
//                                 {popularSearches
//                                   .slice(0, 6)
//                                   .map((search, index) => (
//                                     <button
//                                       key={index}
//                                       onClick={() => {
//                                         setSearchQuery(search);
//                                         handleSearch(null, search);
//                                       }}
//                                       className="px-3 py-1.5 bg-slate-800/50 dark:bg-gray-100 hover:bg-[#E1A95F]/20 text-slate-300 dark:text-gray-700 hover:text-[#E1A95F] rounded-lg text-sm transition-all duration-300 border border-slate-700 dark:border-gray-300 hover:border-[#E1A95F]/30"
//                                     >
//                                       {search}
//                                     </button>
//                                   ))}
//                               </div>
//                             </div>
//                           )}

//                         {/* Categories */}
//                         {searchHistoryOpen &&
//                           allCategories.length > 0 &&
//                           !searchQuery && (
//                             <div className="p-4">
//                               <div className="flex items-center gap-2 mb-3">
//                                 <FaTag className="text-[#E1A95F] text-sm" />
//                                 <h3 className="text-sm font-semibold text-slate-400 dark:text-gray-600">
//                                   Browse Categories
//                                 </h3>
//                               </div>
//                               <div className="grid grid-cols-2 gap-2">
//                                 {allCategories
//                                   .slice(0, showAllCategories ? 20 : 6)
//                                   .map((category, index) => (
//                                     <button
//                                       key={index}
//                                       onClick={() =>
//                                         handleCategorySearch(category.name)
//                                       }
//                                       className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/30 dark:bg-gray-100 hover:bg-slate-800/70 dark:hover:bg-gray-200 transition-all duration-300 group"
//                                     >
//                                       <FaBox className="text-slate-500 dark:text-gray-500 text-sm group-hover:text-[#E1A95F]" />
//                                       <span className="text-slate-300 dark:text-gray-700 text-sm truncate">
//                                         {category.name}
//                                       </span>
//                                     </button>
//                                   ))}
//                               </div>
//                               {allCategories.length > 6 && (
//                                 <button
//                                   onClick={() =>
//                                     setShowAllCategories(!showAllCategories)
//                                   }
//                                   className="w-full mt-3 text-center text-xs text-slate-500 dark:text-gray-500 hover:text-[#E1A95F] transition-colors"
//                                 >
//                                   {showAllCategories
//                                     ? "Show Less"
//                                     : `Show All ${allCategories.length} Categories`}
//                                 </button>
//                               )}
//                             </div>
//                           )}

//                         {/* Search Results */}
//                         {searchQuery && (
//                           <div className="p-4">
//                             <div className="flex items-center justify-between mb-3">
//                               <h3 className="text-sm font-semibold text-slate-400 dark:text-gray-600">
//                                 {searchResults.length > 0
//                                   ? `Found ${searchResults.length} results`
//                                   : isSearching
//                                     ? "Searching..."
//                                     : "No results found"}
//                               </h3>
//                               {searchResults.length > 0 && (
//                                 <button
//                                   onClick={(e) => handleSearch(e)}
//                                   className="text-xs text-[#E1A95F] hover:text-[#d4a259] font-medium"
//                                 >
//                                   See all →
//                                 </button>
//                               )}
//                             </div>

//                             {searchResults.length > 0 ? (
//                               <div className="space-y-3">
//                                 {searchResults.slice(0, 5).map((product) => (
//                                   <Link
//                                     key={product._id}
//                                     to={`/product/${product._id}`}
//                                     onClick={() => {
//                                       setSearchOpen(false);
//                                       setSearchQuery("");
//                                     }}
//                                     className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800/50 dark:hover:bg-gray-200 transition-all duration-300 group"
//                                   >
//                                     <div className="w-20 h-20 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
//                                       {product.image ? (
//                                         <img
//                                           src={
//                                             product.image.startsWith("http")
//                                               ? product.image
//                                               : `${API}${product.image}`
//                                           }
//                                           alt={product.name}
//                                           className="w-full h-full object-contain"
//                                           onError={(e) => {
//                                             e.target.onerror = null;
//                                             e.target.src =
//                                               "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop";
//                                           }}
//                                         />
//                                       ) : (
//                                         <FaBox className="text-slate-500 dark:text-gray-500" />
//                                       )}
//                                     </div>
//                                     <div className="flex-1 min-w-0">
//                                       <div className="flex items-start justify-between gap-2">
//                                         <h4 className="text-sm font-medium text-white dark:text-gray-900 truncate group-hover:text-[#E1A95F]">
//                                           {product.name}
//                                         </h4>
//                                         <span className="text-sm font-semibold text-[#E1A95F] flex-shrink-0">
//                                           {formatPrice(product.price)}
//                                         </span>
//                                       </div>
//                                       <p className="text-xs text-slate-400 dark:text-gray-600 truncate">
//                                         {product.category || "Uncategorized"}
//                                       </p>
//                                       <div className="flex items-center gap-2 mt-1">
//                                         {product.isSold ||
//                                         product.stock === 0 ? (
//                                           <span className="text-xs text-red-500">
//                                             Sold Out
//                                           </span>
//                                         ) : (
//                                           <span className="text-xs text-green-500">
//                                             {product.stock || 0} in stock
//                                           </span>
//                                         )}
//                                       </div>
//                                     </div>
//                                   </Link>
//                                 ))}
//                               </div>
//                             ) : !isSearching ? (
//                               <div className="text-center py-6">
//                                 <div className="w-12 h-12 mx-auto rounded-full bg-slate-800/50 dark:bg-gray-100 flex items-center justify-center mb-3">
//                                   <FaSearch className="text-slate-500 dark:text-gray-500" />
//                                 </div>
//                                 <p className="text-slate-400 dark:text-gray-600 text-sm">
//                                   No products found for "{searchQuery}"
//                                 </p>
//                                 <p className="text-slate-500 dark:text-gray-500 text-xs mt-2">
//                                   Try different keywords
//                                 </p>
//                               </div>
//                             ) : null}
//                           </div>
//                         )}
//                       </div>

//                       {/* Search Footer */}
//                       {searchQuery && (
//                         <div className="p-4 border-t border-slate-700 dark:border-gray-300 bg-slate-900/50 dark:bg-gray-100">
//                           <button
//                             onClick={(e) => handleSearch(e)}
//                             className="w-full py-2.5 bg-gradient-to-r from-[#E1A95F] to-[#d4a259] text-white rounded-xl font-medium hover:shadow-lg hover:shadow-[#E1A95F]/25 transition-all duration-300 flex items-center justify-center gap-2"
//                           >
//                             <FaSearch />
//                             Search for "{searchQuery}"
//                           </button>
//                         </div>
//                       )}
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </div>

//               {/* Notifications with YouTube-style badge */}
//               <div className="relative">
//                 <motion.div
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.9 }}
//                   className="relative cursor-pointer group"
//                   onClick={() => navigate("/notifications")}
//                 >
//                   <div className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 dark:bg-gray-800/50 dark:hover:bg-gray-800 transition-all duration-300 relative">
//                     <FaBell className="text-slate-300 dark:text-gray-600 group-hover:text-[#E1A95F] text-lg transition-colors duration-300" />

//                     {/* Socket connection indicator */}
//                     {socketConnected && (
//                       <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse border border-white"></div>
//                     )}

//                     {/* YouTube-style notification badge */}
//                     {unreadCount > 0 && (
//                       <div className="absolute top-0 right-0">
//                         <motion.div
//                           key={`badge-${unreadCount}-${badgeAnimation}`}
//                           initial={{ scale: 0 }}
//                           animate={{ scale: 1 }}
//                           whileHover={{ scale: 1.1 }}
//                           transition={{
//                             duration: 0.3,
//                             type: "spring",
//                             stiffness: 300,
//                           }}
//                           className="relative"
//                         >
//                           <div className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 shadow-lg border-2 border-white/20">
//                             {unreadCount > 9 ? "9+" : unreadCount}
//                           </div>

//                           {badgeAnimation && (
//                             <motion.div
//                               initial={{ scale: 1, opacity: 0.75 }}
//                               animate={{
//                                 scale: 1.4,
//                                 opacity: 0,
//                               }}
//                               transition={{
//                                 duration: 0.8,
//                                 repeat: 2,
//                                 repeatType: "reverse",
//                               }}
//                               className="absolute -top-1 -right-1 w-[18px] h-[18px] bg-red-600 rounded-full"
//                             ></motion.div>
//                           )}
//                         </motion.div>
//                       </div>
//                     )}
//                   </div>
//                 </motion.div>
//               </div>

//               {/* Cart */}
//               <motion.div
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 initial={{ opacity: 0, x: 20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 className="relative cursor-pointer group"
//                 onClick={() => navigate("/cart")}
//               >
//                 <div
//                   className={`p-2.5 rounded-xl border transition-all duration-300 ${
//                     cartPulse
//                       ? "bg-[#E1A95F]/20 border-[#E1A95F]/30"
//                       : "bg-white/5 border-white/10 dark:bg-gray-800/50 dark:border-gray-700 hover:bg-white/10 dark:hover:bg-gray-800"
//                   }`}
//                 >
//                   <FaShoppingCart className="text-[#E1A95F] text-lg group-hover:scale-110 transition-transform duration-300" />
//                 </div>
//                 {cartItemCount > 0 && (
//                   <motion.span
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     className={`absolute -top-1.5 -right-1.5 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg ${
//                       cartItemCount > 9
//                         ? "bg-gradient-to-r from-red-500 to-pink-500"
//                         : "bg-gradient-to-r from-green-500 to-emerald-500"
//                     }`}
//                   >
//                     {cartItemCount > 9 ? "9+" : cartItemCount}
//                   </motion.span>
//                 )}
//               </motion.div>

//               {/* User */}
//               {user && (
//                 <div className="relative" ref={userMenuRef}>
//                   <motion.div
//                     whileHover={{ scale: 1.1 }}
//                     whileTap={{ scale: 0.9 }}
//                     className="cursor-pointer p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 dark:bg-gray-800/50 dark:hover:bg-gray-800 transition-all duration-300 group"
//                     onClick={() => setUserMenuOpen(!userMenuOpen)}
//                   >
//                     <FaUser className="text-[#E1A95F] text-lg group-hover:scale-110 transition-transform duration-300" />
//                   </motion.div>
//                   <AnimatePresence>
//                     {userMenuOpen && (
//                       <motion.div
//                         className="fixed md:absolute right-0 top-20 md:top-full mt-2 w-screen md:w-56 bg-slate-900/95 dark:bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-700 dark:border-gray-300 p-4 md:max-w-[90vw] md:max-w-none"
//                         initial={{ opacity: 0, y: -10, scale: 0.95 }}
//                         animate={{ opacity: 1, y: 0, scale: 1 }}
//                         exit={{ opacity: 0, y: -10, scale: 0.95 }}
//                         transition={{ duration: 0.2 }}
//                       >
//                         <div className="space-y-3">
//                           <div className="pb-3 border-b border-slate-700 dark:border-gray-300">
//                             <div className="flex items-center gap-3">
//                               <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E1A95F] to-[#d4a259] flex items-center justify-center text-white font-bold text-lg">
//                                 {user.name?.charAt(0)?.toUpperCase() || "U"}
//                               </div>
//                               <div className="min-w-0 flex-1">
//                                 <div className="font-bold text-white dark:text-gray-900 truncate">
//                                   Hi, {user.name || "User"}
//                                 </div>
//                                 <div className="text-xs text-slate-400 dark:text-gray-600 truncate">
//                                   {user.email}
//                                 </div>
//                                 <div className="text-xs text-[#E1A95F] font-semibold mt-1">
//                                   {user.role === "admin"
//                                     ? "Administrator"
//                                     : "User"}
//                                 </div>
//                               </div>
//                             </div>
//                           </div>

//                           <Link
//                             to="/my-orders"
//                             className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 dark:text-gray-700 hover:text-[#E1A95F] hover:bg-slate-800/50 dark:hover:bg-gray-200 transition-all duration-300 group"
//                             onClick={() => setUserMenuOpen(false)}
//                           >
//                             <div className="w-1.5 h-1.5 bg-[#E1A95F]/50 rounded-full group-hover:bg-[#E1A95F] flex-shrink-0"></div>
//                             <span className="truncate">My Orders</span>
//                           </Link>

//                           {/* My Profile Link - Only for non-admin users */}
//                           {user.role !== "admin" && (
//                             <button
//                               onClick={() => {
//                                 setShowProfileModal(true);
//                                 setUserMenuOpen(false);
//                               }}
//                               className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 dark:text-gray-700 hover:text-[#E1A95F] hover:bg-slate-800/50 dark:hover:bg-gray-200 transition-all duration-300 group text-left"
//                             >
//                               <div className="w-1.5 h-1.5 bg-[#E1A95F]/50 rounded-full group-hover:bg-[#E1A95F] flex-shrink-0"></div>
//                               <span className="truncate">My Profile</span>
//                             </button>
//                           )}

//                           {user.role === "admin" && (
//                             <Link
//                               to="/admin"
//                               className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-green-400 hover:text-green-300 hover:bg-slate-800/50 dark:hover:bg-gray-200 transition-all duration-300 group"
//                               onClick={() => setUserMenuOpen(false)}
//                             >
//                               <div className="w-1.5 h-1.5 bg-green-500/50 rounded-full group-hover:bg-green-500 flex-shrink-0"></div>
//                               <span className="truncate">Admin Panel</span>
//                             </Link>
//                           )}

//                           <button
//                             onClick={() => {
//                               logout();
//                               setUserMenuOpen(false);
//                               localStorage.removeItem(
//                                 "notification_unread_count"
//                               );
//                               setUnreadCount(0);
//                             }}
//                             className="w-full mt-2 py-2.5 bg-gradient-to-r from-red-600/10 to-pink-600/10 hover:from-red-600/20 hover:to-pink-600/20 text-red-400 hover:text-red-300 rounded-xl font-medium transition-all duration-300 border border-red-500/20 flex items-center justify-center gap-2"
//                           >
//                             <FaSignOutAlt />
//                             <span className="truncate">Sign Out</span>
//                           </button>
//                         </div>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </div>
//               )}

//               {/* Mobile Menu Button */}
//               <motion.button
//                 whileHover={{ scale: 1.1 }}
//                 whileTap={{ scale: 0.9 }}
//                 onClick={() => setMenuOpen(!menuOpen)}
//                 className="lg:hidden p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 dark:bg-gray-800/50 dark:hover:bg-gray-800 transition-all duration-300"
//               >
//                 {menuOpen ? (
//                   <FaTimes className="text-[#E1A95F] text-xl" />
//                 ) : (
//                   <FaBars className="text-slate-300 dark:text-gray-600 text-xl" />
//                 )}
//               </motion.button>
//             </div>
//           </div>
//         </div>
//       </motion.nav>

//       {/* Mobile Menu Overlay */}
//       <AnimatePresence>
//         {menuOpen && (
//           <>
//             {/* Backdrop */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={() => setMenuOpen(false)}
//               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
//             />

//             {/* Mobile Menu Panel */}
//             <motion.div
//               initial={{ x: "100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "100%" }}
//               transition={{ type: "spring", damping: 25 }}
//               className="fixed top-0 right-0 h-full w-full max-w-sm z-50 lg:hidden"
//             >
//               <div className="h-full bg-gradient-to-b from-slate-900 to-slate-800 dark:from-white dark:to-gray-100 shadow-2xl overflow-y-auto">
//                 {/* Mobile Header */}
//                 <div className="p-6 border-b border-slate-700 dark:border-gray-300">
//                   <div className="flex items-center justify-between mb-6">
//                     <div className="flex items-center gap-3">
//                       <img src="/logo.png" alt="Logo" className="w-10 h-10" />
//                       <h2 className="text-2xl font-bold text-white dark:text-gray-900">
//                         Menu
//                       </h2>
//                     </div>
//                     <motion.button
//                       whileHover={{ scale: 1.1 }}
//                       whileTap={{ scale: 0.9 }}
//                       onClick={() => setMenuOpen(false)}
//                       className="p-2 rounded-xl bg-white/5 hover:bg-white/10 dark:bg-gray-800/50 dark:hover:bg-gray-800 transition-all duration-300"
//                     >
//                       <FaTimes className="text-[#E1A95F] text-xl" />
//                     </motion.button>
//                   </div>

//                   {/* User Info Mobile */}
//                   {user && (
//                     <div className="flex items-center gap-3 mb-6 p-4 rounded-xl bg-gradient-to-r from-[#E1A95F]/10 to-[#d4a259]/10 border border-[#E1A95F]/20">
//                       <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E1A95F] to-[#d4a259] flex items-center justify-center text-white font-bold text-lg">
//                         {user.name?.charAt(0)?.toUpperCase() || "U"}
//                       </div>
//                       <div className="min-w-0 flex-1">
//                         <div className="font-bold text-white dark:text-gray-900 truncate">
//                           {user.name || "User"}
//                         </div>
//                         <div className="text-sm text-slate-400 dark:text-gray-600 truncate">
//                           {user.email}
//                         </div>
//                         <div className="text-xs text-[#E1A95F] font-semibold mt-1">
//                           {user.role === "admin" ? "Administrator" : "User"}
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Mobile Links */}
//                 <div className="p-6 space-y-2">
//                   {mainPageLinks.map((link, index) => (
//                     <button
//                       key={index}
//                       onClick={() => handleNavigation(link)}
//                       className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 w-full text-left ${
//                         (location.pathname === link.path && !link.hash) ||
//                         (location.hash === link.hash &&
//                           location.pathname === "/")
//                           ? "bg-gradient-to-r from-[#E1A95F]/20 to-[#d4a259]/20 text-[#E1A95F]"
//                           : "text-slate-300 dark:text-gray-700 hover:text-white dark:hover:text-gray-900 hover:bg-slate-800 dark:hover:bg-gray-200"
//                       }`}
//                     >
//                       <div
//                         className={`w-1.5 h-1.5 rounded-full ${
//                           (location.pathname === link.path && !link.hash) ||
//                           (location.hash === link.hash &&
//                             location.pathname === "/")
//                             ? "bg-[#E1A95F]"
//                             : "bg-slate-600 dark:bg-gray-400"
//                         }`}
//                       ></div>
//                       <span className="font-medium truncate">{link.name}</span>
//                     </button>
//                   ))}

//                   {/* Shop Section Mobile */}
//                   <div className="space-y-2">
//                     <button
//                       onClick={() => toggleDropdown("shop-mobile")}
//                       className="flex items-center justify-between w-full px-4 py-3.5 rounded-xl text-slate-300 dark:text-gray-700 hover:text-white dark:hover:text-gray-900 hover:bg-slate-800 dark:hover:bg-gray-200 transition-all duration-300"
//                     >
//                       <div className="flex items-center gap-3">
//                         <div className="w-1.5 h-1.5 rounded-full bg-slate-600 dark:bg-gray-400 flex-shrink-0"></div>
//                         <span className="font-medium truncate">Shop</span>
//                       </div>
//                       <FaChevronDown
//                         className={`transition flex-shrink-0 ${
//                           openDropdown === "shop-mobile" ? "rotate-180" : ""
//                         }`}
//                       />
//                     </button>

//                     <AnimatePresence>
//                       {openDropdown === "shop-mobile" && (
//                         <motion.div
//                           initial={{ opacity: 0, height: 0 }}
//                           animate={{ opacity: 1, height: "auto" }}
//                           exit={{ opacity: 0, height: 0 }}
//                           className="ml-4 pl-4 border-l border-slate-700 dark:border-gray-300 space-y-2"
//                         >
//                           {categories.map((cat, i) => (
//                             <button
//                               key={i}
//                               onClick={() => {
//                                 navigate(`/category/${cat.name.toLowerCase()}`);
//                                 setMenuOpen(false);
//                               }}
//                               className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-slate-400 dark:text-gray-600 hover:text-[#E1A95F] hover:bg-slate-800/50 dark:hover:bg-gray-200 transition-all duration-300 text-left"
//                             >
//                               <div className="w-1 h-1 bg-slate-600 dark:bg-gray-400 rounded-full flex-shrink-0"></div>
//                               <span className="truncate">{cat.name}</span>
//                             </button>
//                           ))}
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </div>

//                   {/* My Profile in Mobile Menu - Only for non-admin users */}
//                   {user && user.role !== "admin" && (
//                     <button
//                       onClick={() => {
//                         setShowProfileModal(true);
//                         setMenuOpen(false);
//                       }}
//                       className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl text-slate-300 dark:text-gray-700 hover:text-white dark:hover:text-gray-900 hover:bg-slate-800 dark:hover:bg-gray-200 transition-all duration-300"
//                     >
//                       <div className="w-1.5 h-1.5 rounded-full bg-slate-600 dark:bg-gray-400 flex-shrink-0"></div>
//                       <span className="font-medium truncate">My Profile</span>
//                     </button>
//                   )}

//                   {/* Theme Toggle Mobile */}
//                   <div className="mt-6 pt-6 border-t border-slate-700 dark:border-gray-300">
//                     <div className="flex items-center justify-between px-4">
//                       <span className="text-slate-300 dark:text-gray-700 font-medium truncate">
//                         Theme
//                       </span>
//                       <ThemeToggle />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Mobile Footer */}
//                 <div className="p-6 border-t border-slate-700 dark:border-gray-300 mt-auto">
//                   <div className="space-y-3">
//                     <button
//                       onClick={() => {
//                         navigate("/notifications");
//                         setMenuOpen(false);
//                       }}
//                       className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl bg-slate-800/50 dark:bg-gray-200 hover:bg-slate-800 dark:hover:bg-gray-300 text-slate-300 dark:text-gray-700 hover:text-white dark:hover:text-gray-900 transition-all duration-300 relative"
//                     >
//                       <div className="flex items-center gap-3">
//                         <div className="relative">
//                           <FaBell className="text-[#E1A95F]" />
//                           {unreadCount > 0 && (
//                             <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-600 rounded-full border border-white animate-pulse"></div>
//                           )}
//                         </div>
//                         <span className="truncate">Notifications</span>
//                       </div>
//                       {unreadCount > 0 && (
//                         <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1 border-2 border-white/20">
//                           {unreadCount > 9 ? "9+" : unreadCount}
//                         </span>
//                       )}
//                     </button>

//                     {user && user.role === "admin" && (
//                       <button
//                         onClick={() => {
//                           navigate("/admin");
//                           setMenuOpen(false);
//                         }}
//                         className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl bg-gradient-to-r from-green-600/10 to-emerald-600/10 border border-green-500/20 text-green-400 hover:text-green-300 transition-all duration-300"
//                       >
//                         <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div>
//                         <span className="truncate">Admin Panel</span>
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* Profile Modal */}
//       <AnimatePresence>
//         {showProfileModal && user && user.role !== "admin" && (
//           <>
//             {/* Backdrop */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
//             />

//             {/* Modal */}
//             <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
//               <motion.div
//                 ref={profileModalRef}
//                 initial={{ opacity: 0, scale: 0.9, y: 20 }}
//                 animate={{ opacity: 1, scale: 1, y: 0 }}
//                 exit={{ opacity: 0, scale: 0.9, y: 20 }}
//                 transition={{ type: "spring", damping: 25 }}
//                 className="w-full max-w-2xl bg-gradient-to-b from-slate-900 to-slate-800 dark:from-white dark:to-gray-100 rounded-2xl shadow-2xl border border-slate-700 dark:border-gray-300 overflow-hidden max-h-[90vh] overflow-y-auto"
//               >
//                 {/* Modal Header */}
//                 <div className="p-6 border-b border-slate-700 dark:border-gray-300 bg-gradient-to-r from-[#E1A95F]/10 to-[#d4a259]/10">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center gap-3">
//                       <FaUserCircle className="text-3xl text-[#E1A95F]" />
//                       <div>
//                         <h2 className="text-2xl font-bold text-white dark:text-gray-900">
//                           My Profile
//                         </h2>
//                         <p className="text-slate-400 dark:text-gray-600">
//                           Manage your account settings
//                         </p>
//                       </div>
//                     </div>
//                     <button
//                       onClick={() => setShowProfileModal(false)}
//                       className="p-2 hover:bg-slate-800 dark:hover:bg-gray-200 rounded-xl transition-colors"
//                     >
//                       <FaTimes className="text-slate-400 dark:text-gray-600 text-xl" />
//                     </button>
//                   </div>
//                 </div>

//                 {/* Modal Body */}
//                 <div className="p-6">
//                   {/* Messages */}
//                   {profileSuccess && (
//                     <motion.div
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       className="mb-6 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl"
//                     >
//                       <p className="text-green-400 text-center">
//                         {profileSuccess}
//                       </p>
//                     </motion.div>
//                   )}

//                   {profileError && (
//                     <motion.div
//                       initial={{ opacity: 0, y: -10 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       className="mb-6 p-4 bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/20 rounded-xl"
//                     >
//                       <p className="text-red-400 text-center">{profileError}</p>
//                     </motion.div>
//                   )}

//                   <div className="grid md:grid-cols-3 gap-6">
//                     {/* Left Column - User Info */}
//                     <div className="md:col-span-1">
//                       <div className="bg-slate-800/50 dark:bg-gray-200 rounded-xl p-6 border border-slate-700 dark:border-gray-300">
//                         <div className="flex flex-col items-center">
//                           <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#E1A95F] to-[#d4a259] flex items-center justify-center mb-4">
//                             <span className="text-white text-3xl font-bold">
//                               {user.name?.charAt(0)?.toUpperCase() || "U"}
//                             </span>
//                           </div>

//                           <h3 className="text-xl font-bold text-white dark:text-gray-900 mb-1 truncate w-full text-center">
//                             {user.name || "User"}
//                           </h3>
//                           <p className="text-slate-400 dark:text-gray-600 mb-4 truncate w-full text-center">
//                             {user.email}
//                           </p>

//                           <div className="w-full bg-slate-700/50 dark:bg-gray-300 rounded-lg p-3 mt-4">
//                             <h4 className="text-white dark:text-gray-900 font-semibold mb-2">
//                               Account Status
//                             </h4>
//                             <div className="flex items-center justify-between mb-2">
//                               <span className="text-slate-400 dark:text-gray-700">
//                                 Verified
//                               </span>
//                               <div className="flex items-center gap-2">
//                                 {user.isVerified ? (
//                                   <>
//                                     <FaCheckCircle className="text-green-400 text-sm flex-shrink-0" />
//                                     <span className="text-xs font-semibold text-green-400 truncate">
//                                       Verified
//                                     </span>
//                                   </>
//                                 ) : (
//                                   <>
//                                     <FaTimesCircle className="text-yellow-400 text-sm flex-shrink-0" />
//                                     <span className="text-xs font-semibold text-yellow-400 truncate">
//                                       Not Verified
//                                     </span>
//                                   </>
//                                 )}
//                               </div>
//                             </div>
//                             <div className="flex items-center justify-between">
//                               <span className="text-slate-400 dark:text-gray-700">
//                                 Active
//                               </span>
//                               <div className="flex items-center gap-2">
//                                 {!user.isBlocked ? (
//                                   <>
//                                     <FaCheckCircle className="text-green-400 text-sm flex-shrink-0" />
//                                     <span className="text-xs font-semibold text-green-400 truncate">
//                                       Active
//                                     </span>
//                                   </>
//                                 ) : (
//                                   <>
//                                     <FaTimesCircle className="text-red-400 text-sm flex-shrink-0" />
//                                     <span className="text-xs font-semibold text-red-400 truncate">
//                                       Blocked
//                                     </span>
//                                   </>
//                                 )}
//                               </div>
//                             </div>
//                           </div>

//                           <p className="text-xs text-slate-500 dark:text-gray-500 mt-4 text-center">
//                             Member since{" "}
//                             {new Date(user.createdAt).toLocaleDateString()}
//                           </p>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Right Column - Form */}
//                     <div className="md:col-span-2">
//                       <form
//                         onSubmit={handleProfileSubmit}
//                         className="space-y-6"
//                       >
//                         {/* Basic Info */}
//                         <div className="space-y-4">
//                           <h3 className="text-lg font-semibold text-white dark:text-gray-900 flex items-center gap-2">
//                             <FaUser className="text-[#E1A95F]" />
//                             Basic Information
//                           </h3>

//                           <div>
//                             <label className="block text-slate-300 dark:text-gray-700 mb-2">
//                               Full Name
//                             </label>
//                             <input
//                               type="text"
//                               name="name"
//                               value={profileForm.name}
//                               onChange={handleProfileChange}
//                               className="w-full px-4 py-3 bg-slate-800/50 dark:bg-gray-100 border border-slate-700 dark:border-gray-300 rounded-xl text-white dark:text-gray-900 placeholder-slate-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E1A95F]/50 focus:border-[#E1A95F]/50 transition-all duration-300"
//                               required
//                             />
//                           </div>

//                           <div>
//                             <label className="block text-slate-300 dark:text-gray-700 mb-2">
//                               Email Address
//                             </label>
//                             <input
//                               type="email"
//                               name="email"
//                               value={profileForm.email}
//                               onChange={handleProfileChange}
//                               className="w-full px-4 py-3 bg-slate-800/50 dark:bg-gray-100 border border-slate-700 dark:border-gray-300 rounded-xl text-white dark:text-gray-900 placeholder-slate-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E1A95F]/50 focus:border-[#E1A95F]/50 transition-all duration-300"
//                               required
//                             />
//                           </div>

//                           <div>
//                             <label className="block text-slate-300 dark:text-gray-700 mb-2">
//                               Bio
//                             </label>
//                             <textarea
//                               name="bio"
//                               value={profileForm.bio}
//                               onChange={handleProfileChange}
//                               rows="2"
//                               className="w-full px-4 py-3 bg-slate-800/50 dark:bg-gray-100 border border-slate-700 dark:border-gray-300 rounded-xl text-white dark:text-gray-900 placeholder-slate-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E1A95F]/50 focus:border-[#E1A95F]/50 transition-all duration-300"
//                               placeholder="Tell us about yourself..."
//                             />
//                           </div>
//                         </div>

//                         {/* Password Change */}
//                         <div className="space-y-4 pt-6 border-t border-slate-700 dark:border-gray-300">
//                           <h3 className="text-lg font-semibold text-white dark:text-gray-900 flex items-center gap-2">
//                             <FaKey className="text-[#E1A95F]" />
//                             Change Password
//                           </h3>

//                           <div>
//                             <label className="block text-slate-300 dark:text-gray-700 mb-2">
//                               Current Password
//                             </label>
//                             <input
//                               type="password"
//                               name="currentPassword"
//                               value={profileForm.currentPassword}
//                               onChange={handleProfileChange}
//                               className="w-full px-4 py-3 bg-slate-800/50 dark:bg-gray-100 border border-slate-700 dark:border-gray-300 rounded-xl text-white dark:text-gray-900 placeholder-slate-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E1A95F]/50 focus:border-[#E1A95F]/50 transition-all duration-300"
//                               placeholder="Required to change password"
//                             />
//                           </div>

//                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                             <div>
//                               <label className="block text-slate-300 dark:text-gray-700 mb-2">
//                                 New Password
//                               </label>
//                               <input
//                                 type="password"
//                                 name="newPassword"
//                                 value={profileForm.newPassword}
//                                 onChange={handleProfileChange}
//                                 className="w-full px-4 py-3 bg-slate-800/50 dark:bg-gray-100 border border-slate-700 dark:border-gray-300 rounded-xl text-white dark:text-gray-900 placeholder-slate-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E1A95F]/50 focus:border-[#E1A95F]/50 transition-all duration-300"
//                                 placeholder="At least 6 characters"
//                               />
//                             </div>

//                             <div>
//                               <label className="block text-slate-300 dark:text-gray-700 mb-2">
//                                 Confirm Password
//                               </label>
//                               <input
//                                 type="password"
//                                 name="confirmPassword"
//                                 value={profileForm.confirmPassword}
//                                 onChange={handleProfileChange}
//                                 className="w-full px-4 py-3 bg-slate-800/50 dark:bg-gray-100 border border-slate-700 dark:border-gray-300 rounded-xl text-white dark:text-gray-900 placeholder-slate-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E1A95F]/50 focus:border-[#E1A95F]/50 transition-all duration-300"
//                                 placeholder="Confirm new password"
//                               />
//                             </div>
//                           </div>

//                           <div className="text-xs text-slate-400 dark:text-gray-600 mt-2">
//                             <FaTimesCircle className="inline mr-1" />
//                             Leave password fields empty if you don't want to
//                             change password
//                           </div>
//                         </div>

//                         {/* Action Buttons */}
//                         <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-700 dark:border-gray-300">
//                           <button
//                             type="submit"
//                             disabled={profileLoading}
//                             className="flex-1 py-3 bg-gradient-to-r from-[#E1A95F] to-[#d4a259] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-[#E1A95F]/25 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
//                           >
//                             {profileLoading ? (
//                               <>
//                                 <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin flex-shrink-0"></div>
//                                 <span className="truncate">Saving...</span>
//                               </>
//                             ) : (
//                               <>
//                                 <FaSave className="flex-shrink-0" />
//                                 <span className="truncate">Save Changes</span>
//                               </>
//                             )}
//                           </button>

//                           <button
//                             type="button"
//                             onClick={() => setShowDeleteConfirm(true)}
//                             className="py-3 px-6 bg-gradient-to-r from-red-600/10 to-pink-600/10 border border-red-500/20 text-red-400 hover:text-red-300 hover:from-red-600/20 hover:to-pink-600/20 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
//                           >
//                             <FaTrash className="flex-shrink-0" />
//                             <span className="truncate">Delete Account</span>
//                           </button>
//                         </div>
//                       </form>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* Delete Confirmation Modal */}
//       <AnimatePresence>
//         {showDeleteConfirm && (
//           <>
//             {/* Backdrop */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[102]"
//             />

//             {/* Modal */}
//             <div className="fixed inset-0 z-[103] flex items-center justify-center p-4">
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.9, y: 20 }}
//                 animate={{ opacity: 1, scale: 1, y: 0 }}
//                 exit={{ opacity: 0, scale: 0.9, y: 20 }}
//                 transition={{ type: "spring", damping: 25 }}
//                 className="w-full max-w-md bg-gradient-to-b from-slate-900 to-slate-800 dark:from-white dark:to-gray-100 rounded-2xl shadow-2xl border border-slate-700 dark:border-gray-300 p-6"
//               >
//                 <div className="text-center">
//                   <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-600/20 to-pink-600/20 flex items-center justify-center">
//                     <FaTrash className="text-red-500 text-2xl" />
//                   </div>

//                   <h3 className="text-2xl font-bold text-white dark:text-gray-900 mb-2 truncate">
//                     Delete Account
//                   </h3>
//                   <p className="text-slate-400 dark:text-gray-600 mb-6">
//                     This action cannot be undone. All your data will be
//                     permanently removed from our database.
//                   </p>

//                   <div className="mb-6">
//                     <label className="block text-slate-300 dark:text-gray-700 mb-2 text-left">
//                       Enter your password to confirm:
//                     </label>
//                     <input
//                       type="password"
//                       value={deletePassword}
//                       onChange={(e) => setDeletePassword(e.target.value)}
//                       className="w-full px-4 py-3 bg-slate-800/50 dark:bg-gray-100 border border-slate-700 dark:border-gray-300 rounded-xl text-white dark:text-gray-900 placeholder-slate-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300"
//                       placeholder="Your password"
//                     />
//                   </div>

//                   <div className="flex gap-4">
//                     <button
//                       onClick={() => setShowDeleteConfirm(false)}
//                       className="flex-1 py-3 bg-slate-700 dark:bg-gray-300 text-white dark:text-gray-900 rounded-xl font-semibold hover:bg-slate-600 dark:hover:bg-gray-400 transition-all duration-300 truncate"
//                     >
//                       Cancel
//                     </button>

//                     <button
//                       onClick={handleDeleteAccount}
//                       disabled={profileLoading}
//                       className="flex-1 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 disabled:opacity-50 truncate"
//                     >
//                       {profileLoading ? "Deleting..." : "Delete Account"}
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           </>
//         )}
//       </AnimatePresence>

//       {/* Scroll Progress Bar */}
//       {/* <motion.div
//         className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E1A95F] via-[#d4a259] to-[#E1A95F] z-50"
//         style={{ scaleX: scrolled ? 1 : 0 }}
//         transition={{ duration: 0.3 }}
//       /> */}
//     </>
//   );
// };

// export default Navigation;
// // import React, { useState, useContext, useEffect, useRef } from "react";
// // import { Link, useNavigate, useLocation } from "react-router-dom";
// // import {
// //   FaBars,
// //   FaTimes,
// //   FaShoppingCart,
// //   FaChevronDown,
// //   FaUser,
// //   FaBell,
// //   FaSearch,
// //   FaKey,
// //   FaTrash,
// //   FaSave,
// //   FaUserCircle,
// //   FaSignOutAlt,
// //   FaCheckCircle,
// //   FaTimesCircle,
// //   FaSpinner,
// //   FaBox,
// //   FaTag,
// //   FaFire,
// //   FaHistory,
// // } from "react-icons/fa";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { authContext } from "../Context/authContext";
// // import { cartContext } from "../Context/cartContext";
// // import { initSocket } from "../utils/socket";
// // import { fetchWithAuth } from "../utils/auth";

// // const API = import.meta.env.VITE_API_URL;

// // const Navigation = () => {
// //   const [menuOpen, setMenuOpen] = useState(false);
// //   const [openDropdown, setOpenDropdown] = useState(null);
// //   const [userMenuOpen, setUserMenuOpen] = useState(false);
// //   const [categories, setCategories] = useState([]);
// //   const [allCategories, setAllCategories] = useState([]);
// //   const [unreadCount, setUnreadCount] = useState(() => {
// //     const saved = localStorage.getItem("notification_unread_count");
// //     return saved ? parseInt(saved, 10) : 0;
// //   });
// //   const [scrolled, setScrolled] = useState(false);
// //   const [searchOpen, setSearchOpen] = useState(false);
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [cartPulse, setCartPulse] = useState(false);
// //   const [showProfileModal, setShowProfileModal] = useState(false);
// //   const [profileForm, setProfileForm] = useState({
// //     name: "",
// //     email: "",
// //     bio: "",
// //     currentPassword: "",
// //     newPassword: "",
// //     confirmPassword: "",
// //   });
// //   const [profileLoading, setProfileLoading] = useState(false);
// //   const [profileError, setProfileError] = useState("");
// //   const [profileSuccess, setProfileSuccess] = useState("");
// //   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
// //   const [deletePassword, setDeletePassword] = useState("");
// //   const [searchResults, setSearchResults] = useState([]);
// //   const [isSearching, setIsSearching] = useState(false);
// //   const [recentSearches, setRecentSearches] = useState([]);
// //   const [popularSearches, setPopularSearches] = useState([]);
// //   const [searchHistoryOpen, setSearchHistoryOpen] = useState(true);
// //   const [showAllCategories, setShowAllCategories] = useState(false);
// //   const [badgeAnimation, setBadgeAnimation] = useState(false);
// //   const [socketConnected, setSocketConnected] = useState(false);

// //   const searchRef = useRef(null);
// //   const searchInputRef = useRef(null);
// //   const profileModalRef = useRef(null);
// //   const userMenuRef = useRef(null);
// //   const socketRef = useRef(null);
// //   const soundRef = useRef(null);
// //   const mountedRef = useRef(true);
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const { user, logout, updateUser } = useContext(authContext);
// //   const { cart } = useContext(cartContext);

// //   // Main page section links
// //   const mainPageLinks = [
// //     { name: "Home", path: "/", hash: "#home" },
// //     { name: "Categories", path: "/#categories", hash: "#categories" },
// //     { name: "Products", path: "/#products", hash: "#products" },
// //     { name: "About-us", path: "/#about", hash: "#about" },
// //     { name: "Contact-us", path: "/#contact", hash: "#contact" },
// //     { name: "Blog", path: "/blog" },
// //   ];

// //   // Initialize sound
// //   useEffect(() => {
// //     soundRef.current = new Audio("/sounds/notification.mp3");
// //     soundRef.current.volume = 0.3;

// //     return () => {
// //       mountedRef.current = false;
// //       if (socketRef.current) {
// //         socketRef.current.disconnect();
// //         socketRef.current = null;
// //       }
// //     };
// //   }, []);

// //   // Update localStorage and document title when unreadCount changes
// //   useEffect(() => {
// //     localStorage.setItem("notification_unread_count", unreadCount.toString());
// //     updateDocumentTitle(unreadCount);
// //   }, [unreadCount]);

// //   // Update document title
// //   const updateDocumentTitle = (count) => {
// //     const baseTitle = document.title.replace(/^\(\d+\)\s*/, "") || "E-Commerce";
// //     if (count > 0) {
// //       document.title = `(${count}) ${baseTitle}`;
// //     } else {
// //       document.title = baseTitle;
// //     }
// //   };

// //   // Play notification sound
// //   const playNotificationSound = () => {
// //     if (soundRef.current) {
// //       soundRef.current.currentTime = 0;
// //       soundRef.current
// //         .play()
// //         .catch((e) => console.log("Sound play failed:", e));
// //     }
// //   };

// //   // Fetch categories for dropdown
// //   useEffect(() => {
// //     const fetchCategories = async () => {
// //       try {
// //         const res = await fetchWithAuth(`${API}/api/categories`);
// //         const data = await res.json();
// //         setCategories(data || []);
// //       } catch (err) {
// //         console.error("Categories fetch error:", err);
// //       }
// //     };
// //     fetchCategories();
// //   }, []);

// //   // Fetch all categories for search
// //   useEffect(() => {
// //     const fetchAllCategories = async () => {
// //       try {
// //         const res = await fetchWithAuth(
// //           `${API}/api/products/categories-for-search`
// //         );
// //         if (res.ok) {
// //           const data = await res.json();
// //           setAllCategories(data);
// //         }
// //       } catch (err) {
// //         console.error("All categories fetch error:", err);
// //       }
// //     };
// //     fetchAllCategories();
// //   }, []);

// //   // Fetch popular searches
// //   useEffect(() => {
// //     const fetchPopularSearches = async () => {
// //       try {
// //         const res = await fetchWithAuth(`${API}/api/products/popular-searches`);
// //         if (res.ok) {
// //           const data = await res.json();
// //           setPopularSearches(data || []);
// //         }
// //       } catch (err) {
// //         console.error("Popular searches error:", err);
// //       }
// //     };
// //     fetchPopularSearches();
// //   }, []);

// //   // Load recent searches
// //   useEffect(() => {
// //     const savedSearches = localStorage.getItem("recent_searches");
// //     if (savedSearches) {
// //       try {
// //         setRecentSearches(JSON.parse(savedSearches));
// //       } catch (e) {
// //         console.error("Error parsing recent searches:", e);
// //       }
// //     }
// //   }, []);

// //   // Save recent searches
// //   const saveRecentSearches = (searches) => {
// //     setRecentSearches(searches);
// //     localStorage.setItem("recent_searches", JSON.stringify(searches));
// //   };

// //   // Scroll effect
// //   useEffect(() => {
// //     const handleScroll = () => {
// //       setScrolled(window.scrollY > 20);
// //     };
// //     window.addEventListener("scroll", handleScroll);
// //     return () => window.removeEventListener("scroll", handleScroll);
// //   }, []);

// //   // Cart pulse animation
// //   useEffect(() => {
// //     if (cart?.items?.length > 0) {
// //       setCartPulse(true);
// //       const timer = setTimeout(() => setCartPulse(false), 1000);
// //       return () => clearTimeout(timer);
// //     }
// //   }, [cart?.items]);

// //   // Fetch initial unread count
// //   useEffect(() => {
// //     if (!user) {
// //       setUnreadCount(0);
// //       localStorage.setItem("notification_unread_count", "0");
// //       return;
// //     }

// //     fetchUnreadCount();
// //     setupSocketConnection();

// //     const pollingInterval = setInterval(() => {
// //       if (mountedRef.current && user) {
// //         fetchUnreadCount();
// //       }
// //     }, 60000);

// //     return () => {
// //       clearInterval(pollingInterval);
// //     };
// //   }, [user]);

// //   // Setup socket connection for notifications
// //   const setupSocketConnection = () => {
// //     if (!user || !mountedRef.current) return;

// //     console.log("🔌 Setting up socket connection for user:", user._id);

// //     try {
// //       const socket = initSocket();
// //       socketRef.current = socket;

// //       socket.on("connect", () => {
// //         console.log("✅ Navigation socket connected:", socket.id);
// //         setSocketConnected(true);

// //         if (user._id) {
// //           socket.emit("join", user._id);
// //           console.log(`👤 User ${user._id} joined socket room`);
// //         }
// //       });

// //       socket.on("connect_error", (error) => {
// //         console.error("❌ Navigation socket connect error:", error);
// //         setSocketConnected(false);
// //       });

// //       socket.on("disconnect", (reason) => {
// //         console.log("🔌 Navigation socket disconnected:", reason);
// //         setSocketConnected(false);
// //       });

// //       socket.on("notification", (newNotification) => {
// //         console.log("🔔 Navigation received notification:", newNotification);

// //         if (!mountedRef.current) return;

// //         setUnreadCount((prev) => {
// //           const newCount = prev + 1;
// //           localStorage.setItem(
// //             "notification_unread_count",
// //             newCount.toString()
// //           );
// //           return newCount;
// //         });

// //         setBadgeAnimation(true);
// //         playNotificationSound();
// //         setTimeout(() => setBadgeAnimation(false), 500);

// //         if ("Notification" in window && Notification.permission === "granted") {
// //           try {
// //             new Notification(newNotification.title || "New Notification", {
// //               body: newNotification.message,
// //               icon: "/logo.png",
// //               badge: "/logo.png",
// //               tag: newNotification._id || Date.now().toString(),
// //               requireInteraction: false,
// //             });
// //           } catch (notificationError) {
// //             console.log("Browser notification error:", notificationError);
// //           }
// //         }
// //       });

// //       socket.on("notification-count", (data) => {
// //         console.log("📊 Navigation received notification count:", data);

// //         if (!mountedRef.current) return;

// //         const newCount = data.count || 0;
// //         setUnreadCount(newCount);
// //         localStorage.setItem("notification_unread_count", newCount.toString());
// //         setBadgeAnimation(true);
// //         setTimeout(() => setBadgeAnimation(false), 300);
// //       });

// //       socket.on("notification-count-response", (data) => {
// //         console.log(
// //           "📊 Navigation received notification count response:",
// //           data
// //         );

// //         if (!mountedRef.current) return;

// //         const newCount = data.count || 0;
// //         setUnreadCount(newCount);
// //         localStorage.setItem("notification_unread_count", newCount.toString());
// //         setBadgeAnimation(true);
// //         setTimeout(() => setBadgeAnimation(false), 300);
// //       });

// //       const handleAppNotification = (event) => {
// //         const newNotification = event.detail;
// //         console.log(
// //           "📢 Navigation received app-notification:",
// //           newNotification
// //         );

// //         if (!mountedRef.current) return;

// //         setUnreadCount((prev) => {
// //           const newCount = prev + 1;
// //           localStorage.setItem(
// //             "notification_unread_count",
// //             newCount.toString()
// //           );
// //           return newCount;
// //         });

// //         setBadgeAnimation(true);
// //         playNotificationSound();
// //         setTimeout(() => setBadgeAnimation(false), 500);
// //       };

// //       const handleUpdateNotificationCount = (event) => {
// //         const { increment, decrement, count } = event.detail;
// //         console.log(
// //           "🔢 Navigation received update-notification-count:",
// //           event.detail
// //         );

// //         setUnreadCount((prev) => {
// //           let newCount = prev;

// //           if (count !== undefined) {
// //             newCount = count;
// //           } else if (increment !== undefined) {
// //             newCount = prev + (increment || 1);
// //           } else if (decrement !== undefined) {
// //             newCount = Math.max(0, prev - (decrement || 1));
// //           }

// //           console.log(`🔄 Updating badge count: ${prev} -> ${newCount}`);
// //           localStorage.setItem(
// //             "notification_unread_count",
// //             newCount.toString()
// //           );
// //           return newCount;
// //         });

// //         setBadgeAnimation(true);
// //         setTimeout(() => setBadgeAnimation(false), 300);
// //       };

// //       const handleNotificationAction = (event) => {
// //         const { action, count } = event.detail;
// //         console.log("📢 Navigation received notification action:", action);

// //         if (count !== undefined) {
// //           setUnreadCount(count);
// //           localStorage.setItem("notification_unread_count", count.toString());
// //         } else if (action === "mark-all-read" || action === "delete-all") {
// //           setUnreadCount(0);
// //           localStorage.setItem("notification_unread_count", "0");
// //         }
// //         setBadgeAnimation(true);
// //         setTimeout(() => setBadgeAnimation(false), 300);
// //       };

// //       window.addEventListener("app-notification", handleAppNotification);
// //       window.addEventListener(
// //         "update-notification-count",
// //         handleUpdateNotificationCount
// //       );
// //       window.addEventListener(
// //         "notification-action-completed",
// //         handleNotificationAction
// //       );

// //       return () => {
// //         if (socketRef.current) {
// //           socketRef.current.disconnect();
// //           socketRef.current = null;
// //         }
// //         window.removeEventListener("app-notification", handleAppNotification);
// //         window.removeEventListener(
// //           "update-notification-count",
// //           handleUpdateNotificationCount
// //         );
// //         window.removeEventListener(
// //           "notification-action-completed",
// //           handleNotificationAction
// //         );
// //         setSocketConnected(false);
// //       };
// //     } catch (error) {
// //       console.error("❌ Socket setup error:", error);
// //     }
// //   };

// //   // Fetch unread count function
// //   const fetchUnreadCount = async (retryCount = 0) => {
// //     if (!user) {
// //       setUnreadCount(0);
// //       localStorage.setItem("notification_unread_count", "0");
// //       return;
// //     }

// //     try {
// //       console.log("📊 Fetching unread count from server...");
// //       const res = await fetchWithAuth(`${API}/api/notifications/unread-count`);

// //       if (!res.ok) {
// //         throw new Error(`Failed to fetch unread count: ${res.status}`);
// //       }

// //       const data = await res.json();

// //       if (data.success) {
// //         const newCount = data.data?.count || 0;
// //         console.log("✅ Unread count fetched from server:", newCount);

// //         setUnreadCount(newCount);
// //         localStorage.setItem("notification_unread_count", newCount.toString());

// //         window.dispatchEvent(
// //           new CustomEvent("update-notification-count", {
// //             detail: { count: newCount },
// //           })
// //         );
// //       } else {
// //         console.error("❌ API error:", data.message);
// //         setUnreadCount(0);
// //         localStorage.setItem("notification_unread_count", "0");
// //       }
// //     } catch (err) {
// //       console.error("❌ Fetch unread count error:", err);

// //       if (retryCount < 2) {
// //         console.log(`🔄 Retrying fetch unread count (${retryCount + 1}/2)...`);
// //         setTimeout(() => fetchUnreadCount(retryCount + 1), 2000);
// //       } else {
// //         setUnreadCount(0);
// //         localStorage.setItem("notification_unread_count", "0");
// //       }
// //     }
// //   };

// //   // Close search when clicking outside
// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (searchRef.current && !searchRef.current.contains(event.target)) {
// //         setSearchOpen(false);
// //       }
// //     };
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   // Focus search input when search opens
// //   useEffect(() => {
// //     if (searchOpen && searchInputRef.current) {
// //       setTimeout(() => {
// //         searchInputRef.current.focus();
// //         setSearchHistoryOpen(true);
// //       }, 100);
// //     }
// //   }, [searchOpen]);

// //   // Close modals and dropdowns when clicking outside
// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
// //         setUserMenuOpen(false);
// //       }

// //       if (
// //         profileModalRef.current &&
// //         !profileModalRef.current.contains(event.target)
// //       ) {
// //         setShowProfileModal(false);
// //         setShowDeleteConfirm(false);
// //       }
// //     };

// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   // Initialize profile form when user data changes
// //   useEffect(() => {
// //     if (user) {
// //       setProfileForm({
// //         name: user.name || "",
// //         email: user.email || "",
// //         bio: user.bio || "",
// //         currentPassword: "",
// //         newPassword: "",
// //         confirmPassword: "",
// //       });
// //     }
// //   }, [user]);

// //   // Handle navigation to sections
// //   const handleNavigation = (link) => {
// //     if (link.hash) {
// //       // If we're already on the main page, scroll to section
// //       if (location.pathname === "/") {
// //         const element = document.getElementById(link.hash.replace("#", ""));
// //         if (element) {
// //           element.scrollIntoView({ behavior: "smooth" });
// //         }
// //       } else {
// //         // Navigate to main page with hash
// //         navigate(`/${link.hash}`);
// //       }
// //     } else {
// //       // Regular navigation
// //       navigate(link.path);
// //     }
// //     setMenuOpen(false);
// //     setOpenDropdown(null);
// //   };

// //   // 🔍 SEARCH FUNCTION
// //   const searchProducts = async (query) => {
// //     if (!query || query.trim() === "") {
// //       setSearchResults([]);
// //       setIsSearching(false);
// //       return;
// //     }

// //     setIsSearching(true);
// //     try {
// //       const res = await fetchWithAuth(
// //         `${API}/api/products/quick-search?q=${encodeURIComponent(query)}`
// //       );

// //       if (res.ok) {
// //         const data = await res.json();
// //         setSearchResults(data);

// //         if (data.length > 0 && !recentSearches.includes(query)) {
// //           const updated = [query, ...recentSearches].slice(0, 8);
// //           saveRecentSearches(updated);
// //         }
// //       } else {
// //         console.error("Search failed with status:", res.status);
// //         setSearchResults([]);
// //       }
// //     } catch (err) {
// //       console.error("Search error:", err);
// //       setSearchResults([]);
// //     } finally {
// //       setIsSearching(false);
// //     }
// //   };

// //   // Debounced search
// //   useEffect(() => {
// //     if (!searchOpen) return;

// //     const timer = setTimeout(() => {
// //       if (searchQuery.trim()) {
// //         searchProducts(searchQuery);
// //       } else {
// //         setSearchResults([]);
// //         setSearchHistoryOpen(true);
// //       }
// //     }, 350);

// //     return () => clearTimeout(timer);
// //   }, [searchQuery, searchOpen]);

// //   // Add to recent searches
// //   const addToRecentSearches = (query) => {
// //     const updated = [
// //       query,
// //       ...recentSearches.filter((s) => s.toLowerCase() !== query.toLowerCase()),
// //     ].slice(0, 8);
// //     saveRecentSearches(updated);
// //   };

// //   // Clear recent searches
// //   const clearRecentSearches = () => {
// //     saveRecentSearches([]);
// //   };

// //   // Handle search submission
// //   const handleSearch = (e, query = null, category = null) => {
// //     e?.preventDefault();
// //     const searchTerm = query || searchQuery.trim();

// //     if (searchTerm) {
// //       addToRecentSearches(searchTerm);

// //       if (category) {
// //         navigate(`/search?category=${encodeURIComponent(category)}`);
// //       } else {
// //         navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
// //       }

// //       setSearchOpen(false);
// //       setSearchQuery("");
// //       setSearchResults([]);
// //     }
// //   };

// //   // Handle category click from search
// //   const handleCategorySearch = (categoryName) => {
// //     addToRecentSearches(categoryName);
// //     navigate(`/search?category=${encodeURIComponent(categoryName)}`);
// //     setSearchOpen(false);
// //   };

// //   // Format price
// //   const formatPrice = (price) => {
// //     return new Intl.NumberFormat("en-US", {
// //       style: "currency",
// //       currency: "USD",
// //       minimumFractionDigits: 0,
// //     }).format(price);
// //   };

// //   const toggleDropdown = (key) =>
// //     setOpenDropdown(openDropdown === key ? null : key);

// //   const handleCategoryClick = (path) => {
// //     navigate(path);
// //     setMenuOpen(false);
// //     setOpenDropdown(null);
// //   };

// //   const handleProfileChange = (e) => {
// //     const { name, value } = e.target;
// //     setProfileForm((prev) => ({
// //       ...prev,
// //       [name]: value,
// //     }));
// //     setProfileError("");
// //     setProfileSuccess("");
// //   };

// //   const validateProfileForm = () => {
// //     if (profileForm.newPassword && profileForm.newPassword.length < 6) {
// //       setProfileError("New password must be at least 6 characters");
// //       return false;
// //     }

// //     if (
// //       profileForm.newPassword &&
// //       profileForm.newPassword !== profileForm.confirmPassword
// //     ) {
// //       setProfileError("New passwords do not match");
// //       return false;
// //     }

// //     return true;
// //   };

// //   const handleProfileSubmit = async (e) => {
// //     e.preventDefault();
// //     setProfileError("");
// //     setProfileSuccess("");

// //     if (!validateProfileForm()) return;

// //     setProfileLoading(true);

// //     try {
// //       const updateData = {
// //         name: profileForm.name,
// //         email: profileForm.email,
// //         bio: profileForm.bio,
// //       };

// //       if (profileForm.currentPassword && profileForm.newPassword) {
// //         updateData.currentPassword = profileForm.currentPassword;
// //         updateData.newPassword = profileForm.newPassword;
// //       }

// //       console.log("Sending update to:", `${API}/api/users/profile`);
// //       console.log("Update data:", updateData);

// //       const res = await fetchWithAuth(`${API}/api/users/profile`, {
// //         method: "PUT",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify(updateData),
// //       });

// //       console.log("Response status:", res.status);

// //       const contentType = res.headers.get("content-type");
// //       if (!contentType || !contentType.includes("application/json")) {
// //         const text = await res.text();
// //         console.error("Non-JSON response from server:", text.substring(0, 200));
// //         throw new Error(
// //           "Server returned non-JSON response. Please check if the API endpoint exists."
// //         );
// //       }

// //       const data = await res.json();
// //       console.log("Response data:", data);

// //       if (!res.ok) {
// //         throw new Error(
// //           data.message || `Failed to update profile (${res.status})`
// //         );
// //       }

// //       if (!data.success) {
// //         throw new Error(data.message || "Profile update failed");
// //       }

// //       if (data.user) {
// //         updateUser(data.user);
// //         setProfileSuccess("Profile updated successfully!");
// //       } else {
// //         throw new Error("No user data returned from server");
// //       }

// //       setProfileForm((prev) => ({
// //         ...prev,
// //         currentPassword: "",
// //         newPassword: "",
// //         confirmPassword: "",
// //       }));

// //       setTimeout(() => setProfileSuccess(""), 3000);
// //     } catch (err) {
// //       console.error("Profile update error:", err);
// //       setProfileError(
// //         err.message || "Failed to update profile. Please try again."
// //       );
// //     } finally {
// //       setProfileLoading(false);
// //     }
// //   };

// //   const handleDeleteAccount = async () => {
// //     if (!deletePassword.trim()) {
// //       setProfileError("Please enter your password to confirm account deletion");
// //       return;
// //     }

// //     setProfileLoading(true);

// //     try {
// //       console.log(
// //         "Sending delete request to:",
// //         `${API}/api/users/delete-account`
// //       );

// //       const res = await fetchWithAuth(`${API}/api/users/delete-account`, {
// //         method: "DELETE",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({ password: deletePassword }),
// //       });

// //       console.log("Delete response status:", res.status);

// //       const contentType = res.headers.get("content-type");
// //       if (!contentType || !contentType.includes("application/json")) {
// //         const text = await res.text();
// //         console.error("Non-JSON response from server:", text.substring(0, 200));
// //         throw new Error(
// //           "Server returned non-JSON response. Please check if the API endpoint exists."
// //         );
// //       }

// //       const data = await res.json();
// //       console.log("Delete response data:", data);

// //       if (!res.ok || !data.success) {
// //         throw new Error(data.message || "Failed to delete account");
// //       }

// //       logout();
// //       setShowProfileModal(false);
// //       navigate("/login");
// //     } catch (err) {
// //       console.error("Delete account error:", err);
// //       setProfileError(
// //         err.message || "Failed to delete account. Please try again."
// //       );
// //       setProfileLoading(false);
// //     }
// //   };

// //   const cartItemCount =
// //     cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

// //   return (
// //     <>
// //       {/* Navigation Container */}
// //       <motion.nav
// //         initial={{ y: -100 }}
// //         animate={{ y: 0 }}
// //         transition={{ duration: 0.5, type: "spring" }}
// //         className="fixed top-0 w-full z-50 transition-all duration-300 bg-gradient-to-b from-white/80 to-white/60 dark:from-gray-900/80 dark:to-gray-900/60 backdrop-blur-xl border-b border-white/20 dark:border-gray-700/30"
// //       >
// //         {/* Top Announcement Bar */}
// //         {/* <div className="bg-gradient-to-r from-[#E1A95F]/20 via-[#d4a259]/20 to-[#c5954d]/20 py-2 px-4 text-center">
// //           <p className="text-xs text-gray-800 dark:text-white/90 font-medium">
// //             🚚{" "}
// //             <span className="text-[#E1A95F] font-semibold">Free Shipping</span>{" "}
// //             on orders over $100 •
// //             <span className="text-green-600 dark:text-green-300 font-semibold ml-2">
// //               🎁 30% OFF
// //             </span>{" "}
// //             for new customers
// //           </p>
// //         </div> */}

// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="flex justify-between items-center h-16">
// //             {/* Logo with custom design */}
// //             <motion.div
// //               whileHover={{ scale: 1.05 }}
// //               whileTap={{ scale: 0.95 }}
// //               className="flex items-center"
// //             >
// //               <button
// //                 onClick={() => navigate("/")}
// //                 className="flex items-center"
// //               >
// //                 <div className="flex items-center">
// //                   {/* Main logo text with umbrella-like A design */}
// //                   <div className="relative">
// //                     <span className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white flex items-center">
// //                       {/* A letter with umbrella design */}
// //                       <span className="relative">
// //                         <span className="text-5xl md:text-6xl text-[#E1A95F] font-extrabold leading-none">
// //                           A
// //                         </span>
// //                         {/* Umbrella top decoration */}
// //                         <span className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-gradient-to-r from-[#E1A95F] to-[#d4a259] rounded-full"></span>
// //                         <span className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-3 bg-[#E1A95F] rounded-full"></span>
// //                       </span>

// //                       {/* d letter with Amharic-inspired design */}
// //                       <span className="text-3xl md:text-4xl text-gray-800 dark:text-gray-200 font-bold ml-1 relative">
// //                         ድ
// //                         <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#E1A95F]/50 rounded-full"></span>
// //                       </span>

// //                       {/* e letter removed as requested */}

// //                       {/* s letter with Amharic-inspired design */}
// //                       <span className="text-3xl md:text-4xl text-[#E1A95F] font-bold ml-1 relative">
// //                         ስ
// //                         <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#E1A95F]/30 rounded-full"></span>
// //                       </span>
// //                     </span>

// //                     {/* Cart text */}
// //                   </div>
// //                 </div>
// //               </button>
// //             </motion.div>

// //             {/* Desktop Navigation */}
// //             <ul className="hidden lg:flex items-center gap-1">
// //               {mainPageLinks.map((link, index) => (
// //                 <motion.li
// //                   key={index}
// //                   initial={{ opacity: 0, y: -10 }}
// //                   animate={{ opacity: 1, y: 0 }}
// //                   transition={{ delay: index * 0.1 }}
// //                   className="relative"
// //                 >
// //                   <button
// //                     onClick={() => handleNavigation(link)}
// //                     className={`relative px-4 py-2.5 mx-1 rounded-xl transition-all duration-300 font-medium ${
// //                       (location.pathname === link.path && !link.hash) ||
// //                       (location.hash === link.hash && location.pathname === "/")
// //                         ? "text-[#E1A95F] bg-[#E1A95F]/10 dark:text-[#E1A95F] dark:bg-[#E1A95F]/10"
// //                         : "text-gray-800 dark:text-gray-200 hover:text-[#E1A95F] hover:bg-[#E1A95F]/5 dark:hover:text-[#E1A95F] dark:hover:bg-white/5"
// //                     }`}
// //                   >
// //                     {link.name}
// //                     {(location.pathname === link.path && !link.hash) ||
// //                     (location.hash === link.hash &&
// //                       location.pathname === "/") ? (
// //                       <motion.div
// //                         layoutId="underline"
// //                         className="absolute left-4 right-4 h-0.5 bottom-1.5 bg-[#E1A95F] rounded-full"
// //                       />
// //                     ) : null}
// //                   </button>
// //                 </motion.li>
// //               ))}

// //               {/* Dynamic Shop Dropdown */}
// //               <motion.li className="relative">
// //                 <button
// //                   onClick={() => toggleDropdown("shop")}
// //                   className={`flex items-center gap-2 px-4 py-2.5 mx-1 rounded-xl transition-all duration-300 font-medium ${
// //                     openDropdown === "shop"
// //                       ? "text-[#E1A95F] bg-[#E1A95F]/10 dark:text-[#E1A95F] dark:bg-[#E1A95F]/10"
// //                       : "text-gray-800 dark:text-gray-200 hover:text-[#E1A95F] hover:bg-[#E1A95F]/5 dark:hover:text-[#E1A95F] dark:hover:bg-white/5"
// //                   }`}
// //                 >
// //                   Shop
// //                   <motion.span
// //                     animate={{ rotate: openDropdown === "shop" ? 180 : 0 }}
// //                     transition={{ duration: 0.3 }}
// //                   >
// //                     <FaChevronDown className="text-sm" />
// //                   </motion.span>
// //                 </button>
// //                 <AnimatePresence>
// //                   {openDropdown === "shop" && (
// //                     <motion.div
// //                       className="absolute left-0 top-full mt-2 min-w-[220px] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-3"
// //                       initial={{ opacity: 0, y: -10, scale: 0.95 }}
// //                       animate={{ opacity: 1, y: 0, scale: 1 }}
// //                       exit={{ opacity: 0, y: -10, scale: 0.95 }}
// //                       transition={{ duration: 0.2 }}
// //                     >
// //                       <div className="space-y-2">
// //                         {categories.map((cat, i) => (
// //                           <motion.button
// //                             key={i}
// //                             initial={{ opacity: 0, x: -10 }}
// //                             animate={{ opacity: 1, x: 0 }}
// //                             transition={{ duration: 0.2, delay: i * 0.05 }}
// //                             onClick={() =>
// //                               handleCategoryClick(
// //                                 `/category/${cat.name.toLowerCase()}`
// //                               )
// //                             }
// //                             className="w-full text-left px-3 py-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:text-[#E1A95F] hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-300 flex items-center gap-3 group"
// //                           >
// //                             <div className="w-2 h-2 bg-[#E1A95F]/50 rounded-full group-hover:bg-[#E1A95F] transition-all duration-300"></div>
// //                             <span className="font-medium">{cat.name}</span>
// //                           </motion.button>
// //                         ))}
// //                       </div>
// //                     </motion.div>
// //                   )}
// //                 </AnimatePresence>
// //               </motion.li>
// //             </ul>

// //             {/* Right Icons */}
// //             <div className="flex items-center gap-3 md:gap-4">
// //               {/* Enhanced Search */}
// //               <div ref={searchRef} className="">
// //                 <motion.button
// //                   whileHover={{ scale: 1.1 }}
// //                   whileTap={{ scale: 0.9 }}
// //                   onClick={() => {
// //                     setSearchOpen(!searchOpen);
// //                     setSearchHistoryOpen(true);
// //                   }}
// //                   className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 transition-all duration-300 group"
// //                 >
// //                   <FaSearch className="text-gray-600 dark:text-gray-400 group-hover:text-[#E1A95F] text-lg transition-colors duration-300" />
// //                 </motion.button>

// //                 <AnimatePresence>
// //                   {searchOpen && (
// //                     <motion.div
// //                       initial={{ opacity: 0, scale: 0.9, y: 10 }}
// //                       animate={{ opacity: 1, scale: 1, y: 0 }}
// //                       exit={{ opacity: 0, scale: 0.9, y: 10 }}
// //                       className="absolute max-sm:right-0 right-10 top-full mt-2 max-sm:w-full w-[50%] max-w-2xl backdrop-blur-sm rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
// //                     >
// //                       {/* Search Input */}
// //                       <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95">
// //                         <form
// //                           onSubmit={(e) => handleSearch(e)}
// //                           className="relative"
// //                         >
// //                           <div className="relative">
// //                             <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
// //                             <input
// //                               ref={searchInputRef}
// //                               type="text"
// //                               value={searchQuery}
// //                               onChange={(e) => {
// //                                 setSearchQuery(e.target.value);
// //                                 setSearchHistoryOpen(e.target.value === "");
// //                               }}
// //                               placeholder="Search products, brands, categories..."
// //                               className="w-full pl-10 pr-10 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E1A95F]/50 focus:border-[#E1A95F]/50 transition-all duration-300"
// //                             />
// //                             {searchQuery && (
// //                               <button
// //                                 type="button"
// //                                 onClick={() => {
// //                                   setSearchQuery("");
// //                                   setSearchResults([]);
// //                                   setSearchHistoryOpen(true);
// //                                 }}
// //                                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
// //                               >
// //                                 <FaTimesCircle />
// //                               </button>
// //                             )}
// //                           </div>
// //                           {isSearching && (
// //                             <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
// //                               <FaSpinner className="animate-spin text-[#E1A95F]" />
// //                             </div>
// //                           )}
// //                         </form>
// //                       </div>

// //                       {/* Search Content */}
// //                       <div className="max-h-96 overflow-y-auto bg-white/95 dark:bg-gray-900/95">
// //                         {/* Recent Searches */}
// //                         {searchHistoryOpen &&
// //                           recentSearches.length > 0 &&
// //                           !searchQuery && (
// //                             <div className="p-4 border-b border-gray-200 dark:border-gray-700">
// //                               <div className="flex items-center justify-between mb-3">
// //                                 <div className="flex items-center gap-2">
// //                                   <FaHistory className="text-gray-500 text-sm" />
// //                                   <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
// //                                     Recent Searches
// //                                   </h3>
// //                                 </div>
// //                                 <button
// //                                   onClick={clearRecentSearches}
// //                                   className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
// //                                 >
// //                                   Clear All
// //                                 </button>
// //                               </div>
// //                               <div className="space-y-2">
// //                                 {recentSearches.map((search, index) => (
// //                                   <button
// //                                     key={index}
// //                                     onClick={() => {
// //                                       setSearchQuery(search);
// //                                       handleSearch(null, search);
// //                                     }}
// //                                     className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-300 group"
// //                                   >
// //                                     <div className="flex items-center gap-3">
// //                                       <FaSearch className="text-gray-500 text-sm group-hover:text-[#E1A95F]" />
// //                                       <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
// //                                         {search}
// //                                       </span>
// //                                     </div>
// //                                     <FaTimesCircle
// //                                       onClick={(e) => {
// //                                         e.stopPropagation();
// //                                         const updated = recentSearches.filter(
// //                                           (_, i) => i !== index
// //                                         );
// //                                         saveRecentSearches(updated);
// //                                       }}
// //                                       className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-400 text-sm opacity-0 group-hover:opacity-100 transition-all"
// //                                     />
// //                                   </button>
// //                                 ))}
// //                               </div>
// //                             </div>
// //                           )}

// //                         {/* Popular Searches */}
// //                         {searchHistoryOpen &&
// //                           popularSearches.length > 0 &&
// //                           !searchQuery && (
// //                             <div className="p-4 border-b border-gray-200 dark:border-gray-700">
// //                               <div className="flex items-center gap-2 mb-3">
// //                                 <FaFire className="text-amber-500 text-sm" />
// //                                 <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
// //                                   Popular Searches
// //                                 </h3>
// //                               </div>
// //                               <div className="flex flex-wrap gap-2">
// //                                 {popularSearches
// //                                   .slice(0, 6)
// //                                   .map((search, index) => (
// //                                     <button
// //                                       key={index}
// //                                       onClick={() => {
// //                                         setSearchQuery(search);
// //                                         handleSearch(null, search);
// //                                       }}
// //                                       className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-[#E1A95F]/20 text-gray-700 dark:text-gray-300 hover:text-[#E1A95F] rounded-lg text-sm transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-[#E1A95F]/30"
// //                                     >
// //                                       {search}
// //                                     </button>
// //                                   ))}
// //                               </div>
// //                             </div>
// //                           )}

// //                         {/* Categories */}
// //                         {searchHistoryOpen &&
// //                           allCategories.length > 0 &&
// //                           !searchQuery && (
// //                             <div className="p-4">
// //                               <div className="flex items-center gap-2 mb-3">
// //                                 <FaTag className="text-[#E1A95F] text-sm" />
// //                                 <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
// //                                   Browse Categories
// //                                 </h3>
// //                               </div>
// //                               <div className="grid grid-cols-2 gap-2">
// //                                 {allCategories
// //                                   .slice(0, showAllCategories ? 20 : 6)
// //                                   .map((category, index) => (
// //                                     <button
// //                                       key={index}
// //                                       onClick={() =>
// //                                         handleCategorySearch(category.name)
// //                                       }
// //                                       className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100/50 dark:bg-gray-800/30 hover:bg-gray-100 dark:hover:bg-gray-800/70 transition-all duration-300 group"
// //                                     >
// //                                       <FaBox className="text-gray-500 text-sm group-hover:text-[#E1A95F]" />
// //                                       <span className="text-gray-700 dark:text-gray-300 text-sm truncate">
// //                                         {category.name}
// //                                       </span>
// //                                     </button>
// //                                   ))}
// //                               </div>
// //                               {allCategories.length > 6 && (
// //                                 <button
// //                                   onClick={() =>
// //                                     setShowAllCategories(!showAllCategories)
// //                                   }
// //                                   className="w-full mt-3 text-center text-xs text-gray-500 hover:text-[#E1A95F] transition-colors"
// //                                 >
// //                                   {showAllCategories
// //                                     ? "Show Less"
// //                                     : `Show All ${allCategories.length} Categories`}
// //                                 </button>
// //                               )}
// //                             </div>
// //                           )}

// //                         {/* Search Results */}
// //                         {searchQuery && (
// //                           <div className="p-4">
// //                             <div className="flex items-center justify-between mb-3">
// //                               <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
// //                                 {searchResults.length > 0
// //                                   ? `Found ${searchResults.length} results`
// //                                   : isSearching
// //                                     ? "Searching..."
// //                                     : "No results found"}
// //                               </h3>
// //                               {searchResults.length > 0 && (
// //                                 <button
// //                                   onClick={(e) => handleSearch(e)}
// //                                   className="text-xs text-[#E1A95F] hover:text-[#d4a259] font-medium"
// //                                 >
// //                                   See all →
// //                                 </button>
// //                               )}
// //                             </div>

// //                             {searchResults.length > 0 ? (
// //                               <div className="space-y-3">
// //                                 {searchResults.slice(0, 5).map((product) => (
// //                                   <Link
// //                                     key={product._id}
// //                                     to={`/product/${product._id}`}
// //                                     onClick={() => {
// //                                       setSearchOpen(false);
// //                                       setSearchQuery("");
// //                                     }}
// //                                     className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-300 group"
// //                                   >
// //                                     <div className="w-20 h-20 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
// //                                       {product.image ? (
// //                                         <img
// //                                           src={
// //                                             product.image.startsWith("http")
// //                                               ? product.image
// //                                               : `${API}${product.image}`
// //                                           }
// //                                           alt={product.name}
// //                                           className="w-full h-full object-contain"
// //                                           onError={(e) => {
// //                                             e.target.onerror = null;
// //                                             e.target.src =
// //                                               "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop";
// //                                           }}
// //                                         />
// //                                       ) : (
// //                                         <FaBox className="text-gray-500" />
// //                                       )}
// //                                     </div>
// //                                     <div className="flex-1 min-w-0">
// //                                       <div className="flex items-start justify-between gap-2">
// //                                         <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate group-hover:text-[#E1A95F]">
// //                                           {product.name}
// //                                         </h4>
// //                                         <span className="text-sm font-semibold text-[#E1A95F] flex-shrink-0">
// //                                           {formatPrice(product.price)}
// //                                         </span>
// //                                       </div>
// //                                       <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
// //                                         {product.category || "Uncategorized"}
// //                                       </p>
// //                                       <div className="flex items-center gap-2 mt-1">
// //                                         {product.isSold ||
// //                                         product.stock === 0 ? (
// //                                           <span className="text-xs text-red-500">
// //                                             Sold Out
// //                                           </span>
// //                                         ) : (
// //                                           <span className="text-xs text-green-500">
// //                                             {product.stock || 0} in stock
// //                                           </span>
// //                                         )}
// //                                       </div>
// //                                     </div>
// //                                   </Link>
// //                                 ))}
// //                               </div>
// //                             ) : !isSearching ? (
// //                               <div className="text-center py-6">
// //                                 <div className="w-12 h-12 mx-auto rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-3">
// //                                   <FaSearch className="text-gray-500" />
// //                                 </div>
// //                                 <p className="text-gray-600 dark:text-gray-400 text-sm">
// //                                   No products found for "{searchQuery}"
// //                                 </p>
// //                                 <p className="text-gray-500 text-xs mt-2">
// //                                   Try different keywords
// //                                 </p>
// //                               </div>
// //                             ) : null}
// //                           </div>
// //                         )}
// //                       </div>

// //                       {/* Search Footer */}
// //                       {searchQuery && (
// //                         <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50">
// //                           <button
// //                             onClick={(e) => handleSearch(e)}
// //                             className="w-full py-2.5 bg-gradient-to-r from-[#E1A95F] to-[#d4a259] text-white rounded-xl font-medium hover:shadow-lg hover:shadow-[#E1A95F]/25 transition-all duration-300 flex items-center justify-center gap-2"
// //                           >
// //                             <FaSearch />
// //                             Search for "{searchQuery}"
// //                           </button>
// //                         </div>
// //                       )}
// //                     </motion.div>
// //                   )}
// //                 </AnimatePresence>
// //               </div>

// //               {/* Notifications with YouTube-style badge */}
// //               <div className="relative">
// //                 <motion.div
// //                   whileHover={{ scale: 1.1 }}
// //                   whileTap={{ scale: 0.9 }}
// //                   className="relative cursor-pointer group"
// //                   onClick={() => navigate("/notifications")}
// //                 >
// //                   <div className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 transition-all duration-300 relative">
// //                     <FaBell className="text-gray-600 dark:text-gray-400 group-hover:text-[#E1A95F] text-lg transition-colors duration-300" />

// //                     {/* Socket connection indicator */}
// //                     {socketConnected && (
// //                       <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse border border-white"></div>
// //                     )}

// //                     {/* YouTube-style notification badge */}
// //                     {unreadCount > 0 && (
// //                       <div className="absolute top-0 right-0">
// //                         <motion.div
// //                           key={`badge-${unreadCount}-${badgeAnimation}`}
// //                           initial={{ scale: 0 }}
// //                           animate={{ scale: 1 }}
// //                           whileHover={{ scale: 1.1 }}
// //                           transition={{
// //                             duration: 0.3,
// //                             type: "spring",
// //                             stiffness: 300,
// //                           }}
// //                           className="relative"
// //                         >
// //                           <div className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 shadow-lg border-2 border-white/20">
// //                             {unreadCount > 9 ? "9+" : unreadCount}
// //                           </div>

// //                           {badgeAnimation && (
// //                             <motion.div
// //                               initial={{ scale: 1, opacity: 0.75 }}
// //                               animate={{
// //                                 scale: 1.4,
// //                                 opacity: 0,
// //                               }}
// //                               transition={{
// //                                 duration: 0.8,
// //                                 repeat: 2,
// //                                 repeatType: "reverse",
// //                               }}
// //                               className="absolute -top-1 -right-1 w-[18px] h-[18px] bg-red-600 rounded-full"
// //                             ></motion.div>
// //                           )}
// //                         </motion.div>
// //                       </div>
// //                     )}
// //                   </div>
// //                 </motion.div>
// //               </div>

// //               {/* Cart */}
// //               <motion.div
// //                 whileHover={{ scale: 1.1 }}
// //                 whileTap={{ scale: 0.9 }}
// //                 initial={{ opacity: 0, x: 20 }}
// //                 animate={{ opacity: 1, x: 0 }}
// //                 className="relative cursor-pointer group"
// //                 onClick={() => navigate("/cart")}
// //               >
// //                 <div
// //                   className={`p-2.5 rounded-xl border transition-all duration-300 ${
// //                     cartPulse
// //                       ? "bg-[#E1A95F]/20 border-[#E1A95F]/30"
// //                       : "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700"
// //                   }`}
// //                 >
// //                   <FaShoppingCart className="text-[#E1A95F] text-lg group-hover:scale-110 transition-transform duration-300" />
// //                 </div>
// //                 {cartItemCount > 0 && (
// //                   <motion.span
// //                     initial={{ scale: 0 }}
// //                     animate={{ scale: 1 }}
// //                     className={`absolute -top-1.5 -right-1.5 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg ${
// //                       cartItemCount > 9
// //                         ? "bg-gradient-to-r from-red-500 to-pink-500"
// //                         : "bg-gradient-to-r from-green-500 to-emerald-500"
// //                     }`}
// //                   >
// //                     {cartItemCount > 9 ? "9+" : cartItemCount}
// //                   </motion.span>
// //                 )}
// //               </motion.div>

// //               {/* User */}
// //               {user && (
// //                 <div className="relative" ref={userMenuRef}>
// //                   <motion.div
// //                     whileHover={{ scale: 1.1 }}
// //                     whileTap={{ scale: 0.9 }}
// //                     className="cursor-pointer p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 transition-all duration-300 group"
// //                     onClick={() => setUserMenuOpen(!userMenuOpen)}
// //                   >
// //                     <FaUser className="text-[#E1A95F] text-lg group-hover:scale-110 transition-transform duration-300" />
// //                   </motion.div>
// //                   <AnimatePresence>
// //                     {userMenuOpen && (
// //                       <motion.div
// //                         className="fixed md:absolute right-0 top-20 md:top-full mt-2 w-screen md:w-56 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 md:max-w-[90vw] md:max-w-none"
// //                         initial={{ opacity: 0, y: -10, scale: 0.95 }}
// //                         animate={{ opacity: 1, y: 0, scale: 1 }}
// //                         exit={{ opacity: 0, y: -10, scale: 0.95 }}
// //                         transition={{ duration: 0.2 }}
// //                       >
// //                         <div className="space-y-3">
// //                           <div className="pb-3 border-b border-gray-200 dark:border-gray-700">
// //                             <div className="flex items-center gap-3">
// //                               <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E1A95F] to-[#d4a259] flex items-center justify-center text-white font-bold text-lg">
// //                                 {user.name?.charAt(0)?.toUpperCase() || "U"}
// //                               </div>
// //                               <div className="min-w-0 flex-1">
// //                                 <div className="font-bold text-gray-900 dark:text-white truncate">
// //                                   Hi, {user.name || "User"}
// //                                 </div>
// //                                 <div className="text-xs text-gray-600 dark:text-gray-400 truncate">
// //                                   {user.email}
// //                                 </div>
// //                                 <div className="text-xs text-[#E1A95F] font-semibold mt-1">
// //                                   {user.role === "admin"
// //                                     ? "Administrator"
// //                                     : "User"}
// //                                 </div>
// //                               </div>
// //                             </div>
// //                           </div>

// //                           <Link
// //                             to="/my-orders"
// //                             className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:text-[#E1A95F] hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-300 group"
// //                             onClick={() => setUserMenuOpen(false)}
// //                           >
// //                             <div className="w-1.5 h-1.5 bg-[#E1A95F]/50 rounded-full group-hover:bg-[#E1A95F] flex-shrink-0"></div>
// //                             <span className="truncate">My Orders</span>
// //                           </Link>

// //                           {/* My Profile Link - Only for non-admin users */}
// //                           {user.role !== "admin" && (
// //                             <button
// //                               onClick={() => {
// //                                 setShowProfileModal(true);
// //                                 setUserMenuOpen(false);
// //                               }}
// //                               className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 dark:text-gray-300 hover:text-[#E1A95F] hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-300 group text-left"
// //                             >
// //                               <div className="w-1.5 h-1.5 bg-[#E1A95F]/50 rounded-full group-hover:bg-[#E1A95F] flex-shrink-0"></div>
// //                               <span className="truncate">My Profile</span>
// //                             </button>
// //                           )}

// //                           {user.role === "admin" && (
// //                             <Link
// //                               to="/admin"
// //                               className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-green-600 dark:text-green-400 hover:text-green-500 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-300 group"
// //                               onClick={() => setUserMenuOpen(false)}
// //                             >
// //                               <div className="w-1.5 h-1.5 bg-green-500/50 rounded-full group-hover:bg-green-500 flex-shrink-0"></div>
// //                               <span className="truncate">Admin Panel</span>
// //                             </Link>
// //                           )}

// //                           <button
// //                             onClick={() => {
// //                               logout();
// //                               setUserMenuOpen(false);
// //                               localStorage.removeItem(
// //                                 "notification_unread_count"
// //                               );
// //                               setUnreadCount(0);
// //                             }}
// //                             className="w-full mt-2 py-2.5 bg-gradient-to-r from-red-600/10 to-pink-600/10 hover:from-red-600/20 hover:to-pink-600/20 text-red-600 dark:text-red-400 hover:text-red-500 rounded-xl font-medium transition-all duration-300 border border-red-500/20 flex items-center justify-center gap-2"
// //                           >
// //                             <FaSignOutAlt />
// //                             <span className="truncate">Sign Out</span>
// //                           </button>
// //                         </div>
// //                       </motion.div>
// //                     )}
// //                   </AnimatePresence>
// //                 </div>
// //               )}

// //               {/* Mobile Menu Button */}
// //               <motion.button
// //                 whileHover={{ scale: 1.1 }}
// //                 whileTap={{ scale: 0.9 }}
// //                 onClick={() => setMenuOpen(!menuOpen)}
// //                 className="lg:hidden p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 transition-all duration-300"
// //               >
// //                 {menuOpen ? (
// //                   <FaTimes className="text-[#E1A95F] text-xl" />
// //                 ) : (
// //                   <FaBars className="text-gray-600 dark:text-gray-400 text-xl" />
// //                 )}
// //               </motion.button>
// //             </div>
// //           </div>
// //         </div>
// //       </motion.nav>

// //       {/* Mobile Menu Overlay */}
// //       <AnimatePresence>
// //         {menuOpen && (
// //           <>
// //             {/* Backdrop */}
// //             <motion.div
// //               initial={{ opacity: 0 }}
// //               animate={{ opacity: 1 }}
// //               exit={{ opacity: 0 }}
// //               onClick={() => setMenuOpen(false)}
// //               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
// //             />

// //             {/* Mobile Menu Panel */}
// //             <motion.div
// //               initial={{ x: "100%" }}
// //               animate={{ x: 0 }}
// //               exit={{ x: "100%" }}
// //               transition={{ type: "spring", damping: 25 }}
// //               className="fixed top-0 right-0 h-full w-full max-w-sm z-50 lg:hidden"
// //             >
// //               <div className="h-full bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 shadow-2xl overflow-y-auto">
// //                 {/* Mobile Header */}
// //                 <div className="p-6 border-b border-gray-200 dark:border-gray-700">
// //                   <div className="flex items-center justify-between mb-6">
// //                     <div className="flex items-center gap-3">
// //                       {/* Mobile Logo */}
// //                       <div className="flex items-center">
// //                         <span className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
// //                           <span className="relative">
// //                             <span className="text-4xl text-[#E1A95F] font-extrabold leading-none">
// //                               A
// //                             </span>
// //                             <span className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-5 h-2 bg-gradient-to-r from-[#E1A95F] to-[#d4a259] rounded-full"></span>
// //                           </span>
// //                           <span className="text-2xl text-gray-800 dark:text-gray-200 font-bold ml-1">
// //                             ድ
// //                           </span>
// //                           <span className="text-2xl text-[#E1A95F] font-bold ml-1">
// //                             ስ
// //                           </span>
// //                           <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 ml-2">
// //                             Cart
// //                           </span>
// //                         </span>
// //                       </div>
// //                     </div>
// //                     <motion.button
// //                       whileHover={{ scale: 1.1 }}
// //                       whileTap={{ scale: 0.9 }}
// //                       onClick={() => setMenuOpen(false)}
// //                       className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
// //                     >
// //                       <FaTimes className="text-[#E1A95F] text-xl" />
// //                     </motion.button>
// //                   </div>

// //                   {/* User Info Mobile */}
// //                   {user && (
// //                     <div className="flex items-center gap-3 mb-6 p-4 rounded-xl bg-gradient-to-r from-[#E1A95F]/10 to-[#d4a259]/10 border border-[#E1A95F]/20">
// //                       <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E1A95F] to-[#d4a259] flex items-center justify-center text-white font-bold text-lg">
// //                         {user.name?.charAt(0)?.toUpperCase() || "U"}
// //                       </div>
// //                       <div className="min-w-0 flex-1">
// //                         <div className="font-bold text-gray-900 dark:text-white truncate">
// //                           {user.name || "User"}
// //                         </div>
// //                         <div className="text-sm text-gray-600 dark:text-gray-400 truncate">
// //                           {user.email}
// //                         </div>
// //                         <div className="text-xs text-[#E1A95F] font-semibold mt-1">
// //                           {user.role === "admin" ? "Administrator" : "User"}
// //                         </div>
// //                       </div>
// //                     </div>
// //                   )}
// //                 </div>

// //                 {/* Mobile Links */}
// //                 <div className="p-6 space-y-2">
// //                   {mainPageLinks.map((link, index) => (
// //                     <button
// //                       key={index}
// //                       onClick={() => handleNavigation(link)}
// //                       className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 w-full text-left ${
// //                         (location.pathname === link.path && !link.hash) ||
// //                         (location.hash === link.hash &&
// //                           location.pathname === "/")
// //                           ? "bg-gradient-to-r from-[#E1A95F]/20 to-[#d4a259]/20 text-[#E1A95F]"
// //                           : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
// //                       }`}
// //                     >
// //                       <div
// //                         className={`w-1.5 h-1.5 rounded-full ${
// //                           (location.pathname === link.path && !link.hash) ||
// //                           (location.hash === link.hash &&
// //                             location.pathname === "/")
// //                             ? "bg-[#E1A95F]"
// //                             : "bg-gray-400 dark:bg-gray-600"
// //                         }`}
// //                       ></div>
// //                       <span className="font-medium truncate">{link.name}</span>
// //                     </button>
// //                   ))}

// //                   {/* Shop Section Mobile */}
// //                   <div className="space-y-2">
// //                     <button
// //                       onClick={() => toggleDropdown("shop-mobile")}
// //                       className="flex items-center justify-between w-full px-4 py-3.5 rounded-xl text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
// //                     >
// //                       <div className="flex items-center gap-3">
// //                         <div className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600 flex-shrink-0"></div>
// //                         <span className="font-medium truncate">Shop</span>
// //                       </div>
// //                       <FaChevronDown
// //                         className={`transition flex-shrink-0 ${
// //                           openDropdown === "shop-mobile" ? "rotate-180" : ""
// //                         }`}
// //                       />
// //                     </button>

// //                     <AnimatePresence>
// //                       {openDropdown === "shop-mobile" && (
// //                         <motion.div
// //                           initial={{ opacity: 0, height: 0 }}
// //                           animate={{ opacity: 1, height: "auto" }}
// //                           exit={{ opacity: 0, height: 0 }}
// //                           className="ml-4 pl-4 border-l border-gray-200 dark:border-gray-700 space-y-2"
// //                         >
// //                           {categories.map((cat, i) => (
// //                             <button
// //                               key={i}
// //                               onClick={() => {
// //                                 navigate(`/category/${cat.name.toLowerCase()}`);
// //                                 setMenuOpen(false);
// //                               }}
// //                               className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-gray-600 dark:text-gray-500 hover:text-[#E1A95F] hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-300 text-left"
// //                             >
// //                               <div className="w-1 h-1 bg-gray-400 dark:bg-gray-600 rounded-full flex-shrink-0"></div>
// //                               <span className="truncate">{cat.name}</span>
// //                             </button>
// //                           ))}
// //                         </motion.div>
// //                       )}
// //                     </AnimatePresence>
// //                   </div>

// //                   {/* My Profile in Mobile Menu - Only for non-admin users */}
// //                   {user && user.role !== "admin" && (
// //                     <button
// //                       onClick={() => {
// //                         setShowProfileModal(true);
// //                         setMenuOpen(false);
// //                       }}
// //                       className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
// //                     >
// //                       <div className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600 flex-shrink-0"></div>
// //                       <span className="font-medium truncate">My Profile</span>
// //                     </button>
// //                   )}
// //                 </div>

// //                 {/* Mobile Footer */}
// //                 <div className="p-6 border-t border-gray-200 dark:border-gray-700 mt-auto">
// //                   <div className="space-y-3">
// //                     <button
// //                       onClick={() => {
// //                         navigate("/notifications");
// //                         setMenuOpen(false);
// //                       }}
// //                       className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300 relative"
// //                     >
// //                       <div className="flex items-center gap-3">
// //                         <div className="relative">
// //                           <FaBell className="text-[#E1A95F]" />
// //                           {unreadCount > 0 && (
// //                             <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-600 rounded-full border border-white animate-pulse"></div>
// //                           )}
// //                         </div>
// //                         <span className="truncate">Notifications</span>
// //                       </div>
// //                       {unreadCount > 0 && (
// //                         <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1 border-2 border-white/20">
// //                           {unreadCount > 9 ? "9+" : unreadCount}
// //                         </span>
// //                       )}
// //                     </button>

// //                     {user && user.role === "admin" && (
// //                       <button
// //                         onClick={() => {
// //                           navigate("/admin");
// //                           setMenuOpen(false);
// //                         }}
// //                         className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl bg-gradient-to-r from-green-600/10 to-emerald-600/10 border border-green-500/20 text-green-600 dark:text-green-400 hover:text-green-500 transition-all duration-300"
// //                       >
// //                         <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div>
// //                         <span className="truncate">Admin Panel</span>
// //                       </button>
// //                     )}
// //                   </div>
// //                 </div>
// //               </div>
// //             </motion.div>
// //           </>
// //         )}
// //       </AnimatePresence>

// //       {/* Profile Modal */}
// //       <AnimatePresence>
// //         {showProfileModal && user && user.role !== "admin" && (
// //           <>
// //             {/* Backdrop */}
// //             <motion.div
// //               initial={{ opacity: 0 }}
// //               animate={{ opacity: 1 }}
// //               exit={{ opacity: 0 }}
// //               className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
// //             />

// //             {/* Modal */}
// //             <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
// //               <motion.div
// //                 ref={profileModalRef}
// //                 initial={{ opacity: 0, scale: 0.9, y: 20 }}
// //                 animate={{ opacity: 1, scale: 1, y: 0 }}
// //                 exit={{ opacity: 0, scale: 0.9, y: 20 }}
// //                 transition={{ type: "spring", damping: 25 }}
// //                 className="w-full max-w-2xl bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden max-h-[90vh] overflow-y-auto"
// //               >
// //                 {/* Modal Header */}
// //                 <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-[#E1A95F]/10 to-[#d4a259]/10">
// //                   <div className="flex items-center justify-between">
// //                     <div className="flex items-center gap-3">
// //                       <FaUserCircle className="text-3xl text-[#E1A95F]" />
// //                       <div>
// //                         <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
// //                           My Profile
// //                         </h2>
// //                         <p className="text-gray-600 dark:text-gray-400">
// //                           Manage your account settings
// //                         </p>
// //                       </div>
// //                     </div>
// //                     <button
// //                       onClick={() => setShowProfileModal(false)}
// //                       className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
// //                     >
// //                       <FaTimes className="text-gray-600 dark:text-gray-400 text-xl" />
// //                     </button>
// //                   </div>
// //                 </div>

// //                 {/* Modal Body */}
// //                 <div className="p-6">
// //                   {/* Messages */}
// //                   {profileSuccess && (
// //                     <motion.div
// //                       initial={{ opacity: 0, y: -10 }}
// //                       animate={{ opacity: 1, y: 0 }}
// //                       className="mb-6 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl"
// //                     >
// //                       <p className="text-green-600 dark:text-green-400 text-center">
// //                         {profileSuccess}
// //                       </p>
// //                     </motion.div>
// //                   )}

// //                   {profileError && (
// //                     <motion.div
// //                       initial={{ opacity: 0, y: -10 }}
// //                       animate={{ opacity: 1, y: 0 }}
// //                       className="mb-6 p-4 bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/20 rounded-xl"
// //                     >
// //                       <p className="text-red-600 dark:text-red-400 text-center">
// //                         {profileError}
// //                       </p>
// //                     </motion.div>
// //                   )}

// //                   <div className="grid md:grid-cols-3 gap-6">
// //                     {/* Left Column - User Info */}
// //                     <div className="md:col-span-1">
// //                       <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
// //                         <div className="flex flex-col items-center">
// //                           <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#E1A95F] to-[#d4a259] flex items-center justify-center mb-4">
// //                             <span className="text-white text-3xl font-bold">
// //                               {user.name?.charAt(0)?.toUpperCase() || "U"}
// //                             </span>
// //                           </div>

// //                           <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 truncate w-full text-center">
// //                             {user.name || "User"}
// //                           </h3>
// //                           <p className="text-gray-600 dark:text-gray-400 mb-4 truncate w-full text-center">
// //                             {user.email}
// //                           </p>

// //                           <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-lg p-3 mt-4">
// //                             <h4 className="text-gray-900 dark:text-white font-semibold mb-2">
// //                               Account Status
// //                             </h4>
// //                             <div className="flex items-center justify-between mb-2">
// //                               <span className="text-gray-600 dark:text-gray-300">
// //                                 Verified
// //                               </span>
// //                               <div className="flex items-center gap-2">
// //                                 {user.isVerified ? (
// //                                   <>
// //                                     <FaCheckCircle className="text-green-500 text-sm flex-shrink-0" />
// //                                     <span className="text-xs font-semibold text-green-600 dark:text-green-400 truncate">
// //                                       Verified
// //                                     </span>
// //                                   </>
// //                                 ) : (
// //                                   <>
// //                                     <FaTimesCircle className="text-yellow-500 text-sm flex-shrink-0" />
// //                                     <span className="text-xs font-semibold text-yellow-600 dark:text-yellow-400 truncate">
// //                                       Not Verified
// //                                     </span>
// //                                   </>
// //                                 )}
// //                               </div>
// //                             </div>
// //                             <div className="flex items-center justify-between">
// //                               <span className="text-gray-600 dark:text-gray-300">
// //                                 Active
// //                               </span>
// //                               <div className="flex items-center gap-2">
// //                                 {!user.isBlocked ? (
// //                                   <>
// //                                     <FaCheckCircle className="text-green-500 text-sm flex-shrink-0" />
// //                                     <span className="text-xs font-semibold text-green-600 dark:text-green-400 truncate">
// //                                       Active
// //                                     </span>
// //                                   </>
// //                                 ) : (
// //                                   <>
// //                                     <FaTimesCircle className="text-red-500 text-sm flex-shrink-0" />
// //                                     <span className="text-xs font-semibold text-red-600 dark:text-red-400 truncate">
// //                                       Blocked
// //                                     </span>
// //                                   </>
// //                                 )}
// //                               </div>
// //                             </div>
// //                           </div>

// //                           <p className="text-xs text-gray-500 dark:text-gray-500 mt-4 text-center">
// //                             Member since{" "}
// //                             {new Date(user.createdAt).toLocaleDateString()}
// //                           </p>
// //                         </div>
// //                       </div>
// //                     </div>

// //                     {/* Right Column - Form */}
// //                     <div className="md:col-span-2">
// //                       <form
// //                         onSubmit={handleProfileSubmit}
// //                         className="space-y-6"
// //                       >
// //                         {/* Basic Info */}
// //                         <div className="space-y-4">
// //                           <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
// //                             <FaUser className="text-[#E1A95F]" />
// //                             Basic Information
// //                           </h3>

// //                           <div>
// //                             <label className="block text-gray-700 dark:text-gray-300 mb-2">
// //                               Full Name
// //                             </label>
// //                             <input
// //                               type="text"
// //                               name="name"
// //                               value={profileForm.name}
// //                               onChange={handleProfileChange}
// //                               className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E1A95F]/50 focus:border-[#E1A95F]/50 transition-all duration-300"
// //                               required
// //                             />
// //                           </div>

// //                           <div>
// //                             <label className="block text-gray-700 dark:text-gray-300 mb-2">
// //                               Email Address
// //                             </label>
// //                             <input
// //                               type="email"
// //                               name="email"
// //                               value={profileForm.email}
// //                               onChange={handleProfileChange}
// //                               className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E1A95F]/50 focus:border-[#E1A95F]/50 transition-all duration-300"
// //                               required
// //                             />
// //                           </div>

// //                           <div>
// //                             <label className="block text-gray-700 dark:text-gray-300 mb-2">
// //                               Bio
// //                             </label>
// //                             <textarea
// //                               name="bio"
// //                               value={profileForm.bio}
// //                               onChange={handleProfileChange}
// //                               rows="2"
// //                               className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E1A95F]/50 focus:border-[#E1A95F]/50 transition-all duration-300"
// //                               placeholder="Tell us about yourself..."
// //                             />
// //                           </div>
// //                         </div>

// //                         {/* Password Change */}
// //                         <div className="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-700">
// //                           <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
// //                             <FaKey className="text-[#E1A95F]" />
// //                             Change Password
// //                           </h3>

// //                           <div>
// //                             <label className="block text-gray-700 dark:text-gray-300 mb-2">
// //                               Current Password
// //                             </label>
// //                             <input
// //                               type="password"
// //                               name="currentPassword"
// //                               value={profileForm.currentPassword}
// //                               onChange={handleProfileChange}
// //                               className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E1A95F]/50 focus:border-[#E1A95F]/50 transition-all duration-300"
// //                               placeholder="Required to change password"
// //                             />
// //                           </div>

// //                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                             <div>
// //                               <label className="block text-gray-700 dark:text-gray-300 mb-2">
// //                                 New Password
// //                               </label>
// //                               <input
// //                                 type="password"
// //                                 name="newPassword"
// //                                 value={profileForm.newPassword}
// //                                 onChange={handleProfileChange}
// //                                 className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E1A95F]/50 focus:border-[#E1A95F]/50 transition-all duration-300"
// //                                 placeholder="At least 6 characters"
// //                               />
// //                             </div>

// //                             <div>
// //                               <label className="block text-gray-700 dark:text-gray-300 mb-2">
// //                                 Confirm Password
// //                               </label>
// //                               <input
// //                                 type="password"
// //                                 name="confirmPassword"
// //                                 value={profileForm.confirmPassword}
// //                                 onChange={handleProfileChange}
// //                                 className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E1A95F]/50 focus:border-[#E1A95F]/50 transition-all duration-300"
// //                                 placeholder="Confirm new password"
// //                               />
// //                             </div>
// //                           </div>

// //                           <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
// //                             <FaTimesCircle className="inline mr-1" />
// //                             Leave password fields empty if you don't want to
// //                             change password
// //                           </div>
// //                         </div>

// //                         {/* Action Buttons */}
// //                         <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
// //                           <button
// //                             type="submit"
// //                             disabled={profileLoading}
// //                             className="flex-1 py-3 bg-gradient-to-r from-[#E1A95F] to-[#d4a259] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-[#E1A95F]/25 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
// //                           >
// //                             {profileLoading ? (
// //                               <>
// //                                 <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin flex-shrink-0"></div>
// //                                 <span className="truncate">Saving...</span>
// //                               </>
// //                             ) : (
// //                               <>
// //                                 <FaSave className="flex-shrink-0" />
// //                                 <span className="truncate">Save Changes</span>
// //                               </>
// //                             )}
// //                           </button>

// //                           <button
// //                             type="button"
// //                             onClick={() => setShowDeleteConfirm(true)}
// //                             className="py-3 px-6 bg-gradient-to-r from-red-600/10 to-pink-600/10 border border-red-500/20 text-red-600 dark:text-red-400 hover:text-red-500 hover:from-red-600/20 hover:to-pink-600/20 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
// //                           >
// //                             <FaTrash className="flex-shrink-0" />
// //                             <span className="truncate">Delete Account</span>
// //                           </button>
// //                         </div>
// //                       </form>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </motion.div>
// //             </div>
// //           </>
// //         )}
// //       </AnimatePresence>

// //       {/* Delete Confirmation Modal */}
// //       <AnimatePresence>
// //         {showDeleteConfirm && (
// //           <>
// //             {/* Backdrop */}
// //             <motion.div
// //               initial={{ opacity: 0 }}
// //               animate={{ opacity: 1 }}
// //               exit={{ opacity: 0 }}
// //               className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[102]"
// //             />

// //             {/* Modal */}
// //             <div className="fixed inset-0 z-[103] flex items-center justify-center p-4">
// //               <motion.div
// //                 initial={{ opacity: 0, scale: 0.9, y: 20 }}
// //                 animate={{ opacity: 1, scale: 1, y: 0 }}
// //                 exit={{ opacity: 0, scale: 0.9, y: 20 }}
// //                 transition={{ type: "spring", damping: 25 }}
// //                 className="w-full max-w-md bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6"
// //               >
// //                 <div className="text-center">
// //                   <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-600/20 to-pink-600/20 flex items-center justify-center">
// //                     <FaTrash className="text-red-500 text-2xl" />
// //                   </div>

// //                   <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 truncate">
// //                     Delete Account
// //                   </h3>
// //                   <p className="text-gray-600 dark:text-gray-400 mb-6">
// //                     This action cannot be undone. All your data will be
// //                     permanently removed from our database.
// //                   </p>

// //                   <div className="mb-6">
// //                     <label className="block text-gray-700 dark:text-gray-300 mb-2 text-left">
// //                       Enter your password to confirm:
// //                     </label>
// //                     <input
// //                       type="password"
// //                       value={deletePassword}
// //                       onChange={(e) => setDeletePassword(e.target.value)}
// //                       className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300"
// //                       placeholder="Your password"
// //                     />
// //                   </div>

// //                   <div className="flex gap-4">
// //                     <button
// //                       onClick={() => setShowDeleteConfirm(false)}
// //                       className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 truncate"
// //                     >
// //                       Cancel
// //                     </button>

// //                     <button
// //                       onClick={handleDeleteAccount}
// //                       disabled={profileLoading}
// //                       className="flex-1 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 disabled:opacity-50 truncate"
// //                     >
// //                       {profileLoading ? "Deleting..." : "Delete Account"}
// //                     </button>
// //                   </div>
// //                 </div>
// //               </motion.div>
// //             </div>
// //           </>
// //         )}
// //       </AnimatePresence>

// //       {/* Scroll Progress Bar */}
// //       <motion.div
// //         className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E1A95F] via-[#d4a259] to-[#E1A95F] z-50"
// //         style={{ scaleX: scrolled ? 1 : 0 }}
// //         transition={{ duration: 0.3 }}
// //       />
// //     </>
// //   );
// // };

// // export default Navigation;
// // import React, { useState, useContext, useEffect, useRef } from "react";
// // import { Link, useNavigate, useLocation } from "react-router-dom";
// // import {
// //   FaBars,
// //   FaTimes,
// //   FaShoppingCart,
// //   FaChevronDown,
// //   FaUser,
// //   FaBell,
// //   FaSearch,
// //   FaKey,
// //   FaTrash,
// //   FaSave,
// //   FaUserCircle,
// //   FaSignOutAlt,
// //   FaCheckCircle,
// //   FaTimesCircle,
// //   FaSpinner,
// //   FaBox,
// //   FaTag,
// //   FaFire,
// //   FaHistory,
// // } from "react-icons/fa";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { authContext } from "../Context/authContext";
// // import { cartContext } from "../Context/cartContext";
// // import { initSocket } from "../utils/socket";
// // import { fetchWithAuth } from "../utils/auth";

// // const API = import.meta.env.VITE_API_URL;

// // const Navigation = () => {
// //   const [menuOpen, setMenuOpen] = useState(false);
// //   const [openDropdown, setOpenDropdown] = useState(null);
// //   const [userMenuOpen, setUserMenuOpen] = useState(false);
// //   const [categories, setCategories] = useState([]);
// //   const [allCategories, setAllCategories] = useState([]);
// //   const [unreadCount, setUnreadCount] = useState(() => {
// //     const saved = localStorage.getItem("notification_unread_count");
// //     return saved ? parseInt(saved, 10) : 0;
// //   });
// //   const [scrolled, setScrolled] = useState(false);
// //   const [searchOpen, setSearchOpen] = useState(false);
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [cartPulse, setCartPulse] = useState(false);
// //   const [showProfileModal, setShowProfileModal] = useState(false);
// //   const [profileForm, setProfileForm] = useState({
// //     name: "",
// //     email: "",
// //     bio: "",
// //     currentPassword: "",
// //     newPassword: "",
// //     confirmPassword: "",
// //   });
// //   const [profileLoading, setProfileLoading] = useState(false);
// //   const [profileError, setProfileError] = useState("");
// //   const [profileSuccess, setProfileSuccess] = useState("");
// //   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
// //   const [deletePassword, setDeletePassword] = useState("");
// //   const [searchResults, setSearchResults] = useState([]);
// //   const [isSearching, setIsSearching] = useState(false);
// //   const [recentSearches, setRecentSearches] = useState([]);
// //   const [popularSearches, setPopularSearches] = useState([]);
// //   const [searchHistoryOpen, setSearchHistoryOpen] = useState(true);
// //   const [showAllCategories, setShowAllCategories] = useState(false);
// //   const [badgeAnimation, setBadgeAnimation] = useState(false);
// //   const [socketConnected, setSocketConnected] = useState(false);

// //   const searchRef = useRef(null);
// //   const searchInputRef = useRef(null);
// //   const profileModalRef = useRef(null);
// //   const userMenuRef = useRef(null);
// //   const socketRef = useRef(null);
// //   const soundRef = useRef(null);
// //   const mountedRef = useRef(true);
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const { user, logout, updateUser } = useContext(authContext);
// //   const { cart } = useContext(cartContext);

// //   // Main page section links
// //   const mainPageLinks = [
// //     { name: "Home", path: "/", hash: "#home" },
// //     { name: "Categories", path: "/#categories", hash: "#categories" },
// //     { name: "Products", path: "/#products", hash: "#products" },
// //     { name: "About-us", path: "/#about", hash: "#about" },
// //     { name: "Contact-us", path: "/#contact", hash: "#contact" },
// //     { name: "Blog", path: "/blog" },
// //   ];

// //   // Initialize sound
// //   useEffect(() => {
// //     soundRef.current = new Audio("/sounds/notification.mp3");
// //     soundRef.current.volume = 0.3;

// //     return () => {
// //       mountedRef.current = false;
// //       if (socketRef.current) {
// //         socketRef.current.disconnect();
// //         socketRef.current = null;
// //       }
// //     };
// //   }, []);

// //   // Update localStorage and document title when unreadCount changes
// //   useEffect(() => {
// //     localStorage.setItem("notification_unread_count", unreadCount.toString());
// //     updateDocumentTitle(unreadCount);
// //   }, [unreadCount]);

// //   // Update document title
// //   const updateDocumentTitle = (count) => {
// //     const baseTitle = document.title.replace(/^\(\d+\)\s*/, "") || "AdesCart";
// //     if (count > 0) {
// //       document.title = `(${count}) ${baseTitle}`;
// //     } else {
// //       document.title = baseTitle;
// //     }
// //   };

// //   // Play notification sound
// //   const playNotificationSound = () => {
// //     if (soundRef.current) {
// //       soundRef.current.currentTime = 0;
// //       soundRef.current
// //         .play()
// //         .catch((e) => console.log("Sound play failed:", e));
// //     }
// //   };

// //   // Fetch categories for dropdown
// //   useEffect(() => {
// //     const fetchCategories = async () => {
// //       try {
// //         const res = await fetchWithAuth(`${API}/api/categories`);
// //         const data = await res.json();
// //         setCategories(data || []);
// //       } catch (err) {
// //         console.error("Categories fetch error:", err);
// //       }
// //     };
// //     fetchCategories();
// //   }, []);

// //   // Fetch all categories for search
// //   useEffect(() => {
// //     const fetchAllCategories = async () => {
// //       try {
// //         const res = await fetchWithAuth(
// //           `${API}/api/products/categories-for-search`
// //         );
// //         if (res.ok) {
// //           const data = await res.json();
// //           setAllCategories(data);
// //         }
// //       } catch (err) {
// //         console.error("All categories fetch error:", err);
// //       }
// //     };
// //     fetchAllCategories();
// //   }, []);

// //   // Fetch popular searches
// //   useEffect(() => {
// //     const fetchPopularSearches = async () => {
// //       try {
// //         const res = await fetchWithAuth(`${API}/api/products/popular-searches`);
// //         if (res.ok) {
// //           const data = await res.json();
// //           setPopularSearches(data || []);
// //         }
// //       } catch (err) {
// //         console.error("Popular searches error:", err);
// //       }
// //     };
// //     fetchPopularSearches();
// //   }, []);

// //   // Load recent searches
// //   useEffect(() => {
// //     const savedSearches = localStorage.getItem("recent_searches");
// //     if (savedSearches) {
// //       try {
// //         setRecentSearches(JSON.parse(savedSearches));
// //       } catch (e) {
// //         console.error("Error parsing recent searches:", e);
// //       }
// //     }
// //   }, []);

// //   // Save recent searches
// //   const saveRecentSearches = (searches) => {
// //     setRecentSearches(searches);
// //     localStorage.setItem("recent_searches", JSON.stringify(searches));
// //   };

// //   // Scroll effect
// //   useEffect(() => {
// //     const handleScroll = () => {
// //       setScrolled(window.scrollY > 20);
// //     };
// //     window.addEventListener("scroll", handleScroll);
// //     return () => window.removeEventListener("scroll", handleScroll);
// //   }, []);

// //   // Cart pulse animation
// //   useEffect(() => {
// //     if (cart?.items?.length > 0) {
// //       setCartPulse(true);
// //       const timer = setTimeout(() => setCartPulse(false), 1000);
// //       return () => clearTimeout(timer);
// //     }
// //   }, [cart?.items]);

// //   // Fetch initial unread count
// //   useEffect(() => {
// //     if (!user) {
// //       setUnreadCount(0);
// //       localStorage.setItem("notification_unread_count", "0");
// //       return;
// //     }

// //     fetchUnreadCount();
// //     setupSocketConnection();

// //     const pollingInterval = setInterval(() => {
// //       if (mountedRef.current && user) {
// //         fetchUnreadCount();
// //       }
// //     }, 60000);

// //     return () => {
// //       clearInterval(pollingInterval);
// //     };
// //   }, [user]);

// //   // Setup socket connection for notifications
// //   const setupSocketConnection = () => {
// //     if (!user || !mountedRef.current) return;

// //     console.log("🔌 Setting up socket connection for user:", user._id);

// //     try {
// //       const socket = initSocket();
// //       socketRef.current = socket;

// //       socket.on("connect", () => {
// //         console.log("✅ Navigation socket connected:", socket.id);
// //         setSocketConnected(true);

// //         if (user._id) {
// //           socket.emit("join", user._id);
// //           console.log(`👤 User ${user._id} joined socket room`);
// //         }
// //       });

// //       socket.on("connect_error", (error) => {
// //         console.error("❌ Navigation socket connect error:", error);
// //         setSocketConnected(false);
// //       });

// //       socket.on("disconnect", (reason) => {
// //         console.log("🔌 Navigation socket disconnected:", reason);
// //         setSocketConnected(false);
// //       });

// //       socket.on("notification", (newNotification) => {
// //         console.log("🔔 Navigation received notification:", newNotification);

// //         if (!mountedRef.current) return;

// //         setUnreadCount((prev) => {
// //           const newCount = prev + 1;
// //           localStorage.setItem(
// //             "notification_unread_count",
// //             newCount.toString()
// //           );
// //           return newCount;
// //         });

// //         setBadgeAnimation(true);
// //         playNotificationSound();
// //         setTimeout(() => setBadgeAnimation(false), 500);

// //         if ("Notification" in window && Notification.permission === "granted") {
// //           try {
// //             new Notification(newNotification.title || "New Notification", {
// //               body: newNotification.message,
// //               icon: "/logo.png",
// //               badge: "/logo.png",
// //               tag: newNotification._id || Date.now().toString(),
// //               requireInteraction: false,
// //             });
// //           } catch (notificationError) {
// //             console.log("Browser notification error:", notificationError);
// //           }
// //         }
// //       });

// //       socket.on("notification-count", (data) => {
// //         console.log("📊 Navigation received notification count:", data);

// //         if (!mountedRef.current) return;

// //         const newCount = data.count || 0;
// //         setUnreadCount(newCount);
// //         localStorage.setItem("notification_unread_count", newCount.toString());
// //         setBadgeAnimation(true);
// //         setTimeout(() => setBadgeAnimation(false), 300);
// //       });

// //       socket.on("notification-count-response", (data) => {
// //         console.log(
// //           "📊 Navigation received notification count response:",
// //           data
// //         );

// //         if (!mountedRef.current) return;

// //         const newCount = data.count || 0;
// //         setUnreadCount(newCount);
// //         localStorage.setItem("notification_unread_count", newCount.toString());
// //         setBadgeAnimation(true);
// //         setTimeout(() => setBadgeAnimation(false), 300);
// //       });

// //       const handleAppNotification = (event) => {
// //         const newNotification = event.detail;
// //         console.log(
// //           "📢 Navigation received app-notification:",
// //           newNotification
// //         );

// //         if (!mountedRef.current) return;

// //         setUnreadCount((prev) => {
// //           const newCount = prev + 1;
// //           localStorage.setItem(
// //             "notification_unread_count",
// //             newCount.toString()
// //           );
// //           return newCount;
// //         });

// //         setBadgeAnimation(true);
// //         playNotificationSound();
// //         setTimeout(() => setBadgeAnimation(false), 500);
// //       };

// //       const handleUpdateNotificationCount = (event) => {
// //         const { increment, decrement, count } = event.detail;
// //         console.log(
// //           "🔢 Navigation received update-notification-count:",
// //           event.detail
// //         );

// //         setUnreadCount((prev) => {
// //           let newCount = prev;

// //           if (count !== undefined) {
// //             newCount = count;
// //           } else if (increment !== undefined) {
// //             newCount = prev + (increment || 1);
// //           } else if (decrement !== undefined) {
// //             newCount = Math.max(0, prev - (decrement || 1));
// //           }

// //           console.log(`🔄 Updating badge count: ${prev} -> ${newCount}`);
// //           localStorage.setItem(
// //             "notification_unread_count",
// //             newCount.toString()
// //           );
// //           return newCount;
// //         });

// //         setBadgeAnimation(true);
// //         setTimeout(() => setBadgeAnimation(false), 300);
// //       };

// //       const handleNotificationAction = (event) => {
// //         const { action, count } = event.detail;
// //         console.log("📢 Navigation received notification action:", action);

// //         if (count !== undefined) {
// //           setUnreadCount(count);
// //           localStorage.setItem("notification_unread_count", count.toString());
// //         } else if (action === "mark-all-read" || action === "delete-all") {
// //           setUnreadCount(0);
// //           localStorage.setItem("notification_unread_count", "0");
// //         }
// //         setBadgeAnimation(true);
// //         setTimeout(() => setBadgeAnimation(false), 300);
// //       };

// //       window.addEventListener("app-notification", handleAppNotification);
// //       window.addEventListener(
// //         "update-notification-count",
// //         handleUpdateNotificationCount
// //       );
// //       window.addEventListener(
// //         "notification-action-completed",
// //         handleNotificationAction
// //       );

// //       return () => {
// //         if (socketRef.current) {
// //           socketRef.current.disconnect();
// //           socketRef.current = null;
// //         }
// //         window.removeEventListener("app-notification", handleAppNotification);
// //         window.removeEventListener(
// //           "update-notification-count",
// //           handleUpdateNotificationCount
// //         );
// //         window.removeEventListener(
// //           "notification-action-completed",
// //           handleNotificationAction
// //         );
// //         setSocketConnected(false);
// //       };
// //     } catch (error) {
// //       console.error("❌ Socket setup error:", error);
// //     }
// //   };

// //   // Fetch unread count function
// //   const fetchUnreadCount = async (retryCount = 0) => {
// //     if (!user) {
// //       setUnreadCount(0);
// //       localStorage.setItem("notification_unread_count", "0");
// //       return;
// //     }

// //     try {
// //       console.log("📊 Fetching unread count from server...");
// //       const res = await fetchWithAuth(`${API}/api/notifications/unread-count`);

// //       if (!res.ok) {
// //         throw new Error(`Failed to fetch unread count: ${res.status}`);
// //       }

// //       const data = await res.json();

// //       if (data.success) {
// //         const newCount = data.data?.count || 0;
// //         console.log("✅ Unread count fetched from server:", newCount);

// //         setUnreadCount(newCount);
// //         localStorage.setItem("notification_unread_count", newCount.toString());

// //         window.dispatchEvent(
// //           new CustomEvent("update-notification-count", {
// //             detail: { count: newCount },
// //           })
// //         );
// //       } else {
// //         console.error("❌ API error:", data.message);
// //         setUnreadCount(0);
// //         localStorage.setItem("notification_unread_count", "0");
// //       }
// //     } catch (err) {
// //       console.error("❌ Fetch unread count error:", err);

// //       if (retryCount < 2) {
// //         console.log(`🔄 Retrying fetch unread count (${retryCount + 1}/2)...`);
// //         setTimeout(() => fetchUnreadCount(retryCount + 1), 2000);
// //       } else {
// //         setUnreadCount(0);
// //         localStorage.setItem("notification_unread_count", "0");
// //       }
// //     }
// //   };

// //   // Close search when clicking outside
// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (searchRef.current && !searchRef.current.contains(event.target)) {
// //         setSearchOpen(false);
// //       }
// //     };
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   // Focus search input when search opens
// //   useEffect(() => {
// //     if (searchOpen && searchInputRef.current) {
// //       setTimeout(() => {
// //         searchInputRef.current.focus();
// //         setSearchHistoryOpen(true);
// //       }, 100);
// //     }
// //   }, [searchOpen]);

// //   // Close modals and dropdowns when clicking outside
// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
// //         setUserMenuOpen(false);
// //       }

// //       if (
// //         profileModalRef.current &&
// //         !profileModalRef.current.contains(event.target)
// //       ) {
// //         setShowProfileModal(false);
// //         setShowDeleteConfirm(false);
// //       }
// //     };

// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   // Initialize profile form when user data changes
// //   useEffect(() => {
// //     if (user) {
// //       setProfileForm({
// //         name: user.name || "",
// //         email: user.email || "",
// //         bio: user.bio || "",
// //         currentPassword: "",
// //         newPassword: "",
// //         confirmPassword: "",
// //       });
// //     }
// //   }, [user]);

// //   // Handle navigation to sections
// //   const handleNavigation = (link) => {
// //     if (link.hash) {
// //       // If we're already on the main page, scroll to section
// //       if (location.pathname === "/") {
// //         const element = document.getElementById(link.hash.replace("#", ""));
// //         if (element) {
// //           element.scrollIntoView({ behavior: "smooth" });
// //         }
// //       } else {
// //         // Navigate to main page with hash
// //         navigate(`/${link.hash}`);
// //       }
// //     } else {
// //       // Regular navigation
// //       navigate(link.path);
// //     }
// //     setMenuOpen(false);
// //     setOpenDropdown(null);
// //   };

// //   // 🔍 SEARCH FUNCTION
// //   const searchProducts = async (query) => {
// //     if (!query || query.trim() === "") {
// //       setSearchResults([]);
// //       setIsSearching(false);
// //       return;
// //     }

// //     setIsSearching(true);
// //     try {
// //       const res = await fetchWithAuth(
// //         `${API}/api/products/quick-search?q=${encodeURIComponent(query)}`
// //       );

// //       if (res.ok) {
// //         const data = await res.json();
// //         setSearchResults(data);

// //         if (data.length > 0 && !recentSearches.includes(query)) {
// //           const updated = [query, ...recentSearches].slice(0, 8);
// //           saveRecentSearches(updated);
// //         }
// //       } else {
// //         console.error("Search failed with status:", res.status);
// //         setSearchResults([]);
// //       }
// //     } catch (err) {
// //       console.error("Search error:", err);
// //       setSearchResults([]);
// //     } finally {
// //       setIsSearching(false);
// //     }
// //   };

// //   // Debounced search
// //   useEffect(() => {
// //     if (!searchOpen) return;

// //     const timer = setTimeout(() => {
// //       if (searchQuery.trim()) {
// //         searchProducts(searchQuery);
// //       } else {
// //         setSearchResults([]);
// //         setSearchHistoryOpen(true);
// //       }
// //     }, 350);

// //     return () => clearTimeout(timer);
// //   }, [searchQuery, searchOpen]);

// //   // Add to recent searches
// //   const addToRecentSearches = (query) => {
// //     const updated = [
// //       query,
// //       ...recentSearches.filter((s) => s.toLowerCase() !== query.toLowerCase()),
// //     ].slice(0, 8);
// //     saveRecentSearches(updated);
// //   };

// //   // Clear recent searches
// //   const clearRecentSearches = () => {
// //     saveRecentSearches([]);
// //   };

// //   // Handle search submission
// //   const handleSearch = (e, query = null, category = null) => {
// //     e?.preventDefault();
// //     const searchTerm = query || searchQuery.trim();

// //     if (searchTerm) {
// //       addToRecentSearches(searchTerm);

// //       if (category) {
// //         navigate(`/search?category=${encodeURIComponent(category)}`);
// //       } else {
// //         navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
// //       }

// //       setSearchOpen(false);
// //       setSearchQuery("");
// //       setSearchResults([]);
// //     }
// //   };

// //   // Handle category click from search
// //   const handleCategorySearch = (categoryName) => {
// //     addToRecentSearches(categoryName);
// //     navigate(`/search?category=${encodeURIComponent(categoryName)}`);
// //     setSearchOpen(false);
// //   };

// //   // Format price
// //   const formatPrice = (price) => {
// //     return new Intl.NumberFormat("en-US", {
// //       style: "currency",
// //       currency: "USD",
// //       minimumFractionDigits: 0,
// //     }).format(price);
// //   };

// //   const toggleDropdown = (key) =>
// //     setOpenDropdown(openDropdown === key ? null : key);

// //   const handleCategoryClick = (path) => {
// //     navigate(path);
// //     setMenuOpen(false);
// //     setOpenDropdown(null);
// //   };

// //   const handleProfileChange = (e) => {
// //     const { name, value } = e.target;
// //     setProfileForm((prev) => ({
// //       ...prev,
// //       [name]: value,
// //     }));
// //     setProfileError("");
// //     setProfileSuccess("");
// //   };

// //   const validateProfileForm = () => {
// //     if (profileForm.newPassword && profileForm.newPassword.length < 6) {
// //       setProfileError("New password must be at least 6 characters");
// //       return false;
// //     }

// //     if (
// //       profileForm.newPassword &&
// //       profileForm.newPassword !== profileForm.confirmPassword
// //     ) {
// //       setProfileError("New passwords do not match");
// //       return false;
// //     }

// //     return true;
// //   };

// //   const handleProfileSubmit = async (e) => {
// //     e.preventDefault();
// //     setProfileError("");
// //     setProfileSuccess("");

// //     if (!validateProfileForm()) return;

// //     setProfileLoading(true);

// //     try {
// //       const updateData = {
// //         name: profileForm.name,
// //         email: profileForm.email,
// //         bio: profileForm.bio,
// //       };

// //       if (profileForm.currentPassword && profileForm.newPassword) {
// //         updateData.currentPassword = profileForm.currentPassword;
// //         updateData.newPassword = profileForm.newPassword;
// //       }

// //       console.log("Sending update to:", `${API}/api/users/profile`);
// //       console.log("Update data:", updateData);

// //       const res = await fetchWithAuth(`${API}/api/users/profile`, {
// //         method: "PUT",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify(updateData),
// //       });

// //       console.log("Response status:", res.status);

// //       const contentType = res.headers.get("content-type");
// //       if (!contentType || !contentType.includes("application/json")) {
// //         const text = await res.text();
// //         console.error("Non-JSON response from server:", text.substring(0, 200));
// //         throw new Error(
// //           "Server returned non-JSON response. Please check if the API endpoint exists."
// //         );
// //       }

// //       const data = await res.json();
// //       console.log("Response data:", data);

// //       if (!res.ok) {
// //         throw new Error(
// //           data.message || `Failed to update profile (${res.status})`
// //         );
// //       }

// //       if (!data.success) {
// //         throw new Error(data.message || "Profile update failed");
// //       }

// //       if (data.user) {
// //         updateUser(data.user);
// //         setProfileSuccess("Profile updated successfully!");
// //       } else {
// //         throw new Error("No user data returned from server");
// //       }

// //       setProfileForm((prev) => ({
// //         ...prev,
// //         currentPassword: "",
// //         newPassword: "",
// //         confirmPassword: "",
// //       }));

// //       setTimeout(() => setProfileSuccess(""), 3000);
// //     } catch (err) {
// //       console.error("Profile update error:", err);
// //       setProfileError(
// //         err.message || "Failed to update profile. Please try again."
// //       );
// //     } finally {
// //       setProfileLoading(false);
// //     }
// //   };

// //   const handleDeleteAccount = async () => {
// //     if (!deletePassword.trim()) {
// //       setProfileError("Please enter your password to confirm account deletion");
// //       return;
// //     }

// //     setProfileLoading(true);

// //     try {
// //       console.log(
// //         "Sending delete request to:",
// //         `${API}/api/users/delete-account`
// //       );

// //       const res = await fetchWithAuth(`${API}/api/users/delete-account`, {
// //         method: "DELETE",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({ password: deletePassword }),
// //       });

// //       console.log("Delete response status:", res.status);

// //       const contentType = res.headers.get("content-type");
// //       if (!contentType || !contentType.includes("application/json")) {
// //         const text = await res.text();
// //         console.error("Non-JSON response from server:", text.substring(0, 200));
// //         throw new Error(
// //           "Server returned non-JSON response. Please check if the API endpoint exists."
// //         );
// //       }

// //       const data = await res.json();
// //       console.log("Delete response data:", data);

// //       if (!res.ok || !data.success) {
// //         throw new Error(data.message || "Failed to delete account");
// //       }

// //       logout();
// //       setShowProfileModal(false);
// //       navigate("/login");
// //     } catch (err) {
// //       console.error("Delete account error:", err);
// //       setProfileError(
// //         err.message || "Failed to delete account. Please try again."
// //       );
// //       setProfileLoading(false);
// //     }
// //   };

// //   const cartItemCount =
// //     cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

// //   return (
// //     <>
// //       {/* Navigation Container - Removed background */}
// //       <motion.nav
// //         initial={{ y: -100 }}
// //         animate={{ y: 0 }}
// //         transition={{ duration: 0.5, type: "spring" }}
// //         className="fixed top-0 w-full z-50 transition-all duration-300"
// //       >
// //         {/* Top Announcement Bar */}
// //         <div className="bg-gradient-to-r from-[#E1A95F]/20 via-[#d4a259]/20 to-[#c5954d]/20 py-2 px-4 text-center">
// //           <p className="text-xs text-gray-800 dark:text-white font-medium">
// //             🚚{" "}
// //             <span className="text-[#E1A95F] font-semibold">Free Shipping</span>{" "}
// //             on orders over $100 •
// //             <span className="text-green-600 dark:text-green-300 font-semibold ml-2">
// //               🎁 30% OFF
// //             </span>{" "}
// //             for new customers
// //           </p>
// //         </div>

// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //           <div className="flex justify-between items-center h-16">
// //             {/* Logo with Amharic first letter for D */}
// //             <motion.div
// //               whileHover={{ scale: 1.05 }}
// //               whileTap={{ scale: 0.95 }}
// //               className="flex items-center"
// //             >
// //               <button
// //                 onClick={() => navigate("/")}
// //                 className="flex items-center"
// //               >
// //                 <div className="flex items-center">
// //                   {/* Main logo text with umbrella-like A design */}
// //                   <div className="relative">
// //                     <span className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white flex items-center">
// //                       {/* A letter with umbrella design - Larger */}
// //                       <span className="relative">
// //                         <span className="text-5xl md:text-6xl text-[#E1A95F] font-extrabold leading-none">
// //                           A
// //                         </span>
// //                         {/* Umbrella top decoration */}
// //                         <span className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-gradient-to-r from-[#E1A95F] to-[#d4a259] rounded-full"></span>
// //                         <span className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-3 bg-[#E1A95F] rounded-full"></span>
// //                       </span>

// //                       {/* d letter with Amharic FIRST letter (ሀ) */}
// //                       <span className="text-3xl md:text-4xl text-gray-800 dark:text-gray-200 font-bold ml-1 relative">
// //                         ሀ
// //                         <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#E1A95F]/50 rounded-full"></span>
// //                       </span>

// //                       {/* e letter removed as requested */}

// //                       {/* s letter */}
// //                       <span className="text-3xl md:text-4xl text-[#E1A95F] font-bold ml-1 relative">
// //                         s
// //                         <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#E1A95F]/30 rounded-full"></span>
// //                       </span>
// //                     </span>

// //                     {/* Cart text */}
// //                     <span className="text-xs md:text-sm font-semibold text-gray-600 dark:text-gray-300 ml-2 tracking-wider">
// //                       Cart
// //                     </span>
// //                   </div>
// //                 </div>
// //               </button>
// //             </motion.div>

// //             {/* Desktop Navigation */}
// //             <ul className="hidden lg:flex items-center gap-1">
// //               {mainPageLinks.map((link, index) => (
// //                 <motion.li
// //                   key={index}
// //                   initial={{ opacity: 0, y: -10 }}
// //                   animate={{ opacity: 1, y: 0 }}
// //                   transition={{ delay: index * 0.1 }}
// //                   className="relative"
// //                 >
// //                   <button
// //                     onClick={() => handleNavigation(link)}
// //                     className={`relative px-4 py-2.5 mx-1 rounded-xl transition-all duration-300 font-medium ${
// //                       (location.pathname === link.path && !link.hash) ||
// //                       (location.hash === link.hash && location.pathname === "/")
// //                         ? "text-[#E1A95F] bg-[#E1A95F]/10 dark:text-[#E1A95F] dark:bg-[#E1A95F]/10"
// //                         : "text-gray-900 dark:text-gray-200 hover:text-[#E1A95F] hover:bg-[#E1A95F]/5 dark:hover:text-[#E1A95F]"
// //                     }`}
// //                   >
// //                     {link.name}
// //                     {(location.pathname === link.path && !link.hash) ||
// //                     (location.hash === link.hash &&
// //                       location.pathname === "/") ? (
// //                       <motion.div
// //                         layoutId="underline"
// //                         className="absolute left-4 right-4 h-0.5 bottom-1.5 bg-[#E1A95F] rounded-full"
// //                       />
// //                     ) : null}
// //                   </button>
// //                 </motion.li>
// //               ))}

// //               {/* Dynamic Shop Dropdown */}
// //               <motion.li className="relative">
// //                 <button
// //                   onClick={() => toggleDropdown("shop")}
// //                   className={`flex items-center gap-2 px-4 py-2.5 mx-1 rounded-xl transition-all duration-300 font-medium ${
// //                     openDropdown === "shop"
// //                       ? "text-[#E1A95F] bg-[#E1A95F]/10 dark:text-[#E1A95F] dark:bg-[#E1A95F]/10"
// //                       : "text-gray-900 dark:text-gray-200 hover:text-[#E1A95F] hover:bg-[#E1A95F]/5 dark:hover:text-[#E1A95F]"
// //                   }`}
// //                 >
// //                   Shop
// //                   <motion.span
// //                     animate={{ rotate: openDropdown === "shop" ? 180 : 0 }}
// //                     transition={{ duration: 0.3 }}
// //                   >
// //                     <FaChevronDown className="text-sm" />
// //                   </motion.span>
// //                 </button>
// //                 <AnimatePresence>
// //                   {openDropdown === "shop" && (
// //                     <motion.div
// //                       className="absolute left-0 top-full mt-2 min-w-[220px] bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-3"
// //                       initial={{ opacity: 0, y: -10, scale: 0.95 }}
// //                       animate={{ opacity: 1, y: 0, scale: 1 }}
// //                       exit={{ opacity: 0, y: -10, scale: 0.95 }}
// //                       transition={{ duration: 0.2 }}
// //                     >
// //                       <div className="space-y-2">
// //                         {categories.map((cat, i) => (
// //                           <motion.button
// //                             key={i}
// //                             initial={{ opacity: 0, x: -10 }}
// //                             animate={{ opacity: 1, x: 0 }}
// //                             transition={{ duration: 0.2, delay: i * 0.05 }}
// //                             onClick={() =>
// //                               handleCategoryClick(
// //                                 `/category/${cat.name.toLowerCase()}`
// //                               )
// //                             }
// //                             className="w-full text-left px-3 py-2.5 rounded-lg text-gray-900 dark:text-gray-200 hover:text-[#E1A95F] hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-300 flex items-center gap-3 group"
// //                           >
// //                             <div className="w-2 h-2 bg-[#E1A95F]/50 rounded-full group-hover:bg-[#E1A95F] transition-all duration-300"></div>
// //                             <span className="font-medium">{cat.name}</span>
// //                           </motion.button>
// //                         ))}
// //                       </div>
// //                     </motion.div>
// //                   )}
// //                 </AnimatePresence>
// //               </motion.li>
// //             </ul>

// //             {/* Right Icons */}
// //             <div className="flex items-center gap-3 md:gap-4">
// //               {/* Enhanced Search */}
// //               <div ref={searchRef} className="">
// //                 <motion.button
// //                   whileHover={{ scale: 1.1 }}
// //                   whileTap={{ scale: 0.9 }}
// //                   onClick={() => {
// //                     setSearchOpen(!searchOpen);
// //                     setSearchHistoryOpen(true);
// //                   }}
// //                   className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 group"
// //                 >
// //                   <FaSearch className="text-gray-900 dark:text-gray-200 group-hover:text-[#E1A95F] text-lg transition-colors duration-300" />
// //                 </motion.button>

// //                 <AnimatePresence>
// //                   {searchOpen && (
// //                     <motion.div
// //                       initial={{ opacity: 0, scale: 0.9, y: 10 }}
// //                       animate={{ opacity: 1, scale: 1, y: 0 }}
// //                       exit={{ opacity: 0, scale: 0.9, y: 10 }}
// //                       className="absolute max-sm:right-0 right-10 top-full mt-2 max-sm:w-full w-[50%] max-w-2xl backdrop-blur-sm rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
// //                     >
// //                       {/* Search Input */}
// //                       <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white/95 dark:bg-gray-900/95">
// //                         <form
// //                           onSubmit={(e) => handleSearch(e)}
// //                           className="relative"
// //                         >
// //                           <div className="relative">
// //                             <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
// //                             <input
// //                               ref={searchInputRef}
// //                               type="text"
// //                               value={searchQuery}
// //                               onChange={(e) => {
// //                                 setSearchQuery(e.target.value);
// //                                 setSearchHistoryOpen(e.target.value === "");
// //                               }}
// //                               placeholder="Search products, brands, categories..."
// //                               className="w-full pl-10 pr-10 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E1A95F]/50 focus:border-[#E1A95F]/50 transition-all duration-300"
// //                             />
// //                             {searchQuery && (
// //                               <button
// //                                 type="button"
// //                                 onClick={() => {
// //                                   setSearchQuery("");
// //                                   setSearchResults([]);
// //                                   setSearchHistoryOpen(true);
// //                                 }}
// //                                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
// //                               >
// //                                 <FaTimesCircle />
// //                               </button>
// //                             )}
// //                           </div>
// //                           {isSearching && (
// //                             <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
// //                               <FaSpinner className="animate-spin text-[#E1A95F]" />
// //                             </div>
// //                           )}
// //                         </form>
// //                       </div>

// //                       {/* Search Content */}
// //                       <div className="max-h-96 overflow-y-auto bg-white/95 dark:bg-gray-900/95">
// //                         {/* Recent Searches */}
// //                         {searchHistoryOpen &&
// //                           recentSearches.length > 0 &&
// //                           !searchQuery && (
// //                             <div className="p-4 border-b border-gray-200 dark:border-gray-700">
// //                               <div className="flex items-center justify-between mb-3">
// //                                 <div className="flex items-center gap-2">
// //                                   <FaHistory className="text-gray-500 text-sm" />
// //                                   <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
// //                                     Recent Searches
// //                                   </h3>
// //                                 </div>
// //                                 <button
// //                                   onClick={clearRecentSearches}
// //                                   className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
// //                                 >
// //                                   Clear All
// //                                 </button>
// //                               </div>
// //                               <div className="space-y-2">
// //                                 {recentSearches.map((search, index) => (
// //                                   <button
// //                                     key={index}
// //                                     onClick={() => {
// //                                       setSearchQuery(search);
// //                                       handleSearch(null, search);
// //                                     }}
// //                                     className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-300 group"
// //                                   >
// //                                     <div className="flex items-center gap-3">
// //                                       <FaSearch className="text-gray-500 text-sm group-hover:text-[#E1A95F]" />
// //                                       <span className="text-gray-900 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white">
// //                                         {search}
// //                                       </span>
// //                                     </div>
// //                                     <FaTimesCircle
// //                                       onClick={(e) => {
// //                                         e.stopPropagation();
// //                                         const updated = recentSearches.filter(
// //                                           (_, i) => i !== index
// //                                         );
// //                                         saveRecentSearches(updated);
// //                                       }}
// //                                       className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-400 text-sm opacity-0 group-hover:opacity-100 transition-all"
// //                                     />
// //                                   </button>
// //                                 ))}
// //                               </div>
// //                             </div>
// //                           )}

// //                         {/* Popular Searches */}
// //                         {searchHistoryOpen &&
// //                           popularSearches.length > 0 &&
// //                           !searchQuery && (
// //                             <div className="p-4 border-b border-gray-200 dark:border-gray-700">
// //                               <div className="flex items-center gap-2 mb-3">
// //                                 <FaFire className="text-amber-500 text-sm" />
// //                                 <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
// //                                   Popular Searches
// //                                 </h3>
// //                               </div>
// //                               <div className="flex flex-wrap gap-2">
// //                                 {popularSearches
// //                                   .slice(0, 6)
// //                                   .map((search, index) => (
// //                                     <button
// //                                       key={index}
// //                                       onClick={() => {
// //                                         setSearchQuery(search);
// //                                         handleSearch(null, search);
// //                                       }}
// //                                       className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-[#E1A95F]/20 text-gray-900 dark:text-gray-200 hover:text-[#E1A95F] rounded-lg text-sm transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-[#E1A95F]/30"
// //                                     >
// //                                       {search}
// //                                     </button>
// //                                   ))}
// //                               </div>
// //                             </div>
// //                           )}

// //                         {/* Categories */}
// //                         {searchHistoryOpen &&
// //                           allCategories.length > 0 &&
// //                           !searchQuery && (
// //                             <div className="p-4">
// //                               <div className="flex items-center gap-2 mb-3">
// //                                 <FaTag className="text-[#E1A95F] text-sm" />
// //                                 <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
// //                                   Browse Categories
// //                                 </h3>
// //                               </div>
// //                               <div className="grid grid-cols-2 gap-2">
// //                                 {allCategories
// //                                   .slice(0, showAllCategories ? 20 : 6)
// //                                   .map((category, index) => (
// //                                     <button
// //                                       key={index}
// //                                       onClick={() =>
// //                                         handleCategorySearch(category.name)
// //                                       }
// //                                       className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100/50 dark:bg-gray-800/30 hover:bg-gray-100 dark:hover:bg-gray-800/70 transition-all duration-300 group"
// //                                     >
// //                                       <FaBox className="text-gray-500 text-sm group-hover:text-[#E1A95F]" />
// //                                       <span className="text-gray-900 dark:text-gray-200 text-sm truncate">
// //                                         {category.name}
// //                                       </span>
// //                                     </button>
// //                                   ))}
// //                               </div>
// //                               {allCategories.length > 6 && (
// //                                 <button
// //                                   onClick={() =>
// //                                     setShowAllCategories(!showAllCategories)
// //                                   }
// //                                   className="w-full mt-3 text-center text-xs text-gray-500 hover:text-[#E1A95F] transition-colors"
// //                                 >
// //                                   {showAllCategories
// //                                     ? "Show Less"
// //                                     : `Show All ${allCategories.length} Categories`}
// //                                 </button>
// //                               )}
// //                             </div>
// //                           )}

// //                         {/* Search Results */}
// //                         {searchQuery && (
// //                           <div className="p-4">
// //                             <div className="flex items-center justify-between mb-3">
// //                               <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
// //                                 {searchResults.length > 0
// //                                   ? `Found ${searchResults.length} results`
// //                                   : isSearching
// //                                     ? "Searching..."
// //                                     : "No results found"}
// //                               </h3>
// //                               {searchResults.length > 0 && (
// //                                 <button
// //                                   onClick={(e) => handleSearch(e)}
// //                                   className="text-xs text-[#E1A95F] hover:text-[#d4a259] font-medium"
// //                                 >
// //                                   See all →
// //                                 </button>
// //                               )}
// //                             </div>

// //                             {searchResults.length > 0 ? (
// //                               <div className="space-y-3">
// //                                 {searchResults.slice(0, 5).map((product) => (
// //                                   <Link
// //                                     key={product._id}
// //                                     to={`/product/${product._id}`}
// //                                     onClick={() => {
// //                                       setSearchOpen(false);
// //                                       setSearchQuery("");
// //                                     }}
// //                                     className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-300 group"
// //                                   >
// //                                     <div className="w-20 h-20 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
// //                                       {product.image ? (
// //                                         <img
// //                                           src={
// //                                             product.image.startsWith("http")
// //                                               ? product.image
// //                                               : `${API}${product.image}`
// //                                           }
// //                                           alt={product.name}
// //                                           className="w-full h-full object-contain"
// //                                           onError={(e) => {
// //                                             e.target.onerror = null;
// //                                             e.target.src =
// //                                               "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop";
// //                                           }}
// //                                         />
// //                                       ) : (
// //                                         <FaBox className="text-gray-500" />
// //                                       )}
// //                                     </div>
// //                                     <div className="flex-1 min-w-0">
// //                                       <div className="flex items-start justify-between gap-2">
// //                                         <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate group-hover:text-[#E1A95F]">
// //                                           {product.name}
// //                                         </h4>
// //                                         <span className="text-sm font-semibold text-[#E1A95F] flex-shrink-0">
// //                                           {formatPrice(product.price)}
// //                                         </span>
// //                                       </div>
// //                                       <p className="text-xs text-gray-700 dark:text-gray-400 truncate">
// //                                         {product.category || "Uncategorized"}
// //                                       </p>
// //                                       <div className="flex items-center gap-2 mt-1">
// //                                         {product.isSold ||
// //                                         product.stock === 0 ? (
// //                                           <span className="text-xs text-red-500">
// //                                             Sold Out
// //                                           </span>
// //                                         ) : (
// //                                           <span className="text-xs text-green-500">
// //                                             {product.stock || 0} in stock
// //                                           </span>
// //                                         )}
// //                                       </div>
// //                                     </div>
// //                                   </Link>
// //                                 ))}
// //                               </div>
// //                             ) : !isSearching ? (
// //                               <div className="text-center py-6">
// //                                 <div className="w-12 h-12 mx-auto rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-3">
// //                                   <FaSearch className="text-gray-500" />
// //                                 </div>
// //                                 <p className="text-gray-700 dark:text-gray-400 text-sm">
// //                                   No products found for "{searchQuery}"
// //                                 </p>
// //                                 <p className="text-gray-500 text-xs mt-2">
// //                                   Try different keywords
// //                                 </p>
// //                               </div>
// //                             ) : null}
// //                           </div>
// //                         )}
// //                       </div>

// //                       {/* Search Footer */}
// //                       {searchQuery && (
// //                         <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50">
// //                           <button
// //                             onClick={(e) => handleSearch(e)}
// //                             className="w-full py-2.5 bg-gradient-to-r from-[#E1A95F] to-[#d4a259] text-white rounded-xl font-medium hover:shadow-lg hover:shadow-[#E1A95F]/25 transition-all duration-300 flex items-center justify-center gap-2"
// //                           >
// //                             <FaSearch />
// //                             Search for "{searchQuery}"
// //                           </button>
// //                         </div>
// //                       )}
// //                     </motion.div>
// //                   )}
// //                 </AnimatePresence>
// //               </div>

// //               {/* Notifications with YouTube-style badge */}
// //               <div className="relative">
// //                 <motion.div
// //                   whileHover={{ scale: 1.1 }}
// //                   whileTap={{ scale: 0.9 }}
// //                   className="relative cursor-pointer group"
// //                   onClick={() => navigate("/notifications")}
// //                 >
// //                   <div className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 relative">
// //                     <FaBell className="text-gray-900 dark:text-gray-200 group-hover:text-[#E1A95F] text-lg transition-colors duration-300" />

// //                     {/* Socket connection indicator */}
// //                     {socketConnected && (
// //                       <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse border border-white"></div>
// //                     )}

// //                     {/* YouTube-style notification badge */}
// //                     {unreadCount > 0 && (
// //                       <div className="absolute top-0 right-0">
// //                         <motion.div
// //                           key={`badge-${unreadCount}-${badgeAnimation}`}
// //                           initial={{ scale: 0 }}
// //                           animate={{ scale: 1 }}
// //                           whileHover={{ scale: 1.1 }}
// //                           transition={{
// //                             duration: 0.3,
// //                             type: "spring",
// //                             stiffness: 300,
// //                           }}
// //                           className="relative"
// //                         >
// //                           <div className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 shadow-lg border-2 border-white/20">
// //                             {unreadCount > 9 ? "9+" : unreadCount}
// //                           </div>

// //                           {badgeAnimation && (
// //                             <motion.div
// //                               initial={{ scale: 1, opacity: 0.75 }}
// //                               animate={{
// //                                 scale: 1.4,
// //                                 opacity: 0,
// //                               }}
// //                               transition={{
// //                                 duration: 0.8,
// //                                 repeat: 2,
// //                                 repeatType: "reverse",
// //                               }}
// //                               className="absolute -top-1 -right-1 w-[18px] h-[18px] bg-red-600 rounded-full"
// //                             ></motion.div>
// //                           )}
// //                         </motion.div>
// //                       </div>
// //                     )}
// //                   </div>
// //                 </motion.div>
// //               </div>

// //               {/* Cart */}
// //               <motion.div
// //                 whileHover={{ scale: 1.1 }}
// //                 whileTap={{ scale: 0.9 }}
// //                 initial={{ opacity: 0, x: 20 }}
// //                 animate={{ opacity: 1, x: 0 }}
// //                 className="relative cursor-pointer group"
// //                 onClick={() => navigate("/cart")}
// //               >
// //                 <div
// //                   className={`p-2.5 rounded-xl transition-all duration-300 ${
// //                     cartPulse
// //                       ? "bg-[#E1A95F]/20"
// //                       : "hover:bg-gray-100 dark:hover:bg-gray-800"
// //                   }`}
// //                 >
// //                   <FaShoppingCart className="text-[#E1A95F] text-lg group-hover:scale-110 transition-transform duration-300" />
// //                 </div>
// //                 {cartItemCount > 0 && (
// //                   <motion.span
// //                     initial={{ scale: 0 }}
// //                     animate={{ scale: 1 }}
// //                     className={`absolute -top-1.5 -right-1.5 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg ${
// //                       cartItemCount > 9
// //                         ? "bg-gradient-to-r from-red-500 to-pink-500"
// //                         : "bg-gradient-to-r from-green-500 to-emerald-500"
// //                     }`}
// //                   >
// //                     {cartItemCount > 9 ? "9+" : cartItemCount}
// //                   </motion.span>
// //                 )}
// //               </motion.div>

// //               {/* User */}
// //               {user && (
// //                 <div className="relative" ref={userMenuRef}>
// //                   <motion.div
// //                     whileHover={{ scale: 1.1 }}
// //                     whileTap={{ scale: 0.9 }}
// //                     className="cursor-pointer p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 group"
// //                     onClick={() => setUserMenuOpen(!userMenuOpen)}
// //                   >
// //                     <FaUser className="text-[#E1A95F] text-lg group-hover:scale-110 transition-transform duration-300" />
// //                   </motion.div>
// //                   <AnimatePresence>
// //                     {userMenuOpen && (
// //                       <motion.div
// //                         className="fixed md:absolute right-0 top-20 md:top-full mt-2 w-screen md:w-56 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 md:max-w-[90vw] md:max-w-none"
// //                         initial={{ opacity: 0, y: -10, scale: 0.95 }}
// //                         animate={{ opacity: 1, y: 0, scale: 1 }}
// //                         exit={{ opacity: 0, y: -10, scale: 0.95 }}
// //                         transition={{ duration: 0.2 }}
// //                       >
// //                         <div className="space-y-3">
// //                           <div className="pb-3 border-b border-gray-200 dark:border-gray-700">
// //                             <div className="flex items-center gap-3">
// //                               <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E1A95F] to-[#d4a259] flex items-center justify-center text-white font-bold text-lg">
// //                                 {user.name?.charAt(0)?.toUpperCase() || "U"}
// //                               </div>
// //                               <div className="min-w-0 flex-1">
// //                                 <div className="font-bold text-gray-900 dark:text-white truncate">
// //                                   Hi, {user.name || "User"}
// //                                 </div>
// //                                 <div className="text-xs text-gray-700 dark:text-gray-400 truncate">
// //                                   {user.email}
// //                                 </div>
// //                                 <div className="text-xs text-[#E1A95F] font-semibold mt-1">
// //                                   {user.role === "admin"
// //                                     ? "Administrator"
// //                                     : "User"}
// //                                 </div>
// //                               </div>
// //                             </div>
// //                           </div>

// //                           <Link
// //                             to="/my-orders"
// //                             className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-900 dark:text-gray-200 hover:text-[#E1A95F] hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-300 group"
// //                             onClick={() => setUserMenuOpen(false)}
// //                           >
// //                             <div className="w-1.5 h-1.5 bg-[#E1A95F]/50 rounded-full group-hover:bg-[#E1A95F] flex-shrink-0"></div>
// //                             <span className="truncate">My Orders</span>
// //                           </Link>

// //                           {/* My Profile Link - Only for non-admin users */}
// //                           {user.role !== "admin" && (
// //                             <button
// //                               onClick={() => {
// //                                 setShowProfileModal(true);
// //                                 setUserMenuOpen(false);
// //                               }}
// //                               className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-900 dark:text-gray-200 hover:text-[#E1A95F] hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-300 group text-left"
// //                             >
// //                               <div className="w-1.5 h-1.5 bg-[#E1A95F]/50 rounded-full group-hover:bg-[#E1A95F] flex-shrink-0"></div>
// //                               <span className="truncate">My Profile</span>
// //                             </button>
// //                           )}

// //                           {user.role === "admin" && (
// //                             <Link
// //                               to="/admin"
// //                               className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-green-600 dark:text-green-400 hover:text-green-500 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-300 group"
// //                               onClick={() => setUserMenuOpen(false)}
// //                             >
// //                               <div className="w-1.5 h-1.5 bg-green-500/50 rounded-full group-hover:bg-green-500 flex-shrink-0"></div>
// //                               <span className="truncate">Admin Panel</span>
// //                             </Link>
// //                           )}

// //                           <button
// //                             onClick={() => {
// //                               logout();
// //                               setUserMenuOpen(false);
// //                               localStorage.removeItem(
// //                                 "notification_unread_count"
// //                               );
// //                               setUnreadCount(0);
// //                             }}
// //                             className="w-full mt-2 py-2.5 bg-gradient-to-r from-red-600/10 to-pink-600/10 hover:from-red-600/20 hover:to-pink-600/20 text-red-600 dark:text-red-400 hover:text-red-500 rounded-xl font-medium transition-all duration-300 border border-red-500/20 flex items-center justify-center gap-2"
// //                           >
// //                             <FaSignOutAlt />
// //                             <span className="truncate">Sign Out</span>
// //                           </button>
// //                         </div>
// //                       </motion.div>
// //                     )}
// //                   </AnimatePresence>
// //                 </div>
// //               )}

// //               {/* Mobile Menu Button */}
// //               <motion.button
// //                 whileHover={{ scale: 1.1 }}
// //                 whileTap={{ scale: 0.9 }}
// //                 onClick={() => setMenuOpen(!menuOpen)}
// //                 className="lg:hidden p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
// //               >
// //                 {menuOpen ? (
// //                   <FaTimes className="text-[#E1A95F] text-xl" />
// //                 ) : (
// //                   <FaBars className="text-gray-900 dark:text-gray-200 text-xl" />
// //                 )}
// //               </motion.button>
// //             </div>
// //           </div>
// //         </div>
// //       </motion.nav>

// //       {/* Mobile Menu Overlay */}
// //       <AnimatePresence>
// //         {menuOpen && (
// //           <>
// //             {/* Backdrop */}
// //             <motion.div
// //               initial={{ opacity: 0 }}
// //               animate={{ opacity: 1 }}
// //               exit={{ opacity: 0 }}
// //               onClick={() => setMenuOpen(false)}
// //               className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
// //             />

// //             {/* Mobile Menu Panel */}
// //             <motion.div
// //               initial={{ x: "100%" }}
// //               animate={{ x: 0 }}
// //               exit={{ x: "100%" }}
// //               transition={{ type: "spring", damping: 25 }}
// //               className="fixed top-0 right-0 h-full w-full max-w-sm z-50 lg:hidden"
// //             >
// //               <div className="h-full bg-white dark:bg-gray-900 shadow-2xl overflow-y-auto">
// //                 {/* Mobile Header */}
// //                 <div className="p-6 border-b border-gray-200 dark:border-gray-700">
// //                   <div className="flex items-center justify-between mb-6">
// //                     <div className="flex items-center gap-3">
// //                       {/* Mobile Logo */}
// //                       <div className="flex items-center">
// //                         <span className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
// //                           <span className="relative">
// //                             <span className="text-4xl text-[#E1A95F] font-extrabold leading-none">
// //                               A
// //                             </span>
// //                             <span className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-5 h-2 bg-gradient-to-r from-[#E1A95F] to-[#d4a259] rounded-full"></span>
// //                           </span>
// //                           <span className="text-2xl text-gray-900 dark:text-gray-200 font-bold ml-1">
// //                             ሀ
// //                           </span>
// //                           <span className="text-2xl text-[#E1A95F] font-bold ml-1">
// //                             s
// //                           </span>
// //                           <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 ml-2">
// //                             Cart
// //                           </span>
// //                         </span>
// //                       </div>
// //                     </div>
// //                     <motion.button
// //                       whileHover={{ scale: 1.1 }}
// //                       whileTap={{ scale: 0.9 }}
// //                       onClick={() => setMenuOpen(false)}
// //                       className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
// //                     >
// //                       <FaTimes className="text-[#E1A95F] text-xl" />
// //                     </motion.button>
// //                   </div>

// //                   {/* User Info Mobile */}
// //                   {user && (
// //                     <div className="flex items-center gap-3 mb-6 p-4 rounded-xl bg-gradient-to-r from-[#E1A95F]/10 to-[#d4a259]/10 border border-[#E1A95F]/20">
// //                       <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E1A95F] to-[#d4a259] flex items-center justify-center text-white font-bold text-lg">
// //                         {user.name?.charAt(0)?.toUpperCase() || "U"}
// //                       </div>
// //                       <div className="min-w-0 flex-1">
// //                         <div className="font-bold text-gray-900 dark:text-white truncate">
// //                           {user.name || "User"}
// //                         </div>
// //                         <div className="text-sm text-gray-700 dark:text-gray-400 truncate">
// //                           {user.email}
// //                         </div>
// //                         <div className="text-xs text-[#E1A95F] font-semibold mt-1">
// //                           {user.role === "admin" ? "Administrator" : "User"}
// //                         </div>
// //                       </div>
// //                     </div>
// //                   )}
// //                 </div>

// //                 {/* Mobile Links */}
// //                 <div className="p-6 space-y-2">
// //                   {mainPageLinks.map((link, index) => (
// //                     <button
// //                       key={index}
// //                       onClick={() => handleNavigation(link)}
// //                       className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 w-full text-left ${
// //                         (location.pathname === link.path && !link.hash) ||
// //                         (location.hash === link.hash &&
// //                           location.pathname === "/")
// //                           ? "bg-gradient-to-r from-[#E1A95F]/20 to-[#d4a259]/20 text-[#E1A95F]"
// //                           : "text-gray-900 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
// //                       }`}
// //                     >
// //                       <div
// //                         className={`w-1.5 h-1.5 rounded-full ${
// //                           (location.pathname === link.path && !link.hash) ||
// //                           (location.hash === link.hash &&
// //                             location.pathname === "/")
// //                             ? "bg-[#E1A95F]"
// //                             : "bg-gray-500 dark:bg-gray-600"
// //                         }`}
// //                       ></div>
// //                       <span className="font-medium truncate">{link.name}</span>
// //                     </button>
// //                   ))}

// //                   {/* Shop Section Mobile */}
// //                   <div className="space-y-2">
// //                     <button
// //                       onClick={() => toggleDropdown("shop-mobile")}
// //                       className="flex items-center justify-between w-full px-4 py-3.5 rounded-xl text-gray-900 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
// //                     >
// //                       <div className="flex items-center gap-3">
// //                         <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-gray-600 flex-shrink-0"></div>
// //                         <span className="font-medium truncate">Shop</span>
// //                       </div>
// //                       <FaChevronDown
// //                         className={`transition flex-shrink-0 ${
// //                           openDropdown === "shop-mobile" ? "rotate-180" : ""
// //                         }`}
// //                       />
// //                     </button>

// //                     <AnimatePresence>
// //                       {openDropdown === "shop-mobile" && (
// //                         <motion.div
// //                           initial={{ opacity: 0, height: 0 }}
// //                           animate={{ opacity: 1, height: "auto" }}
// //                           exit={{ opacity: 0, height: 0 }}
// //                           className="ml-4 pl-4 border-l border-gray-200 dark:border-gray-700 space-y-2"
// //                         >
// //                           {categories.map((cat, i) => (
// //                             <button
// //                               key={i}
// //                               onClick={() => {
// //                                 navigate(`/category/${cat.name.toLowerCase()}`);
// //                                 setMenuOpen(false);
// //                               }}
// //                               className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-gray-700 dark:text-gray-500 hover:text-[#E1A95F] hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-all duration-300 text-left"
// //                             >
// //                               <div className="w-1 h-1 bg-gray-500 dark:bg-gray-600 rounded-full flex-shrink-0"></div>
// //                               <span className="truncate">{cat.name}</span>
// //                             </button>
// //                           ))}
// //                         </motion.div>
// //                       )}
// //                     </AnimatePresence>
// //                   </div>

// //                   {/* My Profile in Mobile Menu - Only for non-admin users */}
// //                   {user && user.role !== "admin" && (
// //                     <button
// //                       onClick={() => {
// //                         setShowProfileModal(true);
// //                         setMenuOpen(false);
// //                       }}
// //                       className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl text-gray-900 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
// //                     >
// //                       <div className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-gray-600 flex-shrink-0"></div>
// //                       <span className="font-medium truncate">My Profile</span>
// //                     </button>
// //                   )}
// //                 </div>

// //                 {/* Mobile Footer */}
// //                 <div className="p-6 border-t border-gray-200 dark:border-gray-700 mt-auto">
// //                   <div className="space-y-3">
// //                     <button
// //                       onClick={() => {
// //                         navigate("/notifications");
// //                         setMenuOpen(false);
// //                       }}
// //                       className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition-all duration-300 relative"
// //                     >
// //                       <div className="flex items-center gap-3">
// //                         <div className="relative">
// //                           <FaBell className="text-[#E1A95F]" />
// //                           {unreadCount > 0 && (
// //                             <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-600 rounded-full border border-white animate-pulse"></div>
// //                           )}
// //                         </div>
// //                         <span className="truncate">Notifications</span>
// //                       </div>
// //                       {unreadCount > 0 && (
// //                         <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1 border-2 border-white/20">
// //                           {unreadCount > 9 ? "9+" : unreadCount}
// //                         </span>
// //                       )}
// //                     </button>

// //                     {user && user.role === "admin" && (
// //                       <button
// //                         onClick={() => {
// //                           navigate("/admin");
// //                           setMenuOpen(false);
// //                         }}
// //                         className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl bg-gradient-to-r from-green-600/10 to-emerald-600/10 border border-green-500/20 text-green-600 dark:text-green-400 hover:text-green-500 transition-all duration-300"
// //                       >
// //                         <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div>
// //                         <span className="truncate">Admin Panel</span>
// //                       </button>
// //                     )}
// //                   </div>
// //                 </div>
// //               </div>
// //             </motion.div>
// //           </>
// //         )}
// //       </AnimatePresence>

// //       {/* Profile Modal */}
// //       <AnimatePresence>
// //         {showProfileModal && user && user.role !== "admin" && (
// //           <>
// //             {/* Backdrop */}
// //             <motion.div
// //               initial={{ opacity: 0 }}
// //               animate={{ opacity: 1 }}
// //               exit={{ opacity: 0 }}
// //               className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
// //             />

// //             {/* Modal */}
// //             <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
// //               <motion.div
// //                 ref={profileModalRef}
// //                 initial={{ opacity: 0, scale: 0.9, y: 20 }}
// //                 animate={{ opacity: 1, scale: 1, y: 0 }}
// //                 exit={{ opacity: 0, scale: 0.9, y: 20 }}
// //                 transition={{ type: "spring", damping: 25 }}
// //                 className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden max-h-[90vh] overflow-y-auto"
// //               >
// //                 {/* Modal Header */}
// //                 <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-[#E1A95F]/10 to-[#d4a259]/10">
// //                   <div className="flex items-center justify-between">
// //                     <div className="flex items-center gap-3">
// //                       <FaUserCircle className="text-3xl text-[#E1A95F]" />
// //                       <div>
// //                         <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
// //                           My Profile
// //                         </h2>
// //                         <p className="text-gray-700 dark:text-gray-400">
// //                           Manage your account settings
// //                         </p>
// //                       </div>
// //                     </div>
// //                     <button
// //                       onClick={() => setShowProfileModal(false)}
// //                       className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
// //                     >
// //                       <FaTimes className="text-gray-600 dark:text-gray-400 text-xl" />
// //                     </button>
// //                   </div>
// //                 </div>

// //                 {/* Modal Body */}
// //                 <div className="p-6">
// //                   {/* Messages */}
// //                   {profileSuccess && (
// //                     <motion.div
// //                       initial={{ opacity: 0, y: -10 }}
// //                       animate={{ opacity: 1, y: 0 }}
// //                       className="mb-6 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl"
// //                     >
// //                       <p className="text-green-600 dark:text-green-400 text-center">
// //                         {profileSuccess}
// //                       </p>
// //                     </motion.div>
// //                   )}

// //                   {profileError && (
// //                     <motion.div
// //                       initial={{ opacity: 0, y: -10 }}
// //                       animate={{ opacity: 1, y: 0 }}
// //                       className="mb-6 p-4 bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/20 rounded-xl"
// //                     >
// //                       <p className="text-red-600 dark:text-red-400 text-center">
// //                         {profileError}
// //                       </p>
// //                     </motion.div>
// //                   )}

// //                   <div className="grid md:grid-cols-3 gap-6">
// //                     {/* Left Column - User Info */}
// //                     <div className="md:col-span-1">
// //                       <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
// //                         <div className="flex flex-col items-center">
// //                           <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#E1A95F] to-[#d4a259] flex items-center justify-center mb-4">
// //                             <span className="text-white text-3xl font-bold">
// //                               {user.name?.charAt(0)?.toUpperCase() || "U"}
// //                             </span>
// //                           </div>

// //                           <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 truncate w-full text-center">
// //                             {user.name || "User"}
// //                           </h3>
// //                           <p className="text-gray-700 dark:text-gray-400 mb-4 truncate w-full text-center">
// //                             {user.email}
// //                           </p>

// //                           <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-lg p-3 mt-4">
// //                             <h4 className="text-gray-900 dark:text-white font-semibold mb-2">
// //                               Account Status
// //                             </h4>
// //                             <div className="flex items-center justify-between mb-2">
// //                               <span className="text-gray-700 dark:text-gray-300">
// //                                 Verified
// //                               </span>
// //                               <div className="flex items-center gap-2">
// //                                 {user.isVerified ? (
// //                                   <>
// //                                     <FaCheckCircle className="text-green-500 text-sm flex-shrink-0" />
// //                                     <span className="text-xs font-semibold text-green-600 dark:text-green-400 truncate">
// //                                       Verified
// //                                     </span>
// //                                   </>
// //                                 ) : (
// //                                   <>
// //                                     <FaTimesCircle className="text-yellow-500 text-sm flex-shrink-0" />
// //                                     <span className="text-xs font-semibold text-yellow-600 dark:text-yellow-400 truncate">
// //                                       Not Verified
// //                                     </span>
// //                                   </>
// //                                 )}
// //                               </div>
// //                             </div>
// //                             <div className="flex items-center justify-between">
// //                               <span className="text-gray-700 dark:text-gray-300">
// //                                 Active
// //                               </span>
// //                               <div className="flex items-center gap-2">
// //                                 {!user.isBlocked ? (
// //                                   <>
// //                                     <FaCheckCircle className="text-green-500 text-sm flex-shrink-0" />
// //                                     <span className="text-xs font-semibold text-green-600 dark:text-green-400 truncate">
// //                                       Active
// //                                     </span>
// //                                   </>
// //                                 ) : (
// //                                   <>
// //                                     <FaTimesCircle className="text-red-500 text-sm flex-shrink-0" />
// //                                     <span className="text-xs font-semibold text-red-600 dark:text-red-400 truncate">
// //                                       Blocked
// //                                     </span>
// //                                   </>
// //                                 )}
// //                               </div>
// //                             </div>
// //                           </div>

// //                           <p className="text-xs text-gray-500 dark:text-gray-500 mt-4 text-center">
// //                             Member since{" "}
// //                             {new Date(user.createdAt).toLocaleDateString()}
// //                           </p>
// //                         </div>
// //                       </div>
// //                     </div>

// //                     {/* Right Column - Form */}
// //                     <div className="md:col-span-2">
// //                       <form
// //                         onSubmit={handleProfileSubmit}
// //                         className="space-y-6"
// //                       >
// //                         {/* Basic Info */}
// //                         <div className="space-y-4">
// //                           <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
// //                             <FaUser className="text-[#E1A95F]" />
// //                             Basic Information
// //                           </h3>

// //                           <div>
// //                             <label className="block text-gray-900 dark:text-gray-300 mb-2">
// //                               Full Name
// //                             </label>
// //                             <input
// //                               type="text"
// //                               name="name"
// //                               value={profileForm.name}
// //                               onChange={handleProfileChange}
// //                               className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E1A95F]/50 focus:border-[#E1A95F]/50 transition-all duration-300"
// //                               required
// //                             />
// //                           </div>

// //                           <div>
// //                             <label className="block text-gray-900 dark:text-gray-300 mb-2">
// //                               Email Address
// //                             </label>
// //                             <input
// //                               type="email"
// //                               name="email"
// //                               value={profileForm.email}
// //                               onChange={handleProfileChange}
// //                               className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E1A95F]/50 focus:border-[#E1A95F]/50 transition-all duration-300"
// //                               required
// //                             />
// //                           </div>

// //                           <div>
// //                             <label className="block text-gray-900 dark:text-gray-300 mb-2">
// //                               Bio
// //                             </label>
// //                             <textarea
// //                               name="bio"
// //                               value={profileForm.bio}
// //                               onChange={handleProfileChange}
// //                               rows="2"
// //                               className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E1A95F]/50 focus:border-[#E1A95F]/50 transition-all duration-300"
// //                               placeholder="Tell us about yourself..."
// //                             />
// //                           </div>
// //                         </div>

// //                         {/* Password Change */}
// //                         <div className="space-y-4 pt-6 border-t border-gray-200 dark:border-gray-700">
// //                           <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
// //                             <FaKey className="text-[#E1A95F]" />
// //                             Change Password
// //                           </h3>

// //                           <div>
// //                             <label className="block text-gray-900 dark:text-gray-300 mb-2">
// //                               Current Password
// //                             </label>
// //                             <input
// //                               type="password"
// //                               name="currentPassword"
// //                               value={profileForm.currentPassword}
// //                               onChange={handleProfileChange}
// //                               className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E1A95F]/50 focus:border-[#E1A95F]/50 transition-all duration-300"
// //                               placeholder="Required to change password"
// //                             />
// //                           </div>

// //                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                             <div>
// //                               <label className="block text-gray-900 dark:text-gray-300 mb-2">
// //                                 New Password
// //                               </label>
// //                               <input
// //                                 type="password"
// //                                 name="newPassword"
// //                                 value={profileForm.newPassword}
// //                                 onChange={handleProfileChange}
// //                                 className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E1A95F]/50 focus:border-[#E1A95F]/50 transition-all duration-300"
// //                                 placeholder="At least 6 characters"
// //                               />
// //                             </div>

// //                             <div>
// //                               <label className="block text-gray-900 dark:text-gray-300 mb-2">
// //                                 Confirm Password
// //                               </label>
// //                               <input
// //                                 type="password"
// //                                 name="confirmPassword"
// //                                 value={profileForm.confirmPassword}
// //                                 onChange={handleProfileChange}
// //                                 className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E1A95F]/50 focus:border-[#E1A95F]/50 transition-all duration-300"
// //                                 placeholder="Confirm new password"
// //                               />
// //                             </div>
// //                           </div>

// //                           <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
// //                             <FaTimesCircle className="inline mr-1" />
// //                             Leave password fields empty if you don't want to
// //                             change password
// //                           </div>
// //                         </div>

// //                         {/* Action Buttons */}
// //                         <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
// //                           <button
// //                             type="submit"
// //                             disabled={profileLoading}
// //                             className="flex-1 py-3 bg-gradient-to-r from-[#E1A95F] to-[#d4a259] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-[#E1A95F]/25 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
// //                           >
// //                             {profileLoading ? (
// //                               <>
// //                                 <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin flex-shrink-0"></div>
// //                                 <span className="truncate">Saving...</span>
// //                               </>
// //                             ) : (
// //                               <>
// //                                 <FaSave className="flex-shrink-0" />
// //                                 <span className="truncate">Save Changes</span>
// //                               </>
// //                             )}
// //                           </button>

// //                           <button
// //                             type="button"
// //                             onClick={() => setShowDeleteConfirm(true)}
// //                             className="py-3 px-6 bg-gradient-to-r from-red-600/10 to-pink-600/10 border border-red-500/20 text-red-600 dark:text-red-400 hover:text-red-500 hover:from-red-600/20 hover:to-pink-600/20 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
// //                           >
// //                             <FaTrash className="flex-shrink-0" />
// //                             <span className="truncate">Delete Account</span>
// //                           </button>
// //                         </div>
// //                       </form>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </motion.div>
// //             </div>
// //           </>
// //         )}
// //       </AnimatePresence>

// //       {/* Delete Confirmation Modal */}
// //       <AnimatePresence>
// //         {showDeleteConfirm && (
// //           <>
// //             {/* Backdrop */}
// //             <motion.div
// //               initial={{ opacity: 0 }}
// //               animate={{ opacity: 1 }}
// //               exit={{ opacity: 0 }}
// //               className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[102]"
// //             />

// //             {/* Modal */}
// //             <div className="fixed inset-0 z-[103] flex items-center justify-center p-4">
// //               <motion.div
// //                 initial={{ opacity: 0, scale: 0.9, y: 20 }}
// //                 animate={{ opacity: 1, scale: 1, y: 0 }}
// //                 exit={{ opacity: 0, scale: 0.9, y: 20 }}
// //                 transition={{ type: "spring", damping: 25 }}
// //                 className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-6"
// //               >
// //                 <div className="text-center">
// //                   <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-600/20 to-pink-600/20 flex items-center justify-center">
// //                     <FaTrash className="text-red-500 text-2xl" />
// //                   </div>

// //                   <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 truncate">
// //                     Delete Account
// //                   </h3>
// //                   <p className="text-gray-700 dark:text-gray-400 mb-6">
// //                     This action cannot be undone. All your data will be
// //                     permanently removed from our database.
// //                   </p>

// //                   <div className="mb-6">
// //                     <label className="block text-gray-900 dark:text-gray-300 mb-2 text-left">
// //                       Enter your password to confirm:
// //                     </label>
// //                     <input
// //                       type="password"
// //                       value={deletePassword}
// //                       onChange={(e) => setDeletePassword(e.target.value)}
// //                       className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300"
// //                       placeholder="Your password"
// //                     />
// //                   </div>

// //                   <div className="flex gap-4">
// //                     <button
// //                       onClick={() => setShowDeleteConfirm(false)}
// //                       className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300 truncate"
// //                     >
// //                       Cancel
// //                     </button>

// //                     <button
// //                       onClick={handleDeleteAccount}
// //                       disabled={profileLoading}
// //                       className="flex-1 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 disabled:opacity-50 truncate"
// //                     >
// //                       {profileLoading ? "Deleting..." : "Delete Account"}
// //                     </button>
// //                   </div>
// //                 </div>
// //               </motion.div>
// //             </div>
// //           </>
// //         )}
// //       </AnimatePresence>

// //       {/* Scroll Progress Bar */}
// //       <motion.div
// //         className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#E1A95F] via-[#d4a259] to-[#E1A95F] z-50"
// //         style={{ scaleX: scrolled ? 1 : 0 }}
// //         transition={{ duration: 0.3 }}
// //       />
// //     </>
// //   );
// // };

// // export default Navigation;import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaChevronDown,
  FaUser,
  FaBell,
  FaSearch,
  FaKey,
  FaTrash,
  FaSave,
  FaUserCircle,
  FaSignOutAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
  FaBox,
  FaTag,
  FaFire,
  FaHistory,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { authContext } from "../Context/authContext";
import { cartContext } from "../Context/cartContext";
import { initSocket } from "../utils/socket";
import { fetchWithAuth } from "../utils/auth";
import { useState, useEffect, useRef, useContext } from "react";
const API = import.meta.env.VITE_API_URL;

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [unreadCount, setUnreadCount] = useState(() => {
    const saved = localStorage.getItem("notification_unread_count");
    return saved ? parseInt(saved, 10) : 0;
  });
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [cartPulse, setCartPulse] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    bio: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState("");
  const [profileSuccess, setProfileSuccess] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [popularSearches, setPopularSearches] = useState([]);
  const [searchHistoryOpen, setSearchHistoryOpen] = useState(true);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [badgeAnimation, setBadgeAnimation] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  const searchRef = useRef(null);
  const searchInputRef = useRef(null);
  const profileModalRef = useRef(null);
  const userMenuRef = useRef(null);
  const socketRef = useRef(null);
  const soundRef = useRef(null);
  const mountedRef = useRef(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, updateUser } = useContext(authContext);
  const { cart } = useContext(cartContext);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark");
  };

  // Apply theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Main page section links
  const mainPageLinks = [
    { name: "Home", path: "/", hash: "#home" },
    { name: "Categories", path: "/#categories", hash: "#categories" },
    { name: "Products", path: "/#products", hash: "#products" },
    { name: "About-us", path: "/#about", hash: "#about" },
    { name: "Contact-us", path: "/#contact", hash: "#contact" },
    { name: "Blog", path: "/blog" },
  ];

  // Initialize sound
  useEffect(() => {
    soundRef.current = new Audio("/sounds/notification.mp3");
    soundRef.current.volume = 0.3;

    return () => {
      mountedRef.current = false;
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  // Update localStorage and document title when unreadCount changes
  useEffect(() => {
    localStorage.setItem("notification_unread_count", unreadCount.toString());
    updateDocumentTitle(unreadCount);
  }, [unreadCount]);

  // Update document title
  const updateDocumentTitle = (count) => {
    const baseTitle = document.title.replace(/^\(\d+\)\s*/, "") || "Aደስ";
    if (count > 0) {
      document.title = `(${count}) ${baseTitle}`;
    } else {
      document.title = baseTitle;
    }
  };

  // Play notification sound
  const playNotificationSound = () => {
    if (soundRef.current) {
      soundRef.current.currentTime = 0;
      soundRef.current
        .play()
        .catch((e) => console.log("Sound play failed:", e));
    }
  };

  // Fetch categories for dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetchWithAuth(`${API}/api/categories`);
        const data = await res.json();
        setCategories(data || []);
      } catch (err) {
        console.error("Categories fetch error:", err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch all categories for search
  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const res = await fetchWithAuth(
          `${API}/api/products/categories-for-search`
        );
        if (res.ok) {
          const data = await res.json();
          setAllCategories(data);
        }
      } catch (err) {
        console.error("All categories fetch error:", err);
      }
    };
    fetchAllCategories();
  }, []);

  // Fetch popular searches
  useEffect(() => {
    const fetchPopularSearches = async () => {
      try {
        const res = await fetchWithAuth(`${API}/api/products/popular-searches`);
        if (res.ok) {
          const data = await res.json();
          setPopularSearches(data || []);
        }
      } catch (err) {
        console.error("Popular searches error:", err);
      }
    };
    fetchPopularSearches();
  }, []);

  // Load recent searches
  useEffect(() => {
    const savedSearches = localStorage.getItem("recent_searches");
    if (savedSearches) {
      try {
        setRecentSearches(JSON.parse(savedSearches));
      } catch (e) {
        console.error("Error parsing recent searches:", e);
      }
    }
  }, []);

  // Save recent searches
  const saveRecentSearches = (searches) => {
    setRecentSearches(searches);
    localStorage.setItem("recent_searches", JSON.stringify(searches));
  };

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cart pulse animation
  useEffect(() => {
    if (cart?.items?.length > 0) {
      setCartPulse(true);
      const timer = setTimeout(() => setCartPulse(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [cart?.items]);

  // Fetch initial unread count
  useEffect(() => {
    if (!user) {
      setUnreadCount(0);
      localStorage.setItem("notification_unread_count", "0");
      return;
    }

    fetchUnreadCount();
    setupSocketConnection();

    const pollingInterval = setInterval(() => {
      if (mountedRef.current && user) {
        fetchUnreadCount();
      }
    }, 60000);

    return () => {
      clearInterval(pollingInterval);
    };
  }, [user]);

  // Setup socket connection for notifications
  const setupSocketConnection = () => {
    if (!user || !mountedRef.current) return;

    console.log("🔌 Setting up socket connection for user:", user._id);

    try {
      const socket = initSocket();
      socketRef.current = socket;

      socket.on("connect", () => {
        console.log("✅ Navigation socket connected:", socket.id);
        setSocketConnected(true);

        if (user._id) {
          socket.emit("join", user._id);
          console.log(`👤 User ${user._id} joined socket room`);
        }
      });

      socket.on("connect_error", (error) => {
        console.error("❌ Navigation socket connect error:", error);
        setSocketConnected(false);
      });

      socket.on("disconnect", (reason) => {
        console.log("🔌 Navigation socket disconnected:", reason);
        setSocketConnected(false);
      });

      socket.on("notification", (newNotification) => {
        console.log("🔔 Navigation received notification:", newNotification);

        if (!mountedRef.current) return;

        setUnreadCount((prev) => {
          const newCount = prev + 1;
          localStorage.setItem(
            "notification_unread_count",
            newCount.toString()
          );
          return newCount;
        });

        setBadgeAnimation(true);
        playNotificationSound();
        setTimeout(() => setBadgeAnimation(false), 500);

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

      socket.on("notification-count", (data) => {
        console.log("📊 Navigation received notification count:", data);

        if (!mountedRef.current) return;

        const newCount = data.count || 0;
        setUnreadCount(newCount);
        localStorage.setItem("notification_unread_count", newCount.toString());
        setBadgeAnimation(true);
        setTimeout(() => setBadgeAnimation(false), 300);
      });

      socket.on("notification-count-response", (data) => {
        console.log(
          "📊 Navigation received notification count response:",
          data
        );

        if (!mountedRef.current) return;

        const newCount = data.count || 0;
        setUnreadCount(newCount);
        localStorage.setItem("notification_unread_count", newCount.toString());
        setBadgeAnimation(true);
        setTimeout(() => setBadgeAnimation(false), 300);
      });

      const handleAppNotification = (event) => {
        const newNotification = event.detail;
        console.log(
          "📢 Navigation received app-notification:",
          newNotification
        );

        if (!mountedRef.current) return;

        setUnreadCount((prev) => {
          const newCount = prev + 1;
          localStorage.setItem(
            "notification_unread_count",
            newCount.toString()
          );
          return newCount;
        });

        setBadgeAnimation(true);
        playNotificationSound();
        setTimeout(() => setBadgeAnimation(false), 500);
      };

      const handleUpdateNotificationCount = (event) => {
        const { increment, decrement, count } = event.detail;
        console.log(
          "🔢 Navigation received update-notification-count:",
          event.detail
        );

        setUnreadCount((prev) => {
          let newCount = prev;

          if (count !== undefined) {
            newCount = count;
          } else if (increment !== undefined) {
            newCount = prev + (increment || 1);
          } else if (decrement !== undefined) {
            newCount = Math.max(0, prev - (decrement || 1));
          }

          console.log(`🔄 Updating badge count: ${prev} -> ${newCount}`);
          localStorage.setItem(
            "notification_unread_count",
            newCount.toString()
          );
          return newCount;
        });

        setBadgeAnimation(true);
        setTimeout(() => setBadgeAnimation(false), 300);
      };

      const handleNotificationAction = (event) => {
        const { action, count } = event.detail;
        console.log("📢 Navigation received notification action:", action);

        if (count !== undefined) {
          setUnreadCount(count);
          localStorage.setItem("notification_unread_count", count.toString());
        } else if (action === "mark-all-read" || action === "delete-all") {
          setUnreadCount(0);
          localStorage.setItem("notification_unread_count", "0");
        }
        setBadgeAnimation(true);
        setTimeout(() => setBadgeAnimation(false), 300);
      };

      window.addEventListener("app-notification", handleAppNotification);
      window.addEventListener(
        "update-notification-count",
        handleUpdateNotificationCount
      );
      window.addEventListener(
        "notification-action-completed",
        handleNotificationAction
      );

      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
          socketRef.current = null;
        }
        window.removeEventListener("app-notification", handleAppNotification);
        window.removeEventListener(
          "update-notification-count",
          handleUpdateNotificationCount
        );
        window.removeEventListener(
          "notification-action-completed",
          handleNotificationAction
        );
        setSocketConnected(false);
      };
    } catch (error) {
      console.error("❌ Socket setup error:", error);
    }
  };

  // Fetch unread count function
  const fetchUnreadCount = async (retryCount = 0) => {
    if (!user) {
      setUnreadCount(0);
      localStorage.setItem("notification_unread_count", "0");
      return;
    }

    try {
      console.log("📊 Fetching unread count from server...");
      const res = await fetchWithAuth(`${API}/api/notifications/unread-count`);

      if (!res.ok) {
        throw new Error(`Failed to fetch unread count: ${res.status}`);
      }

      const data = await res.json();

      if (data.success) {
        const newCount = data.data?.count || 0;
        console.log("✅ Unread count fetched from server:", newCount);

        setUnreadCount(newCount);
        localStorage.setItem("notification_unread_count", newCount.toString());

        window.dispatchEvent(
          new CustomEvent("update-notification-count", {
            detail: { count: newCount },
          })
        );
      } else {
        console.error("❌ API error:", data.message);
        setUnreadCount(0);
        localStorage.setItem("notification_unread_count", "0");
      }
    } catch (err) {
      console.error("❌ Fetch unread count error:", err);

      if (retryCount < 2) {
        console.log(`🔄 Retrying fetch unread count (${retryCount + 1}/2)...`);
        setTimeout(() => fetchUnreadCount(retryCount + 1), 2000);
      } else {
        setUnreadCount(0);
        localStorage.setItem("notification_unread_count", "0");
      }
    }
  };

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when search opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();
        setSearchHistoryOpen(true);
      }, 100);
    }
  }, [searchOpen]);

  // Close modals and dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }

      if (
        profileModalRef.current &&
        !profileModalRef.current.contains(event.target)
      ) {
        setShowProfileModal(false);
        setShowDeleteConfirm(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Initialize profile form when user data changes
  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || "",
        email: user.email || "",
        bio: user.bio || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  }, [user]);

  // Handle navigation to sections
  const handleNavigation = (link) => {
    if (link.hash) {
      // If we're already on the main page, scroll to section
      if (location.pathname === "/") {
        const element = document.getElementById(link.hash.replace("#", ""));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // Navigate to main page with hash
        navigate(`/${link.hash}`);
      }
    } else {
      // Regular navigation
      navigate(link.path);
    }
    setMenuOpen(false);
    setOpenDropdown(null);
  };

  // 🔍 SEARCH FUNCTION
  const searchProducts = async (query) => {
    if (!query || query.trim() === "") {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    try {
      const res = await fetchWithAuth(
        `${API}/api/products/quick-search?q=${encodeURIComponent(query)}`
      );

      if (res.ok) {
        const data = await res.json();
        setSearchResults(data);

        if (data.length > 0 && !recentSearches.includes(query)) {
          const updated = [query, ...recentSearches].slice(0, 8);
          saveRecentSearches(updated);
        }
      } else {
        console.error("Search failed with status:", res.status);
        setSearchResults([]);
      }
    } catch (err) {
      console.error("Search error:", err);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Debounced search
  useEffect(() => {
    if (!searchOpen) return;

    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
        searchProducts(searchQuery);
      } else {
        setSearchResults([]);
        setSearchHistoryOpen(true);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [searchQuery, searchOpen]);

  // Add to recent searches
  const addToRecentSearches = (query) => {
    const updated = [
      query,
      ...recentSearches.filter((s) => s.toLowerCase() !== query.toLowerCase()),
    ].slice(0, 8);
    saveRecentSearches(updated);
  };

  // Clear recent searches
  const clearRecentSearches = () => {
    saveRecentSearches([]);
  };

  // Handle search submission
  const handleSearch = (e, query = null, category = null) => {
    e?.preventDefault();
    const searchTerm = query || searchQuery.trim();

    if (searchTerm) {
      addToRecentSearches(searchTerm);

      if (category) {
        navigate(`/search?category=${encodeURIComponent(category)}`);
      } else {
        navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      }

      setSearchOpen(false);
      setSearchQuery("");
      setSearchResults([]);
    }
  };

  // Handle category click from search
  const handleCategorySearch = (categoryName) => {
    addToRecentSearches(categoryName);
    navigate(`/search?category=${encodeURIComponent(categoryName)}`);
    setSearchOpen(false);
  };

  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const toggleDropdown = (key) =>
    setOpenDropdown(openDropdown === key ? null : key);

  const handleCategoryClick = (path) => {
    navigate(path);
    setMenuOpen(false);
    setOpenDropdown(null);
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
      };

      if (profileForm.currentPassword && profileForm.newPassword) {
        updateData.currentPassword = profileForm.currentPassword;
        updateData.newPassword = profileForm.newPassword;
      }

      console.log("Sending update to:", `${API}/api/users/profile`);
      console.log("Update data:", updateData);

      const res = await fetchWithAuth(`${API}/api/users/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      console.log("Response status:", res.status);

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        console.error("Non-JSON response from server:", text.substring(0, 200));
        throw new Error(
          "Server returned non-JSON response. Please check if the API endpoint exists."
        );
      }

      const data = await res.json();
      console.log("Response data:", data);

      if (!res.ok) {
        throw new Error(
          data.message || `Failed to update profile (${res.status})`
        );
      }

      if (!data.success) {
        throw new Error(data.message || "Profile update failed");
      }

      if (data.user) {
        updateUser(data.user);
        setProfileSuccess("Profile updated successfully!");
      } else {
        throw new Error("No user data returned from server");
      }

      setProfileForm((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));

      setTimeout(() => setProfileSuccess(""), 3000);
    } catch (err) {
      console.error("Profile update error:", err);
      setProfileError(
        err.message || "Failed to update profile. Please try again."
      );
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
      console.log(
        "Sending delete request to:",
        `${API}/api/users/delete-account`
      );

      const res = await fetchWithAuth(`${API}/api/users/delete-account`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password: deletePassword }),
      });

      console.log("Delete response status:", res.status);

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        console.error("Non-JSON response from server:", text.substring(0, 200));
        throw new Error(
          "Server returned non-JSON response. Please check if the API endpoint exists."
        );
      }

      const data = await res.json();
      console.log("Delete response data:", data);

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to delete account");
      }

      logout();
      setShowProfileModal(false);
      navigate("/login");
    } catch (err) {
      console.error("Delete account error:", err);
      setProfileError(
        err.message || "Failed to delete account. Please try again."
      );
      setProfileLoading(false);
    }
  };

  const cartItemCount =
    cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  // Custom Theme Toggle Component
  const ThemeToggle = () => (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 dark:bg-gray-800/50 dark:hover:bg-gray-800 transition-all duration-300 group"
    >
      {theme === "light" ? (
        <FaMoon className="text-slate-800 text-lg group-hover:text-yellow-500 transition-colors duration-300" />
      ) : (
        <FaSun className="text-yellow-300 text-lg group-hover:text-yellow-400 transition-colors duration-300" />
      )}
    </motion.button>
  );

  return (
    <>
      {/* Navigation Container */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="fixed top-0 w-full z-50 transition-all duration-300"
      >
        {/* Top Announcement Bar */}
        <div className="bg-gradient-to-r from-[#E1A95F]/20 via-[#d4a259]/20 to-[#c5954d]/20 py-2 px-4 text-center">
          <p className="text-xs text-white/90 font-medium">
            🚚{" "}
            <span className="text-[#E1A95F] font-semibold">Free Shipping</span>{" "}
            on orders over $100 •
            <span className="text-green-300 font-semibold ml-2">
              🎁 30% OFF
            </span>{" "}
            for new customers
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo - Custom styled text */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center"
            >
              <button
                onClick={() => navigate("/")}
                className="flex items-center focus:outline-none no-underline"
              >
                <div className="relative">
                  <div className="flex items-center">
                    {/* Custom A letter with arrow style */}
                    <div className="relative">
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent border-b-[#E1A95F]"></div>
                      <div className="text-[#E1A95F] text-4xl font-bold ml-0.5">
                        A
                      </div>
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-[#E1A95F] rounded-sm"></div>
                    </div>

                    {/* Ethiopian text */}
                    <div className="ml-1">
                      <span className="text-white dark:text-gray-900 text-4xl font-bold tracking-tight">
                        ደስ
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            </motion.div>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-1">
              {mainPageLinks.map((link, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <button
                    onClick={() => handleNavigation(link)}
                    className={`relative px-4 py-2.5 mx-1 rounded-xl transition-all duration-300 font-medium ${
                      (location.pathname === link.path && !link.hash) ||
                      (location.hash === link.hash && location.pathname === "/")
                        ? "bg-[#E1A95F]/10 text-[#8B4513] dark:text-white"
                        : "text-[#8B4513] dark:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.name}
                    {(location.pathname === link.path && !link.hash) ||
                    (location.hash === link.hash &&
                      location.pathname === "/") ? (
                      <motion.div
                        layoutId="underline"
                        className="absolute left-4 right-4 h-0.5 bottom-1.5 bg-[#E1A95F] rounded-full"
                      />
                    ) : null}
                  </button>
                </motion.li>
              ))}

              {/* Dynamic Shop Dropdown */}
              <motion.li className="relative">
                <button
                  onClick={() => toggleDropdown("shop")}
                  className={`flex items-center gap-2 px-4 py-2.5 mx-1 rounded-xl transition-all duration-300 font-medium ${
                    openDropdown === "shop"
                      ? "bg-[#E1A95F]/10 text-[#8B4513] dark:text-white"
                      : "text-[#8B4513] dark:text-white hover:bg-white/5"
                  }`}
                >
                  Shop
                  <motion.span
                    animate={{ rotate: openDropdown === "shop" ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaChevronDown className="text-sm" />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openDropdown === "shop" && (
                    <motion.div
                      className="absolute left-0 top-full mt-2 min-w-[220px] bg-slate-900/95 dark:bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-700 dark:border-gray-300 p-3"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="space-y-2">
                        {categories.map((cat, i) => (
                          <motion.button
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: i * 0.05 }}
                            onClick={() =>
                              handleCategoryClick(
                                `/category/${cat.name.toLowerCase()}`
                              )
                            }
                            className="w-full text-left px-3 py-2.5 rounded-lg text-[#E1A95F] dark:text-gray-700 hover:text-[#E1A95F] hover:bg-slate-800/50 dark:hover:bg-gray-200 transition-all duration-300 flex items-center gap-3 group"
                          >
                            <div className="w-2 h-2 bg-[#E1A95F]/50 rounded-full group-hover:bg-[#E1A95F] transition-all duration-300"></div>
                            <span className="font-medium">{cat.name}</span>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>

              <li className="ml-2">
                <ThemeToggle />
              </li>
            </ul>

            {/* Right Icons */}
            <div className="flex items-center gap-3 md:gap-4">
              {/* Enhanced Search */}
              <div ref={searchRef} className="">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setSearchOpen(!searchOpen);
                    setSearchHistoryOpen(true);
                  }}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 dark:bg-gray-800/50 dark:hover:bg-gray-800 transition-all duration-300 group"
                >
                  <FaSearch className="text-slate-300 dark:text-gray-600 group-hover:text-[#E1A95F] text-lg transition-colors duration-300" />
                </motion.button>

                <AnimatePresence>
                  {searchOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 10 }}
                      className="absolute max-sm:right-0 right-10 top-full mt-2 max-sm:w-full w-[50%] max-w-2xl backdrop-blur-sm rounded-xl shadow-2xl border border-slate-700 dark:border-gray-300 overflow-hidden z-50"
                    >
                      {/* Search Input */}
                      <div className="p-4 border-b border-slate-700 dark:border-gray-300 bg-slate-900/50 dark:bg-white">
                        <form
                          onSubmit={(e) => handleSearch(e)}
                          className="relative"
                        >
                          <div className="relative">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 dark:text-gray-500" />
                            <input
                              ref={searchInputRef}
                              type="text"
                              value={searchQuery}
                              onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setSearchHistoryOpen(e.target.value === "");
                              }}
                              placeholder="Search products, brands, categories..."
                              className="w-full pl-10 pr-10 py-3 bg-slate-800/50 dark:bg-gray-100 border border-slate-700 dark:border-gray-300 rounded-xl text-white dark:text-gray-900 placeholder-slate-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E1A95F]/50 focus:border-[#E1A95F]/50 transition-all duration-300"
                            />
                            {searchQuery && (
                              <button
                                type="button"
                                onClick={() => {
                                  setSearchQuery("");
                                  setSearchResults([]);
                                  setSearchHistoryOpen(true);
                                }}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 dark:text-gray-500 hover:text-slate-300 dark:hover:text-gray-700 transition-colors"
                              >
                                <FaTimesCircle />
                              </button>
                            )}
                          </div>
                          {isSearching && (
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                              <FaSpinner className="animate-spin text-[#E1A95F]" />
                            </div>
                          )}
                        </form>
                      </div>

                      {/* Search Content */}
                      <div className="max-h-96 overflow-y-auto bg-slate-900/95 dark:bg-white/95">
                        {/* Recent Searches */}
                        {searchHistoryOpen &&
                          recentSearches.length > 0 &&
                          !searchQuery && (
                            <div className="p-4 border-b border-slate-700 dark:border-gray-300">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <FaHistory className="text-slate-500 dark:text-gray-500 text-sm" />
                                  <h3 className="text-sm font-semibold text-slate-400 dark:text-gray-600">
                                    Recent Searches
                                  </h3>
                                </div>
                                <button
                                  onClick={clearRecentSearches}
                                  className="text-xs text-slate-500 dark:text-gray-500 hover:text-slate-300 dark:hover:text-gray-700 transition-colors"
                                >
                                  Clear All
                                </button>
                              </div>
                              <div className="space-y-2">
                                {recentSearches.map((search, index) => (
                                  <button
                                    key={index}
                                    onClick={() => {
                                      setSearchQuery(search);
                                      handleSearch(null, search);
                                    }}
                                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-800/50 dark:hover:bg-gray-200 transition-all duration-300 group"
                                  >
                                    <div className="flex items-center gap-3">
                                      <FaSearch className="text-slate-500 dark:text-gray-500 text-sm group-hover:text-[#E1A95F]" />
                                      <span className="text-slate-300 dark:text-gray-700 group-hover:text-white dark:group-hover:text-gray-900">
                                        {search}
                                      </span>
                                    </div>
                                    <FaTimesCircle
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        const updated = recentSearches.filter(
                                          (_, i) => i !== index
                                        );
                                        saveRecentSearches(updated);
                                      }}
                                      className="text-slate-600 dark:text-gray-400 hover:text-slate-400 dark:hover:text-gray-600 text-sm opacity-0 group-hover:opacity-100 transition-all"
                                    />
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                        {/* Popular Searches */}
                        {searchHistoryOpen &&
                          popularSearches.length > 0 &&
                          !searchQuery && (
                            <div className="p-4 border-b border-slate-700 dark:border-gray-300">
                              <div className="flex items-center gap-2 mb-3">
                                <FaFire className="text-amber-500 text-sm" />
                                <h3 className="text-sm font-semibold text-slate-400 dark:text-gray-600">
                                  Popular Searches
                                </h3>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {popularSearches
                                  .slice(0, 6)
                                  .map((search, index) => (
                                    <button
                                      key={index}
                                      onClick={() => {
                                        setSearchQuery(search);
                                        handleSearch(null, search);
                                      }}
                                      className="px-3 py-1.5 bg-slate-800/50 dark:bg-gray-100 hover:bg-[#E1A95F]/20 text-slate-300 dark:text-gray-700 hover:text-[#E1A95F] rounded-lg text-sm transition-all duration-300 border border-slate-700 dark:border-gray-300 hover:border-[#E1A95F]/30"
                                    >
                                      {search}
                                    </button>
                                  ))}
                              </div>
                            </div>
                          )}

                        {/* Categories */}
                        {searchHistoryOpen &&
                          allCategories.length > 0 &&
                          !searchQuery && (
                            <div className="p-4">
                              <div className="flex items-center gap-2 mb-3">
                                <FaTag className="text-[#E1A95F] text-sm" />
                                <h3 className="text-sm font-semibold text-slate-400 dark:text-gray-600">
                                  Browse Categories
                                </h3>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                {allCategories
                                  .slice(0, showAllCategories ? 20 : 6)
                                  .map((category, index) => (
                                    <button
                                      key={index}
                                      onClick={() =>
                                        handleCategorySearch(category.name)
                                      }
                                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/30 dark:bg-gray-100 hover:bg-slate-800/70 dark:hover:bg-gray-200 transition-all duration-300 group"
                                    >
                                      <FaBox className="text-slate-500 dark:text-gray-500 text-sm group-hover:text-[#E1A95F]" />
                                      <span className="text-slate-300 dark:text-gray-700 text-sm truncate">
                                        {category.name}
                                      </span>
                                    </button>
                                  ))}
                              </div>
                              {allCategories.length > 6 && (
                                <button
                                  onClick={() =>
                                    setShowAllCategories(!showAllCategories)
                                  }
                                  className="w-full mt-3 text-center text-xs text-slate-500 dark:text-gray-500 hover:text-[#E1A95F] transition-colors"
                                >
                                  {showAllCategories
                                    ? "Show Less"
                                    : `Show All ${allCategories.length} Categories`}
                                </button>
                              )}
                            </div>
                          )}

                        {/* Search Results */}
                        {searchQuery && (
                          <div className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="text-sm font-semibold text-slate-400 dark:text-gray-600">
                                {searchResults.length > 0
                                  ? `Found ${searchResults.length} results`
                                  : isSearching
                                    ? "Searching..."
                                    : "No results found"}
                              </h3>
                              {searchResults.length > 0 && (
                                <button
                                  onClick={(e) => handleSearch(e)}
                                  className="text-xs text-[#E1A95F] hover:text-[#d4a259] font-medium"
                                >
                                  See all →
                                </button>
                              )}
                            </div>

                            {searchResults.length > 0 ? (
                              <div className="space-y-3">
                                {searchResults.slice(0, 5).map((product) => (
                                  <Link
                                    key={product._id}
                                    to={`/product/${product._id}`}
                                    onClick={() => {
                                      setSearchOpen(false);
                                      setSearchQuery("");
                                    }}
                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800/50 dark:hover:bg-gray-200 transition-all duration-300 group"
                                  >
                                    <div className="w-20 h-20 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                                      {product.image ? (
                                        <img
                                          src={
                                            product.image.startsWith("http")
                                              ? product.image
                                              : `${API}${product.image}`
                                          }
                                          alt={product.name}
                                          className="w-full h-full object-contain"
                                          onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src =
                                              "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop";
                                          }}
                                        />
                                      ) : (
                                        <FaBox className="text-slate-500 dark:text-gray-500" />
                                      )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-start justify-between gap-2">
                                        <h4 className="text-sm font-medium text-white dark:text-gray-900 truncate group-hover:text-[#E1A95F]">
                                          {product.name}
                                        </h4>
                                        <span className="text-sm font-semibold text-[#E1A95F] flex-shrink-0">
                                          {formatPrice(product.price)}
                                        </span>
                                      </div>
                                      <p className="text-xs text-slate-400 dark:text-gray-600 truncate">
                                        {product.category || "Uncategorized"}
                                      </p>
                                      <div className="flex items-center gap-2 mt-1">
                                        {product.isSold ||
                                        product.stock === 0 ? (
                                          <span className="text-xs text-red-500">
                                            Sold Out
                                          </span>
                                        ) : (
                                          <span className="text-xs text-green-500">
                                            {product.stock || 0} in stock
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            ) : !isSearching ? (
                              <div className="text-center py-6">
                                <div className="w-12 h-12 mx-auto rounded-full bg-slate-800/50 dark:bg-gray-100 flex items-center justify-center mb-3">
                                  <FaSearch className="text-slate-500 dark:text-gray-500" />
                                </div>
                                <p className="text-slate-400 dark:text-gray-600 text-sm">
                                  No products found for "{searchQuery}"
                                </p>
                                <p className="text-slate-500 dark:text-gray-500 text-xs mt-2">
                                  Try different keywords
                                </p>
                              </div>
                            ) : null}
                          </div>
                        )}
                      </div>

                      {/* Search Footer */}
                      {searchQuery && (
                        <div className="p-4 border-t border-slate-700 dark:border-gray-300 bg-slate-900/50 dark:bg-gray-100">
                          <button
                            onClick={(e) => handleSearch(e)}
                            className="w-full py-2.5 bg-gradient-to-r from-[#E1A95F] to-[#d4a259] text-white rounded-xl font-medium hover:shadow-lg hover:shadow-[#E1A95F]/25 transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            <FaSearch />
                            Search for "{searchQuery}"
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Notifications with YouTube-style badge */}
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="relative cursor-pointer group"
                  onClick={() => navigate("/notifications")}
                >
                  <div className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 dark:bg-gray-800/50 dark:hover:bg-gray-800 transition-all duration-300 relative">
                    <FaBell className="text-slate-300 dark:text-gray-600 group-hover:text-[#E1A95F] text-lg transition-colors duration-300" />

                    {/* Socket connection indicator */}
                    {socketConnected && (
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse border border-white"></div>
                    )}

                    {/* YouTube-style notification badge */}
                    {unreadCount > 0 && (
                      <div className="absolute top-0 right-0">
                        <motion.div
                          key={`badge-${unreadCount}-${badgeAnimation}`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          whileHover={{ scale: 1.1 }}
                          transition={{
                            duration: 0.3,
                            type: "spring",
                            stiffness: 300,
                          }}
                          className="relative"
                        >
                          <div className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 shadow-lg border-2 border-white/20">
                            {unreadCount > 9 ? "9+" : unreadCount}
                          </div>

                          {badgeAnimation && (
                            <motion.div
                              initial={{ scale: 1, opacity: 0.75 }}
                              animate={{
                                scale: 1.4,
                                opacity: 0,
                              }}
                              transition={{
                                duration: 0.8,
                                repeat: 2,
                                repeatType: "reverse",
                              }}
                              className="absolute -top-1 -right-1 w-[18px] h-[18px] bg-red-600 rounded-full"
                            ></motion.div>
                          )}
                        </motion.div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Cart */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative cursor-pointer group"
                onClick={() => navigate("/cart")}
              >
                <div
                  className={`p-2.5 rounded-xl border transition-all duration-300 ${
                    cartPulse
                      ? "bg-[#E1A95F]/20 border-[#E1A95F]/30"
                      : "bg-white/5 border-white/10 dark:bg-gray-800/50 dark:border-gray-700 hover:bg-white/10 dark:hover:bg-gray-800"
                  }`}
                >
                  <FaShoppingCart className="text-[#E1A95F] text-lg group-hover:scale-110 transition-transform duration-300" />
                </div>
                {cartItemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`absolute -top-1.5 -right-1.5 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg ${
                      cartItemCount > 9
                        ? "bg-gradient-to-r from-red-500 to-pink-500"
                        : "bg-gradient-to-r from-green-500 to-emerald-500"
                    }`}
                  >
                    {cartItemCount > 9 ? "9+" : cartItemCount}
                  </motion.span>
                )}
              </motion.div>

              {/* User */}
              {user && (
                <div className="relative" ref={userMenuRef}>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="cursor-pointer p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 dark:bg-gray-800/50 dark:hover:bg-gray-800 transition-all duration-300 group"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                  >
                    <FaUser className="text-[#E1A95F] text-lg group-hover:scale-110 transition-transform duration-300" />
                  </motion.div>
                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        className="fixed md:absolute right-0 top-20 md:top-full mt-2 w-screen md:w-56 bg-slate-900/95 dark:bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-slate-700 dark:border-gray-300 p-4 md:max-w-[90vw] md:max-w-none"
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="space-y-3">
                          <div className="pb-3 border-b border-slate-700 dark:border-gray-300">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E1A95F] to-[#d4a259] flex items-center justify-center text-white font-bold text-lg">
                                {user.name?.charAt(0)?.toUpperCase() || "U"}
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="font-bold text-white dark:text-gray-900 truncate">
                                  Hi, {user.name || "User"}
                                </div>
                                <div className="text-xs text-slate-400 dark:text-gray-600 truncate">
                                  {user.email}
                                </div>
                                <div className="text-xs text-[#E1A95F] font-semibold mt-1">
                                  {user.role === "admin"
                                    ? "Administrator"
                                    : "User"}
                                </div>
                              </div>
                            </div>
                          </div>

                          <Link
                            to="/my-orders"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 dark:text-gray-700 hover:text-[#E1A95F] hover:bg-slate-800/50 dark:hover:bg-gray-200 transition-all duration-300 group"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <div className="w-1.5 h-1.5 bg-[#E1A95F]/50 rounded-full group-hover:bg-[#E1A95F] flex-shrink-0"></div>
                            <span className="truncate">My Orders</span>
                          </Link>

                          {/* My Profile Link - Only for non-admin users */}
                          {user.role !== "admin" && (
                            <button
                              onClick={() => {
                                setShowProfileModal(true);
                                setUserMenuOpen(false);
                              }}
                              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-300 dark:text-gray-700 hover:text-[#E1A95F] hover:bg-slate-800/50 dark:hover:bg-gray-200 transition-all duration-300 group text-left"
                            >
                              <div className="w-1.5 h-1.5 bg-[#E1A95F]/50 rounded-full group-hover:bg-[#E1A95F] flex-shrink-0"></div>
                              <span className="truncate">My Profile</span>
                            </button>
                          )}

                          {user.role === "admin" && (
                            <Link
                              to="/admin"
                              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-green-400 hover:text-green-300 hover:bg-slate-800/50 dark:hover:bg-gray-200 transition-all duration-300 group"
                              onClick={() => setUserMenuOpen(false)}
                            >
                              <div className="w-1.5 h-1.5 bg-green-500/50 rounded-full group-hover:bg-green-500 flex-shrink-0"></div>
                              <span className="truncate">Admin Panel</span>
                            </Link>
                          )}

                          <button
                            onClick={() => {
                              logout();
                              setUserMenuOpen(false);
                              localStorage.removeItem(
                                "notification_unread_count"
                              );
                              setUnreadCount(0);
                            }}
                            className="w-full mt-2 py-2.5 bg-gradient-to-r from-red-600/10 to-pink-600/10 hover:from-red-600/20 hover:to-pink-600/20 text-red-400 hover:text-red-300 rounded-xl font-medium transition-all duration-300 border border-red-500/20 flex items-center justify-center gap-2"
                          >
                            <FaSignOutAlt />
                            <span className="truncate">Sign Out</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 dark:bg-gray-800/50 dark:hover:bg-gray-800 transition-all duration-300"
              >
                {menuOpen ? (
                  <FaTimes className="text-[#E1A95F] text-xl" />
                ) : (
                  <FaBars className="text-slate-300 dark:text-gray-600 text-xl" />
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm z-50 lg:hidden"
            >
              <div className="h-full bg-gradient-to-b from-slate-900 to-slate-800 dark:from-white dark:to-gray-100 shadow-2xl overflow-y-auto">
                {/* Mobile Header */}
                <div className="p-6 border-b border-slate-700 dark:border-gray-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      {/* Mobile Logo */}
                      <div className="flex items-center">
                        <div className="relative">
                          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-b-[6px] border-l-transparent border-r-transparent border-b-[#E1A95F]"></div>
                          <div className="text-[#E1A95F] text-3xl font-bold ml-0.5">
                            A
                          </div>
                          <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-1.5 h-0.5 bg-[#E1A95F] rounded-sm"></div>
                        </div>
                        <span className="text-white dark:text-gray-900 text-3xl font-bold tracking-tight ml-1">
                          ደስ
                        </span>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setMenuOpen(false)}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 dark:bg-gray-800/50 dark:hover:bg-gray-800 transition-all duration-300"
                    >
                      <FaTimes className="text-[#E1A95F] text-xl" />
                    </motion.button>
                  </div>

                  {/* User Info Mobile */}
                  {user && (
                    <div className="flex items-center gap-3 mb-6 p-4 rounded-xl bg-gradient-to-r from-[#E1A95F]/10 to-[#d4a259]/10 border border-[#E1A95F]/20">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#E1A95F] to-[#d4a259] flex items-center justify-center text-white font-bold text-lg">
                        {user.name?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="font-bold text-white dark:text-gray-900 truncate">
                          {user.name || "User"}
                        </div>
                        <div className="text-sm text-slate-400 dark:text-gray-600 truncate">
                          {user.email}
                        </div>
                        <div className="text-xs text-[#E1A95F] font-semibold mt-1">
                          {user.role === "admin" ? "Administrator" : "User"}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Mobile Links */}
                <div className="p-6 space-y-2">
                  {mainPageLinks.map((link, index) => (
                    <button
                      key={index}
                      onClick={() => handleNavigation(link)}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 w-full text-left ${
                        (location.pathname === link.path && !link.hash) ||
                        (location.hash === link.hash &&
                          location.pathname === "/")
                          ? "bg-gradient-to-r from-[#E1A95F]/20 to-[#d4a259]/20 text-[#E1A95F] dark:text-white"
                          : "text-[#8B4513] dark:text-[#E1A95F] hover:bg-slate-800 dark:hover:bg-gray-200"
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          (location.pathname === link.path && !link.hash) ||
                          (location.hash === link.hash &&
                            location.pathname === "/")
                            ? "bg-[#E1A95F]"
                            : "bg-slate-600 dark:bg-gray-400"
                        }`}
                      ></div>
                      <span className="font-medium truncate">{link.name}</span>
                    </button>
                  ))}

                  {/* Shop Section Mobile */}
                  <div className="space-y-2">
                    <button
                      onClick={() => toggleDropdown("shop-mobile")}
                      className="flex items-center justify-between w-full px-4 py-3.5 rounded-xl text-[#8B4513] dark:text-white hover:bg-slate-800 dark:hover:bg-gray-200 transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-600 dark:bg-gray-400 flex-shrink-0"></div>
                        <span className="font-medium truncate">Shop</span>
                      </div>
                      <FaChevronDown
                        className={`transition flex-shrink-0 ${
                          openDropdown === "shop-mobile" ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {openDropdown === "shop-mobile" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="ml-4 pl-4 border-l border-slate-700 dark:border-gray-300 space-y-2"
                        >
                          {categories.map((cat, i) => (
                            <button
                              key={i}
                              onClick={() => {
                                navigate(`/category/${cat.name.toLowerCase()}`);
                                setMenuOpen(false);
                              }}
                              className="flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-slate-400 dark:text-gray-600 hover:text-[#E1A95F] hover:bg-slate-800/50 dark:hover:bg-gray-200 transition-all duration-300 text-left"
                            >
                              <div className="w-1 h-1 bg-slate-600 dark:bg-gray-400 rounded-full flex-shrink-0"></div>
                              <span className="truncate">{cat.name}</span>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* My Profile in Mobile Menu - Only for non-admin users */}
                  {user && user.role !== "admin" && (
                    <button
                      onClick={() => {
                        setShowProfileModal(true);
                        setMenuOpen(false);
                      }}
                      className="flex items-center gap-3 w-full px-4 py-3.5 rounded-xl text-[#8B4513] dark:text-white hover:bg-slate-800 dark:hover:bg-gray-200 transition-all duration-300"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-600 dark:bg-gray-400 flex-shrink-0"></div>
                      <span className="font-medium truncate">My Profile</span>
                    </button>
                  )}

                  {/* Theme Toggle Mobile */}
                  <div className="mt-6 pt-6 border-t border-slate-700 dark:border-gray-300">
                    <div className="flex items-center justify-between px-4">
                      <span className="text-[#8B4513] dark:text-white font-medium truncate">
                        Theme
                      </span>
                      <ThemeToggle />
                    </div>
                  </div>
                </div>

                {/* Mobile Footer */}
                <div className="p-6 border-t border-slate-700 dark:border-gray-300 mt-auto">
                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        navigate("/notifications");
                        setMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl bg-slate-800/50 dark:bg-gray-200 hover:bg-slate-800 dark:hover:bg-gray-300 text-slate-300 dark:text-gray-700 hover:text-white dark:hover:text-gray-900 transition-all duration-300 relative"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <FaBell className="text-[#E1A95F]" />
                          {unreadCount > 0 && (
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-600 rounded-full border border-white animate-pulse"></div>
                          )}
                        </div>
                        <span className="truncate">Notifications</span>
                      </div>
                      {unreadCount > 0 && (
                        <span className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1 border-2 border-white/20">
                          {unreadCount > 9 ? "9+" : unreadCount}
                        </span>
                      )}
                    </button>

                    {user && user.role === "admin" && (
                      <button
                        onClick={() => {
                          navigate("/admin");
                          setMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl bg-gradient-to-r from-green-600/10 to-emerald-600/10 border border-green-500/20 text-green-400 hover:text-green-300 transition-all duration-300"
                      >
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div>
                        <span className="truncate">Admin Panel</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Profile Modal */}
      <AnimatePresence>
        {showProfileModal && user && user.role !== "admin" && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100]"
            />

            {/* Modal */}
            <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
              <motion.div
                ref={profileModalRef}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25 }}
                className="w-full max-w-2xl bg-gradient-to-b from-slate-900 to-slate-800 dark:from-white dark:to-gray-100 rounded-2xl shadow-2xl border border-slate-700 dark:border-gray-300 overflow-hidden max-h-[90vh] overflow-y-auto"
              >
                {/* Modal Header */}
                <div className="p-6 border-b border-slate-700 dark:border-gray-300 bg-gradient-to-r from-[#E1A95F]/10 to-[#d4a259]/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FaUserCircle className="text-3xl text-[#E1A95F]" />
                      <div>
                        <h2 className="text-2xl font-bold text-white dark:text-gray-900">
                          My Profile
                        </h2>
                        <p className="text-slate-400 dark:text-gray-600">
                          Manage your account settings
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowProfileModal(false)}
                      className="p-2 hover:bg-slate-800 dark:hover:bg-gray-200 rounded-xl transition-colors"
                    >
                      <FaTimes className="text-slate-400 dark:text-gray-600 text-xl" />
                    </button>
                  </div>
                </div>

                {/* Modal Body */}
                <div className="p-6">
                  {/* Messages */}
                  {profileSuccess && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-xl"
                    >
                      <p className="text-green-400 text-center">
                        {profileSuccess}
                      </p>
                    </motion.div>
                  )}

                  {profileError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 p-4 bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/20 rounded-xl"
                    >
                      <p className="text-red-400 text-center">{profileError}</p>
                    </motion.div>
                  )}

                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Left Column - User Info */}
                    <div className="md:col-span-1">
                      <div className="bg-slate-800/50 dark:bg-gray-200 rounded-xl p-6 border border-slate-700 dark:border-gray-300">
                        <div className="flex flex-col items-center">
                          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#E1A95F] to-[#d4a259] flex items-center justify-center mb-4">
                            <span className="text-white text-3xl font-bold">
                              {user.name?.charAt(0)?.toUpperCase() || "U"}
                            </span>
                          </div>

                          <h3 className="text-xl font-bold text-white dark:text-gray-900 mb-1 truncate w-full text-center">
                            {user.name || "User"}
                          </h3>
                          <p className="text-slate-400 dark:text-gray-600 mb-4 truncate w-full text-center">
                            {user.email}
                          </p>

                          <div className="w-full bg-slate-700/50 dark:bg-gray-300 rounded-lg p-3 mt-4">
                            <h4 className="text-white dark:text-gray-900 font-semibold mb-2">
                              Account Status
                            </h4>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-slate-400 dark:text-gray-700">
                                Verified
                              </span>
                              <div className="flex items-center gap-2">
                                {user.isVerified ? (
                                  <>
                                    <FaCheckCircle className="text-green-400 text-sm flex-shrink-0" />
                                    <span className="text-xs font-semibold text-green-400 truncate">
                                      Verified
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <FaTimesCircle className="text-yellow-400 text-sm flex-shrink-0" />
                                    <span className="text-xs font-semibold text-yellow-400 truncate">
                                      Not Verified
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-slate-400 dark:text-gray-700">
                                Active
                              </span>
                              <div className="flex items-center gap-2">
                                {!user.isBlocked ? (
                                  <>
                                    <FaCheckCircle className="text-green-400 text-sm flex-shrink-0" />
                                    <span className="text-xs font-semibold text-green-400 truncate">
                                      Active
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <FaTimesCircle className="text-red-400 text-sm flex-shrink-0" />
                                    <span className="text-xs font-semibold text-red-400 truncate">
                                      Blocked
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>

                          <p className="text-xs text-slate-500 dark:text-gray-500 mt-4 text-center">
                            Member since{" "}
                            {new Date(user.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Form */}
                    <div className="md:col-span-2">
                      <form
                        onSubmit={handleProfileSubmit}
                        className="space-y-6"
                      >
                        {/* Basic Info */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-white dark:text-gray-900 flex items-center gap-2">
                            <FaUser className="text-[#E1A95F]" />
                            Basic Information
                          </h3>

                          <div>
                            <label className="block text-slate-300 dark:text-gray-700 mb-2">
                              Full Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={profileForm.name}
                              onChange={handleProfileChange}
                              className="w-full px-4 py-3 bg-slate-800/50 dark:bg-gray-100 border border-slate-700 dark:border-gray-300 rounded-xl text-white dark:text-gray-900 placeholder-slate-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E1A95F]/50 focus:border-[#E1A95F]/50 transition-all duration-300"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-slate-300 dark:text-gray-700 mb-2">
                              Email Address
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={profileForm.email}
                              onChange={handleProfileChange}
                              className="w-full px-4 py-3 bg-slate-800/50 dark:bg-gray-100 border border-slate-700 dark:border-gray-300 rounded-xl text-white dark:text-gray-900 placeholder-slate-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E1A95F]/50 focus:border-[#E1A95F]/50 transition-all duration-300"
                              required
                            />
                          </div>

                          <div>
                            <label className="block text-slate-300 dark:text-gray-700 mb-2">
                              Bio
                            </label>
                            <textarea
                              name="bio"
                              value={profileForm.bio}
                              onChange={handleProfileChange}
                              rows="2"
                              className="w-full px-4 py-3 bg-slate-800/50 dark:bg-gray-100 border border-slate-700 dark:border-gray-300 rounded-xl text-white dark:text-gray-900 placeholder-slate-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E1A95F]/50 focus:border-[#E1A95F]/50 transition-all duration-300"
                              placeholder="Tell us about yourself..."
                            />
                          </div>
                        </div>

                        {/* Password Change */}
                        <div className="space-y-4 pt-6 border-t border-slate-700 dark:border-gray-300">
                          <h3 className="text-lg font-semibold text-white dark:text-gray-900 flex items-center gap-2">
                            <FaKey className="text-[#E1A95F]" />
                            Change Password
                          </h3>

                          <div>
                            <label className="block text-slate-300 dark:text-gray-700 mb-2">
                              Current Password
                            </label>
                            <input
                              type="password"
                              name="currentPassword"
                              value={profileForm.currentPassword}
                              onChange={handleProfileChange}
                              className="w-full px-4 py-3 bg-slate-800/50 dark:bg-gray-100 border border-slate-700 dark:border-gray-300 rounded-xl text-white dark:text-gray-900 placeholder-slate-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E1A95F]/50 focus:border-[#E1A95F]/50 transition-all duration-300"
                              placeholder="Required to change password"
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-slate-300 dark:text-gray-700 mb-2">
                                New Password
                              </label>
                              <input
                                type="password"
                                name="newPassword"
                                value={profileForm.newPassword}
                                onChange={handleProfileChange}
                                className="w-full px-4 py-3 bg-slate-800/50 dark:bg-gray-100 border border-slate-700 dark:border-gray-300 rounded-xl text-white dark:text-gray-900 placeholder-slate-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E1A95F]/50 focus:border-[#E1A95F]/50 transition-all duration-300"
                                placeholder="At least 6 characters"
                              />
                            </div>

                            <div>
                              <label className="block text-slate-300 dark:text-gray-700 mb-2">
                                Confirm Password
                              </label>
                              <input
                                type="password"
                                name="confirmPassword"
                                value={profileForm.confirmPassword}
                                onChange={handleProfileChange}
                                className="w-full px-4 py-3 bg-slate-800/50 dark:bg-gray-100 border border-slate-700 dark:border-gray-300 rounded-xl text-white dark:text-gray-900 placeholder-slate-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E1A95F]/50 focus:border-[#E1A95F]/50 transition-all duration-300"
                                placeholder="Confirm new password"
                              />
                            </div>
                          </div>

                          <div className="text-xs text-slate-400 dark:text-gray-600 mt-2">
                            <FaTimesCircle className="inline mr-1" />
                            Leave password fields empty if you don't want to
                            change password
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-700 dark:border-gray-300">
                          <button
                            type="submit"
                            disabled={profileLoading}
                            className="flex-1 py-3 bg-gradient-to-r from-[#E1A95F] to-[#d4a259] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-[#E1A95F]/25 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                          >
                            {profileLoading ? (
                              <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin flex-shrink-0"></div>
                                <span className="truncate">Saving...</span>
                              </>
                            ) : (
                              <>
                                <FaSave className="flex-shrink-0" />
                                <span className="truncate">Save Changes</span>
                              </>
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => setShowDeleteConfirm(true)}
                            className="py-3 px-6 bg-gradient-to-r from-red-600/10 to-pink-600/10 border border-red-500/20 text-red-400 hover:text-red-300 hover:from-red-600/20 hover:to-pink-600/20 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                          >
                            <FaTrash className="flex-shrink-0" />
                            <span className="truncate">Delete Account</span>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[102]"
            />

            {/* Modal */}
            <div className="fixed inset-0 z-[103] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", damping: 25 }}
                className="w-full max-w-md bg-gradient-to-b from-slate-900 to-slate-800 dark:from-white dark:to-gray-100 rounded-2xl shadow-2xl border border-slate-700 dark:border-gray-300 p-6"
              >
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-600/20 to-pink-600/20 flex items-center justify-center">
                    <FaTrash className="text-red-500 text-2xl" />
                  </div>

                  <h3 className="text-2xl font-bold text-white dark:text-gray-900 mb-2 truncate">
                    Delete Account
                  </h3>
                  <p className="text-slate-400 dark:text-gray-600 mb-6">
                    This action cannot be undone. All your data will be
                    permanently removed from our database.
                  </p>

                  <div className="mb-6">
                    <label className="block text-slate-300 dark:text-gray-700 mb-2 text-left">
                      Enter your password to confirm:
                    </label>
                    <input
                      type="password"
                      value={deletePassword}
                      onChange={(e) => setDeletePassword(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-800/50 dark:bg-gray-100 border border-slate-700 dark:border-gray-300 rounded-xl text-white dark:text-gray-900 placeholder-slate-500 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300"
                      placeholder="Your password"
                    />
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      className="flex-1 py-3 bg-slate-700 dark:bg-gray-300 text-white dark:text-gray-900 rounded-xl font-semibold hover:bg-slate-600 dark:hover:bg-gray-400 transition-all duration-300 truncate"
                    >
                      Cancel
                    </button>

                    <button
                      onClick={handleDeleteAccount}
                      disabled={profileLoading}
                      className="flex-1 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300 disabled:opacity-50 truncate"
                    >
                      {profileLoading ? "Deleting..." : "Delete Account"}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
