// // // import React, { useState, useEffect } from "react";
// // // import { motion, AnimatePresence } from "framer-motion";
// // // import {
// // //   FaLeaf,
// // //   FaStar,
// // //   FaHeart,
// // //   FaShoppingBag,
// // //   FaArrowRight,
// // // } from "react-icons/fa";
// // // import bgImage from "../assets/homebd_3.jpg";
// // // import { fetchWithAuth } from "../utils/auth";

// // // const BACKEND_URL = import.meta.env.VITE_API_URL;

// // // /* ================== PAGE ================== */
// // // const pageTransition = {
// // //   initial: { opacity: 0 },
// // //   animate: { opacity: 1, transition: { duration: 0.6 } },
// // // };

// // // /* ================== LEFT CONTENT ================== */
// // // const leftContainer = {
// // //   hidden: { opacity: 0 },
// // //   visible: {
// // //     opacity: 1,
// // //     transition: { staggerChildren: 0.18, delayChildren: 0.3 },
// // //   },
// // // };

// // // const fadeUp = {
// // //   hidden: { opacity: 0, y: 24 },
// // //   visible: {
// // //     opacity: 1,
// // //     y: 0,
// // //     transition: { duration: 0.8, ease: "easeOut" },
// // //   },
// // // };

// // // /* ================== HERO IMAGE ================== */
// // // const heroImageMotion = {
// // //   hidden: { opacity: 0, x: 80, scale: 1.05 },
// // //   visible: {
// // //     opacity: 1,
// // //     x: 0,
// // //     scale: 1,
// // //     transition: {
// // //       duration: 1.1,
// // //       ease: [0.22, 1, 0.36, 1],
// // //     },
// // //   },
// // // };

// // // const Home = () => {
// // //   const [heroImage, setHeroImage] = useState(null);
// // //   const [imagesLoaded, setImagesLoaded] = useState(false);

// // //   useEffect(() => {
// // //     const fetchHeroImage = async () => {
// // //       try {
// // //         const res = await fetchWithAuth(`${BACKEND_URL}/api/admin/uploadHero`);
// // //         const data = await res.json();
// // //         setHeroImage(
// // //           data?.images?.[0] ||
// // //             "https://res.cloudinary.com/demo/image/upload/v1/samples/beauty-products"
// // //         );
// // //         setImagesLoaded(true);
// // //       } catch {
// // //         setHeroImage(
// // //           "https://res.cloudinary.com/demo/image/upload/v1/samples/beauty-products"
// // //         );
// // //         setImagesLoaded(true);
// // //       }
// // //     };
// // //     fetchHeroImage();
// // //   }, []);

// // //   const stats = [
// // //     { value: "10k+", label: "Happy Customers" },
// // //     { value: "4.9", label: "Average Rating" },
// // //     { value: "100+", label: "Products" },
// // //     { value: "24/7", label: "Support" },
// // //   ];

// // //   return (
// // //     <motion.div
// // //       variants={pageTransition}
// // //       initial="initial"
// // //       animate="animate"
// // //       className="relative min-h-screen bg-cover bg-center"
// // //       style={{ backgroundImage: `url(${bgImage})` }}
// // //     >
// // //       {/* lighter overlay to show beauty */}
// // //       <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/40 to-transparent" />

// // //       <div className="relative z-10 min-h-screen  lg:flex-row-reverse flex">
// // //         {/* HERO IMAGE */}
// // //         <motion.div
// // //           variants={heroImageMotion}
// // //           initial="hidden"
// // //           animate="visible"
// // //           className="
// // //             absolute inset-y-0 right-0
// // //             w-full sm:w-[65%]
// // //             lg:relative lg:w-1/2
// // //             h-full
// // //             translate-x-6 sm:translate-x-10 lg:translate-x-0
// // //           "
// // //         >
// // //           {heroImage && imagesLoaded ? (
// // //             <img
// // //               src={heroImage}
// // //               alt="Beauty Products"
// // //               className="w-full h-full object-cover"
// // //               loading="eager"
// // //             />
// // //           ) : (
// // //             <div className="w-full h-full bg-gray-200 animate-pulse" />
// // //           )}
// // //         </motion.div>

