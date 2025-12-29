// import React from "react";
// import { motion } from "framer-motion";
// import { FaLeaf, FaStar, FaHeart } from "react-icons/fa";
// import HeroImage from "/src/assets/home_img5.png";

// /**
//  * Option 4 — Sparkles + Glow Particles + Blurred Blobs
//  * - Particles can float slightly outside hero container edges (more magical)
//  * - Floating cards animate infinitely and were lowered to avoid overlap
//  * - Decorative sparkles around the text
//  * - Soft blurred blobs in the background
//  */

// const floatLoop = {
//   y: [0, -12, 0, 12, 0],
//   x: [0, 8, 0, -8, 0],
//   rotate: [0, 4, 0, -4, 0],
// };

// const floatingVariants = {
//   float: {
//     ...floatLoop,
//     transition: {
//       duration: 8,
//       repeat: Infinity,
//       ease: "easeInOut",
//     },
//   },
// };

// const sparkleVariants = {
//   anim: (i) => ({
//     y: [0, -6 - (i % 3), 0],
//     opacity: [0.3, 1, 0.3],
//     scale: [0.6, 1 + (i % 2) * 0.2, 0.6],
//     transition: {
//       duration: 4 + (i % 4),
//       repeat: Infinity,
//       ease: "easeInOut",
//       delay: i * 0.12,
//     },
//   }),
// };

// const blobVariants = {
//   move: (i) => ({
//     x: [0, i % 2 === 0 ? 30 : -30, 0],
//     y: [0, i % 3 === 0 ? -20 : 20, 0],
//     transition: { duration: 14 + i * 2, repeat: Infinity, ease: "easeInOut" },
//   }),
// };

// const Home = () => {
//   // Precompute particles positions (a stable size on each render is fine)
//   const imageParticles = Array.from({ length: 12 }).map((_, i) => {
//     // allow positions slightly outside container using -8..108%
//     const top = `${-8 + Math.random() * 116}%`;
//     const left = `${-8 + Math.random() * 116}%`;
//     const size = 6 + Math.round(Math.random() * 18); // px
//     const colorPalette = [
//       "rgba(16,185,129,0.14)",
//       "rgba(245,158,11,0.12)",
//       "rgba(236,72,153,0.10)",
//       "rgba(59,130,246,0.10)",
//     ];
//     const color = colorPalette[i % colorPalette.length];
//     return { top, left, size, color, id: i };
//   });

//   const textSparkles = Array.from({ length: 10 }).map((_, i) => ({
//     top: `${5 + Math.random() * 70}%`,
//     left: `${Math.random() * 90}%`,
//     id: i,
//     delay: i * 0.15,
//   }));

//   const blobs = [
//     { size: 320, top: -120, left: -120, color: "rgba(16,185,129,0.10)" },
//     { size: 420, top: 120, left: -80, color: "rgba(245,158,11,0.07)" },
//     { size: 360, top: -80, left: 280, color: "rgba(236,72,153,0.06)" },
//   ];

//   return (
//     <motion.div
//       className="min-h-screen flex items-center justify-center w-full bg-lime-900 relative overflow-hidden"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.9 }}
//     >
//       {/* Background blurred color blobs (soft, behind content) */}
//       {blobs.map((b, i) => (
//         <motion.div
//           key={i}
//           custom={i}
//           variants={blobVariants}
//           animate="move"
//           style={{
//             position: "absolute",
//             width: b.size,
//             height: b.size,
//             top: b.top,
//             left: b.left,
//             borderRadius: "50%",
//             background: b.color,
//             filter: "blur(80px)",
//             zIndex: 5,
//             pointerEvents: "none",
//             mixBlendMode: "screen",
//           }}
//         />
//       ))}

//       <div className="w-full flex flex-col lg:flex-row justify-center items-center min-h-screen px-4 lg:px-16 relative z-10">
//         {/* ======== Image / left column ======== */}
//         <motion.div
//           className="w-full lg:w-[60%] flex items-center justify-center h-[480px] md:h-[720px] lg:h-screen overflow-visible relative"
//           initial={{ scale: 0, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ duration: 1.1, ease: "easeOut" }}
//         >
//           {/* Hero image */}
//           <img
//             src={HeroImage}
//             alt="Hero"
//             className="w-full h-full object-contain rounded-b-2xl drop-shadow-2xl"
//             style={{ zIndex: 20 }}
//           />

