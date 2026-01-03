// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence, useInView } from "framer-motion";
// import {
//   FaShippingFast,
//   FaShieldAlt,
//   FaHeadset,
//   FaLeaf,
//   FaAward,
//   FaUsers,
//   FaStar,
//   FaHeart,
//   FaShoppingBag,
//   FaGlobeAmericas,
//   FaChevronUp,
// } from "react-icons/fa";
// import { IoDiamond, IoRocket } from "react-icons/io5";
// import AboutImage from "../assets/About.jpg";
// const AboutPage = () => {
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [scrollProgress, setScrollProgress] = useState(0);
//   const [isScrolling, setIsScrolling] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);

//   // Loading animation
//   useEffect(() => {
//     const timer = setTimeout(() => setIsLoading(false), 800);
//     return () => clearTimeout(timer);
//   }, []);

//   // Check system theme
//   useEffect(() => {
//     const darkModeMediaQuery = window.matchMedia(
//       "(prefers-color-scheme: dark)"
//     );
//     setIsDarkMode(darkModeMediaQuery.matches);

//     const handleChange = (e) => setIsDarkMode(e.matches);
//     darkModeMediaQuery.addEventListener("change", handleChange);

//     return () => darkModeMediaQuery.removeEventListener("change", handleChange);
//   }, []);

//   // Scroll animation
//   useEffect(() => {
//     const handleScroll = () => {
//       const scrolled = window.scrollY;
//       const maxScroll = document.body.scrollHeight - window.innerHeight;
//       const progress = (scrolled / maxScroll) * 100;
//       setScrollProgress(progress);
//       setIsScrolling(scrolled > 100);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const stats = [
//     {
//       number: "10,000+",
//       label: "Happy Customers",
//       icon: <FaUsers />,
//       color: "from-accent to-primaryBg",
//       delay: 0.1,
//     },
//     {
//       number: "500+",
//       label: "Premium Products",
//       icon: <FaShoppingBag />,
//       color: "from-primaryBg to-lightBg",
//       delay: 0.2,
//     },
//     {
//       number: "50+",
//       label: "Brand Partners",
//       icon: <FaStar />,
//       color: "from-lightBg to-accent",
//       delay: 0.3,
//     },
//     {
//       number: "24/7",
//       label: "Support Available",
//       icon: <FaHeadset />,
//       color: "from-accent/80 to-primaryBg/80",
//       delay: 0.4,
//     },
//   ];

//   const values = [
//     {
//       title: "Quality First",
//       description:
//         "We source only the finest products from trusted suppliers around the world.",
//       icon: <IoDiamond className="text-3xl" />,
//       color: "from-primaryBg to-lightBg",
//       delay: 0.1,
//     },
//     {
//       title: "Customer Love",
//       description:
//         "Your satisfaction is our top priority. We go above and beyond for every customer.",
//       icon: <FaHeart className="text-3xl" />,
//       color: "from-lightBg to-primaryBg",
//       delay: 0.2,
//     },
//     {
//       title: "Sustainable Choice",
//       description:
//         "Committed to eco-friendly practices and sustainable sourcing.",
//       icon: <FaLeaf className="text-3xl" />,
//       color: "from-primaryBg/90 to-accent/90",
//       delay: 0.3,
//     },
//     {
//       title: "Innovation",
//       description:
//         "Always evolving to bring you the latest trends and technology.",
//       icon: <IoRocket className="text-3xl" />,
//       color: "from-accent/90 to-primaryBg/90",
//       delay: 0.4,
//     },
//   ];

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.3,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//         damping: 12,
//       },
//     },
//   };

//   const cardVariants = {
//     offscreen: {
//       y: 50,
//       opacity: 0,
//       rotateX: 10,
//     },
//     onscreen: {
//       y: 0,
//       opacity: 1,
//       rotateX: 0,
//       transition: {
//         type: "spring",
//         bounce: 0.4,
//         duration: 0.8,
//       },
//     },
//   };

//   const floatingAnimation = {
//     y: [0, -10, 0],
//     transition: {
//       duration: 3,
//       repeat: Infinity,
//       ease: "easeInOut",
//     },
//   };

//   const pulseAnimation = {
//     scale: [1, 1.05, 1],
//     transition: {
//       duration: 2,
//       repeat: Infinity,
//       ease: "easeInOut",
//     },
//   };