// // //         {/* LEFT CONTENT */}
// // //         <motion.div
// // //           variants={leftContainer}
// // //           initial="hidden"
// // //           animate="visible"
// // //           className="
// // //             relative z-20
// // //             flex items-center
// // //             min-h-screen
// // //             px-4 sm:px-6 lg:px-12 xl:px-16
// // //             w-full sm:w-[55%]
// // //             lg:w-1/2
// // //           "
// // //         >
// // //           <div className="max-w-xl space-y-8">
// // //             {/* HEADING */}
// // //             <motion.h1
// // //               variants={fadeUp}
// // //               className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight"
// // //             >
// // //               Radiant Beauty
// // //               <br />
// // //               <span className="text-[#D7C097]">Starts Within</span>
// // //             </motion.h1>

// // //             {/* PARAGRAPH */}
// // //             <motion.p
// // //               variants={fadeUp}
// // //               className="text-xl text-gray-700 leading-relaxed"
// // //             >
// // //               Discover our premium collection of skincare, haircare, and
// // //               wellness products—meticulously crafted with natural ingredients
// // //               for your everyday glow.
// // //             </motion.p>

// // //             {/* STATS */}
// // //             <motion.div
// // //               variants={fadeUp}
// // //               className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4"
// // //             >
// // //               {stats.map((stat, i) => (
// // //                 <motion.div
// // //                   key={i}
// // //                   initial={{ opacity: 0, y: 16 }}
// // //                   animate={{ opacity: 1, y: 0 }}
// // //                   transition={{ delay: 0.5 + i * 0.1 }}
// // //                 >
// // //                   <div className="text-3xl font-bold text-[#D7C097]">
// // //                     {stat.value}
// // //                   </div>
// // //                   <div className="text-base text-gray-700">{stat.label}</div>
// // //                 </motion.div>
// // //               ))}
// // //             </motion.div>

// // //             {/* BUTTON */}
// // //             <motion.div variants={fadeUp}>
// // //               <motion.button
// // //                 whileHover={{ scale: 1.04 }}
// // //                 whileTap={{ scale: 0.96 }}
// // //                 className="
// // //                   mt-4
// // //                   px-9 py-4
// // //                   rounded-xl
// // //                   bg-gradient-to-r from-[#D8C9A7] to-[#D7C097]
// // //                   text-gray-900
// // //                   font-semibold
// // //                   flex items-center gap-3
// // //                   text-lg
// // //                 "
// // //               >
// // //                 <FaShoppingBag />
// // //                 Shop Now
// // //                 <FaArrowRight />
// // //               </motion.button>
// // //             </motion.div>
// // //           </div>
// // //         </motion.div>
// // //       </div>
// // //     </motion.div>
// // //   );
// // // };

// // // export default Home;
// // import React, { useState, useEffect } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import {
// //   FaLeaf,
// //   FaStar,
// //   FaHeart,
// //   FaShoppingBag,
// //   FaArrowRight,
// // } from "react-icons/fa";
// // import bgImage from "../assets/homebd_3.jpg";
// // import { fetchWithAuth } from "../utils/auth";

// // const BACKEND_URL = import.meta.env.VITE_API_URL;

// // /* ================== PAGE ================== */
// // const pageTransition = {
// //   initial: { opacity: 0 },
// //   animate: { opacity: 1, transition: { duration: 0.6 } },
// // };

// // /* ================== LEFT CONTENT ================== */
// // const leftContainer = {
// //   hidden: { opacity: 0 },
// //   visible: {
// //     opacity: 1,
// //     transition: { staggerChildren: 0.18, delayChildren: 0.3 },
// //   },
// // };

// // const fadeUp = {
// //   hidden: { opacity: 0, y: 24 },
// //   visible: {
// //     opacity: 1,
// //     y: 0,
// //     transition: { duration: 0.8, ease: "easeOut" },
// //   },
// // };

// // /* ================== HERO IMAGE ================== */
// // const heroImageMotion = {
// //   hidden: { opacity: 0, x: 80, scale: 1.05 },
// //   visible: {
// //     opacity: 1,
// //     x: 0,
// //     scale: 1,
// //     transition: {
// //       duration: 1.1,
// //       ease: [0.22, 1, 0.36, 1],
// //     },
// //   },
// // };

