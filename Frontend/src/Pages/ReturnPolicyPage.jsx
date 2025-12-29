// import React from "react";
// import { motion } from "framer-motion";
// import {
//   FaUndo,
//   FaCalendarAlt,
//   FaBox,
//   FaShippingFast,
//   FaMoneyBillWave,
//   FaCheckCircle,
//   FaTimesCircle,
// } from "react-icons/fa";

// const ReturnPolicyPage = () => {
//   const policyPoints = [
//     {
//       title: "30-Day Return Window",
//       description:
//         "Return any item within 30 days of delivery for a full refund.",
//       icon: <FaCalendarAlt />,
//       color: "from-blue-500 to-cyan-500",
//     },
//     {
//       title: "Free Returns",
//       description: "We provide prepaid return labels for all eligible items.",
//       icon: <FaShippingFast />,
//       color: "from-green-500 to-emerald-500",
//     },
//     {
//       title: "Full Refund",
//       description:
//         "Receive your refund within 3-5 business days after we receive your return.",
//       icon: <FaMoneyBillWave />,
//       color: "from-amber-500 to-orange-500",
//     },
//     {
//       title: "Easy Process",
//       description: "Initiate returns directly from your account dashboard.",
//       icon: <FaUndo />,
//       color: "from-purple-500 to-pink-500",
//     },
//   ];

//   const conditions = [
//     { text: "Item must be unused and in original condition", valid: true },
//     { text: "All original tags and packaging must be included", valid: true },
//     {
//       text: "Return must be initiated within 30 days of delivery",
//       valid: true,
//     },
//     { text: "Final sale items marked 'Non-Returnable'", valid: false },
//     { text: "Items without original packaging", valid: false },
//     { text: "Personalized or customized products", valid: false },
//   ];

//   const processSteps = [
//     "Login to your account and go to 'My Orders'",
//     "Select the item you want to return",
//     "Choose return reason and print prepaid label",
//     "Pack item securely with all accessories",
//     "Drop off at any carrier location",
//     "Track return status in your account",
//   ];

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.8 }}
//       className="min-h-screen bg-gradient-to-br from-amber-50/30 via-white to-rose-50/20 dark:from-slate-950/95 dark:via-slate-900 dark:to-slate-950/95 py-12"
//     >
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <motion.div
//             initial={{ y: -20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 mb-6"
//           >
//             <FaUndo className="text-3xl text-white" />
//           </motion.div>
//           <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
//             Return Policy
//           </h1>
//           <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
//             Simple, hassle-free returns. Your satisfaction is guaranteed.
//           </p>
//         </div>

//         {/* Policy Highlights */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
//           {policyPoints.map((point, index) => (
//             <motion.div
//               key={index}
//               initial={{ y: 20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: index * 0.1 }}
//               className="p-6 rounded-2xl bg-gradient-to-br from-white/80 to-white/60 dark:from-slate-800/80 dark:to-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 shadow-lg"
//             >
//               <div
//                 className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${point.color} mb-4`}
//               >
//                 {point.icon}
//               </div>
//               <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
//                 {point.title}
//               </h3>
//               <p className="text-slate-600 dark:text-slate-400">
//                 {point.description}
//               </p>
//             </motion.div>
//           ))}
//         </div>

