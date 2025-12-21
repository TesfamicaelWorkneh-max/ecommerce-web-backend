import React from "react";

const ProductForm = ({
  formData,
  setFormData,
  categories = [],
  onSubmit,
  submitLabel = "Save",
}) => {
  const handleChange = (e) => {
    const { name, value, type, checked, files, dataset } = e.target;

    if (dataset.desc) {
      setFormData((prev) => ({
        ...prev,
        description: { ...prev.description, [dataset.desc]: value },
      }));
      return;
    }

    if (["keyFeatures", "benefits"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        description: {
          ...prev.description,
          [name]: value
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        },
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "file" ? files[0] : type === "checkbox" ? checked : value,
    }));
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 sm:gap-6">
      {/* Basic Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="p-3 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />
        <input
          name="price"
          value={formData.price}
          onChange={handleChange}
          type="number"
          placeholder="Price"
          className="p-3 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        />
        <input
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          type="number"
          placeholder="Stock"
          className="p-3 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="p-3 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          required
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Sold Checkbox */}
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="isSold"
          checked={formData.isSold}
          onChange={handleChange}
          className="w-4 h-4 accent-green-400"
        />
        Sold Out
      </label>

      {/* Image Upload */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Main Image</label>
        <input
          name="image"
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="p-2 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        {formData.image && (
          <p className="text-xs text-gray-300 mt-1">{formData.image.name}</p>
        )}
      </div>

      {/* Structured Description */}
      <div className="bg-slate-800 p-4 sm:p-6 rounded-lg border border-gray-700 flex flex-col gap-4">
        <h4 className="text-lg font-semibold text-green-400">
          Structured Description
        </h4>

        <textarea
          data-desc="intro"
          value={formData.description.intro}
          onChange={handleChange}
          placeholder="Intro"
          className="w-full p-3 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <input
          name="keyFeatures"
          value={(formData.description.keyFeatures || []).join(", ")}
          onChange={handleChange}
          placeholder="Key Features (comma separated)"
          className="w-full p-3 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <input
          name="benefits"
          value={(formData.description.benefits || []).join(", ")}
          onChange={handleChange}
          placeholder="Benefits (comma separated)"
          className="w-full p-3 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <textarea
          data-desc="ingredients"
          value={formData.description.ingredients}
          onChange={handleChange}
          placeholder="Ingredients"
          className="w-full p-3 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <textarea
          data-desc="howToUse"
          value={formData.description.howToUse}
          onChange={handleChange}
          placeholder="How To Use"
          className="w-full p-3 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <input
          data-desc="storage"
          value={formData.description.storage}
          onChange={handleChange}
          placeholder="Storage Information"
          className="w-full p-3 rounded-lg bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-green-400 hover:bg-green-500 transition-colors px-6 py-3 rounded-lg font-semibold text-slate-900"
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;

// import React, { useState } from "react";
// import { FaPlus, FaTrash } from "react-icons/fa";

// const ProductForm = ({
//   formData,
//   setFormData,
//   categories = [],
//   onSubmit,
//   submitLabel = "Save",
// }) => {
//   const [featureInput, setFeatureInput] = useState("");
//   const [benefitInput, setBenefitInput] = useState("");

//   const handleChange = (e) => {
//     const { name, value, type, checked, files, dataset } = e.target;

//     if (dataset.desc) {
//       setFormData((prev) => ({
//         ...prev,
//         description: { ...prev.description, [dataset.desc]: value },
//       }));
//       return;
//     }

//     setFormData((prev) => ({
//       ...prev,
//       [name]:
//         type === "file" ? files[0] : type === "checkbox" ? checked : value,
//     }));
//   };

//   /* ---------- Key Features ---------- */
//   const addFeature = () => {
//     if (!featureInput.trim()) return;

//     setFormData((prev) => ({
//       ...prev,
//       description: {
//         ...prev.description,
//         keyFeatures: [
//           ...(prev.description.keyFeatures || []),
//           featureInput.trim(),
//         ],
//       },
//     }));

//     setFeatureInput("");
//   };

//   const removeFeature = (index) => {
//     setFormData((prev) => ({
//       ...prev,
//       description: {
//         ...prev.description,
//         keyFeatures: prev.description.keyFeatures.filter((_, i) => i !== index),
//       },
//     }));
//   };

//   /* ---------- Benefits ---------- */
//   const addBenefit = () => {
//     if (!benefitInput.trim()) return;

//     setFormData((prev) => ({
//       ...prev,
//       description: {
//         ...prev.description,
//         benefits: [...(prev.description.benefits || []), benefitInput.trim()],
//       },
//     }));

//     setBenefitInput("");
//   };

//   const removeBenefit = (index) => {
//     setFormData((prev) => ({
//       ...prev,
//       description: {
//         ...prev.description,
//         benefits: prev.description.benefits.filter((_, i) => i !== index),
//       },
//     }));
//   };

