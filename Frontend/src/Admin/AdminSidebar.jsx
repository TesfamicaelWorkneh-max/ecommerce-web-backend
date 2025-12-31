// // import React, { useState, useEffect } from "react";
// // import { Link, useLocation } from "react-router-dom";
// // import {
// //   FaTachometerAlt,
// //   FaUsers,
// //   FaBox,
// //   FaPlus,
// //   FaShoppingCart,
// //   FaBell,
// //   FaBars,
// //   FaUndo,
// //   FaPenAlt,
// //   FaNewspaper,
// //   FaChartBar,
// //   FaTimes,
// //   FaUser,
// //   FaEnvelope,
// //   FaKey,
// //   FaSave,
// //   FaTrash,
// //   FaUserCircle,
// // } from "react-icons/fa";
// // import { fetchWithAuth } from "../utils/auth";
// // import toast from "react-hot-toast";

// // const BACKEND_URL = import.meta.env.VITE_API_URL;

// // const AdminSidebar = ({
// //   collapsed,
// //   setCollapsed,
// //   mobileOpen,
// //   setMobileOpen,
// // }) => {
// //   const location = useLocation();
// //   const [pendingReturns, setPendingReturns] = useState(0);
// //   const [pendingComments, setPendingComments] = useState(0);
// //   const [draftPosts, setDraftPosts] = useState(0);
// //   const [isLoading, setIsLoading] = useState(true);

// //   const menu = [
// //     { name: "Dashboard", path: "/admin/dashboard", icon: <FaTachometerAlt /> },
// //     { name: "Users", path: "/admin/users", icon: <FaUsers /> },
// //     { name: "Products", path: "/admin/products", icon: <FaBox /> },
// //     { name: "Add Product", path: "/admin/products/add", icon: <FaPlus /> },
// //     { name: "Orders", path: "/admin/orders", icon: <FaShoppingCart /> },
// //     { name: "Notifications", path: "/admin/notifications", icon: <FaBell /> },
// //     { name: "Categories", path: "/admin/categories", icon: <FaBox /> },
// //     { name: "Add Category", path: "/admin/categories/add", icon: <FaPlus /> },
// //     {
// //       name: "Return Requests",
// //       path: "/admin/return-requests",
// //       icon: <FaUndo />,
// //     },
// //     {
// //       name: "Blog Posts",
// //       path: "/admin/blog",
// //       icon: <FaNewspaper />,
// //     },
// //     {
// //       name: "Add Blog Post",
// //       path: "/admin/blog/create",
// //       icon: <FaPenAlt />,
// //     },
// //     {
// //       name: "Blog Analytics",
// //       path: "/admin/blog/analytics",
// //       icon: <FaChartBar />,
// //     },
// //   ];

// //   const fetchStats = async () => {
// //     try {
// //       setIsLoading(true);

// //       try {
// //         const returnsRes = await fetchWithAuth(
// //           `${BACKEND_URL}/api/return-requests/admin/stats`
// //         );
// //         if (returnsRes.ok) {
// //           const returnsData = await returnsRes.json();
// //           if (returnsData.success) {
// //             let pendingCount = 0;
// //             if (returnsData.data && returnsData.data.statusStats) {
// //               returnsData.data.statusStats.forEach((stat) => {
// //                 if (
// //                   stat.status === "pending" ||
// //                   stat.status === "under_review"
// //                 ) {
// //                   pendingCount += stat.count || 0;
// //                 }
// //               });
// //             }
// //             setPendingReturns(pendingCount);
// //           }
// //         }
// //       } catch (error) {
// //         console.warn("Failed to fetch return stats:", error.message);
// //       }

// //       try {
// //         const blogRes = await fetchWithAuth(
// //           `${BACKEND_URL}/api/blog/stats/all`
// //         );
// //         if (blogRes.ok) {
// //           const blogData = await blogRes.json();
// //           if (blogData.success) {
// //             setDraftPosts(blogData.data.draftPosts || 0);
// //           }
// //         }
// //       } catch (error) {
// //         console.warn("Failed to fetch blog stats:", error.message);
// //       }
// //     } catch (error) {
// //       console.error("Failed to fetch stats:", error);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchStats();
// //     const interval = setInterval(fetchStats, 60000);
// //     return () => clearInterval(interval);
// //   }, []);

// //   const refreshStats = () => {
// //     toast.promise(fetchStats(), {
// //       loading: "Refreshing stats...",
// //       success: "Stats updated successfully",
// //       error: "Failed to refresh stats",
// //     });
// //   };

// //   const handleLogout = () => {
// //     localStorage.removeItem("user");
// //     localStorage.removeItem("token");
// //     sessionStorage.clear();
// //     window.location.href = "/login";
// //   };

// //   const isActive = (path) => {
// //     if (path === "/admin/dashboard") {
// //       return location.pathname === path;
// //     }
// //     return location.pathname.startsWith(path);
// //   };

// //   return (
// //     <div
// //       className={`bg-gradient-to-b from-slate-900 to-slate-800 fixed top-0 left-0 h-full z-50 px-4
// //         transition-all duration-300 shadow-xl
// //         ${collapsed ? "w-20" : "w-64"}
// //         max-md:fixed max-md:top-0 max-md:left-0
// //         ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
// //       `}
// //     >
// //       <div className="flex flex-col h-full">
// //         {/* Logo / Collapse */}
// //         <div
// //           className={`flex items-center justify-between border-b border-slate-700/50 p-4
// //             ${collapsed ? "flex-col gap-2 text-center" : "flex-row"}
// //             flex-shrink-0
// //           `}
// //         >
// //           <div
// //             className={`flex items-center gap-3 ${collapsed ? "flex-col" : ""}`}
// //           >
// //             <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
// //               <span className="text-white font-bold text-lg">A</span>
// //             </div>
// //             {!collapsed && (
// //               <div>
// //                 <h1 className="text-green-400 font-bold text-xl">
// //                   Admin Panel
// //                 </h1>
// //                 <p className="text-slate-400 text-xs">E-commerce Dashboard</p>
// //               </div>
// //             )}
// //           </div>

// //           <button
// //             className="md:block hidden mt-2 p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
// //             onClick={() => setCollapsed(!collapsed)}
// //             aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
// //           >
// //             <FaBars />
// //           </button>

// //           <button
// //             className="md:hidden mt-2 p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
// //             onClick={() => setMobileOpen(false)}
// //             aria-label="Close sidebar"
// //           >
// //             ✕
// //           </button>
// //         </div>

// //         {/* Refresh button */}
// //         {!collapsed && (
// //           <div className="px-4 pt-4 flex-shrink-0">
// //             <button
// //               onClick={refreshStats}
// //               disabled={isLoading}
// //               className="w-full py-2 px-4 bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
// //             >
// //               {isLoading ? (
// //                 <>
// //                   <div className="w-4 h-4 border-2 border-slate-300/30 border-t-white rounded-full animate-spin"></div>
// //                   <span>Loading...</span>
// //                 </>
// //               ) : (
// //                 <>
// //                   <svg
// //                     className="w-4 h-4"
// //                     fill="none"
// //                     stroke="currentColor"
// //                     viewBox="0 0 24 24"
// //                     xmlns="http://www.w3.org/2000/svg"
// //                   >
// //                     <path
// //                       strokeLinecap="round"
// //                       strokeLinejoin="round"
// //                       strokeWidth={2}
// //                       d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
// //                     />
// //                   </svg>
// //                   <span>Refresh Stats</span>
// //                 </>
// //               )}
// //             </button>
// //           </div>
// //         )}

// //         {/* Scrollable Menu */}
// //         <nav className="mt-4 px-2 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
// //           {menu.map((item) => {
// //             const active = isActive(item.path);
// //             const isReturnRequests = item.path === "/admin/return-requests";
// //             const isBlogPosts = item.path === "/admin/blog";
// //             const isAddBlogPost = item.path === "/admin/blog/create";

// //             return (
// //               <Link
// //                 key={item.path}
// //                 to={item.path}
// //                 className={`flex items-center gap-4 py-3 px-4 mb-2 rounded-xl relative group
// //                   transition-all duration-200
// //                   ${
// //                     active
// //                       ? "bg-gradient-to-r from-green-600/20 to-emerald-600/20 text-green-400 border-l-4 border-green-500"
// //                       : "text-slate-300 hover:bg-slate-700/50 hover:text-white hover:border-l-4 hover:border-slate-500"
// //                   }
// //                 `}
// //                 onClick={() => setMobileOpen(false)}
// //               >
// //                 <div
// //                   className={`${active ? "text-green-400" : "text-slate-400 group-hover:text-white"}`}
// //                 >
// //                   {item.icon}
// //                 </div>

// //                 {!collapsed && (
// //                   <div className="flex items-center justify-between w-full overflow-hidden">
// //                     <span className="font-medium truncate">{item.name}</span>

// //                     {isReturnRequests && pendingReturns > 0 && (
// //                       <div className="flex items-center">
// //                         <span className="bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center px-1.5 animate-pulse shadow-lg">
// //                           {pendingReturns}
// //                         </span>
// //                       </div>
// //                     )}

// //                     {isBlogPosts && draftPosts > 0 && (
// //                       <div className="flex items-center">
// //                         <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center px-1.5 shadow-lg">
// //                           {draftPosts}
// //                         </span>
// //                       </div>
// //                     )}

