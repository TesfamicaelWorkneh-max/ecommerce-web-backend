import React, { useEffect, useContext, useState } from "react";
import { cartContext } from "../Context/cartContext";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../utils/auth";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTrash,
  FaPlus,
  FaMinus,
  FaShoppingBag,
  FaShoppingCart,
  FaArrowRight,
  FaTags,
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaCreditCard,
} from "react-icons/fa";
import { MdRemoveShoppingCart } from "react-icons/md";
import { IoSparkles } from "react-icons/io5";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const CartPage = () => {
  const { cart, setCart } = useContext(cartContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const getCart = async () => {
    setLoading(true);
    try {
      const res = await fetchWithAuth(`${BACKEND_URL}/api/cart`);
      const data = await res.json();
      setCart(data);
    } catch (err) {
      console.error("Error fetching cart:", err);
      toast.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;

    setUpdatingId(productId);
    try {
      const res = await fetchWithAuth(
        `${BACKEND_URL}/api/cart/update/${productId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      setCart(data);
      toast.success("Quantity updated!");
    } catch (err) {
      console.error("Update quantity error:", err);
      toast.error("Failed to update quantity");
    } finally {
      setUpdatingId(null);
    }
  };

  const removeItem = async (productId) => {
    setRemovingId(productId);
    try {
      const res = await fetchWithAuth(`${BACKEND_URL}/api/cart/remove`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      setCart(data);
      toast.success("Item removed from cart");
    } catch (err) {
      console.error("Remove item error:", err);
      toast.error("Failed to remove item");
    } finally {
      setRemovingId(null);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  // Helper function to get the proper image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath)
      return "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop";

    // If it's already a full URL, return as is
    if (imagePath.startsWith("http")) {
      return imagePath;
    }

    // If it's a relative path, prepend the backend URL
    return `${BACKEND_URL}${imagePath}`;
  };

  const total =
    cart?.items?.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    ) || 0;

  const itemCount =
    cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
    exit: {
      opacity: 0,
      x: -100,
      transition: { duration: 0.3 },
    },
  };

  const LoadingSkeleton = () => (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="animate-pulse space-y-8">
        <div className="h-12 bg-slate-800/50 rounded-xl w-1/4 mx-auto"></div>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex gap-6 p-6 bg-white/5 dark:bg-slate-800/50 rounded-2xl backdrop-blur-sm"
          >
            <div className="w-32 h-32 bg-slate-700/50 rounded-xl"></div>
            <div className="flex-1 space-y-3">
              <div className="h-6 bg-slate-700/50 rounded w-3/4"></div>
              <div className="h-4 bg-slate-700/50 rounded w-1/2"></div>
              <div className="h-8 bg-slate-700/50 rounded w-32"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen max-sm:py-24 lg:py-10 bg-gradient-to-br from-amber-50/30 via-white to-rose-50/20 dark:from-slate-950/95 dark:via-slate-900 dark:to-slate-950/95"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500/10 to-rose-500/10 border border-amber-500/20 dark:border-amber-500/30 backdrop-blur-sm mb-6">
            <IoSparkles className="text-amber-600 dark:text-amber-400" />
            <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
              Your Shopping Cart
            </span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-slate-800 dark:text-white">Shopping</span>
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-rose-500 bg-clip-text text-transparent ml-3">
              Cart
            </span>
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Review and manage your items before checkout
          </p>
        </motion.div>

        {loading ? (
          <LoadingSkeleton />
        ) : !cart || cart.items?.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-r from-amber-500/10 to-rose-500/10 mb-6">
              <MdRemoveShoppingCart className="text-amber-600 dark:text-amber-400 text-5xl" />
            </div>
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
              Your cart is empty
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-8">
              Looks like you haven't added any items to your cart yet. Start
              shopping to fill it up!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/products")}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold flex items-center gap-3 hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300"
            >
              <FaShoppingBag />
              Start Shopping
              <FaArrowRight />
            </motion.button>
          </motion.div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items Section */}
            <div className="lg:w-2/3">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FaShoppingCart className="text-amber-600 dark:text-amber-400 text-xl" />
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                    Cart Items ({itemCount})
                  </h2>
                </div>
                <div className="text-slate-600 dark:text-slate-400">
                  Total:{" "}
                  <span className="font-bold text-amber-600 dark:text-amber-400">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <AnimatePresence>
                  {cart.items.map((item) => (
                    <motion.div
                      key={item.product._id}
                      variants={itemVariants}
                      layout
                      exit="exit"
                      className="group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/50 shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300"
                    >
                      {removingId === item.product._id && (
                        <div className="absolute inset-0 bg-black/80 rounded-2xl flex items-center justify-center z-10">
                          <div className="text-center">
                            <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                            <p className="text-gray-300">Removing...</p>
                          </div>
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row gap-6">
                        {/* Product Image */}
                        <div className="relative flex-shrink-0">
                          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-xl overflow-hidden">
                            <img
                              src={getImageUrl(
                                item.product.images?.[0] || item.product.image
                              )}
                              alt={item.product.name}
                              className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop";
                              }}
                            />
                          </div>
                          {item.quantity >= item.product.stock && (
                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                              Max
                            </span>
                          )}
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-1 line-clamp-1">
                                {item.product.name}
                              </h3>
                              {item.product.isSold && (
                                <span className="inline-block px-3 py-1 rounded-full bg-gradient-to-r from-red-500/10 to-pink-500/10 text-red-700 dark:text-red-300 text-xs font-medium border border-red-500/20">
                                  Sold Out
                                </span>
                              )}
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removeItem(item.product._id)}
                              disabled={removingId === item.product._id}
                              className="p-3 rounded-xl bg-gradient-to-br from-red-500/10 to-pink-500/10 hover:from-red-500/20 hover:to-pink-500/20 border border-red-500/20 transition-all duration-300"
                            >
                              <FaTrash className="text-red-500" />
                            </motion.button>
                          </div>

                          {/* Price */}
                          <div className="flex items-baseline gap-3 mb-4">
                            <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-800 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
                              {formatPrice(item.product.price)}
                            </span>
                            <span className="text-lg text-slate-600 dark:text-slate-400">
                              each
                            </span>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-3 bg-gradient-to-r from-amber-500/5 to-rose-500/5 rounded-full p-1 border border-amber-500/20">
                                <motion.button
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() =>
                                    updateQuantity(
                                      item.product._id,
                                      item.quantity - 1
                                    )
                                  }
                                  disabled={
                                    item.quantity <= 1 ||
                                    updatingId === item.product._id
                                  }
                                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-red-500/10 to-pink-500/10 hover:from-red-500/20 hover:to-pink-500/20 border border-red-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                                >
                                  <FaMinus className="text-red-500" />
                                </motion.button>

                                <div className="relative">
                                  {updatingId === item.product._id ? (
                                    <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                                  ) : (
                                    <>
                                      <span className="text-xl font-bold text-slate-800 dark:text-white min-w-[40px] inline-block text-center">
                                        {item.quantity}
                                      </span>
                                    </>
                                  )}
                                </div>

                                <motion.button
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() =>
                                    updateQuantity(
                                      item.product._id,
                                      item.quantity + 1
                                    )
                                  }
                                  disabled={
                                    item.quantity >= item.product.stock ||
                                    updatingId === item.product._id
                                  }
                                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 hover:from-green-500/20 hover:to-emerald-500/20 border border-green-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                                >
                                  <FaPlus className="text-green-500" />
                                </motion.button>
                              </div>

                              {/* Item Total */}
                              <div className="text-lg font-bold text-amber-600 dark:text-amber-400">
                                {formatPrice(
                                  item.product.price * item.quantity
                                )}
                              </div>
                            </div>

                            {/* Stock Info */}
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/5 to-emerald-500/5 border border-green-500/20">
                              <div
                                className={`w-2 h-2 rounded-full ${item.product.stock - item.quantity <= 5 ? "bg-red-500 animate-pulse" : "bg-green-500"}`}
                              />
                              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                {item.product.stock - item.quantity} left in
                                stock
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Continue Shopping Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/products")}
                className="mt-8 px-6 py-3.5 rounded-xl bg-gradient-to-r from-slate-100 to-gray-100 dark:from-slate-700 dark:to-slate-800 text-slate-700 dark:text-slate-300 font-semibold border border-slate-300 dark:border-slate-600 hover:shadow-xl transition-all duration-300 flex items-center gap-3"
              >
                <FaShoppingBag />
                Continue Shopping
                <FaArrowRight />
              </motion.button>
            </div>

            {/* Order Summary Section */}
            <div className="lg:w-1/3">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="sticky top-24 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/50 shadow-xl"
              >
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200 dark:border-slate-700">
                  <FaCreditCard className="text-amber-600 dark:text-amber-400 text-xl" />
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                    Order Summary
                  </h2>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-slate-400">
                      Subtotal
                    </span>
                    <span className="text-xl font-bold text-slate-800 dark:text-white">
                      {formatPrice(total)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-600 dark:text-slate-400">
                      Shipping
                    </span>
                    <span className="text-green-500 font-semibold">FREE</span>
                  </div>

                  <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                    <span>Estimated tax</span>
                    <span>{formatPrice(total * 0.1)}</span>
                  </div>
                </div>

                <div className="py-4 border-y border-slate-200 dark:border-slate-700 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-slate-800 dark:text-white">
                      Total
                    </span>
                    <div className="text-right">
                      <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 via-amber-500 to-rose-500 bg-clip-text text-transparent">
                        {formatPrice(total * 1.1)}
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        Including tax
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate("/checkout")}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50"
                  >
                    <FaCreditCard />
                    Proceed to Checkout
                    <FaArrowRight />
                  </motion.button>
                </div>

                {/* Trust Badges */}
                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-green-500/5 to-emerald-500/5 border border-green-500/10">
                      <FaTruck className="text-green-600 dark:text-green-400" />
                      <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                        Free Shipping
                      </span>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-blue-500/5 to-cyan-500/5 border border-blue-500/10">
                      <FaShieldAlt className="text-blue-600 dark:text-blue-400" />
                      <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                        Secure
                      </span>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-purple-500/5 to-pink-500/5 border border-purple-500/10">
                      <FaUndo className="text-purple-600 dark:text-purple-400" />
                      <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                        Easy Returns
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Promo Banner */}
              {total < 100 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-6 bg-gradient-to-r from-amber-500/10 to-rose-500/10 backdrop-blur-sm rounded-2xl p-4 border border-amber-500/20"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                      <span className="text-lg font-bold text-white">%</span>
                    </div>
                    <div>
                      <div className="font-bold text-slate-800 dark:text-white">
                        Free shipping on orders over $100
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        ${(100 - total).toFixed(2)} more to save on shipping!
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CartPage;

// import React, { useEffect, useContext, useState } from "react";
// import { cartContext } from "../Context/cartContext";
// import { useNavigate } from "react-router-dom";
// import { fetchWithAuth } from "../utils/auth";
// import toast from "react-hot-toast";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FaTrash,
//   FaPlus,
//   FaMinus,
//   FaShoppingBag,
//   FaShoppingCart,
//   FaArrowRight,
//   FaTags,
//   FaTruck,
//   FaShieldAlt,
//   FaUndo,
//   FaCreditCard,
// } from "react-icons/fa";
// import { MdRemoveShoppingCart } from "react-icons/md";
// import { IoSparkles } from "react-icons/io5";

// const BASE_URL = "http://localhost:3000";

// const CartPage = () => {
//   const { cart, setCart } = useContext(cartContext);
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [removingId, setRemovingId] = useState(null);
//   const [updatingId, setUpdatingId] = useState(null);

//   // ✅ IMAGE FIX (ONLY ADDITION)
//   const getImageSrc = (product) => {
//     const img =
//       product?.images?.[0] ||
//       product?.image ||
//       "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400";

//     if (img.startsWith("http")) return img;
//     return `${BASE_URL}${img.startsWith("/") ? img : "/" + img}`;
//   };

//   const getCart = async () => {
//     setLoading(true);
//     try {
//       const res = await fetchWithAuth("http://localhost:3000/api/cart");
//       const data = await res.json();
//       setCart(data);
//     } catch (err) {
//       console.error("Error fetching cart:", err);
//       toast.error("Failed to load cart");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateQuantity = async (productId, quantity) => {
//     if (quantity < 1) return;

//     setUpdatingId(productId);
//     try {
//       const res = await fetchWithAuth(
//         `http://localhost:3000/api/cart/update/${productId}`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ quantity }),
//         }
//       );

//       const data = await res.json();
//       if (!res.ok) return toast.error(data.message);

//       setCart(data);
//       toast.success("Quantity updated!");
//     } catch {
//       toast.error("Failed to update quantity");
//     } finally {
//       setUpdatingId(null);
//     }
//   };

//   const removeItem = async (productId) => {
//     setRemovingId(productId);
//     try {
//       const res = await fetchWithAuth("http://localhost:3000/api/cart/remove", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ productId }),
//       });
//       const data = await res.json();
//       setCart(data);
//       toast.success("Item removed");
//     } catch {
//       toast.error("Failed to remove item");
//     } finally {
//       setRemovingId(null);
//     }
//   };

//   useEffect(() => {
//     getCart();
//   }, []);

//   const total =
//     cart?.items?.reduce(
//       (sum, item) => sum + item.product.price * item.quantity,
//       0
//     ) || 0;

//   const itemCount =
//     cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="min-h-screen bg-gradient-to-br from-amber-50/30 via-white to-rose-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
//     >
//       <div className="max-w-7xl mx-auto px-4 py-12">
//         {loading ? null : !cart || cart.items?.length === 0 ? (
//           <div className="text-center py-20">
//             <MdRemoveShoppingCart className="mx-auto text-5xl text-amber-500" />
//             <h2 className="text-2xl font-bold mt-4">Your cart is empty</h2>
//           </div>
//         ) : (
//           <div className="flex flex-col lg:flex-row gap-8">
//             <div className="lg:w-2/3 space-y-6">
//               <AnimatePresence>
//                 {cart.items.map((item) => (
//                   <motion.div
//                     key={item.product._id}
//                     layout
//                     className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl"
//                   >
//                     <div className="flex gap-6">
//                       {/* ✅ IMAGE FIX APPLIED HERE */}
//                       <div className="w-40 h-40 rounded-xl overflow-hidden bg-gray-100 dark:bg-slate-700">
//                         <img
//                           src={getImageSrc(item.product)}
//                           alt={item.product.name}
//                           className="w-full h-full object-contain p-2"
//                         />
//                       </div>

//                       <div className="flex-1">
//                         <h3 className="text-xl font-bold">
//                           {item.product.name}
//                         </h3>
//                         <p className="text-amber-600 font-bold mt-2">
//                           ${item.product.price}
//                         </p>

//                         <div className="flex items-center gap-3 mt-4">
//                           <button
//                             onClick={() =>
//                               updateQuantity(
//                                 item.product._id,
//                                 item.quantity - 1
//                               )
//                             }
//                           >
//                             <FaMinus />
//                           </button>

//                           <span className="font-bold">{item.quantity}</span>

//                           <button
//                             onClick={() =>
//                               updateQuantity(
//                                 item.product._id,
//                                 item.quantity + 1
//                               )
//                             }
//                           >
//                             <FaPlus />
//                           </button>

//                           <button
//                             onClick={() => removeItem(item.product._id)}
//                             className="ml-auto text-red-500"
//                           >
//                             <FaTrash />
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//             </div>

//             <div className="lg:w-1/3 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl h-fit">
//               <h2 className="text-2xl font-bold mb-4">Summary</h2>
//               <p>Total items: {itemCount}</p>
//               <p className="text-2xl font-bold mt-2">${total.toFixed(2)}</p>

//               <button
//                 onClick={() => navigate("/checkout")}
//                 className="w-full mt-6 py-3 rounded-xl bg-amber-500 text-white font-bold"
//               >
//                 Checkout
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </motion.div>
//   );
// };

// export default CartPage;
