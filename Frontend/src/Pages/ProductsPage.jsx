// // // // import React, { useState, useEffect } from "react";
// // // // import Slider from "react-slick";
// // // // import "slick-carousel/slick/slick.css";
// // // // import "slick-carousel/slick/slick-theme.css";
// // // // import ProductCard from "../Components/ProductCard";
// // // // import {
// // // //   FaChevronLeft,
// // // //   FaChevronRight,
// // // //   FaArrowRight,
// // // //   FaStar,
// // // //   FaCrown,
// // // //   FaGem,
// // // //   FaHeart,
// // // //   FaRegGem,
// // // // } from "react-icons/fa";
// // // // import { motion } from "framer-motion";
// // // // import { Link } from "react-router-dom";
// // // // import { fetchWithAuth } from "../utils/auth";

// // // // const BACKEND_URL = import.meta.env.VITE_API_URL;

// // // // const NextArrow = ({ onClick }) => (
// // // //   <div className="absolute top-1/2 -right-4 lg:-right-6 -translate-y-1/2 z-20">
// // // //     <button
// // // //       className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-accent dark:bg-accent/80 text-dark dark:text-white flex items-center justify-center border border-lightBg dark:border-lightBg/50 shadow-lg hover:bg-lightBg dark:hover:bg-lightBg/80 transition-colors duration-300"
// // // //       onClick={onClick}
// // // //       aria-label="Next slide"
// // // //     >
// // // //       <FaChevronRight className="text-lg" />
// // // //     </button>
// // // //   </div>
// // // // );

// // // // const PrevArrow = ({ onClick }) => (
// // // //   <div className="absolute top-1/2 -left-4 lg:-left-6 -translate-y-1/2 z-20">
// // // //     <button
// // // //       className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-accent dark:bg-accent/80 text-dark dark:text-white flex items-center justify-center border border-lightBg dark:border-lightBg/50 shadow-lg hover:bg-lightBg dark:hover:bg-lightBg/80 transition-colors duration-300"
// // // //       onClick={onClick}
// // // //       aria-label="Previous slide"
// // // //     >
// // // //       <FaChevronLeft className="text-lg" />
// // // //     </button>
// // // //   </div>
// // // // );

// // // // const ProductsPage = () => {
// // // //   const [groupedProducts, setGroupedProducts] = useState({});
// // // //   const [slidesToShow, setSlidesToShow] = useState(4);
// // // //   const [isLoading, setIsLoading] = useState(true);
// // // //   const limit = 8;

// // // //   useEffect(() => {
// // // //     const fetchProducts = async () => {
// // // //       try {
// // // //         setIsLoading(true);
// // // //         const res = await fetchWithAuth(`${BACKEND_URL}/api/products`);
// // // //         const data = await res.json();
// // // //         setGroupedProducts(data);
// // // //       } catch (err) {
// // // //         console.error("Error fetching products:", err);
// // // //       } finally {
// // // //         setIsLoading(false);
// // // //       }
// // // //     };
// // // //     fetchProducts();
// // // //   }, []);

// // // //   useEffect(() => {
// // // //     const handleResize = () => {
// // // //       const w = window.innerWidth;
// // // //       if (w < 640) setSlidesToShow(1);
// // // //       else if (w < 768) setSlidesToShow(2);
// // // //       else if (w < 1024) setSlidesToShow(3);
// // // //       else setSlidesToShow(4);
// // // //     };
// // // //     handleResize();
// // // //     window.addEventListener("resize", handleResize);
// // // //     return () => window.removeEventListener("resize", handleResize);
// // // //   }, []);

// // // //   const sliderSettings = {
// // // //     dots: true,
// // // //     infinite: true,
// // // //     speed: 600,
// // // //     slidesToScroll: 1,
// // // //     slidesToShow,
// // // //     autoplay: true,
// // // //     autoplaySpeed: 5000,
// // // //     nextArrow: <NextArrow />,
// // // //     prevArrow: <PrevArrow />,
// // // //     dots: true,
// // // //     appendDots: (dots) => (
// // // //       <ul className="flex justify-center gap-3 mt-2 lg:mt-10">
// // // //         {dots.slice(0, 4)}
// // // //       </ul>
// // // //     ),
// // // //     customPaging: () => (
// // // //       <div className="w-2 h-2 rounded-full bg-lightBg dark:bg-lightBg/50 hover:bg-accent dark:hover:bg-accent/80 transition-colors duration-300" />
// // // //     ),
// // // //     pauseOnHover: true,
// // // //     swipeToSlide: true,
// // // //     responsive: [
// // // //       {
// // // //         breakpoint: 1024,
// // // //         settings: {
// // // //           slidesToShow: 4,
// // // //           slidesToScroll: 1,
// // // //         },
// // // //       },
// // // //       {
// // // //         breakpoint: 768,
// // // //         settings: {
// // // //           slidesToShow: 3,
// // // //           slidesToScroll: 1,
// // // //         },
// // // //       },
// // // //       {
// // // //         breakpoint: 640,
// // // //         settings: {
// // // //           slidesToShow: 1,
// // // //           slidesToScroll: 1,
// // // //         },
// // // //       },
// // // //     ],
// // // //   };

// // // //   if (isLoading) {
// // // //     return (
// // // //       <div className="min-h-screen flex items-center justify-center bg-primaryBg dark:bg-dark">
// // // //         <div className="relative">
// // // //           <div className="w-20 h-20 border-4 border-lightBg/30 dark:border-lightBg/20 border-t-accent dark:border-t-accent/80 rounded-full animate-spin" />
// // // //           <div className="absolute inset-0 flex items-center justify-center">
// // // //             <FaHeart className="text-accent dark:text-accent/80 text-2xl animate-pulse" />
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="min-h-screen bg-primaryBg dark:bg-dark">
// // // //       {/* Custom Slider Styles */}
// // // //       <style>{`
// // // //         .slick-dots li.slick-active div {
// // // //           background: #FFE2AF;
// // // //           transform: scale(1.2);
// // // //         }
// // // //         @media (prefers-color-scheme: dark) {
// // // //           .slick-dots li.slick-active div {
// // // //             background: #FFE2AFCC;
// // // //           }
// // // //         }
// // // //         .slick-dots li div {
// // // //           transition: all 0.3s ease;
// // // //         }
// // // //         .slick-dots li div:hover {
// // // //           transform: scale(1.1);
// // // //           background: #FFE2AF;
// // // //         }
// // // //         .slick-list {
// // // //           padding: 20px 10px !important;
// // // //           margin: 0 -10px;
// // // //         }
// // // //         @media (max-width: 640px) {
// // // //           .slick-list {
// // // //             padding: 10px 5px !important;
// // // //             margin: 0 -5px;
// // // //           }
// // // //         }
// // // //         .slick-slide > div {
// // // //           padding: 10px;
// // // //         }
// // // //       `}</style>

// // // //       {/* Hero Image Section */}
// // // //       <div className="relative overflow-hidden">
// // // //         <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center">
// // // //           {/* Background Image */}
// // // //           <div
// // // //             className="absolute inset-0 z-0 w-full"
// // // //             style={{
// // // //               backgroundImage: `url("/photoshoot1.jpg")`,
// // // //               backgroundSize: "cover",
// // // //               backgroundPosition: "center",
// // // //             }}
// // // //           >
// // // //             {/* Solid Overlay */}
// // // //             <div className="absolute inset-0 bg-dark/70" />
// // // //           </div>

// // // //           {/* Content */}
// // // //           <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
// // // //             <div className="mb-6">
// // // //               <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-8">
// // // //                 <FaCrown className="text-accent dark:text-accent/80 text-lg" />
// // // //                 <span className="text-sm font-medium text-white">
// // // //                   Premium Collection
// // // //                 </span>
// // // //                 <FaGem className="text-accent dark:text-accent/80 text-lg" />
// // // //               </div>
// // // //             </div>

// // // //             <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
// // // //               <span className="text-white">Discover</span>
// // // //               <span className="text-accent dark:text-accent/80 block mt-2">
// // // //                 Timeless Beauty
// // // //               </span>
// // // //             </h1>

// // // //             <p className="text-lg lg:text-xl text-gray-200 max-w-2xl mx-auto mb-10">
// // // //               Immerse yourself in our curated selection of premium cosmetics,
// // // //               where beauty meets craftsmanship in perfect harmony.
// // // //             </p>

// // // //             {/* Rating Badge */}
// // // //             <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
// // // //               <div className="flex items-center gap-1">
// // // //                 {[...Array(5)].map((_, i) => (
// // // //                   <FaStar
// // // //                     key={i}
// // // //                     className="text-accent dark:text-accent/80 text-sm"
// // // //                   />
// // // //                 ))}
// // // //               </div>
// // // //               <span className="text-white text-sm font-medium">
// // // //                 4.9/5 Customer Rating
// // // //               </span>
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         {/* Divider */}
// // // //         <div className="absolute bottom-0 left-0 right-0 h-8 bg-primaryBg dark:bg-dark" />
// // // //       </div>

// // // //       {/* Main Content */}
// // // //       <div className="max-w-7xl mx-auto w-full py-16 px-4 sm:px-6 lg:px-8">
// // // //         {/* Header */}
// // // //         <div className="text-center mb-16 lg:mb-20">
// // // //           <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-lightBg dark:bg-lightBg/20 border border-accent/30 dark:border-accent/20 mb-6">
// // // //             <span className="text-sm font-medium text-dark dark:text-white">
// // // //               Our Collections
// // // //             </span>
// // // //             <FaRegGem className="text-accent dark:text-accent/80" />
// // // //           </div>

// // // //           <h1 className="text-4xl lg:text-6xl font-bold mb-6">
// // // //             <span className="text-dark dark:text-white">Premium</span>
// // // //             <span className="text-accent dark:text-accent/80 ml-3">
// // // //               Cosmetics
// // // //             </span>
// // // //           </h1>

// // // //           <p className="text-lg lg:text-xl text-dark/70 dark:text-gray-300 max-w-3xl mx-auto">
// // // //             Discover our curated selection of premium beauty products, carefully
// // // //             crafted for your beauty and wellness journey.
// // // //           </p>
// // // //         </div>

// // // //         {Object.entries(groupedProducts).map(
// // // //           ([categoryName, products], categoryIndex) => {
// // // //             const visibleProducts = products.slice(0, limit);

