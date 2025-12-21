import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../utils/auth";
import {
  FaUpload,
  FaImage,
  FaInfoCircle,
  FaTag,
  FaBox,
  FaLayerGroup,
  FaCheckCircle,
  FaLeaf,
  FaFlask,
  FaBoxOpen,
  FaCalendarAlt,
  FaShoppingBag,
  FaArrowLeft,
  FaPlus,
  FaTimes,
  FaStar,
} from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import toast from "react-hot-toast";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const AdminAddProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const initialFormData = {
    name: "",
    price: "",
    stock: "",
    category: "",
    isSold: false,
    image: null,
    images: [],
    description: {
      intro: "",
      keyFeatures: [],
      benefits: [],
      ingredients: "",
      howToUse: "",
      storage: "",
    },
    relatedProducts: [],
  };

  const [formData, setFormData] = useState(initialFormData);
  const [featureInput, setFeatureInput] = useState("");
  const [benefitInput, setBenefitInput] = useState("");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetchWithAuth(`${BACKEND_URL}/api/categories`);
        const data = await res.json();
        setCategories(data.categories || data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load categories");
      }
    };
    loadCategories();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData({
        ...formData,
        description: {
          ...formData.description,
          keyFeatures: [
            ...formData.description.keyFeatures,
            featureInput.trim(),
          ],
        },
      });
      setFeatureInput("");
      toast.success("Feature added!");
    }
  };

  const removeFeature = (index) => {
    const newFeatures = formData.description.keyFeatures.filter(
      (_, i) => i !== index
    );
    setFormData({
      ...formData,
      description: {
        ...formData.description,
        keyFeatures: newFeatures,
      },
    });
  };

  const addBenefit = () => {
    if (benefitInput.trim()) {
      setFormData({
        ...formData,
        description: {
          ...formData.description,
          benefits: [...formData.description.benefits, benefitInput.trim()],
        },
      });
      setBenefitInput("");
      toast.success("Benefit added!");
    }
  };

  const removeBenefit = (index) => {
    const newBenefits = formData.description.benefits.filter(
      (_, i) => i !== index
    );
    setFormData({
      ...formData,
      description: {
        ...formData.description,
        benefits: newBenefits,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const fd = new FormData();

      // Add basic fields
      fd.append("name", formData.name.trim());
      fd.append("price", parseFloat(formData.price));
      fd.append("stock", parseInt(formData.stock) || 0);
      fd.append("category", formData.category);
      fd.append("isSold", formData.isSold);

      // Add structured description
      fd.append("description", JSON.stringify(formData.description));

      // Add related products (empty array)
      fd.append("relatedProducts", JSON.stringify([]));

      // Add image
      if (formData.image) {
        fd.append("image", formData.image);
      }

      const res = await fetchWithAuth(`${BACKEND_URL}/api/products`, {
        method: "POST",
        body: fd,
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("✨ Product added successfully!");
        setTimeout(() => {
          navigate("/admin/products");
        }, 1500);
      } else {
        toast.error(data.message || "Failed to add product");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-emerald-50/30 via-white to-teal-50/20 dark:from-slate-950/95 dark:via-slate-900 dark:to-slate-950/95 py-12"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate("/admin/products")}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 hover:from-emerald-500/20 hover:to-emerald-600/20 text-emerald-700 dark:text-emerald-300 font-medium border border-emerald-500/30 transition-all duration-300 mb-6"
          >
            <FaArrowLeft />
            Back to Products
          </motion.button>

          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 dark:border-emerald-500/30 backdrop-blur-sm mb-4">
              <IoSparkles className="text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                Admin Panel
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-4">
              <span className="text-slate-800 dark:text-white">Add New</span>
              <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent ml-3">
                Product
              </span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Create a new product with detailed information and beautiful
              description
            </p>
          </div>
        </div>

        <motion.form
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onSubmit={handleSubmit}
          className="grid lg:grid-cols-3 gap-8"
        >
          {/* Left Column - Basic Information */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Info Card */}
            <motion.div
              variants={itemVariants}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/50 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10">
                  <FaInfoCircle className="text-emerald-600 dark:text-emerald-400 text-xl" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                  Basic Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Enter product name"
                    className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 text-slate-800 dark:text-white placeholder-slate-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Price ($) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    placeholder="0.00"
                    className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 text-slate-800 dark:text-white placeholder-slate-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.stock}
                    onChange={(e) =>
                      setFormData({ ...formData, stock: e.target.value })
                    }
                    placeholder="Available units"
                    className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 text-slate-800 dark:text-white placeholder-slate-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 text-slate-800 dark:text-white appearance-none"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={formData.isSold}
                      onChange={(e) =>
                        setFormData({ ...formData, isSold: e.target.checked })
                      }
                      className="sr-only"
                    />
                    <div
                      className={`w-12 h-6 rounded-full transition-all duration-300 ${formData.isSold ? "bg-red-500" : "bg-slate-300 dark:bg-slate-600"}`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${formData.isSold ? "left-7" : "left-1"}`}
                      />
                    </div>
                  </div>
                  <span className="text-slate-700 dark:text-slate-300 font-medium">
                    Mark as Sold Out
                  </span>
                </label>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 ml-14">
                  When enabled, customers won't be able to purchase this product
                </p>
              </div>
            </motion.div>

            {/* Description Card */}
            <motion.div
              variants={itemVariants}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/50 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
                  <FaTag className="text-blue-600 dark:text-blue-400 text-xl" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                  Product Description
                </h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Introduction *
                  </label>
                  <textarea
                    value={formData.description.intro}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: {
                          ...formData.description,
                          intro: e.target.value,
                        },
                      })
                    }
                    placeholder="Write a compelling introduction about your product..."
                    rows="4"
                    className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 text-slate-800 dark:text-white placeholder-slate-400 resize-none"
                    required
                  />
                </div>

                {/* Key Features */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Key Features
                    </label>
                    <span className="text-xs text-slate-500">
                      {formData.description.keyFeatures.length} added
                    </span>
                  </div>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addFeature())
                      }
                      placeholder="Add a key feature..."
                      className="flex-1 px-4 py-2 rounded-lg bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 text-slate-800 dark:text-white"
                    />
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={addFeature}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 flex items-center gap-2"
                    >
                      <FaPlus />
                      Add
                    </motion.button>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2">
                    {formData.description.keyFeatures.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-emerald-500/5 to-teal-500/5 border border-emerald-500/10"
                      >
                        <div className="flex items-center gap-3">
                          <FaCheckCircle className="text-emerald-500" />
                          <span className="text-slate-700 dark:text-slate-300">
                            {feature}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="text-red-500 hover:text-red-600 p-1"
                        >
                          <FaTimes />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Benefits */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Benefits
                    </label>
                    <span className="text-xs text-slate-500">
                      {formData.description.benefits.length} added
                    </span>
                  </div>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={benefitInput}
                      onChange={(e) => setBenefitInput(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addBenefit())
                      }
                      placeholder="Add a benefit..."
                      className="flex-1 px-4 py-2 rounded-lg bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 text-slate-800 dark:text-white"
                    />
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={addBenefit}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 flex items-center gap-2"
                    >
                      <FaPlus />
                      Add
                    </motion.button>
                  </div>

                  {/* Benefits List */}
                  <div className="space-y-2">
                    {formData.description.benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-green-500/5 to-emerald-500/5 border border-green-500/10"
                      >
                        <div className="flex items-center gap-3">
                          <FaLeaf className="text-green-500" />
                          <span className="text-slate-700 dark:text-slate-300">
                            {benefit}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeBenefit(index)}
                          className="text-red-500 hover:text-red-600 p-1"
                        >
                          <FaTimes />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Ingredients & Usage */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Ingredients
                    </label>
                    <textarea
                      value={formData.description.ingredients}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: {
                            ...formData.description,
                            ingredients: e.target.value,
                          },
                        })
                      }
                      placeholder="List the ingredients..."
                      rows="3"
                      className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 text-slate-800 dark:text-white placeholder-slate-400 resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      How to Use
                    </label>
                    <textarea
                      value={formData.description.howToUse}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: {
                            ...formData.description,
                            howToUse: e.target.value,
                          },
                        })
                      }
                      placeholder="Instructions for use..."
                      rows="3"
                      className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 text-slate-800 dark:text-white placeholder-slate-400 resize-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Storage Instructions
                  </label>
                  <input
                    type="text"
                    value={formData.description.storage}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: {
                          ...formData.description,
                          storage: e.target.value,
                        },
                      })
                    }
                    placeholder="e.g., Store in a cool, dry place"
                    className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 text-slate-800 dark:text-white placeholder-slate-400"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Image & Submit */}
          <div className="space-y-8">
            {/* Image Upload Card */}
            <motion.div
              variants={itemVariants}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/50 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10">
                  <FaImage className="text-purple-600 dark:text-purple-400 text-xl" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                  Product Image
                </h2>
              </div>

              <div className="space-y-6">
                {/* Image Preview */}
                <div className="relative">
                  <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-600">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-8">
                        <FaUpload className="text-4xl text-slate-400 dark:text-slate-500 mb-4" />
                        <p className="text-slate-500 dark:text-slate-400 text-center">
                          Upload product image
                        </p>
                        <p className="text-sm text-slate-400 dark:text-slate-500 mt-2">
                          Recommended: 800x800px
                        </p>
                      </div>
                    )}
                  </div>

                  {imagePreview && (
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setFormData({ ...formData, image: null });
                      }}
                      className="absolute top-3 right-3 w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
                    >
                      <FaTimes />
                    </button>
                  )}
                </div>

                {/* Upload Button */}
                <div>
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <motion.label
                    htmlFor="image-upload"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="block w-full px-6 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium text-center cursor-pointer shadow-lg hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <FaUpload />
                      {formData.image ? "Change Image" : "Upload Image"}
                    </div>
                  </motion.label>
                  <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-3">
                    Supports JPG, PNG, WebP • Max 5MB
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Stats & Info Card */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-emerald-500/5 to-teal-500/5 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20"
            >
              <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                <FaInfoCircle className="text-emerald-500" />
                Description Preview
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <FaCheckCircle className="text-emerald-500" />
                  <span className="text-slate-600 dark:text-slate-300">
                    {formData.description.intro ? "Intro added" : "No intro"}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <FaStar className="text-amber-500" />
                  <span className="text-slate-600 dark:text-slate-300">
                    {formData.description.keyFeatures.length} key features
                  </span>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <FaLeaf className="text-green-500" />
                  <span className="text-slate-600 dark:text-slate-300">
                    {formData.description.benefits.length} benefits
                  </span>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <FaFlask className="text-blue-500" />
                  <span className="text-slate-600 dark:text-slate-300">
                    {formData.description.ingredients
                      ? "Ingredients added"
                      : "No ingredients"}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Quick Tips */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-blue-500/5 to-cyan-500/5 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                  <FaShoppingBag className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-white mb-2">
                    Pro Tips
                  </h3>
                  <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5" />
                      Use descriptive, compelling product names
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5" />
                      Add at least 3-5 key features
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5" />
                      High-quality images increase conversions
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={itemVariants}>
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                  loading
                    ? "bg-gradient-to-r from-emerald-500/50 to-teal-500/50 cursor-not-allowed"
                    : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg hover:shadow-2xl hover:shadow-emerald-500/30"
                } text-white flex items-center justify-center gap-3`}
              >
                {loading ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating Product...
                  </>
                ) : (
                  <>
                    <IoSparkles />
                    Create Product
                    <FaCheckCircle />
                  </>
                )}
              </motion.button>

              <p className="text-sm text-slate-500 dark:text-slate-400 text-center mt-4">
                Fields marked with * are required
              </p>
            </motion.div>
          </div>
        </motion.form>
      </div>
    </motion.div>
  );
};

export default AdminAddProduct;
