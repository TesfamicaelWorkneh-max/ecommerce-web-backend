import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { CheckCircle, ShoppingBag, Home, Package } from "lucide-react";
import { fetchWithAuth } from "../utils/auth";
import toast from "react-hot-toast";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clearingCart, setClearingCart] = useState(false);

  const orderId = searchParams.get("orderId");
  const txRef = searchParams.get("tx_ref");

  useEffect(() => {
    if (orderId) {
      verifyPaymentAndClearCart();
    } else {
      navigate("/cart");
    }
  }, [orderId]);

  const verifyPaymentAndClearCart = async () => {
    try {
      setLoading(true);

      // Call backend to verify payment
      const response = await fetchWithAuth(
        `${BACKEND_URL}/api/payment/status/${txRef || orderId}`
      );

      const data = await response.json();

      if (data.success && data.status === "paid") {
        setOrder(data.order);

        // Clear local cart only after successful verification
        setClearingCart(true);
        localStorage.removeItem("cart");
        localStorage.removeItem("pending_payment");

        // Clear any cart context/state
        if (window.clearCart) {
          window.clearCart();
        }

        toast.success("Payment successful! Your order has been placed.");
      } else {
        toast.error("Payment verification failed. Please contact support.");
        navigate("/cart");
      }
    } catch (error) {
      console.error("Payment verification error:", error);
      toast.error("Unable to verify payment. Please check your orders.");
    } finally {
      setLoading(false);
      setClearingCart(false);
    }
  };

  const clearLocalCart = () => {
    localStorage.removeItem("cart");
    localStorage.removeItem("pending_payment");
    // Dispatch custom event for cart context to listen
    window.dispatchEvent(new Event("cartCleared"));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h1>

          <p className="text-gray-600 mb-8">
            Thank you for your purchase. Your order has been confirmed and will
            be processed shortly.
          </p>

          {order && (
            <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
              <div className="flex items-center gap-3 mb-4">
                <Package className="w-6 h-6 text-green-600" />
                <h2 className="text-xl font-semibold">Order Details</h2>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-medium">{order._id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="font-medium">
                    ETB {order.total?.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    Paid
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/orders"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              View Orders
            </Link>

            <Link
              to="/"
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
            >
              <Home className="w-5 h-5" />
              Continue Shopping
            </Link>
          </div>

          <p className="mt-8 text-sm text-gray-500">
            A confirmation email has been sent to your registered email address.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
