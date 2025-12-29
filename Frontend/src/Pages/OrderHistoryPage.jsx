// import React, { useEffect, useState, useRef } from "react";
// import { fetchWithAuth } from "../utils/auth";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FaTruck,
//   FaCheckCircle,
//   FaClock,
//   FaShoppingBag,
//   FaCalendarAlt,
//   FaBox,
//   FaBoxOpen,
//   FaReceipt,
//   FaArrowRight,
//   FaHistory,
//   FaStar,
//   FaUndo,
//   FaExclamationTriangle,
//   FaSignInAlt,
// } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import ReturnRequestModal from "../Components/ReturnRequestModal";

// const BACKEND_URL = import.meta.env.VITE_API_URL;

// const OrderHistoryPage = () => {
//   const [activeOrders, setActiveOrders] = useState([]);
//   const [deliveredOrders, setDeliveredOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [authError, setAuthError] = useState(false);
//   const [expandedOrder, setExpandedOrder] = useState(null);
//   const [showReturnModal, setShowReturnModal] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const navigate = useNavigate();

//   // Refs to prevent infinite loops
//   const mountedRef = useRef(true);
//   const userRef = useRef(null);

//   const user = JSON.parse(localStorage.getItem("user"));

//   // Update user ref
//   useEffect(() => {
//     userRef.current = user;
//   }, [user]);

//   // Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       mountedRef.current = false;
//     };
//   }, []);

//   // Main effect - runs once on mount
//   useEffect(() => {
//     if (!userRef.current) {
//       setAuthError(true);
//       setLoading(false);
//       return;
//     }

//     // Fetch initial data
//     fetchInitialOrders();

//     // Cleanup function
//     return () => {
//       // Any cleanup if needed
//     };
//   }, []); // Empty dependency array - runs once on mount

//   const fetchInitialOrders = async () => {
//     if (!mountedRef.current || !userRef.current) return;

//     try {
//       setLoading(true);
//       setError(null);
//       setAuthError(false);

//       // Fetch ACTIVE orders
//       const resActive = await fetchWithAuth(`${BACKEND_URL}/api/orders/active`);

//       if (!resActive.ok) {
//         if (resActive.status === 401) {
//           setAuthError(true);
//           localStorage.removeItem("user");
//           localStorage.removeItem("accessToken");
//           return;
//         }
//         throw new Error(`Failed to fetch active orders: ${resActive.status}`);
//       }

//       const activeData = await resActive.json();

//       // Fetch DELIVERED orders
//       const resDelivered = await fetchWithAuth(
//         `${BACKEND_URL}/api/orders/delivered`
//       );

//       if (!resDelivered.ok) {
//         if (resDelivered.status === 401) {
//           setAuthError(true);
//           localStorage.removeItem("user");
//           localStorage.removeItem("accessToken");
//           return;
//         }
//         throw new Error(
//           `Failed to fetch delivered orders: ${resDelivered.status}`
//         );
//       }

//       const deliveredData = await resDelivered.json();

//       // Extract data from response objects with validation
//       if (mountedRef.current) {
//         setActiveOrders(
//           Array.isArray(activeData.data)
//             ? activeData.data
//             : Array.isArray(activeData)
//               ? activeData
//               : []
//         );

//         setDeliveredOrders(
//           Array.isArray(deliveredData.data)
//             ? deliveredData.data
//             : Array.isArray(deliveredData)
//               ? deliveredData
//               : []
//         );
//       }
//     } catch (err) {
//       console.error("Error fetching orders:", err);
//       if (mountedRef.current) {
//         setError(err.message);
//         setActiveOrders([]);
//         setDeliveredOrders([]);
//       }
//     } finally {
//       if (mountedRef.current) {
//         setLoading(false);
//       }
//     }
//   };

//   // Helper function to get the proper image URL
//   const getImageUrl = (imagePath) => {
//     if (!imagePath)
//       return "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop";

//     if (imagePath.startsWith("http")) {
//       return imagePath;
//     }

//     return `${BACKEND_URL}${imagePath}`;
//   };

//   const formatDate = (dateString) => {
//     try {
//       return new Date(dateString).toLocaleDateString("en-US", {
//         weekday: "long",
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//         hour: "2-digit",
//         minute: "2-digit",
//       });
//     } catch (e) {
//       return "Invalid date";
//     }
//   };

//   const formatPrice = (price) => {
//     const priceNum = Number(price) || 0;
//     return new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//       minimumFractionDigits: 2,
//     }).format(priceNum);
//   };

//   const toggleOrderDetails = (orderId) => {
//     setExpandedOrder(expandedOrder === orderId ? null : orderId);
//   };

