// // import React, { useEffect, useState } from "react";
// // import { Link } from "react-router-dom";
// // import { motion, useAnimation, useInView } from "framer-motion";
// // import {
// //   FaFacebookF,
// //   FaTwitter,
// //   FaInstagram,
// //   FaPinterestP,
// //   FaYoutube,
// //   FaPhone,
// //   FaEnvelope,
// //   FaMapMarkerAlt,
// //   FaHeart,
// //   FaShieldAlt,
// //   FaTruck,
// //   FaCreditCard,
// //   FaHeadset,
// //   FaSun,
// //   FaMoon,
// // } from "react-icons/fa";
// // import { IoSparkles } from "react-icons/io5";

// // const Footer = () => {
// //   const [theme, setTheme] = useState("dark");
// //   const [loading, setLoading] = useState(true);
// //   const [snowCount] = useState(100);
// //   const controls = useAnimation();
// //   const ref = React.useRef();
// //   const isInView = useInView(ref, { once: true, amount: 0.05 });

// //   const quickLinks = [
// //     { name: "Home", path: "/" },
// //     { name: "Shop", path: "/products" },
// //     { name: "Categories", path: "/categories" },
// //     // { name: "New Arrivals", path: "/new-arrivals" },
// //     // { name: "Best Sellers", path: "/best-sellers" },
// //   ];

// //   const customerService = [
// //     { name: "Contact Us", path: "/contact" },
// //     { name: "FAQs", path: "/faqs" },
// //     { name: "Shipping Info", path: "/shipping" },
// //     { name: "Return Policy", path: "/policy" },
// //     { name: "Track Order", path: "/my-orders" },
// //   ];

// //   const company = [
// //     // { name: "About Us", path: "/about" },
// //     // { name: "Careers", path: "/careers" },
// //     // { name: "Blog", path: "/blog" },
// //     // { name: "Press", path: "/press" },
// //     // { name: "Affiliate Program", path: "/affiliate" },
// //   ];

// //   const policies = [
// //     // { name: "Privacy Policy", path: "/privacy" },
// //     // { name: "Terms of Service", path: "/terms" },
// //     // { name: "Cookie Policy", path: "/cookies" },
// //     // { name: "Accessibility", path: "/accessibility" },
// //   ];

// //   const socialLinks = [
// //     { icon: <FaFacebookF />, name: "Facebook", url: "#" },
// //     { icon: <FaTwitter />, name: "Twitter", url: "#" },
// //     { icon: <FaInstagram />, name: "Instagram", url: "#" },
// //     { icon: <FaPinterestP />, name: "Pinterest", url: "#" },
// //     { icon: <FaYoutube />, name: "YouTube", url: "#" },
// //   ];

// //   const trustBadges = [
// //     {
// //       icon: <FaShieldAlt />,
// //       text: "Secure Payment",
// //       color: "from-blue-500 to-cyan-500",
// //       lightColor: "from-blue-400 to-cyan-400",
// //     },
// //     {
// //       icon: <FaTruck />,
// //       text: "Fast Delivery",
// //       color: "from-green-500 to-emerald-500",
// //       lightColor: "from-green-400 to-emerald-400",
// //     },
// //     {
// //       icon: <FaCreditCard />,
// //       text: "Easy Returns",
// //       color: "from-purple-500 to-pink-500",
// //       lightColor: "from-purple-400 to-pink-400",
// //     },
// //     {
// //       icon: <FaHeadset />,
// //       text: "24/7 Support",
// //       color: "from-amber-500 to-orange-500",
// //       lightColor: "from-amber-400 to-orange-400",
// //     },
// //   ];

// //   // Contact items
// //   const contactItems = [
// //     {
// //       icon: <FaPhone />,
// //       title: "Phone",
// //       content: "+(2519) 6462 3413",
// //     },
// //     {
// //       icon: <FaEnvelope />,
// //       title: "Email",
// //       content: "worknehtesfamicael707@gmail.com",
// //     },
// //     {
// //       icon: <FaMapMarkerAlt />,
// //       title: "Address",
// //       content: "Platinum Plaza, Front of AU delegation",
// //     },
// //   ];

// //   useEffect(() => {
// //     const savedTheme = localStorage.getItem("theme") || "dark";
// //     setTheme(savedTheme);
// //     document.documentElement.className = savedTheme;

// //     setTimeout(() => {
// //       setLoading(false);
// //     }, 800);
// //   }, []);

// //   const toggleTheme = () => {
// //     const newTheme = theme === "dark" ? "light" : "dark";
// //     setTheme(newTheme);
// //     localStorage.setItem("theme", newTheme);
// //     document.documentElement.className = newTheme;
// //   };

// //   useEffect(() => {
// //     if (isInView) {
// //       controls.start("visible");
// //     }
// //   }, [controls, isInView]);

// //   const containerVariants = {
// //     hidden: { opacity: 0 },
// //     visible: {
// //       opacity: 1,
// //       transition: {
// //         staggerChildren: 0.08,
// //         delayChildren: 0.1,
// //       },
// //     },
// //   };

// //   const itemVariants = {
// //     hidden: { y: 15, opacity: 0 },
// //     visible: {
// //       y: 0,
// //       opacity: 1,
// //       transition: {
// //         type: "spring",
// //         stiffness: 120,
// //         damping: 15,
// //         mass: 0.8,
// //       },
// //     },
// //   };

// //   const fadeInUp = {
// //     hidden: { y: 20, opacity: 0 },
// //     visible: {
// //       y: 0,
// //       opacity: 1,
// //       transition: {
// //         duration: 0.5,
// //         ease: [0.25, 0.46, 0.45, 0.94],
// //       },
// //     },
// //   };

// //   const scaleIn = {
// //     hidden: { scale: 0.85, opacity: 0 },
// //     visible: {
// //       scale: 1,
// //       opacity: 1,
// //       transition: {
// //         duration: 0.4,
// //         ease: [0.34, 1.56, 0.64, 1],
// //       },
// //     },
// //   };

// //   const slideInLeft = {
// //     hidden: { x: -20, opacity: 0 },
// //     visible: {
// //       x: 0,
// //       opacity: 1,
// //       transition: {
// //         duration: 0.5,
// //         ease: [0.25, 0.46, 0.45, 0.94],
// //       },
// //     },
// //   };

// //   const slideInRight = {
// //     hidden: { x: 20, opacity: 0 },
// //     visible: {
// //       x: 0,
// //       opacity: 1,
// //       transition: {
// //         duration: 0.5,
// //         ease: [0.25, 0.46, 0.45, 0.94],
// //       },
// //     },
// //   };

// //   // Optimized snowflakes for mobile
// //   const snowflakes = Array.from({ length: snowCount }).map((_, i) => ({
// //     id: i,
// //     size: Math.random() * 3 + 1,
// //     duration: Math.random() * 8 + 6,
// //     delay: Math.random() * 3,
// //     x: Math.random() * 100,
// //     opacity: Math.random() * 0.4 + 0.2,
// //   }));

// //   return (
// //     <>
// //       {/* Loading Animation */}
// //       {loading && (
// //         <motion.div
// //           initial={{ opacity: 1 }}
// //           animate={{ opacity: 0 }}
// //           transition={{ duration: 0.3 }}
// //           className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
// //           style={{ backgroundColor: theme === "dark" ? "#0f172a" : "#FFFBF5" }}
// //         >
// //           <div className="relative w-full h-full overflow-hidden">
// //             {snowflakes.map((flake) => (
// //               <motion.div
// //                 key={flake.id}
// //                 className="absolute rounded-full"
// //                 style={{
// //                   width: flake.size,
// //                   height: flake.size,
// //                   left: `${flake.x}%`,
// //                   backgroundColor: theme === "dark" ? "#94a3b8" : "#D9C39C",
// //                   opacity: flake.opacity,
// //                 }}
// //                 initial={{ y: -50 }}
// //                 animate={{
// //                   y: [0, window.innerHeight + 50],
// //                   x: [
// //                     flake.x,
// //                     flake.x + Math.sin(flake.id) * 30,
// //                     flake.x - Math.cos(flake.id) * 30,
// //                   ],
// //                   rotate: 360,
// //                 }}
// //                 transition={{
// //                   duration: flake.duration,
// //                   delay: flake.delay,
// //                   repeat: Infinity,
// //                   ease: "linear",
// //                 }}
// //               />
// //             ))}