//   return (
//     <form onSubmit={onSubmit} className="flex flex-col gap-6">
//       {/* Basic Info */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         <input
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           placeholder="Product Name"
//           className="p-3 rounded-lg bg-slate-700 text-white"
//           required
//         />
//         <input
//           name="price"
//           value={formData.price}
//           onChange={handleChange}
//           type="number"
//           placeholder="Price"
//           className="p-3 rounded-lg bg-slate-700 text-white"
//           required
//         />
//         <input
//           name="stock"
//           value={formData.stock}
//           onChange={handleChange}
//           type="number"
//           placeholder="Stock"
//           className="p-3 rounded-lg bg-slate-700 text-white"
//         />
//         <select
//           name="category"
//           value={formData.category}
//           onChange={handleChange}
//           className="p-3 rounded-lg bg-slate-700 text-white"
//           required
//         >
//           <option value="">Select Category</option>
//           {categories.map((c) => (
//             <option key={c._id} value={c._id}>
//               {c.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Sold */}
//       <label className="flex items-center gap-2 text-sm">
//         <input
//           type="checkbox"
//           name="isSold"
//           checked={formData.isSold}
//           onChange={handleChange}
//           className="accent-green-400"
//         />
//         Sold Out
//       </label>

//       {/* Image */}
//       <div>
//         <label className="text-sm">Main Image</label>
//         <input
//           name="image"
//           type="file"
//           accept="image/*"
//           onChange={handleChange}
//           className="p-2 rounded-lg bg-slate-700 text-white w-full"
//         />
//       </div>

//       {/* Description */}
//       <div className="bg-slate-800 p-5 rounded-lg border border-gray-700 space-y-4">
//         <h4 className="text-lg font-semibold text-green-400">
//           Structured Description
//         </h4>

//         <textarea
//           data-desc="intro"
//           value={formData.description.intro}
//           onChange={handleChange}
//           placeholder="Intro"
//           className="w-full p-3 rounded-lg bg-slate-700 text-white"
//         />

//         {/* Key Features */}
//         <div>
//           <label className="font-medium text-sm">Key Features</label>
//           <div className="flex gap-2 mt-2">
//             <input
//               value={featureInput}
//               onChange={(e) => setFeatureInput(e.target.value)}
//               placeholder="Add feature"
//               className="flex-1 p-3 rounded-lg bg-slate-700 text-white"
//             />
//             <button
//               type="button"
//               onClick={addFeature}
//               className="px-4 rounded-lg bg-green-500 text-black"
//             >
//               <FaPlus />
//             </button>
//           </div>

//           <ul className="mt-3 space-y-2">
//             {(formData.description.keyFeatures || []).map((f, i) => (
//               <li
//                 key={i}
//                 className="flex justify-between items-center bg-slate-700 px-3 py-2 rounded-lg"
//               >
//                 <span>{f}</span>
//                 <button
//                   type="button"
//                   onClick={() => removeFeature(i)}
//                   className="text-red-400"
//                 >
//                   <FaTrash />
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Benefits */}
//         <div>
//           <label className="font-medium text-sm">Benefits</label>
//           <div className="flex gap-2 mt-2">
//             <input
//               value={benefitInput}
//               onChange={(e) => setBenefitInput(e.target.value)}
//               placeholder="Add benefit"
//               className="flex-1 p-3 rounded-lg bg-slate-700 text-white"
//             />
//             <button
//               type="button"
//               onClick={addBenefit}
//               className="px-4 rounded-lg bg-green-500 text-black"
//             >
//               <FaPlus />
//             </button>
//           </div>

//           <ul className="mt-3 space-y-2">
//             {(formData.description.benefits || []).map((b, i) => (
//               <li
//                 key={i}
//                 className="flex justify-between items-center bg-slate-700 px-3 py-2 rounded-lg"
//               >
//                 <span>{b}</span>
//                 <button
//                   type="button"
//                   onClick={() => removeBenefit(i)}
//                   className="text-red-400"
//                 >
//                   <FaTrash />
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>

//         <textarea
//           data-desc="ingredients"
//           value={formData.description.ingredients}
//           onChange={handleChange}
//           placeholder="Ingredients"
//           className="w-full p-3 rounded-lg bg-slate-700 text-white"
//         />

//         <textarea
//           data-desc="howToUse"
//           value={formData.description.howToUse}
//           onChange={handleChange}
//           placeholder="How To Use"
//           className="w-full p-3 rounded-lg bg-slate-700 text-white"
//         />

//         <input
//           data-desc="storage"
//           value={formData.description.storage}
//           onChange={handleChange}
//           placeholder="Storage Information"
//           className="w-full p-3 rounded-lg bg-slate-700 text-white"
//         />
//       </div>

//       {/* Submit */}
//       <div className="flex justify-end">
//         <button
//           type="submit"
//           className="bg-green-400 hover:bg-green-500 px-6 py-3 rounded-lg font-semibold text-black"
//         >
//           {submitLabel}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default ProductForm;

// import React, { useState, useEffect } from "react";
// import {
//   FaPlus,
//   FaTrash,
//   FaEdit,
//   FaUpload,
//   FaImages,
//   FaTag,
//   FaInfoCircle,
//   FaCheckCircle,
//   FaLeaf,
//   FaFlask,
//   FaBoxOpen,
//   FaEye,
//   FaStar,
//   FaBolt,
//   FaShieldAlt,
//   FaTruck,
//   FaUndo,
//   FaSort,
//   FaCopy,
//   FaMagic,
//   FaSave,
// } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion";
// import toast from "react-hot-toast";

