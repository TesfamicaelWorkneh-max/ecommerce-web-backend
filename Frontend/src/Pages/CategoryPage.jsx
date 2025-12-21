// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import CategoryProductCard from "../components/CategoryProductCard";
// import Select from "react-select";
// import Slider from "rc-slider";
// import "rc-slider/assets/index.css";
// import { fetchWithAuth } from "../utils/auth";

// const CategoryPage = () => {
//   const { name } = useParams();

//   const [products, setProducts] = useState([]);
//   const [filtered, setFiltered] = useState([]);

//   const [sortOption, setSortOption] = useState(null);
//   const [availability, setAvailability] = useState(null);
//   const [priceRange, setPriceRange] = useState([0, 500]);

//   // pagination
//   const [page, setPage] = useState(1);
//   const [pages, setPages] = useState(1);
//   const limit = 8;

//   const sortOptions = [
//     { value: "priceAsc", label: "Price: Low → High" },
//     { value: "priceDesc", label: "Price: High → Low" },
//   ];

//   const availabilityOptions = [
//     { value: "all", label: "All" },
//     { value: "available", label: "Available Only" },
//   ];

//   // fetch paginated products
//   const fetchCategory = async (pageNum) => {
//     try {
//       const res = await fetchWithAuth(
//         `http://localhost:3000/api/products/category/${encodeURIComponent(
//           name
//         )}/paginated?page=${pageNum}&limit=${limit}`
//       );

//       const data = await res.json();
//       const list = data.products || [];

//       setProducts(list);
//       setFiltered(list);

//       setPage(data.page);
//       setPages(data.pages);
//     } catch (err) {
//       console.error("Category fetch err", err);
//       setProducts([]);
//       setFiltered([]);
//     }
//   };

//   useEffect(() => {
//     fetchCategory(1); // load first page
//   }, [name]);

//   useEffect(() => {
//     let updated = [...products];

//     if (availability?.value === "available")
//       updated = updated.filter((p) => !p.isSold);

//     updated = updated.filter(
//       (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
//     );

//     if (sortOption?.value === "priceAsc")
//       updated.sort((a, b) => a.price - b.price);
//     else if (sortOption?.value === "priceDesc")
//       updated.sort((a, b) => b.price - a.price);

//     setFiltered(updated);
//   }, [products, sortOption, availability, priceRange]);

//   return (
//     <div className="min-h-screen flex items-center justify-center w-full md:px-16 lg:px-4 px-8 py-24 bg-[#795C34]">
//       <div className="max-w-7xl w-full flex flex-col items-center justify-center gap-10">
//         <h1 className="text-3xl text-white font-bold mb-6 text-center">
//           {name}
//         </h1>

//         {/* FILTERS */}
//         <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-8 p-4 rounded-lg w-full">
//           <div className="max-w-60 w-full">
//             <label className="text-white mb-1 block">Sort By:</label>
//             <Select
//               options={sortOptions}
//               value={sortOption}
//               onChange={setSortOption}
//               isClearable
//             />
//           </div>

//           <div className="max-w-60 w-full">
//             <label className="text-white mb-1 block">Availability:</label>
//             <Select
//               options={availabilityOptions}
//               value={availability}
//               onChange={setAvailability}
//               isClearable
//             />
//           </div>

//           <div className="max-w-60 w-full">
//             <label className="text-white mb-1 block">
//               Price Range: ${priceRange[0]} - ${priceRange[1]}
//             </label>
//             <Slider
//               range
//               min={0}
//               max={500}
//               value={priceRange}
//               onChange={setPriceRange}
//               allowCross={false}
//             />
//           </div>
//         </div>

//         {/* PRODUCT GRID */}
//         {filtered.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
//             {filtered.map((p, idx) => (
//               <CategoryProductCard key={p._id} product={p} index={idx} />
//             ))}
//           </div>
//         ) : (
//           <p className="text-white text-center mt-10">No products found.</p>
//         )}

//         {/* PAGINATION BUTTONS */}
//         <div className="flex items-center gap-4 mt-6">
//           <button
//             disabled={page === 1}
//             onClick={() => fetchCategory(page - 1)}
//             className={`px-4 py-2 rounded-lg text-white font-bold ${
//               page === 1
//                 ? "bg-gray-500 cursor-not-allowed"
//                 : "bg-green-600 hover:bg-green-700"
//             }`}
//           >
//             Prev
//           </button>