// //                     {isAddBlogPost && (
// //                       <div className="flex items-center">
// //                         <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center px-1.5 shadow-lg">
// //                           +
// //                         </span>
// //                       </div>
// //                     )}

// //                     {isReturnRequests && pendingReturns === 0 && !isLoading && (
// //                       <span className="text-slate-500 text-xs">0</span>
// //                     )}
// //                   </div>
// //                 )}

// //                 {collapsed && (
// //                   <>
// //                     {isReturnRequests && pendingReturns > 0 && (
// //                       <span className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse shadow-lg">
// //                         {pendingReturns > 9 ? "9+" : pendingReturns}
// //                       </span>
// //                     )}
// //                     {isBlogPosts && draftPosts > 0 && (
// //                       <span className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
// //                         {draftPosts > 9 ? "9+" : draftPosts}
// //                       </span>
// //                     )}
// //                     {isAddBlogPost && (
// //                       <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
// //                         +
// //                       </span>
// //                     )}
// //                   </>
// //                 )}

// //                 {collapsed && (
// //                   <div className="absolute left-full ml-2 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 shadow-xl">
// //                     {item.name}
// //                     {isReturnRequests && pendingReturns > 0 && (
// //                       <div className="mt-1 text-rose-300 font-semibold">
// //                         {pendingReturns} pending
// //                       </div>
// //                     )}
// //                     {isBlogPosts && draftPosts > 0 && (
// //                       <div className="mt-1 text-yellow-300 font-semibold">
// //                         {draftPosts} drafts
// //                       </div>
// //                     )}
// //                   </div>
// //                 )}
// //               </Link>
// //             );
// //           })}
// //         </nav>

// //         {/* User info & Logout */}
// //         <div className="border-t border-slate-700/50 p-4 flex-shrink-0">
// //           <div
// //             className={`flex items-center gap-3 mb-4 ${collapsed ? "justify-center" : ""}`}
// //           >
// //             <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
// //               <span className="text-white font-bold">AD</span>
// //             </div>

// //             {!collapsed && (
// //               <div className="flex-1 overflow-hidden">
// //                 <p className="text-white font-medium truncate">Administrator</p>
// //                 <p className="text-slate-400 text-xs truncate">
// //                   admin@example.com
// //                 </p>
// //               </div>
// //             )}
// //           </div>

// //           <button
// //             className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-lg
// //               bg-gradient-to-r from-rose-600/20 to-pink-600/20
// //               text-rose-400 hover:text-white hover:from-rose-600/40 hover:to-pink-600/40
// //               border border-rose-700/30 hover:border-rose-500/50
// //               transition-all duration-200
// //               ${collapsed ? "px-2" : "px-4"}
// //             `}
// //             onClick={handleLogout}
// //             aria-label="Logout"
// //           >
// //             {!collapsed && "Logout"}
// //             <svg
// //               className="w-5 h-5"
// //               fill="none"
// //               stroke="currentColor"
// //               viewBox="0 0 24 24"
// //               xmlns="http://www.w3.org/2000/svg"
// //             >
// //               <path
// //                 strokeLinecap="round"
// //                 strokeLinejoin="round"
// //                 strokeWidth={2}
// //                 d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
// //               />
// //             </svg>
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminSidebar;
// import React, { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//   FaTachometerAlt,
//   FaUsers,
//   FaBox,
//   FaPlus,
//   FaShoppingCart,
//   FaBell,
//   FaBars,
//   FaUndo,
//   FaPenAlt,
//   FaNewspaper,
//   FaChartBar,
//   FaTimes,
//   FaImage,
// } from "react-icons/fa";
// import { fetchWithAuth } from "../utils/auth";
// import toast from "react-hot-toast";

// const BACKEND_URL = import.meta.env.VITE_API_URL;
// const user = JSON.parse(localStorage.getItem("user"));

// const AdminSidebar = ({
//   collapsed,
//   setCollapsed,
//   mobileOpen,
//   setMobileOpen,
// }) => {
//   const location = useLocation();
//   const [pendingReturns, setPendingReturns] = useState(0);
//   const [draftPosts, setDraftPosts] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);

//   // ✅ Modal state
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [file, setFile] = useState(null);
//   const [uploading, setUploading] = useState(false);

//   const menu = [
//     { name: "Dashboard", path: "/admin/dashboard", icon: <FaTachometerAlt /> },
//     { name: "Users", path: "/admin/users", icon: <FaUsers /> },
//     { name: "Products", path: "/admin/products", icon: <FaBox /> },
//     { name: "Add Product", path: "/admin/products/add", icon: <FaPlus /> },
//     { name: "Orders", path: "/admin/orders", icon: <FaShoppingCart /> },
//     { name: "Notifications", path: "/admin/notifications", icon: <FaBell /> },
//     { name: "Categories", path: "/admin/categories", icon: <FaBox /> },
//     { name: "Add Category", path: "/admin/categories/add", icon: <FaPlus /> },
//     {
//       name: "Return Requests",
//       path: "/admin/return-requests",
//       icon: <FaUndo />,
//     },
//     { name: "Blog Posts", path: "/admin/blog", icon: <FaNewspaper /> },
//     { name: "Add Blog Post", path: "/admin/blog/create", icon: <FaPenAlt /> },
//     {
//       name: "Blog Analytics",
//       path: "/admin/blog/analytics",
//       icon: <FaChartBar />,
//     },

//     // ✅ New Sidebar link for modal
//     { name: "Upload Hero Image", path: "#", icon: <FaImage /> },
//   ];

//   const fetchStats = async () => {
//     try {
//       setIsLoading(true);

//       try {
//         const returnsRes = await fetchWithAuth(
//           `${BACKEND_URL}/api/return-requests/admin/stats`
//         );
//         if (returnsRes.ok) {
//           const returnsData = await returnsRes.json();
//           if (returnsData.success) {
//             let pendingCount = 0;
//             if (returnsData.data && returnsData.data.statusStats) {
//               returnsData.data.statusStats.forEach((stat) => {
//                 if (
//                   stat.status === "pending" ||
//                   stat.status === "under_review"
//                 ) {
//                   pendingCount += stat.count || 0;
//                 }
//               });
//             }
//             setPendingReturns(pendingCount);
//           }
//         }
//       } catch (error) {
//         // console.warn("Failed to fetch return stats:", error.message);
//         console.error("Upload failed:", err.message);
//         setUploading(false);
//       }

//       try {
//         const blogRes = await fetchWithAuth(
//           `${BACKEND_URL}/api/blog/stats/all`
//         );
//         if (blogRes.ok) {
//           const blogData = await blogRes.json();
//           if (blogData.success) {
//             setDraftPosts(blogData.data.draftPosts || 0);
//           }
//         }
//       } catch (error) {
//         console.warn("Failed to fetch blog stats:", error.message);
//       }
//     } catch (error) {
//       console.error("Failed to fetch stats:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStats();
//     const interval = setInterval(fetchStats, 60000);
//     return () => clearInterval(interval);
//   }, []);

//   const refreshStats = () => {
//     toast.promise(fetchStats(), {
//       loading: "Refreshing stats...",
//       success: "Stats updated successfully",
//       error: "Failed to refresh stats",
//     });
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     sessionStorage.clear();
//     window.location.href = "/login";
//   };

//   const isActive = (path) => {
//     if (path === "/admin/dashboard") return location.pathname === path;
//     return location.pathname.startsWith(path);
//   };

//   // ✅ Modal upload handlers
//   const handleFileChange = (e) => setFile(e.target.files[0]);

//   const handleUpload = async () => {
//     if (!file) return toast.error("Select an image first!");
//     setUploading(true);
//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       const res = await fetchWithAuth(`${BACKEND_URL}/api/admin/uploadHero`, {
//         method: "POST",
//         body: formData,
//       });
//       const data = await res.json();
//       if (data.success) {
//         toast.success("Image uploaded successfully!");
//         setIsModalOpen(false);
//         setFile(null);
//       } else {
//         toast.error(data.message || "Upload failed");
//       }
//     } catch (err) {
//       toast.error(err.message || "Upload failed");
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div
//       className={`bg-gradient-to-b from-slate-900 to-slate-800 fixed top-0 left-0 h-full z-50 px-4
//         transition-all duration-300 shadow-xl
//         ${collapsed ? "w-20" : "w-64"}
//         max-md:fixed max-md:top-0 max-md:left-0
//         ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
//       `}
//     >
//       <div className="flex flex-col h-full">
//         {/* Logo / Collapse */}
//         <div
//           className={`flex items-center justify-between border-b border-slate-700/50 p-4
//             ${collapsed ? "flex-col gap-2 text-center" : "flex-row"} flex-shrink-0`}
//         >
//           <div
//             className={`flex items-center gap-3 ${collapsed ? "flex-col" : ""}`}
//           >
//             <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
//               <span className="text-white font-bold text-lg">A</span>
//             </div>
//             {!collapsed && (
//               <div>
//                 <h1 className="text-green-400 font-bold text-xl">
//                   Admin Panel
//                 </h1>
//                 <p className="text-slate-400 text-xs">E-commerce Dashboard</p>
//               </div>
//             )}
//           </div>

//           <button
//             className="md:block hidden mt-2 p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
//             onClick={() => setCollapsed(!collapsed)}
//             aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
//           >
//             <FaBars />
//           </button>

