import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import CategoryProductCard from "../Components/CategoryProductCard";
import Select from "react-select";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { fetchWithAuth } from "../utils/auth";
import {
  motion,
  useInView,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  FaFilter,
  FaSortAmountDown,
  FaSortAmountUp,
  FaChevronUp,
  FaTags,
  FaChevronLeft,
  FaChevronRight,
  FaLeaf,
  FaSearch,
  FaTimes,
  FaStar,
  FaFire,
  FaRocket,
  FaGem,
  FaCrown,
  FaArrowDown,
  FaAward,
  FaHeart,
  FaShoppingBag,
} from "react-icons/fa";

// Import the image
import photoshoot2 from "../assets/photoshoot2.jpg";

const BACKEND_URL = import.meta.env.VITE_API_URL;

// Add this helper function at the top of your component file, outside the component
const flattenDescription = (desc) => {
  if (!desc) return "";
  if (typeof desc === "string") return desc;

  // If it's an object with subfields (from your schema)
  let text = "";
  if (desc.intro && typeof desc.intro === "string") text += desc.intro + " ";
  if (desc.howToUse && typeof desc.howToUse === "string")
    text += desc.howToUse + " ";
  if (desc.ingredients && typeof desc.ingredients === "string")
    text += desc.ingredients + " ";
  if (desc.storage && typeof desc.storage === "string")
    text += desc.storage + " ";

  // Handle arrays
  if (desc.keyFeatures && Array.isArray(desc.keyFeatures)) {
    text +=
      desc.keyFeatures.filter((f) => typeof f === "string").join(" ") + " ";
  }
  if (desc.benefits && Array.isArray(desc.benefits)) {
    text += desc.benefits.filter((b) => typeof b === "string").join(" ") + " ";
  }

  return text;
};

