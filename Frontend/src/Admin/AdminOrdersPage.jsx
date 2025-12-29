// // import { useEffect, useState } from "react";
// // import Select from "react-select";
// // import { fetchWithAuth } from "../utils/auth";

// // const BACKEND_URL = import.meta.env.VITE_API_URL;

// // const statusOptions = [
// //   { value: "pending", label: "Pending" },
// //   { value: "processing", label: "Processing" },
// //   { value: "shipped", label: "Shipped" },
// //   { value: "delivered", label: "Delivered" },
// //   { value: "cancelled", label: "Cancelled" },
// //   { value: "on_hold", label: "On Hold" },
// //   { value: "refunded", label: "Refunded" },
// // ];

// // export default function AdminOrdersPage() {
// //   const [orders, setOrders] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [stats, setStats] = useState(null);
// //   const [filters, setFilters] = useState({
// //     status: "all",
// //     search: "",
// //     sort: "newest",
// //   });

// //   const fetchOrders = async () => {
// //     try {
// //       setLoading(true);
// //       // Build query string from filters
// //       const queryParams = new URLSearchParams();
// //       if (filters.status !== "all")
// //         queryParams.append("status", filters.status);
// //       if (filters.search) queryParams.append("search", filters.search);
// //       queryParams.append("sort", filters.sort);

// //       const url = `${BACKEND_URL}/api/orders/all?${queryParams.toString()}`;
// //       const res = await fetchWithAuth(url);

// //       if (!res.ok) {
// //         throw new Error(`HTTP error! status: ${res.status}`);
// //       }

// //       const response = await res.json();

// //       if (response.success) {
// //         // The orders are now in response.data
// //         setOrders(response.data || []);
// //         setStats(response.stats || null);
// //       } else {
// //         console.error("API error:", response.message);
// //         setOrders([]);
// //       }
// //     } catch (err) {
// //       console.log("Fetch error:", err);
// //       setOrders([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchOrders();
// //   }, [filters]);

// //   const updateStatus = async (orderId, newStatus) => {
// //     try {
// //       const res = await fetchWithAuth(
// //         `${BACKEND_URL}/api/orders/${orderId}/status`,
// //         {
// //           method: "PUT",
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //           body: JSON.stringify({ status: newStatus }),
// //         }
// //       );

// //       if (!res.ok) {
// //         const error = await res.json();
// //         alert(error.message || "Failed to update status");
// //         return;
// //       }

// //       const result = await res.json();
// //       if (result.success) {
// //         alert("Order status updated successfully!");
// //         fetchOrders(); // refresh
// //       } else {
// //         alert(result.message || "Failed to update status");
// //       }
// //     } catch (err) {
// //       console.log("Update error:", err);
// //       alert("Network error. Please try again.");
// //     }
// //   };

// //   // Handle status filter change
// //   const handleStatusFilter = (value) => {
// //     setFilters((prev) => ({ ...prev, status: value }));
// //   };

// //   // Handle search
// //   const handleSearch = (e) => {
// //     setFilters((prev) => ({ ...prev, search: e.target.value }));
// //   };

// //   // Handle sort
// //   const handleSort = (value) => {
// //     setFilters((prev) => ({ ...prev, sort: value }));
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen text-white flex justify-center items-center">
// //         <div className="text-center">
// //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
// //           <p>Loading orders...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen text-white p-4 md:p-8">
// //       <div className="max-w-7xl mx-auto">
// //         {/* Header */}
// //         <div className="mb-8">
// //           <h1 className="text-4xl font-bold mb-2 text-green-400">
// //             Admin Orders
// //           </h1>
// //           <p className="text-gray-400">Manage and track all customer orders</p>
// //         </div>

// //         {/* Stats & Filters */}
// //         <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
// //           <div className="bg-slate-800 p-4 rounded-lg">
// //             <h3 className="text-lg font-semibold mb-2">Total Orders</h3>
// //             <p className="text-3xl font-bold text-green-400">
// //               {stats?.totalOrders || 0}
// //             </p>
// //           </div>

// //           <div className="bg-slate-800 p-4 rounded-lg">
// //             <h3 className="text-lg font-semibold mb-2">Today's Orders</h3>
// //             <p className="text-3xl font-bold text-blue-400">
// //               {stats?.todayOrders || 0}
// //             </p>
// //           </div>

// //           {/* Search */}
// //           <div className="md:col-span-2">
// //             <div className="bg-slate-800 p-4 rounded-lg">
// //               <input
// //                 type="text"
// //                 placeholder="Search by order number, customer name, or email..."
// //                 value={filters.search}
// //                 onChange={handleSearch}
// //                 className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
// //               />
// //             </div>
// //           </div>
// //         </div>

// //         {/* Filters */}
// //         <div className="mb-6 flex flex-wrap gap-4">
// //           <div>
// //             <label className="block text-sm font-medium mb-2">
// //               Status Filter:
// //             </label>
// //             <select
// //               value={filters.status}
// //               onChange={(e) => handleStatusFilter(e.target.value)}
// //               className="bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
// //             >
// //               <option value="all">All Statuses</option>
// //               <option value="pending">Pending</option>
// //               <option value="processing">Processing</option>
// //               <option value="shipped">Shipped</option>
// //               <option value="delivered">Delivered</option>
// //               <option value="cancelled">Cancelled</option>
// //             </select>
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium mb-2">Sort By:</label>
// //             <select
// //               value={filters.sort}
// //               onChange={(e) => handleSort(e.target.value)}
// //               className="bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
// //             >
// //               <option value="newest">Newest First</option>
// //               <option value="oldest">Oldest First</option>
// //               <option value="total_high">Total: High to Low</option>
// //               <option value="total_low">Total: Low to High</option>
// //             </select>
// //           </div>
// //         </div>

// //         {/* Orders Grid */}
// //         {orders.length === 0 ? (
// //           <div className="text-center py-12">
// //             <div className="text-6xl mb-4">📦</div>
// //             <p className="text-gray-400 text-xl">No orders found</p>
// //             {filters.status !== "all" || filters.search ? (
// //               <button
// //                 onClick={() =>
// //                   setFilters({ status: "all", search: "", sort: "newest" })
// //                 }
// //                 className="mt-4 px-6 py-2 bg-green-500 hover:bg-green-600 rounded-lg transition-colors"
// //               >
// //                 Clear Filters
// //               </button>
// //             ) : null}
// //           </div>
// //         ) : (
// //           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
// //             {orders.map((order) => (
// //               <div
// //                 key={order._id}
// //                 className={`p-6 rounded-2xl shadow-lg border transition-all bg-slate-800
// //                   ${
// //                     order.status === "delivered"
// //                       ? "border-green-500"
// //                       : order.status === "cancelled"
// //                         ? "border-red-500"
// //                         : order.status === "processing"
// //                           ? "border-blue-500"
// //                           : "border-yellow-500"
// //                   }
// //                   hover:shadow-xl hover:scale-[1.02] transition-all duration-300`}
// //               >
// //                 {/* Order Header */}
// //                 <div className="mb-4">
// //                   <h2 className="text-xl font-bold mb-2 text-white">
// //                     Order #{order.orderNumber || order._id.slice(-8)}
// //                   </h2>

