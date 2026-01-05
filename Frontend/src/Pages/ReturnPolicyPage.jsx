// // import React, { useState, useEffect, useRef } from "react";
// // import { motion, AnimatePresence, useInView } from "framer-motion";
// // import {
// //   FaUndo,
// //   FaCalendarAlt,
// //   FaBox,
// //   FaShippingFast,
// //   FaMoneyBillWave,
// //   FaCheckCircle,
// //   FaTimesCircle,
// //   FaChevronUp,
// //   FaQuestionCircle,
// //   FaPhone,
// //   FaEnvelope,
// //   FaClock,
// //   FaExchangeAlt,
// //   FaHeadset,
// //   FaShieldAlt,
// // } from "react-icons/fa";

// // const ReturnPolicyPage = () => {
// //   const [scrollProgress, setScrollProgress] = useState(0);
// //   const [isScrolling, setIsScrolling] = useState(false);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const containerRef = useRef(null);

// //   // Loading animation
// //   useEffect(() => {
// //     const timer = setTimeout(() => setIsLoading(false), 800);
// //     return () => clearTimeout(timer);
// //   }, []);

// //   // Enhanced scroll animation with momentum
// //   useEffect(() => {
// //     let lastScrollY = window.scrollY;
// //     let ticking = false;

// //     const handleScroll = () => {
// //       lastScrollY = window.scrollY;

// //       if (!ticking) {
// //         window.requestAnimationFrame(() => {
// //           const scrolled = lastScrollY;
// //           const maxScroll = document.body.scrollHeight - window.innerHeight;
// //           const progress = (scrolled / maxScroll) * 100;
// //           setScrollProgress(progress);
// //           setIsScrolling(scrolled > 100);
// //           ticking = false;
// //         });
// //         ticking = true;
// //       }
// //     };

// //     window.addEventListener("scroll", handleScroll, { passive: true });
// //     return () => window.removeEventListener("scroll", handleScroll);
// //   }, []);

// //   const policyPoints = [
// //     {
// //       title: "30-Day Return Window",
// //       description:
// //         "Return any item within 30 days of delivery for a full refund.",
// //       icon: <FaCalendarAlt />,
// //       color: "from-[#D7C097] to-[#EEEEEE]",
// //       delay: 0.1,
// //       rotation: 5,
// //     },
// //     {
// //       title: "Free Returns",
// //       description: "We provide prepaid return labels for all eligible items.",
// //       icon: <FaShippingFast />,
// //       color: "from-[#D8C9A7] to-[#EEEEEE]",
// //       delay: 0.2,
// //       rotation: -3,
// //     },
// //     {
// //       title: "Full Refund",
// //       description:
// //         "Receive your refund within 3-5 business days after we receive your return.",
// //       icon: <FaMoneyBillWave />,
// //       color: "from-[#D7C097]/90 to-[#EEEEEE]/90",
// //       delay: 0.3,
// //       rotation: 2,
// //     },
// //     {
// //       title: "Easy Process",
// //       description: "Initiate returns directly from your account dashboard.",
// //       icon: <FaUndo />,
// //       color: "from-[#EEEEEE] to-[#D8C9A7]",
// //       delay: 0.4,
// //       rotation: -5,
// //     },
// //   ];

// //   const conditions = [
// //     {
// //       text: "Item must be unused and in original condition",
// //       valid: true,
// //       delay: 0.1,
// //     },
// //     {
// //       text: "All original tags and packaging must be included",
// //       valid: true,
// //       delay: 0.2,
// //     },
// //     {
// //       text: "Return must be initiated within 30 days of delivery",
// //       valid: true,
// //       delay: 0.3,
// //     },
// //     {
// //       text: "Final sale items marked 'Non-Returnable'",
// //       valid: false,
// //       delay: 0.4,
// //     },
// //     { text: "Items without original packaging", valid: false, delay: 0.5 },
// //     { text: "Personalized or customized products", valid: false, delay: 0.6 },
// //   ];

// //   const processSteps = [
// //     {
// //       text: "Login to your account and go to 'My Orders then delivered orders'",
// //       delay: 0.1,
// //     },
// //     { text: "Select the item you want to return", delay: 0.2 },
// //     { text: "Choose return reason and add proof images", delay: 0.3 },
// //     { text: "Pack item securely with all accessories", delay: 0.4 },
// //     { text: "Drop off at any carrier location", delay: 0.5 },
// //     { text: "Track return status in your account", delay: 0.6 },
// //   ];

// //   const timelineSteps = [
// //     {
// //       day: "Day 1",
// //       action: "Initiate return online",
// //       icon: <FaUndo />,
// //       color: "from-[#D7C097] to-[#EEEEEE]",
// //       delay: 0.1,
// //     },
// //     {
// //       day: "Day 2-3",
// //       action: "Ship item back to us",
// //       icon: <FaShippingFast />,
// //       color: "from-[#D8C9A7] to-[#EEEEEE]",
// //       delay: 0.2,
// //     },
// //     {
// //       day: "Day 4-5",
// //       action: "We receive and inspect",
// //       icon: <FaCheckCircle />,
// //       color: "from-[#D7C097]/90 to-[#EEEEEE]/90",
// //       delay: 0.3,
// //     },
// //     {
// //       day: "Day 6-7",
// //       action: "Refund processed",
// //       icon: <FaMoneyBillWave />,
// //       color: "from-[#EEEEEE] to-[#D8C9A7]",
// //       delay: 0.4,
// //     },
// //   ];

// //   const contactInfo = [
// //     { icon: <FaEnvelope />, text: "support@adescart.com", delay: 0.1 },
// //     { icon: <FaPhone />, text: "1-800-RETURNS", delay: 0.2 },
// //     { icon: <FaHeadset />, text: "24/7 Live Chat Support", delay: 0.3 },
// //     { icon: <FaClock />, text: "Mon-Fri: 9AM-9PM EST", delay: 0.4 },
// //   ];

// //   const faqs = [
// //     {
// //       q: "How do I track my return?",
// //       a: "You can track your return in your account dashboard under 'My Orders in the delivered sections'.",
// //       delay: 0.1,
// //     },
// //     {
// //       q: "What if my item arrives damaged?",
// //       a: "Contact us within 48 hours of delivery with photos for immediate assistance.",
// //       delay: 0.2,
// //     },

// //     {
// //       q: "How long does inspection take?",
// //       a: "Quality inspection typically takes 1-2 business days after we receive your return.",
// //       delay: 0.4,
// //     },
// //     {
// //       q: "Are return shipping fees covered?",
// //       a: "Yes, we provide free return shipping for all eligible returns.",
// //       delay: 0.5,
// //     },
// //     {
// //       q: "Can I return sale items?",
// //       a: "Yes, sale items are eligible for return within the standard 30-day window.",
// //       delay: 0.6,
// //     },
// //   ];

// //   const refundPoints = [
// //     "Refunds processed within 3-5 business days",
// //     "Original payment method will be credited",
// //     "Shipping costs are non-refundable unless error is on our part",
// //     "Sale items eligible for return or exchange",
// //     "Digital products have a 14-day return window",
// //     "Refunds to international cards may take 7-10 days",
// //   ];

// //   // Animation variants
// //   const containerVariants = {
// //     hidden: { opacity: 0 },
// //     visible: {
// //       opacity: 1,
// //       transition: {
// //         staggerChildren: 0.1,
// //         delayChildren: 0.2,
// //       },
// //     },
// //   };

// //   const itemVariants = {
// //     hidden: { y: 30, opacity: 0, scale: 0.95 },
// //     visible: {
// //       y: 0,
// //       opacity: 1,
// //       scale: 1,
// //       transition: {
// //         type: "spring",
// //         stiffness: 100,
// //         damping: 15,
// //       },
// //     },
// //   };

// //   const cardVariants = {
// //     hidden: { y: 50, opacity: 0, rotateX: 10 },
// //     visible: {
// //       y: 0,
// //       opacity: 1,
// //       rotateX: 0,
// //       transition: {
// //         type: "spring",
// //         bounce: 0.4,
// //         duration: 0.8,
// //       },
// //     },
// //   };

