import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CategoryProductCard from "../Components/CategoryProductCard";
import Select from "react-select";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { fetchWithAuth } from "../utils/auth";
import { motion } from "framer-motion";
import {
  FaFilter,
  FaSortAmountDown,
  FaSortAmountUp,
  FaTags,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const BACKEND_URL = import.meta.env.VITE_API_URL;

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
  const limit = 12;

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
  ];

  const availabilityOptions = [
    { value: "all", label: "All Products", icon: <FaTags /> },
    { value: "available", label: "Available Only", icon: <FaTags /> },
  ];

  const categoryTypeOptions = [
    { value: "all", label: "All", icon: <FaTags /> },
    { value: "newArrival", label: "New Arrival", icon: <FaTags /> },
    { value: "bestSeller", label: "Best Seller", icon: <FaTags /> },
    { value: "popular", label: "Popular", icon: <FaTags /> },
  ];

  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      background: "white",
      borderColor: state.isFocused ? "#f59e0b" : "#e5e7eb",
      borderRadius: "8px",
      padding: "4px 8px",
      transition: "all 0.3s ease",
      "&:hover": { borderColor: "#f59e0b" },
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#f59e0b"
        : state.isFocused
          ? "#fef3c7"
          : "transparent",
      color: state.isSelected ? "white" : "#1f2937",
      padding: "12px 16px",
      borderRadius: "8px",
      margin: "4px",
    }),
    menu: (base) => ({
      ...base,
      background: "white",
      borderRadius: "8px",
      border: "1px solid #e5e7eb",
      overflow: "hidden",
    }),
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
      setFiltered(list);
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
  }, [name, categoryType, sortOption, availability, priceRange]);

  useEffect(() => {
    let updated = [...products];

    if (availability?.value === "available")
      updated = updated.filter((p) => !p.isSold);

    updated = updated.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (sortOption?.value === "priceAsc")
      updated.sort((a, b) => a.price - b.price);
    else if (sortOption?.value === "priceDesc")
      updated.sort((a, b) => b.price - b.price);

    setFiltered(updated);
  }, [products, sortOption, availability, priceRange]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-white dark:bg-gray-900 max-sm:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 mb-6"
          >
            <FaTags className="text-amber-600 dark:text-amber-400" />
            <span className="text-sm font-medium text-amber-800 dark:text-amber-300">
              Premium Collection
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl lg:text-6xl font-bold mb-6"
          >
            <span className="text-gray-900 dark:text-white">{name}</span>
            <span className="text-amber-600 dark:text-amber-400 ml-3">
              Collection
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Explore our premium selection of {name.toLowerCase()} products,
            meticulously curated for quality and performance.
          </motion.p>
        </motion.div>

        {/* Filters Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <FaFilter className="text-amber-600 dark:text-amber-400 text-xl" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Filters
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 z-50">
            {/* Sort By */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Sort By
              </label>
              <Select
                options={sortOptions}
                value={sortOption}
                onChange={setSortOption}
                isClearable
                styles={customSelectStyles}
                placeholder="Select sort order..."
                className="z-50"
              />
            </div>

            {/* Availability */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Availability
              </label>
              <Select
                options={availabilityOptions}
                value={availability}
                onChange={setAvailability}
                isClearable
                styles={customSelectStyles}
                placeholder="Filter by availability..."
                className="z-50"
              />
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Price Range: {formatPrice(priceRange[0])} -{" "}
                {formatPrice(priceRange[1])}
              </label>
              <div className="pt-2">
                <Slider
                  range
                  min={0}
                  max={500}
                  value={priceRange}
                  onChange={setPriceRange}
                  allowCross={false}
                  trackStyle={[{ backgroundColor: "#f59e0b", height: 4 }]}
                  handleStyle={[
                    {
                      backgroundColor: "#ffffff",
                      borderColor: "#f59e0b",
                      borderWidth: 2,
                      width: 20,
                      height: 20,
                      marginTop: -8,
                    },
                    {
                      backgroundColor: "#ffffff",
                      borderColor: "#f59e0b",
                      borderWidth: 2,
                      width: 20,
                      height: 20,
                      marginTop: -8,
                    },
                  ]}
                  railStyle={{ backgroundColor: "#e5e7eb", height: 4 }}
                />
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
                  <span>{formatPrice(0)}</span>
                  <span>{formatPrice(500)}</span>
                </div>
              </div>
            </div>

            {/* Category Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 z-50">
                Category Type
              </label>
              <Select
                className="z-50"
                options={categoryTypeOptions}
                value={categoryTypeOptions.find(
                  (opt) => opt.value === categoryType
                )}
                onChange={(opt) => setCategoryType(opt.value)}
                isClearable
                styles={customSelectStyles}
                placeholder="Select category type..."
              />
            </div>
          </div>

          {/* Active Filters */}
          <div className="flex flex-wrap gap-3 mt-6">
            {sortOption && (
              <span className="px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300 text-sm font-medium">
                {sortOption.label}
              </span>
            )}
            {availability?.value === "available" && (
              <span className="px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300 text-sm font-medium">
                Available Only
              </span>
            )}
            {categoryType !== "all" && (
              <span className="px-4 py-2 rounded-full bg-rose-100 dark:bg-rose-900/20 text-rose-800 dark:text-rose-300 text-sm font-medium">
                {
                  categoryTypeOptions.find((opt) => opt.value === categoryType)
                    ?.label
                }
              </span>
            )}
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Showing{" "}
              <span className="font-bold text-amber-600">
                {filtered.length}
              </span>{" "}
              products
            </p>
            {isLoading && (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Loading...
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 animate-pulse"
              >
                <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-3" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4" />
                <div className="flex justify-between">
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
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
            className="text-center py-20"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-amber-100 dark:bg-amber-900/30 mb-6">
              <FaTags className="text-amber-600 dark:text-amber-400 text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              No Products Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
              Try adjusting your filters or check back later for new arrivals.
            </p>
            <button
              onClick={() => {
                setSortOption(null);
                setAvailability(null);
                setPriceRange([0, 500]);
                setCategoryType("all");
              }}
              className="px-6 py-3 rounded-lg bg-amber-100 dark:bg-amber-900/30 hover:bg-amber-200 dark:hover:bg-amber-900/50 text-amber-800 dark:text-amber-300 font-semibold transition-all duration-300"
            >
              Clear All Filters
            </button>
          </motion.div>
        )}

        {/* Pagination */}
        {pages > 1 && !isLoading && filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-16 pt-8 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="text-gray-600 dark:text-gray-400">
              Page <span className="font-bold text-amber-600">{page}</span> of{" "}
              {pages}
            </div>

            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={page === 1}
                onClick={() => fetchCategory(page - 1)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  page === 1
                    ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                    : "bg-amber-100 dark:bg-amber-900/30 hover:bg-amber-200 dark:hover:bg-amber-900/50 text-amber-800 dark:text-amber-300"
                }`}
              >
                <FaChevronLeft />
                Previous
              </motion.button>

              <div className="flex items-center gap-2">
                {[...Array(Math.min(5, pages))].map((_, i) => {
                  let pageNum;
                  if (pages <= 5) pageNum = i + 1;
                  else if (page <= 3) pageNum = i + 1;
                  else if (page >= pages - 2) pageNum = pages - 4 + i;
                  else pageNum = page - 2 + i;

                  if (pageNum > pages) return null;

                  return (
                    <button
                      key={pageNum}
                      onClick={() => fetchCategory(pageNum)}
                      className={`w-10 h-10 rounded-lg font-bold transition-all duration-300 flex items-center justify-center ${
                        page === pageNum
                          ? "bg-amber-500 dark:bg-amber-600 text-white shadow-lg transform scale-105"
                          : "bg-gray-100 dark:bg-gray-800 hover:bg-amber-100 dark:hover:bg-amber-900/30 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={page === pages}
                onClick={() => fetchCategory(page + 1)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  page === pages
                    ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed"
                    : "bg-amber-100 dark:bg-amber-900/30 hover:bg-amber-200 dark:hover:bg-amber-900/50 text-amber-800 dark:text-amber-300"
                }`}
              >
                Next
                <FaChevronRight />
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default CategoryPage;
