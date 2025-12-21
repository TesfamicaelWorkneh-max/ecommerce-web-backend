import React, { useEffect, useState } from "react";
import ProductForm from "../Components/ProductForm";
import { useNavigate, useParams } from "react-router-dom";
import { fetchWithAuth } from "../utils/auth";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const AdminEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          fetchWithAuth(`${BACKEND_URL}/api/categories`, {}),
          fetchWithAuth(`${BACKEND_URL}/api/products/${id}`),
        ]);
        const catData = await catRes.json();
        const product = await prodRes.json();
        setCategories(catData.categories || catData);
        // normalize to our form shape
        setFormData({
          name: product.name || "",
          price: product.price || 0,
          stock: product.stock || 0,
          category: product.category?._id || "",
          isSold: product.isSold || false,
          image: null,
          description: product.description || {
            intro: "",
            keyFeatures: [],
            benefits: [],
            ingredients: "",
            howToUse: "",
            storage: "",
          },
        });
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append("name", formData.name);
      fd.append("price", formData.price);
      fd.append("stock", formData.stock);
      fd.append("category", formData.category);
      fd.append("isSold", formData.isSold);
      fd.append("description", JSON.stringify(formData.description));
      if (formData.image) fd.append("image", formData.image);

      const res = await fetchWithAuth(`${BACKEND_URL}/api/products/${id}`, {
        method: "PUT",

        body: fd,
      });
      if (res.ok) {
        alert("Product updated");
        navigate("/admin/products");
      } else {
        const err = await res.json();
        alert(err.message || "Failed to update");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  if (!formData) return <div className="p-6 text-white">Loading...</div>;

  return (
    <div className="min-h-screen p-8 text-white flex justify-center">
      <div className="w-full max-w-3xl bg-slate-800 p-6 rounded">
        <h2 className="text-2xl mb-4">Edit Product</h2>
        <ProductForm
          formData={formData}
          setFormData={setFormData}
          categories={categories}
          onSubmit={onSubmit}
          submitLabel="Update Product"
        />
      </div>
    </div>
  );
};

export default AdminEditProduct;
