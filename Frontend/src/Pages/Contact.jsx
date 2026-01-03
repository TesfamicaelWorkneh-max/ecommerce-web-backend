// import React, { useState, useEffect, useRef } from "react";
// import { motion, AnimatePresence, useInView } from "framer-motion";
// import toast from "react-hot-toast";
// import {
//   FaPhone,
//   FaEnvelope,
//   FaMapMarkerAlt,
//   FaClock,
//   FaPaperPlane,
//   FaUser,
//   FaTag,
//   FaComment,
//   FaCheckCircle,
//   FaChevronUp,
//   FaHeadset,
//   FaBuilding,
//   FaGlobe,
// } from "react-icons/fa";
// import { IoChatbubbleEllipses, IoLogoWhatsapp } from "react-icons/io5";
// import { MdSupportAgent } from "react-icons/md";
// import { fetchWithAuth } from "../utils/auth";

// const BACKEND_URL = import.meta.env.VITE_API_URL;

// const ContactPage = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [scrollProgress, setScrollProgress] = useState(0);
//   const [isScrolling, setIsScrolling] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const containerRef = useRef(null);

//   // Loading animation
//   useEffect(() => {
//     const timer = setTimeout(() => setIsLoading(false), 800);
//     return () => clearTimeout(timer);
//   }, []);

//   // Enhanced scroll animation with momentum
//   useEffect(() => {
//     let lastScrollY = window.scrollY;
//     let ticking = false;

//     const handleScroll = () => {
//       lastScrollY = window.scrollY;

