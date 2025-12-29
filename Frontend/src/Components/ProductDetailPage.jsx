// import React, { useEffect, useState, useContext, useRef } from "react";
// import { authContext } from "../Context/authContext";
// import { cartContext } from "../Context/cartContext";
// import { useParams, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import toast from "react-hot-toast";
// import {
//   FaHeart,
//   FaShoppingCart,
//   FaTag,
//   FaTruck,
//   FaShieldAlt,
//   FaUndo,
//   FaStar,
//   FaChevronLeft,
//   FaChevronRight,
//   FaShareAlt,
//   FaChevronUp,
//   FaChevronDown,
//   FaInfoCircle,
//   FaCheckCircle,
//   FaLeaf,
//   FaFlask,
//   FaBoxOpen,
//   FaCalendarAlt,
//   FaEye,
//   FaShippingFast,
//   FaAward,
//   FaRecycle,
//   FaGem,
//   FaRocket,
//   FaMagic,
//   FaCrown,
//   FaBookOpen,
//   FaClipboardList,
//   FaTemperatureLow,
//   FaExpandAlt,
//   FaWater,
// } from "react-icons/fa";
// import { IoSparkles } from "react-icons/io5";
// import { GiMedicines } from "react-icons/gi";
// import { useProducts } from "../Context/ProductContext";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { fetchWithAuth } from "../utils/auth";
// import CategoryProductCard from "./CategoryProductCard";
// const BACKEND_URL = import.meta.env.VITE_API_URL;

// // Helper function to get the proper image URL
// const getImageUrl = (imagePath) => {
//   if (!imagePath || typeof imagePath !== "string") {
//     return "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop";
//   }

//   // If it's already a full URL, return as is
//   if (imagePath.startsWith("http")) {
//     return imagePath;
//   }

//   // If it's a relative path, prepend the backend URL
//   let cleanPath = imagePath.replace(/\\/g, "/");
//   if (!cleanPath.startsWith("/")) {
//     cleanPath = "/" + cleanPath;
//   }

//   return `${BACKEND_URL}${cleanPath}`;
// };

// const ProductDetailPage = () => {
//   const { id } = useParams();
//   const { user } = useContext(authContext);
//   const { setCart } = useContext(cartContext);
//   const navigate = useNavigate();
//   const { products, toggleLike: contextToggleLike } = useProducts();

//   const [product, setProduct] = useState(null);
//   const [relatedGroups, setRelatedGroups] = useState({
//     sameCategory: [],
//     samePrice: [],
//     sameName: [],
//     sameFeatures: [],
//   });
//   const [loadingAdd, setLoadingAdd] = useState(false);
//   const [activeLikeId, setActiveLikeId] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [expandedSections, setExpandedSections] = useState({});
//   const [hoveredCarousel, setHoveredCarousel] = useState(null);
//   const [activeDescriptionTab, setActiveDescriptionTab] = useState("overview");
//   const [imageLoaded, setImageLoaded] = useState(false);

//   const enrichProductForClient = (p) => {
//     if (!p) return p;

//     // Process images
//     let images = [];
//     if (Array.isArray(p.images) && p.images.length > 0) {
//       images = p.images.map((img) => getImageUrl(img));
//     } else if (p.image && typeof p.image === "string") {
//       images = [getImageUrl(p.image)];
//     } else {
//       images = [
//         "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
//       ];
//     }

//     const likesCount =
//       typeof p.likesCount === "number"
//         ? p.likesCount
//         : Array.isArray(p.likes)
//           ? p.likes.length
//           : 0;
//     const isLiked =
//       !!user && Array.isArray(p.likes)
//         ? p.likes.some((u) => String(u) === String(user._id))
//         : false;
//     return { ...p, images, likesCount, isLiked };
//   };

//   useEffect(() => {
//     if (!id) return;
//     const prod = products[id];
//     if (!prod) return;

//     const enrichedProduct = enrichProductForClient(prod);
//     setProduct(enrichedProduct);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [id, products, user]);

//   // Build grouped related products
//   useEffect(() => {
//     if (!product) return;

//     const sameCategory = Object.values(products)
//       .filter(
//         (p) =>
//           p.category?._id === product.category?._id && p._id !== product._id
//       )
//       .map(enrichProductForClient);

//     const samePrice = Object.values(products)
//       .filter((p) => p.price === product.price && p._id !== product._id)
//       .map(enrichProductForClient);

//     const sameName = Object.values(products)
//       .filter((p) => p.name === product.name && p._id !== product._id)
//       .map(enrichProductForClient);

//     const sameFeatures = Object.values(products)
//       .filter((p) =>
//         p.description?.keyFeatures?.some((f) =>
//           product.description?.keyFeatures?.includes(f)
//         )
//       )
//       .filter((p) => p._id !== product._id)
//       .map(enrichProductForClient);

//     setRelatedGroups({
//       sameCategory,
//       samePrice,
//       sameName,
//       sameFeatures,
//     });
//   }, [product, products, user]);

//   const toggleLike = (productId) => {
//     if (!user) {
//       toast("Please login to like products", { icon: "🔒" });
//       navigate("/login");
//       return;
//     }
//     setActiveLikeId(productId);
//     contextToggleLike(productId);
//     setTimeout(() => setActiveLikeId(null), 300);
//   };

//   const addToCart = async () => {
//     if (!user) {
//       toast.error("Please login to add to cart");
//       navigate("/login");
//       return;
//     }
//     if (product.isSold) {
//       toast.error("This product is sold out");
//       return;
//     }
//     if (product.stock === 0) {
//       toast.error("This product is out of stock");
//       return;
//     }
//     setLoadingAdd(true);
//     try {
//       const res = await fetchWithAuth(
//         `${BACKEND_URL}/api/cart/add/${product._id}`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ quantity: 1 }),
//         }
//       );
//       const data = await res.json();
//       setLoadingAdd(false);
//       if (!res.ok) return toast.error(data.message);
//       toast.success("Added to cart! 🛒");
//       setCart(data);
//     } catch (err) {
//       setLoadingAdd(false);
//       toast.error("Server error");
//     }
//   };

//   const formatPrice = (price) => {
//     const priceNum = Number(price) || 0;
//     return new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//       minimumFractionDigits: 0,
//     }).format(priceNum);
//   };

//   const formatLikes = (num) => {
//     const likes = Number(num) || 0;
//     if (likes >= 1000000) return (likes / 1000000).toFixed(1) + "M";
//     if (likes >= 1000) return (likes / 1000).toFixed(1) + "k";
//     return likes.toString();
//   };

//   // Clean description render without gradients
//   const renderDescription = (description) => {
//     if (!description) return null;

//     const descriptionTabs = [
//       {
//         id: "overview",
//         label: "Overview",
//         icon: <FaBookOpen />,
//         color: "bg-blue-100 dark:bg-blue-900/30",
//       },
//       {
//         id: "features",
//         label: "Key Features",
//         icon: <FaCheckCircle />,
//         color: "bg-emerald-100 dark:bg-emerald-900/30",
//       },
//       {
//         id: "benefits",
//         label: "Benefits",
//         icon: <FaLeaf />,
//         color: "bg-green-100 dark:bg-green-900/30",
//       },
//       {
//         id: "ingredients",
//         label: "Ingredients",
//         icon: <FaFlask />,
//         color: "bg-purple-100 dark:bg-purple-900/30",
//       },
//       {
//         id: "usage",
//         label: "How to Use",
//         icon: <FaClipboardList />,
//         color: "bg-amber-100 dark:bg-amber-900/30",
//       },
//       {
//         id: "storage",
//         label: "Storage",
//         icon: <FaTemperatureLow />,
//         color: "bg-indigo-100 dark:bg-indigo-900/30",
//       },
//     ];

//     const getTabContent = (tabId) => {
//       switch (tabId) {
//         case "overview":
//           return description.intro || "";
//         case "features":
//           return description.keyFeatures || [];
//         case "benefits":
//           return description.benefits || [];
//         case "ingredients":
//           return description.ingredients || "";
//         case "usage":
//           return description.howToUse || "";
//         case "storage":
//           return description.storage || "";
//         default:
//           return "";
//       }
//     };

//     const hasContentForTab = (tabId) => {
//       const content = getTabContent(tabId);
//       if (Array.isArray(content)) return content.length > 0;
//       return content && content.toString().trim() !== "";
//     };

//     const currentContent = getTabContent(activeDescriptionTab);
//     const tabsWithContent = descriptionTabs.filter((tab) =>
//       hasContentForTab(tab.id)
//     ).length;

//     if (tabsWithContent === 0) return null;

//     return (
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         viewport={{ once: true, margin: "-50px" }}
//         className="mt-16"
//       >
//         {/* Description Tabs */}
//         <div className="flex overflow-x-auto pb-4 mb-8">
//           <div className="flex gap-2 min-w-max">
//             {descriptionTabs.map((tab) => {
//               const hasContent = hasContentForTab(tab.id);
//               const isActive = activeDescriptionTab === tab.id;

