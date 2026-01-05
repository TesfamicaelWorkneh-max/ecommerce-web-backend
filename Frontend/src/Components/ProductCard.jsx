// // import React, { useState, useContext } from "react";
// // import { Link, useNavigate } from "react-router-dom";
// // import { authContext } from "../Context/authContext";
// // import { cartContext } from "../Context/cartContext";
// // import {
// //   FaHeart,
// //   FaStar,
// //   FaTag,
// //   FaShoppingCart,
// //   FaTimesCircle,
// //   FaCheckCircle,
// //   FaEye,
// // } from "react-icons/fa";
// // import { useProducts } from "../Context/ProductContext";
// // import { getImageUrl } from "../utils/imageUtils";
// // import { fetchWithAuth } from "../utils/auth";
// // import { toast } from "react-hot-toast";

// // const BACKEND_URL = import.meta.env.VITE_API_URL;

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

// // const ProductCard = ({ product, index = 0 }) => {
// //   const { user } = useContext(authContext);
// //   const { setCart } = useContext(cartContext);
// //   const { toggleLike, products } = useProducts();
// //   const navigate = useNavigate();
// //   const prod = products[product._id] || product;
// //   const [loadingAdd, setLoadingAdd] = useState(false);

// //   // Validate product data
// //   if (!prod || typeof prod !== "object") {
// //     return (
// //       <div className="p-4">
// //         <p className="text-accent">Invalid product data</p>
// //       </div>
// //     );
// //   }

// //   const addToCart = async () => {
// //     if (!user) {
// //       toast.error("Please login to add to cart");
// //       navigate("/login");
// //       return;
// //     }
// //     if (product.isSold) {
// //       toast.error("This product is sold out");
// //       return;
// //     }
// //     if (product.stock === 0) {
// //       toast.error("This product is out of stock");
// //       return;
// //     }
// //     setLoadingAdd(true);
// //     try {
// //       const res = await fetchWithAuth(
// //         `${BACKEND_URL}/api/cart/add/${product._id}`,
// //         {
// //           method: "POST",
// //           headers: { "Content-Type": "application/json" },
// //           body: JSON.stringify({ quantity: 1 }),
// //         }
// //       );
// //       const data = await res.json();
// //       setLoadingAdd(false);
// //       if (!res.ok) return toast.error(data.message);
// //       toast.success("Added to cart! 🛒");
// //       setCart(data);
// //     } catch (err) {
// //       setLoadingAdd(false);
// //       toast.error("Server error");
// //     }
// //   };

// //   // Safely extract image path
// //   let imagePath = "";
// //   if (prod.images && Array.isArray(prod.images) && prod.images.length > 0) {
// //     imagePath = typeof prod.images[0] === "string" ? prod.images[0] : "";
// //   } else if (typeof prod.image === "string") {
// //     imagePath = prod.image;
// //   }

// //   const imgSrc = getImageUrl(imagePath);

// //   const rating = generateRating(prod._id);
// //   const stars = Math.round(rating);

// //   // Check if product is on sale
// //   const isOnSale =
// //     prod.originalPrice && Number(prod.originalPrice) > Number(prod.price);
// //   const discountPercent = isOnSale
// //     ? Math.round(
// //         ((Number(prod.originalPrice) - Number(prod.price)) /
// //           Number(prod.originalPrice)) *
// //           100
// //       )
// //     : 0;

// //   // Safely extract category
// //   const category =
// //     typeof prod.category === "string"
// //       ? prod.category
// //       : typeof prod.category === "object" && prod.category !== null
// //         ? prod.category.name || ""
// //         : "";

// //   // Check product availability
// //   const isProductAvailable = !prod.isSold && prod.stock > 0;
// //   const isLowStock = isProductAvailable && prod.stock <= 5;

// //   return (
// //     <div className="group relative overflow-hidden">
// //       {/* Availability Badge */}
// //       <div className="absolute top-4 left-4 z-30 flex flex-col gap-2">
// //         {/* Sold/Available Badge */}
// //         <div
// //           className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 ${
// //             prod.isSold ? "bg-accent text-dark" : "bg-lightBg/20 text-dark"
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
// //               <span>AVAILABLE</span>
// //             </>
// //           )}
// //         </div>