// //             <motion.div
// //               initial={{ scale: 0 }}
// //               animate={{ scale: 1, rotate: 360 }}
// //               transition={{ duration: 0.6, type: "spring" }}
// //               className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
// //             >
// //               <div className="w-16 h-16 rounded-full border-3 border-transparent border-t-amber-500 border-r-rose-500 animate-spin"></div>
// //             </motion.div>
// //           </div>
// //         </motion.div>
// //       )}

// //       {/* Background Snow */}
// //       <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
// //         {snowflakes.map((flake) => (
// //           <motion.div
// //             key={`bg-${flake.id}`}
// //             className="absolute rounded-full"
// //             style={{
// //               width: flake.size,
// //               height: flake.size,
// //               left: `${flake.x}%`,
// //               backgroundColor:
// //                 theme === "dark"
// //                   ? "rgba(148, 163, 184, 0.15)"
// //                   : "rgba(217, 195, 156, 0.15)",
// //               opacity: flake.opacity * 0.5,
// //             }}
// //             initial={{ y: -50 }}
// //             animate={{
// //               y: [0, window.innerHeight + 50],
// //               x: [
// //                 flake.x,
// //                 flake.x + Math.sin(flake.id) * 20,
// //                 flake.x - Math.cos(flake.id) * 20,
// //               ],
// //               rotate: 360,
// //             }}
// //             transition={{
// //               duration: flake.duration * 1.2,
// //               delay: flake.delay,
// //               repeat: Infinity,
// //               ease: "linear",
// //             }}
// //           />
// //         ))}
// //       </div>

// //       <motion.footer
// //         ref={ref}
// //         initial="hidden"
// //         animate={controls}
// //         variants={containerVariants}
// //         className="relative z-10 pt-12 pb-8 w-full px-4 sm:px-6 overflow-hidden transition-all duration-500"
// //       >
// //         <div className="max-w-7xl mx-auto w-full">
// //           {/* Theme Toggle */}
// //           <motion.div
// //             initial={{ opacity: 0, y: -15 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ delay: 0.2 }}
// //             className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20"
// //           >
// //             <motion.button
// //               whileHover={{ scale: 1.05 }}
// //               whileTap={{ scale: 0.95 }}
// //               onClick={toggleTheme}
// //               className={`p-2.5 sm:p-3 rounded-full shadow-lg ${
// //                 theme === "dark"
// //                   ? "bg-slate-800 text-amber-400 hover:bg-slate-700"
// //                   : "bg-cream-300 text-cream-800 hover:bg-cream-400"
// //               } transition-all duration-200`}
// //               aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
// //             >
// //               {theme === "dark" ? <FaSun size={18} /> : <FaMoon size={18} />}
// //             </motion.button>
// //           </motion.div>

// //           {/* Top Section */}
// //           <div
// //             className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pb-8 sm:pb-12 border-b transition-colors duration-300 ${
// //               theme === "dark" ? "border-slate-700/50" : "border-cream-300"
// //             }`}
// //           >
// //             {/* Logo & Description - Full width on mobile */}
// //             <motion.div
// //               variants={slideInLeft}
// //               className="space-y-4 sm:space-y-6 sm:col-span-2 lg:col-span-1"
// //             >
// //               <div className="flex items-center gap-3">
// //                 <motion.div
// //                   initial={{ rotate: 0 }}
// //                   animate={{ rotate: 360 }}
// //                   transition={{
// //                     duration: 25,
// //                     repeat: Infinity,
// //                     ease: "linear",
// //                   }}
// //                   className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
// //                     theme === "dark"
// //                       ? "bg-gradient-to-r from-amber-500 to-rose-500"
// //                       : "bg-gradient-to-r from-amber-400 to-rose-400"
// //                   }`}
// //                 >
// //                   <IoSparkles className="text-lg sm:text-xl" />
// //                 </motion.div>
// //                 <div>
// //                   <div
// //                     className={`text-xl sm:text-2xl font-bold transition-colors duration-300 ${
// //                       theme === "dark" ? "text-white" : "text-cream-900"
// //                     }`}
// //                   >
// //                     AdesCart
// //                   </div>
// //                   <div
// //                     className={`text-xs sm:text-sm transition-colors duration-300 ${
// //                       theme === "dark" ? "text-slate-400" : "text-cream-700"
// //                     }`}
// //                   >
// //                     Premium Shopping Experience
// //                   </div>
// //                 </div>
// //               </div>
// //               <p
// //                 className={`text-sm sm:text-base leading-relaxed transition-colors duration-300 ${
// //                   theme === "dark" ? "text-slate-400" : "text-cream-700"
// //                 }`}
// //               >
// //                 Your trusted destination for premium products, exceptional
// //                 quality, and outstanding customer service since 2025.
// //               </p>
// //               <div className="flex gap-3 sm:gap-4">
// //                 {socialLinks.map((social, index) => (
// //                   <motion.a
// //                     key={index}
// //                     href={social.url}
// //                     initial={{ opacity: 0, scale: 0.8 }}
// //                     animate={{ opacity: 1, scale: 1 }}
// //                     transition={{ delay: index * 0.07 }}
// //                     whileHover={{ scale: 1.1, rotate: 5 }}
// //                     whileTap={{ scale: 0.95 }}
// //                     className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg ${
// //                       theme === "dark"
// //                         ? "bg-gradient-to-r from-slate-700 to-slate-800 hover:from-amber-500 hover:to-rose-500"
// //                         : "bg-gradient-to-r from-cream-200 to-cream-300 hover:from-amber-400 hover:to-rose-400"
// //                     }`}
// //                     aria-label={social.name}
// //                   >
// //                     {social.icon}
// //                   </motion.a>
// //                 ))}
// //               </div>
// //             </motion.div>

// //             {/* Quick Links */}
// //             <motion.div variants={fadeInUp} className="text-left">
// //               <h3
// //                 className={`text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2 transition-colors duration-300 ${
// //                   theme === "dark" ? "text-white" : "text-cream-900"
// //                 }`}
// //               >
// //                 <motion.div
// //                   animate={{ scale: [1, 1.2, 1] }}
// //                   transition={{ duration: 2, repeat: Infinity }}
// //                   className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
// //                     theme === "dark"
// //                       ? "bg-gradient-to-r from-amber-500 to-rose-500"
// //                       : "bg-gradient-to-r from-amber-400 to-rose-400"
// //                   }`}
// //                 />
// //                 Quick Links
// //               </h3>
// //               <ul className="space-y-2 sm:space-y-3">
// //                 {quickLinks.map((link, index) => (
// //                   <motion.li
// //                     key={index}
// //                     variants={itemVariants}
// //                     custom={index}
// //                     className="text-left"
// //                   >
// //                     <Link
// //                       to={link.path}
// //                       className={`transition-colors duration-300 flex items-center gap-2 group text-sm sm:text-base ${
// //                         theme === "dark"
// //                           ? "text-slate-400 hover:text-white"
// //                           : "text-cream-700 hover:text-cream-900"
// //                       }`}
// //                     >
// //                       <motion.span
// //                         whileHover={{ scale: 1.3 }}
// //                         className={`w-1 h-1 rounded-full transition-all duration-300 flex-shrink-0 ${
// //                           theme === "dark"
// //                             ? "bg-slate-600 group-hover:bg-gradient-to-r from-amber-500 to-rose-500"
// //                             : "bg-cream-400 group-hover:bg-gradient-to-r from-amber-400 to-rose-400"
// //                         }`}
// //                       />
// //                       {link.name}
// //                     </Link>
// //                   </motion.li>
// //                 ))}
// //               </ul>
// //             </motion.div>

