// // import React, { useState } from "react";
// // import { Outlet } from "react-router-dom";
// // import AdminSidebar from "./AdminSidebar";
// // // import AdminTopbar from "./AdminTopbar";
// // // import AdminTopbar from "./AdminTopbar";
// // const AdminLayout = () => {
// //   const [mobileOpen, setMobileOpen] = useState(false);
// //   const [collapsed, setCollapsed] = useState(false);

// //   return (
// //     <div className="flex min-h-screen  bg-slate-900 items-center justify-center w-full ">
// //       {/* SIDEBAR */}
// //       <AdminSidebar
// //         collapsed={collapsed}
// //         setCollapsed={setCollapsed}
// //         mobileOpen={mobileOpen}
// //         setMobileOpen={setMobileOpen}
// //       />

// //       {/* CONTENT AREA */}
// //       <div
// //         className={`flex-1 transition-all duration-300 w-full
// //           ${collapsed ? "ml-20" : "ml-64"}
// //           max-md:ml-0
// //         `}
// //       >
// //         {/* TOP BAR for mobile */}
// //         <AdminTopbar setMobileOpen={setMobileOpen} />

// //         {/* Pages */}
// //         <div className="max-md:px-4 max-md:py-16 lg:px-4 lg:py-4 w-full">
// //           <Outlet />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminLayout;
// // import React, { useState, useEffect } from "react";
// // import { Outlet, useLocation } from "react-router-dom";
// // import AdminSidebar from "./AdminSidebar";
// // import AdminTop from "./AdminTop";
// // import { fetchWithAuth } from "../utils/auth";

// // const BACKEND_URL = import.meta.env.VITE_API_URL;

// // const AdminLayout = () => {
// //   const [mobileOpen, setMobileOpen] = useState(false);
// //   const [collapsed, setCollapsed] = useState(false);
// //   const [isMobile, setIsMobile] = useState(false);
// //   const [stats, setStats] = useState(null);
// //   const [statsLoading, setStatsLoading] = useState(false);
// //   const location = useLocation();

// //   useEffect(() => {
// //     const checkIsMobile = () => {
// //       setIsMobile(window.innerWidth < 768);
// //     };

// //     checkIsMobile();
// //     window.addEventListener("resize", checkIsMobile);
// //     return () => window.removeEventListener("resize", checkIsMobile);
// //   }, []);

// //   useEffect(() => {
// //     fetchHeaderStats();
// //   }, [location.pathname]);

// //   useEffect(() => {
// //     if (mobileOpen) {
// //       setMobileOpen(false);
// //     }
// //   }, [location.pathname]);

// //   const fetchHeaderStats = async () => {
// //     try {
// //       setStatsLoading(true);
// //       const res = await fetchWithAuth(
// //         `${BACKEND_URL}/api/adminanalytics/stats`
// //       );
// //       const data = await res.json();
// //       if (data.success) {
// //         setStats(data.data);
// //       }
// //     } catch (err) {
// //       console.error("Failed to fetch header stats:", err);
// //     } finally {
// //       setStatsLoading(false);
// //     }
// //   };

// //   const getPageTitle = () => {
// //     const path = location.pathname;
// //     if (path.includes("dashboard")) return "Dashboard";
// //     if (path.includes("users")) return "User Management";
// //     if (path.includes("products")) return "Products";
// //     if (path.includes("orders")) return "Orders";
// //     if (path.includes("categories")) return "Categories";
// //     if (path.includes("notifications")) return "Notifications";
// //     if (path.includes("return-requests")) return "Return Requests";
// //     if (path.includes("blog")) {
// //       if (path.includes("analytics")) return "Blog Analytics";
// //       if (path.includes("create")) return "Create Blog Post";
// //       if (path.includes("edit")) return "Edit Blog Post";
// //       return "Blog Management";
// //     }
// //     return "Admin Panel";
// //   };

// //   const refreshStats = () => {
// //     fetchHeaderStats();
// //   };

// //   return (
// //     <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
// //       <AdminSidebar
// //         collapsed={collapsed}
// //         setCollapsed={setCollapsed}
// //         mobileOpen={mobileOpen}
// //         setMobileOpen={setMobileOpen}
// //       />