//               if (!hasContent) return null;

//               return (
//                 <motion.button
//                   key={tab.id}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => setActiveDescriptionTab(tab.id)}
//                   className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-3 flex-shrink-0 ${
//                     isActive
//                       ? "bg-amber-600 text-white"
//                       : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
//                   }`}
//                 >
//                   <span>{tab.icon}</span>
//                   {tab.label}
//                 </motion.button>
//               );
//             })}
//           </div>
//         </div>

//         {/* Tab Content */}
//         <motion.div
//           key={activeDescriptionTab}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           className="bg-white dark:bg-gray-800 rounded-lg p-6"
//         >
//           {Array.isArray(currentContent) ? (
//             <div className="space-y-4">
//               {currentContent.map((item, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                   className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50"
//                 >
//                   <FaCheckCircle className="text-amber-600 dark:text-amber-400 mt-1 flex-shrink-0" />
//                   <p className="text-gray-700 dark:text-gray-300">{item}</p>
//                 </motion.div>
//               ))}
//             </div>
//           ) : (
//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line"
//             >
//               {currentContent}
//             </motion.p>
//           )}
//         </motion.div>
//       </motion.div>
//     );
//   };

//   const NextArrow = ({ onClick }) => (
//     <motion.button
//       whileHover={{ scale: 1.1 }}
//       whileTap={{ scale: 0.9 }}
//       onClick={onClick}
//       className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-amber-500 dark:bg-amber-600 text-white flex items-center justify-center"
//       aria-label="Next image"
//     >
//       <FaChevronRight />
//     </motion.button>
//   );

//   const PrevArrow = ({ onClick }) => (
//     <motion.button
//       whileHover={{ scale: 1.1 }}
//       whileTap={{ scale: 0.9 }}
//       onClick={onClick}
//       className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-amber-500 dark:bg-amber-600 text-white flex items-center justify-center"
//       aria-label="Previous image"
//     >
//       <FaChevronLeft />
//     </motion.button>
//   );

//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: false,
//     nextArrow: <NextArrow />,
//     prevArrow: <PrevArrow />,
//     afterChange: (current) => setSelectedImage(current),
//     customPaging: (i) => (
//       <div className="w-2 h-2 rounded-full bg-gray-400 hover:bg-amber-500 transition-all duration-300 cursor-pointer" />
//     ),
//     appendDots: (dots) => (
//       <ul className="flex justify-center gap-2 mt-4">{dots}</ul>
//     ),
//   };

//   const generateRating = (productId) => {
//     if (!productId || typeof productId !== "string") return 4.0;
//     const seed = productId.charCodeAt(productId.length - 1) || 0;
//     return 3.5 + ((seed % 10) / 10) * 1.5;
//   };

//   const toggleSection = (section) => {
//     setExpandedSections((prev) => ({
//       ...prev,
//       [section]: !prev[section],
//     }));
//   };

//   const InfiniteCarousel = ({ items, type }) => {
//     const carouselRef = useRef(null);

//     const scrollLeft = () => {
//       if (carouselRef.current) {
//         carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
//       }
//     };

//     const scrollRight = () => {
//       if (carouselRef.current) {
//         carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
//       }
//     };

//     if (items.length === 0) return null;

//     return (
//       <div className="relative">
//         <motion.button
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//           onClick={scrollLeft}
//           className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center border border-gray-300 dark:border-gray-700"
//           aria-label="Scroll left"
//         >
//           <FaChevronLeft className="text-gray-700 dark:text-gray-300" />
//         </motion.button>

//         <motion.button
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//           onClick={scrollRight}
//           className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center border border-gray-300 dark:border-gray-700"
//           aria-label="Scroll right"
//         >
//           <FaChevronRight className="text-gray-700 dark:text-gray-300" />
//         </motion.button>

//         <div
//           ref={carouselRef}
//           className="flex overflow-x-auto scrollbar-hide scroll-smooth px-2"
//           style={{
//             scrollbarWidth: "none",
//             msOverflowStyle: "none",
//           }}
//         >
//           <div className="flex gap-4 py-2 min-w-max">
//             {items.map((product, index) => (
//               <div
//                 key={`${product._id}-${index}`}
//                 className="flex-shrink-0 w-64"
//               >
//                 <CategoryProductCard
//                   product={product}
//                   index={index}
//                   className="h-full"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderRelatedSection = (title, products, type) => {
//     if (!products || products.length === 0) return null;
//     const isExpanded = expandedSections[type] || false;

//     return (
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         className="mb-8"
//       >
//         <motion.button
//           onClick={() => toggleSection(type)}
//           className="flex items-center justify-between w-full mb-4 p-4 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
//           whileHover={{ scale: 1.02 }}
//           whileTap={{ scale: 0.98 }}
//         >
//           <div className="flex items-center gap-3">
//             <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
//               <FaStar className="text-amber-600 dark:text-amber-400" />
//             </div>
//             <div className="text-left">
//               <h3 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white">
//                 {title}
//               </h3>
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                 {products.length} product{products.length !== 1 ? "s" : ""}{" "}
//                 found
//               </p>
//             </div>
//           </div>
//           <motion.div
//             animate={{ rotate: isExpanded ? 180 : 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
//           </motion.div>
//         </motion.button>

//         <AnimatePresence>
//           {isExpanded && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.4 }}
//               className="overflow-hidden"
//             >
//               <InfiniteCarousel items={products} type={type} />
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>
//     );
//   };

//   if (!product)
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
//         <div className="relative">
//           <div className="w-20 h-20 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
//         </div>
//       </div>
//     );

//   const rating = generateRating(product._id);
//   const stars = Math.round(rating);
//   const isOnSale =
//     product.originalPrice &&
//     Number(product.originalPrice) > Number(product.price);
//   const discountPercent = isOnSale
//     ? Math.round(
//         ((Number(product.originalPrice) - Number(product.price)) /
//           Number(product.originalPrice)) *
//           100
//       )
//     : 0;

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.8 }}
//       className="min-h-screen bg-white dark:bg-gray-900"
//     >
//       <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
//         {/* Back Button */}
//         <motion.button
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium transition-all duration-300 mb-8"
//         >
//           <FaChevronLeft />
//           Back to Products
//         </motion.button>

//         {/* Main Product Section */}
//         <div className="w-full grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
//           {/* Images Section */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{
//               duration: 0.8,
//               type: "spring",
//               stiffness: 100,
//             }}
//             className="space-y-4"
//           >
//             {/* Main Image with Spin Animation */}
//             <motion.div
//               initial={{ rotate: 0 }}
//               animate={{ rotate: 360 }}
//               transition={{
//                 duration: 0.5,
//                 repeat: 1,
//                 ease: "easeInOut",
//               }}
//               onAnimationComplete={() => setImageLoaded(true)}
//               className="w-full relative rounded-xl overflow-hidden"
//             >
//               <Slider {...sliderSettings}>
//                 {product.images.map((img, idx) => (
//                   <div key={idx} className="w-full">
//                     <img
//                       src={img}
//                       alt={`${product.name} - Image ${idx + 1}`}
//                       className="w-full h-64 sm:h-80 lg:h-96 object-contain bg-gray-100 dark:bg-gray-800"
//                       onError={(e) => {
//                         e.target.onerror = null;
//                         e.target.src =
//                           "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop";
//                       }}
//                     />
//                   </div>
//                 ))}
//               </Slider>
//             </motion.div>

//             {/* Thumbnail Images */}
//             <div className="flex gap-2 overflow-x-auto pb-2">
//               {product.images.map((img, idx) => (
//                 <motion.button
//                   key={idx}
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ delay: 0.2 + idx * 0.1 }}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => setSelectedImage(idx)}
//                   className={`flex-shrink-0 w-16 h-16 rounded-lg border overflow-hidden transition-all duration-300 ${
//                     selectedImage === idx
//                       ? "border-amber-500"
//                       : "border-gray-300 dark:border-gray-700"
//                   }`}
//                 >
//                   <img
//                     src={img}
//                     alt={`Thumbnail ${idx + 1}`}
//                     className="w-full h-full object-cover"
//                     onError={(e) => {
//                       e.target.onerror = null;
//                       e.target.src =
//                         "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop";
//                     }}
//                   />
//                 </motion.button>
//               ))}
//             </div>
//           </motion.div>

//           {/* Product Details */}
//           <motion.div
//             initial={{ opacity: 0, x: 30 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="space-y-6"
//           >
//             {/* Product Header */}
//             <div>
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.3 }}
//                 className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 mb-4"
//               >
//                 <span className="text-sm font-medium text-amber-800 dark:text-amber-300">
//                   Premium Product
//                 </span>
//               </motion.div>

//               <motion.h1
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.4 }}
//                 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4"
//               >
//                 {product.name}
//               </motion.h1>