// const DynamicDescriptionSection = ({
//   title,
//   fields,
//   onAdd,
//   onRemove,
//   onUpdate,
//   placeholder,
//   icon,
//   type = "text",
// }) => {
//   const [newItem, setNewItem] = useState({
//     title: "",
//     description: "",
//     icon: "",
//   });

//   const handleAdd = () => {
//     if (!newItem.title.trim()) {
//       toast.error("Title is required");
//       return;
//     }
//     onAdd(newItem);
//     setNewItem({ title: "", description: "", icon: "" });
//   };

//   return (
//     <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center gap-2">
//           {icon}
//           <h3 className="font-semibold text-lg">{title}</h3>
//         </div>
//         <button
//           type="button"
//           onClick={() => onAdd({ title: "", description: "", icon: "" })}
//           className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 rounded-lg flex items-center gap-2"
//         >
//           <FaPlus /> Add
//         </button>
//       </div>

//       <div className="space-y-4">
//         {fields.map((field, index) => (
//           <div
//             key={index}
//             className="flex gap-3 items-start p-3 bg-slate-900/50 rounded-lg"
//           >
//             <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
//               <input
//                 type="text"
//                 value={field.title || ""}
//                 onChange={(e) => onUpdate(index, "title", e.target.value)}
//                 placeholder="Title"
//                 className="p-2 rounded bg-slate-700 border border-slate-600"
//               />
//               <textarea
//                 value={field.description || ""}
//                 onChange={(e) => onUpdate(index, "description", e.target.value)}
//                 placeholder="Description"
//                 className="p-2 rounded bg-slate-700 border border-slate-600 md:col-span-2"
//                 rows="2"
//               />
//               <select
//                 value={field.icon || ""}
//                 onChange={(e) => onUpdate(index, "icon", e.target.value)}
//                 className="p-2 rounded bg-slate-700 border border-slate-600"
//               >
//                 <option value="">Select Icon</option>
//                 <option value="FaCheckCircle">Check</option>
//                 <option value="FaLeaf">Leaf</option>
//                 <option value="FaShieldAlt">Shield</option>
//                 <option value="FaBolt">Bolt</option>
//                 <option value="FaStar">Star</option>
//                 <option value="FaTruck">Truck</option>
//                 <option value="FaUndo">Return</option>
//               </select>
//             </div>
//             <button
//               type="button"
//               onClick={() => onRemove(index)}
//               className="p-2 text-red-400 hover:text-red-300"
//             >
//               <FaTrash />
//             </button>
//           </div>
//         ))}
//       </div>

//       <div className="mt-4 p-3 bg-slate-900/30 rounded-lg">
//         <h4 className="font-medium mb-2">Add New {title.slice(0, -1)}</h4>
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
//           <input
//             type="text"
//             value={newItem.title}
//             onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
//             placeholder="Title"
//             className="p-2 rounded bg-slate-700 border border-slate-600"
//           />
//           <textarea
//             value={newItem.description}
//             onChange={(e) =>
//               setNewItem({ ...newItem, description: e.target.value })
//             }
//             placeholder="Description"
//             className="p-2 rounded bg-slate-700 border border-slate-600 md:col-span-2"
//             rows="1"
//           />
//           <div className="flex gap-2">
//             <select
//               value={newItem.icon}
//               onChange={(e) => setNewItem({ ...newItem, icon: e.target.value })}
//               className="p-2 rounded bg-slate-700 border border-slate-600 flex-1"
//             >
//               <option value="">Icon</option>
//               <option value="FaCheckCircle">Check</option>
//               <option value="FaLeaf">Leaf</option>
//               <option value="FaShieldAlt">Shield</option>
//             </select>
//             <button
//               type="button"
//               onClick={handleAdd}
//               className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-lg"
//             >
//               <FaPlus />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const ProductForm = ({
//   formData,
//   setFormData,
//   categories = [],
//   onSubmit,
//   submitLabel = "Save Product",
//   loading = false,
// }) => {
//   const [activeTab, setActiveTab] = useState("basic");
//   const [images, setImages] = useState([]);
//   const [newCustomSection, setNewCustomSection] = useState({
//     title: "",
//     content: "",
//     type: "text",
//     icon: "",
//     order: 0,
//   });

//   // Initialize form data
//   useEffect(() => {
//     if (!formData.description) {
//       setFormData((prev) => ({
//         ...prev,
//         description: {
//           intro: "",
//           overview: "",
//           keyFeatures: [],
//           benefits: [],
//           ingredients: "",
//           howToUse: "",
//           storage: "",
//           customSections: [],
//           quickFacts: [],
//           specifications: [],
//         },
//       }));
//     }
//   }, [formData, setFormData]);

//   const handleChange = (e) => {
//     const { name, value, type, checked, files } = e.target;