// //             {/* Customer Service */}
// //             <motion.div variants={fadeInUp} className="text-left">
// //               <h3
// //                 className={`text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2 transition-colors duration-300 ${
// //                   theme === "dark" ? "text-white" : "text-cream-900"
// //                 }`}
// //               >
// //                 <motion.div
// //                   animate={{ scale: [1, 1.2, 1] }}
// //                   transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
// //                   className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
// //                     theme === "dark"
// //                       ? "bg-gradient-to-r from-amber-500 to-rose-500"
// //                       : "bg-gradient-to-r from-amber-400 to-rose-400"
// //                   }`}
// //                 />
// //                 Customer Service
// //               </h3>
// //               <ul className="space-y-2 sm:space-y-3">
// //                 {customerService.map((link, index) => (
// //                   <motion.li
// //                     key={index}
// //                     variants={itemVariants}
// //                     custom={index + 5}
// //                     className="text-left"
// //                   >
// //                     <Link
// //                       to={link.path}
// //                       className={`transition-colors duration-300 flex items-center gap-2 group text-sm sm:text-base ${
// //                         theme === "dark"
// //                           ? "text-slate-400 hover:text-white"
// //                           : "text-cream-700 hover:text-cream-900"
// //                       }`}
// //                     >
// //                       <motion.span
// //                         whileHover={{ scale: 1.3 }}
// //                         className={`w-1 h-1 rounded-full transition-all duration-300 flex-shrink-0 ${
// //                           theme === "dark"
// //                             ? "bg-slate-600 group-hover:bg-gradient-to-r from-amber-500 to-rose-500"
// //                             : "bg-cream-400 group-hover:bg-gradient-to-r from-amber-400 to-rose-400"
// //                         }`}
// //                       />
// //                       {link.name}
// //                     </Link>
// //                   </motion.li>
// //                 ))}
// //               </ul>
// //             </motion.div>

// //             {/* Contact Info */}
// //             <motion.div
// //               variants={slideInRight}
// //               className="text-left sm:col-span-2 lg:col-span-1"
// //             >
// //               <h3
// //                 className={`text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2 transition-colors duration-300 ${
// //                   theme === "dark" ? "text-white" : "text-cream-900"
// //                 }`}
// //               >
// //                 <motion.div
// //                   animate={{ scale: [1, 1.2, 1] }}
// //                   transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
// //                   className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
// //                     theme === "dark"
// //                       ? "bg-gradient-to-r from-amber-500 to-rose-500"
// //                       : "bg-gradient-to-r from-amber-400 to-rose-400"
// //                   }`}
// //                 />
// //                 Contact Us
// //               </h3>
// //               <div className="space-y-4">
// //                 {contactItems.map((item, index) => (
// //                   <motion.div
// //                     key={index}
// //                     variants={itemVariants}
// //                     className="flex items-start gap-3"
// //                   >
// //                     <motion.div
// //                       whileHover={{ rotate: 360 }}
// //                       transition={{ duration: 0.4 }}
// //                       className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 mt-0.5 ${
// //                         theme === "dark"
// //                           ? "bg-gradient-to-r from-slate-700 to-slate-800"
// //                           : "bg-gradient-to-r from-cream-200 to-cream-300"
// //                       }`}
// //                     >
// //                       <span
// //                         className={`text-sm sm:text-base ${
// //                           theme === "dark" ? "text-amber-500" : "text-amber-600"
// //                         }`}
// //                       >
// //                         {item.icon}
// //                       </span>
// //                     </motion.div>
// //                     <div className="flex-1 min-w-0">
// //                       <div
// //                         className={`font-medium text-sm sm:text-base transition-colors duration-300 mb-0.5 ${
// //                           theme === "dark" ? "text-white" : "text-cream-900"
// //                         }`}
// //                       >
// //                         {item.title}
// //                       </div>
// //                       <div
// //                         className={`text-xs sm:text-sm transition-colors duration-300 break-words ${
// //                           theme === "dark" ? "text-slate-400" : "text-cream-700"
// //                         }`}
// //                       >
// //                         {item.content}
// //                       </div>
// //                     </div>
// //                   </motion.div>
// //                 ))}
// //               </div>
// //             </motion.div>
// //           </div>

// //           {/* Trust Badges */}
// //           <motion.div variants={containerVariants} className="py-6 sm:py-8">
// //             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
// //               {trustBadges.map((badge, index) => (
// //                 <motion.div
// //                   key={index}
// //                   variants={scaleIn}
// //                   whileHover={{
// //                     y: -6,
// //                     scale: 1.02,
// //                     transition: { type: "spring", stiffness: 400 },
// //                   }}
// //                   whileTap={{ scale: 0.98 }}
// //                   className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl backdrop-blur-sm transition-all duration-300 ${
// //                     theme === "dark"
// //                       ? "bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-slate-700/30"
// //                       : "bg-gradient-to-r from-cream-100/50 to-cream-200/50 border border-cream-300/30"
// //                   }`}
// //                 >
// //                   <motion.div
// //                     animate={{ rotateY: [0, 360] }}
// //                     transition={{
// //                       duration: 4,
// //                       repeat: Infinity,
// //                       ease: "linear",
// //                     }}
// //                     className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
// //                       theme === "dark" ? badge.color : badge.lightColor
// //                     }`}
// //                   >
// //                     {badge.icon}
// //                   </motion.div>
// //                   <div
// //                     className={`font-medium text-sm sm:text-base transition-colors duration-300 ${
// //                       theme === "dark" ? "text-white" : "text-cream-900"
// //                     }`}
// //                   >
// //                     {badge.text}
// //                   </div>
// //                 </motion.div>
// //               ))}
// //             </div>
// //           </motion.div>

// //           {/* Bottom Section */}
// //           <motion.div
// //             variants={fadeInUp}
// //             className={`pt-6 sm:pt-8 border-t transition-colors duration-300 ${
// //               theme === "dark" ? "border-slate-700/50" : "border-cream-300"
// //             }`}
// //           >
// //             <div className="flex flex-col gap-4 sm:gap-6">
// //               <div
// //                 className={`text-xs sm:text-sm text-center transition-colors duration-300 ${
// //                   theme === "dark" ? "text-slate-400" : "text-cream-700"
// //                 }`}
// //               >
// //                 © 2025 Ades. All rights reserved.
// //               </div>

// //               <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
// //                 {company.slice(0, 3).map((link, index) => (
// //                   <Link
// //                     key={index}
// //                     to={link.path}
// //                     className={`text-xs sm:text-sm transition-colors duration-300 hover:underline ${
// //                       theme === "dark"
// //                         ? "text-slate-400 hover:text-white"
// //                         : "text-cream-700 hover:text-cream-900"
// //                     }`}
// //                   >
// //                     {link.name}
// //                   </Link>
// //                 ))}
// //               </div>

// //               <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
// //                 {policies.slice(0, 3).map((link, index) => (
// //                   <Link
// //                     key={index}
// //                     to={link.path}
// //                     className={`text-xs sm:text-sm transition-colors duration-300 hover:underline ${
// //                       theme === "dark"
// //                         ? "text-slate-400 hover:text-white"
// //                         : "text-cream-700 hover:text-cream-900"
// //                     }`}
// //                   >
// //                     {link.name}
// //                   </Link>
// //                 ))}
// //               </div>
// //             </div>