// // // //             if (visibleProducts.length === 0) return null;

// // // //             return (
// // // //               <div key={categoryName} className="mb-24 lg:mb-32 last:mb-0">
// // // //                 {/* Category Header */}
// // // //                 <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10 lg:mb-14 gap-4">
// // // //                   <div className="text-center lg:text-left">
// // // //                     <h2 className="text-3xl lg:text-5xl font-bold text-dark dark:text-white mb-3">
// // // //                       {categoryName}
// // // //                       <span className="text-accent dark:text-accent/80 ml-2">
// // // //                         Collection
// // // //                       </span>
// // // //                     </h2>
// // // //                     <p className="text-dark/70 dark:text-gray-300 max-w-2xl">
// // // //                       Explore our premium {categoryName.toLowerCase()}{" "}
// // // //                       selection, featuring the finest products for your beauty
// // // //                       needs.
// // // //                     </p>
// // // //                   </div>

// // // //                   <div>
// // // //                     <Link
// // // //                       to={`/category/${encodeURIComponent(categoryName.toLowerCase())}`}
// // // //                       className="group flex items-center gap-3 px-6 py-3.5 rounded-xl bg-accent dark:bg-accent/80 hover:bg-lightBg dark:hover:bg-lightBg/30 text-dark dark:text-white font-semibold border border-lightBg dark:border-lightBg/30 transition-colors duration-300 shadow-lg"
// // // //                     >
// // // //                       <span>View All {categoryName}</span>
// // // //                       <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
// // // //                     </Link>
// // // //                   </div>
// // // //                 </div>

// // // //                 {/* Slider */}
// // // //                 <div className="relative">
// // // //                   <Slider {...sliderSettings} className="relative z-10">
// // // //                     {visibleProducts.map((product, index) => (
// // // //                       <div key={product._id} className="px-2">
// // // //                         <ProductCard product={product} index={index} />
// // // //                       </div>
// // // //                     ))}
// // // //                   </Slider>
// // // //                 </div>

// // // //                 <div className="mt-6 lg:hidden flex justify-center">
// // // //                   <Link
// // // //                     to={`/category/${encodeURIComponent(categoryName.toLowerCase())}`}
// // // //                     className="group px-8 py-3.5 rounded-xl bg-accent dark:bg-accent/80 text-dark dark:text-white font-semibold flex items-center gap-3 border border-lightBg dark:border-lightBg/30 shadow-lg"
// // // //                   >
// // // //                     <span>View All {categoryName}</span>
// // // //                     <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
// // // //                   </Link>
// // // //                 </div>
// // // //               </div>
// // // //             );
// // // //           }
// // // //         )}

// // // //         {/* Empty State */}
// // // //         {Object.keys(groupedProducts).length === 0 && !isLoading && (
// // // //           <div className="text-center py-20">
// // // //             <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-lightBg dark:bg-lightBg/20 mb-6">
// // // //               <FaHeart className="text-accent dark:text-accent/80 text-3xl" />
// // // //             </div>
// // // //             <h3 className="text-2xl font-bold text-dark dark:text-white mb-3">
// // // //               No Products Found
// // // //             </h3>
// // // //             <p className="text-dark/70 dark:text-gray-300 max-w-md mx-auto">
// // // //               We're currently updating our collection. Check back soon for our
// // // //               premium beauty products.
// // // //             </p>
// // // //           </div>
// // // //         )}

// // // //         {/* Footer CTA */}
// // // //         <div className="mt-20 lg:mt-28 text-center">
// // // //           <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-lightBg dark:bg-lightBg/20 border border-accent/30 dark:border-accent/20 mb-6">
// // // //             <span className="text-sm font-medium text-dark dark:text-white">
// // // //               Premium Quality Guaranteed
// // // //             </span>
// // // //           </div>

// // // //           <h3 className="text-2xl lg:text-4xl font-bold text-dark dark:text-white mb-6">
// // // //             Ready to Elevate Your Beauty?
// // // //           </h3>

// // // //           <p className="text-lg text-dark/70 dark:text-gray-300 max-w-2xl mx-auto mb-8">
// // // //             Explore all our collections and discover the perfect products for
// // // //             your beauty routine.
// // // //           </p>

// // // //           <div className="inline-block">
// // // //             <Link
// // // //               to="/products/all"
// // // //               className="group px-8 py-4 mb-4 rounded-xl bg-accent dark:bg-accent/80 hover:bg-lightBg dark:hover:bg-lightBg/30 text-dark dark:text-white font-semibold text-lg flex items-center gap-3 border border-lightBg dark:border-lightBg/30 shadow-lg transition-colors duration-300"
// // // //             >
// // // //               <span>Browse All Collections</span>
// // // //               <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
// // // //             </Link>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default ProductsPage;
// // // import React, { useState, useEffect, useRef } from "react";
// // // import Slider from "react-slick";
// // // import "slick-carousel/slick/slick.css";
// // // import "slick-carousel/slick/slick-theme.css";
// // // import ProductCard from "../Components/ProductCard";
// // // import {
// // //   FaChevronLeft,
// // //   FaChevronRight,
// // //   FaArrowRight,
// // //   FaStar,
// // //   FaCrown,
// // //   FaGem,
// // //   FaHeart,
// // //   FaRegGem,
// // // } from "react-icons/fa";
// // // import { motion, useInView, useAnimation } from "framer-motion";
// // // import { Link } from "react-router-dom";
// // // import { fetchWithAuth } from "../utils/auth";

// // // const BACKEND_URL = import.meta.env.VITE_API_URL;

// // // /* =======================
// // //    ANIMATION VARIANTS
// // // ======================= */
// // // const fadeUp = {
// // //   hidden: {
// // //     opacity: 0,
// // //     y: 50,
// // //   },
// // //   visible: {
// // //     opacity: 1,
// // //     y: 0,
// // //     transition: {
// // //       duration: 0.8,
// // //       ease: [0.25, 0.4, 0.25, 1],
// // //     },
// // //   },
// // // };

// // // const fadeIn = {
// // //   hidden: {
// // //     opacity: 0,
// // //   },
// // //   visible: {
// // //     opacity: 1,
// // //     transition: {
// // //       duration: 1,
// // //       ease: "easeOut",
// // //     },
// // //   },
// // // };

// // // const staggeredContainer = {
// // //   hidden: { opacity: 0 },
// // //   visible: {
// // //     opacity: 1,
// // //     transition: {
// // //       staggerChildren: 0.2,
// // //       delayChildren: 0.1,
// // //     },
// // //   },
// // // };

// // // const scaleIn = {
// // //   hidden: {
// // //     opacity: 0,
// // //     scale: 0.9,
// // //   },
// // //   visible: {
// // //     opacity: 1,
// // //     scale: 1,
// // //     transition: {
// // //       duration: 0.7,
// // //       ease: "easeOut",
// // //     },
// // //   },
// // // };

// // // // Custom hook for scroll animations
// // // const useScrollAnimation = (threshold = 0.2) => {
// // //   const ref = useRef(null);
// // //   const isInView = useInView(ref, {
// // //     once: true,
// // //     amount: threshold,
// // //     margin: "0px 0px -50px 0px",
// // //   });
// // //   const controls = useAnimation();

// // //   useEffect(() => {
// // //     if (isInView) {
// // //       controls.start("visible");
// // //     }
// // //   }, [isInView, controls]);

// // //   return [ref, controls];
// // // };

// // // const NextArrow = ({ onClick }) => (
// // //   <div className="absolute top-1/2 -right-4 lg:-right-6 -translate-y-1/2 z-20">
// // //     <button
// // //       className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-accent dark:bg-accent/80 text-dark dark:text-white flex items-center justify-center border border-lightBg dark:border-lightBg/50 shadow-lg hover:bg-lightBg dark:hover:bg-lightBg/80 transition-colors duration-300"
// // //       onClick={onClick}
// // //       aria-label="Next slide"
// // //     >
// // //       <FaChevronRight className="text-lg" />
// // //     </button>
// // //   </div>
// // // );

// // // const PrevArrow = ({ onClick }) => (
// // //   <div className="absolute top-1/2 -left-4 lg:-left-6 -translate-y-1/2 z-20">
// // //     <button
// // //       className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-accent dark:bg-accent/80 text-dark dark:text-white flex items-center justify-center border border-lightBg dark:border-lightBg/50 shadow-lg hover:bg-lightBg dark:hover:bg-lightBg/80 transition-colors duration-300"
// // //       onClick={onClick}
// // //       aria-label="Previous slide"
// // //     >
// // //       <FaChevronLeft className="text-lg" />
// // //     </button>
// // //   </div>
// // // );

// // // const ProductsPage = () => {
// // //   const [groupedProducts, setGroupedProducts] = useState({});
// // //   const [slidesToShow, setSlidesToShow] = useState(4);
// // //   const [isLoading, setIsLoading] = useState(true);
// // //   const limit = 8;

// // //   // Create refs for each section
// // //   const [heroRef, heroControls] = useScrollAnimation(0.3);
// // //   const [mainHeaderRef, mainHeaderControls] = useScrollAnimation();
// // //   const [footerRef, footerControls] = useScrollAnimation();

// // //   useEffect(() => {
// // //     const fetchProducts = async () => {
// // //       try {
// // //         setIsLoading(true);
// // //         const res = await fetchWithAuth(`${BACKEND_URL}/api/products`);
// // //         const data = await res.json();
// // //         setGroupedProducts(data);
// // //       } catch (err) {
// // //         console.error("Error fetching products:", err);
// // //       } finally {
// // //         setIsLoading(false);
// // //       }
// // //     };
// // //     fetchProducts();
// // //   }, []);

// // //   useEffect(() => {
// // //     const handleResize = () => {
// // //       const w = window.innerWidth;
// // //       if (w < 640) setSlidesToShow(1);
// // //       else if (w < 768) setSlidesToShow(2);
// // //       else if (w < 1024) setSlidesToShow(3);
// // //       else setSlidesToShow(4);
// // //     };
// // //     handleResize();
// // //     window.addEventListener("resize", handleResize);
// // //     return () => window.removeEventListener("resize", handleResize);
// // //   }, []);