//           {/* Glow particles around image (soft circles) */}
//           {imageParticles.map((p) => (
//             <motion.div
//               key={p.id}
//               animate={{
//                 y: [0, p.id % 2 === 0 ? -12 : 12, 0],
//                 x: [0, p.id % 3 === 0 ? -10 : 10, 0],
//                 opacity: [0.05, 0.3, 0.05],
//                 scale: [0.9, 1.2, 0.9],
//               }}
//               transition={{
//                 duration: 8 + (p.id % 5),
//                 repeat: Infinity,
//                 ease: "easeInOut",
//                 delay: p.id * 0.12,
//               }}
//               style={{
//                 position: "absolute",
//                 top: p.top,
//                 left: p.left,
//                 width: p.size,
//                 height: p.size,
//                 borderRadius: 9999,
//                 background: p.color,
//                 zIndex: 15,
//                 filter: "blur(12px)",
//                 pointerEvents: "none",
//                 mixBlendMode: "screen",
//               }}
//             />
//           ))}

//           {/* Floating animated info cards (lowered / non-overlapping) */}
//           {[
//             {
//               icon: <FaLeaf className="text-green-300" />,
//               text: "Organic & Natural",
//               bg: "bg-green-600/40",
//               style: { top: "14%", left: 12 },
//             },
//             {
//               icon: <FaStar className="text-yellow-300" />,
//               text: "Premium Quality",
//               bg: "bg-yellow-500/40",
//               style: { top: "24%", right: 20 },
//             },
//             {
//               icon: <FaHeart className="text-pink-300" />,
//               text: "Loved by Users",
//               bg: "bg-pink-500/40",
//               style: { top: "36%", left: 20 }, // lowered to avoid overlap
//             },
//           ].map((card, idx) => (
//             <motion.div
//               key={idx}
//               variants={floatingVariants}
//               animate="float"
//               className={`${card.bg} backdrop-blur-md p-3 sm:p-4 rounded-xl shadow-2xl flex items-center gap-3 max-w-[220px] absolute`}
//               style={{
//                 zIndex: 30,
//                 display: "flex",
//                 alignItems: "center",
//                 ...card.style,
//               }}
//             >
//               {card.icon}
//               <p className="text-white font-semibold text-sm sm:text-lg">
//                 {card.text}
//               </p>
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* ======== Text / right column ======== */}
//         <motion.div
//           className="w-full sm:w-[72%] lg:w-1/2 text-white flex flex-col justify-center items-center lg:items-start px-4 lg:px-8 py-10 relative z-30"
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.9, delay: 0.15 }}
//         >
//           {/* Sparkles around text (soft golden/white) */}
//           {textSparkles.map((s, i) => (
//             <motion.div
//               key={s.id}
//               custom={i}
//               variants={sparkleVariants}
//               animate="anim"
//               style={{
//                 position: "absolute",
//                 top: s.top,
//                 left: s.left,
//                 width: 6,
//                 height: 6,
//                 borderRadius: 9999,
//                 background:
//                   i % 2 === 0
//                     ? "rgba(255,244,229,0.95)"
//                     : "rgba(255,255,255,0.85)",
//                 boxShadow: "0 0 12px rgba(255,244,229,0.6)",
//                 zIndex: 40,
//                 pointerEvents: "none",
//               }}
//             />
//           ))}

//           {/* Decorative small icon floaters close to the heading */}
//           <motion.div
//             className="absolute -top-6 right-8 flex gap-2 z-40 pointer-events-none"
//             initial={{ opacity: 0.6 }}
//             animate={{ y: [0, 10, 0], rotate: [0, 10, 0] }}
//             transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
//           >
//             <FaLeaf className="text-green-200 text-xl" />
//             <FaStar className="text-yellow-300 text-xl" />
//             <FaHeart className="text-pink-300 text-xl" />
//           </motion.div>

//           {/* Subtle gradient stroke behind heading for glow */}
//           <motion.div
//             className="absolute -left-6 -top-2 w-[80%] h-28 md:h-32 rounded-lg pointer-events-none"
//             style={{
//               background:
//                 "linear-gradient(90deg, rgba(16,185,129,0.06), rgba(245,158,11,0.04), rgba(236,72,153,0.03))",
//               filter: "blur(18px)",
//               zIndex: 20,
//             }}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 1.5 }}
//           />

//           <motion.h1
//             className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 text-center lg:text-left relative z-40"
//             initial={{ opacity: 0, y: 12 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.9, delay: 0.25 }}
//             style={{ textShadow: "0 6px 20px rgba(0,0,0,0.36)" }}
//           >
//             Glow. Style. Confidence.
//           </motion.h1>

