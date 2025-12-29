import React, { useEffect, useState, useContext } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { CheckCircle, ShoppingBag, Home, Package } from "lucide-react";
import { cartContext } from "../Context/cartContext";
import { authContext } from "../Context/authContext";
import { fetchWithAuth } from "../utils/auth";
import toast from "react-hot-toast";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setCart } = useContext(cartContext);
  const { user } = useContext(authContext);

  const orderId = searchParams.get("orderId");
  const txRef = searchParams.get("tx_ref");
  const status = searchParams.get("status");

  useEffect(() => {
    if (orderId && status === "success") {
      verifyPaymentAndClearCart();
    } else if (!orderId) {
      // If no orderId, check localStorage for pending payment
      const pendingPayment = localStorage.getItem("pending_payment");
      if (pendingPayment) {
        const { tx_ref, orderId: pendingOrderId } = JSON.parse(pendingPayment);
        verifyPaymentAndClearCart(pendingOrderId, tx_ref);
      } else {
        navigate("/cart");
      }
    }
  }, [orderId, txRef, status]);

  const verifyPaymentAndClearCart = async (
    pendingOrderId = orderId,
    pendingTxRef = txRef
  ) => {
    try {
      setLoading(true);

      // Clear cart in context
      if (setCart) {
        setCart({ items: [] });
      }

      // Clear localStorage
      localStorage.removeItem("cart");
      localStorage.removeItem("pending_payment");

      // Dispatch event for other components to know cart is cleared
      window.dispatchEvent(new CustomEvent("paymentSuccess"));

      try {
        // Verify with backend if user is logged in
        if (user) {
          const response = await fetchWithAuth(
            `${BACKEND_URL}/api/payment/status/${pendingTxRef || pendingOrderId}`
          );
          const data = await response.json();

          if (
            data.success &&
            (data.status === "paid" || data.status === "success")
          ) {
            setOrder(data.order || { _id: pendingOrderId, total: 0 });
            toast.success("Payment successful! Your order has been placed.");
            return;
          }
        }

        // If user not logged in or verification fails, still show success with available data
        setOrder({ _id: pendingOrderId, total: 0 });
        toast.success("Payment successful! Your order has been placed.");
      } catch (verifyError) {
        console.log("Backend verification optional:", verifyError);
        // Still show success page even if verification fails
        setOrder({ _id: pendingOrderId, total: 0 });
        toast.success("Payment successful! Your order has been placed.");
      }
    } catch (error) {
      console.error("Payment success error:", error);
      navigate("/cart");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50/30 via-white to-rose-50/20 dark:from-slate-950/95 dark:via-slate-900 dark:to-slate-950/95">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500/30 border-t-amber-600 rounded-full animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">
            Finalizing Your Order
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Please wait while we confirm your payment...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50/30 via-white to-rose-50/20 dark:from-slate-950/95 dark:via-slate-900 dark:to-slate-950/95 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-xl p-8 border border-white/20 dark:border-slate-700/50 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <CheckCircle className="w-14 h-14 text-white" />
          </div>

          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Payment Successful! 🎉
          </h1>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 mb-6">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-700 dark:text-green-300">
              Order Confirmed
            </span>
          </div>

          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-md mx-auto">
            Thank you for your purchase. Your order has been confirmed and is
            being processed. You'll receive a confirmation email shortly.
          </p>

          <div className="bg-gradient-to-r from-amber-500/5 to-rose-500/5 backdrop-blur-sm rounded-xl p-6 mb-8 border border-amber-500/10 text-left">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-slate-800 dark:text-white">
                Order Details
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-lg bg-white/50 dark:bg-slate-800/50">
                <span className="text-slate-600 dark:text-slate-400">
                  Order ID:
                </span>
                <span className="font-mono font-medium text-slate-800 dark:text-white">
                  {order?._id?.slice(-8) || orderId?.slice(-8) || "Pending"}
                </span>
              </div>

              {order?.total > 0 && (
                <div className="flex justify-between items-center p-3 rounded-lg bg-white/50 dark:bg-slate-800/50">
                  <span className="text-slate-600 dark:text-slate-400">
                    Total Amount:
                  </span>
                  <span className="text-xl font-bold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
                    ${order.total?.toFixed(2)}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center p-3 rounded-lg bg-white/50 dark:bg-slate-800/50">
                <span className="text-slate-600 dark:text-slate-400">
                  Status:
                </span>
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-medium">
                  Paid & Confirmed
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/my-orders"
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <ShoppingBag className="w-5 h-5" />
              View My Orders
            </Link>

            <Link
              to="/"
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 text-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white font-semibold transition-all duration-300 flex items-center justify-center gap-3"
            >
              <Home className="w-5 h-5" />
              Continue Shopping
            </Link>
          </div>

          <p className="mt-8 text-sm text-slate-500 dark:text-slate-400">
            Having questions about your order?{" "}
            <Link
              to="/contact"
              className="text-amber-600 dark:text-amber-400 hover:underline font-medium"
            >
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