// // //   const sliderSettings = {
// // //     dots: true,
// // //     infinite: true,
// // //     speed: 600,
// // //     slidesToScroll: 1,
// // //     slidesToShow,
// // //     autoplay: true,
// // //     autoplaySpeed: 5000,
// // //     nextArrow: <NextArrow />,
// // //     prevArrow: <PrevArrow />,
// // //     dots: true,
// // //     appendDots: (dots) => (
// // //       <ul className="flex justify-center gap-3 mt-2 lg:mt-10">
// // //         {dots.slice(0, 4)}
// // //       </ul>
// // //     ),
// // //     customPaging: () => (
// // //       <div className="w-2 h-2 rounded-full bg-lightBg dark:bg-lightBg/50 hover:bg-accent dark:hover:bg-accent/80 transition-colors duration-300" />
// // //     ),
// // //     pauseOnHover: true,
// // //     swipeToSlide: true,
// // //     responsive: [
// // //       {
// // //         breakpoint: 1024,
// // //         settings: {
// // //           slidesToShow: 4,
// // //           slidesToScroll: 1,
// // //         },
// // //       },
// // //       {
// // //         breakpoint: 768,
// // //         settings: {
// // //           slidesToShow: 3,
// // //           slidesToScroll: 1,
// // //         },
// // //       },
// // //       {
// // //         breakpoint: 640,
// // //         settings: {
// // //           slidesToShow: 1,
// // //           slidesToScroll: 1,
// // //         },
// // //       },
// // //     ],
// // //   };

// // //   if (isLoading) {
// // //     return (
// // //       <div className="min-h-screen flex items-center justify-center bg-primaryBg dark:bg-dark">
// // //         <div className="relative">
// // //           <div className="w-20 h-20 border-4 border-lightBg/30 dark:border-lightBg/20 border-t-accent dark:border-t-accent/80 rounded-full animate-spin" />
// // //           <div className="absolute inset-0 flex items-center justify-center">
// // //             <FaHeart className="text-accent dark:text-accent/80 text-2xl animate-pulse" />
// // //           </div>
// // //         </div>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-primaryBg dark:bg-dark overflow-x-hidden">
// // //       {/* Custom Slider Styles */}
// // //       <style>{`
// // //         .slick-dots li.slick-active div {
// // //           background: #FFE2AF;
// // //           transform: scale(1.2);
// // //         }
// // //         @media (prefers-color-scheme: dark) {
// // //           .slick-dots li.slick-active div {
// // //             background: #FFE2AFCC;
// // //           }
// // //         }
// // //         .slick-dots li div {
// // //           transition: all 0.3s ease;
// // //         }
// // //         .slick-dots li div:hover {
// // //           transform: scale(1.1);
// // //           background: #FFE2AF;
// // //         }
// // //         .slick-list {
// // //           padding: 20px 10px !important;
// // //           margin: 0 -10px;
// // //         }
// // //         @media (max-width: 640px) {
// // //           .slick-list {
// // //             padding: 10px 5px !important;
// // //             margin: 0 -5px;
// // //           }
// // //         }
// // //         .slick-slide > div {
// // //           padding: 10px;
// // //         }
// // //       `}</style>

// // //       {/* Hero Image Section */}
// // //       <div className="relative overflow-hidden">
// // //         <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center">
// // //           {/* Background Image */}
// // //           <motion.div
// // //             initial={{ scale: 1.1 }}
// // //             animate={{ scale: 1 }}
// // //             transition={{ duration: 1.5, ease: "easeOut" }}
// // //             className="absolute inset-0 z-0 w-full"
// // //             style={{
// // //               backgroundImage: `url("/photoshoot1.jpg")`,
// // //               backgroundSize: "cover",
// // //               backgroundPosition: "center",
// // //             }}
// // //           >
// // //             {/* Gradient Overlay */}
// // //             <motion.div
// // //               initial={{ opacity: 0 }}
// // //               animate={{ opacity: 1 }}
// // //               transition={{ duration: 1 }}
// // //               className="absolute inset-0 bg-gradient-to-b from-dark/90 via-dark/70 to-dark/90"
// // //             />
// // //           </motion.div>

// // //           {/* Content */}
// // //           <motion.div
// // //             ref={heroRef}
// // //             variants={staggeredContainer}
// // //             initial="hidden"
// // //             animate={heroControls}
// // //             className="relative z-10 text-center px-4 max-w-6xl mx-auto"
// // //           >
// // //             <motion.div variants={fadeUp} className="mb-6">
// // //               <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-8">
// // //                 <FaCrown className="text-accent dark:text-accent/80 text-lg" />
// // //                 <span className="text-sm font-medium text-white">
// // //                   Premium Collection
// // //                 </span>
// // //                 <FaGem className="text-accent dark:text-accent/80 text-lg" />
// // //               </div>
// // //             </motion.div>

// // //             <motion.h1
// // //               variants={fadeUp}
// // //               className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
// // //             >
// // //               <span className="text-white">Discover</span>
// // //               <span className="text-accent dark:text-accent/80 block mt-2">
// // //                 Timeless Beauty
// // //               </span>
// // //             </motion.h1>

// // //             <motion.p
// // //               variants={fadeUp}
// // //               className="text-lg lg:text-xl text-gray-200 max-w-2xl mx-auto mb-10"
// // //             >
// // //               Immerse yourself in our curated selection of premium cosmetics,
// // //               where beauty meets craftsmanship in perfect harmony.
// // //             </motion.p>

// // //             {/* Rating Badge */}
// // //             <motion.div
// // //               variants={scaleIn}
// // //               className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30"
// // //             >
// // //               <div className="flex items-center gap-1">
// // //                 {[...Array(5)].map((_, i) => (
// // //                   <FaStar
// // //                     key={i}
// // //                     className="text-accent dark:text-accent/80 text-sm"
// // //                   />
// // //                 ))}
// // //               </div>
// // //               <span className="text-white text-sm font-medium">
// // //                 4.9/5 Customer Rating
// // //               </span>
// // //             </motion.div>
// // //           </motion.div>
// // //         </div>

// // //         {/* Divider */}
// // //         <div className="absolute bottom-0 left-0 right-0 h-8 bg-primaryBg dark:bg-dark" />
// // //       </div>

// // //       {/* Main Content */}
// // //       <div className="max-w-7xl mx-auto w-full py-16 px-4 sm:px-6 lg:px-8">
// // //         {/* Header */}
// // //         <motion.div
// // //           ref={mainHeaderRef}
// // //           variants={staggeredContainer}
// // //           initial="hidden"
// // //           animate={mainHeaderControls}
// // //           className="text-center mb-16 lg:mb-20"
// // //         >
// // //           <motion.div variants={fadeUp} className="mb-6">
// // //             <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-lightBg dark:bg-lightBg/20 border border-accent/30 dark:border-accent/20">
// // //               <span className="text-sm font-medium text-dark dark:text-white">
// // //                 Our Collections
// // //               </span>
// // //               <FaRegGem className="text-accent dark:text-accent/80" />
// // //             </div>
// // //           </motion.div>

// // //           <motion.h1
// // //             variants={fadeUp}
// // //             className="text-4xl lg:text-6xl font-bold mb-6"
// // //           >
// // //             <span className="text-dark dark:text-white">Premium</span>
// // //             <span className="text-accent dark:text-accent/80 ml-3">
// // //               Cosmetics
// // //             </span>
// // //           </motion.h1>

// // //           <motion.p
// // //             variants={fadeUp}
// // //             className="text-lg lg:text-xl text-dark/70 dark:text-gray-300 max-w-3xl mx-auto"
// // //           >
// // //             Discover our curated selection of premium beauty products, carefully
// // //             crafted for your beauty and wellness journey.
// // //           </motion.p>
// // //         </motion.div>

// // //         {Object.entries(groupedProducts).map(
// // //           ([categoryName, products], categoryIndex) => {
// // //             const visibleProducts = products.slice(0, limit);

// // //             if (visibleProducts.length === 0) return null;

// // //             return (
// // //               <motion.div
// // //                 key={categoryName}
// // //                 initial="hidden"
// // //                 whileInView="visible"
// // //                 viewport={{ once: true, amount: 0.2 }}
// // //                 variants={staggeredContainer}
// // //                 className="mb-24 lg:mb-32 last:mb-0"
// // //               >
// // //                 {/* Category Header */}
// // //                 <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10 lg:mb-14 gap-4">
// // //                   <motion.div
// // //                     variants={fadeUp}
// // //                     className="text-center lg:text-left"
// // //                   >
// // //                     <h2 className="text-3xl lg:text-5xl font-bold text-dark dark:text-white mb-3">
// // //                       {categoryName}
// // //                       <span className="text-accent dark:text-accent/80 ml-2">
// // //                         Collection
// // //                       </span>
// // //                     </h2>
// // //                     <p className="text-dark/70 dark:text-gray-300 max-w-2xl">
// // //                       Explore our premium {categoryName.toLowerCase()}{" "}
// // //                       selection, featuring the finest products for your beauty
// // //                       needs.
// // //                     </p>
// // //                   </motion.div>

// // //                   <motion.div variants={fadeIn}>
// // //                     <Link
// // //                       to={`/category/${encodeURIComponent(categoryName.toLowerCase())}`}
// // //                       className="group flex items-center gap-3 px-6 py-3.5 rounded-xl bg-accent dark:bg-accent/80 hover:bg-lightBg dark:hover:bg-lightBg/30 text-dark dark:text-white font-semibold border border-lightBg dark:border-lightBg/30 transition-colors duration-300 shadow-lg"
// // //                     >
// // //                       <span>View All {categoryName}</span>
// // //                       <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
// // //                     </Link>
// // //                   </motion.div>
// // //                 </div>

// // //                 {/* Slider */}
// // //                 <div className="relative">
// // //                   <Slider {...sliderSettings} className="relative z-10">
// // //                     {visibleProducts.map((product, index) => (
// // //                       <motion.div
// // //                         key={product._id}
// // //                         initial={{ opacity: 0, y: 20 }}
// // //                         whileInView={{ opacity: 1, y: 0 }}
// // //                         transition={{ delay: index * 0.1, duration: 0.5 }}
// // //                         viewport={{ once: true }}
// // //                         className="px-2"
// // //                       >
// // //                         <ProductCard product={product} index={index} />
// // //                       </motion.div>
// // //                     ))}
// // //                   </Slider>
// // //                 </div>

