import React, { useState } from "react";
import { useNavigate } from "react-router";
import LoadingSpinner from "../Components/LoadingSpinner";
import { HiMail } from "react-icons/hi";
import { fetchWithAuth } from "../utils/auth";
const BACKEND_URL = import.meta.env.VITE_API_URL;
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(""); // success | error
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetchWithAuth(
        `${BACKEND_URL}/api/auth/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      const data = await res.json();

      if (res.status === 404) {
        setMessage("Email not found. Please register.");
        setStatus("error");
        setTimeout(() => navigate("/register"), 2000);
      } else if (!res.ok) {
        setMessage(data.message || "Request failed");
        setStatus("error");
      } else {
        setMessage(data.message || "Password reset link sent!");
        setStatus("success");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error");
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 sm:px-6 relative overflow-hidden">
      {/* 🌟 Animated blobs near the form */}
      <div className="absolute w-40 h-40 bg-gradient-to-r from-yellow-400 via-green-400 to-blue-400 rounded-full opacity-30 top-2 -left-10 animate-pulse-slow"></div>
      <div className="absolute w-36 h-36 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full opacity-25 -top-10 right-5 animate-bounce-slow"></div>
      <div className="absolute w-32 h-32 bg-gradient-to-r from-green-300 via-blue-300 to-purple-300 rounded-full opacity-25 bottom-2 left-10 animate-spin-slow"></div>
      <div className="absolute w-24 h-24 bg-gradient-to-r from-red-400 via-yellow-400 to-pink-500 rounded-full opacity-20 top-10 left-1/2 -translate-x-1/2 animate-pulse"></div>

      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md bg-gray-800 bg-opacity-80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-gray-700 flex flex-col gap-4 z-10"
      >
        <h1 className="text-3xl text-center font-bold text-yellow-400 mb-4">
          Forgot Password
        </h1>

        {message && (
          <p
            className={`text-center font-medium ${
              status === "success" ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}

        <div className="relative">
          <HiMail className="absolute left-3 top-3 text-gray-400" />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full pl-10 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-400 text-gray-900 py-3 rounded-lg font-bold hover:bg-yellow-500 transition flex justify-center items-center gap-2"
          disabled={loading}
        >
          {loading && <LoadingSpinner size={5} />}
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        <div className="flex justify-between text-sm mt-2">
          <span
            className="text-green-400 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </span>
          <span
            className="text-green-400 hover:underline cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