//           <button
//             className="md:hidden mt-2 p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
//             onClick={() => setMobileOpen(false)}
//             aria-label="Close sidebar"
//           >
//             ✕
//           </button>
//         </div>

//         {/* Refresh button */}
//         {!collapsed && (
//           <div className="px-4 pt-4 flex-shrink-0">
//             <button
//               onClick={refreshStats}
//               disabled={isLoading}
//               className="w-full py-2 px-4 bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isLoading ? (
//                 <>
//                   <div className="w-4 h-4 border-2 border-slate-300/30 border-t-white rounded-full animate-spin"></div>
//                   <span>Loading...</span>
//                 </>
//               ) : (
//                 <>
//                   <svg
//                     className="w-4 h-4"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
//                     />
//                   </svg>
//                   <span>Refresh Stats</span>
//                 </>
//               )}
//             </button>
//           </div>
//         )}

//         {/* Scrollable Menu */}
//         <nav className="mt-4 px-2 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
//           {menu.map((item) => {
//             const active = isActive(item.path);

//             return (
//               <div key={item.path}>
//                 {item.name === "Upload Hero Image" ? (
//                   <button
//                     onClick={() => setIsModalOpen(true)}
//                     className={`flex items-center gap-4 py-3 px-4 mb-2 rounded-xl w-full text-left
//                       transition-all duration-200
//                       ${
//                         collapsed
//                           ? "text-slate-300 hover:text-white"
//                           : active
//                             ? "bg-gradient-to-r from-green-600/20 to-emerald-600/20 text-green-400 border-l-4 border-green-500"
//                             : "text-slate-300 hover:bg-slate-700/50 hover:text-white hover:border-l-4 hover:border-slate-500"
//                       }`}
//                   >
//                     <div
//                       className={`${active ? "text-green-400" : "text-slate-400 group-hover:text-white"}`}
//                     >
//                       {item.icon}
//                     </div>
//                     {!collapsed && (
//                       <span className="font-medium truncate">{item.name}</span>
//                     )}
//                   </button>
//                 ) : (
//                   <Link
//                     to={item.path}
//                     className={`flex items-center gap-4 py-3 px-4 mb-2 rounded-xl relative group
//                       transition-all duration-200
//                       ${
//                         active
//                           ? "bg-gradient-to-r from-green-600/20 to-emerald-600/20 text-green-400 border-l-4 border-green-500"
//                           : "text-slate-300 hover:bg-slate-700/50 hover:text-white hover:border-l-4 hover:border-slate-500"
//                       }`}
//                     onClick={() => setMobileOpen(false)}
//                   >
//                     <div
//                       className={`${active ? "text-green-400" : "text-slate-400 group-hover:text-white"}`}
//                     >
//                       {item.icon}
//                     </div>
//                     {!collapsed && (
//                       <span className="font-medium truncate">{item.name}</span>
//                     )}
//                   </Link>
//                 )}
//               </div>
//             );
//           })}
//         </nav>

//         {/* User info & Logout */}
//         <div className="border-t border-slate-700/50 p-4 flex-shrink-0">
//           <div
//             className={`flex items-center gap-3 mb-4 ${collapsed ? "justify-center" : ""}`}
//           >
//             <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
//               <span className="text-white font-bold">AD</span>
//             </div>

//             {!collapsed && (
//               <div className="flex-1 overflow-hidden">
//                 <p className="text-white font-medium truncate">Administrator</p>
//                 <p className="text-slate-400 text-xs truncate">{user?.email}</p>
//               </div>
//             )}
//           </div>

//           <button
//             className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-lg
//               bg-gradient-to-r from-rose-600/20 to-pink-600/20
//               text-rose-400 hover:text-white hover:from-rose-600/40 hover:to-pink-600/40
//               border border-rose-700/30 hover:border-rose-500/50
//               transition-all duration-200
//               ${collapsed ? "px-2" : "px-4"}
//             `}
//             onClick={handleLogout}
//             aria-label="Logout"
//           >
//             {!collapsed && "Logout"}
//             <svg
//               className="w-5 h-5"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
//               />
//             </svg>
//           </button>
//         </div>
//       </div>

//       {/* ✅ Upload Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//           <div className="bg-slate-900 p-6 rounded-lg w-96 relative">
//             <h2 className="text-white text-xl font-bold mb-4">
//               Upload Hero Image
//             </h2>
//             <input
//               type="file"
//               onChange={handleFileChange}
//               accept="image/*"
//               className="mb-4 w-full text-sm text-slate-300"
//             />
//             <div className="flex justify-end gap-2">
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleUpload}
//                 disabled={uploading}
//                 className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 disabled:opacity-50"
//               >
//                 {uploading ? "Uploading..." : "Upload"}
//               </button>
//             </div>
//             <button
//               onClick={() => setIsModalOpen(false)}
//               className="absolute top-2 right-2 text-slate-400 hover:text-white"
//             >
//               <FaTimes />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminSidebar;

// import React, { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FaTachometerAlt,
//   FaUsers,
//   FaBox,
//   FaPlus,
//   FaShoppingCart,
//   FaBell,
//   FaBars,
//   FaUndo,
//   FaPenAlt,
//   FaNewspaper,
//   FaChartBar,
//   FaTimes,
//   FaImage,
//   FaUpload,
//   FaUserCircle,
//   FaCog,
//   FaSignOutAlt,
// } from "react-icons/fa";
// import { fetchWithAuth } from "../utils/auth";
// import toast from "react-hot-toast";

// const BACKEND_URL = import.meta.env.VITE_API_URL;
// const user = JSON.parse(localStorage.getItem("user"));

// const AdminSidebar = ({
//   collapsed,
//   setCollapsed,
//   mobileOpen,
//   setMobileOpen,
// }) => {
//   const location = useLocation();
//   const [pendingReturns, setPendingReturns] = useState(0);
//   const [draftPosts, setDraftPosts] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [file, setFile] = useState(null);
//   const [uploading, setUploading] = useState(false);

//   const menu = [
//     { name: "Dashboard", path: "/admin/dashboard", icon: <FaTachometerAlt /> },
//     { name: "Users", path: "/admin/users", icon: <FaUsers /> },
//     { name: "Products", path: "/admin/products", icon: <FaBox /> },
//     { name: "Add Product", path: "/admin/products/add", icon: <FaPlus /> },
//     { name: "Orders", path: "/admin/orders", icon: <FaShoppingCart /> },
//     { name: "Notifications", path: "/admin/notifications", icon: <FaBell /> },
//     { name: "Categories", path: "/admin/categories", icon: <FaBox /> },
//     { name: "Add Category", path: "/admin/categories/add", icon: <FaPlus /> },
//     {
//       name: "Return Requests",
//       path: "/admin/return-requests",
//       icon: <FaUndo />,
//     },
//     { name: "Blog Posts", path: "/admin/blog", icon: <FaNewspaper /> },
//     { name: "Add Blog Post", path: "/admin/blog/create", icon: <FaPenAlt /> },
//     {
//       name: "Blog Analytics",
//       path: "/admin/blog/analytics",
//       icon: <FaChartBar />,
//     },
//     { name: "Upload Hero Image", path: "#", icon: <FaImage /> },
//   ];

//   const fetchStats = async () => {
//     try {
//       setIsLoading(true);

//       try {
//         const returnsRes = await fetchWithAuth(
//           `${BACKEND_URL}/api/return-requests/admin/stats`
//         );
//         if (returnsRes.ok) {
//           const returnsData = await returnsRes.json();
//           if (returnsData.success) {
//             let pendingCount = 0;
//             if (returnsData.data && returnsData.data.statusStats) {
//               returnsData.data.statusStats.forEach((stat) => {
//                 if (
//                   stat.status === "pending" ||
//                   stat.status === "under_review"
//                 ) {
//                   pendingCount += stat.count || 0;
//                 }
//               });
//             }
//             setPendingReturns(pendingCount);
//           }
//         }
//       } catch (error) {
//         console.warn("Failed to fetch return stats:", error.message);
//       }

//       try {
//         const blogRes = await fetchWithAuth(
//           `${BACKEND_URL}/api/blog/stats/all`
//         );
//         if (blogRes.ok) {
//           const blogData = await blogRes.json();
//           if (blogData.success) {
//             setDraftPosts(blogData.data.draftPosts || 0);
//           }
//         }
//       } catch (error) {
//         console.warn("Failed to fetch blog stats:", error.message);
//       }
//     } catch (error) {
//       console.error("Failed to fetch stats:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStats();
//     const interval = setInterval(fetchStats, 60000);
//     return () => clearInterval(interval);
//   }, []);

//   const refreshStats = () => {
//     toast.promise(fetchStats(), {
//       loading: "Refreshing stats...",
//       success: "Stats updated successfully",
//       error: "Failed to refresh stats",
//     });
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     sessionStorage.clear();
//     window.location.href = "/login";
//   };

//   const isActive = (path) => {
//     if (path === "/admin/dashboard") return location.pathname === path;
//     return location.pathname.startsWith(path);
//   };

//   const handleFileChange = (e) => setFile(e.target.files[0]);