// // //                 <div className="mt-6 lg:hidden flex justify-center">
// // //                   <Link
// // //                     to={`/category/${encodeURIComponent(categoryName.toLowerCase())}`}
// // //                     className="group px-8 py-3.5 rounded-xl bg-accent dark:bg-accent/80 text-dark dark:text-white font-semibold flex items-center gap-3 border border-lightBg dark:border-lightBg/30 shadow-lg"
// // //                   >
// // //                     <span>View All {categoryName}</span>
// // //                     <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
// // //                   </Link>
// // //                 </div>
// // //               </motion.div>
// // //             );
// // //           }
// // //         )}

// // //         {/* Empty State */}
// // //         {Object.keys(groupedProducts).length === 0 && !isLoading && (
// // //           <div className="text-center py-20">
// // //             <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-lightBg dark:bg-lightBg/20 mb-6">
// // //               <FaHeart className="text-accent dark:text-accent/80 text-3xl" />
// // //             </div>
// // //             <h3 className="text-2xl font-bold text-dark dark:text-white mb-3">
// // //               No Products Found
// // //             </h3>
// // //             <p className="text-dark/70 dark:text-gray-300 max-w-md mx-auto">
// // //               We're currently updating our collection. Check back soon for our
// // //               premium beauty products.
// // //             </p>
// // //           </div>
// // //         )}

// // //         {/* Footer CTA */}
// // //         <motion.div
// // //           ref={footerRef}
// // //           variants={staggeredContainer}
// // //           initial="hidden"
// // //           animate={footerControls}
// // //           className="mt-20 lg:mt-28 text-center"
// // //         >
// // //           <motion.div variants={fadeUp} className="mb-6">
// // //             <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-lightBg dark:bg-lightBg/20 border border-accent/30 dark:border-accent/20">
// // //               <span className="text-sm font-medium text-dark dark:text-white">
// // //                 Premium Quality Guaranteed
// // //               </span>
// // //             </div>
// // //           </motion.div>

// // //           <motion.h3
// // //             variants={fadeUp}
// // //             className="text-2xl lg:text-4xl font-bold text-dark dark:text-white mb-6"
// // //           >
// // //             Ready to Elevate Your Beauty?
// // //           </motion.h3>

// // //           <motion.p
// // //             variants={fadeUp}
// // //             className="text-lg text-dark/70 dark:text-gray-300 max-w-2xl mx-auto mb-8"
// // //           >
// // //             Explore all our collections and discover the perfect products for
// // //             your beauty routine.
// // //           </motion.p>

// // //           <motion.div variants={scaleIn} className="inline-block">
// // //             <Link
// // //               to="/products/all"
// // //               className="group px-8 py-4 mb-4 rounded-xl bg-accent dark:bg-accent/80 hover:bg-lightBg dark:hover:bg-lightBg/30 text-dark dark:text-white font-semibold text-lg flex items-center gap-3 border border-lightBg dark:border-lightBg/30 shadow-lg transition-colors duration-300"
// // //             >
// // //               <span>Browse All Collections</span>
// // //               <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
// // //             </Link>
// // //           </motion.div>
// // //         </motion.div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default ProductsPage;
// // import React, { useState, useEffect, useRef } from "react";
// // import Slider from "react-slick";
// // import "slick-carousel/slick/slick.css";
// // import "slick-carousel/slick/slick-theme.css";
// // import ProductCard from "../Components/ProductCard";
// // import {
// //   FaChevronLeft,
// //   FaChevronRight,
// //   FaArrowRight,
// //   FaStar,
// //   FaCrown,
// //   FaGem,
// //   FaHeart,
// //   FaRegGem,
// // } from "react-icons/fa";
// // import { motion, useInView, useAnimation } from "framer-motion";
// // import { Link } from "react-router-dom";
// // import { fetchWithAuth } from "../utils/auth";

// // const BACKEND_URL = import.meta.env.VITE_API_URL;

// // /* =======================
// //    ANIMATION VARIANTS
// // ======================= */
// // const fadeUp = {
// //   hidden: {
// //     opacity: 0,
// //     y: 50,
// //   },
// //   visible: {
// //     opacity: 1,
// //     y: 0,
// //     transition: {
// //       duration: 0.8,
// //       ease: [0.25, 0.4, 0.25, 1],
// //     },
// //   },
// // };

// // const fadeIn = {
// //   hidden: {
// //     opacity: 0,
// //   },
// //   visible: {
// //     opacity: 1,
// //     transition: {
// //       duration: 1,
// //       ease: "easeOut",
// //     },
// //   },
// // };

// // const staggeredContainer = {
// //   hidden: { opacity: 0 },
// //   visible: {
// //     opacity: 1,
// //     transition: {
// //       staggerChildren: 0.2,
// //       delayChildren: 0.1,
// //     },
// //   },
// // };

// // const scaleIn = {
// //   hidden: {
// //     opacity: 0,
// //     scale: 0.9,
// //   },
// //   visible: {
// //     opacity: 1,
// //     scale: 1,
// //     transition: {
// //       duration: 0.7,
// //       ease: "easeOut",
// //     },
// //   },
// // };

// // // Custom hook for scroll animations
// // const useScrollAnimation = (threshold = 0.2) => {
// //   const ref = useRef(null);
// //   const isInView = useInView(ref, {
// //     once: true,
// //     amount: threshold,
// //     margin: "0px 0px -50px 0px",
// //   });
// //   const controls = useAnimation();

// //   useEffect(() => {
// //     if (isInView) {
// //       controls.start("visible");
// //     }
// //   }, [isInView, controls]);

// //   return [ref, controls];
// // };

// // const NextArrow = ({ onClick }) => (
// //   <div className="absolute top-1/2 -right-4 lg:-right-6 -translate-y-1/2 z-20">
// //     <button
// //       className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-accent dark:bg-accent/80 text-dark dark:text-white flex items-center justify-center border border-lightBg dark:border-lightBg/50 shadow-lg hover:bg-lightBg dark:hover:bg-lightBg/80 transition-colors duration-300"
// //       onClick={onClick}
// //       aria-label="Next slide"
// //     >
// //       <FaChevronRight className="text-lg" />
// //     </button>
// //   </div>
// // );

// // const PrevArrow = ({ onClick }) => (
// //   <div className="absolute top-1/2 -left-4 lg:-left-6 -translate-y-1/2 z-20">
// //     <button
// //       className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-accent dark:bg-accent/80 text-dark dark:text-white flex items-center justify-center border border-lightBg dark:border-lightBg/50 shadow-lg hover:bg-lightBg dark:hover:bg-lightBg/80 transition-colors duration-300"
// //       onClick={onClick}
// //       aria-label="Previous slide"
// //     >
// //       <FaChevronLeft className="text-lg" />
// //     </button>
// //   </div>
// // );

// // const ProductsPage = () => {
// //   const [groupedProducts, setGroupedProducts] = useState({});
// //   const [slidesToShow, setSlidesToShow] = useState(4);
// //   const [isLoading, setIsLoading] = useState(true);
// //   const limit = 8;

// //   // Create refs for each section
// //   const [heroRef, heroControls] = useScrollAnimation(0.3);
// //   const [mainHeaderRef, mainHeaderControls] = useScrollAnimation();
// //   const [footerRef, footerControls] = useScrollAnimation();

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
// //     dots: true,
// //     appendDots: (dots) => (
// //       <ul className="flex justify-center gap-3 mt-2 lg:mt-10">
// //         {dots.slice(0, 4)}
// //       </ul>
// //     ),
// //     customPaging: () => (
// //       <div className="w-2 h-2 rounded-full bg-lightBg dark:bg-lightBg/50 hover:bg-accent dark:hover:bg-accent/80 transition-colors duration-300" />
// //     ),
// //     pauseOnHover: true,
// //     swipeToSlide: true,
// //     responsive: [
// //       {
// //         breakpoint: 1024,
// //         settings: {
// //           slidesToShow: 4,
// //           slidesToScroll: 1,
// //         },
// //       },
// //       {
// //         breakpoint: 768,
// //         settings: {
// //           slidesToShow: 3,
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
// //       <div className="min-h-screen flex items-center justify-center bg-primaryBg dark:bg-dark">
// //         <div className="relative">
// //           <div className="w-20 h-20 border-4 border-lightBg/30 dark:border-lightBg/20 border-t-accent dark:border-t-accent/80 rounded-full animate-spin" />
// //           <div className="absolute inset-0 flex items-center justify-center">
// //             <FaHeart className="text-accent dark:text-accent/80 text-2xl animate-pulse" />
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-white dark:bg-dark overflow-x-hidden">
// //       {/* Custom Slider Styles */}
// //       <style>{`
// //         .slick-dots li.slick-active div {
// //           background: #FFE2AF;
// //           transform: scale(1.2);
// //         }
// //         @media (prefers-color-scheme: dark) {
// //           .slick-dots li.slick-active div {
// //             background: #FFE2AFCC;
// //           }
// //         }
// //         .slick-dots li div {
// //           transition: all 0.3s ease;
// //         }
// //         .slick-dots li div:hover {
// //           transform: scale(1.1);
// //           background: #FFE2AF;
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
// //       `}</style>

// //       {/* Hero Image Section - Clean Version */}
// //       <div className="relative overflow-hidden">
// //         <div className="relative h-[70vh] min-h-[600px] flex items-center justify-center">
// //           {/* Background Image with Parallax Effect */}
// //           <motion.div
// //             initial={{ scale: 1.1 }}
// //             animate={{ scale: 1 }}
// //             transition={{ duration: 1.5, ease: "easeOut" }}
// //             className="absolute inset-0 z-0 w-full"
// //             style={{
// //               backgroundImage: `url("/photoshoot1.jpg")`,
// //               backgroundSize: "cover",
// //               backgroundPosition: "center",
// //               backgroundAttachment: "fixed",
// //             }}
// //           >
// //             {/* Gradient Overlay */}
// //             <motion.div
// //               initial={{ opacity: 0 }}
// //               animate={{ opacity: 1 }}
// //               transition={{ duration: 1 }}
// //               className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/60 to-dark/80"
// //             />
// //           </motion.div>

