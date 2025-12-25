// import React, { useEffect, useState } from "react";
// import { cartContext } from "../Context/cartContext";
// import { useContext } from "react";
// import { fetchWithAuth } from "../utils/auth";
// const CheckoutPage = () => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const [loading, setLoading] = useState(false);
//   const [txRef, setTxRef] = useState(null);
//   const { cart, setCart } = useContext(cartContext);

//   // Calculate total
//   const totalAmount = cart.items.reduce(
//     (sum, item) => sum + item.product.price * item.quantity,
//     0
//   );
//   const total = totalAmount;
//   const handleChapaPayment = async () => {
//     setLoading(true);
//     try {
//       console.log("🚀 Starting payment init...");

//       const res = await fetchWithAuth(
//         "http://localhost:3000/api/payment/chapa/init",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       const data = await res.json();
//       console.log("💳 Chapa init response:", data);

//       if (!data.payment_url) {
//         alert("Payment init failed. Check console logs.");
//         setLoading(false);
//         return;
//       }

//       setTxRef(data.tx_ref);
//       console.log("🔗 Redirecting to Chapa checkout:", data.payment_url);
//       setCart(null);
//       window.location.href = data.payment_url;
//     } catch (err) {
//       console.error("❌ Payment error:", err);
//       alert("Payment request failed. Check console logs.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center bg-slate-900 text-white">
//       <h1 className="text-2xl font-bold mb-4">Checkout</h1>

//       <p className="mt-4 text-xl">Total:{total}ETB</p>

//       <button
//         onClick={handleChapaPayment}
//         disabled={loading}
//         className="mt-4 px-6 py-3 bg-green-600 hover:bg-green-700 rounded"
//       >
//         {loading ? "Processing..." : "Pay with Chapa"}
//       </button>
//     </div>
//   );
// };

