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
// } from "react-icons/fa";
// import { fetchWithAuth } from "../utils/auth";
// import toast from "react-hot-toast";

// const BACKEND_URL = import.meta.env.VITE_API_URL;

// const AdminSidebar = ({
//   collapsed,
//   setCollapsed,
//   mobileOpen,
//   setMobileOpen,
// }) => {
//   const location = useLocation();
//   const [showLogout, setShowLogout] = useState(false);
//   const [pendingReturns, setPendingReturns] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);

//   const menu = [
//     { name: "Dashboard", path: "/admin/dashboard", icon: <FaTachometerAlt /> },
//     { name: "Users", path: "/admin/users", icon: <FaUsers /> },
//     { name: "Products", path: "/admin/products", icon: <FaBox /> },
//     { name: "Add Product", path: "/admin/products/add", icon: <FaPlus /> },
//     { name: "Orders", path: "/admin/orders", icon: <FaShoppingCart /> },
//     { name: "Notifications", path: "/admin/notifications", icon: <FaBell /> },
//     { name: "Categories", path: "/admin/categories", icon: <FaBox /> },
//     { name: "Add Category", path: "/admin/categories/add", icon: <FaPlus /> },
//     // New Return Requests Menu Item
//     {
//       name: "Return Requests",
//       path: "/admin/return-requests",
//       icon: <FaUndo />,
//     },
//   ];

//   // Fetch pending return requests count with error handling
//   const fetchPendingReturns = async () => {
//     try {
//       setIsLoading(true);

//       // First, test if the endpoint exists
//       const testRes = await fetch(`${BACKEND_URL}/api/return-requests/test`);
//       if (testRes.ok) {
//         const testData = await testRes.json();
//         console.log("✅ Return routes test:", testData);
//       }

//       // Now fetch the stats
//       const res = await fetchWithAuth(
//         `${BACKEND_URL}/api/return-requests/admin/stats`
//       );

//       // Check if response is OK
//       if (!res.ok) {
//         const errorText = await res.text();
//         console.error("❌ Server error response:", errorText.substring(0, 200));

//         if (res.status === 404) {
//           console.warn(
//             "⚠️ Return stats endpoint not found. Check if route exists."
//           );
//           setPendingReturns(0);
//           setIsLoading(false);
//           return;
//         }

//         throw new Error(`HTTP ${res.status}: ${res.statusText}`);
//       }

//       // Check content type
//       const contentType = res.headers.get("content-type");
//       if (!contentType || !contentType.includes("application/json")) {
//         const text = await res.text();
//         console.error("❌ Non-JSON response received:", text.substring(0, 200));
//         throw new Error("Server returned non-JSON response");
//       }

//       const data = await res.json();
//       console.log("📊 Return stats data:", data);

//       if (data.success) {
//         // Calculate pending requests (pending + under_review)
//         let pendingCount = 0;
//         if (data.data && data.data.statusStats) {
//           data.data.statusStats.forEach((stat) => {
//             if (stat.status === "pending" || stat.status === "under_review") {
//               pendingCount += stat.count || 0;
//             }
//           });
//         }
//         console.log(`📦 Found ${pendingCount} pending return requests`);
//         setPendingReturns(pendingCount);
//       } else {
//         console.warn("⚠️ API returned unsuccessful:", data.message);
//         setPendingReturns(0);
//       }
//     } catch (error) {
//       console.error("❌ Failed to fetch pending returns:", error.message);

//       // Show user-friendly error only on first load
//       if (isLoading) {
//         toast.error("Unable to load return requests count");
//       }

//       setPendingReturns(0);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPendingReturns();

//     // Refresh every 60 seconds
//     const interval = setInterval(fetchPendingReturns, 60000);
//     return () => clearInterval(interval);
//   }, []);

//   // Manually refresh function
//   const refreshReturnsCount = () => {
//     toast.promise(fetchPendingReturns(), {
//       loading: "Refreshing return requests...",
//       success: "Return requests count updated",
//       error: "Failed to refresh",
//     });
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     sessionStorage.clear();
//     window.location.href = "/login";
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
//       {/* Logo / Collapse */}
//       <div
//         className={`flex items-center justify-between border-b border-slate-700/50 p-4
//           ${collapsed ? "flex-col gap-2 text-center" : "flex-row"}
//         `}
//       >
//         <div
//           className={`flex items-center gap-3 ${collapsed ? "flex-col" : ""}`}
//         >
//           <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
//             <span className="text-white font-bold text-lg">A</span>
//           </div>
//           {!collapsed && (
//             <div>
//               <h1 className="text-green-400 font-bold text-xl">Admin Panel</h1>
//               <p className="text-slate-400 text-xs">E-commerce Dashboard</p>
//             </div>
//           )}
//         </div>

