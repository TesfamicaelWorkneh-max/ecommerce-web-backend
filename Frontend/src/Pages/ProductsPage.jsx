// // import React, { useState, useEffect } from "react";
// // import Slider from "react-slick";
// // import "slick-carousel/slick/slick.css";
// // import "slick-carousel/slick/slick-theme.css";
// // import ProductCard from "../Components/ProductCard";
// // import { FaChevronLeft, FaChevronRight, FaArrowRight } from "react-icons/fa";
// // import { motion } from "framer-motion";
// // import { Link } from "react-router-dom";
// // import { fetchWithAuth } from "../utils/auth";

// // const BACKEND_URL = import.meta.env.VITE_API_URL;

// // const NextArrow = ({ onClick }) => (
// //   <motion.div
// //     className="absolute top-1/2 -right-4 lg:-right-6 -translate-y-1/2 z-20"
// //     whileHover={{ scale: 1.1 }}
// //     whileTap={{ scale: 0.9 }}
// //     initial={{ opacity: 0, x: 10 }}
// //     animate={{ opacity: 1, x: 0 }}
// //     transition={{ duration: 0.3 }}
// //   >
// //     <button
// //       className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white flex items-center justify-center shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 border-2 border-white/20 backdrop-blur-sm transition-all duration-300 group"
// //       onClick={onClick}
// //       aria-label="Next slide"
// //     >
// //       <FaChevronRight className="text-lg group-hover:scale-110 transition-transform duration-300" />
// //     </button>
// //   </motion.div>
// // );

// // const PrevArrow = ({ onClick }) => (
// //   <motion.div
// //     className="absolute top-1/2 -left-4 lg:-left-6 -translate-y-1/2 z-20"
// //     whileHover={{ scale: 1.1 }}
// //     whileTap={{ scale: 0.9 }}
// //     initial={{ opacity: 0, x: -10 }}
// //     animate={{ opacity: 1, x: 0 }}
// //     transition={{ duration: 0.3 }}
// //   >
// //     <button
// //       className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white flex items-center justify-center shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 border-2 border-white/20 backdrop-blur-sm transition-all duration-300 group"
// //       onClick={onClick}
// //       aria-label="Previous slide"
// //     >
// //       <FaChevronLeft className="text-lg group-hover:scale-110 transition-transform duration-300" />
// //     </button>
// //   </motion.div>
// // );

// // const ProductsPage = () => {
// //   const [groupedProducts, setGroupedProducts] = useState({});
// //   const [slidesToShow, setSlidesToShow] = useState(4);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const limit = 8;

// //   useEffect(() => {
// //     const fetchProducts = async () => {
// //       try {
// //         setIsLoading(true);
// //         const res = await fetchWithAuth(`${BACKEND_URL}/api/products`);
// //         const data = await res.json();
// //         setGroupedProducts(data);
// //       } catch (err) {
// //         console.error("Error fetching products:", err);
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     };
// //     fetchProducts();
// //   }, []);

// //   useEffect(() => {
// //     const handleResize = () => {
// //       const w = window.innerWidth;
// //       if (w < 640) setSlidesToShow(1);
// //       else if (w < 768) setSlidesToShow(2);
// //       else if (w < 1024) setSlidesToShow(3);
// //       else setSlidesToShow(4);
// //     };
// //     handleResize();
// //     window.addEventListener("resize", handleResize);
// //     return () => window.removeEventListener("resize", handleResize);
// //   }, []);

