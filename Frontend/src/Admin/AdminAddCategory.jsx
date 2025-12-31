// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { fetchWithAuth } from "../utils/auth";

// // const BACKEND_URL = import.meta.env.VITE_API_URL;

// // const AdminAddCategory = () => {
// //   const [formData, setFormData] = useState({ name: "", description: "" });
// //   const [loading, setLoading] = useState(false);
// //   const navigate = useNavigate();

// //   const token = JSON.parse(localStorage.getItem("user"))?.token;

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!formData.name) return alert("Name is required");

// //     try {
// //       setLoading(true);
// //       const res = await fetchWithAuth(`${BACKEND_URL}/api/categories`, {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify(formData),
// //       });

// //       const data = await res.json();
// //       setLoading(false);

// //       if (res.ok) {
// //         alert("Category added successfully!");
// //         navigate("/admin/categories");
// //       } else {
// //         alert(data.message || "Failed to add category");
// //       }
// //     } catch (err) {
// //       console.error(err);
// //       setLoading(false);
// //       alert("Server error");
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen flex justify-center py-12">
// //       <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-xl p-6">
// //         <h2 className="text-2xl font-bold text-center text-green-400 mb-6">
// //           Add New Category
// //         </h2>

// //         <form onSubmit={handleSubmit} className="space-y-4">
// //           <div>
// //             <label className="block text-gray-300 mb-1">Name</label>
// //             <input
// //               type="text"
// //               name="name"
// //               value={formData.name}
// //               onChange={handleChange}
// //               className="w-full p-2 rounded bg-gray-700 text-white"
// //               required
// //             />
// //           </div>

// //           <div>
// //             <label className="block text-gray-300 mb-1">Description</label>
// //             <textarea
// //               name="description"
// //               value={formData.description}
// //               onChange={handleChange}
// //               className="w-full p-2 rounded bg-gray-700 text-white"
// //             />
// //           </div>

// //           <button
// //             type="submit"
// //             className="w-full bg-green-600 hover:bg-green-700 py-2 rounded text-white font-bold"
// //             disabled={loading}
// //           >
// //             {loading ? "Adding..." : "Add Category"}
// //           </button>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminAddCategory;
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { fetchWithAuth } from "../utils/auth";
// import { motion } from "framer-motion";

// const BACKEND_URL = import.meta.env.VITE_API_URL;

// const AdminAddCategory = () => {
//   const [formData, setFormData] = useState({ name: "", description: "" });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.name) {
//       alert("Name is required");
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await fetchWithAuth(`${BACKEND_URL}/api/categories`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();
//       setLoading(false);

//       if (res.ok) {
//         alert("Category added successfully!");
//         navigate("/admin/categories");
//       } else {
//         alert(data.message || "Failed to add category");
//       }
//     } catch (err) {
//       console.error(err);
//       setLoading(false);
//       alert("Server error");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 md:py-12 px-4 sm:px-6 lg:px-8">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="max-w-md mx-auto"
//       >
//         <div className="mb-8 text-center">
//           <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
//             Add New Category
//           </h1>
//           <p className="text-gray-600 dark:text-gray-400">
//             Create a new product category for your store
//           </p>
//         </div>

//         <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Category Name *
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
//                 placeholder="Enter category name"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Description
//               </label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 rows="4"
//                 className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none"
//                 placeholder="Enter category description"
//               />
//             </div>

//             <div className="flex flex-col sm:flex-row gap-3 pt-4">
//               <button
//                 type="button"
//                 onClick={() => navigate("/admin/categories")}
//                 className="flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 font-medium"
//               >
//                 Cancel
//               </button>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 {loading ? (
//                   <div className="flex items-center justify-center">
//                     <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
//                     Adding...
//                   </div>
//                 ) : (
//                   "Add Category"
//                 )}
//               </button>
//             </div>
//           </form>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default AdminAddCategory;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../utils/auth";
import { motion } from "framer-motion";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const AdminAddCategory = () => {
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const uploadCategoryImage = async () => {
    if (!imageFile) return null;

    const form = new FormData();
    form.append("image", imageFile);

    const res = await fetchWithAuth(
      `${BACKEND_URL}/api/category-images/upload`,
      {
        method: "POST",
        body: form,
      }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Image upload failed");

    return data.image; // { url, public_id }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      alert("Name is required");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Upload image first
      const image = await uploadCategoryImage();

      // 2️⃣ Create category
      const res = await fetchWithAuth(`${BACKEND_URL}/api/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          image,
        }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        alert("Category added successfully!");
        navigate("/admin/categories");
      } else {
        alert(data.message || "Failed to add category");
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert(err.message || "Server error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      >
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          Add New Category
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Category name"
            className="w-full p-3 rounded bg-gray-100 dark:bg-gray-700 text-white"
            required
          />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Category description"
            className="w-full p-3 rounded bg-gray-100 dark:bg-gray-700 text-white"
          />
          {preview && (
            <img
              src={preview}
              className="w-full h-40 object-cover rounded mb-3"
              alt="Preview"
            />
          )}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              setImageFile(file);
              setPreview(URL.createObjectURL(file));
            }}
          />

          <button
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 py-3 rounded text-white font-bold"
          >
            {loading ? "Creating..." : "Add Category"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminAddCategory;