// export default CheckoutPage;
import React, { useEffect, useState, useContext } from "react";
import { cartContext } from "../Context/cartContext";
import { fetchWithAuth } from "../utils/auth";
import { motion } from "framer-motion";
import {
  FaCreditCard,
  FaShieldAlt,
  FaLock,
  FaCheckCircle,
  FaShoppingBag,
  FaArrowLeft,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaReceipt,
} from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getImageUrl } from "../utils/imageUtils";
const BACKEND_URL = import.meta.env.VITE_API_URL;
const CheckoutPage = () => {
  const [loading, setLoading] = useState(false);
  const [txRef, setTxRef] = useState(null);
  const { cart, setCart } = useContext(cartContext);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  // Calculate totals
  const subtotal =
    cart?.items?.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    ) || 0;

  const shipping = subtotal >= 100 ? 0 : 9.99;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;
  const handleChapaPayment = async () => {
    if (!cart?.items?.length) {
      toast.error("Your cart is empty");
      navigate("/cart");
      return;
    }

    setLoading(true); // Show loading overlay/spinner
    try {
      const res = await fetchWithAuth(`${BACKEND_URL}/api/payment/chapa/init`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (!data.payment_url) {
        toast.error("Payment initialization failed");
        setLoading(false);
        return;
      }

      // Optional: show toast
      toast.success("Redirecting to secure payment...");

      // Redirect user to Chapa checkout after short delay
      setTxRef(data.tx_ref);
      setTimeout(() => {
        window.location.href = data.payment_url;
      }, 500);
      // 0.5s delay so spinner appears
      setCart({ items: [] });
      localStorage.removeItem("cart");
    } catch (err) {
      console.error("Payment error:", err);
      toast.error("Payment request failed");
      setLoading(false);
    }
  };

  // const handleChapaPayment = async () => {
  //   if (!cart?.items?.length) {
  //     toast.error("Your cart is empty");
  //     navigate("/cart");
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     console.log("🚀 Starting payment init...");

  //     const res = await fetchWithAuth(
  //      `${BACKEND_URL}/api/payment/chapa/init`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     const data = await res.json();
  //     console.log("💳 Chapa init response:", data);

  //     if (!data.payment_url) {
  //       toast.error("Payment initialization failed");
  //       setLoading(false);
  //       return;
  //     }

  //     setTxRef(data.tx_ref);
  //     console.log("🔗 Redirecting to Chapa checkout:", data.payment_url);

  //     // Clear cart on successful payment init
  //     setCart({ items: [] });
  //     localStorage.removeItem("cart");

  //     window.location.href = data.payment_url;
  //   } catch (err) {
  //     console.error("❌ Payment error:", err);
  //     toast.error("Payment request failed");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
  };

  if (!cart?.items?.length) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50/30 via-white to-rose-50/20 dark:from-slate-950/95 dark:via-slate-900 dark:to-slate-950/95"
      >
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-r from-amber-500/10 to-rose-500/10 mb-6">
            <FaShoppingBag className="text-amber-600 dark:text-amber-400 text-5xl" />
          </div>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
            Your cart is empty
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-8">
            Add items to your cart before proceeding to checkout.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/cart")}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 flex items-center gap-3 mx-auto"
          >
            <FaArrowLeft />
            Back to Cart
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-br from-amber-50/30 via-white to-rose-50/20 dark:from-slate-950/95 dark:via-slate-900 dark:to-slate-950/95"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/cart")}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500/10 to-amber-600/10 hover:from-amber-500/20 hover:to-amber-600/20 text-amber-700 dark:text-amber-300 font-medium border border-amber-500/30 transition-all duration-300 mb-8"
        >
          <FaArrowLeft />
          Back to Cart
        </motion.button>

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
              Secure Checkout
            </span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-slate-800 dark:text-white">
              Complete Your
            </span>
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-rose-500 bg-clip-text text-transparent ml-3">
              Purchase
            </span>
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Review your order and proceed with secure payment
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Order Summary */}
          <div className="lg:col-span-2 space-y-8">
            {/* Order Items */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/50 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <FaShoppingBag className="text-amber-600 dark:text-amber-400 text-xl" />
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                  Order Items ({cart.items.length})
                </h2>
              </div>

              <div className="space-y-4">
                {cart.items.map((item, index) => (
                  <motion.div
                    key={item.product._id}
                    variants={itemVariants}
                    className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-amber-500/5 to-rose-500/5 border border-amber-500/10"
                  >
                    <div className="w-20 h-20 rounded-xl overflow-hidden">
                      <img
                        src={getImageUrl(
                          item.product.images?.[0] || item.product.image
                        )}
                        alt={item.product.name}
                        className="w-full h-full object-contain p-1"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-800 dark:text-white mb-1 line-clamp-1">
                        {item.product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                          Qty: {item.quantity} × $
                          {item.product.price.toFixed(2)}
                        </div>
                        <div className="font-bold text-amber-600 dark:text-amber-400">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Customer Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/50 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <FaUser className="text-amber-600 dark:text-amber-400 text-xl" />
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                  Customer Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-amber-500/5 to-rose-500/5 border border-amber-500/10">
                    <FaUser className="text-amber-600 dark:text-amber-400" />
                    <div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        Name
                      </div>
                      <div className="font-semibold text-slate-800 dark:text-white">
                        {user.name || "Not provided"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-amber-500/5 to-rose-500/5 border border-amber-500/10">
                    <FaEnvelope className="text-amber-600 dark:text-amber-400" />
                    <div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        Email
                      </div>
                      <div className="font-semibold text-slate-800 dark:text-white">
                        {user.email || "Not provided"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-amber-500/5 to-rose-500/5 border border-amber-500/10">
                    <FaPhone className="text-amber-600 dark:text-amber-400" />
                    <div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        Phone
                      </div>
                      <div className="font-semibold text-slate-800 dark:text-white">
                        {user.phone || "Not provided"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-amber-500/5 to-rose-500/5 border border-amber-500/10">
                    <FaMapMarkerAlt className="text-amber-600 dark:text-amber-400" />
                    <div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        Shipping Address
                      </div>
                      <div className="font-semibold text-slate-800 dark:text-white">
                        {user.address || "Not provided"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Payment Summary */}
          <div className="space-y-8">
            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky top-24 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/50 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <FaReceipt className="text-amber-600 dark:text-amber-400 text-xl" />
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                  Payment Summary
                </h2>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">
                    Subtotal
                  </span>
                  <span className="text-lg font-bold text-slate-800 dark:text-white">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">
                    Shipping
                  </span>
                  <span
                    className={`text-lg font-bold ${shipping === 0 ? "text-green-500" : "text-slate-800 dark:text-white"}`}
                  >
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">
                    Tax
                  </span>
                  <span className="text-slate-800 dark:text-white">
                    ${tax.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="py-4 border-y border-slate-200 dark:border-slate-700 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-slate-800 dark:text-white">
                    Total
                  </span>
                  <div className="text-right">
                    <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 via-amber-500 to-rose-500 bg-clip-text text-transparent">
                      ${total.toFixed(2)}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400">
                      {txRef ? `Ref: ${txRef}` : "Including tax & shipping"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleChapaPayment}
                disabled={loading}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-2xl ${
                  loading
                    ? "bg-gradient-to-r from-amber-500/50 to-amber-600/50 cursor-not-allowed"
                    : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700"
                } text-white flex items-center justify-center gap-3`}
              >
                {loading ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <FaCreditCard />
                    Pay with Chapa
                    <FaLock />
                  </>
                )}
              </motion.button>

              {/* Security Badge */}
              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-center gap-2 text-slate-600 dark:text-slate-400 text-sm">
                  <FaShieldAlt className="text-green-500" />
                  <span>Secure SSL Encryption • 100% Protected</span>
                </div>
              </div>
            </motion.div>

            {/* Payment Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-sm rounded-2xl p-6 border border-green-500/20"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                  <FaCheckCircle className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-white mb-2">
                    Secure Payment Processing
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Your payment is processed securely through Chapa. We never
                    store your payment details.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-2 gap-3"
            >
              <div className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-gradient-to-r from-amber-500/5 to-rose-500/5 border border-amber-500/10">
                <FaShieldAlt className="text-amber-600 dark:text-amber-400 text-xl" />
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300 text-center">
                  Money Back Guarantee
                </span>
              </div>
              <div className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-gradient-to-r from-amber-500/5 to-rose-500/5 border border-amber-500/10">
                <FaCheckCircle className="text-amber-600 dark:text-amber-400 text-xl" />
                <span className="text-xs font-medium text-slate-700 dark:text-slate-300 text-center">
                  Instant Confirmation
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CheckoutPage;