//           <motion.p
//             className="text-gray-100 w-full lg:text-left mb-6 text-base md:text-lg text-center md:max-w-xl relative z-40"
//             initial={{ opacity: 0, y: 18 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.9, delay: 0.45 }}
//           >
//             Discover premium Skin, Hair & Lifestyle essentials — crafted for
//             your everyday beauty. Luxurious formulation, natural ingredients,
//             and a glow you'll love.
//           </motion.p>

//           <div className="flex gap-4 md:justify-start justify-center relative z-40">
//             <motion.button
//               className="bg-[#222b21] hover:bg-[#2f3b2f] text-white px-5 py-3 rounded-xl font-semibold shadow-lg"
//               whileHover={{ scale: 1.04 }}
//               whileTap={{ scale: 0.98 }}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.9, delay: 0.8 }}
//             >
//               Shop Now
//             </motion.button>

//             <motion.button
//               className="border border-white/40 text-white px-5 py-3 rounded-xl font-semibold hover:bg-white/5"
//               whileHover={{ scale: 1.04 }}
//               whileTap={{ scale: 0.98 }}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.9, delay: 1.1 }}
//             >
//               Explore
//             </motion.button>
//           </div>
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

// export default Home;
// import React from "react";
// import { motion } from "framer-motion";
// import { FaLeaf, FaStar, FaHeart } from "react-icons/fa";
// import HeroImage from "/src/assets/home_img5.png";

// /* ================== Animations ================== */
// const floatLoop = {
//   y: [0, -12, 0, 12, 0],
//   x: [0, 8, 0, -8, 0],
//   rotate: [0, 4, 0, -4, 0],
// };

// const floatingVariants = {
//   float: {
//     ...floatLoop,
//     transition: { duration: 8, repeat: Infinity, ease: "easeInOut" },
//   },
// };

// const sparkleVariants = {
//   anim: (i) => ({
//     y: [0, -6 - (i % 3), 0],
//     opacity: [0.3, 1, 0.3],
//     scale: [0.6, 1 + (i % 2) * 0.2, 0.6],
//     transition: {
//       duration: 4 + (i % 4),
//       repeat: Infinity,
//       ease: "easeInOut",
//       delay: i * 0.12,
//     },
//   }),
// };

// const blobVariants = {
//   move: (i) => ({
//     x: [0, i % 2 === 0 ? 30 : -30, 0],
//     y: [0, i % 3 === 0 ? -20 : 20, 0],
//     transition: { duration: 14 + i * 2, repeat: Infinity, ease: "easeInOut" },
//   }),
// };

// /* ================== Component ================== */
// const Home = () => {
//   const imageParticles = Array.from({ length: 12 }).map((_, i) => ({
//     top: `${-8 + Math.random() * 116}%`,
//     left: `${-8 + Math.random() * 116}%`,
//     size: 6 + Math.round(Math.random() * 18),
//     color: i % 2 === 0 ? "rgba(210,190,160,0.25)" : "rgba(255,248,235,0.25)",
//     id: i,
//   }));

//   const textSparkles = Array.from({ length: 10 }).map((_, i) => ({
//     top: `${5 + Math.random() * 70}%`,
//     left: `${Math.random() * 90}%`,
//     id: i,
//   }));

//   const blobs = [
//     { size: 320, top: -120, left: -120, color: "rgba(245,238,220,0.7)" },
//     { size: 420, top: 120, left: -80, color: "rgba(225,210,185,0.55)" },
//     { size: 360, top: -80, left: 280, color: "rgba(255,248,235,0.5)" },
//   ];

//   return (
//     <motion.div
//       className="
//         min-h-screen w-full relative overflow-hidden
//         bg-[#FBF7F2] text-[#3b3a36]
//         dark:bg-[#1f1c18] dark:text-[#f5efe6]
//         flex items-center justify-center
//       "
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.9 }}
//     >
//       {/* ===== Background Blobs ===== */}
//       {blobs.map((b, i) => (
//         <motion.div
//           key={i}
//           custom={i}
//           variants={blobVariants}
//           animate="move"
//           style={{
//             position: "absolute",
//             width: b.size,
//             height: b.size,
//             top: b.top,
//             left: b.left,
//             borderRadius: "50%",
//             background: b.color,
//             filter: "blur(90px)",
//             zIndex: 5,
//             mixBlendMode: "multiply",
//           }}
//         />
//       ))}