// //           {/* Content */}
// //           <motion.div
// //             ref={heroRef}
// //             variants={staggeredContainer}
// //             initial="hidden"
// //             animate={heroControls}
// //             className="relative z-10 text-center px-4 max-w-4xl mx-auto"
// //           >
// //             <motion.div variants={fadeUp} className="mb-8">
// //               <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/15 backdrop-blur-md border border-white/30 mb-6">
// //                 <FaCrown className="text-accent text-lg" />
// //                 <span className="text-sm font-semibold text-white tracking-wide">
// //                   PREMIUM COLLECTION
// //                 </span>
// //                 <FaGem className="text-accent text-lg" />
// //               </div>
// //             </motion.div>

// //             <motion.h1
// //               variants={fadeUp}
// //               className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
// //             >
// //               <span className="text-white block">Discover</span>
// //               <span className="text-accent block mt-2">Timeless Beauty</span>
// //             </motion.h1>

// //             {/* Description Text */}
// //             <motion.p
// //               variants={fadeIn}
// //               className="text-xl lg:text-2xl text-gray-200 max-w-2xl mx-auto mb-10 font-light tracking-wide"
// //             >
// //               Immerse yourself in our curated selection of premium cosmetics,
// //               where beauty meets craftsmanship in perfect harmony.
// //             </motion.p>

// //             {/* CTA Button - Not Full Width */}
// //             <motion.div variants={scaleIn} className="inline-block">
// //               <Link
// //                 to="#collections"
// //                 className="group flex items-center gap-3 px-10 py-5 rounded-xl bg-accent hover:bg-accent/90 text-dark font-bold text-lg border-2 border-accent shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
// //               >
// //                 <span className="tracking-wide">EXPLORE COLLECTIONS</span>
// //                 <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
// //               </Link>
// //             </motion.div>
// //           </motion.div>

// //           {/* Scroll Indicator */}
// //           <motion.div
// //             initial={{ opacity: 0 }}
// //             animate={{ opacity: 1 }}
// //             transition={{ delay: 1.5, duration: 1 }}
// //             className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
// //           >
// //             <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
// //               <div className="w-1 h-3 bg-accent rounded-full animate-bounce" />
// //             </div>
// //           </motion.div>
// //         </div>

// //         {/* Subtle Divider */}
// //         <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-primaryBg to-transparent dark:from-dark" />
// //       </div>

// //       {/* Main Content */}
// //       <div
// //         id="collections"
// //         className="max-w-7xl mx-auto w-full py-16 px-4 sm:px-6 lg:px-8"
// //       >
// //         {/* Header - Simplified */}
// //         <motion.div
// //           ref={mainHeaderRef}
// //           variants={staggeredContainer}
// //           initial="hidden"
// //           animate={mainHeaderControls}
// //           className="text-center mb-16 lg:mb-20"
// //         >
// //           <motion.div variants={fadeUp} className="mb-6">
// //             <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-lightBg dark:bg-dark/50 border border-accent/30 dark:border-accent/20 shadow-lg">
// //               <FaRegGem className="text-accent" />
// //               <span className="text-sm font-semibold text-dark dark:text-white tracking-wide">
// //                 OUR COLLECTIONS
// //               </span>
// //             </div>
// //           </motion.div>

// //           <motion.h1
// //             variants={fadeUp}
// //             className="text-4xl lg:text-6xl font-bold mb-4"
// //           >
// //             <span className="text-dark dark:text-white">Premium</span>
// //             <span className="text-accent ml-3">Cosmetics</span>
// //           </motion.h1>

// //           <motion.p
// //             variants={fadeUp}
// //             className="text-lg lg:text-xl text-dark/70 dark:text-gray-300 max-w-3xl mx-auto font-light"
// //           >
// //             Discover our curated selection of premium beauty products, carefully
// //             crafted for your beauty and wellness journey.
// //           </motion.p>
// //         </motion.div>

// //         {Object.entries(groupedProducts).map(
// //           ([categoryName, products], categoryIndex) => {
// //             const visibleProducts = products.slice(0, limit);

// //             if (visibleProducts.length === 0) return null;

// //             return (
// //               <motion.div
// //                 key={categoryName}
// //                 initial="hidden"
// //                 whileInView="visible"
// //                 viewport={{ once: true, amount: 0.2 }}
// //                 variants={staggeredContainer}
// //                 className="mb-24 lg:mb-32 last:mb-0"
// //               >
// //                 {/* Category Header */}
// //                 <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10 lg:mb-14 gap-4">
// //                   <motion.div
// //                     variants={fadeUp}
// //                     className="text-center lg:text-left"
// //                   >
// //                     <h2 className="text-3xl lg:text-5xl font-bold text-dark dark:text-white mb-3">
// //                       {categoryName}
// //                       <span className="text-accent ml-2">Collection</span>
// //                     </h2>
// //                     <p className="text-dark/70 dark:text-gray-300 max-w-2xl font-light">
// //                       Explore our premium {categoryName.toLowerCase()}{" "}
// //                       selection, featuring the finest products for your beauty
// //                       needs.
// //                     </p>
// //                   </motion.div>

// //                   {/* <motion.div variants={fadeIn}>
// //                     <Link
// //                       to={`/category/${encodeURIComponent(categoryName.toLowerCase())}`}
// //                       className="group flex items-center gap-3 px-8 py-4 rounded-xl bg-accent dark:bg-accent/80 hover:bg-lightBg dark:hover:bg-lightBg/30 text-dark dark:text-white font-semibold border border-lightBg dark:border-lightBg/30 shadow-lg transition-all duration-300 transform hover:-translate-y-1"
// //                     >
// //                       <span>View All {categoryName}</span>
// //                       <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
// //                     </Link>
// //                   </motion.div> */}
// //                 </div>

// //                 {/* Slider */}
// //                 <div className="relative">
// //                   <Slider {...sliderSettings} className="relative z-10">
// //                     {visibleProducts.map((product, index) => (
// //                       <motion.div
// //                         key={product._id}
// //                         initial={{ opacity: 0, y: 20 }}
// //                         whileInView={{ opacity: 1, y: 0 }}
// //                         transition={{ delay: index * 0.1, duration: 0.5 }}
// //                         viewport={{ once: true }}
// //                         className="px-2"
// //                       >
// //                         <ProductCard product={product} index={index} />
// //                       </motion.div>
// //                     ))}
// //                   </Slider>
// //                 </div>

// //                 <div className="mt-6 lg:hidden flex justify-center">
// //                   <Link
// //                     to={`/category/${encodeURIComponent(categoryName.toLowerCase())}`}
// //                     className="group px-8 py-4 rounded-xl bg-accent dark:bg-accent/80 text-dark dark:text-white font-semibold flex items-center gap-3 border border-lightBg dark:border-lightBg/30 shadow-lg"
// //                   >
// //                     <span>View All {categoryName}</span>
// //                     <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
// //                   </Link>
// //                 </div>
// //               </motion.div>
// //             );
// //           }
// //         )}

// //         {/* Empty State */}
// //         {Object.keys(groupedProducts).length === 0 && !isLoading && (
// //           <div className="text-center py-20">
// //             <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-lightBg dark:bg-lightBg/20 mb-6">
// //               <FaHeart className="text-accent dark:text-accent/80 text-3xl" />
// //             </div>
// //             <h3 className="text-2xl font-bold text-dark dark:text-white mb-3">
// //               No Products Found
// //             </h3>
// //             <p className="text-dark/70 dark:text-gray-300 max-w-md mx-auto">
// //               We're currently updating our collection. Check back soon for our
// //               premium beauty products.
// //             </p>
// //           </div>
// //         )}

// //         {/* Footer CTA */}
// //         <motion.div
// //           ref={footerRef}
// //           variants={staggeredContainer}
// //           initial="hidden"
// //           animate={footerControls}
// //           className="mt-20 lg:mt-28 text-center"
// //         >
// //           <motion.div variants={fadeUp} className="mb-6">
// //             <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-lightBg dark:bg-dark/50 border border-accent/30 dark:border-accent/20 shadow-lg">
// //               <FaGem className="text-accent" />
// //               <span className="text-sm font-semibold text-dark dark:text-white tracking-wide">
// //                 PREMIUM QUALITY GUARANTEED
// //               </span>
// //             </div>
// //           </motion.div>

// //           <motion.h3
// //             variants={fadeUp}
// //             className="text-3xl lg:text-5xl font-bold text-dark dark:text-white mb-6"
// //           >
// //             Ready to Elevate Your Beauty?
// //           </motion.h3>

// //           <motion.p
// //             variants={fadeUp}
// //             className="text-lg lg:text-xl text-dark/70 dark:text-gray-300 max-w-2xl mx-auto mb-8 font-light"
// //           >
// //             Explore all our collections and discover the perfect products for
// //             your beauty routine.
// //           </motion.p>

// //           <motion.div variants={scaleIn} className="inline-block">
// //             <Link
// //               to="/products/all"
// //               className="group px-10 py-5 mb-4 rounded-xl bg-accent dark:bg-accent/80 hover:bg-lightBg dark:hover:bg-lightBg/30 text-dark dark:text-white font-bold text-lg flex items-center gap-3 border-2 border-accent dark:border-lightBg/30 shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
// //             >
// //               <span>BROWSE ALL COLLECTIONS</span>
// //               <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
// //             </Link>
// //           </motion.div>
// //         </motion.div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProductsPage;
// import React, { useState, useEffect, useRef } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import ProductCard from "../Components/ProductCard";
// import {
//   FaChevronLeft,
//   FaChevronRight,
//   FaArrowRight,
//   FaStar,
//   FaCrown,
//   FaGem,
//   FaHeart,
//   FaRegGem,
// } from "react-icons/fa";
// import { motion, useInView, useAnimation } from "framer-motion";
// import { Link } from "react-router-dom";
// import { fetchWithAuth } from "../utils/auth";

// const BACKEND_URL = import.meta.env.VITE_API_URL;

// /* =======================
//    ANIMATION VARIANTS
// ======================= */
// const fadeUp = {
//   hidden: {
//     opacity: 0,
//     y: 50,
//   },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.8,
//       ease: [0.25, 0.4, 0.25, 1],
//     },
//   },
// };

// const fadeIn = {
//   hidden: {
//     opacity: 0,
//   },
//   visible: {
//     opacity: 1,
//     transition: {
//       duration: 1,
//       ease: "easeOut",
//     },
//   },
// };

// const staggeredContainer = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.2,
//       delayChildren: 0.1,
//     },
//   },
// };

