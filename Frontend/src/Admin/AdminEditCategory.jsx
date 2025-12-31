// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { fetchWithAuth } from "../utils/auth";

// const BACKEND_URL = import.meta.env.VITE_API_URL;

// const AdminEditCategory = () => {
//   const { id } = useParams();
//   const [formData, setFormData] = useState({ name: "", description: "" });
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCategory = async () => {
//       const res = await fetchWithAuth(`${BACKEND_URL}/api/categories`, {});
//       const data = await res.json();
//       const cat = data.find((c) => c._id === id);
//       if (cat) setFormData({ name: cat.name, description: cat.description });
//     };
//     fetchCategory();
//   }, [id]);

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const res = await fetchWithAuth(`${BACKEND_URL}/api/categories/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();
//       setLoading(false);

//       if (res.ok) {
//         alert("Category updated successfully!");
//         navigate("/admin/categories");
//       } else {
//         alert(data.message || "Failed to update category");
//       }
//     } catch (err) {
//       console.error(err);
//       setLoading(false);
//       alert("Server error");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 flex justify-center py-12">
//       <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-xl p-6">
//         <h2 className="text-2xl font-bold text-center text-green-400 mb-6">
//           Edit Category
//         </h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-gray-300 mb-1">Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full p-2 rounded bg-gray-700 text-white"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-gray-300 mb-1">Description</label>
//             <textarea
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               className="w-full p-2 rounded bg-gray-700 text-white"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-green-600 hover:bg-green-700 py-2 rounded text-white font-bold"
//             disabled={loading}
//           >
//             {loading ? "Updating..." : "Update Category"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AdminEditCategory;
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchWithAuth } from "../utils/auth";
import { getImageUrl } from "../utils/imageUtils";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const AdminEditCategory = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await fetchWithAuth(`${BACKEND_URL}/api/categories`);
      const data = await res.json();
      const cat = data.find((c) => c._id === id);
      if (cat) setFormData(cat);
    };
    fetchCategory();
  }, [id]);

  const uploadCategoryImage = async () => {
    if (!imageFile) return formData.image;

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
    if (!res.ok) throw new Error("Image upload failed");

    return data.image;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const image = await uploadCategoryImage();

      const res = await fetchWithAuth(`${BACKEND_URL}/api/categories/${id}`, {
        method: "PUT",
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
        alert("Category updated!");
        navigate("/admin/categories");
      } else {
        alert(data.message);
      }
    } catch (err) {
      setLoading(false);
      alert(err.message || "Server error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center py-12">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-xl">
        <h2 className="text-xl font-bold text-green-400 mb-4">Edit Category</h2>

        {formData.image && (
          <img
            src={getImageUrl(formData.image, { width: 400 })}
            alt="Category"
            className="mb-4 rounded"
          />
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 rounded bg-gray-700 text-white"
          />

          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full p-2 rounded bg-gray-700 text-white"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="text-gray-300"
          />

          <button
            disabled={loading}
            className="w-full bg-green-600 py-2 rounded"
          >
            {loading ? "Updating..." : "Update Category"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminEditCategory;
