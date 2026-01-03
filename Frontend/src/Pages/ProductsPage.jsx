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
//       className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-[#D8C9A7] dark:bg-[#D7C097] text-gray-800 dark:text-gray-900 flex items-center justify-center border border-[#D7C097] dark:border-[#D8C9A7] transition-all duration-300 group hover:bg-[#D7C097] dark:hover:bg-[#D8C9A7]"
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
//       className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-[#D8C9A7] dark:bg-[#D7C097] text-gray-800 dark:text-gray-900 flex items-center justify-center border border-[#D7C097] dark:border-[#D8C9A7] transition-all duration-300 group hover:bg-[#D7C097] dark:hover:bg-[#D8C9A7]"
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
//         {dots.slice(0, 4)}
//       </ul>
//     ),
//     customPaging: () => (
//       <div className="w-2 h-2 rounded-full bg-[#D8C9A7] dark:bg-[#D7C097] hover:bg-[#D7C097] dark:hover:bg-[#D8C9A7] transition-all duration-300 cursor-pointer" />
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
//       <div className="min-h-screen flex items-center justify-center bg-[#EEEEEE] dark:bg-gray-900">
//         <div className="relative">
//           <div className="w-20 h-20 border-4 border-[#D8C9A7] dark:border-[#D7C097]/30 border-t-[#D7C097] dark:border-t-[#D8C9A7] rounded-full animate-spin" />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.8 }}
//       className="min-h-screen bg-[#EEEEEE] dark:bg-gray-900 max:sm-py-24 flex items-center justify-center"
//     >
//       {/* Custom Slider Styles */}
//       <style>{`
//         .slick-dots li.slick-active div {
//           background: #D7C097;
//           transform: scale(1.2);
//         }
//         .slick-dots li div {
//           transition: all 0.3s ease;
//         }
//         .slick-dots li div:hover {
//           transform: scale(1.1);
//           background: #D8C9A7;
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
//             className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#D8C9A7] dark:bg-[#D7C097]/30 border border-[#D7C097] dark:border-[#D8C9A7]/50 mb-6"
//           >
//             <span className="text-sm font-medium text-gray-800 dark:text-gray-900">
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
//             <span className="text-[#D7C097] dark:text-[#D8C9A7] ml-3">
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
//                       <span className="text-[#D7C097] dark:text-[#D8C9A7] ml-2">
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
//                       className="group flex items-center gap-3 px-6 py-3.5 rounded-xl bg-[#D8C9A7] dark:bg-[#D7C097]/30 hover:bg-[#D7C097] dark:hover:bg-[#D8C9A7]/50 border border-[#D7C097] dark:border-[#D8C9A7] text-gray-800 dark:text-gray-900 font-semibold transition-all duration-300"
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
//                       className="group px-8 py-3.5 rounded-xl bg-[#D8C9A7] dark:bg-[#D7C097] text-gray-900 dark:text-gray-900 font-semibold flex items-center gap-3 transition-all duration-300 hover:bg-[#D7C097] dark:hover:bg-[#D8C9A7]"
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
//             <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#D8C9A7] dark:bg-[#D7C097]/30 mb-6">
//               <FaArrowRight className="text-[#D7C097] dark:text-[#D8C9A7] text-3xl rotate-90" />
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
//             className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D8C9A7] dark:bg-[#D7C097]/30 border border-[#D7C097] dark:border-[#D8C9A7] mb-6"
//           >
//             <span className="text-sm font-medium text-gray-800 dark:text-gray-900">
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
//               className="group px-8 py-4 mb-4 rounded-xl bg-[#D8C9A7] dark:bg-[#D7C097] text-gray-900 dark:text-gray-900 font-semibold text-lg flex items-center gap-3 transition-all duration-300 hover:bg-[#D7C097] dark:hover:bg-[#D8C9A7]"
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
import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductCard from "../Components/ProductCard";
import {
  FaChevronLeft,
  FaChevronRight,
  FaArrowRight,
  FaArrowDown,
  FaStar,
  FaCrown,
  FaGem,
} from "react-icons/fa";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { fetchWithAuth } from "../utils/auth";

// Import the image (adjust the path based on your project structure)
import photoshoot1 from "../assets/photoshoot1.jpg"; // If it's in assets folder at src level

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

  // Refs for scroll animations
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const sectionRef = useRef(null);

  // Scroll-based animations
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 500], [0, -100]);
  const imageScale = useTransform(scrollY, [0, 500], [1, 1.05]);
  const imageOpacity = useTransform(scrollY, [0, 300], [1, 0.8]);

  // Check if section is in view
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

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
      className="min-h-screen bg-[#EEEEEE] dark:bg-gray-900"
      ref={sectionRef}
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
        
        /* Parallax effect */
        .parallax-container {
          perspective: 1000px;
        }
        
        /* Shimmer effect */
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        
        .shimmer {
          background: linear-gradient(90deg, transparent 25%, rgba(255,255,255,0.4) 50%, transparent 75%);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
      `}</style>

      {/* Hero Image Section with Parallax */}
      <div ref={heroRef} className="relative overflow-hidden">
        <motion.div
          className="relative h-[70vh] min-h-[500px] max-h-[800px] flex items-center justify-center"
          style={{
            y: imageY,
            scale: imageScale,
            opacity: imageOpacity,
          }}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 1.2,
            ease: [0.43, 0.13, 0.23, 0.96],
          }}
        >
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${photoshoot1})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }}
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Animated Particles */}
            <div className="absolute inset-0">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-[#D8C9A7] rounded-full"
                  initial={{
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    opacity: 0,
                  }}
                  animate={{
                    y: [null, -50],
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 3,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "linear",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Shimmer Overlay */}
          <div className="absolute inset-0 shimmer" />

          {/* Content */}
          <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
                <FaCrown className="text-[#D8C9A7] text-lg" />
                <span className="text-sm font-medium text-white">
                  Premium Collection
                </span>
                <FaGem className="text-[#D8C9A7] text-lg" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="text-white">Discover</span>
              <span className="text-[#D8C9A7] block mt-2">
                Timeless Elegance
              </span>
            </motion.h1>

            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg lg:text-xl text-gray-200 max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Immerse yourself in our curated selection of premium products,
              where beauty meets craftsmanship in perfect harmony.
            </motion.p>

            {/* Rating Badge */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6, type: "spring" }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-[#D8C9A7] text-sm" />
                ))}
              </div>
              <span className="text-white text-sm font-medium">
                4.9/5 Customer Rating
              </span>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <FaArrowDown className="text-white text-2xl" />
              </motion.div>
            </motion.div>
          </div>

          {/* Floating Elements */}
          <motion.div
            className="absolute top-1/4 left-10 hidden lg:block"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="text-white text-sm font-medium bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              Premium Quality
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-1/4 right-10 hidden lg:block"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <div className="text-white text-sm font-medium bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              Handcrafted
            </div>
          </motion.div>
        </motion.div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full"
          >
            <path
              fill="#EEEEEE"
              fillOpacity="1"
              d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,181.3C960,181,1056,203,1152,202.7C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto w-full lg:py-20 px-4 sm:px-6 lg:px-8">
        {/* Featured Collection Banner */}

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
                transition={{
                  duration: 0.6,
                  delay: categoryIndex * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
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
