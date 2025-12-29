// // import React, { useEffect, useState } from "react";
// // import { motion } from "framer-motion";
// // import { useNavigate } from "react-router-dom";
// // import { fetchWithAuth } from "../utils/auth";
// // import {
// //   FaUpload,
// //   FaImage,
// //   FaInfoCircle,
// //   FaTag,
// //   FaBox,
// //   FaLayerGroup,
// //   FaCheckCircle,
// //   FaLeaf,
// //   FaFlask,
// //   FaBoxOpen,
// //   FaCalendarAlt,
// //   FaShoppingBag,
// //   FaArrowLeft,
// //   FaPlus,
// //   FaTimes,
// //   FaStar,
// // } from "react-icons/fa";
// // import { IoSparkles } from "react-icons/io5";
// // import toast from "react-hot-toast";

// // const BACKEND_URL = import.meta.env.VITE_API_URL;

// // const AdminAddProduct = () => {
// //   const navigate = useNavigate();
// //   const [categories, setCategories] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [imagePreview, setImagePreview] = useState(null);

// //   const initialFormData = {
// //     name: "",
// //     price: "",
// //     stock: "",
// //     category: "",
// //     isSold: false,
// //     image: null,
// //     images: [],
// //     description: {
// //       intro: "",
// //       keyFeatures: [],
// //       benefits: [],
// //       ingredients: "",
// //       howToUse: "",
// //       storage: "",
// //     },
// //     relatedProducts: [],
// //   };

// //   const [formData, setFormData] = useState(initialFormData);
// //   const [featureInput, setFeatureInput] = useState("");
// //   const [benefitInput, setBenefitInput] = useState("");

// //   useEffect(() => {
// //     const loadCategories = async () => {
// //       try {
// //         const res = await fetchWithAuth(`${BACKEND_URL}/api/categories`);
// //         const data = await res.json();
// //         setCategories(data.categories || data);
// //       } catch (err) {
// //         console.error(err);
// //         toast.error("Failed to load categories");
// //       }
// //     };
// //     loadCategories();
// //   }, []);

// //   const handleImageChange = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       setFormData({ ...formData, image: file });

// //       // Create preview URL
// //       const reader = new FileReader();
// //       reader.onloadend = () => {
// //         setImagePreview(reader.result);
// //       };
// //       reader.readAsDataURL(file);
// //     }
// //   };

// //   const addFeature = () => {
// //     if (featureInput.trim()) {
// //       setFormData({
// //         ...formData,
// //         description: {
// //           ...formData.description,
// //           keyFeatures: [
// //             ...formData.description.keyFeatures,
// //             featureInput.trim(),
// //           ],
// //         },
// //       });
// //       setFeatureInput("");
// //       toast.success("Feature added!");
// //     }
// //   };

// //   const removeFeature = (index) => {
// //     const newFeatures = formData.description.keyFeatures.filter(
// //       (_, i) => i !== index
// //     );
// //     setFormData({
// //       ...formData,
// //       description: {
// //         ...formData.description,
// //         keyFeatures: newFeatures,
// //       },
// //     });
// //   };

// //   const addBenefit = () => {
// //     if (benefitInput.trim()) {
// //       setFormData({
// //         ...formData,
// //         description: {
// //           ...formData.description,
// //           benefits: [...formData.description.benefits, benefitInput.trim()],
// //         },
// //       });
// //       setBenefitInput("");
// //       toast.success("Benefit added!");
// //     }
// //   };

// //   const removeBenefit = (index) => {
// //     const newBenefits = formData.description.benefits.filter(
// //       (_, i) => i !== index
// //     );
// //     setFormData({
// //       ...formData,
// //       description: {
// //         ...formData.description,
// //         benefits: newBenefits,
// //       },
// //     });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);

// //     try {
// //       const fd = new FormData();

// //       // Add basic fields
// //       fd.append("name", formData.name.trim());
// //       fd.append("price", parseFloat(formData.price));
// //       fd.append("stock", parseInt(formData.stock) || 0);
// //       fd.append("category", formData.category);
// //       fd.append("isSold", formData.isSold);

// //       // Add structured description
// //       fd.append("description", JSON.stringify(formData.description));

// //       // Add related products (empty array)
// //       fd.append("relatedProducts", JSON.stringify([]));

// //       // Add image
// //       if (formData.image) {
// //         fd.append("image", formData.image);
// //       }

// //       const res = await fetchWithAuth(`${BACKEND_URL}/api/products`, {
// //         method: "POST",
// //         body: fd,
// //       });

// //       const data = await res.json();

// //       if (res.ok) {
// //         toast.success("✨ Product added successfully!");
// //         setTimeout(() => {
// //           navigate("/admin/products");
// //         }, 1500);
// //       } else {
// //         toast.error(data.message || "Failed to add product");
// //       }
// //     } catch (err) {
// //       console.error(err);
// //       toast.error("Server error. Please try again.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const containerVariants = {
// //     hidden: { opacity: 0 },
// //     visible: {
// //       opacity: 1,
// //       transition: {
// //         staggerChildren: 0.1,
// //       },
// //     },
// //   };

// //   const itemVariants = {
// //     hidden: { opacity: 0, y: 20 },
// //     visible: {
// //       opacity: 1,
// //       y: 0,
// //       transition: {
// //         type: "spring",
// //         stiffness: 100,
// //       },
// //     },
// //   };

// //   return (
// //     <motion.div
// //       initial={{ opacity: 0 }}
// //       animate={{ opacity: 1 }}
// //       transition={{ duration: 0.5 }}
// //       className="min-h-screen bg-gradient-to-br from-emerald-50/30 via-white to-teal-50/20 dark:from-slate-950/95 dark:via-slate-900 dark:to-slate-950/95 py-12"
// //     >
// //       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
// //         {/* Header */}
// //         <div className="mb-8">
// //           <motion.button
// //             initial={{ opacity: 0, x: -20 }}
// //             animate={{ opacity: 1, x: 0 }}
// //             onClick={() => navigate("/admin/products")}
// //             className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 hover:from-emerald-500/20 hover:to-emerald-600/20 text-emerald-700 dark:text-emerald-300 font-medium border border-emerald-500/30 transition-all duration-300 mb-6"
// //           >
// //             <FaArrowLeft />
// //             Back to Products
// //           </motion.button>

// //           <div className="text-center mb-8">
// //             <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 dark:border-emerald-500/30 backdrop-blur-sm mb-4">
// //               <IoSparkles className="text-emerald-600 dark:text-emerald-400" />
// //               <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
// //                 Admin Panel
// //               </span>
// //             </div>
// //             <h1 className="text-4xl font-bold mb-4">
// //               <span className="text-slate-800 dark:text-white">Add New</span>
// //               <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent ml-3">
// //                 Product
// //               </span>
// //             </h1>
// //             <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
// //               Create a new product with detailed information and beautiful
// //               description
// //             </p>
// //           </div>
// //         </div>

// //         <motion.form
// //           variants={containerVariants}
// //           initial="hidden"
// //           animate="visible"
// //           onSubmit={handleSubmit}
// //           className="grid lg:grid-cols-3 gap-8"
// //         >
// //           {/* Left Column - Basic Information */}
// //           <div className="lg:col-span-2 space-y-8">
// //             {/* Basic Info Card */}
// //             <motion.div
// //               variants={itemVariants}
// //               className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/50 shadow-xl"
// //             >
// //               <div className="flex items-center gap-3 mb-6">
// //                 <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10">
// //                   <FaInfoCircle className="text-emerald-600 dark:text-emerald-400 text-xl" />
// //                 </div>
// //                 <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
// //                   Basic Information
// //                 </h2>
// //               </div>

// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                 <div className="space-y-2">
// //                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
// //                     Product Name *
// //                   </label>
// //                   <input
// //                     type="text"
// //                     value={formData.name}
// //                     onChange={(e) =>
// //                       setFormData({ ...formData, name: e.target.value })
// //                     }
// //                     placeholder="Enter product name"
// //                     className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 text-slate-800 dark:text-white placeholder-slate-400"
// //                     required
// //                   />
// //                 </div>

// //                 <div className="space-y-2">
// //                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
// //                     Price ($) *
// //                   </label>
// //                   <input
// //                     type="number"
// //                     step="0.01"
// //                     min="0"
// //                     value={formData.price}
// //                     onChange={(e) =>
// //                       setFormData({ ...formData, price: e.target.value })
// //                     }
// //                     placeholder="0.00"
// //                     className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 text-slate-800 dark:text-white placeholder-slate-400"
// //                     required
// //                   />
// //                 </div>

// //                 <div className="space-y-2">
// //                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
// //                     Stock Quantity
// //                   </label>
// //                   <input
// //                     type="number"
// //                     min="0"
// //                     value={formData.stock}
// //                     onChange={(e) =>
// //                       setFormData({ ...formData, stock: e.target.value })
// //                     }
// //                     placeholder="Available units"
// //                     className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 text-slate-800 dark:text-white placeholder-slate-400"
// //                   />
// //                 </div>

// //                 <div className="space-y-2">
// //                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
// //                     Category *
// //                   </label>
// //                   <select
// //                     value={formData.category}
// //                     onChange={(e) =>
// //                       setFormData({ ...formData, category: e.target.value })
// //                     }
// //                     className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 text-slate-800 dark:text-white appearance-none"
// //                     required
// //                   >
// //                     <option value="">Select a category</option>
// //                     {categories.map((cat) => (
// //                       <option key={cat._id} value={cat._id}>
// //                         {cat.name}
// //                       </option>
// //                     ))}
// //                   </select>
// //                 </div>
// //               </div>

// //               <div className="mt-6">
// //                 <label className="flex items-center gap-3 cursor-pointer">
// //                   <div className="relative">
// //                     <input
// //                       type="checkbox"
// //                       checked={formData.isSold}
// //                       onChange={(e) =>
// //                         setFormData({ ...formData, isSold: e.target.checked })
// //                       }
// //                       className="sr-only"
// //                     />
// //                     <div
// //                       className={`w-12 h-6 rounded-full transition-all duration-300 ${formData.isSold ? "bg-red-500" : "bg-slate-300 dark:bg-slate-600"}`}
// //                     >
// //                       <div
// //                         className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${formData.isSold ? "left-7" : "left-1"}`}
// //                       />
// //                     </div>
// //                   </div>
// //                   <span className="text-slate-700 dark:text-slate-300 font-medium">
// //                     Mark as Sold Out
// //                   </span>
// //                 </label>
// //                 <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 ml-14">
// //                   When enabled, customers won't be able to purchase this product
// //                 </p>
// //               </div>
// //             </motion.div>