// //   const sliderSettings = {
// //     dots: true,
// //     infinite: true,
// //     speed: 600,
// //     slidesToScroll: 1,
// //     slidesToShow,
// //     autoplay: true,
// //     autoplaySpeed: 5000,
// //     nextArrow: <NextArrow />,
// //     prevArrow: <PrevArrow />,
// //     appendDots: (dots) => (
// //       <ul className="flex justify-center gap-3 mt-8 lg:mt-10">{dots}</ul>
// //     ),
// //     customPaging: () => (
// //       <div className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-400/40 to-amber-600/40 hover:from-amber-400 hover:to-amber-600 transition-all duration-300 cursor-pointer" />
// //     ),
// //     pauseOnHover: true,
// //     swipeToSlide: true,
// //     responsive: [
// //       {
// //         breakpoint: 1024,
// //         settings: {
// //           slidesToShow: 3,
// //           slidesToScroll: 1,
// //         },
// //       },
// //       {
// //         breakpoint: 768,
// //         settings: {
// //           slidesToShow: 2,
// //           slidesToScroll: 1,
// //         },
// //       },
// //       {
// //         breakpoint: 640,
// //         settings: {
// //           slidesToShow: 1,
// //           slidesToScroll: 1,
// //         },
// //       },
// //     ],
// //   };

// //   if (isLoading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50/30 via-white to-rose-50/20 dark:from-slate-950/95 dark:via-slate-900 dark:to-slate-950/95">
// //         <div className="relative">
// //           <div className="w-20 h-20 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
// //           <div
// //             className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-amber-600 rounded-full animate-spin"
// //             style={{ animationDuration: "1.5s" }}
// //           />
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0 }}
// //       animate={{ opacity: 1 }}
// //       transition={{ duration: 0.8 }}
// //       className="flex items-center justify-center min-h-screen bg-gradient-to-br from-amber-50/30 via-white to-rose-50/20 dark:from-slate-950/95 dark:via-slate-900 dark:to-slate-950/95"
// //     >
// //       {/* Custom Slider Styles */}
// //       <style>{`
// //         .slick-dots li.slick-active div {
// //           background: linear-gradient(to right, #f59e0b, #d97706);
// //           transform: scale(1.3);
// //           box-shadow: 0 0 12px rgba(245, 158, 11, 0.5);
// //         }
// //         .slick-dots li div {
// //           transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
// //         }
// //         .slick-dots li div:hover {
// //           transform: scale(1.2);
// //           background: linear-gradient(to right, #fbbf24, #f59e0b);
// //         }
// //         .slick-list {
// //           padding: 20px 10px !important;
// //           margin: 0 -10px;
// //         }
// //         @media (max-width: 640px) {
// //           .slick-list {
// //             padding: 10px 5px !important;
// //             margin: 0 -5px;
// //           }
// //         }
// //         .slick-slide > div {
// //           padding: 10px;
// //         }
// //         .slick-slide {
// //           transition: transform 0.4s ease;
// //         }
// //         .slick-slide.slick-active {
// //           transform: translateY(-8px);
// //         }
// //       `}</style>

// //       <div className="max-w-7xl  w-full py-12 lg:py-20">
// //         {/* Header */}
// //         <motion.div
// //           initial={{ opacity: 0, y: -20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ duration: 0.6 }}
// //           className="text-center mb-16 lg:mb-20"
// //         >
// //           <h1 className="text-4xl lg:text-6xl font-bold mb-6">
// //             <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-rose-500 bg-clip-text text-transparent">
// //               Premium Collections
// //             </span>
// //           </h1>
// //           <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
// //             Discover our curated selection of premium products, carefully
// //             crafted for your beauty and wellness journey.
// //           </p>
// //         </motion.div>

// //         {Object.entries(groupedProducts).map(
// //           ([categoryName, products], categoryIndex) => {
// //             const visibleProducts = products.slice(0, limit);

// //             if (visibleProducts.length === 0) return null;

