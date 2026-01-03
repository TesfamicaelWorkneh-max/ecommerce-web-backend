// // // // import { Link } from "react-router-dom";
// // // // import { motion } from "framer-motion";
// // // // import { FaHeart, FaStar, FaTag, FaShoppingCart } from "react-icons/fa";
// // // // import { useProducts } from "../Context/ProductContext";
// // // // import { getImageUrl } from "../utils/imageUtils";

// // // // const formatLikes = (num) => {
// // // //   const likes = Number(num) || 0;
// // // //   if (likes >= 1000000) return (likes / 1000000).toFixed(1) + "M";
// // // //   if (likes >= 1000) return (likes / 1000).toFixed(1) + "k";
// // // //   return likes.toString();
// // // // };

// // // // const formatPrice = (price) => {
// // // //   const priceNum = Number(price) || 0;
// // // //   return new Intl.NumberFormat("en-US", {
// // // //     style: "currency",
// // // //     currency: "USD",
// // // //     minimumFractionDigits: 0,
// // // //   }).format(priceNum);
// // // // };

// // // // const generateRating = (productId) => {
// // // //   if (!productId || typeof productId !== "string") return 4.0;
// // // //   const seed = productId.charCodeAt(productId.length - 1) || 0;
// // // //   return 3.5 + ((seed % 10) / 10) * 1.5;
// // // // };

// // // // const CategoryProductCard = ({ product, index = 0 }) => {
// // // //   const { toggleLike, products } = useProducts();
// // // //   const prod = products[product._id] || product;

// // // //   if (!prod || typeof prod !== "object") {
// // // //     return null;
// // // //   }

// // // //   // ✅ Use getImageUrl instead of manual URL construction
// // // //   const imagePath = prod.images?.[0] || prod.image;
// // // //   const imgSrc = getImageUrl(imagePath, {
// // // //     width: 400,
// // // //     height: 400,
// // // //     crop: "fill",
// // // //   });

// // // //   const rating = generateRating(prod._id);
// // // //   const stars = Math.round(rating);

// // // //   const isOnSale =
// // // //     prod.originalPrice && Number(prod.originalPrice) > Number(prod.price);
// // // //   const discountPercent = isOnSale
// // // //     ? Math.round(
// // // //         ((Number(prod.originalPrice) - Number(prod.price)) /
// // // //           Number(prod.originalPrice)) *
// // // //           100
// // // //       )
// // // //     : 0;

// // // //   return (
// // // //     <motion.div
// // // //       className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-slate-700 hover:border-amber-200 dark:hover:border-amber-700"
// // // //       initial={{ opacity: 0, y: 30, scale: 0.95 }}
// // // //       whileInView={{ opacity: 1, y: 0, scale: 1 }}
// // // //       viewport={{ once: true, amount: 0.2 }}
// // // //       transition={{ duration: 0.6, delay: index * 0.05, type: "spring" }}
// // // //       whileHover={{
// // // //         y: -6,
// // // //         transition: { duration: 0.3 },
// // // //       }}
// // // //     >
// // // //       {/* Discount Badge */}
// // // //       {isOnSale && (
// // // //         <motion.div
// // // //           initial={{ scale: 0, rotate: -45 }}
// // // //           animate={{ scale: 1, rotate: 0 }}
// // // //           transition={{ delay: index * 0.05 + 0.3 }}
// // // //           className="absolute top-4 left-4 z-20"
// // // //         >
// // // //           <div className="relative">
// // // //             <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
// // // //             <div className="relative px-3 py-1.5 bg-gradient-to-r from-red-600 to-pink-600 text-white text-xs font-bold rounded-lg flex items-center gap-1 shadow-lg">
// // // //               <FaTag className="text-xs" />
// // // //               <span>-{discountPercent}%</span>
// // // //             </div>
// // // //           </div>
// // // //         </motion.div>
// // // //       )}

// // // //       {/* Like Button */}
// // // //       <motion.button
// // // //         onClick={() => toggleLike(prod._id)}
// // // //         className="absolute top-4 right-4 z-20 p-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 group/like"
// // // //         whileHover={{ scale: 1.1 }}
// // // //         whileTap={{ scale: 0.9 }}
// // // //         initial={{ opacity: 0, x: 20 }}
// // // //         animate={{ opacity: 1, x: 0 }}
// // // //         transition={{ delay: index * 0.05 + 0.2 }}
// // // //       >
// // // //         <div className="relative">
// // // //           <FaHeart
// // // //             className={`text-xl transition-all duration-300 ${
// // // //               prod.isLiked
// // // //                 ? "text-red-500 fill-red-500 drop-shadow-lg"
// // // //                 : "text-gray-400 group-hover/like:text-red-300"
// // // //             }`}
// // // //           />
// // // //           {prod.isLiked && (
// // // //             <motion.div
// // // //               className="absolute inset-0 rounded-full bg-red-500/20"
// // // //               initial={{ scale: 0.8, opacity: 0.8 }}
// // // //               animate={{ scale: 1.5, opacity: 0 }}
// // // //               transition={{
// // // //                 duration: 1.5,
// // // //                 repeat: Infinity,
// // // //                 repeatType: "loop",
// // // //               }}
// // // //             />
// // // //           )}
// // // //         </div>
// // // //       </motion.button>

// // // //       {/* Product Image */}
// // // //       <div className="relative overflow-hidden">
// // // //         <Link to={`/product/${prod._id}`} className="block">
// // // //           <motion.img
// // // //             src={imgSrc}
// // // //             alt={typeof prod.name === "string" ? prod.name : "Product"}
// // // //             className="w-full h-64 object-contain p-6 transition-transform duration-500 group-hover:scale-105"
// // // //             loading="lazy"
// // // //             onError={(e) => {
// // // //               e.target.src = getImageUrl(null); // Use fallback from imageUtils
// // // //               e.target.className =
// // // //                 "w-full h-64 object-cover p-6 transition-transform duration-500 group-hover:scale-105";
// // // //             }}
// // // //             whileHover={{ scale: 1.05 }}
// // // //             transition={{ duration: 0.5 }}
// // // //           />
// // // //         </Link>

