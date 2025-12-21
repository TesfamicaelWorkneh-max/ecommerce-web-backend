import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../utils/auth";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const AdminAddCategory = () => {
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const token = JSON.parse(localStorage.getItem("user"))?.token;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) return alert("Name is required");

    try {
      setLoading(true);
      const res = await fetchWithAuth(`${BACKEND_URL}/api/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen flex justify-center py-12">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center text-green-400 mb-6">
          Add New Category
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 py-2 rounded text-white font-bold"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Category"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminAddCategory;