// //   const floatingAnimation = {
// //     y: [0, -8, 0],
// //     transition: {
// //       duration: 3,
// //       repeat: Infinity,
// //       ease: "easeInOut",
// //     },
// //   };

// //   const pulseAnimation = {
// //     scale: [1, 1.05, 1],
// //     transition: {
// //       duration: 2,
// //       repeat: Infinity,
// //       ease: "easeInOut",
// //     },
// //   };

// //   const rotateAnimation = {
// //     rotate: [0, 360],
// //     transition: {
// //       duration: 20,
// //       repeat: Infinity,
// //       ease: "linear",
// //     },
// //   };

// //   return (
// //     <>
// //       {/* Loading Animation */}
// //       <AnimatePresence>
// //         {isLoading && (
// //           <motion.div
// //             initial={{ opacity: 1 }}
// //             exit={{ opacity: 0 }}
// //             transition={{ duration: 0.5 }}
// //             className="fixed inset-0 z-50 flex items-center justify-center dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-950 bg-gradient-to-br from-[#EEEEEE] to-[#D8C9A7]"
// //           >
// //             <div className="relative">
// //               <motion.div
// //                 animate={pulseAnimation}
// //                 className="w-24 h-24 rounded-full bg-gradient-to-r from-[#D7C097] to-[#EEEEEE]"
// //               />
// //               <motion.div
// //                 animate={floatingAnimation}
// //                 className="absolute inset-0 flex items-center justify-center"
// //               >
// //                 <FaUndo className="text-4xl text-white" />
// //               </motion.div>
// //             </div>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>

// //       <motion.div
// //         ref={containerRef}
// //         initial={{ opacity: 0 }}
// //         animate={{ opacity: 1 }}
// //         transition={{ duration: 0.6 }}
// //         className="min-h-screen dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 bg-gradient-to-br from-[#EEEEEE] via-[#D8C9A7] to-[#EEEEEE] pt-24 pb-12 overflow-hidden relative max-sm:py-32"
// //       >
// //         {/* Animated Background Elements */}
// //         <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
// //           {[...Array(15)].map((_, i) => (
// //             <motion.div
// //               key={i}
// //               className="absolute rounded-full bg-gradient-to-r from-[#D7C097]/5 to-[#EEEEEE]/5 dark:from-[#D7C097]/5 dark:to-[#D8C9A7]/5"
// //               initial={{
// //                 x: Math.random() * 100 + "%",
// //                 y: Math.random() * 100 + "%",
// //                 scale: Math.random() * 0.3 + 0.3,
// //                 opacity: Math.random() * 0.2 + 0.1,
// //               }}
// //               animate={{
// //                 y: [
// //                   null,
// //                   `calc(${Math.random() * 100}% + ${Math.random() * 50 - 25}px)`,
// //                 ],
// //                 x: [
// //                   null,
// //                   `calc(${Math.random() * 100}% + ${Math.random() * 50 - 25}px)`,
// //                 ],
// //               }}
// //               transition={{
// //                 duration: Math.random() * 15 + 10,
// //                 repeat: Infinity,
// //                 ease: "linear",
// //               }}
// //               style={{
// //                 width: Math.random() * 100 + 50,
// //                 height: Math.random() * 100 + 50,
// //               }}
// //             />
// //           ))}
// //         </div>

// //         {/* Enhanced Scroll Progress Bar */}
// //         <motion.div
// //           className="fixed top-0 left-0 h-1.5 z-40"
// //           style={{ width: `${scrollProgress}%` }}
// //           animate={{
// //             background: [
// //               "linear-gradient(90deg, #D7C097, #EEEEEE, #D7C097)",
// //               "linear-gradient(90deg, #EEEEEE, #D7C097, #EEEEEE)",
// //               "linear-gradient(90deg, #D7C097, #EEEEEE, #D7C097)",
// //             ],
// //             backgroundSize: "200% 100%",
// //             boxShadow: "0 0 20px rgba(215, 192, 151, 0.5)",
// //           }}
// //           transition={{
// //             duration: 2,
// //             repeat: Infinity,
// //             ease: "linear",
// //           }}
// //         />

// //         {/* Back to Top Button */}
// //         <AnimatePresence>
// //           {isScrolling && (
// //             <motion.button
// //               initial={{ opacity: 0, scale: 0, rotate: -180 }}
// //               animate={{
// //                 opacity: 1,
// //                 scale: 1,
// //                 rotate: 0,
// //                 transition: {
// //                   type: "spring",
// //                   stiffness: 200,
// //                   damping: 15,
// //                 },
// //               }}
// //               exit={{ opacity: 0, scale: 0, rotate: 180 }}
// //               whileHover={{
// //                 scale: 1.1,
// //                 rotate: 360,
// //                 boxShadow: "0 0 30px rgba(215, 192, 151, 0.5)",
// //               }}
// //               whileTap={{ scale: 0.9 }}
// //               onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
// //               className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-[#D7C097] to-[#EEEEEE] dark:from-[#D7C097] dark:to-gray-900 text-white rounded-full shadow-2xl flex items-center justify-center z-40 hover:shadow-3xl transition-all duration-300 group"
// //             >
// //               <motion.div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#D7C097]/80 to-[#EEEEEE]/80 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
// //               <FaChevronUp className="w-6 h-6 relative" />
// //             </motion.button>
// //           )}
// //         </AnimatePresence>

// //         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
// //           {/* Header */}
// //           <motion.div
// //             variants={containerVariants}
// //             initial="hidden"
// //             animate="visible"
// //             className="text-center mb-16 relative"
// //           >
// //             <div className="relative inline-block">
// //               <motion.div
// //                 initial={{ scale: 0, rotate: -180 }}
// //                 animate={{
// //                   scale: 1,
// //                   rotate: 0,
// //                   transition: {
// //                     type: "spring",
// //                     stiffness: 200,
// //                     damping: 15,
// //                   },
// //                 }}
// //                 whileHover={{ scale: 1.1, rotate: 360 }}
// //                 className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-[#D7C097] to-[#EEEEEE] mb-6 shadow-2xl group relative"
// //               >
// //                 <motion.div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#D7C097]/80 to-[#EEEEEE]/80 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
// //                 <motion.div animate={floatingAnimation}>
// //                   <FaUndo className="text-4xl text-white relative" />
// //                 </motion.div>
// //               </motion.div>

// //               {/* Orbiting circles */}
// //               {[0, 120, 240].map((rotation, i) => (
// //                 <motion.div
// //                   key={i}
// //                   className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-[#D8C9A7] to-[#EEEEEE]"
// //                   animate={{
// //                     rotate: rotation,
// //                     x: [0, 60 * Math.cos((rotation * Math.PI) / 180), 0],
// //                     y: [0, 60 * Math.sin((rotation * Math.PI) / 180), 0],
// //                   }}
// //                   transition={{
// //                     duration: 4,
// //                     repeat: Infinity,
// //                     ease: "easeInOut",
// //                     delay: i * 0.3,
// //                   }}
// //                   style={{
// //                     top: "50%",
// //                     left: "50%",
// //                     marginLeft: -8,
// //                     marginTop: -8,
// //                   }}
// //                 />
// //               ))}
// //             </div>

// //             <motion.h1
// //               variants={itemVariants}
// //               className="text-4xl lg:text-6xl font-bold mb-6 relative"
// //             >
// //               <span className="bg-gradient-to-r from-gray-900 via-[#D7C097] to-gray-900 dark:from-white dark:via-[#D8C9A7] dark:to-white bg-clip-text text-transparent">
// //                 Return & Refund Policy
// //               </span>
// //               <motion.span
// //                 className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-[#D7C097] to-[#EEEEEE] rounded-full"
// //                 initial={{ scaleX: 0 }}
// //                 animate={{ scaleX: 1 }}
// //                 transition={{ delay: 0.8, duration: 0.8 }}
// //               />
// //             </motion.h1>

