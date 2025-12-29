// // import React, { useEffect, useState } from "react";
// // import { useNavigate, useLocation } from "react-router-dom";
// // import { fetchWithAuth } from "../utils/auth";
// // import { getImageUrl } from "../utils/imageUtils"; // ✅ Import getImageUrl

// // const BACKEND_URL = import.meta.env.VITE_API_URL;

// // const AdminProducts = () => {
// //   const navigate = useNavigate();
// //   const location = useLocation();

// //   const query = new URLSearchParams(location.search);
// //   const filter = query.get("filter");
// //   const category = query.get("category") || "";
// //   const sort = query.get("sort") || "";
// //   const page = Number(query.get("page")) || 1;

// //   const [products, setProducts] = useState([]);
// //   const [categories, setCategories] = useState([]);
// //   const [pages, setPages] = useState(1);
// //   const [loading, setLoading] = useState(true);

// //   const fetchProducts = async () => {
// //     setLoading(true);
// //     let url = `${BACKEND_URL}/api/products/admin?page=${page}&limit=8`;

// //     if (filter === "sold") url += "&isSold=true";
// //     if (filter === "unsold") url += "&isSold=false";
// //     if (category) url += `&category=${category}`;
// //     if (sort) url += `&sort=${sort}`;

// //     try {
// //       const res = await fetchWithAuth(url);
// //       const data = await res.json();
// //       setProducts(data.products || []);
// //       setPages(data.pages || 1);
// //     } catch (err) {
// //       console.error(err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const fetchCategories = async () => {
// //     try {
// //       const res = await fetchWithAuth(`${BACKEND_URL}/api/categories`);
// //       const data = await res.json();
// //       setCategories(data);
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchProducts();
// //     fetchCategories();
// //   }, [location.search]);

// //   const updateQuery = (params) => {
// //     const q = new URLSearchParams(location.search);
// //     Object.entries(params).forEach(([k, v]) => (v ? q.set(k, v) : q.delete(k)));
// //     navigate(`?${q.toString()}`);
// //   };

// //   const handleDelete = async (productId) => {
// //     if (!window.confirm("Are you sure you want to delete this product?"))
// //       return;

// //     try {
// //       const res = await fetchWithAuth(
// //         `${BACKEND_URL}/api/products/${productId}`,
// //         {
// //           method: "DELETE",
// //         }
// //       );

// //       if (res.ok) {
// //         alert("Product deleted successfully!");
// //         fetchProducts(); // Refresh the list
// //       } else {
// //         alert("Failed to delete product");
// //       }
// //     } catch (error) {
// //       console.error("Delete error:", error);
// //       alert("Error deleting product");
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen text-white py-12 px-6">
// //       {/* Header */}
// //       <div className="flex flex-wrap justify-between gap-4 mb-6">
// //         <div>
// //           <h1 className="text-3xl font-bold">Products Management</h1>
// //           <p className="text-gray-400 mt-1">
// //             Manage your products, view stock, and track sales
// //           </p>
// //         </div>

// //         <div className="flex gap-2 flex-wrap">
// //           <button
// //             onClick={() => navigate("/admin/products/new")}
// //             className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
// //           >
// //             <span>+</span>
// //             <span>Add Product</span>
// //           </button>
// //         </div>
// //       </div>

// //       {/* Filters */}
// //       <div className="bg-slate-800 rounded-xl p-4 mb-6">
// //         <div className="flex flex-wrap gap-4">
// //           <div className="flex-1 min-w-[200px]">
// //             <label className="block text-sm text-gray-400 mb-1">Category</label>
// //             <select
// //               value={category}
// //               onChange={(e) =>
// //                 updateQuery({ category: e.target.value, page: 1 })
// //               }
// //               className="w-full bg-slate-700 px-3 py-2 rounded border border-slate-600 focus:border-blue-500 focus:outline-none"
// //             >
// //               <option value="">All Categories</option>
// //               {categories.map((c) => (
// //                 <option key={c._id} value={c._id}>
// //                   {c.name}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>

// //           <div className="flex-1 min-w-[200px]">
// //             <label className="block text-sm text-gray-400 mb-1">Sort By</label>
// //             <select
// //               value={sort}
// //               onChange={(e) => updateQuery({ sort: e.target.value, page: 1 })}
// //               className="w-full bg-slate-700 px-3 py-2 rounded border border-slate-600 focus:border-blue-500 focus:outline-none"
// //             >
// //               <option value="createdAt">🕐 Latest</option>
// //               <option value="likes">🔥 Most Liked</option>
// //               <option value="stock">📦 High Stock</option>
// //               <option value="price">💰 Price: High to Low</option>
// //             </select>
// //           </div>

// //           <div className="flex-1 min-w-[200px]">
// //             <label className="block text-sm text-gray-400 mb-1">Status</label>
// //             <div className="flex gap-2">
// //               <button
// //                 onClick={() => updateQuery({ filter: null, page: 1 })}
// //                 className={`px-4 py-2 rounded ${
// //                   !filter ? "bg-blue-600" : "bg-slate-700 hover:bg-slate-600"
// //                 }`}
// //               >
// //                 All
// //               </button>
// //               <button
// //                 onClick={() => updateQuery({ filter: "sold", page: 1 })}
// //                 className={`px-4 py-2 rounded ${
// //                   filter === "sold"
// //                     ? "bg-red-600"
// //                     : "bg-slate-700 hover:bg-slate-600"
// //                 }`}
// //               >
// //                 Sold Out
// //               </button>
// //               <button
// //                 onClick={() => updateQuery({ filter: "unsold", page: 1 })}
// //                 className={`px-4 py-2 rounded ${
// //                   filter === "unsold"
// //                     ? "bg-green-600"
// //                     : "bg-slate-700 hover:bg-slate-600"
// //                 }`}
// //               >
// //                 In Stock
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Products Grid */}
// //       {loading ? (
// //         <div className="flex justify-center items-center h-64">
// //           <div className="text-center">
// //             <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
// //             <p className="text-gray-400">Loading products...</p>
// //           </div>
// //         </div>
// //       ) : products.length === 0 ? (
// //         <div className="text-center py-12">
// //           <div className="text-5xl mb-4">📦</div>
// //           <h3 className="text-xl font-semibold mb-2">No products found</h3>
// //           <p className="text-gray-400 mb-6">
// //             {filter || category || sort
// //               ? "Try changing your filters"
// //               : "Add your first product to get started"}
// //           </p>
// //           <button
// //             onClick={() => navigate("/admin/products/new")}
// //             className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium"
// //           >
// //             Add New Product
// //           </button>
// //         </div>
// //       ) : (
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
// //           {products.map((p) => (
// //             <div
// //               key={p._id}
// //               className="bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:shadow-xl"
// //             >
// //               {/* Product Image */}
// //               <div className="relative h-48 bg-slate-900">
// //                 <img
// //                   src={getImageUrl(p.image, {
// //                     width: 400,
// //                     height: 300,
// //                     crop: "fill",
// //                     quality: "auto",
// //                   })} // ✅ Use getImageUrl with optimizations
// //                   alt={p.name}
// //                   className="w-full h-full object-contain p-4"
// //                   onError={(e) => {
// //                     e.target.src = getImageUrl(null); // ✅ Use fallback from imageUtils
// //                     e.target.className = "w-full h-full object-cover p-4";
// //                   }}
// //                 />
// //                 <div className="absolute top-3 right-3">
// //                   <span
// //                     className={`px-3 py-1 text-xs font-semibold rounded-full ${
// //                       p.isSold
// //                         ? "bg-red-900/80 text-red-200"
// //                         : "bg-green-900/80 text-green-200"
// //                     }`}
// //                   >
// //                     {p.isSold ? "Sold Out" : "In Stock"}
// //                   </span>
// //                 </div>
// //               </div>

