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
} from "lucide-react";
import toast from "react-hot-toast";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const AdminBlogPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(`${BACKEND_URL}/api/blog`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
      const token = localStorage.getItem("token");
      const response = await fetch(`${BACKEND_URL}/api/blog/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
      const token = localStorage.getItem("token");
      const response = await fetch(`${BACKEND_URL}/api/blog/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
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
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString) => {
    if (!dateString) return "Not published";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
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
    <div className="min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-8 text-center text-green-400 tracking-wide drop-shadow-lg">
        Blog Posts Management
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-800/80 backdrop-blur-md p-6 rounded-xl shadow-lg">
          <div className="text-3xl font-bold mb-2">{posts.length}</div>
          <div className="text-slate-300">Total Posts</div>
        </div>
        <div className="bg-slate-800/80 backdrop-blur-md p-6 rounded-xl shadow-lg">
          <div className="text-3xl font-bold mb-2">
            {posts.filter((p) => p.status === "published").length}
          </div>
          <div className="text-slate-300">Published</div>
        </div>
        <div className="bg-slate-800/80 backdrop-blur-md p-6 rounded-xl shadow-lg">
          <div className="text-3xl font-bold mb-2">
            {posts.filter((p) => p.status === "draft").length}
          </div>
          <div className="text-slate-300">Drafts</div>
        </div>
        <div className="bg-slate-800/80 backdrop-blur-md p-6 rounded-xl shadow-lg">
          <div className="text-3xl font-bold mb-2">
            {posts.filter((p) => p.isFeatured).length}
          </div>
          <div className="text-slate-300">Featured</div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="bg-slate-800/80 backdrop-blur-md p-6 rounded-xl shadow-lg mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search posts..."
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-slate-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <Link
              to="/admin/blog/create"
              className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-medium"
            >
              + Create New Post
            </Link>
          </div>
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-slate-800/80 backdrop-blur-md rounded-xl shadow-lg overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
            <p className="mt-4 text-slate-300">Loading posts...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-slate-300">No posts found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-900/50">
                <tr>
                  <th className="py-4 px-6 text-left">Title</th>
                  <th className="py-4 px-6 text-left">Author</th>
                  <th className="py-4 px-6 text-left">Category</th>
                  <th className="py-4 px-6 text-left">Status</th>
                  <th className="py-4 px-6 text-left">Published</th>
                  <th className="py-4 px-6 text-left">Views</th>
                  <th className="py-4 px-6 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.map((post) => (
                  <tr
                    key={post._id}
                    className="border-b border-slate-700/50 hover:bg-slate-700/30"
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
                        <div>
                          <div className="font-medium text-white">
                            {post.title}
                          </div>
                          <div className="text-sm text-slate-400 line-clamp-1">
                            {post.excerpt}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-slate-400" />
                        <span>{post.author?.name || "Admin"}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 bg-purple-900/30 text-purple-300 rounded-full text-sm">
                        {post.category}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 ${getStatusColor(post.status)}`}
                        >
                          {getStatusIcon(post.status)}
                          {post.status.charAt(0).toUpperCase() +
                            post.status.slice(1)}
                        </span>
                        {post.isFeatured && (
                          <span className="px-2 py-1 bg-pink-900/30 text-pink-300 rounded-full text-xs">
                            Featured
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-slate-300">
                        <Calendar className="w-4 h-4" />
                        {formatDate(post.publishedAt)}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-slate-400" />
                        <span>{post.views || 0}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/blog/${post.slug}`}
                          target="_blank"
                          className="p-2 bg-blue-900/30 text-blue-300 rounded-lg hover:bg-blue-900/50"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          to={`/admin/blog/edit/${post._id}`}
                          className="p-2 bg-yellow-900/30 text-yellow-300 rounded-lg hover:bg-yellow-900/50"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(post._id)}
                          className="p-2 bg-red-900/30 text-red-300 rounded-lg hover:bg-red-900/50"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        {/* Status Actions */}
                        <div className="relative group">
                          <button className="p-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600">
                            ⋮
                          </button>
                          <div className="absolute right-0 mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 min-w-32">
                            {post.status !== "published" && (
                              <button
                                onClick={() =>
                                  handleStatusChange(post._id, "published")
                                }
                                className="block w-full text-left px-4 py-2 text-green-300 hover:bg-green-900/30"
                              >
                                Publish
                              </button>
                            )}
                            {post.status !== "draft" && (
                              <button
                                onClick={() =>
                                  handleStatusChange(post._id, "draft")
                                }
                                className="block w-full text-left px-4 py-2 text-yellow-300 hover:bg-yellow-900/30"
                              >
                                Move to Draft
                              </button>
                            )}
                            {post.status !== "archived" && (
                              <button
                                onClick={() =>
                                  handleStatusChange(post._id, "archived")
                                }
                                className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-900/30"
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
  );
};

export default AdminBlogPosts;