//   return (
//     <>
//       {/* Loading Animation */}
//       <AnimatePresence>
//         {isLoading && (
//           <motion.div
//             initial={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.5 }}
//             className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-lightBg to-primaryBg dark:from-dark dark:to-accent"
//           >
//             <div className="relative">
//               <motion.div
//                 animate={pulseAnimation}
//                 className="w-24 h-24 rounded-full bg-gradient-to-r from-accent to-primaryBg"
//               />
//               <motion.div
//                 animate={floatingAnimation}
//                 className="absolute inset-0 flex items-center justify-center"
//               >
//                 <FaGlobeAmericas className="text-4xl text-white" />
//               </motion.div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <motion.div
//         initial={{ opacity: 0, scale: 0.98 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{
//           duration: 0.8,
//           ease: [0.43, 0.13, 0.23, 0.96],
//         }}
//         className="min-h-screen bg-gradient-to-br from-primaryBg via-lightBg to-primaryBg/80 dark:from-dark dark:via-dark/90 dark:to-dark pt-24 pb-12 overflow-hidden"
//         style={{
//           "--primaryBg": "#EEEEEE",
//           "--lightBg": "#D8C9A7",
//           "--accent": "#D7C097",
//           "--dark": "#111827",
//         }}
//       >
//         {/* Animated Background Elements */}
//         <div className="fixed inset-0 overflow-hidden pointer-events-none">
//           {[...Array(20)].map((_, i) => (
//             <motion.div
//               key={i}
//               className="absolute rounded-full bg-gradient-to-r from-accent/10 to-primaryBg/10 dark:from-accent/5 dark:to-lightBg/5"
//               initial={{
//                 x: Math.random() * 100 + "%",
//                 y: Math.random() * 100 + "%",
//                 scale: Math.random() * 0.5 + 0.5,
//                 opacity: Math.random() * 0.3 + 0.1,
//               }}
//               animate={{
//                 y: [
//                   null,
//                   `calc(${Math.random() * 100}% + ${Math.random() * 100 - 50}px)`,
//                 ],
//                 x: [
//                   null,
//                   `calc(${Math.random() * 100}% + ${Math.random() * 100 - 50}px)`,
//                 ],
//               }}
//               transition={{
//                 duration: Math.random() * 20 + 10,
//                 repeat: Infinity,
//                 ease: "linear",
//               }}
//               style={{
//                 width: Math.random() * 200 + 50,
//                 height: Math.random() * 200 + 50,
//               }}
//             />
//           ))}
//         </div>

//         {/* Enhanced Scroll Progress Bar */}
//         <motion.div
//           className="fixed top-0 left-0 h-1 z-50"
//           style={{ width: `${scrollProgress}%` }}
//           animate={{
//             background: [
//               "linear-gradient(90deg, #D7C097, #EEEEEE, #D7C097)",
//               "linear-gradient(90deg, #EEEEEE, #D7C097, #EEEEEE)",
//               "linear-gradient(90deg, #D7C097, #EEEEEE, #D7C097)",
//             ],
//             backgroundSize: "200% 100%",
//           }}
//           transition={{
//             duration: 2,
//             repeat: Infinity,
//             ease: "linear",
//           }}
//         />

//         {/* Back to Top Button */}
//         <AnimatePresence>
//           {isScrolling && (
//             <motion.button
//               initial={{ opacity: 0, scale: 0, rotate: -180 }}
//               animate={{
//                 opacity: 1,
//                 scale: 1,
//                 rotate: 0,
//                 transition: {
//                   type: "spring",
//                   stiffness: 200,
//                   damping: 15,
//                 },
//               }}
//               exit={{ opacity: 0, scale: 0, rotate: 180 }}
//               whileHover={{
//                 scale: 1.1,
//                 rotate: 360,
//                 transition: { duration: 0.3 },
//               }}
//               whileTap={{ scale: 0.9 }}
//               onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//               className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-accent to-primaryBg dark:from-accent dark:to-dark text-white rounded-full shadow-2xl flex items-center justify-center z-40 hover:shadow-3xl transition-all duration-300 group"
//             >
//               <motion.div
//                 className="absolute inset-0 rounded-full bg-gradient-to-r from-accent/80 to-primaryBg/80 opacity-0 group-hover:opacity-100 blur-xl"
//                 transition={{ duration: 0.3 }}
//               />
//               <FaChevronUp className="w-6 h-6 relative" />
//             </motion.button>
//           )}
//         </AnimatePresence>

//         {/* Hero Section */}
//         <section className="relative overflow-hidden">
//           <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-lightBg/5" />
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative py-12">
//             <div className="text-center">
//               <motion.div
//                 initial={{ scale: 0, rotate: -180 }}
//                 animate={{
//                   scale: 1,
//                   rotate: 0,
//                   transition: {
//                     type: "spring",
//                     stiffness: 200,
//                     damping: 15,
//                     delay: 0.2,
//                   },
//                 }}
//                 whileHover={{ scale: 1.1, rotate: 360 }}
//                 className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-accent to-primaryBg mb-8 shadow-2xl relative group"
//               >
//                 <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent/90 to-primaryBg/90 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
//                 <motion.div animate={floatingAnimation}>
//                   <FaGlobeAmericas className="text-4xl text-white relative" />
//                 </motion.div>
//               </motion.div>

//               <motion.div
//                 variants={containerVariants}
//                 initial="hidden"
//                 animate="visible"
//                 className="space-y-6"
//               >
//                 <motion.h1
//                   variants={itemVariants}
//                   className="text-5xl lg:text-7xl font-bold mb-6"
//                 >
//                   <span className="relative">
//                     <span className="bg-gradient-to-r from-dark via-accent to-dark dark:from-lightBg dark:via-accent dark:to-lightBg bg-clip-text text-transparent">
//                       Our Story
//                     </span>
//                     <motion.span
//                       className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-accent to-primaryBg rounded-full"
//                       initial={{ scaleX: 0 }}
//                       animate={{ scaleX: 1 }}
//                       transition={{ delay: 0.8, duration: 0.8 }}
//                     />
//                   </span>
//                 </motion.h1>