//           <span className="text-white font-bold text-lg">
//             Page {page} / {pages}
//           </span>

//           <button
//             disabled={page === pages}
//             onClick={() => fetchCategory(page + 1)}
//             className={`px-4 py-2 rounded-lg text-white font-bold ${
//               page === pages
//                 ? "bg-gray-500 cursor-not-allowed"
//                 : "bg-green-600 hover:bg-green-700"
//             }`}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CategoryPage;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import CategoryProductCard from "../components/CategoryProductCard";
// import Select from "react-select";
// import Slider from "rc-slider";
// import "rc-slider/assets/index.css";
// import { fetchWithAuth } from "../utils/auth";

// const CategoryPage = () => {
//   const { name } = useParams();

//   const [products, setProducts] = useState([]);
//   const [filtered, setFiltered] = useState([]);

//   const [sortOption, setSortOption] = useState(null);
//   const [availability, setAvailability] = useState(null);
//   const [priceRange, setPriceRange] = useState([0, 500]);

//   const [page, setPage] = useState(1);
//   const [pages, setPages] = useState(1);
//   const limit = 8;

//   const sortOptions = [
//     { value: "priceAsc", label: "Price: Low → High" },
//     { value: "priceDesc", label: "Price: High → Low" },
//   ];

//   const availabilityOptions = [
//     { value: "all", label: "All" },
//     { value: "available", label: "Available Only" },
//   ];

//   const fetchCategory = async (pageNum) => {
//     try {
//       const res = await fetchWithAuth(
//         `http://localhost:3000/api/products/category/${encodeURIComponent(
//           name
//         )}/paginated?page=${pageNum}&limit=${limit}`
//       );

//       const data = await res.json();
//       const list = data.products || [];

//       setProducts(list);
//       setFiltered(list);

//       setPage(data.page);
//       setPages(data.pages);
//     } catch (err) {
//       setProducts([]);
//       setFiltered([]);
//     }
//   };

//   useEffect(() => {
//     fetchCategory(1);
//   }, [name]);

//   useEffect(() => {
//     let updated = [...products];

//     if (availability?.value === "available")
//       updated = updated.filter((p) => !p.isSold);

//     updated = updated.filter(
//       (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
//     );

//     if (sortOption?.value === "priceAsc")
//       updated.sort((a, b) => a.price - b.price);
//     else if (sortOption?.value === "priceDesc")
//       updated.sort((a, b) => b.price - a.price);

//     setFiltered(updated);
//   }, [products, sortOption, availability, priceRange]);

//   return (
//     <div className="min-h-screen flex items-center justify-center w-full md:px-16 lg:px-4 px-8 py-24 bg-[#FBF7F2] dark:bg-[#1f1c18]">
//       <div className="max-w-7xl w-full flex flex-col items-center justify-center gap-10">
//         {/* TITLE */}
//         <h1 className="text-3xl font-bold mb-6 text-center text-[#2F2E2B] dark:text-[#F5EFE6]">
//           {name}
//         </h1>

//         {/* FILTERS */}
//         <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-8 p-4 rounded-lg w-full">
//           <div className="max-w-60 w-full">
//             <label className="mb-1 block text-[#2F2E2B] dark:text-[#F5EFE6]">
//               Sort By:
//             </label>
//             <Select
//               options={sortOptions}
//               value={sortOption}
//               onChange={setSortOption}
//               isClearable
//             />
//           </div>

//           <div className="max-w-60 w-full">
//             <label className="mb-1 block text-[#2F2E2B] dark:text-[#F5EFE6]">
//               Availability:
//             </label>
//             <Select
//               options={availabilityOptions}
//               value={availability}
//               onChange={setAvailability}
//               isClearable
//             />
//           </div>

//           <div className="max-w-60 w-full">
//             <label className="mb-1 block text-[#2F2E2B] dark:text-[#F5EFE6]">
//               Price Range: ${priceRange[0]} - ${priceRange[1]}
//             </label>
//             <Slider
//               range
//               min={0}
//               max={500}
//               value={priceRange}
//               onChange={setPriceRange}
//               allowCross={false}
//             />
//           </div>
//         </div>