// //       <div
// //         className={`flex-1 transition-all duration-300 ease-in-out
// //           ${collapsed ? "md:ml-20" : "md:ml-64"}
// //           max-md:ml-0
// //         `}
// //       >
// //         <div className="sticky top-0 z-40">
// //           <AdminTop
// //             setMobileOpen={setMobileOpen}
// //             pageTitle={getPageTitle()}
// //             collapsed={collapsed}
// //             setCollapsed={setCollapsed}
// //             isMobile={isMobile}
// //           />
// //         </div>

// //         <main className="p-4 md:p-6 lg:p-8 min-h-[calc(100vh-80px)]">
// //           <div className="mb-8">
// //             <nav className="flex mb-4" aria-label="Breadcrumb">
// //               <ol className="inline-flex items-center space-x-1 md:space-x-3">
// //                 <li className="inline-flex items-center">
// //                   <a
// //                     href="/admin/dashboard"
// //                     className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors"
// //                   >
// //                     <svg
// //                       className="w-4 h-4 mr-2"
// //                       fill="currentColor"
// //                       viewBox="0 0 20 20"
// //                       xmlns="http://www.w3.org/2000/svg"
// //                     >
// //                       <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
// //                     </svg>
// //                     Dashboard
// //                   </a>
// //                 </li>
// //                 {location.pathname !== "/admin/dashboard" && (
// //                   <li>
// //                     <div className="flex items-center">
// //                       <svg
// //                         className="w-6 h-6 text-slate-600"
// //                         fill="currentColor"
// //                         viewBox="0 0 20 20"
// //                         xmlns="http://www.w3.org/2000/svg"
// //                       >
// //                         <path
// //                           fillRule="evenodd"
// //                           d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
// //                           clipRule="evenodd"
// //                         />
// //                       </svg>
// //                       <span className="ml-1 text-sm font-medium text-white md:ml-2">
// //                         {getPageTitle()}
// //                       </span>
// //                     </div>
// //                   </li>
// //                 )}
// //               </ol>
// //             </nav>

// //             <div className="flex flex-col md:flex-row md:items-center justify-between">
// //               <div>
// //                 <h1 className="text-2xl md:text-3xl font-bold text-white">
// //                   {getPageTitle()}
// //                 </h1>
// //                 <p className="mt-2 text-slate-400">
// //                   {location.pathname === "/admin/dashboard"
// //                     ? "Your store analytics at a glance"
// //                     : "Manage your ecommerce store efficiently"}
// //                 </p>
// //               </div>