//               {/* Rating */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.5 }}
//                 className="flex items-center gap-3 mb-6"
//               >
//                 <div className="flex items-center gap-1">
//                   {[...Array(5)].map((_, i) => (
//                     <FaStar
//                       key={i}
//                       className={`text-lg ${
//                         i < stars
//                           ? "text-amber-500 fill-amber-500"
//                           : "text-gray-300 dark:text-gray-600"
//                       }`}
//                     />
//                   ))}
//                 </div>
//                 <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
//                   {rating.toFixed(1)}
//                 </span>
//               </motion.div>
//             </div>

//             {/* Price Section */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.6 }}
//               className="space-y-4"
//             >
//               <div className="flex items-baseline gap-4">
//                 <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
//                   {formatPrice(product.price)}
//                 </span>
//                 {isOnSale && (
//                   <span className="text-xl text-gray-500 dark:text-gray-400 line-through">
//                     {formatPrice(product.originalPrice)}
//                   </span>
//                 )}
//               </div>

//               {isOnSale && (
//                 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/30">
//                   <FaTag className="text-amber-600 dark:text-amber-400" />
//                   <span className="font-medium text-amber-800 dark:text-amber-300">
//                     -{discountPercent}% OFF
//                   </span>
//                 </div>
//               )}

//               {/* Stock Status */}
//               <div
//                 className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
//                   product.isSold || product.stock === 0
//                     ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
//                     : "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
//                 }`}
//               >
//                 <div
//                   className={`w-2 h-2 rounded-full ${
//                     product.isSold || product.stock === 0
//                       ? "bg-red-500"
//                       : "bg-green-500"
//                   }`}
//                 />
//                 <span className="font-medium">
//                   {product.isSold || product.stock === 0
//                     ? "Sold Out"
//                     : `${product.stock || 10} units available`}
//                 </span>
//               </div>
//             </motion.div>

//             {/* Key Features */}
//             {product.keyFeatures && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.7 }}
//                 className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6"
//               >
//                 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
//                   Key Features
//                 </h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                   {(Array.isArray(product.keyFeatures)
//                     ? product.keyFeatures
//                     : typeof product.keyFeatures === "string"
//                       ? product.keyFeatures
//                           .split(",")
//                           .map((f) => f.trim())
//                           .filter(Boolean)
//                       : []
//                   ).map((feature, idx) => (
//                     <div
//                       key={idx}
//                       className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-gray-700"
//                     >
//                       <FaCheckCircle className="text-amber-600 dark:text-amber-400 flex-shrink-0" />
//                       <span className="text-gray-700 dark:text-gray-300">
//                         {feature}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </motion.div>
//             )}

//             {/* Action Buttons */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.8 }}
//               className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4"
//             >
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={addToCart}
//                 disabled={loadingAdd || product.isSold || product.stock === 0}
//                 className={`w-full py-4 rounded-lg font-bold transition-all duration-300 ${
//                   product.isSold || product.stock === 0
//                     ? "bg-red-500/80 text-white cursor-not-allowed"
//                     : "bg-amber-500 dark:bg-amber-600 hover:bg-amber-600 dark:hover:bg-amber-700 text-white"
//                 }`}
//               >
//                 {loadingAdd ? (
//                   <span className="flex items-center justify-center gap-3">
//                     <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                     Adding...
//                   </span>
//                 ) : product.isSold || product.stock === 0 ? (
//                   "Sold Out"
//                 ) : (
//                   <>
//                     <FaShoppingCart className="inline mr-2" />
//                     Add to Cart
//                   </>
//                 )}
//               </motion.button>

//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => toggleLike(product._id)}
//                 className="w-full py-4 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold border border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center gap-3"
//               >
//                 <motion.div
//                   animate={{
//                     scale:
//                       activeLikeId === product._id && product.isLiked
//                         ? [1, 1.3, 1]
//                         : 1,
//                   }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <FaHeart
//                     className={`text-xl ${
//                       product.isLiked
//                         ? "text-red-500 fill-red-500"
//                         : "text-gray-400"
//                     }`}
//                   />
//                 </motion.div>
//                 <span>
//                   {product.isLiked ? "Liked" : "Like"} •{" "}
//                   {formatLikes(product.likesCount)}
//                 </span>
//               </motion.button>
//             </motion.div>

//             {/* Trust Badges */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.9 }}
//               className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4"
//             >
//               <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
//                 <FaTruck className="text-green-600 dark:text-green-400 text-xl" />
//                 <div>
//                   <div className="font-semibold text-gray-900 dark:text-white">
//                     Free Shipping
//                   </div>
//                   <div className="text-sm text-gray-600 dark:text-gray-400">
//                     Over $100
//                   </div>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
//                 <FaShieldAlt className="text-blue-600 dark:text-blue-400 text-xl" />
//                 <div>
//                   <div className="font-semibold text-gray-900 dark:text-white">
//                     Secure Payment
//                   </div>
//                   <div className="text-sm text-gray-600 dark:text-gray-400">
//                     100% Protected
//                   </div>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
//                 <FaUndo className="text-purple-600 dark:text-purple-400 text-xl" />
//                 <div>
//                   <div className="font-semibold text-gray-900 dark:text-white">
//                     Easy Returns
//                   </div>
//                   <div className="text-sm text-gray-600 dark:text-gray-400">
//                     30-Day Policy
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         </div>

//         {/* Product Description */}
//         {product.description && renderDescription(product.description)}

//         {/* Related Products Sections */}
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true, margin: "-50px" }}
//           className="pt-12 border-t border-gray-200 dark:border-gray-700"
//         >
//           <div className="mb-8">
//             <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
//               Related Products
//             </h2>
//           </div>

//           {/* Categorized Related Products */}
//           {renderRelatedSection(
//             "Similar Products",
//             relatedGroups.sameCategory,
//             "sameCategory"
//           )}
//           {renderRelatedSection(
//             "Same Price Products",
//             relatedGroups.samePrice,
//             "samePrice"
//           )}
//           {renderRelatedSection(
//             "Similar Items",
//             relatedGroups.sameName,
//             "sameName"
//           )}
//           {renderRelatedSection(
//             "Products with Similar Features",
//             relatedGroups.sameFeatures,
//             "sameFeatures"
//           )}

//           {/* Empty Related Products State */}
//           {Object.values(relatedGroups).every(
//             (group) => !group || group.length === 0
//           ) && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="text-center py-12"
//             >
//               <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 mb-4">
//                 <FaShareAlt className="text-amber-600 dark:text-amber-400 text-xl" />
//               </div>
//               <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
//                 Explore More Products
//               </h3>
//               <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
//                 Check out our other collections for more amazing products.
//               </p>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => navigate("/products")}
//                 className="px-6 py-3 rounded-lg bg-amber-500 dark:bg-amber-600 text-white font-medium hover:bg-amber-600 dark:hover:bg-amber-700 transition-all duration-300"
//               >
//                 Browse All Products
//               </motion.button>
//             </motion.div>
//           )}
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

// export default ProductDetailPage;
// import React, { useEffect, useState, useContext, useRef } from "react";
// import { authContext } from "../Context/authContext";
// import { cartContext } from "../Context/cartContext";
// import { useParams, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import toast from "react-hot-toast";
// import {
//   FaHeart,
//   FaShoppingCart,
//   FaTag,
//   FaTruck,
//   FaShieldAlt,
//   FaUndo,
//   FaStar,
//   FaChevronLeft,
//   FaChevronRight,
//   FaShareAlt,
//   FaChevronUp,
//   FaChevronDown,
//   FaCheckCircle,
//   FaLeaf,
//   FaFlask,
//   FaBookOpen,
//   FaClipboardList,
//   FaTemperatureLow,
// } from "react-icons/fa";
// import { useProducts } from "../Context/ProductContext";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { fetchWithAuth } from "../utils/auth";
// import CategoryProductCard from "./CategoryProductCard";

// const BACKEND_URL = import.meta.env.VITE_API_URL;

// // Helper function to get the proper image URL
// const getImageUrl = (imagePath) => {
//   if (!imagePath || typeof imagePath !== "string") {
//     return "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop";
//   }
//   if (imagePath.startsWith("http")) {
//     return imagePath;
//   }
//   let cleanPath = imagePath.replace(/\\/g, "/");
//   if (!cleanPath.startsWith("/")) {
//     cleanPath = "/" + cleanPath;
//   }
//   return `${BACKEND_URL}${cleanPath}`;
// };

// const ProductDetailPage = () => {
//   const { id } = useParams();
//   const { user } = useContext(authContext);
//   const { setCart } = useContext(cartContext);
//   const navigate = useNavigate();
//   const { products, toggleLike: contextToggleLike } = useProducts();