// //                   <div className="flex items-center justify-between">
// //                     <div>
// //                       <p className="text-gray-300 text-sm">
// //                         {new Date(order.createdAt).toLocaleDateString()} •
// //                         {new Date(order.createdAt).toLocaleTimeString()}
// //                       </p>
// //                     </div>
// //                     <span
// //                       className={`px-3 py-1 rounded-full text-sm font-medium
// //                       ${
// //                         order.status === "delivered"
// //                           ? "bg-green-500/20 text-green-300"
// //                           : order.status === "processing"
// //                             ? "bg-blue-500/20 text-blue-300"
// //                             : order.status === "shipped"
// //                               ? "bg-purple-500/20 text-purple-300"
// //                               : order.status === "cancelled"
// //                                 ? "bg-red-500/20 text-red-300"
// //                                 : "bg-yellow-500/20 text-yellow-300"
// //                       }`}
// //                     >
// //                       {order.status.charAt(0).toUpperCase() +
// //                         order.status.slice(1)}
// //                     </span>
// //                   </div>
// //                 </div>

// //                 {/* Customer Info */}
// //                 <div className="mb-4 p-3 bg-slate-700/50 rounded-lg">
// //                   <p className="font-medium text-white mb-1">
// //                     {order.user?.name || "Customer"}
// //                   </p>
// //                   <p className="text-gray-400 text-sm">{order.user?.email}</p>
// //                   {order.user?.phone && (
// //                     <p className="text-gray-400 text-sm">{order.user.phone}</p>
// //                   )}
// //                 </div>

// //                 {/* Order Items */}
// //                 <div className="mb-4">
// //                   <h3 className="font-semibold mb-2 text-white">Items:</h3>
// //                   <div className="space-y-2 max-h-32 overflow-y-auto">
// //                     {order.items.map((item, i) => (
// //                       <div
// //                         key={i}
// //                         className="flex justify-between items-center bg-slate-700/30 p-2 rounded"
// //                       >
// //                         <div>
// //                           <p className="font-medium text-sm">
// //                             {item.productName ||
// //                               item.product?.name ||
// //                               `Item ${i + 1}`}
// //                           </p>
// //                           <p className="text-xs text-gray-400">
// //                             Qty: {item.quantity} × ${item.price}
// //                           </p>
// //                         </div>
// //                         <p className="font-semibold">
// //                           ${(item.price * item.quantity).toFixed(2)}
// //                         </p>
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>

// //                 {/* Order Total */}
// //                 <div className="mb-4 pt-3 border-t border-slate-700">
// //                   <div className="flex justify-between items-center">
// //                     <span className="font-semibold text-lg">Total:</span>
// //                     <span className="text-2xl font-bold text-green-400">
// //                       ${order.total?.toFixed(2) || "0.00"}
// //                     </span>
// //                   </div>
// //                 </div>

// //                 {/* Status Control */}
// //                 <div className="mt-4">
// //                   <label className="font-semibold mb-2 block text-white">
// //                     Update Status:
// //                   </label>
// //                   <Select
// //                     options={statusOptions}
// //                     value={statusOptions.find((s) => s.value === order.status)}
// //                     onChange={(opt) => updateStatus(order._id, opt.value)}
// //                     className="text-black rounded"
// //                     styles={{
// //                       control: (base) => ({
// //                         ...base,
// //                         backgroundColor: "#1e293b",
// //                         borderColor: "#334155",
// //                         padding: "2px",
// //                         color: "white",
// //                       }),
// //                       singleValue: (base) => ({
// //                         ...base,
// //                         color: "white",
// //                       }),
// //                       menu: (base) => ({
// //                         ...base,
// //                         backgroundColor: "#1e293b",
// //                         color: "white",
// //                       }),
// //                       option: (base, state) => ({
// //                         ...base,
// //                         backgroundColor: state.isSelected
// //                           ? "#22c55e"
// //                           : state.isFocused
// //                             ? "#334155"
// //                             : "#1e293b",
// //                         color: "white",
// //                       }),
// //                     }}
// //                   />
// //                 </div>

// //                 {/* Actions */}
// //                 <div className="mt-4 flex gap-2">
// //                   <button
// //                     onClick={() =>
// //                       (window.location.href = `/admin/orders/${order._id}`)
// //                     }
// //                     className="flex-1 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors text-sm"
// //                   >
// //                     View Details
// //                   </button>
// //                   {order.trackingNumber && (
// //                     <button
// //                       onClick={() =>
// //                         window.open(
// //                           `https://tracking.com/${order.trackingNumber}`,
// //                           "_blank"
// //                         )
// //                       }
// //                       className="flex-1 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors text-sm"
// //                     >
// //                       Track
// //                     </button>
// //                   )}
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }
// import { useEffect, useState, useRef } from "react";
// import Select from "react-select";
// import { fetchWithAuth } from "../utils/auth";
// import {
//   Package,
//   Search,
//   Filter,
//   Calendar,
//   DollarSign,
//   User,
//   Phone,
//   Mail,
//   Truck,
//   CheckCircle,
//   Clock,
//   XCircle,
//   RefreshCw,
//   TrendingUp,
//   ExternalLink,
//   ChevronDown,
//   ChevronUp,
//   Download,
// } from "lucide-react";

// const BACKEND_URL = import.meta.env.VITE_API_URL;

// const statusOptions = [
//   { value: "pending", label: "Pending", color: "#f59e0b", icon: Clock },
//   {
//     value: "processing",
//     label: "Processing",
//     color: "#3b82f6",
//     icon: RefreshCw,
//   },
//   { value: "shipped", label: "Shipped", color: "#8b5cf6", icon: Truck },
//   {
//     value: "delivered",
//     label: "Delivered",
//     color: "#10b981",
//     icon: CheckCircle,
//   },
//   { value: "cancelled", label: "Cancelled", color: "#ef4444", icon: XCircle },
//   { value: "on_hold", label: "On Hold", color: "#6b7280", icon: Clock },
//   { value: "refunded", label: "Refunded", color: "#ec4899", icon: DollarSign },
// ];

// export default function AdminOrdersPage() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [pageLoading, setPageLoading] = useState(true);
//   const [stats, setStats] = useState(null);
//   const [filters, setFilters] = useState({
//     status: "all",
//     search: "",
//     sort: "newest",
//   });
//   const [expandedOrder, setExpandedOrder] = useState(null);
//   const [theme, setTheme] = useState(() => {
//     const savedTheme = localStorage.getItem("admin-orders-theme");
//     if (savedTheme) return savedTheme;
//     return window.matchMedia("(prefers-color-scheme: dark)").matches
//       ? "dark"
//       : "light";
//   });
//   const [showFilters, setShowFilters] = useState(false);

//   const ordersRef = useRef([]);
//   const observerRefs = useRef([]);

//   // Theme classes
//   const themeClasses = {
//     container:
//       theme === "dark"
//         ? "bg-gradient-to-br from-slate-900 to-slate-950"
//         : "bg-gradient-to-br from-gray-50 to-gray-100",
//     text: theme === "dark" ? "text-white" : "text-gray-900",
//     textMuted: theme === "dark" ? "text-gray-400" : "text-gray-600",
//     textSecondary: theme === "dark" ? "text-gray-300" : "text-gray-700",
//     card: theme === "dark" ? "bg-slate-800/80" : "bg-white/90",
//     cardHover: theme === "dark" ? "hover:bg-slate-800/90" : "hover:bg-white",
//     border: theme === "dark" ? "border-slate-700/50" : "border-gray-200/70",
//     input:
//       theme === "dark"
//         ? "bg-slate-800 border-slate-700 text-white"
//         : "bg-white border-gray-300 text-gray-900",
//     statCard:
//       theme === "dark"
//         ? "bg-slate-800/50 border-slate-700/50"
//         : "bg-white/70 border-gray-200/70",
//     dropdown:
//       theme === "dark"
//         ? "bg-slate-800 border-slate-700"
//         : "bg-white border-gray-300",
//     buttonPrimary:
//       theme === "dark"
//         ? "bg-green-500 hover:bg-green-600 text-white"
//         : "bg-green-600 hover:bg-green-700 text-white",
//     buttonSecondary:
//       theme === "dark"
//         ? "bg-slate-700 hover:bg-slate-600 text-white"
//         : "bg-gray-200 hover:bg-gray-300 text-gray-800",
//   };