//       <div className="w-full flex flex-col lg:flex-row items-center px-6 lg:px-16 relative z-10">
//         {/* ===== Image ===== */}
//         <motion.div
//           className="w-full lg:w-[60%] flex items-center justify-center h-[480px] lg:h-screen relative"
//           initial={{ scale: 0.85, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ duration: 1 }}
//         >
//           <img
//             src={HeroImage}
//             alt="Hero"
//             className="w-full h-full object-contain drop-shadow-2xl"
//           />

//           {imageParticles.map((p) => (
//             <motion.div
//               key={p.id}
//               animate={{ y: [0, -10, 0], opacity: [0.2, 0.5, 0.2] }}
//               transition={{ duration: 6 + p.id, repeat: Infinity }}
//               style={{
//                 position: "absolute",
//                 top: p.top,
//                 left: p.left,
//                 width: p.size,
//                 height: p.size,
//                 borderRadius: "50%",
//                 background: p.color,
//                 filter: "blur(10px)",
//               }}
//             />
//           ))}

//           {/* Floating Cards */}
//           {[
//             {
//               icon: <FaLeaf />,
//               text: "Organic & Natural",
//               top: "14%",
//               left: 16,
//             },
//             {
//               icon: <FaStar />,
//               text: "Premium Quality",
//               top: "24%",
//               right: 20,
//             },
//             { icon: <FaHeart />, text: "Loved by Users", top: "36%", left: 24 },
//           ].map((c, i) => (
//             <motion.div
//               key={i}
//               variants={floatingVariants}
//               animate="float"
//               className="
//                 absolute flex items-center gap-3 px-4 py-3 rounded-xl
//                 bg-[#EFE6D8]/80 dark:bg-[#2c2722]/70
//                 backdrop-blur-md shadow-xl
//               "
//               style={{ top: c.top, left: c.left, right: c.right }}
//             >
//               <span className="text-[#b89b6a]">{c.icon}</span>
//               <p className="font-semibold text-sm">{c.text}</p>
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* ===== Text ===== */}
//         <motion.div
//           className="w-full lg:w-1/2 flex flex-col items-center lg:items-start px-4 py-10"
//           initial={{ opacity: 0, x: 30 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.9 }}
//         >
//           {textSparkles.map((s, i) => (
//             <motion.div
//               key={i}
//               variants={sparkleVariants}
//               custom={i}
//               animate="anim"
//               style={{
//                 position: "absolute",
//                 top: s.top,
//                 left: s.left,
//                 width: 6,
//                 height: 6,
//                 borderRadius: "50%",
//                 background: "rgba(255,248,235,0.9)",
//                 boxShadow: "0 0 12px rgba(255,248,235,0.6)",
//               }}
//             />
//           ))}

//           <h1 className="text-4xl lg:text-6xl font-extrabold mb-4 max-sm:text-center">
//             Glow. Style. Confidence.
//           </h1>

//           <p className="max-w-xl mb-6 text-center lg:text-left text-[#6b645a] dark:text-[#d8cfc2]">
//             Discover premium Skin, Hair & Lifestyle essentials — crafted for
//             your everyday beauty with warm, natural elegance.
//           </p>

//           <div className="flex gap-4">
//             <button
//               className="
//                 px-6 py-3 rounded-xl font-semibold
//                 bg-[#d6c2a0] text-[#3b2f1e]
//                 hover:bg-[#cbb28c]
//                 dark:bg-[#bfa178] dark:text-[#1f1c18]
//               "
//             >
//               Shop Now
//             </button>

//             <button
//               className="
//                 px-6 py-3 rounded-xl font-semibold
//                 border border-[#d6c2a0]
//                 hover:bg-[#f1e8da]
//                 dark:border-[#bfa178] dark:hover:bg-[#2a241e]
//               "
//             >
//               Explore
//             </button>
//           </div>
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

// export default Home;

// import React from "react";
// import { motion } from "framer-motion";
// import {
//   FaLeaf,
//   FaStar,
//   FaHeart,
//   FaShoppingBag,
//   FaTruck,
//   FaShieldAlt,
//   FaArrowRight,
// } from "react-icons/fa";
// import { IoSparkles } from "react-icons/io5";
// import { GiSparkles } from "react-icons/gi";
// import HeroImage from "/src/assets/home_img5.png";

// /* ================== Animations ================== */
// const floatLoop = {
//   y: [0, -15, 0, 15, 0],
//   x: [0, 10, 0, -10, 0],
//   rotate: [0, 5, 0, -5, 0],
//   transition: { duration: 8, repeat: Infinity, ease: "easeInOut" },
// };