// // // //         {/* SOLD / AVAILABLE Badge */}
// // // //         <div className="absolute bottom-4 left-4">
// // // //           <motion.div
// // // //             initial={{ opacity: 0, y: 10 }}
// // // //             animate={{ opacity: 1, y: 0 }}
// // // //             transition={{ delay: index * 0.05 + 0.4 }}
// // // //             className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm border ${
// // // //               prod.isSold
// // // //                 ? "bg-gradient-to-r from-red-500/90 to-red-600/90 text-white border-red-400/30"
// // // //                 : "bg-gradient-to-r from-green-500/90 to-emerald-600/90 text-white border-green-400/30"
// // // //             }`}
// // // //           >
// // // //             {prod.isSold ? "Sold Out" : "In Stock"}
// // // //           </motion.div>
// // // //         </div>
// // // //       </div>

// // // //       {/* Product Info */}
// // // //       <div className="p-5">
// // // //         <Link to={`/product/${prod._id}`}>
// // // //           <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 line-clamp-2 min-h-[3.5rem] group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300">
// // // //             {typeof prod.name === "string" ? prod.name : "Unnamed Product"}
// // // //           </h3>
// // // //         </Link>

// // // //         {/* Rating */}
// // // //         <div className="flex items-center gap-2 mb-3">
// // // //           <div className="flex items-center gap-0.5">
// // // //             {[...Array(5)].map((_, i) => (
// // // //               <FaStar
// // // //                 key={i}
// // // //                 className={`text-sm ${
// // // //                   i < stars
// // // //                     ? "text-amber-500 fill-amber-500 drop-shadow-sm"
// // // //                     : "text-gray-300 dark:text-slate-600"
// // // //                 }`}
// // // //               />
// // // //             ))}
// // // //           </div>
// // // //           <span className="text-sm font-medium text-gray-700 dark:text-slate-300">
// // // //             {rating.toFixed(1)}
// // // //           </span>
// // // //         </div>

// // // //         {/* Price and Likes */}
// // // //         <div className="flex items-center justify-between">
// // // //           <div className="flex items-baseline gap-2">
// // // //             <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-800 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
// // // //               {formatPrice(prod.price)}
// // // //             </span>
// // // //             {isOnSale && (
// // // //               <span className="text-sm text-gray-500 dark:text-slate-500 line-through">
// // // //                 {formatPrice(prod.originalPrice)}
// // // //               </span>
// // // //             )}
// // // //           </div>

// // // //           <motion.div
// // // //             className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-full border border-rose-200 dark:border-rose-800/30 hover:border-rose-300 dark:hover:border-rose-700 transition-colors duration-300"
// // // //             whileHover={{ scale: 1.05 }}
// // // //             whileTap={{ scale: 0.95 }}
// // // //           >
// // // //             <FaHeart
// // // //               className={`text-sm ${prod.isLiked ? "text-rose-500 fill-rose-500" : "text-rose-400"}`}
// // // //             />
// // // //             <span className="text-sm font-medium text-rose-700 dark:text-rose-300">
// // // //               {formatLikes(prod.likesCount)}
// // // //             </span>
// // // //           </motion.div>
// // // //         </div>

// // // //         {/* Quick Add to Cart */}
// // // //         <motion.button
// // // //           className="w-full mt-4 py-2.5 bg-gradient-to-r from-amber-500/10 to-amber-600/10 hover:from-amber-500/20 hover:to-amber-600/20 text-amber-700 dark:text-amber-300 rounded-xl font-semibold flex items-center justify-center gap-2 border border-amber-500/30 hover:border-amber-500/50 transition-all duration-300 group/btn"
// // // //           whileHover={{ scale: 1.02 }}
// // // //           whileTap={{ scale: 0.98 }}
// // // //           onClick={(e) => {
// // // //             e.preventDefault();
// // // //             window.location.href = `/product/${prod._id}`;
// // // //           }}
// // // //         >
// // // //           <FaShoppingCart className="group-hover/btn:scale-110 transition-transform duration-300" />
// // // //           <span>Quick Add</span>
// // // //         </motion.button>
// // // //       </div>

// // // //       {/* Glow Effect */}
// // // //       <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
// // // //     </motion.div>
// // // //   );
// // // // };

// // // // export default CategoryProductCard;
// // // import { Link } from "react-router-dom";
// // // import { motion } from "framer-motion";
// // // import { FaHeart, FaStar, FaTag, FaShoppingCart } from "react-icons/fa";
// // // import { useProducts } from "../Context/ProductContext";
// // // import { getImageUrl } from "../utils/imageUtils";

// // // const formatLikes = (num) => {
// // //   const likes = Number(num) || 0;
// // //   if (likes >= 1000000) return (likes / 1000000).toFixed(1) + "M";
// // //   if (likes >= 1000) return (likes / 1000).toFixed(1) + "k";
// // //   return likes.toString();
// // // };

// // // const formatPrice = (price) => {
// // //   const priceNum = Number(price) || 0;
// // //   return new Intl.NumberFormat("en-US", {
// // //     style: "currency",
// // //     currency: "USD",
// // //     minimumFractionDigits: 0,
// // //   }).format(priceNum);
// // // };

// // // const generateRating = (productId) => {
// // //   if (!productId || typeof productId !== "string") return 4.0;
// // //   const seed = productId.charCodeAt(productId.length - 1) || 0;
// // //   return 3.5 + ((seed % 10) / 10) * 1.5;
// // // };

// // // const CategoryProductCard = ({ product, index = 0 }) => {
// // //   const { toggleLike, products } = useProducts();
// // //   const prod = products[product._id] || product;

// // //   if (!prod || typeof prod !== "object") {
// // //     return null;
// // //   }

// // //   const imagePath = prod.images?.[0] || prod.image;
// // //   const imgSrc = getImageUrl(imagePath, {
// // //     width: 400,
// // //     height: 400,
// // //     crop: "fill",
// // //   });

// // //   const rating = generateRating(prod._id);
// // //   const stars = Math.round(rating);

// // //   const isOnSale =
// // //     prod.originalPrice && Number(prod.originalPrice) > Number(prod.price);
// // //   const discountPercent = isOnSale
// // //     ? Math.round(
// // //         ((Number(prod.originalPrice) - Number(prod.price)) /
// // //           Number(prod.originalPrice)) *
// // //           100
// // //       )
// // //     : 0;