//   // Toggle theme
//   const toggleTheme = () => {
//     const newTheme = theme === "dark" ? "light" : "dark";
//     setTheme(newTheme);
//     localStorage.setItem("admin-orders-theme", newTheme);
//     if (newTheme === "dark") {
//       document.documentElement.classList.add("dark");
//       document.documentElement.classList.remove("light");
//     } else {
//       document.documentElement.classList.add("light");
//       document.documentElement.classList.remove("dark");
//     }
//   };

//   // Apply theme on mount
//   useEffect(() => {
//     if (theme === "dark") {
//       document.documentElement.classList.add("dark");
//       document.documentElement.classList.remove("light");
//     } else {
//       document.documentElement.classList.add("light");
//       document.documentElement.classList.remove("dark");
//     }
//   }, [theme]);

//   // Intersection Observer for scroll animations
//   useEffect(() => {
//     const observerOptions = {
//       threshold: 0.1,
//       rootMargin: "0px 0px -50px 0px",
//     };

//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add("animate-slide-up");
//           observer.unobserve(entry.target);
//         }
//       });
//     }, observerOptions);

//     // Observe all order cards
//     const orderCards = document.querySelectorAll(".order-card");
//     orderCards.forEach((card) => observer.observe(card));

//     // Observe stat cards
//     const statCards = document.querySelectorAll(".stat-card");
//     statCards.forEach((card) => observer.observe(card));

//     return () => {
//       orderCards.forEach((card) => observer.unobserve(card));
//       statCards.forEach((card) => observer.unobserve(card));
//     };
//   }, [orders, stats]);

//   // Page load animation
//   useEffect(() => {
//     if (!loading) {
//       setTimeout(() => {
//         setPageLoading(false);
//       }, 300);
//     }
//   }, [loading]);

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       const queryParams = new URLSearchParams();
//       if (filters.status !== "all")
//         queryParams.append("status", filters.status);
//       if (filters.search) queryParams.append("search", filters.search);
//       queryParams.append("sort", filters.sort);

//       const url = `${BACKEND_URL}/api/orders/all?${queryParams.toString()}`;
//       const res = await fetchWithAuth(url);

//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }

//       const response = await res.json();

//       if (response.success) {
//         setOrders(response.data || []);
//         setStats(response.stats || null);
//       } else {
//         console.error("API error:", response.message);
//         setOrders([]);
//       }
//     } catch (err) {
//       console.log("Fetch error:", err);
//       setOrders([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, [filters]);

//   const updateStatus = async (orderId, newStatus) => {
//     try {
//       const res = await fetchWithAuth(
//         `${BACKEND_URL}/api/orders/${orderId}/status`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ status: newStatus }),
//         }
//       );

//       if (!res.ok) {
//         const error = await res.json();
//         alert(error.message || "Failed to update status");
//         return;
//       }

//       const result = await res.json();
//       if (result.success) {
//         alert("Order status updated successfully!");
//         fetchOrders();
//       } else {
//         alert(result.message || "Failed to update status");
//       }
//     } catch (err) {
//       console.log("Update error:", err);
//       alert("Network error. Please try again.");
//     }
//   };

//   const handleStatusFilter = (value) => {
//     setFilters((prev) => ({ ...prev, status: value }));
//   };

//   const handleSearch = (e) => {
//     setFilters((prev) => ({ ...prev, search: e.target.value }));
//   };

//   const handleSort = (value) => {
//     setFilters((prev) => ({ ...prev, sort: value }));
//   };

//   const toggleOrderExpand = (orderId) => {
//     setExpandedOrder(expandedOrder === orderId ? null : orderId);
//   };

//   const exportOrders = () => {
//     const csvContent = [
//       ["Order ID", "Customer", "Email", "Phone", "Total", "Status", "Date"],
//       ...orders.map((order) => [
//         order.orderNumber || order._id,
//         order.user?.name || "N/A",
//         order.user?.email || "N/A",
//         order.user?.phone || "N/A",
//         `$${order.total?.toFixed(2) || "0.00"}`,
//         order.status,
//         new Date(order.createdAt).toLocaleDateString(),
//       ]),
//     ]
//       .map((row) => row.join(","))
//       .join("\n");

//     const blob = new Blob([csvContent], { type: "text/csv" });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `orders_${new Date().toISOString().split("T")[0]}.csv`;
//     a.click();
//   };

//   // Get status color
//   const getStatusColor = (status) => {
//     const statusOption = statusOptions.find((opt) => opt.value === status);
//     return statusOption ? statusOption.color : "#6b7280";
//   };

//   // Get status icon
//   const getStatusIcon = (status) => {
//     const statusOption = statusOptions.find((opt) => opt.value === status);
//     const Icon = statusOption ? statusOption.icon : Package;
//     return <Icon size={16} />;
//   };

//   if (pageLoading) {
//     return (
//       <div
//         className={`min-h-screen ${themeClasses.container} ${themeClasses.text} flex justify-center items-center`}
//       >
//         <div className="text-center">
//           <div className="relative">
//             <div className="w-20 h-20 border-4 border-transparent border-t-green-500 border-r-green-500 rounded-full animate-spin mx-auto mb-6"></div>
//             <Package
//               className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-500"
//               size={24}
//             />
//           </div>
//           <p className="text-lg font-medium mt-4 animate-pulse">
//             Loading orders...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div
//       className={`min-h-screen transition-all duration-500 ${themeClasses.container} ${themeClasses.text} p-3 sm:p-4 md:p-6 lg:p-8`}
//     >
//       <div className="max-w-7xl mx-auto animate-fade-in">
//         {/* Header */}
//         <div className="mb-8 animate-slide-down">
//           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
//             <div>
//               <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-500 mb-2">
//                 Admin Orders
//               </h1>
//               <p className={themeClasses.textMuted}>
//                 Manage and track all customer orders
//               </p>
//             </div>

//             <div className="flex items-center gap-3">
//               <button
//                 onClick={toggleTheme}
//                 className={`p-2 rounded-lg transition-colors ${theme === "dark" ? "bg-slate-800 hover:bg-slate-700" : "bg-gray-200 hover:bg-gray-300"}`}
//                 title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
//               >
//                 {theme === "dark" ? (
//                   <div className="flex items-center gap-2">
//                     <div className="w-5 h-5 text-yellow-300">☀️</div>
//                   </div>
//                 ) : (
//                   <div className="flex items-center gap-2">
//                     <div className="w-5 h-5 text-gray-700">🌙</div>
//                   </div>
//                 )}
//               </button>

//               <button
//                 onClick={exportOrders}
//                 className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${themeClasses.buttonSecondary} hover:scale-[1.02] active:scale-[0.98]`}
//               >
//                 <Download size={18} />
//                 <span className="hidden sm:inline">Export</span>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         {stats && (
//           <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             <div
//               className={`stat-card p-5 rounded-2xl border backdrop-blur-sm transform transition-all duration-300 hover:scale-[1.02] ${themeClasses.statCard}`}
//             >
//               <div className="flex items-center justify-between mb-3">
//                 <h3 className="font-semibold">Total Orders</h3>
//                 <Package
//                   className={`${theme === "dark" ? "text-green-400" : "text-green-600"}`}
//                   size={24}
//                 />
//               </div>
//               <p
//                 className={`text-3xl font-bold ${theme === "dark" ? "text-green-400" : "text-green-600"}`}
//               >
//                 {stats?.totalOrders || 0}
//               </p>
//               <p className={`text-sm mt-2 ${themeClasses.textMuted}`}>
//                 All time orders
//               </p>
//             </div>

