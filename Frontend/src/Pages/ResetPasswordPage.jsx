import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "../Components/LoadingSpinner";
import { HiLockClosed } from "react-icons/hi";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(""); // success or error
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setStatus("error");
      return;
    }

    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(
        `${BACKEND_URL}/api/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Reset failed");
        setStatus("error");
      } else {
        setMessage(data.message || "Password reset successful");
        setStatus("success");
        setTimeout(() => navigate("/login"), 3000);
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
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4 sm:px-6 overflow-hidden">
      {/* 🌈 Lots of moving gradient blobs */}
      <div className="absolute -top-32 -left-24 w-80 h-80 bg-gradient-to-r from-yellow-400 via-green-400 to-blue-400 rounded-full opacity-25 animate-pulse"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full opacity-20 animate-bounce"></div>
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-gradient-to-r from-green-300 via-blue-300 to-purple-300 rounded-full opacity-25 animate-spin-slow"></div>
      <div className="absolute top-1/4 left-1/2 w-40 h-40 bg-gradient-to-r from-red-400 via-yellow-400 to-pink-500 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-full opacity-20 animate-bounce"></div>

      <form
        className="relative w-full max-w-md bg-gray-800 bg-opacity-70 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-gray-700 flex flex-col gap-4 z-10"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl text-center font-bold text-yellow-400 mb-4">
          Reset Password
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
          <HiLockClosed className="absolute left-3 top-3 text-gray-400" />
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full pl-10 p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          />
        </div>

        <div className="relative">
          <HiLockClosed className="absolute left-3 top-3 text-gray-400" />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          {loading ? "Resetting..." : "Reset Password"}
        </button>

        <p className="text-gray-400 text-sm text-center mt-2">
          <span
            className="text-green-400 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default ResetPassword;
