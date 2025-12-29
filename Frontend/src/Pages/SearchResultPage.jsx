import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaFilter,
  FaSortAmountDown,
  FaSortAmountUp,
  FaTimes,
  FaStar,
  FaHeart,
  FaShoppingCart,
  FaBox,
  FaTag,
  FaFire,
} from "react-icons/fa";
import { fetchWithAuth } from "../utils/auth";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const SearchResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    category: "",
    sortBy: "createdAt",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [categories, setCategories] = useState([]);
  const [popularSearches, setPopularSearches] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q") || "";
    const category = params.get("category") || "";

    setSearchQuery(query);
    setFilters((prev) => ({
      ...prev,
      category,
      sortBy: category ? "createdAt" : prev.sortBy,
    }));

    fetchSearchResults(query, category);
    fetchCategories();
    fetchPopularSearches();
  }, [location]);

  const fetchCategories = async () => {
    try {
      const res = await fetchWithAuth(
        `${BACKEND_URL}/api/products/categories-for-search`
      );
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    } catch (err) {
      console.error("Categories fetch error:", err);
    }
  };

  const fetchPopularSearches = async () => {
    try {
      const res = await fetchWithAuth(
        `${BACKEND_URL}/api/products/popular-searches`
      );
      if (res.ok) {
        const data = await res.json();
        setPopularSearches(data);
      }
    } catch (err) {
      console.error("Popular searches error:", err);
    }
  };

  const fetchSearchResults = async (query = "", category = "") => {
    setLoading(true);
    setError(null);

    try {
      let url = `${BACKEND_URL}/api/products/search?`;
      const params = new URLSearchParams();

      if (query) params.append("q", query);
      if (category) params.append("category", category);
      if (filters.minPrice) params.append("minPrice", filters.minPrice);
      if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
      if (filters.sortBy) params.append("sortBy", filters.sortBy);

      console.log("Fetching search results with:", params.toString());

      const response = await fetchWithAuth(`${url}${params.toString()}`);
      const data = await response.json();

      if (response.ok) {
        console.log("Search results received:", data.length);
        setProducts(Array.isArray(data) ? data : []);
      } else {
        setError(data.message || "Failed to fetch results");
        setProducts([]);
      }
    } catch (err) {
      console.error("Search error:", err);
      setError("Network error. Please try again.");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e?.preventDefault();
    if (!searchQuery.trim()) return;

    // Add to recent searches
    const savedSearches =
      localStorage.getItem("luxecart_recent_searches") || "[]";
    const recentSearches = JSON.parse(savedSearches);
    const updated = [
      searchQuery,
      ...recentSearches.filter(
        (s) => s.toLowerCase() !== searchQuery.toLowerCase()
      ),
    ].slice(0, 8);
    localStorage.setItem("luxecart_recent_searches", JSON.stringify(updated));

    // Navigate to search
    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    // Apply filters immediately
    applyFilters(newFilters);
  };

  const applyFilters = (newFilters) => {
    const params = new URLSearchParams();
    if (searchQuery) params.append("q", searchQuery);
    if (newFilters.category) params.append("category", newFilters.category);
    if (newFilters.minPrice) params.append("minPrice", newFilters.minPrice);
    if (newFilters.maxPrice) params.append("maxPrice", newFilters.maxPrice);
    if (newFilters.sortBy) params.append("sortBy", newFilters.sortBy);

    navigate(`/search?${params.toString()}`);
  };

  const clearFilters = () => {
    const newFilters = {
      minPrice: "",
      maxPrice: "",
      category: "",
      sortBy: "createdAt",
    };
    setFilters(newFilters);
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleCategorySearch = (categoryName) => {
    setSearchQuery("");
    navigate(`/search?category=${encodeURIComponent(categoryName)}`);
  };

  const handlePopularSearch = (searchTerm) => {
    setSearchQuery(searchTerm);
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const sortOptions = [
    { value: "createdAt", label: "Newest", icon: <FaStar /> },
    {
      value: "price-asc",
      label: "Price: Low to High",
      icon: <FaSortAmountDown />,
    },
    {
      value: "price-desc",
      label: "Price: High to Low",
      icon: <FaSortAmountUp />,
    },
    { value: "popularity", label: "Most Popular", icon: <FaFire /> },
  ];

  const activeFilterCount = Object.values(filters).filter(
    (val) => val && val !== "createdAt"
  ).length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#E1A95F]/20 border-t-[#E1A95F] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-300">Searching products...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 pt-24 pb-12 px-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            {location.search.includes("category=")
              ? `Category: "${new URLSearchParams(location.search).get("category")}"`
              : searchQuery
                ? `Search Results for "${searchQuery}"`
                : "Browse Products"}
          </h1>
          <div className="flex items-center justify-between">
            <p className="text-slate-300">
              Found {products.length} product{products.length !== 1 ? "s" : ""}
            </p>
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="text-sm text-[#E1A95F] hover:text-[#d4a259] flex items-center gap-2"
              >
                <FaTimes />
                Clear Filters ({activeFilterCount})
              </button>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6 sticky top-24">
              {/* Search Box */}
              <form onSubmit={handleSearch} className="mb-6">
                <div className="relative">
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#E1A95F]/50 focus:border-[#E1A95F]/50 transition-all duration-300"
                  />
                </div>
              </form>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <FaTag className="text-[#E1A95F]" />
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.slice(0, 8).map((category) => (
                    <button
                      key={category._id}
                      onClick={() => handleCategorySearch(category.name)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-300 ${
                        filters.category === category.name
                          ? "bg-[#E1A95F]/20 text-[#E1A95F]"
                          : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Price Range
                </h3>
                <div className="flex gap-3">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) =>
                      handleFilterChange("minPrice", e.target.value)
                    }
                    className="w-full px-3 py-2 rounded-lg bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-[#E1A95F]/50"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) =>
                      handleFilterChange("maxPrice", e.target.value)
                    }
                    className="w-full px-3 py-2 rounded-lg bg-slate-900/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-[#E1A95F]/50"
                  />
                </div>
              </div>

              {/* Sort By */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Sort By
                </h3>
                <div className="space-y-2">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleFilterChange("sortBy", option.value)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 ${
                        filters.sortBy === option.value
                          ? "bg-[#E1A95F]/20 text-[#E1A95F]"
                          : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                      }`}
                    >
                      {option.icon}
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Popular Searches */}
            {popularSearches.length > 0 && (
              <div className="mt-6 bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <FaFire className="text-amber-500" />
                  Popular Searches
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.slice(0, 8).map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handlePopularSearch(search)}
                      className="px-3 py-1.5 bg-slate-900/50 hover:bg-[#E1A95F]/20 text-slate-300 hover:text-[#E1A95F] rounded-lg text-sm transition-all duration-300 border border-slate-700 hover:border-[#E1A95F]/30"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Results */}
          <div className="lg:w-3/4">
            {error ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-red-500/10 to-pink-500/10 flex items-center justify-center mx-auto mb-4">
                  <FaTimes className="text-red-500 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{error}</h3>
                <p className="text-slate-400 mb-4">
                  Please try again with different keywords
                </p>
                <button
                  onClick={() => fetchSearchResults(searchQuery)}
                  className="px-6 py-3 bg-gradient-to-r from-[#E1A95F] to-[#d4a259] text-white rounded-xl font-medium hover:shadow-lg hover:shadow-[#E1A95F]/25 transition-all duration-300"
                >
                  Retry Search
                </button>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#E1A95F]/10 to-rose-500/10 flex items-center justify-center mx-auto mb-4">
                  <FaSearch className="text-[#E1A95F] text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  No products found
                </h3>
                <p className="text-slate-400 mb-4">
                  {searchQuery
                    ? `No results for "${searchQuery}"`
                    : location.search.includes("category=")
                      ? `No products in this category`
                      : "Try searching for different products"}
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() => navigate("/")}
                    className="px-6 py-3 bg-gradient-to-r from-[#E1A95F] to-[#d4a259] text-white rounded-xl font-medium hover:shadow-lg hover:shadow-[#E1A95F]/25 transition-all duration-300"
                  >
                    Browse All Products
                  </button>
                  <button
                    onClick={clearFilters}
                    className="px-6 py-3 bg-slate-800 text-slate-300 rounded-xl font-medium hover:bg-slate-700 transition-all duration-300 border border-slate-700"
                  >
                    Clear Search
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product, index) => (
                  <motion.div
                    key={product._id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="group cursor-pointer bg-slate-800/50 backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg border border-slate-700 hover:border-[#E1A95F]/50 transition-all duration-300"
                  >
                    {/* Product Image */}
                    <div className="relative h-56 bg-gradient-to-br from-slate-900 to-slate-800 overflow-hidden">
                      {product.image || product.images?.[0] ? (
                        <img
                          src={
                            product.image?.startsWith("http")
                              ? product.image
                              : `${BACKEND_URL}${product.image || product.images?.[0]}`
                          }
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <FaBox className="text-slate-600 text-4xl" />
                        </div>
                      )}

                      {/* Status Badge */}
                      {product.isSold || product.stock === 0 ? (
                        <div className="absolute top-3 left-3 px-3 py-1 bg-red-500/90 text-white text-xs font-bold rounded-full">
                          Sold Out
                        </div>
                      ) : product.stock < 10 ? (
                        <div className="absolute top-3 left-3 px-3 py-1 bg-amber-500/90 text-white text-xs font-bold rounded-full">
                          Low Stock
                        </div>
                      ) : null}

                      {/* Quick actions */}
                      <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // Add to wishlist
                          }}
                          className="w-10 h-10 rounded-full bg-slate-900/90 backdrop-blur-sm flex items-center justify-center hover:bg-[#E1A95F]/20 hover:text-[#E1A95F] transition-all duration-300"
                        >
                          <FaHeart className="text-slate-300 group-hover:text-[#E1A95F]" />
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-bold text-white truncate text-lg group-hover:text-[#E1A95F] transition-colors duration-300">
                          {product.name}
                        </h3>
                        <span className="text-xl font-bold text-[#E1A95F] whitespace-nowrap ml-2">
                          {formatPrice(product.price)}
                        </span>
                      </div>

                      <p className="text-sm text-slate-400 mb-4 line-clamp-2 min-h-[2.5rem]">
                        {product.description?.intro ||
                          product.description?.keyFeatures?.[0] ||
                          "No description available"}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 bg-slate-900/50 text-slate-300 text-xs rounded-full border border-slate-700">
                          {product.category?.name || "Uncategorized"}
                        </span>
                        <div className="flex items-center gap-2">
                          {product.likesCount > 0 && (
                            <span className="text-xs text-slate-400 flex items-center gap-1">
                              <FaHeart className="text-red-400" />
                              {product.likesCount}
                            </span>
                          )}
                          <button className="px-4 py-2 bg-gradient-to-r from-[#E1A95F] to-[#d4a259] text-white text-sm rounded-lg hover:shadow-lg hover:shadow-[#E1A95F]/25 transition-all duration-300">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SearchResultsPage;
// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { AnimatePresence } from "framer-motion";
// import { motion } from "framer-motion";
// import {
//   FaSearch,
//   FaFilter,
//   FaSortAmountDown,
//   FaSortAmountUp,
//   FaTimes,
//   FaStar,
//   FaHeart,
//   FaShoppingCart,
//   FaBox,
//   FaTag,
//   FaFire,
//   FaSpinner,
//   FaChevronRight,
//   FaArrowLeft,
//   FaEye,
//   FaClock,
// } from "react-icons/fa";
// import { fetchWithAuth } from "../utils/auth";

// const BACKEND_URL = import.meta.env.VITE_API_URL;

// const SearchResultsPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filters, setFilters] = useState({
//     minPrice: "",
//     maxPrice: "",
//     category: "",
//     sortBy: "createdAt",
//   });
//   const [showFilters, setShowFilters] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [popularSearches, setPopularSearches] = useState([]);
//   const [loadingMore, setLoadingMore] = useState(false);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [isScrolling, setIsScrolling] = useState(false);

//   // Scroll animation state
//   const [scrollProgress, setScrollProgress] = useState(0);

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const query = params.get("q") || "";
//     const category = params.get("category") || "";

//     setSearchQuery(query);
//     setFilters((prev) => ({
//       ...prev,
//       category,
//       sortBy: category ? "createdAt" : prev.sortBy,
//     }));
//     setPage(1); // Reset page when search changes

//     fetchSearchResults(query, category, true);
//     fetchCategories();
//     fetchPopularSearches();

//     // Scroll progress indicator
//     const handleScroll = () => {
//       const scrolled = window.scrollY;
//       const maxScroll = document.body.scrollHeight - window.innerHeight;
//       const progress = (scrolled / maxScroll) * 100;
//       setScrollProgress(progress);
//       setIsScrolling(scrolled > 100);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [location]);

//   const fetchCategories = async () => {
//     try {
//       const res = await fetchWithAuth(
//         `${BACKEND_URL}/api/products/categories-for-search`
//       );
//       if (res.ok) {
//         const data = await res.json();
//         setCategories(data);
//       }
//     } catch (err) {
//       console.error("Categories fetch error:", err);
//     }
//   };

//   const fetchPopularSearches = async () => {
//     try {
//       const res = await fetchWithAuth(
//         `${BACKEND_URL}/api/products/popular-searches`
//       );
//       if (res.ok) {
//         const data = await res.json();
//         setPopularSearches(data);
//       }
//     } catch (err) {
//       console.error("Popular searches error:", err);
//     }
//   };

//   const fetchSearchResults = async (
//     query = "",
//     category = "",
//     reset = false
//   ) => {
//     if (reset) {
//       setLoading(true);
//     } else {
//       setLoadingMore(true);
//     }

//     setError(null);

//     try {
//       let url = `${BACKEND_URL}/api/products/search?`;
//       const params = new URLSearchParams();

//       if (query) params.append("q", query);
//       if (category) params.append("category", category);
//       if (filters.minPrice) params.append("minPrice", filters.minPrice);
//       if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
//       if (filters.sortBy) params.append("sortBy", filters.sortBy);
//       params.append("page", reset ? 1 : page);
//       params.append("limit", 12);

//       const response = await fetchWithAuth(`${url}${params.toString()}`);
//       const data = await response.json();

//       if (response.ok) {
//         if (reset) {
//           setProducts(Array.isArray(data.products) ? data.products : []);
//         } else {
//           setProducts((prev) => [...prev, ...(data.products || [])]);
//         }
//         setHasMore(data.hasMore || false);
//       } else {
//         setError(data.message || "Failed to fetch results");
//         if (reset) setProducts([]);
//       }
//     } catch (err) {
//       console.error("Search error:", err);
//       setError("Network error. Please try again.");
//       if (reset) setProducts([]);
//     } finally {
//       setLoading(false);
//       setLoadingMore(false);
//     }
//   };

//   const loadMore = () => {
//     if (!loadingMore && hasMore) {
//       setPage((prev) => prev + 1);
//       fetchSearchResults(searchQuery, filters.category, false);
//     }
//   };

//   const handleSearch = (e) => {
//     e?.preventDefault();
//     if (!searchQuery.trim()) return;

//     const savedSearches = localStorage.getItem("recent_searches") || "[]";
//     const recentSearches = JSON.parse(savedSearches);
//     const updated = [
//       searchQuery,
//       ...recentSearches.filter(
//         (s) => s.toLowerCase() !== searchQuery.toLowerCase()
//       ),
//     ].slice(0, 8);
//     localStorage.setItem("recent_searches", JSON.stringify(updated));

//     navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
//   };

//   const handleFilterChange = (key, value) => {
//     const newFilters = { ...filters, [key]: value };
//     setFilters(newFilters);
//     applyFilters(newFilters);
//   };

//   const applyFilters = (newFilters) => {
//     setPage(1);
//     const params = new URLSearchParams();
//     if (searchQuery) params.append("q", searchQuery);
//     if (newFilters.category) params.append("category", newFilters.category);
//     if (newFilters.minPrice) params.append("minPrice", newFilters.minPrice);
//     if (newFilters.maxPrice) params.append("maxPrice", newFilters.maxPrice);
//     if (newFilters.sortBy) params.append("sortBy", newFilters.sortBy);

//     navigate(`/search?${params.toString()}`);
//   };

//   const clearFilters = () => {
//     const newFilters = {
//       minPrice: "",
//       maxPrice: "",
//       category: "",
//       sortBy: "createdAt",
//     };
//     setFilters(newFilters);
//     setPage(1);
//     navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
//   };

//   const handleCategorySearch = (categoryName) => {
//     setSearchQuery("");
//     navigate(`/search?category=${encodeURIComponent(categoryName)}`);
//   };

//   const handlePopularSearch = (searchTerm) => {
//     setSearchQuery(searchTerm);
//     navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
//   };

//   const formatPrice = (price) => {
//     return new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//       minimumFractionDigits: 0,
//     }).format(price);
//   };

//   const sortOptions = [
//     { value: "createdAt", label: "Newest", icon: <FaStar /> },
//     {
//       value: "price-asc",
//       label: "Price: Low to High",
//       icon: <FaSortAmountDown />,
//     },
//     {
//       value: "price-desc",
//       label: "Price: High to Low",
//       icon: <FaSortAmountUp />,
//     },
//     { value: "popularity", label: "Most Popular", icon: <FaFire /> },
//   ];

//   const activeFilterCount = Object.values(filters).filter(
//     (val) => val && val !== "createdAt"
//   ).length;

//   // Loading skeleton
//   if (loading) {
//     return (
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-24 pb-12 px-4"
//       >
//         <div className="max-w-7xl mx-auto">
//           {/* Header skeleton */}
//           <div className="mb-8">
//             <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/3 mb-4 animate-pulse"></div>
//             <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 animate-pulse"></div>
//           </div>

//           <div className="flex flex-col lg:flex-row gap-8">
//             {/* Sidebar skeleton */}
//             <div className="lg:w-1/4">
//               <div className="bg-gray-100 dark:bg-gray-800/50 rounded-2xl p-6 space-y-6">
//                 {[1, 2, 3, 4].map((i) => (
//                   <div key={i} className="space-y-3">
//                     <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 animate-pulse"></div>
//                     <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Products skeleton */}
//             <div className="lg:w-3/4">
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {[1, 2, 3, 4, 5, 6].map((i) => (
//                   <div
//                     key={i}
//                     className="bg-gray-100 dark:bg-gray-800/50 rounded-2xl overflow-hidden animate-pulse"
//                   >
//                     <div className="h-56 bg-gray-200 dark:bg-gray-700"></div>
//                     <div className="p-5 space-y-4">
//                       <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
//                       <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
//                       <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     );
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-24 pb-12 px-4"
//     >
//       {/* Scroll Progress Bar */}
//       <motion.div
//         className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#E1A95F] via-[#d4a259] to-[#E1A95F] z-40"
//         style={{ width: `${scrollProgress}%` }}
//         transition={{ duration: 0.1 }}
//       />

//       {/* Back to Top Button */}
//       <AnimatePresence>
//         {isScrolling && (
//           <motion.button
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 20 }}
//             onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//             className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-[#E1A95F] to-[#d4a259] text-white rounded-full shadow-lg flex items-center justify-center z-40 hover:shadow-xl transition-all duration-300"
//           >
//             ↑
//           </motion.button>
//         )}
//       </AnimatePresence>

//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <motion.div
//           initial={{ y: -20, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.1 }}
//           className="mb-8"
//         >
//           <div className="flex items-center justify-between mb-6">
//             <button
//               onClick={() => navigate(-1)}
//               className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[#E1A95F] dark:hover:text-[#E1A95F] transition-colors"
//             >
//               <FaArrowLeft className="text-sm" />
//               <span>Back</span>
//             </button>

//             {activeFilterCount > 0 && (
//               <motion.button
//                 initial={{ scale: 0 }}
//                 animate={{ scale: 1 }}
//                 onClick={clearFilters}
//                 className="text-sm text-[#E1A95F] hover:text-[#d4a259] flex items-center gap-2 bg-[#E1A95F]/10 dark:bg-[#E1A95F]/20 px-3 py-1.5 rounded-lg"
//               >
//                 <FaTimes />
//                 Clear Filters ({activeFilterCount})
//               </motion.button>
//             )}
//           </div>

//           <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
//             {location.search.includes("category=")
//               ? `Category: "${new URLSearchParams(location.search).get("category")}"`
//               : searchQuery
//                 ? `Search Results for "${searchQuery}"`
//                 : "Browse Products"}
//           </h1>
//           <p className="text-gray-600 dark:text-gray-300">
//             Found {products.length} product{products.length !== 1 ? "s" : ""}
//           </p>
//         </motion.div>

//         {/* Mobile Filter Toggle */}
//         <motion.button
//           initial={{ x: -20, opacity: 0 }}
//           animate={{ x: 0, opacity: 1 }}
//           transition={{ delay: 0.2 }}
//           onClick={() => setShowFilters(!showFilters)}
//           className="lg:hidden w-full mb-6 py-3 px-4 bg-white dark:bg-gray-800 rounded-xl shadow flex items-center justify-between"
//         >
//           <div className="flex items-center gap-3">
//             <FaFilter className="text-[#E1A95F]" />
//             <span className="font-medium text-gray-900 dark:text-white">
//               Filters & Sort
//             </span>
//             {activeFilterCount > 0 && (
//               <span className="bg-[#E1A95F] text-white text-xs px-2 py-1 rounded-full">
//                 {activeFilterCount}
//               </span>
//             )}
//           </div>
//           <FaChevronRight
//             className={`transition-transform ${showFilters ? "rotate-90" : ""}`}
//           />
//         </motion.button>

//         {/* Main Content */}
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Sidebar Filters - Desktop & Mobile */}
//           <AnimatePresence>
//             {(showFilters || window.innerWidth >= 1024) && (
//               <motion.div
//                 initial={{ x: -50, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 exit={{ x: -50, opacity: 0 }}
//                 className="lg:w-1/4"
//               >
//                 <div className="bg-white dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700 p-6 sticky top-24">
//                   {/* Search Box */}
//                   <form onSubmit={handleSearch} className="mb-6">
//                     <div className="relative">
//                       <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
//                       <input
//                         type="text"
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                         placeholder="Search products..."
//                         className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E1A95F]/50 focus:border-[#E1A95F]/50 transition-all duration-300"
//                       />
//                     </div>
//                   </form>

//                   {/* Categories */}
//                   <div className="mb-6">
//                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
//                       <FaTag className="text-[#E1A95F]" />
//                       Categories
//                     </h3>
//                     <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
//                       {categories.slice(0, 8).map((category) => (
//                         <motion.button
//                           key={category._id}
//                           whileHover={{ x: 5 }}
//                           onClick={() => handleCategorySearch(category.name)}
//                           className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-300 ${
//                             filters.category === category.name
//                               ? "bg-[#E1A95F]/20 text-[#E1A95F] dark:bg-[#E1A95F]/30"
//                               : "text-gray-600 dark:text-gray-300 hover:text-[#E1A95F] hover:bg-gray-100 dark:hover:bg-gray-700/50"
//                           }`}
//                         >
//                           {category.name}
//                         </motion.button>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Price Range */}
//                   <div className="mb-6">
//                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
//                       Price Range
//                     </h3>
//                     <div className="flex gap-3">
//                       <input
//                         type="number"
//                         placeholder="Min"
//                         value={filters.minPrice}
//                         onChange={(e) =>
//                           handleFilterChange("minPrice", e.target.value)
//                         }
//                         className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#E1A95F]/50"
//                       />
//                       <input
//                         type="number"
//                         placeholder="Max"
//                         value={filters.maxPrice}
//                         onChange={(e) =>
//                           handleFilterChange("maxPrice", e.target.value)
//                         }
//                         className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#E1A95F]/50"
//                       />
//                     </div>
//                   </div>

//                   {/* Sort By */}
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
//                       Sort By
//                     </h3>
//                     <div className="space-y-2">
//                       {sortOptions.map((option) => (
//                         <motion.button
//                           key={option.value}
//                           whileHover={{ x: 5 }}
//                           onClick={() =>
//                             handleFilterChange("sortBy", option.value)
//                           }
//                           className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 ${
//                             filters.sortBy === option.value
//                               ? "bg-[#E1A95F]/20 text-[#E1A95F] dark:bg-[#E1A95F]/30"
//                               : "text-gray-600 dark:text-gray-300 hover:text-[#E1A95F] hover:bg-gray-100 dark:hover:bg-gray-700/50"
//                           }`}
//                         >
//                           {option.icon}
//                           {option.label}
//                         </motion.button>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Popular Searches */}
//                 {popularSearches.length > 0 && (
//                   <motion.div
//                     initial={{ y: 20, opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                     transition={{ delay: 0.3 }}
//                     className="mt-6 bg-white dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-gray-700 p-6"
//                   >
//                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
//                       <FaFire className="text-amber-500" />
//                       Popular Searches
//                     </h3>
//                     <div className="flex flex-wrap gap-2">
//                       {popularSearches.slice(0, 8).map((search, index) => (
//                         <motion.button
//                           key={index}
//                           whileHover={{ scale: 1.05 }}
//                           onClick={() => handlePopularSearch(search)}
//                           className="px-3 py-1.5 bg-gray-100 dark:bg-gray-900/50 hover:bg-[#E1A95F]/20 text-gray-700 dark:text-gray-300 hover:text-[#E1A95F] rounded-lg text-sm transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-[#E1A95F]/30"
//                         >
//                           {search}
//                         </motion.button>
//                       ))}
//                     </div>
//                   </motion.div>
//                 )}
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Results */}
//           <div className="lg:w-3/4">
//             {error ? (
//               <motion.div
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 className="text-center py-12"
//               >
//                 <div className="w-16 h-16 rounded-full bg-gradient-to-r from-red-500/10 to-pink-500/10 flex items-center justify-center mx-auto mb-4">
//                   <FaTimes className="text-red-500 text-2xl" />
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
//                   {error}
//                 </h3>
//                 <p className="text-gray-600 dark:text-gray-400 mb-4">
//                   Please try again with different keywords
//                 </p>
//                 <button
//                   onClick={() =>
//                     fetchSearchResults(searchQuery, filters.category, true)
//                   }
//                   className="px-6 py-3 bg-gradient-to-r from-[#E1A95F] to-[#d4a259] text-white rounded-xl font-medium hover:shadow-lg hover:shadow-[#E1A95F]/25 transition-all duration-300"
//                 >
//                   Retry Search
//                 </button>
//               </motion.div>
//             ) : products.length === 0 ? (
//               <motion.div
//                 initial={{ y: 20, opacity: 0 }}
//                 animate={{ y: 0, opacity: 1 }}
//                 className="text-center py-12"
//               >
//                 <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#E1A95F]/10 to-rose-500/10 flex items-center justify-center mx-auto mb-4">
//                   <FaSearch className="text-[#E1A95F] text-2xl" />
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
//                   No products found
//                 </h3>
//                 <p className="text-gray-600 dark:text-gray-400 mb-4">
//                   {searchQuery
//                     ? `No results for "${searchQuery}"`
//                     : location.search.includes("category=")
//                       ? `No products in this category`
//                       : "Try searching for different products"}
//                 </p>
//                 <div className="flex flex-wrap justify-center gap-3">
//                   <button
//                     onClick={() => navigate("/")}
//                     className="px-6 py-3 bg-gradient-to-r from-[#E1A95F] to-[#d4a259] text-white rounded-xl font-medium hover:shadow-lg hover:shadow-[#E1A95F]/25 transition-all duration-300"
//                   >
//                     Browse All Products
//                   </button>
//                   <button
//                     onClick={clearFilters}
//                     className="px-6 py-3 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-700 transition-all duration-300 border border-gray-300 dark:border-gray-700"
//                   >
//                     Clear Search
//                   </button>
//                 </div>
//               </motion.div>
//             ) : (
//               <>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {products.map((product, index) => (
//                     <motion.div
//                       key={product._id || index}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: index * 0.05 }}
//                       whileHover={{ y: -5, scale: 1.02 }}
//                       whileTap={{ scale: 0.98 }}
//                       onClick={() => navigate(`/product/${product._id}`)}
//                       className="group cursor-pointer bg-white dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 hover:border-[#E1A95F]/50 transition-all duration-300"
//                     >
//                       {/* Product Image */}
//                       <div className="relative h-56 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
//                         {product.image || product.images?.[0] ? (
//                           <motion.img
//                             initial={{ scale: 1 }}
//                             whileHover={{ scale: 1.1 }}
//                             transition={{ duration: 0.3 }}
//                             src={
//                               product.image?.startsWith("http")
//                                 ? product.image
//                                 : `${BACKEND_URL}${product.image || product.images?.[0]}`
//                             }
//                             alt={product.name}
//                             className="w-full h-full object-cover"
//                             onError={(e) => {
//                               e.target.onerror = null;
//                               e.target.src =
//                                 "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop";
//                             }}
//                           />
//                         ) : (
//                           <div className="w-full h-full flex items-center justify-center">
//                             <FaBox className="text-gray-400 dark:text-gray-600 text-4xl" />
//                           </div>
//                         )}

//                         {/* Status Badge */}
//                         {product.isSold || product.stock === 0 ? (
//                           <div className="absolute top-3 left-3 px-3 py-1 bg-red-500/90 text-white text-xs font-bold rounded-full">
//                             Sold Out
//                           </div>
//                         ) : product.stock < 10 ? (
//                           <div className="absolute top-3 left-3 px-3 py-1 bg-amber-500/90 text-white text-xs font-bold rounded-full">
//                             Low Stock
//                           </div>
//                         ) : null}

//                         {/* Quick actions */}
//                         <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               // Add to wishlist
//                             }}
//                             className="w-10 h-10 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm flex items-center justify-center hover:bg-[#E1A95F]/20 hover:text-[#E1A95F] transition-all duration-300 shadow-lg"
//                           >
//                             <FaHeart className="text-gray-600 dark:text-gray-400 group-hover:text-[#E1A95F]" />
//                           </button>
//                         </div>
//                       </div>

//                       {/* Product Info */}
//                       <div className="p-5">
//                         <div className="flex items-start justify-between mb-3">
//                           <h3 className="font-bold text-gray-900 dark:text-white truncate text-lg group-hover:text-[#E1A95F] transition-colors duration-300">
//                             {product.name}
//                           </h3>
//                           <span className="text-xl font-bold text-[#E1A95F] whitespace-nowrap ml-2">
//                             {formatPrice(product.price)}
//                           </span>
//                         </div>

//                         <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 min-h-[2.5rem]">
//                           {product.description?.intro ||
//                             product.description?.keyFeatures?.[0] ||
//                             "No description available"}
//                         </p>

//                         <div className="flex items-center justify-between">
//                           <span className="px-3 py-1 bg-gray-100 dark:bg-gray-900/50 text-gray-700 dark:text-gray-300 text-xs rounded-full border border-gray-200 dark:border-gray-700">
//                             {product.category?.name || "Uncategorized"}
//                           </span>
//                           <div className="flex items-center gap-2">
//                             {product.likesCount > 0 && (
//                               <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
//                                 <FaHeart className="text-red-400" />
//                                 {product.likesCount}
//                               </span>
//                             )}
//                             <button className="px-4 py-2 bg-gradient-to-r from-[#E1A95F] to-[#d4a259] text-white text-sm rounded-lg hover:shadow-lg hover:shadow-[#E1A95F]/25 transition-all duration-300">
//                               View Details
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>

//                 {/* Load More Button */}
//                 {hasMore && (
//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="mt-12 text-center"
//                   >
//                     <button
//                       onClick={loadMore}
//                       disabled={loadingMore}
//                       className="px-8 py-3 bg-gradient-to-r from-[#E1A95F] to-[#d4a259] text-white rounded-xl font-medium hover:shadow-lg hover:shadow-[#E1A95F]/25 transition-all duration-300 disabled:opacity-50 flex items-center gap-2 mx-auto"
//                     >
//                       {loadingMore ? (
//                         <>
//                           <FaSpinner className="animate-spin" />
//                           Loading...
//                         </>
//                       ) : (
//                         "Load More Products"
//                       )}
//                     </button>
//                   </motion.div>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default SearchResultsPage;