//         <div className="grid lg:grid-cols-2 gap-12">
//           {/* Eligibility Conditions */}
//           <motion.div
//             initial={{ x: -30, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             className="space-y-6"
//           >
//             <div className="p-8 rounded-2xl bg-gradient-to-br from-white/80 to-white/60 dark:from-slate-800/80 dark:to-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 shadow-lg">
//               <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
//                 Return Eligibility
//               </h2>
//               <div className="space-y-4">
//                 {conditions.map((condition, index) => (
//                   <div key={index} className="flex items-start gap-3">
//                     <div
//                       className={`mt-1 ${condition.valid ? "text-green-500" : "text-rose-500"}`}
//                     >
//                       {condition.valid ? <FaCheckCircle /> : <FaTimesCircle />}
//                     </div>
//                     <span
//                       className={
//                         condition.valid
//                           ? "text-slate-700 dark:text-slate-300"
//                           : "text-slate-500 dark:text-slate-500"
//                       }
//                     >
//                       {condition.text}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Refund Info */}
//             <div className="p-8 rounded-2xl bg-gradient-to-br from-amber-500/5 to-rose-500/5 border border-amber-500/20 dark:border-amber-500/30 backdrop-blur-xl">
//               <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
//                 Refund Information
//               </h3>
//               <ul className="space-y-2 text-slate-600 dark:text-slate-400">
//                 <li>• Refunds processed within 3-5 business days</li>
//                 <li>• Original payment method will be credited</li>
//                 <li>
//                   • Shipping costs are non-refundable unless error is on our
//                   part
//                 </li>
//                 <li>• Sale items eligible for return or exchange</li>
//               </ul>
//             </div>
//           </motion.div>

//           {/* Return Process */}
//           <motion.div
//             initial={{ x: 30, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             className="space-y-6"
//           >
//             <div className="p-8 rounded-2xl bg-gradient-to-br from-white/80 to-white/60 dark:from-slate-800/80 dark:to-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 shadow-lg">
//               <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">
//                 How to Return
//               </h2>
//               <div className="space-y-4">
//                 {processSteps.map((step, index) => (
//                   <div
//                     key={index}
//                     className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-slate-900/50"
//                   >
//                     <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 flex items-center justify-center text-white font-bold">
//                       {index + 1}
//                     </div>
//                     <span className="text-slate-700 dark:text-slate-300">
//                       {step}
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Contact Support */}
//             <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border border-blue-500/20 dark:border-blue-500/30 backdrop-blur-xl">
//               <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
//                 Need Help?
//               </h3>
//               <p className="text-slate-600 dark:text-slate-400 mb-4">
//                 Contact our support team for return assistance
//               </p>
//               <div className="space-y-2">
//                 <p className="text-slate-700 dark:text-slate-300">
//                   📧 support@luxecart.com
//                 </p>
//                 <p className="text-slate-700 dark:text-slate-300">
//                   📞 1-800-RETURNS
//                 </p>
//                 <p className="text-slate-700 dark:text-slate-300">
//                   💬 Live Chat available 24/7
//                 </p>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default ReturnPolicyPage;
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  FaUndo,
  FaCalendarAlt,
  FaBox,
  FaShippingFast,
  FaMoneyBillWave,
  FaCheckCircle,
  FaTimesCircle,
  FaChevronUp,
  FaQuestionCircle,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaExchangeAlt,
  FaHeadset,
  FaShieldAlt,
} from "react-icons/fa";

const ReturnPolicyPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Check system theme
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    setIsDarkMode(darkModeMediaQuery.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    darkModeMediaQuery.addEventListener("change", handleChange);

    return () => darkModeMediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Enhanced scroll animation with momentum
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      lastScrollY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = lastScrollY;
          const maxScroll = document.body.scrollHeight - window.innerHeight;
          const progress = (scrolled / maxScroll) * 100;
          setScrollProgress(progress);
          setIsScrolling(scrolled > 100);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const policyPoints = [
    {
      title: "30-Day Return Window",
      description:
        "Return any item within 30 days of delivery for a full refund.",
      icon: <FaCalendarAlt />,
      color: "from-blue-500 to-cyan-500",
      delay: 0.1,
      rotation: 5,
    },
    {
      title: "Free Returns",
      description: "We provide prepaid return labels for all eligible items.",
      icon: <FaShippingFast />,
      color: "from-green-500 to-emerald-500",
      delay: 0.2,
      rotation: -3,
    },
    {
      title: "Full Refund",
      description:
        "Receive your refund within 3-5 business days after we receive your return.",
      icon: <FaMoneyBillWave />,
      color: "from-amber-500 to-orange-500",
      delay: 0.3,
      rotation: 2,
    },
    {
      title: "Easy Process",
      description: "Initiate returns directly from your account dashboard.",
      icon: <FaUndo />,
      color: "from-purple-500 to-pink-500",
      delay: 0.4,
      rotation: -5,
    },
  ];

  const conditions = [
    {
      text: "Item must be unused and in original condition",
      valid: true,
      delay: 0.1,
    },
    {
      text: "All original tags and packaging must be included",
      valid: true,
      delay: 0.2,
    },
    {
      text: "Return must be initiated within 30 days of delivery",
      valid: true,
      delay: 0.3,
    },
    {
      text: "Final sale items marked 'Non-Returnable'",
      valid: false,
      delay: 0.4,
    },
    { text: "Items without original packaging", valid: false, delay: 0.5 },
    { text: "Personalized or customized products", valid: false, delay: 0.6 },
  ];

  const processSteps = [
    { text: "Login to your account and go to 'My Orders'", delay: 0.1 },
    { text: "Select the item you want to return", delay: 0.2 },
    { text: "Choose return reason and print prepaid label", delay: 0.3 },
    { text: "Pack item securely with all accessories", delay: 0.4 },
    { text: "Drop off at any carrier location", delay: 0.5 },
    { text: "Track return status in your account", delay: 0.6 },
  ];

  const timelineSteps = [
    {
      day: "Day 1",
      action: "Initiate return online",
      icon: <FaUndo />,
      color: "from-blue-500 to-cyan-500",
      delay: 0.1,
    },
    {
      day: "Day 2-3",
      action: "Ship item back to us",
      icon: <FaShippingFast />,
      color: "from-green-500 to-emerald-500",
      delay: 0.2,
    },
    {
      day: "Day 4-5",
      action: "We receive and inspect",
      icon: <FaCheckCircle />,
      color: "from-amber-500 to-orange-500",
      delay: 0.3,
    },
    {
      day: "Day 6-7",
      action: "Refund processed",
      icon: <FaMoneyBillWave />,
      color: "from-purple-500 to-pink-500",
      delay: 0.4,
    },
  ];

  const contactInfo = [
    { icon: <FaEnvelope />, text: "support@luxecart.com", delay: 0.1 },
    { icon: <FaPhone />, text: "1-800-RETURNS", delay: 0.2 },
    { icon: <FaHeadset />, text: "24/7 Live Chat Support", delay: 0.3 },
    { icon: <FaClock />, text: "Mon-Fri: 9AM-9PM EST", delay: 0.4 },
  ];

  const faqs = [
    {
      q: "How do I track my return?",
      a: "You can track your return in your account dashboard under 'My Returns'.",
      delay: 0.1,
    },
    {
      q: "What if my item arrives damaged?",
      a: "Contact us within 48 hours of delivery with photos for immediate assistance.",
      delay: 0.2,
    },
    {
      q: "Can I exchange an item?",
      a: "Yes! Select 'Exchange' instead of 'Return' during the return process.",
      delay: 0.3,
    },
    {
      q: "How long does inspection take?",
      a: "Quality inspection typically takes 1-2 business days after we receive your return.",
      delay: 0.4,
    },
    {
      q: "Are return shipping fees covered?",
      a: "Yes, we provide free return shipping for all eligible returns.",
      delay: 0.5,
    },
    {
      q: "Can I return sale items?",
      a: "Yes, sale items are eligible for return within the standard 30-day window.",
      delay: 0.6,
    },
  ];

  const refundPoints = [
    "Refunds processed within 3-5 business days",
    "Original payment method will be credited",
    "Shipping costs are non-refundable unless error is on our part",
    "Sale items eligible for return or exchange",
    "Digital products have a 14-day return window",
    "Refunds to international cards may take 7-10 days",
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0, rotateX: 10 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };

  const floatingAnimation = {
    y: [0, -8, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const rotateAnimation = {
    rotate: [0, 360],
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear",
    },
  };

  const shimmerAnimation = {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "linear",
    },
  };

  return (
    <>
      {/* Loading Animation */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-cream-50 to-cream-100 dark:from-gray-900 dark:to-gray-800"
          >
            <div className="relative">
              <motion.div
                animate={pulseAnimation}
                className="w-24 h-24 rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
              />
              <motion.div
                animate={floatingAnimation}
                className="absolute inset-0 flex items-center justify-center"
              >
                <FaUndo className="text-4xl text-white" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100 dark:from-gray-900 dark:to-gray-800 pt-24 pb-12 overflow-hidden relative"
      >
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-amber-400/5 to-orange-500/5 dark:from-purple-600/5 dark:to-pink-600/5"
              initial={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                scale: Math.random() * 0.3 + 0.3,
                opacity: Math.random() * 0.2 + 0.1,
              }}
              animate={{
                y: [
                  null,
                  `calc(${Math.random() * 100}% + ${Math.random() * 50 - 25}px)`,
                ],
                x: [
                  null,
                  `calc(${Math.random() * 100}% + ${Math.random() * 50 - 25}px)`,
                ],
              }}
              transition={{
                duration: Math.random() * 15 + 10,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
              }}
            />
          ))}
        </div>

        {/* Enhanced Scroll Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 h-1.5 z-40"
          style={{ width: `${scrollProgress}%` }}
          animate={{
            background: [
              "linear-gradient(90deg, #f59e0b, #f97316, #f59e0b)",
              "linear-gradient(90deg, #f97316, #f59e0b, #f97316)",
              "linear-gradient(90deg, #f59e0b, #f97316, #f59e0b)",
            ],
            backgroundSize: "200% 100%",
            boxShadow: "0 0 20px rgba(245, 158, 11, 0.5)",
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Back to Top Button */}
        <AnimatePresence>
          {isScrolling && (
            <motion.button
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
                transition: {
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                },
              }}
              exit={{ opacity: 0, scale: 0, rotate: 180 }}
              whileHover={{
                scale: 1.1,
                rotate: 360,
                boxShadow: "0 0 30px rgba(245, 158, 11, 0.5)",
              }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-amber-500 to-orange-500 dark:from-purple-600 dark:to-pink-600 text-white rounded-full shadow-2xl flex items-center justify-center z-40 hover:shadow-3xl transition-all duration-300 group"
            >
              <motion.div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
              <FaChevronUp className="w-6 h-6 relative" />
            </motion.button>
          )}
        </AnimatePresence>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center mb-16 relative"
          >
            <div className="relative inline-block">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{
                  scale: 1,
                  rotate: 0,
                  transition: {
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                  },
                }}
                whileHover={{ scale: 1.1, rotate: 360 }}
                className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 mb-6 shadow-2xl group relative"
              >
                <motion.div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
                <motion.div animate={floatingAnimation}>
                  <FaUndo className="text-4xl text-white relative" />
                </motion.div>
              </motion.div>

              {/* Orbiting circles */}
              {[0, 120, 240].map((rotation, i) => (
                <motion.div
                  key={i}
                  className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                  animate={{
                    rotate: rotation,
                    x: [0, 60 * Math.cos((rotation * Math.PI) / 180), 0],
                    y: [0, 60 * Math.sin((rotation * Math.PI) / 180), 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }}
                  style={{
                    top: "50%",
                    left: "50%",
                    marginLeft: -8,
                    marginTop: -8,
                  }}
                />
              ))}
            </div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl lg:text-6xl font-bold mb-6 relative"
            >
              <span className="bg-gradient-to-r from-amber-900 via-orange-800 to-amber-900 dark:from-white dark:via-purple-200 dark:to-white bg-clip-text text-transparent">
                Return & Refund Policy
              </span>
              <motion.span
                className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl lg:text-2xl text-amber-800/80 dark:text-purple-300 max-w-3xl mx-auto mb-6"
            >
              Simple, hassle-free returns. Your satisfaction is guaranteed.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-lg text-amber-700/70 dark:text-purple-400/70 max-w-2xl mx-auto"
            >
              We believe in making returns as easy as shopping. That's why we've
              created a transparent, customer-friendly return policy that puts
              you first.
            </motion.p>
          </motion.div>

          {/* Policy Highlights with enhanced animations */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          >
            {policyPoints.map((point, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={{
                  hidden: {
                    y: 50,
                    opacity: 0,
                    scale: 0.8,
                    rotate: point.rotation,
                  },
                  visible: {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    transition: {
                      type: "spring",
                      stiffness: 100,
                      damping: 12,
                      delay: point.delay,
                    },
                  },
                }}
                whileHover={{
                  y: -10,
                  scale: 1.05,
                  rotate: point.rotation,
                  transition: { type: "spring", stiffness: 400, damping: 25 },
                }}
                whileTap={{ scale: 0.95 }}
                className="p-8 rounded-3xl bg-gradient-to-br from-white/90 to-white/80 dark:from-gray-800/90 dark:to-gray-900/90 backdrop-blur-xl border border-amber-100 dark:border-purple-900/50 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />

                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ delay: point.delay + 0.2, type: "spring" }}
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${point.color} mb-6 relative group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}
                >
                  <motion.div
                    animate={floatingAnimation}
                    className="text-2xl text-white"
                  >
                    {point.icon}
                  </motion.div>
                  <div className="absolute inset-0 rounded-full bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: point.delay + 0.3 }}
                  className="text-xl font-bold text-amber-900 dark:text-white mb-3"
                >
                  {point.title}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: point.delay + 0.4 }}
                  className="text-amber-700 dark:text-purple-300"
                >
                  {point.description}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 50,
                damping: 20,
                delay: 0.2,
              }}
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-8"
            >
              {/* Eligibility Conditions */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-gradient-to-br from-white/90 to-white/80 dark:from-gray-800/90 dark:to-gray-900/90 backdrop-blur-xl border border-amber-100 dark:border-purple-900/50 shadow-xl relative overflow-hidden"
              >
                <div className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full blur-2xl" />

                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl font-bold text-amber-900 dark:text-white mb-8 flex items-center gap-3"
                >
                  <FaCheckCircle className="text-green-500" />
                  Return Eligibility
                </motion.h2>

                <div className="space-y-4">
                  {conditions.map((condition, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: -30, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: condition.delay }}
                      viewport={{ once: true }}
                      whileHover={{ x: 5 }}
                      className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-cream-50 to-cream-100 dark:from-gray-800/50 dark:to-gray-900/50 hover:shadow-md transition-all duration-300"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: condition.delay + 0.1 }}
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${condition.valid ? "bg-green-500/20" : "bg-rose-500/20"}`}
                      >
                        <div
                          className={
                            condition.valid ? "text-green-500" : "text-rose-500"
                          }
                        >
                          {condition.valid ? (
                            <FaCheckCircle />
                          ) : (
                            <FaTimesCircle />
                          )}
                        </div>
                      </motion.div>

                      <span
                        className={`text-lg ${condition.valid ? "text-amber-800 dark:text-purple-200" : "text-amber-600/70 dark:text-purple-400/70"}`}
                      >
                        {condition.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Timeline */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-500/20 dark:border-blue-500/30 backdrop-blur-xl shadow-xl relative overflow-hidden"
              >
                <div className="absolute -top-4 -left-4 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl" />

                <motion.h3
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-2xl font-bold text-amber-900 dark:text-white mb-8"
                >
                  Refund Timeline
                </motion.h3>

                <div className="space-y-6 relative">
                  {/* Timeline line */}
                  <motion.div
                    className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-cyan-500"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                  />

                  {timelineSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      transition={{ delay: step.delay }}
                      viewport={{ once: true }}
                      className="flex items-center gap-6 relative"
                    >
                      {/* Timeline dot */}
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: step.delay + 0.1, type: "spring" }}
                        className="relative z-10"
                      >
                        <div
                          className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center shadow-lg`}
                        >
                          <motion.div
                            animate={floatingAnimation}
                            className="text-xl text-white"
                          >
                            {step.icon}
                          </motion.div>
                        </div>
                      </motion.div>

                      <div className="flex-1">
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: step.delay + 0.2 }}
                          className="text-sm font-bold text-amber-700 dark:text-purple-300 mb-1"
                        >
                          {step.day}
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: step.delay + 0.3 }}
                          className="text-lg font-medium text-amber-800 dark:text-purple-200"
                        >
                          {step.action}
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 50,
                damping: 20,
                delay: 0.3,
              }}
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-8"
            >
              {/* Return Process */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-gradient-to-br from-white/90 to-white/80 dark:from-gray-800/90 dark:to-gray-900/90 backdrop-blur-xl border border-amber-100 dark:border-purple-900/50 shadow-xl relative overflow-hidden"
              >
                <div className="absolute top-4 left-4 w-24 h-24 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-full blur-2xl" />

                <motion.h2
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-2xl font-bold text-amber-900 dark:text-white mb-8 flex items-center gap-3"
                >
                  <FaUndo className="text-amber-500" />
                  How to Return
                </motion.h2>

                <div className="space-y-4">
                  {processSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: 30, opacity: 0, scale: 0.9 }}
                      whileInView={{ x: 0, opacity: 1, scale: 1 }}
                      transition={{ delay: step.delay }}
                      viewport={{ once: true }}
                      whileHover={{ x: 5, scale: 1.02 }}
                      className="flex items-start gap-4 p-5 rounded-xl bg-gradient-to-r from-cream-50 to-cream-100 dark:from-gray-800/50 dark:to-gray-900/50 hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
                    >
                      {/* Step number background */}
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: step.delay + 0.1 }}
                        className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold relative group-hover:scale-110 transition-transform duration-300"
                      >
                        <span className="relative z-10">{index + 1}</span>
                        <div className="absolute inset-0 rounded-full bg-white/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.div>

                      <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: step.delay + 0.2 }}
                        className="text-lg text-amber-800 dark:text-purple-200 pt-1"
                      >
                        {step.text}
                      </motion.span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Contact Support */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-500/20 dark:border-green-500/30 backdrop-blur-xl shadow-xl relative overflow-hidden"
              >
                <motion.div
                  animate={rotateAnimation}
                  className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-full"
                />

                <motion.h3
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-2xl font-bold text-amber-900 dark:text-white mb-6 flex items-center gap-3"
                >
                  <FaQuestionCircle className="text-amber-500" />
                  Need Help?
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-lg text-amber-700 dark:text-purple-300 mb-8"
                >
                  Contact our support team for return assistance
                </motion.p>

                <div className="space-y-4">
                  {contactInfo.map((contact, index) => (
                    <motion.div
                      key={index}
                      initial={{ y: 20, opacity: 0, scale: 0.9 }}
                      whileInView={{ y: 0, opacity: 1, scale: 1 }}
                      transition={{ delay: contact.delay }}
                      viewport={{ once: true }}
                      whileHover={{
                        y: -3,
                        scale: 1.02,
                        transition: { type: "spring", stiffness: 400 },
                      }}
                      className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-cream-50 to-cream-100 dark:from-gray-800/50 dark:to-gray-900/50 hover:shadow-md transition-all duration-300 group"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: contact.delay + 0.1 }}
                        className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                      >
                        <div className="text-amber-600 dark:text-amber-400">
                          {contact.icon}
                        </div>
                      </motion.div>

                      <motion.span
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: contact.delay + 0.2 }}
                        className="text-lg font-medium text-amber-800 dark:text-purple-200"
                      >
                        {contact.text}
                      </motion.span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Refund Info */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-500/20 dark:border-amber-500/30 backdrop-blur-xl shadow-xl relative overflow-hidden"
              >
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-full blur-3xl" />

                <motion.h3
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-2xl font-bold text-amber-900 dark:text-white mb-6 flex items-center gap-3"
                >
                  <FaMoneyBillWave className="text-amber-500" />
                  Refund Information
                </motion.h3>

                <motion.ul
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-3"
                >
                  {refundPoints.map((point, index) => (
                    <motion.li
                      key={index}
                      variants={itemVariants}
                      custom={index}
                      className="flex items-start gap-3 text-amber-700 dark:text-purple-300"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        className="flex-shrink-0 w-2 h-2 rounded-full bg-amber-500 mt-2"
                      />
                      <span className="text-lg">{point}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </motion.div>
          </div>

          {/* FAQ Section */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20,
              delay: 0.7,
            }}
            viewport={{ once: true, margin: "-100px" }}
            className="mt-20"
          >
            <div className="p-8 rounded-3xl bg-gradient-to-br from-white/90 to-white/80 dark:from-gray-800/90 dark:to-gray-900/90 backdrop-blur-xl border border-amber-100 dark:border-purple-900/50 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />

              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-3xl lg:text-4xl font-bold text-amber-900 dark:text-white mb-10"
              >
                Frequently Asked Questions
              </motion.h2>

              <div className="grid md:grid-cols-2 gap-6">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ y: 30, opacity: 0, scale: 0.95 }}
                    whileInView={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ delay: faq.delay }}
                    viewport={{ once: true }}
                    whileHover={{
                      y: -5,
                      scale: 1.02,
                      transition: { type: "spring", stiffness: 300 },
                    }}
                    className="p-6 rounded-2xl bg-gradient-to-r from-cream-50 to-cream-100 dark:from-gray-800/50 dark:to-gray-900/50 hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
                  >
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />

                    <motion.h4
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: faq.delay + 0.1 }}
                      className="font-bold text-xl text-amber-800 dark:text-white mb-3 flex items-center gap-2"
                    >
                      <FaQuestionCircle className="text-amber-500 text-lg" />
                      {faq.q}
                    </motion.h4>
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: faq.delay + 0.2 }}
                      className="text-amber-700 dark:text-purple-300"
                    >
                      {faq.a}
                    </motion.p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Guarantee Banner */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20,
              delay: 0.9,
            }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <div className="p-8 rounded-3xl bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-500/10 dark:from-green-900/20 dark:via-emerald-900/20 dark:to-green-900/20 border border-green-500/20 dark:border-green-500/30 backdrop-blur-xl shadow-xl text-center relative overflow-hidden">
              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  background: [
                    "linear-gradient(45deg, rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.1), rgba(34, 197, 94, 0.1))",
                    "linear-gradient(45deg, rgba(16, 185, 129, 0.1), rgba(34, 197, 94, 0.1), rgba(16, 185, 129, 0.1))",
                  ],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              />

              <motion.div
                animate={floatingAnimation}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 mb-6"
              >
                <FaShieldAlt className="text-2xl text-white" />
              </motion.div>

              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-2xl lg:text-3xl font-bold text-amber-900 dark:text-white mb-4"
              >
                Satisfaction Guaranteed
              </motion.h3>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="text-lg text-amber-700 dark:text-purple-300 max-w-2xl mx-auto"
              >
                We stand behind every product we sell. If you're not completely
                satisfied, our hassle-free return policy ensures you can shop
                with confidence.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default ReturnPolicyPage;