//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case "pending":
//         return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20";
//       case "processing":
//         return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
//       case "shipped":
//         return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20";
//       case "delivered":
//         return "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20";
//       case "cancelled":
//         return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20";
//       default:
//         return "bg-gray-500/10 text-gray-600 dark:text-gray-400 border-gray-500/20";
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status?.toLowerCase()) {
//       case "pending":
//         return <FaClock />;
//       case "processing":
//         return <FaBox />;
//       case "shipped":
//         return <FaTruck />;
//       case "delivered":
//         return <FaCheckCircle />;
//       default:
//         return <FaShoppingBag />;
//     }
//   };

//   // Handle return request for a specific product in an order
//   const handleReturnRequest = (order, product) => {
//     setSelectedOrder(order);
//     setSelectedProduct(product);
//     setShowReturnModal(true);
//   };

//   const OrderCard = ({ order, isDelivered = false }) => {
//     if (!order || typeof order !== "object") return null;

//     return (
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: -20 }}
//         className="group relative"
//       >
//         <div
//           className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/50 shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 cursor-pointer max-sm:py-24"
//           onClick={() => toggleOrderDetails(order._id)}
//         >
//           {/* Order Header */}
//           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
//             <div className="flex items-center gap-3">
//               <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500/10 to-rose-500/10 border border-amber-500/20">
//                 {isDelivered ? (
//                   <FaBoxOpen className="text-amber-600 dark:text-amber-400" />
//                 ) : (
//                   <FaBox className="text-amber-600 dark:text-amber-400" />
//                 )}
//               </div>
//               <div>
//                 <h3 className="text-lg font-bold text-slate-800 dark:text-white">
//                   Order #
//                   {order._id
//                     ? order._id.slice(-8).toUpperCase()
//                     : order.orderNumber || "N/A"}
//                 </h3>
//                 <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
//                   <FaCalendarAlt />
//                   <span>{formatDate(order.createdAt)}</span>
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-center gap-4">
//               <span
//                 className={`px-4 py-2 rounded-full border font-medium flex items-center gap-2 ${getStatusColor(order.status)}`}
//               >
//                 {getStatusIcon(order.status)}
//                 {order.status?.charAt(0).toUpperCase() +
//                   (order.status?.slice(1) || "")}
//               </span>
//               <div className="text-right">
//                 <div className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-800 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
//                   {formatPrice(order.total)}
//                 </div>
//                 <div className="text-sm text-slate-600 dark:text-slate-400">
//                   {order.items?.length || 0} item
//                   {(order.items?.length || 0) !== 1 ? "s" : ""}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Order Items Preview */}
//           {order.items &&
//             Array.isArray(order.items) &&
//             order.items.length > 0 && (
//               <div className="mb-6">
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
//                   {order.items.slice(0, 3).map((item, index) => (
//                     <div
//                       key={index}
//                       className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-amber-500/5 to-rose-500/5 border border-amber-500/10"
//                     >
//                       <div className="w-12 h-12 rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-800">
//                         <img
//                           src={getImageUrl(
//                             item.product?.images?.[0] ||
//                               item.product?.image ||
//                               item.image
//                           )}
//                           alt={item.product?.name || item.productName}
//                           className="w-full h-full object-contain p-1"
//                           onError={(e) => {
//                             e.target.onerror = null;
//                             e.target.src =
//                               "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop";
//                           }}
//                         />
//                       </div>
//                       <div className="flex-1">
//                         <div className="font-medium text-slate-800 dark:text-white text-sm truncate">
//                           {item.product?.name || item.productName || "Product"}
//                         </div>
//                         <div className="text-sm text-slate-600 dark:text-slate-400">
//                           Qty: {item.quantity} • {formatPrice(item.price)}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                   {order.items.length > 3 && (
//                     <div className="flex items-center justify-center p-3 rounded-xl bg-gradient-to-r from-amber-500/5 to-rose-500/5 border border-amber-500/10">
//                       <span className="text-sm font-medium text-slate-800 dark:text-slate-300">
//                         +{order.items.length - 3} more items
//                       </span>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}

