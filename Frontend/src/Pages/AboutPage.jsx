// import React from "react";
// import { motion } from "framer-motion";
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
// } from "react-icons/fa";
// import { IoDiamond, IoRocket } from "react-icons/io5";

// const AboutPage = () => {
//   const stats = [
//     {
//       number: "10,000+",
//       label: "Happy Customers",
//       icon: <FaUsers />,
//       color: "from-blue-500 to-cyan-500",
//     },
//     {
//       number: "500+",
//       label: "Premium Products",
//       icon: <FaShoppingBag />,
//       color: "from-purple-500 to-pink-500",
//     },
//     {
//       number: "50+",
//       label: "Brand Partners",
//       icon: <FaStar />,
//       color: "from-amber-500 to-orange-500",
//     },
//     {
//       number: "24/7",
//       label: "Support Available",
//       icon: <FaHeadset />,
//       color: "from-green-500 to-emerald-500",
//     },
//   ];

//   const values = [
//     {
//       title: "Quality First",
//       description:
//         "We source only the finest products from trusted suppliers around the world.",
//       icon: <IoDiamond className="text-3xl" />,
//       color:
//         "bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20",
//     },
//     {
//       title: "Customer Love",
//       description:
//         "Your satisfaction is our top priority. We go above and beyond for every customer.",
//       icon: <FaHeart className="text-3xl" />,
//       color:
//         "bg-gradient-to-br from-rose-500/10 to-pink-600/10 border-rose-500/20",
//     },
//     {
//       title: "Sustainable Choice",
//       description:
//         "Committed to eco-friendly practices and sustainable sourcing.",
//       icon: <FaLeaf className="text-3xl" />,
//       color:
//         "bg-gradient-to-br from-emerald-500/10 to-green-600/10 border-emerald-500/20",
//     },
//     {
//       title: "Innovation",
//       description:
//         "Always evolving to bring you the latest trends and technology.",
//       icon: <IoRocket className="text-3xl" />,
//       color:
//         "bg-gradient-to-br from-purple-500/10 to-violet-600/10 border-purple-500/20",
//     },
//   ];

