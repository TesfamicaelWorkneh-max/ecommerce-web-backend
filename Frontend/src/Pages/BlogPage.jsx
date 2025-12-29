// import React, { useState, useEffect } from "react";
// import { Link, useSearchParams, useNavigate } from "react-router-dom";
// import {
//   CalendarDays,
//   Clock,
//   Eye,
//   MessageCircle,
//   Heart,
//   Search,
//   TrendingUp,
//   Filter,
//   X,
//   ChevronLeft,
//   ChevronRight,
//   ChevronDown,
//   BookOpen,
// } from "lucide-react";

// const BACKEND_URL = import.meta.env.VITE_API_URL;

// const BlogPage = () => {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const navigate = useNavigate();

//   // State
//   const [blogs, setBlogs] = useState([]);
//   const [featuredPosts, setFeaturedPosts] = useState([]);
//   const [trendingPosts, setTrendingPosts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [tags, setTags] = useState([]);
//   const [recentAuthors, setRecentAuthors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [pagination, setPagination] = useState({});
//   const [searchTerm, setSearchTerm] = useState(
//     searchParams.get("search") || ""
//   );
//   const [showMobileFilters, setShowMobileFilters] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState(
//     searchParams.get("category") || ""
//   );
//   const [selectedTag, setSelectedTag] = useState(searchParams.get("tag") || "");
//   const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

//   // Get current filters
//   const currentPage = parseInt(searchParams.get("page")) || 1;
//   const currentCategory = searchParams.get("category") || "";
//   const currentTag = searchParams.get("tag") || "";
//   const currentFeatured = searchParams.get("featured") === "true";
//   const currentTrending = searchParams.get("trending") === "true";

//   // Fetch blog posts
//   useEffect(() => {
//     fetchBlogPosts();
//   }, [
//     currentPage,
//     currentCategory,
//     currentTag,
//     currentFeatured,
//     currentTrending,
//   ]);

//   const fetchBlogPosts = async () => {
//     try {
//       setLoading(true);
//       let url = `${BACKEND_URL}/api/blog?page=${currentPage}&limit=9`;

//       if (currentCategory) url += `&category=${currentCategory}`;
//       if (currentTag) url += `&tag=${currentTag}`;
//       if (currentFeatured) url += `&featured=true`;
//       if (currentTrending) url += `&trending=true`;
//       if (searchTerm && currentPage === 1) url += `&search=${searchTerm}`;

//       const response = await fetch(url);
//       const data = await response.json();

//       if (data.success) {
//         setBlogs(data.data || []);
//         setFeaturedPosts(data.featuredPosts || []);
//         setTrendingPosts(data.trendingPosts || []);
//         setCategories(data.categories || []);
//         setTags(data.tags || []);
//         setRecentAuthors(data.recentAuthors || []);
//         setPagination(data.pagination || {});
//       }
//     } catch (error) {
//       console.error("Error fetching blog posts:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle search
//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchTerm.trim()) {
//       const params = new URLSearchParams();
//       params.set("search", searchTerm.trim());
//       params.set("page", "1");
//       setSearchParams(params);
//     }
//   };

//   // Handle category filter
//   const handleCategoryFilter = (category) => {
//     const params = new URLSearchParams(searchParams);
//     if (category) {
//       params.set("category", category);
//       setSelectedCategory(category);
//     } else {
//       params.delete("category");
//       setSelectedCategory("");
//     }
//     params.delete("tag");
//     params.delete("featured");
//     params.delete("trending");
//     params.set("page", "1");
//     setSelectedTag("");
//     setSearchParams(params);
//     setShowMobileFilters(false);
//   };

//   // Handle tag filter
//   const handleTagFilter = (tag) => {
//     const params = new URLSearchParams(searchParams);
//     if (tag) {
//       params.set("tag", tag);
//       setSelectedTag(tag);
//     } else {
//       params.delete("tag");
//       setSelectedTag("");
//     }
//     params.delete("category");
//     params.delete("featured");
//     params.delete("trending");
//     params.set("page", "1");
//     setSelectedCategory("");
//     setSearchParams(params);
//     setShowMobileFilters(false);
//   };

//   // Handle featured filter
//   const handleFeaturedFilter = () => {
//     const params = new URLSearchParams(searchParams);
//     if (currentFeatured) {
//       params.delete("featured");
//     } else {
//       params.set("featured", "true");
//       params.delete("category");
//       params.delete("tag");
//       params.delete("trending");
//       setSelectedCategory("");
//       setSelectedTag("");
//     }
//     params.set("page", "1");
//     setSearchParams(params);
//     setShowMobileFilters(false);
//   };

//   // Handle trending filter
//   const handleTrendingFilter = () => {
//     const params = new URLSearchParams(searchParams);
//     if (currentTrending) {
//       params.delete("trending");
//     } else {
//       params.set("trending", "true");
//       params.delete("category");
//       params.delete("tag");
//       params.delete("featured");
//       setSelectedCategory("");
//       setSelectedTag("");
//     }
//     params.set("page", "1");
//     setSearchParams(params);
//     setShowMobileFilters(false);
//   };

//   // Clear all filters
//   const clearFilters = () => {
//     setSearchParams({ page: "1" });
//     setSelectedCategory("");
//     setSelectedTag("");
//     setSearchTerm("");
//     setShowMobileFilters(false);
//   };

//   // Format date
//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     try {
//       const date = new Date(dateString);
//       return date.toLocaleDateString("en-US", {
//         year: "numeric",
//         month: "short",
//         day: "numeric",
//       });
//     } catch {
//       return "";
//     }
//   };

//   // Get reading time text
//   const getReadTime = (minutes) => {
//     if (!minutes) return "1 min read";
//     return `${minutes} min read`;
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white max-sm:py-24 py-8">
//       {/* Hero Section */}
//       <div className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white py-16 md:py-24 relative overflow-hidden">
//         <div className="absolute inset-0 bg-grid-slate-100/10 opacity-30"></div>
//         <div className="container mx-auto px-4 relative z-10">
//           <div className="max-w-4xl mx-auto text-center">
//             <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
//               <BookOpen className="w-4 h-4" />
//               <span className="text-sm font-medium">Welcome to Our Blog</span>
//             </div>
//             <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
//               Fashion & Lifestyle Blog
//             </h1>
//             <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
//               Discover the latest trends, style guides, beauty tips, and insider
//               secrets from the world of fashion.
//             </p>