// //         {/* Stock Indicator */}
// //         {isProductAvailable && (
// //           <div className="px-3 py-1.5 rounded-lg bg-lightBg/20 text-dark text-xs font-bold flex items-center gap-1.5">
// //             <FaTag className="text-xs" />
// //             <span>{prod.stock} LEFT</span>
// //           </div>
// //         )}
// //       </div>

// //       {/* Discount Badge */}
// //       {isOnSale && (
// //         <div className="absolute top-4 right-4 z-20">
// //           <div className="px-3 py-1.5 bg-accent text-dark text-xs font-bold rounded-lg flex items-center gap-1">
// //             <FaTag className="text-xs" />
// //             <span>-{discountPercent}% OFF</span>
// //           </div>
// //         </div>
// //       )}

// //       {/* Like Button */}
// //       <button
// //         onClick={() => toggleLike(prod._id)}
// //         className="absolute top-20 right-4 z-20 p-2 bg-lightBg/20 rounded-full hover:bg-accent transition-colors duration-300"
// //       >
// //         <FaHeart
// //           className={`text-xl ${
// //             prod.isLiked ? "text-accent fill-accent" : "text-accent/70"
// //           }`}
// //         />
// //       </button>

// //       {/* Product Image Container - NO background */}
// //       <div className="relative rounded-2xl overflow-hidden">
// //         <Link to={`/product/${prod._id}`} className="block">
// //           <img
// //             src={getImageUrl(product.images?.[0] || product.image)}
// //             alt={typeof prod.name === "string" ? prod.name : "Product"}
// //             className="w-full h-60 object-contain p-4"
// //             loading="lazy"
// //             onError={(e) => {
// //               e.target.src =
// //                 "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop";
// //               e.target.className = "w-full h-60 object-contain p-4";
// //               e.target.onerror = null;
// //             }}
// //           />
// //         </Link>

// //         {/* Quick View Overlay */}
// //         <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
// //           <button
// //             onClick={() => navigate(`/product/${prod._id}`)}
// //             className="px-4 py-2 bg-primaryBg text-dark rounded-lg font-medium flex items-center gap-2"
// //           >
// //             <FaEye />
// //             Quick View
// //           </button>
// //         </div>
// //       </div>

// //       {/* Product Info - NO background */}
// //       <div className="p-4">
// //         {/* Category Tag */}
// //         {category && (
// //           <div className="mb-2">
// //             <span className="inline-block px-3 py-1 bg-lightBg/20 text-dark text-xs font-medium rounded-full">
// //               {category}
// //             </span>
// //           </div>
// //         )}

// //         {/* Product Name */}
// //         <Link to={`/product/${prod._id}`}>
// //           <h3 className="text-base font-bold text-dark mb-2 line-clamp-2 min-h-[2.5rem] hover:text-accent transition-colors duration-300">
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
// //                   i < stars ? "text-accent fill-accent" : "text-lightBg"
// //                 }`}
// //               />
// //             ))}
// //           </div>
// //           <span className="text-xs font-medium text-dark/70">
// //             {rating.toFixed(1)}
// //           </span>
// //         </div>

// //         {/* Price and Likes */}
// //         <div className="flex items-center justify-between mb-4">
// //           <div className="flex items-baseline gap-2">
// //             {/* Current Price */}
// //             <span className="text-xl font-bold text-dark">
// //               {formatPrice(prod.price)}
// //             </span>

// //             {/* Original Price if on sale */}
// //             {isOnSale && (
// //               <span className="text-sm text-dark/70 line-through">
// //                 {formatPrice(prod.originalPrice)}
// //               </span>
// //             )}
// //           </div>

// //           {/* Likes */}
// //           <div className="flex items-center gap-1.5 px-2 py-1 bg-lightBg/20 rounded-full">
// //             <FaHeart
// //               className={`text-xs ${
// //                 prod.isLiked ? "text-accent fill-accent" : "text-accent/70"
// //               }`}
// //             />
// //             <span className="text-xs font-medium text-dark">
// //               {formatLikes(prod.likesCount)}
// //             </span>
// //           </div>
// //         </div>