// // const Home = () => {
// //   const [heroImage, setHeroImage] = useState(null);
// //   const [imagesLoaded, setImagesLoaded] = useState(false);

// //   useEffect(() => {
// //     const fetchHeroImage = async () => {
// //       try {
// //         const res = await fetchWithAuth(`${BACKEND_URL}/api/admin/uploadHero`);
// //         const data = await res.json();
// //         setHeroImage(
// //           data?.images?.[0] ||
// //             "https://res.cloudinary.com/demo/image/upload/v1/samples/beauty-products"
// //         );
// //         setImagesLoaded(true);
// //       } catch {
// //         setHeroImage(
// //           "https://res.cloudinary.com/demo/image/upload/v1/samples/beauty-products"
// //         );
// //         setImagesLoaded(true);
// //       }
// //     };
// //     fetchHeroImage();
// //   }, []);

// //   const stats = [
// //     { value: "10k+", label: "Happy Customers" },
// //     { value: "4.9", label: "Average Rating" },
// //     { value: "100+", label: "Products" },
// //     { value: "24/7", label: "Support" },
// //   ];

// //   return (
// //     <motion.div
// //       variants={pageTransition}
// //       initial="initial"
// //       animate="animate"
// //       className="relative min-h-screen bg-cover bg-center"
// //       style={{
// //         backgroundImage: `url(${bgImage})`,
// //         backgroundAttachment: "fixed",
// //       }}
// //     >
// //       {/* lighter overlay to show beauty */}
// //       <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/40 to-transparent" />

// //       <div className="relative z-10 min-h-screen overflow-hidden md:flex-row-reverse flex">
// //         {/* HERO IMAGE */}
// //         <motion.div
// //           variants={heroImageMotion}
// //           initial="hidden"
// //           animate="visible"
// //           className="
// //             absolute inset-y-0 right-0
// //             w-full sm:w-[65%]
// //             md:relative lg:w-1/2
// //             min-h-screen
// //             -translate-x-20 sm:translate-x-10 lg:translate-x-0
// //           "
// //         >
// //           {heroImage && imagesLoaded ? (
// //             <img
// //               src={heroImage}
// //               alt="Beauty Products"
// //               className="w-full h-full object-cover"
// //               loading="eager"
// //             />
// //           ) : (
// //             <div className="w-full h-full bg-gray-200 animate-pulse" />
// //           )}
// //         </motion.div>

// //         {/* LEFT CONTENT */}
// //         <motion.div
// //           variants={leftContainer}
// //           initial="hidden"
// //           animate="visible"
// //           className="
// //             relative z-20
// //             flex items-center
// //             min-h-screen
// //             px-4 sm:px-6 lg:px-12 xl:px-16
// //             w-full sm:w-[55%]
// //             lg:w-1/2
// //           "
// //         >
// //           <div className="max-w-xl space-y-8">
// //             {/* HEADING */}
// //             <motion.h1
// //               variants={fadeUp}
// //               className="text-6xl sm:text-5xl lg:text-6xl font-bold text-[#6E2222] leading-tight"
// //             >
// //               Radiant Beauty
// //               <br />
// //               <span className="text-[#D7C097]">Starts Within</span>
// //             </motion.h1>

// //             {/* PARAGRAPH */}
// //             <motion.p
// //               variants={fadeUp}
// //               className="text-xl max-md:text-gray-50 text-gray-700 leading-relaxed"
// //             >
// //               Discover our premium collection of perfumes,skin, hair, and body
// //               care products-meticulously crafted with natural ingredients for
// //               your everyday glow.
// //             </motion.p>

// //             {/* STATS */}
// //             <motion.div
// //               variants={fadeUp}
// //               className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4"
// //             >
// //               {stats.map((stat, i) => (
// //                 <motion.div
// //                   key={i}
// //                   initial={{ opacity: 0, y: 16 }}
// //                   animate={{ opacity: 1, y: 0 }}
// //                   transition={{ delay: 0.5 + i * 0.1 }}
// //                 >
// //                   <div className="text-3xl font-bold text-[#D7C097]">
// //                     {stat.value}
// //                   </div>
// //                   <div className="text-base max-md:text-gray-50 text-gray-700">
// //                     {stat.label}
// //                   </div>
// //                 </motion.div>
// //               ))}
// //             </motion.div>