// //             return (
// //               <motion.div
// //                 key={categoryName}
// //                 initial={{ opacity: 0, y: 40 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
// //                 className="mb-24 lg:mb-32 last:mb-0"
// //               >
// //                 {/* Category Header */}
// //                 <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10 lg:mb-14 gap-4">
// //                   <div className="text-center lg:text-left">
// //                     <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-rose-500/10 border border-amber-500/20 dark:border-amber-500/30 mb-4">
// //                       <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
// //                         Collection
// //                       </span>
// //                     </div>
// //                     <h2 className="text-3xl lg:text-5xl font-bold text-slate-800 dark:text-white">
// //                       {categoryName}
// //                       <span className="bg-gradient-to-r from-amber-500 to-amber-600 bg-clip-text text-transparent ml-2">
// //                         Collection
// //                       </span>
// //                     </h2>
// //                     <p className="text-slate-600 dark:text-slate-400 mt-3 max-w-2xl">
// //                       Explore our premium {categoryName.toLowerCase()}{" "}
// //                       selection, featuring the finest products for your needs.
// //                     </p>
// //                   </div>

// //                   <motion.div
// //                     whileHover={{ scale: 1.05 }}
// //                     whileTap={{ scale: 0.95 }}
// //                   >
// //                     <Link
// //                       to={`/category/${encodeURIComponent(categoryName.toLowerCase())}`}
// //                       className="group flex items-center gap-3 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 to-rose-500/10 hover:from-amber-500/20 hover:to-rose-500/20 border border-amber-500/30 dark:border-amber-500/20 text-amber-700 dark:text-amber-300 font-semibold transition-all duration-300"
// //                     >
// //                       <span>View All {categoryName}</span>
// //                       <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
// //                     </Link>
// //                   </motion.div>
// //                 </div>

// //                 {/* Slider */}
// //                 <div className="relative">
// //                   <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

// //                   <Slider {...sliderSettings} className="relative z-10">
// //                     {visibleProducts.map((product, index) => (
// //                       <div key={product._id} className="px-2">
// //                         <ProductCard product={product} index={index} />
// //                       </div>
// //                     ))}
// //                   </Slider>

// //                   {/* Gradient Overlays */}
// //                   <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />
// //                   <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-white dark:from-slate-950 to-transparent z-10 pointer-events-none" />
// //                 </div>

// //                 {/* View All Button for Mobile */}
// //                 <div className="mt-10 lg:hidden flex justify-center">
// //                   <motion.div
// //                     whileHover={{ scale: 1.05 }}
// //                     whileTap={{ scale: 0.95 }}
// //                   >
// //                     <Link
// //                       to={`/category/${encodeURIComponent(categoryName.toLowerCase())}`}
// //                       className="group px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold flex items-center gap-3 hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300"
// //                     >
// //                       <span>View All {categoryName}</span>
// //                       <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
// //                     </Link>
// //                   </motion.div>
// //                 </div>
// //               </motion.div>
// //             );
// //           }
// //         )}

// //         {/* Empty State */}
// //         {Object.keys(groupedProducts).length === 0 && !isLoading && (
// //           <motion.div
// //             initial={{ opacity: 0, scale: 0.9 }}
// //             animate={{ opacity: 1, scale: 1 }}
// //             className="text-center py-20"
// //           >
// //             <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-amber-500/10 to-rose-500/10 mb-6">
// //               <FaArrowRight className="text-amber-600 dark:text-amber-400 text-3xl rotate-90" />
// //             </div>
// //             <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">
// //               No Products Found
// //             </h3>
// //             <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
// //               We're currently updating our collection. Check back soon for our
// //               premium products.
// //             </p>
// //           </motion.div>
// //         )}

// //         {/* Footer CTA */}
// //         <motion.div
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ duration: 0.6, delay: 0.3 }}
// //           className="mt-20 lg:mt-28 text-center"
// //         >
// //           <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500/10 to-rose-500/10 border border-amber-500/20 dark:border-amber-500/30 mb-6">
// //             <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
// //               ✨ Premium Quality Guaranteed
// //             </span>
// //           </div>
// //           <h3 className="text-2xl lg:text-4xl font-bold text-slate-800 dark:text-white mb-6">
// //             Ready to Elevate Your Routine?
// //           </h3>
// //           <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8">
// //             Explore all our collections and discover the perfect products for
// //             your needs.
// //           </p>
// //           <motion.div
// //             whileHover={{ scale: 1.05 }}
// //             whileTap={{ scale: 0.95 }}
// //             className="inline-block"
// //           >
// //             <Link
// //               to="/products/all"
// //               className="group px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold text-lg flex items-center gap-3 hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-300"
// //             >
// //               <span>Browse All Collections</span>
// //               <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
// //             </Link>
// //           </motion.div>
// //         </motion.div>
// //       </div>
// //     </motion.div>
// //   );
// // };