// //         {/* Action Buttons */}
// //         <div className="mb-3">
// //           {prod.isSold ? (
// //             <button
// //               className="w-full px-2 py-3 bg-lightBg text-dark rounded-lg font-semibold flex items-center justify-center gap-2 cursor-not-allowed"
// //               disabled
// //             >
// //               <FaTimesCircle className="text-lg" />
// //               <span>SOLD OUT</span>
// //             </button>
// //           ) : (
// //             <button
// //               className="w-full px-2 py-3 bg-accent hover:bg-lightBg text-dark rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors duration-300"
// //               onClick={addToCart}
// //               disabled={loadingAdd}
// //             >
// //               {loadingAdd ? (
// //                 <>
// //                   <div className="w-4 h-4 border-2 border-dark/30 border-t-dark rounded-full animate-spin" />
// //                   <span>ADDING...</span>
// //                 </>
// //               ) : (
// //                 <>
// //                   <FaShoppingCart className="text-lg" />
// //                   <span>ADD TO CART</span>
// //                 </>
// //               )}
// //             </button>
// //           )}
// //         </div>

// //         {/* Stock Warning */}
// //         {isLowStock && (
// //           <div className="p-2 bg-lightBg/20 rounded-lg">
// //             <div className="flex items-center gap-2">
// //               <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
// //               <span className="text-xs font-bold text-dark">
// //                 ⚠️ Only {prod.stock} left in stock!
// //               </span>
// //             </div>
// //           </div>
// //         )}
// //       </div>

// //       {/* Top seller badge (if applicable) */}
// //       {prod.isTopSeller && (
// //         <div className="absolute -top-2 -right-2 z-10">
// //           <div className="px-3 py-1 bg-accent text-dark text-xs font-bold rounded-full">
// //             🔥 Top Seller
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default ProductCard;
// import React, { useState, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { authContext } from "../Context/authContext";
// import { cartContext } from "../Context/cartContext";
// import {
//   FaHeart,
//   FaStar,
//   FaTag,
//   FaShoppingCart,
//   FaTimesCircle,
//   FaCheckCircle,
//   FaEye,
// } from "react-icons/fa";
// import { useProducts } from "../Context/ProductContext";
// import { getImageUrl } from "../utils/imageUtils";
// import { fetchWithAuth } from "../utils/auth";
// import { toast } from "react-hot-toast";

// const BACKEND_URL = import.meta.env.VITE_API_URL;

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
//   const { user } = useContext(authContext);
//   const { setCart } = useContext(cartContext);
//   const { toggleLike, products } = useProducts();
//   const navigate = useNavigate();
//   const prod = products[product._id] || product;
//   const [loadingAdd, setLoadingAdd] = useState(false);

//   // Validate product data
//   if (!prod || typeof prod !== "object") {
//     return (
//       <div className="p-4">
//         <p className="text-accent">Invalid product data</p>
//       </div>
//     );
//   }

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

//   // Check product availability
//   const isProductAvailable = !prod.isSold && prod.stock > 0;
//   const isLowStock = isProductAvailable && prod.stock <= 5;

//   return (
//     <div className="group relative overflow-hidden">
//       {/* Availability Badge */}
//       <div className="absolute top-4 left-4 z-30 flex flex-col gap-2">
//         {/* Sold/Available Badge */}
//         <div
//           className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 ${
//             prod.isSold ? "bg-accent text-dark" : "bg-lightBg text-dark"
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
//               <span>AVAILABLE</span>
//             </>
//           )}
//         </div>

//         {/* Stock Indicator */}
//         {isProductAvailable && (
//           <div className="px-3 py-1.5 rounded-lg bg-lightBg text-dark text-xs font-bold flex items-center gap-1.5">
//             <FaTag className="text-xs" />
//             <span>{prod.stock} LEFT</span>
//           </div>
//         )}
//       </div>

//       {/* Discount Badge */}
//       {isOnSale && (
//         <div className="absolute top-4 right-4 z-20">
//           <div className="px-3 py-1.5 bg-accent text-dark text-xs font-bold rounded-lg flex items-center gap-1">
//             <FaTag className="text-xs" />
//             <span>-{discountPercent}% OFF</span>
//           </div>
//         </div>
//       )}