// const fadeInUp = {
//   hidden: { opacity: 0, y: 40 },
//   visible: { opacity: 1, y: 0 },
// };

// const staggerContainer = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1,
//     },
//   },
// };

// const glowAnimation = {
//   hidden: { scale: 0.8, opacity: 0 },
//   visible: {
//     scale: 1,
//     opacity: 1,
//     transition: {
//       duration: 1.5,
//       repeat: Infinity,
//       repeatType: "reverse",
//       ease: "easeInOut",
//     },
//   },
// };

// const particleVariants = (i) => ({
//   animate: {
//     y: [0, -20 - (i % 3) * 10, 0],
//     x: [0, i % 2 === 0 ? 15 : -15, 0],
//     opacity: [0.2, 0.8, 0.2],
//     scale: [0.8, 1.2, 0.8],
//     transition: {
//       duration: 6 + (i % 4),
//       repeat: Infinity,
//       ease: "easeInOut",
//       delay: i * 0.15,
//     },
//   },
// });

// const blobVariants = (i) => ({
//   move: {
//     x: [0, i % 2 === 0 ? 40 : -40, 0],
//     y: [0, i % 3 === 0 ? -30 : 30, 0],
//     rotate: [0, 180, 360],
//     transition: {
//       duration: 20 + i * 3,
//       repeat: Infinity,
//       ease: "easeInOut",
//     },
//   },
// });

// /* ================== Component ================== */
// const Home = () => {
//   const particles = Array.from({ length: 24 }).map((_, i) => ({
//     top: `${-5 + Math.random() * 110}%`,
//     left: `${-5 + Math.random() * 110}%`,
//     size: 8 + Math.round(Math.random() * 24),
//     color:
//       i % 3 === 0
//         ? "rgba(225, 169, 95, 0.3)"
//         : i % 3 === 1
//           ? "rgba(245, 238, 230, 0.2)"
//           : "rgba(212, 162, 89, 0.25)",
//     delay: i * 0.1,
//     id: i,
//   }));

//   const blobs = [
//     {
//       size: 400,
//       top: -160,
//       left: -160,
//       color: "rgba(225, 169, 95, 0.15)",
//       delay: 0,
//     },
//     {
//       size: 500,
//       top: 160,
//       left: -100,
//       color: "rgba(245, 238, 230, 0.12)",
//       delay: 0.3,
//     },
//     {
//       size: 420,
//       top: -100,
//       left: 320,
//       color: "rgba(212, 162, 89, 0.18)",
//       delay: 0.6,
//     },
//     {
//       size: 380,
//       top: 200,
//       left: 280,
//       color: "rgba(197, 149, 77, 0.1)",
//       delay: 0.9,
//     },
//   ];

//   const features = [
//     { icon: <FaLeaf />, title: "100% Natural", desc: "Organic ingredients" },
//     { icon: <FaStar />, title: "Premium Quality", desc: "Luxury standards" },
//     { icon: <FaHeart />, title: "Cruelty Free", desc: "Ethically sourced" },
//     {
//       icon: <FaShieldAlt />,
//       title: "Safe & Tested",
//       desc: "Dermatologist approved",
//     },
//   ];

//   const stats = [
//     { value: "10k+", label: "Happy Customers" },
//     { value: "4.9", label: "Average Rating" },
//     { value: "100+", label: "Products" },
//     { value: "24/7", label: "Support" },
//   ];

//   return (
//     <motion.div
//       className="min-h-screen w-full relative overflow-hidden"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 1 }}
//     >
//       {/* Background Gradient */}
//       <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 via-white to-rose-50/20 dark:from-slate-950/95 dark:via-slate-900 dark:to-slate-950/95" />

//       {/* Animated Blobs */}
//       {blobs.map((b, i) => (
//         <motion.div
//           key={i}
//           custom={i}
//           variants={blobVariants(i)}
//           animate="move"
//           initial="hidden"
//           style={{
//             position: "absolute",
//             width: b.size,
//             height: b.size,
//             top: b.top,
//             left: b.left,
//             borderRadius: "50%",
//             background: b.color,
//             filter: "blur(120px)",
//             zIndex: 0,
//           }}
//         />
//       ))}

//       {/* Floating Particles */}
//       {particles.map((p) => (
//         <motion.div
//           key={p.id}
//           custom={p.id}
//           variants={particleVariants(p.id)}
//           animate="animate"
//           style={{
//             position: "absolute",
//             top: p.top,
//             left: p.left,
//             width: p.size,
//             height: p.size,
//             borderRadius: "50%",
//             background: p.color,
//             filter: "blur(12px)",
//             zIndex: 1,
//           }}
//         />
//       ))}