// //             {/* Description Card */}
// //             <motion.div
// //               variants={itemVariants}
// //               className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/50 shadow-xl"
// //             >
// //               <div className="flex items-center gap-3 mb-6">
// //                 <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
// //                   <FaTag className="text-blue-600 dark:text-blue-400 text-xl" />
// //                 </div>
// //                 <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
// //                   Product Description
// //                 </h2>
// //               </div>

// //               <div className="space-y-6">
// //                 <div>
// //                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
// //                     Introduction *
// //                   </label>
// //                   <textarea
// //                     value={formData.description.intro}
// //                     onChange={(e) =>
// //                       setFormData({
// //                         ...formData,
// //                         description: {
// //                           ...formData.description,
// //                           intro: e.target.value,
// //                         },
// //                       })
// //                     }
// //                     placeholder="Write a compelling introduction about your product..."
// //                     rows="4"
// //                     className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 text-slate-800 dark:text-white placeholder-slate-400 resize-none"
// //                     required
// //                   />
// //                 </div>

// //                 {/* Key Features */}
// //                 <div>
// //                   <div className="flex items-center justify-between mb-2">
// //                     <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
// //                       Key Features
// //                     </label>
// //                     <span className="text-xs text-slate-500">
// //                       {formData.description.keyFeatures.length} added
// //                     </span>
// //                   </div>
// //                   <div className="flex gap-2 mb-3">
// //                     <input
// //                       type="text"
// //                       value={featureInput}
// //                       onChange={(e) => setFeatureInput(e.target.value)}
// //                       onKeyPress={(e) =>
// //                         e.key === "Enter" && (e.preventDefault(), addFeature())
// //                       }
// //                       placeholder="Add a key feature..."
// //                       className="flex-1 px-4 py-2 rounded-lg bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 text-slate-800 dark:text-white"
// //                     />
// //                     <motion.button
// //                       type="button"
// //                       whileHover={{ scale: 1.05 }}
// //                       whileTap={{ scale: 0.95 }}
// //                       onClick={addFeature}
// //                       className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 flex items-center gap-2"
// //                     >
// //                       <FaPlus />
// //                       Add
// //                     </motion.button>
// //                   </div>

// //                   {/* Features List */}
// //                   <div className="space-y-2">
// //                     {formData.description.keyFeatures.map((feature, index) => (
// //                       <motion.div
// //                         key={index}
// //                         initial={{ opacity: 0, x: -10 }}
// //                         animate={{ opacity: 1, x: 0 }}
// //                         className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-emerald-500/5 to-teal-500/5 border border-emerald-500/10"
// //                       >
// //                         <div className="flex items-center gap-3">
// //                           <FaCheckCircle className="text-emerald-500" />
// //                           <span className="text-slate-700 dark:text-slate-300">
// //                             {feature}
// //                           </span>
// //                         </div>
// //                         <button
// //                           type="button"
// //                           onClick={() => removeFeature(index)}
// //                           className="text-red-500 hover:text-red-600 p-1"
// //                         >
// //                           <FaTimes />
// //                         </button>
// //                       </motion.div>
// //                     ))}
// //                   </div>
// //                 </div>

// //                 {/* Benefits */}
// //                 <div>
// //                   <div className="flex items-center justify-between mb-2">
// //                     <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
// //                       Benefits
// //                     </label>
// //                     <span className="text-xs text-slate-500">
// //                       {formData.description.benefits.length} added
// //                     </span>
// //                   </div>
// //                   <div className="flex gap-2 mb-3">
// //                     <input
// //                       type="text"
// //                       value={benefitInput}
// //                       onChange={(e) => setBenefitInput(e.target.value)}
// //                       onKeyPress={(e) =>
// //                         e.key === "Enter" && (e.preventDefault(), addBenefit())
// //                       }
// //                       placeholder="Add a benefit..."
// //                       className="flex-1 px-4 py-2 rounded-lg bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 text-slate-800 dark:text-white"
// //                     />
// //                     <motion.button
// //                       type="button"
// //                       whileHover={{ scale: 1.05 }}
// //                       whileTap={{ scale: 0.95 }}
// //                       onClick={addBenefit}
// //                       className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 flex items-center gap-2"
// //                     >
// //                       <FaPlus />
// //                       Add
// //                     </motion.button>
// //                   </div>

// //                   {/* Benefits List */}
// //                   <div className="space-y-2">
// //                     {formData.description.benefits.map((benefit, index) => (
// //                       <motion.div
// //                         key={index}
// //                         initial={{ opacity: 0, x: -10 }}
// //                         animate={{ opacity: 1, x: 0 }}
// //                         className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-green-500/5 to-emerald-500/5 border border-green-500/10"
// //                       >
// //                         <div className="flex items-center gap-3">
// //                           <FaLeaf className="text-green-500" />
// //                           <span className="text-slate-700 dark:text-slate-300">
// //                             {benefit}
// //                           </span>
// //                         </div>
// //                         <button
// //                           type="button"
// //                           onClick={() => removeBenefit(index)}
// //                           className="text-red-500 hover:text-red-600 p-1"
// //                         >
// //                           <FaTimes />
// //                         </button>
// //                       </motion.div>
// //                     ))}
// //                   </div>
// //                 </div>

// //                 {/* Ingredients & Usage */}
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                   <div>
// //                     <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
// //                       Ingredients
// //                     </label>
// //                     <textarea
// //                       value={formData.description.ingredients}
// //                       onChange={(e) =>
// //                         setFormData({
// //                           ...formData,
// //                           description: {
// //                             ...formData.description,
// //                             ingredients: e.target.value,
// //                           },
// //                         })
// //                       }
// //                       placeholder="List the ingredients..."
// //                       rows="3"
// //                       className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 text-slate-800 dark:text-white placeholder-slate-400 resize-none"
// //                     />
// //                   </div>

// //                   <div>
// //                     <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
// //                       How to Use
// //                     </label>
// //                     <textarea
// //                       value={formData.description.howToUse}
// //                       onChange={(e) =>
// //                         setFormData({
// //                           ...formData,
// //                           description: {
// //                             ...formData.description,
// //                             howToUse: e.target.value,
// //                           },
// //                         })
// //                       }
// //                       placeholder="Instructions for use..."
// //                       rows="3"
// //                       className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 text-slate-800 dark:text-white placeholder-slate-400 resize-none"
// //                     />
// //                   </div>
// //                 </div>

// //                 <div>
// //                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
// //                     Storage Instructions
// //                   </label>
// //                   <input
// //                     type="text"
// //                     value={formData.description.storage}
// //                     onChange={(e) =>
// //                       setFormData({
// //                         ...formData,
// //                         description: {
// //                           ...formData.description,
// //                           storage: e.target.value,
// //                         },
// //                       })
// //                     }
// //                     placeholder="e.g., Store in a cool, dry place"
// //                     className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 text-slate-800 dark:text-white placeholder-slate-400"
// //                   />
// //                 </div>
// //               </div>
// //             </motion.div>
// //           </div>

// //           {/* Right Column - Image & Submit */}
// //           <div className="space-y-8">
// //             {/* Image Upload Card */}
// //             <motion.div
// //               variants={itemVariants}
// //               className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/50 shadow-xl"
// //             >
// //               <div className="flex items-center gap-3 mb-6">
// //                 <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10">
// //                   <FaImage className="text-purple-600 dark:text-purple-400 text-xl" />
// //                 </div>
// //                 <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
// //                   Product Image
// //                 </h2>
// //               </div>

// //               <div className="space-y-6">
// //                 {/* Image Preview */}
// //                 <div className="relative">
// //                   <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-600">
// //                     {imagePreview ? (
// //                       <img
// //                         src={imagePreview}
// //                         alt="Preview"
// //                         className="w-full h-full object-cover"
// //                       />
// //                     ) : (
// //                       <div className="w-full h-full flex flex-col items-center justify-center p-8">
// //                         <FaUpload className="text-4xl text-slate-400 dark:text-slate-500 mb-4" />
// //                         <p className="text-slate-500 dark:text-slate-400 text-center">
// //                           Upload product image
// //                         </p>
// //                         <p className="text-sm text-slate-400 dark:text-slate-500 mt-2">
// //                           Recommended: 800x800px
// //                         </p>
// //                       </div>
// //                     )}
// //                   </div>

// //                   {imagePreview && (
// //                     <button
// //                       type="button"
// //                       onClick={() => {
// //                         setImagePreview(null);
// //                         setFormData({ ...formData, image: null });
// //                       }}
// //                       className="absolute top-3 right-3 w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
// //                     >
// //                       <FaTimes />
// //                     </button>
// //                   )}
// //                 </div>

// //                 {/* Upload Button */}
// //                 <div>
// //                   <input
// //                     type="file"
// //                     id="image-upload"
// //                     accept="image/*"
// //                     onChange={handleImageChange}
// //                     className="hidden"
// //                   />
// //                   <motion.label
// //                     htmlFor="image-upload"
// //                     whileHover={{ scale: 1.02 }}
// //                     whileTap={{ scale: 0.98 }}
// //                     className="block w-full px-6 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium text-center cursor-pointer shadow-lg hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300"
// //                   >
// //                     <div className="flex items-center justify-center gap-3">
// //                       <FaUpload />
// //                       {formData.image ? "Change Image" : "Upload Image"}
// //                     </div>
// //                   </motion.label>
// //                   <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-3">
// //                     Supports JPG, PNG, WebP • Max 5MB
// //                   </p>
// //                 </div>
// //               </div>
// //             </motion.div>

// //             {/* Stats & Info Card */}
// //             <motion.div
// //               variants={itemVariants}
// //               className="bg-gradient-to-br from-emerald-500/5 to-teal-500/5 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20"
// //             >
// //               <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
// //                 <FaInfoCircle className="text-emerald-500" />
// //                 Description Preview
// //               </h3>

// //               <div className="space-y-4">
// //                 <div className="flex items-center gap-3 text-sm">
// //                   <FaCheckCircle className="text-emerald-500" />
// //                   <span className="text-slate-600 dark:text-slate-300">
// //                     {formData.description.intro ? "Intro added" : "No intro"}
// //                   </span>
// //                 </div>

// //                 <div className="flex items-center gap-3 text-sm">
// //                   <FaStar className="text-amber-500" />
// //                   <span className="text-slate-600 dark:text-slate-300">
// //                     {formData.description.keyFeatures.length} key features
// //                   </span>
// //                 </div>

// //                 <div className="flex items-center gap-3 text-sm">
// //                   <FaLeaf className="text-green-500" />
// //                   <span className="text-slate-600 dark:text-slate-300">
// //                     {formData.description.benefits.length} benefits
// //                   </span>
// //                 </div>