// //             <motion.div variants={scaleIn} className="mt-6 sm:mt-8 text-center">
// //               <div
// //                 className={`text-xs sm:text-sm transition-colors duration-300 ${
// //                   theme === "dark" ? "text-slate-500" : "text-cream-600"
// //                 }`}
// //               >
// //                 <div className="flex items-center justify-center gap-1.5 sm:gap-2">
// //                   <span>Made with</span>
// //                   <motion.div
// //                     animate={{ scale: [1, 1.1, 1] }}
// //                     transition={{ duration: 1.2, repeat: Infinity }}
// //                   >
// //                     <FaHeart className="text-rose-500 text-sm sm:text-base" />
// //                   </motion.div>
// //                   <span>
// //                     by the{" "}
// //                     <span className="text-amber-600 font-semibold">Ades</span>{" "}
// //                     team
// //                   </span>
// //                 </div>
// //                 <motion.div
// //                   animate={{ y: [0, -3, 0] }}
// //                   transition={{ duration: 1.5, repeat: Infinity }}
// //                   className="mt-1.5 sm:mt-2"
// //                 >
// //                   <span
// //                     className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs transition-all duration-300 inline-block ${
// //                       theme === "dark"
// //                         ? "bg-gradient-to-r from-slate-800 to-slate-900"
// //                         : "bg-gradient-to-r from-cream-200 to-cream-300"
// //                     }`}
// //                   >
// //                     Premium E-commerce Platform
// //                   </span>
// //                 </motion.div>
// //               </div>
// //             </motion.div>
// //           </motion.div>
// //         </div>

// //         {/* Floating Chat Button */}
// //         <motion.button
// //           initial={{ opacity: 0, scale: 0, rotate: -180 }}
// //           animate={{ opacity: 1, scale: 1, rotate: 0 }}
// //           transition={{ duration: 0.4, type: "spring" }}
// //           whileHover={{
// //             scale: 1.05,
// //             rotate: 5,
// //             transition: { type: "spring", stiffness: 500 },
// //           }}
// //           whileTap={{ scale: 0.95 }}
// //           className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-xl z-50 transition-all duration-300 ${
// //             theme === "dark"
// //               ? "bg-gradient-to-r from-amber-500 to-rose-500 shadow-amber-500/20"
// //               : "bg-gradient-to-r from-amber-400 to-rose-400 shadow-amber-400/20"
// //           }`}
// //           aria-label="Chat with us"
// //         >
// //           <motion.div
// //             animate={{ rotate: [0, 8, -8, 0] }}
// //             transition={{ duration: 1.5, repeat: Infinity }}
// //           >
// //             <FaHeadset className="text-lg sm:text-xl" />
// //           </motion.div>
// //         </motion.button>
// //       </motion.footer>
// //     </>
// //   );
// // };

// // export default Footer;
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion, useAnimation, useInView } from "framer-motion";
// import {
//   FaFacebookF,
//   FaTwitter,
//   FaInstagram,
//   FaPinterestP,
//   FaYoutube,
//   FaPhone,
//   FaEnvelope,
//   FaMapMarkerAlt,
//   FaHeart,
//   FaShieldAlt,
//   FaTruck,
//   FaCreditCard,
//   FaHeadset,
//   FaSun,
//   FaMoon,
// } from "react-icons/fa";
// import { IoSparkles } from "react-icons/io5";

// const Footer = () => {
//   const [theme, setTheme] = useState("dark");
//   const [loading, setLoading] = useState(true);
//   const [snowCount] = useState(100);
//   const controls = useAnimation();
//   const ref = React.useRef();
//   const isInView = useInView(ref, { once: true, amount: 0.05 });
//   const navigate = useNavigate();

//   // Updated quick links with hash navigation
//   const quickLinks = [
//     { name: "Home", path: "/", hash: "#home" },
//     { name: "Categories", path: "/#categories", hash: "#categories" },
//     { name: "Products", path: "/#products", hash: "#products" },
//     { name: "About", path: "/#about", hash: "#about" },
//   ];

//   // Updated customer service links with hash navigation
//   const customerService = [
//     { name: "Contact Us", path: "/#contact", hash: "#contact" },
//     { name: "FAQs", path: "/#faqs", hash: "#faqs" },
//     { name: "Shipping Info", path: "/#shipping", hash: "#shipping" },
//     { name: "Return Policy", path: "/#policy", hash: "#policy" },
//     { name: "Track Order", path: "/my-orders" },
//   ];

//   const company = [];

//   const policies = [];

//   const socialLinks = [
//     { icon: <FaFacebookF />, name: "Facebook", url: "#" },
//     { icon: <FaTwitter />, name: "Twitter", url: "#" },
//     { icon: <FaInstagram />, name: "Instagram", url: "#" },
//     { icon: <FaPinterestP />, name: "Pinterest", url: "#" },
//     { icon: <FaYoutube />, name: "YouTube", url: "#" },
//   ];

//   const trustBadges = [
//     {
//       icon: <FaShieldAlt />,
//       text: "Secure Payment",
//       color: "from-blue-500 to-cyan-500",
//       lightColor: "from-blue-400 to-cyan-400",
//     },
//     {
//       icon: <FaTruck />,
//       text: "Fast Delivery",
//       color: "from-green-500 to-emerald-500",
//       lightColor: "from-green-400 to-emerald-400",
//     },
//     {
//       icon: <FaCreditCard />,
//       text: "Easy Returns",
//       color: "from-purple-500 to-pink-500",
//       lightColor: "from-purple-400 to-pink-400",
//     },
//     {
//       icon: <FaHeadset />,
//       text: "24/7 Support",
//       color: "from-amber-500 to-orange-500",
//       lightColor: "from-amber-400 to-orange-400",
//     },
//   ];

//   // Contact items
//   const contactItems = [
//     {
//       icon: <FaPhone />,
//       title: "Phone",
//       content: "+(2519) 6462 3413",
//     },
//     {
//       icon: <FaEnvelope />,
//       title: "Email",
//       content: "worknehtesfamicael707@gmail.com",
//     },
//     {
//       icon: <FaMapMarkerAlt />,
//       title: "Address",
//       content: "Platinum Plaza, Front of AU delegation",
//     },
//   ];

//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme") || "dark";
//     setTheme(savedTheme);
//     document.documentElement.className = savedTheme;

//     setTimeout(() => {
//       setLoading(false);
//     }, 800);
//   }, []);

//   const toggleTheme = () => {
//     const newTheme = theme === "dark" ? "light" : "dark";
//     setTheme(newTheme);
//     localStorage.setItem("theme", newTheme);
//     document.documentElement.className = newTheme;
//   };

//   useEffect(() => {
//     if (isInView) {
//       controls.start("visible");
//     }
//   }, [controls, isInView]);

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.08,
//         delayChildren: 0.1,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 15, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 120,
//         damping: 15,
//         mass: 0.8,
//       },
//     },
//   };

//   const fadeInUp = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.5,
//         ease: [0.25, 0.46, 0.45, 0.94],
//       },
//     },
//   };

//   const scaleIn = {
//     hidden: { scale: 0.85, opacity: 0 },
//     visible: {
//       scale: 1,
//       opacity: 1,
//       transition: {
//         duration: 0.4,
//         ease: [0.34, 1.56, 0.64, 1],
//       },
//     },
//   };

//   const slideInLeft = {
//     hidden: { x: -20, opacity: 0 },
//     visible: {
//       x: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.5,
//         ease: [0.25, 0.46, 0.45, 0.94],
//       },
//     },
//   };

//   const slideInRight = {
//     hidden: { x: 20, opacity: 0 },
//     visible: {
//       x: 0,
//       opacity: 1,
//       transition: {
//         duration: 0.5,
//         ease: [0.25, 0.46, 0.45, 0.94],
//       },
//     },
//   };

//   // Handle footer link click
//   const handleFooterLinkClick = (link) => {
//     if (link.hash) {
//       if (window.location.pathname === "/") {
//         // Already on main page, scroll to section
//         const element = document.getElementById(link.hash.replace("#", ""));
//         if (element) {
//           element.scrollIntoView({ behavior: "smooth" });
//         }
//       } else {
//         // Navigate to main page with hash
//         navigate(`/${link.hash}`);
//       }
//     } else {
//       navigate(link.path);
//     }
//   };

//   // Optimized snowflakes for mobile
//   const snowflakes = Array.from({ length: snowCount }).map((_, i) => ({
//     id: i,
//     size: Math.random() * 3 + 1,
//     duration: Math.random() * 8 + 6,
//     delay: Math.random() * 3,
//     x: Math.random() * 100,
//     opacity: Math.random() * 0.4 + 0.2,
//   }));