//   const team = [
//     {
//       name: "Sarah Johnson",
//       role: "Founder & CEO",
//       image:
//         "https://images.unsplash.com/photo-1494790108755-2616b786d4d1?w=400&h=400&fit=crop",
//       bio: "Passionate about creating exceptional shopping experiences.",
//     },
//     {
//       name: "Michael Chen",
//       role: "Head of Operations",
//       image:
//         "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w-400&h=400&fit=crop",
//       bio: "Ensuring seamless delivery and customer satisfaction.",
//     },
//     {
//       name: "Emily Rodriguez",
//       role: "Product Curator",
//       image:
//         "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
//       bio: "Expert in selecting premium products for our collection.",
//     },
//     {
//       name: "David Wilson",
//       role: "Customer Experience",
//       image:
//         "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
//       bio: "Dedicated to making every interaction memorable.",
//     },
//   ];

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.8 }}
//       className="min-h-screen bg-gradient-to-br py-28 lg:py-32 from-amber-50/30 via-white to-rose-50/20 dark:from-slate-950/95 dark:via-slate-900 dark:to-slate-950/95"
//     >
//       {/* Hero Section */}
//       <section className="relative overflow-hidden ">
//         <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-rose-500/5" />
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//           <div className="text-center">
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               transition={{ duration: 0.6 }}
//               className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 mb-8"
//             >
//               <FaGlobeAmericas className="text-3xl text-white" />
//             </motion.div>
//             <motion.h1
//               initial={{ y: 20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.1 }}
//               className="text-5xl lg:text-7xl font-bold mb-6"
//             >
//               <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
//                 Our Story
//               </span>
//             </motion.h1>
//             <motion.p
//               initial={{ y: 20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               transition={{ delay: 0.2 }}
//               className="text-xl lg:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-12"
//             >
//               Redefining online shopping with passion, quality, and exceptional
//               service
//             </motion.p>
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid max-sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
//             {stats.map((stat, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ y: 20, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ delay: index * 0.1 }}
//                 className="text-center p-8 rounded-3xl bg-gradient-to-br from-white/80 to-white/60 dark:from-slate-800/80 dark:to-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 shadow-xl"
//               >
//                 <div
//                   className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${stat.color} mb-6`}
//                 >
//                   <div className="text-2xl text-white">{stat.icon}</div>
//                 </div>
//                 <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent mb-2">
//                   {stat.number}
//                 </div>
//                 <div className="text-lg font-medium text-slate-600 dark:text-slate-400">
//                   {stat.label}
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Mission Section */}
//       <section className="py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
//             <motion.div
//               initial={{ x: -30, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ duration: 0.6 }}
//             >
//               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-rose-500/10 border border-amber-500/20 dark:border-amber-500/30 mb-6">
//                 <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
//                   Our Mission
//                 </span>
//               </div>
//               <h2 className="text-4xl lg:text-5xl font-bold mb-6">
//                 <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
//                   Creating Exceptional Shopping Experiences
//                 </span>
//               </h2>
//               <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
//                 Founded in 2025, we started with a simple vision: to make
//                 premium products accessible to everyone. Today, we've grown into
//                 a trusted destination for quality-conscious shoppers who value
//                 excellence, reliability, and outstanding customer service.
//               </p>
//               <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
//                 Every product in our collection is carefully curated, tested,
//                 and selected to meet our high standards. We believe in
//                 transparency, quality, and building lasting relationships with
//                 our customers.
//               </p>
//               <div className="flex flex-wrap gap-4">
//                 <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
//                   <FaShippingFast className="text-green-600 dark:text-green-400" />
//                   <span className="text-sm font-medium text-green-700 dark:text-green-300">
//                     Fast Shipping
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20">
//                   <FaShieldAlt className="text-blue-600 dark:text-blue-400" />
//                   <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
//                     Secure Shopping
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
//                   <FaAward className="text-amber-600 dark:text-amber-400" />
//                   <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
//                     Quality Guarantee
//                   </span>
//                 </div>
//               </div>
//             </motion.div>
//             <motion.div
//               initial={{ x: 30, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ duration: 0.6 }}
//               className="relative"
//             >
//               <div className="relative bg-gradient-to-br from-amber-500/10 via-rose-500/10 to-purple-500/10 rounded-3xl p-1">
//                 <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-8">
//                   <img
//                     src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop"
//                     alt="Our Team"
//                     className="w-full h-auto rounded-xl shadow-2xl"
//                   />
//                 </div>
//               </div>
//               <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-r from-amber-500/20 to-rose-500/20 rounded-full blur-3xl" />
//               <div className="absolute -top-6 -left-6 w-48 h-48 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl" />
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Values Section */}
//       <section className="py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <motion.div
//               initial={{ y: 20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-rose-500/10 border border-amber-500/20 dark:border-amber-500/30 mb-6"
//             >
//               <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
//                 Our Values
//               </span>
//             </motion.div>
//             <h2 className="text-4xl lg:text-5xl font-bold mb-6">
//               <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
//                 What We Stand For
//               </span>
//             </h2>
//             <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
//               Our core principles guide everything we do
//             </p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {values.map((value, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ y: 20, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ delay: index * 0.1 }}
//                 whileHover={{ y: -8, transition: { duration: 0.3 } }}
//                 className={`p-8 rounded-3xl border backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300 ${value.color}`}
//               >
//                 <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-white to-white/80 dark:from-slate-800 dark:to-slate-900 mb-6">
//                   {value.icon}
//                 </div>
//                 <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
//                   {value.title}
//                 </h3>
//                 <p className="text-slate-600 dark:text-slate-400">
//                   {value.description}
//                 </p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Team Section */}
//       <section className="py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <motion.div
//               initial={{ y: 20, opacity: 0 }}
//               animate={{ y: 0, opacity: 1 }}
//               className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-rose-500/10 border border-amber-500/20 dark:border-amber-500/30 mb-6"
//             >
//               <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
//                 Meet Our Team
//               </span>
//             </motion.div>
//             <h2 className="text-4xl lg:text-5xl font-bold mb-6">
//               <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
//                 The People Behind The Magic
//               </span>
//             </h2>
//             <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
//               Passionate professionals dedicated to your shopping experience
//             </p>
//           </div>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//             {team.map((member, index) => (
//               <motion.div
//                 key={index}
//                 initial={{ y: 20, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 transition={{ delay: index * 0.1 }}
//                 whileHover={{ y: -8, transition: { duration: 0.3 } }}
//                 className="group"
//               >
//                 <div className="bg-gradient-to-br from-white/80 to-white/60 dark:from-slate-800/80 dark:to-slate-900/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300">
//                   <div className="relative mb-6">
//                     <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white/20 dark:border-slate-700/50">
//                       <img
//                         src={member.image}
//                         alt={member.name}
//                         className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                       />
//                     </div>
//                     <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500/20 to-rose-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                   </div>
//                   <h3 className="text-2xl font-bold text-slate-800 dark:text-white text-center mb-2">
//                     {member.name}
//                   </h3>
//                   <div className="text-amber-600 dark:text-amber-400 font-medium text-center mb-4">
//                     {member.role}
//                   </div>
//                   <p className="text-slate-600 dark:text-slate-400 text-center">
//                     {member.bio}
//                   </p>
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20">
//         <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
//           <motion.div
//             initial={{ y: 20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             className="relative overflow-hidden rounded-3xl"
//           >
//             <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-purple-500/10" />
//             <div className="relative bg-gradient-to-r from-amber-500/5 to-rose-500/5 border border-amber-500/20 dark:border-amber-500/30 backdrop-blur-xl rounded-3xl p-12 text-center">
//               <h2 className="text-4xl lg:text-5xl font-bold mb-6">
//                 <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
//                   Join Our Community
//                 </span>
//               </h2>
//               <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
//                 Be part of our growing family of satisfied customers and
//                 experience shopping redefined.
//               </p>
//               <div className="flex flex-wrap justify-center gap-4">
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300"
//                 >
//                   Shop Now
//                 </motion.button>
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="px-8 py-4 rounded-xl bg-gradient-to-r from-slate-100 to-gray-100 dark:from-slate-700 dark:to-slate-800 text-slate-700 dark:text-slate-300 font-semibold border border-slate-300 dark:border-slate-600 hover:shadow-xl transition-all duration-300"
//                 >
//                   Contact Us
//                 </motion.button>
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </section>
//     </motion.div>
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

  // Scroll animation
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxScroll) * 100;
      setScrollProgress(progress);
      setIsScrolling(scrolled > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const stats = [
    {
      number: "10,000+",
      label: "Happy Customers",
      icon: <FaUsers />,
      color: "from-blue-500 to-cyan-500",
      delay: 0.1,
    },
    {
      number: "500+",
      label: "Premium Products",
      icon: <FaShoppingBag />,
      color: "from-purple-500 to-pink-500",
      delay: 0.2,
    },
    {
      number: "50+",
      label: "Brand Partners",
      icon: <FaStar />,
      color: "from-amber-500 to-orange-500",
      delay: 0.3,
    },
    {
      number: "24/7",
      label: "Support Available",
      icon: <FaHeadset />,
      color: "from-green-500 to-emerald-500",
      delay: 0.4,
    },
  ];

  const values = [
    {
      title: "Quality First",
      description:
        "We source only the finest products from trusted suppliers around the world.",
      icon: <IoDiamond className="text-3xl" />,
      color: "from-blue-500/10 to-blue-600/10",
      delay: 0.1,
    },
    {
      title: "Customer Love",
      description:
        "Your satisfaction is our top priority. We go above and beyond for every customer.",
      icon: <FaHeart className="text-3xl" />,
      color: "from-rose-500/10 to-pink-600/10",
      delay: 0.2,
    },
    {
      title: "Sustainable Choice",
      description:
        "Committed to eco-friendly practices and sustainable sourcing.",
      icon: <FaLeaf className="text-3xl" />,
      color: "from-emerald-500/10 to-green-600/10",
      delay: 0.3,
    },
    {
      title: "Innovation",
      description:
        "Always evolving to bring you the latest trends and technology.",
      icon: <IoRocket className="text-3xl" />,
      color: "from-purple-500/10 to-violet-600/10",
      delay: 0.4,
    },
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b786d4d1?w=400&h=400&fit=crop",
      bio: "Passionate about creating exceptional shopping experiences.",
      delay: 0.1,
    },
    {
      name: "Michael Chen",
      role: "Head of Operations",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      bio: "Ensuring seamless delivery and customer satisfaction.",
      delay: 0.2,
    },
    {
      name: "Emily Rodriguez",
      role: "Product Curator",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
      bio: "Expert in selecting premium products for our collection.",
      delay: 0.3,
    },
    {
      name: "David Wilson",
      role: "Customer Experience",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
      bio: "Dedicated to making every interaction memorable.",
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
                className="w-24 h-24 rounded-full bg-gradient-to-r from-amber-400 to-orange-500"
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
        className="min-h-screen bg-gradient-to-br from-cream-50 to-cream-100 dark:from-gray-900 dark:to-gray-800 pt-24 pb-12 overflow-hidden"
      >
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-amber-400/10 to-orange-500/10 dark:from-purple-600/10 dark:to-pink-600/10"
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
          className="fixed top-0 left-0 h-1 z-50"
          style={{ width: `${scrollProgress}%` }}
          animate={{
            background: [
              "linear-gradient(90deg, #f59e0b, #f97316, #f59e0b)",
              "linear-gradient(90deg, #f97316, #f59e0b, #f97316)",
              "linear-gradient(90deg, #f59e0b, #f97316, #f59e0b)",
            ],
            backgroundSize: "200% 100%",
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
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-amber-500 to-orange-500 dark:from-purple-600 dark:to-pink-600 text-white rounded-full shadow-2xl flex items-center justify-center z-40 hover:shadow-3xl transition-all duration-300 group"
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-100 blur-xl"
                transition={{ duration: 0.3 }}
              />
              <FaChevronUp className="w-6 h-6 relative" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-orange-500/5" />
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
                className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 mb-8 shadow-2xl relative group"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
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
                    <span className="bg-gradient-to-r from-amber-900 via-orange-800 to-amber-900 dark:from-white dark:via-purple-200 dark:to-white bg-clip-text text-transparent">
                      Our Story
                    </span>
                    <motion.span
                      className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.8, duration: 0.8 }}
                    />
                  </span>
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="text-xl lg:text-3xl text-amber-800/80 dark:text-purple-300 max-w-3xl mx-auto mb-12 font-medium leading-relaxed"
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
                  className="text-center p-8 rounded-3xl bg-gradient-to-br from-white/90 to-white/80 dark:from-gray-800/90 dark:to-gray-900/90 backdrop-blur-xl border border-amber-100 dark:border-purple-900/50 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
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
                    className="text-5xl lg:text-4xl font-bold bg-gradient-to-r from-amber-900 to-amber-700 dark:from-white dark:to-purple-300 bg-clip-text text-transparent mb-2"
                  >
                    {stat.number}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: stat.delay + 0.4 }}
                    className="text-lg font-medium text-amber-700 dark:text-purple-400"
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
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 dark:border-amber-500/30 mb-6"
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-sm font-medium text-amber-700 dark:text-amber-300"
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
                  <span className="bg-gradient-to-r from-amber-900 to-amber-700 dark:from-white dark:to-purple-300 bg-clip-text text-transparent">
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
                    className="text-lg text-amber-700 dark:text-purple-300 leading-relaxed"
                  >
                    Founded in 2025, we started with a simple vision: to make
                    premium products accessible to everyone. Today, we've grown
                    into a trusted destination for quality-conscious shoppers
                    who value excellence, reliability, and outstanding customer
                    service.
                  </motion.p>

                  <motion.p
                    variants={itemVariants}
                    className="text-lg text-amber-700 dark:text-purple-300 leading-relaxed"
                  >
                    Every product in our collection is carefully curated,
                    tested, and selected to meet our high standards. We believe
                    in transparency, quality, and building lasting relationships
                    with our customers.
                  </motion.p>

                  <motion.div
                    variants={containerVariants}
                    className="flex flex-wrap gap-4"
                  >
                    {[
                      {
                        icon: FaShippingFast,
                        text: "Fast Shipping",
                        color: "green",
                      },
                      {
                        icon: FaShieldAlt,
                        text: "Secure Shopping",
                        color: "blue",
                      },
                      {
                        icon: FaAward,
                        text: "Quality Guarantee",
                        color: "amber",
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
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-700/50 backdrop-blur-sm border border-white/20 dark:border-gray-600/20"
                      >
                        <item.icon
                          className={`text-${item.color}-600 dark:text-${item.color}-400`}
                        />
                        <span
                          className={`text-sm font-medium text-${item.color}-700 dark:text-${item.color}-300`}
                        >
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
                  className="relative bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-purple-500/10 rounded-3xl p-1"
                >
                  <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-8 shadow-2xl">
                    <motion.img
                      initial={{ scale: 1.1, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                      src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop"
                      alt="Our Team"
                      className="w-full h-auto rounded-xl shadow-xl"
                    />
                  </div>
                </motion.div>
                <motion.div
                  animate={pulseAnimation}
                  className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full blur-3xl"
                />
                <motion.div
                  animate={{
                    ...pulseAnimation,
                    transition: { ...pulseAnimation.transition, delay: 1 },
                  }}
                  className="absolute -top-6 -left-6 w-48 h-48 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl"
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 dark:border-amber-500/30 mb-6"
              >
                <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
                  Our Values
                </span>
              </motion.div>

              <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-amber-900 to-amber-700 dark:from-white dark:to-purple-300 bg-clip-text text-transparent">
                  What We Stand For
                </span>
              </h2>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-amber-700 dark:text-purple-300 max-w-3xl mx-auto"
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
                  className={`p-8 rounded-3xl border backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300 bg-gradient-to-br ${value.color} border-amber-100 dark:border-purple-900/50 relative overflow-hidden group`}
                  style={{ transitionDelay: `${value.delay * 1000}ms` }}
                >
                  {/* Floating background effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />

                  <motion.div
                    initial={{ rotate: -180, scale: 0 }}
                    whileInView={{ rotate: 0, scale: 1 }}
                    transition={{ delay: value.delay + 0.2, type: "spring" }}
                    className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-cream-50 to-cream-100 dark:from-gray-800 dark:to-gray-900 mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300"
                  >
                    {value.icon}
                  </motion.div>

                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: value.delay + 0.3 }}
                    className="text-2xl font-bold text-amber-900 dark:text-white mb-4"
                  >
                    {value.title}
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: value.delay + 0.4 }}
                    className="text-amber-700 dark:text-purple-300"
                  >
                    {value.description}
                  </motion.p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 dark:border-amber-500/30 mb-6"
              >
                <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
                  Meet Our Team
                </span>
              </motion.div>

              <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-amber-900 to-amber-700 dark:from-white dark:to-purple-300 bg-clip-text text-transparent">
                  The People Behind The Magic
                </span>
              </h2>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-xl text-amber-700 dark:text-purple-300 max-w-3xl mx-auto"
              >
                Passionate professionals dedicated to your shopping experience
              </motion.p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { y: 50, opacity: 0, rotateX: 15 },
                    visible: {
                      y: 0,
                      opacity: 1,
                      rotateX: 0,
                      transition: {
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                        delay: member.delay,
                      },
                    },
                  }}
                  whileHover={{
                    y: -15,
                    scale: 1.05,
                    transition: { type: "spring", stiffness: 300 },
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative"
                >
                  <div className="bg-gradient-to-br from-white/90 to-white/80 dark:from-gray-800/90 dark:to-gray-900/90 backdrop-blur-xl rounded-3xl p-8 border border-amber-100 dark:border-purple-900/50 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                    {/* Card shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.6 }}
                    />

                    <div className="relative mb-6">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400 }}
                        className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-amber-100 dark:border-purple-900/50 relative group-hover:border-amber-300 dark:group-hover:border-purple-500 transition-all duration-300"
                      >
                        <motion.img
                          initial={{ scale: 1.1 }}
                          whileInView={{ scale: 1 }}
                          transition={{ delay: member.delay + 0.2 }}
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-amber-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.div>
                      <motion.div
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
                        animate={{
                          scale: [1, 1.2, 1],
                          transition: {
                            duration: 2,
                            repeat: Infinity,
                            delay: member.delay,
                          },
                        }}
                      />
                    </div>

                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: member.delay + 0.3 }}
                      className="text-2xl font-bold text-amber-900 dark:text-white text-center mb-2"
                    >
                      {member.name}
                    </motion.h3>

                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: member.delay + 0.4 }}
                      className="text-amber-600 dark:text-amber-400 font-medium text-center mb-4"
                    >
                      {member.role}
                    </motion.div>

                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: member.delay + 0.5 }}
                      className="text-amber-700 dark:text-purple-300 text-center"
                    >
                      {member.bio}
                    </motion.p>
                  </div>
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
                className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-purple-500/10"
                animate={{
                  background: [
                    "linear-gradient(45deg, rgba(245,158,11,0.1), rgba(249,115,22,0.1), rgba(168,85,247,0.1))",
                    "linear-gradient(45deg, rgba(168,85,247,0.1), rgba(245,158,11,0.1), rgba(249,115,22,0.1))",
                    "linear-gradient(45deg, rgba(249,115,22,0.1), rgba(168,85,247,0.1), rgba(245,158,11,0.1))",
                  ],
                }}
                transition={{ duration: 10, repeat: Infinity }}
              />

              {/* Floating particles */}
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-amber-400/30 dark:bg-purple-400/30"
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

              <div className="relative bg-gradient-to-r from-amber-500/5 to-orange-500/5 border border-amber-500/20 dark:border-amber-500/30 backdrop-blur-xl rounded-3xl p-12 text-center">
                <motion.h2
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-3xl lg:text-5xl font-bold mb-6"
                >
                  <span className="bg-gradient-to-r from-amber-900 to-amber-700 dark:from-white dark:to-purple-300 bg-clip-text text-transparent">
                    Join Our Community
                  </span>
                </motion.h2>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-xl text-amber-700 dark:text-purple-300 mb-8 max-w-2xl mx-auto"
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
                      boxShadow: "0 20px 40px rgba(245, 158, 11, 0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    animate={pulseAnimation}
                    className="px-10 py-5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-lg hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300 relative overflow-hidden group"
                  >
                    <span className="relative z-10">Shop Now</span>
                    <motion.div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.button>

                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(168, 85, 247, 0.2)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="px-10 py-5 rounded-xl bg-gradient-to-r from-white/80 to-white/60 dark:from-gray-700 dark:to-gray-800 text-amber-700 dark:text-purple-300 font-bold text-lg border-2 border-amber-300 dark:border-purple-600 hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                  >
                    <span className="relative z-10">Contact Us</span>
                    <motion.div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 dark:from-gray-600/20 dark:to-gray-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