// //               {/* Product Info */}
// //               <div className="p-5">
// //                 <h3 className="font-bold text-lg mb-1 line-clamp-1">
// //                   {p.name}
// //                 </h3>

// //                 <div className="flex items-center justify-between mb-3">
// //                   <span className="text-2xl font-bold text-green-400">
// //                     ${p.price}
// //                   </span>
// //                   <div className="flex items-center gap-1 text-amber-500">
// //                     <span>❤️</span>
// //                     <span className="font-medium">{p.likesCount || 0}</span>
// //                   </div>
// //                 </div>

// //                 {/* Stats */}
// //                 <div className="grid grid-cols-2 gap-3 mb-4">
// //                   <div className="bg-slate-900/50 rounded-lg p-3">
// //                     <div className="text-xs text-gray-400">Stock</div>
// //                     <div className="font-bold text-lg">{p.stock}</div>
// //                   </div>
// //                   <div className="bg-slate-900/50 rounded-lg p-3">
// //                     <div className="text-xs text-gray-400">Category</div>
// //                     <div className="font-medium text-sm truncate">
// //                       {p.category?.name || "Uncategorized"}
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Action Buttons */}
// //                 <div className="flex gap-2">
// //                   <button
// //                     onClick={() => navigate(`/admin/products/edit/${p._id}`)}
// //                     className="flex-1 bg-blue-600 hover:bg-blue-700 px-4 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
// //                   >
// //                     <span>✏️</span>
// //                     <span>Edit</span>
// //                   </button>

// //                   <button
// //                     onClick={() => handleDelete(p._id)}
// //                     className="flex-1 bg-red-600 hover:bg-red-700 px-4 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
// //                   >
// //                     <span>🗑️</span>
// //                     <span>Delete</span>
// //                   </button>
// //                 </div>

// //                 <button
// //                   onClick={() => navigate(`/product/${p._id}`)}
// //                   className="w-full mt-3 text-sm text-blue-400 hover:text-blue-300 underline"
// //                 >
// //                   View Product Page →
// //                 </button>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}

// //       {/* Pagination */}
// //       {pages > 1 && (
// //         <div className="flex justify-center mt-8 gap-2">
// //           {page > 1 && (
// //             <button
// //               onClick={() => updateQuery({ page: page - 1 })}
// //               className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg"
// //             >
// //               ← Previous
// //             </button>
// //           )}

// //           {Array.from({ length: Math.min(pages, 5) }, (_, i) => {
// //             let pageNum;
// //             if (pages <= 5) {
// //               pageNum = i + 1;
// //             } else if (page <= 3) {
// //               pageNum = i + 1;
// //             } else if (page >= pages - 2) {
// //               pageNum = pages - 4 + i;
// //             } else {
// //               pageNum = page - 2 + i;
// //             }

// //             return (
// //               <button
// //                 key={pageNum}
// //                 onClick={() => updateQuery({ page: pageNum })}
// //                 className={`px-4 py-2 rounded-lg ${
// //                   page === pageNum
// //                     ? "bg-blue-600"
// //                     : "bg-slate-700 hover:bg-slate-600"
// //                 }`}
// //               >
// //                 {pageNum}
// //               </button>
// //             );
// //           })}

// //           {page < pages && (
// //             <button
// //               onClick={() => updateQuery({ page: page + 1 })}
// //               className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg"
// //             >
// //               Next →
// //             </button>
// //           )}
// //         </div>
// //       )}

// //       {/* Summary */}
// //       {!loading && products.length > 0 && (
// //         <div className="mt-8 text-center text-gray-400 text-sm">
// //           Showing {products.length} of many products • Page {page} of {pages}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default AdminProducts;
// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { fetchWithAuth } from "../utils/auth";
// import { getImageUrl } from "../utils/imageUtils";
// import {
//   Plus,
//   Edit,
//   Trash2,
//   Eye,
//   Package,
//   Filter,
//   Search,
//   ChevronLeft,
//   ChevronRight,
//   Grid,
//   List,
//   Sun,
//   Moon,
//   TrendingUp,
//   DollarSign,
//   ShoppingBag,
//   Star,
//   CheckCircle,
//   XCircle,
//   RefreshCw,
//   MoreVertical,
//   Download,
//   Settings,
// } from "lucide-react";

// const BACKEND_URL = import.meta.env.VITE_API_URL;

// const AdminProducts = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const query = new URLSearchParams(location.search);
//   const filter = query.get("filter");
//   const category = query.get("category") || "";
//   const sort = query.get("sort") || "";
//   const page = Number(query.get("page")) || 1;

//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [pages, setPages] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [theme, setTheme] = useState(() => {
//     const savedTheme = localStorage.getItem("admin-products-theme");
//     if (savedTheme) return savedTheme;
//     return window.matchMedia("(prefers-color-scheme: dark)").matches
//       ? "dark"
//       : "light";
//   });
//   const [viewMode, setViewMode] = useState("grid");
//   const [showFilters, setShowFilters] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [stats, setStats] = useState({
//     totalProducts: 0,
//     inStock: 0,
//     outOfStock: 0,
//     totalValue: 0,
//   });

//   // Theme classes
//   const themeClasses = {
//     container:
//       theme === "dark"
//         ? "bg-gradient-to-br from-slate-900 to-slate-950"
//         : "bg-gradient-to-br from-gray-50 to-gray-100",
//     text: theme === "dark" ? "text-white" : "text-gray-900",
//     textMuted: theme === "dark" ? "text-gray-400" : "text-gray-600",
//     textSecondary: theme === "dark" ? "text-gray-300" : "text-gray-700",
//     card: theme === "dark" ? "bg-slate-800/80" : "bg-white/90",
//     cardHover: theme === "dark" ? "hover:bg-slate-800/90" : "hover:bg-white",
//     border: theme === "dark" ? "border-slate-700/50" : "border-gray-200/70",
//     input:
//       theme === "dark"
//         ? "bg-slate-800 border-slate-700 text-white"
//         : "bg-white border-gray-300 text-gray-900",
//     statCard:
//       theme === "dark"
//         ? "bg-slate-800/50 border-slate-700/50"
//         : "bg-white/70 border-gray-200/70",
//     buttonPrimary:
//       theme === "dark"
//         ? "bg-green-500 hover:bg-green-600 text-white"
//         : "bg-green-600 hover:bg-green-700 text-white",
//     buttonSecondary:
//       theme === "dark"
//         ? "bg-slate-700 hover:bg-slate-600 text-white"
//         : "bg-gray-200 hover:bg-gray-300 text-gray-800",
//     buttonDanger:
//       theme === "dark"
//         ? "bg-red-500 hover:bg-red-600 text-white"
//         : "bg-red-600 hover:bg-red-700 text-white",
//   };