//   return (
//     <>
//       {/* Loading Animation */}
//       {loading && (
//         <motion.div
//           initial={{ opacity: 1 }}
//           animate={{ opacity: 0 }}
//           transition={{ duration: 0.3 }}
//           className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
//           style={{ backgroundColor: theme === "dark" ? "#0f172a" : "#FFFBF5" }}
//         >
//           <div className="relative w-full h-full overflow-hidden">
//             {snowflakes.map((flake) => (
//               <motion.div
//                 key={flake.id}
//                 className="absolute rounded-full"
//                 style={{
//                   width: flake.size,
//                   height: flake.size,
//                   left: `${flake.x}%`,
//                   backgroundColor: theme === "dark" ? "#94a3b8" : "#D9C39C",
//                   opacity: flake.opacity,
//                 }}
//                 initial={{ y: -50 }}
//                 animate={{
//                   y: [0, window.innerHeight + 50],
//                   x: [
//                     flake.x,
//                     flake.x + Math.sin(flake.id) * 30,
//                     flake.x - Math.cos(flake.id) * 30,
//                   ],
//                   rotate: 360,
//                 }}
//                 transition={{
//                   duration: flake.duration,
//                   delay: flake.delay,
//                   repeat: Infinity,
//                   ease: "linear",
//                 }}
//               />
//             ))}

//             <motion.div
//               initial={{ scale: 0 }}
//               animate={{ scale: 1, rotate: 360 }}
//               transition={{ duration: 0.6, type: "spring" }}
//               className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
//             >
//               <div className="w-16 h-16 rounded-full border-3 border-transparent border-t-amber-500 border-r-rose-500 animate-spin"></div>
//             </motion.div>
//           </div>
//         </motion.div>
//       )}

//       {/* Background Snow */}
//       <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
//         {snowflakes.map((flake) => (
//           <motion.div
//             key={`bg-${flake.id}`}
//             className="absolute rounded-full"
//             style={{
//               width: flake.size,
//               height: flake.size,
//               left: `${flake.x}%`,
//               backgroundColor:
//                 theme === "dark"
//                   ? "rgba(148, 163, 184, 0.15)"
//                   : "rgba(217, 195, 156, 0.15)",
//               opacity: flake.opacity * 0.5,
//             }}
//             initial={{ y: -50 }}
//             animate={{
//               y: [0, window.innerHeight + 50],
//               x: [
//                 flake.x,
//                 flake.x + Math.sin(flake.id) * 20,
//                 flake.x - Math.cos(flake.id) * 20,
//               ],
//               rotate: 360,
//             }}
//             transition={{
//               duration: flake.duration * 1.2,
//               delay: flake.delay,
//               repeat: Infinity,
//               ease: "linear",
//             }}
//           />
//         ))}
//       </div>

//       <motion.footer
//         ref={ref}
//         initial="hidden"
//         animate={controls}
//         variants={containerVariants}
//         className="relative z-10 pt-12 pb-8 w-full px-4 sm:px-6 overflow-hidden transition-all duration-500"
//       >
//         <div className="max-w-7xl mx-auto w-full">
//           {/* Theme Toggle */}
//           <motion.div
//             initial={{ opacity: 0, y: -15 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//             className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20"
//           >
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={toggleTheme}
//               className={`p-2.5 sm:p-3 rounded-full shadow-lg ${
//                 theme === "dark"
//                   ? "bg-slate-800 text-amber-400 hover:bg-slate-700"
//                   : "bg-cream-300 text-cream-800 hover:bg-cream-400"
//               } transition-all duration-200`}
//               aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
//             >
//               {theme === "dark" ? <FaSun size={18} /> : <FaMoon size={18} />}
//             </motion.button>
//           </motion.div>

//           {/* Top Section */}
//           <div
//             className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pb-8 sm:pb-12 border-b transition-colors duration-300 ${
//               theme === "dark" ? "border-slate-700/50" : "border-cream-300"
//             }`}
//           >
//             {/* Logo & Description - Full width on mobile */}
//             <motion.div
//               variants={slideInLeft}
//               className="space-y-4 sm:space-y-6 sm:col-span-2 lg:col-span-1"
//             >
//               <div className="flex items-center gap-3">
//                 <motion.div
//                   initial={{ rotate: 0 }}
//                   animate={{ rotate: 360 }}
//                   transition={{
//                     duration: 25,
//                     repeat: Infinity,
//                     ease: "linear",
//                   }}
//                   className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
//                     theme === "dark"
//                       ? "bg-gradient-to-r from-amber-500 to-rose-500"
//                       : "bg-gradient-to-r from-amber-400 to-rose-400"
//                   }`}
//                 >
//                   <IoSparkles className="text-lg sm:text-xl" />
//                 </motion.div>
//                 <div>
//                   <div
//                     className={`text-xl sm:text-2xl font-bold transition-colors duration-300 ${
//                       theme === "dark" ? "text-white" : "text-cream-900"
//                     }`}
//                   >
//                     AdesCart
//                   </div>
//                   <div
//                     className={`text-xs sm:text-sm transition-colors duration-300 ${
//                       theme === "dark" ? "text-slate-400" : "text-cream-700"
//                     }`}
//                   >
//                     Premium Shopping Experience
//                   </div>
//                 </div>
//               </div>
//               <p
//                 className={`text-sm sm:text-base leading-relaxed transition-colors duration-300 ${
//                   theme === "dark" ? "text-slate-400" : "text-cream-700"
//                 }`}
//               >
//                 Your trusted destination for premium products, exceptional
//                 quality, and outstanding customer service since 2025.
//               </p>
//               <div className="flex gap-3 sm:gap-4">
//                 {socialLinks.map((social, index) => (
//                   <motion.a
//                     key={index}
//                     href={social.url}
//                     initial={{ opacity: 0, scale: 0.8 }}
//                     animate={{ opacity: 1, scale: 1 }}
//                     transition={{ delay: index * 0.07 }}
//                     whileHover={{ scale: 1.1, rotate: 5 }}
//                     whileTap={{ scale: 0.95 }}
//                     className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg ${
//                       theme === "dark"
//                         ? "bg-gradient-to-r from-slate-700 to-slate-800 hover:from-amber-500 hover:to-rose-500"
//                         : "bg-gradient-to-r from-cream-200 to-cream-300 hover:from-amber-400 hover:to-rose-400"
//                     }`}
//                     aria-label={social.name}
//                   >
//                     {social.icon}
//                   </motion.a>
//                 ))}
//               </div>
//             </motion.div>

//             {/* Quick Links */}
//             <motion.div variants={fadeInUp} className="text-left">
//               <h3
//                 className={`text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2 transition-colors duration-300 ${
//                   theme === "dark" ? "text-white" : "text-cream-900"
//                 }`}
//               >
//                 <motion.div
//                   animate={{ scale: [1, 1.2, 1] }}
//                   transition={{ duration: 2, repeat: Infinity }}
//                   className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
//                     theme === "dark"
//                       ? "bg-gradient-to-r from-amber-500 to-rose-500"
//                       : "bg-gradient-to-r from-amber-400 to-rose-400"
//                   }`}
//                 />
//                 Quick Links
//               </h3>
//               <ul className="space-y-2 sm:space-y-3">
//                 {quickLinks.map((link, index) => (
//                   <motion.li
//                     key={index}
//                     variants={itemVariants}
//                     custom={index}
//                     className="text-left"
//                   >
//                     <button
//                       onClick={() => handleFooterLinkClick(link)}
//                       className={`transition-colors duration-300 flex items-center gap-2 group text-sm sm:text-base ${
//                         theme === "dark"
//                           ? "text-slate-400 hover:text-white"
//                           : "text-cream-700 hover:text-cream-900"
//                       }`}
//                     >
//                       <motion.span
//                         whileHover={{ scale: 1.3 }}
//                         className={`w-1 h-1 rounded-full transition-all duration-300 flex-shrink-0 ${
//                           theme === "dark"
//                             ? "bg-slate-600 group-hover:bg-gradient-to-r from-amber-500 to-rose-500"
//                             : "bg-cream-400 group-hover:bg-gradient-to-r from-amber-400 to-rose-400"
//                         }`}
//                       />
//                       {link.name}
//                     </button>
//                   </motion.li>
//                 ))}
//               </ul>
//             </motion.div>