//             {/* Search Bar */}
//             <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
//               <div className="relative">
//                 <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   placeholder="Search articles, topics, or keywords..."
//                   className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 />
//                 <button
//                   type="submit"
//                   className="absolute right-2 top-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-medium"
//                 >
//                   Search
//                 </button>
//               </div>
//             </form>

//             {/* Popular Categories */}
//             <div className="mt-8 flex flex-wrap gap-2 justify-center">
//               <button
//                 onClick={() => handleCategoryFilter("")}
//                 className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${!selectedCategory ? "bg-white text-slate-900" : "bg-white/10 hover:bg-white/20"}`}
//               >
//                 All Posts
//               </button>
//               {categories.slice(0, 6).map((cat) => (
//                 <button
//                   key={cat._id}
//                   onClick={() => handleCategoryFilter(cat._id)}
//                   className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat._id ? "bg-white text-slate-900" : "bg-white/10 hover:bg-white/20"}`}
//                 >
//                   {cat._id.charAt(0).toUpperCase() + cat._id.slice(1)} (
//                   {cat.count})
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Filter Button */}
//       <div className="container mx-auto px-4 mt-6 md:hidden">
//         <button
//           onClick={() => setShowMobileFilters(!showMobileFilters)}
//           className="w-full flex items-center justify-center gap-2 bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-700 font-medium shadow-sm"
//         >
//           <Filter className="w-5 h-5" />
//           {showMobileFilters ? "Hide Filters" : "Show Filters"}
//           {selectedCategory && (
//             <span className="ml-2 bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
//               {selectedCategory}
//             </span>
//           )}
//         </button>
//       </div>

//       <div className="container mx-auto px-4 py-8">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Main Content */}
//           <div className="lg:w-2/3">
//             {/* Active Filters */}
//             {(selectedCategory ||
//               selectedTag ||
//               currentFeatured ||
//               currentTrending ||
//               searchTerm) && (
//               <div className="mb-6 bg-white rounded-xl p-4 shadow-sm border border-slate-200">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <span className="font-medium text-slate-700">
//                       Active Filters:
//                     </span>
//                     {selectedCategory && (
//                       <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
//                         Category: {selectedCategory}
//                         <button
//                           onClick={() => handleCategoryFilter("")}
//                           className="hover:text-purple-900"
//                         >
//                           <X className="w-3 h-3" />
//                         </button>
//                       </span>
//                     )}
//                     {selectedTag && (
//                       <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
//                         Tag: {selectedTag}
//                         <button
//                           onClick={() => handleTagFilter("")}
//                           className="hover:text-blue-900"
//                         >
//                           <X className="w-3 h-3" />
//                         </button>
//                       </span>
//                     )}
//                     {currentFeatured && (
//                       <span className="inline-flex items-center gap-1 bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm">
//                         Featured Only
//                         <button
//                           onClick={handleFeaturedFilter}
//                           className="hover:text-pink-900"
//                         >
//                           <X className="w-3 h-3" />
//                         </button>
//                       </span>
//                     )}
//                     {currentTrending && (
//                       <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">
//                         Trending Only
//                         <button
//                           onClick={handleTrendingFilter}
//                           className="hover:text-orange-900"
//                         >
//                           <X className="w-3 h-3" />
//                         </button>
//                       </span>
//                     )}
//                     {searchTerm && (
//                       <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
//                         Search: {searchTerm}
//                         <button
//                           onClick={() => setSearchTerm("")}
//                           className="hover:text-green-900"
//                         >
//                           <X className="w-3 h-3" />
//                         </button>
//                       </span>
//                     )}
//                   </div>
//                   <button
//                     onClick={clearFilters}
//                     className="text-slate-600 hover:text-slate-900 text-sm font-medium flex items-center gap-1"
//                   >
//                     Clear All <X className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Blog Grid Title */}
//             <div className="mb-6 flex items-center justify-between">
//               <h2 className="text-2xl font-bold text-slate-900">
//                 {selectedCategory
//                   ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Articles`
//                   : selectedTag
//                     ? `#${selectedTag}`
//                     : currentFeatured
//                       ? "Featured Stories"
//                       : currentTrending
//                         ? "Trending Now"
//                         : searchTerm
//                           ? `Search Results for "${searchTerm}"`
//                           : "Latest Articles"}
//                 {!loading && (
//                   <span className="text-slate-500 font-normal ml-2">
//                     ({pagination.totalPosts || 0})
//                   </span>
//                 )}
//               </h2>

//               {/* Sort Dropdown (Desktop) */}
//               <div className="hidden md:block relative">
//                 <button
//                   onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
//                   className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-4 py-2 text-slate-700 hover:border-slate-300"
//                 >
//                   <Filter className="w-4 h-4" />
//                   Filter by Category
//                   <ChevronDown
//                     className={`w-4 h-4 transition-transform ${showCategoryDropdown ? "rotate-180" : ""}`}
//                   />
//                 </button>

