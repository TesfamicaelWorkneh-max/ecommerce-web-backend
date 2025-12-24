import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, X } from "lucide-react";
import toast from "react-hot-toast";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const AdminCreateBlogPost = () => {
  const navigate = useNavigate();

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
  const [loading, setLoading] = useState(false);

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

      // Add image
      if (featuredImage) {
        formDataToSend.append("featuredImage", featuredImage);
      }

      const token = localStorage.getItem("token");
      const response = await fetch(`${BACKEND_URL}/api/blog`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Blog post created successfully!");
        navigate("/admin/blog");
      } else {
        toast.error(data.message || "Failed to create blog post");
      }
    } catch (error) {
      console.error("Error creating blog post:", error);
      toast.error("Failed to create blog post");
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

  return (
    <div className="min-h-screen text-white">
      <h1 className="text-4xl font-bold mb-8 text-center text-green-400 tracking-wide drop-shadow-lg">
        Create New Blog Post
      </h1>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="bg-slate-800/80 backdrop-blur-md p-8 rounded-xl shadow-lg mb-8">
          {/* Basic Information */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-green-300">
              Basic Information
            </h2>

            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-slate-300 mb-2">Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter post title"
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-slate-300 mb-2">Excerpt</label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Brief description (max 200 characters)"
                  maxLength={200}
                />
                <div className="text-right text-sm text-slate-400 mt-1">
                  {formData.excerpt.length}/200 characters
                </div>
              </div>

              {/* Content */}
              <div>
                <label className="block text-slate-300 mb-2">Content *</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  rows="10"
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Write your content here..."
                />
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-green-300">
              Featured Image
            </h2>

            <div className="border-2 border-dashed border-slate-600 rounded-xl p-8 text-center">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-64 mx-auto rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div>
                  <Upload className="w-16 h-16 mx-auto mb-4 text-slate-400" />
                  <p className="text-slate-300 mb-4">Upload a featured image</p>
                  <label className="cursor-pointer bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-medium inline-block">
                    Choose Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                  <p className="text-sm text-slate-400 mt-4">
                    Recommended size: 1200x630px
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Categories & Tags */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-green-300">
              Categories & Tags
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category */}
              <div>
                <label className="block text-slate-300 mb-2">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-slate-300 mb-2">Tags</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="fashion, style, tips (comma separated)"
                />
              </div>
            </div>
          </div>

          {/* SEO Settings */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-green-300">
              SEO Settings
            </h2>

            <div className="space-y-6">
              {/* Meta Title */}
              <div>
                <label className="block text-slate-300 mb-2">Meta Title</label>
                <input
                  type="text"
                  name="metaTitle"
                  value={formData.metaTitle}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="SEO title for search engines"
                />
              </div>

              {/* Meta Description */}
              <div>
                <label className="block text-slate-300 mb-2">
                  Meta Description
                </label>
                <textarea
                  name="metaDescription"
                  value={formData.metaDescription}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="SEO description for search engines"
                  maxLength={160}
                />
                <div className="text-right text-sm text-slate-400 mt-1">
                  {formData.metaDescription.length}/160 characters
                </div>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-green-300">Settings</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Status */}
              <div>
                <label className="block text-slate-300 mb-2">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              {/* Featured */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="isFeatured"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                  className="w-5 h-5 text-green-500 bg-slate-700 border-slate-600 rounded focus:ring-green-500"
                />
                <label htmlFor="isFeatured" className="text-slate-300">
                  Mark as Featured
                </label>
              </div>

              {/* Trending */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="isTrending"
                  name="isTrending"
                  checked={formData.isTrending}
                  onChange={handleChange}
                  className="w-5 h-5 text-green-500 bg-slate-700 border-slate-600 rounded focus:ring-green-500"
                />
                <label htmlFor="isTrending" className="text-slate-300">
                  Mark as Trending
                </label>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-end pt-6 border-t border-slate-700">
            <button
              type="button"
              onClick={() => navigate("/admin/blog")}
              className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all duration-300 font-medium"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating...
                </span>
              ) : (
                "Create Post"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminCreateBlogPost;