// //             {/* BUTTON */}
// //             <motion.div variants={fadeUp}>
// //               <motion.button
// //                 whileHover={{ scale: 1.04 }}
// //                 whileTap={{ scale: 0.96 }}
// //                 className="
// //                   mt-4
// //                   px-9 py-4
// //                   rounded-xl
// //                   bg-gradient-to-r from-[#D8C9A7] to-[#D7C097]
// //                   text-gray-900
// //                   font-semibold
// //                   flex items-center gap-3
// //                   text-lg
// //                 "
// //               >
// //                 <FaShoppingBag />
// //                 Shop Now
// //                 <FaArrowRight />
// //               </motion.button>
// //             </motion.div>
// //           </div>
// //         </motion.div>
// //       </div>
// //     </motion.div>
// //   );
// // };

// // export default Home;
// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FaLeaf,
//   FaStar,
//   FaHeart,
//   FaShoppingBag,
//   FaArrowRight,
//   FaGem,
//   FaCrown,
//   FaSparkles,
//   FaSpinner,
// } from "react-icons/fa";
// import bgImage from "../assets/homebd_3.jpg";
// import { fetchWithAuth } from "../utils/auth";

// const BACKEND_URL = import.meta.env.VITE_API_URL;

// /* ================== PAGE ================== */
// const pageTransition = {
//   initial: { opacity: 0 },
//   animate: { opacity: 1, transition: { duration: 0.6 } },
//   exit: { opacity: 0, transition: { duration: 0.4 } },
// };

// /* ================== LEFT CONTENT ================== */
// const leftContainer = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.18, delayChildren: 0.3 },
//   },
// };

// const fadeUp = {
//   hidden: { opacity: 0, y: 24 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.8,
//       ease: "easeOut",
//       type: "spring",
//       stiffness: 100,
//       damping: 15,
//     },
//   },
// };

// /* ================== HERO IMAGE ================== */
// const heroImageMotion = {
//   hidden: { opacity: 0, x: 80, scale: 1.05, rotateY: 15 },
//   visible: {
//     opacity: 1,
//     x: 0,
//     scale: 1,
//     rotateY: 0,
//     transition: {
//       duration: 1.1,
//       ease: [0.22, 1, 0.36, 1],
//       delay: 0.2,
//     },
//   },
// };

// // Loading animation variants
// const shimmerVariants = {
//   initial: { backgroundPosition: "-200% 0" },
//   animate: {
//     backgroundPosition: "200% 0",
//     transition: {
//       duration: 1.5,
//       ease: "linear",
//       repeat: Infinity,
//       repeatType: "loop",
//     },
//   },
// };

// // Floating animation for decorative elements
// const floatAnimation = {
//   y: [0, -10, 0],
//   transition: {
//     duration: 3,
//     repeat: Infinity,
//     ease: "easeInOut",
//   },
// };

// const Home = () => {
//   const [heroImage, setHeroImage] = useState(null);
//   const [imagesLoaded, setImagesLoaded] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchHeroImage = async () => {
//       try {
//         setLoading(true);
//         const res = await fetchWithAuth(`${BACKEND_URL}/api/admin/uploadHero`);
//         const data = await res.json();
//         setHeroImage(
//           data?.images?.[0] ||
//             "https://res.cloudinary.com/demo/image/upload/v1/samples/beauty-products"
//         );

//         // Simulate minimum loading time for better UX
//         setTimeout(() => {
//           setImagesLoaded(true);
//           setLoading(false);
//         }, 800);
//       } catch {
//         setHeroImage(
//           "https://res.cloudinary.com/demo/image/upload/v1/samples/beauty-products"
//         );
//         setTimeout(() => {
//           setImagesLoaded(true);
//           setLoading(false);
//         }, 800);
//       }
//     };
//     fetchHeroImage();
//   }, []);

//   const stats = [
//     {
//       value: "10k+",
//       label: "Happy Customers",
//       icon: <FaHeart className="text-[#D7C097]" />,
//     },
//     {
//       value: "4.9",
//       label: "Average Rating",
//       icon: <FaStar className="text-[#D7C097]" />,
//     },
//     {
//       value: "100+",
//       label: "Products",
//       icon: <FaGem className="text-[#D7C097]" />,
//     },
//     {
//       value: "24/7",
//       label: "Support",
//       icon: <FaCrown className="text-[#D7C097]" />,
//     },
//   ];