//             <div
//               className={`stat-card p-5 rounded-2xl border backdrop-blur-sm transform transition-all duration-300 hover:scale-[1.02] ${themeClasses.statCard}`}
//             >
//               <div className="flex items-center justify-between mb-3">
//                 <h3 className="font-semibold">Today's Orders</h3>
//                 <Calendar
//                   className={`${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}
//                   size={24}
//                 />
//               </div>
//               <p
//                 className={`text-3xl font-bold ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}
//               >
//                 {stats?.todayOrders || 0}
//               </p>
//               <p className={`text-sm mt-2 ${themeClasses.textMuted}`}>
//                 Orders today
//               </p>
//             </div>

//             <div
//               className={`stat-card p-5 rounded-2xl border backdrop-blur-sm transform transition-all duration-300 hover:scale-[1.02] ${themeClasses.statCard}`}
//             >
//               <div className="flex items-center justify-between mb-3">
//                 <h3 className="font-semibold">Revenue</h3>
//                 <DollarSign
//                   className={`${theme === "dark" ? "text-purple-400" : "text-purple-600"}`}
//                   size={24}
//                 />
//               </div>
//               <p
//                 className={`text-3xl font-bold ${theme === "dark" ? "text-purple-400" : "text-purple-600"}`}
//               >
//                 ${stats?.totalRevenue?.toFixed(2) || "0.00"}
//               </p>
//               <p className={`text-sm mt-2 ${themeClasses.textMuted}`}>
//                 Total revenue
//               </p>
//             </div>

//             <div
//               className={`stat-card p-5 rounded-2xl border backdrop-blur-sm transform transition-all duration-300 hover:scale-[1.02] ${themeClasses.statCard}`}
//             >
//               <div className="flex items-center justify-between mb-3">
//                 <h3 className="font-semibold">Avg. Order</h3>
//                 <TrendingUp
//                   className={`${theme === "dark" ? "text-orange-400" : "text-orange-600"}`}
//                   size={24}
//                 />
//               </div>
//               <p
//                 className={`text-3xl font-bold ${theme === "dark" ? "text-orange-400" : "text-orange-600"}`}
//               >
//                 ${stats?.averageOrderValue?.toFixed(2) || "0.00"}
//               </p>
//               <p className={`text-sm mt-2 ${themeClasses.textMuted}`}>
//                 Average order value
//               </p>
//             </div>
//           </div>
//         )}

//         {/* Search & Filters */}
//         <div className="mb-8">
//           {/* Search Bar */}
//           <div className="relative mb-4">
//             <Search
//               className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
//               size={20}
//             />
//             <input
//               type="text"
//               placeholder="Search by order number, customer name, email..."
//               value={filters.search}
//               onChange={handleSearch}
//               className={`w-full pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${themeClasses.input}`}
//             />
//           </div>

//           {/* Filters Toggle */}
//           <div className="flex justify-between items-center mb-4">
//             <button
//               onClick={() => setShowFilters(!showFilters)}
//               className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${themeClasses.buttonSecondary} hover:scale-[1.02]`}
//             >
//               <Filter size={18} />
//               {showFilters ? "Hide Filters" : "Show Filters"}
//               {showFilters ? (
//                 <ChevronUp size={18} />
//               ) : (
//                 <ChevronDown size={18} />
//               )}
//             </button>

//             <div className="text-sm font-medium">
//               {orders.length} order{orders.length !== 1 ? "s" : ""} found
//             </div>
//           </div>

//           {/* Filters Panel */}
//           {showFilters && (
//             <div
//               className={`p-4 rounded-xl border mb-4 animate-slide-down ${themeClasses.statCard}`}
//             >
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-2">
//                     Status Filter:
//                   </label>
//                   <select
//                     value={filters.status}
//                     onChange={(e) => handleStatusFilter(e.target.value)}
//                     className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${themeClasses.input}`}
//                   >
//                     <option value="all">All Statuses</option>
//                     {statusOptions.map((option) => (
//                       <option key={option.value} value={option.value}>
//                         {option.label}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-2">
//                     Sort By:
//                   </label>
//                   <select
//                     value={filters.sort}
//                     onChange={(e) => handleSort(e.target.value)}
//                     className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${themeClasses.input}`}
//                   >
//                     <option value="newest">Newest First</option>
//                     <option value="oldest">Oldest First</option>
//                     <option value="total_high">Total: High to Low</option>
//                     <option value="total_low">Total: Low to High</option>
//                   </select>
//                 </div>

//                 <div className="flex items-end">
//                   <button
//                     onClick={() =>
//                       setFilters({ status: "all", search: "", sort: "newest" })
//                     }
//                     className={`w-full px-4 py-2 rounded-lg transition-all ${themeClasses.buttonSecondary} hover:scale-[1.02]`}
//                   >
//                     Clear Filters
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Quick Status Filters */}
//           <div className="flex flex-wrap gap-2 mb-4">
//             {statusOptions.map((option) => (
//               <button
//                 key={option.value}
//                 onClick={() =>
//                   handleStatusFilter(
//                     option.value === filters.status ? "all" : option.value
//                   )
//                 }
//                 className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 hover:scale-[1.05] active:scale-[0.95] ${
//                   filters.status === option.value
//                     ? theme === "dark"
//                       ? "bg-slate-700 text-white"
//                       : "bg-gray-800 text-white"
//                     : theme === "dark"
//                       ? "bg-slate-800/50 text-gray-300 hover:bg-slate-700/50"
//                       : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                 }`}
//                 style={{
//                   borderLeft: `4px solid ${option.color}`,
//                 }}
//               >
//                 {getStatusIcon(option.value)}
//                 {option.label}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Loading State */}
//         {loading ? (
//           <div className="flex flex-col items-center justify-center py-20">
//             <div className="relative">
//               <div className="w-16 h-16 border-4 border-transparent border-t-green-500 border-r-green-500 rounded-full animate-spin mx-auto mb-6"></div>
//               <Package
//                 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-500"
//                 size={20}
//               />
//             </div>
//             <p className={themeClasses.textMuted}>Updating orders...</p>
//           </div>
//         ) : orders.length === 0 ? (
//           <div
//             className={`text-center py-16 rounded-2xl border ${themeClasses.statCard} animate-fade-in`}
//           >
//             <div
//               className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${theme === "dark" ? "bg-slate-800" : "bg-gray-200"}`}
//             >
//               <Package
//                 className={`${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}
//                 size={40}
//               />
//             </div>
//             <h3 className="text-xl font-semibold mb-3">No orders found</h3>
//             <p className={`mb-6 ${themeClasses.textMuted}`}>
//               {filters.status !== "all" || filters.search
//                 ? "Try adjusting your filters or search terms"
//                 : "No orders have been placed yet"}
//             </p>
//             {(filters.status !== "all" || filters.search) && (
//               <button
//                 onClick={() =>
//                   setFilters({ status: "all", search: "", sort: "newest" })
//                 }
//                 className={`px-6 py-3 rounded-lg transition-all ${themeClasses.buttonPrimary} hover:scale-[1.05] active:scale-[0.95]`}
//               >
//                 Clear Filters
//               </button>
//             )}
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
//             {orders.map((order, index) => (
//               <div
//                 key={order._id}
//                 className={`order-card p-5 rounded-2xl border shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl min-w-0 transform hover:-translate-y-1 ${
//                   themeClasses.card
//                 } ${themeClasses.cardHover} opacity-0 translate-y-4`}
//                 style={{
//                   animationDelay: `${index * 0.1}s`,
//                   borderLeft: `6px solid ${getStatusColor(order.status)}`,
//                 }}
//               >
//                 {/* Order Header */}
//                 <div className="flex justify-between items-start mb-4">
//                   <div>
//                     <h2 className="text-lg font-bold mb-1 flex items-center gap-2">
//                       <span
//                         className={`px-2 py-0.5 rounded text-xs font-medium ${
//                           theme === "dark"
//                             ? "bg-slate-700 text-gray-300"
//                             : "bg-gray-200 text-gray-700"
//                         }`}
//                       >
//                         #{order.orderNumber || order._id.slice(-8)}
//                       </span>
//                     </h2>
//                     <div className="flex items-center gap-2 text-sm">
//                       <Calendar size={14} className={themeClasses.textMuted} />
//                       <span className={themeClasses.textMuted}>
//                         {new Date(order.createdAt).toLocaleDateString()} •
//                         {new Date(order.createdAt).toLocaleTimeString([], {
//                           hour: "2-digit",
//                           minute: "2-digit",
//                         })}
//                       </span>
//                     </div>
//                   </div>

