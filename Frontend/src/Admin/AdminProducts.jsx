import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchWithAuth } from "../utils/auth";
import { getImageUrl } from "../utils/imageUtils"; // ✅ Import getImageUrl

const BACKEND_URL = import.meta.env.VITE_API_URL;

const AdminProducts = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const filter = query.get("filter");
  const category = query.get("category") || "";
  const sort = query.get("sort") || "";
  const page = Number(query.get("page")) || 1;

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    let url = `${BACKEND_URL}/api/products/admin?page=${page}&limit=8`;

    if (filter === "sold") url += "&isSold=true";
    if (filter === "unsold") url += "&isSold=false";
    if (category) url += `&category=${category}`;
    if (sort) url += `&sort=${sort}`;

    try {
      const res = await fetchWithAuth(url);
      const data = await res.json();
      setProducts(data.products || []);
      setPages(data.pages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetchWithAuth(`${BACKEND_URL}/api/categories`);
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [location.search]);

  const updateQuery = (params) => {
    const q = new URLSearchParams(location.search);
    Object.entries(params).forEach(([k, v]) => (v ? q.set(k, v) : q.delete(k)));
    navigate(`?${q.toString()}`);
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const res = await fetchWithAuth(
        `${BACKEND_URL}/api/products/${productId}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        alert("Product deleted successfully!");
        fetchProducts(); // Refresh the list
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error deleting product");
    }
  };

  return (
    <div className="min-h-screen text-white py-12 px-6">
      {/* Header */}
      <div className="flex flex-wrap justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Products Management</h1>
          <p className="text-gray-400 mt-1">
            Manage your products, view stock, and track sales
          </p>
        </div>

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => navigate("/admin/products/new")}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <span>+</span>
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-slate-800 rounded-xl p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm text-gray-400 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) =>
                updateQuery({ category: e.target.value, page: 1 })
              }
              className="w-full bg-slate-700 px-3 py-2 rounded border border-slate-600 focus:border-blue-500 focus:outline-none"
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm text-gray-400 mb-1">Sort By</label>
            <select
              value={sort}
              onChange={(e) => updateQuery({ sort: e.target.value, page: 1 })}
              className="w-full bg-slate-700 px-3 py-2 rounded border border-slate-600 focus:border-blue-500 focus:outline-none"
            >
              <option value="createdAt">🕐 Latest</option>
              <option value="likes">🔥 Most Liked</option>
              <option value="stock">📦 High Stock</option>
              <option value="price">💰 Price: High to Low</option>
            </select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm text-gray-400 mb-1">Status</label>
            <div className="flex gap-2">
              <button
                onClick={() => updateQuery({ filter: null, page: 1 })}
                className={`px-4 py-2 rounded ${
                  !filter ? "bg-blue-600" : "bg-slate-700 hover:bg-slate-600"
                }`}
              >
                All
              </button>
              <button
                onClick={() => updateQuery({ filter: "sold", page: 1 })}
                className={`px-4 py-2 rounded ${
                  filter === "sold"
                    ? "bg-red-600"
                    : "bg-slate-700 hover:bg-slate-600"
                }`}
              >
                Sold Out
              </button>
              <button
                onClick={() => updateQuery({ filter: "unsold", page: 1 })}
                className={`px-4 py-2 rounded ${
                  filter === "unsold"
                    ? "bg-green-600"
                    : "bg-slate-700 hover:bg-slate-600"
                }`}
              >
                In Stock
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
            <p className="text-gray-400">Loading products...</p>
          </div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">📦</div>
          <h3 className="text-xl font-semibold mb-2">No products found</h3>
          <p className="text-gray-400 mb-6">
            {filter || category || sort
              ? "Try changing your filters"
              : "Add your first product to get started"}
          </p>
          <button
            onClick={() => navigate("/admin/products/new")}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium"
          >
            Add New Product
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:shadow-xl"
            >
              {/* Product Image */}
              <div className="relative h-48 bg-slate-900">
                <img
                  src={getImageUrl(p.image, {
                    width: 400,
                    height: 300,
                    crop: "fill",
                    quality: "auto",
                  })} // ✅ Use getImageUrl with optimizations
                  alt={p.name}
                  className="w-full h-full object-contain p-4"
                  onError={(e) => {
                    e.target.src = getImageUrl(null); // ✅ Use fallback from imageUtils
                    e.target.className = "w-full h-full object-cover p-4";
                  }}
                />
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      p.isSold
                        ? "bg-red-900/80 text-red-200"
                        : "bg-green-900/80 text-green-200"
                    }`}
                  >
                    {p.isSold ? "Sold Out" : "In Stock"}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5">
                <h3 className="font-bold text-lg mb-1 line-clamp-1">
                  {p.name}
                </h3>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-green-400">
                    ${p.price}
                  </span>
                  <div className="flex items-center gap-1 text-amber-500">
                    <span>❤️</span>
                    <span className="font-medium">{p.likesCount || 0}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-slate-900/50 rounded-lg p-3">
                    <div className="text-xs text-gray-400">Stock</div>
                    <div className="font-bold text-lg">{p.stock}</div>
                  </div>
                  <div className="bg-slate-900/50 rounded-lg p-3">
                    <div className="text-xs text-gray-400">Category</div>
                    <div className="font-medium text-sm truncate">
                      {p.category?.name || "Uncategorized"}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/admin/products/edit/${p._id}`)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 px-4 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <span>✏️</span>
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => handleDelete(p._id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 px-4 py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <span>🗑️</span>
                    <span>Delete</span>
                  </button>
                </div>

                <button
                  onClick={() => navigate(`/product/${p._id}`)}
                  className="w-full mt-3 text-sm text-blue-400 hover:text-blue-300 underline"
                >
                  View Product Page →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex justify-center mt-8 gap-2">
          {page > 1 && (
            <button
              onClick={() => updateQuery({ page: page - 1 })}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg"
            >
              ← Previous
            </button>
          )}

          {Array.from({ length: Math.min(pages, 5) }, (_, i) => {
            let pageNum;
            if (pages <= 5) {
              pageNum = i + 1;
            } else if (page <= 3) {
              pageNum = i + 1;
            } else if (page >= pages - 2) {
              pageNum = pages - 4 + i;
            } else {
              pageNum = page - 2 + i;
            }

            return (
              <button
                key={pageNum}
                onClick={() => updateQuery({ page: pageNum })}
                className={`px-4 py-2 rounded-lg ${
                  page === pageNum
                    ? "bg-blue-600"
                    : "bg-slate-700 hover:bg-slate-600"
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          {page < pages && (
            <button
              onClick={() => updateQuery({ page: page + 1 })}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg"
            >
              Next →
            </button>
          )}
        </div>
      )}

      {/* Summary */}
      {!loading && products.length > 0 && (
        <div className="mt-8 text-center text-gray-400 text-sm">
          Showing {products.length} of many products • Page {page} of {pages}
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