// //             <motion.p
// //               variants={itemVariants}
// //               className="text-xl lg:text-2xl text-gray-900/80 dark:text-[#D8C9A7] max-w-3xl mx-auto mb-6"
// //             >
// //               Simple, hassle-free returns. Your satisfaction is guaranteed.
// //             </motion.p>

// //             <motion.p
// //               variants={itemVariants}
// //               className="text-lg text-gray-900/70 dark:text-[#D8C9A7]/70 max-w-2xl mx-auto"
// //             >
// //               We believe in making returns as easy as shopping. That's why we've
// //               created a transparent, customer-friendly return policy that puts
// //               you first.
// //             </motion.p>
// //           </motion.div>

// //           {/* Policy Highlights with enhanced animations */}
// //           <motion.div
// //             variants={containerVariants}
// //             initial="hidden"
// //             whileInView="visible"
// //             viewport={{ once: true, margin: "-100px" }}
// //             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
// //           >
// //             {policyPoints.map((point, index) => (
// //               <motion.div
// //                 key={index}
// //                 custom={index}
// //                 variants={{
// //                   hidden: {
// //                     y: 50,
// //                     opacity: 0,
// //                     scale: 0.8,
// //                     rotate: point.rotation,
// //                   },
// //                   visible: {
// //                     y: 0,
// //                     opacity: 1,
// //                     scale: 1,
// //                     rotate: 0,
// //                     transition: {
// //                       type: "spring",
// //                       stiffness: 100,
// //                       damping: 12,
// //                       delay: point.delay,
// //                     },
// //                   },
// //                 }}
// //                 whileHover={{
// //                   y: -10,
// //                   scale: 1.05,
// //                   rotate: point.rotation,
// //                   transition: { type: "spring", stiffness: 400, damping: 25 },
// //                 }}
// //                 whileTap={{ scale: 0.95 }}
// //                 className="p-8 rounded-3xl dark:bg-gradient-to-br dark:from-gray-800/90 dark:to-[#D7C097]/90 dark:border-[#D7C097]/50 bg-gradient-to-br from-white/90 to-[#EEEEEE]/80 backdrop-blur-xl border border-[#EEEEEE] dark:border-[#D7C097]/50 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
// //               >
// //                 {/* Shimmer effect */}
// //                 <motion.div
// //                   className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
// //                   initial={{ x: "-100%" }}
// //                   whileHover={{ x: "100%" }}
// //                   transition={{ duration: 0.6 }}
// //                 />

// //                 <motion.div
// //                   initial={{ scale: 0, rotate: -180 }}
// //                   whileInView={{ scale: 1, rotate: 0 }}
// //                   transition={{ delay: point.delay + 0.2, type: "spring" }}
// //                   className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${point.color} mb-6 relative group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}
// //                 >
// //                   <motion.div
// //                     animate={floatingAnimation}
// //                     className="text-2xl text-white"
// //                   >
// //                     {point.icon}
// //                   </motion.div>
// //                   <div className="absolute inset-0 rounded-full bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
// //                 </motion.div>

// //                 <motion.h3
// //                   initial={{ opacity: 0, y: 10 }}
// //                   whileInView={{ opacity: 1, y: 0 }}
// //                   transition={{ delay: point.delay + 0.3 }}
// //                   className="text-xl font-bold dark:text-white text-gray-900 mb-3"
// //                 >
// //                   {point.title}
// //                 </motion.h3>

// //                 <motion.p
// //                   initial={{ opacity: 0 }}
// //                   whileInView={{ opacity: 1 }}
// //                   transition={{ delay: point.delay + 0.4 }}
// //                   className="dark:text-[#D8C9A7] text-gray-900"
// //                 >
// //                   {point.description}
// //                 </motion.p>
// //               </motion.div>
// //             ))}
// //           </motion.div>

// //           <div className="grid lg:grid-cols-2 gap-12">
// //             {/* Left Column */}
// //             <motion.div
// //               initial={{ x: -50, opacity: 0 }}
// //               whileInView={{ x: 0, opacity: 1 }}
// //               transition={{
// //                 type: "spring",
// //                 stiffness: 50,
// //                 damping: 20,
// //                 delay: 0.2,
// //               }}
// //               viewport={{ once: true, margin: "-100px" }}
// //               className="space-y-8"
// //             >
// //               {/* Eligibility Conditions */}
// //               <motion.div
// //                 initial={{ y: 30, opacity: 0 }}
// //                 whileInView={{ y: 0, opacity: 1 }}
// //                 transition={{ delay: 0.3 }}
// //                 viewport={{ once: true }}
// //                 className="p-8 rounded-3xl dark:bg-gradient-to-br dark:from-gray-800/90 dark:to-[#D7C097]/90 dark:border-[#D7C097]/50 bg-gradient-to-br from-white/90 to-[#EEEEEE]/80 backdrop-blur-xl border border-[#EEEEEE] dark:border-[#D7C097]/50 shadow-xl relative overflow-hidden"
// //               >
// //                 <div className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-r from-[#D7C097]/10 to-[#EEEEEE]/10 rounded-full blur-2xl" />

// //                 <motion.h2
// //                   initial={{ opacity: 0, x: -20 }}
// //                   whileInView={{ opacity: 1, x: 0 }}
// //                   transition={{ delay: 0.4 }}
// //                   className="text-2xl font-bold dark:text-white text-gray-900 mb-8 flex items-center gap-3"
// //                 >
// //                   <FaCheckCircle className="text-[#D7C097]" />
// //                   Return Eligibility
// //                 </motion.h2>

// //                 <div className="space-y-4">
// //                   {conditions.map((condition, index) => (
// //                     <motion.div
// //                       key={index}
// //                       initial={{ x: -30, opacity: 0 }}
// //                       whileInView={{ x: 0, opacity: 1 }}
// //                       transition={{ delay: condition.delay }}
// //                       viewport={{ once: true }}
// //                       whileHover={{ x: 5 }}
// //                       className="flex items-start gap-4 p-4 rounded-xl dark:bg-gradient-to-r dark:from-gray-800/50 dark:to-[#D7C097]/50 bg-gradient-to-r from-[#EEEEEE] to-[#D8C9A7]/50 hover:shadow-md transition-all duration-300"
// //                     >
// //                       <motion.div
// //                         initial={{ scale: 0 }}
// //                         whileInView={{ scale: 1 }}
// //                         transition={{ delay: condition.delay + 0.1 }}
// //                         className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${condition.valid ? "bg-[#D7C097]/20" : "bg-rose-500/20"}`}
// //                       >
// //                         <div
// //                           className={
// //                             condition.valid ? "text-[#D7C097]" : "text-rose-500"
// //                           }
// //                         >
// //                           {condition.valid ? (
// //                             <FaCheckCircle />
// //                           ) : (
// //                             <FaTimesCircle />
// //                           )}
// //                         </div>
// //                       </motion.div>

// //                       <span
// //                         className={`text-lg ${condition.valid ? "dark:text-[#D8C9A7] text-gray-900" : "dark:text-[#D8C9A7]/70 text-gray-900/70"}`}
// //                       >
// //                         {condition.text}
// //                       </span>
// //                     </motion.div>
// //                   ))}
// //                 </div>
// //               </motion.div>

// //               {/* Timeline */}
// //               <motion.div
// //                 initial={{ y: 30, opacity: 0 }}
// //                 whileInView={{ y: 0, opacity: 1 }}
// //                 transition={{ delay: 0.4 }}
// //                 viewport={{ once: true }}
// //                 className="p-8 rounded-3xl bg-gradient-to-br from-[#D7C097]/10 to-[#EEEEEE]/10 dark:from-[#D7C097]/20 dark:to-[#D8C9A7]/20 border border-[#D7C097]/20 dark:border-[#D7C097]/30 backdrop-blur-xl shadow-xl relative overflow-hidden"
// //               >
// //                 <div className="absolute -top-4 -left-4 w-32 h-32 bg-gradient-to-r from-[#D7C097]/10 to-[#EEEEEE]/10 rounded-full blur-3xl" />

