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
} from "lucide-react";
import { format } from "date-fns";

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
      // Show error state
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
      return format(new Date(dateString), "MMM dd, yyyy");
    } catch {
      return "";
    }
  };

  // Get reading time text
  const getReadTime = (minutes) => {
    if (!minutes) return "1 min read";
    return `${minutes} min read`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100/10 opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm font-medium">Welcome to Our Blog</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
              Fashion & Lifestyle Blog
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Discover the latest trends, style guides, beauty tips, and insider
              secrets from the world of fashion.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search articles, topics, or keywords..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-medium"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Popular Categories */}
            <div className="mt-8 flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => handleCategoryFilter("")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${!selectedCategory ? "bg-white text-slate-900" : "bg-white/10 hover:bg-white/20"}`}
              >
                All Posts
              </button>
              {categories.slice(0, 6).map((cat) => (
                <button
                  key={cat._id}
                  onClick={() => handleCategoryFilter(cat._id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat._id ? "bg-white text-slate-900" : "bg-white/10 hover:bg-white/20"}`}
                >
                  {cat._id.charAt(0).toUpperCase() + cat._id.slice(1)} (
                  {cat.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Button */}
      <div className="container mx-auto px-4 mt-6 md:hidden">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="w-full flex items-center justify-center gap-2 bg-white border border-slate-200 rounded-lg px-4 py-3 text-slate-700 font-medium shadow-sm"
        >
          <Filter className="w-5 h-5" />
          {showMobileFilters ? "Hide Filters" : "Show Filters"}
          {selectedCategory && (
            <span className="ml-2 bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
              {selectedCategory}
            </span>
          )}
        </button>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Featured Posts Carousel (Desktop only) */}
            {featuredPosts.length > 0 &&
              !selectedCategory &&
              !selectedTag &&
              !currentFeatured &&
              !currentTrending && (
                <div className="mb-12 hidden md:block">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">
                      Featured Stories
                    </h2>
                    <button
                      onClick={handleFeaturedFilter}
                      className="text-purple-600 hover:text-purple-800 font-medium flex items-center gap-1"
                    >
                      View All <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {featuredPosts.map((post) => (
                      <Link
                        key={post._id}
                        to={`/blog/${post.slug}`}
                        className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                      >
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={
                              post.featuredImageOptimized || "/default-blog.jpg"
                            }
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3">
                            <span className="bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-semibold px-3 py-1 rounded-full">
                              {post.category}
                            </span>
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-purple-700 line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-sm text-slate-500">
                            <div className="flex items-center gap-1">
                              <CalendarDays className="w-4 h-4" />
                              <span>{formatDate(post.publishedAt)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{getReadTime(post.readTime)}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            {/* Trending Posts (Desktop only) */}
            {trendingPosts.length > 0 &&
              !selectedCategory &&
              !selectedTag &&
              !currentFeatured &&
              !currentTrending && (
                <div className="mb-12 hidden md:block">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-orange-500" />
                      <h2 className="text-2xl font-bold text-slate-900">
                        Trending Now
                      </h2>
                    </div>
                    <button
                      onClick={handleTrendingFilter}
                      className="text-orange-600 hover:text-orange-800 font-medium flex items-center gap-1"
                    >
                      View All <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {trendingPosts.map((post) => (
                      <Link
                        key={post._id}
                        to={`/blog/${post.slug}`}
                        className="group bg-gradient-to-br from-orange-50 to-white rounded-xl overflow-hidden shadow-lg border border-orange-100 hover:shadow-xl transition-all"
                      >
                        <div className="p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                              <TrendingUp className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="text-xs font-semibold text-orange-700 uppercase tracking-wide">
                                Trending
                              </div>
                              <div className="flex items-center gap-2 text-sm text-slate-600">
                                <Eye className="w-4 h-4" />
                                <span>{post.views} views</span>
                              </div>
                            </div>
                          </div>
                          <h3 className="font-bold text-slate-900 mb-2 group-hover:text-orange-700 line-clamp-2">
                            {post.title}
                          </h3>
                          <p className="text-slate-600 text-sm line-clamp-2 mb-3">
                            {post.excerpt}
                          </p>
                          <div className="text-xs text-slate-500">
                            {getReadTime(post.readTime)} •{" "}
                            {formatDate(post.publishedAt)}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

            {/* Active Filters */}
            {(selectedCategory ||
              selectedTag ||
              currentFeatured ||
              currentTrending ||
              searchTerm) && (
              <div className="mb-6 bg-white rounded-xl p-4 shadow-sm border border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-700">
                      Active Filters:
                    </span>
                    {selectedCategory && (
                      <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                        Category: {selectedCategory}
                        <button
                          onClick={() => handleCategoryFilter("")}
                          className="hover:text-purple-900"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {selectedTag && (
                      <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        Tag: {selectedTag}
                        <button
                          onClick={() => handleTagFilter("")}
                          className="hover:text-blue-900"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {currentFeatured && (
                      <span className="inline-flex items-center gap-1 bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm">
                        Featured Only
                        <button
                          onClick={handleFeaturedFilter}
                          className="hover:text-pink-900"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {currentTrending && (
                      <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">
                        Trending Only
                        <button
                          onClick={handleTrendingFilter}
                          className="hover:text-orange-900"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {searchTerm && (
                      <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                        Search: {searchTerm}
                        <button
                          onClick={() => setSearchTerm("")}
                          className="hover:text-green-900"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                  </div>
                  <button
                    onClick={clearFilters}
                    className="text-slate-600 hover:text-slate-900 text-sm font-medium flex items-center gap-1"
                  >
                    Clear All <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Blog Grid Title */}
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900">
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
                  <span className="text-slate-500 font-normal ml-2">
                    ({pagination.totalPosts || 0})
                  </span>
                )}
              </h2>

              {/* Sort Dropdown (Desktop) */}
              <div className="hidden md:block relative">
                <button
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-4 py-2 text-slate-700 hover:border-slate-300"
                >
                  <Filter className="w-4 h-4" />
                  Filter by Category
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${showCategoryDropdown ? "rotate-180" : ""}`}
                  />
                </button>

                {showCategoryDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-slate-200 z-50">
                    <div className="p-4">
                      <div className="font-medium text-slate-700 mb-3">
                        Categories
                      </div>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        <button
                          onClick={() => {
                            handleCategoryFilter("");
                            setShowCategoryDropdown(false);
                          }}
                          className={`block w-full text-left px-3 py-2 rounded-lg ${!selectedCategory ? "bg-purple-50 text-purple-700" : "hover:bg-slate-50"}`}
                        >
                          All Categories
                        </button>
                        {categories.map((cat) => (
                          <button
                            key={cat._id}
                            onClick={() => {
                              handleCategoryFilter(cat._id);
                              setShowCategoryDropdown(false);
                            }}
                            className={`block w-full text-left px-3 py-2 rounded-lg ${selectedCategory === cat._id ? "bg-purple-50 text-purple-700" : "hover:bg-slate-50"}`}
                          >
                            <div className="flex items-center justify-between">
                              <span>
                                {cat._id.charAt(0).toUpperCase() +
                                  cat._id.slice(1)}
                              </span>
                              <span className="text-slate-400 text-sm">
                                {cat.count}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Loading Skeleton */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200 animate-pulse"
                  >
                    <div className="h-48 bg-slate-200"></div>
                    <div className="p-6">
                      <div className="h-4 bg-slate-200 rounded mb-2"></div>
                      <div className="h-4 bg-slate-200 rounded w-3/4 mb-4"></div>
                      <div className="flex items-center justify-between">
                        <div className="h-3 bg-slate-200 rounded w-20"></div>
                        <div className="h-3 bg-slate-200 rounded w-16"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : blogs.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-slate-100 flex items-center justify-center">
                  <Search className="w-12 h-12 text-slate-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  No articles found
                </h3>
                <p className="text-slate-600 mb-8 max-w-md mx-auto">
                  {searchTerm || selectedCategory || selectedTag
                    ? "Try adjusting your search or filters to find what you're looking for."
                    : "Check back soon for new articles!"}
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-medium"
                >
                  Browse All Articles
                </button>
              </div>
            ) : (
              <>
                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {blogs.map((blog) => (
                    <article
                      key={blog._id}
                      className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:border-purple-200"
                    >
                      {/* Image */}
                      <Link to={`/blog/${blog.slug}`}>
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={
                              blog.featuredImageOptimized || "/default-blog.jpg"
                            }
                            alt={blog.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="absolute top-3 left-3">
                            <span className="bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-semibold px-3 py-1 rounded-full">
                              {blog.category}
                            </span>
                          </div>
                        </div>
                      </Link>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
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
                          <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-purple-700 line-clamp-2">
                            {blog.title}
                          </h3>
                        </Link>

                        <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                          {blog.excerpt}
                        </p>

                        {/* Author */}
                        <div className="flex items-center gap-3 mb-4">
                          {blog.author?.avatar ? (
                            <img
                              src={blog.author.avatar}
                              alt={blog.author.name}
                              className="w-8 h-8 rounded-full border-2 border-white shadow"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                              {blog.author?.name?.charAt(0) || "A"}
                            </div>
                          )}
                          <div>
                            <div className="font-medium text-slate-900 text-sm">
                              {blog.author?.name || "Admin"}
                            </div>
                          </div>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                          <div className="flex items-center gap-4 text-slate-500">
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
                            className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center gap-1"
                          >
                            Read More
                            <ChevronRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="mt-12">
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() =>
                          setSearchParams({ page: currentPage - 1 })
                        }
                        disabled={!pagination.hasPrev}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                      </button>

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
                              <button
                                key={pageNum}
                                onClick={() =>
                                  setSearchParams({ page: pageNum })
                                }
                                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                  currentPage === pageNum
                                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                                    : "border border-slate-200 hover:bg-slate-50"
                                }`}
                              >
                                {pageNum}
                              </button>
                            );
                          }
                        )}
                      </div>

                      <div className="md:hidden text-sm text-slate-600">
                        Page {currentPage} of {pagination.totalPages}
                      </div>

                      <button
                        onClick={() =>
                          setSearchParams({ page: currentPage + 1 })
                        }
                        disabled={!pagination.hasNext}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50"
                      >
                        Next
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Mobile Pagination */}
                    <div className="md:hidden mt-4 flex items-center justify-center gap-2">
                      <button
                        onClick={() =>
                          setSearchParams({
                            page: Math.max(1, currentPage - 1),
                          })
                        }
                        disabled={!pagination.hasPrev}
                        className="px-4 py-2 rounded-lg border border-slate-200 disabled:opacity-50"
                      >
                        ←
                      </button>
                      <span className="px-4">
                        {currentPage} / {pagination.totalPages}
                      </span>
                      <button
                        onClick={() =>
                          setSearchParams({
                            page: Math.min(
                              pagination.totalPages,
                              currentPage + 1
                            ),
                          })
                        }
                        disabled={!pagination.hasNext}
                        className="px-4 py-2 rounded-lg border border-slate-200 disabled:opacity-50"
                      >
                        →
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            {/* Mobile Filters Panel */}
            {showMobileFilters && (
              <div className="md:hidden mb-6 bg-white rounded-xl shadow-lg border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-slate-900">Filters</h3>
                  <button
                    onClick={() => setShowMobileFilters(false)}
                    className="text-slate-500 hover:text-slate-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <h4 className="font-medium text-slate-700 mb-3">
                    Categories
                  </h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleCategoryFilter("")}
                      className={`block w-full text-left px-3 py-2 rounded-lg ${!selectedCategory ? "bg-purple-50 text-purple-700" : "hover:bg-slate-50"}`}
                    >
                      All Categories
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat._id}
                        onClick={() => handleCategoryFilter(cat._id)}
                        className={`block w-full text-left px-3 py-2 rounded-lg ${selectedCategory === cat._id ? "bg-purple-50 text-purple-700" : "hover:bg-slate-50"}`}
                      >
                        <div className="flex items-center justify-between">
                          <span>
                            {cat._id.charAt(0).toUpperCase() + cat._id.slice(1)}
                          </span>
                          <span className="text-slate-400 text-sm">
                            {cat.count}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Featured & Trending */}
                <div className="mb-6">
                  <h4 className="font-medium text-slate-700 mb-3">
                    Collections
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={handleFeaturedFilter}
                      className={`px-4 py-3 rounded-lg border text-center ${currentFeatured ? "bg-pink-50 border-pink-200 text-pink-700" : "border-slate-200 hover:border-slate-300"}`}
                    >
                      <div className="font-medium">Featured</div>
                      <div className="text-xs text-slate-500">Top stories</div>
                    </button>
                    <button
                      onClick={handleTrendingFilter}
                      className={`px-4 py-3 rounded-lg border text-center ${currentTrending ? "bg-orange-50 border-orange-200 text-orange-700" : "border-slate-200 hover:border-slate-300"}`}
                    >
                      <div className="font-medium">Trending</div>
                      <div className="text-xs text-slate-500">Popular now</div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Desktop Sidebar */}
            <div className="space-y-6">
              {/* Trending Posts (Desktop Sidebar) */}
              <div className="bg-gradient-to-br from-orange-50 to-white rounded-xl shadow-sm border border-orange-100 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  <h3 className="font-bold text-slate-900">Trending Now</h3>
                </div>
                <div className="space-y-4">
                  {trendingPosts.map((post) => (
                    <Link
                      key={post._id}
                      to={`/blog/${post.slug}`}
                      className="block group"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={
                              post.featuredImageOptimized || "/default-blog.jpg"
                            }
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-slate-900 group-hover:text-orange-600 line-clamp-2 text-sm">
                            {post.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                            <Eye className="w-3 h-3" />
                            <span>{post.views} views</span>
                            <span>•</span>
                            <span>{getReadTime(post.readTime)}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                {trendingPosts.length > 0 && (
                  <button
                    onClick={handleTrendingFilter}
                    className="w-full mt-4 text-center text-orange-600 hover:text-orange-800 text-sm font-medium pt-4 border-t border-orange-100"
                  >
                    View All Trending →
                  </button>
                )}
              </div>

              {/* Categories */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 mb-4">Categories</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => handleCategoryFilter("")}
                    className={`block w-full text-left px-3 py-2 rounded-lg ${!selectedCategory ? "bg-purple-50 text-purple-700" : "hover:bg-slate-50"}`}
                  >
                    All Categories
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat._id}
                      onClick={() => handleCategoryFilter(cat._id)}
                      className={`block w-full text-left px-3 py-2 rounded-lg ${selectedCategory === cat._id ? "bg-purple-50 text-purple-700" : "hover:bg-slate-50"}`}
                    >
                      <div className="flex items-center justify-between">
                        <span>
                          {cat._id.charAt(0).toUpperCase() + cat._id.slice(1)}
                        </span>
                        <span className="text-slate-400 text-sm">
                          {cat.count}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Tags */}
              {tags.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <h3 className="font-bold text-slate-900 mb-4">
                    Popular Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <button
                        key={tag._id}
                        onClick={() => handleTagFilter(tag._id)}
                        className={`px-3 py-1.5 rounded-full text-sm ${selectedTag === tag._id ? "bg-blue-100 text-blue-700 border border-blue-200" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
                      >
                        #{tag._id} ({tag.count})
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Recent Authors */}
              {recentAuthors.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <h3 className="font-bold text-slate-900 mb-4">
                    Recent Authors
                  </h3>
                  <div className="space-y-4">
                    {recentAuthors.map((author) => (
                      <div key={author._id} className="flex items-center gap-3">
                        {author.avatar ? (
                          <img
                            src={author.avatar}
                            alt={author.name}
                            className="w-10 h-10 rounded-full border-2 border-white shadow"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                            {author.name?.charAt(0) || "A"}
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-slate-900">
                            {author.name}
                          </div>
                          <div className="text-xs text-slate-500">Author</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Newsletter Subscription */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-sm border border-purple-100 p-6">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">
                    Subscribe to Newsletter
                  </h3>
                  <p className="text-slate-600 text-sm mb-4">
                    Get the latest fashion tips and exclusive content delivered
                    to your inbox.
                  </p>
                  <form className="space-y-3">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="w-full px-4 py-2 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-medium"
                    >
                      Subscribe
                    </button>
                  </form>
                  <p className="text-xs text-slate-500 mt-3">
                    No spam. Unsubscribe at any time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white py-12 mt-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Want to contribute to our blog?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Share your fashion insights, style tips, or industry knowledge with
            our community.
          </p>
          <button
            onClick={() => navigate("/contact")}
            className="bg-white text-slate-900 px-8 py-3 rounded-lg hover:bg-slate-100 font-semibold transition-all duration-300 inline-flex items-center gap-2"
          >
            Contact Us to Contribute
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