//             {/* Customer Service */}
//             <motion.div variants={fadeInUp} className="text-left">
//               <h3
//                 className={`text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2 transition-colors duration-300 ${
//                   theme === "dark" ? "text-white" : "text-cream-900"
//                 }`}
//               >
//                 <motion.div
//                   animate={{ scale: [1, 1.2, 1] }}
//                   transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
//                   className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
//                     theme === "dark"
//                       ? "bg-gradient-to-r from-amber-500 to-rose-500"
//                       : "bg-gradient-to-r from-amber-400 to-rose-400"
//                   }`}
//                 />
//                 Customer Service
//               </h3>
//               <ul className="space-y-2 sm:space-y-3">
//                 {customerService.map((link, index) => (
//                   <motion.li
//                     key={index}
//                     variants={itemVariants}
//                     custom={index + 5}
//                     className="text-left"
//                   >
//                     {link.hash ? (
//                       <button
//                         onClick={() => handleFooterLinkClick(link)}
//                         className={`transition-colors duration-300 flex items-center gap-2 group text-sm sm:text-base ${
//                           theme === "dark"
//                             ? "text-slate-400 hover:text-white"
//                             : "text-cream-700 hover:text-cream-900"
//                         }`}
//                       >
//                         <motion.span
//                           whileHover={{ scale: 1.3 }}
//                           className={`w-1 h-1 rounded-full transition-all duration-300 flex-shrink-0 ${
//                             theme === "dark"
//                               ? "bg-slate-600 group-hover:bg-gradient-to-r from-amber-500 to-rose-500"
//                               : "bg-cream-400 group-hover:bg-gradient-to-r from-amber-400 to-rose-400"
//                           }`}
//                         />
//                         {link.name}
//                       </button>
//                     ) : (
//                       <Link
//                         to={link.path}
//                         className={`transition-colors duration-300 flex items-center gap-2 group text-sm sm:text-base ${
//                           theme === "dark"
//                             ? "text-slate-400 hover:text-white"
//                             : "text-cream-700 hover:text-cream-900"
//                         }`}
//                       >
//                         <motion.span
//                           whileHover={{ scale: 1.3 }}
//                           className={`w-1 h-1 rounded-full transition-all duration-300 flex-shrink-0 ${
//                             theme === "dark"
//                               ? "bg-slate-600 group-hover:bg-gradient-to-r from-amber-500 to-rose-500"
//                               : "bg-cream-400 group-hover:bg-gradient-to-r from-amber-400 to-rose-400"
//                           }`}
//                         />
//                         {link.name}
//                       </Link>
//                     )}
//                   </motion.li>
//                 ))}
//               </ul>
//             </motion.div>

//             {/* Contact Info */}
//             <motion.div
//               variants={slideInRight}
//               className="text-left sm:col-span-2 lg:col-span-1"
//             >
//               <h3
//                 className={`text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2 transition-colors duration-300 ${
//                   theme === "dark" ? "text-white" : "text-cream-900"
//                 }`}
//               >
//                 <motion.div
//                   animate={{ scale: [1, 1.2, 1] }}
//                   transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
//                   className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
//                     theme === "dark"
//                       ? "bg-gradient-to-r from-amber-500 to-rose-500"
//                       : "bg-gradient-to-r from-amber-400 to-rose-400"
//                   }`}
//                 />
//                 Contact Us
//               </h3>
//               <div className="space-y-4">
//                 {contactItems.map((item, index) => (
//                   <motion.div
//                     key={index}
//                     variants={itemVariants}
//                     className="flex items-start gap-3"
//                   >
//                     <motion.div
//                       whileHover={{ rotate: 360 }}
//                       transition={{ duration: 0.4 }}
//                       className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 mt-0.5 ${
//                         theme === "dark"
//                           ? "bg-gradient-to-r from-slate-700 to-slate-800"
//                           : "bg-gradient-to-r from-cream-200 to-cream-300"
//                       }`}
//                     >
//                       <span
//                         className={`text-sm sm:text-base ${
//                           theme === "dark" ? "text-amber-500" : "text-amber-600"
//                         }`}
//                       >
//                         {item.icon}
//                       </span>
//                     </motion.div>
//                     <div className="flex-1 min-w-0">
//                       <div
//                         className={`font-medium text-sm sm:text-base transition-colors duration-300 mb-0.5 ${
//                           theme === "dark" ? "text-white" : "text-cream-900"
//                         }`}
//                       >
//                         {item.title}
//                       </div>
//                       <div
//                         className={`text-xs sm:text-sm transition-colors duration-300 break-words ${
//                           theme === "dark" ? "text-slate-400" : "text-cream-700"
//                         }`}
//                       >
//                         {item.content}
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>
//           </div>

//           {/* Trust Badges */}
//           <motion.div variants={containerVariants} className="py-6 sm:py-8">
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
//               {trustBadges.map((badge, index) => (
//                 <motion.div
//                   key={index}
//                   variants={scaleIn}
//                   whileHover={{
//                     y: -6,
//                     scale: 1.02,
//                     transition: { type: "spring", stiffness: 400 },
//                   }}
//                   whileTap={{ scale: 0.98 }}
//                   className={`flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl backdrop-blur-sm transition-all duration-300 ${
//                     theme === "dark"
//                       ? "bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-slate-700/30"
//                       : "bg-gradient-to-r from-cream-100/50 to-cream-200/50 border border-cream-300/30"
//                   }`}
//                 >
//                   <motion.div
//                     animate={{ rotateY: [0, 360] }}
//                     transition={{
//                       duration: 4,
//                       repeat: Infinity,
//                       ease: "linear",
//                     }}
//                     className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
//                       theme === "dark" ? badge.color : badge.lightColor
//                     }`}
//                   >
//                     {badge.icon}
//                   </motion.div>
//                   <div
//                     className={`font-medium text-sm sm:text-base transition-colors duration-300 ${
//                       theme === "dark" ? "text-white" : "text-cream-900"
//                     }`}
//                   >
//                     {badge.text}
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>

//           {/* Bottom Section */}
//           <motion.div
//             variants={fadeInUp}
//             className={`pt-6 sm:pt-8 border-t transition-colors duration-300 ${
//               theme === "dark" ? "border-slate-700/50" : "border-cream-300"
//             }`}
//           >
//             <div className="flex flex-col gap-4 sm:gap-6">
//               <div
//                 className={`text-xs sm:text-sm text-center transition-colors duration-300 ${
//                   theme === "dark" ? "text-slate-400" : "text-cream-700"
//                 }`}
//               >
//                 © 2025 Ades. All rights reserved.
//               </div>

//               <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
//                 {company.slice(0, 3).map((link, index) => (
//                   <Link
//                     key={index}
//                     to={link.path}
//                     className={`text-xs sm:text-sm transition-colors duration-300 hover:underline ${
//                       theme === "dark"
//                         ? "text-slate-400 hover:text-white"
//                         : "text-cream-700 hover:text-cream-900"
//                     }`}
//                   >
//                     {link.name}
//                   </Link>
//                 ))}
//               </div>

//               <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
//                 {policies.slice(0, 3).map((link, index) => (
//                   <Link
//                     key={index}
//                     to={link.path}
//                     className={`text-xs sm:text-sm transition-colors duration-300 hover:underline ${
//                       theme === "dark"
//                         ? "text-slate-400 hover:text-white"
//                         : "text-cream-700 hover:text-cream-900"
//                     }`}
//                   >
//                     {link.name}
//                   </Link>
//                 ))}
//               </div>
//             </div>