// // //   return (
// // //     <motion.div
// // //       className="group relative bg-white dark:bg-transparent rounded-lg overflow-hidden"
// // //       initial={{ opacity: 0, y: 30, scale: 0.95 }}
// // //       whileInView={{ opacity: 1, y: 0, scale: 1 }}
// // //       viewport={{ once: true, amount: 0.2 }}
// // //       transition={{ duration: 0.6, delay: index * 0.05, type: "spring" }}
// // //       whileHover={{
// // //         y: -4,
// // //         transition: { duration: 0.3 },
// // //       }}
// // //     >
// // //       {/* Discount Badge */}
// // //       {isOnSale && (
// // //         <motion.div
// // //           initial={{ scale: 0, rotate: -45 }}
// // //           animate={{ scale: 1, rotate: 0 }}
// // //           transition={{ delay: index * 0.05 + 0.3 }}
// // //           className="absolute top-4 left-4 z-20"
// // //         >
// // //           <div className="px-3 py-1.5 bg-amber-600 dark:bg-amber-700 text-white text-xs font-bold rounded-lg flex items-center gap-1">
// // //             <FaTag className="text-xs" />
// // //             <span>-{discountPercent}%</span>
// // //           </div>
// // //         </motion.div>
// // //       )}

// // //       {/* Like Button */}
// // //       <motion.button
// // //         onClick={() => toggleLike(prod._id)}
// // //         className="absolute top-4 right-4 z-20 p-2 bg-white dark:bg-gray-800 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
// // //         whileHover={{ scale: 1.1 }}
// // //         whileTap={{ scale: 0.9 }}
// // //         initial={{ opacity: 0, x: 20 }}
// // //         animate={{ opacity: 1, x: 0 }}
// // //         transition={{ delay: index * 0.05 + 0.2 }}
// // //       >
// // //         <div className="relative">
// // //           <FaHeart
// // //             className={`text-xl transition-all duration-300 ${
// // //               prod.isLiked
// // //                 ? "text-red-500 fill-red-500"
// // //                 : "text-gray-400 hover:text-red-400"
// // //             }`}
// // //           />
// // //           {prod.isLiked && (
// // //             <motion.div
// // //               className="absolute inset-0 rounded-full bg-red-500/20"
// // //               initial={{ scale: 0.8, opacity: 0.8 }}
// // //               animate={{ scale: 1.5, opacity: 0 }}
// // //               transition={{
// // //                 duration: 1.5,
// // //                 repeat: Infinity,
// // //                 repeatType: "loop",
// // //               }}
// // //             />
// // //           )}
// // //         </div>
// // //       </motion.button>

// // //       {/* Product Image */}
// // //       <div className="relative overflow-hidden">
// // //         <Link to={`/product/${prod._id}`} className="block">
// // //           <motion.img
// // //             src={imgSrc}
// // //             alt={typeof prod.name === "string" ? prod.name : "Product"}
// // //             className="w-full h-64 lg:h-72 object-contain p-6 transition-transform duration-300 group-hover:scale-105"
// // //             loading="lazy"
// // //             onError={(e) => {
// // //               e.target.src = getImageUrl(null);
// // //               e.target.className =
// // //                 "w-full h-64 lg:h-72 object-cover p-6 transition-transform duration-300 group-hover:scale-105";
// // //             }}
// // //             whileHover={{ scale: 1.05 }}
// // //             transition={{ duration: 0.3 }}
// // //           />
// // //         </Link>
// // //       </div>

// // //       {/* Product Info */}
// // //       <div className="p-5">
// // //         <Link to={`/product/${prod._id}`}>
// // //           <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 min-h-[3rem] group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300">
// // //             {typeof prod.name === "string" ? prod.name : "Unnamed Product"}
// // //           </h3>
// // //         </Link>

// // //         {/* Rating */}
// // //         <div className="flex items-center gap-2 mb-3">
// // //           <div className="flex items-center gap-0.5">
// // //             {[...Array(5)].map((_, i) => (
// // //               <FaStar
// // //                 key={i}
// // //                 className={`text-sm ${
// // //                   i < stars
// // //                     ? "text-amber-500 fill-amber-500"
// // //                     : "text-gray-300 dark:text-gray-600"
// // //                 }`}
// // //               />
// // //             ))}
// // //           </div>
// // //           <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
// // //             {rating.toFixed(1)}
// // //           </span>
// // //         </div>

// // //         {/* Price and Likes */}
// // //         <div className="flex items-center justify-between">
// // //           <div className="flex items-baseline gap-2">
// // //             <span className="text-xl font-bold text-gray-900 dark:text-white">
// // //               {formatPrice(prod.price)}
// // //             </span>
// // //             {isOnSale && (
// // //               <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
// // //                 {formatPrice(prod.originalPrice)}
// // //               </span>
// // //             )}
// // //           </div>

// // //           <div className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-100 dark:bg-rose-900/20 rounded-full">
// // //             <FaHeart
// // //               className={`text-sm ${prod.isLiked ? "text-rose-500 fill-rose-500" : "text-rose-400"}`}
// // //             />
// // //             <span className="text-sm font-medium text-rose-700 dark:text-rose-300">
// // //               {formatLikes(prod.likesCount)}
// // //             </span>
// // //           </div>
// // //         </div>

// // //         {/* Quick Add to Cart */}
// // //         <motion.button
// // //           className="w-full mt-4 py-2.5 bg-amber-100 dark:bg-amber-900/30 hover:bg-amber-200 dark:hover:bg-amber-900/50 text-amber-800 dark:text-amber-300 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300"
// // //           whileHover={{ scale: 1.02 }}
// // //           whileTap={{ scale: 0.98 }}
// // //           onClick={(e) => {
// // //             e.preventDefault();
// // //             window.location.href = `/product/${prod._id}`;
// // //           }}
// // //         >
// // //           <FaShoppingCart />
// // //           <span>Quick Add</span>
// // //         </motion.button>
// // //       </div>
// // //     </motion.div>
// // //   );
// // // };

