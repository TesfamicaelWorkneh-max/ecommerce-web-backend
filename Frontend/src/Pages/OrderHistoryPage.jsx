import React, { useEffect, useState, useRef } from "react";
import { fetchWithAuth } from "../utils/auth";
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
  FaHome,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ReturnRequestModal from "../Components/ReturnRequestModal";

const BACKEND_URL = import.meta.env.VITE_API_URL;

// Animation variants
const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

const fadeIn = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const slideInRight = {
  hidden: {
    opacity: 0,
    x: 50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

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
  const navigate = useNavigate();

  const mountedRef = useRef(true);
  const userRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    userRef.current = user;
  }, [user]);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!userRef.current) {
      setAuthError(true);
      setLoading(false);
      return;
    }
    fetchInitialOrders();
  }, []);

  const fetchInitialOrders = async () => {
    if (!mountedRef.current || !userRef.current) return;

    try {
      setLoading(true);
      setError(null);
      setAuthError(false);

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
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "shipped":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
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

  const handleReturnRequest = (order, product) => {
    setSelectedOrder(order);
    setSelectedProduct(product);
    setShowReturnModal(true);
  };

  const OrderCard = ({ order, isDelivered = false, index }) => {
    if (!order || typeof order !== "object") return null;
    const isExpanded = expandedOrder === order._id;

    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={slideInRight}
        className="group relative"
      >
        <div
          className={`relative bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-300`}
          onClick={() => toggleOrderDetails(order._id)}
        >
          {/* Order Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
                {isDelivered ? (
                  <FaBoxOpen className="text-gray-600 dark:text-gray-300" />
                ) : (
                  <FaBox className="text-gray-600 dark:text-gray-300" />
                )}
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Order #
                  {order._id
                    ? order._id.slice(-8).toUpperCase()
                    : order.orderNumber || "N/A"}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <FaCalendarAlt />
                  <span>{formatDate(order.createdAt)}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span
                className={`px-4 py-2 rounded-full border font-medium flex items-center gap-2 ${getStatusColor(order.status)} dark:border-gray-600`}
              >
                {getStatusIcon(order.status)}
                {order.status?.charAt(0).toUpperCase() +
                  (order.status?.slice(1) || "")}
              </span>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatPrice(order.total)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
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
              <div className="mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {order.items.slice(0, 3).map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                    >
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-600">
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
                        <div className="font-medium text-gray-800 dark:text-gray-200 text-sm truncate">
                          {item.product?.name || item.productName || "Product"}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          Qty: {item.quantity} • {formatPrice(item.price)}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  {order.items.length > 3 && (
                    <div className="flex items-center justify-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        +{order.items.length - 3} more items
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

          {/* View Details Button */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <button className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 group/btn">
              <FaReceipt className="group-hover/btn:text-blue-500 transition-colors duration-300" />
              {isExpanded ? "Hide Details" : "View Details"}
              <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform duration-300" />
            </button>
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
                    className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
                  >
                    <FaStar />
                    Review Product
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (order.items[0]?.product) {
                        handleReturnRequest(order, order.items[0].product);
                      }
                    }}
                    className="px-4 py-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 font-medium border border-red-300 dark:border-red-700 hover:bg-red-200 dark:hover:bg-red-800/50 transition-colors duration-300"
                  >
                    <FaUndo />
                    Request Return
                  </motion.button>
                </div>
              )}
          </div>

          {/* Expanded Order Details */}
          {isExpanded && order.items && Array.isArray(order.items) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
              className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-4"
            >
              <h4 className="font-bold text-gray-800 dark:text-white">
                Order Details
              </h4>
              <div className="space-y-3">
                {order.items.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-600">
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
                        <div className="font-semibold text-gray-800 dark:text-white">
                          {item.product?.name || item.productName || "Product"}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
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
                            className="mt-2 px-3 py-1 text-xs rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-700 hover:bg-red-200 dark:hover:bg-red-800/50 transition-colors duration-300"
                          >
                            <FaUndo className="text-xs" />
                            Return Item
                          </motion.button>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-800 dark:text-white">
                        {formatPrice((item.price || 0) * (item.quantity || 1))}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {formatPrice(item.price)} each
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4"
              >
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-700 dark:text-gray-300">
                    <span>Subtotal</span>
                    <span>{formatPrice(order.total)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700 dark:text-gray-300">
                    <span>Shipping</span>
                    <span className="text-green-600 dark:text-green-400">
                      FREE
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-700 dark:text-gray-300">
                    <span>Tax</span>
                    <span>{formatPrice((order.total || 0) * 0.1)}</span>
                  </div>
                  <div className="pt-2 border-t border-gray-300 dark:border-gray-600">
                    <div className="flex justify-between font-bold text-lg">
                      <span className="text-gray-800 dark:text-white">
                        Total
                      </span>
                      <span className="text-gray-800 dark:text-white">
                        {formatPrice((order.total || 0) * 1.1)}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
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
        <div key={section} className="space-y-4">
          <div className="h-8 rounded-lg bg-gray-200 dark:bg-gray-700 w-1/4 animate-pulse"></div>
          {[1, 2].map((item) => (
            <div
              key={item}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 space-y-4"
            >
              <div className="flex justify-between items-center">
                <div className="h-6 rounded bg-gray-200 dark:bg-gray-700 w-1/3 animate-pulse"></div>
                <div className="h-8 rounded-full bg-gray-200 dark:bg-gray-700 w-24 animate-pulse"></div>
              </div>
              <div className="h-4 rounded bg-gray-200 dark:bg-gray-700 w-1/4 animate-pulse"></div>
              <div className="space-y-2">
                {[1, 2].map((line) => (
                  <div
                    key={line}
                    className="h-10 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </motion.div>
  );

  if (authError) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-center shadow-xl"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30 mb-6">
            <FaExclamationTriangle className="text-red-500 text-3xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
            Authentication Required
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Please log in to view your order history.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-gray-800 dark:bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <FaSignInAlt />
            Go to Login
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (error && !loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-center shadow-xl"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-100 dark:bg-yellow-900/30 mb-6">
            <FaExclamationTriangle className="text-yellow-500 text-3xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
            Unable to Load Orders
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
          <div className="flex gap-3 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={fetchInitialOrders}
              className="px-6 py-3 bg-gray-800 dark:bg-gray-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              Try Again
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/products")}
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              Browse Products
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <motion.div
            variants={fadeIn}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-100 dark:bg-gray-800 mb-6"
          >
            <FaHistory className="text-gray-600 dark:text-gray-300" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Order History
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl lg:text-5xl font-bold mb-6"
          >
            <span className="text-gray-800 dark:text-white">Your Order</span>
            <span className="text-gray-600 dark:text-gray-300 ml-3">
              History
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Track and manage all your orders in one place
          </motion.p>
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="flex flex-wrap gap-3 justify-center mb-8"
        >
          <motion.button
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/products")}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium border border-blue-700 shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <FaShoppingCart />
            Continue Shopping
          </motion.button>
          <motion.button
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/")}
            className="px-4 py-2 rounded-lg bg-green-600 text-white font-medium border border-green-700 shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <FaHome />
            Go Home
          </motion.button>
        </motion.div>

        {loading ? (
          <LoadingSkeleton />
        ) : (
          <div className="space-y-12">
            {/* Active Orders */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-yellow-100 dark:bg-yellow-900/30">
                    <FaClock className="text-yellow-600 dark:text-yellow-400 text-xl" />
                  </div>
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white">
                      Active Orders
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      Orders currently being processed
                    </p>
                  </div>
                </div>
                <div className="px-4 py-2 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 font-medium border border-yellow-300 dark:border-yellow-700">
                  {Array.isArray(activeOrders) ? activeOrders.length : 0} order
                  {Array.isArray(activeOrders) && activeOrders.length !== 1
                    ? "s"
                    : ""}
                </div>
              </div>

              {!Array.isArray(activeOrders) || activeOrders.length === 0 ? (
                <motion.div
                  variants={fadeInUp}
                  className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-700 mb-6">
                    <FaShoppingBag className="text-gray-600 dark:text-gray-300 text-4xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                    No Active Orders
                  </h3>
                  <p className="max-w-md mx-auto mb-8 text-gray-600 dark:text-gray-300">
                    You don't have any active orders at the moment.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/products")}
                    className="px-8 py-3.5 rounded-lg bg-gray-800 dark:bg-gray-700 text-white font-semibold shadow-md hover:shadow-lg transition-shadow duration-300"
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
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer}
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/30">
                    <FaCheckCircle className="text-green-600 dark:text-green-400 text-xl" />
                  </div>
                  <div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white">
                      Delivered Orders
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      Your completed purchases
                    </p>
                  </div>
                </div>
                <div className="px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 font-medium border border-green-300 dark:border-green-700">
                  {Array.isArray(deliveredOrders) ? deliveredOrders.length : 0}{" "}
                  order
                  {Array.isArray(deliveredOrders) &&
                  deliveredOrders.length !== 1
                    ? "s"
                    : ""}
                </div>
              </div>

              {!Array.isArray(deliveredOrders) ||
              deliveredOrders.length === 0 ? (
                <motion.div
                  variants={fadeInUp}
                  className="text-center py-16 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-700 mb-6">
                    <FaBoxOpen className="text-gray-600 dark:text-gray-300 text-4xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                    No Delivered Orders
                  </h3>
                  <p className="max-w-md mx-auto mb-8 text-gray-600 dark:text-gray-300">
                    Your delivered orders will appear here once you complete a
                    purchase.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate("/products")}
                    className="px-8 py-3.5 rounded-lg bg-gray-800 dark:bg-gray-700 text-white font-semibold shadow-md hover:shadow-lg transition-shadow duration-300"
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
          </div>
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
    </div>
  );
};

export default OrderHistoryPage;