// const scaleIn = {
//   hidden: {
//     opacity: 0,
//     scale: 0.9,
//   },
//   visible: {
//     opacity: 1,
//     scale: 1,
//     transition: {
//       duration: 0.7,
//       ease: "easeOut",
//     },
//   },
// };

// // Animated Underline Component
// const AnimatedUnderline = ({ controls }) => {
//   return (
//     <motion.div
//       variants={{
//         hidden: { width: 0 },
//         visible: {
//           width: "100%",
//           transition: {
//             duration: 1.2,
//             ease: [0.43, 0.13, 0.23, 0.96],
//           },
//         },
//       }}
//       initial="hidden"
//       animate={controls}
//       className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-accent via-amber-300 to-accent rounded-full shadow-lg"
//     />
//   );
// };

// // Underline heading component
// const UnderlineHeading = ({
//   children,
//   className = "",
//   hasUnderline = true,
// }) => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, {
//     once: true,
//     amount: 0.3,
//     margin: "0px 0px -50px 0px",
//   });
//   const controls = useAnimation();

//   useEffect(() => {
//     if (isInView) {
//       controls.start("visible");
//     }
//   }, [isInView, controls]);

//   return (
//     <div ref={ref} className={`relative inline-block ${className}`}>
//       {children}
//       {hasUnderline && (
//         <>
//           <motion.div
//             initial={{ width: 0 }}
//             animate={controls}
//             transition={{
//               duration: 1.5,
//               ease: [0.43, 0.13, 0.23, 0.96],
//             }}
//             className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-accent via-amber-300 to-accent rounded-full shadow-lg"
//           />
//           {/* Decorative dots at ends */}
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={controls}
//             transition={{
//               delay: 0.8,
//               duration: 0.5,
//               type: "spring",
//               stiffness: 200,
//             }}
//             className="absolute -bottom-2 -left-2 w-3 h-3 rounded-full bg-accent shadow-md"
//           />
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={controls}
//             transition={{
//               delay: 1,
//               duration: 0.5,
//               type: "spring",
//               stiffness: 200,
//             }}
//             className="absolute -bottom-2 -right-2 w-3 h-3 rounded-full bg-accent shadow-md"
//           />
//         </>
//       )}
//     </div>
//   );
// };

// // Custom hook for scroll animations
// const useScrollAnimation = (threshold = 0.2) => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, {
//     once: true,
//     amount: threshold,
//     margin: "0px 0px -50px 0px",
//   });
//   const controls = useAnimation();

//   useEffect(() => {
//     if (isInView) {
//       controls.start("visible");
//     }
//   }, [isInView, controls]);

//   return [ref, controls];
// };

// const NextArrow = ({ onClick }) => (
//   <div className="absolute top-1/2 -right-4 lg:-right-6 -translate-y-1/2 z-20">
//     <button
//       className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-accent dark:bg-accent/80 text-dark dark:text-white flex items-center justify-center border border-lightBg dark:border-lightBg/50 shadow-lg hover:bg-lightBg dark:hover:bg-lightBg/80 transition-colors duration-300"
//       onClick={onClick}
//       aria-label="Next slide"
//     >
//       <FaChevronRight className="text-lg" />
//     </button>
//   </div>
// );

// const PrevArrow = ({ onClick }) => (
//   <div className="absolute top-1/2 -left-4 lg:-left-6 -translate-y-1/2 z-20">
//     <button
//       className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-accent dark:bg-accent/80 text-dark dark:text-white flex items-center justify-center border border-lightBg dark:border-lightBg/50 shadow-lg hover:bg-lightBg dark:hover:bg-lightBg/80 transition-colors duration-300"
//       onClick={onClick}
//       aria-label="Previous slide"
//     >
//       <FaChevronLeft className="text-lg" />
//     </button>
//   </div>
// );

// const ProductsPage = () => {
//   const [groupedProducts, setGroupedProducts] = useState({});
//   const [slidesToShow, setSlidesToShow] = useState(4);
//   const [isLoading, setIsLoading] = useState(true);
//   const limit = 8;

//   // Create refs for each section
//   const [heroRef, heroControls] = useScrollAnimation(0.3);
//   const [mainHeaderRef, mainHeaderControls] = useScrollAnimation();
//   const [footerRef, footerControls] = useScrollAnimation();

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
//         {dots.slice(0, 4)}
//       </ul>
//     ),
//     customPaging: () => (
//       <div className="w-2 h-2 rounded-full bg-lightBg dark:bg-lightBg/50 hover:bg-accent dark:hover:bg-accent/80 transition-colors duration-300" />
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
//       <div className="min-h-screen flex items-center justify-center bg-white dark:bg-dark">
//         <div className="relative">
//           <div className="w-20 h-20 border-4 border-lightBg/30 dark:border-lightBg/20 border-t-accent dark:border-t-accent/80 rounded-full animate-spin" />
//           <div className="absolute inset-0 flex items-center justify-center">
//             <FaHeart className="text-accent dark:text-accent/80 text-2xl animate-pulse" />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white dark:bg-dark overflow-x-hidden">
//       {/* Custom Slider Styles */}
//       <style>{`
//         .slick-dots li.slick-active div {
//           background: #FFE2AF;
//           transform: scale(1.2);
//         }
//         @media (prefers-color-scheme: dark) {
//           .slick-dots li.slick-active div {
//             background: #FFE2AFCC;
//           }
//         }
//         .slick-dots li div {
//           transition: all 0.3s ease;
//         }
//         .slick-dots li div:hover {
//           transform: scale(1.1);
//           background: #FFE2AF;
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

//         /* Custom scrollbar */
//         ::-webkit-scrollbar {
//           width: 10px;
//         }
//         ::-webkit-scrollbar-track {
//           background: #f1f1f1;
//           border-radius: 10px;
//         }
//         ::-webkit-scrollbar-thumb {
//           background: linear-gradient(to bottom, #FFE2AF, #FFD166);
//           border-radius: 10px;
//         }
//         ::-webkit-scrollbar-thumb:hover {
//           background: linear-gradient(to bottom, #FFD166, #FFC145);
//         }
//         .dark ::-webkit-scrollbar-track {
//           background: #2d3748;
//         }
//         .dark ::-webkit-scrollbar-thumb {
//           background: linear-gradient(to bottom, #FFE2AFCC, #FFD166CC);
//         }
//       `}</style>

//       {/* Hero Image Section - Clean Version */}
//       <div className="relative overflow-hidden">
//         <div className="relative h-[70vh] min-h-[600px] flex items-center justify-center">
//           {/* Background Image with Parallax Effect */}
//           <motion.div
//             initial={{ scale: 1.1 }}
//             animate={{ scale: 1 }}
//             transition={{ duration: 1.5, ease: "easeOut" }}
//             className="absolute inset-0 z-0 w-full"
//             style={{
//               backgroundImage: `url("/photoshoot1.jpg")`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//               backgroundAttachment: "fixed",
//             }}
//           >
//             {/* Gradient Overlay */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 1 }}
//               className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/60 to-dark/80"
//             />
//           </motion.div>

//           {/* Content */}
//           <motion.div
//             ref={heroRef}
//             variants={staggeredContainer}
//             initial="hidden"
//             animate={heroControls}
//             className="relative z-10 text-center px-4 max-w-4xl mx-auto"
//           >
//             <motion.div variants={fadeUp} className="mb-8">
//               <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/15 backdrop-blur-md border border-white/30 mb-6">
//                 <FaCrown className="text-accent text-lg" />
//                 <span className="text-sm font-semibold text-white tracking-wide">
//                   PREMIUM COLLECTION
//                 </span>
//                 <FaGem className="text-accent text-lg" />
//               </div>
//             </motion.div>

//             <motion.h1
//               variants={fadeUp}
//               className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
//             >
//               <span className="text-white block">Discover</span>
//               <span className="text-accent block mt-2">Timeless Beauty</span>
//             </motion.h1>

//             {/* Description Text */}
//             <motion.p
//               variants={fadeIn}
//               className="text-xl lg:text-2xl text-gray-200 max-w-2xl mx-auto mb-10 font-light tracking-wide"
//             >
//               Immerse yourself in our curated selection of premium cosmetics,
//               where beauty meets craftsmanship in perfect harmony.
//             </motion.p>

//             {/* CTA Button - Not Full Width */}
//             <motion.div variants={scaleIn} className="inline-block">
//               <Link
//                 to="#collections"
//                 className="group flex items-center gap-3 px-10 py-5 rounded-xl bg-accent hover:bg-accent/90 text-dark font-bold text-lg border-2 border-accent shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-3xl"
//               >
//                 <span className="tracking-wide">EXPLORE COLLECTIONS</span>
//                 <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
//               </Link>
//             </motion.div>
//           </motion.div>

//           {/* Scroll Indicator */}
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 1.5, duration: 1 }}
//             className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
//           >
//             <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
//               <div className="w-1 h-3 bg-accent rounded-full animate-bounce" />
//             </div>
//           </motion.div>
//         </div>

//         {/* Subtle Divider */}
//         <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent dark:from-dark" />
//       </div>

//       {/* Main Content */}
//       <div
//         id="collections"
//         className="max-w-7xl mx-auto w-full py-16 px-4 sm:px-6 lg:px-8"
//       >
//         {/* Header - Simplified */}
//         <motion.div
//           ref={mainHeaderRef}
//           variants={staggeredContainer}
//           initial="hidden"
//           animate={mainHeaderControls}
//           className="text-center mb-16 lg:mb-20"
//         >
//           <motion.div variants={fadeUp} className="mb-6">
//             <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-lightBg dark:bg-dark/50 border border-accent/30 dark:border-accent/20 shadow-lg">
//               <FaRegGem className="text-accent" />
//               <span className="text-sm font-semibold text-dark dark:text-white tracking-wide">
//                 OUR COLLECTIONS
//               </span>
//             </div>
//           </motion.div>

//           {/* Main Title with Animated Underline */}
//           <div className="mb-6">
//             <UnderlineHeading className="inline-block">
//               <h1 className="text-4xl lg:text-6xl font-bold">
//                 <span className="text-dark dark:text-white">Premium</span>
//                 <span className="text-accent ml-3">Cosmetics</span>
//               </h1>
//             </UnderlineHeading>
//           </div>

