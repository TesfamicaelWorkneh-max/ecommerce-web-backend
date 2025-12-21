import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../utils/auth";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  const fetchCategories = async () => {
    const res = await fetchWithAuth(`${BACKEND_URL}/api/categories`, {});
    const data = await res.json();
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;

    try {
      const res = await fetchWithAuth(`${BACKEND_URL}/api/categories/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setCategories(categories.filter((cat) => cat._id !== id));
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete category");
    }
  };

  return (
    <div className="p-6 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Categories</h1>

      {categories.length === 0 ? (
        <p className="text-gray-300">No categories yet</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="bg-slate-800 p-4 rounded-xl shadow hover:shadow-green-500 transition"
            >
              <h2 className="font-bold text-lg">{cat.name}</h2>
              {cat.description && (
                <p className="text-gray-300">{cat.description}</p>
              )}

              {/* Buttons */}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => navigate(`/admin/categories/edit/${cat._id}`)}
                  className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(cat._id)}
                  className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