//                 {showCategoryDropdown && (
//                   <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-slate-200 z-50">
//                     <div className="p-4">
//                       <div className="font-medium text-slate-700 mb-3">
//                         Categories
//                       </div>
//                       <div className="space-y-2 max-h-60 overflow-y-auto">
//                         <button
//                           onClick={() => {
//                             handleCategoryFilter("");
//                             setShowCategoryDropdown(false);
//                           }}
//                           className={`block w-full text-left px-3 py-2 rounded-lg ${!selectedCategory ? "bg-purple-50 text-purple-700" : "hover:bg-slate-50"}`}
//                         >
//                           All Categories
//                         </button>
//                         {categories.map((cat) => (
//                           <button
//                             key={cat._id}
//                             onClick={() => {
//                               handleCategoryFilter(cat._id);
//                               setShowCategoryDropdown(false);
//                             }}
//                             className={`block w-full text-left px-3 py-2 rounded-lg ${selectedCategory === cat._id ? "bg-purple-50 text-purple-700" : "hover:bg-slate-50"}`}
//                           >
//                             <div className="flex items-center justify-between">
//                               <span>
//                                 {cat._id.charAt(0).toUpperCase() +
//                                   cat._id.slice(1)}
//                               </span>
//                               <span className="text-slate-400 text-sm">
//                                 {cat.count}
//                               </span>
//                             </div>
//                           </button>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Loading Skeleton */}
//             {loading ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {[...Array(6)].map((_, i) => (
//                   <div
//                     key={i}
//                     className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200 animate-pulse"
//                   >
//                     <div className="h-48 bg-slate-200"></div>
//                     <div className="p-6">
//                       <div className="h-4 bg-slate-200 rounded mb-2"></div>
//                       <div className="h-4 bg-slate-200 rounded w-3/4 mb-4"></div>
//                       <div className="flex items-center justify-between">
//                         <div className="h-3 bg-slate-200 rounded w-20"></div>
//                         <div className="h-3 bg-slate-200 rounded w-16"></div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : blogs.length === 0 ? (
//               <div className="text-center py-16">
//                 <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-slate-100 flex items-center justify-center">
//                   <Search className="w-12 h-12 text-slate-400" />
//                 </div>
//                 <h3 className="text-2xl font-bold text-slate-900 mb-2">
//                   No articles found
//                 </h3>
//                 <p className="text-slate-600 mb-8 max-w-md mx-auto">
//                   {searchTerm || selectedCategory || selectedTag
//                     ? "Try adjusting your search or filters to find what you're looking for."
//                     : "Check back soon for new articles!"}
//                 </p>
//                 <button
//                   onClick={clearFilters}
//                   className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-medium"
//                 >
//                   Browse All Articles
//                 </button>
//               </div>
//             ) : (
//               <>
//                 {/* Blog Grid */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {blogs.map((blog) => (
//                     <article
//                       key={blog._id}
//                       className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:border-purple-200"
//                     >
//                       {/* Image */}
//                       <Link to={`/blog/${blog.slug}`}>
//                         <div className="relative h-48 overflow-hidden">
//                           <img
//                             src={
//                               blog.featuredImageOptimized || "/default-blog.jpg"
//                             }
//                             alt={blog.title}
//                             className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                           />
//                           <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//                           <div className="absolute top-3 left-3">
//                             <span className="bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-semibold px-3 py-1 rounded-full">
//                               {blog.category}
//                             </span>
//                           </div>
//                         </div>
//                       </Link>

//                       {/* Content */}
//                       <div className="p-6">
//                         <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
//                           <div className="flex items-center gap-1">
//                             <CalendarDays className="w-3 h-3" />
//                             {formatDate(blog.publishedAt)}
//                           </div>
//                           <div className="flex items-center gap-1">
//                             <Clock className="w-3 h-3" />
//                             {getReadTime(blog.readTime)}
//                           </div>
//                         </div>

//                         <Link to={`/blog/${blog.slug}`}>
//                           <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-purple-700 line-clamp-2">
//                             {blog.title}
//                           </h3>
//                         </Link>

//                         <p className="text-slate-600 text-sm mb-4 line-clamp-2">
//                           {blog.excerpt}
//                         </p>

//                         {/* Author */}
//                         <div className="flex items-center gap-3 mb-4">
//                           {blog.author?.avatar ? (
//                             <img
//                               src={blog.author.avatar}
//                               alt={blog.author.name}
//                               className="w-8 h-8 rounded-full border-2 border-white shadow"
//                             />
//                           ) : (
//                             <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
//                               {blog.author?.name?.charAt(0) || "A"}
//                             </div>
//                           )}
//                           <div>
//                             <div className="font-medium text-slate-900 text-sm">
//                               {blog.author?.name || "Admin"}
//                             </div>
//                           </div>
//                         </div>

//                         {/* Stats */}
//                         <div className="flex items-center justify-between pt-4 border-t border-slate-100">
//                           <div className="flex items-center gap-4 text-slate-500">
//                             <div className="flex items-center gap-1 text-xs">
//                               <Eye className="w-4 h-4" />
//                               <span>{blog.views || 0}</span>
//                             </div>
//                             <div className="flex items-center gap-1 text-xs">
//                               <MessageCircle className="w-4 h-4" />
//                               <span>{blog.commentCount || 0}</span>
//                             </div>
//                             <div className="flex items-center gap-1 text-xs">
//                               <Heart className="w-4 h-4" />
//                               <span>{blog.likeCount || 0}</span>
//                             </div>
//                           </div>

//                           <Link
//                             to={`/blog/${blog.slug}`}
//                             className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center gap-1"
//                           >
//                             Read More
//                             <ChevronRight className="w-4 h-4" />
//                           </Link>
//                         </div>
//                       </div>
//                     </article>
//                   ))}
//                 </div>

//                 {/* Pagination */}
//                 {pagination.totalPages > 1 && (
//                   <div className="mt-12">
//                     <div className="flex items-center justify-between">
//                       <button
//                         onClick={() =>
//                           setSearchParams({ page: currentPage - 1 })
//                         }
//                         disabled={!pagination.hasPrev}
//                         className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
//                       >
//                         <ChevronLeft className="w-4 h-4" />
//                         Previous
//                       </button>

//                       <div className="hidden md:flex items-center gap-2">
//                         {[...Array(Math.min(5, pagination.totalPages))].map(
//                           (_, i) => {
//                             let pageNum;
//                             if (pagination.totalPages <= 5) {
//                               pageNum = i + 1;
//                             } else if (currentPage <= 3) {
//                               pageNum = i + 1;
//                             } else if (
//                               currentPage >=
//                               pagination.totalPages - 2
//                             ) {
//                               pageNum = pagination.totalPages - 4 + i;
//                             } else {
//                               pageNum = currentPage - 2 + i;
//                             }

//                             return (
//                               <button
//                                 key={pageNum}
//                                 onClick={() =>
//                                   setSearchParams({ page: pageNum })
//                                 }
//                                 className={`w-10 h-10 rounded-lg flex items-center justify-center ${
//                                   currentPage === pageNum
//                                     ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
//                                     : "border border-slate-200 hover:bg-slate-50"
//                                 }`}
//                               >
//                                 {pageNum}
//                               </button>
//                             );
//                           }
//                         )}
//                       </div>

//                       <div className="md:hidden text-sm text-slate-600">
//                         Page {currentPage} of {pagination.totalPages}
//                       </div>

//                       <button
//                         onClick={() =>
//                           setSearchParams({ page: currentPage + 1 })
//                         }
//                         disabled={!pagination.hasNext}
//                         className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
//                       >
//                         Next
//                         <ChevronRight className="w-4 h-4" />
//                       </button>
//                     </div>