// //                 <div className="flex items-center gap-3 text-sm">
// //                   <FaFlask className="text-blue-500" />
// //                   <span className="text-slate-600 dark:text-slate-300">
// //                     {formData.description.ingredients
// //                       ? "Ingredients added"
// //                       : "No ingredients"}
// //                   </span>
// //                 </div>
// //               </div>
// //             </motion.div>

// //             {/* Quick Tips */}
// //             <motion.div
// //               variants={itemVariants}
// //               className="bg-gradient-to-br from-blue-500/5 to-cyan-500/5 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20"
// //             >
// //               <div className="flex items-start gap-4">
// //                 <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
// //                   <FaShoppingBag className="text-white text-xl" />
// //                 </div>
// //                 <div>
// //                   <h3 className="font-bold text-slate-800 dark:text-white mb-2">
// //                     Pro Tips
// //                   </h3>
// //                   <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
// //                     <li className="flex items-start gap-2">
// //                       <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5" />
// //                       Use descriptive, compelling product names
// //                     </li>
// //                     <li className="flex items-start gap-2">
// //                       <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5" />
// //                       Add at least 3-5 key features
// //                     </li>
// //                     <li className="flex items-start gap-2">
// //                       <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5" />
// //                       High-quality images increase conversions
// //                     </li>
// //                   </ul>
// //                 </div>
// //               </div>
// //             </motion.div>

// //             {/* Submit Button */}
// //             <motion.div variants={itemVariants}>
// //               <motion.button
// //                 type="submit"
// //                 disabled={loading}
// //                 whileHover={{ scale: loading ? 1 : 1.02 }}
// //                 whileTap={{ scale: loading ? 1 : 0.98 }}
// //                 className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
// //                   loading
// //                     ? "bg-gradient-to-r from-emerald-500/50 to-teal-500/50 cursor-not-allowed"
// //                     : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg hover:shadow-2xl hover:shadow-emerald-500/30"
// //                 } text-white flex items-center justify-center gap-3`}
// //               >
// //                 {loading ? (
// //                   <>
// //                     <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
// //                     Creating Product...
// //                   </>
// //                 ) : (
// //                   <>
// //                     <IoSparkles />
// //                     Create Product
// //                     <FaCheckCircle />
// //                   </>
// //                 )}
// //               </motion.button>

// //               <p className="text-sm text-slate-500 dark:text-slate-400 text-center mt-4">
// //                 Fields marked with * are required
// //               </p>
// //             </motion.div>
// //           </div>
// //         </motion.form>
// //       </div>
// //     </motion.div>
// //   );
// // };

// // export default AdminAddProduct;
// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { fetchWithAuth } from "../utils/auth";
// import {
//   FaUpload,
//   FaImage,
//   FaInfoCircle,
//   FaTag,
//   FaBox,
//   FaLayerGroup,
//   FaCheckCircle,
//   FaLeaf,
//   FaFlask,
//   FaBoxOpen,
//   FaCalendarAlt,
//   FaShoppingBag,
//   FaArrowLeft,
//   FaPlus,
//   FaTimes,
//   FaStar,
// } from "react-icons/fa";
// import { IoSparkles } from "react-icons/io5";
// import toast from "react-hot-toast";

// const BACKEND_URL = import.meta.env.VITE_API_URL;

// const AdminAddProduct = () => {
//   const navigate = useNavigate();
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [imagePreview, setImagePreview] = useState(null);

//   // Initialize form data
//   const [formData, setFormData] = useState({
//     name: "",
//     price: "",
//     stock: "",
//     category: "",
//     isSold: false,
//     image: null,
//     description: {
//       intro: "",
//       keyFeatures: [],
//       benefits: [],
//       ingredients: [],
//       howToUse: [],
//       storage: [],
//     },
//   });

//   const [featureInput, setFeatureInput] = useState("");
//   const [benefitInput, setBenefitInput] = useState("");
//   const [ingredientInput, setIngredientInput] = useState("");
//   const [usageInput, setUsageInput] = useState("");
//   const [storageInput, setStorageInput] = useState("");

//   // Suggestions for easier input
//   const featureSuggestions = [
//     "100% Natural Ingredients",
//     "Cruelty-Free Formula",
//     "Dermatologist Tested",
//     "Hypoallergenic",
//     "Vegan Formula",
//     "Alcohol-Free",
//     "Non-Comedogenic",
//     "Paraben-Free",
//   ];

//   const benefitSuggestions = [
//     "Hydrates and Nourishes Skin",
//     "Reduces Fine Lines and Wrinkles",
//     "Brightens Complexion",
//     "Minimizes Pores",
//     "Controls Excess Oil",
//     "Soothes Irritation",
//     "Improves Skin Texture",
//     "Protects from Environmental Damage",
//   ];

//   // Load categories on component mount
//   useEffect(() => {
//     const loadCategories = async () => {
//       try {
//         const res = await fetchWithAuth(`${BACKEND_URL}/api/categories`);
//         const data = await res.json();
//         setCategories(data.categories || data || []);
//       } catch (err) {
//         console.error("Failed to load categories:", err);
//         toast.error("Failed to load categories");
//       }
//     };
//     loadCategories();
//   }, []);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Validate file type
//       if (!file.type.startsWith("image/")) {
//         toast.error("Please upload an image file");
//         return;
//       }

//       // Validate file size (5MB max)
//       if (file.size > 5 * 1024 * 1024) {
//         toast.error("Image size should be less than 5MB");
//         return;
//       }

//       setFormData({ ...formData, image: file });

//       // Create preview URL
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Add new feature
//   const addFeature = () => {
//     if (featureInput.trim()) {
//       setFormData({
//         ...formData,
//         description: {
//           ...formData.description,
//           keyFeatures: [
//             ...formData.description.keyFeatures,
//             featureInput.trim(),
//           ],
//         },
//       });
//       setFeatureInput("");
//       toast.success("Feature added!");
//     }
//   };

//   // Remove feature
//   const removeFeature = (index) => {
//     const newFeatures = formData.description.keyFeatures.filter(
//       (_, i) => i !== index
//     );
//     setFormData({
//       ...formData,
//       description: {
//         ...formData.description,
//         keyFeatures: newFeatures,
//       },
//     });
//   };

//   // Add new benefit
//   const addBenefit = () => {
//     if (benefitInput.trim()) {
//       setFormData({
//         ...formData,
//         description: {
//           ...formData.description,
//           benefits: [...formData.description.benefits, benefitInput.trim()],
//         },
//       });
//       setBenefitInput("");
//       toast.success("Benefit added!");
//     }
//   };

//   // Remove benefit
//   const removeBenefit = (index) => {
//     const newBenefits = formData.description.benefits.filter(
//       (_, i) => i !== index
//     );
//     setFormData({
//       ...formData,
//       description: {
//         ...formData.description,
//         benefits: newBenefits,
//       },
//     });
//   };

//   // Add ingredient
//   const addIngredient = () => {
//     if (ingredientInput.trim()) {
//       setFormData({
//         ...formData,
//         description: {
//           ...formData.description,
//           ingredients: [
//             ...formData.description.ingredients,
//             ingredientInput.trim(),
//           ],
//         },
//       });
//       setIngredientInput("");
//       toast.success("Ingredient added!");
//     }
//   };

//   // Remove ingredient
//   const removeIngredient = (index) => {
//     const newIngredients = formData.description.ingredients.filter(
//       (_, i) => i !== index
//     );
//     setFormData({
//       ...formData,
//       description: {
//         ...formData.description,
//         ingredients: newIngredients,
//       },
//     });
//   };

//   // Add usage step
//   const addUsage = () => {
//     if (usageInput.trim()) {
//       setFormData({
//         ...formData,
//         description: {
//           ...formData.description,
//           howToUse: [...formData.description.howToUse, usageInput.trim()],
//         },
//       });
//       setUsageInput("");
//       toast.success("Usage step added!");
//     }
//   };

//   // Remove usage step
//   const removeUsage = (index) => {
//     const newUsage = formData.description.howToUse.filter(
//       (_, i) => i !== index
//     );
//     setFormData({
//       ...formData,
//       description: {
//         ...formData.description,
//         howToUse: newUsage,
//       },
//     });
//   };

//   // Add storage tip
//   const addStorage = () => {
//     if (storageInput.trim()) {
//       setFormData({
//         ...formData,
//         description: {
//           ...formData.description,
//           storage: [...formData.description.storage, storageInput.trim()],
//         },
//       });
//       setStorageInput("");
//       toast.success("Storage tip added!");
//     }
//   };

//   // Remove storage tip
//   const removeStorage = (index) => {
//     const newStorage = formData.description.storage.filter(
//       (_, i) => i !== index
//     );
//     setFormData({
//       ...formData,
//       description: {
//         ...formData.description,
//         storage: newStorage,
//       },
//     });
//   };

//   // Add suggestion from quick suggestions
//   const addSuggestion = (type, suggestion) => {
//     switch (type) {
//       case "feature":
//         setFormData({
//           ...formData,
//           description: {
//             ...formData.description,
//             keyFeatures: [...formData.description.keyFeatures, suggestion],
//           },
//         });
//         toast.success("Feature suggestion added!");
//         break;
//       case "benefit":
//         setFormData({
//           ...formData,
//           description: {
//             ...formData.description,
//             benefits: [...formData.description.benefits, suggestion],
//           },
//         });
//         toast.success("Benefit suggestion added!");
//         break;
//       default:
//         break;
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     // Validate required fields
//     if (!formData.name.trim()) {
//       toast.error("Product name is required");
//       setLoading(false);
//       return;
//     }

//     if (!formData.price || parseFloat(formData.price) <= 0) {
//       toast.error("Valid price is required");
//       setLoading(false);
//       return;
//     }

//     if (!formData.category) {
//       toast.error("Category is required");
//       setLoading(false);
//       return;
//     }

//     try {
//       const fd = new FormData();

//       // Add basic fields
//       fd.append("name", formData.name.trim());
//       fd.append("price", parseFloat(formData.price));
//       fd.append("stock", parseInt(formData.stock) || 0);
//       fd.append("category", formData.category);
//       fd.append("isSold", formData.isSold);

//       // Convert arrays to comma-separated strings for the backend
//       const descriptionToSend = {
//         intro: formData.description.intro || "",
//         keyFeatures: formData.description.keyFeatures,
//         benefits: formData.description.benefits,
//         ingredients: formData.description.ingredients.join(", "),
//         howToUse: formData.description.howToUse.join(". "),
//         storage: formData.description.storage.join(", "),
//       };