// //                 <motion.h3
// //                   initial={{ opacity: 0 }}
// //                   whileInView={{ opacity: 1 }}
// //                   transition={{ delay: 0.5 }}
// //                   className="text-2xl font-bold dark:text-white text-gray-900 mb-8"
// //                 >
// //                   Refund Timeline
// //                 </motion.h3>

// //                 <div className="space-y-6 relative">
// //                   {/* Timeline line */}
// //                   <motion.div
// //                     className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#D7C097] to-[#EEEEEE]"
// //                     initial={{ scaleY: 0 }}
// //                     whileInView={{ scaleY: 1 }}
// //                     transition={{ duration: 1, delay: 0.6 }}
// //                   />

// //                   {timelineSteps.map((step, index) => (
// //                     <motion.div
// //                       key={index}
// //                       initial={{ x: -20, opacity: 0 }}
// //                       whileInView={{ x: 0, opacity: 1 }}
// //                       transition={{ delay: step.delay }}
// //                       viewport={{ once: true }}
// //                       className="flex items-center gap-6 relative"
// //                     >
// //                       {/* Timeline dot */}
// //                       <motion.div
// //                         initial={{ scale: 0 }}
// //                         whileInView={{ scale: 1 }}
// //                         transition={{ delay: step.delay + 0.1, type: "spring" }}
// //                         className="relative z-10"
// //                       >
// //                         <div
// //                           className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center shadow-lg`}
// //                         >
// //                           <motion.div
// //                             animate={floatingAnimation}
// //                             className="text-xl text-white"
// //                           >
// //                             {step.icon}
// //                           </motion.div>
// //                         </div>
// //                       </motion.div>

// //                       <div className="flex-1">
// //                         <motion.div
// //                           initial={{ opacity: 0 }}
// //                           whileInView={{ opacity: 1 }}
// //                           transition={{ delay: step.delay + 0.2 }}
// //                           className="text-sm font-bold dark:text-[#D8C9A7] text-gray-900/80 mb-1"
// //                         >
// //                           {step.day}
// //                         </motion.div>
// //                         <motion.div
// //                           initial={{ opacity: 0 }}
// //                           whileInView={{ opacity: 1 }}
// //                           transition={{ delay: step.delay + 0.3 }}
// //                           className="text-lg font-medium dark:text-[#D8C9A7] text-gray-900"
// //                         >
// //                           {step.action}
// //                         </motion.div>
// //                       </div>
// //                     </motion.div>
// //                   ))}
// //                 </div>
// //               </motion.div>
// //             </motion.div>

// //             {/* Right Column */}
// //             <motion.div
// //               initial={{ x: 50, opacity: 0 }}
// //               whileInView={{ x: 0, opacity: 1 }}
// //               transition={{
// //                 type: "spring",
// //                 stiffness: 50,
// //                 damping: 20,
// //                 delay: 0.3,
// //               }}
// //               viewport={{ once: true, margin: "-100px" }}
// //               className="space-y-8"
// //             >
// //               {/* Return Process */}
// //               <motion.div
// //                 initial={{ y: 30, opacity: 0 }}
// //                 whileInView={{ y: 0, opacity: 1 }}
// //                 transition={{ delay: 0.4 }}
// //                 viewport={{ once: true }}
// //                 className="p-8 rounded-3xl dark:bg-gradient-to-br dark:from-gray-800/90 dark:to-[#D7C097]/90 dark:border-[#D7C097]/50 bg-gradient-to-br from-white/90 to-[#EEEEEE]/80 backdrop-blur-xl border border-[#EEEEEE] dark:border-[#D7C097]/50 shadow-xl relative overflow-hidden"
// //               >
// //                 <div className="absolute top-4 left-4 w-24 h-24 bg-gradient-to-r from-[#D7C097]/10 to-[#EEEEEE]/10 rounded-full blur-2xl" />

// //                 <motion.h2
// //                   initial={{ opacity: 0, x: 20 }}
// //                   whileInView={{ opacity: 1, x: 0 }}
// //                   transition={{ delay: 0.5 }}
// //                   className="text-2xl font-bold dark:text-white text-gray-900 mb-8 flex items-center gap-3"
// //                 >
// //                   <FaUndo className="text-[#D7C097]" />
// //                   How to Return
// //                 </motion.h2>

// //                 <div className="space-y-4">
// //                   {processSteps.map((step, index) => (
// //                     <motion.div
// //                       key={index}
// //                       initial={{ x: 30, opacity: 0, scale: 0.9 }}
// //                       whileInView={{ x: 0, opacity: 1, scale: 1 }}
// //                       transition={{ delay: step.delay }}
// //                       viewport={{ once: true }}
// //                       whileHover={{ x: 5, scale: 1.02 }}
// //                       className="flex items-start gap-4 p-5 rounded-xl dark:bg-gradient-to-r dark:from-gray-800/50 dark:to-[#D7C097]/50 bg-gradient-to-r from-[#EEEEEE] to-[#D8C9A7]/50 hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
// //                     >
// //                       {/* Step number background */}
// //                       <motion.div
// //                         initial={{ scale: 0 }}
// //                         whileInView={{ scale: 1 }}
// //                         transition={{ delay: step.delay + 0.1 }}
// //                         className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-[#D7C097] to-[#EEEEEE] flex items-center justify-center text-white font-bold relative group-hover:scale-110 transition-transform duration-300"
// //                       >
// //                         <span className="relative z-10">{index + 1}</span>
// //                         <div className="absolute inset-0 rounded-full bg-white/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
// //                       </motion.div>

// //                       <motion.span
// //                         initial={{ opacity: 0 }}
// //                         whileInView={{ opacity: 1 }}
// //                         transition={{ delay: step.delay + 0.2 }}
// //                         className="text-lg dark:text-[#D8C9A7] text-gray-900 pt-1"
// //                       >
// //                         {step.text}
// //                       </motion.span>
// //                     </motion.div>
// //                   ))}
// //                 </div>
// //               </motion.div>

// //               {/* Contact Support */}
// //               <motion.div
// //                 initial={{ y: 30, opacity: 0 }}
// //                 whileInView={{ y: 0, opacity: 1 }}
// //                 transition={{ delay: 0.5 }}
// //                 viewport={{ once: true }}
// //                 className="p-8 rounded-3xl bg-gradient-to-br from-[#D8C9A7]/10 to-[#EEEEEE]/10 dark:from-[#D8C9A7]/20 dark:to-[#D7C097]/20 border border-[#D8C9A7]/20 dark:border-[#D8C9A7]/30 backdrop-blur-xl shadow-xl relative overflow-hidden"
// //               >
// //                 <motion.div
// //                   animate={rotateAnimation}
// //                   className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-r from-[#D8C9A7]/5 to-[#EEEEEE]/5 rounded-full"
// //                 />

// //                 <motion.h3
// //                   initial={{ opacity: 0 }}
// //                   whileInView={{ opacity: 1 }}
// //                   transition={{ delay: 0.6 }}
// //                   className="text-2xl font-bold dark:text-white text-gray-900 mb-6 flex items-center gap-3"
// //                 >
// //                   <FaQuestionCircle className="text-[#D7C097]" />
// //                   Need Help?
// //                 </motion.h3>

// //                 <motion.p
// //                   initial={{ opacity: 0 }}
// //                   whileInView={{ opacity: 1 }}
// //                   transition={{ delay: 0.7 }}
// //                   className="text-lg dark:text-[#D8C9A7] text-gray-900 mb-8"
// //                 >
// //                   Contact our support team for return assistance
// //                 </motion.p>