//   // Handle Shop Now button click
//   const handleShopNow = () => {
//     navigate("/#products");
//   };

//   return (
//     <motion.div
//       variants={pageTransition}
//       initial="initial"
//       animate="animate"
//       exit="exit"
//       className="relative min-h-screen bg-cover bg-center overflow-hidden"
//       style={{
//         backgroundImage: `url(${bgImage})`,
//         backgroundAttachment: "fixed",
//       }}
//     >
//       {/* Animated background overlay with gradient */}
//       <motion.div
//         className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/50 to-transparent"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1 }}
//       />

//       {/* Floating decorative elements */}
//       <div className="absolute inset-0 pointer-events-none">
//         {[...Array(15)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-[#D7C097]/20 to-[#B8A075]/20"
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//             }}
//             animate={{
//               y: [0, Math.random() * 30 - 15],
//               x: [0, Math.random() * 20 - 10],
//               opacity: [0, 0.7, 0],
//               scale: [0, 1, 0],
//             }}
//             transition={{
//               duration: Math.random() * 3 + 2,
//               repeat: Infinity,
//               delay: i * 0.2,
//             }}
//           />
//         ))}
//       </div>

//       {/* Loading overlay */}
//       <AnimatePresence>
//         {loading && (
//           <motion.div
//             initial={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.5 }}
//             className="absolute inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-white to-gray-100"
//           >
//             <div className="text-center">
//               <motion.div
//                 animate={{ rotate: 360 }}
//                 transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
//                 className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#D7C097] to-[#B8A075] flex items-center justify-center"
//               >
//                 <FaSparkles className="text-white text-2xl" />
//               </motion.div>
//               <motion.div
//                 variants={shimmerVariants}
//                 initial="initial"
//                 animate="animate"
//                 className="h-2 w-48 mx-auto rounded-full bg-gradient-to-r from-transparent via-[#D7C097]/50 to-transparent"
//               />
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <div className="relative z-10 min-h-screen overflow-hidden md:flex-row-reverse flex">
//         {/* HERO IMAGE */}
//         <motion.div
//           variants={heroImageMotion}
//           initial="hidden"
//           animate={imagesLoaded ? "visible" : "hidden"}
//           className="
//             absolute inset-y-0 right-0
//             w-full sm:w-[65%]
//             md:relative lg:w-1/2
//             min-h-screen
//             -translate-x-20 sm:translate-x-10 lg:translate-x-0
//           "
//         >
//           {heroImage ? (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.8, delay: 0.3 }}
//               className="relative w-full h-full"
//             >
//               {/* Shimmer effect */}
//               <motion.div
//                 variants={shimmerVariants}
//                 initial="initial"
//                 animate="animate"
//                 className="absolute inset-0 z-10 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent"
//               />

//               <img
//                 src={heroImage}
//                 alt="Beauty Products"
//                 className="w-full h-full object-cover rounded-2xl shadow-2xl"
//                 loading="eager"
//                 onLoad={() => setImagesLoaded(true)}
//               />

//               {/* Image glow effect */}
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 0.3 }}
//                 transition={{ delay: 0.5 }}
//                 className="absolute inset-0 bg-gradient-to-r from-[#D7C097]/30 to-transparent rounded-2xl blur-xl"
//               />
//             </motion.div>
//           ) : (
//             <motion.div
//               variants={shimmerVariants}
//               initial="initial"
//               animate="animate"
//               className="w-full h-full rounded-2xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
//             />
//           )}
//         </motion.div>