//       fd.append("description", JSON.stringify(descriptionToSend));
//       fd.append("relatedProducts", JSON.stringify([]));

//       // Add image if exists
//       if (formData.image) {
//         fd.append("image", formData.image);
//       }

//       console.log("Sending form data...");

//       const res = await fetchWithAuth(`${BACKEND_URL}/api/products`, {
//         method: "POST",
//         body: fd,
//       });

//       const data = await res.json();
//       console.log("Response:", data);

//       if (res.ok && data.success) {
//         toast.success("✨ Product added successfully!");
//         setTimeout(() => {
//           navigate("/admin/products");
//         }, 1500);
//       } else {
//         toast.error(data.message || "Failed to add product");
//       }
//     } catch (err) {
//       console.error("Error submitting form:", err);
//       toast.error("Server error. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//       },
//     },
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//       className="min-h-screen bg-gradient-to-br from-emerald-50/30 via-white to-teal-50/20 dark:from-slate-950/95 dark:via-slate-900 dark:to-slate-950/95 py-12"
//     >
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="mb-8">
//           <motion.button
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             onClick={() => navigate("/admin/products")}
//             className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 hover:from-emerald-500/20 hover:to-emerald-600/20 text-emerald-700 dark:text-emerald-300 font-medium border border-emerald-500/30 transition-all duration-300 mb-6"
//           >
//             <FaArrowLeft />
//             Back to Products
//           </motion.button>

//           <div className="text-center mb-8">
//             <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 dark:border-emerald-500/30 backdrop-blur-sm mb-4">
//               <IoSparkles className="text-emerald-600 dark:text-emerald-400" />
//               <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
//                 Admin Panel
//               </span>
//             </div>
//             <h1 className="text-4xl font-bold mb-4">
//               <span className="text-slate-800 dark:text-white">Add New</span>
//               <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent ml-3">
//                 Product
//               </span>
//             </h1>
//             <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
//               Create a new product with detailed information
//             </p>
//           </div>
//         </div>

//         <motion.form
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           onSubmit={handleSubmit}
//           className="grid lg:grid-cols-3 gap-8"
//         >
//           {/* Left Column - Basic Information */}
//           <div className="lg:col-span-2 space-y-8">
//             {/* Basic Info Card */}
//             <motion.div
//               variants={itemVariants}
//               className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/50 shadow-xl"
//             >
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10">
//                   <FaInfoCircle className="text-emerald-600 dark:text-emerald-400 text-xl" />
//                 </div>
//                 <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
//                   Basic Information
//                 </h2>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
//                     Product Name *
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.name}
//                     onChange={(e) =>
//                       setFormData({ ...formData, name: e.target.value })
//                     }
//                     placeholder="Enter product name"
//                     className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 text-slate-800 dark:text-white placeholder-slate-400"
//                     required
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
//                     Price ($) *
//                   </label>
//                   <input
//                     type="number"
//                     step="0.01"
//                     min="0"
//                     value={formData.price}
//                     onChange={(e) =>
//                       setFormData({ ...formData, price: e.target.value })
//                     }
//                     placeholder="0.00"
//                     className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 text-slate-800 dark:text-white placeholder-slate-400"
//                     required
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
//                     Stock Quantity
//                   </label>
//                   <input
//                     type="number"
//                     min="0"
//                     value={formData.stock}
//                     onChange={(e) =>
//                       setFormData({ ...formData, stock: e.target.value })
//                     }
//                     placeholder="Available units"
//                     className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 text-slate-800 dark:text-white placeholder-slate-400"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
//                     Category *
//                   </label>
//                   <select
//                     value={formData.category}
//                     onChange={(e) =>
//                       setFormData({ ...formData, category: e.target.value })
//                     }
//                     className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 text-slate-800 dark:text-white appearance-none"
//                     required
//                   >
//                     <option value="">Select a category</option>
//                     {categories.map((cat) => (
//                       <option key={cat._id} value={cat._id}>
//                         {cat.name}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               <div className="mt-6">
//                 <label className="flex items-center gap-3 cursor-pointer">
//                   <div className="relative">
//                     <input
//                       type="checkbox"
//                       checked={formData.isSold}
//                       onChange={(e) =>
//                         setFormData({ ...formData, isSold: e.target.checked })
//                       }
//                       className="sr-only"
//                     />
//                     <div
//                       className={`w-12 h-6 rounded-full transition-all duration-300 ${formData.isSold ? "bg-red-500" : "bg-slate-300 dark:bg-slate-600"}`}
//                     >
//                       <div
//                         className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${formData.isSold ? "left-7" : "left-1"}`}
//                       />
//                     </div>
//                   </div>
//                   <span className="text-slate-700 dark:text-slate-300 font-medium">
//                     Mark as Sold Out
//                   </span>
//                 </label>
//               </div>
//             </motion.div>

//             {/* Description Card */}
//             <motion.div
//               variants={itemVariants}
//               className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/50 shadow-xl"
//             >
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
//                   <FaTag className="text-blue-600 dark:text-blue-400 text-xl" />
//                 </div>
//                 <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
//                   Product Description
//                 </h2>
//               </div>

//               <div className="space-y-8">
//                 {/* Introduction */}
//                 <div>
//                   <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
//                     Introduction *
//                   </label>
//                   <textarea
//                     value={formData.description.intro}
//                     onChange={(e) =>
//                       setFormData({
//                         ...formData,
//                         description: {
//                           ...formData.description,
//                           intro: e.target.value,
//                         },
//                       })
//                     }
//                     placeholder="Describe your product in 2-3 sentences..."
//                     rows="4"
//                     className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 text-slate-800 dark:text-white placeholder-slate-400 resize-none leading-relaxed"
//                     required
//                   />
//                 </div>

//                 {/* Key Features */}
//                 <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 p-6 rounded-2xl border border-blue-200 dark:border-blue-800/30">
//                   <div className="flex items-center justify-between mb-4">
//                     <div>
//                       <label className="block text-lg font-semibold text-slate-800 dark:text-white mb-1 flex items-center gap-2">
//                         <FaStar className="text-blue-500" />
//                         Key Features
//                       </label>
//                       <p className="text-sm text-slate-600 dark:text-slate-400">
//                         Add what makes your product special
//                       </p>
//                     </div>
//                     <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
//                       {formData.description.keyFeatures.length} added
//                     </span>
//                   </div>

//                   {/* Features List */}
//                   <div className="mb-6">
//                     <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
//                       Features:
//                     </div>
//                     <div className="space-y-2">
//                       {formData.description.keyFeatures.length > 0 ? (
//                         formData.description.keyFeatures.map(
//                           (feature, index) => (
//                             <div key={index} className="group relative">
//                               <motion.div
//                                 initial={{ opacity: 0, x: -10 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                                 className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
//                               >
//                                 <div className="flex items-center gap-3">
//                                   <FaCheckCircle className="text-blue-500" />
//                                   <span className="text-slate-700 dark:text-slate-300">
//                                     {feature}
//                                   </span>
//                                 </div>
//                                 <button
//                                   type="button"
//                                   onClick={() => removeFeature(index)}
//                                   className="text-red-500 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
//                                 >
//                                   <FaTimes />
//                                 </button>
//                               </motion.div>
//                             </div>
//                           )
//                         )
//                       ) : (
//                         <div className="text-slate-500 dark:text-slate-400 text-sm italic p-3">
//                           No features added yet
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   {/* Add Feature Input */}
//                   <div className="space-y-4">
//                     <div className="flex gap-2">
//                       <input
//                         type="text"
//                         value={featureInput}
//                         onChange={(e) => setFeatureInput(e.target.value)}
//                         onKeyPress={(e) =>
//                           e.key === "Enter" &&
//                           (e.preventDefault(), addFeature())
//                         }
//                         placeholder="Type a feature and press Enter or click Add..."
//                         className="flex-1 px-4 py-3 rounded-xl bg-white/70 dark:bg-slate-700/70 border border-blue-300 dark:border-blue-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-slate-800 dark:text-white placeholder-slate-400"
//                       />
//                       <motion.button
//                         type="button"
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={addFeature}
//                         className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
//                       >
//                         <FaPlus />
//                         Add
//                       </motion.button>
//                     </div>

//                     {/* Feature Suggestions */}
//                     <div>
//                       <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
//                         Quick Suggestions:
//                       </div>
//                       <div className="flex flex-wrap gap-2">
//                         {featureSuggestions.map((suggestion, index) => (
//                           <motion.button
//                             key={index}
//                             type="button"
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             onClick={() => addSuggestion("feature", suggestion)}
//                             className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-800 text-sm text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200"
//                           >
//                             + {suggestion}
//                           </motion.button>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Benefits */}
//                 <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/10 dark:to-green-900/10 p-6 rounded-2xl border border-emerald-200 dark:border-emerald-800/30">
//                   <div className="flex items-center justify-between mb-4">
//                     <div>
//                       <label className="block text-lg font-semibold text-slate-800 dark:text-white mb-1 flex items-center gap-2">
//                         <FaLeaf className="text-emerald-500" />
//                         Benefits
//                       </label>
//                       <p className="text-sm text-slate-600 dark:text-slate-400">
//                         What customers will gain from using your product
//                       </p>
//                     </div>
//                     <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1 rounded-full">
//                       {formData.description.benefits.length} added
//                     </span>
//                   </div>

//                   {/* Benefits List */}
//                   <div className="mb-6">
//                     <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
//                       Benefits:
//                     </div>
//                     <div className="space-y-2">
//                       {formData.description.benefits.length > 0 ? (
//                         formData.description.benefits.map((benefit, index) => (
//                           <div key={index} className="group relative">
//                             <motion.div
//                               initial={{ opacity: 0, x: -10 }}
//                               animate={{ opacity: 1, x: 0 }}
//                               className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
//                             >
//                               <div className="flex items-center gap-3">
//                                 <FaCheckCircle className="text-emerald-500" />
//                                 <span className="text-slate-700 dark:text-slate-300">
//                                   {benefit}
//                                 </span>
//                               </div>
//                               <button
//                                 type="button"
//                                 onClick={() => removeBenefit(index)}
//                                 className="text-red-500 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
//                               >
//                                 <FaTimes />
//                               </button>
//                             </motion.div>
//                           </div>
//                         ))
//                       ) : (
//                         <div className="text-slate-500 dark:text-slate-400 text-sm italic p-3">
//                           No benefits added yet
//                         </div>
//                       )}
//                     </div>
//                   </div>

