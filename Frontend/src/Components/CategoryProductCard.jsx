import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHeart, FaStar, FaTag, FaShoppingCart } from "react-icons/fa";
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

const CategoryProductCard = ({ product, index = 0 }) => {
  const { toggleLike, products } = useProducts();
  const prod = products[product._id] || product;

  if (!prod || typeof prod !== "object") {
    return null;
  }

  // ✅ Use getImageUrl instead of manual URL construction
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

  return (
    <motion.div
      className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 dark:border-slate-700 hover:border-amber-200 dark:hover:border-amber-700"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.05, type: "spring" }}
      whileHover={{
        y: -6,
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
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative px-3 py-1.5 bg-gradient-to-r from-red-600 to-pink-600 text-white text-xs font-bold rounded-lg flex items-center gap-1 shadow-lg">
              <FaTag className="text-xs" />
              <span>-{discountPercent}%</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Like Button */}
      <motion.button
        onClick={() => toggleLike(prod._id)}
        className="absolute top-4 right-4 z-20 p-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 group/like"
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
                ? "text-red-500 fill-red-500 drop-shadow-lg"
                : "text-gray-400 group-hover/like:text-red-300"
            }`}
          />
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

      {/* Product Image */}
      <div className="relative overflow-hidden">
        <Link to={`/product/${prod._id}`} className="block">
          <motion.img
            src={imgSrc}
            alt={typeof prod.name === "string" ? prod.name : "Product"}
            className="w-full h-64 object-contain p-6 transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.target.src = getImageUrl(null); // Use fallback from imageUtils
              e.target.className =
                "w-full h-64 object-cover p-6 transition-transform duration-500 group-hover:scale-105";
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
          />
        </Link>

        {/* SOLD / AVAILABLE Badge */}
        <div className="absolute bottom-4 left-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 + 0.4 }}
            className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm border ${
              prod.isSold
                ? "bg-gradient-to-r from-red-500/90 to-red-600/90 text-white border-red-400/30"
                : "bg-gradient-to-r from-green-500/90 to-emerald-600/90 text-white border-green-400/30"
            }`}
          >
            {prod.isSold ? "Sold Out" : "In Stock"}
          </motion.div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5">
        <Link to={`/product/${prod._id}`}>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 line-clamp-2 min-h-[3.5rem] group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300">
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
                    ? "text-amber-500 fill-amber-500 drop-shadow-sm"
                    : "text-gray-300 dark:text-slate-600"
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-slate-300">
            {rating.toFixed(1)}
          </span>
        </div>

        {/* Price and Likes */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-800 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
              {formatPrice(prod.price)}
            </span>
            {isOnSale && (
              <span className="text-sm text-gray-500 dark:text-slate-500 line-through">
                {formatPrice(prod.originalPrice)}
              </span>
            )}
          </div>

          <motion.div
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-full border border-rose-200 dark:border-rose-800/30 hover:border-rose-300 dark:hover:border-rose-700 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaHeart
              className={`text-sm ${prod.isLiked ? "text-rose-500 fill-rose-500" : "text-rose-400"}`}
            />
            <span className="text-sm font-medium text-rose-700 dark:text-rose-300">
              {formatLikes(prod.likesCount)}
            </span>
          </motion.div>
        </div>

        {/* Quick Add to Cart */}
        <motion.button
          className="w-full mt-4 py-2.5 bg-gradient-to-r from-amber-500/10 to-amber-600/10 hover:from-amber-500/20 hover:to-amber-600/20 text-amber-700 dark:text-amber-300 rounded-xl font-semibold flex items-center justify-center gap-2 border border-amber-500/30 hover:border-amber-500/50 transition-all duration-300 group/btn"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => {
            e.preventDefault();
            window.location.href = `/product/${prod._id}`;
          }}
        >
          <FaShoppingCart className="group-hover/btn:scale-110 transition-transform duration-300" />
          <span>Quick Add</span>
        </motion.button>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
};

export default CategoryProductCard;