//                     {/* Mobile Pagination */}
//                     <div className="md:hidden mt-4 flex items-center justify-center gap-2">
//                       <button
//                         onClick={() =>
//                           setSearchParams({
//                             page: Math.max(1, currentPage - 1),
//                           })
//                         }
//                         disabled={!pagination.hasPrev}
//                         className="px-4 py-2 rounded-lg border border-slate-200 disabled:opacity-50"
//                       >
//                         ←
//                       </button>
//                       <span className="px-4">
//                         {currentPage} / {pagination.totalPages}
//                       </span>
//                       <button
//                         onClick={() =>
//                           setSearchParams({
//                             page: Math.min(
//                               pagination.totalPages,
//                               currentPage + 1
//                             ),
//                           })
//                         }
//                         disabled={!pagination.hasNext}
//                         className="px-4 py-2 rounded-lg border border-slate-200 disabled:opacity-50"
//                       >
//                         →
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </>
//             )}
//           </div>

//           {/* Sidebar */}
//           <div className="lg:w-1/3">
//             {/* Mobile Filters Panel */}
//             {showMobileFilters && (
//               <div className="md:hidden mb-6 bg-white rounded-xl shadow-lg border border-slate-200 p-6">
//                 <div className="flex items-center justify-between mb-6">
//                   <h3 className="text-lg font-bold text-slate-900">Filters</h3>
//                   <button
//                     onClick={() => setShowMobileFilters(false)}
//                     className="text-slate-500 hover:text-slate-700"
//                   >
//                     <X className="w-5 h-5" />
//                   </button>
//                 </div>