//         {/* Collapse button desktop */}
//         <button
//           className="md:block hidden mt-2 p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
//           onClick={() => setCollapsed(!collapsed)}
//           aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
//         >
//           <FaBars />
//         </button>

//         {/* Close button mobile */}
//         <button
//           className="md:hidden mt-2 p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
//           onClick={() => setMobileOpen(false)}
//           aria-label="Close sidebar"
//         >
//           ✕
//         </button>
//       </div>

//       {/* Refresh button */}
//       {!collapsed && (
//         <div className="px-4 pt-4">
//           <button
//             onClick={refreshReturnsCount}
//             disabled={isLoading}
//             className="w-full py-2 px-4 bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {isLoading ? (
//               <>
//                 <div className="w-4 h-4 border-2 border-slate-300/30 border-t-white rounded-full animate-spin"></div>
//                 <span>Loading...</span>
//               </>
//             ) : (
//               <>
//                 <svg
//                   className="w-4 h-4"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
//                   />
//                 </svg>
//                 <span>Refresh Returns</span>
//               </>
//             )}
//           </button>
//         </div>
//       )}

//       {/* Menu */}
//       <nav className="mt-4 flex-1 px-2">
//         {menu.map((item) => {
//           const active = location.pathname === item.path;
//           const isReturnRequests = item.path === "/admin/return-requests";

//           return (
//             <Link
//               key={item.path}
//               to={item.path}
//               className={`flex items-center gap-4 py-3 px-4 mb-2 rounded-xl relative group
//                 transition-all duration-200
//                 ${
//                   active
//                     ? "bg-gradient-to-r from-green-600/20 to-emerald-600/20 text-green-400 border-l-4 border-green-500"
//                     : "text-slate-300 hover:bg-slate-700/50 hover:text-white hover:border-l-4 hover:border-slate-500"
//                 }
//               `}
//               onClick={() => setMobileOpen(false)}
//             >
//               <div
//                 className={`${active ? "text-green-400" : "text-slate-400 group-hover:text-white"}`}
//               >
//                 {item.icon}
//               </div>

//               {!collapsed && (
//                 <div className="flex items-center justify-between w-full overflow-hidden">
//                   <span className="font-medium truncate">{item.name}</span>

//                   {isReturnRequests && pendingReturns > 0 && (
//                     <div className="flex items-center">
//                       <span className="bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center px-1.5 animate-pulse shadow-lg">
//                         {pendingReturns}
//                       </span>
//                     </div>
//                   )}

//                   {isReturnRequests && pendingReturns === 0 && !isLoading && (
//                     <span className="text-slate-500 text-xs">0</span>
//                   )}

//                   {isReturnRequests && isLoading && (
//                     <div className="w-4 h-4 border-2 border-slate-300/30 border-t-white rounded-full animate-spin"></div>
//                   )}
//                 </div>
//               )}

//               {/* Show badge for collapsed sidebar */}
//               {collapsed && isReturnRequests && pendingReturns > 0 && (
//                 <span className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse shadow-lg">
//                   {pendingReturns > 9 ? "9+" : pendingReturns}
//                 </span>
//               )}

//               {/* Tooltip for collapsed sidebar */}
//               {collapsed && (
//                 <div className="absolute left-full ml-2 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 shadow-xl">
//                   {item.name}
//                   {isReturnRequests && pendingReturns > 0 && (
//                     <div className="mt-1 text-rose-300 font-semibold">
//                       {pendingReturns} pending
//                     </div>
//                   )}
//                 </div>
//               )}
//             </Link>
//           );
//         })}
//       </nav>

//       {/* User info & Logout */}
//       <div className="border-t border-slate-700/50 p-4">
//         <div
//           className={`flex items-center gap-3 mb-4 ${collapsed ? "justify-center" : ""}`}
//         >
//           <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
//             <span className="text-white font-bold">AD</span>
//           </div>