//             <motion.div variants={scaleIn} className="mt-6 sm:mt-8 text-center">
//               <div
//                 className={`text-xs sm:text-sm transition-colors duration-300 ${
//                   theme === "dark" ? "text-slate-500" : "text-cream-600"
//                 }`}
//               >
//                 <div className="flex items-center justify-center gap-1.5 sm:gap-2">
//                   <span>Made with</span>
//                   <motion.div
//                     animate={{ scale: [1, 1.1, 1] }}
//                     transition={{ duration: 1.2, repeat: Infinity }}
//                   >
//                     <FaHeart className="text-rose-500 text-sm sm:text-base" />
//                   </motion.div>
//                   <span>
//                     by the{" "}
//                     <span className="text-amber-600 font-semibold">Ades</span>{" "}
//                     team
//                   </span>
//                 </div>
//                 <motion.div
//                   animate={{ y: [0, -3, 0] }}
//                   transition={{ duration: 1.5, repeat: Infinity }}
//                   className="mt-1.5 sm:mt-2"
//                 >
//                   <span
//                     className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs transition-all duration-300 inline-block ${
//                       theme === "dark"
//                         ? "bg-gradient-to-r from-slate-800 to-slate-900"
//                         : "bg-gradient-to-r from-cream-200 to-cream-300"
//                     }`}
//                   >
//                     Premium E-commerce Platform
//                   </span>
//                 </motion.div>
//               </div>
//             </motion.div>
//           </motion.div>
//         </div>

//         {/* Floating Chat Button */}
//         <motion.button
//           initial={{ opacity: 0, scale: 0, rotate: -180 }}
//           animate={{ opacity: 1, scale: 1, rotate: 0 }}
//           transition={{ duration: 0.4, type: "spring" }}
//           whileHover={{
//             scale: 1.05,
//             rotate: 5,
//             transition: { type: "spring", stiffness: 500 },
//           }}
//           whileTap={{ scale: 0.95 }}
//           className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-xl z-50 transition-all duration-300 ${
//             theme === "dark"
//               ? "bg-gradient-to-r from-amber-500 to-rose-500 shadow-amber-500/20"
//               : "bg-gradient-to-r from-amber-400 to-rose-400 shadow-amber-400/20"
//           }`}
//           aria-label="Chat with us"
//         >
//           <motion.div
//             animate={{ rotate: [0, 8, -8, 0] }}
//             transition={{ duration: 1.5, repeat: Infinity }}
//           >
//             <FaHeadset className="text-lg sm:text-xl" />
//           </motion.div>
//         </motion.button>
//       </motion.footer>
//     </>
//   );
// };

// export default Footer;
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterestP,
  FaYoutube,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaHeart,
  FaShieldAlt,
  FaTruck,
  FaCreditCard,
  FaHeadset,
} from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";