// //                 <div className="space-y-4">
// //                   {contactInfo.map((contact, index) => (
// //                     <motion.div
// //                       key={index}
// //                       initial={{ y: 20, opacity: 0, scale: 0.9 }}
// //                       whileInView={{ y: 0, opacity: 1, scale: 1 }}
// //                       transition={{ delay: contact.delay }}
// //                       viewport={{ once: true }}
// //                       whileHover={{
// //                         y: -3,
// //                         scale: 1.02,
// //                         transition: { type: "spring", stiffness: 400 },
// //                       }}
// //                       className="flex items-center gap-4 p-4 rounded-xl dark:bg-gradient-to-r dark:from-gray-800/50 dark:to-[#D7C097]/50 bg-gradient-to-r from-[#EEEEEE] to-[#D8C9A7]/50 hover:shadow-md transition-all duration-300 group"
// //                     >
// //                       <motion.div
// //                         initial={{ scale: 0 }}
// //                         whileInView={{ scale: 1 }}
// //                         transition={{ delay: contact.delay + 0.1 }}
// //                         className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-[#D7C097]/20 to-[#EEEEEE]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
// //                       >
// //                         <div className="text-[#D7C097] dark:text-[#D7C097]">
// //                           {contact.icon}
// //                         </div>
// //                       </motion.div>

// //                       <motion.span
// //                         initial={{ opacity: 0 }}
// //                         whileInView={{ opacity: 1 }}
// //                         transition={{ delay: contact.delay + 0.2 }}
// //                         className="text-lg font-medium dark:text-[#D8C9A7] text-gray-900"
// //                       >
// //                         {contact.text}
// //                       </motion.span>
// //                     </motion.div>
// //                   ))}
// //                 </div>
// //               </motion.div>

// //               {/* Refund Info */}
// //               <motion.div
// //                 initial={{ y: 30, opacity: 0 }}
// //                 whileInView={{ y: 0, opacity: 1 }}
// //                 transition={{ delay: 0.6 }}
// //                 viewport={{ once: true }}
// //                 className="p-8 rounded-3xl bg-gradient-to-br from-[#D7C097]/10 to-[#EEEEEE]/10 dark:from-[#D7C097]/20 dark:to-[#D8C9A7]/20 border border-[#D7C097]/20 dark:border-[#D7C097]/30 backdrop-blur-xl shadow-xl relative overflow-hidden"
// //               >
// //                 <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-r from-[#D7C097]/10 to-[#EEEEEE]/10 rounded-full blur-3xl" />

// //                 <motion.h3
// //                   initial={{ opacity: 0 }}
// //                   whileInView={{ opacity: 1 }}
// //                   transition={{ delay: 0.7 }}
// //                   className="text-2xl font-bold dark:text-white text-gray-900 mb-6 flex items-center gap-3"
// //                 >
// //                   <FaMoneyBillWave className="text-[#D7C097]" />
// //                   Refund Information
// //                 </motion.h3>

// //                 <motion.ul
// //                   variants={containerVariants}
// //                   initial="hidden"
// //                   whileInView="visible"
// //                   viewport={{ once: true }}
// //                   className="space-y-3"
// //                 >
// //                   {refundPoints.map((point, index) => (
// //                     <motion.li
// //                       key={index}
// //                       variants={itemVariants}
// //                       custom={index}
// //                       className="flex items-start gap-3 dark:text-[#D8C9A7] text-gray-900"
// //                     >
// //                       <motion.div
// //                         initial={{ scale: 0 }}
// //                         whileInView={{ scale: 1 }}
// //                         transition={{ delay: 0.8 + index * 0.1 }}
// //                         className="flex-shrink-0 w-2 h-2 rounded-full bg-[#D7C097] mt-2"
// //                       />
// //                       <span className="text-lg">{point}</span>
// //                     </motion.li>
// //                   ))}
// //                 </motion.ul>
// //               </motion.div>
// //             </motion.div>
// //           </div>

// //           {/* FAQ Section */}
// //           <motion.div
// //             initial={{ y: 50, opacity: 0 }}
// //             whileInView={{ y: 0, opacity: 1 }}
// //             transition={{
// //               type: "spring",
// //               stiffness: 50,
// //               damping: 20,
// //               delay: 0.7,
// //             }}
// //             viewport={{ once: true, margin: "-100px" }}
// //             className="mt-20"
// //           >
// //             <div className="p-8 rounded-3xl dark:bg-gradient-to-br dark:from-gray-800/90 dark:to-[#D7C097]/90 dark:border-[#D7C097]/50 bg-gradient-to-br from-white/90 to-[#EEEEEE]/80 backdrop-blur-xl border border-[#EEEEEE] dark:border-[#D7C097]/50 shadow-xl relative overflow-hidden">
// //               <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#D7C097]/10 to-[#EEEEEE]/10 rounded-full blur-3xl" />

// //               <motion.h2
// //                 initial={{ opacity: 0, y: -20 }}
// //                 whileInView={{ opacity: 1, y: 0 }}
// //                 transition={{ delay: 0.8 }}
// //                 className="text-3xl lg:text-4xl font-bold dark:text-white text-gray-900 mb-10"
// //               >
// //                 Frequently Asked Questions
// //               </motion.h2>

// //               <div className="grid md:grid-cols-2 gap-6">
// //                 {faqs.map((faq, index) => (
// //                   <motion.div
// //                     key={index}
// //                     initial={{ y: 30, opacity: 0, scale: 0.95 }}
// //                     whileInView={{ y: 0, opacity: 1, scale: 1 }}
// //                     transition={{ delay: faq.delay }}
// //                     viewport={{ once: true }}
// //                     whileHover={{
// //                       y: -5,
// //                       scale: 1.02,
// //                       transition: { type: "spring", stiffness: 300 },
// //                     }}
// //                     className="p-6 rounded-2xl dark:bg-gradient-to-r dark:from-gray-800/50 dark:to-[#D7C097]/50 bg-gradient-to-r from-[#EEEEEE] to-[#D8C9A7]/50 hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
// //                   >
// //                     {/* Shimmer effect */}
// //                     <motion.div
// //                       className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
// //                       initial={{ x: "-100%" }}
// //                       whileHover={{ x: "100%" }}
// //                       transition={{ duration: 0.6 }}
// //                     />

// //                     <motion.h4
// //                       initial={{ opacity: 0 }}
// //                       whileInView={{ opacity: 1 }}
// //                       transition={{ delay: faq.delay + 0.1 }}
// //                       className="font-bold text-xl dark:text-white text-gray-900 mb-3 flex items-center gap-2"
// //                     >
// //                       <FaQuestionCircle className="text-[#D7C097] text-lg" />
// //                       {faq.q}
// //                     </motion.h4>
// //                     <motion.p
// //                       initial={{ opacity: 0 }}
// //                       whileInView={{ opacity: 1 }}
// //                       transition={{ delay: faq.delay + 0.2 }}
// //                       className="dark:text-[#D8C9A7] text-gray-900"
// //                     >
// //                       {faq.a}
// //                     </motion.p>
// //                   </motion.div>
// //                 ))}
// //               </div>
// //             </div>
// //           </motion.div>

// //           {/* Guarantee Banner */}
// //           <motion.div
// //             initial={{ y: 50, opacity: 0 }}
// //             whileInView={{ y: 0, opacity: 1 }}
// //             transition={{
// //               type: "spring",
// //               stiffness: 50,
// //               damping: 20,
// //               delay: 0.9,
// //             }}
// //             viewport={{ once: true }}
// //             className="mt-16"
// //           >
// //             <div className="p-8 rounded-3xl bg-gradient-to-r from-[#D8C9A7]/10 via-[#EEEEEE]/10 to-[#D8C9A7]/10 dark:from-[#D8C9A7]/20 dark:via-[#D7C097]/20 dark:to-[#D8C9A7]/20 border border-[#D8C9A7]/20 dark:border-[#D8C9A7]/30 backdrop-blur-xl shadow-xl text-center relative overflow-hidden">
// //               {/* Animated gradient background */}
// //               <motion.div
// //                 className="absolute inset-0"
// //                 animate={{
// //                   background: [
// //                     "linear-gradient(45deg, rgba(216, 201, 167, 0.1), rgba(238, 238, 238, 0.1), rgba(216, 201, 167, 0.1))",
// //                     "linear-gradient(45deg, rgba(238, 238, 238, 0.1), rgba(216, 201, 167, 0.1), rgba(238, 238, 238, 0.1))",
// //                   ],
// //                 }}
// //                 transition={{ duration: 5, repeat: Infinity }}
// //               />

