import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  FaQuestionCircle,
  FaShoppingCart,
  FaShippingFast,
  FaUndo,
  FaCreditCard,
  FaShieldAlt,
  FaUser,
  FaBox,
  FaStar,
  FaSearch,
  FaPlus,
  FaMinus,
  FaSun,
  FaMoon,
  FaArrowDown,
  FaArrowUp,
  FaEnvelope,
  FaHeadset,
} from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";

const FAQPage = () => {
  const [theme, setTheme] = useState("light");
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("header");
  const [openCategory, setOpenCategory] = useState("general");
  const [searchTerm, setSearchTerm] = useState("");
  const [openItems, setOpenItems] = useState({});
  const [parallaxValue, setParallaxValue] = useState(0);

  // Refs for sections
  const headerRef = useRef(null);
  const popularRef = useRef(null);
  const categoriesRef = useRef(null);
  const faqRef = useRef(null);
  const contactRef = useRef(null);
  const containerRef = useRef(null);

  // Animation variants
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const faqItemVariants = {
    closed: {
      height: 0,
      opacity: 0,
      marginTop: 0,
      transition: {
        height: {
          duration: 0.4,
          ease: [0.04, 0.62, 0.23, 0.98],
        },
        opacity: {
          duration: 0.3,
          ease: "easeIn",
        },
      },
    },
    open: {
      height: "auto",
      opacity: 1,
      marginTop: "1.5rem",
      transition: {
        height: {
          duration: 0.5,
          ease: [0.04, 0.62, 0.23, 0.98],
        },
        opacity: {
          duration: 0.4,
          delay: 0.1,
          ease: "easeOut",
        },
        marginTop: {
          duration: 0.4,
          ease: "easeOut",
        },
      },
    },
  };

  const contentVariants = {
    closed: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: 0.2,
        ease: "easeOut",
      },
    },
  };

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
  const isPopularInView = useInView(popularRef, { once: false, amount: 0.3 });
  const isCategoriesInView = useInView(categoriesRef, {
    once: false,
    amount: 0.3,
  });
  const isFaqInView = useInView(faqRef, { once: false, amount: 0.3 });
  const isContactInView = useInView(contactRef, { once: false, amount: 0.3 });

  // Update active section based on scroll
  useEffect(() => {
    if (isHeaderInView) setActiveSection("header");
    if (isPopularInView) setActiveSection("popular");
    if (isCategoriesInView) setActiveSection("categories");
    if (isFaqInView) setActiveSection("faq");
    if (isContactInView) setActiveSection("contact");
  }, [
    isHeaderInView,
    isPopularInView,
    isCategoriesInView,
    isFaqInView,
    isContactInView,
  ]);

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      setParallaxValue(window.scrollY * 0.5);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const faqCategories = [
    {
      id: "general",
      title: "General Questions",
      icon: <FaQuestionCircle />,
      color: "from-blue-500 to-cyan-500",
      lightColor: "from-blue-400 to-cyan-400",
    },
    {
      id: "ordering",
      title: "Ordering & Payment",
      icon: <FaShoppingCart />,
      color: "from-purple-500 to-pink-500",
      lightColor: "from-purple-400 to-pink-400",
    },
    {
      id: "shipping",
      title: "Shipping & Delivery",
      icon: <FaShippingFast />,
      color: "from-green-500 to-emerald-500",
      lightColor: "from-green-400 to-emerald-400",
    },
    {
      id: "returns",
      title: "Returns & Refunds",
      icon: <FaUndo />,
      color: "from-amber-500 to-orange-500",
      lightColor: "from-amber-400 to-orange-400",
    },
    {
      id: "account",
      title: "Account & Security",
      icon: <FaUser />,
      color: "from-rose-500 to-red-500",
      lightColor: "from-rose-400 to-red-400",
    },
    {
      id: "products",
      title: "Products & Quality",
      icon: <FaBox />,
      color: "from-indigo-500 to-violet-500",
      lightColor: "from-indigo-400 to-violet-400",
    },
  ];

  const faqs = {
    general: [
      {
        q: "What is AdesCart?",
        a: "AdesCart is a premium e-commerce platform offering high-quality products with exceptional customer service. We curate the best products from trusted suppliers worldwide.",
        tags: ["about", "platform"],
      },
      {
        q: "Where are you located?",
        a: "Our headquarters are in San Francisco, California, but we ship worldwide from multiple fulfillment centers across the US, Europe, and Asia.",
        tags: ["location", "global"],
      },
      {
        q: "Are your products authentic?",
        a: "Absolutely! We source all products directly from authorized suppliers and manufacturers. Every product goes through quality verification before listing.",
        tags: ["authentic", "quality"],
      },
      {
        q: "Do you offer wholesale pricing?",
        a: "Yes, we offer special wholesale pricing for businesses and bulk orders. Contact our business team at wholesale@adescart.com for custom quotes.",
        tags: ["wholesale", "business"],
      },
      {
        q: "How can I contact customer service?",
        a: "You can reach us 24/7 through live chat, email at support@adescart.com, or call +251964623413 during business hours (9AM-6PM PST).",
        tags: ["contact", "support"],
      },
    ],
    ordering: [
      {
        q: "What payment methods do you accept?",
        a: "For now we accept only chapa payment but later we will integrate all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, Google Pay, and Shop Pay for secure checkout.",
        tags: ["payment", "checkout"],
      },
      {
        q: "Is it safe to shop on your website?",
        a: "Yes! We use 256-bit SSL encryption for all transactions. Your payment information is never stored on our servers. We're PCI DSS compliant.",
        tags: ["security", "safe"],
      },
      {
        q: "Can I modify or cancel my order?",
        a: "You can modify or cancel your order within 1 hour of placing it. After that, please contact customer support immediately for assistance.",
        tags: ["modify", "cancel"],
      },
      {
        q: "Do you save my credit card information?",
        a: "No, we never store your credit card information. All payments are processed through secure, PCI-compliant payment gateways.",
        tags: ["security", "privacy"],
      },
      {
        q: "Will I be charged sales tax?",
        a: "Sales tax is applied based on your shipping location and local regulations. The exact amount will be shown clearly during checkout.",
        tags: ["tax", "checkout"],
      },
    ],
    shipping: [
      {
        q: "How long does shipping take?",
        a: "Standard shipping: 3-7 business days. Express shipping: 1-3 business days. Overnight: Next business day. International: 7-14 business days.",
        tags: ["delivery", "time"],
      },
      {
        q: "Do you offer free shipping?",
        a: "Yes! Free standard shipping on all domestic orders over $50. International orders have shipping rates starting at $14.99.",
        tags: ["free", "shipping"],
      },
      {
        q: "Can I track my order?",
        a: "Yes! You'll receive a tracking number via email once your order ships. You can also track it from your account dashboard.",
        tags: ["tracking", "status"],
      },
      {
        q: "Do you ship internationally?",
        a: "Yes! We ship to over 50 countries. International shipping rates and delivery times vary by location.",
        tags: ["international", "global"],
      },
      {
        q: "What if I'm not home for delivery?",
        a: "Our carriers will leave packages in a secure location or with a neighbor. You can also request specific delivery instructions in your account.",
        tags: ["delivery", "instructions"],
      },
    ],
    returns: [
      {
        q: "What is your return policy?",
        a: "30-day return window from delivery date. Items must be unused, in original condition with all tags and packaging. Free returns on all eligible items.",
        tags: ["policy", "returns"],
      },
      {
        q: "How do I return an item?",
        a: "Log into your account → My Orders → Select item → Initiate return → Print prepaid label → Pack item → Drop off at carrier location.",
        tags: ["process", "how-to"],
      },
      {
        q: "How long do refunds take?",
        a: "Refunds are processed within 3-5 business days after we receive and inspect your return. The refund appears in your original payment method.",
        tags: ["refund", "timeline"],
      },
      {
        q: "Who pays for return shipping?",
        a: "We provide prepaid return labels for all eligible returns in the US. International customers may have return shipping costs.",
        tags: ["shipping", "cost"],
      },
      {
        q: "What items cannot be returned?",
        a: "Final sale items, personalized/customized products, items without original packaging, and products marked as 'non-returnable' cannot be returned.",
        tags: ["restrictions", "exceptions"],
      },
    ],
    account: [
      {
        q: "How do I create an account?",
        a: "Click 'Sign Up' in our signup page you will accessed it soon vissiting the site, enter your email and create a password. You can also sign up with Google or Facebook for faster login.",
        tags: ["signup", "register"],
      },
      {
        q: "I forgot my password. What should I do?",
        a: "Click 'Forgot Password' on the login page, enter your email, and we'll send you a password reset link that expires in 24 hours.",
        tags: ["password", "reset"],
      },
      {
        q: "How do I update my account information?",
        a: "Log into your account → My Profile → Edit information → Save changes. You can update address, payment methods, and communication preferences.",
        tags: ["update", "profile"],
      },
      {
        q: "Is my personal information secure?",
        a: "Yes! We use industry-standard encryption and never share your personal information with third parties without your consent.",
        tags: ["security", "privacy"],
      },
      {
        q: "Can I delete my account?",
        a: "Yes, contact customer support to request account deletion. Note: This action is permanent and cannot be undone.",
        tags: ["delete", "account"],
      },
    ],
    products: [
      {
        q: "How do I know if a product is in stock?",
        a: "Stock status is shown on each product page. 'In Stock' means ready to ship. 'Low Stock' means limited quantity. 'Out of Stock' means temporarily unavailable.",
        tags: ["stock", "availability"],
      },
      {
        q: "Do you offer product warranties?",
        a: "Most products come with a 1-year manufacturer warranty. Warranty information is listed on individual product pages. Contact us for warranty claims.",
        tags: ["warranty", "guarantee"],
      },
      {
        q: "Can I request a specific product?",
        a: "Yes! Email requests@adescart.com with product details. We're always looking to expand our collection based on customer requests.",
        tags: ["request", "suggestion"],
      },
      {
        q: "Are your products eco-friendly?",
        a: "We prioritize eco-friendly and sustainable products. Look for the 'Eco-Friendly' badge on product pages to identify environmentally conscious items.",
        tags: ["eco", "sustainable"],
      },
      {
        q: "Do products come with instructions?",
        a: "Yes! All products include detailed instructions. Many also have video tutorials available on our YouTube channel.",
        tags: ["instructions", "tutorials"],
      },
    ],
  };

  const popularQuestions = [
    { q: "How long does shipping take?", category: "shipping" },
    { q: "What is your return policy?", category: "returns" },
    { q: "Do you offer free shipping?", category: "shipping" },
    { q: "Is it safe to shop here?", category: "ordering" },
    { q: "How do I track my order?", category: "shipping" },
    { q: "What payment methods do you accept?", category: "ordering" },
  ];

  const filteredFAQs = searchTerm
    ? Object.values(faqs)
        .flat()
        .filter(
          (faq) =>
            faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.a.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.tags.some((tag) =>
              tag.toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
    : faqs[openCategory];

  useEffect(() => {
    const savedTheme = localStorage.getItem("faq-theme") || "light";
    setTheme(savedTheme);
    document.documentElement.className = savedTheme;

    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("faq-theme", newTheme);
    document.documentElement.className = newTheme;
  };

  // Scroll to section
  const scrollToSection = (sectionId) => {
    const sections = {
      header: headerRef,
      popular: popularRef,
      categories: categoriesRef,
      faq: faqRef,
      contact: contactRef,
    };

    if (sections[sectionId]?.current) {
      sections[sectionId].current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Toggle FAQ item with smooth animation
  const toggleFAQItem = (categoryId, index) => {
    const key = `${categoryId}-${index}`;

    // Close all other items in the same category
    if (!openItems[key]) {
      const newOpenItems = {};
      Object.keys(openItems).forEach((itemKey) => {
        if (itemKey.startsWith(`${categoryId}-`)) {
          newOpenItems[itemKey] = false;
        }
      });
      setOpenItems({ ...newOpenItems, [key]: true });
    } else {
      setOpenItems({ ...openItems, [key]: false });
    }
  };

  // FAQ Item component with improved animations
  const FAQItem = ({ faq, index, categoryId }) => {
    const itemKey = `${categoryId}-${index}`;
    const isOpen = openItems[itemKey] || false;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: 0.6,
          delay: index * 0.05,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mb-4"
        layout
      >
        <motion.button
          onClick={() => toggleFAQItem(categoryId, index)}
          className={`w-full p-6 rounded-2xl backdrop-blur-xl transition-all duration-300 text-left ${
            theme === "dark"
              ? "bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 hover:shadow-xl hover:shadow-slate-900/50"
              : "bg-gradient-to-br from-cream-50/80 to-cream-100/60 border border-cream-300/50 hover:shadow-xl hover:shadow-cream-200/50"
          }`}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          layout
        >
          <div className="flex items-center justify-between">
            <h3
              className={`text-lg font-bold pr-8 ${
                theme === "dark" ? "text-white" : "text-cream-900"
              }`}
            >
              {faq.q}
            </h3>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "circOut" }}
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                theme === "dark"
                  ? "bg-gradient-to-r from-amber-500/10 to-rose-500/10"
                  : "bg-gradient-to-r from-amber-400/10 to-rose-400/10"
              }`}
            >
              {isOpen ? (
                <FaMinus
                  className={
                    theme === "dark" ? "text-amber-500" : "text-amber-600"
                  }
                />
              ) : (
                <FaPlus
                  className={
                    theme === "dark" ? "text-amber-500" : "text-amber-600"
                  }
                />
              )}
            </motion.div>
          </div>

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                variants={faqItemVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="overflow-hidden"
                layout
              >
                <motion.div
                  variants={contentVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="pt-6 border-t"
                >
                  <p
                    className={`mb-4 ${
                      theme === "dark" ? "text-slate-400" : "text-cream-700"
                    }`}
                  >
                    {faq.a}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {faq.tags.map((tag, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 + idx * 0.05 }}
                        className={`px-3 py-1 rounded-full text-xs ${
                          theme === "dark"
                            ? "bg-gradient-to-r from-amber-500/10 to-rose-500/10 text-amber-400"
                            : "bg-gradient-to-r from-amber-400/10 to-rose-400/10 text-amber-600"
                        }`}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>
    );
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
            <div className="w-24 h-24 rounded-full border-4 border-transparent border-t-purple-500 border-r-pink-500 animate-spin"></div>
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
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 z-50"
        style={{ scaleX: smoothScrollProgress }}
        initial={{ scaleX: 0 }}
      />

      {/* Navigation Dots */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
        {["header", "popular", "categories", "faq", "contact"].map(
          (section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className="relative group"
            >
              <motion.div
                animate={{
                  scale: activeSection === section ? 1.5 : 1,
                  backgroundColor:
                    activeSection === section
                      ? theme === "dark"
                        ? "#a855f7"
                        : "#a855f7"
                      : theme === "dark"
                        ? "#475569"
                        : "#E8D8BC",
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="w-3 h-3 rounded-full transition-all duration-300"
              />
              <div
                className={`absolute right-6 top-1/2 transform -translate-y-1/2 px-2 py-1 rounded text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
                  theme === "dark"
                    ? "bg-slate-800 text-white"
                    : "bg-cream-100 text-cream-900"
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </div>
            </button>
          )
        )}
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
            transition={{ delay: 0.2, duration: 0.4 }}
            className="fixed top-6 right-20 z-50"
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.95 }}
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
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-20 relative"
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
              className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl"
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
                    ? "bg-gradient-to-r from-purple-500 to-pink-500"
                    : "bg-gradient-to-r from-purple-400 to-pink-400"
                } opacity-20 blur-xl`}
              />
              <div
                className={`w-20 h-20 rounded-full ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-purple-500 to-pink-500"
                    : "bg-gradient-to-r from-purple-400 to-pink-400"
                } flex items-center justify-center relative z-10 shadow-2xl`}
              >
                <FaQuestionCircle className="text-3xl text-white" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className={`text-4xl lg:text-6xl font-bold mb-6 tracking-tight ${
                theme === "dark" ? "text-white" : "text-cream-900"
              }`}
            >
              Frequently{" "}
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className={
                  theme === "dark" ? "text-purple-400" : "text-purple-600"
                }
              >
                Asked
              </motion.span>{" "}
              Questions
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className={`text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed mb-12 ${
                theme === "dark" ? "text-slate-400" : "text-cream-700"
              }`}
            >
              Find quick answers to common questions about shopping with
              AdesCart
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="max-w-2xl mx-auto mb-12 relative"
            >
              <div className="relative">
                <FaSearch
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${
                    theme === "dark" ? "text-slate-400" : "text-cream-600"
                  }`}
                />
                <input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full pl-12 pr-4 py-4 rounded-2xl backdrop-blur-xl border transition-all duration-300 focus:outline-none focus:ring-2 ${
                    theme === "dark"
                      ? "bg-gradient-to-r from-slate-800/80 to-slate-900/80 border-slate-700/50 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-purple-500/20"
                      : "bg-gradient-to-r from-cream-50/80 to-cream-100/60 border-cream-300/50 text-cream-900 placeholder-cream-600 focus:border-purple-400 focus:ring-purple-400/20"
                  }`}
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${
                      theme === "dark"
                        ? "text-slate-400 hover:text-amber-500"
                        : "text-cream-600 hover:text-amber-600"
                    }`}
                  >
                    Clear
                  </button>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="flex justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection("popular")}
                className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-3 ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-xl hover:shadow-purple-500/30"
                    : "bg-gradient-to-r from-purple-400 to-pink-400 hover:shadow-xl hover:shadow-purple-400/30"
                } text-white`}
              >
                <FaArrowDown className="animate-bounce" />
                Browse Questions
              </motion.button>
            </motion.div>
          </motion.section>

          {/* Popular Questions Section */}
          {!searchTerm && (
            <motion.section
              ref={popularRef}
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
                className="mb-12"
              >
                <h2
                  className={`text-2xl lg:text-3xl font-bold mb-6 flex items-center gap-3 ${
                    theme === "dark" ? "text-white" : "text-cream-900"
                  }`}
                >
                  <IoSparkles
                    className={
                      theme === "dark" ? "text-amber-500" : "text-amber-600"
                    }
                  />
                  Popular Questions
                </h2>
                <p
                  className={`text-lg ${
                    theme === "dark" ? "text-slate-400" : "text-cream-700"
                  }`}
                >
                  Most frequently asked questions by our customers
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {popularQuestions.map((question, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100,
                      damping: 12,
                    }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setOpenCategory(question.category);
                      setTimeout(() => scrollToSection("faq"), 100);
                    }}
                    className={`p-4 rounded-xl backdrop-blur-xl border transition-all duration-300 text-left ${
                      theme === "dark"
                        ? "bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700/50 hover:shadow-xl hover:shadow-slate-900/50"
                        : "bg-gradient-to-br from-cream-50/80 to-cream-100/60 border-cream-300/50 hover:shadow-xl hover:shadow-cream-200/50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                          theme === "dark"
                            ? "bg-gradient-to-r from-amber-500/10 to-rose-500/10"
                            : "bg-gradient-to-r from-amber-400/10 to-rose-400/10"
                        }`}
                      >
                        <FaStar
                          className={
                            theme === "dark"
                              ? "text-amber-500"
                              : "text-amber-600"
                          }
                        />
                      </div>
                      <div>
                        <p
                          className={`font-medium ${
                            theme === "dark" ? "text-white" : "text-cream-900"
                          }`}
                        >
                          {question.q}
                        </p>
                        <span
                          className={`text-xs mt-1 inline-block ${
                            theme === "dark"
                              ? "text-amber-400"
                              : "text-amber-600"
                          }`}
                        >
                          {
                            faqCategories.find(
                              (c) => c.id === question.category
                            )?.title
                          }
                        </span>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.section>
          )}

          {/* Category Tabs Section */}
          {!searchTerm && (
            <motion.section
              ref={categoriesRef}
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
                className="mb-8"
              >
                <h2
                  className={`text-2xl lg:text-3xl font-bold mb-6 text-center ${
                    theme === "dark" ? "text-white" : "text-cream-900"
                  }`}
                >
                  Browse{" "}
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className={
                      theme === "dark" ? "text-blue-400" : "text-blue-600"
                    }
                  >
                    Categories
                  </motion.span>
                </h2>
                <p
                  className={`text-lg text-center ${
                    theme === "dark" ? "text-slate-400" : "text-cream-700"
                  }`}
                >
                  Select a category to explore related questions
                </p>
              </motion.div>

              <div className="flex flex-wrap gap-3 justify-center">
                {faqCategories.map((category, index) => (
                  <motion.button
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setOpenCategory(category.id);
                      setTimeout(() => scrollToSection("faq"), 100);
                    }}
                    className={`flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300 ${
                      openCategory === category.id
                        ? theme === "dark"
                          ? "bg-gradient-to-r from-slate-800 to-slate-900 shadow-xl"
                          : "bg-gradient-to-r from-cream-200 to-cream-300 shadow-xl"
                        : theme === "dark"
                          ? "bg-gradient-to-r from-slate-800/50 to-slate-900/50 hover:bg-slate-800/80"
                          : "bg-gradient-to-r from-cream-100/50 to-cream-200/50 hover:bg-cream-200/80"
                    } border ${
                      theme === "dark"
                        ? "border-slate-700/50"
                        : "border-cream-300/50"
                    }`}
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        theme === "dark" ? category.color : category.lightColor
                      }`}
                    >
                      {category.icon}
                    </motion.div>
                    <span
                      className={`font-medium ${
                        openCategory === category.id
                          ? theme === "dark"
                            ? "text-white"
                            : "text-cream-900"
                          : theme === "dark"
                            ? "text-slate-400"
                            : "text-cream-700"
                      }`}
                    >
                      {category.title}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.section>
          )}

          {/* FAQ List Section */}
          <motion.section
            ref={faqRef}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            {searchTerm ? (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <h2
                  className={`text-2xl lg:text-3xl font-bold mb-2 ${
                    theme === "dark" ? "text-white" : "text-cream-900"
                  }`}
                >
                  Search Results for "{searchTerm}"
                </h2>
                <p
                  className={`${
                    theme === "dark" ? "text-slate-400" : "text-cream-700"
                  }`}
                >
                  Found {filteredFAQs.length} answer
                  {filteredFAQs.length !== 1 ? "s" : ""}
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <h2
                  className={`text-2xl lg:text-3xl font-bold mb-2 ${
                    theme === "dark" ? "text-white" : "text-cream-900"
                  }`}
                >
                  {faqCategories.find((c) => c.id === openCategory)?.title}
                </h2>
                <p
                  className={`${
                    theme === "dark" ? "text-slate-400" : "text-cream-700"
                  }`}
                >
                  {filteredFAQs.length} questions in this category
                </p>
              </motion.div>
            )}

            <div className="space-y-4">
              {filteredFAQs.length > 0 ? (
                filteredFAQs.map((faq, index) => (
                  <FAQItem
                    key={index}
                    faq={faq}
                    index={index}
                    categoryId={searchTerm ? "search" : openCategory}
                  />
                ))
              ) : searchTerm ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="text-center py-12"
                >
                  <div
                    className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 ${
                      theme === "dark"
                        ? "bg-gradient-to-r from-amber-500/10 to-rose-500/10"
                        : "bg-gradient-to-r from-amber-400/10 to-rose-400/10"
                    }`}
                  >
                    <FaSearch className="text-3xl text-amber-600" />
                  </div>
                  <h3
                    className={`text-2xl font-bold mb-3 ${
                      theme === "dark" ? "text-white" : "text-cream-900"
                    }`}
                  >
                    No results found
                  </h3>
                  <p
                    className={`max-w-md mx-auto mb-6 ${
                      theme === "dark" ? "text-slate-400" : "text-cream-700"
                    }`}
                  >
                    We couldn't find any answers matching "{searchTerm}". Try
                    different keywords or browse by category.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSearchTerm("")}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      theme === "dark"
                        ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:shadow-xl hover:shadow-amber-500/30"
                        : "bg-gradient-to-r from-amber-400 to-amber-500 text-white hover:shadow-xl hover:shadow-amber-400/30"
                    }`}
                  >
                    Clear Search
                  </motion.button>
                </motion.div>
              ) : null}
            </div>
          </motion.section>

          {/* Contact CTA Section */}
          <motion.section
            ref={contactRef}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="relative overflow-hidden rounded-3xl"
          >
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              }}
              className={`absolute inset-0 ${
                theme === "dark"
                  ? "bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-amber-500/10"
                  : "bg-gradient-to-r from-purple-400/10 via-pink-400/10 to-amber-400/10"
              }`}
            />
            <div
              className={`relative rounded-3xl p-8 lg:p-12 text-center backdrop-blur-xl border ${
                theme === "dark"
                  ? "bg-gradient-to-r from-slate-800/50 to-slate-900/50 border-slate-700/50"
                  : "bg-gradient-to-r from-cream-100/50 to-cream-200/50 border-cream-300/50"
              }`}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                  <span
                    className={
                      theme === "dark" ? "text-white" : "text-cream-900"
                    }
                  >
                    Still have{" "}
                    <motion.span
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className={
                        theme === "dark" ? "text-amber-400" : "text-amber-600"
                      }
                    >
                      questions
                    </motion.span>
                    ?
                  </span>
                </h2>
                <p
                  className={`text-xl max-w-2xl mx-auto ${
                    theme === "dark" ? "text-slate-400" : "text-cream-700"
                  }`}
                >
                  Can't find what you're looking for? Our support team is ready
                  to help!
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-3 ${
                    theme === "dark"
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-xl hover:shadow-purple-500/30"
                      : "bg-gradient-to-r from-purple-400 to-pink-400 hover:shadow-xl hover:shadow-purple-400/30"
                  } text-white`}
                  onClick={() => (window.location.href = "/contact")}
                >
                  <FaHeadset />
                  Contact Support
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-8 py-4 rounded-xl font-bold text-lg border transition-all duration-300 flex items-center gap-3 ${
                    theme === "dark"
                      ? "bg-gradient-to-r from-slate-700 to-slate-800 text-slate-300 border-slate-600 hover:shadow-xl"
                      : "bg-gradient-to-r from-cream-200 to-cream-300 text-cream-800 border-cream-400 hover:shadow-xl"
                  }`}
                  onClick={() => window.open("mailto:support@adescart.com")}
                >
                  <FaEnvelope />
                  Email Us
                </motion.button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className={`mt-8 text-sm ${
                  theme === "dark" ? "text-slate-500" : "text-cream-600"
                }`}
              >
                Typically respond within 1-2 business hours
              </motion.div>
            </div>
          </motion.section>

          {/* Scroll to Top Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, duration: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`fixed bottom-6 left-6 w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-50 transition-all duration-300 ${
              theme === "dark"
                ? "bg-gradient-to-r from-slate-800 to-slate-900 hover:from-purple-500 hover:to-pink-500"
                : "bg-gradient-to-r from-cream-200 to-cream-300 hover:from-purple-400 hover:to-pink-400"
            }`}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaArrowUp />
          </motion.button>
        </div>
      </div>
    </>
  );
};

export default FAQPage;