const CategoryPage = () => {
  const { name } = useParams();

  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [sortOption, setSortOption] = useState(null);
  const [availability, setAvailability] = useState(null);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [categoryType, setCategoryType] = useState("all");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const limit = 12;

  const containerRef = React.useRef(null);
  const heroRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  // Scroll animations
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 500], [0, -80]);
  const imageOpacity = useTransform(scrollY, [0, 300], [1, 0.9]);
  const titleScale = useTransform(scrollY, [0, 300], [1, 1.1]);
  const titleY = useTransform(scrollY, [0, 200], [0, -30]);

  const sortOptions = [
    {
      value: "priceAsc",
      label: "Price: Low to High",
      icon: <FaSortAmountDown />,
    },
    {
      value: "priceDesc",
      label: "Price: High to Low",
      icon: <FaSortAmountUp />,
    },
    {
      value: "popular",
      label: "Most Popular",
      icon: <FaFire />,
    },
    {
      value: "newest",
      label: "Newest First",
      icon: <FaRocket />,
    },
  ];

  const availabilityOptions = [
    { value: "all", label: "All Products", icon: <FaTags /> },
    { value: "available", label: "Available Only", icon: <FaGem /> },
  ];

  const categoryTypeOptions = [
    { value: "all", label: "All", icon: <FaTags /> },
    { value: "newArrival", label: "New Arrival", icon: <FaRocket /> },
    { value: "bestSeller", label: "Best Seller", icon: <FaFire /> },
    { value: "popular", label: "Popular", icon: <FaStar /> },
  ];

  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      background: "linear-gradient(135deg, #ffffff 0%, #faf9f6 100%)",
      borderColor: state.isFocused ? "#D7C097" : "#E8DFD0",
      borderRadius: "12px",
      padding: "8px 12px",
      transition: "all 0.3s ease",
      boxShadow: state.isFocused
        ? "0 0 0 3px rgba(215, 192, 151, 0.2)"
        : "0 4px 20px rgba(0,0,0,0.05)",
      "&:hover": { borderColor: "#D7C097" },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#D7C097"
        : state.isFocused
          ? "rgba(215, 192, 151, 0.1)"
          : "transparent",
      color: state.isSelected ? "white" : "#4A5568",
      padding: "12px 16px",
      borderRadius: "8px",
      margin: "4px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    }),
    menu: (base) => ({
      ...base,
      background: "linear-gradient(135deg, #ffffff 0%, #faf9f6 100%)",
      borderRadius: "12px",
      border: "1px solid #E8DFD0",
      overflow: "hidden",
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#4A5568",
      fontWeight: "500",
    }),
  };

  // Add this helper function inside your component or outside
  const productMatchesSearch = (product, searchTerm) => {
    if (!searchTerm) return true;

    const searchTermLower = searchTerm.toLowerCase();

    // Check name
    if (product.name && product.name.toLowerCase().includes(searchTermLower)) {
      return true;
    }

    // Check description
    if (product.description) {
      if (typeof product.description === "string") {
        if (product.description.toLowerCase().includes(searchTermLower)) {
          return true;
        }
      } else if (typeof product.description === "object") {
        // Flatten the description object
        const flattenedDesc = flattenDescription(product.description);
        if (flattenedDesc.toLowerCase().includes(searchTermLower)) {
          return true;
        }
      }
    }

    return false;
  };

  const fetchCategory = async (pageNum) => {
    try {
      setIsLoading(true);
      const res = await fetchWithAuth(
        `${BACKEND_URL}/api/products/category/${encodeURIComponent(name)}/paginated?page=${pageNum}&limit=${limit}&type=${categoryType}`
      );
      const data = await res.json();
      const list = data.products || [];
      setProducts(list);
      setPage(data.page);
      setPages(data.pages);
    } catch (err) {
      console.error("Error fetching category:", err);
      setProducts([]);
      setFiltered([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setPage(1);
    fetchCategory(1);
  }, [name, categoryType]);

  // Then update your useEffect to use this helper:
  useEffect(() => {
    let updated = [...products];

    if (availability?.value === "available")
      updated = updated.filter((p) => !p.isSold);

    updated = updated.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (searchTerm) {
      updated = updated.filter((p) => productMatchesSearch(p, searchTerm));
    }

    if (sortOption?.value === "priceAsc")
      updated.sort((a, b) => a.price - b.price);
    else if (sortOption?.value === "priceDesc")
      updated.sort((a, b) => b.price - a.price);
    else if (sortOption?.value === "popular")
      updated.sort((a, b) => (b.likesCount || 0) - (a.likesCount || 0));
    else if (sortOption?.value === "newest")
      updated.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setFiltered(updated);
  }, [products, sortOption, availability, priceRange, searchTerm]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const clearAllFilters = () => {
    setSortOption(null);
    setAvailability(null);
    setPriceRange([0, 500]);
    setCategoryType("all");
    setSearchTerm("");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-b from-[#F8F5F0] to-[#F0ECE3] dark:from-gray-950 dark:to-gray-900 lg:py-24"
    >
      {/* Custom Styles for Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        .float-animation {
          animation: float 6s ease-in-out infinite;
        }
        
        .shimmer-effect {
          background: linear-gradient(90deg, transparent 25%, rgba(255,255,255,0.3) 50%, transparent 75%);
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
        
        .parallax-container {
          perspective: 1000px;
          transform-style: preserve-3d;
        }
      `}</style>

      {/* Hero Image Section with Parallax */}
      <div ref={heroRef} className="relative overflow-hidden">
        <motion.div
          className="relative h-[60vh] min-h-[500px] max-h-[800px] flex items-center justify-center parallax-container"
          style={{
            y: imageY,
            opacity: imageOpacity,
          }}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 1,
            ease: [0.43, 0.13, 0.23, 0.96],
          }}
        >
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `url(${photoshoot2})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
              transform: "translateZ(0)",
            }}
          >
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

            {/* Shimmer Overlay */}
            <div className="absolute inset-0 shimmer-effect" />

            {/* Animated Particles */}
            <div className="absolute inset-0">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-[#D8C9A7] rounded-full"
                  initial={{
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    opacity: 0,
                  }}
                  animate={{
                    y: [null, -30],
                    opacity: [0, 0.6, 0],
                  }}
                  transition={{
                    duration: 1.5 + Math.random() * 2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "linear",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Floating Decorative Elements */}
          <motion.div
            className="absolute top-1/4 left-10 hidden lg:block"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            whileHover={{ scale: 1.1 }}
          >
            <div className="text-white text-sm font-medium bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 flex items-center gap-2 dark:bg-white/10 dark:border-white/20">
              <FaAward className="text-[#D8C9A7]" />
              <span>Premium Quality</span>
            </div>
          </motion.div>

          <motion.div
            className="absolute bottom-1/4 right-10 hidden lg:block"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            whileHover={{ scale: 1.1 }}
          >
            <div className="text-white text-sm font-medium bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 flex items-center gap-2 dark:bg-white/10 dark:border-white/20">
              <FaHeart className="text-[#D8C9A7]" />
              <span>Customer Favorite</span>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8 dark:bg-white/10 dark:border-white/20">
                <FaCrown className="text-[#D8C9A7] text-lg" />
                <span className="text-sm font-medium text-white dark:text-white">
                  Premium Collection
                </span>
                <FaShoppingBag className="text-[#D8C9A7] text-lg" />
              </div>
            </motion.div>

            <motion.h1
              style={{
                scale: titleScale,
                y: titleY,
              }}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              <span className="text-white dark:text-white">Discover</span>
              <span className="text-[#D8C9A7] block mt-2 float-animation bg-gradient-to-r from-[#D7C097] to-[#B8A075] bg-clip-text text-transparent">
                {name} Collection
              </span>
            </motion.h1>

            <motion.p
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg lg:text-xl text-gray-200 max-w-2xl mx-auto mb-8 leading-relaxed dark:text-gray-200"
            >
              Immerse yourself in our premium {name.toLowerCase()} selection,
              crafted with excellence for your beauty journey.
            </motion.p>

            {/* Stats Badges */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6, type: "spring" }}
              className="flex flex-wrap justify-center gap-4 mb-6"
            >
              <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center gap-2 dark:bg-white/10 dark:border-white/20">
                <FaStar className="text-[#D8C9A7]" />
                <span className="text-white text-sm font-medium dark:text-white">
                  4.9/5 Rating
                </span>
              </div>
              <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center gap-2 dark:bg-white/10 dark:border-white/20">
                <FaFire className="text-[#D8C9A7]" />
                <span className="text-white text-sm font-medium dark:text-white">
                  Best Sellers
                </span>
              </div>
              <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center gap-2 dark:bg-white/10 dark:border-white/20">
                <FaLeaf className="text-[#D8C9A7]" />
                <span className="text-white text-sm font-medium dark:text-white">
                  Natural Ingredients
                </span>
              </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="flex flex-col items-center"
              >
                <span className="text-white text-sm mb-2 dark:text-white">
                  Explore Products
                </span>
                <FaArrowDown className="text-white text-2xl dark:text-white" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full"
          >
            <path
              fill="#F8F5F0"
              fillOpacity="1"
              d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,181.3C960,181,1056,203,1152,202.7C1248,203,1344,181,1392,170.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Main Content Section */}
      <div
        ref={containerRef}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 -mt-1"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-[#D7C097]/10 to-[#B8A075]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-l from-[#D7C097]/10 to-[#B8A075]/5 rounded-full blur-3xl" />
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 md:mb-8"
        >
          <div className="relative max-w-2xl mx-auto">
            <div className="relative group">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#B8A075] text-lg z-10" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-12 py-3 md:py-4 rounded-xl md:rounded-2xl bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-sm border border-[#E8DFD0] focus:border-[#D7C097] focus:outline-none focus:ring-2 focus:ring-[#D7C097]/20 transition-all duration-300 dark:from-gray-800/80 dark:to-gray-800/60 dark:border-gray-700"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#B8A075] transition-colors dark:text-gray-400"
                >
                  <FaTimes />
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Mobile Filter Toggle */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="lg:hidden fixed bottom-6 right-6 z-40 px-5 py-3 rounded-full bg-gradient-to-r from-[#D7C097] to-[#B8A075] text-white font-semibold flex items-center gap-2 shadow-xl"
        >
          <FaFilter />
          {isFilterOpen ? "Close" : "Filters"}
        </motion.button>

        {/* Filters Section - Mobile Overlay */}
        <AnimatePresence>
          {isFilterOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsFilterOpen(false)}
                className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              />

              {/* Mobile Filter Panel */}
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25 }}
                className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-gradient-to-b from-white to-[#F8F5F0] z-50 lg:hidden overflow-y-auto dark:from-gray-900 dark:to-gray-800"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-[#D7C097]/20 to-[#B8A075]/20">
                        <FaFilter className="text-[#B8A075]" />
                      </div>
                      <h2 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent dark:from-gray-100 dark:to-gray-300">
                        Filters
                      </h2>
                    </div>
                    <button
                      onClick={() => setIsFilterOpen(false)}
                      className="p-2 rounded-full bg-gradient-to-r from-[#D7C097] to-[#B8A075] text-white"
                    >
                      <FaTimes />
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Sort By */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3 dark:text-gray-300">
                        Sort By
                      </label>
                      <Select
                        options={sortOptions}
                        value={sortOption}
                        onChange={setSortOption}
                        isClearable
                        styles={customSelectStyles}
                        placeholder="Select sort order..."
                        formatOptionLabel={({ label, icon }) => (
                          <div className="flex items-center gap-2">
                            {icon}
                            {label}
                          </div>
                        )}
                      />
                    </div>

                    {/* Availability */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3 dark:text-gray-300">
                        Availability
                      </label>
                      <Select
                        options={availabilityOptions}
                        value={availability}
                        onChange={setAvailability}
                        isClearable
                        styles={customSelectStyles}
                        placeholder="Filter by availability..."
                        formatOptionLabel={({ label, icon }) => (
                          <div className="flex items-center gap-2">
                            {icon}
                            {label}
                          </div>
                        )}
                      />
                    </div>

                    {/* Price Range */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3 dark:text-gray-300">
                        Price Range: {formatPrice(priceRange[0])} -{" "}
                        {formatPrice(priceRange[1])}
                      </label>
                      <div className="pt-2 px-2">
                        <Slider
                          range
                          min={0}
                          max={500}
                          value={priceRange}
                          onChange={setPriceRange}
                          allowCross={false}
                          trackStyle={[
                            {
                              backgroundColor: "#D7C097",
                              height: 6,
                              borderRadius: 3,
                            },
                          ]}
                          handleStyle={[
                            {
                              backgroundColor: "#ffffff",
                              borderColor: "#D7C097",
                              borderWidth: 3,
                              width: 24,
                              height: 24,
                              marginTop: -9,
                              boxShadow: "0 4px 12px rgba(215, 192, 151, 0.3)",
                            },
                            {
                              backgroundColor: "#ffffff",
                              borderColor: "#D7C097",
                              borderWidth: 3,
                              width: 24,
                              height: 24,
                              marginTop: -9,
                              boxShadow: "0 4px 12px rgba(215, 192, 151, 0.3)",
                            },
                          ]}
                          railStyle={{
                            backgroundColor: "#E8DFD0",
                            height: 6,
                            borderRadius: 3,
                          }}
                        />
                        <div className="flex justify-between text-sm text-gray-600 mt-3 dark:text-gray-400">
                          <span>{formatPrice(0)}</span>
                          <span>{formatPrice(500)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Category Type */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3 dark:text-gray-300">
                        Category Type
                      </label>
                      <Select
                        options={categoryTypeOptions}
                        value={categoryTypeOptions.find(
                          (opt) => opt.value === categoryType
                        )}
                        onChange={(opt) => setCategoryType(opt.value)}
                        isClearable
                        styles={customSelectStyles}
                        placeholder="Select category type..."
                        formatOptionLabel={({ label, icon }) => (
                          <div className="flex items-center gap-2">
                            {icon}
                            {label}
                          </div>
                        )}
                      />
                    </div>
                  </div>

                  {/* Active Filters */}
                  <div className="mt-8 pt-6 border-t border-[#E8DFD0] dark:border-gray-700">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3 dark:text-gray-300">
                      Active Filters
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {sortOption && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="px-3 py-1.5 rounded-full bg-gradient-to-r from-[#D7C097]/20 to-[#B8A075]/20 text-gray-700 text-sm font-medium flex items-center gap-1 dark:text-gray-300"
                        >
                          {sortOption.label}
                          <button
                            onClick={() => setSortOption(null)}
                            className="ml-1 hover:text-[#B8A075] dark:hover:text-[#D7C097]"
                          >
                            <FaTimes className="text-xs" />
                          </button>
                        </motion.span>
                      )}
                      {availability?.value === "available" && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-700 text-sm font-medium flex items-center gap-1 dark:from-emerald-900/20 dark:to-emerald-800/20 dark:text-emerald-300"
                        >
                          Available Only
                          <button
                            onClick={() => setAvailability(null)}
                            className="ml-1 hover:text-emerald-600 dark:hover:text-emerald-400"
                          >
                            <FaTimes className="text-xs" />
                          </button>
                        </motion.span>
                      )}
                      {categoryType !== "all" && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="px-3 py-1.5 rounded-full bg-gradient-to-r from-rose-100 to-rose-50 text-rose-700 text-sm font-medium flex items-center gap-1 dark:from-rose-900/20 dark:to-rose-800/20 dark:text-rose-300"
                        >
                          {
                            categoryTypeOptions.find(
                              (opt) => opt.value === categoryType
                            )?.label
                          }
                          <button
                            onClick={() => setCategoryType("all")}
                            className="ml-1 hover:text-rose-600 dark:hover:text-rose-400"
                          >
                            <FaTimes className="text-xs" />
                          </button>
                        </motion.span>
                      )}
                    </div>
                  </div>

                  {/* Clear All Button for Mobile */}
                  <div className="mt-8">
                    <button
                      onClick={clearAllFilters}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D7C097]/20 to-[#B8A075]/20 hover:from-[#D7C097]/30 hover:to-[#B8A075]/30 text-gray-700 font-semibold transition-all duration-300 border border-[#D7C097]/30 dark:text-gray-300 dark:border-[#D7C097]/20"
                    >
                      Clear All Filters
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Filters and Products Container */}
        <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
          {/* Desktop Filters Sidebar - Hidden on mobile/tablet */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="hidden lg:block lg:w-1/4"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              initial="hidden"
              animate="visible"
              className="bg-gradient-to-b from-white/80 to-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-[#E8DFD0] sticky top-24 dark:from-gray-800/80 dark:to-gray-800/60 dark:border-gray-700"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-[#D7C097]/20 to-[#B8A075]/20">
                    <FaFilter className="text-[#B8A075]" />
                  </div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent dark:from-gray-100 dark:to-gray-300">
                    Filters
                  </h2>
                </div>
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-[#B8A075] hover:text-[#D7C097] transition-colors dark:text-[#D7C097] dark:hover:text-[#B8A075]"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-6">
                {/* Sort By */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3 dark:text-gray-300">
                    Sort By
                  </label>
                  <Select
                    options={sortOptions}
                    value={sortOption}
                    onChange={setSortOption}
                    isClearable
                    styles={customSelectStyles}
                    placeholder="Select sort order..."
                    formatOptionLabel={({ label, icon }) => (
                      <div className="flex items-center gap-2">
                        {icon}
                        {label}
                      </div>
                    )}
                  />
                </div>

                {/* Availability */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3 dark:text-gray-300">
                    Availability
                  </label>
                  <Select
                    options={availabilityOptions}
                    value={availability}
                    onChange={setAvailability}
                    isClearable
                    styles={customSelectStyles}
                    placeholder="Filter by availability..."
                    formatOptionLabel={({ label, icon }) => (
                      <div className="flex items-center gap-2">
                        {icon}
                        {label}
                      </div>
                    )}
                  />
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3 dark:text-gray-300">
                    Price Range: {formatPrice(priceRange[0])} -{" "}
                    {formatPrice(priceRange[1])}
                  </label>
                  <div className="pt-2 px-2">
                    <Slider
                      range
                      min={0}
                      max={500}
                      value={priceRange}
                      onChange={setPriceRange}
                      allowCross={false}
                      trackStyle={[
                        {
                          backgroundColor: "#D7C097",
                          height: 6,
                          borderRadius: 3,
                        },
                      ]}
                      handleStyle={[
                        {
                          backgroundColor: "#ffffff",
                          borderColor: "#D7C097",
                          borderWidth: 3,
                          width: 24,
                          height: 24,
                          marginTop: -9,
                          boxShadow: "0 4px 12px rgba(215, 192, 151, 0.3)",
                        },
                        {
                          backgroundColor: "#ffffff",
                          borderColor: "#D7C097",
                          borderWidth: 3,
                          width: 24,
                          height: 24,
                          marginTop: -9,
                          boxShadow: "0 4px 12px rgba(215, 192, 151, 0.3)",
                        },
                      ]}
                      railStyle={{
                        backgroundColor: "#E8DFD0",
                        height: 6,
                        borderRadius: 3,
                      }}
                    />
                    <div className="flex justify-between text-sm text-gray-600 mt-3 dark:text-gray-400">
                      <span>{formatPrice(0)}</span>
                      <span>{formatPrice(500)}</span>
                    </div>
                  </div>
                </div>

                {/* Category Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3 dark:text-gray-300">
                    Category Type
                  </label>
                  <Select
                    options={categoryTypeOptions}
                    value={categoryTypeOptions.find(
                      (opt) => opt.value === categoryType
                    )}
                    onChange={(opt) => setCategoryType(opt.value)}
                    isClearable
                    styles={customSelectStyles}
                    placeholder="Select category type..."
                    formatOptionLabel={({ label, icon }) => (
                      <div className="flex items-center gap-2">
                        {icon}
                        {label}
                      </div>
                    )}
                  />
                </div>
              </div>

              {/* Active Filters */}
              <div className="mt-8 pt-6 border-t border-[#E8DFD0] dark:border-gray-700">
                <h3 className="text-sm font-semibold text-gray-700 mb-3 dark:text-gray-300">
                  Active Filters
                </h3>
                <div className="flex flex-wrap gap-2">
                  {sortOption && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1.5 rounded-full bg-gradient-to-r from-[#D7C097]/20 to-[#B8A075]/20 text-gray-700 text-sm font-medium flex items-center gap-1 dark:text-gray-300"
                    >
                      {sortOption.label}
                      <button
                        onClick={() => setSortOption(null)}
                        className="ml-1 hover:text-[#B8A075] dark:hover:text-[#D7C097]"
                      >
                        <FaTimes className="text-xs" />
                      </button>
                    </motion.span>
                  )}
                  {availability?.value === "available" && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-700 text-sm font-medium flex items-center gap-1 dark:from-emerald-900/20 dark:to-emerald-800/20 dark:text-emerald-300"
                    >
                      Available Only
                      <button
                        onClick={() => setAvailability(null)}
                        className="ml-1 hover:text-emerald-600 dark:hover:text-emerald-400"
                      >
                        <FaTimes className="text-xs" />
                      </button>
                    </motion.span>
                  )}
                  {categoryType !== "all" && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1.5 rounded-full bg-gradient-to-r from-rose-100 to-rose-50 text-rose-700 text-sm font-medium flex items-center gap-1 dark:from-rose-900/20 dark:to-rose-800/20 dark:text-rose-300"
                    >
                      {
                        categoryTypeOptions.find(
                          (opt) => opt.value === categoryType
                        )?.label
                      }
                      <button
                        onClick={() => setCategoryType("all")}
                        className="ml-1 hover:text-rose-600 dark:hover:text-rose-400"
                      >
                        <FaTimes className="text-xs" />
                      </button>
                    </motion.span>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Products Grid */}
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2,
                },
              },
            }}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:w-3/4"
          >
            {/* Results Count */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-6 md:mb-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <p className="text-base md:text-lg text-gray-700 dark:text-gray-300">
                    Showing{" "}
                    <span className="font-bold text-[#B8A075]">
                      {filtered.length}
                    </span>{" "}
                    products
                  </p>
                  {filtered.length > 0 && (
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-6 h-6 border-2 border-[#D7C097]/30 border-t-[#D7C097] rounded-full"
                    />
                  )}
                </div>
                {isLoading && (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#D7C097]/20 to-[#B8A075]/20 dark:from-[#D7C097]/10 dark:to-[#B8A075]/10">
                    <div className="w-4 h-4 border-2 border-[#D7C097]/30 border-t-[#D7C097] rounded-full animate-spin" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Loading...
                    </span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Products Grid */}
            <AnimatePresence>
              {isLoading ? (
                <motion.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
                >
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-gradient-to-b from-white/60 to-white/40 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 animate-pulse dark:from-gray-800/60 dark:to-gray-800/40"
                    >
                      <div className="w-full h-48 md:h-64 bg-gradient-to-br from-[#D7C097]/10 to-[#B8A075]/10 rounded-xl md:rounded-2xl mb-4 dark:from-[#D7C097]/5 dark:to-[#B8A075]/5" />
                      <div className="h-4 bg-gradient-to-r from-[#D7C097]/10 to-[#B8A075]/10 rounded mb-3 dark:from-[#D7C097]/5 dark:to-[#B8A075]/5" />
                      <div className="h-4 bg-gradient-to-r from-[#D7C097]/10 to-[#B8A075]/10 rounded w-3/4 mb-4 dark:from-[#D7C097]/5 dark:to-[#B8A075]/5" />
                      <div className="flex justify-between">
                        <div className="h-6 bg-gradient-to-r from-[#D7C097]/10 to-[#B8A075]/10 rounded w-1/3 dark:from-[#D7C097]/5 dark:to-[#B8A075]/5" />
                        <div className="h-6 bg-gradient-to-r from-[#D7C097]/10 to-[#B8A075]/10 rounded w-1/4 dark:from-[#D7C097]/5 dark:to-[#B8A075]/5" />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : filtered.length > 0 ? (
                <motion.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
                >
                  {filtered.map((product, index) => (
                    <CategoryProductCard
                      key={product._id}
                      product={product}
                      index={index}
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 md:py-20"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="inline-flex items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-[#D7C097]/10 to-[#B8A075]/10 mb-6 dark:from-[#D7C097]/5 dark:to-[#B8A075]/5"
                  >
                    <FaTags className="text-[#B8A075] text-3xl md:text-4xl" />
                  </motion.div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">
                    No Products Found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6 md:mb-8 px-4">
                    Try adjusting your filters or check back later for new
                    arrivals.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      clearAllFilters();
                      setIsFilterOpen(false);
                    }}
                    className="px-6 py-3 md:px-8 md:py-3 rounded-xl bg-gradient-to-r from-[#D7C097]/20 to-[#B8A075]/20 hover:from-[#D7C097]/30 hover:to-[#B8A075]/30 text-gray-700 font-semibold transition-all duration-300 border border-[#D7C097]/30 dark:text-gray-300 dark:border-[#D7C097]/20"
                  >
                    Clear All Filters
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pagination */}
            {pages > 1 && !isLoading && filtered.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col sm:flex-row items-center justify-between gap-4 md:gap-6 mt-8 md:mt-16 pt-6 md:pt-8 border-t border-[#E8DFD0] dark:border-gray-700"
              >
                <div className="text-gray-600 text-sm md:text-base dark:text-gray-400">
                  Page <span className="font-bold text-[#B8A075]">{page}</span>{" "}
                  of {pages}
                </div>

                <div className="flex items-center gap-2 md:gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={page === 1}
                    onClick={() => fetchCategory(page - 1)}
                    className={`flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl font-semibold transition-all duration-300 text-sm md:text-base ${
                      page === 1
                        ? "bg-gradient-to-r from-gray-100 to-gray-50 text-gray-400 cursor-not-allowed dark:from-gray-800 dark:to-gray-700 dark:text-gray-500"
                        : "bg-gradient-to-r from-[#D7C097]/20 to-[#B8A075]/20 hover:from-[#D7C097]/30 hover:to-[#B8A075]/30 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <FaChevronLeft />
                    <span className="hidden sm:inline">Previous</span>
                  </motion.button>

                  <div className="flex items-center gap-1 md:gap-2">
                    {[...Array(Math.min(5, pages))].map((_, i) => {
                      let pageNum;
                      if (pages <= 5) pageNum = i + 1;
                      else if (page <= 3) pageNum = i + 1;
                      else if (page >= pages - 2) pageNum = pages - 4 + i;
                      else pageNum = page - 2 + i;

                      if (pageNum > pages) return null;

                      return (
                        <motion.button
                          key={pageNum}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => fetchCategory(pageNum)}
                          className={`w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl font-bold transition-all duration-300 flex items-center justify-center text-sm md:text-base ${
                            page === pageNum
                              ? "bg-gradient-to-r from-[#D7C097] to-[#B8A075] text-white shadow-lg"
                              : "bg-gradient-to-r from-white/60 to-white/40 backdrop-blur-sm hover:bg-gradient-to-r hover:from-[#D7C097]/20 hover:to-[#B8A075]/20 text-gray-700 border border-[#E8DFD0] dark:from-gray-800/60 dark:to-gray-800/40 dark:text-gray-300 dark:border-gray-700"
                          }`}
                        >
                          {pageNum}
                        </motion.button>
                      );
                    })}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={page === pages}
                    onClick={() => fetchCategory(page + 1)}
                    className={`flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl font-semibold transition-all duration-300 text-sm md:text-base ${
                      page === pages
                        ? "bg-gradient-to-r from-gray-100 to-gray-50 text-gray-400 cursor-not-allowed dark:from-gray-800 dark:to-gray-700 dark:text-gray-500"
                        : "bg-gradient-to-r from-[#D7C097]/20 to-[#B8A075]/20 hover:from-[#D7C097]/30 hover:to-[#B8A075]/30 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <span className="hidden sm:inline">Next</span>
                    <FaChevronRight />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="fixed bottom-6 md:bottom-8 right-4 md:right-8 z-30"
      >
        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#D7C097] to-[#B8A075] flex items-center justify-center shadow-xl cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <FaChevronUp className="text-white" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default CategoryPage;