//                   {/* Add Benefit Input */}
//                   <div className="space-y-4">
//                     <div className="flex gap-2">
//                       <input
//                         type="text"
//                         value={benefitInput}
//                         onChange={(e) => setBenefitInput(e.target.value)}
//                         onKeyPress={(e) =>
//                           e.key === "Enter" &&
//                           (e.preventDefault(), addBenefit())
//                         }
//                         placeholder="Type a benefit and press Enter or click Add..."
//                         className="flex-1 px-4 py-3 rounded-xl bg-white/70 dark:bg-slate-700/70 border border-emerald-300 dark:border-emerald-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 text-slate-800 dark:text-white placeholder-slate-400"
//                       />
//                       <motion.button
//                         type="button"
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={addBenefit}
//                         className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 text-white font-medium hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 flex items-center gap-2 whitespace-nowrap"
//                       >
//                         <FaPlus />
//                         Add
//                       </motion.button>
//                     </div>

//                     {/* Benefit Suggestions */}
//                     <div>
//                       <div className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
//                         Quick Suggestions:
//                       </div>
//                       <div className="flex flex-wrap gap-2">
//                         {benefitSuggestions.map((suggestion, index) => (
//                           <motion.button
//                             key={index}
//                             type="button"
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             onClick={() => addSuggestion("benefit", suggestion)}
//                             className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-800 text-sm text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-200"
//                           >
//                             + {suggestion}
//                           </motion.button>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Ingredients, Usage, Storage in columns */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                   {/* Ingredients */}
//                   <div className="space-y-4">
//                     <label className="block text-lg font-semibold text-slate-800 dark:text-white mb-1 flex items-center gap-2">
//                       <FaFlask className="text-purple-500" />
//                       Ingredients
//                     </label>
//                     <div className="space-y-3">
//                       {formData.description.ingredients.map(
//                         (ingredient, index) => (
//                           <div key={index} className="group relative">
//                             <motion.div
//                               initial={{ opacity: 0, x: -10 }}
//                               animate={{ opacity: 1, x: 0 }}
//                               className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
//                             >
//                               <span className="text-slate-700 dark:text-slate-300 text-sm">
//                                 {ingredient}
//                               </span>
//                               <button
//                                 type="button"
//                                 onClick={() => removeIngredient(index)}
//                                 className="text-red-500 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
//                               >
//                                 <FaTimes className="text-xs" />
//                               </button>
//                             </motion.div>
//                           </div>
//                         )
//                       )}
//                     </div>
//                     <div className="flex gap-2">
//                       <input
//                         type="text"
//                         value={ingredientInput}
//                         onChange={(e) => setIngredientInput(e.target.value)}
//                         onKeyPress={(e) =>
//                           e.key === "Enter" &&
//                           (e.preventDefault(), addIngredient())
//                         }
//                         placeholder="Add ingredient..."
//                         className="flex-1 px-3 py-2 rounded-lg bg-white/70 dark:bg-slate-700/70 border border-slate-300 dark:border-slate-600 text-sm"
//                       />
//                       <button
//                         type="button"
//                         onClick={addIngredient}
//                         className="px-3 py-2 rounded-lg bg-purple-500 text-white hover:bg-purple-600"
//                       >
//                         <FaPlus />
//                       </button>
//                     </div>
//                   </div>

//                   {/* Usage */}
//                   <div className="space-y-4">
//                     <label className="block text-lg font-semibold text-slate-800 dark:text-white mb-1 flex items-center gap-2">
//                       <FaBoxOpen className="text-blue-500" />
//                       How to Use
//                     </label>
//                     <div className="space-y-3">
//                       {formData.description.howToUse.map((step, index) => (
//                         <div key={index} className="group relative">
//                           <motion.div
//                             initial={{ opacity: 0, x: -10 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
//                           >
//                             <div className="flex items-center gap-2">
//                               <span className="text-xs font-bold text-blue-500">
//                                 {index + 1}
//                               </span>
//                               <span className="text-slate-700 dark:text-slate-300 text-sm">
//                                 {step}
//                               </span>
//                             </div>
//                             <button
//                               type="button"
//                               onClick={() => removeUsage(index)}
//                               className="text-red-500 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
//                             >
//                               <FaTimes className="text-xs" />
//                             </button>
//                           </motion.div>
//                         </div>
//                       ))}
//                     </div>
//                     <div className="flex gap-2">
//                       <input
//                         type="text"
//                         value={usageInput}
//                         onChange={(e) => setUsageInput(e.target.value)}
//                         onKeyPress={(e) =>
//                           e.key === "Enter" && (e.preventDefault(), addUsage())
//                         }
//                         placeholder="Add usage step..."
//                         className="flex-1 px-3 py-2 rounded-lg bg-white/70 dark:bg-slate-700/70 border border-slate-300 dark:border-slate-600 text-sm"
//                       />
//                       <button
//                         type="button"
//                         onClick={addUsage}
//                         className="px-3 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
//                       >
//                         <FaPlus />
//                       </button>
//                     </div>
//                   </div>

//                   {/* Storage */}
//                   <div className="space-y-4">
//                     <label className="block text-lg font-semibold text-slate-800 dark:text-white mb-1 flex items-center gap-2">
//                       <FaCalendarAlt className="text-amber-500" />
//                       Storage
//                     </label>
//                     <div className="space-y-3">
//                       {formData.description.storage.map((tip, index) => (
//                         <div key={index} className="group relative">
//                           <motion.div
//                             initial={{ opacity: 0, x: -10 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
//                           >
//                             <span className="text-slate-700 dark:text-slate-300 text-sm">
//                               {tip}
//                             </span>
//                             <button
//                               type="button"
//                               onClick={() => removeStorage(index)}
//                               className="text-red-500 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
//                             >
//                               <FaTimes className="text-xs" />
//                             </button>
//                           </motion.div>
//                         </div>
//                       ))}
//                     </div>
//                     <div className="flex gap-2">
//                       <input
//                         type="text"
//                         value={storageInput}
//                         onChange={(e) => setStorageInput(e.target.value)}
//                         onKeyPress={(e) =>
//                           e.key === "Enter" &&
//                           (e.preventDefault(), addStorage())
//                         }
//                         placeholder="Add storage tip..."
//                         className="flex-1 px-3 py-2 rounded-lg bg-white/70 dark:bg-slate-700/70 border border-slate-300 dark:border-slate-600 text-sm"
//                       />
//                       <button
//                         type="button"
//                         onClick={addStorage}
//                         className="px-3 py-2 rounded-lg bg-amber-500 text-white hover:bg-amber-600"
//                       >
//                         <FaPlus />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>

//           {/* Right Column - Image & Submit */}
//           <div className="space-y-8">
//             {/* Image Upload Card */}
//             <motion.div
//               variants={itemVariants}
//               className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-slate-700/50 shadow-xl"
//             >
//               <div className="flex items-center gap-3 mb-6">
//                 <div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10">
//                   <FaImage className="text-purple-600 dark:text-purple-400 text-xl" />
//                 </div>
//                 <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
//                   Product Image
//                 </h2>
//               </div>

//               <div className="space-y-6">
//                 {/* Image Preview */}
//                 <div className="relative">
//                   <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-600">
//                     {imagePreview ? (
//                       <img
//                         src={imagePreview}
//                         alt="Preview"
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       <div className="w-full h-full flex flex-col items-center justify-center p-8">
//                         <FaUpload className="text-4xl text-slate-400 dark:text-slate-500 mb-4" />
//                         <p className="text-slate-500 dark:text-slate-400 text-center">
//                           Upload product image
//                         </p>
//                         <p className="text-sm text-slate-400 dark:text-slate-500 mt-2">
//                           Recommended: 800x800px
//                         </p>
//                       </div>
//                     )}
//                   </div>

//                   {imagePreview && (
//                     <button
//                       type="button"
//                       onClick={() => {
//                         setImagePreview(null);
//                         setFormData({ ...formData, image: null });
//                       }}
//                       className="absolute top-3 right-3 w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
//                     >
//                       <FaTimes />
//                     </button>
//                   )}
//                 </div>

//                 {/* Upload Button */}
//                 <div>
//                   <input
//                     type="file"
//                     id="image-upload"
//                     accept="image/*"
//                     onChange={handleImageChange}
//                     className="hidden"
//                   />
//                   <motion.label
//                     htmlFor="image-upload"
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.98 }}
//                     className="block w-full px-6 py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium text-center cursor-pointer shadow-lg hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300"
//                   >
//                     <div className="flex items-center justify-center gap-3">
//                       <FaUpload />
//                       {formData.image ? "Change Image" : "Upload Image"}
//                     </div>
//                   </motion.label>
//                   <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-3">
//                     Supports JPG, PNG, WebP • Max 5MB
//                   </p>
//                 </div>
//               </div>
//             </motion.div>

//             {/* Submit Button */}
//             <motion.div variants={itemVariants}>
//               <motion.button
//                 type="submit"
//                 disabled={loading}
//                 whileHover={{ scale: loading ? 1 : 1.02 }}
//                 whileTap={{ scale: loading ? 1 : 0.98 }}
//                 className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
//                   loading
//                     ? "bg-gradient-to-r from-emerald-500/50 to-teal-500/50 cursor-not-allowed"
//                     : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg hover:shadow-2xl hover:shadow-emerald-500/30"
//                 } text-white flex items-center justify-center gap-3`}
//               >
//                 {loading ? (
//                   <>
//                     <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
//                     Creating Product...
//                   </>
//                 ) : (
//                   <>
//                     <IoSparkles />
//                     Create Product
//                     <FaCheckCircle />
//                   </>
//                 )}
//               </motion.button>

//               <p className="text-sm text-slate-500 dark:text-slate-400 text-center mt-4">
//                 Fields marked with * are required
//               </p>
//             </motion.div>
//           </div>
//         </motion.form>
//       </div>
//     </motion.div>
//   );
// };