//           {/* View Details Button */}
//           <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
//             <button className="flex items-center gap-2 text-sm font-medium text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors duration-300">
//               <FaReceipt />
//               {expandedOrder === order._id ? "Hide Details" : "View Details"}
//               <FaArrowRight
//                 className={`transition-transform duration-300 ${expandedOrder === order._id ? "rotate-90" : ""}`}
//               />
//             </button>
//             {isDelivered &&
//               order.items &&
//               Array.isArray(order.items) &&
//               order.items.length > 0 && (
//                 <div className="flex items-center  max-sm:flex-col gap-2">
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       if (order.items[0]?.product?._id) {
//                         navigate(`/product/${order.items[0].product._id}`);
//                       }
//                     }}
//                     className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500/10 to-amber-600/10 hover:from-amber-500/20 hover:to-amber-600/20 text-amber-700 dark:text-amber-300 font-medium border border-amber-500/20 transition-all duration-300 flex items-center gap-2"
//                   >
//                     <FaStar />
//                     Review Product
//                   </button>
//                   {/* Return Request Button */}
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       if (order.items[0]?.product) {
//                         handleReturnRequest(order, order.items[0].product);
//                       }
//                     }}
//                     className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500/10 to-pink-500/10 hover:from-rose-500/20 hover:to-pink-500/20 text-rose-700 dark:text-rose-300 font-medium border border-rose-500/20 transition-all duration-300 flex items-center gap-2"
//                   >
//                     <FaUndo />
//                     Request Return
//                   </button>
//                 </div>
//               )}
//           </div>

//           {/* Expanded Order Details */}
//           <AnimatePresence>
//             {expandedOrder === order._id &&
//               order.items &&
//               Array.isArray(order.items) && (
//                 <motion.div
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{ opacity: 1, height: "auto" }}
//                   exit={{ opacity: 0, height: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className="overflow-hidden"
//                 >
//                   <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 space-y-4">
//                     <h4 className="font-bold text-slate-800 dark:text-white">
//                       Order Details
//                     </h4>
//                     <div className="space-y-3">
//                       {order.items.map((item, index) => (
//                         <div
//                           key={index}
//                           className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-amber-500/5 to-rose-500/5 border border-amber-500/10"
//                         >
//                           <div className="flex items-center gap-3">
//                             <div className="w-16 h-16 rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-800">
//                               <img
//                                 src={getImageUrl(
//                                   item.product?.images?.[0] ||
//                                     item.product?.image ||
//                                     item.image
//                                 )}
//                                 alt={item.product?.name || item.productName}
//                                 className="w-full h-full object-contain p-1"
//                                 onError={(e) => {
//                                   e.target.onerror = null;
//                                   e.target.src =
//                                     "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop";
//                                 }}
//                               />
//                             </div>
//                             <div>
//                               <div className="font-semibold text-slate-800 dark:text-white">
//                                 {item.product?.name ||
//                                   item.productName ||
//                                   "Product"}
//                               </div>
//                               <div className="text-sm text-slate-600 dark:text-slate-400">
//                                 Quantity: {item.quantity}
//                               </div>
//                               {isDelivered && item.product && (
//                                 <button
//                                   onClick={(e) => {
//                                     e.stopPropagation();
//                                     handleReturnRequest(order, item.product);
//                                   }}
//                                   className="mt-2 px-3 py-1 text-xs rounded-lg bg-gradient-to-r from-rose-500/10 to-pink-500/10 hover:from-rose-500/20 hover:to-pink-500/20 text-rose-700 dark:text-rose-300 border border-rose-500/20 transition-all duration-300 flex items-center gap-1"
//                                 >
//                                   <FaUndo className="text-xs" />
//                                   Return Item
//                                 </button>
//                               )}
//                             </div>
//                           </div>
//                           <div className="text-right">
//                             <div className="font-bold text-slate-800 dark:text-white">
//                               {formatPrice(
//                                 (item.price || 0) * (item.quantity || 1)
//                               )}
//                             </div>
//                             <div className="text-sm text-slate-600 dark:text-slate-400">
//                               {formatPrice(item.price)} each
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     {/* Order Summary */}
//                     <div className="bg-gradient-to-r from-amber-500/10 to-rose-500/10 border border-amber-500/20 rounded-xl p-4">
//                       <div className="space-y-2">
//                         <div className="flex justify-between text-slate-700 dark:text-slate-300">
//                           <span>Subtotal</span>
//                           <span>{formatPrice(order.total)}</span>
//                         </div>
//                         <div className="flex justify-between text-slate-700 dark:text-slate-300">
//                           <span>Shipping</span>
//                           <span className="text-green-500">FREE</span>
//                         </div>
//                         <div className="flex justify-between text-slate-700 dark:text-slate-300">
//                           <span>Tax</span>
//                           <span>{formatPrice((order.total || 0) * 0.1)}</span>
//                         </div>
//                         <div className="pt-2 border-t border-amber-500/20">
//                           <div className="flex justify-between font-bold text-lg">
//                             <span className="text-slate-800 dark:text-white">
//                               Total
//                             </span>
//                             <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-rose-500 bg-clip-text text-transparent">
//                               {formatPrice((order.total || 0) * 1.1)}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </motion.div>
//               )}
//           </AnimatePresence>
//         </div>
//       </motion.div>
//     );
//   };

//   const LoadingSkeleton = () => (
//     <div className="space-y-8">
//       {[1, 2].map((section) => (
//         <div key={section} className="space-y-4">
//           <div className="h-8 bg-slate-800/50 rounded-xl w-1/4"></div>
//           {[1, 2].map((item) => (
//             <div key={item} className="animate-pulse">
//               <div className="bg-white/5 dark:bg-slate-800/50 rounded-2xl p-6 space-y-4">
//                 <div className="flex justify-between items-center">
//                   <div className="h-6 bg-slate-700/50 rounded w-1/3"></div>
//                   <div className="h-8 bg-slate-700/50 rounded-full w-24"></div>
//                 </div>
//                 <div className="h-4 bg-slate-700/50 rounded w-1/4"></div>
//                 <div className="space-y-2">
//                   {[1, 2].map((line) => (
//                     <div
//                       key={line}
//                       className="h-10 bg-slate-700/50 rounded"
//                     ></div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ))}
//     </div>
//   );

//   // Show authentication error
//   if (authError) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-amber-50/30 via-white to-rose-50/20 dark:from-slate-950/95 dark:via-slate-900 dark:to-slate-950/95 flex items-center justify-center">
//         <div className="max-w-md mx-auto p-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-xl text-center">
//           <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/10 border border-red-500/20 mb-6">
//             <FaExclamationTriangle className="text-red-400 text-3xl" />
//           </div>
//           <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">
//             Authentication Required
//           </h2>
//           <p className="text-slate-600 dark:text-slate-400 mb-6">
//             Please log in to view your order history.
//           </p>
//           <button
//             onClick={() => navigate("/login")}
//             className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 flex items-center gap-3 mx-auto"
//           >
//             <FaSignInAlt />
//             Go to Login
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Show error state
//   if (error && !loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-amber-50/30 via-white to-rose-50/20 dark:from-slate-950/95 dark:via-slate-900 dark:to-slate-950/95 flex items-center justify-center">
//         <div className="max-w-md mx-auto p-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-xl text-center">
//           <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
//             <FaExclamationTriangle className="text-yellow-400 text-3xl" />
//           </div>
//           <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">
//             Unable to Load Orders
//           </h2>
//           <p className="text-slate-600 dark:text-slate-400 mb-6">{error}</p>
//           <div className="flex gap-3 justify-center">
//             <button
//               onClick={fetchInitialOrders}
//               className="px-6 py-3 bg-gradient-to-r from-amber-500/10 to-amber-600/10 hover:from-amber-500/20 hover:to-amber-600/20 text-amber-700 dark:text-amber-300 font-medium border border-amber-500/20 rounded-xl transition-all duration-300"
//             >
//               Try Again
//             </button>
//             <button
//               onClick={() => navigate("/products")}
//               className="px-6 py-3 bg-gradient-to-r from-blue-500/10 to-blue-600/10 hover:from-blue-500/20 hover:to-blue-600/20 text-blue-700 dark:text-blue-300 font-medium border border-blue-500/20 rounded-xl transition-all duration-300"
//             >
//               Browse Products
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.8 }}
//       className="min-h-screen bg-gradient-to-br from-amber-50/30 via-white to-rose-50/20 dark:from-slate-950/95 dark:via-slate-900 dark:to-slate-950/95"
//     >
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-center mb-12"
//         >
//           <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500/10 to-rose-500/10 border border-amber-500/20 dark:border-amber-500/30 backdrop-blur-sm mb-6">
//             <FaHistory className="text-amber-600 dark:text-amber-400" />
//             <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
//               Order History
//             </span>
//           </div>