//       {/* Like Button */}
//       <button
//         onClick={() => toggleLike(prod._id)}
//         className="absolute top-20 right-4 z-20 p-2 bg-lightBg rounded-full hover:bg-accent transition-colors duration-300"
//       >
//         <FaHeart
//           className={`text-xl ${
//             prod.isLiked ? "text-accent fill-accent" : "text-dark/70"
//           }`}
//         />
//       </button>

//       {/* Product Image Container - NO background */}
//       <div className="relative rounded-2xl overflow-hidden">
//         <Link to={`/product/${prod._id}`} className="block">
//           <img
//             src={getImageUrl(product.images?.[0] || product.image)}
//             alt={typeof prod.name === "string" ? prod.name : "Product"}
//             className="w-full h-60 object-contain p-4"
//             loading="lazy"
//             onError={(e) => {
//               e.target.src =
//                 "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop";
//               e.target.className = "w-full h-60 object-contain p-4";
//               e.target.onerror = null;
//             }}
//           />
//         </Link>

//         {/* Quick View Overlay */}
//         <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
//           <button
//             onClick={() => navigate(`/product/${prod._id}`)}
//             className="px-4 py-2 bg-primaryBg text-dark rounded-lg font-medium flex items-center gap-2"
//           >
//             <FaEye />
//             Quick View
//           </button>
//         </div>
//       </div>

//       {/* Product Info - NO background */}
//       <div className="p-4">
//         {/* Category Tag */}
//         {category && (
//           <div className="mb-2">
//             <span className="inline-block px-3 py-1 bg-lightBg text-dark text-xs font-medium rounded-full">
//               {category}
//             </span>
//           </div>
//         )}

//         {/* Product Name */}
//         <Link to={`/product/${prod._id}`}>
//           <h3 className="text-base font-bold text-dark mb-2 line-clamp-2 min-h-[2.5rem] hover:text-accent transition-colors duration-300">
//             {typeof prod.name === "string" ? prod.name : "Unnamed Product"}
//           </h3>
//         </Link>

//         {/* Rating */}
//         <div className="flex items-center gap-2 mb-3">
//           <div className="flex items-center gap-0.5">
//             {[...Array(5)].map((_, i) => (
//               <FaStar
//                 key={i}
//                 className={`text-sm ${
//                   i < stars ? "text-accent fill-accent" : "text-lightBg"
//                 }`}
//               />
//             ))}
//           </div>
//           <span className="text-xs font-medium text-dark/70">
//             {rating.toFixed(1)}
//           </span>
//         </div>

//         {/* Price and Likes */}
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-baseline gap-2">
//             {/* Current Price */}
//             <span className="text-xl font-bold text-dark">
//               {formatPrice(prod.price)}
//             </span>

//             {/* Original Price if on sale */}
//             {isOnSale && (
//               <span className="text-sm text-dark/70 line-through">
//                 {formatPrice(prod.originalPrice)}
//               </span>
//             )}
//           </div>

//           {/* Likes */}
//           <div className="flex items-center gap-1.5 px-2 py-1 bg-lightBg rounded-full">
//             <FaHeart
//               className={`text-xs ${
//                 prod.isLiked ? "text-accent fill-accent" : "text-dark/70"
//               }`}
//             />
//             <span className="text-xs font-medium text-dark">
//               {formatLikes(prod.likesCount)}
//             </span>
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="mb-3">
//           {prod.isSold ? (
//             <button
//               className="w-full px-2 py-3 bg-lightBg text-dark rounded-lg font-semibold flex items-center justify-center gap-2 cursor-not-allowed"
//               disabled
//             >
//               <FaTimesCircle className="text-lg" />
//               <span>SOLD OUT</span>
//             </button>
//           ) : (
//             <button
//               className="w-full px-2 py-3 bg-accent hover:bg-lightBg text-dark rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors duration-300"
//               onClick={addToCart}
//               disabled={loadingAdd}
//             >
//               {loadingAdd ? (
//                 <>
//                   <div className="w-4 h-4 border-2 border-dark/30 border-t-dark rounded-full animate-spin" />
//                   <span>ADDING...</span>
//                 </>
//               ) : (
//                 <>
//                   <FaShoppingCart className="text-lg" />
//                   <span>ADD TO CART</span>
//                 </>
//               )}
//             </button>
//           )}
//         </div>