// // export default ProductsPage;
// import React, { useState, useEffect } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import ProductCard from "../Components/ProductCard";
// import { FaChevronLeft, FaChevronRight, FaArrowRight } from "react-icons/fa";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { fetchWithAuth } from "../utils/auth";

// const BACKEND_URL = import.meta.env.VITE_API_URL;

// const NextArrow = ({ onClick }) => (
//   <motion.div
//     className="absolute top-1/2 -right-4 lg:-right-6 -translate-y-1/2 z-20"
//     whileHover={{ scale: 1.1 }}
//     whileTap={{ scale: 0.9 }}
//     initial={{ opacity: 0, x: 10 }}
//     animate={{ opacity: 1, x: 0 }}
//     transition={{ duration: 0.3 }}
//   >
//     <button
//       className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-amber-200 dark:bg-amber-600 text-white flex items-center justify-center border border-amber-400 dark:border-amber-700 transition-all duration-300 group"
//       onClick={onClick}
//       aria-label="Next slide"
//     >
//       <FaChevronRight className="text-lg group-hover:scale-110 transition-transform duration-300" />
//     </button>
//   </motion.div>
// );

// const PrevArrow = ({ onClick }) => (
//   <motion.div
//     className="absolute top-1/2 -left-4 lg:-left-6 -translate-y-1/2 z-20"
//     whileHover={{ scale: 1.1 }}
//     whileTap={{ scale: 0.9 }}
//     initial={{ opacity: 0, x: -10 }}
//     animate={{ opacity: 1, x: 0 }}
//     transition={{ duration: 0.3 }}
//   >
//     <button
//       className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-amber-200 dark:bg-amber-600 text-white flex items-center justify-center border border-amber-400 dark:border-amber-700 transition-all duration-300 group"
//       onClick={onClick}
//       aria-label="Previous slide"
//     >
//       <FaChevronLeft className="text-lg group-hover:scale-110 transition-transform duration-300" />
//     </button>
//   </motion.div>
// );