//   const handleUpload = async () => {
//     if (!file) return toast.error("Select an image first!");
//     setUploading(true);
//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       const res = await fetchWithAuth(`${BACKEND_URL}/api/admin/uploadHero`, {
//         method: "POST",
//         body: formData,
//       });
//       const data = await res.json();
//       if (data.success) {
//         toast.success("Image uploaded successfully!");
//         setIsModalOpen(false);
//         setFile(null);
//       } else {
//         toast.error(data.message || "Upload failed");
//       }
//     } catch (err) {
//       toast.error(err.message || "Upload failed");
//     } finally {
//       setUploading(false);
//     }
//   };

//   // Close sidebar when clicking a link on mobile
//   const handleMobileLinkClick = () => {
//     if (window.innerWidth < 768) {
//       setMobileOpen(false);
//     }
//   };

//   return (
//     <>
//       {/* Mobile Overlay */}
//       {mobileOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
//           onClick={() => setMobileOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <motion.aside
//         initial={{ x: -300 }}
//         animate={{
//           x: mobileOpen ? 0 : window.innerWidth >= 768 ? 0 : -300,
//         }}
//         transition={{ type: "spring", damping: 25, stiffness: 200 }}
//         className={`fixed top-0 left-0 h-full z-50 transition-all duration-300 shadow-2xl
//           ${collapsed ? "w-20" : "w-64"}
//           bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800
//           border-r border-slate-200 dark:border-slate-800
//           ${mobileOpen ? "translate-x-0" : "md:translate-x-0"}`}
//         style={{
//           transform: mobileOpen
//             ? "translateX(0)"
//             : window.innerWidth >= 768
//               ? "translateX(0)"
//               : "translateX(-100%)",
//         }}
//       >
//         <div className="flex flex-col h-full">
//           {/* Logo / Collapse */}
//           <div
//             className={`flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800
//               ${collapsed ? "flex-col gap-2 text-center" : "flex-row"} flex-shrink-0`}
//           >
//             <div
//               className={`flex items-center gap-3 ${collapsed ? "flex-col" : ""}`}
//             >
//               <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
//                 <span className="text-white font-bold text-lg">A</span>
//               </div>
//               {!collapsed && (
//                 <div>
//                   <h1 className="text-green-600 dark:text-green-400 font-bold text-xl">
//                     Admin Panel
//                   </h1>
//                   <p className="text-slate-500 dark:text-slate-400 text-xs">
//                     E-commerce Dashboard
//                   </p>
//                 </div>
//               )}
//             </div>

//             <div className="flex items-center gap-2">
//               <button
//                 className="hidden md:block p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"
//                 onClick={() => setCollapsed(!collapsed)}
//                 aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
//               >
//                 <FaBars />
//               </button>

//               <button
//                 className="md:hidden p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"
//                 onClick={() => setMobileOpen(false)}
//                 aria-label="Close sidebar"
//               >
//                 <FaTimes />
//               </button>
//             </div>
//           </div>

//           {/* Refresh button */}
//           {!collapsed && (
//             <div className="px-4 pt-4 flex-shrink-0">
//               <button
//                 onClick={refreshStats}
//                 disabled={isLoading}
//                 className="w-full py-2 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isLoading ? (
//                   <>
//                     <div className="w-4 h-4 border-2 border-slate-400/30 border-t-slate-600 dark:border-t-white rounded-full animate-spin"></div>
//                     <span>Loading...</span>
//                   </>
//                 ) : (
//                   <>
//                     <svg
//                       className="w-4 h-4"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
//                       />
//                     </svg>
//                     <span>Refresh Stats</span>
//                   </>
//                 )}
//               </button>
//             </div>
//           )}

//           {/* Scrollable Menu */}
//           <nav className="mt-4 px-2 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700 scrollbar-track-transparent">
//             {menu.map((item, index) => {
//               const active = isActive(item.path);
//               const isReturnRequests = item.path === "/admin/return-requests";
//               const isBlogPosts = item.path === "/admin/blog";
//               const isAddBlogPost = item.path === "/admin/blog/create";

//               return (
//                 <div key={item.path}>
//                   {item.name === "Upload Hero Image" ? (
//                     <motion.button
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: index * 0.05 }}
//                       onClick={() => setIsModalOpen(true)}
//                       className={`flex items-center gap-4 py-3 px-4 mb-2 rounded-xl w-full text-left
//                         transition-all duration-200 group relative
//                         ${
//                           active
//                             ? "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 text-green-600 dark:text-green-400 border-l-4 border-green-500"
//                             : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white hover:border-l-4 hover:border-slate-300 dark:hover:border-slate-600"
//                         }`}
//                     >
//                       <div
//                         className={`${active ? "text-green-600 dark:text-green-400" : "text-slate-500 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300"}`}
//                       >
//                         {item.icon}
//                       </div>
//                       {!collapsed && (
//                         <>
//                           <span className="font-medium truncate">
//                             {item.name}
//                           </span>
//                           <div className="absolute right-3">
//                             <FaUpload className="text-slate-400 dark:text-slate-500 text-sm" />
//                           </div>
//                         </>
//                       )}
//                     </motion.button>
//                   ) : (
//                     <motion.div
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: index * 0.05 }}
//                     >
//                       <Link
//                         to={item.path}
//                         className={`flex items-center gap-4 py-3 px-4 mb-2 rounded-xl relative group
//                           transition-all duration-200
//                           ${
//                             active
//                               ? "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 text-green-600 dark:text-green-400 border-l-4 border-green-500"
//                               : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white hover:border-l-4 hover:border-slate-300 dark:hover:border-slate-600"
//                           }`}
//                         onClick={handleMobileLinkClick}
//                       >
//                         <div
//                           className={`${active ? "text-green-600 dark:text-green-400" : "text-slate-500 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300"}`}
//                         >
//                           {item.icon}
//                         </div>
//                         {!collapsed && (
//                           <div className="flex items-center justify-between w-full overflow-hidden">
//                             <span className="font-medium truncate">
//                               {item.name}
//                             </span>
//                             {isReturnRequests && pendingReturns > 0 && (
//                               <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center px-1.5 animate-pulse shadow-lg">
//                                 {pendingReturns}
//                               </span>
//                             )}
//                             {isBlogPosts && draftPosts > 0 && (
//                               <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center px-1.5 shadow-lg">
//                                 {draftPosts}
//                               </span>
//                             )}
//                             {isAddBlogPost && (
//                               <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center px-1.5 shadow-lg">
//                                 +
//                               </span>
//                             )}
//                           </div>
//                         )}
//                         {collapsed && (
//                           <>
//                             {isReturnRequests && pendingReturns > 0 && (
//                               <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse shadow-lg">
//                                 {pendingReturns > 9 ? "9+" : pendingReturns}
//                               </span>
//                             )}
//                             {isBlogPosts && draftPosts > 0 && (
//                               <span className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
//                                 {draftPosts > 9 ? "9+" : draftPosts}
//                               </span>
//                             )}
//                           </>
//                         )}
//                         {collapsed && (
//                           <div className="absolute left-full ml-2 px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 shadow-xl border border-slate-200 dark:border-slate-700">
//                             {item.name}
//                             {isReturnRequests && pendingReturns > 0 && (
//                               <div className="mt-1 text-red-600 dark:text-red-400 font-semibold">
//                                 {pendingReturns} pending
//                               </div>
//                             )}
//                             {isBlogPosts && draftPosts > 0 && (
//                               <div className="mt-1 text-yellow-600 dark:text-yellow-400 font-semibold">
//                                 {draftPosts} drafts
//                               </div>
//                             )}
//                           </div>
//                         )}
//                       </Link>
//                     </motion.div>
//                   )}
//                 </div>
//               );
//             })}
//           </nav>

//           {/* User info & Logout */}
//           <div className="border-t border-slate-200 dark:border-slate-800 p-4 flex-shrink-0">
//             <div
//               className={`flex items-center gap-3 mb-4 ${collapsed ? "justify-center" : ""}`}
//             >
//               <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
//                 {user?.avatar ? (
//                   <img
//                     src={user.avatar}
//                     alt={user.name}
//                     className="w-full h-full rounded-full object-cover"
//                   />
//                 ) : (
//                   <span className="text-white font-bold">AD</span>
//                 )}
//               </div>

//               {!collapsed && (
//                 <div className="flex-1 overflow-hidden">
//                   <p className="text-slate-900 dark:text-white font-medium truncate">
//                     {user?.name || "Administrator"}
//                   </p>
//                   <p className="text-slate-500 dark:text-slate-400 text-xs truncate">
//                     {user?.email || "admin@example.com"}
//                   </p>
//                 </div>
//               )}
//             </div>

//             <button
//               onClick={handleLogout}
//               className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-lg
//                 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20
//                 text-red-600 dark:text-red-400 hover:text-white hover:from-red-600 hover:to-pink-600
//                 border border-red-200 dark:border-red-800/30 hover:border-red-500
//                 transition-all duration-200
//                 ${collapsed ? "px-2" : "px-4"}
//               `}
//               aria-label="Logout"
//             >
//               {!collapsed && "Logout"}
//               <FaSignOutAlt />
//             </button>
//           </div>
//         </div>
//       </motion.aside>