//                 <motion.p
//                   variants={itemVariants}
//                   className="text-xl lg:text-3xl text-dark/80 dark:text-accent max-w-3xl mx-auto mb-12 font-medium leading-relaxed"
//                 >
//                   Redefining online shopping with passion, quality, and
//                   exceptional service
//                 </motion.p>
//               </motion.div>
//             </div>
//           </div>
//         </section>

//         {/* Stats Section */}
//         <section className="py-12">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <motion.div
//               variants={containerVariants}
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true, margin: "-100px" }}
//               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
//             >
//               {stats.map((stat, index) => (
//                 <motion.div
//                   key={index}
//                   variants={{
//                     hidden: { y: 50, opacity: 0, scale: 0.8 },
//                     visible: {
//                       y: 0,
//                       opacity: 1,
//                       scale: 1,
//                       transition: {
//                         type: "spring",
//                         stiffness: 100,
//                         damping: 12,
//                         delay: stat.delay,
//                       },
//                     },
//                   }}
//                   whileHover={{
//                     y: -10,
//                     scale: 1.05,
//                     transition: { type: "spring", stiffness: 400, damping: 25 },
//                   }}
//                   whileTap={{ scale: 0.95 }}
//                   className="text-center p-8 rounded-3xl bg-gradient-to-br from-white/90 to-primaryBg/80 dark:from-dark/90 dark:to-accent/90 backdrop-blur-xl border border-primaryBg dark:border-accent/50 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
//                 >
//                   {/* Shimmer effect */}
//                   <motion.div
//                     className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
//                     initial={{ x: "-100%" }}
//                     whileHover={{ x: "100%" }}
//                     transition={{ duration: 0.6 }}
//                   />

//                   <motion.div
//                     initial={{ scale: 0 }}
//                     whileInView={{ scale: 1 }}
//                     transition={{ delay: stat.delay + 0.2, type: "spring" }}
//                     className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r ${stat.color} mb-6 relative group-hover:scale-110 transition-transform duration-300`}
//                   >
//                     <div className="text-3xl text-white">{stat.icon}</div>
//                     <div className="absolute inset-0 rounded-full bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                   </motion.div>

//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     whileInView={{ opacity: 1 }}
//                     transition={{ delay: stat.delay + 0.3 }}
//                     className="text-5xl lg:text-4xl font-bold bg-gradient-to-r from-dark to-accent dark:from-lightBg dark:to-accent bg-clip-text text-transparent mb-2"
//                   >
//                     {stat.number}
//                   </motion.div>

//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     whileInView={{ opacity: 1 }}
//                     transition={{ delay: stat.delay + 0.4 }}
//                     className="text-lg font-medium text-dark dark:text-lightBg"
//                   >
//                     {stat.label}
//                   </motion.div>
//                 </motion.div>
//               ))}
//             </motion.div>
//           </div>
//         </section>

//         {/* Mission Section */}
//         <section className="py-12">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
//               <motion.div
//                 initial={{ x: -100, opacity: 0 }}
//                 whileInView={{ x: 0, opacity: 1 }}
//                 transition={{
//                   type: "spring",
//                   stiffness: 50,
//                   damping: 20,
//                   delay: 0.2,
//                 }}
//                 viewport={{ once: true, margin: "-100px" }}
//               >
//                 <motion.div
//                   initial={{ scale: 0 }}
//                   whileInView={{ scale: 1 }}
//                   transition={{ delay: 0.3 }}
//                   className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent/10 to-lightBg/10 border border-accent/20 dark:border-accent/30 mb-6"
//                 >
//                   <motion.span
//                     initial={{ opacity: 0 }}
//                     whileInView={{ opacity: 1 }}
//                     transition={{ delay: 0.4 }}
//                     className="text-sm font-medium text-dark dark:text-accent"
//                   >
//                     Our Mission
//                   </motion.span>
//                 </motion.div>

//                 <motion.h2
//                   initial={{ y: 30, opacity: 0 }}
//                   whileInView={{ y: 0, opacity: 1 }}
//                   transition={{ delay: 0.4 }}
//                   className="text-3xl lg:text-5xl font-bold mb-6"
//                 >
//                   <span className="bg-gradient-to-r from-dark to-accent dark:from-lightBg dark:to-accent bg-clip-text text-transparent">
//                     Creating Exceptional Shopping Experiences
//                   </span>
//                 </motion.h2>

//                 <motion.div
//                   variants={containerVariants}
//                   initial="hidden"
//                   whileInView="visible"
//                   viewport={{ once: true }}
//                   className="space-y-6"
//                 >
//                   <motion.p
//                     variants={itemVariants}
//                     className="text-lg text-dark dark:text-lightBg leading-relaxed"
//                   >
//                     Founded in 2025, we started with a simple vision: to make
//                     premium products accessible to everyone. Today, we've grown
//                     into a trusted destination for quality-conscious shoppers
//                     who value excellence, reliability, and outstanding customer
//                     service.
//                   </motion.p>