// //               <div className="mt-4 md:mt-0 flex items-center space-x-4">
// //                 <div className="hidden md:flex items-center space-x-4">
// //                   {statsLoading ? (
// //                     <>
// //                       {[1, 2, 3].map((i) => (
// //                         <div
// //                           key={i}
// //                           className="px-4 py-2 bg-slate-800/50 border border-slate-700/30 rounded-lg animate-pulse"
// //                         >
// //                           <div className="h-4 w-16 bg-slate-700 rounded mb-2"></div>
// //                           <div className="h-6 w-12 bg-slate-700 rounded"></div>
// //                         </div>
// //                       ))}
// //                     </>
// //                   ) : stats ? (
// //                     <>
// //                       <div className="px-4 py-2 bg-green-900/20 border border-green-800/30 rounded-lg">
// //                         <div className="text-xs text-green-400">Revenue</div>
// //                         <div className="text-white font-semibold">
// //                           ${stats.revenue?.total?.toFixed(2) || "0.00"}
// //                         </div>
// //                       </div>
// //                       <div className="px-4 py-2 bg-blue-900/20 border border-blue-800/30 rounded-lg">
// //                         <div className="text-xs text-blue-400">Orders</div>
// //                         <div className="text-white font-semibold">
// //                           {stats.orders?.total?.toLocaleString() || "0"}
// //                         </div>
// //                       </div>
// //                       <div className="px-4 py-2 bg-purple-900/20 border border-purple-800/30 rounded-lg">
// //                         <div className="text-xs text-purple-400">Users</div>
// //                         <div className="text-white font-semibold">
// //                           {stats.users?.total?.toLocaleString() || "0"}
// //                         </div>
// //                       </div>
// //                     </>
// //                   ) : (
// //                     <>
// //                       <div className="px-4 py-2 bg-slate-800/50 border border-slate-700/30 rounded-lg">
// //                         <div className="text-xs text-slate-400">Revenue</div>
// //                         <div className="text-white font-semibold">$0.00</div>
// //                       </div>
// //                       <div className="px-4 py-2 bg-slate-800/50 border border-slate-700/30 rounded-lg">
// //                         <div className="text-xs text-slate-400">Orders</div>
// //                         <div className="text-white font-semibold">0</div>
// //                       </div>
// //                     </>
// //                   )}
// //                 </div>
// //                 <button
// //                   onClick={refreshStats}
// //                   disabled={statsLoading}
// //                   className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-white text-sm font-medium transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
// //                 >
// //                   {statsLoading ? (
// //                     <>
// //                       <div className="w-4 h-4 border-2 border-slate-300/30 border-t-white rounded-full animate-spin"></div>
// //                       <span>Refreshing...</span>
// //                     </>
// //                   ) : (
// //                     <>
// //                       <svg
// //                         className="w-4 h-4"
// //                         fill="none"
// //                         stroke="currentColor"
// //                         viewBox="0 0 24 24"
// //                         xmlns="http://www.w3.org/2000/svg"
// //                       >
// //                         <path
// //                           strokeLinecap="round"
// //                           strokeLinejoin="round"
// //                           strokeWidth={2}
// //                           d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
// //                         />
// //                       </svg>
// //                       <span>Refresh</span>
// //                     </>
// //                   )}
// //                 </button>
// //               </div>
// //             </div>
// //           </div>

// //           <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-xl overflow-hidden">
// //             <div className="p-4 md:p-6">
// //               <Outlet />
// //             </div>
// //           </div>

// //           <footer className="mt-8 pt-6 border-t border-slate-800">
// //             <div className="flex flex-col md:flex-row justify-between items-center">
// //               <div className="text-slate-500 text-sm">
// //                 © {new Date().getFullYear()} Ecommerce Admin Panel. All rights
// //                 reserved.
// //               </div>
// //               <div className="flex items-center space-x-4 mt-4 md:mt-0">
// //                 <a
// //                   href="/"
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   className="text-slate-400 hover:text-white text-sm transition-colors"
// //                 >
// //                   View Store
// //                 </a>
// //                 <a
// //                   href="/contact"
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   className="text-slate-400 hover:text-white text-sm transition-colors"
// //                 >
// //                   Support
// //                 </a>
// //                 <a
// //                   href="/docs"
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   className="text-slate-400 hover:text-white text-sm transition-colors"
// //                 >
// //                   Documentation
// //                 </a>
// //               </div>
// //             </div>
// //           </footer>
// //         </main>
// //       </div>

// //       {mobileOpen && (
// //         <div
// //           className="fixed inset-0 bg-black/50 z-40 md:hidden"
// //           onClick={() => setMobileOpen(false)}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default AdminLayout;
// import React, { useState, useEffect } from "react";
// import { Outlet, useLocation } from "react-router-dom";
// import AdminSidebar from "./AdminSidebar";
// import AdminTop from "./AdminTop";
// import { fetchWithAuth } from "../utils/auth";

// const BACKEND_URL = import.meta.env.VITE_API_URL;
// const AdminLayout = () => {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [collapsed, setCollapsed] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [stats, setStats] = useState(null);
//   const [statsLoading, setStatsLoading] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     const checkIsMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     checkIsMobile();
//     window.addEventListener("resize", checkIsMobile);
//     return () => window.removeEventListener("resize", checkIsMobile);
//   }, []);

//   useEffect(() => {
//     fetchHeaderStats();
//   }, [location.pathname]);

//   useEffect(() => {
//     if (mobileOpen) {
//       setMobileOpen(false);
//     }
//   }, [location.pathname]);