// // // export default CategoryProductCard;
// // import React, { useContext } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import { motion } from "framer-motion";
// // import {
// //   FaHeart,
// //   FaStar,
// //   FaTag,
// //   FaShoppingCart,
// //   FaCheckCircle,
// //   FaTimesCircle,
// // } from "react-icons/fa";
// // import { useProducts } from "../Context/ProductContext";
// // import { getImageUrl } from "../utils/imageUtils";
// // import { authContext } from "../Context/authContext";
// // import { toast } from "react-hot-toast";

// // const formatLikes = (num) => {
// //   const likes = Number(num) || 0;
// //   if (likes >= 1000000) return (likes / 1000000).toFixed(1) + "M";
// //   if (likes >= 1000) return (likes / 1000).toFixed(1) + "k";
// //   return likes.toString();
// // };

// // const formatPrice = (price) => {
// //   const priceNum = Number(price) || 0;
// //   return new Intl.NumberFormat("en-US", {
// //     style: "currency",
// //     currency: "USD",
// //     minimumFractionDigits: 0,
// //   }).format(priceNum);
// // };

// // const generateRating = (productId) => {
// //   if (!productId || typeof productId !== "string") return 4.0;
// //   const seed = productId.charCodeAt(productId.length - 1) || 0;
// //   return 3.5 + ((seed % 10) / 10) * 1.5;
// // };

// // const CategoryProductCard = ({ product, index = 0 }) => {
// //   const { toggleLike, products } = useProducts();
// //   const { user } = useContext(authContext);
// //   const navigate = useNavigate();
// //   const prod = products[product._id] || product;

// //   if (!prod || typeof prod !== "object") {
// //     return null;
// //   }

// //   const imagePath = prod.images?.[0] || prod.image;
// //   const imgSrc = getImageUrl(imagePath, {
// //     width: 400,
// //     height: 400,
// //     crop: "fill",
// //   });

// //   const rating = generateRating(prod._id);
// //   const stars = Math.round(rating);

// //   const isOnSale =
// //     prod.originalPrice && Number(prod.originalPrice) > Number(prod.price);
// //   const discountPercent = isOnSale
// //     ? Math.round(
// //         ((Number(prod.originalPrice) - Number(prod.price)) /
// //           Number(prod.originalPrice)) *
// //           100
// //       )
// //     : 0;

// //   // Check product availability
// //   const isProductAvailable = !prod.isSold && prod.stock > 0;
// //   const isLowStock = isProductAvailable && prod.stock <= 5;

// //   const handleQuickAdd = (e) => {
// //     e.preventDefault();
// //     if (!user) {
// //       toast.error("Please login to add to cart");
// //       navigate("/login");
// //       return;
// //     }
// //     if (prod.isSold) {
// //       toast.error("This product is sold out");
// //       return;
// //     }
// //     if (prod.stock === 0) {
// //       toast.error("This product is out of stock");
// //       return;
// //     }
// //     // You can add your add to cart logic here
// //     toast.success("Added to cart!");
// //   };

// //   return (
// //     <motion.div
// //       className="group relative bg-white dark:bg-transparent rounded-lg overflow-hidden"
// //       initial={{ opacity: 0, y: 30, scale: 0.95 }}
// //       whileInView={{ opacity: 1, y: 0, scale: 1 }}
// //       viewport={{ once: true, amount: 0.2 }}
// //       transition={{ duration: 0.6, delay: index * 0.05, type: "spring" }}
// //       whileHover={{
// //         y: -4,
// //         transition: { duration: 0.3 },
// //       }}
// //     >
// //       {/* Availability Badge */}
// //       <div className="absolute top-3 left-3 z-30">
// //         <div
// //           className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-md ${
// //             prod.isSold
// //               ? "bg-gradient-to-r from-rose-500 to-rose-600 text-white"
// //               : "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white"
// //           }`}
// //         >
// //           {prod.isSold ? (
// //             <>
// //               <FaTimesCircle className="text-xs" />
// //               <span>SOLD</span>
// //             </>
// //           ) : (
// //             <>
// //               <FaCheckCircle className="text-xs" />
// //               <span>AVAIL</span>
// //             </>
// //           )}
// //         </div>
// //       </div>

// //       {/* Stock Indicator */}
// //       {isProductAvailable && (
// //         <div className="absolute top-3 right-3 z-30">
// //           <div className="px-2 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold shadow-md">
// //             {prod.stock} LEFT
// //           </div>
// //         </div>
// //       )}

// //       {/* Discount Badge */}
// //       {isOnSale && (
// //         <motion.div
// //           initial={{ scale: 0 }}
// //           animate={{ scale: 1 }}
// //           transition={{ delay: index * 0.05 + 0.3 }}
// //           className="absolute top-12 left-3 z-20"
// //         >
// //           <div className="px-3 py-1 bg-gradient-to-r from-amber-600 to-orange-600 text-white text-xs font-bold rounded-lg flex items-center gap-1">
// //             <FaTag className="text-xs" />
// //             <span>-{discountPercent}%</span>
// //           </div>
// //         </motion.div>
// //       )}

// //       {/* Like Button */}
// //       <motion.button
// //         onClick={() => toggleLike(prod._id)}
// //         className="absolute top-12 right-3 z-20 p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
// //         whileHover={{ scale: 1.1 }}
// //         whileTap={{ scale: 0.9 }}
// //         initial={{ opacity: 0, x: 20 }}
// //         animate={{ opacity: 1, x: 0 }}
// //         transition={{ delay: index * 0.05 + 0.2 }}
// //       >
// //         <div className="relative">
// //           <FaHeart
// //             className={`text-xl transition-all duration-300 ${
// //               prod.isLiked
// //                 ? "text-red-500 fill-red-500"
// //                 : "text-gray-400 hover:text-red-400"
// //             }`}
// //           />
// //           {prod.isLiked && (
// //             <motion.div
// //               className="absolute inset-0 rounded-full bg-red-500/20"
// //               initial={{ scale: 0.8, opacity: 0.8 }}
// //               animate={{ scale: 1.5, opacity: 0 }}
// //               transition={{
// //                 duration: 1.5,
// //                 repeat: Infinity,
// //                 repeatType: "loop",
// //               }}
// //             />
// //           )}
// //         </div>
// //       </motion.button>