//                   <button
//                     onClick={() => toggleOrderExpand(order._id)}
//                     className={`p-2 rounded-lg transition-all hover:scale-110 ${
//                       theme === "dark"
//                         ? "hover:bg-slate-700"
//                         : "hover:bg-gray-200"
//                     }`}
//                   >
//                     {expandedOrder === order._id ? (
//                       <ChevronUp size={20} className={themeClasses.textMuted} />
//                     ) : (
//                       <ChevronDown
//                         size={20}
//                         className={themeClasses.textMuted}
//                       />
//                     )}
//                   </button>
//                 </div>

//                 {/* Status Badge */}
//                 <div className="mb-4">
//                   <div
//                     className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium"
//                     style={{
//                       backgroundColor: `${getStatusColor(order.status)}20`,
//                       color: getStatusColor(order.status),
//                     }}
//                   >
//                     {getStatusIcon(order.status)}
//                     {order.status.charAt(0).toUpperCase() +
//                       order.status.slice(1)}
//                   </div>
//                 </div>

//                 {/* Customer Info */}
//                 <div
//                   className={`mb-4 p-3 rounded-lg ${theme === "dark" ? "bg-slate-800/50" : "bg-gray-100/50"}`}
//                 >
//                   <div className="flex items-center gap-2 mb-2">
//                     <User size={16} className={themeClasses.textMuted} />
//                     <span className="font-medium">
//                       {order.user?.name || "Customer"}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-2 mb-1">
//                     <Mail size={16} className={themeClasses.textMuted} />
//                     <span className={`text-sm ${themeClasses.textMuted}`}>
//                       {order.user?.email}
//                     </span>
//                   </div>
//                   {order.user?.phone && (
//                     <div className="flex items-center gap-2">
//                       <Phone size={16} className={themeClasses.textMuted} />
//                       <span className={`text-sm ${themeClasses.textMuted}`}>
//                         {order.user.phone}
//                       </span>
//                     </div>
//                   )}
//                 </div>

//                 {/* Order Items (Collapsible) */}
//                 {expandedOrder === order._id && (
//                   <div className="mb-4 animate-slide-down">
//                     <h3 className="font-semibold mb-2">
//                       Items ({order.items.length})
//                     </h3>
//                     <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
//                       {order.items.map((item, i) => (
//                         <div
//                           key={i}
//                           className={`flex justify-between items-center p-2 rounded-lg ${
//                             theme === "dark"
//                               ? "bg-slate-800/30"
//                               : "bg-gray-100/50"
//                           }`}
//                         >
//                           <div className="flex-1 min-w-0">
//                             <p className="font-medium text-sm truncate">
//                               {item.productName ||
//                                 item.product?.name ||
//                                 `Item ${i + 1}`}
//                             </p>
//                             <p className="text-xs text-gray-500">
//                               Qty: {item.quantity} × $
//                               {item.price?.toFixed(2) || "0.00"}
//                             </p>
//                           </div>
//                           <p className="font-semibold whitespace-nowrap ml-2">
//                             $
//                             {((item.price || 0) * (item.quantity || 1)).toFixed(
//                               2
//                             )}
//                           </p>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Order Total */}
//                 <div className="mb-4 pt-3 border-t">
//                   <div className="flex justify-between items-center">
//                     <span className="font-semibold text-lg">Total:</span>
//                     <span
//                       className={`text-2xl font-bold ${
//                         theme === "dark" ? "text-green-400" : "text-green-600"
//                       }`}
//                     >
//                       ${order.total?.toFixed(2) || "0.00"}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Status Control */}
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium mb-2">
//                     Update Status:
//                   </label>
//                   <Select
//                     options={statusOptions}
//                     value={statusOptions.find((s) => s.value === order.status)}
//                     onChange={(opt) => updateStatus(order._id, opt.value)}
//                     className="rounded-lg"
//                     styles={{
//                       control: (base) => ({
//                         ...base,
//                         backgroundColor:
//                           theme === "dark" ? "#1e293b" : "#ffffff",
//                         borderColor: theme === "dark" ? "#334155" : "#d1d5db",
//                         padding: "2px",
//                         color: theme === "dark" ? "white" : "#111827",
//                         borderRadius: "8px",
//                       }),
//                       singleValue: (base) => ({
//                         ...base,
//                         color: theme === "dark" ? "white" : "#111827",
//                       }),
//                       menu: (base) => ({
//                         ...base,
//                         backgroundColor:
//                           theme === "dark" ? "#1e293b" : "#ffffff",
//                         color: theme === "dark" ? "white" : "#111827",
//                       }),
//                       option: (base, state) => ({
//                         ...base,
//                         backgroundColor: state.isSelected
//                           ? "#10b981"
//                           : state.isFocused
//                             ? theme === "dark"
//                               ? "#334155"
//                               : "#f3f4f6"
//                             : theme === "dark"
//                               ? "#1e293b"
//                               : "#ffffff",
//                         color: theme === "dark" ? "white" : "#111827",
//                       }),
//                     }}
//                   />
//                 </div>

//                 {/* Actions */}
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() =>
//                       (window.location.href = `/admin/orders/${order._id}`)
//                     }
//                     className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-2 ${
//                       theme === "dark"
//                         ? "bg-blue-500/20 text-blue-300 hover:bg-blue-500/30"
//                         : "bg-blue-100 text-blue-700 hover:bg-blue-200"
//                     } hover:scale-[1.02] active:scale-[0.98]`}
//                   >
//                     <ExternalLink size={16} />
//                     Details
//                   </button>

//                   {order.trackingNumber && (
//                     <button
//                       onClick={() =>
//                         window.open(
//                           `https://tracking.com/${order.trackingNumber}`,
//                           "_blank"
//                         )
//                       }
//                       className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-2 ${
//                         theme === "dark"
//                           ? "bg-purple-500/20 text-purple-300 hover:bg-purple-500/30"
//                           : "bg-purple-100 text-purple-700 hover:bg-purple-200"
//                       } hover:scale-[1.02] active:scale-[0.98]`}
//                     >
//                       <Truck size={16} />
//                       Track
//                     </button>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Footer Summary */}
//         {orders.length > 0 && (
//           <div
//             className={`mt-8 p-4 rounded-xl border ${themeClasses.statCard} animate-fade-in`}
//           >
//             <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
//               <div className="text-center sm:text-left">
//                 <p className={`text-sm ${themeClasses.textMuted}`}>
//                   Showing {orders.length} order{orders.length !== 1 ? "s" : ""}
//                 </p>
//                 <p className={`text-sm ${themeClasses.textMuted}`}>
//                   Total value: $
//                   {orders
//                     .reduce((sum, order) => sum + (order.total || 0), 0)
//                     .toFixed(2)}
//                 </p>
//               </div>