//       {/* Upload Modal */}
//       <AnimatePresence>
//         {isModalOpen && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
//               onClick={() => setIsModalOpen(false)}
//             />
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0, y: 20 }}
//               animate={{ scale: 1, opacity: 1, y: 0 }}
//               exit={{ scale: 0.9, opacity: 0, y: 20 }}
//               className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
//             >
//               <div
//                 className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 w-full max-w-md pointer-events-auto max-h-[90vh] overflow-y-auto"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <div className="p-4 sm:p-6">
//                   <div className="flex items-center justify-between mb-4 sm:mb-6">
//                     <div className="flex items-center gap-3">
//                       <div className="p-2 rounded-lg bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20">
//                         <FaUpload className="text-green-600 dark:text-green-400" />
//                       </div>
//                       <h2 className="text-xl font-bold text-slate-900 dark:text-white">
//                         Upload Hero Image
//                       </h2>
//                     </div>
//                     <button
//                       onClick={() => setIsModalOpen(false)}
//                       className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
//                     >
//                       <FaTimes className="text-slate-500 dark:text-slate-400" />
//                     </button>
//                   </div>

//                   <div className="space-y-4 sm:space-y-6">
//                     <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-6 sm:p-8 text-center">
//                       {file ? (
//                         <div className="space-y-4">
//                           <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700">
//                             <img
//                               src={URL.createObjectURL(file)}
//                               alt="Preview"
//                               className="w-full h-full object-contain"
//                             />
//                           </div>
//                           <p className="text-sm text-slate-600 dark:text-slate-400 break-words">
//                             {file.name}
//                           </p>
//                           <p className="text-xs text-slate-500 dark:text-slate-500">
//                             {(file.size / 1024 / 1024).toFixed(2)} MB
//                           </p>
//                         </div>
//                       ) : (
//                         <div className="space-y-3">
//                           <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 flex items-center justify-center">
//                             <FaUpload className="w-8 h-8 text-green-600 dark:text-green-400" />
//                           </div>
//                           <div>
//                             <p className="text-slate-600 dark:text-slate-300 font-medium mb-1">
//                               Drop your image here
//                             </p>
//                             <p className="text-sm text-slate-500 dark:text-slate-400">
//                               or click to browse
//                             </p>
//                           </div>
//                           <p className="text-xs text-slate-400 dark:text-slate-500 pt-2 border-t border-slate-200 dark:border-slate-700">
//                             PNG, JPG, GIF up to 5MB
//                           </p>
//                         </div>
//                       )}
//                     </div>

//                     <div className="space-y-3">
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleFileChange}
//                         className="hidden"
//                         id="file-upload"
//                       />
//                       <label
//                         htmlFor="file-upload"
//                         className="block w-full px-4 py-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-800/20 dark:hover:to-emerald-800/20 border border-green-200 dark:border-green-800/30 rounded-lg text-center cursor-pointer transition-all duration-200 text-green-700 dark:text-green-400 font-medium"
//                       >
//                         Choose Image
//                       </label>

//                       <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
//                         <button
//                           onClick={() => setIsModalOpen(false)}
//                           className="flex-1 py-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg text-slate-700 dark:text-slate-300 font-medium transition-all duration-200"
//                         >
//                           Cancel
//                         </button>
//                         <button
//                           onClick={handleUpload}
//                           disabled={!file || uploading}
//                           className="flex-1 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-slate-400 disabled:to-slate-500 disabled:cursor-not-allowed rounded-lg text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-green-500/20"
//                         >
//                           {uploading ? (
//                             <span className="flex items-center justify-center gap-2">
//                               <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                               Uploading...
//                             </span>
//                           ) : (
//                             "Upload Image"
//                           )}
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default AdminSidebar;
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTachometerAlt,
  FaUsers,
  FaBox,
  FaPlus,
  FaShoppingCart,
  FaBell,
  FaBars,
  FaUndo,
  FaPenAlt,
  FaNewspaper,
  FaChartBar,
  FaTimes,
  FaImage,
  FaUpload,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaTrash,
  FaEye,
  FaChevronLeft,
  FaChevronRight,
  FaSpinner,
} from "react-icons/fa";
import { fetchWithAuth } from "../utils/auth";
import toast from "react-hot-toast";

const BACKEND_URL = import.meta.env.VITE_API_URL;
const user = JSON.parse(localStorage.getItem("user"));