//                 {/* Categories */}
//                 <div className="mb-6">
//                   <h4 className="font-medium text-slate-700 mb-3">
//                     Categories
//                   </h4>
//                   <div className="space-y-2">
//                     <button
//                       onClick={() => handleCategoryFilter("")}
//                       className={`block w-full text-left px-3 py-2 rounded-lg ${!selectedCategory ? "bg-purple-50 text-purple-700" : "hover:bg-slate-50"}`}
//                     >
//                       All Categories
//                     </button>
//                     {categories.map((cat) => (
//                       <button
//                         key={cat._id}
//                         onClick={() => handleCategoryFilter(cat._id)}
//                         className={`block w-full text-left px-3 py-2 rounded-lg ${selectedCategory === cat._id ? "bg-purple-50 text-purple-700" : "hover:bg-slate-50"}`}
//                       >
//                         <div className="flex items-center justify-between">
//                           <span>
//                             {cat._id.charAt(0).toUpperCase() + cat._id.slice(1)}
//                           </span>
//                           <span className="text-slate-400 text-sm">
//                             {cat.count}
//                           </span>
//                         </div>
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Featured & Trending */}
//                 <div className="mb-6">
//                   <h4 className="font-medium text-slate-700 mb-3">
//                     Collections
//                   </h4>
//                   <div className="grid grid-cols-2 gap-3">
//                     <button
//                       onClick={handleFeaturedFilter}
//                       className={`px-4 py-3 rounded-lg border text-center ${currentFeatured ? "bg-pink-50 border-pink-200 text-pink-700" : "border-slate-200 hover:border-slate-300"}`}
//                     >
//                       <div className="font-medium">Featured</div>
//                       <div className="text-xs text-slate-500">Top stories</div>
//                     </button>
//                     <button
//                       onClick={handleTrendingFilter}
//                       className={`px-4 py-3 rounded-lg border text-center ${currentTrending ? "bg-orange-50 border-orange-200 text-orange-700" : "border-slate-200 hover:border-slate-300"}`}
//                     >
//                       <div className="font-medium">Trending</div>
//                       <div className="text-xs text-slate-500">Popular now</div>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Desktop Sidebar */}
//             <div className="space-y-6">
//               {/* Categories */}
//               <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
//                 <h3 className="font-bold text-slate-900 mb-4">Categories</h3>
//                 <div className="space-y-2">
//                   <button
//                     onClick={() => handleCategoryFilter("")}
//                     className={`block w-full text-left px-3 py-2 rounded-lg ${!selectedCategory ? "bg-purple-50 text-purple-700" : "hover:bg-slate-50"}`}
//                   >
//                     All Categories
//                   </button>
//                   {categories.map((cat) => (
//                     <button
//                       key={cat._id}
//                       onClick={() => handleCategoryFilter(cat._id)}
//                       className={`block w-full text-left px-3 py-2 rounded-lg ${selectedCategory === cat._id ? "bg-purple-50 text-purple-700" : "hover:bg-slate-50"}`}
//                     >
//                       <div className="flex items-center justify-between">
//                         <span>
//                           {cat._id.charAt(0).toUpperCase() + cat._id.slice(1)}
//                         </span>
//                         <span className="text-slate-400 text-sm">
//                           {cat.count}
//                         </span>
//                       </div>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Popular Tags */}
//               {tags.length > 0 && (
//                 <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
//                   <h3 className="font-bold text-slate-900 mb-4">
//                     Popular Tags
//                   </h3>
//                   <div className="flex flex-wrap gap-2">
//                     {tags.map((tag) => (
//                       <button
//                         key={tag._id}
//                         onClick={() => handleTagFilter(tag._id)}
//                         className={`px-3 py-1.5 rounded-full text-sm ${selectedTag === tag._id ? "bg-blue-100 text-blue-700 border border-blue-200" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
//                       >
//                         #{tag._id} ({tag.count})
//                       </button>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogPage;
import React, { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import {
  CalendarDays,
  Clock,
  Eye,
  MessageCircle,
  Heart,
  Search,
  TrendingUp,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  BookOpen,
  Moon,
  Sun,
  Sparkles,
  Zap,
  Flame,
  Tag as TagIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "../Components/ThemeToggle";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const BlogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // State
  const [blogs, setBlogs] = useState([]);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [recentAuthors, setRecentAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || ""
  );
  const [selectedTag, setSelectedTag] = useState(searchParams.get("tag") || "");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  // Check system theme
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    setIsDarkMode(darkModeMediaQuery.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    darkModeMediaQuery.addEventListener("change", handleChange);

    return () => darkModeMediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Scroll animation
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxScroll) * 100;
      setScrollProgress(progress);
      setIsScrolling(scrolled > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Get current filters
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const currentCategory = searchParams.get("category") || "";
  const currentTag = searchParams.get("tag") || "";
  const currentFeatured = searchParams.get("featured") === "true";
  const currentTrending = searchParams.get("trending") === "true";

  // Fetch blog posts
  useEffect(() => {
    fetchBlogPosts();
  }, [
    currentPage,
    currentCategory,
    currentTag,
    currentFeatured,
    currentTrending,
  ]);

  const fetchBlogPosts = async () => {
    try {
      setLoading(true);
      let url = `${BACKEND_URL}/api/blog?page=${currentPage}&limit=9`;

      if (currentCategory) url += `&category=${currentCategory}`;
      if (currentTag) url += `&tag=${currentTag}`;
      if (currentFeatured) url += `&featured=true`;
      if (currentTrending) url += `&trending=true`;
      if (searchTerm && currentPage === 1) url += `&search=${searchTerm}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setBlogs(data.data || []);
        setFeaturedPosts(data.featuredPosts || []);
        setTrendingPosts(data.trendingPosts || []);
        setCategories(data.categories || []);
        setTags(data.tags || []);
        setRecentAuthors(data.recentAuthors || []);
        setPagination(data.pagination || {});
      }
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const params = new URLSearchParams();
      params.set("search", searchTerm.trim());
      params.set("page", "1");
      setSearchParams(params);
    }
  };

  // Handle category filter
  const handleCategoryFilter = (category) => {
    const params = new URLSearchParams(searchParams);
    if (category) {
      params.set("category", category);
      setSelectedCategory(category);
    } else {
      params.delete("category");
      setSelectedCategory("");
    }
    params.delete("tag");
    params.delete("featured");
    params.delete("trending");
    params.set("page", "1");
    setSelectedTag("");
    setSearchParams(params);
    setShowMobileFilters(false);
  };

  // Handle tag filter
  const handleTagFilter = (tag) => {
    const params = new URLSearchParams(searchParams);
    if (tag) {
      params.set("tag", tag);
      setSelectedTag(tag);
    } else {
      params.delete("tag");
      setSelectedTag("");
    }
    params.delete("category");
    params.delete("featured");
    params.delete("trending");
    params.set("page", "1");
    setSelectedCategory("");
    setSearchParams(params);
    setShowMobileFilters(false);
  };

  // Handle featured filter
  const handleFeaturedFilter = () => {
    const params = new URLSearchParams(searchParams);
    if (currentFeatured) {
      params.delete("featured");
    } else {
      params.set("featured", "true");
      params.delete("category");
      params.delete("tag");
      params.delete("trending");
      setSelectedCategory("");
      setSelectedTag("");
    }
    params.set("page", "1");
    setSearchParams(params);
    setShowMobileFilters(false);
  };

  // Handle trending filter
  const handleTrendingFilter = () => {
    const params = new URLSearchParams(searchParams);
    if (currentTrending) {
      params.delete("trending");
    } else {
      params.set("trending", "true");
      params.delete("category");
      params.delete("tag");
      params.delete("featured");
      setSelectedCategory("");
      setSelectedTag("");
    }
    params.set("page", "1");
    setSearchParams(params);
    setShowMobileFilters(false);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchParams({ page: "1" });
    setSelectedCategory("");
    setSelectedTag("");
    setSearchTerm("");
    setShowMobileFilters(false);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "";
    }
  };

  // Get reading time text
  const getReadTime = (minutes) => {
    if (!minutes) return "1 min read";
    return `${minutes} min read`;
  };

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-cream-50 to-cream-100 dark:from-gray-900 dark:to-gray-800 pt-24 pb-12"
    >
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-400 dark:from-purple-600 dark:via-pink-600 dark:to-purple-600 z-40"
        style={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.1 }}
      />

      {/* Back to Top Button */}
      <AnimatePresence>
        {isScrolling && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 dark:from-purple-600 dark:to-pink-600 text-white rounded-full shadow-lg flex items-center justify-center z-40 hover:shadow-xl transition-all duration-300"
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-100 via-orange-50 to-amber-100 dark:from-gray-900 dark:via-purple-900/50 dark:to-gray-900"></div>
        <div className="absolute inset-0 bg-grid-amber-200/20 dark:bg-grid-purple-900/20"></div>
        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Theme Toggle */}
            <div className="flex justify-end mb-6">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-cream-200 dark:bg-gray-800 hover:bg-cream-300 dark:hover:bg-gray-700 transition-colors duration-300"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-amber-500" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-700" />
                )}
              </button>
            </div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
            >
              <BookOpen className="w-4 h-4 text-amber-600 dark:text-purple-400" />
              <span className="text-sm font-medium text-amber-900 dark:text-purple-200">
                Welcome to Our Blog
              </span>
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-900 via-orange-800 to-amber-900 dark:from-white dark:via-purple-200 dark:to-white bg-clip-text text-transparent"
            >
              Fashion & Lifestyle Blog
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-amber-800/80 dark:text-purple-300 mb-8 max-w-2xl mx-auto"
            >
              Discover the latest trends, style guides, beauty tips, and insider
              secrets from the world of fashion.
            </motion.p>

            {/* Search Bar */}
            <motion.form
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              onSubmit={handleSearch}
              className="max-w-2xl mx-auto"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-amber-600 dark:text-purple-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search articles, topics, or keywords..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-amber-200 dark:border-purple-900 text-amber-900 dark:text-purple-100 placeholder-amber-600/60 dark:placeholder-purple-400/60 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-purple-500 focus:border-transparent"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="absolute right-2 top-2 bg-gradient-to-r from-amber-500 to-orange-500 dark:from-purple-600 dark:to-pink-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
                >
                  Search
                </motion.button>
              </div>
            </motion.form>

            {/* Popular Categories */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex flex-wrap gap-2 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCategoryFilter("")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${!selectedCategory ? "bg-amber-500 text-white shadow-lg" : "bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 text-amber-900 dark:text-purple-200"}`}
              >
                All Posts
              </motion.button>
              {categories.slice(0, 6).map((cat, index) => (
                <motion.button
                  key={cat._id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleCategoryFilter(cat._id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat._id ? "bg-amber-500 text-white shadow-lg" : "bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 text-amber-900 dark:text-purple-200"}`}
                >
                  {cat._id.charAt(0).toUpperCase() + cat._id.slice(1)} (
                  {cat.count})
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Mobile Filter Button */}
      <div className="container mx-auto px-4 mt-6 md:hidden">
        <motion.button
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="w-full flex items-center justify-center gap-2 bg-white dark:bg-gray-800 border border-amber-200 dark:border-purple-900 rounded-lg px-4 py-3 text-amber-900 dark:text-purple-200 font-medium shadow-sm hover:shadow-md transition-all duration-300"
        >
          <Filter className="w-5 h-5" />
          {showMobileFilters ? "Hide Filters" : "Show Filters"}
          {(selectedCategory || selectedTag) && (
            <span className="ml-2 bg-amber-100 dark:bg-purple-900/50 text-amber-700 dark:text-purple-300 text-xs px-2 py-1 rounded-full">
              {selectedCategory || selectedTag}
            </span>
          )}
        </motion.button>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Active Filters */}
            <AnimatePresence>
              {(selectedCategory ||
                selectedTag ||
                currentFeatured ||
                currentTrending ||
                searchTerm) && (
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  className="mb-6 bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-amber-100 dark:border-purple-900/50"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium text-amber-900 dark:text-purple-200">
                        Active Filters:
                      </span>
                      {selectedCategory && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="inline-flex items-center gap-1 bg-amber-100 dark:bg-purple-900/50 text-amber-700 dark:text-purple-300 px-3 py-1 rounded-full text-sm"
                        >
                          Category: {selectedCategory}
                          <button
                            onClick={() => handleCategoryFilter("")}
                            className="hover:text-amber-900 dark:hover:text-purple-100"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </motion.span>
                      )}
                      {selectedTag && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="inline-flex items-center gap-1 bg-orange-100 dark:bg-pink-900/50 text-orange-700 dark:text-pink-300 px-3 py-1 rounded-full text-sm"
                        >
                          <TagIcon className="w-3 h-3" />
                          {selectedTag}
                          <button
                            onClick={() => handleTagFilter("")}
                            className="hover:text-orange-900 dark:hover:text-pink-100"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </motion.span>
                      )}
                      {currentFeatured && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="inline-flex items-center gap-1 bg-pink-100 dark:bg-pink-900/50 text-pink-700 dark:text-pink-300 px-3 py-1 rounded-full text-sm"
                        >
                          <Sparkles className="w-3 h-3" />
                          Featured
                          <button
                            onClick={handleFeaturedFilter}
                            className="hover:text-pink-900 dark:hover:text-pink-100"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </motion.span>
                      )}
                      {currentTrending && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="inline-flex items-center gap-1 bg-red-100 dark:bg-orange-900/50 text-red-700 dark:text-orange-300 px-3 py-1 rounded-full text-sm"
                        >
                          <Flame className="w-3 h-3" />
                          Trending
                          <button
                            onClick={handleTrendingFilter}
                            className="hover:text-red-900 dark:hover:text-orange-100"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </motion.span>
                      )}
                      {searchTerm && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="inline-flex items-center gap-1 bg-green-100 dark:bg-emerald-900/50 text-green-700 dark:text-emerald-300 px-3 py-1 rounded-full text-sm"
                        >
                          <Search className="w-3 h-3" />
                          {searchTerm}
                          <button
                            onClick={() => setSearchTerm("")}
                            className="hover:text-green-900 dark:hover:text-emerald-100"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </motion.span>
                      )}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={clearFilters}
                      className="text-amber-600 dark:text-purple-400 hover:text-amber-800 dark:hover:text-purple-300 text-sm font-medium flex items-center gap-1"
                    >
                      Clear All <X className="w-4 h-4" />
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Blog Grid Title */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <h2 className="text-2xl font-bold text-amber-900 dark:text-white">
                {selectedCategory
                  ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Articles`
                  : selectedTag
                    ? `#${selectedTag}`
                    : currentFeatured
                      ? "Featured Stories"
                      : currentTrending
                        ? "Trending Now"
                        : searchTerm
                          ? `Search Results for "${searchTerm}"`
                          : "Latest Articles"}
                {!loading && (
                  <span className="text-amber-600 dark:text-purple-400 font-normal ml-2">
                    ({pagination.totalPosts || 0})
                  </span>
                )}
              </h2>

              {/* Sort Dropdown (Desktop) */}
              <div className="hidden md:block relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-amber-200 dark:border-purple-900 rounded-lg px-4 py-2 text-amber-900 dark:text-purple-200 hover:border-amber-300 dark:hover:border-purple-700 transition-all duration-300"
                >
                  <Filter className="w-4 h-4" />
                  Filter by Category
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${showCategoryDropdown ? "rotate-180" : ""}`}
                  />
                </motion.button>

                <AnimatePresence>
                  {showCategoryDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-amber-200 dark:border-purple-900 z-50"
                    >
                      <div className="p-4">
                        <div className="font-medium text-amber-900 dark:text-purple-200 mb-3">
                          Categories
                        </div>
                        <div className="space-y-2 max-h-60 overflow-y-auto">
                          <motion.button
                            whileHover={{ x: 5 }}
                            onClick={() => {
                              handleCategoryFilter("");
                              setShowCategoryDropdown(false);
                            }}
                            className={`block w-full text-left px-3 py-2 rounded-lg transition-all duration-300 ${!selectedCategory ? "bg-amber-50 dark:bg-purple-900/50 text-amber-700 dark:text-purple-300" : "hover:bg-amber-50 dark:hover:bg-gray-700/50"}`}
                          >
                            All Categories
                          </motion.button>
                          {categories.map((cat) => (
                            <motion.button
                              key={cat._id}
                              whileHover={{ x: 5 }}
                              onClick={() => {
                                handleCategoryFilter(cat._id);
                                setShowCategoryDropdown(false);
                              }}
                              className={`block w-full text-left px-3 py-2 rounded-lg transition-all duration-300 ${selectedCategory === cat._id ? "bg-amber-50 dark:bg-purple-900/50 text-amber-700 dark:text-purple-300" : "hover:bg-amber-50 dark:hover:bg-gray-700/50"}`}
                            >
                              <div className="flex items-center justify-between">
                                <span>
                                  {cat._id.charAt(0).toUpperCase() +
                                    cat._id.slice(1)}
                                </span>
                                <span className="text-amber-500 dark:text-purple-500 text-sm">
                                  {cat.count}
                                </span>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Loading Skeleton */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border border-amber-100 dark:border-purple-900/50"
                  >
                    <div className="h-48 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-gray-700 dark:to-gray-600 animate-pulse"></div>
                    <div className="p-6">
                      <div className="h-4 bg-amber-200 dark:bg-gray-700 rounded mb-2"></div>
                      <div className="h-4 bg-amber-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                      <div className="flex items-center justify-between">
                        <div className="h-3 bg-amber-200 dark:bg-gray-700 rounded w-20"></div>
                        <div className="h-3 bg-amber-200 dark:bg-gray-700 rounded w-16"></div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : blogs.length === 0 ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-amber-100 dark:bg-purple-900/50 flex items-center justify-center">
                  <Search className="w-12 h-12 text-amber-500 dark:text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-amber-900 dark:text-white mb-2">
                  No articles found
                </h3>
                <p className="text-amber-700 dark:text-purple-300 mb-8 max-w-md mx-auto">
                  {searchTerm || selectedCategory || selectedTag
                    ? "Try adjusting your search or filters to find what you're looking for."
                    : "Check back soon for new articles!"}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearFilters}
                  className="bg-gradient-to-r from-amber-500 to-orange-500 dark:from-purple-600 dark:to-pink-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
                >
                  Browse All Articles
                </motion.button>
              </motion.div>
            ) : (
              <>
                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {blogs.map((blog, index) => (
                    <motion.article
                      key={blog._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-amber-100 dark:border-purple-900/50 hover:border-amber-300 dark:hover:border-purple-600"
                    >
                      {/* Image */}
                      <Link to={`/blog/${blog.slug}`}>
                        <div className="relative h-48 overflow-hidden">
                          <motion.img
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                            src={
                              blog.featuredImageOptimized || "/default-blog.jpg"
                            }
                            alt={blog.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="absolute top-3 left-3">
                            <span className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-amber-900 dark:text-purple-300 text-xs font-semibold px-3 py-1 rounded-full">
                              {blog.category}
                            </span>
                          </div>
                        </div>
                      </Link>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-xs text-amber-600 dark:text-purple-400 mb-3">
                          <div className="flex items-center gap-1">
                            <CalendarDays className="w-3 h-3" />
                            {formatDate(blog.publishedAt)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {getReadTime(blog.readTime)}
                          </div>
                        </div>

                        <Link to={`/blog/${blog.slug}`}>
                          <h3 className="text-lg font-bold text-amber-900 dark:text-white mb-3 group-hover:text-amber-600 dark:group-hover:text-purple-400 line-clamp-2 transition-colors duration-300">
                            {blog.title}
                          </h3>
                        </Link>

                        <p className="text-amber-700 dark:text-purple-300 text-sm mb-4 line-clamp-2">
                          {blog.excerpt}
                        </p>

                        {/* Author */}
                        <div className="flex items-center gap-3 mb-4">
                          {blog.author?.avatar ? (
                            <img
                              src={blog.author.avatar}
                              alt={blog.author.name}
                              className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 shadow"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 dark:from-purple-500 dark:to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                              {blog.author?.name?.charAt(0) || "A"}
                            </div>
                          )}
                          <div>
                            <div className="font-medium text-amber-900 dark:text-white text-sm">
                              {blog.author?.name || "Admin"}
                            </div>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center justify-between pt-4 border-t border-amber-100 dark:border-purple-900/50">
                          <div className="flex items-center gap-4 text-amber-600 dark:text-purple-400">
                            <div className="flex items-center gap-1 text-xs">
                              <Eye className="w-4 h-4" />
                              <span>{blog.views || 0}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs">
                              <MessageCircle className="w-4 h-4" />
                              <span>{blog.commentCount || 0}</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs">
                              <Heart className="w-4 h-4" />
                              <span>{blog.likeCount || 0}</span>
                            </div>
                          </div>

                          <Link
                            to={`/blog/${blog.slug}`}
                            className="text-amber-600 dark:text-purple-400 hover:text-amber-800 dark:hover:text-purple-300 text-sm font-medium flex items-center gap-1 group/readmore"
                          >
                            Read More
                            <ChevronRight className="w-4 h-4 group-hover/readmore:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="mt-12"
                  >
                    <div className="flex items-center justify-between">
                      <motion.button
                        whileHover={{ x: -5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          setSearchParams({ page: currentPage - 1 })
                        }
                        disabled={!pagination.hasPrev}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-amber-200 dark:border-purple-900 text-amber-700 dark:text-purple-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-50 dark:hover:bg-gray-700/50 transition-all duration-300"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                      </motion.button>

                      <div className="hidden md:flex items-center gap-2">
                        {[...Array(Math.min(5, pagination.totalPages))].map(
                          (_, i) => {
                            let pageNum;
                            if (pagination.totalPages <= 5) {
                              pageNum = i + 1;
                            } else if (currentPage <= 3) {
                              pageNum = i + 1;
                            } else if (
                              currentPage >=
                              pagination.totalPages - 2
                            ) {
                              pageNum = pagination.totalPages - 4 + i;
                            } else {
                              pageNum = currentPage - 2 + i;
                            }

                            return (
                              <motion.button
                                key={pageNum}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() =>
                                  setSearchParams({ page: pageNum })
                                }
                                className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                                  currentPage === pageNum
                                    ? "bg-gradient-to-r from-amber-500 to-orange-500 dark:from-purple-600 dark:to-pink-600 text-white shadow-lg"
                                    : "border border-amber-200 dark:border-purple-900 text-amber-700 dark:text-purple-300 hover:bg-amber-50 dark:hover:bg-gray-700/50"
                                }`}
                              >
                                {pageNum}
                              </motion.button>
                            );
                          }
                        )}
                      </div>

                      <div className="md:hidden text-sm text-amber-600 dark:text-purple-400">
                        Page {currentPage} of {pagination.totalPages}
                      </div>

                      <motion.button
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          setSearchParams({ page: currentPage + 1 })
                        }
                        disabled={!pagination.hasNext}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-amber-200 dark:border-purple-900 text-amber-700 dark:text-purple-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-50 dark:hover:bg-gray-700/50 transition-all duration-300"
                      >
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </motion.button>
                    </div>

                    {/* Mobile Pagination */}
                    <div className="md:hidden mt-4 flex items-center justify-center gap-2">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          setSearchParams({
                            page: Math.max(1, currentPage - 1),
                          })
                        }
                        disabled={!pagination.hasPrev}
                        className="px-4 py-2 rounded-lg border border-amber-200 dark:border-purple-900 text-amber-700 dark:text-purple-300 disabled:opacity-50"
                      >
                        ←
                      </motion.button>
                      <span className="px-4 text-amber-700 dark:text-purple-300">
                        {currentPage} / {pagination.totalPages}
                      </span>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          setSearchParams({
                            page: Math.min(
                              pagination.totalPages,
                              currentPage + 1
                            ),
                          })
                        }
                        disabled={!pagination.hasNext}
                        className="px-4 py-2 rounded-lg border border-amber-200 dark:border-purple-900 text-amber-700 dark:text-purple-300 disabled:opacity-50"
                      >
                        →
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            {/* Mobile Filters Panel */}
            <AnimatePresence>
              {showMobileFilters && (
                <motion.div
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 100, opacity: 0 }}
                  className="md:hidden mb-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-amber-200 dark:border-purple-900 p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-amber-900 dark:text-white">
                      Filters
                    </h3>
                    <button
                      onClick={() => setShowMobileFilters(false)}
                      className="text-amber-600 dark:text-purple-400 hover:text-amber-800 dark:hover:text-purple-300"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Categories */}
                  <div className="mb-6">
                    <h4 className="font-medium text-amber-900 dark:text-purple-200 mb-3">
                      Categories
                    </h4>
                    <div className="space-y-2">
                      <button
                        onClick={() => handleCategoryFilter("")}
                        className={`block w-full text-left px-3 py-2 rounded-lg transition-all duration-300 ${!selectedCategory ? "bg-amber-50 dark:bg-purple-900/50 text-amber-700 dark:text-purple-300" : "hover:bg-amber-50 dark:hover:bg-gray-700/50"}`}
                      >
                        All Categories
                      </button>
                      {categories.map((cat) => (
                        <button
                          key={cat._id}
                          onClick={() => handleCategoryFilter(cat._id)}
                          className={`block w-full text-left px-3 py-2 rounded-lg transition-all duration-300 ${selectedCategory === cat._id ? "bg-amber-50 dark:bg-purple-900/50 text-amber-700 dark:text-purple-300" : "hover:bg-amber-50 dark:hover:bg-gray-700/50"}`}
                        >
                          <div className="flex items-center justify-between">
                            <span>
                              {cat._id.charAt(0).toUpperCase() +
                                cat._id.slice(1)}
                            </span>
                            <span className="text-amber-500 dark:text-purple-500 text-sm">
                              {cat.count}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Featured & Trending */}
                  <div className="mb-6">
                    <h4 className="font-medium text-amber-900 dark:text-purple-200 mb-3">
                      Collections
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleFeaturedFilter}
                        className={`px-4 py-3 rounded-lg border text-center transition-all duration-300 ${currentFeatured ? "bg-pink-50 dark:bg-pink-900/30 border-pink-200 dark:border-pink-800 text-pink-700 dark:text-pink-300" : "border-amber-200 dark:border-purple-900 hover:border-amber-300 dark:hover:border-purple-700"}`}
                      >
                        <div className="font-medium">Featured</div>
                        <div className="text-xs text-amber-600 dark:text-purple-400">
                          Top stories
                        </div>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleTrendingFilter}
                        className={`px-4 py-3 rounded-lg border text-center transition-all duration-300 ${currentTrending ? "bg-orange-50 dark:bg-orange-900/30 border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-300" : "border-amber-200 dark:border-purple-900 hover:border-amber-300 dark:hover:border-purple-700"}`}
                      >
                        <div className="font-medium">Trending</div>
                        <div className="text-xs text-amber-600 dark:text-purple-400">
                          Popular now
                        </div>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Desktop Sidebar */}
            <div className="space-y-6">
              {/* Categories */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-amber-100 dark:border-purple-900/50 p-6"
              >
                <h3 className="font-bold text-amber-900 dark:text-white mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-600 dark:text-purple-400" />
                  Categories
                </h3>
                <div className="space-y-2">
                  <motion.button
                    whileHover={{ x: 5 }}
                    onClick={() => handleCategoryFilter("")}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-all duration-300 ${!selectedCategory ? "bg-amber-50 dark:bg-purple-900/50 text-amber-700 dark:text-purple-300" : "hover:bg-amber-50 dark:hover:bg-gray-700/50"}`}
                  >
                    All Categories
                  </motion.button>
                  {categories.map((cat) => (
                    <motion.button
                      key={cat._id}
                      whileHover={{ x: 5 }}
                      onClick={() => handleCategoryFilter(cat._id)}
                      className={`block w-full text-left px-3 py-2 rounded-lg transition-all duration-300 ${selectedCategory === cat._id ? "bg-amber-50 dark:bg-purple-900/50 text-amber-700 dark:text-purple-300" : "hover:bg-amber-50 dark:hover:bg-gray-700/50"}`}
                    >
                      <div className="flex items-center justify-between">
                        <span>
                          {cat._id.charAt(0).toUpperCase() + cat._id.slice(1)}
                        </span>
                        <span className="text-amber-500 dark:text-purple-500 text-sm">
                          {cat.count}
                        </span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Popular Tags */}
              {tags.length > 0 && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-amber-100 dark:border-purple-900/50 p-6"
                >
                  <h3 className="font-bold text-amber-900 dark:text-white mb-4 flex items-center gap-2">
                    <TagIcon className="w-5 h-5 text-amber-600 dark:text-purple-400" />
                    Popular Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <motion.button
                        key={tag._id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleTagFilter(tag._id)}
                        className={`px-3 py-1.5 rounded-full text-sm transition-all duration-300 ${selectedTag === tag._id ? "bg-amber-500 text-white shadow-md" : "bg-amber-100 dark:bg-purple-900/50 text-amber-700 dark:text-purple-300 hover:bg-amber-200 dark:hover:bg-purple-800"}`}
                      >
                        #{tag._id} ({tag.count})
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Featured & Trending Buttons */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-amber-100 dark:border-purple-900/50 p-6"
              >
                <h3 className="font-bold text-amber-900 dark:text-white mb-4">
                  Collections
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleFeaturedFilter}
                    className={`px-4 py-3 rounded-lg border text-center transition-all duration-300 ${currentFeatured ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg" : "border-amber-200 dark:border-purple-900 hover:border-amber-300 dark:hover:border-purple-700"}`}
                  >
                    <Sparkles className="w-5 h-5 mx-auto mb-2" />
                    <div className="font-medium">Featured</div>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleTrendingFilter}
                    className={`px-4 py-3 rounded-lg border text-center transition-all duration-300 ${currentTrending ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg" : "border-amber-200 dark:border-purple-900 hover:border-amber-300 dark:hover:border-purple-700"}`}
                  >
                    <Flame className="w-5 h-5 mx-auto mb-2" />
                    <div className="font-medium">Trending</div>
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogPage;