//           <motion.p
//             variants={fadeUp}
//             className="text-lg lg:text-xl text-dark/70 dark:text-gray-300 max-w-3xl mx-auto font-light"
//           >
//             Discover our curated selection of premium beauty products, carefully
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
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true, amount: 0.2 }}
//                 variants={staggeredContainer}
//                 className="mb-24 lg:mb-32 last:mb-0"
//               >
//                 {/* Category Header */}
//                 <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10 lg:mb-14 gap-4">
//                   <motion.div
//                     variants={fadeUp}
//                     className="text-center lg:text-left"
//                   >
//                     {/* Category Title with Animated Underline */}
//                     <div className="mb-3">
//                       <UnderlineHeading className="inline-block">
//                         <h2 className="text-3xl lg:text-5xl font-bold text-dark dark:text-white inline-block">
//                           {categoryName}
//                           <span className="text-accent ml-2">Collection</span>
//                         </h2>
//                       </UnderlineHeading>
//                     </div>

//                     <p className="text-dark/70 dark:text-gray-300 max-w-2xl font-light">
//                       Explore our premium {categoryName.toLowerCase()}{" "}
//                       selection, featuring the finest products for your beauty
//                       needs.
//                     </p>
//                   </motion.div>

//                   {/* <motion.div variants={fadeIn}>
//                     <Link
//                       to={`/category/${encodeURIComponent(categoryName.toLowerCase())}`}
//                       className="group flex items-center gap-3 px-8 py-4 rounded-xl bg-accent dark:bg-accent/80 hover:bg-lightBg dark:hover:bg-lightBg/30 text-dark dark:text-white font-semibold border border-lightBg dark:border-lightBg/30 shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
//                     >
//                       <span>View All {categoryName}</span>
//                       <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
//                     </Link>
//                   </motion.div> */}
//                 </div>

//                 {/* Slider */}
//                 <div className="relative">
//                   <Slider {...sliderSettings} className="relative z-10">
//                     {visibleProducts.map((product, index) => (
//                       <motion.div
//                         key={product._id}
//                         initial={{ opacity: 0, y: 20 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ delay: index * 0.1, duration: 0.5 }}
//                         viewport={{ once: true }}
//                         className="px-2"
//                       >
//                         <ProductCard product={product} index={index} />
//                       </motion.div>
//                     ))}
//                   </Slider>
//                 </div>

//                 <div className="mt-6 lg:hidden flex justify-center">
//                   <Link
//                     to={`/category/${encodeURIComponent(categoryName.toLowerCase())}`}
//                     className="group px-8 py-4 rounded-xl bg-accent dark:bg-accent/80 text-dark dark:text-white font-semibold flex items-center gap-3 border border-lightBg dark:border-lightBg/30 shadow-lg"
//                   >
//                     <span>View All {categoryName}</span>
//                     <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
//                   </Link>
//                 </div>
//               </motion.div>
//             );
//           }
//         )}

//         {/* Empty State */}
//         {Object.keys(groupedProducts).length === 0 && !isLoading && (
//           <div className="text-center py-20">
//             <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-lightBg dark:bg-lightBg/20 mb-6">
//               <FaHeart className="text-accent dark:text-accent/80 text-3xl" />
//             </div>
//             <h3 className="text-2xl font-bold text-dark dark:text-white mb-3">
//               No Products Found
//             </h3>
//             <p className="text-dark/70 dark:text-gray-300 max-w-md mx-auto">
//               We're currently updating our collection. Check back soon for our
//               premium beauty products.
//             </p>
//           </div>
//         )}

//         {/* Footer CTA */}
//         <motion.div
//           ref={footerRef}
//           variants={staggeredContainer}
//           initial="hidden"
//           animate={footerControls}
//           className="mt-20 lg:mt-28 text-center"
//         >
//           <motion.div variants={fadeUp} className="mb-6">
//             <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-lightBg dark:bg-dark/50 border border-accent/30 dark:border-accent/20 shadow-lg">
//               <FaGem className="text-accent" />
//               <span className="text-sm font-semibold text-dark dark:text-white tracking-wide">
//                 PREMIUM QUALITY GUARANTEED
//               </span>
//             </div>
//           </motion.div>

//           {/* Footer Title with Animated Underline */}
//           <div className="mb-6">
//             <UnderlineHeading className="inline-block">
//               <h3 className="text-3xl lg:text-5xl font-bold text-dark dark:text-white">
//                 Ready to Elevate Your Beauty?
//               </h3>
//             </UnderlineHeading>
//           </div>

//           <motion.p
//             variants={fadeUp}
//             className="text-lg lg:text-xl text-dark/70 dark:text-gray-300 max-w-2xl mx-auto mb-8 font-light"
//           >
//             Explore all our collections and discover the perfect products for
//             your beauty routine.
//           </motion.p>

//           <motion.div variants={scaleIn} className="inline-block">
//             <Link
//               to="/products/all"
//               className="group px-10 py-5 mb-4 rounded-xl bg-accent dark:bg-accent/80 hover:bg-lightBg dark:hover:bg-lightBg/30 text-dark dark:text-white font-bold text-lg flex items-center gap-3 border-2 border-accent dark:border-lightBg/30 shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-3xl"
//             >
//               <span>BROWSE ALL COLLECTIONS</span>
//               <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
//             </Link>
//           </motion.div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default ProductsPage;
import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "../Components/ProductCard";
import {
  FaChevronLeft,
  FaChevronRight,
  FaArrowRight,
  FaStar,
  FaCrown,
  FaGem,
  FaHeart,
  FaRegGem,
} from "react-icons/fa";
import { motion, useInView, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";
import { fetchWithAuth } from "../utils/auth";

const BACKEND_URL = import.meta.env.VITE_API_URL;

/* =======================
   ANIMATION VARIANTS
======================= */
const fadeUp = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
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
      duration: 1,
      ease: "easeOut",
    },
  },
};

const staggeredContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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
      duration: 0.7,
      ease: "easeOut",
    },
  },
};