// //               <motion.div
// //                 animate={floatingAnimation}
// //                 className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-[#D7C097] to-[#EEEEEE] mb-6"
// //               >
// //                 <FaShieldAlt className="text-2xl text-white" />
// //               </motion.div>

// //               <motion.h3
// //                 initial={{ opacity: 0 }}
// //                 whileInView={{ opacity: 1 }}
// //                 transition={{ delay: 1 }}
// //                 className="text-2xl lg:text-3xl font-bold dark:text-white text-gray-900 mb-4"
// //               >
// //                 Satisfaction Guaranteed
// //               </motion.h3>

// //               <motion.p
// //                 initial={{ opacity: 0 }}
// //                 whileInView={{ opacity: 1 }}
// //                 transition={{ delay: 1.1 }}
// //                 className="text-lg dark:text-[#D8C9A7] text-gray-900 max-w-2xl mx-auto"
// //               >
// //                 We stand behind every product we sell. If you're not completely
// //                 satisfied, our hassle-free return policy ensures you can shop
// //                 with confidence.
// //               </motion.p>
// //             </div>
// //           </motion.div>
// //         </div>
// //       </motion.div>
// //     </>
// //   );
// // };

// // export default ReturnPolicyPage;
// import React, { useState, useEffect } from "react";
// import {
//   FaUndo,
//   FaCalendarAlt,
//   FaBox,
//   FaShippingFast,
//   FaMoneyBillWave,
//   FaCheckCircle,
//   FaTimesCircle,
//   FaQuestionCircle,
//   FaPhone,
//   FaEnvelope,
//   FaClock,
//   FaExchangeAlt,
//   FaHeadset,
//   FaShieldAlt,
// } from "react-icons/fa";

// const ReturnPolicyPage = () => {
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => setIsLoading(false), 800);
//     return () => clearTimeout(timer);
//   }, []);

//   const policyPoints = [
//     {
//       title: "30-Day Return Window",
//       description:
//         "Return any item within 30 days of delivery for a full refund.",
//       icon: <FaCalendarAlt />,
//     },
//     {
//       title: "Free Returns",
//       description: "We provide prepaid return labels for all eligible items.",
//       icon: <FaShippingFast />,
//     },
//     {
//       title: "Full Refund",
//       description:
//         "Receive your refund within 3-5 business days after we receive your return.",
//       icon: <FaMoneyBillWave />,
//     },
//     {
//       title: "Easy Process",
//       description: "Initiate returns directly from your account dashboard.",
//       icon: <FaUndo />,
//     },
//   ];

//   const conditions = [
//     {
//       text: "Item must be unused and in original condition",
//       valid: true,
//     },
//     {
//       text: "All original tags and packaging must be included",
//       valid: true,
//     },
//     {
//       text: "Return must be initiated within 30 days of delivery",
//       valid: true,
//     },
//     {
//       text: "Final sale items marked 'Non-Returnable'",
//       valid: false,
//     },
//     { text: "Items without original packaging", valid: false },
//     { text: "Personalized or customized products", valid: false },
//   ];

//   const processSteps = [
//     {
//       text: "Login to your account and go to 'My Orders then delivered orders'",
//     },
//     { text: "Select the item you want to return" },
//     { text: "Choose return reason and add proof images" },
//     { text: "Pack item securely with all accessories" },
//     { text: "Drop off at any carrier location" },
//     { text: "Track return status in your account" },
//   ];

//   const timelineSteps = [
//     {
//       day: "Day 1",
//       action: "Initiate return online",
//       icon: <FaUndo />,
//     },
//     {
//       day: "Day 2-3",
//       action: "Ship item back to us",
//       icon: <FaShippingFast />,
//     },
//     {
//       day: "Day 4-5",
//       action: "We receive and inspect",
//       icon: <FaCheckCircle />,
//     },
//     {
//       day: "Day 6-7",
//       action: "Refund processed",
//       icon: <FaMoneyBillWave />,
//     },
//   ];

//   const contactInfo = [
//     { icon: <FaEnvelope />, text: "support@adescart.com" },
//     { icon: <FaPhone />, text: "1-800-RETURNS" },
//     { icon: <FaHeadset />, text: "24/7 Live Chat Support" },
//     { icon: <FaClock />, text: "Mon-Fri: 9AM-9PM EST" },
//   ];

//   const faqs = [
//     {
//       q: "How do I track my return?",
//       a: "You can track your return in your account dashboard under 'My Orders in the delivered sections'.",
//     },
//     {
//       q: "What if my item arrives damaged?",
//       a: "Contact us within 48 hours of delivery with photos for immediate assistance.",
//     },
//     {
//       q: "How long does inspection take?",
//       a: "Quality inspection typically takes 1-2 business days after we receive your return.",
//     },
//     {
//       q: "Are return shipping fees covered?",
//       a: "Yes, we provide free return shipping for all eligible returns.",
//     },
//     {
//       q: "Can I return sale items?",
//       a: "Yes, sale items are eligible for return within the standard 30-day window.",
//     },
//   ];

//   const refundPoints = [
//     "Refunds processed within 3-5 business days",
//     "Original payment method will be credited",
//     "Shipping costs are non-refundable unless error is on our part",
//     "Sale items eligible for return or exchange",
//     "Digital products have a 14-day return window",
//     "Refunds to international cards may take 7-10 days",
//   ];

//   return (
//     <>
//       {/* Loading Animation */}
//       {isLoading && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900">
//           <div className="text-center">
//             <div className="w-24 h-24 rounded-full border-4 border-transparent border-t-[#D7C097] border-r-[#A38C5C] animate-spin mb-4"></div>
//             <p className="dark:text-gray-300 text-gray-700 font-medium">
//               Loading Return Policy...
//             </p>
//           </div>
//         </div>
//       )}

//       <div className="min-h-screen bg-white dark:bg-gray-900 pt-24 pb-12">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Header */}
//           <div className="text-center mb-16">
//             <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#D7C097] mb-6">
//               <FaUndo className="text-4xl text-white" />
//             </div>

//             <h1 className="text-4xl lg:text-6xl font-bold mb-6">
//               <span className="text-gray-900 dark:text-gray-100">
//                 Return & Refund Policy
//               </span>
//             </h1>

//             <p className="text-xl lg:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-6">
//               Simple, hassle-free returns. Your satisfaction is guaranteed.
//             </p>

//             <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
//               We believe in making returns as easy as shopping. That's why we've
//               created a transparent, customer-friendly return policy that puts
//               you first.
//             </p>
//           </div>

//           {/* Policy Highlights */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
//             {policyPoints.map((point, index) => (
//               <div
//                 key={index}
//                 className="p-8 rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
//               >
//                 <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D7C097] mb-6">
//                   <div className="text-2xl text-white">{point.icon}</div>
//                 </div>

//                 <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-3">
//                   {point.title}
//                 </h3>

//                 <p className="dark:text-gray-300 text-gray-700">
//                   {point.description}
//                 </p>
//               </div>
//             ))}
//           </div>

//           <div className="grid lg:grid-cols-2 gap-12">
//             {/* Left Column */}
//             <div className="space-y-8">
//               {/* Eligibility Conditions */}
//               <div className="p-8 rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
//                 <h2 className="text-2xl font-bold dark:text-white text-gray-900 mb-8 flex items-center gap-3">
//                   <FaCheckCircle className="text-[#D7C097]" />
//                   Return Eligibility
//                 </h2>

//                 <div className="space-y-4">
//                   {conditions.map((condition, index) => (
//                     <div
//                       key={index}
//                       className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700"
//                     >
//                       <div
//                         className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${condition.valid ? "bg-[#D7C097]/20" : "bg-rose-500/20"}`}
//                       >
//                         <div
//                           className={
//                             condition.valid ? "text-[#D7C097]" : "text-rose-500"
//                           }
//                         >
//                           {condition.valid ? (
//                             <FaCheckCircle />
//                           ) : (
//                             <FaTimesCircle />
//                           )}
//                         </div>
//                       </div>

