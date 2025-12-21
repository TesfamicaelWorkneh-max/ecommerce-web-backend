import { useState, useContext, useEffect, useRef } from "react";
import { authContext } from "../Context/authContext";
import { useNavigate, useLocation } from "react-router-dom";
import {
  HiMail,
  HiLockClosed,
  HiEye,
  HiEyeOff,
  HiShieldCheck,
  HiSparkles,
} from "react-icons/hi";
import { FaGoogle, FaGithub, FaTwitter, FaFacebookF } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { fetchWithAuth } from "../utils/auth";
import toast from "react-hot-toast";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const { login, user } = useContext(authContext); // Remove refreshToken from here
  const navigate = useNavigate();
  const location = useLocation();
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [activeField, setActiveField] = useState(null);

  // Check if user is already logged in - redirect to home
  useEffect(() => {
    // Check for verification success message
    const searchParams = new URLSearchParams(location.search);
    const fromVerify = searchParams.get("fromVerify");

    if (fromVerify === "true") {
      toast.success("Email verified successfully! You can now login.");
    }
  }, [location.search]);
  useEffect(() => {
    const newErrors = {};
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (password && password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) {
      toast.error("Please fix the errors above");
      return;
    }

    // If already logged in, just redirect
    if (user) {
      navigate("/");
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      // Navigation is handled inside the login function
    } catch (err) {
      toast.error(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resendVerification = async () => {
    if (!email) {
      toast.error("Please enter your email first");
      return;
    }

    try {
      const res = await fetchWithAuth(
        `${BACKEND_URL}/api/auth/resend-verification`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        toast.success("Verification email sent! Check your inbox 📧");
      } else {
        toast.error(data.message || "Failed to resend verification");
      }
    } catch (err) {
      toast.error("Server error. Please try again later.");
    }
  };

  // Particle Animation (same as before)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = Math.min(100, Math.floor(window.innerWidth / 20));

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        color: `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 100 + 155)}, 255, ${Math.random() * 0.3 + 0.1})`,
      });
    }

    particlesRef.current = particles;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        particlesRef.current.forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(100, 150, 255, ${0.2 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const handleSocialLogin = (provider) => {
    toast(`Coming soon! ${provider} login will be available soon.`);
  };

  const formVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const fieldVariant = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 overflow-hidden px-4 sm:px-6 lg:px-8">
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/4 left-10 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            y: [0, 30, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-1/4 right-10 w-32 h-32 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            x: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/3 right-1/4 w-16 h-16 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full blur-xl"
        />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={formVariant}
        className="relative z-10 w-full max-w-lg"
      >
        <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
          {/* Header Section */}
          <div className="p-8 text-center border-b border-white/10 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-r from-green-600/10 to-teal-600/10 rounded-full blur-2xl" />

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full mb-4"
            >
              <HiShieldCheck className="text-3xl text-white" />
            </motion.div>

            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-gray-400 mb-1">
              Sign in to continue your journey
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <HiSparkles className="text-yellow-400" />
              <span>Secure & encrypted connection</span>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <motion.div variants={fieldVariant}>
                <div className="relative group">
                  <div
                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${activeField === "email" ? "text-blue-400" : "text-gray-500"}`}
                  >
                    <HiMail className="text-xl" />
                  </div>
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setActiveField("email")}
                    onBlur={() => setActiveField(null)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 group-hover:border-white/20"
                  />
                  {email && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2"
                    >
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    </motion.div>
                  )}
                </div>
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-400 text-sm mt-2 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                      {errors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Password Field */}
              <motion.div variants={fieldVariant}>
                <div className="relative group">
                  <div
                    className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${activeField === "password" ? "text-blue-400" : "text-gray-500"}`}
                  >
                    <HiLockClosed className="text-xl" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setActiveField("password")}
                    onBlur={() => setActiveField(null)}
                    className="w-full pl-12 pr-12 py-4 bg-gray-800/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 group-hover:border-white/20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <HiEyeOff className="text-xl" />
                    ) : (
                      <HiEye className="text-xl" />
                    )}
                  </button>
                </div>
                <AnimatePresence>
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-400 text-sm mt-2 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                      {errors.password}
                    </motion.p>
                  )}
                </AnimatePresence>
                <div className="mt-2 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Forgot password?
                  </button>
                  <div className="text-xs text-gray-500">
                    {password.length > 0 && `${password.length}/6+ characters`}
                  </div>
                </div>
              </motion.div>

              {/* Login Button */}
              <motion.div variants={fieldVariant}>
                <motion.button
                  type="submit"
                  disabled={
                    loading ||
                    Object.keys(errors).length > 0 ||
                    !email ||
                    !password
                  }
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onHoverStart={() => setIsHovered(true)}
                  onHoverEnd={() => setIsHovered(false)}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                    loading ||
                    Object.keys(errors).length > 0 ||
                    !email ||
                    !password
                      ? "bg-gray-700 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-blue-500/25"
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <motion.div
                        animate={{ x: isHovered ? 5 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        →
                      </motion.div>
                    </>
                  )}
                </motion.button>
              </motion.div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gray-900 text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <motion.div
                variants={fieldVariant}
                className="grid grid-cols-2 sm:grid-cols-4 gap-3"
              >
                {[
                  {
                    icon: FaGoogle,
                    color: "bg-red-500 hover:bg-red-600",
                    label: "Google",
                  },
                  {
                    icon: FaGithub,
                    color: "bg-gray-800 hover:bg-gray-700",
                    label: "GitHub",
                  },
                  {
                    icon: FaTwitter,
                    color: "bg-blue-500 hover:bg-blue-600",
                    label: "Twitter",
                  },
                  {
                    icon: FaFacebookF,
                    color: "bg-blue-700 hover:bg-blue-800",
                    label: "Facebook",
                  },
                ].map((social, index) => (
                  <motion.button
                    key={social.label}
                    type="button"
                    onClick={() => handleSocialLogin(social.label)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`${social.color} py-3 rounded-xl flex items-center justify-center transition-all duration-300 group`}
                  >
                    <social.icon className="text-white text-xl" />
                    <span className="sr-only">{social.label}</span>
                  </motion.button>
                ))}
              </motion.div>
            </form>

            {/* Resend Verification */}
            <motion.div variants={fieldVariant} className="mt-6 text-center">
              <button
                type="button"
                onClick={resendVerification}
                className="text-sm text-gray-400 hover:text-blue-400 transition-colors flex items-center justify-center gap-2 mx-auto"
              >
                <HiMail />
                Didn't receive verification email?
              </button>
            </motion.div>
          </div>

          {/* Footer */}
          <div className="px-8 py-6 border-t border-white/10 bg-gray-900/50">
            <div className="text-center">
              <p className="text-gray-500">
                Don't have an account?{" "}
                <button
                  onClick={() => navigate("/register")}
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                >
                  Create one now
                </button>
              </p>
              <p className="text-xs text-gray-600 mt-3">
                By signing in, you agree to our Terms of Service and Privacy
                Policy
              </p>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <motion.div
          variants={fieldVariant}
          className="mt-6 grid grid-cols-3 gap-4"
        >
          <div className="text-center p-4 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-white/10">
            <div className="text-2xl font-bold text-white">99.9%</div>
            <div className="text-xs text-gray-400">Uptime</div>
          </div>
          <div className="text-center p-4 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-white/10">
            <div className="text-2xl font-bold text-white">256-bit</div>
            <div className="text-xs text-gray-400">Encryption</div>
          </div>
          <div className="text-center p-4 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-white/10">
            <div className="text-2xl font-bold text-white">24/7</div>
            <div className="text-xs text-gray-400">Support</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating Particles Info */}
      <div className="absolute bottom-4 right-4 z-10">
        <div className="text-xs text-gray-500 bg-gray-900/50 backdrop-blur-sm px-3 py-2 rounded-full border border-white/10">
          <span className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
            Connected particles: {particlesRef.current.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