//   // Toggle theme
//   const toggleTheme = () => {
//     const newTheme = theme === "dark" ? "light" : "dark";
//     setTheme(newTheme);
//     localStorage.setItem("admin-products-theme", newTheme);
//     if (newTheme === "dark") {
//       document.documentElement.classList.add("dark");
//       document.documentElement.classList.remove("light");
//     } else {
//       document.documentElement.classList.add("light");
//       document.documentElement.classList.remove("dark");
//     }
//   };

//   // Apply theme on mount
//   useEffect(() => {
//     if (theme === "dark") {
//       document.documentElement.classList.add("dark");
//       document.documentElement.classList.remove("light");
//     } else {
//       document.documentElement.classList.add("light");
//       document.documentElement.classList.remove("dark");
//     }
//   }, [theme]);

//   const fetchProducts = async () => {
//     setLoading(true);
//     let url = `${BACKEND_URL}/api/products/admin?page=${page}&limit=10`;

//     if (filter === "sold") url += "&isSold=true";
//     if (filter === "unsold") url += "&isSold=false";
//     if (category) url += `&category=${category}`;
//     if (sort) url += `&sort=${sort}`;
//     if (searchQuery) url += `&search=${searchQuery}`;

//     try {
//       const res = await fetchWithAuth(url);
//       const data = await res.json();
//       setProducts(data.products || []);
//       setPages(data.pages || 1);

//       // Calculate stats
//       const inStockCount = data.products?.filter((p) => !p.isSold)?.length || 0;
//       const totalValue =
//         data.products?.reduce((sum, p) => sum + p.price * p.stock, 0) || 0;

//       setStats({
//         totalProducts: data.total || 0,
//         inStock: inStockCount,
//         outOfStock: data.products?.length - inStockCount || 0,
//         totalValue: totalValue,
//       });
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchCategories = async () => {
//     try {
//       const res = await fetchWithAuth(`${BACKEND_URL}/api/categories`);
//       const data = await res.json();
//       setCategories(data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//     fetchCategories();
//   }, [location.search, searchQuery]);

//   const updateQuery = (params) => {
//     const q = new URLSearchParams(location.search);
//     Object.entries(params).forEach(([k, v]) => (v ? q.set(k, v) : q.delete(k)));
//     navigate(`?${q.toString()}`);
//   };

//   const handleDelete = async (productId) => {
//     if (!window.confirm("Are you sure you want to delete this product?"))
//       return;

//     try {
//       const res = await fetchWithAuth(
//         `${BACKEND_URL}/api/products/${productId}`,
//         {
//           method: "DELETE",
//         }
//       );

//       if (res.ok) {
//         alert("Product deleted successfully!");
//         fetchProducts();
//       } else {
//         alert("Failed to delete product");
//       }
//     } catch (error) {
//       console.error("Delete error:", error);
//       alert("Error deleting product");
//     }
//   };

//   const exportProducts = () => {
//     const csvContent = [
//       ["Product ID", "Name", "Category", "Price", "Stock", "Status", "Likes"],
//       ...products.map((p) => [
//         p._id,
//         p.name,
//         p.category?.name || "Uncategorized",
//         `$${p.price}`,
//         p.stock,
//         p.isSold ? "Sold Out" : "In Stock",
//         p.likesCount || 0,
//       ]),
//     ]
//       .map((row) => row.join(","))
//       .join("\n");

//     const blob = new Blob([csvContent], { type: "text/csv" });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `products_${new Date().toISOString().split("T")[0]}.csv`;
//     a.click();
//   };

//   return (
//     <div
//       className={`min-h-screen transition-colors duration-300 ${themeClasses.container} ${themeClasses.text} p-3 sm:p-4 md:p-6 lg:p-8`}
//     >
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-6 sm:mb-8">
//           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
//             <div>
//               <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-500 mb-2">
//                 Products Management
//               </h1>
//               <p className={themeClasses.textMuted}>
//                 Manage your products, view stock, and track sales
//               </p>
//             </div>

//             <div className="flex items-center gap-3">
//               {/* View Mode Toggle */}
//               <div
//                 className={`flex rounded-lg overflow-hidden border ${themeClasses.border}`}
//               >
//                 <button
//                   onClick={() => setViewMode("grid")}
//                   className={`p-2 transition-all ${viewMode === "grid" ? (theme === "dark" ? "bg-slate-700" : "bg-gray-200") : ""}`}
//                   title="Grid View"
//                 >
//                   <Grid size={20} />
//                 </button>
//                 <button
//                   onClick={() => setViewMode("list")}
//                   className={`p-2 transition-all ${viewMode === "list" ? (theme === "dark" ? "bg-slate-700" : "bg-gray-200") : ""}`}
//                   title="List View"
//                 >
//                   <List size={20} />
//                 </button>
//               </div>

//               {/* Theme Toggle */}
//               <button
//                 onClick={toggleTheme}
//                 className={`p-2 rounded-lg transition-colors ${theme === "dark" ? "bg-slate-800 hover:bg-slate-700" : "bg-gray-200 hover:bg-gray-300"}`}
//                 title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
//               >
//                 {theme === "dark" ? (
//                   <Sun size={20} className="text-yellow-300" />
//                 ) : (
//                   <Moon size={20} className="text-gray-700" />
//                 )}
//               </button>

//               {/* Add Product */}
//               <button
//                 onClick={() => navigate("/admin/products/new")}
//                 className={`px-4 py-2 rounded-lg transition-all ${themeClasses.buttonPrimary} hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2`}
//               >
//                 <Plus size={20} />
//                 <span className="hidden sm:inline">Add Product</span>
//               </button>
//             </div>
//           </div>

//           {/* Stats Cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//             <div
//               className={`stat-card p-4 rounded-2xl border backdrop-blur-sm ${themeClasses.statCard}`}
//             >
//               <div className="flex items-center justify-between mb-2">
//                 <h3 className="font-semibold">Total Products</h3>
//                 <Package
//                   className={
//                     theme === "dark" ? "text-green-400" : "text-green-600"
//                   }
//                   size={24}
//                 />
//               </div>
//               <p
//                 className={`text-2xl font-bold ${theme === "dark" ? "text-green-400" : "text-green-600"}`}
//               >
//                 {stats.totalProducts}
//               </p>
//               <p className={`text-sm ${themeClasses.textMuted}`}>
//                 All products
//               </p>
//             </div>

//             <div
//               className={`stat-card p-4 rounded-2xl border backdrop-blur-sm ${themeClasses.statCard}`}
//             >
//               <div className="flex items-center justify-between mb-2">
//                 <h3 className="font-semibold">In Stock</h3>
//                 <CheckCircle
//                   className={
//                     theme === "dark" ? "text-blue-400" : "text-blue-600"
//                   }
//                   size={24}
//                 />
//               </div>
//               <p
//                 className={`text-2xl font-bold ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}
//               >
//                 {stats.inStock}
//               </p>
//               <p className={`text-sm ${themeClasses.textMuted}`}>
//                 Available products
//               </p>
//             </div>

//             <div
//               className={`stat-card p-4 rounded-2xl border backdrop-blur-sm ${themeClasses.statCard}`}
//             >
//               <div className="flex items-center justify-between mb-2">
//                 <h3 className="font-semibold">Out of Stock</h3>
//                 <XCircle
//                   className={theme === "dark" ? "text-red-400" : "text-red-600"}
//                   size={24}
//                 />
//               </div>
//               <p
//                 className={`text-2xl font-bold ${theme === "dark" ? "text-red-400" : "text-red-600"}`}
//               >
//                 {stats.outOfStock}
//               </p>
//               <p className={`text-sm ${themeClasses.textMuted}`}>
//                 Restock needed
//               </p>
//             </div>

//             <div
//               className={`stat-card p-4 rounded-2xl border backdrop-blur-sm ${themeClasses.statCard}`}
//             >
//               <div className="flex items-center justify-between mb-2">
//                 <h3 className="font-semibold">Total Value</h3>
//                 <DollarSign
//                   className={
//                     theme === "dark" ? "text-purple-400" : "text-purple-600"
//                   }
//                   size={24}
//                 />
//               </div>
//               <p
//                 className={`text-2xl font-bold ${theme === "dark" ? "text-purple-400" : "text-purple-600"}`}
//               >
//                 ${stats.totalValue.toFixed(2)}
//               </p>
//               <p className={`text-sm ${themeClasses.textMuted}`}>
//                 Inventory value
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Search & Filters */}
//         <div className="mb-6">
//           {/* Search Bar */}
//           <div className="relative mb-4">
//             <Search
//               className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
//               size={20}
//             />
//             <input
//               type="text"
//               placeholder="Search products by name, category, or SKU..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className={`w-full pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${themeClasses.input}`}
//             />
//           </div>