const AdminSidebar = ({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}) => {
  const location = useLocation();
  const [pendingReturns, setPendingReturns] = useState(0);
  const [draftPosts, setDraftPosts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalView, setModalView] = useState("upload"); // 'upload' or 'manage'
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [heroImages, setHeroImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [deletingImage, setDeletingImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 6;

  const menu = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FaTachometerAlt /> },
    { name: "Users", path: "/admin/users", icon: <FaUsers /> },
    { name: "Products", path: "/admin/products", icon: <FaBox /> },
    { name: "Add Product", path: "/admin/products/add", icon: <FaPlus /> },
    { name: "Orders", path: "/admin/orders", icon: <FaShoppingCart /> },
    { name: "Notifications", path: "/admin/notifications", icon: <FaBell /> },
    { name: "Categories", path: "/admin/categories", icon: <FaBox /> },
    { name: "Add Category", path: "/admin/categories/add", icon: <FaPlus /> },
    {
      name: "Return Requests",
      path: "/admin/return-requests",
      icon: <FaUndo />,
    },
    { name: "Blog Posts", path: "/admin/blog", icon: <FaNewspaper /> },
    { name: "Add Blog Post", path: "/admin/blog/create", icon: <FaPenAlt /> },
    {
      name: "Blog Analytics",
      path: "/admin/blog/analytics",
      icon: <FaChartBar />,
    },
    { name: "Manage Hero Images", path: "#", icon: <FaImage /> },
  ];

  // Fetch hero images
  const fetchHeroImages = async () => {
    setLoadingImages(true);
    try {
      const res = await fetchWithAuth(`${BACKEND_URL}/api/admin/uploadHero`);
      const data = await res.json();

      if (data.success) {
        setHeroImages(data.images || []);
      } else {
        setHeroImages([]);
        toast.error(data.message || "Failed to load hero images");
      }
    } catch (err) {
      console.error("Failed to fetch hero images:", err);
      setHeroImages([]);
      toast.error("Failed to load hero images");
    } finally {
      setLoadingImages(false);
    }
  };

  // Delete hero image
  const deleteHeroImage = async (imageUrl) => {
    if (!imageUrl) return;

    if (!window.confirm("Are you sure you want to delete this hero image?")) {
      return;
    }

    setDeletingImage(imageUrl);
    try {
      const res = await fetchWithAuth(
        `${BACKEND_URL}/api/admin/uploadHero/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imageUrl }),
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success("Hero image deleted successfully!");
        // Remove from local state
        setHeroImages((prev) => prev.filter((img) => img !== imageUrl));
      } else {
        toast.error(data.message || "Failed to delete image");
      }
    } catch (err) {
      console.error("Failed to delete hero image:", err);
      toast.error("Failed to delete hero image");
    } finally {
      setDeletingImage(null);
    }
  };

  const fetchStats = async () => {
    try {
      setIsLoading(true);

      try {
        const returnsRes = await fetchWithAuth(
          `${BACKEND_URL}/api/return-requests/admin/stats`
        );
        if (returnsRes.ok) {
          const returnsData = await returnsRes.json();
          if (returnsData.success) {
            let pendingCount = 0;
            if (returnsData.data && returnsData.data.statusStats) {
              returnsData.data.statusStats.forEach((stat) => {
                if (
                  stat.status === "pending" ||
                  stat.status === "under_review"
                ) {
                  pendingCount += stat.count || 0;
                }
              });
            }
            setPendingReturns(pendingCount);
          }
        }
      } catch (error) {
        console.warn("Failed to fetch return stats:", error.message);
      }

      try {
        const blogRes = await fetchWithAuth(
          `${BACKEND_URL}/api/blog/stats/all`
        );
        if (blogRes.ok) {
          const blogData = await blogRes.json();
          if (blogData.success) {
            setDraftPosts(blogData.data.draftPosts || 0);
          }
        }
      } catch (error) {
        console.warn("Failed to fetch blog stats:", error.message);
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isModalOpen && modalView === "manage") {
      fetchHeroImages();
    }
  }, [isModalOpen, modalView]);

  const refreshStats = () => {
    toast.promise(fetchStats(), {
      loading: "Refreshing stats...",
      success: "Stats updated successfully",
      error: "Failed to refresh stats",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.clear();
    window.location.href = "/login";
  };

  const isActive = (path) => {
    if (path === "/admin/dashboard") return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return toast.error("Select an image first!");
    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetchWithAuth(`${BACKEND_URL}/api/admin/uploadHero`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Hero image uploaded successfully!");
        setFile(null);
        // Switch to manage view to show updated list
        setModalView("manage");
        fetchHeroImages();
      } else {
        toast.error(data.message || "Upload failed");
      }
    } catch (err) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  // Close sidebar when clicking a link on mobile
  const handleMobileLinkClick = () => {
    if (window.innerWidth < 768) {
      setMobileOpen(false);
    }
  };

  // Pagination calculations
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = heroImages.slice(indexOfFirstImage, indexOfLastImage);
  const totalPages = Math.ceil(heroImages.length / imagesPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const openModalWithView = (view) => {
    setModalView(view);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{
          x: mobileOpen ? 0 : window.innerWidth >= 768 ? 0 : -300,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={`fixed top-0 left-0 h-full z-50 transition-all duration-300 shadow-2xl
          ${collapsed ? "w-20" : "w-64"}
          bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800
          border-r border-slate-200 dark:border-slate-800
          ${mobileOpen ? "translate-x-0" : "md:translate-x-0"}`}
        style={{
          transform: mobileOpen
            ? "translateX(0)"
            : window.innerWidth >= 768
              ? "translateX(0)"
              : "translateX(-100%)",
        }}
      >
        <div className="flex flex-col h-full">
          {/* Logo / Collapse */}
          <div
            className={`flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800
              ${collapsed ? "flex-col gap-2 text-center" : "flex-row"} flex-shrink-0`}
          >
            <div
              className={`flex items-center gap-3 ${collapsed ? "flex-col" : ""}`}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              {!collapsed && (
                <div>
                  <h1 className="text-green-600 dark:text-green-400 font-bold text-xl">
                    Admin Panel
                  </h1>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">
                    E-commerce Dashboard
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                className="hidden md:block p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"
                onClick={() => setCollapsed(!collapsed)}
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                <FaBars />
              </button>

              <button
                className="md:hidden p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"
                onClick={() => setMobileOpen(false)}
                aria-label="Close sidebar"
              >
                <FaTimes />
              </button>
            </div>
          </div>

          {/* Refresh button */}
          {!collapsed && (
            <div className="px-4 pt-4 flex-shrink-0">
              <button
                onClick={refreshStats}
                disabled={isLoading}
                className="w-full py-2 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-400/30 border-t-slate-600 dark:border-t-white rounded-full animate-spin"></div>
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    <span>Refresh Stats</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Scrollable Menu */}
          <nav className="mt-4 px-2 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700 scrollbar-track-transparent">
            {menu.map((item, index) => {
              const active = isActive(item.path);
              const isReturnRequests = item.path === "/admin/return-requests";
              const isBlogPosts = item.path === "/admin/blog";
              const isAddBlogPost = item.path === "/admin/blog/create";
              const isManageHeroImages = item.name === "Manage Hero Images";

              return (
                <div key={item.path}>
                  {isManageHeroImages ? (
                    <motion.button
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => openModalWithView("manage")}
                      className={`flex items-center gap-4 py-3 px-4 mb-2 rounded-xl w-full text-left
                        transition-all duration-200 group relative
                        ${
                          active
                            ? "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 text-green-600 dark:text-green-400 border-l-4 border-green-500"
                            : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white hover:border-l-4 hover:border-slate-300 dark:hover:border-slate-600"
                        }`}
                    >
                      <div
                        className={`${active ? "text-green-600 dark:text-green-400" : "text-slate-500 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300"}`}
                      >
                        {item.icon}
                      </div>
                      {!collapsed && (
                        <>
                          <span className="font-medium truncate">
                            {item.name}
                          </span>
                          <div className="absolute right-3">
                            <FaImage className="text-slate-400 dark:text-slate-500 text-sm" />
                          </div>
                        </>
                      )}
                    </motion.button>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={item.path}
                        className={`flex items-center gap-4 py-3 px-4 mb-2 rounded-xl relative group
                          transition-all duration-200
                          ${
                            active
                              ? "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 text-green-600 dark:text-green-400 border-l-4 border-green-500"
                              : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white hover:border-l-4 hover:border-slate-300 dark:hover:border-slate-600"
                          }`}
                        onClick={handleMobileLinkClick}
                      >
                        <div
                          className={`${active ? "text-green-600 dark:text-green-400" : "text-slate-500 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300"}`}
                        >
                          {item.icon}
                        </div>
                        {!collapsed && (
                          <div className="flex items-center justify-between w-full overflow-hidden">
                            <span className="font-medium truncate">
                              {item.name}
                            </span>
                            {isReturnRequests && pendingReturns > 0 && (
                              <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center px-1.5 animate-pulse shadow-lg">
                                {pendingReturns}
                              </span>
                            )}
                            {isBlogPosts && draftPosts > 0 && (
                              <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center px-1.5 shadow-lg">
                                {draftPosts}
                              </span>
                            )}
                            {isAddBlogPost && (
                              <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center px-1.5 shadow-lg">
                                +
                              </span>
                            )}
                          </div>
                        )}
                        {collapsed && (
                          <>
                            {isReturnRequests && pendingReturns > 0 && (
                              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse shadow-lg">
                                {pendingReturns > 9 ? "9+" : pendingReturns}
                              </span>
                            )}
                            {isBlogPosts && draftPosts > 0 && (
                              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                                {draftPosts > 9 ? "9+" : draftPosts}
                              </span>
                            )}
                          </>
                        )}
                        {collapsed && (
                          <div className="absolute left-full ml-2 px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 shadow-xl border border-slate-200 dark:border-slate-700">
                            {item.name}
                            {isReturnRequests && pendingReturns > 0 && (
                              <div className="mt-1 text-red-600 dark:text-red-400 font-semibold">
                                {pendingReturns} pending
                              </div>
                            )}
                            {isBlogPosts && draftPosts > 0 && (
                              <div className="mt-1 text-yellow-600 dark:text-yellow-400 font-semibold">
                                {draftPosts} drafts
                              </div>
                            )}
                          </div>
                        )}
                      </Link>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* User info & Logout */}
          <div className="border-t border-slate-200 dark:border-slate-800 p-4 flex-shrink-0">
            <div
              className={`flex items-center gap-3 mb-4 ${collapsed ? "justify-center" : ""}`}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-white font-bold">AD</span>
                )}
              </div>

              {!collapsed && (
                <div className="flex-1 overflow-hidden">
                  <p className="text-slate-900 dark:text-white font-medium truncate">
                    {user?.name || "Administrator"}
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs truncate">
                    {user?.email || "admin@example.com"}
                  </p>
                </div>
              )}
            </div>

            <button
              onClick={handleLogout}
              className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-lg
                bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20
                text-red-600 dark:text-red-400 hover:text-white hover:from-red-600 hover:to-pink-600
                border border-red-200 dark:border-red-800/30 hover:border-red-500
                transition-all duration-200
                ${collapsed ? "px-2" : "px-4"}
              `}
              aria-label="Logout"
            >
              {!collapsed && "Logout"}
              <FaSignOutAlt />
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Hero Images Management Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
            >
              <div
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 w-full max-w-4xl pointer-events-auto max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 sm:p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20">
                        <FaImage className="text-green-600 dark:text-green-400" />
                      </div>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                        Manage Hero Images
                      </h2>
                    </div>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      <FaTimes className="text-slate-500 dark:text-slate-400" />
                    </button>
                  </div>

                  {/* Tabs */}
                  <div className="flex border-b border-slate-200 dark:border-slate-700 mb-6">
                    <button
                      onClick={() => setModalView("manage")}
                      className={`flex-1 py-3 font-medium text-center transition-all ${
                        modalView === "manage"
                          ? "text-green-600 dark:text-green-400 border-b-2 border-green-500"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      View All Images
                    </button>
                    <button
                      onClick={() => setModalView("upload")}
                      className={`flex-1 py-3 font-medium text-center transition-all ${
                        modalView === "upload"
                          ? "text-green-600 dark:text-green-400 border-b-2 border-green-500"
                          : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                    >
                      Upload New
                    </button>
                  </div>

                  {/* Content */}
                  {modalView === "upload" ? (
                    <div className="space-y-6">
                      <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-6 sm:p-8 text-center">
                        {file ? (
                          <div className="space-y-4">
                            <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700">
                              <img
                                src={URL.createObjectURL(file)}
                                alt="Preview"
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400 break-words">
                              {file.name}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-500">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 flex items-center justify-center">
                              <FaUpload className="w-8 h-8 text-green-600 dark:text-green-400" />
                            </div>
                            <div>
                              <p className="text-slate-600 dark:text-slate-300 font-medium mb-1">
                                Drop your image here
                              </p>
                              <p className="text-sm text-slate-500 dark:text-slate-400">
                                or click to browse
                              </p>
                            </div>
                            <p className="text-xs text-slate-400 dark:text-slate-500 pt-2 border-t border-slate-200 dark:border-slate-700">
                              PNG, JPG, GIF up to 5MB
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                          id="file-upload"
                        />
                        <label
                          htmlFor="file-upload"
                          className="block w-full px-4 py-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 hover:from-green-100 hover:to-emerald-100 dark:hover:from-green-800/20 dark:hover:to-emerald-800/20 border border-green-200 dark:border-green-800/30 rounded-lg text-center cursor-pointer transition-all duration-200 text-green-700 dark:text-green-400 font-medium"
                        >
                          Choose Image
                        </label>

                        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                          <button
                            onClick={() => setIsModalOpen(false)}
                            className="flex-1 py-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg text-slate-700 dark:text-slate-300 font-medium transition-all duration-200"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleUpload}
                            disabled={!file || uploading}
                            className="flex-1 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-slate-400 disabled:to-slate-500 disabled:cursor-not-allowed rounded-lg text-white font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-green-500/20"
                          >
                            {uploading ? (
                              <span className="flex items-center justify-center gap-2">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Uploading...
                              </span>
                            ) : (
                              "Upload Image"
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      {/* Stats */}
                      <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-green-600 dark:text-green-400 font-semibold">
                              Total Hero Images
                            </p>
                            <p className="text-2xl font-bold text-slate-900 dark:text-white">
                              {heroImages.length}
                            </p>
                          </div>
                          <button
                            onClick={fetchHeroImages}
                            disabled={loadingImages}
                            className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-800/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {loadingImages ? "Refreshing..." : "Refresh List"}
                          </button>
                        </div>
                      </div>

                      {/* Images Grid */}
                      {loadingImages ? (
                        <div className="flex justify-center items-center py-12">
                          <FaSpinner className="w-8 h-8 text-green-600 animate-spin" />
                        </div>
                      ) : heroImages.length === 0 ? (
                        <div className="text-center py-12">
                          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 flex items-center justify-center mb-4">
                            <FaImage className="w-8 h-8 text-green-600 dark:text-green-400" />
                          </div>
                          <p className="text-slate-600 dark:text-slate-300 mb-2">
                            No hero images uploaded yet
                          </p>
                          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                            Upload images to display on the homepage
                          </p>
                          <button
                            onClick={() => setModalView("upload")}
                            className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all"
                          >
                            Upload First Image
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                            {currentImages.map((imageUrl, index) => (
                              <motion.div
                                key={imageUrl}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative bg-slate-100 dark:bg-slate-700 rounded-lg overflow-hidden"
                              >
                                <div className="aspect-video overflow-hidden">
                                  <img
                                    src={imageUrl}
                                    alt={`Hero Image ${index + 1}`}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src =
                                        "https://via.placeholder.com/400x300?text=Image+Error";
                                    }}
                                  />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                                  <div className="flex gap-2 w-full">
                                    <a
                                      href={imageUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex-1 px-3 py-1.5 bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 text-sm font-medium rounded flex items-center justify-center gap-1.5 hover:bg-white dark:hover:bg-slate-800 transition-colors"
                                    >
                                      <FaEye className="text-xs" />
                                      View
                                    </a>
                                    <button
                                      onClick={() => deleteHeroImage(imageUrl)}
                                      disabled={deletingImage === imageUrl}
                                      className="flex-1 px-3 py-1.5 bg-red-500/90 text-white text-sm font-medium rounded flex items-center justify-center gap-1.5 hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                      {deletingImage === imageUrl ? (
                                        <FaSpinner className="text-xs animate-spin" />
                                      ) : (
                                        <FaTrash className="text-xs" />
                                      )}
                                      Delete
                                    </button>
                                  </div>
                                </div>
                                <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                                  #{indexOfFirstImage + index + 1}
                                </div>
                              </motion.div>
                            ))}
                          </div>

                          {/* Pagination */}
                          {totalPages > 1 && (
                            <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-700 pt-6">
                              <button
                                onClick={handlePrevPage}
                                disabled={currentPage === 1}
                                className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              >
                                <FaChevronLeft />
                                Previous
                              </button>
                              <span className="text-slate-600 dark:text-slate-400">
                                Page {currentPage} of {totalPages}
                              </span>
                              <button
                                onClick={handleNextPage}
                                disabled={currentPage === totalPages}
                                className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              >
                                Next
                                <FaChevronRight />
                              </button>
                            </div>
                          )}

                          {/* Warning */}
                          <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                            <p className="text-yellow-700 dark:text-yellow-400 text-sm">
                              <strong>Note:</strong> Deleting a hero image will
                              remove it from the homepage carousel. Make sure
                              you have at least 2-3 images for a good user
                              experience.
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdminSidebar;
// import React, { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FaTachometerAlt,
//   FaUsers,
//   FaBox,
//   FaPlus,
//   FaShoppingCart,
//   FaBell,
//   FaBars,
//   FaUndo,
//   FaPenAlt,
//   FaNewspaper,
//   FaChartBar,
//   FaTimes,
//   FaImage,
//   FaUpload,
//   FaUserCircle,
//   FaCog,
//   FaSignOutAlt,
// } from "react-icons/fa";
// import { fetchWithAuth } from "../utils/auth";
// import toast from "react-hot-toast";

// const BACKEND_URL = import.meta.env.VITE_API_URL;
// const user = JSON.parse(localStorage.getItem("user"));

// const AdminSidebar = ({
//   collapsed,
//   setCollapsed,
//   mobileOpen,
//   setMobileOpen,
// }) => {
//   const location = useLocation();
//   const [pendingReturns, setPendingReturns] = useState(0);
//   const [draftPosts, setDraftPosts] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [file, setFile] = useState(null);
//   const [uploading, setUploading] = useState(false);

//   const menu = [
//     { name: "Dashboard", path: "/admin/dashboard", icon: <FaTachometerAlt /> },
//     { name: "Users", path: "/admin/users", icon: <FaUsers /> },
//     { name: "Products", path: "/admin/products", icon: <FaBox /> },
//     { name: "Add Product", path: "/admin/products/add", icon: <FaPlus /> },
//     { name: "Orders", path: "/admin/orders", icon: <FaShoppingCart /> },
//     { name: "Notifications", path: "/admin/notifications", icon: <FaBell /> },
//     { name: "Categories", path: "/admin/categories", icon: <FaBox /> },
//     { name: "Add Category", path: "/admin/categories/add", icon: <FaPlus /> },
//     {
//       name: "Return Requests",
//       path: "/admin/return-requests",
//       icon: <FaUndo />,
//     },
//     { name: "Blog Posts", path: "/admin/blog", icon: <FaNewspaper /> },
//     { name: "Add Blog Post", path: "/admin/blog/create", icon: <FaPenAlt /> },
//     {
//       name: "Blog Analytics",
//       path: "/admin/blog/analytics",
//       icon: <FaChartBar />,
//     },
//     { name: "Upload Hero Image", path: "#", icon: <FaImage /> },
//   ];

//   const fetchStats = async () => {
//     try {
//       setIsLoading(true);

//       try {
//         const returnsRes = await fetchWithAuth(
//           `${BACKEND_URL}/api/return-requests/admin/stats`
//         );
//         if (returnsRes.ok) {
//           const returnsData = await returnsRes.json();
//           if (returnsData.success) {
//             let pendingCount = 0;
//             if (returnsData.data && returnsData.data.statusStats) {
//               returnsData.data.statusStats.forEach((stat) => {
//                 if (
//                   stat.status === "pending" ||
//                   stat.status === "under_review"
//                 ) {
//                   pendingCount += stat.count || 0;
//                 }
//               });
//             }
//             setPendingReturns(pendingCount);
//           }
//         }
//       } catch (error) {
//         console.warn("Failed to fetch return stats:", error.message);
//       }

//       try {
//         const blogRes = await fetchWithAuth(
//           `${BACKEND_URL}/api/blog/stats/all`
//         );
//         if (blogRes.ok) {
//           const blogData = await blogRes.json();
//           if (blogData.success) {
//             setDraftPosts(blogData.data.draftPosts || 0);
//           }
//         }
//       } catch (error) {
//         console.warn("Failed to fetch blog stats:", error.message);
//       }
//     } catch (error) {
//       console.error("Failed to fetch stats:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStats();
//     const interval = setInterval(fetchStats, 60000);
//     return () => clearInterval(interval);
//   }, []);

//   const refreshStats = () => {
//     toast.promise(fetchStats(), {
//       loading: "Refreshing stats...",
//       success: "Stats updated successfully",
//       error: "Failed to refresh stats",
//     });
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     sessionStorage.clear();
//     window.location.href = "/login";
//   };

//   const isActive = (path) => {
//     if (path === "/admin/dashboard") return location.pathname === path;
//     return location.pathname.startsWith(path);
//   };

//   const handleFileChange = (e) => setFile(e.target.files[0]);

//   const handleUpload = async () => {
//     if (!file) return toast.error("Select an image first!");
//     setUploading(true);
//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       const res = await fetchWithAuth(`${BACKEND_URL}/api/admin/uploadHero`, {
//         method: "POST",
//         body: formData,
//       });
//       const data = await res.json();
//       if (data.success) {
//         toast.success("Image uploaded successfully!");
//         setIsModalOpen(false);
//         setFile(null);
//       } else {
//         toast.error(data.message || "Upload failed");
//       }
//     } catch (err) {
//       toast.error(err.message || "Upload failed");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const sidebarVariants = {
//     hidden: { x: -300, opacity: 0 },
//     visible: { x: 0, opacity: 1, transition: { type: "spring", damping: 25 } },
//     exit: { x: -300, opacity: 0, transition: { duration: 0.3 } },
//   };

//   return (
//     <>
//       <motion.aside
//         variants={sidebarVariants}
//         initial="hidden"
//         animate="visible"
//         exit="exit"
//         className={`fixed top-0 left-0 h-full z-50 transition-all duration-300 shadow-2xl
//           ${collapsed ? "w-20" : "w-64"}
//           bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-800
//           border-r border-slate-200 dark:border-slate-800
//           ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
//       >
//         <div className="flex flex-col h-full">
//           {/* Logo / Collapse */}
//           <div
//             className={`flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800
//               ${collapsed ? "flex-col gap-2 text-center" : "flex-row"} flex-shrink-0`}
//           >
//             <div
//               className={`flex items-center gap-3 ${collapsed ? "flex-col" : ""}`}
//             >
//               <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
//                 <span className="text-white font-bold text-lg">A</span>
//               </div>
//               {!collapsed && (
//                 <div>
//                   <h1 className="text-green-600 dark:text-green-400 font-bold text-xl">
//                     Admin Panel
//                   </h1>
//                   <p className="text-slate-500 dark:text-slate-400 text-xs">
//                     E-commerce Dashboard
//                   </p>
//                 </div>
//               )}
//             </div>

//             <button
//               className="hidden md:block p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"
//               onClick={() => setCollapsed(!collapsed)}
//               aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
//             >
//               <FaBars />
//             </button>

//             <button
//               className="md:hidden p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"
//               onClick={() => setMobileOpen(false)}
//               aria-label="Close sidebar"
//             >
//               <FaTimes />
//             </button>
//           </div>

//           {/* Refresh button */}
//           {!collapsed && (
//             <div className="px-4 pt-4 flex-shrink-0">
//               <button
//                 onClick={refreshStats}
//                 disabled={isLoading}
//                 className="w-full py-2 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {isLoading ? (
//                   <>
//                     <div className="w-4 h-4 border-2 border-slate-400/30 border-t-slate-600 dark:border-t-white rounded-full animate-spin"></div>
//                     <span>Loading...</span>
//                   </>
//                 ) : (
//                   <>
//                     <svg
//                       className="w-4 h-4"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
//                       />
//                     </svg>
//                     <span>Refresh Stats</span>
//                   </>
//                 )}
//               </button>
//             </div>
//           )}

//           {/* Scrollable Menu */}
//           <nav className="mt-4 px-2 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700 scrollbar-track-transparent">
//             {menu.map((item, index) => {
//               const active = isActive(item.path);
//               const isReturnRequests = item.path === "/admin/return-requests";
//               const isBlogPosts = item.path === "/admin/blog";
//               const isAddBlogPost = item.path === "/admin/blog/create";

//               return (
//                 <div key={item.path}>
//                   {item.name === "Upload Hero Image" ? (
//                     <motion.button
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: index * 0.05 }}
//                       onClick={() => setIsModalOpen(true)}
//                       className={`flex items-center gap-4 py-3 px-4 mb-2 rounded-xl w-full text-left
//                         transition-all duration-200 group relative
//                         ${
//                           active
//                             ? "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 text-green-600 dark:text-green-400 border-l-4 border-green-500"
//                             : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white hover:border-l-4 hover:border-slate-300 dark:hover:border-slate-600"
//                         }`}
//                     >
//                       <div
//                         className={`${active ? "text-green-600 dark:text-green-400" : "text-slate-500 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300"}`}
//                       >
//                         {item.icon}
//                       </div>
//                       {!collapsed && (
//                         <>
//                           <span className="font-medium truncate">
//                             {item.name}
//                           </span>
//                           <div className="absolute right-3">
//                             <FaUpload className="text-slate-400 dark:text-slate-500 text-sm" />
//                           </div>
//                         </>
//                       )}
//                     </motion.button>
//                   ) : (
//                     <motion.div
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: index * 0.05 }}
//                     >
//                       <Link
//                         to={item.path}
//                         className={`flex items-center gap-4 py-3 px-4 mb-2 rounded-xl relative group
//                           transition-all duration-200
//                           ${
//                             active
//                               ? "bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 text-green-600 dark:text-green-400 border-l-4 border-green-500"
//                               : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white hover:border-l-4 hover:border-slate-300 dark:hover:border-slate-600"
//                           }`}
//                         onClick={() => setMobileOpen(false)}
//                       >
//                         <div
//                           className={`${active ? "text-green-600 dark:text-green-400" : "text-slate-500 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300"}`}
//                         >
//                           {item.icon}
//                         </div>
//                         {!collapsed && (
//                           <div className="flex items-center justify-between w-full overflow-hidden">
//                             <span className="font-medium truncate">
//                               {item.name}
//                             </span>
//                             {isReturnRequests && pendingReturns > 0 && (
//                               <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center px-1.5 animate-pulse shadow-lg">
//                                 {pendingReturns}
//                               </span>
//                             )}
//                             {isBlogPosts && draftPosts > 0 && (
//                               <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center px-1.5 shadow-lg">
//                                 {draftPosts}
//                               </span>
//                             )}
//                             {isAddBlogPost && (
//                               <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center px-1.5 shadow-lg">
//                                 +
//                               </span>
//                             )}
//                           </div>
//                         )}
//                         {collapsed && (
//                           <>
//                             {isReturnRequests && pendingReturns > 0 && (
//                               <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse shadow-lg">
//                                 {pendingReturns > 9 ? "9+" : pendingReturns}
//                               </span>
//                             )}
//                             {isBlogPosts && draftPosts > 0 && (
//                               <span className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
//                                 {draftPosts > 9 ? "9+" : draftPosts}
//                               </span>
//                             )}
//                           </>
//                         )}
//                         {collapsed && (
//                           <div className="absolute left-full ml-2 px-3 py-2 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 shadow-xl border border-slate-200 dark:border-slate-700">
//                             {item.name}
//                             {isReturnRequests && pendingReturns > 0 && (
//                               <div className="mt-1 text-red-600 dark:text-red-400 font-semibold">
//                                 {pendingReturns} pending
//                               </div>
//                             )}
//                             {isBlogPosts && draftPosts > 0 && (
//                               <div className="mt-1 text-yellow-600 dark:text-yellow-400 font-semibold">
//                                 {draftPosts} drafts
//                               </div>
//                             )}
//                           </div>
//                         )}
//                       </Link>
//                     </motion.div>
//                   )}
//                 </div>
//               );
//             })}
//           </nav>

//           {/* User info & Logout */}
//           <div className="border-t border-slate-200 dark:border-slate-800 p-4 flex-shrink-0">
//             <div
//               className={`flex items-center gap-3 mb-4 ${collapsed ? "justify-center" : ""}`}
//             >
//               <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
//                 {user?.avatar ? (
//                   <img
//                     src={user.avatar}
//                     alt={user.name}
//                     className="w-full h-full rounded-full object-cover"
//                   />
//                 ) : (
//                   <span className="text-white font-bold">AD</span>
//                 )}
//               </div>

//               {!collapsed && (
//                 <div className="flex-1 overflow-hidden">
//                   <p className="text-slate-900 dark:text-white font-medium truncate">
//                     {user?.name || "Administrator"}
//                   </p>
//                   <p className="text-slate-500 dark:text-slate-400 text-xs truncate">
//                     {user?.email || "admin@example.com"}
//                   </p>
//                 </div>
//               )}
//             </div>

//             <button
//               onClick={handleLogout}
//               className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-lg
//                 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20
//                 text-red-600 dark:text-red-400 hover:text-white hover:from-red-600 hover:to-pink-600
//                 border border-red-200 dark:border-red-800/30 hover:border-red-500
//                 transition-all duration-200
//                 ${collapsed ? "px-2" : "px-4"}
//               `}
//               aria-label="Logout"
//             >
//               {!collapsed && "Logout"}
//               <FaSignOutAlt />
//             </button>
//           </div>
//         </div>
//       </motion.aside>

//       {/* Upload Modal */}
//       <AnimatePresence>
//         {isModalOpen && (
//           <>
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
//               onClick={() => setIsModalOpen(false)}
//             />
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0, y: 20 }}
//               animate={{ scale: 1, opacity: 1, y: 0 }}
//               exit={{ scale: 0.9, opacity: 0, y: 20 }}
//               className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[101] w-full max-w-md"
//             >
//               <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 p-6">
//                 <div className="flex items-center justify-between mb-6">
//                   <div className="flex items-center gap-3">
//                     <div className="p-2 rounded-lg bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20">
//                       <FaUpload className="text-green-600 dark:text-green-400" />
//                     </div>
//                     <h2 className="text-xl font-bold text-slate-900 dark:text-white">
//                       Upload Hero Image
//                     </h2>
//                   </div>
//                   <button
//                     onClick={() => setIsModalOpen(false)}
//                     className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
//                   >
//                     <FaTimes className="text-slate-500 dark:text-slate-400" />
//                   </button>
//                 </div>

//                 <div className="space-y-4">
//                   <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-8 text-center">
//                     {file ? (
//                       <div className="space-y-4">
//                         <img
//                           src={URL.createObjectURL(file)}
//                           alt="Preview"
//                           className="max-h-48 mx-auto rounded-lg"
//                         />
//                         <p className="text-sm text-slate-600 dark:text-slate-400">
//                           {file.name}
//                         </p>
//                       </div>
//                     ) : (
//                       <div>
//                         <FaUpload className="w-12 h-12 mx-auto mb-4 text-slate-400" />
//                         <p className="text-slate-600 dark:text-slate-300 mb-2">
//                           Click to select an image
//                         </p>
//                         <p className="text-sm text-slate-500 dark:text-slate-400">
//                           PNG, JPG, GIF up to 5MB
//                         </p>
//                       </div>
//                     )}
//                   </div>

//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleFileChange}
//                     className="hidden"
//                     id="file-upload"
//                   />
//                   <label
//                     htmlFor="file-upload"
//                     className="block w-full px-4 py-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg text-center cursor-pointer transition-colors text-slate-700 dark:text-slate-300"
//                   >
//                     Choose Image
//                   </label>

//                   <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
//                     <button
//                       onClick={() => setIsModalOpen(false)}
//                       className="flex-1 py-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg text-slate-700 dark:text-slate-300 font-medium transition-colors"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       onClick={handleUpload}
//                       disabled={!file || uploading}
//                       className="flex-1 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 rounded-lg text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       {uploading ? (
//                         <span className="flex items-center justify-center gap-2">
//                           <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                           Uploading...
//                         </span>
//                       ) : (
//                         "Upload"
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// export default AdminSidebar;