//         {/* PRODUCT GRID */}
//         {filtered.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full">
//             {filtered.map((p, idx) => (
//               <CategoryProductCard key={p._id} product={p} index={idx} />
//             ))}
//           </div>
//         ) : (
//           <p className="text-center mt-10 text-[#5E5A54] dark:text-[#CFC6BB]">
//             No products found.
//           </p>
//         )}

//         {/* PAGINATION */}
//         <div className="flex items-center gap-4 mt-6">
//           <button
//             disabled={page === 1}
//             onClick={() => fetchCategory(page - 1)}
//             className={`px-4 py-2 rounded-lg font-bold text-white ${
//               page === 1
//                 ? "bg-[#D8CFBF] cursor-not-allowed"
//                 : "bg-[#BFA178] hover:bg-[#A88A60]"
//             }`}
//           >
//             Prev
//           </button>

//           <span className="font-bold text-lg text-[#2F2E2B] dark:text-[#F5EFE6]">
//             Page {page} / {pages}
//           </span>

//           <button
//             disabled={page === pages}
//             onClick={() => fetchCategory(page + 1)}
//             className={`px-4 py-2 rounded-lg font-bold text-white ${
//               page === pages
//                 ? "bg-[#D8CFBF] cursor-not-allowed"
//                 : "bg-[#BFA178] hover:bg-[#A88A60]"
//             }`}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CategoryPage;

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

  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      background: "rgba(255, 255, 255, 0.8)",
      backdropFilter: "blur(10px)",
      borderColor: state.isFocused ? "#f59e0b" : "#e5e7eb",
      borderRadius: "12px",
      padding: "4px 8px",
      boxShadow: state.isFocused ? "0 0 0 2px rgba(245, 158, 11, 0.2)" : "none",
      transition: "all 0.3s ease",
      "&:hover": {
        borderColor: "#f59e0b",
      },
      "&:dark": {
        background: "rgba(30, 41, 59, 0.8)",
        borderColor: "#475569",
      },
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
      "&:dark": {
        color: state.isSelected ? "white" : "#e5e7eb",
        backgroundColor: state.isSelected
          ? "#f59e0b"
          : state.isFocused
            ? "#374151"
            : "transparent",
      },
    }),
    menu: (base) => ({
      ...base,
      background: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(10px)",
      borderRadius: "12px",
      boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
      border: "1px solid rgba(229, 231, 235, 0.5)",
      overflow: "hidden",
      "&:dark": {
        background: "rgba(15, 23, 42, 0.95)",
        borderColor: "rgba(71, 85, 105, 0.5)",
      },
    }),
  };

  const fetchCategory = async (pageNum) => {
    try {
      setIsLoading(true);
      const res = await fetchWithAuth(
        `${BACKEND_URL}/api/products/category/${encodeURIComponent(
          name
        )}/paginated?page=${pageNum}&limit=${limit}`
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
    fetchCategory(1);
  }, [name]);

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
      updated.sort((a, b) => b.price - a.price);

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
      className="min-h-screen bg-gradient-to-br from-amber-50/30 via-white to-rose-50/20 dark:from-slate-950/95 dark:via-slate-900 dark:to-slate-950/95"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500/10 to-rose-500/10 border border-amber-500/20 dark:border-amber-500/30 backdrop-blur-sm mb-6">
            <FaTags className="text-amber-600 dark:text-amber-400" />
            <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
              Premium Collection
            </span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="text-slate-800 dark:text-white">{name}</span>
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-rose-500 bg-clip-text text-transparent ml-3">
              Collection
            </span>
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Explore our premium selection of {name.toLowerCase()} products,
            meticulously curated for quality and performance.
          </p>
        </motion.div>

        {/* Filters Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 lg:p-8 mb-12 border border-white/20 dark:border-slate-700/50 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <FaFilter className="text-amber-600 dark:text-amber-400 text-xl" />
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
              Filters
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sort By */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                Sort By
              </label>
              <Select
                options={sortOptions}
                value={sortOption}
                onChange={setSortOption}
                isClearable
                styles={customSelectStyles}
                placeholder="Select sort order..."
                className="dark:text-white"
              />
            </div>

            {/* Availability */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                Availability
              </label>
              <Select
                options={availabilityOptions}
                value={availability}
                onChange={setAvailability}
                isClearable
                styles={customSelectStyles}
                placeholder="Filter by availability..."
                className="dark:text-white"
              />
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
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
                  trackStyle={[{ backgroundColor: "#f59e0b", height: 6 }]}
                  handleStyle={[
                    {
                      backgroundColor: "#ffffff",
                      borderColor: "#f59e0b",
                      borderWidth: 3,
                      width: 24,
                      height: 24,
                      marginTop: -9,
                      boxShadow: "0 4px 12px rgba(245, 158, 11, 0.3)",
                    },
                    {
                      backgroundColor: "#ffffff",
                      borderColor: "#f59e0b",
                      borderWidth: 3,
                      width: 24,
                      height: 24,
                      marginTop: -9,
                      boxShadow: "0 4px 12px rgba(245, 158, 11, 0.3)",
                    },
                  ]}
                  railStyle={{ backgroundColor: "#e5e7eb", height: 6 }}
                />
                <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400 mt-2">
                  <span>{formatPrice(0)}</span>
                  <span>{formatPrice(500)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          <div className="flex flex-wrap gap-3 mt-6">
            {sortOption && (
              <span className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-amber-600/10 text-amber-700 dark:text-amber-300 text-sm font-medium border border-amber-500/20">
                {sortOption.label}
              </span>
            )}
            {availability?.value === "available" && (
              <span className="px-4 py-2 rounded-full bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-700 dark:text-green-300 text-sm font-medium border border-green-500/20">
                Available Only
              </span>
            )}
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <p className="text-lg text-slate-700 dark:text-slate-300">
              Showing{" "}
              <span className="font-bold text-amber-600">
                {filtered.length}
              </span>{" "}
              products
            </p>
            {isLoading && (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Loading...
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bg-white/50 dark:bg-slate-800/50 rounded-2xl p-6 animate-pulse"
              >
                <div className="w-full h-64 bg-gray-200 dark:bg-slate-700 rounded-xl mb-4" />
                <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded mb-3" />
                <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-3/4 mb-4" />
                <div className="flex justify-between">
                  <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded w-1/3" />
                  <div className="h-6 bg-gray-200 dark:bg-slate-700 rounded w-1/4" />
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
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-amber-500/10 to-rose-500/10 mb-6">
              <FaTags className="text-amber-600 dark:text-amber-400 text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">
              No Products Found
            </h3>
            <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-8">
              Try adjusting your filters or check back later for new arrivals.
            </p>
            <button
              onClick={() => {
                setSortOption(null);
                setAvailability(null);
                setPriceRange([0, 500]);
              }}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500/10 to-amber-600/10 hover:from-amber-500/20 hover:to-amber-600/20 text-amber-700 dark:text-amber-300 font-semibold border border-amber-500/30 transition-all duration-300"
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
            className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-16 pt-8 border-t border-slate-200 dark:border-slate-700"
          >
            <div className="text-slate-600 dark:text-slate-400">
              Page <span className="font-bold text-amber-600">{page}</span> of{" "}
              {pages}
            </div>

            <div className="flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={page === 1}
                onClick={() => fetchCategory(page - 1)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  page === 1
                    ? "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-amber-500/10 to-amber-600/10 hover:from-amber-500/20 hover:to-amber-600/20 text-amber-700 dark:text-amber-300 border border-amber-500/30"
                }`}
              >
                <FaChevronLeft />
                Previous
              </motion.button>

              <div className="flex items-center gap-2">
                {[...Array(Math.min(5, pages))].map((_, i) => {
                  let pageNum;
                  if (pages <= 5) {
                    pageNum = i + 1;
                  } else if (page <= 3) {
                    pageNum = i + 1;
                  } else if (page >= pages - 2) {
                    pageNum = pages - 4 + i;
                  } else {
                    pageNum = page - 2 + i;
                  }

                  if (pageNum > pages) return null;

                  return (
                    <button
                      key={pageNum}
                      onClick={() => fetchCategory(pageNum)}
                      className={`w-10 h-10 rounded-xl font-semibold transition-all duration-300 ${
                        page === pageNum
                          ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/30"
                          : "bg-white/50 dark:bg-slate-800/50 hover:bg-amber-500/10 dark:hover:bg-amber-500/10 text-slate-700 dark:text-slate-300"
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
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  page === pages
                    ? "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-amber-500/10 to-amber-600/10 hover:from-amber-500/20 hover:to-amber-600/20 text-amber-700 dark:text-amber-300 border border-amber-500/30"
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