//                       <span
//                         className={`text-lg ${condition.valid ? "dark:text-gray-300 text-gray-700" : "dark:text-gray-400 text-gray-500"}`}
//                       >
//                         {condition.text}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Timeline */}
//               <div className="p-8 rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
//                 <h3 className="text-2xl font-bold dark:text-white text-gray-900 mb-8">
//                   Refund Timeline
//                 </h3>

//                 <div className="space-y-6 relative">
//                   {timelineSteps.map((step, index) => (
//                     <div key={index} className="flex items-center gap-6">
//                       <div className="w-16 h-16 rounded-full bg-[#D7C097] flex items-center justify-center">
//                         <div className="text-xl text-white">{step.icon}</div>
//                       </div>

//                       <div className="flex-1">
//                         <div className="text-sm font-bold dark:text-gray-400 text-gray-600 mb-1">
//                           {step.day}
//                         </div>
//                         <div className="text-lg font-medium dark:text-white text-gray-900">
//                           {step.action}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Right Column */}
//             <div className="space-y-8">
//               {/* Return Process */}
//               <div className="p-8 rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
//                 <h2 className="text-2xl font-bold dark:text-white text-gray-900 mb-8 flex items-center gap-3">
//                   <FaUndo className="text-[#D7C097]" />
//                   How to Return
//                 </h2>

//                 <div className="space-y-4">
//                   {processSteps.map((step, index) => (
//                     <div
//                       key={index}
//                       className="flex items-start gap-4 p-5 rounded-xl bg-gray-50 dark:bg-gray-700"
//                     >
//                       <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#D7C097] flex items-center justify-center text-white font-bold">
//                         {index + 1}
//                       </div>

//                       <span className="text-lg dark:text-gray-300 text-gray-700 pt-1">
//                         {step.text}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Contact Support */}
//               <div className="p-8 rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
//                 <h3 className="text-2xl font-bold dark:text-white text-gray-900 mb-6 flex items-center gap-3">
//                   <FaQuestionCircle className="text-[#D7C097]" />
//                   Need Help?
//                 </h3>

//                 <p className="text-lg dark:text-gray-300 text-gray-700 mb-8">
//                   Contact our support team for return assistance
//                 </p>

//                 <div className="space-y-4">
//                   {contactInfo.map((contact, index) => (
//                     <div
//                       key={index}
//                       className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700"
//                     >
//                       <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-600 flex items-center justify-center">
//                         <div className="text-[#D7C097]">{contact.icon}</div>
//                       </div>

//                       <span className="text-lg font-medium dark:text-gray-300 text-gray-700">
//                         {contact.text}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Refund Info */}
//               <div className="p-8 rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
//                 <h3 className="text-2xl font-bold dark:text-white text-gray-900 mb-6 flex items-center gap-3">
//                   <FaMoneyBillWave className="text-[#D7C097]" />
//                   Refund Information
//                 </h3>

//                 <ul className="space-y-3">
//                   {refundPoints.map((point, index) => (
//                     <li
//                       key={index}
//                       className="flex items-start gap-3 dark:text-gray-300 text-gray-700"
//                     >
//                       <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#D7C097] mt-2" />
//                       <span className="text-lg">{point}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             </div>
//           </div>

//           {/* FAQ Section */}
//           <div className="mt-20">
//             <div className="p-8 rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
//               <h2 className="text-3xl lg:text-4xl font-bold dark:text-white text-gray-900 mb-10">
//                 Frequently Asked Questions
//               </h2>

//               <div className="grid md:grid-cols-2 gap-6">
//                 {faqs.map((faq, index) => (
//                   <div
//                     key={index}
//                     className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-700"
//                   >
//                     <h4 className="font-bold text-xl dark:text-white text-gray-900 mb-3 flex items-center gap-2">
//                       <FaQuestionCircle className="text-[#D7C097] text-lg" />
//                       {faq.q}
//                     </h4>
//                     <p className="dark:text-gray-300 text-gray-700">{faq.a}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Guarantee Banner */}
//           <div className="mt-16">
//             <div className="p-8 rounded-3xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center">
//               <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D7C097] mb-6">
//                 <FaShieldAlt className="text-2xl text-white" />
//               </div>

//               <h3 className="text-2xl lg:text-3xl font-bold dark:text-white text-gray-900 mb-4">
//                 Satisfaction Guaranteed
//               </h3>

//               <p className="text-lg dark:text-gray-300 text-gray-700 max-w-2xl mx-auto">
//                 We stand behind every product we sell. If you're not completely
//                 satisfied, our hassle-free return policy ensures you can shop
//                 with confidence.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ReturnPolicyPage;
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import {
  FaUndo,
  FaCalendarAlt,
  FaBox,
  FaShippingFast,
  FaMoneyBillWave,
  FaCheckCircle,
  FaTimesCircle,
  FaQuestionCircle,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaExchangeAlt,
  FaHeadset,
  FaShieldAlt,
} from "react-icons/fa";

// Animation variants for ReturnPolicyPage
const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

const fadeIn = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const scaleIn = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Custom hook for scroll animations
const useScrollAnimation = (threshold = 0.2) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: threshold,
    margin: "0px 0px -50px 0px",
  });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return [ref, controls];
};

const ReturnPolicyPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Create refs for each section
  const [heroRef, heroControls] = useScrollAnimation(0.3);
  const [policyRef, policyControls] = useScrollAnimation();
  const [eligibilityRef, eligibilityControls] = useScrollAnimation();
  const [timelineRef, timelineControls] = useScrollAnimation();
  const [processRef, processControls] = useScrollAnimation();
  const [contactRef, contactControls] = useScrollAnimation();
  const [refundRef, refundControls] = useScrollAnimation();
  const [faqRef, faqControls] = useScrollAnimation();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const policyPoints = [
    {
      title: "30-Day Return Window",
      description:
        "Return any item within 30 days of delivery for a full refund.",
      icon: <FaCalendarAlt />,
    },
    {
      title: "Free Returns",
      description: "We provide prepaid return labels for all eligible items.",
      icon: <FaShippingFast />,
    },
    {
      title: "Full Refund",
      description:
        "Receive your refund within 3-5 business days after we receive your return.",
      icon: <FaMoneyBillWave />,
    },
    {
      title: "Easy Process",
      description: "Initiate returns directly from your account dashboard.",
      icon: <FaUndo />,
    },
  ];

  const conditions = [
    {
      text: "Item must be unused and in original condition",
      valid: true,
    },
    {
      text: "All original tags and packaging must be included",
      valid: true,
    },
    {
      text: "Return must be initiated within 30 days of delivery",
      valid: true,
    },
    {
      text: "Final sale items marked 'Non-Returnable'",
      valid: false,
    },
    { text: "Items without original packaging", valid: false },
    { text: "Personalized or customized products", valid: false },
  ];

  const processSteps = [
    {
      text: "Login to your account and go to 'My Orders then delivered orders'",
    },
    { text: "Select the item you want to return" },
    { text: "Choose return reason and add proof images" },
    { text: "Pack item securely with all accessories" },
    { text: "Drop off at any carrier location" },
    { text: "Track return status in your account" },
  ];

  const timelineSteps = [
    {
      day: "Day 1",
      action: "Initiate return online",
      icon: <FaUndo />,
    },
    {
      day: "Day 2-3",
      action: "Ship item back to us",
      icon: <FaShippingFast />,
    },
    {
      day: "Day 4-5",
      action: "We receive and inspect",
      icon: <FaCheckCircle />,
    },
    {
      day: "Day 6-7",
      action: "Refund processed",
      icon: <FaMoneyBillWave />,
    },
  ];

  const contactInfo = [
    { icon: <FaEnvelope />, text: "support@adescart.com" },
    { icon: <FaPhone />, text: "1-800-RETURNS" },
    { icon: <FaHeadset />, text: "24/7 Live Chat Support" },
    { icon: <FaClock />, text: "Mon-Fri: 9AM-9PM EST" },
  ];

  const faqs = [
    {
      q: "How do I track my return?",
      a: "You can track your return in your account dashboard under 'My Orders in the delivered sections'.",
    },
    {
      q: "What if my item arrives damaged?",
      a: "Contact us within 48 hours of delivery with photos for immediate assistance.",
    },
    {
      q: "How long does inspection take?",
      a: "Quality inspection typically takes 1-2 business days after we receive your return.",
    },
    {
      q: "Are return shipping fees covered?",
      a: "Yes, we provide free return shipping for all eligible returns.",
    },
    {
      q: "Can I return sale items?",
      a: "Yes, sale items are eligible for return within the standard 30-day window.",
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

  return (
    <>
      {/* Loading Animation */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
              className="w-24 h-24 rounded-full border-4 border-transparent border-t-[#D7C097] border-r-[#A38C5C] mb-4"
            ></motion.div>
            <p className="dark:text-gray-300 text-gray-700 font-medium">
              Loading Return Policy...
            </p>
          </motion.div>
        </div>
      )}

      <div className="min-h-screen bg-white dark:bg-gray-900 pt-24 pb-12 overflow-x-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            ref={heroRef}
            variants={staggerContainer}
            initial="hidden"
            animate={heroControls}
            className="text-center mb-16"
          >
            <motion.div
              variants={scaleIn}
              className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#D7C097] mb-6"
            >
              <FaUndo className="text-4xl text-white" />
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl lg:text-6xl font-bold mb-6"
            >
              <span className="text-gray-900 dark:text-gray-100">
                Return & Refund Policy
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl lg:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-6"
            >
              Simple, hassle-free returns. Your satisfaction is guaranteed.
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            >
              We believe in making returns as easy as shopping. That's why we've
              created a transparent, customer-friendly return policy that puts
              you first.
            </motion.p>
          </motion.div>

          {/* Policy Highlights */}
          <motion.div
            ref={policyRef}
            variants={staggerContainer}
            initial="hidden"
            animate={policyControls}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          >
            {policyPoints.map((point, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                custom={index}
                className="p-8 rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <motion.div
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D7C097] mb-6"
                >
                  <div className="text-2xl text-white">{point.icon}</div>
                </motion.div>

                <h3 className="text-xl font-bold dark:text-white text-gray-900 mb-3">
                  {point.title}
                </h3>

                <p className="dark:text-gray-300 text-gray-700">
                  {point.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-8">
              {/* Eligibility Conditions */}
              <motion.div
                ref={eligibilityRef}
                variants={staggerContainer}
                initial="hidden"
                animate={eligibilityControls}
                className="p-8 rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <motion.h2
                  variants={fadeInUp}
                  className="text-2xl font-bold dark:text-white text-gray-900 mb-8 flex items-center gap-3"
                >
                  <FaCheckCircle className="text-[#D7C097]" />
                  Return Eligibility
                </motion.h2>

                <div className="space-y-4">
                  {conditions.map((condition, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      custom={index}
                      className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700"
                    >
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${condition.valid ? "bg-[#D7C097]/20" : "bg-rose-500/20"}`}
                      >
                        <div
                          className={
                            condition.valid ? "text-[#D7C097]" : "text-rose-500"
                          }
                        >
                          {condition.valid ? (
                            <FaCheckCircle />
                          ) : (
                            <FaTimesCircle />
                          )}
                        </div>
                      </div>

                      <span
                        className={`text-lg ${condition.valid ? "dark:text-gray-300 text-gray-700" : "dark:text-gray-400 text-gray-500"}`}
                      >
                        {condition.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Timeline */}
              <motion.div
                ref={timelineRef}
                variants={staggerContainer}
                initial="hidden"
                animate={timelineControls}
                className="p-8 rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <motion.h3
                  variants={fadeInUp}
                  className="text-2xl font-bold dark:text-white text-gray-900 mb-8"
                >
                  Refund Timeline
                </motion.h3>

                <div className="space-y-6 relative">
                  {timelineSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.1 }}
                      className="flex items-center gap-6"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-16 h-16 rounded-full bg-[#D7C097] flex items-center justify-center"
                      >
                        <div className="text-xl text-white">{step.icon}</div>
                      </motion.div>

                      <div className="flex-1">
                        <div className="text-sm font-bold dark:text-gray-400 text-gray-600 mb-1">
                          {step.day}
                        </div>
                        <div className="text-lg font-medium dark:text-white text-gray-900">
                          {step.action}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              {/* Return Process */}
              <motion.div
                ref={processRef}
                variants={staggerContainer}
                initial="hidden"
                animate={processControls}
                className="p-8 rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <motion.h2
                  variants={fadeInUp}
                  className="text-2xl font-bold dark:text-white text-gray-900 mb-8 flex items-center gap-3"
                >
                  <FaUndo className="text-[#D7C097]" />
                  How to Return
                </motion.h2>

                <div className="space-y-4">
                  {processSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      className="flex items-start gap-4 p-5 rounded-xl bg-gray-50 dark:bg-gray-700"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#D7C097] flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>

                      <span className="text-lg dark:text-gray-300 text-gray-700 pt-1">
                        {step.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Contact Support */}
              <motion.div
                ref={contactRef}
                variants={staggerContainer}
                initial="hidden"
                animate={contactControls}
                className="p-8 rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <motion.h3
                  variants={fadeInUp}
                  className="text-2xl font-bold dark:text-white text-gray-900 mb-6 flex items-center gap-3"
                >
                  <FaQuestionCircle className="text-[#D7C097]" />
                  Need Help?
                </motion.h3>

                <motion.p
                  variants={fadeInUp}
                  className="text-lg dark:text-gray-300 text-gray-700 mb-8"
                >
                  Contact our support team for return assistance
                </motion.p>

                <div className="space-y-4">
                  {contactInfo.map((contact, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.1 }}
                      className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-600 flex items-center justify-center">
                        <div className="text-[#D7C097]">{contact.icon}</div>
                      </div>

                      <span className="text-lg font-medium dark:text-gray-300 text-gray-700">
                        {contact.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Refund Info */}
              <motion.div
                ref={refundRef}
                variants={staggerContainer}
                initial="hidden"
                animate={refundControls}
                className="p-8 rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <motion.h3
                  variants={fadeInUp}
                  className="text-2xl font-bold dark:text-white text-gray-900 mb-6 flex items-center gap-3"
                >
                  <FaMoneyBillWave className="text-[#D7C097]" />
                  Refund Information
                </motion.h3>

                <ul className="space-y-3">
                  {refundPoints.map((point, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + index * 0.05 }}
                      className="flex items-start gap-3 dark:text-gray-300 text-gray-700"
                    >
                      <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#D7C097] mt-2" />
                      <span className="text-lg">{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>

          {/* FAQ Section */}
          <motion.div
            ref={faqRef}
            variants={staggerContainer}
            initial="hidden"
            animate={faqControls}
            className="mt-20"
          >
            <div className="p-8 rounded-3xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm">
              <motion.h2
                variants={fadeInUp}
                className="text-3xl lg:text-4xl font-bold dark:text-white text-gray-900 mb-10"
              >
                Frequently Asked Questions
              </motion.h2>

              <div className="grid md:grid-cols-2 gap-6">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    custom={index}
                    className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300"
                  >
                    <h4 className="font-bold text-xl dark:text-white text-gray-900 mb-3 flex items-center gap-2">
                      <FaQuestionCircle className="text-[#D7C097] text-lg" />
                      {faq.q}
                    </h4>
                    <p className="dark:text-gray-300 text-gray-700">{faq.a}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Guarantee Banner */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <div className="p-8 rounded-3xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-center shadow-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D7C097] mb-6">
                <FaShieldAlt className="text-2xl text-white" />
              </div>

              <h3 className="text-2xl lg:text-3xl font-bold dark:text-white text-gray-900 mb-4">
                Satisfaction Guaranteed
              </h3>

              <p className="text-lg dark:text-gray-300 text-gray-700 max-w-2xl mx-auto">
                We stand behind every product we sell. If you're not completely
                satisfied, our hassle-free return policy ensures you can shop
                with confidence.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ReturnPolicyPage;