//     if (name.startsWith("description.")) {
//       const field = name.split(".")[1];
//       setFormData((prev) => ({
//         ...prev,
//         description: {
//           ...prev.description,
//           [field]: type === "checkbox" ? checked : value,
//         },
//       }));
//     } else if (name.startsWith("meta.")) {
//       const field = name.split(".")[1];
//       setFormData((prev) => ({
//         ...prev,
//         meta: { ...prev.meta, [field]: value },
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: type === "file" ? files : type === "checkbox" ? checked : value,
//       }));
//     }
//   };

//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);
//     const newImages = [...images, ...files];
//     setImages(newImages);

//     // Create preview URLs
//     const imageUrls = newImages.map((file) => URL.createObjectURL(file));
//     setFormData((prev) => ({
//       ...prev,
//       images: imageUrls,
//     }));
//   };

//   const removeImage = (index) => {
//     const newImages = images.filter((_, i) => i !== index);
//     setImages(newImages);
//     const imageUrls = newImages.map((file) => URL.createObjectURL(file));
//     setFormData((prev) => ({
//       ...prev,
//       images: imageUrls,
//     }));
//   };

//   const addKeyFeature = (feature) => {
//     setFormData((prev) => ({
//       ...prev,
//       description: {
//         ...prev.description,
//         keyFeatures: [...(prev.description.keyFeatures || []), feature],
//       },
//     }));
//   };

//   const updateKeyFeature = (index, field, value) => {
//     const updated = [...(formData.description.keyFeatures || [])];
//     updated[index] = { ...updated[index], [field]: value };
//     setFormData((prev) => ({
//       ...prev,
//       description: { ...prev.description, keyFeatures: updated },
//     }));
//   };

//   const removeKeyFeature = (index) => {
//     const updated = formData.description.keyFeatures.filter(
//       (_, i) => i !== index
//     );
//     setFormData((prev) => ({
//       ...prev,
//       description: { ...prev.description, keyFeatures: updated },
//     }));
//   };

//   const addBenefit = (benefit) => {
//     setFormData((prev) => ({
//       ...prev,
//       description: {
//         ...prev.description,
//         benefits: [...(prev.description.benefits || []), benefit],
//       },
//     }));
//   };

//   const updateBenefit = (index, field, value) => {
//     const updated = [...(formData.description.benefits || [])];
//     updated[index] = { ...updated[index], [field]: value };
//     setFormData((prev) => ({
//       ...prev,
//       description: { ...prev.description, benefits: updated },
//     }));
//   };

//   const removeBenefit = (index) => {
//     const updated = formData.description.benefits.filter((_, i) => i !== index);
//     setFormData((prev) => ({
//       ...prev,
//       description: { ...prev.description, benefits: updated },
//     }));
//   };

//   const addCustomSection = () => {
//     if (!newCustomSection.title.trim()) {
//       toast.error("Section title is required");
//       return;
//     }

//     const sections = [
//       ...(formData.description.customSections || []),
//       newCustomSection,
//     ];
//     setFormData((prev) => ({
//       ...prev,
//       description: { ...prev.description, customSections: sections },
//     }));

//     setNewCustomSection({
//       title: "",
//       content: "",
//       type: "text",
//       icon: "",
//       order: sections.length,
//     });
//   };

//   const updateCustomSection = (index, field, value) => {
//     const updated = [...(formData.description.customSections || [])];
//     updated[index] = { ...updated[index], [field]: value };
//     setFormData((prev) => ({
//       ...prev,
//       description: { ...prev.description, customSections: updated },
//     }));
//   };

//   const removeCustomSection = (index) => {
//     const updated = formData.description.customSections.filter(
//       (_, i) => i !== index
//     );
//     setFormData((prev) => ({
//       ...prev,
//       description: { ...prev.description, customSections: updated },
//     }));
//   };

//   const addQuickFact = () => {
//     const facts = [
//       ...(formData.description.quickFacts || []),
//       { label: "", value: "", icon: "" },
//     ];
//     setFormData((prev) => ({
//       ...prev,
//       description: { ...prev.description, quickFacts: facts },
//     }));
//   };

//   const updateQuickFact = (index, field, value) => {
//     const updated = [...(formData.description.quickFacts || [])];
//     updated[index] = { ...updated[index], [field]: value };
//     setFormData((prev) => ({
//       ...prev,
//       description: { ...prev.description, quickFacts: updated },
//     }));
//   };

//   const removeQuickFact = (index) => {
//     const updated = formData.description.quickFacts.filter(
//       (_, i) => i !== index
//     );
//     setFormData((prev) => ({
//       ...prev,
//       description: { ...prev.description, quickFacts: updated },
//     }));
//   };

//   const addSpecification = () => {
//     const specs = [
//       ...(formData.description.specifications || []),
//       { key: "", value: "" },
//     ];
//     setFormData((prev) => ({
//       ...prev,
//       description: { ...prev.description, specifications: specs },
//     }));
//   };

//   const updateSpecification = (index, field, value) => {
//     const updated = [...(formData.description.specifications || [])];
//     updated[index] = { ...updated[index], [field]: value };
//     setFormData((prev) => ({
//       ...prev,
//       description: { ...prev.description, specifications: updated },
//     }));
//   };