//           <h1 className="text-4xl lg:text-5xl font-bold mb-6">
//             <span className="text-slate-800 dark:text-white">Your Order</span>
//             <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-rose-500 bg-clip-text text-transparent ml-3">
//               History
//             </span>
//           </h1>

//           <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
//             Track and manage all your orders in one place
//           </p>
//         </motion.div>

//         {loading ? (
//           <LoadingSkeleton />
//         ) : (
//           <div className="space-y-12">
//             {/* Active Orders */}
//             <div>
//               <div className="flex items-center justify-between mb-8">
//                 <div className="flex items-center gap-3">
//                   <div className="p-3 rounded-xl bg-gradient-to-br from-yellow-500/10 to-amber-500/10 border border-yellow-500/20">
//                     <FaClock className="text-yellow-600 dark:text-yellow-400 text-xl" />
//                   </div>
//                   <div>
//                     <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 dark:text-white">
//                       Active Orders
//                     </h2>
//                     <p className="text-slate-600 dark:text-slate-400">
//                       Orders currently being processed
//                     </p>
//                   </div>
//                 </div>
//                 <div className="px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500/10 to-amber-500/10 text-yellow-700 dark:text-yellow-300 font-medium border border-yellow-500/20">
//                   {Array.isArray(activeOrders) ? activeOrders.length : 0} order
//                   {Array.isArray(activeOrders) && activeOrders.length !== 1
//                     ? "s"
//                     : ""}
//                 </div>
//               </div>

//               {!Array.isArray(activeOrders) || activeOrders.length === 0 ? (
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   className="text-center py-16 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-slate-700/50"
//                 >
//                   <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-amber-500/10 to-rose-500/10 mb-6">
//                     <FaShoppingBag className="text-amber-600 dark:text-amber-400 text-4xl" />
//                   </div>
//                   <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">
//                     No Active Orders
//                   </h3>
//                   <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-8">
//                     You don't have any active orders at the moment.
//                   </p>
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => navigate("/products")}
//                     className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 flex items-center gap-3 mx-auto"
//                   >
//                     <FaShoppingBag />
//                     Start Shopping
//                     <FaArrowRight />
//                   </motion.button>
//                 </motion.div>
//               ) : (
//                 <div className="space-y-6">
//                   {activeOrders.map((order, index) => (
//                     <OrderCard
//                       key={order._id || `active-${index}`}
//                       order={order}
//                     />
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Delivered Orders */}
//             <div>
//               <div className="flex items-center justify-between mb-8">
//                 <div className="flex items-center gap-3">
//                   <div className="p-3 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20">
//                     <FaCheckCircle className="text-green-600 dark:text-green-400 text-xl" />
//                   </div>
//                   <div>
//                     <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 dark:text-white">
//                       Delivered Orders
//                     </h2>
//                     <p className="text-slate-600 dark:text-slate-400">
//                       Your completed purchases
//                     </p>
//                   </div>
//                 </div>
//                 <div className="px-4 py-2 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-700 dark:text-green-300 font-medium border border-green-500/20">
//                   {Array.isArray(deliveredOrders) ? deliveredOrders.length : 0}{" "}
//                   order
//                   {Array.isArray(deliveredOrders) &&
//                   deliveredOrders.length !== 1
//                     ? "s"
//                     : ""}
//                 </div>
//               </div>

//               {!Array.isArray(deliveredOrders) ||
//               deliveredOrders.length === 0 ? (
//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.9 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   className="text-center py-16 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-slate-700/50"
//                 >
//                   <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-amber-500/10 to-rose-500/10 mb-6">
//                     <FaBoxOpen className="text-amber-600 dark:text-amber-400 text-4xl" />
//                   </div>
//                   <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">
//                     No Delivered Orders
//                   </h3>
//                   <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-8">
//                     Your delivered orders will appear here once you complete a
//                     purchase.
//                   </p>
//                 </motion.div>
//               ) : (
//                 <div className="space-y-6">
//                   {deliveredOrders.map((order, index) => (
//                     <OrderCard
//                       key={order._id || `delivered-${index}`}
//                       order={order}
//                       isDelivered
//                     />
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Return Request Modal */}
//       <ReturnRequestModal
//         isOpen={showReturnModal}
//         onClose={() => {
//           setShowReturnModal(false);
//           setSelectedOrder(null);
//           setSelectedProduct(null);
//         }}
//         order={selectedOrder}
//         product={selectedProduct}
//       />
//     </motion.div>
//   );
// };