// //       {/* Product Image */}
// //       <div className="relative overflow-hidden">
// //         <Link to={`/product/${prod._id}`} className="block">
// //           <motion.img
// //             src={imgSrc}
// //             alt={typeof prod.name === "string" ? prod.name : "Product"}
// //             className="w-full h-64 lg:h-72 object-contain p-6 transition-transform duration-300 group-hover:scale-105"
// //             loading="lazy"
// //             onError={(e) => {
// //               e.target.src = getImageUrl(null);
// //               e.target.className =
// //                 "w-full h-64 lg:h-72 object-cover p-6 transition-transform duration-300 group-hover:scale-105";
// //             }}
// //             whileHover={{ scale: 1.05 }}
// //             transition={{ duration: 0.3 }}
// //           />
// //         </Link>
// //       </div>

// //       {/* Product Info */}
// //       <div className="p-5">
// //         <Link to={`/product/${prod._id}`}>
// //           <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 min-h-[3rem] group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300">
// //             {typeof prod.name === "string" ? prod.name : "Unnamed Product"}
// //           </h3>
// //         </Link>

// //         {/* Rating */}
// //         <div className="flex items-center gap-2 mb-3">
// //           <div className="flex items-center gap-0.5">
// //             {[...Array(5)].map((_, i) => (
// //               <FaStar
// //                 key={i}
// //                 className={`text-sm ${
// //                   i < stars
// //                     ? "text-amber-500 fill-amber-500"
// //                     : "text-gray-300 dark:text-gray-600"
// //                 }`}
// //               />
// //             ))}
// //           </div>
// //           <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
// //             {rating.toFixed(1)}
// //           </span>
// //         </div>

// //         {/* Price and Likes */}
// //         <div className="flex items-center justify-between mb-4">
// //           <div className="flex items-baseline gap-2">
// //             <span className="text-xl font-bold text-gray-900 dark:text-white">
// //               {formatPrice(prod.price)}
// //             </span>
// //             {isOnSale && (
// //               <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
// //                 {formatPrice(prod.originalPrice)}
// //               </span>
// //             )}
// //           </div>

// //           <div className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-100 dark:bg-rose-900/20 rounded-full">
// //             <FaHeart
// //               className={`text-sm ${prod.isLiked ? "text-rose-500 fill-rose-500" : "text-rose-400"}`}
// //             />
// //             <span className="text-sm font-medium text-rose-700 dark:text-rose-300">
// //               {formatLikes(prod.likesCount)}
// //             </span>
// //           </div>
// //         </div>

// //         {/* Stock Warning */}
// //         {isLowStock && (
// //           <div className="mb-4 p-2 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-lg">
// //             <span className="text-xs font-bold text-amber-700 dark:text-amber-300">
// //               ⚠️ Only {prod.stock} left!
// //             </span>
// //           </div>
// //         )}

// //         {/* Quick Add to Cart */}
// //         {prod.isSold ? (
// //           <motion.button
// //             className="w-full py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold flex items-center justify-center gap-2 cursor-not-allowed"
// //             disabled
// //           >
// //             <FaTimesCircle />
// //             <span>SOLD OUT</span>
// //           </motion.button>
// //         ) : (
// //           <motion.button
// //             className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300"
// //             whileHover={{ scale: 1.02 }}
// //             whileTap={{ scale: 0.98 }}
// //             onClick={handleQuickAdd}
// //           >
// //             <FaShoppingCart />
// //             <span>QUICK ADD</span>
// //           </motion.button>
// //         )}
// //       </div>
// //     </motion.div>
// //   );
// // };

// // export default CategoryProductCard;
// import React, { useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//   FaHeart,
//   FaStar,
//   FaTag,
//   FaShoppingCart,
//   FaCheckCircle,
//   FaTimesCircle,
//   FaLeaf,
//   FaFire,
// } from "react-icons/fa";
// import { useProducts } from "../Context/ProductContext";
// import { getImageUrl } from "../utils/imageUtils";
// import { authContext } from "../Context/authContext";
// import { toast } from "react-hot-toast";

// const formatLikes = (num) => {
//   const likes = Number(num) || 0;
//   if (likes >= 1000000) return (likes / 1000000).toFixed(1) + "M";
//   if (likes >= 1000) return (likes / 1000).toFixed(1) + "k";
//   return likes.toString();
// };

// const formatPrice = (price) => {
//   const priceNum = Number(price) || 0;
//   return new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
//     minimumFractionDigits: 0,
//   }).format(priceNum);
// };

// const generateRating = (productId) => {
//   if (!productId || typeof productId !== "string") return 4.0;
//   const seed = productId.charCodeAt(productId.length - 1) || 0;
//   return 3.5 + ((seed % 10) / 10) * 1.5;
// };

// const CategoryProductCard = ({ product, index = 0 }) => {
//   const { toggleLike, products } = useProducts();
//   const { user } = useContext(authContext);
//   const navigate = useNavigate();
//   const prod = products[product._id] || product;

//   if (!prod || typeof prod !== "object") {
//     return null;
//   }

//   const imagePath = prod.images?.[0] || prod.image;
//   const imgSrc = getImageUrl(imagePath, {
//     width: 400,
//     height: 400,
//     crop: "fill",
//   });

//   const rating = generateRating(prod._id);
//   const stars = Math.round(rating);

//   const isOnSale =
//     prod.originalPrice && Number(prod.originalPrice) > Number(prod.price);
//   const discountPercent = isOnSale
//     ? Math.round(
//         ((Number(prod.originalPrice) - Number(prod.price)) /
//           Number(prod.originalPrice)) *
//           100
//       )
//     : 0;

//   // Check product availability
//   const isProductAvailable = !prod.isSold && prod.stock > 0;
//   const isLowStock = isProductAvailable && prod.stock <= 5;

//   const handleQuickAdd = (e) => {
//     e.preventDefault();
//     if (!user) {
//       toast.error("Please login to add to cart");
//       navigate("/login");
//       return;
//     }
//     if (prod.isSold) {
//       toast.error("This product is sold out");
//       return;
//     }
//     if (prod.stock === 0) {
//       toast.error("This product is out of stock");
//       return;
//     }
//     // You can add your add to cart logic here
//     toast.success("Added to cart!");
//   };