// const ProductsPage = () => {
//   const [groupedProducts, setGroupedProducts] = useState({});
//   const [slidesToShow, setSlidesToShow] = useState(4);
//   const [isLoading, setIsLoading] = useState(true);
//   const limit = 8;

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setIsLoading(true);
//         const res = await fetchWithAuth(`${BACKEND_URL}/api/products`);
//         const data = await res.json();
//         setGroupedProducts(data);
//       } catch (err) {
//         console.error("Error fetching products:", err);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     const handleResize = () => {
//       const w = window.innerWidth;
//       if (w < 640) setSlidesToShow(1);
//       else if (w < 768) setSlidesToShow(2);
//       else if (w < 1024) setSlidesToShow(3);
//       else setSlidesToShow(4);
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 600,
//     slidesToScroll: 1,
//     slidesToShow,
//     autoplay: true,
//     autoplaySpeed: 5000,
//     nextArrow: <NextArrow />,
//     prevArrow: <PrevArrow />,
//     dots: true,
//     appendDots: (dots) => (
//       <ul className="flex justify-center gap-3 mt-2 lg:mt-10">
//         {dots.slice(0, 4)} {/* Only show 4 dots max */}
//       </ul>
//     ),
//     customPaging: () => (
//       <div className="w-2 h-2 rounded-full bg-amber-200 dark:bg-amber-500 hover:bg-amber-500 dark:hover:bg-amber-400 transition-all duration-300 cursor-pointer" />
//     ),
//     pauseOnHover: true,
//     swipeToSlide: true,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 4,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 3,
//           slidesToScroll: 1,
//         },
//       },
//       {
//         breakpoint: 640,
//         settings: {
//           slidesToShow: 1,
//           slidesToScroll: 1,
//         },
//       },
//     ],
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#EBD5AB] dark:bg-gray-900">
//         <div className="relative">
//           <div className="w-20 h-20 border-4 border-amber-100 dark:border-amber-900/30 border-t-amber-500 dark:border-t-amber-600 rounded-full animate-spin" />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.8 }}
//       className="min-h-screen bg-[#DCD7C9] dark:bg-gray-900 max:sm-py-24 flex items-center justify-center"
//     >
//       {/* Custom Slider Styles */}
//       <style>{`
//         .slick-dots li.slick-active div {
//           background: #f59e0b;
//           transform: scale(1.2);
//         }
//         .slick-dots li div {
//           transition: all 0.3s ease;
//         }
//         .slick-dots li div:hover {
//           transform: scale(1.1);
//           background: #fbbf24;
//         }
//         .slick-list {
//           padding: 20px 10px !important;
//           margin: 0 -10px;
//         }
//         @media (max-width: 640px) {
//           .slick-list {
//             padding: 10px 5px !important;
//             margin: 0 -5px;
//           }
//         }
//         .slick-slide > div {
//           padding: 10px;
//         }
//         .slick-slide {
//           transition: transform 0.3s ease;
//         }
//         .slick-slide.slick-active {
//           transform: translateY(-5px);
//         }
//       `}</style>

//       <div className="max-w-7xl mx-auto w-full lg:py-20 px-4 sm:px-6 lg:px-8">
//         {/* Header with scroll animation */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="text-center mb-16 lg:mb-20"
//         >
//           <motion.div
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ delay: 0.2 }}
//             viewport={{ once: true }}
//             className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 mb-6"
//           >
//             <span className="text-sm font-medium text-amber-800 dark:text-amber-300">
//               Our Collections
//             </span>
//           </motion.div>

//           <motion.h1
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.3 }}
//             viewport={{ once: true }}
//             className="text-4xl lg:text-6xl font-bold mb-6"
//           >
//             <span className="text-gray-900 dark:text-white">Premium</span>
//             <span className="text-amber-600 dark:text-amber-400 ml-3">
//               Collections
//             </span>
//           </motion.h1>

//           <motion.p
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//             viewport={{ once: true }}
//             className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
//           >
//             Discover our curated selection of premium products, carefully
//             crafted for your beauty and wellness journey.
//           </motion.p>
//         </motion.div>

//         {Object.entries(groupedProducts).map(
//           ([categoryName, products], categoryIndex) => {
//             const visibleProducts = products.slice(0, limit);

//             if (visibleProducts.length === 0) return null;

//             return (
//               <motion.div
//                 key={categoryName}
//                 initial={{ opacity: 0, y: 40 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
//                 viewport={{ once: true, margin: "-100px" }}
//                 className="mb-24 lg:mb-32 last:mb-0"
//               >
//                 {/* Category Header */}
//                 <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10 lg:mb-14 gap-4">
//                   <div className="text-center lg:text-left">
//                     <motion.h2
//                       initial={{ opacity: 0 }}
//                       whileInView={{ opacity: 1 }}
//                       transition={{ delay: 0.2 }}
//                       viewport={{ once: true }}
//                       className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3"
//                     >
//                       {categoryName}
//                       <span className="text-amber-600 dark:text-amber-400 ml-2">
//                         Collection
//                       </span>
//                     </motion.h2>
//                     <motion.p
//                       initial={{ opacity: 0 }}
//                       whileInView={{ opacity: 1 }}
//                       transition={{ delay: 0.3 }}
//                       viewport={{ once: true }}
//                       className="text-gray-600 dark:text-gray-400 max-w-2xl"
//                     >
//                       Explore our premium {categoryName.toLowerCase()}{" "}
//                       selection, featuring the finest products for your needs.
//                     </motion.p>
//                   </div>