//   const fetchHeaderStats = async () => {
//     try {
//       setStatsLoading(true);
//       const res = await fetchWithAuth(
//         `${BACKEND_URL}/api/adminanalytics/stats`
//       );
//       const data = await res.json();
//       if (data.success) {
//         setStats(data.data);
//       }
//     } catch (err) {
//       console.error("Failed to fetch header stats:", err);
//     } finally {
//       setStatsLoading(false);
//     }
//   };

//   const getPageTitle = () => {
//     const path = location.pathname;
//     if (path.includes("dashboard")) return "Dashboard";
//     if (path.includes("users")) return "User Management";
//     if (path.includes("products")) return "Products";
//     if (path.includes("orders")) return "Orders";
//     if (path.includes("categories")) return "Categories";
//     if (path.includes("notifications")) return "Notifications";
//     if (path.includes("return-requests")) return "Return Requests";
//     if (path.includes("blog")) {
//       if (path.includes("analytics")) return "Blog Analytics";
//       if (path.includes("create")) return "Create Blog Post";
//       if (path.includes("edit")) return "Edit Blog Post";
//       return "Blog Management";
//     }
//     return "Admin Panel";
//   };

//   const refreshStats = () => {
//     fetchHeaderStats();
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
//       <AdminSidebar
//         collapsed={collapsed}
//         setCollapsed={setCollapsed}
//         mobileOpen={mobileOpen}
//         setMobileOpen={setMobileOpen}
//       />

//       <div
//         className={`flex-1 transition-all duration-300 ease-in-out
//           ${collapsed ? "md:ml-20" : "md:ml-64"}
//           max-md:ml-0
//         `}
//       >
//         <div className="sticky top-0 z-40">
//           <AdminTop
//             setMobileOpen={setMobileOpen}
//             pageTitle={getPageTitle()}
//             collapsed={collapsed}
//             setCollapsed={setCollapsed}
//             isMobile={isMobile}
//           />
//         </div>

//         <main className="p-4 md:p-6 lg:p-8 min-h-[calc(100vh-80px)]">
//           <div className="mb-8">
//             <nav className="flex mb-4" aria-label="Breadcrumb">
//               <ol className="inline-flex items-center space-x-1 md:space-x-3">
//                 <li className="inline-flex items-center">
//                   <a
//                     href="/admin/dashboard"
//                     className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors"
//                   >
//                     <svg
//                       className="w-4 h-4 mr-2"
//                       fill="currentColor"
//                       viewBox="0 0 20 20"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
//                     </svg>
//                     Dashboard
//                   </a>
//                 </li>
//                 {location.pathname !== "/admin/dashboard" && (
//                   <li>
//                     <div className="flex items-center">
//                       <svg
//                         className="w-6 h-6 text-slate-600"
//                         fill="currentColor"
//                         viewBox="0 0 20 20"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           fillRule="evenodd"
//                           d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
//                           clipRule="evenodd"
//                         />
//                       </svg>
//                       <span className="ml-1 text-sm font-medium text-white md:ml-2">
//                         {getPageTitle()}
//                       </span>
//                     </div>
//                   </li>
//                 )}
//               </ol>
//             </nav>

//             <div className="flex flex-col md:flex-row md:items-center justify-between">
//               <div>
//                 <h1 className="text-2xl md:text-3xl font-bold text-white">
//                   {getPageTitle()}
//                 </h1>
//                 <p className="mt-2 text-slate-400">
//                   {location.pathname === "/admin/dashboard"
//                     ? "Your store analytics at a glance"
//                     : "Manage your ecommerce store efficiently"}
//                 </p>
//               </div>