//   return (
//     <motion.div
//       className="group relative bg-gradient-to-b from-[#F8F5F0] to-[#F0ECE3]"
//       initial={{ opacity: 0, y: 30, scale: 0.95 }}
//       whileInView={{ opacity: 1, y: 0, scale: 1 }}
//       viewport={{ once: true, amount: 0.2 }}
//       transition={{ duration: 0.6, delay: index * 0.05, type: "spring" }}
//       whileHover={{
//         y: -8,
//         scale: 1.02,
//         boxShadow: "0 20px 40px rgba(215, 192, 151, 0.2)",
//         transition: { duration: 0.3 },
//       }}
//     >
//       {/* Decorative Corner Elements */}
//       <div className="absolute top-0 left-0 w-16 h-16 overflow-hidden z-10">
//         <div className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-br from-[#D7C097]/20 to-transparent rounded-full" />
//       </div>

//       <div className="absolute bottom-0 right-0 w-16 h-16 overflow-hidden z-10">
//         <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-gradient-to-tl from-[#B8A075]/20 to-transparent rounded-full" />
//       </div>

//       {/* Availability Badge */}
//       <div className="absolute top-3 left-3 z-30">
//         <div
//           className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-lg ${
//             prod.isSold
//               ? "bg-gradient-to-r from-rose-500 to-rose-600 text-white"
//               : "bg-gradient-to-r from-[#D7C097] to-[#B8A075] text-white"
//           }`}
//         >
//           {prod.isSold ? (
//             <>
//               <FaTimesCircle className="text-xs" />
//               <span>SOLD</span>
//             </>
//           ) : (
//             <>
//               <FaCheckCircle className="text-xs" />
//               <span>AVAIL</span>
//             </>
//           )}
//         </div>
//       </div>

//       {/* Stock Indicator */}
//       {isProductAvailable && (
//         <div className="absolute top-3 right-3 z-30">
//           <div className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#D7C097] to-[#B8A075] text-white text-xs font-bold shadow-lg">
//             {prod.stock} LEFT
//           </div>
//         </div>
//       )}

//       {/* Discount Badge */}
//       {isOnSale && (
//         <motion.div
//           initial={{ scale: 0 }}
//           animate={{ scale: 1 }}
//           transition={{ delay: index * 0.05 + 0.3 }}
//           className="absolute top-14 left-3 z-20"
//         >
//           <div className="px-3 py-1.5 bg-gradient-to-r from-[#D7C097] to-[#B8A075] text-white text-xs font-bold rounded-lg flex items-center gap-1 shadow-lg">
//             <FaTag className="text-xs" />
//             <span>-{discountPercent}% OFF</span>
//           </div>
//         </motion.div>
//       )}

//       {/* Popular Badge */}
//       {(prod.likesCount > 50 || prod.popularity > 4) && (
//         <div className="absolute top-14 right-3 z-20">
//           <div className="px-3 py-1.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold rounded-lg flex items-center gap-1 shadow-lg">
//             <FaFire className="text-xs" />
//             <span>POPULAR</span>
//           </div>
//         </div>
//       )}

//       {/* Like Button */}
//       <motion.button
//         onClick={() => toggleLike(prod._id)}
//         className="absolute top-24 right-3 z-20 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300 border border-[#E8DFD0] shadow-lg"
//         whileHover={{ scale: 1.1 }}
//         whileTap={{ scale: 0.9 }}
//         initial={{ opacity: 0, x: 20 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ delay: index * 0.05 + 0.2 }}
//       >
//         <div className="relative">
//           <FaHeart
//             className={`text-xl transition-all duration-300 ${
//               prod.isLiked
//                 ? "text-[#D7C097] fill-[#D7C097]"
//                 : "text-gray-400 hover:text-[#B8A075]"
//             }`}
//           />
//           {prod.isLiked && (
//             <motion.div
//               className="absolute inset-0 rounded-full bg-[#D7C097]/20"
//               initial={{ scale: 0.8, opacity: 0.8 }}
//               animate={{ scale: 1.5, opacity: 0 }}
//               transition={{
//                 duration: 1.5,
//                 repeat: Infinity,
//                 repeatType: "loop",
//               }}
//             />
//           )}
//         </div>
//       </motion.button>

//       {/* Product Image */}
//       <div className="relative overflow-hidden h-64 lg:h-64">
//         <Link to={`/product/${prod._id}`} className="block h-full">
//           <div className="relative h-full">
//             <motion.img
//               src={imgSrc}
//               alt={typeof prod.name === "string" ? prod.name : "Product"}
//               className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-110"
//               loading="lazy"
//               onError={(e) => {
//                 e.target.src = getImageUrl(null);
//                 e.target.className =
//                   "w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-110";
//               }}
//               whileHover={{ scale: 1.1 }}
//               transition={{ duration: 0.4 }}
//             />
//             {/* Image Overlay Gradient */}
//             {/* <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

//             {/* Shimmer Effect */}
//             {/* <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />{" "} */}
//           </div>
//         </Link>
//       </div>

//       {/* Product Info */}
//       <div className="p-6">
//         <Link to={`/product/${prod._id}`}>
//           <h3 className="text-lg font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2 line-clamp-2 min-h-[3rem] group-hover:text-[#B8A075] transition-colors duration-300">
//             {typeof prod.name === "string" ? prod.name : "Unnamed Product"}
//           </h3>
//         </Link>

//         {/* Rating */}
//         <div className="flex items-center gap-2 mb-4">
//           <div className="flex items-center gap-0.5">
//             {[...Array(5)].map((_, i) => (
//               <FaStar
//                 key={i}
//                 className={`text-sm ${
//                   i < stars ? "text-[#D7C097] fill-[#D7C097]" : "text-gray-300"
//                 }`}
//               />
//             ))}
//           </div>
//           <span className="text-sm font-medium text-gray-700">
//             {rating.toFixed(1)}
//           </span>
//           {/* Natural Badge */}
//           <div className="ml-auto flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-[#D7C097]/10 to-[#B8A075]/10">
//             <FaLeaf className="text-[#B8A075] text-xs" />
//             <span className="text-xs font-medium text-[#B8A075]">Natural</span>
//           </div>
//         </div>