//   const [product, setProduct] = useState(null);
//   const [relatedGroups, setRelatedGroups] = useState({
//     sameCategory: [],
//     samePrice: [],
//     sameName: [],
//     sameFeatures: [],
//   });
//   const [loadingAdd, setLoadingAdd] = useState(false);
//   const [activeLikeId, setActiveLikeId] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [expandedSections, setExpandedSections] = useState({});
//   const [activeDescriptionTab, setActiveDescriptionTab] = useState("overview");
//   const [imageLoaded, setImageLoaded] = useState(false);

//   const enrichProductForClient = (p) => {
//     if (!p) return p;

//     let images = [];
//     if (Array.isArray(p.images) && p.images.length > 0) {
//       images = p.images.map((img) => getImageUrl(img));
//     } else if (p.image && typeof p.image === "string") {
//       images = [getImageUrl(p.image)];
//     } else {
//       images = [
//         "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
//       ];
//     }

//     const likesCount =
//       typeof p.likesCount === "number"
//         ? p.likesCount
//         : Array.isArray(p.likes)
//           ? p.likes.length
//           : 0;
//     const isLiked =
//       !!user && Array.isArray(p.likes)
//         ? p.likes.some((u) => String(u) === String(user._id))
//         : false;
//     return { ...p, images, likesCount, isLiked };
//   };

//   useEffect(() => {
//     if (!id) return;
//     const prod = products[id];
//     if (!prod) return;

//     const enrichedProduct = enrichProductForClient(prod);
//     setProduct(enrichedProduct);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [id, products, user]);

//   useEffect(() => {
//     if (!product) return;

//     const sameCategory = Object.values(products)
//       .filter(
//         (p) =>
//           p.category?._id === product.category?._id && p._id !== product._id
//       )
//       .map(enrichProductForClient);

//     const samePrice = Object.values(products)
//       .filter((p) => p.price === product.price && p._id !== product._id)
//       .map(enrichProductForClient);

//     const sameName = Object.values(products)
//       .filter((p) => p.name === product.name && p._id !== product._id)
//       .map(enrichProductForClient);

//     const sameFeatures = Object.values(products)
//       .filter((p) =>
//         p.description?.keyFeatures?.some((f) =>
//           product.description?.keyFeatures?.includes(f)
//         )
//       )
//       .filter((p) => p._id !== product._id)
//       .map(enrichProductForClient);

//     setRelatedGroups({
//       sameCategory,
//       samePrice,
//       sameName,
//       sameFeatures,
//     });
//   }, [product, products, user]);

//   const toggleLike = (productId) => {
//     if (!user) {
//       toast("Please login to like products", { icon: "🔒" });
//       navigate("/login");
//       return;
//     }
//     setActiveLikeId(productId);
//     contextToggleLike(productId);
//     setTimeout(() => setActiveLikeId(null), 300);
//   };

//   const addToCart = async () => {
//     if (!user) {
//       toast.error("Please login to add to cart");
//       navigate("/login");
//       return;
//     }
//     if (product.isSold) {
//       toast.error("This product is sold out");
//       return;
//     }
//     if (product.stock === 0) {
//       toast.error("This product is out of stock");
//       return;
//     }
//     setLoadingAdd(true);
//     try {
//       const res = await fetchWithAuth(
//         `${BACKEND_URL}/api/cart/add/${product._id}`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ quantity: 1 }),
//         }
//       );
//       const data = await res.json();
//       setLoadingAdd(false);
//       if (!res.ok) return toast.error(data.message);
//       toast.success("Added to cart! 🛒");
//       setCart(data);
//     } catch (err) {
//       setLoadingAdd(false);
//       toast.error("Server error");
//     }
//   };

//   const formatPrice = (price) => {
//     const priceNum = Number(price) || 0;
//     return new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//       minimumFractionDigits: 0,
//     }).format(priceNum);
//   };

//   const formatLikes = (num) => {
//     const likes = Number(num) || 0;
//     if (likes >= 1000000) return (likes / 1000000).toFixed(1) + "M";
//     if (likes >= 1000) return (likes / 1000).toFixed(1) + "k";
//     return likes.toString();
//   };

//   // Fixed description render
//   const renderDescription = (description) => {
//     if (!description) return null;

//     const descriptionTabs = [
//       {
//         id: "overview",
//         label: "Overview",
//         icon: <FaBookOpen />,
//       },
//       {
//         id: "features",
//         label: "Key Features",
//         icon: <FaCheckCircle />,
//       },
//       {
//         id: "benefits",
//         label: "Benefits",
//         icon: <FaLeaf />,
//       },
//       {
//         id: "ingredients",
//         label: "Ingredients",
//         icon: <FaFlask />,
//       },
//       {
//         id: "usage",
//         label: "How to Use",
//         icon: <FaClipboardList />,
//       },
//       {
//         id: "storage",
//         label: "Storage",
//         icon: <FaTemperatureLow />,
//       },
//     ];

//     const getTabContent = (tabId) => {
//       switch (tabId) {
//         case "overview":
//           return description.intro || "";
//         case "features":
//           return description.keyFeatures || [];
//         case "benefits":
//           return description.benefits || [];
//         case "ingredients":
//           return description.ingredients || "";
//         case "usage":
//           return description.howToUse || "";
//         case "storage":
//           return description.storage || "";
//         default:
//           return "";
//       }
//     };

//     const hasContentForTab = (tabId) => {
//       const content = getTabContent(tabId);
//       if (Array.isArray(content)) return content.length > 0;
//       return content && content.toString().trim() !== "";
//     };

//     const currentContent = getTabContent(activeDescriptionTab);
//     const tabsWithContent = descriptionTabs.filter((tab) =>
//       hasContentForTab(tab.id)
//     ).length;

//     if (tabsWithContent === 0) return null;

//     return (
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         viewport={{ once: true, margin: "-50px" }}
//         className="mt-8 md:mt-16"
//       >
//         {/* Responsive description tabs */}
//         <div className="flex overflow-x-auto pb-4 mb-6 md:mb-8 scrollbar-hide">
//           <div className="flex gap-2 min-w-max px-4 md:px-0">
//             {descriptionTabs.map((tab) => {
//               const hasContent = hasContentForTab(tab.id);
//               const isActive = activeDescriptionTab === tab.id;

//               if (!hasContent) return null;

//               return (
//                 <motion.button
//                   key={tab.id}
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={() => setActiveDescriptionTab(tab.id)}
//                   className={`px-4 py-2 md:px-6 md:py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 md:gap-3 flex-shrink-0 text-sm md:text-base ${
//                     isActive
//                       ? "bg-amber-600 text-white"
//                       : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
//                   }`}
//                 >
//                   <span className="text-sm md:text-base">{tab.icon}</span>
//                   <span className="whitespace-nowrap">{tab.label}</span>
//                 </motion.button>
//               );
//             })}
//           </div>
//         </div>

//         {/* Tab Content */}
//         <motion.div
//           key={activeDescriptionTab}
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//           className="bg-white dark:bg-gray-800 rounded-lg p-4 md:p-6"
//         >
//           {Array.isArray(currentContent) ? (
//             <div className="space-y-3 md:space-y-4">
//               {currentContent.map((item, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: index * 0.1 }}
//                   className="flex items-start gap-3 p-3 md:p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50"
//                 >
//                   <FaCheckCircle className="text-amber-600 dark:text-amber-400 mt-1 flex-shrink-0 text-sm md:text-base" />
//                   <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base">
//                     {item}
//                   </p>
//                 </motion.div>
//               ))}
//             </div>
//           ) : (
//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line text-sm md:text-base"
//             >
//               {currentContent}
//             </motion.p>
//           )}
//         </motion.div>
//       </motion.div>
//     );
//   };

//   const NextArrow = ({ onClick }) => (
//     <motion.button
//       whileHover={{ scale: 1.1 }}
//       whileTap={{ scale: 0.9 }}
//       onClick={onClick}
//       className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full bg-amber-500 dark:bg-amber-600 text-white flex items-center justify-center"
//       aria-label="Next image"
//     >
//       <FaChevronRight className="text-sm md:text-base" />
//     </motion.button>
//   );

//   const PrevArrow = ({ onClick }) => (
//     <motion.button
//       whileHover={{ scale: 1.1 }}
//       whileTap={{ scale: 0.9 }}
//       onClick={onClick}
//       className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full bg-amber-500 dark:bg-amber-600 text-white flex items-center justify-center"
//       aria-label="Previous image"
//     >
//       <FaChevronLeft className="text-sm md:text-base" />
//     </motion.button>
//   );

//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: false,
//     nextArrow: <NextArrow />,
//     prevArrow: <PrevArrow />,
//     afterChange: (current) => setSelectedImage(current),
//     customPaging: (i) => (
//       <div className="w-2 h-2 rounded-full bg-gray-400 hover:bg-amber-500 transition-all duration-300 cursor-pointer" />
//     ),
//     appendDots: (dots) => (
//       <ul className="flex justify-center gap-2 mt-4">{dots}</ul>
//     ),
//   };