//       {/* Main Content */}
//       <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 lg:py-24">
//         <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
//           {/* Left Column - Text Content */}
//           <motion.div
//             variants={staggerContainer}
//             initial="hidden"
//             animate="visible"
//             className="space-y-8"
//           >
//             {/* Badge */}
//             <motion.div
//               variants={fadeInUp}
//               className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-amber-500/10 to-rose-500/10 border border-amber-500/20 dark:border-amber-500/30 backdrop-blur-sm"
//             >
//               <GiSparkles className="text-amber-500" />
//               <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
//                 ✨ Premium Beauty Collection
//               </span>
//             </motion.div>

//             {/* Main Heading */}
//             <motion.h1
//               variants={fadeInUp}
//               className="text-5xl lg:text-7xl font-bold leading-tight"
//             >
//               <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-rose-500 bg-clip-text text-transparent">
//                 Radiant Beauty
//               </span>
//               <br />
//               <span className="text-slate-800 dark:text-white">
//                 Starts Within
//               </span>
//             </motion.h1>

//             {/* Description */}
//             <motion.p
//               variants={fadeInUp}
//               className="text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl"
//             >
//               Discover our premium collection of skincare, haircare, and
//               wellness products—meticulously crafted with natural ingredients
//               for your everyday glow.
//             </motion.p>

//             {/* Features Grid */}
//             <motion.div
//               variants={staggerContainer}
//               className="grid grid-cols-2 gap-4 max-sm:grid-cols-1"
//             >
//               {features.map((feature, i) => (
//                 <motion.div
//                   key={i}
//                   variants={fadeInUp}
//                   className="flex items-center gap-3 p-4 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-white/20 dark:border-slate-700/50 hover:border-amber-200 dark:hover:border-amber-700 transition-all duration-300 group"
//                 >
//                   <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500/10 to-rose-500/10 group-hover:from-amber-500/20 group-hover:to-rose-500/20 transition-all duration-300">
//                     <span className="text-amber-600 dark:text-amber-400 text-lg">
//                       {feature.icon}
//                     </span>
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-slate-800 dark:text-white">
//                       {feature.title}
//                     </h3>
//                     <p className="text-sm text-slate-600 dark:text-slate-400">
//                       {feature.desc}
//                     </p>
//                   </div>
//                 </motion.div>
//               ))}
//             </motion.div>

//             {/* CTA Buttons */}
//             <motion.div
//               variants={fadeInUp}
//               className="flex flex-wrap gap-4 pt-4"
//             >
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="group px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold flex items-center gap-3 hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-300"
//               >
//                 <FaShoppingBag className="text-lg" />
//                 <span>Shop Collection</span>
//                 <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
//               </motion.button>

//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 className="px-8 py-4 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-white font-semibold hover:shadow-xl transition-all duration-300"
//               >
//                 Learn More
//               </motion.button>
//             </motion.div>

//             {/* Stats */}
//             <motion.div
//               variants={staggerContainer}
//               className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8"
//             >
//               {stats.map((stat, i) => (
//                 <motion.div key={i} variants={fadeInUp} className="text-center">
//                   <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-rose-500 bg-clip-text text-transparent">
//                     {stat.value}
//                   </div>
//                   <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
//                     {stat.label}
//                   </div>
//                 </motion.div>
//               ))}
//             </motion.div>
//           </motion.div>

//           {/* Right Column - Hero Image */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 1, delay: 0.2 }}
//             className="relative"
//           >
//             {/* Image Container with Glow */}
//             <div className="relative">
//               <div className="absolute inset-0  blur-3xl" />

//               <motion.div
//                 animate={floatLoop}
//                 className="relative  overflow-hidden"
//               >
//                 <img
//                   src={HeroImage}
//                   alt="Premium Beauty Products"
//                   className="w-full h-auto object-cover"
//                 />

//                 {/* Floating Elements */}
//                 <motion.div
//                   animate={floatLoop}
//                   className="absolute top-6 left-6 flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-xl border border-white/20"
//                 >
//                   <div className="p-2 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10">
//                     <FaLeaf className="text-green-600 dark:text-green-400" />
//                   </div>
//                   <div>
//                     <div className="font-semibold text-slate-800 dark:text-white">
//                       100% Natural
//                     </div>
//                     <div className="text-xs text-slate-600 dark:text-slate-400">
//                       Organic Ingredients
//                     </div>
//                   </div>
//                 </motion.div>

