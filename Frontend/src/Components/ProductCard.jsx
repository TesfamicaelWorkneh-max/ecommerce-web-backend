// import React from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//   FaHeart,
//   FaStar,
//   FaTag,
//   FaShoppingCart,
//   FaTruck,
//   FaUndo,
//   FaEye,
// } from "react-icons/fa";
// import { useProducts } from "../Context/ProductContext";
// import { getImageUrl } from "../utils/imageUtils";

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

// const ProductCard = ({ product, index = 0 }) => {
//   const { toggleLike, products } = useProducts();
//   const prod = products[product._id] || product;

//   // Validate product data
//   if (!prod || typeof prod !== "object") {
//     return (
//       <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-2xl">
//         <p className="text-red-600 dark:text-red-400">Invalid product data</p>
//       </div>
//     );
//   }

//   // Safely extract image path
//   let imagePath = "";
//   if (prod.images && Array.isArray(prod.images) && prod.images.length > 0) {
//     imagePath = typeof prod.images[0] === "string" ? prod.images[0] : "";
//   } else if (typeof prod.image === "string") {
//     imagePath = prod.image;
//   }

//   const imgSrc = getImageUrl(imagePath);

//   const rating = generateRating(prod._id);
//   const stars = Math.round(rating);

//   // Check if product is on sale
//   const isOnSale =
//     prod.originalPrice && Number(prod.originalPrice) > Number(prod.price);
//   const discountPercent = isOnSale
//     ? Math.round(
//         ((Number(prod.originalPrice) - Number(prod.price)) /
//           Number(prod.originalPrice)) *
//           100
//       )
//     : 0;

//   // Safely extract category
//   const category =
//     typeof prod.category === "string"
//       ? prod.category
//       : typeof prod.category === "object" && prod.category !== null
//         ? prod.category.name || ""
//         : "";

//   return (
//     <motion.div
//       className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-slate-700 hover:border-amber-200 dark:hover:border-amber-700"
//       initial={{ opacity: 0, y: 40, scale: 0.95 }}
//       animate={{ opacity: 1, y: 0, scale: 1 }}
//       transition={{
//         duration: 0.6,
//         delay: index * 0.05,
//         type: "spring",
//         stiffness: 100,
//         damping: 15,
//       }}
//       whileHover={{
//         y: -8,
//         transition: { duration: 0.3 },
//       }}
//     >
//       {/* Discount Badge */}
//       {isOnSale && (
//         <motion.div
//           initial={{ scale: 0, rotate: -45 }}
//           animate={{ scale: 1, rotate: 0 }}
//           transition={{ delay: index * 0.05 + 0.3 }}
//           className="absolute top-4 left-4 z-20"
//         >
//           <div className="relative">
//             <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
//             <div className="relative px-3 py-1.5 bg-gradient-to-r from-red-600 to-pink-600 text-white text-xs font-bold rounded-lg flex items-center gap-1 shadow-lg">
//               <FaTag className="text-xs" />
//               <span>-{discountPercent}% OFF</span>
//             </div>
//           </div>
//         </motion.div>
//       )}

//       {/* Like Button */}
//       <motion.button
//         onClick={() => toggleLike(prod._id)}
//         className="absolute top-4 right-4 z-20 p-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
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
//                 ? "text-red-500 fill-red-500 drop-shadow-lg"
//                 : "text-gray-400 hover:text-red-400"
//             }`}
//           />
//           {/* Pulsing effect when liked */}
//           {prod.isLiked && (
//             <motion.div
//               className="absolute inset-0 rounded-full bg-red-500/20"
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

//       {/* Product Image Container */}
//       <div className="relative overflow-hidden">
//         <Link to={`/product/${prod._id}`} className="block">
//           {/* Image with hover effect */}
//           <motion.img
//             src={getImageUrl(product.images?.[0] || product.image)}
//             alt={typeof prod.name === "string" ? prod.name : "Product"}
//             className="w-full h-64 object-contain p-6 transition-transform duration-500 group-hover:scale-105"
//             loading="lazy"
//             onError={(e) => {
//               e.target.src =
//                 "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop";
//               e.target.className =
//                 "w-full h-64 object-contain p-6 transition-transform duration-500 group-hover:scale-105";
//               e.target.onerror = null; // Prevent infinite loop
//             }}
//             whileHover={{ scale: 1.05 }}
//             transition={{ duration: 0.5 }}
//           />

//           {/* Quick View Overlay */}
//           <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-6">
//             <motion.div
//               className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full px-5 py-2.5 flex items-center gap-2.5 shadow-xl"
//               initial={{ y: 20 }}
//               whileInView={{ y: 0 }}
//               transition={{ duration: 0.3 }}
//             >
//               <FaEye className="text-slate-700 dark:text-slate-300 text-sm" />
//               <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
//                 Quick View
//               </span>
//             </motion.div>
//           </div>
//         </Link>