//   const removeSpecification = (index) => {
//     const updated = formData.description.specifications.filter(
//       (_, i) => i !== index
//     );
//     setFormData((prev) => ({
//       ...prev,
//       description: { ...prev.description, specifications: updated },
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Validate required fields
//     if (!formData.name?.trim()) {
//       toast.error("Product name is required");
//       return;
//     }
//     if (!formData.price || formData.price <= 0) {
//       toast.error("Valid price is required");
//       return;
//     }
//     if (!formData.category) {
//       toast.error("Category is required");
//       return;
//     }

//     onSubmit(formData);
//   };

//   const tabs = [
//     { id: "basic", label: "Basic Info", icon: <FaInfoCircle /> },
//     { id: "images", label: "Images", icon: <FaImages /> },
//     { id: "description", label: "Description", icon: <FaEdit /> },
//     { id: "features", label: "Features", icon: <FaCheckCircle /> },
//     { id: "specs", label: "Specs", icon: <FaFlask /> },
//     { id: "seo", label: "SEO", icon: <FaTag /> },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-950 text-white p-4 md:p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
//             Product Management
//           </h1>
//           <p className="text-slate-400 mt-2">
//             Create or edit products with rich, structured descriptions
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Tabs Navigation */}
//           <div className="flex flex-wrap gap-2 mb-6">
//             {tabs.map((tab) => (
//               <button
//                 key={tab.id}
//                 type="button"
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
//                   activeTab === tab.id
//                     ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
//                     : "bg-slate-800 hover:bg-slate-700 text-slate-300"
//                 }`}
//               >
//                 {tab.icon}
//                 {tab.label}
//               </button>
//             ))}
//           </div>

//           {/* Basic Info Tab */}
//           <AnimatePresence mode="wait">
//             {activeTab === "basic" && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700"
//               >
//                 <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
//                   <FaInfoCircle className="text-emerald-400" />
//                   Basic Information
//                 </h2>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium mb-2">
//                         Product Name *
//                       </label>
//                       <input
//                         name="name"
//                         value={formData.name || ""}
//                         onChange={handleChange}
//                         placeholder="Enter product name"
//                         className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
//                         required
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium mb-2">
//                         Category *
//                       </label>
//                       <select
//                         name="category"
//                         value={formData.category || ""}
//                         onChange={handleChange}
//                         className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
//                         required
//                       >
//                         <option value="">Select Category</option>
//                         {categories.map((cat) => (
//                           <option key={cat._id} value={cat._id}>
//                             {cat.name}
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium mb-2">
//                           Price *
//                         </label>
//                         <input
//                           name="price"
//                           type="number"
//                           min="0"
//                           step="0.01"
//                           value={formData.price || ""}
//                           onChange={handleChange}
//                           placeholder="0.00"
//                           className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700"
//                           required
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium mb-2">
//                           Original Price
//                         </label>
//                         <input
//                           name="originalPrice"
//                           type="number"
//                           min="0"
//                           step="0.01"
//                           value={formData.originalPrice || ""}
//                           onChange={handleChange}
//                           placeholder="For discount display"
//                           className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700"
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium mb-2">
//                         Stock Quantity
//                       </label>
//                       <input
//                         name="stock"
//                         type="number"
//                         min="0"
//                         value={formData.stock || 0}
//                         onChange={handleChange}
//                         className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700"
//                       />
//                     </div>

//                     <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-lg">
//                       <div>
//                         <label className="block text-sm font-medium">
//                           Sold Out
//                         </label>
//                         <p className="text-sm text-slate-400">
//                           Mark product as unavailable
//                         </p>
//                       </div>
//                       <label className="relative inline-flex items-center cursor-pointer">
//                         <input
//                           type="checkbox"
//                           name="isSold"
//                           checked={formData.isSold || false}
//                           onChange={handleChange}
//                           className="sr-only peer"
//                         />
//                         <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
//                       </label>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium mb-2">
//                         Tags
//                       </label>
//                       <input
//                         name="tags"
//                         value={(formData.tags || []).join(", ")}
//                         onChange={(e) =>
//                           setFormData((prev) => ({
//                             ...prev,
//                             tags: e.target.value
//                               .split(",")
//                               .map((tag) => tag.trim())
//                               .filter(Boolean),
//                           }))
//                         }
//                         placeholder="tag1, tag2, tag3"
//                         className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             )}

//             {/* Images Tab */}
//             {activeTab === "images" && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700"
//               >
//                 <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
//                   <FaImages className="text-emerald-400" />
//                   Product Images
//                 </h2>

//                 <div className="space-y-6">
//                   <div className="border-2 border-dashed border-slate-700 rounded-2xl p-8 text-center hover:border-emerald-500 transition-colors">
//                     <FaUpload className="text-4xl text-slate-500 mx-auto mb-4" />
//                     <p className="text-slate-400 mb-4">
//                       Drag & drop images or click to upload
//                     </p>
//                     <input
//                       type="file"
//                       name="images"
//                       onChange={handleImageUpload}
//                       multiple
//                       accept="image/*"
//                       className="hidden"
//                       id="image-upload"
//                     />
//                     <label
//                       htmlFor="image-upload"
//                       className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg font-medium cursor-pointer hover:opacity-90 transition-opacity"
//                     >
//                       Upload Images
//                     </label>
//                     <p className="text-sm text-slate-500 mt-2">
//                       Recommended: 1200x1200px, max 5MB each
//                     </p>
//                   </div>