//               <div className="flex gap-2">
//                 <button
//                   onClick={() =>
//                     window.scrollTo({ top: 0, behavior: "smooth" })
//                   }
//                   className={`px-4 py-2 rounded-lg transition-all ${themeClasses.buttonSecondary} hover:scale-[1.02]`}
//                 >
//                   Back to Top
//                 </button>

//                 <button
//                   onClick={fetchOrders}
//                   className={`px-4 py-2 rounded-lg transition-all ${themeClasses.buttonPrimary} hover:scale-[1.02] flex items-center gap-2`}
//                 >
//                   <RefreshCw size={18} />
//                   Refresh
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import { useEffect, useState, useRef } from "react";
import Select from "react-select";
import { fetchWithAuth } from "../utils/auth";
import {
  Package,
  Search,
  Filter,
  Calendar,
  DollarSign,
  User,
  Phone,
  Mail,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  RefreshCw,
  TrendingUp,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Download,
  BarChart3,
  ShoppingBag,
  Users,
  Eye,
} from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const statusOptions = [
  { value: "pending", label: "Pending", color: "#f59e0b", icon: Clock },
  {
    value: "processing",
    label: "Processing",
    color: "#3b82f6",
    icon: RefreshCw,
  },
  { value: "shipped", label: "Shipped", color: "#8b5cf6", icon: Truck },
  {
    value: "delivered",
    label: "Delivered",
    color: "#10b981",
    icon: CheckCircle,
  },
  { value: "cancelled", label: "Cancelled", color: "#ef4444", icon: XCircle },
  { value: "on_hold", label: "On Hold", color: "#6b7280", icon: Clock },
  { value: "refunded", label: "Refunded", color: "#ec4899", icon: DollarSign },
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [filters, setFilters] = useState({
    status: "all",
    search: "",
    sort: "newest",
  });
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("admin-orders-theme");
    if (savedTheme) return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // grid or list

  const ordersRef = useRef([]);
  const observerRefs = useRef([]);

  // Theme classes
  const themeClasses = {
    container:
      theme === "dark"
        ? "bg-gradient-to-br from-slate-900 to-slate-950"
        : "bg-gradient-to-br from-gray-50 to-gray-100",
    text: theme === "dark" ? "text-white" : "text-gray-900",
    textMuted: theme === "dark" ? "text-gray-400" : "text-gray-600",
    textSecondary: theme === "dark" ? "text-gray-300" : "text-gray-700",
    card: theme === "dark" ? "bg-slate-800/80" : "bg-white/90",
    cardHover: theme === "dark" ? "hover:bg-slate-800/90" : "hover:bg-white",
    border: theme === "dark" ? "border-slate-700/50" : "border-gray-200/70",
    input:
      theme === "dark"
        ? "bg-slate-800 border-slate-700 text-white"
        : "bg-white border-gray-300 text-gray-900",
    statCard:
      theme === "dark"
        ? "bg-slate-800/50 border-slate-700/50"
        : "bg-white/70 border-gray-200/70",
    dropdown:
      theme === "dark"
        ? "bg-slate-800 border-slate-700"
        : "bg-white border-gray-300",
    buttonPrimary:
      theme === "dark"
        ? "bg-green-500 hover:bg-green-600 text-white"
        : "bg-green-600 hover:bg-green-700 text-white",
    buttonSecondary:
      theme === "dark"
        ? "bg-slate-700 hover:bg-slate-600 text-white"
        : "bg-gray-200 hover:bg-gray-300 text-gray-800",
  };

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("admin-orders-theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  };

  // Apply theme on mount
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-slide-up");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all order cards
    const orderCards = document.querySelectorAll(".order-card");
    orderCards.forEach((card) => observer.observe(card));

    // Observe stat cards
    const statCards = document.querySelectorAll(".stat-card");
    statCards.forEach((card) => observer.observe(card));

    return () => {
      orderCards.forEach((card) => observer.unobserve(card));
      statCards.forEach((card) => observer.unobserve(card));
    };
  }, [orders, stats]);

  // Page load animation
  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        setPageLoading(false);
      }, 300);
    }
  }, [loading]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      if (filters.status !== "all")
        queryParams.append("status", filters.status);
      if (filters.search) queryParams.append("search", filters.search);
      queryParams.append("sort", filters.sort);

      const url = `${BACKEND_URL}/api/orders/all?${queryParams.toString()}`;
      const res = await fetchWithAuth(url);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const response = await res.json();

      if (response.success) {
        setOrders(response.data || []);
        setStats(response.stats || null);
      } else {
        console.error("API error:", response.message);
        setOrders([]);
      }
    } catch (err) {
      console.log("Fetch error:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [filters]);

  const updateStatus = async (orderId, newStatus) => {
    try {
      const res = await fetchWithAuth(
        `${BACKEND_URL}/api/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!res.ok) {
        const error = await res.json();
        alert(error.message || "Failed to update status");
        return;
      }

      const result = await res.json();
      if (result.success) {
        alert("Order status updated successfully!");
        fetchOrders();
      } else {
        alert(result.message || "Failed to update status");
      }
    } catch (err) {
      console.log("Update error:", err);
      alert("Network error. Please try again.");
    }
  };

  const handleStatusFilter = (value) => {
    setFilters((prev) => ({ ...prev, status: value }));
  };

  const handleSearch = (e) => {
    setFilters((prev) => ({ ...prev, search: e.target.value }));
  };

  const handleSort = (value) => {
    setFilters((prev) => ({ ...prev, sort: value }));
  };

  const toggleOrderExpand = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const exportOrders = () => {
    const csvContent = [
      ["Order ID", "Customer", "Email", "Phone", "Total", "Status", "Date"],
      ...orders.map((order) => [
        order.orderNumber || order._id,
        order.user?.name || "N/A",
        order.user?.email || "N/A",
        order.user?.phone || "N/A",
        `$${order.total?.toFixed(2) || "0.00"}`,
        order.status,
        new Date(order.createdAt).toLocaleDateString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `orders_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  // Get status color
  const getStatusColor = (status) => {
    const statusOption = statusOptions.find((opt) => opt.value === status);
    return statusOption ? statusOption.color : "#6b7280";
  };

  // Get status icon
  const getStatusIcon = (status) => {
    const statusOption = statusOptions.find((opt) => opt.value === status);
    const Icon = statusOption ? statusOption.icon : Package;
    return <Icon size={16} />;
  };

  // Calculate status counts for stats
  const statusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  if (pageLoading) {
    return (
      <div
        className={`min-h-screen ${themeClasses.container} ${themeClasses.text} flex justify-center items-center`}
      >
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-transparent border-t-green-500 border-r-green-500 rounded-full animate-spin mx-auto mb-6"></div>
            <Package
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-500"
              size={24}
            />
          </div>
          <p className="text-lg font-medium mt-4 animate-pulse">
            Loading orders...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${themeClasses.container} ${themeClasses.text} p-3 sm:p-4 md:p-6 lg:p-8`}
    >
      <div className="max-w-7xl mx-auto animate-fade-in">
        {/* Header */}
        <div className="mb-8 animate-slide-down">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-500 mb-2">
                Admin Orders
              </h1>
              <p className={themeClasses.textMuted}>
                Manage and track all customer orders
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* View Mode Toggle */}
              <div
                className={`flex rounded-lg overflow-hidden border ${themeClasses.border}`}
              >
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-3 py-2 transition-all ${viewMode === "grid" ? (theme === "dark" ? "bg-slate-700" : "bg-gray-200") : ""}`}
                  title="Grid View"
                >
                  <div className="w-5 h-5">⏹️</div>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-3 py-2 transition-all ${viewMode === "list" ? (theme === "dark" ? "bg-slate-700" : "bg-gray-200") : ""}`}
                  title="List View"
                >
                  <div className="w-5 h-5">📋</div>
                </button>
              </div>

              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${theme === "dark" ? "bg-slate-800 hover:bg-slate-700" : "bg-gray-200 hover:bg-gray-300"}`}
                title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                {theme === "dark" ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 text-yellow-300">☀️</div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 text-gray-700">🌙</div>
                  </div>
                )}
              </button>

              <button
                onClick={exportOrders}
                className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${themeClasses.buttonSecondary} hover:scale-[1.02] active:scale-[0.98]`}
              >
                <Download size={18} />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              className={`stat-card p-5 rounded-2xl border backdrop-blur-sm transform transition-all duration-300 hover:scale-[1.02] ${themeClasses.statCard}`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Total Orders</h3>
                <Package
                  className={`${theme === "dark" ? "text-green-400" : "text-green-600"}`}
                  size={24}
                />
              </div>
              <p
                className={`text-3xl font-bold ${theme === "dark" ? "text-green-400" : "text-green-600"}`}
              >
                {stats?.totalOrders || 0}
              </p>
              <p className={`text-sm mt-2 ${themeClasses.textMuted}`}>
                All time orders
              </p>
            </div>

            <div
              className={`stat-card p-5 rounded-2xl border backdrop-blur-sm transform transition-all duration-300 hover:scale-[1.02] ${themeClasses.statCard}`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Today's Orders</h3>
                <Calendar
                  className={`${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}
                  size={24}
                />
              </div>
              <p
                className={`text-3xl font-bold ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}
              >
                {stats?.todayOrders || 0}
              </p>
              <p className={`text-sm mt-2 ${themeClasses.textMuted}`}>
                Orders today
              </p>
            </div>

            <div
              className={`stat-card p-5 rounded-2xl border backdrop-blur-sm transform transition-all duration-300 hover:scale-[1.02] ${themeClasses.statCard}`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Revenue</h3>
                <DollarSign
                  className={`${theme === "dark" ? "text-purple-400" : "text-purple-600"}`}
                  size={24}
                />
              </div>
              <p
                className={`text-3xl font-bold ${theme === "dark" ? "text-purple-400" : "text-purple-600"}`}
              >
                ${stats?.totalRevenue?.toFixed(2) || "0.00"}
              </p>
              <p className={`text-sm mt-2 ${themeClasses.textMuted}`}>
                Total revenue
              </p>
            </div>

            <div
              className={`stat-card p-5 rounded-2xl border backdrop-blur-sm transform transition-all duration-300 hover:scale-[1.02] ${themeClasses.statCard}`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Avg. Order</h3>
                <TrendingUp
                  className={`${theme === "dark" ? "text-orange-400" : "text-orange-600"}`}
                  size={24}
                />
              </div>
              <p
                className={`text-3xl font-bold ${theme === "dark" ? "text-orange-400" : "text-orange-600"}`}
              >
                ${stats?.averageOrderValue?.toFixed(2) || "0.00"}
              </p>
              <p className={`text-sm mt-2 ${themeClasses.textMuted}`}>
                Average order value
              </p>
            </div>
          </div>
        )}

        {/* Status Distribution */}
        {Object.keys(statusCounts).length > 0 && (
          <div
            className={`mb-6 p-5 rounded-2xl border ${themeClasses.statCard} animate-fade-in`}
          >
            <div className="flex items-center gap-2 mb-4">
              <BarChart3
                size={20}
                className={theme === "dark" ? "text-blue-400" : "text-blue-600"}
              />
              <h3 className="font-semibold">Order Status Distribution</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((option) => {
                const count = statusCounts[option.value] || 0;
                if (count === 0) return null;

                return (
                  <div
                    key={option.value}
                    className={`px-3 py-2 rounded-lg flex items-center gap-2 ${
                      theme === "dark" ? "bg-slate-800/70" : "bg-gray-100"
                    }`}
                    style={{ borderLeft: `4px solid ${option.color}` }}
                  >
                    <div style={{ color: option.color }}>
                      {getStatusIcon(option.value)}
                    </div>
                    <span className="font-medium">{option.label}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs ${
                        theme === "dark"
                          ? "bg-slate-700 text-gray-300"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Search & Filters */}
        <div className="mb-8">
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by order number, customer name, email..."
              value={filters.search}
              onChange={handleSearch}
              className={`w-full pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${themeClasses.input}`}
            />
          </div>

          {/* Filters Toggle */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${themeClasses.buttonSecondary} hover:scale-[1.02]`}
              >
                <Filter size={18} />
                {showFilters ? "Hide Filters" : "Show Filters"}
                {showFilters ? (
                  <ChevronUp size={18} />
                ) : (
                  <ChevronDown size={18} />
                )}
              </button>

              <div
                className={`text-sm font-medium px-3 py-1.5 rounded-full ${
                  theme === "dark"
                    ? "bg-slate-800 text-gray-300"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {orders.length} order{orders.length !== 1 ? "s" : ""} found
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className={themeClasses.textMuted}>Sort:</span>
              <select
                value={filters.sort}
                onChange={(e) => handleSort(e.target.value)}
                className={`px-3 py-1.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${themeClasses.input}`}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="total_high">Total: High to Low</option>
                <option value="total_low">Total: Low to High</option>
              </select>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div
              className={`p-4 rounded-xl border mb-4 animate-slide-down ${themeClasses.statCard}`}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Status Filter:
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) => handleStatusFilter(e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${themeClasses.input}`}
                  >
                    <option value="all">All Statuses</option>
                    {statusOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Customer Type:
                  </label>
                  <select
                    className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${themeClasses.input}`}
                  >
                    <option value="all">All Customers</option>
                    <option value="new">New Customers</option>
                    <option value="returning">Returning Customers</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={() =>
                      setFilters({ status: "all", search: "", sort: "newest" })
                    }
                    className={`w-full px-4 py-2 rounded-lg transition-all ${themeClasses.buttonSecondary} hover:scale-[1.02]`}
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Quick Status Filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                onClick={() =>
                  handleStatusFilter(
                    option.value === filters.status ? "all" : option.value
                  )
                }
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 hover:scale-[1.05] active:scale-[0.95] ${
                  filters.status === option.value
                    ? theme === "dark"
                      ? "bg-slate-700 text-white"
                      : "bg-gray-800 text-white"
                    : theme === "dark"
                      ? "bg-slate-800/50 text-gray-300 hover:bg-slate-700/50"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                style={{
                  borderLeft: `4px solid ${option.color}`,
                }}
              >
                {getStatusIcon(option.value)}
                {option.label}
                {statusCounts[option.value] > 0 && (
                  <span
                    className={`ml-1 px-1.5 py-0.5 text-xs rounded-full ${
                      theme === "dark" ? "bg-slate-600" : "bg-gray-300"
                    }`}
                  >
                    {statusCounts[option.value]}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-transparent border-t-green-500 border-r-green-500 rounded-full animate-spin mx-auto mb-6"></div>
              <Package
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-500"
                size={20}
              />
            </div>
            <p className={themeClasses.textMuted}>Updating orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div
            className={`text-center py-16 rounded-2xl border ${themeClasses.statCard} animate-fade-in`}
          >
            <div
              className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${theme === "dark" ? "bg-slate-800" : "bg-gray-200"}`}
            >
              <Package
                className={`${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}
                size={40}
              />
            </div>
            <h3 className="text-xl font-semibold mb-3">No orders found</h3>
            <p className={`mb-6 ${themeClasses.textMuted}`}>
              {filters.status !== "all" || filters.search
                ? "Try adjusting your filters or search terms"
                : "No orders have been placed yet"}
            </p>
            {(filters.status !== "all" || filters.search) && (
              <button
                onClick={() =>
                  setFilters({ status: "all", search: "", sort: "newest" })
                }
                className={`px-6 py-3 rounded-lg transition-all ${themeClasses.buttonPrimary} hover:scale-[1.05] active:scale-[0.95]`}
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          // CHANGED: 2 cards on medium and large devices
          <div
            className={`${
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5"
                : "flex flex-col gap-5"
            }`}
          >
            {orders.map((order, index) => (
              <div
                key={order._id}
                className={`order-card p-5 rounded-2xl border shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl min-w-0 transform hover:-translate-y-1 ${
                  themeClasses.card
                } ${
                  themeClasses.cardHover
                } ${viewMode === "list" ? "flex flex-col md:flex-row md:items-start gap-5" : ""} opacity-0 translate-y-4`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  borderLeft: `6px solid ${getStatusColor(order.status)}`,
                }}
              >
                {/* Order Header */}
                <div
                  className={`${viewMode === "list" ? "flex-1 min-w-0" : ""}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-lg font-bold mb-1 flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-medium ${
                            theme === "dark"
                              ? "bg-slate-700 text-gray-300"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          #{order.orderNumber || order._id.slice(-8)}
                        </span>
                      </h2>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar
                          size={14}
                          className={themeClasses.textMuted}
                        />
                        <span className={themeClasses.textMuted}>
                          {new Date(order.createdAt).toLocaleDateString()} •
                          {new Date(order.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleOrderExpand(order._id)}
                      className={`p-2 rounded-lg transition-all hover:scale-110 ${
                        theme === "dark"
                          ? "hover:bg-slate-700"
                          : "hover:bg-gray-200"
                      }`}
                    >
                      {expandedOrder === order._id ? (
                        <ChevronUp
                          size={20}
                          className={themeClasses.textMuted}
                        />
                      ) : (
                        <ChevronDown
                          size={20}
                          className={themeClasses.textMuted}
                        />
                      )}
                    </button>
                  </div>

                  {/* Status Badge */}
                  <div className="mb-4">
                    <div
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium"
                      style={{
                        backgroundColor: `${getStatusColor(order.status)}20`,
                        color: getStatusColor(order.status),
                      }}
                    >
                      {getStatusIcon(order.status)}
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </div>
                  </div>

                  {/* Customer Info */}
                  <div
                    className={`mb-4 p-3 rounded-lg ${theme === "dark" ? "bg-slate-800/50" : "bg-gray-100/50"}`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <User size={16} className={themeClasses.textMuted} />
                      <span className="font-medium">
                        {order.user?.name || "Customer"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <Mail size={16} className={themeClasses.textMuted} />
                      <span className={`text-sm ${themeClasses.textMuted}`}>
                        {order.user?.email}
                      </span>
                    </div>
                    {order.user?.phone && (
                      <div className="flex items-center gap-2">
                        <Phone size={16} className={themeClasses.textMuted} />
                        <span className={`text-sm ${themeClasses.textMuted}`}>
                          {order.user.phone}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Order Details (Right side in list view) */}
                <div
                  className={`${viewMode === "list" ? "flex-1 min-w-0" : ""}`}
                >
                  {/* Order Items (Collapsible) */}
                  {expandedOrder === order._id && (
                    <div className="mb-4 animate-slide-down">
                      <h3 className="font-semibold mb-2">
                        Items ({order.items.length})
                      </h3>
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                        {order.items.map((item, i) => (
                          <div
                            key={i}
                            className={`flex justify-between items-center p-2 rounded-lg ${
                              theme === "dark"
                                ? "bg-slate-800/30"
                                : "bg-gray-100/50"
                            }`}
                          >
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">
                                {item.productName ||
                                  item.product?.name ||
                                  `Item ${i + 1}`}
                              </p>
                              <p className="text-xs text-gray-500">
                                Qty: {item.quantity} × $
                                {item.price?.toFixed(2) || "0.00"}
                              </p>
                            </div>
                            <p className="font-semibold whitespace-nowrap ml-2">
                              $
                              {(
                                (item.price || 0) * (item.quantity || 1)
                              ).toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Order Total */}
                  <div className="mb-4 pt-3 border-t">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-lg">Total:</span>
                      <span
                        className={`text-2xl font-bold ${
                          theme === "dark" ? "text-green-400" : "text-green-600"
                        }`}
                      >
                        ${order.total?.toFixed(2) || "0.00"}
                      </span>
                    </div>
                  </div>

                  {/* Status Control */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Update Status:
                    </label>
                    <Select
                      options={statusOptions}
                      value={statusOptions.find(
                        (s) => s.value === order.status
                      )}
                      onChange={(opt) => updateStatus(order._id, opt.value)}
                      className="rounded-lg"
                      styles={{
                        control: (base) => ({
                          ...base,
                          backgroundColor:
                            theme === "dark" ? "#1e293b" : "#ffffff",
                          borderColor: theme === "dark" ? "#334155" : "#d1d5db",
                          padding: "2px",
                          color: theme === "dark" ? "white" : "#111827",
                          borderRadius: "8px",
                        }),
                        singleValue: (base) => ({
                          ...base,
                          color: theme === "dark" ? "white" : "#111827",
                        }),
                        menu: (base) => ({
                          ...base,
                          backgroundColor:
                            theme === "dark" ? "#1e293b" : "#ffffff",
                          color: theme === "dark" ? "white" : "#111827",
                        }),
                        option: (base, state) => ({
                          ...base,
                          backgroundColor: state.isSelected
                            ? "#10b981"
                            : state.isFocused
                              ? theme === "dark"
                                ? "#334155"
                                : "#f3f4f6"
                              : theme === "dark"
                                ? "#1e293b"
                                : "#ffffff",
                          color: theme === "dark" ? "white" : "#111827",
                        }),
                      }}
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        (window.location.href = `/admin/orders/${order._id}`)
                      }
                      className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-2 ${
                        theme === "dark"
                          ? "bg-blue-500/20 text-blue-300 hover:bg-blue-500/30"
                          : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                      } hover:scale-[1.02] active:scale-[0.98]`}
                    >
                      <Eye size={16} />
                      View Details
                    </button>

                    {order.trackingNumber && (
                      <button
                        onClick={() =>
                          window.open(
                            `https://tracking.com/${order.trackingNumber}`,
                            "_blank"
                          )
                        }
                        className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-2 ${
                          theme === "dark"
                            ? "bg-purple-500/20 text-purple-300 hover:bg-purple-500/30"
                            : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                        } hover:scale-[1.02] active:scale-[0.98]`}
                      >
                        <Truck size={16} />
                        Track
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Summary */}
        {orders.length > 0 && (
          <div
            className={`mt-8 p-4 rounded-xl border ${themeClasses.statCard} animate-fade-in`}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className={`text-sm ${themeClasses.textMuted}`}>
                  Showing {orders.length} order{orders.length !== 1 ? "s" : ""}
                </p>
                <p className={`text-sm ${themeClasses.textMuted}`}>
                  Total value: $
                  {orders
                    .reduce((sum, order) => sum + (order.total || 0), 0)
                    .toFixed(2)}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <button
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className={`px-4 py-2 rounded-lg transition-all ${themeClasses.buttonSecondary} hover:scale-[1.02]`}
                >
                  Back to Top
                </button>

                <button
                  onClick={fetchOrders}
                  className={`px-4 py-2 rounded-lg transition-all ${themeClasses.buttonPrimary} hover:scale-[1.02] flex items-center justify-center gap-2`}
                >
                  <RefreshCw size={18} />
                  Refresh Orders
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