//           {/* Filters Toggle */}
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${themeClasses.buttonSecondary} hover:scale-[1.02]`}
//               >
//                 <Filter size={18} />
//                 {showFilters ? "Hide Filters" : "Show Filters"}
//                 {showFilters ? (
//                   <ChevronLeft size={18} />
//                 ) : (
//                   <ChevronRight size={18} />
//                 )}
//               </button>

//               <button
//                 onClick={exportProducts}
//                 className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${themeClasses.buttonSecondary} hover:scale-[1.02]`}
//               >
//                 <Download size={18} />
//                 <span className="hidden sm:inline">Export</span>
//               </button>
//             </div>

//             <div className="flex items-center gap-2">
//               <span className={themeClasses.textMuted}>Sort:</span>
//               <select
//                 value={sort}
//                 onChange={(e) => updateQuery({ sort: e.target.value, page: 1 })}
//                 className={`px-3 py-1.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${themeClasses.input}`}
//               >
//                 <option value="createdAt">Latest</option>
//                 <option value="likes">Most Liked</option>
//                 <option value="stock">High Stock</option>
//                 <option value="price">Price: High to Low</option>
//                 <option value="-price">Price: Low to High</option>
//               </select>
//             </div>
//           </div>

//           {/* Filters Panel */}
//           {showFilters && (
//             <div
//               className={`p-4 rounded-xl border mb-4 animate-slide-down ${themeClasses.statCard}`}
//             >
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium mb-2">
//                     Category
//                   </label>
//                   <select
//                     value={category}
//                     onChange={(e) =>
//                       updateQuery({ category: e.target.value, page: 1 })
//                     }
//                     className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${themeClasses.input}`}
//                   >
//                     <option value="">All Categories</option>
//                     {categories.map((c) => (
//                       <option key={c._id} value={c._id}>
//                         {c.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium mb-2">
//                     Status
//                   </label>
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => updateQuery({ filter: null, page: 1 })}
//                       className={`px-4 py-2 rounded-lg transition-all ${
//                         !filter
//                           ? theme === "dark"
//                             ? "bg-blue-600"
//                             : "bg-blue-600 text-white"
//                           : themeClasses.buttonSecondary
//                       } hover:scale-[1.02]`}
//                     >
//                       All
//                     </button>
//                     <button
//                       onClick={() => updateQuery({ filter: "sold", page: 1 })}
//                       className={`px-4 py-2 rounded-lg transition-all ${
//                         filter === "sold"
//                           ? theme === "dark"
//                             ? "bg-red-600"
//                             : "bg-red-600 text-white"
//                           : themeClasses.buttonSecondary
//                       } hover:scale-[1.02]`}
//                     >
//                       Sold Out
//                     </button>
//                     <button
//                       onClick={() => updateQuery({ filter: "unsold", page: 1 })}
//                       className={`px-4 py-2 rounded-lg transition-all ${
//                         filter === "unsold"
//                           ? theme === "dark"
//                             ? "bg-green-600"
//                             : "bg-green-600 text-white"
//                           : themeClasses.buttonSecondary
//                       } hover:scale-[1.02]`}
//                     >
//                       In Stock
//                     </button>
//                   </div>
//                 </div>

//                 <div className="flex items-end">
//                   <button
//                     onClick={() => {
//                       setSearchQuery("");
//                       updateQuery({
//                         category: "",
//                         filter: null,
//                         sort: "",
//                         page: 1,
//                       });
//                     }}
//                     className={`w-full px-4 py-2 rounded-lg transition-all ${themeClasses.buttonSecondary} hover:scale-[1.02]`}
//                   >
//                     Clear Filters
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Loading State */}
//         {loading ? (
//           <div className="flex flex-col items-center justify-center py-20">
//             <div className="relative">
//               <div className="w-16 h-16 border-4 border-transparent border-t-green-500 border-r-green-500 rounded-full animate-spin mx-auto mb-6"></div>
//               <Package
//                 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-500"
//                 size={20}
//               />
//             </div>
//             <p className={themeClasses.textMuted}>Loading products...</p>
//           </div>
//         ) : products.length === 0 ? (
//           <div
//             className={`text-center py-16 rounded-2xl border ${themeClasses.statCard}`}
//           >
//             <div
//               className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${theme === "dark" ? "bg-slate-800" : "bg-gray-200"}`}
//             >
//               <Package
//                 className={`${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}
//                 size={40}
//               />
//             </div>
//             <h3 className="text-xl font-semibold mb-3">No products found</h3>
//             <p className={`mb-6 ${themeClasses.textMuted}`}>
//               {filter || category || sort || searchQuery
//                 ? "Try changing your filters or search terms"
//                 : "Add your first product to get started"}
//             </p>
//             <button
//               onClick={() => navigate("/admin/products/new")}
//               className={`px-6 py-3 rounded-lg transition-all ${themeClasses.buttonPrimary} hover:scale-[1.05] active:scale-[0.95]`}
//             >
//               Add New Product
//             </button>
//           </div>
//         ) : (
//           // CHANGED: 2 columns on medium and large devices
//           <div
//             className={
//               viewMode === "grid"
//                 ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5"
//                 : "flex flex-col gap-5"
//             }
//           >
//             {products.map((p) => (
//               <div
//                 key={p._id}
//                 className={`${themeClasses.card} rounded-2xl border shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 min-w-0 ${
//                   viewMode === "list" ? "flex flex-col md:flex-row gap-5" : ""
//                 }`}
//               >
//                 {/* Product Image */}
//                 <div className={`${viewMode === "list" ? "md:w-1/3" : ""}`}>
//                   <div
//                     className={`relative ${viewMode === "list" ? "h-48 md:h-full" : "h-48"}`}
//                   >
//                     <img
//                       src={getImageUrl(p.image, {
//                         width: 400,
//                         height: viewMode === "list" ? 300 : 200,
//                         crop: "fill",
//                         quality: "auto",
//                       })}
//                       alt={p.name}
//                       className={`w-full h-full ${viewMode === "list" ? "object-cover" : "object-contain"} p-4`}
//                       onError={(e) => {
//                         e.target.src = getImageUrl(null);
//                         e.target.className = `w-full h-full ${viewMode === "list" ? "object-cover" : "object-contain"} p-4`;
//                       }}
//                     />
//                     <div className="absolute top-3 right-3">
//                       <span
//                         className={`px-3 py-1 text-xs font-semibold rounded-full ${
//                           p.isSold
//                             ? theme === "dark"
//                               ? "bg-red-900/80 text-red-200"
//                               : "bg-red-100 text-red-800"
//                             : theme === "dark"
//                               ? "bg-green-900/80 text-green-200"
//                               : "bg-green-100 text-green-800"
//                         }`}
//                       >
//                         {p.isSold ? "Sold Out" : "In Stock"}
//                       </span>
//                     </div>
//                     <div className="absolute bottom-3 left-3">
//                       <span
//                         className={`px-2 py-1 text-xs font-semibold rounded-full ${
//                           theme === "dark"
//                             ? "bg-slate-900/80 text-gray-300"
//                             : "bg-gray-900/10 text-gray-700"
//                         }`}
//                       >
//                         {p.category?.name || "Uncategorized"}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Product Info */}
//                 <div className={`p-5 ${viewMode === "list" ? "md:w-2/3" : ""}`}>
//                   <div className="flex justify-between items-start mb-3">
//                     <div className="flex-1 min-w-0">
//                       <h3
//                         className="font-bold text-lg mb-1 truncate"
//                         title={p.name}
//                       >
//                         {p.name}
//                       </h3>
//                       <p
//                         className={`text-sm ${themeClasses.textMuted} mb-2 line-clamp-2`}
//                       >
//                         {p.description?.substring(0, 100)}...
//                       </p>
//                     </div>
//                     <button
//                       className={`p-2 rounded-lg ${theme === "dark" ? "hover:bg-slate-700" : "hover:bg-gray-200"}`}
//                     >
//                       <MoreVertical
//                         size={20}
//                         className={themeClasses.textMuted}
//                       />
//                     </button>
//                   </div>