//                   <motion.div
//                     variants={containerVariants}
//                     className="flex flex-wrap gap-4"
//                   >
//                     {[
//                       {
//                         icon: FaShippingFast,
//                         text: "Fast Shipping",
//                         color: "accent",
//                       },
//                       {
//                         icon: FaShieldAlt,
//                         text: "Secure Shopping",
//                         color: "accent",
//                       },
//                       {
//                         icon: FaAward,
//                         text: "Quality Guarantee",
//                         color: "accent",
//                       },
//                     ].map((item, idx) => (
//                       <motion.div
//                         key={idx}
//                         variants={itemVariants}
//                         whileHover={{
//                           scale: 1.05,
//                           y: -3,
//                           transition: { type: "spring", stiffness: 400 },
//                         }}
//                         className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-white/50 to-primaryBg/30 dark:from-dark/50 dark:to-accent/50 backdrop-blur-sm border border-white/20 dark:border-accent/20"
//                       >
//                         <item.icon className={`text-accent dark:text-accent`} />
//                         <span
//                           className={`text-sm font-medium text-dark dark:text-lightBg`}
//                         >
//                           {item.text}
//                         </span>
//                       </motion.div>
//                     ))}
//                   </motion.div>
//                 </motion.div>
//               </motion.div>

//               <motion.div
//                 initial={{ x: 100, opacity: 0, rotateY: 20 }}
//                 whileInView={{ x: 0, opacity: 1, rotateY: 0 }}
//                 transition={{
//                   type: "spring",
//                   stiffness: 50,
//                   damping: 20,
//                   delay: 0.4,
//                 }}
//                 viewport={{ once: true, margin: "-100px" }}
//                 className="relative"
//               >
//                 <motion.div
//                   whileHover={{ scale: 1.02 }}
//                   className="relative  h-[500px] overflow-hidden rounded-3xl p-1"
//                 >
//                   <div className="bg-white/90 dark:bg-dark/90 backdrop-blur-xl rounded-2xl shadow-2xl h-full w-full p-8">
//                     <motion.img
//                       initial={{ scale: 1.1, opacity: 0 }}
//                       whileInView={{ scale: 1, opacity: 1 }}
//                       transition={{ delay: 0.6, duration: 0.8 }}
//                       src={AboutImage}
//                       alt="Our Team"
//                       className="h-full   object-cover  w-full rounded-2xl"
//                     />
//                   </div>
//                 </motion.div>
//                 <motion.div
//                   animate={pulseAnimation}
//                   className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-r from-accent/20 to-lightBg/20 rounded-full blur-3xl"
//                 />
//                 <motion.div
//                   animate={{
//                     ...pulseAnimation,
//                     transition: { ...pulseAnimation.transition, delay: 1 },
//                   }}
//                   className="absolute -top-6 -left-6 w-48 h-48 bg-gradient-to-r from-accent/20 to-dark/20 rounded-full blur-3xl"
//                 />
//               </motion.div>
//             </div>
//           </div>
//         </section>

//         {/* Values Section */}
//         <section className="py-12">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <motion.div
//               initial={{ y: 50, opacity: 0 }}
//               whileInView={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.2 }}
//               viewport={{ once: true }}
//               className="text-center mb-12"
//             >
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-accent/10 to-lightBg/10 border border-accent/20 dark:border-accent/30 mb-6"
//               >
//                 <span className="text-sm font-medium text-dark dark:text-accent">
//                   Our Values
//                 </span>
//               </motion.div>

//               <h2 className="text-3xl lg:text-5xl font-bold mb-6">
//                 <span className="bg-gradient-to-r from-dark to-accent dark:from-lightBg dark:to-accent bg-clip-text text-transparent">
//                   What We Stand For
//                 </span>
//               </h2>

//               <motion.p
//                 initial={{ opacity: 0 }}
//                 whileInView={{ opacity: 1 }}
//                 transition={{ delay: 0.4 }}
//                 className="text-xl text-dark dark:text-lightBg max-w-3xl mx-auto"
//               >
//                 Our core principles guide everything we do
//               </motion.p>
//             </motion.div>

//             <motion.div
//               variants={containerVariants}
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true, margin: "-100px" }}
//               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
//             >
//               {values.map((value, index) => (
//                 <motion.div
//                   key={index}
//                   variants={cardVariants}
//                   whileHover={{
//                     y: -15,
//                     scale: 1.05,
//                     transition: { type: "spring", stiffness: 300 },
//                   }}
//                   whileTap={{ scale: 0.95 }}
//                   className={`p-8 rounded-3xl border backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br ${value.color} border-primaryBg dark:border-accent/50 relative overflow-hidden group`}
//                   style={{ transitionDelay: `${value.delay * 1000}ms` }}
//                 >
//                   {/* Floating background effect */}
//                   <motion.div
//                     className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
//                     initial={{ x: "-100%" }}
//                     whileHover={{ x: "100%" }}
//                     transition={{ duration: 0.6 }}
//                   />