//       if (!ticking) {
//         window.requestAnimationFrame(() => {
//           const scrolled = lastScrollY;
//           const maxScroll = document.body.scrollHeight - window.innerHeight;
//           const progress = (scrolled / maxScroll) * 100;
//           setScrollProgress(progress);
//           setIsScrolling(scrolled > 100);
//           ticking = false;
//         });
//         ticking = true;
//       }
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       const response = await fetchWithAuth(`${BACKEND_URL}/api/contact`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         toast.success("Message sent successfully! We'll get back to you soon.");
//         setFormData({ name: "", email: "", subject: "", message: "" });

//         // Success animation
//         const form = e.target;
//         form.classList.add("success-animation");
//         setTimeout(() => {
//           form.classList.remove("success-animation");
//         }, 2000);
//       } else {
//         toast.error(
//           data.message || "Failed to send message. Please try again."
//         );
//       }
//     } catch (error) {
//       toast.error("Network error. Please check your connection.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const contactInfo = [
//     {
//       icon: <FaPhone />,
//       title: "Call Us",
//       details: ["+251 96 462 3413", "+251 92 683 0205"],
//       color: "from-[#D7C097] to-[#A38C5C]",
//       action: "tel:+251964623413",
//       delay: 0.1,
//       rotation: 5,
//     },
//     {
//       icon: <FaEnvelope />,
//       title: "Email Us",
//       details: [
//         "worknehtesfamicael707@gmail.com",
//         "biruktawithabtamu686@gmail.com",
//       ],
//       color: "from-[#D7C097] to-[#A38C5C]",
//       action: "mailto:worknehtesfamicael707@gmail.com",
//       delay: 0.2,
//       rotation: -3,
//     },
//     {
//       icon: <FaMapMarkerAlt />,
//       title: "Visit Us",
//       details: ["Platinum Plaza", "Front of EU Delegation"],
//       color: "from-[#D7C097] to-[#A38C5C]",
//       action: "https://maps.google.com",
//       delay: 0.3,
//       rotation: 2,
//     },
//     {
//       icon: <FaClock />,
//       title: "Hours",
//       details: ["Mon-Fri: 9AM-6PM", "Sat-Sun: 10AM-4PM"],
//       color: "from-[#D7C097] to-[#A38C5C]",
//       action: null,
//       delay: 0.4,
//       rotation: -5,
//     },
//   ];

//   const faqs = [
//     {
//       q: "How quickly will I get a response?",
//       a: "We respond to all inquiries within 24 hours during business days.",
//       delay: 0.1,
//     },
//     {
//       q: "Do you have phone support?",
//       a: "Yes! Call us anytime between 9AM-6PM, Monday through Friday.",
//       delay: 0.2,
//     },
//     {
//       q: "Can I visit your office?",
//       a: "Our office is open for appointments. Please contact us to schedule a visit.",
//       delay: 0.3,
//     },
//     {
//       q: "Do you offer bulk order support?",
//       a: "Absolutely! Contact our sales team for bulk orders and corporate discounts.",
//       delay: 0.4,
//     },
//   ];

//   const socialContacts = [
//     {
//       icon: <IoLogoWhatsapp />,
//       label: "WhatsApp",
//       color: "from-[#D7C097] to-[#A38C5C]",
//       delay: 0.1,
//     },
//     {
//       icon: <FaHeadset />,
//       label: "Live Chat",
//       color: "from-[#D7C097] to-[#A38C5C]",
//       delay: 0.2,
//     },
//     {
//       icon: <MdSupportAgent />,
//       label: "Support",
//       color: "from-[#D7C097] to-[#A38C5C]",
//       delay: 0.3,
//     },
//   ];

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { y: 30, opacity: 0, scale: 0.95 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       scale: 1,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//         damping: 15,
//       },
//     },
//   };

//   const cardVariants = {
//     hidden: { y: 50, opacity: 0, rotateX: 10 },
//     visible: {
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
//     y: [0, -8, 0],
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

//   const rotateAnimation = {
//     rotate: [0, 360],
//     transition: {
//       duration: 20,
//       repeat: Infinity,
//       ease: "linear",
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
//             className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#F8F5ED] to-[#ECE8DC] dark:from-gray-900 dark:to-gray-950"
//           >
//             <div className="relative">
//               <motion.div
//                 animate={pulseAnimation}
//                 className="w-24 h-24 rounded-full bg-gradient-to-r from-[#D7C097] to-[#A38C5C]"
//               />
//               <motion.div
//                 animate={floatingAnimation}
//                 className="absolute inset-0 flex items-center justify-center"
//               >
//                 <IoChatbubbleEllipses className="text-4xl text-white" />
//               </motion.div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <motion.div
//         ref={containerRef}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.6 }}
//         className="min-h-screen bg-gradient-to-br from-[#F8F5ED] via-white to-[#F8F5ED]/80 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-24 pb-12 overflow-hidden relative max-sm:py-32"
//       >
//         {/* Animated Background Elements */}
//         <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
//           {[...Array(15)].map((_, i) => (
//             <motion.div
//               key={i}
//               className="absolute rounded-full bg-gradient-to-r from-[#D7C097]/5 to-[#A38C5C]/5 dark:from-[#D7C097]/3 dark:to-[#A38C5C]/3"
//               initial={{
//                 x: Math.random() * 100 + "%",
//                 y: Math.random() * 100 + "%",
//                 scale: Math.random() * 0.3 + 0.3,
//                 opacity: Math.random() * 0.2 + 0.1,
//               }}
//               animate={{
//                 y: [
//                   null,
//                   `calc(${Math.random() * 100}% + ${Math.random() * 50 - 25}px)`,
//                 ],
//                 x: [
//                   null,
//                   `calc(${Math.random() * 100}% + ${Math.random() * 50 - 25}px)`,
//                 ],
//               }}
//               transition={{
//                 duration: Math.random() * 15 + 10,
//                 repeat: Infinity,
//                 ease: "linear",
//               }}
//               style={{
//                 width: Math.random() * 100 + 50,
//                 height: Math.random() * 100 + 50,
//               }}
//             />
//           ))}
//         </div>

//         {/* Enhanced Scroll Progress Bar */}
//         <motion.div
//           className="fixed top-0 left-0 h-1.5 z-40 bg-gradient-to-r from-[#D7C097] via-white to-[#A38C5C] dark:from-[#D7C097] dark:via-gray-800 dark:to-[#A38C5C]"
//           style={{ width: `${scrollProgress}%` }}
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
//                 boxShadow: "0 0 30px rgba(215, 192, 151, 0.5)",
//               }}
//               whileTap={{ scale: 0.9 }}
//               onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//               className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-[#D7C097] to-[#A38C5C] text-white rounded-full shadow-2xl flex items-center justify-center z-40 hover:shadow-3xl transition-all duration-300 group"
//             >
//               <motion.div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#D7C097]/80 to-[#A38C5C]/80 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
//               <FaChevronUp className="w-6 h-6 relative" />
//             </motion.button>
//           )}
//         </AnimatePresence>

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           {/* Header */}
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             animate="visible"
//             className="text-center mb-16 relative"
//           >
//             <div className="relative inline-block">
//               <motion.div
//                 initial={{ scale: 0, rotate: -180 }}
//                 animate={{
//                   scale: 1,
//                   rotate: 0,
//                   transition: {
//                     type: "spring",
//                     stiffness: 200,
//                     damping: 15,
//                   },
//                 }}
//                 whileHover={{ scale: 1.1, rotate: 360 }}
//                 className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-[#D7C097] to-[#A38C5C] mb-6 shadow-2xl group relative"
//               >
//                 <motion.div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#D7C097]/80 to-[#A38C5C]/80 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
//                 <motion.div animate={floatingAnimation}>
//                   <IoChatbubbleEllipses className="text-4xl text-white relative" />
//                 </motion.div>
//               </motion.div>

//               {/* Orbiting circles */}
//               {[0, 120, 240].map((rotation, i) => (
//                 <motion.div
//                   key={i}
//                   className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-[#F8F5ED]/80 to-white/80 dark:from-gray-800/80 dark:to-gray-700/80"
//                   animate={{
//                     rotate: rotation,
//                     x: [0, 60 * Math.cos((rotation * Math.PI) / 180), 0],
//                     y: [0, 60 * Math.sin((rotation * Math.PI) / 180), 0],
//                   }}
//                   transition={{
//                     duration: 4,
//                     repeat: Infinity,
//                     ease: "easeInOut",
//                     delay: i * 0.3,
//                   }}
//                   style={{
//                     top: "50%",
//                     left: "50%",
//                     marginLeft: -8,
//                     marginTop: -8,
//                   }}
//                 />
//               ))}
//             </div>

//             <motion.h1
//               variants={itemVariants}
//               className="text-4xl lg:text-6xl font-bold mb-6 relative"
//             >
//               <span className="bg-gradient-to-r from-gray-900 via-[#D7C097] to-gray-900 dark:from-gray-100 dark:via-[#D7C097] dark:to-gray-100 bg-clip-text text-transparent">
//                 Get in Touch
//               </span>
//               <motion.span
//                 className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-[#D7C097] to-[#A38C5C] rounded-full"
//                 initial={{ scaleX: 0 }}
//                 animate={{ scaleX: 1 }}
//                 transition={{ delay: 0.8, duration: 0.8 }}
//               />
//             </motion.h1>

//             <motion.p
//               variants={itemVariants}
//               className="text-xl lg:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
//             >
//               Have questions? We're here to help. Reach out anytime!
//             </motion.p>
//           </motion.div>

//           {/* Contact Cards */}
//           <motion.div
//             variants={containerVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, margin: "-100px" }}
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
//           >
//             {contactInfo.map((info, index) => (
//               <motion.div
//                 key={index}
//                 custom={index}
//                 variants={{
//                   hidden: {
//                     y: 50,
//                     opacity: 0,
//                     scale: 0.8,
//                     rotate: info.rotation,
//                   },
//                   visible: {
//                     y: 0,
//                     opacity: 1,
//                     scale: 1,
//                     rotate: 0,
//                     transition: {
//                       type: "spring",
//                       stiffness: 100,
//                       damping: 12,
//                       delay: info.delay,
//                     },
//                   },
//                 }}
//                 whileHover={{
//                   y: -10,
//                   scale: 1.05,
//                   rotate: info.rotation,
//                   transition: { type: "spring", stiffness: 400, damping: 25 },
//                 }}
//                 whileTap={{ scale: 0.95 }}
//                 className={`p-8 rounded-3xl bg-white dark:bg-gray-800 backdrop-blur-xl border border-[#F8F5ED] dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group ${
//                   info.action ? "cursor-pointer" : "cursor-default"
//                 }`}
//                 onClick={() =>
//                   info.action && window.open(info.action, "_blank")
//                 }
//               >
//                 {/* Shimmer effect */}
//                 <motion.div
//                   className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-gray-700/20 to-transparent"
//                   initial={{ x: "-100%" }}
//                   whileHover={{ x: "100%" }}
//                   transition={{ duration: 0.6 }}
//                 />

//                 <motion.div
//                   initial={{ scale: 0, rotate: -180 }}
//                   whileInView={{ scale: 1, rotate: 0 }}
//                   transition={{ delay: info.delay + 0.2, type: "spring" }}
//                   className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${info.color} mb-6 relative group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}
//                 >
//                   <motion.div
//                     animate={floatingAnimation}
//                     className="text-2xl text-white"
//                   >
//                     {info.icon}
//                   </motion.div>
//                   <div className="absolute inset-0 rounded-full bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                 </motion.div>

//                 <motion.h3
//                   initial={{ opacity: 0, y: 10 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ delay: info.delay + 0.3 }}
//                   className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3"
//                 >
//                   {info.title}
//                 </motion.h3>

//                 <div className="space-y-2">
//                   {info.details.map((detail, idx) => (
//                     <motion.p
//                       key={idx}
//                       initial={{ opacity: 0, x: -10 }}
//                       whileInView={{ opacity: 1, x: 0 }}
//                       transition={{ delay: info.delay + 0.4 + idx * 0.1 }}
//                       className="text-gray-700 dark:text-gray-300"
//                     >
//                       {detail}
//                     </motion.p>
//                   ))}
//                 </div>
//               </motion.div>
//             ))}
//           </motion.div>

//           <div className="grid lg:grid-cols-3 gap-12">
//             {/* Contact Form */}
//             <motion.div
//               initial={{ x: -50, opacity: 0 }}
//               whileInView={{ x: 0, opacity: 1 }}
//               transition={{
//                 type: "spring",
//                 stiffness: 50,
//                 damping: 20,
//                 delay: 0.2,
//               }}
//               viewport={{ once: true, margin: "-100px" }}
//               className="lg:col-span-2"
//             >
//               <div className="p-8 rounded-3xl bg-white dark:bg-gray-800 backdrop-blur-xl border border-[#F8F5ED] dark:border-gray-700 shadow-xl relative overflow-hidden">
//                 <div className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-r from-[#D7C097]/10 to-[#A38C5C]/10 dark:from-[#D7C097]/5 dark:to-[#A38C5C]/5 rounded-full blur-2xl" />

//                 <motion.h2
//                   initial={{ opacity: 0, y: -20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.3 }}
//                   className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2"
//                 >
//                   Send us a Message
//                 </motion.h2>

//                 <motion.p
//                   initial={{ opacity: 0 }}
//                   whileInView={{ opacity: 1 }}
//                   transition={{ delay: 0.4 }}
//                   className="text-lg text-gray-700 dark:text-gray-300 mb-8"
//                 >
//                   Fill out the form below and we'll get back to you as soon as
//                   possible.
//                 </motion.p>

//                 <form onSubmit={handleSubmit} className="space-y-6 relative">
//                   {/* Floating particles in form */}
//                   {[...Array(5)].map((_, i) => (
//                     <motion.div
//                       key={i}
//                       className="absolute w-2 h-2 rounded-full bg-[#D7C097]/30 dark:bg-[#D7C097]/30"
//                       animate={{
//                         y: [0, -20, 0],
//                         opacity: [0.3, 0.8, 0.3],
//                       }}
//                       transition={{
//                         duration: 3 + Math.random() * 2,
//                         repeat: Infinity,
//                         delay: Math.random() * 2,
//                       }}
//                       style={{
//                         left: `${Math.random() * 100}%`,
//                         top: `${Math.random() * 100}%`,
//                       }}
//                     />
//                   ))}

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <motion.div
//                       initial={{ opacity: 0, y: 20 }}
//                       whileInView={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 0.5 }}
//                     >
//                       <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-3 font-medium">
//                         <motion.div
//                           animate={pulseAnimation}
//                           className="flex-shrink-0"
//                         >
//                           <FaUser className="text-[#D7C097] dark:text-[#D7C097]" />
//                         </motion.div>
//                         Your Name
//                       </label>
//                       <motion.input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         required
//                         whileFocus={{ scale: 1.02 }}
//                         className="w-full px-4 py-4 rounded-xl bg-gradient-to-r from-[#F8F5ED] to-white/50 dark:from-gray-800/50 dark:to-gray-700/50 border border-[#F8F5ED] dark:border-gray-600 focus:border-[#D7C097] focus:ring-2 focus:ring-[#D7C097]/20 focus:outline-none transition-all duration-300 text-gray-900 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400"
//                         placeholder="John Doe"
//                       />
//                     </motion.div>

//                     <motion.div
//                       initial={{ opacity: 0, y: 20 }}
//                       whileInView={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 0.6 }}
//                     >
//                       <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-3 font-medium">
//                         <motion.div
//                           animate={pulseAnimation}
//                           transition={{ delay: 0.5 }}
//                           className="flex-shrink-0"
//                         >
//                           <FaEnvelope className="text-[#D7C097] dark:text-[#D7C097]" />
//                         </motion.div>
//                         Email Address
//                       </label>
//                       <motion.input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                         whileFocus={{ scale: 1.02 }}
//                         className="w-full px-4 py-4 rounded-xl bg-gradient-to-r from-[#F8F5ED] to-white/50 dark:from-gray-800/50 dark:to-gray-700/50 border border-[#F8F5ED] dark:border-gray-600 focus:border-[#D7C097] focus:ring-2 focus:ring-[#D7C097]/20 focus:outline-none transition-all duration-300 text-gray-900 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400"
//                         placeholder="john@example.com"
//                       />
//                     </motion.div>
//                   </div>

//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.7 }}
//                   >
//                     <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-3 font-medium">
//                       <motion.div
//                         animate={pulseAnimation}
//                         transition={{ delay: 0.6 }}
//                         className="flex-shrink-0"
//                       >
//                         <FaTag className="text-[#D7C097] dark:text-[#D7C097]" />
//                       </motion.div>
//                       Subject
//                     </label>
//                     <motion.input
//                       type="text"
//                       name="subject"
//                       value={formData.subject}
//                       onChange={handleChange}
//                       required
//                       whileFocus={{ scale: 1.02 }}
//                       className="w-full px-4 py-4 rounded-xl bg-gradient-to-r from-[#F8F5ED] to-white/50 dark:from-gray-800/50 dark:to-gray-700/50 border border-[#F8F5ED] dark:border-gray-600 focus:border-[#D7C097] focus:ring-2 focus:ring-[#D7C097]/20 focus:outline-none transition-all duration-300 text-gray-900 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400"
//                       placeholder="How can we help you?"
//                     />
//                   </motion.div>

//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.8 }}
//                   >
//                     <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-3 font-medium">
//                       <motion.div
//                         animate={pulseAnimation}
//                         transition={{ delay: 0.7 }}
//                         className="flex-shrink-0"
//                       >
//                         <FaComment className="text-[#D7C097] dark:text-[#D7C097]" />
//                       </motion.div>
//                       Your Message
//                     </label>
//                     <motion.textarea
//                       name="message"
//                       value={formData.message}
//                       onChange={handleChange}
//                       required
//                       rows={6}
//                       whileFocus={{ scale: 1.01 }}
//                       className="w-full px-4 py-4 rounded-xl bg-gradient-to-r from-[#F8F5ED] to-white/50 dark:from-gray-800/50 dark:to-gray-700/50 border border-[#F8F5ED] dark:border-gray-600 focus:border-[#D7C097] focus:ring-2 focus:ring-[#D7C097]/20 focus:outline-none transition-all duration-300 text-gray-900 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 resize-none"
//                       placeholder="Tell us more about your inquiry..."
//                     />
//                   </motion.div>

//                   <motion.button
//                     type="submit"
//                     disabled={isSubmitting}
//                     whileHover={{
//                       scale: 1.02,
//                       boxShadow: "0 20px 40px rgba(215, 192, 151, 0.3)",
//                     }}
//                     whileTap={{ scale: 0.98 }}
//                     animate={isSubmitting ? undefined : pulseAnimation}
//                     className="w-full py-5 rounded-xl bg-gradient-to-r from-[#D7C097] to-[#A38C5C] text-white font-bold text-lg shadow-xl hover:shadow-2xl hover:shadow-[#D7C097]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 relative overflow-hidden group"
//                   >
//                     {/* Button shine effect */}
//                     <motion.div className="absolute inset-0 bg-gradient-to-r from-[#D7C097]/90 to-[#A38C5C]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

//                     {isSubmitting ? (
//                       <motion.div
//                         initial={{ rotate: 0 }}
//                         animate={{ rotate: 360 }}
//                         transition={{
//                           duration: 1,
//                           repeat: Infinity,
//                           ease: "linear",
//                         }}
//                         className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
//                       />
//                     ) : (
//                       <motion.div animate={floatingAnimation}>
//                         <FaPaperPlane className="text-xl" />
//                       </motion.div>
//                     )}
//                     <span className="relative z-10">
//                       {isSubmitting ? "Sending..." : "Send Message"}
//                     </span>
//                   </motion.button>
//                 </form>
//               </div>
//             </motion.div>

//             {/* Right Column */}
//             <motion.div
//               initial={{ x: 50, opacity: 0 }}
//               whileInView={{ x: 0, opacity: 1 }}
//               transition={{
//                 type: "spring",
//                 stiffness: 50,
//                 damping: 20,
//                 delay: 0.3,
//               }}
//               viewport={{ once: true, margin: "-100px" }}
//               className="space-y-8"
//             >
//               {/* Quick Connect */}
//               <motion.div
//                 initial={{ y: 30, opacity: 0 }}
//                 whileInView={{ y: 0, opacity: 1 }}
//                 transition={{ delay: 0.4 }}
//                 viewport={{ once: true }}
//                 className="p-8 rounded-3xl bg-gradient-to-br from-[#D7C097]/10 to-[#A38C5C]/10 dark:from-[#D7C097]/5 dark:to-[#A38C5C]/5 border border-[#D7C097]/20 dark:border-[#D7C097]/30 backdrop-blur-xl shadow-xl"
//               >
//                 <motion.h3
//                   initial={{ opacity: 0 }}
//                   whileInView={{ opacity: 1 }}
//                   transition={{ delay: 0.5 }}
//                   className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6"
//                 >
//                   Quick Connect
//                 </motion.h3>

//                 <div className="grid grid-cols-3 gap-4 mb-6">
//                   {socialContacts.map((contact, index) => (
//                     <motion.button
//                       key={index}
//                       initial={{ scale: 0 }}
//                       whileInView={{ scale: 1 }}
//                       transition={{ delay: contact.delay }}
//                       whileHover={{
//                         y: -5,
//                         scale: 1.1,
//                         transition: { type: "spring", stiffness: 400 },
//                       }}
//                       whileTap={{ scale: 0.95 }}
//                       className={`aspect-square rounded-2xl bg-gradient-to-r ${contact.color} flex flex-col items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300`}
//                     >
//                       <div className="text-2xl mb-1">{contact.icon}</div>
//                       <span className="text-xs font-medium">
//                         {contact.label}
//                       </span>
//                     </motion.button>
//                   ))}
//                 </div>

//                 <motion.p
//                   initial={{ opacity: 0 }}
//                   whileInView={{ opacity: 1 }}
//                   transition={{ delay: 0.6 }}
//                   className="text-center text-gray-700 dark:text-gray-300 text-sm"
//                 >
//                   Connect with us instantly
//                 </motion.p>
//               </motion.div>

//               {/* FAQ Section */}
//               <motion.div
//                 initial={{ y: 30, opacity: 0 }}
//                 whileInView={{ y: 0, opacity: 1 }}
//                 transition={{ delay: 0.5 }}
//                 viewport={{ once: true }}
//                 className="p-8 rounded-3xl bg-white dark:bg-gray-800 backdrop-blur-xl border border-[#F8F5ED] dark:border-gray-700 shadow-xl relative overflow-hidden"
//               >
//                 <div className="absolute top-4 left-4 w-16 h-16 bg-gradient-to-r from-[#D7C097]/10 to-[#A38C5C]/10 dark:from-[#D7C097]/5 dark:to-[#A38C5C]/5 rounded-full blur-2xl" />

//                 <motion.h3
//                   initial={{ opacity: 0 }}
//                   whileInView={{ opacity: 1 }}
//                   transition={{ delay: 0.6 }}
//                   className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6"
//                 >
//                   Common Questions
//                 </motion.h3>

//                 <div className="space-y-6">
//                   {faqs.map((faq, index) => (
//                     <motion.div
//                       key={index}
//                       initial={{ y: 20, opacity: 0 }}
//                       whileInView={{ y: 0, opacity: 1 }}
//                       transition={{ delay: faq.delay }}
//                       viewport={{ once: true }}
//                       whileHover={{ x: 5 }}
//                       className="pb-6 border-b border-[#F8F5ED]/50 dark:border-gray-600 last:border-0 last:pb-0"
//                     >
//                       <motion.h4
//                         initial={{ opacity: 0 }}
//                         whileInView={{ opacity: 1 }}
//                         transition={{ delay: faq.delay + 0.1 }}
//                         className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2"
//                       >
//                         {faq.q}
//                       </motion.h4>
//                       <motion.p
//                         initial={{ opacity: 0 }}
//                         whileInView={{ opacity: 1 }}
//                         transition={{ delay: faq.delay + 0.2 }}
//                         className="text-gray-700 dark:text-gray-300"
//                       >
//                         {faq.a}
//                       </motion.p>
//                     </motion.div>
//                   ))}
//                 </div>
//               </motion.div>

//               {/* Guarantee Section */}
//               <motion.div
//                 initial={{ y: 30, opacity: 0 }}
//                 whileInView={{ y: 0, opacity: 1 }}
//                 transition={{ delay: 0.6 }}
//                 viewport={{ once: true }}
//                 className="p-8 rounded-3xl bg-gradient-to-br from-[#D7C097]/5 to-[#A38C5C]/5 dark:from-[#D7C097]/10 dark:to-[#A38C5C]/10 border border-[#D7C097]/20 dark:border-[#D7C097]/30 backdrop-blur-xl shadow-xl relative overflow-hidden"
//               >
//                 <motion.div
//                   animate={rotateAnimation}
//                   className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-r from-[#D7C097]/5 to-[#A38C5C]/5 dark:from-[#D7C097]/10 dark:to-[#A38C5C]/10 rounded-full"
//                 />

//                 <motion.div
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   whileInView={{ opacity: 1, scale: 1 }}
//                   transition={{ delay: 0.7 }}
//                   className="flex items-start gap-4"
//                 >
//                   <div className="flex-shrink-0">
//                     <motion.div
//                       animate={pulseAnimation}
//                       className="w-12 h-12 rounded-full bg-gradient-to-r from-[#D7C097] to-[#A38C5C] flex items-center justify-center"
//                     >
//                       <FaCheckCircle className="text-xl text-white" />
//                     </motion.div>
//                   </div>
//                   <div>
//                     <motion.h3
//                       initial={{ opacity: 0 }}
//                       whileInView={{ opacity: 1 }}
//                       transition={{ delay: 0.8 }}
//                       className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2"
//                     >
//                       24-Hour Response Guarantee
//                     </motion.h3>
//                     <motion.p
//                       initial={{ opacity: 0 }}
//                       whileInView={{ opacity: 1 }}
//                       transition={{ delay: 0.9 }}
//                       className="text-gray-700 dark:text-gray-300"
//                     >
//                       We promise to respond to all inquiries within 24 hours
//                       during business days.
//                     </motion.p>
//                   </div>
//                 </motion.div>
//               </motion.div>
//             </motion.div>
//           </div>

//           {/* Map Section */}
//           <motion.div
//             initial={{ y: 50, opacity: 0 }}
//             whileInView={{ y: 0, opacity: 1 }}
//             transition={{
//               type: "spring",
//               stiffness: 50,
//               damping: 20,
//               delay: 0.7,
//             }}
//             viewport={{ once: true, margin: "-100px" }}
//             className="mt-16"
//           >
//             <div className="p-8 rounded-3xl bg-white dark:bg-gray-800 backdrop-blur-xl border border-[#F8F5ED] dark:border-gray-700 shadow-xl relative overflow-hidden">
//               <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#D7C097]/10 to-[#A38C5C]/10 dark:from-[#D7C097]/5 dark:to-[#A38C5C]/5 rounded-full blur-3xl" />

//               <motion.h2
//                 initial={{ opacity: 0, y: -20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.8 }}
//                 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3"
//               >
//                 <FaBuilding className="text-[#D7C097] dark:text-[#D7C097]" />
//                 Find Our Office
//               </motion.h2>

//               <div className="h-96 rounded-2xl overflow-hidden border border-[#F8F5ED] dark:border-gray-700 shadow-lg relative">
//                 {/* Animated map placeholder */}
//                 <div className="w-full h-full bg-gradient-to-br from-[#F8F5ED] to-white dark:from-gray-800 dark:to-gray-700 flex items-center justify-center relative overflow-hidden">
//                   {/* Animated grid background */}
//                   <div className="absolute inset-0 opacity-10">
//                     {Array.from({ length: 20 }).map((_, i) => (
//                       <div
//                         key={i}
//                         className="absolute w-0.5 h-full bg-[#D7C097] dark:bg-[#D7C097]"
//                         style={{ left: `${i * 5}%` }}
//                       />
//                     ))}
//                     {Array.from({ length: 20 }).map((_, i) => (
//                       <div
//                         key={i}
//                         className="absolute h-0.5 w-full bg-[#D7C097] dark:bg-[#D7C097]"
//                         style={{ top: `${i * 5}%` }}
//                       />
//                     ))}
//                   </div>

//                   <div className="relative z-10 text-center">
//                     <motion.div
//                       initial={{ scale: 0 }}
//                       whileInView={{ scale: 1 }}
//                       transition={{ delay: 0.9, type: "spring" }}
//                       className="w-20 h-20 rounded-full bg-gradient-to-r from-[#D7C097] to-[#A38C5C] flex items-center justify-center mx-auto mb-6 shadow-2xl"
//                     >
//                       <motion.div animate={floatingAnimation}>
//                         <FaMapMarkerAlt className="text-2xl text-white" />
//                       </motion.div>
//                     </motion.div>

//                     <motion.h3
//                       initial={{ opacity: 0, y: 20 }}
//                       whileInView={{ opacity: 1, y: 0 }}
//                       transition={{ delay: 1 }}
//                       className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2"
//                     >
//                       Platinum Plaza
//                     </motion.h3>

//                     <motion.p
//                       initial={{ opacity: 0 }}
//                       whileInView={{ opacity: 1 }}
//                       transition={{ delay: 1.1 }}
//                       className="text-lg text-gray-700 dark:text-gray-300 mb-1"
//                     >
//                       Front of EU Delegation
//                     </motion.p>

//                     <motion.p
//                       initial={{ opacity: 0 }}
//                       whileInView={{ opacity: 1 }}
//                       transition={{ delay: 1.2 }}
//                       className="text-[#D7C097] dark:text-[#D7C097]"
//                     >
//                       Addis Ababa, Ethiopia
//                     </motion.p>

//                     <motion.div
//                       initial={{ opacity: 0 }}
//                       whileInView={{ opacity: 1 }}
//                       transition={{ delay: 1.3 }}
//                       className="mt-6"
//                     >
//                       <motion.button
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D7C097] to-[#A38C5C] text-white font-semibold hover:shadow-xl hover:shadow-[#D7C097]/30 transition-all duration-300 flex items-center gap-2 mx-auto"
//                       >
//                         <FaGlobe className="text-lg" />
//                         View on Google Maps
//                       </motion.button>
//                     </motion.div>
//                   </div>

//                   {/* Animated marker pins */}
//                   {[...Array(3)].map((_, i) => (
//                     <motion.div
//                       key={i}
//                       className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-[#D7C097] to-[#A38C5C]"
//                       animate={{
//                         y: [0, -10, 0],
//                         scale: [1, 1.2, 1],
//                       }}
//                       transition={{
//                         duration: 2,
//                         repeat: Infinity,
//                         delay: i * 0.3,
//                       }}
//                       style={{
//                         left: `${20 + i * 30}%`,
//                         top: `${40 + i * 10}%`,
//                       }}
//                     />
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </motion.div>

//           {/* Contact Banner */}
//           <motion.div
//             initial={{ y: 50, opacity: 0 }}
//             whileInView={{ y: 0, opacity: 1 }}
//             transition={{
//               type: "spring",
//               stiffness: 50,
//               damping: 20,
//               delay: 0.9,
//             }}
//             viewport={{ once: true }}
//             className="mt-16"
//           >
//             <div className="p-8 rounded-3xl bg-gradient-to-r from-[#D7C097]/10 via-white/10 to-[#A38C5C]/10 dark:from-[#D7C097]/5 dark:via-gray-800/5 dark:to-[#A38C5C]/5 border border-[#D7C097]/20 dark:border-[#D7C097]/30 backdrop-blur-xl shadow-xl text-center relative overflow-hidden">
//               {/* Animated gradient background */}
//               <motion.div
//                 className="absolute inset-0"
//                 animate={{
//                   background: [
//                     "linear-gradient(45deg, rgba(215,192,151,0.1), rgba(255,255,255,0.1), rgba(163,140,92,0.1))",
//                     "linear-gradient(45deg, rgba(255,255,255,0.1), rgba(215,192,151,0.1), rgba(255,255,255,0.1))",
//                   ],
//                 }}
//                 transition={{ duration: 5, repeat: Infinity }}
//               />

//               <motion.div
//                 animate={floatingAnimation}
//                 className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-[#D7C097] to-[#A38C5C] mb-6"
//               >
//                 <IoChatbubbleEllipses className="text-2xl text-white" />
//               </motion.div>

//               <motion.h3
//                 initial={{ opacity: 0 }}
//                 whileInView={{ opacity: 1 }}
//                 transition={{ delay: 1 }}
//                 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4"
//               >
//                 Ready to Start a Conversation?
//               </motion.h3>

//               <motion.p
//                 initial={{ opacity: 0 }}
//                 whileInView={{ opacity: 1 }}
//                 transition={{ delay: 1.1 }}
//                 className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8"
//               >
//                 Whether you have questions, feedback, or partnership inquiries,
//                 we're here to listen and help you succeed.
//               </motion.p>

//               <motion.button
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 whileInView={{ opacity: 1, scale: 1 }}
//                 transition={{ delay: 1.2 }}
//                 whileHover={{
//                   scale: 1.05,
//                   boxShadow: "0 20px 40px rgba(215, 192, 151, 0.3)",
//                 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="px-10 py-4 rounded-xl bg-gradient-to-r from-[#D7C097] to-[#A38C5C] text-white font-bold text-lg hover:shadow-xl hover:shadow-[#D7C097]/30 transition-all duration-300 inline-flex items-center gap-3"
//                 onClick={() => {
//                   const formSection = document.querySelector("form");
//                   formSection?.scrollIntoView({ behavior: "smooth" });
//                   document.querySelector('input[name="name"]')?.focus();
//                 }}
//               >
//                 <FaPaperPlane />
//                 Send Us a Message
//               </motion.button>
//             </div>
//           </motion.div>
//         </div>

//         {/* Custom CSS for form success animation */}
//         <style jsx>{`
//           .success-animation {
//             animation: successPulse 2s ease-in-out;
//           }

//           @keyframes successPulse {
//             0% {
//               box-shadow: 0 0 0 0 rgba(215, 192, 151, 0.7);
//             }
//             70% {
//               boxshadow: 0 0 0 20px rgba(215, 192, 151, 0);
//             }
//             100% {
//               box-shadow: 0 0 0 0 rgba(215, 192, 151, 0);
//             }
//           }
//         `}</style>
//       </motion.div>
//     </>
//   );
// };

// export default ContactPage;
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import toast from "react-hot-toast";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
  FaUser,
  FaTag,
  FaComment,
  FaCheckCircle,
  FaChevronUp,
  FaHeadset,
  FaBuilding,
  FaGlobe,
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaStar,
} from "react-icons/fa";
import { IoChatbubbleEllipses, IoLogoWhatsapp } from "react-icons/io5";
import { MdSupportAgent } from "react-icons/md";
import { fetchWithAuth } from "../utils/auth";
// import photoshoot1 from "../assets/photoshoot1.jpg"; // Add this import

const BACKEND_URL = import.meta.env.VITE_API_URL;

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);

  // Loading animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetchWithAuth(`${BACKEND_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        setFormData({ name: "", email: "", subject: "", message: "" });

        // Success animation
        const form = e.target;
        form.classList.add("success-animation");
        setTimeout(() => {
          form.classList.remove("success-animation");
        }, 2000);
      } else {
        toast.error(
          data.message || "Failed to send message. Please try again."
        );
      }
    } catch (error) {
      toast.error("Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <FaPhone />,
      title: "Call Us",
      details: ["+251 96 462 3413", "+251 92 683 0205"],
      color: "from-[#D7C097] to-[#A38C5C]",
      action: "tel:+251964623413",
      delay: 0.1,
      rotation: 5,
    },
    {
      icon: <FaEnvelope />,
      title: "Email Us",
      details: [
        "worknehtesfamicael707@gmail.com",
        "biruktawithabtamu686@gmail.com",
      ],
      color: "from-[#D7C097] to-[#A38C5C]",
      action: "mailto:worknehtesfamicael707@gmail.com",
      delay: 0.2,
      rotation: -3,
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Visit Us",
      details: ["Platinum Plaza", "Front of EU Delegation"],
      color: "from-[#D7C097] to-[#A38C5C]",
      action: "https://maps.google.com",
      delay: 0.3,
      rotation: 2,
    },
    {
      icon: <FaClock />,
      title: "Hours",
      details: ["Mon-Fri: 9AM-6PM", "Sat-Sun: 10AM-4PM"],
      color: "from-[#D7C097] to-[#A38C5C]",
      action: null,
      delay: 0.4,
      rotation: -5,
    },
  ];

  const faqs = [
    {
      q: "How quickly will I get a response?",
      a: "We respond to all inquiries within 24 hours during business days.",
      delay: 0.1,
    },
    {
      q: "Do you have phone support?",
      a: "Yes! Call us anytime between 9AM-6PM, Monday through Friday.",
      delay: 0.2,
    },
    {
      q: "Can I visit your office?",
      a: "Our office is open for appointments. Please contact us to schedule a visit.",
      delay: 0.3,
    },
    {
      q: "Do you offer bulk order support?",
      a: "Absolutely! Contact our sales team for bulk orders and corporate discounts.",
      delay: 0.4,
    },
  ];

  const socialContacts = [
    {
      icon: <IoLogoWhatsapp />,
      label: "WhatsApp",
      color: "from-[#D7C097] to-[#A38C5C]",
      delay: 0.1,
    },
    {
      icon: <FaHeadset />,
      label: "Live Chat",
      color: "from-[#D7C097] to-[#A38C5C]",
      delay: 0.2,
    },
    {
      icon: <MdSupportAgent />,
      label: "Support",
      color: "from-[#D7C097] to-[#A38C5C]",
      delay: 0.3,
    },
  ];

  const socialMedia = [
    {
      icon: <FaInstagram />,
      label: "Instagram",
      color: "from-purple-500 to-pink-500",
      url: "#",
    },
    {
      icon: <FaFacebookF />,
      label: "Facebook",
      color: "from-blue-600 to-blue-800",
      url: "#",
    },
    {
      icon: <FaTwitter />,
      label: "Twitter",
      color: "from-sky-500 to-blue-500",
      url: "#",
    },
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
                <IoChatbubbleEllipses className="text-4xl text-white" />
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
        className="min-h-screen bg-gradient-to-br from-[#F8F5ED] via-white to-[#F8F5ED]/80 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-24 pb-12 overflow-hidden relative max-sm:py-32"
      >
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-[#D7C097]/5 to-[#A38C5C]/5 dark:from-[#D7C097]/3 dark:to-[#A38C5C]/3"
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
          className="fixed top-0 left-0 h-1.5 z-40 bg-gradient-to-r from-[#D7C097] via-white to-[#A38C5C] dark:from-[#D7C097] dark:via-gray-800 dark:to-[#A38C5C]"
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
                boxShadow: "0 0 30px rgba(215, 192, 151, 0.5)",
              }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-[#D7C097] to-[#A38C5C] text-white rounded-full shadow-2xl flex items-center justify-center z-40 hover:shadow-3xl transition-all duration-300 group"
            >
              <motion.div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#D7C097]/80 to-[#A38C5C]/80 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
              <FaChevronUp className="w-6 h-6 relative" />
            </motion.button>
          )}
        </AnimatePresence>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
                className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-[#D7C097] to-[#A38C5C] mb-6 shadow-2xl group relative"
              >
                <motion.div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#D7C097]/80 to-[#A38C5C]/80 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
                <motion.div animate={floatingAnimation}>
                  <IoChatbubbleEllipses className="text-4xl text-white relative" />
                </motion.div>
              </motion.div>

              {/* Orbiting circles */}
              {[0, 120, 240].map((rotation, i) => (
                <motion.div
                  key={i}
                  className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-[#F8F5ED]/80 to-white/80 dark:from-gray-800/80 dark:to-gray-700/80"
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
              <span className="bg-gradient-to-r from-gray-900 via-[#D7C097] to-gray-900 dark:from-gray-100 dark:via-[#D7C097] dark:to-gray-100 bg-clip-text text-transparent">
                Get in Touch
              </span>
              <motion.span
                className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-[#D7C097] to-[#A38C5C] rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl lg:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
            >
              Have questions? We're here to help. Reach out anytime!
            </motion.p>
          </motion.div>

          {/* Contact Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={{
                  hidden: {
                    y: 50,
                    opacity: 0,
                    scale: 0.8,
                    rotate: info.rotation,
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
                      delay: info.delay,
                    },
                  },
                }}
                whileHover={{
                  y: -10,
                  scale: 1.05,
                  rotate: info.rotation,
                  transition: { type: "spring", stiffness: 400, damping: 25 },
                }}
                whileTap={{ scale: 0.95 }}
                className={`p-8 rounded-3xl bg-white dark:bg-gray-800 backdrop-blur-xl border border-[#F8F5ED] dark:border-gray-700 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group ${
                  info.action ? "cursor-pointer" : "cursor-default"
                }`}
                onClick={() =>
                  info.action && window.open(info.action, "_blank")
                }
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-gray-700/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />

                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ delay: info.delay + 0.2, type: "spring" }}
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${info.color} mb-6 relative group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}
                >
                  <motion.div
                    animate={floatingAnimation}
                    className="text-2xl text-white"
                  >
                    {info.icon}
                  </motion.div>
                  <div className="absolute inset-0 rounded-full bg-white/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: info.delay + 0.3 }}
                  className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3"
                >
                  {info.title}
                </motion.h3>

                <div className="space-y-2">
                  {info.details.map((detail, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: info.delay + 0.4 + idx * 0.1 }}
                      className="text-gray-700 dark:text-gray-300"
                    >
                      {detail}
                    </motion.p>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
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
              className="lg:col-span-2"
            >
              <div className="p-8 rounded-3xl bg-white dark:bg-gray-800 backdrop-blur-xl border border-[#F8F5ED] dark:border-gray-700 shadow-xl relative overflow-hidden">
                <div className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-r from-[#D7C097]/10 to-[#A38C5C]/10 dark:from-[#D7C097]/5 dark:to-[#A38C5C]/5 rounded-full blur-2xl" />

                <motion.h2
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2"
                >
                  Send us a Message
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg text-gray-700 dark:text-gray-300 mb-8"
                >
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </motion.p>

                <form onSubmit={handleSubmit} className="space-y-6 relative">
                  {/* Floating particles in form */}
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 rounded-full bg-[#D7C097]/30 dark:bg-[#D7C097]/30"
                      animate={{
                        y: [0, -20, 0],
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-3 font-medium">
                        <motion.div
                          animate={pulseAnimation}
                          className="flex-shrink-0"
                        >
                          <FaUser className="text-[#D7C097] dark:text-[#D7C097]" />
                        </motion.div>
                        Your Name
                      </label>
                      <motion.input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        whileFocus={{ scale: 1.02 }}
                        className="w-full px-4 py-4 rounded-xl bg-gradient-to-r from-[#F8F5ED] to-white/50 dark:from-gray-800/50 dark:to-gray-700/50 border border-[#F8F5ED] dark:border-gray-600 focus:border-[#D7C097] focus:ring-2 focus:ring-[#D7C097]/20 focus:outline-none transition-all duration-300 text-gray-900 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder="John Doe"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-3 font-medium">
                        <motion.div
                          animate={pulseAnimation}
                          transition={{ delay: 0.5 }}
                          className="flex-shrink-0"
                        >
                          <FaEnvelope className="text-[#D7C097] dark:text-[#D7C097]" />
                        </motion.div>
                        Email Address
                      </label>
                      <motion.input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        whileFocus={{ scale: 1.02 }}
                        className="w-full px-4 py-4 rounded-xl bg-gradient-to-r from-[#F8F5ED] to-white/50 dark:from-gray-800/50 dark:to-gray-700/50 border border-[#F8F5ED] dark:border-gray-600 focus:border-[#D7C097] focus:ring-2 focus:ring-[#D7C097]/20 focus:outline-none transition-all duration-300 text-gray-900 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder="john@example.com"
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-3 font-medium">
                      <motion.div
                        animate={pulseAnimation}
                        transition={{ delay: 0.6 }}
                        className="flex-shrink-0"
                      >
                        <FaTag className="text-[#D7C097] dark:text-[#D7C097]" />
                      </motion.div>
                      Subject
                    </label>
                    <motion.input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      whileFocus={{ scale: 1.02 }}
                      className="w-full px-4 py-4 rounded-xl bg-gradient-to-r from-[#F8F5ED] to-white/50 dark:from-gray-800/50 dark:to-gray-700/50 border border-[#F8F5ED] dark:border-gray-600 focus:border-[#D7C097] focus:ring-2 focus:ring-[#D7C097]/20 focus:outline-none transition-all duration-300 text-gray-900 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400"
                      placeholder="How can we help you?"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <label className="flex items-center gap-2 text-gray-700 dark:text-gray-300 mb-3 font-medium">
                      <motion.div
                        animate={pulseAnimation}
                        transition={{ delay: 0.7 }}
                        className="flex-shrink-0"
                      >
                        <FaComment className="text-[#D7C097] dark:text-[#D7C097]" />
                      </motion.div>
                      Your Message
                    </label>
                    <motion.textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      whileFocus={{ scale: 1.01 }}
                      className="w-full px-4 py-4 rounded-xl bg-gradient-to-r from-[#F8F5ED] to-white/50 dark:from-gray-800/50 dark:to-gray-700/50 border border-[#F8F5ED] dark:border-gray-600 focus:border-[#D7C097] focus:ring-2 focus:ring-[#D7C097]/20 focus:outline-none transition-all duration-300 text-gray-900 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </motion.div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 20px 40px rgba(215, 192, 151, 0.3)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    animate={isSubmitting ? undefined : pulseAnimation}
                    className="w-full py-5 rounded-xl bg-gradient-to-r from-[#D7C097] to-[#A38C5C] text-white font-bold text-lg shadow-xl hover:shadow-2xl hover:shadow-[#D7C097]/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 relative overflow-hidden group"
                  >
                    {/* Button shine effect */}
                    <motion.div className="absolute inset-0 bg-gradient-to-r from-[#D7C097]/90 to-[#A38C5C]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {isSubmitting ? (
                      <motion.div
                        initial={{ rotate: 0 }}
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                      />
                    ) : (
                      <motion.div animate={floatingAnimation}>
                        <FaPaperPlane className="text-xl" />
                      </motion.div>
                    )}
                    <span className="relative z-10">
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </span>
                  </motion.button>
                </form>
              </div>
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
              {/* Quick Connect */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-gradient-to-br from-[#D7C097]/10 to-[#A38C5C]/10 dark:from-[#D7C097]/5 dark:to-[#A38C5C]/5 border border-[#D7C097]/20 dark:border-[#D7C097]/30 backdrop-blur-xl shadow-xl"
              >
                <motion.h3
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6"
                >
                  Quick Connect
                </motion.h3>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  {socialContacts.map((contact, index) => (
                    <motion.button
                      key={index}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: contact.delay }}
                      whileHover={{
                        y: -5,
                        scale: 1.1,
                        transition: { type: "spring", stiffness: 400 },
                      }}
                      whileTap={{ scale: 0.95 }}
                      className={`aspect-square rounded-2xl bg-gradient-to-r ${contact.color} flex flex-col items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300`}
                    >
                      <div className="text-2xl mb-1">{contact.icon}</div>
                      <span className="text-xs font-medium">
                        {contact.label}
                      </span>
                    </motion.button>
                  ))}
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-center text-gray-700 dark:text-gray-300 text-sm"
                >
                  Connect with us instantly
                </motion.p>
              </motion.div>

              {/* FAQ Section */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-white dark:bg-gray-800 backdrop-blur-xl border border-[#F8F5ED] dark:border-gray-700 shadow-xl relative overflow-hidden"
              >
                <div className="absolute top-4 left-4 w-16 h-16 bg-gradient-to-r from-[#D7C097]/10 to-[#A38C5C]/10 dark:from-[#D7C097]/5 dark:to-[#A38C5C]/5 rounded-full blur-2xl" />

                <motion.h3
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6"
                >
                  Common Questions
                </motion.h3>

                <div className="space-y-6">
                  {faqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: faq.delay }}
                      viewport={{ once: true }}
                      whileHover={{ x: 5 }}
                      className="pb-6 border-b border-[#F8F5ED]/50 dark:border-gray-600 last:border-0 last:pb-0"
                    >
                      <motion.h4
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: faq.delay + 0.1 }}
                        className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2"
                      >
                        {faq.q}
                      </motion.h4>
                      <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: faq.delay + 0.2 }}
                        className="text-gray-700 dark:text-gray-300"
                      >
                        {faq.a}
                      </motion.p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Guarantee Section */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-gradient-to-br from-[#D7C097]/5 to-[#A38C5C]/5 dark:from-[#D7C097]/10 dark:to-[#A38C5C]/10 border border-[#D7C097]/20 dark:border-[#D7C097]/30 backdrop-blur-xl shadow-xl relative overflow-hidden"
              >
                <motion.div
                  animate={rotateAnimation}
                  className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-r from-[#D7C097]/5 to-[#A38C5C]/5 dark:from-[#D7C097]/10 dark:to-[#A38C5C]/10 rounded-full"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0">
                    <motion.div
                      animate={pulseAnimation}
                      className="w-12 h-12 rounded-full bg-gradient-to-r from-[#D7C097] to-[#A38C5C] flex items-center justify-center"
                    >
                      <FaCheckCircle className="text-xl text-white" />
                    </motion.div>
                  </div>
                  <div>
                    <motion.h3
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2"
                    >
                      24-Hour Response Guarantee
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.9 }}
                      className="text-gray-700 dark:text-gray-300"
                    >
                      We promise to respond to all inquiries within 24 hours
                      during business days.
                    </motion.p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Map Section */}
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
            className="mt-16"
          >
            <div className="p-8 rounded-3xl bg-white dark:bg-gray-800 backdrop-blur-xl border border-[#F8F5ED] dark:border-gray-700 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#D7C097]/10 to-[#A38C5C]/10 dark:from-[#D7C097]/5 dark:to-[#A38C5C]/5 rounded-full blur-3xl" />

              <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-3"
              >
                <FaBuilding className="text-[#D7C097] dark:text-[#D7C097]" />
                Find Our Office
              </motion.h2>

              <div className="h-96 rounded-2xl overflow-hidden border border-[#F8F5ED] dark:border-gray-700 shadow-lg relative">
                {/* Animated map placeholder */}
                <div className="w-full h-full bg-gradient-to-br from-[#F8F5ED] to-white dark:from-gray-800 dark:to-gray-700 flex items-center justify-center relative overflow-hidden">
                  {/* Animated grid background */}
                  <div className="absolute inset-0 opacity-10">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-0.5 h-full bg-[#D7C097] dark:bg-[#D7C097]"
                        style={{ left: `${i * 5}%` }}
                      />
                    ))}
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute h-0.5 w-full bg-[#D7C097] dark:bg-[#D7C097]"
                        style={{ top: `${i * 5}%` }}
                      />
                    ))}
                  </div>

                  <div className="relative z-10 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: 0.9, type: "spring" }}
                      className="w-20 h-20 rounded-full bg-gradient-to-r from-[#D7C097] to-[#A38C5C] flex items-center justify-center mx-auto mb-6 shadow-2xl"
                    >
                      <motion.div animate={floatingAnimation}>
                        <FaMapMarkerAlt className="text-2xl text-white" />
                      </motion.div>
                    </motion.div>

                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1 }}
                      className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2"
                    >
                      Platinum Plaza
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 1.1 }}
                      className="text-lg text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Front of EU Delegation
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                      className="text-[#D7C097] dark:text-[#D7C097]"
                    >
                      Addis Ababa, Ethiopia
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 1.3 }}
                      className="mt-6"
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D7C097] to-[#A38C5C] text-white font-semibold hover:shadow-xl hover:shadow-[#D7C097]/30 transition-all duration-300 flex items-center gap-2 mx-auto"
                      >
                        <FaGlobe className="text-lg" />
                        View on Google Maps
                      </motion.button>
                    </motion.div>
                  </div>

                  {/* Animated marker pins */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-[#D7C097] to-[#A38C5C]"
                      animate={{
                        y: [0, -10, 0],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                      style={{
                        left: `${20 + i * 30}%`,
                        top: `${40 + i * 10}%`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Banner */}
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
            <div className="p-8 rounded-3xl bg-gradient-to-r from-[#D7C097]/10 via-white/10 to-[#A38C5C]/10 dark:from-[#D7C097]/5 dark:via-gray-800/5 dark:to-[#A38C5C]/5 border border-[#D7C097]/20 dark:border-[#D7C097]/30 backdrop-blur-xl shadow-xl text-center relative overflow-hidden">
              {/* Animated gradient background */}
              <motion.div
                className="absolute inset-0"
                animate={{
                  background: [
                    "linear-gradient(45deg, rgba(215,192,151,0.1), rgba(255,255,255,0.1), rgba(163,140,92,0.1))",
                    "linear-gradient(45deg, rgba(255,255,255,0.1), rgba(215,192,151,0.1), rgba(255,255,255,0.1))",
                  ],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              />

              <motion.div
                animate={floatingAnimation}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-[#D7C097] to-[#A38C5C] mb-6"
              >
                <IoChatbubbleEllipses className="text-2xl text-white" />
              </motion.div>

              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4"
              >
                Ready to Start a Conversation?
              </motion.h3>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto mb-8"
              >
                Whether you have questions, feedback, or partnership inquiries,
                we're here to listen and help you succeed.
              </motion.p>

              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(215, 192, 151, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 rounded-xl bg-gradient-to-r from-[#D7C097] to-[#A38C5C] text-white font-bold text-lg hover:shadow-xl hover:shadow-[#D7C097]/30 transition-all duration-300 inline-flex items-center gap-3"
                onClick={() => {
                  const formSection = document.querySelector("form");
                  formSection?.scrollIntoView({ behavior: "smooth" });
                  document.querySelector('input[name="name"]')?.focus();
                }}
              >
                <FaPaperPlane />
                Send Us a Message
              </motion.button>
            </div>
          </motion.div>

          {/* New: Eye-catching Image Section */}
          <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.95 }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 25,
              delay: 1.0,
            }}
            viewport={{ once: true, amount: 0.3 }}
            className="mt-20 relative overflow-hidden rounded-3xl shadow-2xl group"
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#D7C097]/30 via-transparent to-[#A38C5C]/20 z-10 dark:from-[#D7C097]/40 dark:to-[#A38C5C]/30" />

            {/* Animated floating elements */}
            <div className="absolute inset-0 z-0">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-[#D7C097] dark:bg-[#D7C097]"
                  initial={{
                    x: Math.random() * 100 + "%",
                    y: Math.random() * 100 + "%",
                    opacity: 0,
                  }}
                  animate={{
                    y: [null, -30],
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "linear",
                  }}
                />
              ))}
            </div>

            {/* Image Container */}
            <div className="relative h-[500px] overflow-hidden rounded-3xl">
              <motion.img
                src="/photoshoot1.png"
                alt="AdesCart Studio - Premium Beauty Experience"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />

              {/* Shimmer effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>

            {/* Overlay Content */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
                className="max-w-2xl"
              >
                <motion.div
                  animate={pulseAnimation}
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-6"
                >
                  <FaStar className="text-yellow-300" />
                  <span className="text-white font-semibold text-sm">
                    Premium Studio Experience
                  </span>
                  <FaStar className="text-yellow-300" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                  className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-2xl"
                >
                  Experience Excellence
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="text-xl text-white/90 mb-8 drop-shadow-lg"
                >
                  Visit our state-of-the-art studio for personalized
                  consultations and premium beauty solutions
                </motion.p>

                {/* Social Media Links */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 1.6 }}
                  className="flex justify-center gap-4"
                >
                  {socialMedia.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: 1.7 + index * 0.1, type: "spring" }}
                      whileHover={{
                        scale: 1.1,
                        y: -5,
                        transition: { type: "spring", stiffness: 400 },
                      }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-12 h-12 rounded-full bg-gradient-to-r ${social.color} flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300`}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </motion.div>

                {/* Floating CTA */}
                {/* <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.0 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(255, 255, 255, 0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-8 px-8 py-4 rounded-full bg-white text-gray-900 font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-2xl"
                  onClick={() => {
                    const contactCards = document.querySelector(
                      ".grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4"
                    );
                    contactCards?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Book Studio Visit
                </motion.button> */}
              </motion.div>
            </div>

            {/* Decorative corner elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-4 left-4 w-8 h-8 border-2 border-white/30 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-4 right-4 w-8 h-8 border-2 border-white/30 rounded-full"
            />
          </motion.div>
        </div>

        {/* Custom CSS for form success animation */}
        <style jsx>{`
          .success-animation {
            animation: successPulse 2s ease-in-out;
          }

          @keyframes successPulse {
            0% {
              box-shadow: 0 0 0 0 rgba(215, 192, 151, 0.7);
            }
            70% {
              boxshadow: 0 0 0 20px rgba(215, 192, 151, 0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(215, 192, 151, 0);
            }
          }
        `}</style>
      </motion.div>
    </>
  );
};

export default ContactPage;