//                   {/* Stats */}
//                   <div className="grid grid-cols-3 gap-3 mb-4">
//                     <div
//                       className={`rounded-lg p-3 ${theme === "dark" ? "bg-slate-900/50" : "bg-gray-100/50"}`}
//                     >
//                       <div className="text-xs text-gray-500 mb-1">Price</div>
//                       <div
//                         className={`font-bold text-lg ${theme === "dark" ? "text-green-400" : "text-green-600"}`}
//                       >
//                         ${p.price}
//                       </div>
//                     </div>
//                     <div
//                       className={`rounded-lg p-3 ${theme === "dark" ? "bg-slate-900/50" : "bg-gray-100/50"}`}
//                     >
//                       <div className="text-xs text-gray-500 mb-1">Stock</div>
//                       <div
//                         className={`font-bold text-lg ${p.stock < 10 ? "text-red-500" : theme === "dark" ? "text-blue-400" : "text-blue-600"}`}
//                       >
//                         {p.stock}
//                       </div>
//                     </div>
//                     <div
//                       className={`rounded-lg p-3 ${theme === "dark" ? "bg-slate-900/50" : "bg-gray-100/50"}`}
//                     >
//                       <div className="text-xs text-gray-500 mb-1">Likes</div>
//                       <div className="font-bold text-lg flex items-center gap-1">
//                         <Star size={14} className="text-amber-500" />
//                         {p.likesCount || 0}
//                       </div>
//                     </div>
//                   </div>

//                   {/* Additional Info */}
//                   <div className="mb-4">
//                     <div className="flex items-center justify-between text-sm">
//                       <span className={themeClasses.textMuted}>Created:</span>
//                       <span className={themeClasses.textSecondary}>
//                         {new Date(p.createdAt).toLocaleDateString()}
//                       </span>
//                     </div>
//                     {p.updatedAt && (
//                       <div className="flex items-center justify-between text-sm">
//                         <span className={themeClasses.textMuted}>
//                           Last Updated:
//                         </span>
//                         <span className={themeClasses.textSecondary}>
//                           {new Date(p.updatedAt).toLocaleDateString()}
//                         </span>
//                       </div>
//                     )}
//                   </div>

//                   {/* Action Buttons */}
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => navigate(`/admin/products/edit/${p._id}`)}
//                       className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-2 ${
//                         theme === "dark"
//                           ? "bg-blue-500/20 text-blue-300 hover:bg-blue-500/30"
//                           : "bg-blue-100 text-blue-700 hover:bg-blue-200"
//                       } hover:scale-[1.02] active:scale-[0.98]`}
//                     >
//                       <Edit size={16} />
//                       Edit
//                     </button>

//                     <button
//                       onClick={() => navigate(`/product/${p._id}`)}
//                       className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-2 ${
//                         theme === "dark"
//                           ? "bg-slate-700 text-gray-300 hover:bg-slate-600"
//                           : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//                       } hover:scale-[1.02] active:scale-[0.98]`}
//                     >
//                       <Eye size={16} />
//                       View
//                     </button>

//                     <button
//                       onClick={() => handleDelete(p._id)}
//                       className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-2 ${
//                         theme === "dark"
//                           ? "bg-red-500/20 text-red-300 hover:bg-red-500/30"
//                           : "bg-red-100 text-red-700 hover:bg-red-200"
//                       } hover:scale-[1.02] active:scale-[0.98]`}
//                     >
//                       <Trash2 size={16} />
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Pagination */}
//         {pages > 1 && (
//           <div className="flex justify-center mt-8 gap-2">
//             <button
//               onClick={() => updateQuery({ page: page - 1 })}
//               disabled={page <= 1}
//               className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
//                 page <= 1
//                   ? "opacity-50 cursor-not-allowed"
//                   : themeClasses.buttonSecondary
//               } hover:scale-[1.02]`}
//             >
//               <ChevronLeft size={18} />
//               Previous
//             </button>

//             {Array.from({ length: Math.min(pages, 5) }, (_, i) => {
//               let pageNum;
//               if (pages <= 5) {
//                 pageNum = i + 1;
//               } else if (page <= 3) {
//                 pageNum = i + 1;
//               } else if (page >= pages - 2) {
//                 pageNum = pages - 4 + i;
//               } else {
//                 pageNum = page - 2 + i;
//               }

//               return (
//                 <button
//                   key={pageNum}
//                   onClick={() => updateQuery({ page: pageNum })}
//                   className={`px-4 py-2 rounded-lg transition-all ${
//                     page === pageNum
//                       ? theme === "dark"
//                         ? "bg-blue-600"
//                         : "bg-blue-600 text-white"
//                       : themeClasses.buttonSecondary
//                   } hover:scale-[1.02]`}
//                 >
//                   {pageNum}
//                 </button>
//               );
//             })}

//             <button
//               onClick={() => updateQuery({ page: page + 1 })}
//               disabled={page >= pages}
//               className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
//                 page >= pages
//                   ? "opacity-50 cursor-not-allowed"
//                   : themeClasses.buttonSecondary
//               } hover:scale-[1.02]`}
//             >
//               Next
//               <ChevronRight size={18} />
//             </button>
//           </div>
//         )}