//                   <motion.div
//                     initial={{ rotate: -180, scale: 0 }}
//                     whileInView={{ rotate: 0, scale: 1 }}
//                     transition={{ delay: value.delay + 0.2, type: "spring" }}
//                     className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-primaryBg to-lightBg dark:from-dark dark:to-accent mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300"
//                   >
//                     {value.icon}
//                   </motion.div>

//                   <motion.h3
//                     initial={{ opacity: 0, y: 10 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ delay: value.delay + 0.3 }}
//                     className="text-2xl font-bold text-dark dark:text-white mb-4"
//                   >
//                     {value.title}
//                   </motion.h3>

//                   <motion.p
//                     initial={{ opacity: 0 }}
//                     whileInView={{ opacity: 1 }}
//                     transition={{ delay: value.delay + 0.4 }}
//                     className="text-dark dark:text-lightBg"
//                   >
//                     {value.description}
//                   </motion.p>
//                 </motion.div>
//               ))}
//             </motion.div>
//           </div>
//         </section>

//         {/*
//         {/* CTA Section */}
//         <section className="py-12">
//           <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//             <motion.div
//               initial={{ y: 50, opacity: 0 }}
//               whileInView={{ y: 0, opacity: 1 }}
//               transition={{
//                 type: "spring",
//                 stiffness: 50,
//                 damping: 20,
//                 delay: 0.3,
//               }}
//               viewport={{ once: true }}
//               className="relative overflow-hidden rounded-3xl group"
//             >
//               {/* Animated gradient background */}
//               <motion.div
//                 className="absolute inset-0 bg-gradient-to-r from-accent/10 via-lightBg/10 to-dark/10"
//                 animate={{
//                   background: [
//                     "linear-gradient(45deg, rgba(215,192,151,0.1), rgba(216,201,167,0.1), rgba(17,24,39,0.1))",
//                     "linear-gradient(45deg, rgba(17,24,39,0.1), rgba(215,192,151,0.1), rgba(216,201,167,0.1))",
//                     "linear-gradient(45deg, rgba(216,201,167,0.1), rgba(17,24,39,0.1), rgba(215,192,151,0.1))",
//                   ],
//                 }}
//                 transition={{ duration: 10, repeat: Infinity }}
//               />

//               {/* Floating particles */}
//               {[...Array(10)].map((_, i) => (
//                 <motion.div
//                   key={i}
//                   className="absolute w-2 h-2 rounded-full bg-accent/30 dark:bg-accent/30"
//                   animate={{
//                     y: [0, -20, 0],
//                     x: [0, Math.random() * 20 - 10, 0],
//                     opacity: [0.3, 0.8, 0.3],
//                   }}
//                   transition={{
//                     duration: 3 + Math.random() * 2,
//                     repeat: Infinity,
//                     delay: Math.random() * 2,
//                   }}
//                   style={{
//                     left: `${Math.random() * 100}%`,
//                     top: `${Math.random() * 100}%`,
//                   }}
//                 />
//               ))}

//               <div className="relative bg-gradient-to-r from-accent/5 to-lightBg/5 border border-accent/20 dark:border-accent/30 backdrop-blur-xl rounded-3xl p-12 text-center">
//                 <motion.h2
//                   initial={{ scale: 0.9, opacity: 0 }}
//                   whileInView={{ scale: 1, opacity: 1 }}
//                   transition={{ delay: 0.4 }}
//                   className="text-3xl lg:text-5xl font-bold mb-6"
//                 >
//                   <span className="bg-gradient-to-r from-dark to-accent dark:from-lightBg dark:to-accent bg-clip-text text-transparent">
//                     Join Our Community
//                   </span>
//                 </motion.h2>

//                 <motion.p
//                   initial={{ y: 20, opacity: 0 }}
//                   whileInView={{ y: 0, opacity: 1 }}
//                   transition={{ delay: 0.5 }}
//                   className="text-xl text-dark dark:text-lightBg mb-8 max-w-2xl mx-auto"
//                 >
//                   Be part of our growing family of satisfied customers and
//                   experience shopping redefined.
//                 </motion.p>

//                 <motion.div
//                   initial={{ y: 20, opacity: 0 }}
//                   whileInView={{ y: 0, opacity: 1 }}
//                   transition={{ delay: 0.6 }}
//                   className="flex flex-wrap justify-center gap-6"
//                 >
//                   <motion.button
//                     whileHover={{
//                       scale: 1.05,
//                       boxShadow: "0 20px 40px rgba(215, 192, 151, 0.3)",
//                     }}
//                     whileTap={{ scale: 0.95 }}
//                     animate={pulseAnimation}
//                     className="px-10 py-5 rounded-xl bg-gradient-to-r from-accent to-primaryBg text-white font-bold text-lg hover:shadow-xl hover:shadow-accent/30 transition-all duration-300 relative overflow-hidden group"
//                   >
//                     <span className="relative z-10">Shop Now</span>
//                     <motion.div className="absolute inset-0 bg-gradient-to-r from-accent/90 to-primaryBg/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                   </motion.button>