//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     whileInView={{ opacity: 1 }}
//                     transition={{ delay: 0.4 }}
//                     viewport={{ once: true }}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     <Link
//                       to={`/category/${encodeURIComponent(categoryName.toLowerCase())}`}
//                       className="group flex items-center gap-3 px-6 py-3.5 rounded-xl bg-amber-100 dark:bg-amber-900/30 hover:bg-amber-200 dark:hover:bg-amber-900/50 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 font-semibold transition-all duration-300"
//                     >
//                       <span>View All {categoryName}</span>
//                       <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
//                     </Link>
//                   </motion.div>
//                 </div>
//                 {/* Slider */}
//                 <div className="relative">
//                   <Slider {...sliderSettings} className="relative z-10">
//                     {visibleProducts.map((product, index) => (
//                       <div key={product._id} className="px-2">
//                         <ProductCard product={product} index={index} />
//                       </div>
//                     ))}
//                   </Slider>
//                 </div>

//                 <motion.div
//                   // initial={{ opacity: 0 }}
//                   whileInView={{ opacity: 1 }}
//                   transition={{ delay: 0.5 }}
//                   viewport={{ once: true }}
//                   className="mt-6 lg:hidden flex justify-center"
//                 >
//                   <motion.div
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     <Link
//                       to={`/category/${encodeURIComponent(categoryName.toLowerCase())}`}
//                       className="group px-8 py-3.5 rounded-xl bg-amber-200 dark:bg-amber-600 text-white font-semibold flex items-center gap-3 transition-all duration-300"
//                     >
//                       <span>View All {categoryName}</span>
//                       <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
//                     </Link>
//                   </motion.div>
//                 </motion.div>
//               </motion.div>
//             );
//           }
//         )}

//         {/* Empty State */}
//         {Object.keys(groupedProducts).length === 0 && !isLoading && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="text-center py-20"
//           >
//             <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-amber-100 dark:bg-amber-900/30 mb-6">
//               <FaArrowRight className="text-amber-600 dark:text-amber-400 text-3xl rotate-90" />
//             </div>
//             <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
//               No Products Found
//             </h3>
//             <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
//               We're currently updating our collection. Check back soon for our
//               premium products.
//             </p>
//           </motion.div>
//         )}

//         {/* Footer CTA */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.3 }}
//           viewport={{ once: true }}
//           className="mt-20 lg:mt-28 text-center"
//         >
//           <motion.div
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ delay: 0.4 }}
//             viewport={{ once: true }}
//             className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 mb-6"
//           >
//             <span className="text-sm font-medium text-amber-800 dark:text-amber-300">
//               Premium Quality Guaranteed
//             </span>
//           </motion.div>

//           <motion.h3
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ delay: 0.5 }}
//             viewport={{ once: true }}
//             className="text-2xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6"
//           >
//             Ready to Elevate Your Routine?
//           </motion.h3>

//           <motion.p
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ delay: 0.6 }}
//             viewport={{ once: true }}
//             className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8"
//           >
//             Explore all our collections and discover the perfect products for
//             your needs.
//           </motion.p>

//           <motion.div
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ delay: 0.7 }}
//             viewport={{ once: true }}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="inline-block"
//           >
//             <Link
//               to="/products/all"
//               className="group px-8 py-4 mb-4 rounded-xl bg-amber-500 dark:bg-amber-600 text-white font-semibold text-lg flex items-center gap-3 transition-all duration-300"
//             >
//               <span>Browse All Collections</span>
//               <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
//             </Link>
//           </motion.div>
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

