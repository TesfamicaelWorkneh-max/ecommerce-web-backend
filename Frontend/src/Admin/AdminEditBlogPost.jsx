import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Upload, X, Loader } from "lucide-react";
import toast from "react-hot-toast";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const AdminEditBlogPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "lifestyle",
    tags: "",
    metaTitle: "",
    metaDescription: "",
    status: "draft",
    isFeatured: false,
    isTrending: false,
  });

  const [featuredImage, setFeaturedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [existingImage, setExistingImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Fetch blog post data
  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setFetching(true);
        const token = localStorage.getItem("token");
        const response = await fetch(`${BACKEND_URL}/api/blog/post/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (data.success) {
          const post = data.data;
          setFormData({
            title: post.title || "",
            content: post.content || "",
            excerpt: post.excerpt || "",
            category: post.category || "lifestyle",
            tags: post.tags?.join(", ") || "",
            metaTitle: post.metaTitle || "",
            metaDescription: post.metaDescription || "",
            status: post.status || "draft",
            isFeatured: post.isFeatured || false,
            isTrending: post.isTrending || false,
          });

          if (post.featuredImage?.url) {
            setExistingImage(post.featuredImage.url);
            setImagePreview(post.featuredImage.url);
          }
        } else {
          toast.error("Blog post not found");
          navigate("/admin/blog");
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
        toast.error("Failed to load blog post");
        navigate("/admin/blog");
      } finally {
        setFetching(false);
      }
    };

    if (id) {
      fetchBlogPost();
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFeaturedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setFeaturedImage(null);
    setExistingImage("");
    setImagePreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();

      // Add form data
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      // Add image if changed
      if (featuredImage) {
        formDataToSend.append("featuredImage", featuredImage);
      }

      const token = localStorage.getItem("token");
      const response = await fetch(`${BACKEND_URL}/api/blog/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Blog post updated successfully!");
        navigate("/admin/blog");
      } else {
        toast.error(data.message || "Failed to update blog post");
      }
    } catch (error) {
      console.error("Error updating blog post:", error);
      toast.error("Failed to update blog post");
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "fashion",
    "lifestyle",
    "beauty",
    "trends",
    "tips",
    "news",
    "style-guide",
  ];

  const statusOptions = [
    { value: "draft", label: "Draft" },
    { value: "published", label: "Published" },
    { value: "archived", label: "Archived" },
  ];

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading blog post...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-green-400 tracking-wide">
            Edit Blog Post
          </h1>
          <p className="text-slate-400">
            Update your blog post content and settings
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information Card */}
          <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-700/50 p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6 text-green-300 border-b border-slate-700 pb-4">
              Basic Information
            </h2>

            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-slate-300 mb-2 font-medium">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Enter post title"
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-slate-300 mb-2 font-medium">
                  Excerpt
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Brief description (max 200 characters)"
                  maxLength={200}
                />
                <div className="text-right text-sm text-slate-400 mt-1">
                  {formData.excerpt.length}/200 characters
                </div>
              </div>

              {/* Content */}
              <div>
                <label className="block text-slate-300 mb-2 font-medium">
                  Content *
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  rows="12"
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all font-mono"
                  placeholder="Write your content here... (Supports HTML)"
                />
                <div className="text-sm text-slate-400 mt-2">
                  Tip: You can use HTML tags for formatting
                </div>
              </div>
            </div>
          </div>

          {/* Featured Image Card */}
          <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-700/50 p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6 text-green-300 border-b border-slate-700 pb-4">
              Featured Image
            </h2>

            <div className="space-y-6">
              {imagePreview ? (
                <div className="relative group">
                  <img
                    src={imagePreview}
                    alt="Featured"
                    className="max-w-2xl mx-auto rounded-xl shadow-lg"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="p-2 bg-red-600/90 text-white rounded-lg hover:bg-red-700 transition-colors shadow-lg"
                      title="Remove image"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="text-center mt-4 text-slate-400 text-sm">
                    {existingImage && !featuredImage
                      ? "Current image"
                      : "New image selected"}
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-slate-600 rounded-2xl p-12 text-center hover:border-slate-500 transition-colors">
                  <Upload className="w-16 h-16 mx-auto mb-4 text-slate-500" />
                  <p className="text-slate-300 mb-6 text-lg">
                    No featured image selected
                  </p>
                  <label className="cursor-pointer bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-medium inline-flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Choose New Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              )}

              {!imagePreview && (
                <div className="text-center">
                  <label className="cursor-pointer bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-medium inline-flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Upload Featured Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                  <p className="text-sm text-slate-400 mt-4">
                    Recommended size: 1200×630px • Max 5MB
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Categories & Tags Card */}
          <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-700/50 p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6 text-green-300 border-b border-slate-700 pb-4">
              Categories & Tags
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Category */}
              <div>
                <label className="block text-slate-300 mb-2 font-medium">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-slate-400 mt-2">
                  Select the main category for your post
                </p>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-slate-300 mb-2 font-medium">
                  Tags
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="fashion, style, tips (comma separated)"
                />
                <p className="text-sm text-slate-400 mt-2">
                  Separate tags with commas
                </p>
              </div>
            </div>
          </div>

          {/* SEO Settings Card */}
          <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-700/50 p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6 text-green-300 border-b border-slate-700 pb-4">
              SEO Settings
            </h2>

            <div className="space-y-6">
              {/* Meta Title */}
              <div>
                <label className="block text-slate-300 mb-2 font-medium">
                  Meta Title
                </label>
                <input
                  type="text"
                  name="metaTitle"
                  value={formData.metaTitle}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="SEO title for search engines"
                />
                <div className="text-sm text-slate-400 mt-2">
                  Leave empty to use the post title
                </div>
              </div>

              {/* Meta Description */}
              <div>
                <label className="block text-slate-300 mb-2 font-medium">
                  Meta Description
                </label>
                <textarea
                  name="metaDescription"
                  value={formData.metaDescription}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="SEO description for search engines"
                  maxLength={160}
                />
                <div className="flex justify-between text-sm text-slate-400 mt-1">
                  <span>{formData.metaDescription.length}/160 characters</span>
                  <span>Optimal: 150-160 characters</span>
                </div>
              </div>
            </div>
          </div>

          {/* Settings Card */}
          <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl shadow-lg border border-slate-700/50 p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-6 text-green-300 border-b border-slate-700 pb-4">
              Post Settings
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Status */}
              <div>
                <label className="block text-slate-300 mb-2 font-medium">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Featured */}
              <div className="flex items-center space-x-3 p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
                <input
                  type="checkbox"
                  id="isFeatured"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                  className="w-5 h-5 text-green-500 bg-slate-600 border-slate-500 rounded focus:ring-green-500 focus:ring-offset-slate-800"
                />
                <div>
                  <label
                    htmlFor="isFeatured"
                    className="text-slate-300 font-medium"
                  >
                    Featured Post
                  </label>
                  <p className="text-sm text-slate-400">
                    Show in featured section
                  </p>
                </div>
              </div>

              {/* Trending */}
              <div className="flex items-center space-x-3 p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
                <input
                  type="checkbox"
                  id="isTrending"
                  name="isTrending"
                  checked={formData.isTrending}
                  onChange={handleChange}
                  className="w-5 h-5 text-green-500 bg-slate-600 border-slate-500 rounded focus:ring-green-500 focus:ring-offset-slate-800"
                />
                <div>
                  <label
                    htmlFor="isTrending"
                    className="text-slate-300 font-medium"
                  >
                    Trending Post
                  </label>
                  <p className="text-sm text-slate-400">
                    Show in trending section
                  </p>
                </div>
              </div>

              {/* Post ID */}
              <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
                <div className="text-sm text-slate-400">Post ID</div>
                <div className="font-mono text-sm text-white truncate">
                  {id}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center pt-8 border-t border-slate-700">
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate("/admin/blog")}
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all duration-300 font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => navigate(`/blog/${formData.slug || id}`)}
                target="_blank"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 font-medium"
              >
                Preview
              </button>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => {
                  if (window.confirm("Save as draft?")) {
                    setFormData((prev) => ({ ...prev, status: "draft" }));
                  }
                }}
                className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-all duration-300 font-medium"
              >
                Save Draft
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader className="w-5 h-5 animate-spin" />
                    Updating...
                  </span>
                ) : (
                  "Update Post"
                )}
              </button>
            </div>
          </div>
        </form>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4">
            <div className="text-sm text-slate-400">Characters</div>
            <div className="text-2xl font-bold text-white">
              {formData.content.length}
            </div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4">
            <div className="text-sm text-slate-400">Words</div>
            <div className="text-2xl font-bold text-white">
              {formData.content.split(/\s+/).filter(Boolean).length}
            </div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-lg p-4">
            <div className="text-sm text-slate-400">Reading Time</div>
            <div className="text-2xl font-bold text-white">
              {Math.ceil(formData.content.split(/\s+/).length / 200)} min
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEditBlogPost;
