// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import {
//   Edit,
//   Trash2,
//   Eye,
//   Calendar,
//   User,
//   Search,
//   Filter,
//   CheckCircle,
//   Clock,
//   Archive,
// } from "lucide-react";
// import toast from "react-hot-toast";
// import { fetchWithAuth } from "../utils/auth";

// const BACKEND_URL = import.meta.env.VITE_API_URL;

// const AdminBlogPosts = () => {
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");

//   useEffect(() => {
//     fetchBlogPosts();
//   }, []);

//   const fetchBlogPosts = async () => {
//     try {
//       setLoading(true);

//       const response = await fetchWithAuth(`${BACKEND_URL}/api/blog`, {});
//       const data = await response.json();

//       if (data.success) {
//         setPosts(data.data || []);
//       }
//     } catch (error) {
//       console.error("Error fetching blog posts:", error);
//       toast.error("Failed to load blog posts");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this post?")) return;

//     try {
//       const response = await fetchWithAuth(`${BACKEND_URL}/api/blog/${id}`, {
//         method: "DELETE",
//       });
//       const data = await response.json();

//       if (data.success) {
//         toast.success("Post deleted successfully");
//         fetchBlogPosts();
//       } else {
//         toast.error(data.message || "Failed to delete post");
//       }
//     } catch (error) {
//       console.error("Error deleting post:", error);
//       toast.error("Failed to delete post");
//     }
//   };

//   const handleStatusChange = async (id, status) => {
//     try {
//       const response = await fetchWithAuth(
//         `${BACKEND_URL}/api/blog/${id}/status`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ status }),
//         }
//       );
//       const data = await response.json();

//       if (data.success) {
//         toast.success(`Post ${status} successfully`);
//         fetchBlogPosts();
//       } else {
//         toast.error(data.message || "Failed to update status");
//       }
//     } catch (error) {
//       console.error("Error updating status:", error);
//       toast.error("Failed to update status");
//     }
//   };

//   const filteredPosts = posts.filter((post) => {
//     const matchesSearch =
//       post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       post.content.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesStatus =
//       statusFilter === "all" || post.status === statusFilter;
//     return matchesSearch && matchesStatus;
//   });

//   const formatDate = (dateString) => {
//     if (!dateString) return "Not published";
//     const date = new Date(dateString);
//     return date.toLocaleDateString();
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "published":
//         return "bg-green-100 text-green-800";
//       case "draft":
//         return "bg-yellow-100 text-yellow-800";
//       case "archived":
//         return "bg-gray-100 text-gray-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "published":
//         return <CheckCircle className="w-4 h-4" />;
//       case "draft":
//         return <Clock className="w-4 h-4" />;
//       case "archived":
//         return <Archive className="w-4 h-4" />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="min-h-screen text-white">
//       <h1 className="text-4xl font-bold mb-8 text-center text-green-400 tracking-wide drop-shadow-lg">
//         Blog Posts Management
//       </h1>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
//         <div className="bg-slate-800/80 backdrop-blur-md p-6 rounded-xl shadow-lg">
//           <div className="text-3xl font-bold mb-2">{posts.length}</div>
//           <div className="text-slate-300">Total Posts</div>
//         </div>
//         <div className="bg-slate-800/80 backdrop-blur-md p-6 rounded-xl shadow-lg">
//           <div className="text-3xl font-bold mb-2">
//             {posts.filter((p) => p.status === "published").length}
//           </div>
//           <div className="text-slate-300">Published</div>
//         </div>
//         <div className="bg-slate-800/80 backdrop-blur-md p-6 rounded-xl shadow-lg">
//           <div className="text-3xl font-bold mb-2">
//             {posts.filter((p) => p.status === "draft").length}
//           </div>
//           <div className="text-slate-300">Drafts</div>
//         </div>
//         <div className="bg-slate-800/80 backdrop-blur-md p-6 rounded-xl shadow-lg">
//           <div className="text-3xl font-bold mb-2">
//             {posts.filter((p) => p.isFeatured).length}
//           </div>
//           <div className="text-slate-300">Featured</div>
//         </div>
//       </div>

//       {/* Actions Bar */}
//       <div className="bg-slate-800/80 backdrop-blur-md p-6 rounded-xl shadow-lg mb-8">
//         <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
//           <div className="flex-1">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
//               <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="Search posts..."
//                 className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500"
//               />
//             </div>
//           </div>