//                 <motion.div
//                   animate={floatLoop}
//                   transition={{ duration: 8, delay: 1, repeat: Infinity }}
//                   className="absolute top-6 right-6 flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-xl border border-white/20"
//                 >
//                   <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500/10 to-yellow-500/10">
//                     <FaStar className="text-amber-600 dark:text-amber-400" />
//                   </div>
//                   <div>
//                     <div className="font-semibold text-slate-800 dark:text-white">
//                       Premium Quality
//                     </div>
//                     <div className="text-xs text-slate-600 dark:text-slate-400">
//                       Luxury Standards
//                     </div>
//                   </div>
//                 </motion.div>

//                 <motion.div
//                   animate={floatLoop}
//                   transition={{ duration: 8, delay: 2, repeat: Infinity }}
//                   className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md shadow-xl border border-white/20"
//                 >
//                   <div className="p-2 rounded-xl bg-gradient-to-br from-rose-500/10 to-pink-500/10">
//                     <FaHeart className="text-rose-600 dark:text-rose-400" />
//                   </div>
//                   <div>
//                     <div className="font-semibold text-slate-800 dark:text-white">
//                       Loved by Users
//                     </div>
//                     <div className="text-xs text-slate-600 dark:text-slate-400">
//                       10K+ Reviews
//                     </div>
//                   </div>
//                 </motion.div>
//               </motion.div>

//               {/* Floating Icon Decorations */}
//               <motion.div
//                 animate={floatLoop}
//                 transition={{ duration: 10, repeat: Infinity }}
//                 className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br from-amber-500/10 to-rose-500/10 border border-amber-500/20 flex items-center justify-center"
//               >
//                 <IoSparkles className="text-amber-500 text-3xl" />
//               </motion.div>

//               <motion.div
//                 animate={floatLoop}
//                 transition={{ duration: 10, delay: 1, repeat: Infinity }}
//                 className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-gradient-to-br from-rose-500/10 to-pink-500/10 border border-rose-500/20 flex items-center justify-center"
//               >
//                 <GiSparkles className="text-rose-500 text-2xl" />
//               </motion.div>
//             </div>

//             {/* Trust Badges */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.8, delay: 0.6 }}
//               className="mt-8 flex flex-wrap gap-4 justify-center"
//             >
//               <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700">
//                 <FaTruck className="text-green-600 dark:text-green-400" />
//                 <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
//                   Free Shipping
//                 </span>
//               </div>
//               <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700">
//                 <FaShieldAlt className="text-blue-600 dark:text-blue-400" />
//                 <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
//                   30-Day Returns
//                 </span>
//               </div>
//             </motion.div>
//           </motion.div>
//         </div>

//         {/* Scroll Indicator */}
//         <motion.div
//           animate={{ y: [0, 10, 0] }}
//           transition={{ duration: 2, repeat: Infinity }}
//           className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:flex items-center gap-2 text-slate-500 dark:text-slate-400"
//         >
//           <span className="text-sm">Scroll to explore</span>
//           <div className="w-6 h-10 rounded-full border-2 border-slate-300 dark:border-slate-600 flex items-start justify-center p-1">
//             <motion.div
//               animate={{ y: [0, 12, 0] }}
//               transition={{ duration: 1.5, repeat: Infinity }}
//               className="w-1 h-3 rounded-full bg-amber-500"
//             />
//           </div>
//         </motion.div>
//       </div>

//       {/* Decorative Bottom Wave */}
//       <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-slate-900 to-transparent" />
//     </motion.div>
//   );
// };

// export default Home;
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaLeaf,
  FaStar,
  FaHeart,
  FaShoppingBag,
  FaShieldAlt,
  FaArrowRight,
} from "react-icons/fa";
import { GiSparkles } from "react-icons/gi";
import DefaultHero from "/src/assets/home_img5.png";
import { fetchWithAuth } from "../utils/auth";

const BACKEND_URL = import.meta.env.VITE_API_URL;

/* ================== Smooth Animations ================== */
const imageReveal = {
  hidden: {
    opacity: 0,
    x: -100,
    scale: 0.5,
    filter: "blur(20px)",
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 15,
      mass: 1,
      duration: 1.2,
    },
  },
};

const contentReveal = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const fadeInOnly = {
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

const staggerContent = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
};

const buttonReveal = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 12,
      delay: 0.5,
    },
  },
};

const statReveal = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 180,
      damping: 12,
    },
  },
};