//         {/* Price and Likes */}
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-baseline gap-2">
//             <span className="text-xl font-bold text-gray-900">
//               {formatPrice(prod.price)}
//             </span>
//             {isOnSale && (
//               <span className="text-sm text-gray-500 line-through">
//                 {formatPrice(prod.originalPrice)}
//               </span>
//             )}
//           </div>

//           <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#D7C097]/10 to-[#B8A075]/10">
//             <FaHeart
//               className={`text-sm ${prod.isLiked ? "text-[#B8A075] fill-[#B8A075]" : "text-[#D7C097]"}`}
//             />
//             <span className="text-sm font-medium text-[#B8A075]">
//               {formatLikes(prod.likesCount)}
//             </span>
//           </div>
//         </div>

//         {/* Stock Warning */}
//         {isLowStock && (
//           <div className="mb-4 p-3 rounded-xl bg-gradient-to-r from-[#D7C097]/10 to-[#B8A075]/10 border border-[#D7C097]/20">
//             <span className="text-xs font-bold text-[#B8A075]">
//               ⚡ Only {prod.stock} left in stock!
//             </span>
//           </div>
//         )}

//         {/* Quick Add to Cart */}
//         {prod.isSold ? (
//           <motion.button
//             className="w-full py-3 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-500 rounded-xl font-semibold flex items-center justify-center gap-2 cursor-not-allowed border border-gray-200"
//             disabled
//           >
//             <FaTimesCircle />
//             <span>SOLD OUT</span>
//           </motion.button>
//         ) : (
//           <motion.button
//             className="w-full py-3 bg-gradient-to-r from-[#D7C097] to-[#B8A075] hover:from-[#B8A075] hover:to-[#D7C097] text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl group/btn"
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={handleQuickAdd}
//           >
//             <motion.div
//               animate={{ rotate: [0, 360] }}
//               transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
//               className="w-5 h-5 flex items-center justify-center"
//             >
//               <FaShoppingCart className="group-hover/btn:scale-110 transition-transform duration-300" />
//             </motion.div>
//             <span>QUICK ADD</span>
//           </motion.button>
//         )}
//       </div>
//     </motion.div>
//   );
// };

// export default CategoryProductCard;
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaHeart,
  FaStar,
  FaTag,
  FaShoppingCart,
  FaCheckCircle,
  FaTimesCircle,
  FaLeaf,
  FaFire,
} from "react-icons/fa";
import { useProducts } from "../Context/ProductContext";
import { getImageUrl } from "../utils/imageUtils";
import { authContext } from "../Context/authContext";
import { toast } from "react-hot-toast";

const formatLikes = (num) => {
  const likes = Number(num) || 0;
  if (likes >= 1000000) return (likes / 1000000).toFixed(1) + "M";
  if (likes >= 1000) return (likes / 1000).toFixed(1) + "k";
  return likes.toString();
};

const formatPrice = (price) => {
  const priceNum = Number(price) || 0;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(priceNum);
};

const generateRating = (productId) => {
  if (!productId || typeof productId !== "string") return 4.0;
  const seed = productId.charCodeAt(productId.length - 1) || 0;
  return 3.5 + ((seed % 10) / 10) * 1.5;
};