// export default OrderHistoryPage;
import React, { useEffect, useState, useRef } from "react";
import { fetchWithAuth } from "../utils/auth";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTruck,
  FaCheckCircle,
  FaClock,
  FaShoppingBag,
  FaCalendarAlt,
  FaBox,
  FaBoxOpen,
  FaReceipt,
  FaArrowRight,
  FaHistory,
  FaStar,
  FaUndo,
  FaExclamationTriangle,
  FaSignInAlt,
  FaShoppingCart,
  FaBoxes,
  FaShippingFast,
  FaHome,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ReturnRequestModal from "../Components/ReturnRequestModal";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const OrderHistoryPage = () => {
  const [activeOrders, setActiveOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authError, setAuthError] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [theme, setTheme] = useState("light");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const navigate = useNavigate();

  // Refs to prevent infinite loops
  const mountedRef = useRef(true);
  const userRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));

  // Check and set theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.className = savedTheme;
  }, []);

  // Scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxScroll) * 100;
      setScrollProgress(progress);
      setIsScrolling(scrolled > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update user ref
  useEffect(() => {
    userRef.current = user;
  }, [user]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Main effect - runs once on mount
  useEffect(() => {
    if (!userRef.current) {
      setAuthError(true);
      setLoading(false);
      return;
    }

    // Fetch initial data
    fetchInitialOrders();

    // Cleanup function
    return () => {
      // Any cleanup if needed
    };
  }, []); // Empty dependency array - runs once on mount

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.className = newTheme;
  };

  const fetchInitialOrders = async () => {
    if (!mountedRef.current || !userRef.current) return;

    try {
      setLoading(true);
      setError(null);
      setAuthError(false);

      // Fetch ACTIVE orders
      const resActive = await fetchWithAuth(`${BACKEND_URL}/api/orders/active`);

      if (!resActive.ok) {
        if (resActive.status === 401) {
          setAuthError(true);
          localStorage.removeItem("user");
          localStorage.removeItem("accessToken");
          return;
        }
        throw new Error(`Failed to fetch active orders: ${resActive.status}`);
      }

      const activeData = await resActive.json();

      // Fetch DELIVERED orders
      const resDelivered = await fetchWithAuth(
        `${BACKEND_URL}/api/orders/delivered`
      );

      if (!resDelivered.ok) {
        if (resDelivered.status === 401) {
          setAuthError(true);
          localStorage.removeItem("user");
          localStorage.removeItem("accessToken");
          return;
        }
        throw new Error(
          `Failed to fetch delivered orders: ${resDelivered.status}`
        );
      }

      const deliveredData = await resDelivered.json();

      // Extract data from response objects with validation
      if (mountedRef.current) {
        setActiveOrders(
          Array.isArray(activeData.data)
            ? activeData.data
            : Array.isArray(activeData)
              ? activeData
              : []
        );

        setDeliveredOrders(
          Array.isArray(deliveredData.data)
            ? deliveredData.data
            : Array.isArray(deliveredData)
              ? deliveredData
              : []
        );
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      if (mountedRef.current) {
        setError(err.message);
        setActiveOrders([]);
        setDeliveredOrders([]);
      }
    } finally {
      if (mountedRef.current) {
        setLoading(false);
      }
    }
  };

  // Helper function to get the proper image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath)
      return "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop";

    if (imagePath.startsWith("http")) {
      return imagePath;
    }

    return `${BACKEND_URL}${imagePath}`;
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return "Invalid date";
    }
  };

  const formatPrice = (price) => {
    const priceNum = Number(price) || 0;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(priceNum);
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800";
      case "processing":
        return "bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800";
      case "shipped":
        return "bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-300 border-purple-200 dark:border-purple-800";
      case "delivered":
        return "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800";
      case "cancelled":
        return "bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800";
      default:
        return "bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return <FaClock />;
      case "processing":
        return <FaBox />;
      case "shipped":
        return <FaTruck />;
      case "delivered":
        return <FaCheckCircle />;
      default:
        return <FaShoppingBag />;
    }
  };

  // Handle return request for a specific product in an order
  const handleReturnRequest = (order, product) => {
    setSelectedOrder(order);
    setSelectedProduct(product);
    setShowReturnModal(true);
  };

  const OrderCard = ({ order, isDelivered = false, index }) => {
    if (!order || typeof order !== "object") return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{
          duration: 0.5,
          delay: index * 0.1,
          type: "spring",
          stiffness: 100,
          damping: 15,
        }}
        whileHover={{
          y: -8,
          scale: 1.02,
          transition: { duration: 0.3 },
        }}
        className="group relative"
      >
        {/* Floating animation */}
        <motion.div
          animate={{
            y: [0, -5, 0],
            rotate: [0, 1, -1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 dark:from-amber-500 dark:to-orange-500 opacity-20"
        />

        <div
          className={`relative bg-gradient-to-br ${
            theme === "dark"
              ? "from-slate-800/90 to-slate-900/90 border-slate-700/50"
              : "from-cream-100 to-cream-50 border-cream-300"
          } backdrop-blur-xl rounded-2xl p-6 border shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 cursor-pointer`}
          onClick={() => toggleOrderDetails(order._id)}
        >
          {/* Order Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="p-3 rounded-xl bg-gradient-to-br from-amber-400/20 to-orange-400/20 dark:from-amber-500/20 dark:to-orange-500/20 border border-amber-400/30 dark:border-amber-500/30"
              >
                {isDelivered ? (
                  <FaBoxOpen className="text-amber-600 dark:text-amber-400" />
                ) : (
                  <FaBox className="text-amber-600 dark:text-amber-400" />
                )}
              </motion.div>
              <div>
                <h3
                  className={`text-lg font-bold ${theme === "dark" ? "text-white" : "text-slate-800"}`}
                >
                  Order #
                  {order._id
                    ? order._id.slice(-8).toUpperCase()
                    : order.orderNumber || "N/A"}
                </h3>
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <FaCalendarAlt />
                  <span>{formatDate(order.createdAt)}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <motion.span
                whileHover={{ scale: 1.05 }}
                className={`px-4 py-2 rounded-full border font-medium flex items-center gap-2 ${getStatusColor(order.status)}`}
              >
                {getStatusIcon(order.status)}
                {order.status?.charAt(0).toUpperCase() +
                  (order.status?.slice(1) || "")}
              </motion.span>
              <div className="text-right">
                <div
                  className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}
                >
                  {formatPrice(order.total)}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {order.items?.length || 0} item
                  {(order.items?.length || 0) !== 1 ? "s" : ""}
                </div>
              </div>
            </div>
          </div>

          {/* Order Items Preview */}
          {order.items &&
            Array.isArray(order.items) &&
            order.items.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {order.items.slice(0, 3).map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 border border-amber-200 dark:border-amber-800/30"
                    >
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100 dark:from-slate-700 dark:to-slate-800">
                        <img
                          src={getImageUrl(
                            item.product?.images?.[0] ||
                              item.product?.image ||
                              item.image
                          )}
                          alt={item.product?.name || item.productName}
                          className="w-full h-full object-contain p-1"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop";
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-slate-800 dark:text-white text-sm truncate">
                          {item.product?.name || item.productName || "Product"}
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                          Qty: {item.quantity} • {formatPrice(item.price)}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {order.items.length > 3 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center justify-center p-3 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 border border-amber-200 dark:border-amber-800/30"
                    >
                      <span className="text-sm font-medium text-slate-800 dark:text-slate-300">
                        +{order.items.length - 3} more items
                      </span>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

          {/* View Details Button */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
            <motion.button
              whileHover={{ x: 5 }}
              className="flex items-center gap-2 text-sm font-medium text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors duration-300"
            >
              <FaReceipt />
              {expandedOrder === order._id ? "Hide Details" : "View Details"}
              <FaArrowRight
                className={`transition-transform duration-300 ${expandedOrder === order._id ? "rotate-90" : ""}`}
              />
            </motion.button>
            {isDelivered &&
              order.items &&
              Array.isArray(order.items) &&
              order.items.length > 0 && (
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (order.items[0]?.product?._id) {
                        navigate(`/product/${order.items[0].product._id}`);
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-600/20 hover:from-amber-500/30 hover:to-amber-600/30 text-amber-700 dark:text-amber-300 font-medium border border-amber-500/30 transition-all duration-300 flex items-center gap-2"
                  >
                    <FaStar />
                    Review Product
                  </motion.button>
                  {/* Return Request Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (order.items[0]?.product) {
                        handleReturnRequest(order, order.items[0].product);
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500/20 to-pink-500/20 hover:from-rose-500/30 hover:to-pink-500/30 text-rose-700 dark:text-rose-300 font-medium border border-rose-500/30 transition-all duration-300 flex items-center gap-2"
                  >
                    <FaUndo />
                    Request Return
                  </motion.button>
                </div>
              )}
          </div>

          {/* Expanded Order Details */}
          <AnimatePresence>
            {expandedOrder === order._id &&
              order.items &&
              Array.isArray(order.items) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 space-y-4">
                    <h4
                      className={`font-bold ${theme === "dark" ? "text-white" : "text-slate-800"}`}
                    >
                      Order Details
                    </h4>
                    <div className="space-y-3">
                      {order.items.map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 border border-amber-200 dark:border-amber-800/30"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-16 h-16 rounded-lg overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100 dark:from-slate-700 dark:to-slate-800">
                              <img
                                src={getImageUrl(
                                  item.product?.images?.[0] ||
                                    item.product?.image ||
                                    item.image
                                )}
                                alt={item.product?.name || item.productName}
                                className="w-full h-full object-contain p-1"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src =
                                    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop";
                                }}
                              />
                            </div>
                            <div>
                              <div className="font-semibold text-slate-800 dark:text-white">
                                {item.product?.name ||
                                  item.productName ||
                                  "Product"}
                              </div>
                              <div className="text-sm text-slate-600 dark:text-slate-400">
                                Quantity: {item.quantity}
                              </div>
                              {isDelivered && item.product && (
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleReturnRequest(order, item.product);
                                  }}
                                  className="mt-2 px-3 py-1 text-xs rounded-lg bg-gradient-to-r from-rose-500/20 to-pink-500/20 hover:from-rose-500/30 hover:to-pink-500/30 text-rose-700 dark:text-rose-300 border border-rose-500/30 transition-all duration-300 flex items-center gap-1"
                                >
                                  <FaUndo className="text-xs" />
                                  Return Item
                                </motion.button>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-slate-800 dark:text-white">
                              {formatPrice(
                                (item.price || 0) * (item.quantity || 1)
                              )}
                            </div>
                            <div className="text-sm text-slate-600 dark:text-slate-400">
                              {formatPrice(item.price)} each
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Order Summary */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 border border-amber-200 dark:border-amber-800/30 rounded-xl p-4"
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between text-slate-700 dark:text-slate-300">
                          <span>Subtotal</span>
                          <span>{formatPrice(order.total)}</span>
                        </div>
                        <div className="flex justify-between text-slate-700 dark:text-slate-300">
                          <span>Shipping</span>
                          <span className="text-green-600 dark:text-green-400">
                            FREE
                          </span>
                        </div>
                        <div className="flex justify-between text-slate-700 dark:text-slate-300">
                          <span>Tax</span>
                          <span>{formatPrice((order.total || 0) * 0.1)}</span>
                        </div>
                        <div className="pt-2 border-t border-amber-200 dark:border-amber-800/30">
                          <div className="flex justify-between font-bold text-lg">
                            <span className="text-slate-800 dark:text-white">
                              Total
                            </span>
                            <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 bg-clip-text text-transparent">
                              {formatPrice((order.total || 0) * 1.1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
          </AnimatePresence>
        </div>
      </motion.div>
    );
  };

  const LoadingSkeleton = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {[1, 2].map((section) => (
        <motion.div
          key={section}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: section * 0.2 }}
          className="space-y-4"
        >
          <div className="h-8 bg-gradient-to-r from-amber-200 to-orange-200 dark:from-slate-800/50 dark:to-slate-800/30 rounded-xl w-1/4"></div>
          {[1, 2].map((item) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: item * 0.1 }}
              className="animate-pulse"
            >
              <div className="bg-gradient-to-br from-cream-100 to-cream-50 dark:from-slate-800/50 dark:to-slate-800/30 rounded-2xl p-6 space-y-4 border border-cream-300 dark:border-slate-700/50">
                <div className="flex justify-between items-center">
                  <div className="h-6 bg-gradient-to-r from-amber-200 to-orange-200 dark:from-slate-700/50 dark:to-slate-700/30 rounded w-1/3"></div>
                  <div className="h-8 bg-gradient-to-r from-amber-200 to-orange-200 dark:from-slate-700/50 dark:to-slate-700/30 rounded-full w-24"></div>
                </div>
                <div className="h-4 bg-gradient-to-r from-amber-200 to-orange-200 dark:from-slate-700/50 dark:to-slate-700/30 rounded w-1/4"></div>
                <div className="space-y-2">
                  {[1, 2].map((line) => (
                    <div
                      key={line}
                      className="h-10 bg-gradient-to-r from-amber-200 to-orange-200 dark:from-slate-700/50 dark:to-slate-700/30 rounded"
                    ></div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ))}
    </motion.div>
  );

  // Show authentication error
  if (authError) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-amber-50/30 dark:from-slate-950/95 dark:via-slate-900 dark:to-slate-950/95 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="max-w-md mx-auto p-8 bg-gradient-to-br from-cream-100 to-cream-50 dark:from-slate-800/90 dark:to-slate-900/90 backdrop-blur-xl rounded-2xl border border-cream-300 dark:border-slate-700/50 shadow-xl text-center"
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-500/30 dark:border-red-500/50 mb-6"
          >
            <FaExclamationTriangle className="text-red-500 text-3xl" />
          </motion.div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">
            Authentication Required
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Please log in to view your order history.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 flex items-center gap-3 mx-auto"
          >
            <FaSignInAlt />
            Go to Login
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  // Show error state
  if (error && !loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-amber-50/30 dark:from-slate-950/95 dark:via-slate-900 dark:to-slate-950/95 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="max-w-md mx-auto p-8 bg-gradient-to-br from-cream-100 to-cream-50 dark:from-slate-800/90 dark:to-slate-900/90 backdrop-blur-xl rounded-2xl border border-cream-300 dark:border-slate-700/50 shadow-xl text-center"
        >
          <motion.div
            animate={{
              y: [0, -5, 0],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 dark:border-amber-500/50 mb-6"
          >
            <FaExclamationTriangle className="text-amber-500 text-3xl" />
          </motion.div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">
            Unable to Load Orders
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">{error}</p>
          <div className="flex gap-3 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={fetchInitialOrders}
              className="px-6 py-3 bg-gradient-to-r from-amber-500/20 to-amber-600/20 hover:from-amber-500/30 hover:to-amber-600/30 text-amber-700 dark:text-amber-300 font-medium border border-amber-500/30 dark:border-amber-500/50 rounded-xl transition-all duration-300"
            >
              Try Again
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/products")}
              className="px-6 py-3 bg-gradient-to-r from-blue-500/20 to-blue-600/20 hover:from-blue-500/30 hover:to-blue-600/30 text-blue-700 dark:text-blue-300 font-medium border border-blue-500/30 dark:border-blue-500/50 rounded-xl transition-all duration-300"
            >
              Browse Products
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-amber-50/30 dark:from-slate-950/95 dark:via-slate-900 dark:to-slate-950/95"
    >
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 dark:from-amber-500 dark:via-orange-500 dark:to-amber-500 z-50"
        style={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.1 }}
      />

      {/* Back to Top Button */}
      <AnimatePresence>
        {isScrolling && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full shadow-lg flex items-center justify-center z-40 hover:shadow-xl transition-all duration-300"
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Theme Toggle */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-end mb-6"
        >
          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className={`p-3 rounded-full shadow-lg ${
              theme === "dark"
                ? "bg-slate-800 text-amber-400 hover:bg-slate-700"
                : "bg-cream-300 text-cream-800 hover:bg-cream-400"
            } transition-all duration-300`}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <FaSun size={20} /> : <FaMoon size={20} />}
          </motion.button>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400/20 to-orange-400/20 dark:from-amber-500/20 dark:to-orange-500/20 border border-amber-400/30 dark:border-amber-500/30 backdrop-blur-sm mb-6"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <FaHistory className="text-amber-600 dark:text-amber-400" />
            </motion.div>
            <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
              Order History
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl lg:text-5xl font-bold mb-6"
          >
            <span
              className={theme === "dark" ? "text-white" : "text-slate-800"}
            >
              Your Order
            </span>
            <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 bg-clip-text text-transparent ml-3">
              History
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`text-lg ${theme === "dark" ? "text-slate-300" : "text-slate-600"} max-w-2xl mx-auto`}
          >
            Track and manage all your orders in one place
          </motion.p>
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap gap-3 justify-center mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/products")}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-blue-600/20 hover:from-blue-500/30 hover:to-blue-600/30 text-blue-700 dark:text-blue-300 font-medium border border-blue-500/30 dark:border-blue-500/50 transition-all duration-300 flex items-center gap-2"
          >
            <FaShoppingCart />
            Continue Shopping
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 text-green-700 dark:text-green-300 font-medium border border-green-500/30 dark:border-green-500/50 transition-all duration-300 flex items-center gap-2"
          >
            <FaHome />
            Go Home
          </motion.button>
        </motion.div>

        {loading ? (
          <LoadingSkeleton />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-12"
          >
            {/* Active Orders */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="p-3 rounded-xl bg-gradient-to-br from-yellow-400/20 to-amber-400/20 dark:from-yellow-500/20 dark:to-amber-500/20 border border-yellow-400/30 dark:border-yellow-500/30"
                  >
                    <FaClock className="text-yellow-600 dark:text-yellow-400 text-xl" />
                  </motion.div>
                  <div>
                    <h2
                      className={`text-2xl lg:text-3xl font-bold ${theme === "dark" ? "text-white" : "text-slate-800"}`}
                    >
                      Active Orders
                    </h2>
                    <p
                      className={`${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}
                    >
                      Orders currently being processed
                    </p>
                  </div>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400/20 to-amber-400/20 dark:from-yellow-500/20 dark:to-amber-500/20 text-yellow-700 dark:text-yellow-300 font-medium border border-yellow-400/30 dark:border-yellow-500/30"
                >
                  {Array.isArray(activeOrders) ? activeOrders.length : 0} order
                  {Array.isArray(activeOrders) && activeOrders.length !== 1
                    ? "s"
                    : ""}
                </motion.div>
              </div>

              {!Array.isArray(activeOrders) || activeOrders.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16 bg-gradient-to-br from-cream-100 to-cream-50 dark:from-slate-800/50 dark:to-slate-800/30 backdrop-blur-sm rounded-2xl border border-cream-300 dark:border-slate-700/50"
                >
                  <motion.div
                    animate={{
                      y: [0, -10, 0],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-amber-400/20 to-orange-400/20 dark:from-amber-500/20 dark:to-orange-500/20 mb-6"
                  >
                    <FaShoppingBag className="text-amber-600 dark:text-amber-400 text-4xl" />
                  </motion.div>
                  <h3
                    className={`text-2xl font-bold mb-3 ${theme === "dark" ? "text-white" : "text-slate-800"}`}
                  >
                    No Active Orders
                  </h3>
                  <p
                    className={`max-w-md mx-auto mb-8 ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}
                  >
                    You don't have any active orders at the moment.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/products")}
                    className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 flex items-center gap-3 mx-auto"
                  >
                    <FaShoppingBag />
                    Start Shopping
                    <FaArrowRight />
                  </motion.button>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  {activeOrders.map((order, index) => (
                    <OrderCard
                      key={order._id || `active-${index}`}
                      order={order}
                      index={index}
                    />
                  ))}
                </div>
              )}
            </motion.div>

            {/* Delivered Orders */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="p-3 rounded-xl bg-gradient-to-br from-green-400/20 to-emerald-400/20 dark:from-green-500/20 dark:to-emerald-500/20 border border-green-400/30 dark:border-green-500/30"
                  >
                    <FaCheckCircle className="text-green-600 dark:text-green-400 text-xl" />
                  </motion.div>
                  <div>
                    <h2
                      className={`text-2xl lg:text-3xl font-bold ${theme === "dark" ? "text-white" : "text-slate-800"}`}
                    >
                      Delivered Orders
                    </h2>
                    <p
                      className={`${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}
                    >
                      Your completed purchases
                    </p>
                  </div>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-green-400/20 to-emerald-400/20 dark:from-green-500/20 dark:to-emerald-500/20 text-green-700 dark:text-green-300 font-medium border border-green-400/30 dark:border-green-500/30"
                >
                  {Array.isArray(deliveredOrders) ? deliveredOrders.length : 0}{" "}
                  order
                  {Array.isArray(deliveredOrders) &&
                  deliveredOrders.length !== 1
                    ? "s"
                    : ""}
                </motion.div>
              </div>

              {!Array.isArray(deliveredOrders) ||
              deliveredOrders.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16 bg-gradient-to-br from-cream-100 to-cream-50 dark:from-slate-800/50 dark:to-slate-800/30 backdrop-blur-sm rounded-2xl border border-cream-300 dark:border-slate-700/50"
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-amber-400/20 to-orange-400/20 dark:from-amber-500/20 dark:to-orange-500/20 mb-6"
                  >
                    <FaBoxOpen className="text-amber-600 dark:text-amber-400 text-4xl" />
                  </motion.div>
                  <h3
                    className={`text-2xl font-bold mb-3 ${theme === "dark" ? "text-white" : "text-slate-800"}`}
                  >
                    No Delivered Orders
                  </h3>
                  <p
                    className={`max-w-md mx-auto mb-8 ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}
                  >
                    Your delivered orders will appear here once you complete a
                    purchase.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/products")}
                    className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 flex items-center gap-3 mx-auto"
                  >
                    <FaBoxes />
                    Browse Products
                    <FaArrowRight />
                  </motion.button>
                </motion.div>
              ) : (
                <div className="space-y-6">
                  {deliveredOrders.map((order, index) => (
                    <OrderCard
                      key={order._id || `delivered-${index}`}
                      order={order}
                      isDelivered
                      index={index}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Return Request Modal */}
      <ReturnRequestModal
        isOpen={showReturnModal}
        onClose={() => {
          setShowReturnModal(false);
          setSelectedOrder(null);
          setSelectedProduct(null);
        }}
        order={selectedOrder}
        product={selectedProduct}
      />
    </motion.div>
  );
};

export default OrderHistoryPage;