//         {/* Summary */}
//         {!loading && products.length > 0 && (
//           <div
//             className={`mt-8 p-4 rounded-xl border ${themeClasses.statCard}`}
//           >
//             <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
//               <div className="text-center sm:text-left">
//                 <p className={`text-sm ${themeClasses.textMuted}`}>
//                   Showing {products.length} of {stats.totalProducts} products •
//                   Page {page} of {pages}
//                 </p>
//                 <p className={`text-sm ${themeClasses.textMuted}`}>
//                   Total inventory value: ${stats.totalValue.toFixed(2)}
//                 </p>
//               </div>

//               <div className="flex gap-2">
//                 <button
//                   onClick={() =>
//                     window.scrollTo({ top: 0, behavior: "smooth" })
//                   }
//                   className={`px-4 py-2 rounded-lg transition-all ${themeClasses.buttonSecondary} hover:scale-[1.02]`}
//                 >
//                   Back to Top
//                 </button>

//                 <button
//                   onClick={fetchProducts}
//                   className={`px-4 py-2 rounded-lg transition-all ${themeClasses.buttonPrimary} hover:scale-[1.02] flex items-center gap-2`}
//                 >
//                   <RefreshCw size={18} />
//                   Refresh
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminProducts;
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchWithAuth } from "../utils/auth";
import { getImageUrl } from "../utils/imageUtils";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Package,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  Grid,
  List,
  Sun,
  Moon,
  TrendingUp,
  DollarSign,
  ShoppingBag,
  Star,
  CheckCircle,
  XCircle,
  RefreshCw,
  MoreVertical,
  Download,
  Tag,
  AlertCircle,
} from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const AdminProducts = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const filter = query.get("filter");
  const category = query.get("category") || "";
  const sort = query.get("sort") || "";
  const page = Number(query.get("page")) || 1;

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("admin-products-theme");
    if (savedTheme) return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });
  const [viewMode, setViewMode] = useState("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState({
    totalProducts: 0,
    inStock: 0,
    outOfStock: 0,
    totalValue: 0,
  });

  // Theme classes
  const themeClasses = {
    container:
      theme === "dark"
        ? "bg-gradient-to-br from-slate-900 to-slate-950"
        : "bg-gradient-to-br from-gray-50 to-gray-100",
    text: theme === "dark" ? "text-white" : "text-gray-900",
    textMuted: theme === "dark" ? "text-gray-400" : "text-gray-600",
    textSecondary: theme === "dark" ? "text-gray-300" : "text-gray-700",
    card: theme === "dark" ? "bg-slate-800/80" : "bg-white/90",
    cardHover: theme === "dark" ? "hover:bg-slate-800/90" : "hover:bg-white",
    border: theme === "dark" ? "border-slate-700/50" : "border-gray-200/70",
    input:
      theme === "dark"
        ? "bg-slate-800 border-slate-700 text-white"
        : "bg-white border-gray-300 text-gray-900",
    statCard:
      theme === "dark"
        ? "bg-slate-800/50 border-slate-700/50"
        : "bg-white/70 border-gray-200/70",
    buttonPrimary:
      theme === "dark"
        ? "bg-green-500 hover:bg-green-600 text-white"
        : "bg-green-600 hover:bg-green-700 text-white",
    buttonSecondary:
      theme === "dark"
        ? "bg-slate-700 hover:bg-slate-600 text-white"
        : "bg-gray-200 hover:bg-gray-300 text-gray-800",
    buttonDanger:
      theme === "dark"
        ? "bg-red-500 hover:bg-red-600 text-white"
        : "bg-red-600 hover:bg-red-700 text-white",
  };

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("admin-products-theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  };

  // Apply theme on mount
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Helper function to safely get description
  const getDescription = (description) => {
    if (!description) return "";
    if (typeof description === "string") return description;
    if (typeof description === "object") return JSON.stringify(description);
    return String(description);
  };

  // Helper function to truncate text
  const truncateText = (text, length = 100) => {
    const safeText = getDescription(text);
    return safeText.length > length
      ? safeText.substring(0, length) + "..."
      : safeText;
  };

  const fetchProducts = async () => {
    setLoading(true);
    let url = `${BACKEND_URL}/api/products/admin?page=${page}&limit=10`;

    if (filter === "sold") url += "&isSold=true";
    if (filter === "unsold") url += "&isSold=false";
    if (category) url += `&category=${category}`;
    if (sort) url += `&sort=${sort}`;
    if (searchQuery) url += `&search=${searchQuery}`;

    try {
      const res = await fetchWithAuth(url);
      const data = await res.json();

      // Validate and transform product data
      const validatedProducts = (data.products || []).map((product) => ({
        ...product,
        name: product.name || "Unnamed Product",
        price: Number(product.price) || 0,
        stock: Number(product.stock) || 0,
        likesCount: Number(product.likesCount) || 0,
        description: getDescription(product.description),
        category: product.category || { name: "Uncategorized" },
        isSold: Boolean(product.isSold),
        image: product.image || null,
        createdAt: product.createdAt || new Date().toISOString(),
        updatedAt:
          product.updatedAt || product.createdAt || new Date().toISOString(),
      }));

      setProducts(validatedProducts);
      setPages(data.pages || 1);

      // Calculate stats
      const inStockCount = validatedProducts.filter(
        (p) => !p.isSold && p.stock > 0
      ).length;
      const totalValue = validatedProducts.reduce(
        (sum, p) => sum + p.price * p.stock,
        0
      );

      setStats({
        totalProducts: data.total || validatedProducts.length,
        inStock: inStockCount,
        outOfStock: validatedProducts.filter((p) => p.isSold || p.stock <= 0)
          .length,
        totalValue: totalValue,
      });
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetchWithAuth(`${BACKEND_URL}/api/categories`);
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [location.search, searchQuery]);

  const updateQuery = (params) => {
    const q = new URLSearchParams(location.search);
    Object.entries(params).forEach(([k, v]) => (v ? q.set(k, v) : q.delete(k)));
    navigate(`?${q.toString()}`);
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const res = await fetchWithAuth(
        `${BACKEND_URL}/api/products/${productId}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        alert("Product deleted successfully!");
        fetchProducts();
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error deleting product");
    }
  };

  const exportProducts = () => {
    try {
      const csvContent = [
        [
          "Product ID",
          "Name",
          "Category",
          "Price",
          "Stock",
          "Status",
          "Likes",
          "Description",
        ],
        ...products.map((p) => [
          p._id || "",
          p.name || "",
          p.category?.name || "Uncategorized",
          `$${p.price || 0}`,
          p.stock || 0,
          p.isSold || p.stock <= 0 ? "Sold Out" : "In Stock",
          p.likesCount || 0,
          getDescription(p.description).replace(/"/g, '""'), // Escape quotes for CSV
        ]),
      ]
        .map((row) => row.map((cell) => `"${cell}"`).join(","))
        .join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `products_${new Date().toISOString().split("T")[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting products:", error);
      alert("Error exporting products");
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${themeClasses.container} ${themeClasses.text} p-3 sm:p-4 md:p-6 lg:p-8`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-500 mb-2">
                Products Management
              </h1>
              <p className={themeClasses.textMuted}>
                Manage your products, view stock, and track sales
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* View Mode Toggle */}
              <div
                className={`flex rounded-lg overflow-hidden border ${themeClasses.border}`}
              >
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 transition-all ${viewMode === "grid" ? (theme === "dark" ? "bg-slate-700" : "bg-gray-200") : ""}`}
                  title="Grid View"
                >
                  <Grid size={20} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 transition-all ${viewMode === "list" ? (theme === "dark" ? "bg-slate-700" : "bg-gray-200") : ""}`}
                  title="List View"
                >
                  <List size={20} />
                </button>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${theme === "dark" ? "bg-slate-800 hover:bg-slate-700" : "bg-gray-200 hover:bg-gray-300"}`}
                title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                {theme === "dark" ? (
                  <Sun size={20} className="text-yellow-300" />
                ) : (
                  <Moon size={20} className="text-gray-700" />
                )}
              </button>

              {/* Add Product */}
              <button
                onClick={() => navigate("/admin/products/new")}
                className={`px-4 py-2 rounded-lg transition-all ${themeClasses.buttonPrimary} hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2`}
              >
                <Plus size={20} />
                <span className="hidden sm:inline">Add Product</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div
              className={`stat-card p-4 rounded-2xl border backdrop-blur-sm ${themeClasses.statCard}`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Total Products</h3>
                <Package
                  className={
                    theme === "dark" ? "text-green-400" : "text-green-600"
                  }
                  size={24}
                />
              </div>
              <p
                className={`text-2xl font-bold ${theme === "dark" ? "text-green-400" : "text-green-600"}`}
              >
                {stats.totalProducts}
              </p>
              <p className={`text-sm ${themeClasses.textMuted}`}>
                All products
              </p>
            </div>

            <div
              className={`stat-card p-4 rounded-2xl border backdrop-blur-sm ${themeClasses.statCard}`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">In Stock</h3>
                <CheckCircle
                  className={
                    theme === "dark" ? "text-blue-400" : "text-blue-600"
                  }
                  size={24}
                />
              </div>
              <p
                className={`text-2xl font-bold ${theme === "dark" ? "text-blue-400" : "text-blue-600"}`}
              >
                {stats.inStock}
              </p>
              <p className={`text-sm ${themeClasses.textMuted}`}>
                Available products
              </p>
            </div>

            <div
              className={`stat-card p-4 rounded-2xl border backdrop-blur-sm ${themeClasses.statCard}`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Out of Stock</h3>
                <XCircle
                  className={theme === "dark" ? "text-red-400" : "text-red-600"}
                  size={24}
                />
              </div>
              <p
                className={`text-2xl font-bold ${theme === "dark" ? "text-red-400" : "text-red-600"}`}
              >
                {stats.outOfStock}
              </p>
              <p className={`text-sm ${themeClasses.textMuted}`}>
                Restock needed
              </p>
            </div>

            <div
              className={`stat-card p-4 rounded-2xl border backdrop-blur-sm ${themeClasses.statCard}`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Total Value</h3>
                <DollarSign
                  className={
                    theme === "dark" ? "text-purple-400" : "text-purple-600"
                  }
                  size={24}
                />
              </div>
              <p
                className={`text-2xl font-bold ${theme === "dark" ? "text-purple-400" : "text-purple-600"}`}
              >
                ${stats.totalValue.toFixed(2)}
              </p>
              <p className={`text-sm ${themeClasses.textMuted}`}>
                Inventory value
              </p>
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="mb-6">
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search products by name, category, or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${themeClasses.input}`}
            />
          </div>

          {/* Filters Toggle */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${themeClasses.buttonSecondary} hover:scale-[1.02]`}
              >
                <Filter size={18} />
                {showFilters ? "Hide Filters" : "Show Filters"}
                {showFilters ? (
                  <ChevronLeft size={18} />
                ) : (
                  <ChevronRight size={18} />
                )}
              </button>

              <button
                onClick={exportProducts}
                className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${themeClasses.buttonSecondary} hover:scale-[1.02]`}
              >
                <Download size={18} />
                <span className="hidden sm:inline">Export</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className={themeClasses.textMuted}>Sort:</span>
              <select
                value={sort}
                onChange={(e) => updateQuery({ sort: e.target.value, page: 1 })}
                className={`px-3 py-1.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${themeClasses.input}`}
              >
                <option value="">Default</option>
                <option value="createdAt">Latest</option>
                <option value="-createdAt">Oldest</option>
                <option value="likes">Most Liked</option>
                <option value="stock">High Stock</option>
                <option value="-stock">Low Stock</option>
                <option value="price">Price: High to Low</option>
                <option value="-price">Price: Low to High</option>
              </select>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div
              className={`p-4 rounded-xl border mb-4 ${themeClasses.statCard}`}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) =>
                      updateQuery({ category: e.target.value, page: 1 })
                    }
                    className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all ${themeClasses.input}`}
                  >
                    <option value="">All Categories</option>
                    {categories.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Status
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => updateQuery({ filter: null, page: 1 })}
                      className={`px-3 py-1.5 rounded-lg transition-all text-sm ${
                        !filter
                          ? theme === "dark"
                            ? "bg-blue-600"
                            : "bg-blue-600 text-white"
                          : themeClasses.buttonSecondary
                      } hover:scale-[1.02]`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => updateQuery({ filter: "sold", page: 1 })}
                      className={`px-3 py-1.5 rounded-lg transition-all text-sm ${
                        filter === "sold"
                          ? theme === "dark"
                            ? "bg-red-600"
                            : "bg-red-600 text-white"
                          : themeClasses.buttonSecondary
                      } hover:scale-[1.02]`}
                    >
                      Sold Out
                    </button>
                    <button
                      onClick={() => updateQuery({ filter: "unsold", page: 1 })}
                      className={`px-3 py-1.5 rounded-lg transition-all text-sm ${
                        filter === "unsold"
                          ? theme === "dark"
                            ? "bg-green-600"
                            : "bg-green-600 text-white"
                          : themeClasses.buttonSecondary
                      } hover:scale-[1.02]`}
                    >
                      In Stock
                    </button>
                  </div>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      updateQuery({
                        category: "",
                        filter: null,
                        sort: "",
                        page: 1,
                      });
                    }}
                    className={`w-full px-4 py-2 rounded-lg transition-all ${themeClasses.buttonSecondary} hover:scale-[1.02]`}
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-transparent border-t-green-500 border-r-green-500 rounded-full animate-spin mx-auto mb-6"></div>
              <Package
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-500"
                size={20}
              />
            </div>
            <p className={themeClasses.textMuted}>Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div
            className={`text-center py-16 rounded-2xl border ${themeClasses.statCard}`}
          >
            <div
              className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${theme === "dark" ? "bg-slate-800" : "bg-gray-200"}`}
            >
              <Package
                className={`${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}
                size={40}
              />
            </div>
            <h3 className="text-xl font-semibold mb-3">No products found</h3>
            <p className={`mb-6 ${themeClasses.textMuted}`}>
              {filter || category || sort || searchQuery
                ? "Try changing your filters or search terms"
                : "Add your first product to get started"}
            </p>
            <button
              onClick={() => navigate("/admin/products/new")}
              className={`px-6 py-3 rounded-lg transition-all ${themeClasses.buttonPrimary} hover:scale-[1.05] active:scale-[0.95]`}
            >
              Add New Product
            </button>
          </div>
        ) : (
          // 2 columns on medium and large devices
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5"
                : "flex flex-col gap-5"
            }
          >
            {products.map((p) => (
              <div
                key={p._id}
                className={`${themeClasses.card} rounded-2xl border shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 min-w-0 ${
                  viewMode === "list" ? "flex flex-col md:flex-row gap-5" : ""
                }`}
              >
                {/* Product Image */}
                <div className={`${viewMode === "list" ? "md:w-1/3" : ""}`}>
                  <div
                    className={`relative ${viewMode === "list" ? "h-48 md:h-full" : "h-48"}`}
                  >
                    <img
                      src={getImageUrl(p.image, {
                        width: 400,
                        height: viewMode === "list" ? 300 : 200,
                        crop: "fill",
                        quality: "auto",
                      })}
                      alt={p.name}
                      className={`w-full h-full ${viewMode === "list" ? "object-cover" : "object-contain"} p-4`}
                      onError={(e) => {
                        e.target.src = getImageUrl(null);
                        e.target.className = `w-full h-full ${viewMode === "list" ? "object-cover" : "object-contain"} p-4`;
                      }}
                    />
                    <div className="absolute top-3 right-3">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          p.isSold || p.stock <= 0
                            ? theme === "dark"
                              ? "bg-red-900/80 text-red-200"
                              : "bg-red-100 text-red-800"
                            : theme === "dark"
                              ? "bg-green-900/80 text-green-200"
                              : "bg-green-100 text-green-800"
                        }`}
                      >
                        {p.isSold || p.stock <= 0 ? "Sold Out" : "In Stock"}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full flex items-center gap-1 ${
                          theme === "dark"
                            ? "bg-slate-900/80 text-gray-300"
                            : "bg-gray-900/10 text-gray-700"
                        }`}
                      >
                        <Tag size={10} />
                        {p.category?.name || "Uncategorized"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className={`p-5 ${viewMode === "list" ? "md:w-2/3" : ""}`}>
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1 min-w-0">
                      <h3
                        className="font-bold text-lg mb-1 truncate"
                        title={p.name}
                      >
                        {p.name}
                      </h3>
                      <p
                        className={`text-sm ${themeClasses.textMuted} mb-2 line-clamp-2`}
                      >
                        {truncateText(p.description, 100)}
                      </p>
                    </div>
                    <button
                      className={`p-2 rounded-lg ${theme === "dark" ? "hover:bg-slate-700" : "hover:bg-gray-200"}`}
                    >
                      <MoreVertical
                        size={20}
                        className={themeClasses.textMuted}
                      />
                    </button>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div
                      className={`rounded-lg p-3 ${theme === "dark" ? "bg-slate-900/50" : "bg-gray-100/50"}`}
                    >
                      <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                        <DollarSign size={10} />
                        Price
                      </div>
                      <div
                        className={`font-bold text-lg ${theme === "dark" ? "text-green-400" : "text-green-600"}`}
                      >
                        ${p.price.toFixed(2)}
                      </div>
                    </div>
                    <div
                      className={`rounded-lg p-3 ${theme === "dark" ? "bg-slate-900/50" : "bg-gray-100/50"}`}
                    >
                      <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                        <Package size={10} />
                        Stock
                      </div>
                      <div
                        className={`font-bold text-lg ${p.stock < 10 ? "text-red-500" : theme === "dark" ? "text-blue-400" : "text-blue-600"}`}
                      >
                        {p.stock}
                        {p.stock < 10 && p.stock > 0 && (
                          <span className="text-xs ml-1 text-red-500">Low</span>
                        )}
                      </div>
                    </div>
                    <div
                      className={`rounded-lg p-3 ${theme === "dark" ? "bg-slate-900/50" : "bg-gray-100/50"}`}
                    >
                      <div className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                        <Star size={10} className="text-amber-500" />
                        Likes
                      </div>
                      <div className="font-bold text-lg flex items-center gap-1">
                        {p.likesCount}
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="mb-4 space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span
                        className={`flex items-center gap-1 ${themeClasses.textMuted}`}
                      >
                        <Calendar size={12} />
                        Created:
                      </span>
                      <span className={themeClasses.textSecondary}>
                        {new Date(p.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    {p.updatedAt && p.updatedAt !== p.createdAt && (
                      <div className="flex items-center justify-between text-sm">
                        <span
                          className={`flex items-center gap-1 ${themeClasses.textMuted}`}
                        >
                          <RefreshCw size={12} />
                          Updated:
                        </span>
                        <span className={themeClasses.textSecondary}>
                          {new Date(p.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/admin/products/edit/${p._id}`)}
                      className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-2 ${
                        theme === "dark"
                          ? "bg-blue-500/20 text-blue-300 hover:bg-blue-500/30"
                          : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                      } hover:scale-[1.02] active:scale-[0.98]`}
                    >
                      <Edit size={16} />
                      Edit
                    </button>

                    <button
                      onClick={() => navigate(`/product/${p._id}`)}
                      className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-2 ${
                        theme === "dark"
                          ? "bg-slate-700 text-gray-300 hover:bg-slate-600"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      } hover:scale-[1.02] active:scale-[0.98]`}
                    >
                      <Eye size={16} />
                      View
                    </button>

                    <button
                      onClick={() => handleDelete(p._id)}
                      className={`flex-1 py-2 rounded-lg transition-all flex items-center justify-center gap-2 ${
                        theme === "dark"
                          ? "bg-red-500/20 text-red-300 hover:bg-red-500/30"
                          : "bg-red-100 text-red-700 hover:bg-red-200"
                      } hover:scale-[1.02] active:scale-[0.98]`}
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pages > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            <button
              onClick={() => updateQuery({ page: page - 1 })}
              disabled={page <= 1}
              className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                page <= 1
                  ? "opacity-50 cursor-not-allowed"
                  : themeClasses.buttonSecondary
              } hover:scale-[1.02]`}
            >
              <ChevronLeft size={18} />
              Previous
            </button>

            {Array.from({ length: Math.min(pages, 5) }, (_, i) => {
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

              return (
                <button
                  key={pageNum}
                  onClick={() => updateQuery({ page: pageNum })}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    page === pageNum
                      ? theme === "dark"
                        ? "bg-blue-600"
                        : "bg-blue-600 text-white"
                      : themeClasses.buttonSecondary
                  } hover:scale-[1.02]`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => updateQuery({ page: page + 1 })}
              disabled={page >= pages}
              className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                page >= pages
                  ? "opacity-50 cursor-not-allowed"
                  : themeClasses.buttonSecondary
              } hover:scale-[1.02]`}
            >
              Next
              <ChevronRight size={18} />
            </button>
          </div>
        )}

        {/* Summary */}
        {!loading && products.length > 0 && (
          <div
            className={`mt-8 p-4 rounded-xl border ${themeClasses.statCard}`}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <p className={`text-sm ${themeClasses.textMuted}`}>
                  Showing {products.length} of {stats.totalProducts} products •
                  Page {page} of {pages}
                </p>
                <p className={`text-sm ${themeClasses.textMuted}`}>
                  Total inventory value: ${stats.totalValue.toFixed(2)}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <button
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className={`px-4 py-2 rounded-lg transition-all ${themeClasses.buttonSecondary} hover:scale-[1.02]`}
                >
                  Back to Top
                </button>

                <button
                  onClick={fetchProducts}
                  className={`px-4 py-2 rounded-lg transition-all ${themeClasses.buttonPrimary} hover:scale-[1.02] flex items-center justify-center gap-2`}
                >
                  <RefreshCw size={18} />
                  Refresh
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Add missing Calendar icon component
const Calendar = ({ size, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

export default AdminProducts;