//           <div className="flex items-center gap-4">
//             <div className="flex items-center gap-2">
//               <Filter className="w-5 h-5 text-slate-400" />
//               <select
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//                 className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
//               >
//                 <option value="all">All Status</option>
//                 <option value="published">Published</option>
//                 <option value="draft">Draft</option>
//                 <option value="archived">Archived</option>
//               </select>
//             </div>

//             <Link
//               to="/admin/blog/create"
//               className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-medium"
//             >
//               + Create New Post
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Posts Table */}
//       <div className="bg-slate-800/80 backdrop-blur-md rounded-xl shadow-lg overflow-hidden">
//         {loading ? (
//           <div className="p-8 text-center">
//             <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
//             <p className="mt-4 text-slate-300">Loading posts...</p>
//           </div>
//         ) : filteredPosts.length === 0 ? (
//           <div className="p-8 text-center">
//             <p className="text-slate-300">No posts found</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-slate-900/50">
//                 <tr>
//                   <th className="py-4 px-6 text-left">Title</th>
//                   <th className="py-4 px-6 text-left">Author</th>
//                   <th className="py-4 px-6 text-left">Category</th>
//                   <th className="py-4 px-6 text-left">Status</th>
//                   <th className="py-4 px-6 text-left">Published</th>
//                   <th className="py-4 px-6 text-left">Views</th>
//                   <th className="py-4 px-6 text-left">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredPosts.map((post) => (
//                   <tr
//                     key={post._id}
//                     className="border-b border-slate-700/50 hover:bg-slate-700/30"
//                   >
//                     <td className="py-4 px-6">
//                       <div className="flex items-center gap-3">
//                         {post.featuredImage?.url && (
//                           <img
//                             src={post.featuredImage.url}
//                             alt={post.title}
//                             className="w-12 h-12 rounded-lg object-cover"
//                           />
//                         )}
//                         <div>
//                           <div className="font-medium text-white">
//                             {post.title}
//                           </div>
//                           <div className="text-sm text-slate-400 line-clamp-1">
//                             {post.excerpt}
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="py-4 px-6">
//                       <div className="flex items-center gap-2">
//                         <User className="w-4 h-4 text-slate-400" />
//                         <span>{post.author?.name || "Admin"}</span>
//                       </div>
//                     </td>
//                     <td className="py-4 px-6">
//                       <span className="px-3 py-1 bg-purple-900/30 text-purple-300 rounded-full text-sm">
//                         {post.category}
//                       </span>
//                     </td>
//                     <td className="py-4 px-6">
//                       <div className="flex items-center gap-2">
//                         <span
//                           className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${getStatusColor(post.status)}`}
//                         >
//                           {getStatusIcon(post.status)}
//                           {post.status.charAt(0).toUpperCase() +
//                             post.status.slice(1)}
//                         </span>
//                         {post.isFeatured && (
//                           <span className="px-2 py-1 bg-pink-900/30 text-pink-300 rounded-full text-xs">
//                             Featured
//                           </span>
//                         )}
//                       </div>
//                     </td>
//                     <td className="py-4 px-6">
//                       <div className="flex items-center gap-2 text-slate-300">
//                         <Calendar className="w-4 h-4" />
//                         {formatDate(post.publishedAt)}
//                       </div>
//                     </td>
//                     <td className="py-4 px-6">
//                       <div className="flex items-center gap-2">
//                         <Eye className="w-4 h-4 text-slate-400" />
//                         <span>{post.views || 0}</span>
//                       </div>
//                     </td>
//                     <td className="py-4 px-6">
//                       <div className="flex items-center gap-2">
//                         <Link
//                           to={`/blog/${post.slug}`}
//                           target="_blank"
//                           className="p-2 bg-blue-900/30 text-blue-300 rounded-lg hover:bg-blue-900/50"
//                           title="View"
//                         >
//                           <Eye className="w-4 h-4" />
//                         </Link>
//                         <Link
//                           to={`/admin/blog/edit/${post._id}`}
//                           className="p-2 bg-yellow-900/30 text-yellow-300 rounded-lg hover:bg-yellow-900/50"
//                           title="Edit"
//                         >
//                           <Edit className="w-4 h-4" />
//                         </Link>
//                         <button
//                           onClick={() => handleDelete(post._id)}
//                           className="p-2 bg-red-900/30 text-red-300 rounded-lg hover:bg-red-900/50"
//                           title="Delete"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </button>