//   const generateRating = (productId) => {
//     if (!productId || typeof productId !== "string") return 4.0;
//     const seed = productId.charCodeAt(productId.length - 1) || 0;
//     return 3.5 + ((seed % 10) / 10) * 1.5;
//   };

//   const toggleSection = (section) => {
//     setExpandedSections((prev) => ({
//       ...prev,
//       [section]: !prev[section],
//     }));
//   };

//   const InfiniteCarousel = ({ items, type }) => {
//     const carouselRef = useRef(null);

//     const scrollLeft = () => {
//       if (carouselRef.current) {
//         carouselRef.current.scrollBy({ left: -250, behavior: "smooth" });
//       }
//     };

//     const scrollRight = () => {
//       if (carouselRef.current) {
//         carouselRef.current.scrollBy({ left: 250, behavior: "smooth" });
//       }
//     };

//     if (items.length === 0) return null;

//     return (
//       <div className="relative px-2">
//         <motion.button
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//           onClick={scrollLeft}
//           className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center border border-gray-300 dark:border-gray-700 shadow-lg"
//           aria-label="Scroll left"
//         >
//           <FaChevronLeft className="text-gray-700 dark:text-gray-300 text-sm" />
//         </motion.button>

//         <motion.button
//           whileHover={{ scale: 1.1 }}
//           whileTap={{ scale: 0.9 }}
//           onClick={scrollRight}
//           className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center border border-gray-300 dark:border-gray-700 shadow-lg"
//           aria-label="Scroll right"
//         >
//           <FaChevronRight className="text-gray-700 dark:text-gray-300 text-sm" />
//         </motion.button>

//         <div
//           ref={carouselRef}
//           className="flex overflow-x-auto scrollbar-hide scroll-smooth px-4"
//           style={{
//             scrollbarWidth: "none",
//             msOverflowStyle: "none",
//           }}
//         >
//           <div className="flex gap-4 py-2 min-w-max">
//             {items.map((product, index) => (
//               <div
//                 key={`${product._id}-${index}`}
//                 className="flex-shrink-0 w-[280px] sm:w-[300px] md:w-64"
//               >
//                 <CategoryProductCard
//                   product={product}
//                   index={index}
//                   className="h-full"
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const renderRelatedSection = (title, products, type) => {
//     if (!products || products.length === 0) return null;
//     const isExpanded = expandedSections[type] || false;

//     return (
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         className="mb-6 md:mb-8"
//       >
//         <motion.button
//           onClick={() => toggleSection(type)}
//           className="flex items-center justify-between w-full mb-4 p-4 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
//           whileHover={{ scale: 1.01 }}
//           whileTap={{ scale: 0.99 }}
//         >
//           <div className="flex items-center gap-3">
//             <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
//               <FaStar className="text-amber-600 dark:text-amber-400 text-sm md:text-base" />
//             </div>
//             <div className="text-left">
//               <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-900 dark:text-white">
//                 {title}
//               </h3>
//               <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
//                 {products.length} product{products.length !== 1 ? "s" : ""}{" "}
//                 found
//               </p>
//             </div>
//           </div>
//           <motion.div
//             animate={{ rotate: isExpanded ? 180 : 0 }}
//             transition={{ duration: 0.3 }}
//           >
//             {isExpanded ? (
//               <FaChevronUp className="text-sm md:text-base" />
//             ) : (
//               <FaChevronDown className="text-sm md:text-base" />
//             )}
//           </motion.div>
//         </motion.button>

//         <AnimatePresence>
//           {isExpanded && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.4 }}
//               className="overflow-hidden"
//             >
//               <InfiniteCarousel items={products} type={type} />
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>
//     );
//   };

//   if (!product)
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
//         <div className="relative">
//           <div className="w-20 h-20 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
//         </div>
//       </div>
//     );

//   const rating = generateRating(product._id);
//   const stars = Math.round(rating);
//   const isOnSale =
//     product.originalPrice &&
//     Number(product.originalPrice) > Number(product.price);
//   const discountPercent = isOnSale
//     ? Math.round(
//         ((Number(product.originalPrice) - Number(product.price)) /
//           Number(product.originalPrice)) *
//           100
//       )
//     : 0;

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.8 }}
//       className="min-h-screen bg-white dark:bg-gray-900"
//     >
//       <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
//         {/* Back Button */}
//         <motion.button
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium transition-all duration-300 mb-6 md:mb-8 text-sm md:text-base"
//         >
//           <FaChevronLeft className="text-xs md:text-sm" />
//           Back to Products
//         </motion.button>

//         {/* Main Product Section - Responsive Grid */}
//         <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 mb-8 md:mb-12">
//           {/* Images Section */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{
//               duration: 0.8,
//               type: "spring",
//               stiffness: 100,
//             }}
//             className="space-y-4"
//           >
//             {/* Main Image */}
//             <motion.div
//               initial={{ rotate: 0 }}
//               animate={{ rotate: 360 }}
//               transition={{
//                 duration: 0.5,
//                 repeat: 1,
//                 ease: "easeInOut",
//               }}
//               onAnimationComplete={() => setImageLoaded(true)}
//               className="w-full relative rounded-xl overflow-hidden bg-transparent"
//             >
//               <Slider {...sliderSettings}>
//                 {product.images.map((img, idx) => (
//                   <div key={idx} className="w-full">
//                     <img
//                       src={img}
//                       alt={`${product.name} - Image ${idx + 1}`}
//                       className="w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] object-contain bg-transparent dark:bg-transparent"
//                       onError={(e) => {
//                         e.target.onerror = null;
//                         e.target.src =
//                           "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop";
//                       }}
//                     />
//                   </div>
//                 ))}
//               </Slider>
//             </motion.div>

//             {/* Thumbnail Images */}
//             <div className="flex gap-2 overflow-x-auto pb-2 px-1">
//               {product.images.map((img, idx) => (
//                 <motion.button
//                   key={idx}
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   animate={{ opacity: 1, scale: 1 }}
//                   transition={{ delay: 0.2 + idx * 0.1 }}
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => setSelectedImage(idx)}
//                   className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg border overflow-hidden transition-all duration-300 bg-transparent dark:bg-transparent ${
//                     selectedImage === idx
//                       ? "border-amber-500 ring-2 ring-amber-500/20"
//                       : "border-gray-200 dark:border-gray-700"
//                   }`}
//                 >
//                   <img
//                     src={img}
//                     alt={`Thumbnail ${idx + 1}`}
//                     className="w-full h-full object-cover bg-transparent dark:bg-transparent"
//                     onError={(e) => {
//                       e.target.onerror = null;
//                       e.target.src =
//                         "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop";
//                     }}
//                   />
//                 </motion.button>
//               ))}
//             </div>
//           </motion.div>

//           {/* Product Details */}
//           <motion.div
//             initial={{ opacity: 0, x: 30 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//             className="space-y-4 md:space-y-6"
//           >
//             {/* Product Header */}
//             <div>
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.3 }}
//                 className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 mb-4"
//               >
//                 <span className="text-xs md:text-sm font-medium text-amber-800 dark:text-amber-300">
//                   Premium Product
//                 </span>
//               </motion.div>

//               <motion.h1
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.4 }}
//                 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4"
//               >
//                 {product.name}
//               </motion.h1>

//               {/* Rating */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.5 }}
//                 className="flex items-center gap-3 mb-4 md:mb-6"
//               >
//                 <div className="flex items-center gap-1">
//                   {[...Array(5)].map((_, i) => (
//                     <FaStar
//                       key={i}
//                       className={`text-base md:text-lg ${
//                         i < stars
//                           ? "text-amber-500 fill-amber-500"
//                           : "text-gray-300 dark:text-gray-600"
//                       }`}
//                     />
//                   ))}
//                 </div>
//                 <span className="text-base md:text-lg font-medium text-gray-700 dark:text-gray-300">
//                   {rating.toFixed(1)}
//                 </span>
//               </motion.div>
//             </div>

//             {/* Price Section */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.6 }}
//               className="space-y-3 md:space-y-4"
//             >
//               <div className="flex items-baseline gap-3 md:gap-4">
//                 <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
//                   {formatPrice(product.price)}
//                 </span>
//                 {isOnSale && (
//                   <span className="text-lg md:text-xl text-gray-500 dark:text-gray-400 line-through">
//                     {formatPrice(product.originalPrice)}
//                   </span>
//                 )}
//               </div>

//               {isOnSale && (
//                 <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-amber-100 dark:bg-amber-900/30">
//                   <FaTag className="text-amber-600 dark:text-amber-400 text-sm" />
//                   <span className="font-medium text-amber-800 dark:text-amber-300 text-sm md:text-base">
//                     -{discountPercent}% OFF
//                   </span>
//                 </div>
//               )}