const Footer = () => {
  const [loading, setLoading] = useState(true);
  const [snowCount] = useState(100);
  const controls = useAnimation();
  const ref = React.useRef();
  const isInView = useInView(ref, { once: true, amount: 0.05 });
  const navigate = useNavigate();

  // Updated quick links with hash navigation
  const quickLinks = [
    { name: "Home", path: "/", hash: "#home" },
    { name: "Categories", path: "/#categories", hash: "#categories" },
    { name: "Products", path: "/#products", hash: "#products" },
    { name: "About", path: "/#about", hash: "#about" },
  ];

  // Updated customer service links with hash navigation
  const customerService = [
    { name: "Contact Us", path: "/#contact", hash: "#contact" },
    { name: "FAQs", path: "/#faqs", hash: "#faqs" },
    { name: "Shipping Info", path: "/#shipping", hash: "#shipping" },
    { name: "Return Policy", path: "/#policy", hash: "#policy" },
    { name: "Track Order", path: "/my-orders" },
  ];

  const company = [];

  const policies = [];

  const socialLinks = [
    { icon: <FaFacebookF />, name: "Facebook", url: "#" },
    { icon: <FaTwitter />, name: "Twitter", url: "#" },
    { icon: <FaInstagram />, name: "Instagram", url: "#" },
    { icon: <FaPinterestP />, name: "Pinterest", url: "#" },
    { icon: <FaYoutube />, name: "YouTube", url: "#" },
  ];

  const trustBadges = [
    {
      icon: <FaShieldAlt />,
      text: "Secure Payment",
      color: "from-blue-500 to-cyan-500",
      lightColor: "from-blue-400 to-cyan-400",
    },
    {
      icon: <FaTruck />,
      text: "Fast Delivery",
      color: "from-green-500 to-emerald-500",
      lightColor: "from-green-400 to-emerald-400",
    },
    {
      icon: <FaCreditCard />,
      text: "Easy Returns",
      color: "from-purple-500 to-pink-500",
      lightColor: "from-purple-400 to-pink-400",
    },
    {
      icon: <FaHeadset />,
      text: "24/7 Support",
      color: "from-amber-500 to-orange-500",
      lightColor: "from-amber-400 to-orange-400",
    },
  ];

  // Contact items
  const contactItems = [
    {
      icon: <FaPhone />,
      title: "Phone",
      content: "+(2519) 6462 3413",
    },
    {
      icon: <FaEnvelope />,
      title: "Email",
      content: "worknehtesfamicael707@gmail.com",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Address",
      content: "Platinum Plaza, Front of AU delegation",
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15,
        mass: 0.8,
      },
    },
  };

  const fadeInUp = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const scaleIn = {
    hidden: { scale: 0.85, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.34, 1.56, 0.64, 1],
      },
    },
  };

  const slideInLeft = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const slideInRight = {
    hidden: { x: 20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  // Handle footer link click
  const handleFooterLinkClick = (link) => {
    if (link.hash) {
      if (window.location.pathname === "/") {
        // Already on main page, scroll to section
        const element = document.getElementById(link.hash.replace("#", ""));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // Navigate to main page with hash
        navigate(`/${link.hash}`);
      }
    } else {
      navigate(link.path);
    }
  };

  // Optimized snowflakes for mobile
  const snowflakes = Array.from({ length: snowCount }).map((_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 8 + 6,
    delay: Math.random() * 3,
    x: Math.random() * 100,
    opacity: Math.random() * 0.4 + 0.2,
  }));

  return (
    <>
      {/* Loading Animation */}
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center bg-[#FFFBF5] dark:bg-slate-900"
        >
          <div className="relative w-full h-full overflow-hidden">
            {snowflakes.map((flake) => (
              <motion.div
                key={flake.id}
                className="absolute rounded-full bg-cream-600 dark:bg-slate-400"
                style={{
                  width: flake.size,
                  height: flake.size,
                  left: `${flake.x}%`,
                  opacity: flake.opacity,
                }}
                initial={{ y: -50 }}
                animate={{
                  y: [0, window.innerHeight + 50],
                  x: [
                    flake.x,
                    flake.x + Math.sin(flake.id) * 30,
                    flake.x - Math.cos(flake.id) * 30,
                  ],
                  rotate: 360,
                }}
                transition={{
                  duration: flake.duration,
                  delay: flake.delay,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <div className="w-16 h-16 rounded-full border-3 border-transparent border-t-amber-500 border-r-rose-500 animate-spin"></div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Background Snow */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {snowflakes.map((flake) => (
          <motion.div
            key={`bg-${flake.id}`}
            className="absolute rounded-full bg-cream-300/30 dark:bg-slate-400/30"
            style={{
              width: flake.size,
              height: flake.size,
              left: `${flake.x}%`,
              opacity: flake.opacity * 0.5,
            }}
            initial={{ y: -50 }}
            animate={{
              y: [0, window.innerHeight + 50],
              x: [
                flake.x,
                flake.x + Math.sin(flake.id) * 20,
                flake.x - Math.cos(flake.id) * 20,
              ],
              rotate: 360,
            }}
            transition={{
              duration: flake.duration * 1.2,
              delay: flake.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <motion.footer
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="relative z-10 pt-12 pb-8 w-full px-4 sm:px-6 overflow-hidden transition-all duration-500 bg-cream-50 dark:bg-slate-900"
      >
        <div className="max-w-7xl mx-auto w-full">
          {/* Top Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pb-8 sm:pb-12 border-b border-cream-300 dark:border-slate-700/50 transition-colors duration-300">
            {/* Logo & Description - Full width on mobile */}
            <motion.div
              variants={slideInLeft}
              className="space-y-4 sm:space-y-6 sm:col-span-2 lg:col-span-1"
            >
              <div className="flex items-center gap-3">
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-300 bg-gradient-to-r from-amber-400 to-rose-400 dark:from-amber-500 dark:to-rose-500"
                >
                  <IoSparkles className="text-lg sm:text-xl" />
                </motion.div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold transition-colors duration-300 text-cream-900 dark:text-white">
                    AdesCart
                  </div>
                  <div className="text-xs sm:text-sm transition-colors duration-300 text-cream-700 dark:text-slate-400">
                    Premium Shopping Experience
                  </div>
                </div>
              </div>
              <p className="text-sm sm:text-base leading-relaxed transition-colors duration-300 text-cream-700 dark:text-slate-400">
                Your trusted destination for premium products, exceptional
                quality, and outstanding customer service since 2025.
              </p>
              <div className="flex gap-3 sm:gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.07 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg bg-gradient-to-r from-cream-200 to-cream-300 hover:from-amber-400 hover:to-rose-400 dark:bg-gradient-to-r dark:from-slate-700 dark:to-slate-800 dark:hover:from-amber-500 dark:hover:to-rose-500"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={fadeInUp} className="text-left">
              <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2 transition-colors duration-300 text-cream-900 dark:text-white">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 bg-gradient-to-r from-amber-400 to-rose-400 dark:from-amber-500 dark:to-rose-500"
                />
                Quick Links
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={index}
                    variants={itemVariants}
                    custom={index}
                    className="text-left"
                  >
                    <button
                      onClick={() => handleFooterLinkClick(link)}
                      className="transition-colors duration-300 flex items-center gap-2 group text-sm sm:text-base text-cream-700 hover:text-cream-900 dark:text-slate-400 dark:hover:text-white"
                    >
                      <motion.span
                        whileHover={{ scale: 1.3 }}
                        className="w-1 h-1 rounded-full transition-all duration-300 flex-shrink-0 bg-cream-400 group-hover:bg-gradient-to-r from-amber-400 to-rose-400 dark:bg-slate-600 dark:group-hover:bg-gradient-to-r dark:from-amber-500 dark:to-rose-500"
                      />
                      {link.name}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Customer Service */}
            <motion.div variants={fadeInUp} className="text-left">
              <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2 transition-colors duration-300 text-cream-900 dark:text-white">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 bg-gradient-to-r from-amber-400 to-rose-400 dark:from-amber-500 dark:to-rose-500"
                />
                Customer Service
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {customerService.map((link, index) => (
                  <motion.li
                    key={index}
                    variants={itemVariants}
                    custom={index + 5}
                    className="text-left"
                  >
                    {link.hash ? (
                      <button
                        onClick={() => handleFooterLinkClick(link)}
                        className="transition-colors duration-300 flex items-center gap-2 group text-sm sm:text-base text-cream-700 hover:text-cream-900 dark:text-slate-400 dark:hover:text-white"
                      >
                        <motion.span
                          whileHover={{ scale: 1.3 }}
                          className="w-1 h-1 rounded-full transition-all duration-300 flex-shrink-0 bg-cream-400 group-hover:bg-gradient-to-r from-amber-400 to-rose-400 dark:bg-slate-600 dark:group-hover:bg-gradient-to-r dark:from-amber-500 dark:to-rose-500"
                        />
                        {link.name}
                      </button>
                    ) : (
                      <Link
                        to={link.path}
                        className="transition-colors duration-300 flex items-center gap-2 group text-sm sm:text-base text-cream-700 hover:text-cream-900 dark:text-slate-400 dark:hover:text-white"
                      >
                        <motion.span
                          whileHover={{ scale: 1.3 }}
                          className="w-1 h-1 rounded-full transition-all duration-300 flex-shrink-0 bg-cream-400 group-hover:bg-gradient-to-r from-amber-400 to-rose-400 dark:bg-slate-600 dark:group-hover:bg-gradient-to-r dark:from-amber-500 dark:to-rose-500"
                        />
                        {link.name}
                      </Link>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              variants={slideInRight}
              className="text-left sm:col-span-2 lg:col-span-1"
            >
              <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2 transition-colors duration-300 text-cream-900 dark:text-white">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
                  className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 bg-gradient-to-r from-amber-400 to-rose-400 dark:from-amber-500 dark:to-rose-500"
                />
                Contact Us
              </h3>
              <div className="space-y-4">
                {contactItems.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-start gap-3"
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.4 }}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 mt-0.5 bg-gradient-to-r from-cream-200 to-cream-300 dark:bg-gradient-to-r dark:from-slate-700 dark:to-slate-800"
                    >
                      <span className="text-sm sm:text-base text-amber-600 dark:text-amber-500">
                        {item.icon}
                      </span>
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm sm:text-base transition-colors duration-300 mb-0.5 text-cream-900 dark:text-white">
                        {item.title}
                      </div>
                      <div className="text-xs sm:text-sm transition-colors duration-300 break-words text-cream-700 dark:text-slate-400">
                        {item.content}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Trust Badges */}
          <motion.div variants={containerVariants} className="py-6 sm:py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {trustBadges.map((badge, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{
                    y: -6,
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 400 },
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl backdrop-blur-sm transition-all duration-300 bg-gradient-to-r from-cream-100/50 to-cream-200/50 border border-cream-300/30 dark:bg-gradient-to-r dark:from-slate-800/50 dark:to-slate-900/50 dark:border-slate-700/30"
                >
                  <motion.div
                    animate={{ rotateY: [0, 360] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                      badge.lightColor
                    } dark:${badge.color}`}
                  >
                    {badge.icon}
                  </motion.div>
                  <div className="font-medium text-sm sm:text-base transition-colors duration-300 text-cream-900 dark:text-white">
                    {badge.text}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bottom Section */}
          <motion.div
            variants={fadeInUp}
            className="pt-6 sm:pt-8 border-t border-cream-300 dark:border-slate-700/50 transition-colors duration-300"
          >
            <div className="flex flex-col gap-4 sm:gap-6">
              <div className="text-xs sm:text-sm text-center transition-colors duration-300 text-cream-700 dark:text-slate-400">
                © 2025 Ades. All rights reserved.
              </div>

              <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
                {company.slice(0, 3).map((link, index) => (
                  <Link
                    key={index}
                    to={link.path}
                    className="text-xs sm:text-sm transition-colors duration-300 hover:underline text-cream-700 hover:text-cream-900 dark:text-slate-400 dark:hover:text-white"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="flex flex-wrap justify-center gap-3 sm:gap-6">
                {policies.slice(0, 3).map((link, index) => (
                  <Link
                    key={index}
                    to={link.path}
                    className="text-xs sm:text-sm transition-colors duration-300 hover:underline text-cream-700 hover:text-cream-900 dark:text-slate-400 dark:hover:text-white"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <motion.div variants={scaleIn} className="mt-6 sm:mt-8 text-center">
              <div className="text-xs sm:text-sm transition-colors duration-300 text-cream-600 dark:text-slate-500">
                <div className="flex items-center justify-center gap-1.5 sm:gap-2">
                  <span>Made with</span>
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  >
                    <FaHeart className="text-rose-500 text-sm sm:text-base" />
                  </motion.div>
                  <span>
                    by the{" "}
                    <span className="text-amber-600 font-semibold">Ades</span>{" "}
                    team
                  </span>
                </div>
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="mt-1.5 sm:mt-2"
                >
                  <span className="px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs transition-all duration-300 inline-block bg-gradient-to-r from-cream-200 to-cream-300 dark:bg-gradient-to-r dark:from-slate-800 dark:to-slate-900">
                    Premium E-commerce Platform
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.footer>
    </>
  );
};

export default Footer;