//         {/* SOLD / AVAILABLE Badge */}
//         <div className="absolute bottom-4 left-4">
//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.05 + 0.4 }}
//             className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm border ${
//               prod.isSold
//                 ? "bg-gradient-to-r from-red-500/90 to-red-600/90 text-white border-red-400/30"
//                 : "bg-gradient-to-r from-green-500/90 to-emerald-600/90 text-white border-green-400/30"
//             }`}
//           >
//             {prod.isSold ? "Sold Out" : "In Stock"}
//           </motion.div>
//         </div>
//       </div>

//       {/* Product Info */}
//       <div className="p-6">
//         {/* Category Tag */}
//         {category && (
//           <div className="mb-3">
//             <span className="inline-block px-3 py-1.5 bg-gradient-to-r from-amber-500/10 to-amber-600/10 text-amber-700 dark:text-amber-300 text-xs font-medium rounded-full border border-amber-500/20 hover:border-amber-500/40 transition-colors duration-300">
//               {category}
//             </span>
//           </div>
//         )}

//         {/* Product Name */}
//         <Link to={`/product/${prod._id}`}>
//           <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 line-clamp-2 min-h-[3.5rem] group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300">
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
//                   i < stars
//                     ? "text-amber-500 fill-amber-500 drop-shadow-sm"
//                     : "text-gray-300 dark:text-slate-600"
//                 }`}
//               />
//             ))}
//           </div>
//           <span className="text-sm font-medium text-gray-700 dark:text-slate-300">
//             {rating.toFixed(1)}
//           </span>
//           <span className="text-xs text-gray-500 dark:text-slate-500 ml-2">
//             ({Math.floor(Math.random() * 100) + 50} reviews)
//           </span>
//         </div>

//         {/* Price and Likes */}
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-baseline gap-3">
//             {/* Current Price */}
//             <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-800 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
//               {formatPrice(prod.price)}
//             </span>

//             {/* Original Price if on sale */}
//             {isOnSale && (
//               <span className="text-sm text-gray-500 dark:text-slate-500 line-through">
//                 {formatPrice(prod.originalPrice)}
//               </span>
//             )}
//           </div>

//           {/* Likes */}
//           <motion.div
//             className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-full border border-rose-200 dark:border-rose-800/30 hover:border-rose-300 dark:hover:border-rose-700 transition-colors duration-300"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <FaHeart
//               className={`text-sm ${prod.isLiked ? "text-rose-500 fill-rose-500" : "text-rose-400"}`}
//             />
//             <span className="text-sm font-medium text-rose-700 dark:text-rose-300">
//               {formatLikes(prod.likesCount)}
//             </span>
//           </motion.div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex gap-3 mb-4">
//           <motion.button
//             className="px-4 py-3.5 bg-gradient-to-r from-slate-100 to-gray-100 dark:from-slate-700 dark:to-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 border border-slate-200 dark:border-slate-600 hover:border-slate-300 dark:hover:border-slate-500"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => toggleLike(prod._id)}
//           >
//             <FaHeart
//               className={`text-lg ${prod.isLiked ? "text-rose-500 fill-rose-500" : "text-gray-400"}`}
//             />
//           </motion.button>
//         </div>

//         {/* Shipping Info */}
//         <div className="pt-4 border-t border-gray-100 dark:border-slate-700">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-lg">
//                 <FaTruck className="text-green-600 dark:text-green-400 text-sm" />
//               </div>
//               <div>
//                 <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
//                   Free Shipping
//                 </p>
//                 <p className="text-xs text-gray-500 dark:text-slate-500">
//                   Over $100
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center gap-2">
//               <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
//                 <FaUndo className="text-blue-600 dark:text-blue-400 text-sm" />
//               </div>
//               <div>
//                 <p className="text-xs font-medium text-slate-700 dark:text-slate-300">
//                   30-Day Returns
//                 </p>
//                 <p className="text-xs text-gray-500 dark:text-slate-500">
//                   Easy returns
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Glow Effect on Hover */}
//       <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

//       {/* Top seller badge (if applicable) */}
//       {prod.isTopSeller && (
//         <div className="absolute -top-2 -right-2 z-10">
//           <div className="relative">
//             <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full blur opacity-70"></div>
//             <div className="relative px-3 py-1 bg-gradient-to-r from-amber-500 to-yellow-500 text-white text-xs font-bold rounded-full shadow-lg">
//               🔥 Top Seller
//             </div>
//           </div>
//         </div>
//       )}
//     </motion.div>
//   );
// };

// export default ProductCard;
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaHeart,
  FaStar,
  FaTag,
  FaShoppingCart,
  FaTruck,
  FaUndo,
  FaEye,
} from "react-icons/fa";
import { useProducts } from "../Context/ProductContext";
import { getImageUrl } from "../utils/imageUtils";

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