//               {/* Stock Status */}
//               <div
//                 className={`inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full ${
//                   product.isSold || product.stock === 0
//                     ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
//                     : "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
//                 }`}
//               >
//                 <div
//                   className={`w-2 h-2 rounded-full ${
//                     product.isSold || product.stock === 0
//                       ? "bg-red-500"
//                       : "bg-green-500"
//                   }`}
//                 />
//                 <span className="font-medium text-sm md:text-base">
//                   {product.isSold || product.stock === 0
//                     ? "Sold Out"
//                     : `${product.stock || 10} units available`}
//                 </span>
//               </div>
//             </motion.div>

//             {/* Key Features */}
//             {product.keyFeatures && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.7 }}
//                 className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 md:p-6"
//               >
//                 <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
//                   Key Features
//                 </h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
//                   {(Array.isArray(product.keyFeatures)
//                     ? product.keyFeatures
//                     : typeof product.keyFeatures === "string"
//                       ? product.keyFeatures
//                           .split(",")
//                           .map((f) => f.trim())
//                           .filter(Boolean)
//                       : []
//                   ).map((feature, idx) => (
//                     <div
//                       key={idx}
//                       className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg bg-white dark:bg-gray-700"
//                     >
//                       <FaCheckCircle className="text-amber-600 dark:text-amber-400 flex-shrink-0 text-sm md:text-base" />
//                       <span className="text-gray-700 dark:text-gray-300 text-sm md:text-base">
//                         {feature}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </motion.div>
//             )}

//             {/* Action Buttons */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.8 }}
//               className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 pt-3 md:pt-4"
//             >
//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={addToCart}
//                 disabled={loadingAdd || product.isSold || product.stock === 0}
//                 className={`w-full py-3 md:py-4 rounded-lg font-bold transition-all duration-300 text-sm md:text-base ${
//                   product.isSold || product.stock === 0
//                     ? "bg-red-500/80 text-white cursor-not-allowed"
//                     : "bg-amber-500 dark:bg-amber-600 hover:bg-amber-600 dark:hover:bg-amber-700 text-white"
//                 }`}
//               >
//                 {loadingAdd ? (
//                   <span className="flex items-center justify-center gap-2 md:gap-3">
//                     <div className="w-5 h-5 md:w-6 md:h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                     Adding...
//                   </span>
//                 ) : product.isSold || product.stock === 0 ? (
//                   "Sold Out"
//                 ) : (
//                   <>
//                     <FaShoppingCart className="inline mr-2 text-sm md:text-base" />
//                     Add to Cart
//                   </>
//                 )}
//               </motion.button>

//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => toggleLike(product._id)}
//                 className="w-full py-3 md:py-4 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold border border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center gap-2 md:gap-3 text-sm md:text-base"
//               >
//                 <motion.div
//                   animate={{
//                     scale:
//                       activeLikeId === product._id && product.isLiked
//                         ? [1, 1.3, 1]
//                         : 1,
//                   }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <FaHeart
//                     className={`text-base md:text-xl ${
//                       product.isLiked
//                         ? "text-red-500 fill-red-500"
//                         : "text-gray-400"
//                     }`}
//                   />
//                 </motion.div>
//                 <span>
//                   {product.isLiked ? "Liked" : "Like"} •{" "}
//                   {formatLikes(product.likesCount)}
//                 </span>
//               </motion.button>
//             </motion.div>

//             {/* Trust Badges */}
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.9 }}
//               className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 pt-3 md:pt-4"
//             >
//               <div className="flex items-center gap-2 md:gap-3 p-3 md:p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
//                 <FaTruck className="text-green-600 dark:text-green-400 text-base md:text-xl" />
//                 <div>
//                   <div className="font-semibold text-gray-900 dark:text-white text-sm md:text-base">
//                     Free Shipping
//                   </div>
//                   <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
//                     Over $100
//                   </div>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2 md:gap-3 p-3 md:p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
//                 <FaShieldAlt className="text-blue-600 dark:text-blue-400 text-base md:text-xl" />
//                 <div>
//                   <div className="font-semibold text-gray-900 dark:text-white text-sm md:text-base">
//                     Secure Payment
//                   </div>
//                   <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
//                     100% Protected
//                   </div>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2 md:gap-3 p-3 md:p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
//                 <FaUndo className="text-purple-600 dark:text-purple-400 text-base md:text-xl" />
//                 <div>
//                   <div className="font-semibold text-gray-900 dark:text-white text-sm md:text-base">
//                     Easy Returns
//                   </div>
//                   <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
//                     30-Day Policy
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </motion.div>
//         </div>

//         {/* Product Description */}
//         {product.description && renderDescription(product.description)}

//         {/* Related Products Sections */}
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true, margin: "-50px" }}
//           className="pt-8 md:pt-12 border-t border-gray-200 dark:border-gray-700"
//         >
//           <div className="mb-6 md:mb-8">
//             <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
//               Related Products
//             </h2>
//           </div>

//           {/* Categorized Related Products */}
//           {renderRelatedSection(
//             "Similar Products",
//             relatedGroups.sameCategory,
//             "sameCategory"
//           )}
//           {renderRelatedSection(
//             "Same Price Products",
//             relatedGroups.samePrice,
//             "samePrice"
//           )}
//           {renderRelatedSection(
//             "Similar Items",
//             relatedGroups.sameName,
//             "sameName"
//           )}
//           {renderRelatedSection(
//             "Products with Similar Features",
//             relatedGroups.sameFeatures,
//             "sameFeatures"
//           )}

//           {/* Empty Related Products State */}
//           {Object.values(relatedGroups).every(
//             (group) => !group || group.length === 0
//           ) && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="text-center py-8 md:py-12"
//             >
//               <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 mb-4">
//                 <FaShareAlt className="text-amber-600 dark:text-amber-400 text-lg md:text-xl" />
//               </div>
//               <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2">
//                 Explore More Products
//               </h3>
//               <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6 text-sm md:text-base">
//                 Check out our other collections for more amazing products.
//               </p>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => navigate("/products")}
//                 className="px-5 py-2.5 md:px-6 md:py-3 rounded-lg bg-amber-500 dark:bg-amber-600 text-white font-medium hover:bg-amber-600 dark:hover:bg-amber-700 transition-all duration-300 text-sm md:text-base"
//               >
//                 Browse All Products
//               </motion.button>
//             </motion.div>
//           )}
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

// export default ProductDetailPage;
import React, { useEffect, useState, useContext, useRef } from "react";
import { authContext } from "../Context/authContext";
import { cartContext } from "../Context/cartContext";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, stagger } from "framer-motion";
import toast from "react-hot-toast";
import {
  FaHeart,
  FaShoppingCart,
  FaTag,
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
  FaShareAlt,
  FaChevronUp,
  FaChevronDown,
  FaCheckCircle,
  FaLeaf,
  FaFlask,
  FaBookOpen,
  FaClipboardList,
  FaTemperatureLow,
} from "react-icons/fa";
import { useProducts } from "../Context/ProductContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchWithAuth } from "../utils/auth";
import CategoryProductCard from "./CategoryProductCard";

const BACKEND_URL = import.meta.env.VITE_API_URL;

// Helper function to get the proper image URL
const getImageUrl = (imagePath) => {
  if (!imagePath || typeof imagePath !== "string") {
    return "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop";
  }
  if (imagePath.startsWith("http")) {
    return imagePath;
  }
  let cleanPath = imagePath.replace(/\\/g, "/");
  if (!cleanPath.startsWith("/")) {
    cleanPath = "/" + cleanPath;
  }
  return `${BACKEND_URL}${cleanPath}`;
};