//         {/* Stock Warning */}
//         {isLowStock && (
//           <div className="p-2 bg-lightBg rounded-lg">
//             <div className="flex items-center gap-2">
//               <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
//               <span className="text-xs font-bold text-dark">
//                 ⚠️ Only {prod.stock} left in stock!
//               </span>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Top seller badge (if applicable) */}
//       {prod.isTopSeller && (
//         <div className="absolute -top-2 -right-2 z-10">
//           <div className="px-3 py-1 bg-accent text-dark text-xs font-bold rounded-full">
//             🔥 Top Seller
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProductCard;
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../Context/authContext";
import { cartContext } from "../Context/cartContext";
import {
  FaHeart,
  FaStar,
  FaTag,
  FaShoppingCart,
  FaTimesCircle,
  FaCheckCircle,
  FaEye,
} from "react-icons/fa";
import { useProducts } from "../Context/ProductContext";
import { getImageUrl } from "../utils/imageUtils";
import { fetchWithAuth } from "../utils/auth";
import { toast } from "react-hot-toast";

const BACKEND_URL = import.meta.env.VITE_API_URL;

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
  const { user } = useContext(authContext);
  const { setCart } = useContext(cartContext);
  const { toggleLike, products } = useProducts();
  const navigate = useNavigate();
  const prod = products[product._id] || product;
  const [loadingAdd, setLoadingAdd] = useState(false);

  // Validate product data
  if (!prod || typeof prod !== "object") {
    return (
      <div className="p-4">
        <p className="text-accent dark:text-accent/80">Invalid product data</p>
      </div>
    );
  }

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

  // Check product availability
  const isProductAvailable = !prod.isSold && prod.stock > 0;
  const isLowStock = isProductAvailable && prod.stock <= 5;

  return (
    <div className="group relative overflow-hidden">
      {/* Availability Badge */}
      <div className="absolute top-4 left-4 z-30 flex flex-col gap-2">
        {/* Sold/Available Badge */}
        <div
          className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 ${
            prod.isSold
              ? "bg-accent dark:bg-accent/80 text-dark dark:text-white"
              : "bg-lightBg dark:bg-lightBg/30 text-dark dark:text-white"
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
              <span>AVAILABLE</span>
            </>
          )}
        </div>

        {/* Stock Indicator */}
        {isProductAvailable && (
          <div className="px-3 py-1.5 rounded-lg bg-lightBg dark:bg-lightBg/30 text-dark dark:text-white text-xs font-bold flex items-center gap-1.5">
            <FaTag className="text-xs" />
            <span>{prod.stock} LEFT</span>
          </div>
        )}
      </div>

      {/* Discount Badge */}
      {isOnSale && (
        <div className="absolute top-4 right-4 z-20">
          <div className="px-3 py-1.5 bg-accent dark:bg-accent/80 text-dark dark:text-white text-xs font-bold rounded-lg flex items-center gap-1">
            <FaTag className="text-xs" />
            <span>-{discountPercent}% OFF</span>
          </div>
        </div>
      )}

      {/* Like Button */}
      <button
        onClick={() => toggleLike(prod._id)}
        className="absolute top-20 right-4 z-20 p-2 bg-lightBg dark:bg-lightBg/30 rounded-full hover:bg-accent dark:hover:bg-accent/80 transition-colors duration-300"
      >
        <FaHeart
          className={`text-xl ${
            prod.isLiked
              ? "text-accent dark:text-accent/80 fill-accent dark:fill-accent/80"
              : "text-dark/70 dark:text-gray-300"
          }`}
        />
      </button>

      {/* Product Image Container - NO background */}
      <div className="relative rounded-2xl overflow-hidden">
        <Link to={`/product/${prod._id}`} className="block">
          <img
            src={getImageUrl(product.images?.[0] || product.image)}
            alt={typeof prod.name === "string" ? prod.name : "Product"}
            className="w-full h-60 object-contain p-4"
            loading="lazy"
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop";
              e.target.className = "w-full h-60 object-contain p-4";
              e.target.onerror = null;
            }}
          />
        </Link>

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={() => navigate(`/product/${prod._id}`)}
            className="px-4 py-2 bg-primaryBg dark:bg-gray-800 text-dark dark:text-white rounded-lg font-medium flex items-center gap-2"
          >
            <FaEye />
            Quick View
          </button>
        </div>
      </div>

      {/* Product Info - NO background */}
      <div className="p-4">
        {/* Category Tag */}
        {category && (
          <div className="mb-2">
            <span className="inline-block px-3 py-1 bg-lightBg dark:bg-lightBg/30 text-dark dark:text-white text-xs font-medium rounded-full">
              {category}
            </span>
          </div>
        )}

        {/* Product Name */}
        <Link to={`/product/${prod._id}`}>
          <h3 className="text-base font-bold text-dark dark:text-white mb-2 line-clamp-2 min-h-[2.5rem] hover:text-accent dark:hover:text-accent/80 transition-colors duration-300">
            {typeof prod.name === "string" ? prod.name : "Unnamed Product"}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`text-sm ${
                  i < stars
                    ? "text-accent dark:text-accent/80 fill-accent dark:fill-accent/80"
                    : "text-lightBg dark:text-lightBg/30"
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-medium text-dark/70 dark:text-gray-300">
            {rating.toFixed(1)}
          </span>
        </div>

        {/* Price and Likes */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-baseline gap-2">
            {/* Current Price */}
            <span className="text-xl font-bold text-dark dark:text-white">
              {formatPrice(prod.price)}
            </span>

            {/* Original Price if on sale */}
            {isOnSale && (
              <span className="text-sm text-dark/70 dark:text-gray-300 line-through">
                {formatPrice(prod.originalPrice)}
              </span>
            )}
          </div>

          {/* Likes */}
          <div className="flex items-center gap-1.5 px-2 py-1 bg-lightBg dark:bg-lightBg/30 rounded-full">
            <FaHeart
              className={`text-xs ${
                prod.isLiked
                  ? "text-accent dark:text-accent/80 fill-accent dark:fill-accent/80"
                  : "text-dark/70 dark:text-gray-300"
              }`}
            />
            <span className="text-xs font-medium text-dark dark:text-white">
              {formatLikes(prod.likesCount)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mb-3">
          {prod.isSold ? (
            <button
              className="w-full px-2 py-3 bg-lightBg dark:bg-lightBg/30 text-dark dark:text-white rounded-lg font-semibold flex items-center justify-center gap-2 cursor-not-allowed"
              disabled
            >
              <FaTimesCircle className="text-lg" />
              <span>SOLD OUT</span>
            </button>
          ) : (
            <button
              className="w-full px-2 py-3 bg-accent dark:bg-accent/80 hover:bg-lightBg dark:hover:bg-lightBg/30 text-dark dark:text-white rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors duration-300"
              onClick={addToCart}
              disabled={loadingAdd}
            >
              {loadingAdd ? (
                <>
                  <div className="w-4 h-4 border-2 border-dark/30 dark:border-white/30 border-t-dark dark:border-t-white rounded-full animate-spin" />
                  <span>ADDING...</span>
                </>
              ) : (
                <>
                  <FaShoppingCart className="text-lg" />
                  <span>ADD TO CART</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Stock Warning */}
        {isLowStock && (
          <div className="p-2 bg-lightBg dark:bg-lightBg/30 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent dark:bg-accent/80 rounded-full animate-pulse" />
              <span className="text-xs font-bold text-dark dark:text-white">
                ⚠️ Only {prod.stock} left in stock!
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Top seller badge (if applicable) */}
      {prod.isTopSeller && (
        <div className="absolute -top-2 -right-2 z-10">
          <div className="px-3 py-1 bg-accent dark:bg-accent/80 text-dark dark:text-white text-xs font-bold rounded-full">
            🔥 Top Seller
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