//                   {/* Image Preview Grid */}
//                   {images.length > 0 && (
//                     <div>
//                       <h3 className="font-medium mb-4">
//                         Uploaded Images ({images.length})
//                       </h3>
//                       <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
//                         {images.map((img, idx) => (
//                           <div key={idx} className="relative group">
//                             <img
//                               src={URL.createObjectURL(img)}
//                               alt={`Preview ${idx + 1}`}
//                               className="w-full h-32 object-cover rounded-lg"
//                             />
//                             <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
//                               <button
//                                 type="button"
//                                 onClick={() => removeImage(idx)}
//                                 className="p-2 bg-red-500 rounded-full hover:bg-red-600"
//                               >
//                                 <FaTrash />
//                               </button>
//                             </div>
//                             {idx === 0 && (
//                               <div className="absolute top-2 left-2 px-2 py-1 bg-emerald-500 text-xs rounded">
//                                 Main
//                               </div>
//                             )}
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {/* Current Images */}
//                   {formData.images?.length > 0 && (
//                     <div>
//                       <h3 className="font-medium mb-4">Current Images</h3>
//                       <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
//                         {formData.images.map((img, idx) => (
//                           <div key={idx} className="relative">
//                             <img
//                               src={
//                                 typeof img === "string"
//                                   ? `http://localhost:3000${img}`
//                                   : URL.createObjectURL(img)
//                               }
//                               alt={`Product ${idx + 1}`}
//                               className="w-full h-32 object-cover rounded-lg"
//                             />
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </motion.div>
//             )}

//             {/* Description Tab */}
//             {activeTab === "description" && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 className="space-y-6"
//               >
//                 {/* Intro Section */}
//                 <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
//                   <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
//                     <FaEdit className="text-emerald-400" />
//                     Product Description
//                   </h2>

//                   <div className="space-y-6">
//                     <div>
//                       <label className="block text-sm font-medium mb-2">
//                         Product Introduction
//                       </label>
//                       <textarea
//                         name="description.intro"
//                         value={formData.description?.intro || ""}
//                         onChange={handleChange}
//                         placeholder="Brief introduction about the product..."
//                         rows="3"
//                         className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium mb-2">
//                         Detailed Overview
//                       </label>
//                       <textarea
//                         name="description.overview"
//                         value={formData.description?.overview || ""}
//                         onChange={handleChange}
//                         placeholder="Detailed product description..."
//                         rows="4"
//                         className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
//                       />
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div>
//                         <label className="block text-sm font-medium mb-2">
//                           Ingredients
//                         </label>
//                         <textarea
//                           name="description.ingredients"
//                           value={formData.description?.ingredients || ""}
//                           onChange={handleChange}
//                           placeholder="List of ingredients..."
//                           rows="3"
//                           className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700"
//                         />
//                       </div>

//                       <div>
//                         <label className="block text-sm font-medium mb-2">
//                           How to Use
//                         </label>
//                         <textarea
//                           name="description.howToUse"
//                           value={formData.description?.howToUse || ""}
//                           onChange={handleChange}
//                           placeholder="Usage instructions..."
//                           rows="3"
//                           className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700"
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium mb-2">
//                         Storage Information
//                       </label>
//                       <input
//                         name="description.storage"
//                         value={formData.description?.storage || ""}
//                         onChange={handleChange}
//                         placeholder="Storage conditions and recommendations..."
//                         className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Custom Sections */}
//                 <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
//                   <div className="flex items-center justify-between mb-6">
//                     <h3 className="text-lg font-bold flex items-center gap-2">
//                       <FaPlus className="text-emerald-400" />
//                       Custom Sections
//                     </h3>
//                     <button
//                       type="button"
//                       onClick={addCustomSection}
//                       className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center gap-2"
//                     >
//                       <FaPlus /> Add Section
//                     </button>
//                   </div>

//                   {/* Custom Sections List */}
//                   {(formData.description?.customSections || []).map(
//                     (section, index) => (
//                       <div
//                         key={index}
//                         className="mb-4 p-4 bg-slate-900/50 rounded-lg"
//                       >
//                         <div className="flex justify-between items-center mb-3">
//                           <input
//                             type="text"
//                             value={section.title}
//                             onChange={(e) =>
//                               updateCustomSection(
//                                 index,
//                                 "title",
//                                 e.target.value
//                               )
//                             }
//                             placeholder="Section Title"
//                             className="text-lg font-medium bg-transparent border-none focus:outline-none w-full"
//                           />
//                           <button
//                             type="button"
//                             onClick={() => removeCustomSection(index)}
//                             className="p-2 text-red-400 hover:text-red-300"
//                           >
//                             <FaTrash />
//                           </button>
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3">
//                           <select
//                             value={section.type}
//                             onChange={(e) =>
//                               updateCustomSection(index, "type", e.target.value)
//                             }
//                             className="p-2 rounded bg-slate-800 border border-slate-700"
//                           >
//                             <option value="text">Text</option>
//                             <option value="list">List</option>
//                             <option value="table">Table</option>
//                             <option value="warning">Warning</option>
//                             <option value="tip">Tip</option>
//                           </select>

