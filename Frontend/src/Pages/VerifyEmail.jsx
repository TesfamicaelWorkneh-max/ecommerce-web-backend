import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { HiCheckCircle, HiXCircle, HiRefresh } from "react-icons/hi";
import toast from "react-hot-toast";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(true);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(
          `${BACKEND_URL}/api/auth/verify/${token}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setSuccess(true);
          setMessage(data.message || "Email verified successfully!");
          toast.success("Email verified! You can now login.");

          // Redirect to login with success parameter
          setTimeout(() => {
            navigate("/login?fromVerify=true");
          }, 2000);
        } else {
          setSuccess(false);
          setMessage(data.message || "Verification failed");
          toast.error("Verification failed. Please try again.");
        }
      } catch (error) {
        setSuccess(false);
        setMessage("Server error. Please try again.");
        toast.error("Server error. Please try again.");
      } finally {
        setVerifying(false);
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token, navigate]);

  const handleResend = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-950 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-white/10 p-8 text-center"
      >
        <div className="mb-6">
          {verifying ? (
            <div className="w-20 h-20 mx-auto border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          ) : success ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 mx-auto bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center"
            >
              <HiCheckCircle className="text-5xl text-green-500" />
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 mx-auto bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-full flex items-center justify-center"
            >
              <HiXCircle className="text-5xl text-red-500" />
            </motion.div>
          )}
        </div>

        <h1 className="text-3xl font-bold mb-4 text-white">
          {verifying
            ? "Verifying Your Email"
            : success
              ? "Email Verified!"
              : "Verification Failed"}
        </h1>

        <p className="text-gray-300 mb-6">
          {verifying
            ? "Please wait while we verify your email address..."
            : message}
        </p>

        {!verifying && !success && (
          <div className="space-y-4">
            <button
              onClick={handleResend}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <HiRefresh />
              Go to Login
            </button>
            <p className="text-sm text-gray-400">
              You can request a new verification link from the login page.
            </p>
          </div>
        )}

        {verifying && (
          <div className="space-y-4">
            <div className="flex justify-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-75" />
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-150" />
            </div>
            <p className="text-sm text-gray-400">
              This usually takes just a few seconds...
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default VerifyEmail;