//               <div className="mt-4 md:mt-0 flex items-center space-x-4">
//                 <div className="hidden md:flex items-center space-x-4">
//                   {statsLoading ? (
//                     <>
//                       {[1, 2, 3].map((i) => (
//                         <div
//                           key={i}
//                           className="px-4 py-2 bg-slate-800/50 border border-slate-700/30 rounded-lg animate-pulse"
//                         >
//                           <div className="h-4 w-16 bg-slate-700 rounded mb-2"></div>
//                           <div className="h-6 w-12 bg-slate-700 rounded"></div>
//                         </div>
//                       ))}
//                     </>
//                   ) : stats ? (
//                     <>
//                       <div className="px-4 py-2 bg-green-900/20 border border-green-800/30 rounded-lg">
//                         <div className="text-xs text-green-400">Revenue</div>
//                         <div className="text-white font-semibold">
//                           ${stats.revenue?.total?.toFixed(2) || "0.00"}
//                         </div>
//                       </div>
//                       <div className="px-4 py-2 bg-blue-900/20 border border-blue-800/30 rounded-lg">
//                         <div className="text-xs text-blue-400">Orders</div>
//                         <div className="text-white font-semibold">
//                           {stats.orders?.total?.toLocaleString() || "0"}
//                         </div>
//                       </div>
//                       <div className="px-4 py-2 bg-purple-900/20 border border-purple-800/30 rounded-lg">
//                         <div className="text-xs text-purple-400">Users</div>
//                         <div className="text-white font-semibold">
//                           {stats.users?.total?.toLocaleString() || "0"}
//                         </div>
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       <div className="px-4 py-2 bg-slate-800/50 border border-slate-700/30 rounded-lg">
//                         <div className="text-xs text-slate-400">Revenue</div>
//                         <div className="text-white font-semibold">$0.00</div>
//                       </div>
//                       <div className="px-4 py-2 bg-slate-800/50 border border-slate-700/30 rounded-lg">
//                         <div className="text-xs text-slate-400">Orders</div>
//                         <div className="text-white font-semibold">0</div>
//                       </div>
//                     </>
//                   )}
//                 </div>
//                 <button
//                   onClick={refreshStats}
//                   disabled={statsLoading}
//                   className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-white text-sm font-medium transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   {statsLoading ? (
//                     <>
//                       <div className="w-4 h-4 border-2 border-slate-300/30 border-t-white rounded-full animate-spin"></div>
//                       <span>Refreshing...</span>
//                     </>
//                   ) : (
//                     <>
//                       <svg
//                         className="w-4 h-4"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                         xmlns="http://www.w3.org/2000/svg"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
//                         />
//                       </svg>
//                       <span>Refresh</span>
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>

//           <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-xl overflow-hidden">
//             <div className="p-4 md:p-6">
//               <Outlet />
//             </div>
//           </div>

//           <footer className="mt-8 pt-6 border-t border-slate-800">
//             <div className="flex flex-col md:flex-row justify-between items-center">
//               <div className="text-slate-500 text-sm">
//                 © {new Date().getFullYear()} Ecommerce Admin Panel. All rights
//                 reserved.
//               </div>
//               <div className="flex items-center space-x-4 mt-4 md:mt-0">
//                 <a
//                   href="/"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-slate-400 hover:text-white text-sm transition-colors"
//                 >
//                   View Store
//                 </a>
//                 <a
//                   href="/contact"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-slate-400 hover:text-white text-sm transition-colors"
//                 >
//                   Support
//                 </a>
//                 <a
//                   href="/docs"
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-slate-400 hover:text-white text-sm transition-colors"
//                 >
//                   Documentation
//                 </a>
//               </div>
//             </div>
//           </footer>
//         </main>
//       </div>