//                         {/* Status Actions */}
//                         <div className="relative group">
//                           <button className="p-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600">
//                             ⋮
//                           </button>
//                           <div className="absolute right-0 mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 min-w-32">
//                             {post.status !== "published" && (
//                               <button
//                                 onClick={() =>
//                                   handleStatusChange(post._id, "published")
//                                 }
//                                 className="block w-full text-left px-4 py-2 text-green-300 hover:bg-green-900/30"
//                               >
//                                 Publish
//                               </button>
//                             )}
//                             {post.status !== "draft" && (
//                               <button
//                                 onClick={() =>
//                                   handleStatusChange(post._id, "draft")
//                                 }
//                                 className="block w-full text-left px-4 py-2 text-yellow-300 hover:bg-yellow-900/30"
//                               >
//                                 Move to Draft
//                               </button>
//                             )}
//                             {post.status !== "archived" && (
//                               <button
//                                 onClick={() =>
//                                   handleStatusChange(post._id, "archived")
//                                 }
//                                 className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-900/30"
//                               >
//                                 Archive
//                               </button>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminBlogPosts;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Edit,
  Trash2,
  Eye,
  Calendar,
  User,
  Search,
  Filter,
  CheckCircle,
  Clock,
  Archive,
  MoreVertical,
  TrendingUp,
  Eye as ViewsIcon,
  FileText,
  Tag,
  ChevronDown,
  ChevronUp,
  Sun,
  Moon,
} from "lucide-react";
import toast from "react-hot-toast";
import { fetchWithAuth } from "../utils/auth";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const AdminBlogPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(true);
  const [expandedPost, setExpandedPost] = useState(null);

  useEffect(() => {
    fetchBlogPosts();
    // Check for dark mode preference
    const isDark = localStorage.getItem("darkMode") !== "false";
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const fetchBlogPosts = async () => {
    try {
      setLoading(true);
      const response = await fetchWithAuth(`${BACKEND_URL}/api/blog`, {});
      const data = await response.json();

      if (data.success) {
        setPosts(data.data || []);
      }
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      toast.error("Failed to load blog posts");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      const response = await fetchWithAuth(`${BACKEND_URL}/api/blog/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (data.success) {
        toast.success("Post deleted successfully");
        fetchBlogPosts();
      } else {
        toast.error(data.message || "Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const response = await fetchWithAuth(
        `${BACKEND_URL}/api/blog/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );
      const data = await response.json();

      if (data.success) {
        toast.success(`Post ${status} successfully`);
        fetchBlogPosts();
      } else {
        toast.error(data.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString) => {
    if (!dateString) return "Not published";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "published":
        return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300";
      case "draft":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300";
      case "archived":
        return "bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300";
      default:
        return "bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "published":
        return <CheckCircle className="w-4 h-4" />;
      case "draft":
        return <Clock className="w-4 h-4" />;
      case "archived":
        return <Archive className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-2 md:p-4 transition-colors duration-200">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Blog Posts Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage and publish your blog content
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-gray-600 dark:text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              )}
            </button>

            <Link
              to="/admin/blog/create"
              className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-medium flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Create Post</span>
              <span className="inline sm:hidden">+</span>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Total Posts
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {posts.length}
                </p>
              </div>
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Published
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {posts.filter((p) => p.status === "published").length}
                </p>
              </div>
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Drafts
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {posts.filter((p) => p.status === "draft").length}
                </p>
              </div>
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Featured
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {posts.filter((p) => p.isFeatured).length}
                </p>
              </div>
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search posts by title, content, or category..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2.5 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent min-w-[140px]"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Cards View */}
      <div className="lg:hidden">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Loading posts...
            </p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <FileText className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">No posts found</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
              {searchTerm
                ? "Try a different search term"
                : "Create your first post"}
            </p>
            {!searchTerm && (
              <Link
                to="/admin/blog/create"
                className="mt-4 inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Create New Post
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <div
                key={post._id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                {/* Card Header */}
                <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-start gap-3">
                    {post.featuredImage?.url && (
                      <img
                        src={post.featuredImage.url}
                        alt={post.title}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                          {post.title}
                        </h3>
                        <button
                          onClick={() =>
                            setExpandedPost(
                              expandedPost === post._id ? null : post._id
                            )
                          }
                          className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          {expandedPost === post._id ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                        {post.excerpt || post.content?.substring(0, 100)}...
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Details - Collapsible */}
                <div
                  className={`px-4 overflow-hidden transition-all duration-300 ${
                    expandedPost === post._id ? "max-h-96 py-4" : "max-h-0"
                  }`}
                >
                  <div className="space-y-3">
                    {/* Author & Category */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {post.author?.name || "Admin"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Status & Views */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs flex items-center gap-1 ${getStatusColor(
                            post.status
                          )}`}
                        >
                          {getStatusIcon(post.status)}
                          {post.status.charAt(0).toUpperCase() +
                            post.status.slice(1)}
                        </span>
                        {post.isFeatured && (
                          <span className="px-2 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300 rounded-full text-xs">
                            Featured
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <ViewsIcon className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {post.views || 0} views
                        </span>
                      </div>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      Published: {formatDate(post.publishedAt)}
                    </div>
                  </div>
                </div>

                {/* Card Footer - Actions */}
                <div className="p-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/blog/${post.slug}`}
                        target="_blank"
                        className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
                        title="View"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <Link
                        to={`/admin/blog/edit/${post._id}`}
                        className="p-2 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-lg"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Status Actions Dropdown */}
                    <div className="relative">
                      <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 min-w-[160px] z-10">
                        {post.status !== "published" && (
                          <button
                            onClick={() =>
                              handleStatusChange(post._id, "published")
                            }
                            className="w-full text-left px-4 py-2 text-sm text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
                          >
                            Publish
                          </button>
                        )}
                        {post.status !== "draft" && (
                          <button
                            onClick={() =>
                              handleStatusChange(post._id, "draft")
                            }
                            className="w-full text-left px-4 py-2 text-sm text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20"
                          >
                            Move to Draft
                          </button>
                        )}
                        {post.status !== "archived" && (
                          <button
                            onClick={() =>
                              handleStatusChange(post._id, "archived")
                            }
                            className="w-full text-left px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                          >
                            Archive
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Loading posts...
              </p>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">No posts found</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                {searchTerm
                  ? "Try a different search term"
                  : "Create your first post"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Title
                    </th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Author
                    </th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Category
                    </th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Status
                    </th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Published
                    </th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Views
                    </th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900 dark:text-white">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPosts.map((post) => (
                    <tr
                      key={post._id}
                      className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          {post.featuredImage?.url && (
                            <img
                              src={post.featuredImage.url}
                              alt={post.title}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                          )}
                          <div className="min-w-0">
                            <div className="font-medium text-gray-900 dark:text-white truncate max-w-[200px]">
                              {post.title}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-[200px]">
                              {post.excerpt}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700 dark:text-gray-300">
                            {post.author?.name || "Admin"}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm">
                          {post.category}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${getStatusColor(
                              post.status
                            )}`}
                          >
                            {getStatusIcon(post.status)}
                            {post.status.charAt(0).toUpperCase() +
                              post.status.slice(1)}
                          </span>
                          {post.isFeatured && (
                            <span className="px-2 py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300 rounded-full text-xs">
                              Featured
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                          <Calendar className="w-4 h-4" />
                          {formatDate(post.publishedAt)}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <ViewsIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700 dark:text-gray-300">
                            {post.views || 0}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/blog/${post.slug}`}
                            target="_blank"
                            className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg"
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <Link
                            to={`/admin/blog/edit/${post._id}`}
                            className="p-2 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 rounded-lg"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(post._id)}
                            className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          <div className="relative group">
                            <button className="p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                              ⋮
                            </button>
                            <div className="absolute right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 min-w-32">
                              {post.status !== "published" && (
                                <button
                                  onClick={() =>
                                    handleStatusChange(post._id, "published")
                                  }
                                  className="block w-full text-left px-4 py-2 text-sm text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20"
                                >
                                  Publish
                                </button>
                              )}
                              {post.status !== "draft" && (
                                <button
                                  onClick={() =>
                                    handleStatusChange(post._id, "draft")
                                  }
                                  className="block w-full text-left px-4 py-2 text-sm text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20"
                                >
                                  Move to Draft
                                </button>
                              )}
                              {post.status !== "archived" && (
                                <button
                                  onClick={() =>
                                    handleStatusChange(post._id, "archived")
                                  }
                                  className="block w-full text-left px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                                >
                                  Archive
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Footer Info */}
      {!loading && filteredPosts.length > 0 && (
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Showing {filteredPosts.length} of {posts.length} posts
          {searchTerm && ` matching "${searchTerm}"`}
        </div>
      )}
    </div>
  );
};

export default AdminBlogPosts;