const ProductDetailPage = () => {
  const { id } = useParams();
  const { user } = useContext(authContext);
  const { setCart } = useContext(cartContext);
  const navigate = useNavigate();
  const { products, toggleLike: contextToggleLike } = useProducts();

  const [product, setProduct] = useState(null);
  const [relatedGroups, setRelatedGroups] = useState({
    sameCategory: [],
    samePrice: [],
    sameName: [],
    sameFeatures: [],
  });
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [activeLikeId, setActiveLikeId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [expandedSections, setExpandedSections] = useState({});
  const [activeDescriptionTab, setActiveDescriptionTab] = useState("overview");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [tabsVisible, setTabsVisible] = useState(false);

  const enrichProductForClient = (p) => {
    if (!p) return p;

    let images = [];
    if (Array.isArray(p.images) && p.images.length > 0) {
      images = p.images.map((img) => getImageUrl(img));
    } else if (p.image && typeof p.image === "string") {
      images = [getImageUrl(p.image)];
    } else {
      images = [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
      ];
    }

    const likesCount =
      typeof p.likesCount === "number"
        ? p.likesCount
        : Array.isArray(p.likes)
          ? p.likes.length
          : 0;
    const isLiked =
      !!user && Array.isArray(p.likes)
        ? p.likes.some((u) => String(u) === String(user._id))
        : false;
    return { ...p, images, likesCount, isLiked };
  };

  useEffect(() => {
    if (!id) return;
    const prod = products[id];
    if (!prod) return;

    const enrichedProduct = enrichProductForClient(prod);
    setProduct(enrichedProduct);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id, products, user]);

  useEffect(() => {
    if (!product) return;

    const sameCategory = Object.values(products)
      .filter(
        (p) =>
          p.category?._id === product.category?._id && p._id !== product._id
      )
      .map(enrichProductForClient);

    const samePrice = Object.values(products)
      .filter((p) => p.price === product.price && p._id !== product._id)
      .map(enrichProductForClient);

    const sameName = Object.values(products)
      .filter((p) => p.name === product.name && p._id !== product._id)
      .map(enrichProductForClient);

    const sameFeatures = Object.values(products)
      .filter((p) =>
        p.description?.keyFeatures?.some((f) =>
          product.description?.keyFeatures?.includes(f)
        )
      )
      .filter((p) => p._id !== product._id)
      .map(enrichProductForClient);

    setRelatedGroups({
      sameCategory,
      samePrice,
      sameName,
      sameFeatures,
    });
  }, [product, products, user]);

  useEffect(() => {
    // Trigger tabs animation when component mounts
    const timer = setTimeout(() => {
      setTabsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const toggleLike = (productId) => {
    if (!user) {
      toast("Please login to like products", { icon: "🔒" });
      navigate("/login");
      return;
    }
    setActiveLikeId(productId);
    contextToggleLike(productId);
    setTimeout(() => setActiveLikeId(null), 300);
  };

  const addToCart = async () => {
    if (!user) {
      toast.error("Please login to add to cart");
      navigate("/login");
      return;
    }
    if (product.isSold) {
      toast.error("This product is sold out");
      return;
    }
    if (product.stock === 0) {
      toast.error("This product is out of stock");
      return;
    }
    setLoadingAdd(true);
    try {
      const res = await fetchWithAuth(
        `${BACKEND_URL}/api/cart/add/${product._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: 1 }),
        }
      );
      const data = await res.json();
      setLoadingAdd(false);
      if (!res.ok) return toast.error(data.message);
      toast.success("Added to cart! 🛒");
      setCart(data);
    } catch (err) {
      setLoadingAdd(false);
      toast.error("Server error");
    }
  };

  const formatPrice = (price) => {
    const priceNum = Number(price) || 0;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(priceNum);
  };

  const formatLikes = (num) => {
    const likes = Number(num) || 0;
    if (likes >= 1000000) return (likes / 1000000).toFixed(1) + "M";
    if (likes >= 1000) return (likes / 1000).toFixed(1) + "k";
    return likes.toString();
  };

  // Fixed description render with pyramid style tabs
  const renderDescription = (description) => {
    if (!description) return null;

    const descriptionTabs = [
      {
        id: "overview",
        label: "Overview",
        icon: <FaBookOpen />,
        delay: 0.1,
      },
      {
        id: "features",
        label: "Key Features",
        icon: <FaCheckCircle />,
        delay: 0.2,
      },
      {
        id: "benefits",
        label: "Benefits",
        icon: <FaLeaf />,
        delay: 0.3,
      },
      {
        id: "ingredients",
        label: "Ingredients",
        icon: <FaFlask />,
        delay: 0.4,
      },
      {
        id: "usage",
        label: "How to Use",
        icon: <FaClipboardList />,
        delay: 0.5,
      },
      {
        id: "storage",
        label: "Storage",
        icon: <FaTemperatureLow />,
        delay: 0.6,
      },
    ];

    const getTabContent = (tabId) => {
      switch (tabId) {
        case "overview":
          return description.intro || "";
        case "features":
          return description.keyFeatures || [];
        case "benefits":
          return description.benefits || [];
        case "ingredients":
          return description.ingredients || "";
        case "usage":
          return description.howToUse || "";
        case "storage":
          return description.storage || "";
        default:
          return "";
      }
    };

    const hasContentForTab = (tabId) => {
      const content = getTabContent(tabId);
      if (Array.isArray(content)) return content.length > 0;
      return content && content.toString().trim() !== "";
    };

    const currentContent = getTabContent(activeDescriptionTab);
    const tabsWithContent = descriptionTabs.filter((tab) =>
      hasContentForTab(tab.id)
    ).length;

    if (tabsWithContent === 0) return null;

    // Filter tabs that have content
    const availableTabs = descriptionTabs.filter((tab) =>
      hasContentForTab(tab.id)
    );

    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-50px" }}
        className="mt-8 md:mt-16"
      >
        {/* Pyramid Style Description Tabs */}
        <div className="mb-6 md:mb-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
          >
            {availableTabs.map((tab, index) => {
              const isActive = activeDescriptionTab === tab.id;

              return (
                <motion.button
                  key={tab.id}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={
                    tabsVisible
                      ? { opacity: 1, scale: 1, y: 0 }
                      : { opacity: 0, scale: 0.8, y: 20 }
                  }
                  transition={{
                    delay: tab.delay,
                    duration: 0.4,
                    ease: "easeOut",
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveDescriptionTab(tab.id)}
                  className={`relative px-4 py-4 md:py-5 rounded-xl font-medium transition-all duration-300 flex flex-col items-center justify-center gap-2 h-full min-h-[80px] ${
                    isActive
                      ? "bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  <span className="text-xl md:text-2xl">{tab.icon}</span>
                  <span className="text-xs md:text-sm font-medium text-center leading-tight">
                    {tab.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-amber-500 rotate-45"
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        </div>

        {/* Tab Content with staggered animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDescriptionTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 md:p-6 shadow-sm"
          >
            {Array.isArray(currentContent) ? (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                    },
                  },
                }}
                className="space-y-3 md:space-y-4"
              >
                {currentContent.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, x: -10 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-3 md:p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50"
                  >
                    <FaCheckCircle className="text-amber-600 dark:text-amber-400 mt-1 flex-shrink-0 text-sm md:text-base" />
                    <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base">
                      {item}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                {currentContent
                  .split("\n")
                  .filter((para) => para.trim())
                  .map((paragraph, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * idx }}
                      className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm md:text-base"
                    >
                      {paragraph}
                    </motion.p>
                  ))}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    );
  };

  const NextArrow = ({ onClick }) => (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full bg-amber-500 dark:bg-amber-600 text-white flex items-center justify-center"
      aria-label="Next image"
    >
      <FaChevronRight className="text-sm md:text-base" />
    </motion.button>
  );

  const PrevArrow = ({ onClick }) => (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 rounded-full bg-amber-500 dark:bg-amber-600 text-white flex items-center justify-center"
      aria-label="Previous image"
    >
      <FaChevronLeft className="text-sm md:text-base" />
    </motion.button>
  );

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    afterChange: (current) => setSelectedImage(current),
    customPaging: (i) => (
      <div className="w-2 h-2 rounded-full bg-gray-400 hover:bg-amber-500 transition-all duration-300 cursor-pointer" />
    ),
    appendDots: (dots) => (
      <ul className="flex justify-center gap-2 mt-4">{dots}</ul>
    ),
  };

  const generateRating = (productId) => {
    if (!productId || typeof productId !== "string") return 4.0;
    const seed = productId.charCodeAt(productId.length - 1) || 0;
    return 3.5 + ((seed % 10) / 10) * 1.5;
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const InfiniteCarousel = ({ items, type }) => {
    const carouselRef = useRef(null);

    const scrollLeft = () => {
      if (carouselRef.current) {
        carouselRef.current.scrollBy({ left: -250, behavior: "smooth" });
      }
    };

    const scrollRight = () => {
      if (carouselRef.current) {
        carouselRef.current.scrollBy({ left: 250, behavior: "smooth" });
      }
    };

    if (items.length === 0) return null;

    return (
      <div className="relative px-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center border border-gray-300 dark:border-gray-700 shadow-lg"
          aria-label="Scroll left"
        >
          <FaChevronLeft className="text-gray-700 dark:text-gray-300 text-sm" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center border border-gray-300 dark:border-gray-700 shadow-lg"
          aria-label="Scroll right"
        >
          <FaChevronRight className="text-gray-700 dark:text-gray-300 text-sm" />
        </motion.button>

        <div
          ref={carouselRef}
          className="flex overflow-x-auto scrollbar-hide scroll-smooth px-4"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <div className="flex gap-4 py-2 min-w-max">
            {items.map((product, index) => (
              <motion.div
                key={`${product._id}-${index}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex-shrink-0 w-[280px] sm:w-[300px] md:w-64"
              >
                <CategoryProductCard
                  product={product}
                  index={index}
                  className="h-full"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderRelatedSection = (title, products, type) => {
    if (!products || products.length === 0) return null;
    const isExpanded = expandedSections[type] || false;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-6 md:mb-8"
      >
        <motion.button
          onClick={() => toggleSection(type)}
          className="flex items-center justify-between w-full mb-4 p-4 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
              <FaStar className="text-amber-600 dark:text-amber-400 text-sm md:text-base" />
            </div>
            <div className="text-left">
              <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-900 dark:text-white">
                {title}
              </h3>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                {products.length} product{products.length !== 1 ? "s" : ""}{" "}
                found
              </p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isExpanded ? (
              <FaChevronUp className="text-sm md:text-base" />
            ) : (
              <FaChevronDown className="text-sm md:text-base" />
            )}
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              <InfiniteCarousel items={products} type={type} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 ">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
        </div>
      </div>
    );

  const rating = generateRating(product._id);
  const stars = Math.round(rating);
  const isOnSale =
    product.originalPrice &&
    Number(product.originalPrice) > Number(product.price);
  const discountPercent = isOnSale
    ? Math.round(
        ((Number(product.originalPrice) - Number(product.price)) /
          Number(product.originalPrice)) *
          100
      )
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-white dark:bg-gray-900 max-sm:py-24 py-16"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-12">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium transition-all duration-300 mb-6 md:mb-8 text-sm md:text-base"
        >
          <FaChevronLeft className="text-xs md:text-sm" />
          Back to Products
        </motion.button>

        {/* Main Product Section - Responsive Grid */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 mb-8 md:mb-12">
          {/* Images Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 100,
            }}
            className="space-y-4"
          >
            {/* Main Image */}
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 0.5,
                repeat: 1,
                ease: "easeInOut",
              }}
              onAnimationComplete={() => setImageLoaded(true)}
              className="w-full relative rounded-xl overflow-hidden bg-transparent"
            >
              <Slider {...sliderSettings}>
                {product.images.map((img, idx) => (
                  <div key={idx} className="w-full">
                    <img
                      src={img}
                      alt={`${product.name} - Image ${idx + 1}`}
                      className="w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] object-contain bg-transparent dark:bg-transparent"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop";
                      }}
                    />
                  </div>
                ))}
              </Slider>
            </motion.div>

            {/* Thumbnail Images with staggered animation */}
            <div className="flex gap-2 overflow-x-auto pb-2 px-1">
              {product.images.map((img, idx) => (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImage(idx)}
                  className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg border overflow-hidden transition-all duration-300 bg-transparent dark:bg-transparent ${
                    selectedImage === idx
                      ? "border-amber-500 ring-2 ring-amber-500/20"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover bg-transparent dark:bg-transparent"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop";
                    }}
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Product Details with staggered animation */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4 md:space-y-6"
          >
            {/* Product Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 mb-4"
              >
                <span className="text-xs md:text-sm font-medium text-amber-800 dark:text-amber-300">
                  Premium Product
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4"
              >
                {product.name}
              </motion.h1>

              {/* Rating */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-3 mb-4 md:mb-6"
              >
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                    >
                      <FaStar
                        className={`text-base md:text-lg ${
                          i < stars
                            ? "text-amber-500 fill-amber-500"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    </motion.div>
                  ))}
                </div>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="text-base md:text-lg font-medium text-gray-700 dark:text-gray-300"
                >
                  {rating.toFixed(1)}
                </motion.span>
              </motion.div>
            </motion.div>

            {/* Price Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="space-y-3 md:space-y-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 }}
                className="flex items-baseline gap-3 md:gap-4"
              >
                <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
                  {formatPrice(product.price)}
                </span>
                {isOnSale && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-lg md:text-xl text-gray-500 dark:text-gray-400 line-through"
                  >
                    {formatPrice(product.originalPrice)}
                  </motion.span>
                )}
              </motion.div>

              {isOnSale && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-amber-100 dark:bg-amber-900/30"
                >
                  <FaTag className="text-amber-600 dark:text-amber-400 text-sm" />
                  <span className="font-medium text-amber-800 dark:text-amber-300 text-sm md:text-base">
                    -{discountPercent}% OFF
                  </span>
                </motion.div>
              )}

              {/* Stock Status */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className={`inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full ${
                  product.isSold || product.stock === 0
                    ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300"
                    : "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    product.isSold || product.stock === 0
                      ? "bg-red-500"
                      : "bg-green-500"
                  }`}
                />
                <span className="font-medium text-sm md:text-base">
                  {product.isSold || product.stock === 0
                    ? "Sold Out"
                    : `${product.stock || 10} units available`}
                </span>
              </motion.div>
            </motion.div>

            {/* Key Features */}
            {product.keyFeatures && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 md:p-6"
              >
                <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4">
                  Key Features
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
                  {(Array.isArray(product.keyFeatures)
                    ? product.keyFeatures
                    : typeof product.keyFeatures === "string"
                      ? product.keyFeatures
                          .split(",")
                          .map((f) => f.trim())
                          .filter(Boolean)
                      : []
                  ).map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.4 + idx * 0.1 }}
                      className="flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg bg-white dark:bg-gray-700"
                    >
                      <FaCheckCircle className="text-amber-600 dark:text-amber-400 flex-shrink-0 text-sm md:text-base" />
                      <span className="text-gray-700 dark:text-gray-300 text-sm md:text-base">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 pt-3 md:pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={addToCart}
                disabled={loadingAdd || product.isSold || product.stock === 0}
                className={`w-full py-3 md:py-4 rounded-lg font-bold transition-all duration-300 text-sm md:text-base ${
                  product.isSold || product.stock === 0
                    ? "bg-red-500/80 text-white cursor-not-allowed"
                    : "bg-amber-500 dark:bg-amber-600 hover:bg-amber-600 dark:hover:bg-amber-700 text-white"
                }`}
              >
                {loadingAdd ? (
                  <span className="flex items-center justify-center gap-2 md:gap-3">
                    <div className="w-5 h-5 md:w-6 md:h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Adding...
                  </span>
                ) : product.isSold || product.stock === 0 ? (
                  "Sold Out"
                ) : (
                  <>
                    <FaShoppingCart className="inline mr-2 text-sm md:text-base" />
                    Add to Cart
                  </>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleLike(product._id)}
                className="w-full py-3 md:py-4 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold border border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center gap-2 md:gap-3 text-sm md:text-base"
              >
                <motion.div
                  animate={{
                    scale:
                      activeLikeId === product._id && product.isLiked
                        ? [1, 1.3, 1]
                        : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <FaHeart
                    className={`text-base md:text-xl ${
                      product.isLiked
                        ? "text-red-500 fill-red-500"
                        : "text-gray-400"
                    }`}
                  />
                </motion.div>
                <span>
                  {product.isLiked ? "Liked" : "Like"} •{" "}
                  {formatLikes(product.likesCount)}
                </span>
              </motion.button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 pt-3 md:pt-4"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.7 }}
                className="flex items-center gap-2 md:gap-3 p-3 md:p-4 rounded-lg bg-gray-100 dark:bg-gray-800"
              >
                <FaTruck className="text-green-600 dark:text-green-400 text-base md:text-xl" />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white text-sm md:text-base">
                    Free Shipping
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    Over $100
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 }}
                className="flex items-center gap-2 md:gap-3 p-3 md:p-4 rounded-lg bg-gray-100 dark:bg-gray-800"
              >
                <FaShieldAlt className="text-blue-600 dark:text-blue-400 text-base md:text-xl" />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white text-sm md:text-base">
                    Secure Payment
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    100% Protected
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.9 }}
                className="flex items-center gap-2 md:gap-3 p-3 md:p-4 rounded-lg bg-gray-100 dark:bg-gray-800"
              >
                <FaUndo className="text-purple-600 dark:text-purple-400 text-base md:text-xl" />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white text-sm md:text-base">
                    Easy Returns
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    30-Day Policy
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Product Description */}
        {product.description && renderDescription(product.description)}

        {/* Related Products Sections */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-50px" }}
          className="pt-8 md:pt-12 border-t border-gray-200 dark:border-gray-700"
        >
          <div className="mb-6 md:mb-8">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
              Related Products
            </h2>
          </div>

          {/* Categorized Related Products */}
          {renderRelatedSection(
            "Similar Products",
            relatedGroups.sameCategory,
            "sameCategory"
          )}
          {renderRelatedSection(
            "Same Price Products",
            relatedGroups.samePrice,
            "samePrice"
          )}
          {renderRelatedSection(
            "Similar Items",
            relatedGroups.sameName,
            "sameName"
          )}
          {renderRelatedSection(
            "Products with Similar Features",
            relatedGroups.sameFeatures,
            "sameFeatures"
          )}

          {/* Empty Related Products State */}
          {Object.values(relatedGroups).every(
            (group) => !group || group.length === 0
          ) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-8 md:py-12"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 mb-4">
                <FaShareAlt className="text-amber-600 dark:text-amber-400 text-lg md:text-xl" />
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-2">
                Explore More Products
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6 text-sm md:text-base">
                Check out our other collections for more amazing products.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/products")}
                className="px-5 py-2.5 md:px-6 md:p-3 rounded-lg bg-amber-500 dark:bg-amber-600 text-white font-medium hover:bg-amber-600 dark:hover:bg-amber-700 transition-all duration-300 text-sm md:text-base"
              >
                Browse All Products
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductDetailPage;