// export default AdminAddProduct;
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../utils/auth";
import {
  FaUpload,
  FaImage,
  FaInfoCircle,
  FaTag,
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
  FaLightbulb,
  FaEdit,
  FaTemperatureLow,
  FaVial,
} from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import toast from "react-hot-toast";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const AdminAddProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [featureInput, setFeatureInput] = useState("");
  const [benefitInput, setBenefitInput] = useState("");
  const [ingredientInput, setIngredientInput] = useState("");
  const [usageInput, setUsageInput] = useState("");
  const [storageInput, setStorageInput] = useState("");

  // Suggestion arrays
  const featureSuggestions = [
    "100% Natural Ingredients",
    "Cruelty-Free Formula",
    "Dermatologist Tested",
    "Hypoallergenic",
    "Vegan Formula",
    "Alcohol-Free",
    "Non-Comedogenic",
    "Paraben-Free",
  ];

  const benefitSuggestions = [
    "Hydrates and Nourishes Skin",
    "Reduces Fine Lines and Wrinkles",
    "Brightens Complexion",
    "Minimizes Pores",
    "Controls Excess Oil",
    "Soothes Irritation",
    "Improves Skin Texture",
    "Protects from Environmental Damage",
  ];

  const ingredientSuggestions = [
    "Hyaluronic Acid",
    "Vitamin C",
    "Niacinamide",
    "Retinol",
    "Salicylic Acid",
    "Ceramides",
    "Aloe Vera",
    "Green Tea Extract",
  ];

  const usageSuggestions = [
    "Apply to clean, dry skin",
    "Use morning and evening",
    "Massage gently until absorbed",
    "Follow with moisturizer",
    "Use sunscreen during daytime",
    "Apply a pea-sized amount",
  ];

  const storageSuggestions = [
    "Store in a cool, dry place",
    "Keep away from direct sunlight",
    "Keep tightly closed when not in use",
    "Store below 25°C (77°F)",
    "Do not freeze",
    "Keep out of reach of children",
  ];

  const initialFormData = {
    name: "",
    price: "",
    stock: "",
    category: "",
    isSold: false,
    image: null,
    description: {
      intro: "",
      keyFeatures: [],
      benefits: [],
      ingredients: [],
      howToUse: [],
      storage: [],
    },
  };

  const [formData, setFormData] = useState(initialFormData);

  // Load categories on component mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetchWithAuth(`${BACKEND_URL}/api/categories`);
        const data = await res.json();
        setCategories(data.categories || data || []);
      } catch (err) {
        console.error("Failed to load categories:", err);
        toast.error("Failed to load categories");
      }
    };
    loadCategories();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file");
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }

      setFormData({ ...formData, image: file });

      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add new feature
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

  // Remove feature
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
    toast.success("Feature removed!");
  };

  // Add new benefit
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

  // Remove benefit
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
    toast.success("Benefit removed!");
  };

  // Add ingredient
  const addIngredient = () => {
    if (ingredientInput.trim()) {
      setFormData({
        ...formData,
        description: {
          ...formData.description,
          ingredients: [
            ...formData.description.ingredients,
            ingredientInput.trim(),
          ],
        },
      });
      setIngredientInput("");
      toast.success("Ingredient added!");
    }
  };

  // Remove ingredient
  const removeIngredient = (index) => {
    const newIngredients = formData.description.ingredients.filter(
      (_, i) => i !== index
    );
    setFormData({
      ...formData,
      description: {
        ...formData.description,
        ingredients: newIngredients,
      },
    });
    toast.success("Ingredient removed!");
  };

  // Add usage step
  const addUsage = () => {
    if (usageInput.trim()) {
      setFormData({
        ...formData,
        description: {
          ...formData.description,
          howToUse: [...formData.description.howToUse, usageInput.trim()],
        },
      });
      setUsageInput("");
      toast.success("Usage step added!");
    }
  };

  // Remove usage step
  const removeUsage = (index) => {
    const newUsage = formData.description.howToUse.filter(
      (_, i) => i !== index
    );
    setFormData({
      ...formData,
      description: {
        ...formData.description,
        howToUse: newUsage,
      },
    });
    toast.success("Usage step removed!");
  };

  // Add storage tip
  const addStorage = () => {
    if (storageInput.trim()) {
      setFormData({
        ...formData,
        description: {
          ...formData.description,
          storage: [...formData.description.storage, storageInput.trim()],
        },
      });
      setStorageInput("");
      toast.success("Storage tip added!");
    }
  };

  // Remove storage tip
  const removeStorage = (index) => {
    const newStorage = formData.description.storage.filter(
      (_, i) => i !== index
    );
    setFormData({
      ...formData,
      description: {
        ...formData.description,
        storage: newStorage,
      },
    });
    toast.success("Storage tip removed!");
  };

  // Add suggestion from quick suggestions
  const addSuggestion = (type, suggestion) => {
    switch (type) {
      case "feature":
        setFormData({
          ...formData,
          description: {
            ...formData.description,
            keyFeatures: [...formData.description.keyFeatures, suggestion],
          },
        });
        toast.success("Feature suggestion added!");
        break;
      case "benefit":
        setFormData({
          ...formData,
          description: {
            ...formData.description,
            benefits: [...formData.description.benefits, suggestion],
          },
        });
        toast.success("Benefit suggestion added!");
        break;
      case "ingredient":
        setFormData({
          ...formData,
          description: {
            ...formData.description,
            ingredients: [...formData.description.ingredients, suggestion],
          },
        });
        toast.success("Ingredient suggestion added!");
        break;
      case "usage":
        setFormData({
          ...formData,
          description: {
            ...formData.description,
            howToUse: [...formData.description.howToUse, suggestion],
          },
        });
        toast.success("Usage suggestion added!");
        break;
      case "storage":
        setFormData({
          ...formData,
          description: {
            ...formData.description,
            storage: [...formData.description.storage, suggestion],
          },
        });
        toast.success("Storage suggestion added!");
        break;
      default:
        break;
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate required fields
    if (!formData.name.trim()) {
      toast.error("Product name is required");
      setLoading(false);
      return;
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      toast.error("Valid price is required");
      setLoading(false);
      return;
    }

    if (!formData.category) {
      toast.error("Category is required");
      setLoading(false);
      return;
    }

    if (!formData.description.intro.trim()) {
      toast.error("Product introduction is required");
      setLoading(false);
      return;
    }

    try {
      const fd = new FormData();

      // Add basic fields
      fd.append("name", formData.name.trim());
      fd.append("price", parseFloat(formData.price));
      fd.append("stock", parseInt(formData.stock) || 0);
      fd.append("category", formData.category);
      fd.append("isSold", formData.isSold);

      // Convert arrays to comma-separated strings for the backend
      const descriptionToSend = {
        intro: formData.description.intro || "",
        keyFeatures: formData.description.keyFeatures,
        benefits: formData.description.benefits,
        ingredients: formData.description.ingredients.join(", "),
        howToUse: formData.description.howToUse.join(". "),
        storage: formData.description.storage.join(", "),
      };

      fd.append("description", JSON.stringify(descriptionToSend));
      fd.append("relatedProducts", JSON.stringify([]));

      // Add image if exists
      if (formData.image) {
        fd.append("image", formData.image);
      }

      console.log("Creating product...");
      const res = await fetchWithAuth(`${BACKEND_URL}/api/products`, {
        method: "POST",
        body: fd,
      });

      const data = await res.json();
      console.log("Response:", data);

      if (res.ok && data.success) {
        toast.success("✨ Product added successfully!", {
          duration: 4000,
          icon: "✅",
          style: {
            background: "#10b981",
            color: "white",
          },
        });
        setTimeout(() => {
          navigate("/admin/products");
        }, 1500);
      } else {
        toast.error(data.message || "Failed to add product", {
          duration: 4000,
        });
      }
    } catch (err) {
      console.error("Error creating product:", err);
      toast.error("Server error. Please try again.", {
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
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
      className="min-h-screen bg-gradient-to-br from-emerald-50/30 via-white to-teal-50/20 dark:from-slate-950/95 dark:via-slate-900 dark:to-slate-950/95 py-6 md:py-12"
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate("/admin/products")}
            className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-xl bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 hover:from-emerald-500/20 hover:to-emerald-600/20 text-emerald-700 dark:text-emerald-300 font-medium border border-emerald-500/30 transition-all duration-300 mb-4 md:mb-6"
          >
            <FaArrowLeft />
            <span className="text-sm md:text-base">Back to Products</span>
          </motion.button>

          <div className="text-center mb-6 md:mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 dark:border-emerald-500/30 backdrop-blur-sm mb-4">
              <IoSparkles className="text-emerald-600 dark:text-emerald-400" />
              <span className="text-xs md:text-sm font-medium text-emerald-700 dark:text-emerald-300">
                Admin Panel
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
              <span className="text-slate-800 dark:text-white">Add New</span>
              <span className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 bg-clip-text text-transparent ml-2 md:ml-3">
                Product
              </span>
            </h1>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto px-4">
              Create a new product with detailed information
            </p>
          </div>
        </div>

        <motion.form
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onSubmit={handleSubmit}
          className="flex flex-col lg:grid lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
        >
          {/* Left Column - Basic Information */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6 lg:space-y-8">
            {/* Basic Info Card */}
            <motion.div
              variants={itemVariants}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/20 dark:border-slate-700/50 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="p-2 md:p-2.5 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10">
                  <FaInfoCircle className="text-emerald-600 dark:text-emerald-400 text-lg md:text-xl" />
                </div>
                <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-slate-800 dark:text-white">
                  Basic Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-2">
                  <label className="block text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Enter product name"
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 text-sm md:text-base text-slate-800 dark:text-white placeholder-slate-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300">
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
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 text-sm md:text-base text-slate-800 dark:text-white placeholder-slate-400"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300">
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
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 text-sm md:text-base text-slate-800 dark:text-white placeholder-slate-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 text-sm md:text-base text-slate-800 dark:text-white appearance-none"
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

              <div className="mt-4 md:mt-6">
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
                      className={`w-10 md:w-12 h-5 md:h-6 rounded-full transition-all duration-300 ${formData.isSold ? "bg-red-500" : "bg-slate-300 dark:bg-slate-600"}`}
                    >
                      <div
                        className={`absolute top-0.5 md:top-1 w-3 md:w-4 h-3 md:h-4 rounded-full bg-white transition-all duration-300 ${formData.isSold ? "left-5 md:left-7" : "left-0.5 md:left-1"}`}
                      />
                    </div>
                  </div>
                  <span className="text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300">
                    Mark as Sold Out
                  </span>
                </label>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 ml-10 md:ml-14">
                  When enabled, customers won't be able to purchase this product
                </p>
              </div>
            </motion.div>

            {/* Description Card */}
            <motion.div
              variants={itemVariants}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/20 dark:border-slate-700/50 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="p-2 md:p-2.5 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
                  <FaTag className="text-blue-600 dark:text-blue-400 text-lg md:text-xl" />
                </div>
                <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-slate-800 dark:text-white">
                  Product Description
                </h2>
              </div>

              <div className="space-y-6 md:space-y-8">
                {/* Introduction */}
                <div>
                  <label className="block text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 md:mb-3">
                    Introduction *
                    <span className="ml-1 md:ml-2 text-xs text-slate-500">
                      (Describe your product in 2-3 sentences)
                    </span>
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
                    placeholder="Example: Our premium facial serum is specially formulated to combat signs of aging while providing deep hydration. Perfect for all skin types, it delivers visible results within weeks..."
                    rows="3"
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 text-sm md:text-base text-slate-800 dark:text-white placeholder-slate-400 resize-none leading-relaxed"
                    required
                  />
                </div>

                {/* Key Features */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 p-4 md:p-6 rounded-xl md:rounded-2xl border border-blue-200 dark:border-blue-800/30">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-0 mb-4">
                    <div>
                      <label className="block text-base md:text-lg font-semibold text-slate-800 dark:text-white mb-1 flex items-center gap-2">
                        <FaStar className="text-blue-500" />
                        <span className="text-sm md:text-base">
                          Key Features
                        </span>
                      </label>
                      <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
                        Add what makes your product special
                      </p>
                    </div>
                    <span className="text-xs md:text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 md:px-3 py-1 rounded-full">
                      {formData.description.keyFeatures.length} added
                    </span>
                  </div>

                  {/* Features List Preview */}
                  <div className="mb-4 md:mb-6">
                    <div className="text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 md:mb-3">
                      Features Preview:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.description.keyFeatures.length > 0 ? (
                        formData.description.keyFeatures.map(
                          (feature, index) => (
                            <div key={index} className="group relative">
                              <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-1.5 md:py-2.5 rounded-full bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 border border-blue-200 dark:border-blue-800"
                              >
                                <FaCheckCircle className="text-blue-500 text-xs md:text-sm" />
                                <span className="text-xs md:text-sm text-slate-700 dark:text-slate-300 line-clamp-1 max-w-[150px] md:max-w-none">
                                  {feature}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => removeFeature(index)}
                                  className="ml-1 md:ml-2 text-red-500 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <FaTimes className="text-xs" />
                                </button>
                              </motion.div>
                            </div>
                          )
                        )
                      ) : (
                        <div className="text-xs md:text-sm text-slate-500 dark:text-slate-400 italic">
                          No features added yet
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Add Feature Input */}
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                      <input
                        type="text"
                        value={featureInput}
                        onChange={(e) => setFeatureInput(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" &&
                          (e.preventDefault(), addFeature())
                        }
                        placeholder="Type a feature and press Enter or click Add..."
                        className="flex-1 px-3 md:px-4 py-2.5 md:py-3 rounded-xl bg-white/70 dark:bg-slate-700/70 border border-blue-300 dark:border-blue-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-sm md:text-base text-slate-800 dark:text-white placeholder-slate-400"
                      />
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={addFeature}
                        className="px-4 md:px-6 py-2.5 md:py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap text-sm md:text-base"
                      >
                        <FaPlus />
                        <span className="hidden sm:inline">Add Feature</span>
                        <span className="sm:hidden">Add</span>
                      </motion.button>
                    </div>

                    {/* Feature Suggestions */}
                    <div>
                      <div className="text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                        <FaLightbulb className="text-amber-500" />
                        <span>Quick Suggestions:</span>
                      </div>
                      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {featureSuggestions.map((suggestion, index) => (
                          <motion.button
                            key={index}
                            type="button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => addSuggestion("feature", suggestion)}
                            className="px-2 md:px-3 py-1.5 md:py-2 rounded-lg bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-800 text-xs md:text-sm text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 text-left"
                          >
                            + {suggestion}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Benefits */}
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/10 dark:to-green-900/10 p-4 md:p-6 rounded-xl md:rounded-2xl border border-emerald-200 dark:border-emerald-800/30">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-0 mb-4">
                    <div>
                      <label className="block text-base md:text-lg font-semibold text-slate-800 dark:text-white mb-1 flex items-center gap-2">
                        <FaLeaf className="text-emerald-500" />
                        <span className="text-sm md:text-base">Benefits</span>
                      </label>
                      <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
                        What customers will gain from using your product
                      </p>
                    </div>
                    <span className="text-xs md:text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 px-2 md:px-3 py-1 rounded-full">
                      {formData.description.benefits.length} added
                    </span>
                  </div>

                  {/* Benefits List Preview */}
                  <div className="mb-4 md:mb-6">
                    <div className="text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 md:mb-3">
                      Benefits Preview:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.description.benefits.length > 0 ? (
                        formData.description.benefits.map((benefit, index) => (
                          <div key={index} className="group relative">
                            <motion.div
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-1.5 md:py-2.5 rounded-full bg-gradient-to-r from-emerald-100 to-green-100 dark:from-emerald-900/30 dark:to-green-900/30 border border-emerald-200 dark:border-emerald-800"
                            >
                              <FaCheckCircle className="text-emerald-500 text-xs md:text-sm" />
                              <span className="text-xs md:text-sm text-slate-700 dark:text-slate-300 line-clamp-1 max-w-[150px] md:max-w-none">
                                {benefit}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeBenefit(index)}
                                className="ml-1 md:ml-2 text-red-500 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <FaTimes className="text-xs" />
                              </button>
                            </motion.div>
                          </div>
                        ))
                      ) : (
                        <div className="text-xs md:text-sm text-slate-500 dark:text-slate-400 italic">
                          No benefits added yet
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Add Benefit Input */}
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                      <input
                        type="text"
                        value={benefitInput}
                        onChange={(e) => setBenefitInput(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" &&
                          (e.preventDefault(), addBenefit())
                        }
                        placeholder="Type a benefit and press Enter or click Add..."
                        className="flex-1 px-3 md:px-4 py-2.5 md:py-3 rounded-xl bg-white/70 dark:bg-slate-700/70 border border-emerald-300 dark:border-emerald-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 text-sm md:text-base text-slate-800 dark:text-white placeholder-slate-400"
                      />
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={addBenefit}
                        className="px-4 md:px-6 py-2.5 md:py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 text-white font-medium hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap text-sm md:text-base"
                      >
                        <FaPlus />
                        <span className="hidden sm:inline">Add Benefit</span>
                        <span className="sm:hidden">Add</span>
                      </motion.button>
                    </div>

                    {/* Benefit Suggestions */}
                    <div>
                      <div className="text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                        <FaLightbulb className="text-amber-500" />
                        <span>Quick Suggestions:</span>
                      </div>
                      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {benefitSuggestions.map((suggestion, index) => (
                          <motion.button
                            key={index}
                            type="button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => addSuggestion("benefit", suggestion)}
                            className="px-2 md:px-3 py-1.5 md:py-2 rounded-lg bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-800 text-xs md:text-sm text-slate-700 dark:text-slate-300 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all duration-200 text-left"
                          >
                            + {suggestion}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ingredients */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 p-4 md:p-6 rounded-xl md:rounded-2xl border border-purple-200 dark:border-purple-800/30">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-0 mb-4">
                    <div>
                      <label className="block text-base md:text-lg font-semibold text-slate-800 dark:text-white mb-1 flex items-center gap-2">
                        <FaFlask className="text-purple-500" />
                        <span className="text-sm md:text-base">
                          Ingredients
                        </span>
                      </label>
                      <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
                        List key active ingredients
                      </p>
                    </div>
                    <span className="text-xs md:text-sm font-medium text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 px-2 md:px-3 py-1 rounded-full">
                      {formData.description.ingredients.length} added
                    </span>
                  </div>

                  {/* Ingredients List Preview */}
                  <div className="mb-4 md:mb-6">
                    <div className="text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 md:mb-3">
                      Ingredients Preview:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.description.ingredients.length > 0 ? (
                        formData.description.ingredients.map(
                          (ingredient, index) => (
                            <div key={index} className="group relative">
                              <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-1.5 md:py-2.5 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 border border-purple-200 dark:border-purple-800"
                              >
                                <FaVial className="text-purple-500 text-xs md:text-sm" />
                                <span className="text-xs md:text-sm text-slate-700 dark:text-slate-300 line-clamp-1 max-w-[150px] md:max-w-none">
                                  {ingredient}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => removeIngredient(index)}
                                  className="ml-1 md:ml-2 text-red-500 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <FaTimes className="text-xs" />
                                </button>
                              </motion.div>
                            </div>
                          )
                        )
                      ) : (
                        <div className="text-xs md:text-sm text-slate-500 dark:text-slate-400 italic">
                          No ingredients added yet
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Add Ingredient Input */}
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                      <input
                        type="text"
                        value={ingredientInput}
                        onChange={(e) => setIngredientInput(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" &&
                          (e.preventDefault(), addIngredient())
                        }
                        placeholder="Type an ingredient and press Enter or click Add..."
                        className="flex-1 px-3 md:px-4 py-2.5 md:py-3 rounded-xl bg-white/70 dark:bg-slate-700/70 border border-purple-300 dark:border-purple-700 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 text-sm md:text-base text-slate-800 dark:text-white placeholder-slate-400"
                      />
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={addIngredient}
                        className="px-4 md:px-6 py-2.5 md:py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap text-sm md:text-base"
                      >
                        <FaPlus />
                        <span className="hidden sm:inline">Add Ingredient</span>
                        <span className="sm:hidden">Add</span>
                      </motion.button>
                    </div>

                    {/* Ingredient Suggestions */}
                    <div>
                      <div className="text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                        <FaLightbulb className="text-amber-500" />
                        <span>Quick Suggestions:</span>
                      </div>
                      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {ingredientSuggestions.map((suggestion, index) => (
                          <motion.button
                            key={index}
                            type="button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() =>
                              addSuggestion("ingredient", suggestion)
                            }
                            className="px-2 md:px-3 py-1.5 md:py-2 rounded-lg bg-white dark:bg-slate-800 border border-purple-200 dark:border-purple-800 text-xs md:text-sm text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-200 text-left"
                          >
                            + {suggestion}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* How to Use */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 p-4 md:p-6 rounded-xl md:rounded-2xl border border-blue-200 dark:border-blue-800/30">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-0 mb-4">
                    <div>
                      <label className="block text-base md:text-lg font-semibold text-slate-800 dark:text-white mb-1 flex items-center gap-2">
                        <FaBoxOpen className="text-blue-500" />
                        <span className="text-sm md:text-base">How to Use</span>
                      </label>
                      <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
                        Step-by-step instructions for best results
                      </p>
                    </div>
                    <span className="text-xs md:text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 md:px-3 py-1 rounded-full">
                      {formData.description.howToUse.length} steps
                    </span>
                  </div>

                  {/* Usage List Preview */}
                  <div className="mb-4 md:mb-6">
                    <div className="text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 md:mb-3">
                      Usage Steps Preview:
                    </div>
                    <div className="space-y-2 md:space-y-3">
                      {formData.description.howToUse.length > 0 ? (
                        formData.description.howToUse.map((step, index) => (
                          <div key={index} className="group relative">
                            <motion.div
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="flex items-start gap-2 md:gap-3 p-3 md:p-4 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800"
                            >
                              <div className="w-6 md:w-8 h-6 md:h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                                <span className="text-xs md:text-sm font-bold text-blue-600 dark:text-blue-400">
                                  {index + 1}
                                </span>
                              </div>
                              <div className="flex-1">
                                <span className="text-xs md:text-sm text-slate-700 dark:text-slate-300">
                                  {step}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeUsage(index)}
                                className="text-red-500 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                              >
                                <FaTimes className="text-sm" />
                              </button>
                            </motion.div>
                          </div>
                        ))
                      ) : (
                        <div className="text-xs md:text-sm text-slate-500 dark:text-slate-400 italic p-3 md:p-4">
                          No usage steps added yet
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Add Usage Input */}
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                      <input
                        type="text"
                        value={usageInput}
                        onChange={(e) => setUsageInput(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" && (e.preventDefault(), addUsage())
                        }
                        placeholder="Type a usage step and press Enter or click Add..."
                        className="flex-1 px-3 md:px-4 py-2.5 md:py-3 rounded-xl bg-white/70 dark:bg-slate-700/70 border border-blue-300 dark:border-blue-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-sm md:text-base text-slate-800 dark:text-white placeholder-slate-400"
                      />
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={addUsage}
                        className="px-4 md:px-6 py-2.5 md:py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap text-sm md:text-base"
                      >
                        <FaPlus />
                        <span className="hidden sm:inline">Add Step</span>
                        <span className="sm:hidden">Add</span>
                      </motion.button>
                    </div>

                    {/* Usage Suggestions */}
                    <div>
                      <div className="text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                        <FaLightbulb className="text-amber-500" />
                        <span>Quick Suggestions:</span>
                      </div>
                      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
                        {usageSuggestions.map((suggestion, index) => (
                          <motion.button
                            key={index}
                            type="button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => addSuggestion("usage", suggestion)}
                            className="px-2 md:px-3 py-1.5 md:py-2 rounded-lg bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-800 text-xs md:text-sm text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 text-left"
                          >
                            + {suggestion}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Storage Instructions */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 p-4 md:p-6 rounded-xl md:rounded-2xl border border-amber-200 dark:border-amber-800/30">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-0 mb-4">
                    <div>
                      <label className="block text-base md:text-lg font-semibold text-slate-800 dark:text-white mb-1 flex items-center gap-2">
                        <FaCalendarAlt className="text-amber-500" />
                        <span className="text-sm md:text-base">
                          Storage Instructions
                        </span>
                      </label>
                      <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
                        Proper storage guidelines for product longevity
                      </p>
                    </div>
                    <span className="text-xs md:text-sm font-medium text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30 px-2 md:px-3 py-1 rounded-full">
                      {formData.description.storage.length} tips
                    </span>
                  </div>

                  {/* Storage List Preview */}
                  <div className="mb-4 md:mb-6">
                    <div className="text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 md:mb-3">
                      Storage Tips Preview:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.description.storage.length > 0 ? (
                        formData.description.storage.map((tip, index) => (
                          <div key={index} className="group relative">
                            <motion.div
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-1.5 md:py-2.5 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 border border-amber-200 dark:border-amber-800"
                            >
                              <FaTemperatureLow className="text-amber-500 text-xs md:text-sm" />
                              <span className="text-xs md:text-sm text-slate-700 dark:text-slate-300 line-clamp-1 max-w-[150px] md:max-w-none">
                                {tip}
                              </span>
                              <button
                                type="button"
                                onClick={() => removeStorage(index)}
                                className="ml-1 md:ml-2 text-red-500 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <FaTimes className="text-xs" />
                              </button>
                            </motion.div>
                          </div>
                        ))
                      ) : (
                        <div className="text-xs md:text-sm text-slate-500 dark:text-slate-400 italic">
                          No storage tips added yet
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Add Storage Input */}
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                      <input
                        type="text"
                        value={storageInput}
                        onChange={(e) => setStorageInput(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === "Enter" &&
                          (e.preventDefault(), addStorage())
                        }
                        placeholder="Type a storage tip and press Enter or click Add..."
                        className="flex-1 px-3 md:px-4 py-2.5 md:py-3 rounded-xl bg-white/70 dark:bg-slate-700/70 border border-amber-300 dark:border-amber-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300 text-sm md:text-base text-slate-800 dark:text-white placeholder-slate-400"
                      />
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={addStorage}
                        className="px-4 md:px-6 py-2.5 md:py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap text-sm md:text-base"
                      >
                        <FaPlus />
                        <span className="hidden sm:inline">Add Tip</span>
                        <span className="sm:hidden">Add</span>
                      </motion.button>
                    </div>

                    {/* Storage Suggestions */}
                    <div>
                      <div className="text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
                        <FaLightbulb className="text-amber-500" />
                        <span>Quick Suggestions:</span>
                      </div>
                      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
                        {storageSuggestions.map((suggestion, index) => (
                          <motion.button
                            key={index}
                            type="button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => addSuggestion("storage", suggestion)}
                            className="px-2 md:px-3 py-1.5 md:py-2 rounded-lg bg-white dark:bg-slate-800 border border-amber-200 dark:border-amber-800 text-xs md:text-sm text-slate-700 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all duration-200 text-left"
                          >
                            + {suggestion}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Image & Submit */}
          <div className="space-y-4 md:space-y-6 lg:space-y-8">
            {/* Image Upload Card */}
            <motion.div
              variants={itemVariants}
              className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-xl md:rounded-2xl p-4 md:p-6 border border-white/20 dark:border-slate-700/50 shadow-lg order-first lg:order-none"
            >
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="p-2 md:p-2.5 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10">
                  <FaImage className="text-purple-600 dark:text-purple-400 text-lg md:text-xl" />
                </div>
                <h2 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white">
                  Product Image
                </h2>
              </div>

              <div className="space-y-4 md:space-y-6">
                {/* Image Preview */}
                <div className="relative">
                  <div className="aspect-square rounded-xl md:rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-600">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 md:p-8">
                        <FaUpload className="text-3xl md:text-4xl text-slate-400 dark:text-slate-500 mb-3 md:mb-4" />
                        <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 text-center">
                          Upload product image
                        </p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 md:mt-2">
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
                      className="absolute top-2 md:top-3 right-2 md:right-3 w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"
                      title="Remove image"
                    >
                      <FaTimes className="text-sm" />
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
                    className="block w-full px-4 md:px-6 py-3 md:py-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium text-center cursor-pointer shadow-lg hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 text-sm md:text-base"
                  >
                    <div className="flex items-center justify-center gap-2 md:gap-3">
                      <FaUpload />
                      {formData.image ? "Change Image" : "Upload Image"}
                    </div>
                  </motion.label>
                  <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-2 md:mt-3">
                    Supports JPG, PNG, WebP • Max 5MB
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Stats & Info Card */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-emerald-500/5 to-teal-500/5 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-emerald-500/20"
            >
              <h3 className="font-bold text-slate-800 dark:text-white mb-3 md:mb-4 flex items-center gap-2">
                <FaInfoCircle className="text-emerald-500" />
                <span className="text-sm md:text-base">
                  Description Summary
                </span>
              </h3>

              <div className="space-y-2 md:space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 md:gap-3">
                    <FaCheckCircle className="text-emerald-500 text-sm" />
                    <span className="text-xs md:text-sm text-slate-700 dark:text-slate-300">
                      Introduction
                    </span>
                  </div>
                  <span
                    className={`text-xs md:text-sm ${formData.description.intro ? "text-emerald-600" : "text-slate-400"}`}
                  >
                    {formData.description.intro ? "✓ Added" : "Required"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 md:gap-3">
                    <FaStar className="text-blue-500 text-sm" />
                    <span className="text-xs md:text-sm text-slate-700 dark:text-slate-300">
                      Key Features
                    </span>
                  </div>
                  <span className="text-xs md:text-sm text-blue-600">
                    {formData.description.keyFeatures.length} added
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 md:gap-3">
                    <FaLeaf className="text-emerald-500 text-sm" />
                    <span className="text-xs md:text-sm text-slate-700 dark:text-slate-300">
                      Benefits
                    </span>
                  </div>
                  <span className="text-xs md:text-sm text-emerald-600">
                    {formData.description.benefits.length} added
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 md:gap-3">
                    <FaFlask className="text-purple-500 text-sm" />
                    <span className="text-xs md:text-sm text-slate-700 dark:text-slate-300">
                      Ingredients
                    </span>
                  </div>
                  <span className="text-xs md:text-sm text-purple-600">
                    {formData.description.ingredients.length} added
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 md:gap-3">
                    <FaBoxOpen className="text-blue-500 text-sm" />
                    <span className="text-xs md:text-sm text-slate-700 dark:text-slate-300">
                      Usage Steps
                    </span>
                  </div>
                  <span className="text-xs md:text-sm text-blue-600">
                    {formData.description.howToUse.length} added
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 md:gap-3">
                    <FaCalendarAlt className="text-amber-500 text-sm" />
                    <span className="text-xs md:text-sm text-slate-700 dark:text-slate-300">
                      Storage Tips
                    </span>
                  </div>
                  <span className="text-xs md:text-sm text-amber-600">
                    {formData.description.storage.length} added
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Quick Tips */}
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-blue-500/5 to-cyan-500/5 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 border border-blue-500/20"
            >
              <div className="flex items-start gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                  <FaShoppingBag className="text-white text-lg md:text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 dark:text-white mb-2 text-sm md:text-base">
                    Pro Tips
                  </h3>
                  <ul className="text-xs md:text-sm text-slate-600 dark:text-slate-400 space-y-1 md:space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                      Use descriptive, compelling product names
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                      Add at least 3-5 key features
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                      High-quality images increase conversions
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={itemVariants} className="mt-4 md:mt-0">
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className={`w-full py-3 md:py-4 rounded-xl font-bold text-base md:text-lg transition-all duration-300 ${
                  loading
                    ? "bg-gradient-to-r from-emerald-500/50 to-teal-500/50 cursor-not-allowed"
                    : "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 shadow-lg hover:shadow-2xl hover:shadow-emerald-500/30"
                } text-white flex items-center justify-center gap-2 md:gap-3`}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 md:w-6 md:h-6 border-2 md:border-3 border-white/30 border-t-white rounded-full animate-spin" />
                    <span className="text-sm md:text-base">
                      Creating Product...
                    </span>
                  </>
                ) : (
                  <>
                    <IoSparkles />
                    <span className="text-sm md:text-base">Create Product</span>
                    <FaCheckCircle />
                  </>
                )}
              </motion.button>

              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 text-center mt-3 md:mt-4">
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