//         {/* LEFT CONTENT */}
//         <motion.div
//           variants={leftContainer}
//           initial="hidden"
//           animate={!loading ? "visible" : "hidden"}
//           className="
//             relative z-20
//             flex items-center
//             min-h-screen
//             px-4 sm:px-6 lg:px-12 xl:px-16
//             w-full sm:w-[55%]
//             lg:w-1/2
//           "
//         >
//           <div className="max-w-xl space-y-8">
//             {/* HEADING with staggered letters animation */}
//             <div className="overflow-hidden">
//               <motion.div
//                 initial={{ y: "100%" }}
//                 animate={{ y: 0 }}
//                 transition={{ duration: 0.8, ease: "easeOut" }}
//                 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight"
//               >
//                 <motion.span
//                   className="text-[#6E2222] block"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.3 }}
//                 >
//                   Radiant Beauty
//                 </motion.span>
//                 <motion.span
//                   className="text-[#D7C097] block mt-4"
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: 0.5 }}
//                 >
//                   Starts Within
//                 </motion.span>
//               </motion.div>
//             </div>

//             {/* PARAGRAPH */}
//             <motion.div variants={fadeUp} className="relative">
//               {/* Animated underline */}
//               <motion.div
//                 initial={{ scaleX: 0 }}
//                 animate={{ scaleX: 1 }}
//                 transition={{ delay: 0.7, duration: 0.8 }}
//                 className="absolute -bottom-2 left-0 w-20 h-0.5 bg-gradient-to-r from-[#D7C097] to-[#B8A075] rounded-full"
//               />

//               <motion.p
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 0.8 }}
//                 className="text-xl max-md:text-gray-50 text-gray-700 leading-relaxed pt-4"
//               >
//                 Discover our premium collection of perfumes, skin, hair, and
//                 body care products—meticulously crafted with natural ingredients
//                 for your everyday glow.
//               </motion.p>
//             </motion.div>

//             {/* STATS with animated counters */}
//             <motion.div
//               variants={fadeUp}
//               className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4"
//             >
//               {stats.map((stat, i) => (
//                 <motion.div
//                   key={i}
//                   initial={{ opacity: 0, y: 20, scale: 0.9 }}
//                   animate={{ opacity: 1, y: 0, scale: 1 }}
//                   transition={{
//                     delay: 0.9 + i * 0.1,
//                     type: "spring",
//                     stiffness: 100,
//                     damping: 12,
//                   }}
//                   whileHover={{ scale: 1.05, y: -5 }}
//                   className="text-center p-4 rounded-2xl bg-white/30 backdrop-blur-sm border border-white/20"
//                 >
//                   <motion.div
//                     animate={floatAnimation}
//                     className="flex justify-center mb-2"
//                   >
//                     {stat.icon}
//                   </motion.div>
//                   <motion.div
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     transition={{ delay: 1 + i * 0.1, type: "spring" }}
//                     className="text-3xl font-bold text-[#6E2222] mb-1"
//                   >
//                     {stat.value}
//                   </motion.div>
//                   <div className="text-sm max-md:text-gray-50 text-gray-700">
//                     {stat.label}
//                   </div>
//                 </motion.div>
//               ))}
//             </motion.div>

//             {/* BUTTON with advanced animation */}
//             <motion.div variants={fadeUp}>
//               <motion.button
//                 onClick={handleShopNow}
//                 whileHover={{
//                   scale: 1.05,
//                   boxShadow: "0 20px 40px rgba(215, 192, 151, 0.3)",
//                 }}
//                 whileTap={{ scale: 0.95 }}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 1.4 }}
//                 className="
//                   mt-4
//                   px-9 py-4
//                   rounded-xl
//                   bg-gradient-to-r from-[#D8C9A7] to-[#D7C097]
//                   text-gray-900
//                   font-semibold
//                   flex items-center gap-3
//                   text-lg
//                   relative
//                   overflow-hidden
//                   group
//                   shadow-lg
//                 "
//               >
//                 {/* Button shine effect */}
//                 <motion.div
//                   className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
//                   initial={{ x: "-100%" }}
//                   whileHover={{ x: "200%" }}
//                   transition={{ duration: 0.7 }}
//                 />

//                 <motion.div
//                   animate={{ rotate: 360 }}
//                   transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
//                 >
//                   <FaShoppingBag />
//                 </motion.div>

//                 <span className="relative">Shop Now</span>

//                 <motion.div
//                   animate={{ x: [0, 5, 0] }}
//                   transition={{ duration: 1, repeat: Infinity }}
//                 >
//                   <FaArrowRight />
//                 </motion.div>
//               </motion.button>