const CategoryProductCard = ({ product, index = 0 }) => {
  const { toggleLike, products } = useProducts();
  const { user } = useContext(authContext);
  const navigate = useNavigate();
  const prod = products[product._id] || product;

  if (!prod || typeof prod !== "object") {
    return null;
  }

  const imagePath = prod.images?.[0] || prod.image;
  const imgSrc = getImageUrl(imagePath, {
    width: 400,
    height: 400,
    crop: "fill",
  });

  const rating = generateRating(prod._id);
  const stars = Math.round(rating);

  const isOnSale =
    prod.originalPrice && Number(prod.originalPrice) > Number(prod.price);
  const discountPercent = isOnSale
    ? Math.round(
        ((Number(prod.originalPrice) - Number(prod.price)) /
          Number(prod.originalPrice)) *
          100
      )
    : 0;

  // Check product availability
  const isProductAvailable = !prod.isSold && prod.stock > 0;
  const isLowStock = isProductAvailable && prod.stock <= 5;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to add to cart");
      navigate("/login");
      return;
    }
    if (prod.isSold) {
      toast.error("This product is sold out");
      return;
    }
    if (prod.stock === 0) {
      toast.error("This product is out of stock");
      return;
    }
    // You can add your add to cart logic here
    toast.success("Added to cart!");
  };

  return (
    <motion.div
      className="group relative bg-gradient-to-b from-[#F8F5F0] to-[#F0ECE3] dark:bg-gradient-to-b dark:from-gray-800 dark:to-gray-900 dark:border dark:border-gray-700/50"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.05, type: "spring" }}
      whileHover={{
        y: -8,
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(215, 192, 151, 0.2)",
        transition: { duration: 0.3 },
      }}
    >
      {/* Decorative Corner Elements */}
      <div className="absolute top-0 left-0 w-16 h-16 overflow-hidden z-10">
        <div className="absolute -top-8 -left-8 w-16 h-16 bg-gradient-to-br from-[#D7C097]/20 to-transparent dark:from-[#D7C097]/10 dark:to-transparent rounded-full" />
      </div>

      <div className="absolute bottom-0 right-0 w-16 h-16 overflow-hidden z-10">
        <div className="absolute -bottom-8 -right-8 w-16 h-16 bg-gradient-to-tl from-[#B8A075]/20 to-transparent dark:from-[#B8A075]/10 dark:to-transparent rounded-full" />
      </div>

      {/* Availability Badge */}
      <div className="absolute top-3 left-3 z-30">
        <div
          className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-lg ${
            prod.isSold
              ? "bg-gradient-to-r from-rose-500 to-rose-600 text-white dark:from-rose-600 dark:to-rose-700"
              : "bg-gradient-to-r from-[#D7C097] to-[#B8A075] text-white dark:from-[#B8A075] dark:to-[#D7C097]"
          }`}
        >
          {prod.isSold ? (
            <>
              <FaTimesCircle className="text-xs" />
              <span>SOLD</span>
            </>
          ) : (
            <>
              <FaCheckCircle className="text-xs" />
              <span>AVAIL</span>
            </>
          )}
        </div>
      </div>

      {/* Stock Indicator */}
      {isProductAvailable && (
        <div className="absolute top-3 right-3 z-30">
          <div className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#D7C097] to-[#B8A075] dark:from-[#B8A075] dark:to-[#D7C097] text-white text-xs font-bold shadow-lg">
            {prod.stock} LEFT
          </div>
        </div>
      )}

      {/* Discount Badge */}
      {isOnSale && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.05 + 0.3 }}
          className="absolute top-14 left-3 z-20"
        >
          <div className="px-3 py-1.5 bg-gradient-to-r from-[#D7C097] to-[#B8A075] dark:from-[#B8A075] dark:to-[#D7C097] text-white text-xs font-bold rounded-lg flex items-center gap-1 shadow-lg">
            <FaTag className="text-xs" />
            <span>-{discountPercent}% OFF</span>
          </div>
        </motion.div>
      )}

      {/* Popular Badge */}
      {(prod.likesCount > 50 || prod.popularity > 4) && (
        <div className="absolute top-14 right-3 z-20">
          <div className="px-3 py-1.5 bg-gradient-to-r from-rose-500 to-pink-500 dark:from-rose-600 dark:to-pink-600 text-white text-xs font-bold rounded-lg flex items-center gap-1 shadow-lg">
            <FaFire className="text-xs" />
            <span>POPULAR</span>
          </div>
        </div>
      )}

      {/* Like Button */}
      <motion.button
        onClick={() => toggleLike(prod._id)}
        className="absolute top-24 right-3 z-20 p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 border border-[#E8DFD0] dark:border-gray-700 shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 + 0.2 }}
      >
        <div className="relative">
          <FaHeart
            className={`text-xl transition-all duration-300 ${
              prod.isLiked
                ? "text-[#D7C097] fill-[#D7C097] dark:text-[#B8A075] dark:fill-[#B8A075]"
                : "text-gray-400 hover:text-[#B8A075] dark:hover:text-[#D7C097]"
            }`}
          />
          {prod.isLiked && (
            <motion.div
              className="absolute inset-0 rounded-full bg-[#D7C097]/20 dark:bg-[#B8A075]/20"
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
            />
          )}
        </div>
      </motion.button>

      {/* Product Image */}
      <div className="relative overflow-hidden h-64 lg:h-64">
        <Link to={`/product/${prod._id}`} className="block h-full">
          <div className="relative h-full">
            <motion.img
              src={imgSrc}
              alt={typeof prod.name === "string" ? prod.name : "Product"}
              className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
              onError={(e) => {
                e.target.src = getImageUrl(null);
                e.target.className =
                  "w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-110";
              }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </Link>
      </div>

      {/* Product Info */}
      <div className="p-6">
        <Link to={`/product/${prod._id}`}>
          <h3 className="text-lg font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent mb-2 line-clamp-2 min-h-[3rem] group-hover:text-[#B8A075] dark:group-hover:text-[#D7C097] transition-colors duration-300">
            {typeof prod.name === "string" ? prod.name : "Unnamed Product"}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`text-sm ${
                  i < stars
                    ? "text-[#D7C097] fill-[#D7C097] dark:text-[#B8A075] dark:fill-[#B8A075]"
                    : "text-gray-300 dark:text-gray-600"
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {rating.toFixed(1)}
          </span>
          {/* Natural Badge */}
          <div className="ml-auto flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-[#D7C097]/10 to-[#B8A075]/10 dark:from-[#B8A075]/10 dark:to-[#D7C097]/10">
            <FaLeaf className="text-[#B8A075] dark:text-[#D7C097] text-xs" />
            <span className="text-xs font-medium text-[#B8A075] dark:text-[#D7C097]">
              Natural
            </span>
          </div>
        </div>

        {/* Price and Likes */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {formatPrice(prod.price)}
            </span>
            {isOnSale && (
              <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                {formatPrice(prod.originalPrice)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#D7C097]/10 to-[#B8A075]/10 dark:from-[#B8A075]/10 dark:to-[#D7C097]/10">
            <FaHeart
              className={`text-sm ${
                prod.isLiked
                  ? "text-[#B8A075] fill-[#B8A075] dark:text-[#D7C097] dark:fill-[#D7C097]"
                  : "text-[#D7C097] dark:text-[#B8A075]"
              }`}
            />
            <span className="text-sm font-medium text-[#B8A075] dark:text-[#D7C097]">
              {formatLikes(prod.likesCount)}
            </span>
          </div>
        </div>

        {/* Stock Warning */}
        {isLowStock && (
          <div className="mb-4 p-3 rounded-xl bg-gradient-to-r from-[#D7C097]/10 to-[#B8A075]/10 dark:from-[#B8A075]/10 dark:to-[#D7C097]/10 border border-[#D7C097]/20 dark:border-[#B8A075]/20">
            <span className="text-xs font-bold text-[#B8A075] dark:text-[#D7C097]">
              ⚡ Only {prod.stock} left in stock!
            </span>
          </div>
        )}

        {/* Quick Add to Cart */}
        {prod.isSold ? (
          <motion.button
            className="w-full py-3 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 text-gray-500 dark:text-gray-400 rounded-xl font-semibold flex items-center justify-center gap-2 cursor-not-allowed border border-gray-200 dark:border-gray-700"
            disabled
          >
            <FaTimesCircle />
            <span>SOLD OUT</span>
          </motion.button>
        ) : (
          <motion.button
            className="w-full py-3 bg-gradient-to-r from-[#D7C097] to-[#B8A075] hover:from-[#B8A075] hover:to-[#D7C097] dark:from-[#B8A075] dark:to-[#D7C097] dark:hover:from-[#D7C097] dark:hover:to-[#B8A075] text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl group/btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleQuickAdd}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 flex items-center justify-center"
            >
              <FaShoppingCart className="group-hover/btn:scale-110 transition-transform duration-300" />
            </motion.div>
            <span>QUICK ADD</span>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default CategoryProductCard;