//                           <select
//                             value={section.icon}
//                             onChange={(e) =>
//                               updateCustomSection(index, "icon", e.target.value)
//                             }
//                             className="p-2 rounded bg-slate-800 border border-slate-700"
//                           >
//                             <option value="">No Icon</option>
//                             <option value="FaInfoCircle">Info</option>
//                             <option value="FaExclamationTriangle">
//                               Warning
//                             </option>
//                             <option value="FaLightbulb">Tip</option>
//                             <option value="FaStar">Star</option>
//                           </select>

//                           <input
//                             type="number"
//                             value={section.order}
//                             onChange={(e) =>
//                               updateCustomSection(
//                                 index,
//                                 "order",
//                                 e.target.value
//                               )
//                             }
//                             placeholder="Order"
//                             className="p-2 rounded bg-slate-800 border border-slate-700"
//                           />
//                         </div>

//                         <textarea
//                           value={section.content}
//                           onChange={(e) =>
//                             updateCustomSection(
//                               index,
//                               "content",
//                               e.target.value
//                             )
//                           }
//                           placeholder="Section content..."
//                           rows="3"
//                           className="w-full p-3 rounded bg-slate-800 border border-slate-700"
//                         />
//                       </div>
//                     )
//                   )}
//                 </div>
//               </motion.div>
//             )}

//             {/* Features Tab */}
//             {activeTab === "features" && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 className="space-y-6"
//               >
//                 {/* Key Features */}
//                 <DynamicDescriptionSection
//                   title="Key Features"
//                   fields={formData.description?.keyFeatures || []}
//                   onAdd={addKeyFeature}
//                   onRemove={removeKeyFeature}
//                   onUpdate={updateKeyFeature}
//                   icon={<FaCheckCircle className="text-emerald-400" />}
//                 />

//                 {/* Benefits */}
//                 <DynamicDescriptionSection
//                   title="Benefits"
//                   fields={formData.description?.benefits || []}
//                   onAdd={addBenefit}
//                   onRemove={removeBenefit}
//                   onUpdate={updateBenefit}
//                   icon={<FaLeaf className="text-green-400" />}
//                 />

//                 {/* Quick Facts */}
//                 <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
//                   <div className="flex items-center justify-between mb-6">
//                     <h3 className="text-lg font-bold flex items-center gap-2">
//                       <FaBolt className="text-yellow-400" />
//                       Quick Facts
//                     </h3>
//                     <button
//                       type="button"
//                       onClick={addQuickFact}
//                       className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center gap-2"
//                     >
//                       <FaPlus /> Add Fact
//                     </button>
//                   </div>

//                   <div className="space-y-4">
//                     {(formData.description?.quickFacts || []).map(
//                       (fact, index) => (
//                         <div
//                           key={index}
//                           className="flex gap-3 items-center p-3 bg-slate-900/50 rounded-lg"
//                         >
//                           <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
//                             <input
//                               type="text"
//                               value={fact.label || ""}
//                               onChange={(e) =>
//                                 updateQuickFact(index, "label", e.target.value)
//                               }
//                               placeholder="Label (e.g., Shelf Life)"
//                               className="p-2 rounded bg-slate-700 border border-slate-600"
//                             />
//                             <input
//                               type="text"
//                               value={fact.value || ""}
//                               onChange={(e) =>
//                                 updateQuickFact(index, "value", e.target.value)
//                               }
//                               placeholder="Value (e.g., 2 Years)"
//                               className="p-2 rounded bg-slate-700 border border-slate-600"
//                             />
//                             <input
//                               type="text"
//                               value={fact.icon || ""}
//                               onChange={(e) =>
//                                 updateQuickFact(index, "icon", e.target.value)
//                               }
//                               placeholder="Icon name"
//                               className="p-2 rounded bg-slate-700 border border-slate-600"
//                             />
//                           </div>
//                           <button
//                             type="button"
//                             onClick={() => removeQuickFact(index)}
//                             className="p-2 text-red-400 hover:text-red-300"
//                           >
//                             <FaTrash />
//                           </button>
//                         </div>
//                       )
//                     )}
//                   </div>
//                 </div>
//               </motion.div>
//             )}

//             {/* Specifications Tab */}
//             {activeTab === "specs" && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700"
//               >
//                 <div className="flex items-center justify-between mb-6">
//                   <h2 className="text-xl font-bold flex items-center gap-2">
//                     <FaFlask className="text-emerald-400" />
//                     Specifications & Technical Details
//                   </h2>
//                   <button
//                     type="button"
//                     onClick={addSpecification}
//                     className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center gap-2"
//                   >
//                     <FaPlus /> Add Specification
//                   </button>
//                 </div>