//               {/* Subtext */}
//               <motion.p
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ delay: 1.5 }}
//                 className="text-sm text-gray-600 dark:text-gray-400 mt-3 flex items-center gap-2"
//               >
//                 <FaLeaf className="text-[#D7C097]" />
//                 Discover 100+ natural products
//               </motion.p>
//             </motion.div>
//           </div>
//         </motion.div>
//       </div>

//       {/* Scroll indicator */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 2 }}
//         className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
//       >
//         <motion.div
//           animate={{ y: [0, 10, 0] }}
//           transition={{ duration: 1.5, repeat: Infinity }}
//           className="flex flex-col items-center gap-2"
//         >
//           <span className="text-sm text-gray-600 dark:text-gray-400">
//             Explore More
//           </span>
//           <motion.div
//             animate={{ scale: [1, 1.2, 1] }}
//             transition={{ duration: 2, repeat: Infinity }}
//             className="w-6 h-10 border-2 border-[#D7C097]/30 rounded-full flex justify-center"
//           >
//             <motion.div
//               className="w-1 h-3 bg-[#D7C097] rounded-full mt-2"
//               animate={{ y: [0, 12, 0] }}
//               transition={{ duration: 1.5, repeat: Infinity }}
//             />
//           </motion.div>
//         </motion.div>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default Home;
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaLeaf,
  FaStar,
  FaHeart,
  FaShoppingBag,
  FaArrowRight,
  FaGem,
  FaCrown,
  FaSpinner,
  FaMagic,
  FaRegStar,
} from "react-icons/fa";
import bgImage from "../assets/homebd_3.jpg";
import { fetchWithAuth } from "../utils/auth";

const BACKEND_URL = import.meta.env.VITE_API_URL;

/* ================== PAGE ================== */
const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6 } },
  exit: { opacity: 0, transition: { duration: 0.4 } },
};

/* ================== LEFT CONTENT ================== */
const leftContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.3 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

/* ================== HERO IMAGE ================== */
const heroImageMotion = {
  hidden: { opacity: 0, x: 80, scale: 1.05, rotateY: 15 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    rotateY: 0,
    transition: {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
      delay: 0.2,
    },
  },
};

// Loading animation variants
const shimmerVariants = {
  initial: { backgroundPosition: "-200% 0" },
  animate: {
    backgroundPosition: "200% 0",
    transition: {
      duration: 1.5,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    },
  },
};

// Floating animation for decorative elements
const floatAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