// Enhanced Underline heading component with shimmer effect
const UnderlineHeading = ({
  children,
  className = "",
  hasUnderline = true,
  size = "medium", // small, medium, large
  align = "center", // left, center, right
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.3,
    margin: "0px 0px -50px 0px",
  });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Size classes for different heading sizes
  const sizeClasses = {
    small: "h-[2px] -bottom-1",
    medium: "h-[3px] -bottom-2",
    large: "h-[4px] -bottom-3",
  };

  // Alignment classes
  const alignClasses = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  return (
    <div
      ref={ref}
      className={`relative w-full ${alignClasses[align]} ${className}`}
    >
      {children}
      {hasUnderline && (
        <>
          {/* Main animated underline */}
          <motion.div
            initial={{ width: 0 }}
            animate={controls}
            transition={{
              duration: 1.2,
              ease: [0.43, 0.13, 0.23, 0.96],
            }}
            className={`absolute ${sizeClasses[size]} bg-gradient-to-r from-accent via-amber-300 to-accent rounded-full shadow-lg`}
            style={{
              backgroundSize: "200% 100%",
              backgroundPosition: "-100% 0",
            }}
          />

          {/* Shimmer effect overlay */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={controls}
            variants={{
              visible: {
                x: "200%",
                transition: {
                  delay: 0.8,
                  duration: 1.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatDelay: 2,
                },
              },
            }}
            className={`absolute ${sizeClasses[size]} w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full`}
          />

          {/* Decorative dots at ends */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={controls}
            transition={{
              delay: 0.6,
              duration: 0.5,
              type: "spring",
              stiffness: 200,
            }}
            className={`absolute -bottom-3 -left-2 w-2 h-2 rounded-full bg-accent shadow-md ${
              size === "large" ? "w-3 h-3" : "w-2 h-2"
            }`}
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={controls}
            transition={{
              delay: 0.8,
              duration: 0.5,
              type: "spring",
              stiffness: 200,
            }}
            className={`absolute -bottom-3 -right-2 w-2 h-2 rounded-full bg-accent shadow-md ${
              size === "large" ? "w-3 h-3" : "w-2 h-2"
            }`}
          />
        </>
      )}
    </div>
  );
};

// Enhanced Hero Underline Component for the main title
const HeroUnderline = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <div ref={ref} className="relative inline-block">
      {children}
      <div className="relative mt-4">
        {/* Main underline */}
        <motion.div
          initial={{ width: 0 }}
          animate={controls}
          transition={{
            duration: 1.5,
            ease: [0.43, 0.13, 0.23, 0.96],
          }}
          className="h-1 bg-gradient-to-r from-transparent via-accent to-transparent rounded-full"
        />

        {/* Glowing center accent */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={controls}
          transition={{
            delay: 0.8,
            duration: 0.8,
            ease: "easeOut",
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-accent/30 rounded-full blur-md"
        />

        {/* End caps */}
        <motion.div
          initial={{ scale: 0 }}
          animate={controls}
          transition={{
            delay: 1,
            duration: 0.5,
            type: "spring",
            stiffness: 200,
          }}
          className="absolute -top-1 -left-2 w-3 h-3 rounded-full bg-accent shadow-lg"
        />
        <motion.div
          initial={{ scale: 0 }}
          animate={controls}
          transition={{
            delay: 1.2,
            duration: 0.5,
            type: "spring",
            stiffness: 200,
          }}
          className="absolute -top-1 -right-2 w-3 h-3 rounded-full bg-accent shadow-lg"
        />
      </div>
    </div>
  );
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

const NextArrow = ({ onClick }) => (
  <div className="absolute top-1/2 -right-4 lg:-right-6 -translate-y-1/2 z-20">
    <button
      className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-accent dark:bg-accent/80 text-dark dark:text-white flex items-center justify-center border border-lightBg dark:border-lightBg/50 shadow-lg hover:bg-lightBg dark:hover:bg-lightBg/80 transition-colors duration-300"
      onClick={onClick}
      aria-label="Next slide"
    >
      <FaChevronRight className="text-lg" />
    </button>
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div className="absolute top-1/2 -left-4 lg:-left-6 -translate-y-1/2 z-20">
    <button
      className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-accent dark:bg-accent/80 text-dark dark:text-white flex items-center justify-center border border-lightBg dark:border-lightBg/50 shadow-lg hover:bg-lightBg dark:hover:bg-lightBg/80 transition-colors duration-300"
      onClick={onClick}
      aria-label="Previous slide"
    >
      <FaChevronLeft className="text-lg" />
    </button>
  </div>
);

const ProductsPage = () => {
  const [groupedProducts, setGroupedProducts] = useState({});
  const [slidesToShow, setSlidesToShow] = useState(4);
  const [isLoading, setIsLoading] = useState(true);
  const limit = 8;

  // Create refs for each section
  const [heroRef, heroControls] = useScrollAnimation(0.3);
  const [mainHeaderRef, mainHeaderControls] = useScrollAnimation();
  const [footerRef, footerControls] = useScrollAnimation();

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
      <div className="w-2 h-2 rounded-full bg-lightBg dark:bg-lightBg/50 hover:bg-accent dark:hover:bg-accent/80 transition-colors duration-300" />
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
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-dark">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-lightBg/30 dark:border-lightBg/20 border-t-accent dark:border-t-accent/80 rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <FaHeart className="text-accent dark:text-accent/80 text-2xl animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-dark overflow-x-hidden">
      {/* Custom Slider Styles */}
      <style>{`
        .slick-dots li.slick-active div {
          background: #FFE2AF;
          transform: scale(1.2);
        }
        @media (prefers-color-scheme: dark) {
          .slick-dots li.slick-active div {
            background: #FFE2AFCC;
          }
        }
        .slick-dots li div {
          transition: all 0.3s ease;
        }
        .slick-dots li div:hover {
          transform: scale(1.1);
          background: #FFE2AF;
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
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #FFE2AF, #FFD166);
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #FFD166, #FFC145);
        }
        .dark ::-webkit-scrollbar-track {
          background: #2d3748;
        }
        .dark ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #FFE2AFCC, #FFD166CC);
        }
      `}</style>

      {/* Hero Image Section - Enhanced with Underline */}
      <div className="relative overflow-hidden">
        <div className="relative h-[70vh] min-h-[600px] flex items-center justify-center">
          {/* Background Image with Parallax Effect */}
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 z-0 w-full"
            style={{
              backgroundImage: `url("/photoshoot1.jpg")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }}
          >
            {/* Gradient Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/60 to-dark/80"
            />
          </motion.div>

          {/* Content with Hero Underline */}
          <motion.div
            ref={heroRef}
            variants={staggeredContainer}
            initial="hidden"
            animate={heroControls}
            className="relative z-10 text-center px-4 max-w-4xl mx-auto"
          >
            <motion.div variants={fadeUp} className="mb-8">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/15 backdrop-blur-md border border-white/30 mb-6 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent">
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "200%" }}
                    transition={{
                      duration: 2,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                    className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  />
                </div>
                <FaCrown className="text-accent text-lg relative z-10" />
                <span className="text-sm font-semibold text-white tracking-wide relative z-10">
                  PREMIUM COLLECTION
                </span>
              </div>
            </motion.div>

            {/* Hero Title with Special Underline */}
            <motion.div variants={fadeUp} className="mb-8">
              <HeroUnderline>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
                  <span className="text-white block">Discover</span>
                  <span className="text-accent block mt-2">
                    Timeless Beauty
                  </span>
                </h1>
              </HeroUnderline>
            </motion.div>

            {/* Description Text */}
            <motion.p
              variants={fadeIn}
              className="text-xl lg:text-2xl text-gray-200 max-w-2xl mx-auto mb-10 font-light tracking-wide"
            >
              Immerse yourself in our curated selection of premium cosmetics,
              where beauty meets craftsmanship in perfect harmony.
            </motion.p>

            {/* CTA Button */}
            <motion.div variants={scaleIn} className="inline-block">
              <Link
                to="#collections"
                className="group flex items-center gap-3 px-10 py-5 rounded-xl bg-accent hover:bg-accent/90 text-dark font-bold text-lg border-2 border-accent shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-3xl relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.div
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "200%" }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  />
                </div>
                <span className="tracking-wide relative z-10">
                  EXPLORE COLLECTIONS
                </span>
                <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
        </div>

        {/* Subtle Divider */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent dark:from-dark" />
      </div>

      {/* Main Content */}
      <div
        id="collections"
        className="max-w-7xl mx-auto w-full py-16 px-4 sm:px-6 lg:px-8"
      >
        {/* Header - Enhanced with Underline */}
        <motion.div
          ref={mainHeaderRef}
          variants={staggeredContainer}
          initial="hidden"
          animate={mainHeaderControls}
          className="text-center mb-16 lg:mb-20"
        >
          <motion.div variants={fadeUp} className="mb-6">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-lightBg dark:bg-dark/50 border border-accent/30 dark:border-accent/20 shadow-lg relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <FaRegGem className="text-accent relative z-10" />
              <span className="text-sm font-semibold text-dark dark:text-white tracking-wide relative z-10">
                OUR COLLECTIONS
              </span>
            </div>
          </motion.div>

          {/* Main Title with Animated Underline - Large size */}
          <div className="mb-8">
            <UnderlineHeading
              size="large"
              align="center"
              className="inline-block"
            >
              <h1 className="text-4xl lg:text-6xl font-bold">
                <span className="text-dark dark:text-white">Premium</span>
                <span className="text-accent ml-3">Collections</span>
              </h1>
            </UnderlineHeading>
          </div>

          <motion.p
            variants={fadeUp}
            className="text-lg lg:text-xl text-dark/70 dark:text-gray-300 max-w-3xl mx-auto font-light"
          >
            Discover our curated selection of premium beauty products, carefully
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
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggeredContainer}
                className="mb-24 lg:mb-32 last:mb-0"
              >
                {/* Category Header */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10 lg:mb-14 gap-6">
                  <motion.div
                    variants={fadeUp}
                    className="text-center lg:text-left"
                  >
                    {/* Category Title with Animated Underline - Medium size, left aligned */}
                    <div className="mb-4">
                      <UnderlineHeading
                        size="medium"
                        align="left"
                        className="inline-block mb-2"
                      >
                        <h2 className="text-3xl lg:text-5xl font-bold text-dark dark:text-white inline-block">
                          {categoryName}
                          <span className="text-accent ml-2">Collection</span>
                        </h2>
                      </UnderlineHeading>
                    </div>

                    <p className="text-dark/70 dark:text-gray-300 max-w-2xl font-light">
                      Explore our premium {categoryName.toLowerCase()}{" "}
                      selection, featuring the finest products for your beauty
                      needs.
                    </p>
                  </motion.div>

                  <motion.div variants={fadeIn} className="lg:flex justify-end">
                    <Link
                      to={`/category/${encodeURIComponent(categoryName.toLowerCase())}`}
                      className="group flex items-center gap-3 px-8 py-4 rounded-xl bg-accent dark:bg-accent/80 hover:bg-lightBg dark:hover:bg-lightBg/30 text-dark dark:text-white font-semibold border border-lightBg dark:border-lightBg/30 shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="relative z-10">
                        View All {categoryName}
                      </span>
                      <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
                    </Link>
                  </motion.div>
                </div>

                {/* Slider */}
                <div className="relative">
                  <Slider {...sliderSettings} className="relative z-10">
                    {visibleProducts.map((product, index) => (
                      <motion.div
                        key={product._id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        viewport={{ once: true }}
                        className="px-2"
                      >
                        <ProductCard product={product} index={index} />
                      </motion.div>
                    ))}
                  </Slider>
                </div>

                {/* Mobile View All Button */}
                <div className="mt-8 lg:hidden flex justify-center">
                  <Link
                    to={`/category/${encodeURIComponent(categoryName.toLowerCase())}`}
                    className="group px-8 py-4 rounded-xl bg-accent dark:bg-accent/80 text-dark dark:text-white font-semibold flex items-center gap-3 border border-lightBg dark:border-lightBg/30 shadow-lg relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10">
                      View All {categoryName}
                    </span>
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
                  </Link>
                </div>
              </motion.div>
            );
          }
        )}

        {/* Empty State */}
        {Object.keys(groupedProducts).length === 0 && !isLoading && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-20"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-lightBg dark:bg-lightBg/20 mb-6">
              <FaHeart className="text-accent dark:text-accent/80 text-3xl" />
            </div>
            <div className="mb-6">
              <UnderlineHeading
                size="medium"
                align="center"
                className="inline-block"
              >
                <h3 className="text-2xl font-bold text-dark dark:text-white">
                  No Products Found
                </h3>
              </UnderlineHeading>
            </div>
            <p className="text-dark/70 dark:text-gray-300 max-w-md mx-auto">
              We're currently updating our collection. Check back soon for our
              premium beauty products.
            </p>
          </motion.div>
        )}

        {/* Footer CTA with Enhanced Underline */}
        <motion.div
          ref={footerRef}
          variants={staggeredContainer}
          initial="hidden"
          animate={footerControls}
          className="mt-20 lg:mt-28 text-center"
        >
          <motion.div variants={fadeUp} className="mb-6">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-lightBg dark:bg-dark/50 border border-accent/30 dark:border-accent/20 shadow-lg relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <FaGem className="text-accent relative z-10" />
              <span className="text-sm font-semibold text-dark dark:text-white tracking-wide relative z-10">
                PREMIUM QUALITY GUARANTEED
              </span>
            </div>
          </motion.div>

          {/* Footer Title with Animated Underline - Large size */}
          <div className="mb-8">
            <UnderlineHeading
              size="large"
              align="center"
              className="inline-block"
            >
              <h3 className="text-3xl lg:text-5xl font-bold text-dark dark:text-white">
                Ready to Elevate Your Beauty?
              </h3>
            </UnderlineHeading>
          </div>

          <motion.p
            variants={fadeUp}
            className="text-lg lg:text-xl text-dark/70 dark:text-gray-300 max-w-2xl mx-auto mb-8 font-light"
          >
            Explore all our collections and discover the perfect products for
            your beauty routine.
          </motion.p>

          <motion.div variants={scaleIn} className="inline-block">
            <Link
              to="/products/all"
              className="group px-10 py-5 mb-4 rounded-xl bg-accent dark:bg-accent/80 hover:bg-lightBg dark:hover:bg-lightBg/30 text-dark dark:text-white font-bold text-lg flex items-center gap-3 border-2 border-accent dark:border-lightBg/30 shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-3xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <motion.div
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "200%" }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                />
              </div>
              <span className="relative z-10">BROWSE ALL COLLECTIONS</span>
              <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductsPage;