//       {mobileOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-40 md:hidden"
//           onClick={() => setMobileOpen(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default AdminLayout;
import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminTop from "./AdminTop";
import { fetchWithAuth } from "../utils/auth";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const AdminLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    fetchHeaderStats();
  }, [location.pathname]);

  useEffect(() => {
    if (mobileOpen) {
      setMobileOpen(false);
    }
  }, [location.pathname]);

  const fetchHeaderStats = async () => {
    try {
      setStatsLoading(true);
      const res = await fetchWithAuth(
        `${BACKEND_URL}/api/adminanalytics/stats`
      );
      const data = await res.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch header stats:", err);
    } finally {
      setStatsLoading(false);
    }
  };

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes("dashboard")) return "Dashboard";
    if (path.includes("users")) return "User Management";
    if (path.includes("products")) return "Products";
    if (path.includes("orders")) return "Orders";
    if (path.includes("categories")) return "Categories";
    if (path.includes("notifications")) return "Notifications";
    if (path.includes("return-requests")) return "Return Requests";
    if (path.includes("blog")) {
      if (path.includes("analytics")) return "Blog Analytics";
      if (path.includes("create")) return "Create Blog Post";
      if (path.includes("edit")) return "Edit Blog Post";
      return "Blog Management";
    }
    return "Admin Panel";
  };

  const refreshStats = () => {
    fetchHeaderStats();
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
      <AdminSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div
        className={`flex-1 transition-all duration-300 ease-in-out
          ${collapsed ? "md:ml-20" : "md:ml-64"}
          max-md:ml-0
        `}
      >
        <div className="sticky top-0 z-40">
          <AdminTop
            setMobileOpen={setMobileOpen}
            pageTitle={getPageTitle()}
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            isMobile={isMobile}
          />
        </div>

        <main className="p-4 md:p-6 lg:p-8 min-h-[calc(100vh-80px)]">
          <div className="mb-8">
            <nav className="flex mb-4" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <a
                    href="/admin/dashboard"
                    className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                    Dashboard
                  </a>
                </li>
                {location.pathname !== "/admin/dashboard" && (
                  <li>
                    <div className="flex items-center">
                      <svg
                        className="w-6 h-6 text-slate-400 dark:text-slate-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-1 text-sm font-medium text-slate-900 dark:text-white md:ml-2">
                        {getPageTitle()}
                      </span>
                    </div>
                  </li>
                )}
              </ol>
            </nav>

            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                  {getPageTitle()}
                </h1>
                <p className="mt-2 text-slate-600 dark:text-slate-400">
                  {location.pathname === "/admin/dashboard"
                    ? "Your store analytics at a glance"
                    : "Manage your ecommerce store efficiently"}
                </p>
              </div>

              <div className="mt-4 md:mt-0 flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-4">
                  {statsLoading ? (
                    <>
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="px-4 py-2 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/30 rounded-lg animate-pulse"
                        >
                          <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                          <div className="h-6 w-12 bg-slate-200 dark:bg-slate-700 rounded"></div>
                        </div>
                      ))}
                    </>
                  ) : stats ? (
                    <>
                      <div className="px-4 py-2 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/30 rounded-lg">
                        <div className="text-xs text-green-600 dark:text-green-400">
                          Revenue
                        </div>
                        <div className="text-slate-900 dark:text-white font-semibold">
                          ${stats.revenue?.total?.toFixed(2) || "0.00"}
                        </div>
                      </div>
                      <div className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-lg">
                        <div className="text-xs text-blue-600 dark:text-blue-400">
                          Orders
                        </div>
                        <div className="text-slate-900 dark:text-white font-semibold">
                          {stats.orders?.total?.toLocaleString() || "0"}
                        </div>
                      </div>
                      <div className="px-4 py-2 bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/30 rounded-lg">
                        <div className="text-xs text-purple-600 dark:text-purple-400">
                          Users
                        </div>
                        <div className="text-slate-900 dark:text-white font-semibold">
                          {stats.users?.total?.toLocaleString() || "0"}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/30 rounded-lg">
                        <div className="text-xs text-slate-600 dark:text-slate-400">
                          Revenue
                        </div>
                        <div className="text-slate-900 dark:text-white font-semibold">
                          $0.00
                        </div>
                      </div>
                      <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/30 rounded-lg">
                        <div className="text-xs text-slate-600 dark:text-slate-400">
                          Orders
                        </div>
                        <div className="text-slate-900 dark:text-white font-semibold">
                          0
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <button
                  onClick={refreshStats}
                  disabled={statsLoading}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-white text-sm font-medium transition-all duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {statsLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-slate-400/30 border-t-slate-600 dark:border-t-white rounded-full animate-spin"></div>
                      <span>Refreshing...</span>
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
                      <span>Refresh</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-2xl shadow-xl overflow-hidden">
            <div className="">
              <Outlet />
            </div>
          </div>

          <footer className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-slate-500 dark:text-slate-400 text-sm">
                © {new Date().getFullYear()} Ecommerce Admin Panel. All rights
                reserved.
              </div>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm transition-colors"
                >
                  View Store
                </a>
                <a
                  href="/contact"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm transition-colors"
                >
                  Support
                </a>
                <a
                  href="/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm transition-colors"
                >
                  Documentation
                </a>
              </div>
            </div>
          </footer>
        </main>
      </div>

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;