//                   <motion.button
//                     whileHover={{
//                       scale: 1.05,
//                       boxShadow: "0 20px 40px rgba(238, 238, 238, 0.2)",
//                     }}
//                     whileTap={{ scale: 0.95 }}
//                     className="px-10 py-5 rounded-xl bg-gradient-to-r from-white/80 to-primaryBg/60 dark:from-accent/70 dark:to-dark text-dark dark:text-lightBg font-bold text-lg border-2 border-accent dark:border-accent hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
//                   >
//                     <span className="relative z-10">Contact Us</span>
//                     <motion.div className="absolute inset-0 bg-gradient-to-r from-white/20 to-primaryBg/10 dark:from-accent/20 dark:to-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                   </motion.button>
//                 </motion.div>
//               </div>
//             </motion.div>
//           </div>
//         </section>
//       </motion.div>
//     </>
//   );
// };

// export default AboutPage;
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  FaShippingFast,
  FaShieldAlt,
  FaHeadset,
  FaLeaf,
  FaAward,
  FaUsers,
  FaStar,
  FaHeart,
  FaShoppingBag,
  FaGlobeAmericas,
  FaChevronUp,
} from "react-icons/fa";
import { IoDiamond, IoRocket } from "react-icons/io5";
// import AboutImage from "../assets/About.jpg";

const AboutPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  const stats = [
    {
      number: "10,000+",
      label: "Happy Customers",
      icon: <FaUsers />,
      color: "from-[#D7C097] to-[#A38C5C]",
      delay: 0.1,
    },
    {
      number: "500+",
      label: "Premium Products",
      icon: <FaShoppingBag />,
      color: "from-[#D7C097] to-[#A38C5C]",
      delay: 0.2,
    },
    {
      number: "50+",
      label: "Brand Partners",
      icon: <FaStar />,
      color: "from-[#D7C097] to-[#A38C5C]",
      delay: 0.3,
    },
    {
      number: "24/7",
      label: "Support Available",
      icon: <FaHeadset />,
      color: "from-[#D7C097] to-[#A38C5C]",
      delay: 0.4,
    },
  ];

  const values = [
    {
      title: "Quality First",
      description:
        "We source only the finest products from trusted suppliers around the world.",
      icon: <IoDiamond className="text-3xl" />,
      color: "from-[#F8F5ED] to-[#ECE8DC] dark:from-gray-800 dark:to-gray-700",
      delay: 0.1,
    },
    {
      title: "Customer Love",
      description:
        "Your satisfaction is our top priority. We go above and beyond for every customer.",
      icon: <FaHeart className="text-3xl" />,
      color: "from-[#F8F5ED] to-[#ECE8DC] dark:from-gray-800 dark:to-gray-700",
      delay: 0.2,
    },
    {
      title: "Sustainable Choice",
      description:
        "Committed to eco-friendly practices and sustainable sourcing.",
      icon: <FaLeaf className="text-3xl" />,
      color: "from-[#F8F5ED] to-[#ECE8DC] dark:from-gray-800 dark:to-gray-700",
      delay: 0.3,
    },
    {
      title: "Innovation",
      description:
        "Always evolving to bring you the latest trends and technology.",
      icon: <IoRocket className="text-3xl" />,
      color: "from-[#F8F5ED] to-[#ECE8DC] dark:from-gray-800 dark:to-gray-700",
      delay: 0.4,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const cardVariants = {
    offscreen: {
      y: 50,
      opacity: 0,
      rotateX: 10,
    },
    onscreen: {
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
    y: [0, -10, 0],
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

  return (
    <>
      {/* Loading Animation */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#F8F5ED] to-[#ECE8DC] dark:from-gray-900 dark:to-gray-950"
          >
            <div className="relative">
              <motion.div
                animate={pulseAnimation}
                className="w-24 h-24 rounded-full bg-gradient-to-r from-[#D7C097] to-[#A38C5C]"
              />
              <motion.div
                animate={floatingAnimation}
                className="absolute inset-0 flex items-center justify-center"
              >
                <FaGlobeAmericas className="text-4xl text-white" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          ease: [0.43, 0.13, 0.23, 0.96],
        }}
        className="min-h-screen bg-gradient-to-br from-[#F8F5ED] via-white to-[#F8F5ED]/80 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-24 pb-12 overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-[#D7C097]/10 to-[#A38C5C]/10 dark:from-[#D7C097]/5 dark:to-[#A38C5C]/5"
              initial={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                scale: Math.random() * 0.5 + 0.5,
                opacity: Math.random() * 0.3 + 0.1,
              }}
              animate={{
                y: [
                  null,
                  `calc(${Math.random() * 100}% + ${Math.random() * 100 - 50}px)`,
                ],
                x: [
                  null,
                  `calc(${Math.random() * 100}% + ${Math.random() * 100 - 50}px)`,
                ],
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                width: Math.random() * 200 + 50,
                height: Math.random() * 200 + 50,
              }}
            />
          ))}
        </div>

        {/* Enhanced Scroll Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 h-1 z-50 bg-gradient-to-r from-[#D7C097] via-white to-[#A38C5C] dark:from-[#D7C097] dark:via-gray-800 dark:to-[#A38C5C]"
          style={{ width: `${scrollProgress}%` }}
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
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-[#D7C097] to-[#A38C5C] text-white rounded-full shadow-2xl flex items-center justify-center z-40 hover:shadow-3xl transition-all duration-300 group"
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-[#D7C097]/80 to-[#A38C5C]/80 opacity-0 group-hover:opacity-100 blur-xl"
                transition={{ duration: 0.3 }}
              />
              <FaChevronUp className="w-6 h-6 relative" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-[#D7C097]/5 via-transparent to-[#A38C5C]/5" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative py-12">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{
                  scale: 1,
                  rotate: 0,
                  transition: {
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay: 0.2,
                  },
                }}
                whileHover={{ scale: 1.1, rotate: 360 }}
                className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-[#D7C097] to-[#A38C5C] mb-8 shadow-2xl relative group"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#D7C097]/90 to-[#A38C5C]/90 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
                <motion.div animate={floatingAnimation}>
                  <FaGlobeAmericas className="text-4xl text-white relative" />
                </motion.div>
              </motion.div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                <motion.h1
                  variants={itemVariants}
                  className="text-5xl lg:text-7xl font-bold mb-6"
                >
                  <span className="relative">
                    <span className="bg-gradient-to-r from-gray-900 via-[#D7C097] to-gray-900 dark:from-gray-100 dark:via-[#D7C097] dark:to-gray-100 bg-clip-text text-transparent">
                      Our Story
                    </span>
                    <motion.span
                      className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-[#D7C097] to-[#A38C5C] rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.8, duration: 0.8 }}
                    />
                  </span>
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="text-xl lg:text-3xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-12 font-medium leading-relaxed"
                >
                  Redefining online shopping with passion, quality, and
                  exceptional service
                </motion.p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { y: 50, opacity: 0, scale: 0.8 },
                    visible: {
                      y: 0,
                      opacity: 1,
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 12,
                        delay: stat.delay,
                      },
                    },
                  }}
                  whileHover={{
                    y: -10,
                    scale: 1.05,
                    transition: { type: "spring", stiffness: 400, damping: 25 },
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="text-center p-8 rounded-3xl bg-white dark:bg-gray-800 backdrop-blur-xl border border-[#F8F5ED] dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 dark:via-gray-700/30 to-transparent"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />

                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: stat.delay + 0.2, type: "spring" }}
                    className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r ${stat.color} mb-6 relative group-hover:scale-110 transition-transform duration-300`}
                  >
                    <div className="text-3xl text-white">{stat.icon}</div>
                    <div className="absolute inset-0 rounded-full bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: stat.delay + 0.3 }}
                    className="text-5xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-[#D7C097] dark:from-gray-100 dark:to-[#D7C097] bg-clip-text text-transparent mb-2"
                  >
                    {stat.number}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: stat.delay + 0.4 }}
                    className="text-lg font-medium text-gray-700 dark:text-gray-300"
                  >
                    {stat.label}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <motion.div
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 50,
                  damping: 20,
                  delay: 0.2,
                }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#D7C097]/10 to-[#A38C5C]/10 border border-[#D7C097]/20 dark:border-[#D7C097]/30 mb-6"
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-sm font-medium text-gray-700 dark:text-[#D7C097]"
                  >
                    Our Mission
                  </motion.span>
                </motion.div>

                <motion.h2
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-3xl lg:text-5xl font-bold mb-6"
                >
                  <span className="bg-gradient-to-r from-gray-900 to-[#D7C097] dark:from-gray-100 dark:to-[#D7C097] bg-clip-text text-transparent">
                    Creating Exceptional Shopping Experiences
                  </span>
                </motion.h2>

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <motion.p
                    variants={itemVariants}
                    className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
                  >
                    Founded in 2025, we started with a simple vision: to make
                    premium products accessible to everyone. Today, we've grown
                    into a trusted destination for quality-conscious shoppers
                    who value excellence, reliability, and outstanding customer
                    service.
                  </motion.p>

                  <motion.div
                    variants={containerVariants}
                    className="flex flex-wrap gap-4"
                  >
                    {[
                      {
                        icon: FaShippingFast,
                        text: "Fast Shipping",
                      },
                      {
                        icon: FaShieldAlt,
                        text: "Secure Shopping",
                      },
                      {
                        icon: FaAward,
                        text: "Quality Guarantee",
                      },
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        variants={itemVariants}
                        whileHover={{
                          scale: 1.05,
                          y: -3,
                          transition: { type: "spring", stiffness: 400 },
                        }}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-white/50 to-[#F8F5ED]/30 dark:from-gray-800/50 dark:to-gray-700/50 backdrop-blur-sm border border-white/20 dark:border-gray-600/20"
                      >
                        <item.icon className="text-[#D7C097] dark:text-[#D7C097]" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {item.text}
                        </span>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ x: 100, opacity: 0, rotateY: 20 }}
                whileInView={{ x: 0, opacity: 1, rotateY: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 50,
                  damping: 20,
                  delay: 0.4,
                }}
                viewport={{ once: true, margin: "-100px" }}
                className="relative"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="relative h-[500px] overflow-hidden rounded-3xl p-1"
                >
                  <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl h-full w-full p-8">
                    <motion.img
                      initial={{ scale: 1.1, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                      src="/About.jpg"
                      alt="Our Team"
                      className="h-full object-cover w-full rounded-2xl"
                    />
                  </div>
                </motion.div>
                <motion.div
                  animate={pulseAnimation}
                  className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-r from-[#D7C097]/20 to-[#A38C5C]/20 rounded-full blur-3xl"
                />
                <motion.div
                  animate={{
                    ...pulseAnimation,
                    transition: { ...pulseAnimation.transition, delay: 1 },
                  }}
                  className="absolute -top-6 -left-6 w-48 h-48 bg-gradient-to-r from-[#D7C097]/20 to-gray-900/20 rounded-full blur-3xl"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#D7C097]/10 to-[#A38C5C]/10 border border-[#D7C097]/20 dark:border-[#D7C097]/30 mb-6"
              >
                <span className="text-sm font-medium text-gray-700 dark:text-[#D7C097]">
                  Our Values
                </span>
              </motion.div>

              <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-gray-900 to-[#D7C097] dark:from-gray-100 dark:to-[#D7C097] bg-clip-text text-transparent">
                  What We Stand For
                </span>
              </h2>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
              >
                Our core principles guide everything we do
              </motion.p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{
                    y: -15,
                    scale: 1.05,
                    transition: { type: "spring", stiffness: 300 },
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-8 rounded-3xl border backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br ${value.color} border-[#F8F5ED] dark:border-gray-700 relative overflow-hidden group`}
                  style={{ transitionDelay: `${value.delay * 1000}ms` }}
                >
                  {/* Floating background effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 dark:via-gray-700/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />

                  <motion.div
                    initial={{ rotate: -180, scale: 0 }}
                    whileInView={{ rotate: 0, scale: 1 }}
                    transition={{ delay: value.delay + 0.2, type: "spring" }}
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-[#D7C097] to-[#A38C5C] mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300"
                  >
                    <div className="text-3xl text-white">{value.icon}</div>
                  </motion.div>

                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: value.delay + 0.3 }}
                    className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4"
                  >
                    {value.title}
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: value.delay + 0.4 }}
                    className="text-gray-700 dark:text-gray-300"
                  >
                    {value.description}
                  </motion.p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 50,
                damping: 20,
                delay: 0.3,
              }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl group"
            >
              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#D7C097]/10 via-[#A38C5C]/10 to-gray-900/10 dark:from-[#D7C097]/10 dark:via-[#A38C5C]/10 dark:to-gray-800/10"
                animate={{
                  background: [
                    "linear-gradient(45deg, rgba(215,192,151,0.1), rgba(163,140,92,0.1), rgba(17,24,39,0.1))",
                    "linear-gradient(45deg, rgba(17,24,39,0.1), rgba(215,192,151,0.1), rgba(163,140,92,0.1))",
                    "linear-gradient(45deg, rgba(163,140,92,0.1), rgba(17,24,39,0.1), rgba(215,192,151,0.1))",
                  ],
                }}
                transition={{ duration: 10, repeat: Infinity }}
              />

              {/* Floating particles */}
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-[#D7C097]/30 dark:bg-[#D7C097]/30"
                  animate={{
                    y: [0, -20, 0],
                    x: [0, Math.random() * 20 - 10, 0],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                />
              ))}

              <div className="relative bg-gradient-to-r from-[#D7C097]/5 to-[#A38C5C]/5 border border-[#D7C097]/20 dark:border-[#D7C097]/30 backdrop-blur-xl rounded-3xl p-12 text-center">
                <motion.h2
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-3xl lg:text-5xl font-bold mb-6"
                >
                  <span className="bg-gradient-to-r from-gray-900 to-[#D7C097] dark:from-gray-100 dark:to-[#D7C097] bg-clip-text text-transparent">
                    Join Our Community
                  </span>
                </motion.h2>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
                >
                  Be part of our growing family of satisfied customers and
                  experience shopping redefined.
                </motion.p>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap justify-center gap-6"
                >
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(215, 192, 151, 0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    animate={pulseAnimation}
                    className="px-10 py-5 rounded-xl bg-gradient-to-r from-[#D7C097] to-[#A38C5C] text-white font-bold text-lg hover:shadow-xl hover:shadow-[#D7C097]/30 transition-all duration-300 relative overflow-hidden group"
                  >
                    <span className="relative z-10">Shop Now</span>
                    <motion.div className="absolute inset-0 bg-gradient-to-r from-[#D7C097]/90 to-[#A38C5C]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.button>

                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(215, 192, 151, 0.2)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-5 rounded-xl bg-gradient-to-r from-white/80 to-[#F8F5ED]/60 dark:from-gray-800/80 dark:to-gray-700/60 text-gray-700 dark:text-gray-300 font-bold text-lg border-2 border-[#D7C097] dark:border-[#D7C097] hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                  >
                    <span className="relative z-10">Contact Us</span>
                    <motion.div className="absolute inset-0 bg-gradient-to-r from-white/20 to-[#F8F5ED]/10 dark:from-[#D7C097]/20 dark:to-gray-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </>
  );
};

export default AboutPage;
