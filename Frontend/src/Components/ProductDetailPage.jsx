import React, { useEffect, useState, useContext, useRef } from "react";
import { authContext } from "../Context/authContext";
import { cartContext } from "../Context/cartContext";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
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
  FaChevronCircleLeft,
  FaChevronCircleRight,
  FaInfoCircle,
  FaCheckCircle,
  FaLeaf,
  FaFlask,
  FaBoxOpen,
  FaCalendarAlt,
  FaEye,
  FaShippingFast,
  FaAward,
  FaRecycle,
  FaGem,
  FaRocket,
  FaMagic,
  FaCrown,
  FaBookOpen,
  FaClipboardList,
  FaTemperatureLow,
  FaExpandAlt,
  FaWater,
} from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import { GiMedicines } from "react-icons/gi";
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

  // If it's already a full URL, return as is
  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  // If it's a relative path, prepend the backend URL
  // Clean up path: replace backslashes with forward slashes and ensure it starts with /
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
  const [hoveredCarousel, setHoveredCarousel] = useState(null);
  const [activeDescriptionTab, setActiveDescriptionTab] = useState("overview");

  const enrichProductForClient = (p) => {
    if (!p) return p;

    // Process images
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

  // Build grouped related products
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

  // BEAUTIFUL AND SPACIOUS DESCRIPTION SECTION - FULL WIDTH
  const renderDescription = (description) => {
    if (!description) {
      return (
        <div className="w-full mt-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500/10 to-rose-500/10 border border-amber-500/20 dark:border-amber-500/30 backdrop-blur-sm mb-4">
              <IoSparkles className="text-amber-600 dark:text-amber-400" />
              <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
                Product Details
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 dark:text-white mb-4">
              Product Information
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Detailed information about this product
            </p>
          </div>

          <div className="w-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-white/20 dark:border-slate-700/50 shadow-2xl">
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-amber-500/10 to-rose-500/10 mb-6">
                <FaInfoCircle className="text-amber-600 dark:text-amber-400 text-3xl" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-slate-800 dark:text-white mb-3">
                Product Details Coming Soon
              </h3>
              <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto text-lg">
                Detailed information about this product will be added soon.
                Check back later for complete specifications and features.
              </p>
            </div>
          </div>
        </div>
      );
    }

    const descriptionTabs = [
      {
        id: "overview",
        label: "Overview",
        icon: <FaBookOpen />,
        color: "from-blue-500 to-cyan-500",
        description: "General product introduction and highlights",
      },
      {
        id: "features",
        label: "Key Features",
        icon: <FaCheckCircle />,
        color: "from-emerald-500 to-teal-500",
        description: "Main features and specifications",
      },
      {
        id: "benefits",
        label: "Benefits",
        icon: <FaLeaf />,
        color: "from-green-500 to-emerald-500",
        description: "Advantages and benefits of using this product",
      },
      {
        id: "ingredients",
        label: "Ingredients",
        icon: <FaFlask />,
        color: "from-purple-500 to-pink-500",
        description: "Composition and materials used",
      },
      {
        id: "usage",
        label: "How to Use",
        icon: <FaClipboardList />,
        color: "from-amber-500 to-orange-500",
        description: "Usage instructions and recommendations",
      },
      {
        id: "storage",
        label: "Storage",
        icon: <FaTemperatureLow />,
        color: "from-indigo-500 to-blue-500",
        description: "Storage conditions and shelf life",
      },
    ];

    // Check what content is available
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

    // Get current active tab content
    const currentContent = getTabContent(activeDescriptionTab);
    const currentTab = descriptionTabs.find(
      (tab) => tab.id === activeDescriptionTab
    );

    // Count tabs with content
    const tabsWithContent = descriptionTabs.filter((tab) =>
      hasContentForTab(tab.id)
    ).length;

    const renderContent = () => {
      // If no content at all
      if (tabsWithContent === 0) {
        return (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 mb-8">
              <FaBookOpen className="text-slate-400 dark:text-slate-500 text-4xl" />
            </div>
            <h3 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
              Product Details Coming Soon
            </h3>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg mb-8">
              Our team is working on adding detailed information about this
              product. Check back soon for complete specifications, features,
              and usage instructions.
            </p>
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500/10 to-amber-600/10 text-amber-700 dark:text-amber-300">
              <IoSparkles className="text-amber-500" />
              <span className="text-lg font-medium">Details in progress</span>
            </div>
          </div>
        );
      }

      // If current tab has no content but other tabs do
      if (!hasContentForTab(activeDescriptionTab)) {
        return (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 mb-8">
              {currentTab?.icon &&
                React.cloneElement(currentTab.icon, {
                  className: "text-slate-400 dark:text-slate-500 text-3xl",
                })}
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-slate-800 dark:text-white mb-4">
              {currentTab?.label} Details Coming Soon
            </h3>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-lg mb-8">
              This section is being updated with detailed information. Please
              check other sections for available product details.
            </p>
            <button
              onClick={() => {
                // Find first tab with content
                const firstTabWithContent = descriptionTabs.find((tab) =>
                  hasContentForTab(tab.id)
                );
                if (firstTabWithContent) {
                  setActiveDescriptionTab(firstTabWithContent.id);
                }
              }}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium text-lg hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300"
            >
              View Available Details
            </button>
          </div>
        );
      }

      // Render content based on type
      if (Array.isArray(currentContent)) {
        return (
          <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {currentContent.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="w-full"
                >
                  <div className="w-full h-full rounded-2xl bg-gradient-to-br from-white/60 to-white/40 dark:from-slate-800/60 dark:to-slate-800/40 border border-slate-200/50 dark:border-slate-700/50 p-8 hover:shadow-2xl transition-all duration-300">
                    <div className="flex flex-col h-full">
                      <div className="flex items-start gap-6 mb-6">
                        <div className="flex-shrink-0">
                          <div
                            className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${currentTab?.color} flex items-center justify-center shadow-xl`}
                          >
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                              {currentTab?.icon &&
                                React.cloneElement(currentTab.icon, {
                                  className: "text-white text-lg",
                                })}
                            </div>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-amber-500/20 to-amber-600/20 flex items-center justify-center flex-shrink-0">
                              <span className="text-sm font-bold text-amber-600 dark:text-amber-400">
                                {index + 1}
                              </span>
                            </div>
                            <h4 className="text-lg font-semibold text-slate-800 dark:text-white truncate">
                              {currentTab?.label} {index + 1}
                            </h4>
                          </div>
                        </div>
                      </div>

                      <div className="flex-1">
                        <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed break-words">
                          {item}
                        </p>
                      </div>
                    </div>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-bl-3xl" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );
      }

      // Render string content
      return (
        <div className="w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full rounded-3xl bg-gradient-to-br from-white/60 to-white/40 dark:from-slate-800/60 dark:to-slate-800/40 border border-slate-200/50 dark:border-slate-700/50 p-10 lg:p-14"
          >
            <div className="flex flex-col lg:flex-row lg:items-start gap-10">
              <div className="flex-shrink-0">
                <div
                  className={`w-20 h-20 lg:w-24 lg:h-24 rounded-3xl bg-gradient-to-r ${currentTab?.color} flex items-center justify-center shadow-2xl`}
                >
                  {currentTab?.icon &&
                    React.cloneElement(currentTab.icon, {
                      className: "text-white text-2xl",
                    })}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="w-full">
                  <div className="text-slate-700 dark:text-slate-300 leading-relaxed text-xl whitespace-pre-line break-words">
                    {currentContent.split("\n").map((line, index) => (
                      <p key={index} className="mb-6 last:mb-0">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full" />
          </motion.div>

          {/* Additional info for longer content */}
          {currentContent.length > 200 && (
            <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
              <div className="w-full bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border border-emerald-500/10 rounded-3xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <FaGem className="text-emerald-500 text-2xl" />
                  <h4 className="font-bold text-slate-800 dark:text-white text-xl">
                    Key Takeaway
                  </h4>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-lg">
                  This product offers premium quality and exceptional value for
                  your needs.
                </p>
              </div>
              <div className="w-full bg-gradient-to-br from-blue-500/5 to-cyan-500/5 border border-blue-500/10 rounded-3xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <FaRocket className="text-blue-500 text-2xl" />
                  <h4 className="font-bold text-slate-800 dark:text-white text-xl">
                    Perfect For
                  </h4>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-lg">
                  Everyday use, special occasions, and professional
                  applications.
                </p>
              </div>
              <div className="w-full bg-gradient-to-br from-amber-500/5 to-orange-500/5 border border-amber-500/10 rounded-3xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <FaMagic className="text-amber-500 text-2xl" />
                  <h4 className="font-bold text-slate-800 dark:text-white text-xl">
                    Unique Feature
                  </h4>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-lg">
                  Innovative design with advanced technology for superior
                  performance.
                </p>
              </div>
            </div>
          )}
        </div>
      );
    };

    return (
      <div className="w-full mt-16">
        {/* Full Width Description Header */}
        <div className="w-full bg-gradient-to-r from-emerald-50/30 to-teal-50/20 dark:from-slate-900/80 dark:to-slate-800/80 py-16 mb-12">
          <div className="w-full">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border border-emerald-500/20 dark:border-emerald-500/30 backdrop-blur-sm mb-8 shadow-lg">
                <IoSparkles className="text-emerald-600 dark:text-emerald-400 animate-pulse" />
                <span className="text-lg font-medium text-emerald-700 dark:text-emerald-300">
                  Complete Product Details{" "}
                  {tabsWithContent > 0 ? `(${tabsWithContent} sections)` : ""}
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                <span className="text-slate-800 dark:text-white">Explore </span>
                <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                  Complete Details
                </span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto text-xl">
                {tabsWithContent > 0
                  ? "Discover every aspect of this premium product with our detailed breakdown"
                  : "Detailed product specifications and features coming soon"}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Main Content Area - Full Width */}
        <div className="w-full">
          {/* Tabs Navigation - Full Width */}
          {tabsWithContent > 0 && (
            <div className="w-full mb-12 overflow-x-auto">
              <div className="flex flex-nowrap gap-4 min-w-max pb-4">
                {descriptionTabs.map((tab) => {
                  const hasContent = hasContentForTab(tab.id);
                  const isActive = activeDescriptionTab === tab.id;

                  if (!hasContent) return null;

                  return (
                    <motion.button
                      key={tab.id}
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setActiveDescriptionTab(tab.id)}
                      className={`px-8 py-5 rounded-2xl font-medium transition-all duration-300 flex items-center gap-4 flex-shrink-0 text-lg whitespace-nowrap ${
                        isActive
                          ? `bg-gradient-to-r ${tab.color} text-white shadow-2xl`
                          : "bg-white/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 hover:shadow-xl"
                      }`}
                    >
                      <span className="text-xl">{tab.icon}</span>
                      {tab.label}
                      <div
                        className={`w-2 h-2 rounded-full ${isActive ? "bg-white" : "bg-slate-400"}`}
                      />
                    </motion.button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab Content - Full Width Spacious Container */}
          <motion.div
            key={activeDescriptionTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="w-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-white/20 dark:border-slate-700/50 shadow-2xl"
          >
            {tabsWithContent > 0 && (
              <div className="w-full flex flex-col lg:flex-row lg:items-center justify-between mb-12 pb-10 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-6 mb-6 lg:mb-0 min-w-0">
                  <div
                    className={`p-4 rounded-3xl bg-gradient-to-r ${currentTab?.color}/20 border ${currentTab?.color.replace("from-", "border-").replace(" to-", "/20")} flex-shrink-0`}
                  >
                    {currentTab?.icon}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-3xl lg:text-4xl font-bold text-slate-800 dark:text-white mb-3 truncate">
                      {currentTab?.label}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-lg truncate">
                      {currentTab?.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="px-6 py-3 rounded-full bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 whitespace-nowrap">
                    <span className="text-lg font-medium text-slate-700 dark:text-slate-300">
                      Section{" "}
                      {descriptionTabs
                        .filter((tab) => hasContentForTab(tab.id))
                        .findIndex((tab) => tab.id === activeDescriptionTab) +
                        1}{" "}
                      of {tabsWithContent}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 flex-shrink-0">
                    <FaExpandAlt className="text-emerald-500" />
                  </div>
                </div>
              </div>
            )}

            {/* Content Display with Plenty of Space */}
            <div className="w-full min-h-[500px]">{renderContent()}</div>

            {/* Progress and Stats - Full Width */}
            {tabsWithContent > 0 && (
              <div className="w-full mt-16 pt-12 border-t border-slate-200 dark:border-slate-700">
                <div className="w-full flex flex-col lg:flex-row gap-10">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-800 dark:text-white text-2xl mb-8">
                      Information Overview
                    </h4>
                    <div className="w-full space-y-6">
                      {descriptionTabs.map((tab) => {
                        const hasContent = hasContentForTab(tab.id);
                        if (!hasContent) return null;

                        return (
                          <div
                            key={tab.id}
                            className="w-full flex items-center gap-6 p-4 rounded-2xl bg-gradient-to-r from-white/50 to-white/30 dark:from-slate-800/50 dark:to-slate-800/30 border border-slate-200/50 dark:border-slate-700/50"
                          >
                            <div
                              className={`w-4 h-4 rounded-full ${tab.id === activeDescriptionTab ? "bg-gradient-to-r from-emerald-500 to-teal-500" : "bg-slate-300 dark:bg-slate-600"} flex-shrink-0`}
                            />
                            <span className="text-lg text-slate-700 dark:text-slate-300 flex-1 truncate">
                              {tab.label}
                            </span>
                            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-700 dark:text-emerald-300 font-medium whitespace-nowrap flex-shrink-0">
                              Complete
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="lg:w-80 flex-shrink-0">
                    <div className="w-full bg-gradient-to-br from-emerald-500/5 to-teal-500/5 border border-emerald-500/20 rounded-3xl p-8">
                      <div className="text-center">
                        <div className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent mb-4">
                          {tabsWithContent}/6
                        </div>
                        <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
                          Sections Completed
                        </p>
                        <div className="relative">
                          <div className="w-full h-4 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden mb-4">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{
                                width: `${(tabsWithContent / 6) * 100}%`,
                              }}
                              transition={{ duration: 1, ease: "easeOut" }}
                              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                            />
                          </div>
                          <div className="text-sm text-slate-500 dark:text-slate-400">
                            {Math.round((tabsWithContent / 6) * 100)}% Complete
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Key Features Highlight - Full Width */}
          <div className="w-full mt-16">
            <div className="w-full flex flex-col lg:flex-row lg:items-center justify-between mb-12">
              <div className="min-w-0">
                <h3 className="text-3xl lg:text-4xl font-bold text-slate-800 dark:text-white flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 flex items-center justify-center flex-shrink-0">
                    <FaAward className="text-emerald-500 text-2xl" />
                  </div>
                  <span className="truncate">Product Highlights</span>
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-xl max-w-3xl">
                  Discover what makes this product special and unique
                </p>
              </div>
              {description.keyFeatures &&
                Array.isArray(description.keyFeatures) &&
                description.keyFeatures.length > 0 && (
                  <div className="mt-4 lg:mt-0 flex-shrink-0">
                    <span className="px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-700 dark:text-emerald-300 font-medium text-lg whitespace-nowrap">
                      {description.keyFeatures.length} Key Features
                    </span>
                  </div>
                )}
            </div>

            {/* Show key features if available, otherwise show default highlights */}
            {description.keyFeatures &&
            Array.isArray(description.keyFeatures) &&
            description.keyFeatures.length > 0 ? (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {description.keyFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="w-full bg-gradient-to-br from-white/70 to-white/50 dark:from-slate-800/70 dark:to-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 transition-all duration-300 group"
                  >
                    <div className="w-full flex flex-col h-full">
                      <div className="flex items-center gap-6 mb-6">
                        <div className="relative flex-shrink-0">
                          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 flex items-center justify-center">
                              <FaCheckCircle className="text-white text-lg" />
                            </div>
                          </div>
                          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center text-sm text-white font-bold">
                            {index + 1}
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-slate-800 dark:text-white text-xl mb-4 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors truncate">
                          Premium Feature
                        </h4>
                        <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed break-words">
                          {feature}
                        </p>
                      </div>

                      <div className="mt-6 pt-6 border-t border-slate-200/50 dark:border-slate-700/50">
                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                          <span>Included</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: <FaGem />,
                    title: "Premium Quality",
                    desc: "Made with high-quality materials and superior craftsmanship for lasting durability",
                    color: "from-purple-500 to-pink-500",
                  },
                  {
                    icon: <FaShieldAlt />,
                    title: "Safety Assured",
                    desc: "Rigorously tested and certified for safe usage in all conditions",
                    color: "from-blue-500 to-cyan-500",
                  },
                  {
                    icon: <FaLeaf />,
                    title: "Eco-Friendly",
                    desc: "Environmentally conscious design with sustainable materials",
                    color: "from-green-500 to-emerald-500",
                  },
                  {
                    icon: <FaRocket />,
                    title: "High Performance",
                    desc: "Engineered for exceptional results and reliable performance",
                    color: "from-orange-500 to-red-500",
                  },
                  {
                    icon: <FaMagic />,
                    title: "Innovative Design",
                    desc: "Modern design incorporating advanced features and technology",
                    color: "from-indigo-500 to-purple-500",
                  },
                  {
                    icon: <FaCrown />,
                    title: "Premium Value",
                    desc: "Excellent quality combined with competitive pricing",
                    color: "from-amber-500 to-yellow-500",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="w-full bg-gradient-to-br from-white/70 to-white/50 dark:from-slate-800/70 dark:to-slate-800/50 backdrop-blur-sm rounded-3xl p-8 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-2xl transition-all duration-300"
                  >
                    <div className="w-full flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div
                          className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${item.color}/10 flex items-center justify-center`}
                        >
                          <div
                            className={`w-12 h-12 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center`}
                          >
                            {React.cloneElement(item.icon, {
                              className: "text-white text-lg",
                            })}
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-800 dark:text-white text-xl mb-4 truncate">
                          {item.title}
                        </h4>
                        <p className="text-slate-600 dark:text-slate-300 text-lg break-words">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const NextArrow = ({ onClick }) => (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white flex items-center justify-center shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 border-2 border-white/20 backdrop-blur-sm transition-all duration-300"
      aria-label="Next image"
    >
      <FaChevronRight className="text-lg" />
    </motion.button>
  );

  const PrevArrow = ({ onClick }) => (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white flex items-center justify-center shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 border-2 border-white/20 backdrop-blur-sm transition-all duration-300"
      aria-label="Previous image"
    >
      <FaChevronLeft className="text-lg" />
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
      <div className="w-3 h-3 rounded-full bg-gradient-to-r from-amber-400/40 to-amber-600/40 hover:from-amber-400 hover:to-amber-600 transition-all duration-300 cursor-pointer" />
    ),
    appendDots: (dots) => (
      <ul className="flex justify-center gap-3 mt-4">{dots}</ul>
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
    const contentRef = useRef(null);
    const animationRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [displayItems, setDisplayItems] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);

    // Use IntersectionObserver to check if carousel is visible
    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            setIsVisible(entry.isIntersecting);
          });
        },
        { threshold: 0.1 }
      );

      if (carouselRef.current) {
        observer.observe(carouselRef.current);
      }

      return () => {
        if (carouselRef.current) {
          observer.unobserve(carouselRef.current);
        }
      };
    }, []);

    useEffect(() => {
      if (items.length === 0) return;

      // Create enough duplicates for seamless infinite scroll
      // We need enough items to fill at least 3 screens
      const screenItems = Math.ceil(window.innerWidth / 288) + 1; // 288 is w-72 (288px)
      const duplicatesNeeded = 1;
      const duplicatedItems = [];
      for (let i = 0; i < duplicatesNeeded; i++) {
        duplicatedItems.push(...items);
      }
      setDisplayItems(duplicatedItems);
    }, [items]);

    useEffect(() => {
      const handleScroll = () => {
        if (!carouselRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        setIsAtStart(scrollLeft <= 1);
        setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
      };

      const carousel = carouselRef.current;
      if (carousel) {
        carousel.addEventListener("scroll", handleScroll);
        return () => carousel.removeEventListener("scroll", handleScroll);
      }
    }, []);

    useEffect(() => {
      // Don't animate if carousel is not visible or paused/hovered
      if (
        !carouselRef.current ||
        !contentRef.current ||
        items.length === 0 ||
        !isVisible ||
        isPaused ||
        isHovered
      ) {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
        return;
      }

      const carousel = carouselRef.current;
      const content = contentRef.current;
      let position = 0;
      const speed = 1.5; // Speed in pixels per frame

      const animate = () => {
        position -= speed;

        // If we've scrolled past one set of items, reset position
        const contentWidth =
          content.scrollWidth / (displayItems.length / items.length);
        if (Math.abs(position) >= contentWidth) {
          position = 0;
        }

        carousel.scrollLeft = position;
        animationRef.current = requestAnimationFrame(animate);
      };

      // Start animation
      animationRef.current = requestAnimationFrame(animate);

      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
      };
    }, [items, isVisible, isPaused, isHovered, displayItems.length]);

    const handleMouseEnter = () => {
      setIsHovered(true);
      setIsPaused(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setIsPaused(false);
    };

    const scrollLeft = () => {
      if (carouselRef.current) {
        carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
      }
    };

    const scrollRight = () => {
      if (carouselRef.current) {
        carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
      }
    };

    if (items.length === 0) return null;

    return (
      <div
        className="relative overflow-hidden group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Navigation Buttons */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollLeft}
          className={`absolute left-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm flex items-center justify-center shadow-xl border border-slate-200 dark:border-slate-700 transition-all duration-300 ${
            isAtStart ? "opacity-0 cursor-default" : "opacity-100"
          } hover:bg-white dark:hover:bg-slate-700`}
          aria-label="Scroll left"
        >
          <FaChevronLeft className="text-slate-700 dark:text-slate-300" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollRight}
          className={`absolute right-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm flex items-center justify-center shadow-xl border border-slate-200 dark:border-slate-700 transition-all duration-300 ${
            isAtEnd ? "opacity-0 cursor-default" : "opacity-100"
          } hover:bg-white dark:hover:bg-slate-700`}
          aria-label="Scroll right"
        >
          <FaChevronRight className="text-slate-700 dark:text-slate-300" />
        </motion.button>

        {/* Carousel Container */}
        <div
          ref={carouselRef}
          className="flex overflow-x-auto scrollbar-hide scroll-smooth"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <div ref={contentRef} className="flex min-w-max py-4">
            {displayItems.map((product, index) => (
              <div
                key={`${product._id}-${index}`}
                className="flex-shrink-0 w-72 px-3 transition-transform duration-300 hover:scale-[1.02]"
              >
                <CategoryProductCard
                  product={product}
                  index={index}
                  className="h-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Fade effects on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white/90 dark:from-slate-950/90 via-white/50 dark:via-slate-950/50 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white/90 dark:from-slate-950/90 via-white/50 dark:via-slate-950/50 to-transparent pointer-events-none" />
      </div>
    );
  };

  const renderRelatedSection = (title, products, type) => {
    if (!products || products.length === 0) return null;
    const isExpanded = expandedSections[type] || false;

    return (
      <div className="mb-12">
        <motion.button
          onClick={() => toggleSection(type)}
          className="flex items-center justify-between w-full mb-6 p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 to-rose-500/10 hover:from-amber-500/20 hover:to-rose-500/20 border border-amber-500/20 dark:border-amber-500/30 transition-all duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500/10 to-rose-500/10">
              <FaStar className="text-amber-600 dark:text-amber-400" />
            </div>
            <div className="text-left">
              <h3 className="text-xl lg:text-2xl font-bold text-slate-800 dark:text-white">
                {title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {products.length} product{products.length !== 1 ? "s" : ""}{" "}
                found
              </p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
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
      </div>
    );
  };

  if (!product)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50/30 via-white to-rose-50/20 dark:from-slate-950/95 dark:via-slate-900 dark:to-slate-950/95">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
          <div
            className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-amber-600 rounded-full animate-spin"
            style={{ animationDuration: "1.5s" }}
          />
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
      className="min-h-screen bg-gradient-to-br from-amber-50/30 via-white to-rose-50/20 dark:from-slate-950/95 dark:via-slate-900 dark:to-slate-950/95"
    >
      {/* Custom Slider Styles */}
      <style>{`
        .slick-dots li.slick-active div {
          background: linear-gradient(to right, #f59e0b, #d97706);
          transform: scale(1.3);
          box-shadow: 0 0 12px rgba(245, 158, 11, 0.5);
        }
        .slick-dots li div {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .slick-dots li div:hover {
          transform: scale(1.2);
          background: linear-gradient(to right, #fbbf24, #f59e0b);
        }

        /* Image error fallback styling */
        .product-image {
          background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%);
        }

        .product-image.dark {
          background: linear-gradient(135deg, #2d3748 0%, #4a5568 100%);
        }

        /* Infinite carousel styles */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .min-w-max {
          min-width: max-content;
        }

        /* Smooth scrolling */
        .scroll-smooth {
          scroll-behavior: smooth;
        }

        /* Carousel item hover effects */
        .carousel-item {
          transition: transform 0.3s ease;
        }

        .carousel-item:hover {
          transform: translateY(-4px);
        }
      `}</style>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500/10 to-amber-600/10 hover:from-amber-500/20 hover:to-amber-600/20 text-amber-700 dark:text-amber-300 font-medium border border-amber-500/30 transition-all duration-300 mb-8"
        >
          <FaChevronLeft />
          Back to Products
        </motion.button>

        {/* Main Product Section */}
        <div className="w-full grid lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          {/* Images Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Main Image Slider */}
            <div className="w-full relative backdrop-blur-xl rounded-3xl p-4 lg:p-6">
              {isOnSale && (
                <div className="absolute -top-3 -left-3 z-20">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg blur opacity-75"></div>
                    <div className="relative px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white text-sm font-bold rounded-lg flex items-center gap-2 shadow-lg">
                      <FaTag className="text-sm" />
                      <span>-{discountPercent}% OFF</span>
                    </div>
                  </div>
                </div>
              )}

              <Slider {...sliderSettings}>
                {product.images.map((img, idx) => (
                  <div key={idx} className="w-full outline-none">
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-80 lg:h-96 rounded-2xl overflow-hidden"
                    >
                      <img
                        src={img}
                        alt={`${product.name} - Image ${idx + 1}`}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop";
                        }}
                      />
                    </motion.div>
                  </div>
                ))}
              </Slider>
            </div>

            {/* Thumbnail Images */}
            <div className="w-full flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImage(idx)}
                  className={`flex-shrink-0 w-20 h-20 rounded-xl border-2 overflow-hidden transition-all duration-300 ${
                    selectedImage === idx
                      ? "border-amber-500 shadow-lg shadow-amber-500/30"
                      : "border-gray-200 dark:border-slate-700 hover:border-amber-300 dark:hover:border-amber-600"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
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

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full space-y-8"
          >
            {/* Product Header */}
            <div className="w-full">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-rose-500/10 border border-amber-500/20 dark:border-amber-500/30 backdrop-blur-sm mb-4">
                <IoSparkles className="text-amber-600 dark:text-amber-400" />
                <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
                  Premium Product
                </span>
              </div>

              <h1 className="w-full text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white mb-4 break-words">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="w-full flex items-center gap-3 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`text-lg ${
                        i < stars
                          ? "text-amber-500 fill-amber-500"
                          : "text-gray-300 dark:text-slate-600"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-medium text-slate-700 dark:text-slate-300">
                  {rating.toFixed(1)}{" "}
                  <span className="text-slate-500 dark:text-slate-400">•</span>{" "}
                  {Math.floor(Math.random() * 100) + 50} reviews
                </span>
              </div>
            </div>

            {/* Price Section */}
            <div className="w-full space-y-4">
              <div className="w-full flex items-baseline gap-4">
                <span className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 to-slate-800 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
                  {formatPrice(product.price)}
                </span>
                {isOnSale && (
                  <span className="text-xl text-gray-500 dark:text-slate-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div
                className={`w-full inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                  product.isSold || product.stock === 0
                    ? "bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/20 text-red-700 dark:text-red-300"
                    : "bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 text-green-700 dark:text-green-300"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    product.isSold || product.stock === 0
                      ? "bg-red-500"
                      : "bg-green-500"
                  }`}
                />
                <span className="font-medium">
                  {product.isSold || product.stock === 0
                    ? "Sold Out"
                    : `${product.stock || 10} units available`}
                </span>
              </div>
            </div>

            {/* Key Features (Fallback if not in description) */}
            {(!product.description || !product.description.keyFeatures) &&
              product.keyFeatures && (
                <div className="w-full space-y-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl p-8 border border-white/20 dark:border-slate-700/50 shadow-2xl">
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-3">
                    <FaCheckCircle className="text-emerald-500" />
                    Key Features
                  </h3>
                  <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="w-full flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-emerald-500/5 to-teal-500/5 border border-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300"
                      >
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-emerald-500/10 to-teal-500/10 flex items-center justify-center">
                            <FaCheckCircle className="text-emerald-500" />
                          </div>
                        </div>
                        <span className="text-slate-700 dark:text-slate-300 break-words">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

            {/* Action Buttons */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={addToCart}
                disabled={loadingAdd || product.isSold || product.stock === 0}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                  product.isSold || product.stock === 0
                    ? "bg-gradient-to-r from-red-500/80 to-pink-500/80 text-white cursor-not-allowed shadow-red-500/30"
                    : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg hover:shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50"
                }`}
              >
                {loadingAdd ? (
                  <span className="flex items-center justify-center gap-3">
                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                    Adding...
                  </span>
                ) : product.isSold || product.stock === 0 ? (
                  "Sold Out"
                ) : (
                  <>
                    <FaShoppingCart className="inline mr-2" />
                    Add to Cart
                  </>
                )}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleLike(product._id)}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-slate-100 to-gray-100 dark:from-slate-700 dark:to-slate-800 text-slate-700 dark:text-slate-300 font-bold text-lg border border-slate-300 dark:border-slate-600 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
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
                    className={`text-xl ${product.isLiked ? "text-red-500 fill-red-500" : "text-gray-400"}`}
                  />
                </motion.div>
                <span>
                  {product.isLiked ? "Liked" : "Like"} •{" "}
                  {formatLikes(product.likesCount)}
                </span>
              </motion.button>
            </div>

            {/* Trust Badges */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
              <div className="w-full flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-green-500/5 to-emerald-500/5 border border-green-500/10">
                <FaTruck className="text-green-600 dark:text-green-400 text-xl" />
                <div className="min-w-0">
                  <div className="font-semibold text-slate-800 dark:text-white truncate">
                    Free Shipping
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 truncate">
                    Over $100
                  </div>
                </div>
              </div>
              <div className="w-full flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-blue-500/5 to-cyan-500/5 border border-blue-500/10">
                <FaShieldAlt className="text-blue-600 dark:text-blue-400 text-xl" />
                <div className="min-w-0">
                  <div className="font-semibold text-slate-800 dark:text-white truncate">
                    Secure Payment
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 truncate">
                    100% Protected
                  </div>
                </div>
              </div>
              <div className="w-full flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-purple-500/5 to-pink-500/5 border border-purple-500/10">
                <FaUndo className="text-purple-600 dark:text-purple-400 text-xl" />
                <div className="min-w-0">
                  <div className="font-semibold text-slate-800 dark:text-white truncate">
                    Easy Returns
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400 truncate">
                    30-Day Policy
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* PRODUCT DESCRIPTION SECTION - FULL WIDTH */}
        {product.description && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full mb-20"
          >
            {renderDescription(product.description)}
          </motion.div>
        )}

        {/* Related Products Sections */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full pt-12 border-t border-slate-200 dark:border-slate-700"
        >
          <div className="w-full mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-rose-500/10 border border-amber-500/20 dark:border-amber-500/30 mb-3">
              <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
                You Might Also Like
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 dark:text-white">
              Related Products
            </h2>
          </div>

          {/* Categorized Related Products as Infinite Horizontal Carousels */}
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
              className="text-center py-20"
            >
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-amber-500/10 to-rose-500/10 mb-6">
                <FaShareAlt className="text-amber-600 dark:text-amber-400 text-3xl" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">
                Explore More Products
              </h3>
              <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-8">
                Check out our other collections for more amazing products.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/products")}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300"
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
