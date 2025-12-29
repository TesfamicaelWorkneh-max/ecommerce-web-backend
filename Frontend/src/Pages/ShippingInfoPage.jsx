import React, { useEffect, useState, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import {
  FaTruck,
  FaBoxOpen,
  FaMapMarkerAlt,
  FaClock,
  FaShieldAlt,
  FaGlobeAmericas,
  FaMoneyBillWave,
  FaSun,
  FaMoon,
  FaArrowDown,
  FaArrowUp,
  FaShippingFast,
  FaCheckCircle,
} from "react-icons/fa";

const ShippingInfoPage = () => {
  const [theme, setTheme] = useState("light");
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("header");
  const [parallaxValue, setParallaxValue] = useState(0);

  // Refs for sections
  const headerRef = useRef(null);
  const optionsRef = useRef(null);
  const featuresRef = useRef(null);
  const faqRef = useRef(null);
  const notesRef = useRef(null);
  const containerRef = useRef(null);

  // Scroll animations
  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5]);

  // Smooth scroll progress
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Check section in view
  const isHeaderInView = useInView(headerRef, { once: false, amount: 0.3 });
  const isOptionsInView = useInView(optionsRef, { once: false, amount: 0.3 });
  const isFeaturesInView = useInView(featuresRef, { once: false, amount: 0.3 });
  const isFaqInView = useInView(faqRef, { once: false, amount: 0.3 });
  const isNotesInView = useInView(notesRef, { once: false, amount: 0.3 });

  // Update active section based on scroll
  useEffect(() => {
    if (isHeaderInView) setActiveSection("header");
    if (isOptionsInView) setActiveSection("options");
    if (isFeaturesInView) setActiveSection("features");
    if (isFaqInView) setActiveSection("faq");
    if (isNotesInView) setActiveSection("notes");
  }, [
    isHeaderInView,
    isOptionsInView,
    isFeaturesInView,
    isFaqInView,
    isNotesInView,
  ]);

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      setParallaxValue(window.scrollY * 0.5);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const shippingOptions = [
    {
      name: "Standard Shipping",
      time: "3-7 Business Days",
      price: "Free on orders over $50",
      icon: <FaTruck />,
      color: "from-blue-500 to-cyan-500",
      lightColor: "from-blue-400 to-cyan-400",
      features: ["Tracking included", "3-7 business days", "Free over $50"],
    },
    {
      name: "Express Shipping",
      time: "1-3 Business Days",
      price: "$9.99",
      icon: <FaBoxOpen />,
      color: "from-green-500 to-emerald-500",
      lightColor: "from-green-400 to-emerald-400",
      features: [
        "Priority handling",
        "1-3 business days",
        "Saturday delivery available",
      ],
    },
    {
      name: "Overnight Shipping",
      time: "Next Day",
      price: "$19.99",
      icon: <FaClock />,
      color: "from-purple-500 to-pink-500",
      lightColor: "from-purple-400 to-pink-400",
      features: [
        "Next business day",
        "Order by 2 PM EST",
        "Signature required",
      ],
    },
  ];

  const shippingFeatures = [
    {
      title: "Real-Time Tracking",
      description: "Track your order from warehouse to doorstep",
      icon: <FaMapMarkerAlt />,
      darkColor: "bg-gradient-to-r from-blue-500/10 to-blue-600/10",
      lightColor: "bg-gradient-to-r from-blue-400/10 to-blue-500/10",
    },
    {
      title: "Global Shipping",
      description: "We ship to 50+ countries worldwide",
      icon: <FaGlobeAmericas />,
      darkColor: "bg-gradient-to-r from-green-500/10 to-emerald-600/10",
      lightColor: "bg-gradient-to-r from-green-400/10 to-emerald-500/10",
    },
    {
      title: "Secure Delivery",
      description: "Signature confirmation available for all orders",
      icon: <FaShieldAlt />,
      darkColor: "bg-gradient-to-r from-purple-500/10 to-pink-600/10",
      lightColor: "bg-gradient-to-r from-purple-400/10 to-pink-500/10",
    },
    {
      title: "Free Returns",
      description: "Easy returns with prepaid labels",
      icon: <FaMoneyBillWave />,
      darkColor: "bg-gradient-to-r from-amber-500/10 to-orange-600/10",
      lightColor: "bg-gradient-to-r from-amber-400/10 to-orange-500/10",
    },
  ];

  const faqs = [
    {
      q: "How long does shipping take?",
      a: "Standard shipping takes 3-7 business days. Express takes 1-3 business days. Overnight delivers next business day.",
    },
    {
      q: "Do you ship internationally?",
      a: "Yes, we ship to 50+ countries. International delivery takes 7-14 business days with full tracking.",
    },
    {
      q: "Can I track my order?",
      a: "Yes! You'll receive a tracking number via email once your order ships. Track it directly from your account.",
    },
    {
      q: "What are the shipping costs?",
      a: "Free on domestic orders over $50. International shipping starts at $14.99. Express and overnight available.",
    },
    {
      q: "Do you offer Saturday delivery?",
      a: "Yes, Saturday delivery is available for express and overnight shipping options.",
    },
    {
      q: "Can I change my shipping address?",
      a: "Address changes can be made within 1 hour of ordering. Contact support immediately if you need changes.",
    },
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem("shipping-theme") || "light";
    setTheme(savedTheme);
    document.documentElement.className = savedTheme;

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("shipping-theme", newTheme);
    document.documentElement.className = newTheme;
  };

  // Scroll to section
  const scrollToSection = (sectionId) => {
    const sections = {
      header: headerRef,
      options: optionsRef,
      features: featuresRef,
      faq: faqRef,
      notes: notesRef,
    };

    if (sections[sectionId]?.current) {
      sections[sectionId].current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <>
      {/* Loading Animation */}
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
          style={{ backgroundColor: theme === "dark" ? "#0f172a" : "#FFFBF5" }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative"
          >
            <div className="w-24 h-24 rounded-full border-4 border-transparent border-t-amber-500 border-r-rose-500 animate-spin"></div>
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 border-2 border-dashed border-blue-400/30 rounded-full"
            ></motion.div>
          </motion.div>
        </motion.div>
      )}

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-rose-500 z-50"
        style={{ scaleX: smoothScrollProgress }}
        initial={{ scaleX: 0 }}
      />

      {/* Navigation Dots */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
        {["header", "options", "features", "faq", "notes"].map((section) => (
          <button
            key={section}
            onClick={() => scrollToSection(section)}
            className={`relative group`}
          >
            <motion.div
              animate={{
                scale: activeSection === section ? 1.5 : 1,
                backgroundColor:
                  activeSection === section
                    ? theme === "dark"
                      ? "#f59e0b"
                      : "#f59e0b"
                    : theme === "dark"
                      ? "#475569"
                      : "#E8D8BC",
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300`}
            />
            <div
              className={`absolute right-6 top-1/2 transform -translate-y-1/2 px-2 py-1 rounded text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity ${
                theme === "dark"
                  ? "bg-slate-800 text-white"
                  : "bg-cream-100 text-cream-900"
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </div>
          </button>
        ))}
      </div>

      <div
        ref={containerRef}
        className="relative z-10 min-h-screen overflow-y-auto scroll-smooth py-16 max-sm:py-24"
        style={{
          background:
            theme === "dark"
              ? "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)"
              : "linear-gradient(135deg, #FFFBF5 0%, #F9F5F0 50%, #FFFBF5 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Theme Toggle */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="fixed top-6 right-20 z-50"
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className={`p-3 rounded-full shadow-lg ${
                theme === "dark"
                  ? "bg-slate-800 text-amber-400 hover:bg-slate-700"
                  : "bg-cream-300 text-cream-800 hover:bg-cream-400"
              } transition-all duration-300`}
            >
              {theme === "dark" ? <FaSun size={20} /> : <FaMoon size={20} />}
            </motion.button>
          </motion.div>

          {/* Header Section */}
          <motion.section
            ref={headerRef}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-20 relative overflow-x-hidden"
          >
            {/* Animated Background Elements */}
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 360],
              }}
              transition={{
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              }}
              className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 blur-3xl"
            />
            <motion.div
              animate={{
                y: [0, 20, 0],
                rotate: [0, -360],
              }}
              transition={{
                y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 25, repeat: Infinity, ease: "linear" },
              }}
              className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-gradient-to-r from-amber-500/10 to-rose-500/10 blur-3xl"
            />

            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-8 relative"
            >
              <div
                className={`w-24 h-24 rounded-full absolute ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-amber-500 to-rose-500"
                    : "bg-gradient-to-r from-amber-400 to-rose-400"
                } opacity-20 blur-xl`}
              />
              <div
                className={`w-20 h-20 rounded-full ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-amber-500 to-rose-500"
                    : "bg-gradient-to-r from-amber-400 to-rose-400"
                } flex items-center justify-center relative z-10 shadow-2xl`}
              >
                <FaTruck className="text-3xl text-white" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`text-4xl lg:text-6xl font-bold mb-6 tracking-tight ${
                theme === "dark" ? "text-white" : "text-cream-900"
              }`}
            >
              Shipping{" "}
              <span
                className={
                  theme === "dark" ? "text-amber-400" : "text-amber-600"
                }
              >
                Information
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed mb-12 ${
                theme === "dark" ? "text-slate-400" : "text-cream-700"
              }`}
            >
              Fast, reliable delivery to your doorstep with real-time tracking
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="flex justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("options")}
                className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-3 ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-amber-500 to-rose-500 hover:shadow-xl hover:shadow-amber-500/30"
                    : "bg-gradient-to-r from-amber-400 to-rose-400 hover:shadow-xl hover:shadow-amber-400/30"
                } text-white`}
              >
                <FaArrowDown className="animate-bounce" />
                Explore Options
              </motion.button>
            </motion.div>
          </motion.section>

          {/* Shipping Options Section */}
          <motion.section
            ref={optionsRef}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2
                className={`text-3xl lg:text-4xl font-bold mb-4 ${
                  theme === "dark" ? "text-white" : "text-cream-900"
                }`}
              >
                Choose Your{" "}
                <span
                  className={
                    theme === "dark" ? "text-cyan-400" : "text-blue-600"
                  }
                >
                  Delivery
                </span>{" "}
                Option
              </h2>
              <p
                className={`text-lg ${
                  theme === "dark" ? "text-slate-400" : "text-cream-700"
                }`}
              >
                Select the shipping method that fits your needs
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {shippingOptions.map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 100,
                  }}
                  whileHover={{
                    y: -15,
                    scale: 1.03,
                    transition: { type: "spring", stiffness: 300 },
                  }}
                  className={`p-8 rounded-3xl backdrop-blur-xl transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 shadow-2xl shadow-slate-900/50"
                      : "bg-gradient-to-br from-cream-50/80 to-cream-100/60 border border-cream-300/50 shadow-2xl shadow-cream-200/50"
                  }`}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 ${
                      theme === "dark" ? option.color : option.lightColor
                    }`}
                  >
                    <div className="text-2xl text-white">{option.icon}</div>
                  </motion.div>

                  <h3
                    className={`text-2xl font-bold mb-3 ${
                      theme === "dark" ? "text-white" : "text-cream-900"
                    }`}
                  >
                    {option.name}
                  </h3>

                  <div
                    className={`font-bold text-xl mb-4 ${
                      theme === "dark" ? "text-amber-400" : "text-amber-600"
                    }`}
                  >
                    {option.price}
                  </div>

                  <div
                    className={`mb-6 flex items-center gap-2 ${
                      theme === "dark" ? "text-slate-400" : "text-cream-700"
                    }`}
                  >
                    <FaClock className="text-amber-500" />
                    <span>{option.time}</span>
                  </div>

                  <ul className="space-y-3">
                    {option.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 + index * 0.3 }}
                        className={`flex items-center gap-3 ${
                          theme === "dark" ? "text-slate-400" : "text-cream-700"
                        }`}
                      >
                        <motion.div
                          whileHover={{ scale: 1.5 }}
                          className={`w-2 h-2 rounded-full ${
                            theme === "dark"
                              ? "bg-gradient-to-r from-amber-500 to-rose-500"
                              : "bg-gradient-to-r from-amber-400 to-rose-400"
                          }`}
                        />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Features Section */}
          <motion.section
            ref={featuresRef}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2
                className={`text-3xl lg:text-4xl font-bold mb-4 ${
                  theme === "dark" ? "text-white" : "text-cream-900"
                }`}
              >
                Premium{" "}
                <span
                  className={
                    theme === "dark" ? "text-emerald-400" : "text-green-600"
                  }
                >
                  Shipping
                </span>{" "}
                Features
              </h2>
              <p
                className={`text-lg ${
                  theme === "dark" ? "text-slate-400" : "text-cream-700"
                }`}
              >
                Everything you need for a seamless delivery experience
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {shippingFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, rotateY: -90 }}
                  whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 50,
                  }}
                  whileHover={{
                    y: -10,
                    scale: 1.05,
                    transition: { type: "spring", stiffness: 250 },
                  }}
                  className={`p-6 rounded-2xl backdrop-blur-sm transition-all duration-300 ${
                    theme === "dark"
                      ? `${feature.darkColor} border border-slate-700/50`
                      : `${feature.lightColor} border border-cream-300/50`
                  }`}
                >
                  <motion.div
                    animate={{ rotateY: [0, 360] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className={`text-2xl mb-4 ${
                      theme === "dark" ? "text-white" : "text-cream-900"
                    }`}
                  >
                    {feature.icon}
                  </motion.div>

                  <h4
                    className={`text-lg font-bold mb-3 ${
                      theme === "dark" ? "text-white" : "text-cream-900"
                    }`}
                  >
                    {feature.title}
                  </h4>

                  <p
                    className={`${
                      theme === "dark" ? "text-slate-400" : "text-cream-700"
                    }`}
                  >
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* FAQ Section */}
          <motion.section
            ref={faqRef}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2
                className={`text-3xl lg:text-4xl font-bold mb-4 ${
                  theme === "dark" ? "text-white" : "text-cream-900"
                }`}
              >
                Frequently{" "}
                <span
                  className={
                    theme === "dark" ? "text-purple-400" : "text-purple-600"
                  }
                >
                  Asked
                </span>{" "}
                Questions
              </h2>
              <p
                className={`text-lg ${
                  theme === "dark" ? "text-slate-400" : "text-cream-700"
                }`}
              >
                Find answers to common shipping questions
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    x: index % 2 === 0 ? -50 : 50,
                    rotate: index % 2 === 0 ? -5 : 5,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    rotate: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100,
                  }}
                  whileHover={{
                    x: index % 2 === 0 ? 10 : -10,
                    transition: { type: "spring", stiffness: 200 },
                  }}
                  className={`p-8 rounded-2xl backdrop-blur-xl transition-all duration-300 ${
                    theme === "dark"
                      ? "bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50"
                      : "bg-gradient-to-br from-cream-50/80 to-cream-100/60 border border-cream-300/50"
                  }`}
                >
                  <h3
                    className={`text-lg font-bold mb-4 ${
                      theme === "dark" ? "text-white" : "text-cream-900"
                    }`}
                  >
                    {faq.q}
                  </h3>

                  <p
                    className={`${
                      theme === "dark" ? "text-slate-400" : "text-cream-700"
                    }`}
                  >
                    {faq.a}
                  </p>

                  <div
                    className={`absolute -top-3 -left-3 w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      theme === "dark"
                        ? "bg-gradient-to-r from-amber-500 to-rose-500 text-white"
                        : "bg-gradient-to-r from-amber-400 to-rose-400 text-white"
                    }`}
                  >
                    {index + 1}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Important Notes Section */}
          <motion.section
            ref={notesRef}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, type: "spring" }}
            className={`p-8 lg:p-12 rounded-3xl backdrop-blur-xl transition-all duration-300 relative overflow-hidden ${
              theme === "dark"
                ? "bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-slate-700/50"
                : "bg-gradient-to-r from-cream-100/50 to-cream-200/50 border border-cream-300/50"
            }`}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8"
            >
              <h3
                className={`text-2xl lg:text-3xl font-bold ${
                  theme === "dark" ? "text-white" : "text-cream-900"
                }`}
              >
                Important{" "}
                <span
                  className={
                    theme === "dark" ? "text-amber-400" : "text-amber-600"
                  }
                >
                  Information
                </span>
              </h3>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h4
                  className={`font-bold text-lg mb-4 flex items-center gap-2 ${
                    theme === "dark" ? "text-white" : "text-cream-900"
                  }`}
                >
                  <FaShippingFast className="text-amber-500" />
                  Processing Time
                </h4>
                <p
                  className={`${
                    theme === "dark" ? "text-slate-400" : "text-cream-700"
                  }`}
                >
                  Orders process within 24-48 hours, excluding weekends and
                  holidays.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <h4
                  className={`font-bold text-lg mb-4 flex items-center gap-2 ${
                    theme === "dark" ? "text-white" : "text-cream-900"
                  }`}
                >
                  <FaCheckCircle className="text-amber-500" />
                  Delivery Estimates
                </h4>
                <p
                  className={`${
                    theme === "dark" ? "text-slate-400" : "text-cream-700"
                  }`}
                >
                  Delivery times are estimates and may vary based on location
                  and carrier.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <h4
                  className={`font-bold text-lg mb-4 flex items-center gap-2 ${
                    theme === "dark" ? "text-white" : "text-cream-900"
                  }`}
                >
                  <FaShieldAlt className="text-amber-500" />
                  Contact Us
                </h4>
                <p
                  className={`${
                    theme === "dark" ? "text-slate-400" : "text-cream-700"
                  }`}
                >
                  Questions? Email support@adescart.com or call +1 (800)
                  744-7744.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-center mt-10"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-amber-500 to-rose-500 hover:shadow-xl hover:shadow-amber-500/30"
                    : "bg-gradient-to-r from-amber-400 to-rose-400 hover:shadow-xl hover:shadow-amber-400/30"
                } text-white`}
              >
                Start Shopping Now
              </motion.button>
            </motion.div>
          </motion.section>

          {/* Scroll to Top Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`fixed bottom-6 left-6 w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-50 transition-all duration-300 ${
              theme === "dark"
                ? "bg-gradient-to-r from-slate-800 to-slate-900 hover:from-amber-500 hover:to-rose-500"
                : "bg-gradient-to-r from-cream-200 to-cream-300 hover:from-amber-400 hover:to-rose-400"
            }`}
          >
            <FaArrowUp />
          </motion.button>
        </div>
      </div>
    </>
  );
};

export default ShippingInfoPage;