//           {!collapsed && (
//             <div className="flex-1 overflow-hidden">
//               <p className="text-white font-medium truncate">Administrator</p>
//               <p className="text-slate-400 text-xs truncate">
//                 admin@example.com
//               </p>
//             </div>
//           )}
//         </div>

//         <button
//           className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-lg
//             bg-gradient-to-r from-rose-600/20 to-pink-600/20
//             text-rose-400 hover:text-white hover:from-rose-600/40 hover:to-pink-600/40
//             border border-rose-700/30 hover:border-rose-500/50
//             transition-all duration-200
//             ${collapsed ? "px-2" : "px-4"}
//           `}
//           onClick={handleLogout}
//           aria-label="Logout"
//         >
//           {!collapsed && "Logout"}
//           <svg
//             className="w-5 h-5"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
//             />
//           </svg>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminSidebar;

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
} from "react-icons/fa";
import { fetchWithAuth } from "../utils/auth";
import toast from "react-hot-toast";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const AdminSidebar = ({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}) => {
  const location = useLocation();
  const [showLogout, setShowLogout] = useState(false);
  const [pendingReturns, setPendingReturns] = useState(0);
  const [pendingComments, setPendingComments] = useState(0);
  const [draftPosts, setDraftPosts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const menu = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FaTachometerAlt /> },
    { name: "Users", path: "/admin/users", icon: <FaUsers /> },
    { name: "Products", path: "/admin/products", icon: <FaBox /> },
    { name: "Add Product", path: "/admin/products/add", icon: <FaPlus /> },
    { name: "Orders", path: "/admin/orders", icon: <FaShoppingCart /> },
    { name: "Notifications", path: "/admin/notifications", icon: <FaBell /> },
    { name: "Categories", path: "/admin/categories", icon: <FaBox /> },
    { name: "Add Category", path: "/admin/categories/add", icon: <FaPlus /> },
    // New Return Requests Menu Item
    {
      name: "Return Requests",
      path: "/admin/return-requests",
      icon: <FaUndo />,
    },
    // Blog Management Items
    {
      name: "Blog Posts",
      path: "/admin/blog",
      icon: <FaNewspaper />,
    },
    {
      name: "Add Blog Post",
      path: "/admin/blog/create",
      icon: <FaPenAlt />,
    },
    {
      name: "Blog Analytics",
      path: "/admin/blog/analytics",
      icon: <FaChartBar />,
    },
  ];

  // Fetch stats
  const fetchStats = async () => {
    try {
      setIsLoading(true);

      // Fetch pending returns
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

      // Fetch blog stats
      try {
        const blogRes = await fetchWithAuth(
          `${BACKEND_URL}/api/blog/stats/all`
        );
        if (blogRes.ok) {
          const blogData = await blogRes.json();
          if (blogData.success) {
            setDraftPosts(blogData.data.draftPosts || 0);
            // You can also get pending comments here if you implement comment moderation
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

    // Refresh every 60 seconds
    const interval = setInterval(fetchStats, 60000);
    return () => clearInterval(interval);
  }, []);

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

  // Check if menu item is active
  const isActive = (path) => {
    if (path === "/admin/dashboard") {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div
      className={`bg-gradient-to-b from-slate-900 to-slate-800 fixed top-0 left-0 h-full z-50 px-4
        transition-all duration-300 shadow-xl
        ${collapsed ? "w-20" : "w-64"}
        max-md:fixed max-md:top-0 max-md:left-0
        ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
    >
      {/* Logo / Collapse */}
      <div
        className={`flex items-center justify-between border-b border-slate-700/50 p-4
          ${collapsed ? "flex-col gap-2 text-center" : "flex-row"}
        `}
      >
        <div
          className={`flex items-center gap-3 ${collapsed ? "flex-col" : ""}`}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-green-400 font-bold text-xl">Admin Panel</h1>
              <p className="text-slate-400 text-xs">E-commerce Dashboard</p>
            </div>
          )}
        </div>

        {/* Collapse button desktop */}
        <button
          className="md:block hidden mt-2 p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <FaBars />
        </button>

        {/* Close button mobile */}
        <button
          className="md:hidden mt-2 p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
          onClick={() => setMobileOpen(false)}
          aria-label="Close sidebar"
        >
          ✕
        </button>
      </div>

      {/* Refresh button */}
      {!collapsed && (
        <div className="px-4 pt-4">
          <button
            onClick={refreshStats}
            disabled={isLoading}
            className="w-full py-2 px-4 bg-slate-700/50 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-300/30 border-t-white rounded-full animate-spin"></div>
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

      {/* Menu */}
      <nav className="mt-4 flex-1 px-2">
        {menu.map((item) => {
          const active = isActive(item.path);
          const isReturnRequests = item.path === "/admin/return-requests";
          const isBlogPosts = item.path === "/admin/blog";
          const isAddBlogPost = item.path === "/admin/blog/create";

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 py-3 px-4 mb-2 rounded-xl relative group
                transition-all duration-200
                ${
                  active
                    ? "bg-gradient-to-r from-green-600/20 to-emerald-600/20 text-green-400 border-l-4 border-green-500"
                    : "text-slate-300 hover:bg-slate-700/50 hover:text-white hover:border-l-4 hover:border-slate-500"
                }
              `}
              onClick={() => setMobileOpen(false)}
            >
              <div
                className={`${active ? "text-green-400" : "text-slate-400 group-hover:text-white"}`}
              >
                {item.icon}
              </div>

              {!collapsed && (
                <div className="flex items-center justify-between w-full overflow-hidden">
                  <span className="font-medium truncate">{item.name}</span>

                  {/* Return Requests Badge */}
                  {isReturnRequests && pendingReturns > 0 && (
                    <div className="flex items-center">
                      <span className="bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center px-1.5 animate-pulse shadow-lg">
                        {pendingReturns}
                      </span>
                    </div>
                  )}

                  {/* Blog Drafts Badge */}
                  {isBlogPosts && draftPosts > 0 && (
                    <div className="flex items-center">
                      <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center px-1.5 shadow-lg">
                        {draftPosts}
                      </span>
                    </div>
                  )}

                  {/* Blog Add Indicator */}
                  {isAddBlogPost && (
                    <div className="flex items-center">
                      <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-bold rounded-full min-w-5 h-5 flex items-center justify-center px-1.5 shadow-lg">
                        +
                      </span>
                    </div>
                  )}

                  {isReturnRequests && pendingReturns === 0 && !isLoading && (
                    <span className="text-slate-500 text-xs">0</span>
                  )}
                </div>
              )}

              {/* Show badge for collapsed sidebar */}
              {collapsed && (
                <>
                  {isReturnRequests && pendingReturns > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse shadow-lg">
                      {pendingReturns > 9 ? "9+" : pendingReturns}
                    </span>
                  )}
                  {isBlogPosts && draftPosts > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                      {draftPosts > 9 ? "9+" : draftPosts}
                    </span>
                  )}
                  {isAddBlogPost && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                      +
                    </span>
                  )}
                </>
              )}

              {/* Tooltip for collapsed sidebar */}
              {collapsed && (
                <div className="absolute left-full ml-2 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 shadow-xl">
                  {item.name}
                  {isReturnRequests && pendingReturns > 0 && (
                    <div className="mt-1 text-rose-300 font-semibold">
                      {pendingReturns} pending
                    </div>
                  )}
                  {isBlogPosts && draftPosts > 0 && (
                    <div className="mt-1 text-yellow-300 font-semibold">
                      {draftPosts} drafts
                    </div>
                  )}
                </div>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User info & Logout */}
      <div className="border-t border-slate-700/50 p-4">
        <div
          className={`flex items-center gap-3 mb-4 ${collapsed ? "justify-center" : ""}`}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold">AD</span>
          </div>

          {!collapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="text-white font-medium truncate">Administrator</p>
              <p className="text-slate-400 text-xs truncate">
                admin@example.com
              </p>
            </div>
          )}
        </div>

        <button
          className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-lg 
            bg-gradient-to-r from-rose-600/20 to-pink-600/20
            text-rose-400 hover:text-white hover:from-rose-600/40 hover:to-pink-600/40
            border border-rose-700/30 hover:border-rose-500/50
            transition-all duration-200
            ${collapsed ? "px-2" : "px-4"}
          `}
          onClick={handleLogout}
          aria-label="Logout"
        >
          {!collapsed && "Logout"}
          <svg
            className="w-5 h-5"
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
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