const ProductCard = ({ product, index = 0 }) => {
  const { toggleLike, products } = useProducts();
  const prod = products[product._id] || product;

  // Validate product data
  if (!prod || typeof prod !== "object") {
    return (
      <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-2xl">
        <p className="text-red-600 dark:text-red-400">Invalid product data</p>
      </div>
    );
  }

  // Safely extract image path
  let imagePath = "";
  if (prod.images && Array.isArray(prod.images) && prod.images.length > 0) {
    imagePath = typeof prod.images[0] === "string" ? prod.images[0] : "";
  } else if (typeof prod.image === "string") {
    imagePath = prod.image;
  }

  const imgSrc = getImageUrl(imagePath);

  const rating = generateRating(prod._id);
  const stars = Math.round(rating);

  // Check if product is on sale
  const isOnSale =
    prod.originalPrice && Number(prod.originalPrice) > Number(prod.price);
  const discountPercent = isOnSale
    ? Math.round(
        ((Number(prod.originalPrice) - Number(prod.price)) /
          Number(prod.originalPrice)) *
          100
      )
    : 0;

  // Safely extract category
  const category =
    typeof prod.category === "string"
      ? prod.category
      : typeof prod.category === "object" && prod.category !== null
        ? prod.category.name || ""
        : "";

  return (
    <motion.div
      className="group relative bg-white dark:bg-transparent rounded-xl overflow-hidden transition-all duration-300"
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: index * 0.05,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      whileHover={{
        y: -5,
        transition: { duration: 0.3 },
      }}
    >
      {/* Discount Badge */}
      {isOnSale && (
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: index * 0.05 + 0.3 }}
          className="absolute top-4 left-4 z-20"
        >
          <div className="px-3 py-1.5 bg-amber-600 dark:bg-amber-700 text-white text-xs font-bold rounded-lg flex items-center gap-1">
            <FaTag className="text-xs" />
            <span>-{discountPercent}% OFF</span>
          </div>
        </motion.div>
      )}

      {/* Like Button */}
      <motion.button
        onClick={() => toggleLike(prod._id)}
        className="absolute top-4 right-4 z-20 p-2 bg-white dark:bg-gray-800 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
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
                ? "text-red-500 fill-red-500"
                : "text-gray-400 hover:text-red-400"
            }`}
          />
          {/* Pulsing effect when liked */}
          {prod.isLiked && (
            <motion.div
              className="absolute inset-0 rounded-full bg-red-500/20"
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

      {/* Product Image Container */}
      <div className="relative overflow-hidden">
        <Link to={`/product/${prod._id}`} className="block">
          {/* Image with hover effect */}
          <motion.img
            src={getImageUrl(product.images?.[0] || product.image)}
            alt={typeof prod.name === "string" ? prod.name : "Product"}
            className="w-full h-60 lg:h-60 object-contain p-2 transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop";
              e.target.className =
                "w-full h-72 lg:h-80 object-contain p-6 transition-transform duration-300 group-hover:scale-105";
              e.target.onerror = null;
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />

          {/* Quick View Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-6">
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-full px-5 py-2.5 flex items-center gap-2.5"
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FaEye className="text-gray-700 dark:text-gray-300 text-sm" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Quick View
              </span>
            </motion.div>
          </div>
        </Link>
      </div>

      {/* Product Info */}
      <div className="p-6">
        {/* Category Tag */}
        {category && (
          <div className="mb-3">
            <span className="inline-block px-3 py-1.5 bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300 text-xs font-medium rounded-full">
              {category}
            </span>
          </div>
        )}

        {/* Product Name */}
        <Link to={`/product/${prod._id}`}>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 min-h-[3rem] group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300">
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
                    ? "text-amber-500 fill-amber-500"
                    : "text-gray-300 dark:text-gray-600"
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {rating.toFixed(1)}
          </span>
        </div>

        {/* Price and Likes */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-baseline gap-3">
            {/* Current Price */}
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatPrice(prod.price)}
            </span>

            {/* Original Price if on sale */}
            {isOnSale && (
              <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                {formatPrice(prod.originalPrice)}
              </span>
            )}
          </div>

          {/* Likes */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-100 dark:bg-rose-900/20 rounded-full">
            <FaHeart
              className={`text-sm ${prod.isLiked ? "text-rose-500 fill-rose-500" : "text-rose-400"}`}
            />
            <span className="text-sm font-medium text-rose-700 dark:text-rose-300">
              {formatLikes(prod.likesCount)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-4">
          <motion.button
            className="flex-1 px-2 py-3 bg-amber-500 dark:bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-600 dark:hover:bg-amber-700 transition-colors duration-300 flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaShoppingCart className="text-lg" />
            <span>Add to Cart</span>
          </motion.button>
        </div>

        {/* Shipping Info */}
        <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <FaTruck className="text-green-600 dark:text-green-400 text-sm" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  Free Shipping
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <FaUndo className="text-blue-600 dark:text-blue-400 text-sm" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                  30-Day Returns
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top seller badge (if applicable) */}
      {prod.isTopSeller && (
        <div className="absolute -top-2 -right-2 z-10">
          <div className="px-3 py-1 bg-amber-500 dark:bg-amber-600 text-white text-xs font-bold rounded-full">
            🔥 Top Seller
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProductCard;