const floatAnimation = {
  float: {
    y: [0, -15, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const imageButtonReveal = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.8, // Appears after the image
      ease: "easeOut",
    },
  },
};

/* ================== Component ================== */
const Home = () => {
  const [heroImage, setHeroImage] = useState(DefaultHero);
  const [loading, setLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageInView, setImageInView] = useState(false);

  // Fetch hero image from backend
  const fetchHeroImage = async () => {
    try {
      const res = await fetchWithAuth(
        `${BACKEND_URL}/api/admin/uploadHero`,
        {}
      );
      const data = await res.json();
      if (data.success && data.url) {
        const img = new Image();
        img.src = data.url;
        img.onload = () => {
          setHeroImage(data.url);
          setLoading(false);
          setIsLoaded(true);
        };
      } else {
        setLoading(false);
        setIsLoaded(true);
      }
    } catch (err) {
      console.error("Failed to fetch hero image:", err);
      setLoading(false);
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    fetchHeroImage();
  }, []);

  const features = [
    { icon: <FaLeaf />, title: "100% Natural", desc: "Organic ingredients" },
    { icon: <FaStar />, title: "Premium Quality", desc: "Luxury standards" },
    { icon: <FaHeart />, title: "Cruelty Free", desc: "Ethically sourced" },
    {
      icon: <FaShieldAlt />,
      title: "Safe & Tested",
      desc: "Dermatologist approved",
    },
  ];

  const stats = [
    { value: "10k+", label: "Happy Customers" },
    { value: "4.9", label: "Average Rating" },
    { value: "100+", label: "Products" },
    { value: "24/7", label: "Support" },
  ];

  return (
    <motion.div
      className="min-h-screen w-full relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Single Color Background - No Gradient */}
      <div className="absolute inset-0 bg-white dark:bg-gray-900" />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left Column - Hero Image with Shop Now Button */}
          <div className="relative">
            <motion.div
              variants={imageReveal}
              initial="hidden"
              animate={isLoaded ? "visible" : "hidden"}
              onAnimationComplete={() => setImageInView(true)}
              className="relative"
            >
              <motion.div
                variants={floatAnimation}
                animate="float"
                className="relative overflow-hidden"
              >
                {loading ? (
                  <div className="w-full h-[500px] bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 animate-pulse rounded-2xl" />
                ) : (
                  <motion.img
                    src={heroImage}
                    alt="Premium Beauty Products"
                    className="w-full h-auto object-cover rounded-2xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    loading="eager"
                    decoding="async"
                  />
                )}
              </motion.div>
            </motion.div>

            {/* Shop Now Button on Bottom Left of Image */}
            <motion.div
              initial="hidden"
              animate={imageInView ? "visible" : "hidden"}
              variants={imageButtonReveal}
              className="absolute -bottom-6 left-6 z-20"
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold flex items-center gap-3 hover:shadow-lg shadow-xl shadow-amber-500/30 dark:shadow-amber-600/20 transition-all duration-300"
              >
                <FaShoppingBag className="text-lg" />
                <span>Shop Now</span>
                <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </motion.div>
          </div>

          {/* Right Column - Text Content */}
          <motion.div
            variants={staggerContent}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              variants={contentReveal}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800"
            >
              <GiSparkles className="text-amber-600 dark:text-amber-400" />
              <span className="text-sm font-medium text-amber-800 dark:text-amber-300">
                Premium Beauty Collection
              </span>
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-6">
              <motion.h1
                variants={contentReveal}
                className="text-5xl lg:text-6xl font-bold leading-tight"
              >
                <span className="text-gray-900 dark:text-white">
                  Radiant Beauty
                </span>
                <br />
                <span className="text-amber-600 dark:text-amber-400">
                  Starts Within
                </span>
              </motion.h1>

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "80px" }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="h-1 bg-amber-500 dark:bg-amber-600 rounded-full"
              />
            </div>

            {/* Description */}
            <motion.p
              variants={contentReveal}
              className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-xl"
            >
              Discover our premium collection of skincare, haircare, and
              wellness products—meticulously crafted with natural ingredients
              for your everyday glow.
            </motion.p>

            {/* Features Grid - Only opacity animation with different delays */}
            <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.8 + i * 0.1,
                    ease: "easeOut",
                  }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-700 transition-all duration-300"
                >
                  <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-900/20">
                    <span className="text-amber-600 dark:text-amber-400 text-lg">
                      {feature.icon}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <motion.div
              variants={staggerContent}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  variants={statReveal}
                  custom={i}
                  className="text-center p-4"
                >
                  <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