const Home = () => {
  const [heroImage, setHeroImage] = useState(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHeroImage = async () => {
      try {
        setLoading(true);
        const res = await fetchWithAuth(`${BACKEND_URL}/api/admin/uploadHero`);
        const data = await res.json();
        setHeroImage(
          data?.images?.[0] ||
            "https://res.cloudinary.com/demo/image/upload/v1/samples/beauty-products"
        );

        // Simulate minimum loading time for better UX
        setTimeout(() => {
          setImagesLoaded(true);
          setLoading(false);
        }, 800);
      } catch {
        setHeroImage(
          "https://res.cloudinary.com/demo/image/upload/v1/samples/beauty-products"
        );
        setTimeout(() => {
          setImagesLoaded(true);
          setLoading(false);
        }, 800);
      }
    };
    fetchHeroImage();
  }, []);

  const stats = [
    {
      value: "10k+",
      label: "Happy Customers",
      icon: <FaHeart className="text-[#D7C097]" />,
    },
    {
      value: "4.9",
      label: "Average Rating",
      icon: <FaStar className="text-[#D7C097]" />,
    },
    {
      value: "100+",
      label: "Products",
      icon: <FaGem className="text-[#D7C097]" />,
    },
    {
      value: "24/7",
      label: "Support",
      icon: <FaCrown className="text-[#D7C097]" />,
    },
  ];

  // Handle Shop Now button click
  const handleShopNow = () => {
    navigate("/#products");
  };

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative min-h-screen bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundAttachment: "fixed",
      }}
    >
      {/* Animated background overlay with gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/50 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-[#D7C097]/20 to-[#B8A075]/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 30 - 15],
              x: [0, Math.random() * 20 - 10],
              opacity: [0, 0.7, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      {/* Loading overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-white to-gray-100"
          >
            <div className="text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#D7C097] to-[#B8A075] flex items-center justify-center"
              >
                {/* Use FaMagic instead of FaSparkles */}
                <FaMagic className="text-white text-2xl" />
              </motion.div>
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="h-2 w-48 mx-auto rounded-full bg-gradient-to-r from-transparent via-[#D7C097]/50 to-transparent"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 min-h-screen overflow-hidden md:flex-row-reverse flex">
        {/* HERO IMAGE */}
        <motion.div
          variants={heroImageMotion}
          initial="hidden"
          animate={imagesLoaded ? "visible" : "hidden"}
          className="
            absolute inset-y-0 right-0
            w-full sm:w-[65%]
            md:relative lg:w-1/2
            min-h-screen
            -translate-x-20 sm:translate-x-10 lg:translate-x-0 
          "
        >
          {heroImage ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative w-full h-full"
            >
              {/* Shimmer effect */}
              <motion.div
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                className="absolute inset-0 z-10 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent"
              />

              <img
                src={heroImage}
                alt="Beauty Products"
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
                loading="eager"
                onLoad={() => setImagesLoaded(true)}
              />

              {/* Image glow effect */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 0.5 }}
                className="absolute inset-0 bg-gradient-to-r from-[#D7C097]/30 to-transparent rounded-2xl blur-xl"
              />
            </motion.div>
          ) : (
            <motion.div
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              className="w-full h-full rounded-2xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"
            />
          )}
        </motion.div>

        {/* LEFT CONTENT */}
        <motion.div
          variants={leftContainer}
          initial="hidden"
          animate={!loading ? "visible" : "hidden"}
          className="
            relative z-20
            flex items-center
            min-h-screen
            px-4 sm:px-6 lg:px-12 xl:px-16
            w-full sm:w-[55%]
            lg:w-1/2
          "
        >
          <div className="max-w-xl space-y-8">
            {/* HEADING with staggered letters animation */}
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight"
              >
                <motion.span
                  className="text-[#6E2222] block"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Radiant Beauty
                </motion.span>
                <motion.span
                  className="text-[#D7C097] block mt-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Starts Within
                </motion.span>
              </motion.div>
            </div>

            {/* PARAGRAPH */}
            <motion.div variants={fadeUp} className="relative">
              {/* Animated underline */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="absolute -bottom-2 left-0 w-20 h-0.5 bg-gradient-to-r from-[#D7C097] to-[#B8A075] rounded-full"
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-xl max-md:text-gray-50 text-gray-700 leading-relaxed pt-4"
              >
                Discover our premium collection of perfumes, skin, hair, and
                body care products—meticulously crafted with natural ingredients
                for your everyday glow.
              </motion.p>
            </motion.div>

            {/* STATS with animated counters */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: 0.9 + i * 0.1,
                    type: "spring",
                    stiffness: 100,
                    damping: 12,
                  }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className=""
                >
                  <motion.div
                    animate={floatAnimation}
                    className="flex justify-center mb-2"
                  >
                    {stat.icon}
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1 + i * 0.1, type: "spring" }}
                    className="text-3xl font-bold text-[#6E2222] mb-1"
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm max-md:text-gray-50 text-gray-700">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* BUTTON with advanced animation */}
            <motion.div variants={fadeUp}>
              <motion.button
                onClick={handleShopNow}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(215, 192, 151, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="
                  mt-4
                  px-9 py-4
                  rounded-xl
                  bg-gradient-to-r from-[#D8C9A7] to-[#D7C097]
                  text-gray-900
                  font-semibold
                  flex items-center gap-3
                  text-lg
                  relative
                  overflow-hidden
                  group
                  shadow-lg
                "
              >
                {/* Button shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "200%" }}
                  transition={{ duration: 0.7 }}
                />

                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <FaShoppingBag />
                </motion.div>

                <span className="relative">Shop Now</span>

                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <FaArrowRight />
                </motion.div>
              </motion.button>

              {/* Subtext */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="text-sm text-gray-600 dark:text-gray-400 mt-3 flex items-center gap-2"
              >
                <FaLeaf className="text-[#D7C097]" />
                Discover 100+ natural products
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Explore More
          </span>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-[#D7C097]/30 rounded-full flex justify-center"
          >
            <motion.div
              className="w-1 h-3 bg-[#D7C097] rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Home;