// export default ProductsPage;
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "../Components/ProductCard";
import { FaChevronLeft, FaChevronRight, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { fetchWithAuth } from "../utils/auth";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const NextArrow = ({ onClick }) => (
  <motion.div
    className="absolute top-1/2 -right-4 lg:-right-6 -translate-y-1/2 z-20"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    initial={{ opacity: 0, x: 10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3 }}
  >
    <button
      className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-[#D8C9A7] dark:bg-[#D7C097] text-gray-800 dark:text-gray-900 flex items-center justify-center border border-[#D7C097] dark:border-[#D8C9A7] transition-all duration-300 group hover:bg-[#D7C097] dark:hover:bg-[#D8C9A7]"
      onClick={onClick}
      aria-label="Next slide"
    >
      <FaChevronRight className="text-lg group-hover:scale-110 transition-transform duration-300" />
    </button>
  </motion.div>
);

const PrevArrow = ({ onClick }) => (
  <motion.div
    className="absolute top-1/2 -left-4 lg:-left-6 -translate-y-1/2 z-20"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3 }}
  >
    <button
      className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-[#D8C9A7] dark:bg-[#D7C097] text-gray-800 dark:text-gray-900 flex items-center justify-center border border-[#D7C097] dark:border-[#D8C9A7] transition-all duration-300 group hover:bg-[#D7C097] dark:hover:bg-[#D8C9A7]"
      onClick={onClick}
      aria-label="Previous slide"
    >
      <FaChevronLeft className="text-lg group-hover:scale-110 transition-transform duration-300" />
    </button>
  </motion.div>
);

const ProductsPage = () => {
  const [groupedProducts, setGroupedProducts] = useState({});
  const [slidesToShow, setSlidesToShow] = useState(4);
  const [isLoading, setIsLoading] = useState(true);
  const limit = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const res = await fetchWithAuth(`${BACKEND_URL}/api/products`);
        const data = await res.json();
        setGroupedProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) setSlidesToShow(1);
      else if (w < 768) setSlidesToShow(2);
      else if (w < 1024) setSlidesToShow(3);
      else setSlidesToShow(4);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToScroll: 1,
    slidesToShow,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    dots: true,
    appendDots: (dots) => (
      <ul className="flex justify-center gap-3 mt-2 lg:mt-10">
        {dots.slice(0, 4)}
      </ul>
    ),
    customPaging: () => (
      <div className="w-2 h-2 rounded-full bg-[#D8C9A7] dark:bg-[#D7C097] hover:bg-[#D7C097] dark:hover:bg-[#D8C9A7] transition-all duration-300 cursor-pointer" />
    ),
    pauseOnHover: true,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#EEEEEE] dark:bg-gray-900">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-[#D8C9A7] dark:border-[#D7C097]/30 border-t-[#D7C097] dark:border-t-[#D8C9A7] rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-[#EEEEEE] dark:bg-gray-900 max:sm-py-24 flex items-center justify-center"
    >
      {/* Custom Slider Styles */}
      <style>{`
        .slick-dots li.slick-active div {
          background: #D7C097;
          transform: scale(1.2);
        }
        .slick-dots li div {
          transition: all 0.3s ease;
        }
        .slick-dots li div:hover {
          transform: scale(1.1);
          background: #D8C9A7;
        }
        .slick-list {
          padding: 20px 10px !important;
          margin: 0 -10px;
        }
        @media (max-width: 640px) {
          .slick-list {
            padding: 10px 5px !important;
            margin: 0 -5px;
          }
        }
        .slick-slide > div {
          padding: 10px;
        }
        .slick-slide {
          transition: transform 0.3s ease;
        }
        .slick-slide.slick-active {
          transform: translateY(-5px);
        }
      `}</style>

      <div className="max-w-7xl mx-auto w-full lg:py-20 px-4 sm:px-6 lg:px-8">
        {/* Header with scroll animation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16 lg:mb-20"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#D8C9A7] dark:bg-[#D7C097]/30 border border-[#D7C097] dark:border-[#D8C9A7]/50 mb-6"
          >
            <span className="text-sm font-medium text-gray-800 dark:text-gray-900">
              Our Collections
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-6xl font-bold mb-6"
          >
            <span className="text-gray-900 dark:text-white">Premium</span>
            <span className="text-[#D7C097] dark:text-[#D8C9A7] ml-3">
              Collections
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Discover our curated selection of premium products, carefully
            crafted for your beauty and wellness journey.
          </motion.p>
        </motion.div>

        {Object.entries(groupedProducts).map(
          ([categoryName, products], categoryIndex) => {
            const visibleProducts = products.slice(0, limit);

            if (visibleProducts.length === 0) return null;

            return (
              <motion.div
                key={categoryName}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="mb-24 lg:mb-32 last:mb-0"
              >
                {/* Category Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10 lg:mb-14 gap-4">
                  <div className="text-center lg:text-left">
                    <motion.h2
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      viewport={{ once: true }}
                      className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3"
                    >
                      {categoryName}
                      <span className="text-[#D7C097] dark:text-[#D8C9A7] ml-2">
                        Collection
                      </span>
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      viewport={{ once: true }}
                      className="text-gray-600 dark:text-gray-400 max-w-2xl"
                    >
                      Explore our premium {categoryName.toLowerCase()}{" "}
                      selection, featuring the finest products for your needs.
                    </motion.p>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={`/category/${encodeURIComponent(categoryName.toLowerCase())}`}
                      className="group flex items-center gap-3 px-6 py-3.5 rounded-xl bg-[#D8C9A7] dark:bg-[#D7C097]/30 hover:bg-[#D7C097] dark:hover:bg-[#D8C9A7]/50 border border-[#D7C097] dark:border-[#D8C9A7] text-gray-800 dark:text-gray-900 font-semibold transition-all duration-300"
                    >
                      <span>View All {categoryName}</span>
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </motion.div>
                </div>
                {/* Slider */}
                <div className="relative">
                  <Slider {...sliderSettings} className="relative z-10">
                    {visibleProducts.map((product, index) => (
                      <div key={product._id} className="px-2">
                        <ProductCard product={product} index={index} />
                      </div>
                    ))}
                  </Slider>
                </div>

                <motion.div
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  viewport={{ once: true }}
                  className="mt-6 lg:hidden flex justify-center"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={`/category/${encodeURIComponent(categoryName.toLowerCase())}`}
                      className="group px-8 py-3.5 rounded-xl bg-[#D8C9A7] dark:bg-[#D7C097] text-gray-900 dark:text-gray-900 font-semibold flex items-center gap-3 transition-all duration-300 hover:bg-[#D7C097] dark:hover:bg-[#D8C9A7]"
                    >
                      <span>View All {categoryName}</span>
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          }
        )}

        {/* Empty State */}
        {Object.keys(groupedProducts).length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#D8C9A7] dark:bg-[#D7C097]/30 mb-6">
              <FaArrowRight className="text-[#D7C097] dark:text-[#D8C9A7] text-3xl rotate-90" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              No Products Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              We're currently updating our collection. Check back soon for our
              premium products.
            </p>
          </motion.div>
        )}

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 lg:mt-28 text-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8C9A7] dark:bg-[#D7C097]/30 border border-[#D7C097] dark:border-[#D8C9A7] mb-6"
          >
            <span className="text-sm font-medium text-gray-800 dark:text-gray-900">
              Premium Quality Guaranteed
            </span>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="text-2xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Ready to Elevate Your Routine?
          </motion.h3>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8"
          >
            Explore all our collections and discover the perfect products for
            your needs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link
              to="/products/all"
              className="group px-8 py-4 mb-4 rounded-xl bg-[#D8C9A7] dark:bg-[#D7C097] text-gray-900 dark:text-gray-900 font-semibold text-lg flex items-center gap-3 transition-all duration-300 hover:bg-[#D7C097] dark:hover:bg-[#D8C9A7]"
            >
              <span>Browse All Collections</span>
              <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductsPage;