//                 <div className="space-y-4">
//                   {(formData.description?.specifications || []).map(
//                     (spec, index) => (
//                       <div
//                         key={index}
//                         className="flex gap-3 items-center p-3 bg-slate-900/50 rounded-lg"
//                       >
//                         <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
//                           <input
//                             type="text"
//                             value={spec.key || ""}
//                             onChange={(e) =>
//                               updateSpecification(index, "key", e.target.value)
//                             }
//                             placeholder="Key (e.g., Weight, Dimensions)"
//                             className="p-2 rounded bg-slate-700 border border-slate-600"
//                           />
//                           <input
//                             type="text"
//                             value={spec.value || ""}
//                             onChange={(e) =>
//                               updateSpecification(
//                                 index,
//                                 "value",
//                                 e.target.value
//                               )
//                             }
//                             placeholder="Value"
//                             className="p-2 rounded bg-slate-700 border border-slate-600"
//                           />
//                         </div>
//                         <button
//                           type="button"
//                           onClick={() => removeSpecification(index)}
//                           className="p-2 text-red-400 hover:text-red-300"
//                         >
//                           <FaTrash />
//                         </button>
//                       </div>
//                     )
//                   )}
//                 </div>
//               </motion.div>
//             )}

//             {/* SEO Tab */}
//             {activeTab === "seo" && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700"
//               >
//                 <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
//                   <FaTag className="text-emerald-400" />
//                   SEO & Meta Information
//                 </h2>

//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium mb-2">
//                       Meta Title
//                     </label>
//                     <input
//                       name="meta.title"
//                       value={formData.meta?.title || ""}
//                       onChange={handleChange}
//                       placeholder="Optimized page title for SEO"
//                       className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium mb-2">
//                       Meta Description
//                     </label>
//                     <textarea
//                       name="meta.description"
//                       value={formData.meta?.description || ""}
//                       onChange={handleChange}
//                       placeholder="Brief description for search engines"
//                       rows="3"
//                       className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium mb-2">
//                       Keywords
//                     </label>
//                     <input
//                       name="meta.keywords"
//                       value={(formData.meta?.keywords || []).join(", ")}
//                       onChange={(e) =>
//                         setFormData((prev) => ({
//                           ...prev,
//                           meta: {
//                             ...prev.meta,
//                             keywords: e.target.value
//                               .split(",")
//                               .map((k) => k.trim())
//                               .filter(Boolean),
//                           },
//                         }))
//                       }
//                       placeholder="keyword1, keyword2, keyword3"
//                       className="w-full p-3 rounded-lg bg-slate-900 border border-slate-700"
//                     />
//                     <p className="text-sm text-slate-400 mt-2">
//                       Separate keywords with commas
//                     </p>
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Preview Button */}
//           <div className="sticky bottom-6 bg-slate-900/80 backdrop-blur-lg rounded-2xl p-4 border border-slate-700 shadow-2xl">
//             <div className="flex flex-wrap gap-4 justify-between items-center">
//               <div>
//                 <h3 className="font-semibold">Ready to Save</h3>
//                 <p className="text-sm text-slate-400">
//                   All changes will be saved to the database
//                 </p>
//               </div>

//               <div className="flex flex-wrap gap-3">
//                 <button
//                   type="button"
//                   onClick={() =>
//                     toast.success("Preview functionality coming soon!")
//                   }
//                   className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium flex items-center gap-2 transition-colors"
//                 >
//                   <FaEye /> Preview
//                 </button>

//                 <button
//                   type="button"
//                   onClick={() => {
//                     // Auto-generate some content
//                     const autoDesc = {
//                       intro: `Discover the amazing ${formData.name}, designed for excellence.`,
//                       overview: `This premium ${formData.name} combines cutting-edge technology with elegant design to deliver exceptional performance.`,
//                       keyFeatures: [
//                         {
//                           title: "Premium Quality",
//                           description: "Made with high-grade materials",
//                           icon: "FaStar",
//                         },
//                         {
//                           title: "Easy to Use",
//                           description: "Intuitive design for all users",
//                           icon: "FaCheckCircle",
//                         },
//                       ],
//                       benefits: [
//                         {
//                           title: "Saves Time",
//                           description:
//                             "Complete tasks faster and more efficiently",
//                           icon: "FaBolt",
//                         },
//                         {
//                           title: "Eco-Friendly",
//                           description:
//                             "Environmentally conscious manufacturing",
//                           icon: "FaLeaf",
//                         },
//                       ],
//                     };

//                     setFormData((prev) => ({
//                       ...prev,
//                       description: { ...prev.description, ...autoDesc },
//                     }));
//                     toast.success("Auto-generated content added!");
//                   }}
//                   className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-medium flex items-center gap-2 hover:opacity-90 transition-opacity"
//                 >
//                   <FaMagic /> Auto-Generate
//                 </button>

//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg font-medium flex items-center gap-2 hover:from-emerald-600 hover:to-teal-600 disabled:opacity-50 transition-all"
//                 >
//                   {loading ? (
//                     <>
//                       <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                       Saving...
//                     </>
//                   ) : (
//                     <>
//                       <FaSave /> {submitLabel}
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ProductForm;
