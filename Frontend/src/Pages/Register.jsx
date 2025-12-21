import { useState, useEffect, useRef } from "react";
import {
  HiUser,
  HiMail,
  HiLockClosed,
  HiEye,
  HiEyeOff,
  HiCheckCircle,
  HiShieldCheck,
  HiSparkles,
} from "react-icons/hi";
import {
  FaGoogle,
  FaGithub,
  FaTwitter,
  FaFacebookF,
  FaRegCheckCircle,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { fetchWithAuth } from "../utils/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [registrationStep, setRegistrationStep] = useState(1);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);
  const navigate = useNavigate();

  // Password strength calculator
  useEffect(() => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    setPasswordStrength(strength);
  }, [password]);

  // Simplified validation
  useEffect(() => {
    const newErrors = {};
    if (name && name.length < 2)
      newErrors.name = "Name must be at least 2 characters";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Invalid email format";
    if (password && password.length < 6)
      newErrors.password = "Minimum 6 characters";
    if (confirmPassword && password !== confirmPassword)
      newErrors.confirmPassword = "Passwords don't match";
    setErrors(newErrors);
  }, [name, email, password, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) {
      toast.error("Please fix the errors above");
      return;
    }

    setLoading(true);
    setMessage("");
    try {
      const res = await fetchWithAuth(`${BACKEND_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Registration failed");
        setLoading(false);
        return;
      }

      toast.success("Account created! Check your email to verify 📧");
      setRegistrationStep(2); // Show success step
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Particle Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = Math.min(80, Math.floor(window.innerWidth / 25));

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: Math.random() * 0.3 - 0.15,
        speedY: Math.random() * 0.3 - 0.15,
        color: `rgba(${Math.floor(Math.random() * 100 + 155)}, 255, ${Math.floor(Math.random() * 100 + 155)}, ${Math.random() * 0.4 + 0.1})`,
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

          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(100, 255, 150, ${0.15 * (1 - distance / 120)})`;
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
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const handleSocialRegister = (provider) => {
    toast(`Coming soon! ${provider} registration will be available soon.`);
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

  const getPasswordStrengthColor = () => {
    if (passwordStrength >= 75) return "bg-green-500";
    if (passwordStrength >= 50) return "bg-yellow-500";
    if (passwordStrength >= 25) return "bg-orange-500";
    return "bg-red-500";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength >= 75) return "Strong";
    if (passwordStrength >= 50) return "Good";
    if (passwordStrength >= 25) return "Weak";
    return "Very Weak";
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Animated Background Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -30, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-20 left-1/4 w-32 h-32 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            y: [0, 40, 0],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-20 right-1/4 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            x: [-50, 50, -50],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-1/2 left-10 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full blur-xl"
        />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={formVariant}
        className="relative z-10 w-full max-w-2xl"
      >
        <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
          {/* Header Section */}
          <div className="p-8 text-center border-b border-white/10 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-green-600/10 to-teal-600/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-2xl" />

            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-green-600/20 to-teal-600/20 rounded-full mb-4"
            >
              <HiShieldCheck className="text-4xl text-white" />
            </motion.div>

            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Join Our Community
            </h1>
            <p className="text-gray-400 mb-1">
              Create your account in less than a minute
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <HiSparkles className="text-yellow-400" />
              <span>Start your journey with us today</span>
            </div>
          </div>

          {/* Registration Progress */}
          <div className="px-8 pt-6">
            <div className="flex items-center justify-between mb-6">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      registrationStep >= step
                        ? "bg-green-500/20 border-green-500 text-green-400"
                        : "bg-gray-800/50 border-gray-700 text-gray-500"
                    }`}
                  >
                    {registrationStep > step ? (
                      <HiCheckCircle className="text-xl" />
                    ) : (
                      step
                    )}
                  </div>
                  {step < 3 && (
                    <div
                      className={`w-16 h-1 mx-2 ${registrationStep > step ? "bg-green-500" : "bg-gray-700"}`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="text-sm text-gray-400 text-center">
              {registrationStep === 1 && "Step 1: Fill your details"}
              {registrationStep === 2 && "Step 2: Verify your email"}
              {registrationStep === 3 && "Step 3: Complete your profile"}
            </div>
          </div>

          {/* Registration Form */}
          <div className="p-8">
            <AnimatePresence mode="wait">
              {registrationStep === 1 ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* Name Field */}
                  <motion.div variants={fieldVariant}>
                    <div className="relative group">
                      <div
                        className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${activeField === "name" ? "text-green-400" : "text-gray-500"}`}
                      >
                        <HiUser className="text-xl" />
                      </div>
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onFocus={() => setActiveField("name")}
                        onBlur={() => setActiveField(null)}
                        className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300 group-hover:border-white/20"
                      />
                      {name && name.length >= 2 && (
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
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-red-400 text-sm mt-2 flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                          {errors.name}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Email Field */}
                  <motion.div variants={fieldVariant}>
                    <div className="relative group">
                      <div
                        className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${activeField === "email" ? "text-green-400" : "text-gray-500"}`}
                      >
                        <HiMail className="text-xl" />
                      </div>
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setActiveField("email")}
                        onBlur={() => setActiveField(null)}
                        className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300 group-hover:border-white/20"
                      />
                      {email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2"
                        >
                          <FaRegCheckCircle className="text-green-500 text-lg" />
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
                        className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${activeField === "password" ? "text-green-400" : "text-gray-500"}`}
                      >
                        <HiLockClosed className="text-xl" />
                      </div>
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Create Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setActiveField("password")}
                        onBlur={() => setActiveField(null)}
                        className="w-full pl-12 pr-12 py-4 bg-gray-800/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300 group-hover:border-white/20"
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

                    {/* Password Strength Meter */}
                    {password && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-3 space-y-2"
                      >
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">
                            Password strength:
                          </span>
                          <span
                            className={`font-medium ${getPasswordStrengthColor().replace("bg-", "text-")}`}
                          >
                            {getPasswordStrengthText()}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${passwordStrength}%` }}
                            transition={{ duration: 0.5 }}
                            className={`h-full ${getPasswordStrengthColor()} rounded-full`}
                          />
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                          {[
                            {
                              text: "8+ characters",
                              check: password.length >= 8,
                            },
                            {
                              text: "Uppercase",
                              check: /[A-Z]/.test(password),
                            },
                            { text: "Number", check: /[0-9]/.test(password) },
                            {
                              text: "Special",
                              check: /[^A-Za-z0-9]/.test(password),
                            },
                          ].map((req, idx) => (
                            <div key={idx} className="flex items-center gap-1">
                              {req.check ? (
                                <HiCheckCircle className="text-green-500" />
                              ) : (
                                <div className="w-4 h-4 border border-gray-600 rounded-full" />
                              )}
                              <span
                                className={
                                  req.check ? "text-green-400" : "text-gray-500"
                                }
                              >
                                {req.text}
                              </span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

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
                  </motion.div>

                  {/* Confirm Password Field */}
                  <motion.div variants={fieldVariant}>
                    <div className="relative group">
                      <div
                        className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${activeField === "confirmPassword" ? "text-green-400" : "text-gray-500"}`}
                      >
                        <HiLockClosed className="text-xl" />
                      </div>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onFocus={() => setActiveField("confirmPassword")}
                        onBlur={() => setActiveField(null)}
                        className="w-full pl-12 pr-12 py-4 bg-gray-800/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-300 group-hover:border-white/20"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                      >
                        {showConfirmPassword ? (
                          <HiEyeOff className="text-xl" />
                        ) : (
                          <HiEye className="text-xl" />
                        )}
                      </button>
                    </div>
                    {password && confirmPassword && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-2"
                      >
                        {password === confirmPassword ? (
                          <div className="flex items-center gap-2 text-green-400 text-sm">
                            <HiCheckCircle />
                            Passwords match
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-red-400 text-sm">
                            <div className="w-4 h-4 border border-red-400 rounded-full flex items-center justify-center">
                              <span className="text-xs">!</span>
                            </div>
                            Passwords don't match
                          </div>
                        )}
                      </motion.div>
                    )}
                    <AnimatePresence>
                      {errors.confirmPassword && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-red-400 text-sm mt-2 flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                          {errors.confirmPassword}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Terms Checkbox */}
                  <motion.div
                    variants={fieldVariant}
                    className="flex items-start gap-3"
                  >
                    <input
                      type="checkbox"
                      id="terms"
                      className="mt-1 w-5 h-5 rounded bg-gray-800/50 border-white/10 text-green-500 focus:ring-green-500 focus:ring-offset-gray-900"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-400">
                      I agree to the{" "}
                      <button
                        type="button"
                        className="text-green-400 hover:text-green-300"
                      >
                        Terms of Service
                      </button>{" "}
                      and{" "}
                      <button
                        type="button"
                        className="text-green-400 hover:text-green-300"
                      >
                        Privacy Policy
                      </button>
                    </label>
                  </motion.div>

                  {/* Register Button */}
                  <motion.div variants={fieldVariant}>
                    <motion.button
                      type="submit"
                      disabled={
                        loading ||
                        Object.keys(errors).length > 0 ||
                        !name ||
                        !email ||
                        !password ||
                        !confirmPassword
                      }
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                        loading ||
                        Object.keys(errors).length > 0 ||
                        !name ||
                        !email ||
                        !password ||
                        !confirmPassword
                          ? "bg-gray-700 cursor-not-allowed"
                          : "bg-gradient-to-r from-green-600 to-teal-600 hover:shadow-lg hover:shadow-green-500/25"
                      }`}
                    >
                      {loading ? (
                        <>
                          <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                          Creating Account...
                        </>
                      ) : (
                        <>
                          <span>Create Account</span>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "linear",
                            }}
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
                        Or sign up with
                      </span>
                    </div>
                  </div>

                  {/* Social Registration Buttons */}
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
                        onClick={() => handleSocialRegister(social.label)}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`${social.color} py-3 rounded-xl flex items-center justify-center transition-all duration-300`}
                      >
                        <social.icon className="text-white text-xl" />
                        <span className="sr-only">{social.label}</span>
                      </motion.button>
                    ))}
                  </motion.div>
                </motion.form>
              ) : (
                registrationStep === 2 && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-green-600/20 to-teal-600/20 rounded-full mb-6"
                    >
                      <HiCheckCircle className="text-5xl text-green-400" />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-white mb-4">
                      Account Created Successfully! 🎉
                    </h2>
                    <p className="text-gray-400 mb-8 max-w-md mx-auto">
                      We've sent a verification link to{" "}
                      <span className="text-green-400 font-semibold">
                        {email}
                      </span>
                      . Please check your inbox and verify your email to
                      complete registration.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button
                        onClick={() => navigate("/login")}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                      >
                        Go to Login
                      </button>
                      <button
                        onClick={() => {
                          setRegistrationStep(1);
                          setMessage("");
                        }}
                        className="px-6 py-3 bg-gray-800/50 border border-white/10 rounded-xl font-semibold hover:bg-gray-700/50 transition-all duration-300"
                      >
                        Register Another Account
                      </button>
                    </div>
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="px-8 py-6 border-t border-white/10 bg-gray-900/50">
            <div className="text-center">
              <p className="text-gray-500">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-green-400 hover:text-green-300 font-medium transition-colors"
                >
                  Sign in here
                </button>
              </p>
              <p className="text-xs text-gray-600 mt-3">
                Your data is protected with 256-bit encryption and GDPR
                compliant
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
