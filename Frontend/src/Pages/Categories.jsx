// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { getCategoryImage } from "../utils/imageUtils";
// import { fetchWithAuth } from "../utils/auth";
// import {
//   FaChevronDown,
//   FaChevronUp,
//   FaStar,
//   FaFeather,
//   FaGem,
//   FaCrown,
//   FaEye,
//   FaShoppingBag,
// } from "react-icons/fa";
// import { IoSparkles } from "react-icons/io5";

// const BACKEND_URL = import.meta.env.VITE_API_URL;

// /* =======================
//    ENHANCED ANIMATION VARIANTS
// ======================= */
// const container = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.15,
//       delayChildren: 0.1,
//     },
//   },
// };

// const fromBottom = {
//   hidden: { opacity: 0, y: 60 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.9,
//       ease: [0.22, 1, 0.36, 1],
//     },
//   },
// };

// const cardAnim = {
//   hidden: {
//     opacity: 0,
//     y: 80,
//     scale: 0.95,
//   },
//   visible: {
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: {
//       duration: 1,
//       ease: [0.22, 1, 0.36, 1],
//     },
//   },
// };

// const shimmerEffect = {
//   hidden: { opacity: 0, x: -100 },
//   visible: {
//     opacity: 1,
//     x: "100%",
//     transition: {
//       duration: 1.5,
//       ease: "easeInOut",
//       repeat: Infinity,
//       repeatDelay: 0.5,
//     },
//   },
// };

// const Categories = () => {
//   const [categories, setCategories] = useState([]);
//   const [expanded, setExpanded] = useState({});
//   const [hoveredCard, setHoveredCard] = useState(null);

//   useEffect(() => {
//     fetchWithAuth(`${BACKEND_URL}/api/categories`)
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("CATEGORIES DATA:", data);
//         setCategories(data);
//       });
//   }, []);

//   const toggleExpand = (id, e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-primaryBg via-white to-lightBg/50 dark:from-dark dark:via-gray-900 dark:to-dark transition-all duration-700">
//       {/* Hero Section - Enhanced */}
//       <div className="relative h-[70vh] min-h-[500px] overflow-hidden bg-black">
//         {/* Animated Background Gradient */}
//         <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-purple-500/10 animate-pulse-slow" />

//         {/* Background Image with Enhanced Overlay */}
//         <div
//           className="absolute inset-0 w-full h-full bg-fixed"
//           style={{
//             backgroundImage: `url("/photoshoot2.jpg")`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         >
//           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
//           <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

//           {/* Animated Particles */}
//           <div className="absolute inset-0">
//             {[...Array(20)].map((_, i) => (
//               <motion.div
//                 key={i}
//                 className="absolute w-[1px] h-[1px] bg-white/30 rounded-full"
//                 initial={{ y: -100, opacity: 0 }}
//                 animate={{
//                   y: "100vh",
//                   opacity: [0, 1, 0],
//                 }}
//                 transition={{
//                   duration: 3,
//                   delay: i * 0.1,
//                   repeat: Infinity,
//                   ease: "linear",
//                 }}
//                 style={{
//                   left: `${Math.random() * 100}%`,
//                 }}
//               />
//             ))}
//           </div>
//         </div>

//         <motion.div
//           className="relative z-10 h-full flex items-center justify-center px-4"
//           variants={container}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.3 }}
//         >
//           <motion.div
//             className="text-center max-w-6xl mx-auto"
//             variants={container}
//           >
//             {/* Premium Badge - Enhanced */}
//             <motion.div
//               variants={fromBottom}
//               className="inline-flex items-center gap-3 mb-8 px-6 py-3 rounded-full bg-gradient-to-r from-accent/20 via-accent/10 to-transparent backdrop-blur-xl border border-accent/30 dark:border-accent/50 shadow-lg shadow-accent/10 relative overflow-hidden"
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent">
//                 <motion.div
//                   variants={shimmerEffect}
//                   className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-white/20 to-transparent"
//                 />
//               </div>
//               <FaCrown className="text-accent dark:text-accent/90 animate-pulse" />
//               <span className="text-white font-medium tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white to-accent">
//                 PREMIUM COLLECTIONS
//               </span>
//               <IoSparkles className="text-accent/80 dark:text-accent/90 animate-spin-slow" />
//             </motion.div>

//             {/* Main Title with Gradient Text */}
//             <motion.div variants={fromBottom} className="relative">
//               <motion.h1
//                 variants={fromBottom}
//                 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
//               >
//                 <span className="text-white drop-shadow-2xl">Discover</span>
//                 <span className="block mt-2 md:mt-4">
//                   <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent via-accent/90 to-purple-400 dark:from-accent dark:via-accent/80 dark:to-purple-300">
//                     Our Categories
//                   </span>
//                 </span>
//               </motion.h1>

//               {/* Title Decoration */}
//               <motion.div
//                 initial={{ scaleX: 0 }}
//                 whileInView={{ scaleX: 1 }}
//                 transition={{ duration: 1.5, ease: "easeInOut" }}
//                 className="hidden md:block h-1 w-48 mx-auto bg-gradient-to-r from-transparent via-accent to-transparent rounded-full mt-8"
//               />
//             </motion.div>

//             {/* Description */}
//             <motion.p
//               variants={fromBottom}
//               className="text-xl text-gray-200 max-w-2xl mx-auto mb-12 leading-relaxed font-light"
//             >
//               Explore our curated collections, where every product tells a story
//               <span className="text-accent font-normal">
//                 {" "}
//                 of beauty, quality, and craftsmanship.
//               </span>
//             </motion.p>

//             {/* Stats - Enhanced */}
//             <motion.div
//               variants={fromBottom}
//               className="flex flex-wrap justify-center gap-8 mb-8"
//             >
//               {[
//                 { value: "50+", label: "Collections", icon: <FaShoppingBag /> },
//                 { value: "4.9★", label: "Rating", icon: <FaStar /> },
//                 { value: "100%", label: "Quality", icon: <FaGem /> },
//               ].map((stat, index) => (
//                 <motion.div
//                   key={index}
//                   whileHover={{ scale: 1.05 }}
//                   className="text-center group"
//                 >
//                   <div className="relative inline-block p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 group-hover:border-accent/50 transition-all duration-300">
//                     <div className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
//                       {stat.icon}
//                       {stat.value}
//                     </div>
//                     <div className="text-sm text-gray-300 group-hover:text-accent transition-colors">
//                       {stat.label}
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </motion.div>
//           </motion.div>
//         </motion.div>

//         {/* Scroll Indicator */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 1, duration: 1 }}
//           className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
//         >
//           <motion.div
//             animate={{ y: [0, 10, 0] }}
//             transition={{ repeat: Infinity, duration: 1.5 }}
//             className="text-white/60 text-sm flex flex-col items-center"
//           >
//             <span className="mb-2">Scroll to explore</span>
//             <FaChevronDown />
//           </motion.div>
//         </motion.div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
//         {/* Header with Enhanced Design */}
//         <motion.div
//           className="text-center mb-20 relative"
//           variants={container}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.3 }}
//         >
//           {/* Decorative Elements */}
//           <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

//           <motion.div
//             variants={fromBottom}
//             className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-lightBg/50 to-lightBg/80 dark:from-dark/50 dark:to-dark/80 backdrop-blur-md border border-accent/20 dark:border-accent/30 shadow-lg mb-8 relative overflow-hidden group"
//           >
//             <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

//             <span className="text-sm font-medium text-dark dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-dark to-gray-600 dark:from-white dark:to-gray-300">
//               Explore Our Curated Collections
//             </span>
//           </motion.div>

//           <motion.h2
//             variants={fromBottom}
//             className="text-5xl lg:text-7xl font-bold mb-8"
//           >
//             <span className="text-dark dark:text-white">Premium</span>
//             <span className="text-accent dark:text-accent/80 ml-4 relative">
//               Categories
//               <motion.div
//                 initial={{ scaleX: 0 }}
//                 whileInView={{ scaleX: 1 }}
//                 transition={{ duration: 1, delay: 0.3 }}
//                 className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-accent/50 via-accent to-accent/50 rounded-full"
//               />
//             </span>
//           </motion.h2>
//         </motion.div>

//         {/* Enhanced Categories Grid */}
//         <motion.div
//           className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
//           variants={container}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.1 }}
//         >
//           {categories.map((cat) => {
//             const isExpanded = expanded[cat._id] || false;
//             const isHovered = hoveredCard === cat._id;
//             const shortDesc =
//               cat.description?.length > 100
//                 ? cat.description.slice(0, 100) + "..."
//                 : cat.description;

//             return (
//               <motion.div
//                 key={cat._id}
//                 variants={cardAnim}
//                 whileHover={{
//                   y: -12,
//                   scale: 1.02,
//                   transition: { duration: 0.3 },
//                 }}
//                 onHoverStart={() => setHoveredCard(cat._id)}
//                 onHoverEnd={() => setHoveredCard(null)}
//                 className="relative group"
//               >
//                 {/* Card Glow Effect */}
//                 <div
//                   className={`absolute -inset-0.5 bg-gradient-to-r from-accent/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500 ${isHovered ? "opacity-100" : ""}`}
//                 />

//                 <Link to={`/category/${cat.name}`}>
//                   <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-lightBg/50 dark:border-white/10 bg-white dark:bg-gray-900/30 dark:backdrop-blur-md cursor-pointer transition-all duration-300 hover:shadow-3xl hover:border-accent/30">
//                     {/* Image Container with Enhanced Effects */}
//                     <div className="relative w-full h-64 overflow-hidden">
//                       <motion.img
//                         src={getCategoryImage(cat.image)}
//                         alt={cat.name}
//                         className="w-full h-full object-cover"
//                         initial={{ scale: 1 }}
//                         animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
//                         transition={{ duration: 0.5 }}
//                         loading="lazy"
//                       />
//                       {/* Gradient Overlay */}
//                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

//                       {/* Category Badge */}
//                       <div className="absolute top-4 left-4">
//                         <span className="px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-sm text-white text-sm font-medium border border-white/20">
//                           {cat.name}
//                         </span>
//                       </div>

//                       {/* Hover View Indicator */}
//                       <motion.div
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={
//                           isHovered
//                             ? { opacity: 1, y: 0 }
//                             : { opacity: 0, y: 20 }
//                         }
//                         className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
//                       >
//                         <FaEye className="text-white" />
//                         <span className="text-white text-sm font-medium">
//                           View
//                         </span>
//                       </motion.div>
//                     </div>

//                     {/* Content */}
//                     <div className="p-6">
//                       <div className="flex items-center justify-between mb-4">
//                         <h3 className="text-2xl font-bold text-dark dark:text-white">
//                           {cat.name}
//                         </h3>
//                         <motion.div
//                           animate={isHovered ? { rotate: 180 } : { rotate: 0 }}
//                           transition={{ duration: 0.3 }}
//                         >
//                           <FaStar className="text-accent dark:text-accent/80" />
//                         </motion.div>
//                       </div>

//                       <div className="overflow-hidden">
//                         <p className="text-dark/80 dark:text-gray-300 leading-relaxed font-light">
//                           {isExpanded ? cat.description : shortDesc}
//                         </p>
//                       </div>

//                       {/* Read More Button */}
//                       {cat.description?.length > 100 && (
//                         <motion.button
//                           type="button"
//                           onClick={(e) => toggleExpand(cat._id, e)}
//                           className="flex items-center gap-2 mt-4 text-accent dark:text-accent/80 font-medium hover:text-dark dark:hover:text-white transition-all duration-300 group/readmore"
//                           whileHover={{ x: 5 }}
//                         >
//                           <span>{isExpanded ? "Show Less" : "Read More"}</span>
//                           <motion.span
//                             animate={
//                               isExpanded ? { rotate: 180 } : { rotate: 0 }
//                             }
//                             transition={{ duration: 0.3 }}
//                           >
//                             {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
//                           </motion.span>
//                         </motion.button>
//                       )}

//                       {/* Enhanced Explore Button */}
//                       <motion.div
//                         className="mt-6 px-5 py-4 rounded-xl border border-accent/30 dark:border-accent/20 bg-gradient-to-r from-accent/5 to-accent/10 dark:from-accent/5 dark:to-accent/0 transition-all duration-300 group-hover:from-accent/20 group-hover:to-accent/15 group-hover:border-accent/50"
//                         whileHover={{ scale: 1.02 }}
//                       >
//                         <div className="flex items-center justify-between">
//                           <span className="font-semibold text-dark dark:text-white group-hover:text-dark dark:group-hover:text-white">
//                             Explore Collection
//                           </span>
//                           <motion.div
//                             animate={isHovered ? { x: 5 } : { x: 0 }}
//                             transition={{ duration: 0.3 }}
//                           >
//                             <FaFeather className="text-accent dark:text-accent/80 group-hover:scale-110 transition-transform duration-300" />
//                           </motion.div>
//                         </div>
//                         <div className="text-xs text-dark/60 dark:text-gray-400 mt-1">
//                           Click to discover more
//                         </div>
//                       </motion.div>
//                     </div>
//                   </div>
//                 </Link>
//               </motion.div>
//             );
//           })}
//         </motion.div>

//         {/* Enhanced Stats Footer */}
//         <motion.div
//           className="mt-24 text-center"
//           variants={container}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.3 }}
//         >
//           <motion.div
//             variants={fromBottom}
//             className="inline-flex items-center gap-8 px-10 py-8 rounded-2xl border border-lightBg/50 dark:border-white/10 bg-white/50 dark:bg-gray-900/30 dark:backdrop-blur-md justify-center shadow-xl relative overflow-hidden"
//           >
//             {/* Background Pattern */}
//             <div className="absolute inset-0 opacity-5">
//               <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-purple-500/20" />
//             </div>

//             {[
//               { value: categories.length, label: "Collections", suffix: "+" },
//               { value: 100, label: "Quality", suffix: "%" },
//               { value: 4.9, label: "Rating", suffix: "★" },
//             ].map((stat, index) => (
//               <div key={index} className="text-center relative group">
//                 <div className="text-3xl font-bold text-accent dark:text-accent/80 mb-2">
//                   {stat.value}
//                   <span className="text-dark/70 dark:text-gray-300">
//                     {stat.suffix}
//                   </span>
//                 </div>
//                 <div className="text-sm text-dark/70 dark:text-gray-300 font-medium">
//                   {stat.label}
//                 </div>
//                 <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-16 h-0.5 bg-gradient-to-r from-accent to-transparent transition-all duration-300" />
//               </div>
//             ))}
//           </motion.div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Categories;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getCategoryImage } from "../utils/imageUtils";
import { fetchWithAuth } from "../utils/auth";
import {
  FaChevronDown,
  FaChevronUp,
  FaStar,
  FaFeather,
  FaGem,
  FaCrown,
  FaEye,
  FaShoppingBag,
} from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";

const BACKEND_URL = import.meta.env.VITE_API_URL;

/* =======================
   ENHANCED ANIMATION VARIANTS
======================= */
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const fromBottom = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const cardAnim = {
  hidden: {
    opacity: 0,
    y: 80,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const shimmerEffect = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: "100%",
    transition: {
      duration: 1.5,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 0.5,
    },
  },
};

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    // Set hero visible immediately on mount
    setHeroVisible(true);

    // Fetch categories
    fetchWithAuth(`${BACKEND_URL}/api/categories`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("CATEGORIES DATA:", data);
        setCategories(data);
        // Set loaded state after data is fetched
        setTimeout(() => setIsLoaded(true), 300);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        // Still set loaded even if there's an error
        setTimeout(() => setIsLoaded(true), 300);
      });
  }, []);

  const toggleExpand = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primaryBg via-white to-lightBg/50 dark:from-dark dark:via-gray-900 dark:to-dark transition-all duration-700">
      {/* Hero Section - Fixed with consistent visibility */}
      <div className="relative h-[70vh] min-h-[500px] overflow-hidden bg-black">
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-purple-500/10 animate-pulse-slow" />

        {/* Background Image with Enhanced Overlay */}
        <div
          className="absolute inset-0 w-full h-full bg-fixed"
          style={{
            backgroundImage: `url("/photoshoot2.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

          {/* Animated Particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-[1px] h-[1px] bg-white/30 rounded-full"
                initial={{ y: -100, opacity: 0 }}
                animate={{
                  y: "100vh",
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.1,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>
        </div>

        <motion.div
          className="relative z-10 h-full flex items-center justify-center px-4"
          variants={container}
          initial="hidden"
          animate={heroVisible ? "visible" : "hidden"}
        >
          <motion.div
            className="text-center max-w-6xl mx-auto"
            variants={container}
          >
            {/* Premium Badge - Enhanced */}
            <motion.div
              variants={fromBottom}
              className="inline-flex items-center gap-3 mb-8 px-6 py-3 rounded-full bg-gradient-to-r from-accent/20 via-accent/10 to-transparent backdrop-blur-xl border border-accent/30 dark:border-accent/50 shadow-lg shadow-accent/10 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent">
                <motion.div
                  variants={shimmerEffect}
                  className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                />
              </div>
              <FaCrown className="text-accent dark:text-accent/90 animate-pulse" />
              <span className="text-white font-medium tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white to-accent">
                PREMIUM COLLECTIONS
              </span>
              <IoSparkles className="text-accent/80 dark:text-accent/90 animate-spin-slow" />
            </motion.div>

            {/* Main Title with Gradient Text */}
            <motion.div variants={fromBottom} className="relative">
              <motion.h1
                variants={fromBottom}
                className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
              >
                <span className="text-white drop-shadow-2xl">Discover</span>
                <span className="block mt-2 md:mt-4">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent via-accent/90 to-purple-400 dark:from-accent dark:via-accent/80 dark:to-purple-300">
                    Our Categories
                  </span>
                </span>
              </motion.h1>

              {/* Title Decoration */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="hidden md:block h-1 w-48 mx-auto bg-gradient-to-r from-transparent via-accent to-transparent rounded-full mt-8"
              />
            </motion.div>

            {/* Description */}
            <motion.p
              variants={fromBottom}
              className="text-xl text-gray-200 max-w-2xl mx-auto mb-12 leading-relaxed font-light"
            >
              Explore our curated collections, where every product tells a story
              <span className="text-accent font-normal">
                {" "}
                of beauty, quality, and craftsmanship.
              </span>
            </motion.p>

            {/* Stats - Enhanced */}
            <motion.div
              variants={fromBottom}
              className="flex flex-wrap justify-center gap-8 mb-8"
            >
              {[
                { value: "50+", label: "Collections", icon: <FaShoppingBag /> },
                { value: "4.9★", label: "Rating", icon: <FaStar /> },
                { value: "100%", label: "Quality", icon: <FaGem /> },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="text-center group"
                >
                  <div className="relative inline-block p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 group-hover:border-accent/50 transition-all duration-300">
                    <div className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                      {stat.icon}
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-300 group-hover:text-accent transition-colors">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-white/60 text-sm flex flex-col items-center"
          >
            <span className="mb-2">Scroll to explore</span>
            <FaChevronDown />
          </motion.div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        {/* Header with Enhanced Design */}
        <motion.div
          className="text-center mb-20 relative"
          variants={container}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
          {/* Decorative Elements */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

          <motion.div
            variants={fromBottom}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-lightBg/50 to-lightBg/80 dark:from-dark/50 dark:to-dark/80 backdrop-blur-md border border-accent/20 dark:border-accent/30 shadow-lg mb-8 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <span className="text-sm font-medium text-dark dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-dark to-gray-600 dark:from-white dark:to-gray-300">
              Explore Our Curated Collections
            </span>
          </motion.div>

          <motion.h2
            variants={fromBottom}
            className="text-5xl lg:text-7xl font-bold mb-8"
          >
            <span className="text-dark dark:text-white">Premium</span>
            <span className="text-accent dark:text-accent/80 ml-4 relative">
              Categories
              <motion.div
                initial={{ scaleX: 0 }}
                animate={isLoaded ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-accent/50 via-accent to-accent/50 rounded-full"
              />
            </span>
          </motion.h2>
        </motion.div>

        {/* Enhanced Categories Grid - Fixed with consistent visibility */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          animate={isLoaded && categories.length > 0 ? "visible" : "hidden"}
        >
          {categories.map((cat) => {
            const isExpanded = expanded[cat._id] || false;
            const isHovered = hoveredCard === cat._id;
            const shortDesc =
              cat.description?.length > 100
                ? cat.description.slice(0, 100) + "..."
                : cat.description;

            return (
              <motion.div
                key={cat._id}
                variants={cardAnim}
                whileHover={{
                  y: -12,
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
                onHoverStart={() => setHoveredCard(cat._id)}
                onHoverEnd={() => setHoveredCard(null)}
                className="relative group"
              >
                {/* Card Glow Effect */}
                <div
                  className={`absolute -inset-0.5 bg-gradient-to-r from-accent/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500 ${isHovered ? "opacity-100" : ""}`}
                />

                <Link to={`/category/${cat.name}`}>
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-lightBg/50 dark:border-white/10 bg-white dark:bg-gray-900/30 dark:backdrop-blur-md cursor-pointer transition-all duration-300 hover:shadow-3xl hover:border-accent/30">
                    {/* Image Container with Enhanced Effects */}
                    <div className="relative w-full h-64 overflow-hidden">
                      <motion.img
                        src={getCategoryImage(cat.image)}
                        alt={cat.name}
                        className="w-full h-full object-cover"
                        initial={{ scale: 1 }}
                        animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                        transition={{ duration: 0.5 }}
                        loading="lazy"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-sm text-white text-sm font-medium border border-white/20">
                          {cat.name}
                        </span>
                      </div>

                      {/* Hover View Indicator */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={
                          isHovered
                            ? { opacity: 1, y: 0 }
                            : { opacity: 0, y: 20 }
                        }
                        className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
                      >
                        <FaEye className="text-white" />
                        <span className="text-white text-sm font-medium">
                          View
                        </span>
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-dark dark:text-white">
                          {cat.name}
                        </h3>
                        <motion.div
                          animate={isHovered ? { rotate: 180 } : { rotate: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <FaStar className="text-accent dark:text-accent/80" />
                        </motion.div>
                      </div>

                      <div className="overflow-hidden">
                        <p className="text-dark/80 dark:text-gray-300 leading-relaxed font-light">
                          {isExpanded ? cat.description : shortDesc}
                        </p>
                      </div>

                      {/* Read More Button */}
                      {cat.description?.length > 100 && (
                        <motion.button
                          type="button"
                          onClick={(e) => toggleExpand(cat._id, e)}
                          className="flex items-center gap-2 mt-4 text-accent dark:text-accent/80 font-medium hover:text-dark dark:hover:text-white transition-all duration-300 group/readmore"
                          whileHover={{ x: 5 }}
                        >
                          <span>{isExpanded ? "Show Less" : "Read More"}</span>
                          <motion.span
                            animate={
                              isExpanded ? { rotate: 180 } : { rotate: 0 }
                            }
                            transition={{ duration: 0.3 }}
                          >
                            {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
                          </motion.span>
                        </motion.button>
                      )}

                      {/* Enhanced Explore Button */}
                      <motion.div
                        className="mt-6 px-5 py-4 rounded-xl border border-accent/30 dark:border-accent/20 bg-gradient-to-r from-accent/5 to-accent/10 dark:from-accent/5 dark:to-accent/0 transition-all duration-300 group-hover:from-accent/20 group-hover:to-accent/15 group-hover:border-accent/50"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-dark dark:text-white group-hover:text-dark dark:group-hover:text-white">
                            Explore Collection
                          </span>
                          <motion.div
                            animate={isHovered ? { x: 5 } : { x: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <FaFeather className="text-accent dark:text-accent/80 group-hover:scale-110 transition-transform duration-300" />
                          </motion.div>
                        </div>
                        <div className="text-xs text-dark/60 dark:text-gray-400 mt-1">
                          Click to discover more
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Enhanced Stats Footer */}
        <motion.div
          className="mt-24 text-center"
          variants={container}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
          <motion.div
            variants={fromBottom}
            className="inline-flex items-center gap-8 px-10 py-8 rounded-2xl border border-lightBg/50 dark:border-white/10 bg-white/50 dark:bg-gray-900/30 dark:backdrop-blur-md justify-center shadow-xl relative overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-purple-500/20" />
            </div>

            {[
              { value: categories.length, label: "Collections", suffix: "+" },
              { value: 100, label: "Quality", suffix: "%" },
              { value: 4.9, label: "Rating", suffix: "★" },
            ].map((stat, index) => (
              <div key={index} className="text-center relative group">
                <div className="text-3xl font-bold text-accent dark:text-accent/80 mb-2">
                  {stat.value}
                  <span className="text-dark/70 dark:text-gray-300">
                    {stat.suffix}
                  </span>
                </div>
                <div className="text-sm text-dark/70 dark:text-gray-300 font-medium">
                  {stat.label}
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-16 h-0.5 bg-gradient-to-r from-accent to-transparent transition-all duration-300" />
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Loading State (optional) */}
      {!isLoaded && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent mb-4"></div>
            <p className="text-white text-lg">Loading categories...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
