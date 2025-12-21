import React, { useState } from "react";

const ProductModal = ({
  productData,
  setProductData,
  categories,
  onClose,
  onSubmit,
}) => {
  const [openDesc, setOpenDesc] = useState({
    intro: true,
    keyFeatures: false,
    benefits: false,
    howToUse: false,
    ingredients: false,
    storage: false,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setProductData({ ...productData, [name]: files[0] });
    } else if (["keyFeatures", "benefits", "ingredients"].includes(name)) {
      setProductData({
        ...productData,
        description: {
          ...productData.description,
          [name]: value.split(",").map((v) => v.trim()),
        },
      });
    } else if (Object.keys(productData.description).includes(name)) {
      setProductData({
        ...productData,
        description: {
          ...productData.description,
          [name]: value,
        },
      });
    } else {
      setProductData({ ...productData, [name]: value });
    }
  };

  const toggleDesc = (field) => {
    setOpenDesc({ ...openDesc, [field]: !openDesc[field] });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-10 z-50">
      <div className="bg-slate-900 p-6 rounded-lg w-full max-w-3xl text-white">
        <h2 className="text-2xl font-bold mb-4">
          {productData.id ? "Edit Product" : "Add Product"}
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block">Name</label>
            <input
              name="name"
              value={productData.name}
              onChange={handleChange}
              className="w-full p-2 rounded bg-slate-800"
            />
          </div>

          <div>
            <label className="block">Price</label>
            <input
              name="price"
              type="number"
              value={productData.price}
              onChange={handleChange}
              className="w-full p-2 rounded bg-slate-800"
            />
          </div>

          <div>
            <label className="block">Stock</label>
            <input
              name="stock"
              type="number"
              value={productData.stock}
              onChange={handleChange}
              className="w-full p-2 rounded bg-slate-800"
            />
          </div>

          <div>
            <label className="block">Category</label>
            <select
              name="category"
              value={productData.category}
              onChange={handleChange}
              className="w-full p-2 rounded bg-slate-800"
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block">Image</label>
            <input type="file" name="image" onChange={handleChange} />
          </div>

          {/* DESCRIPTION DROP-DOWN */}
          <div className="mt-4 border-t border-gray-700 pt-4 space-y-2">
            {Object.keys(productData.description).map((key) => (
              <div key={key}>
                <button
                  type="button"
                  className="w-full text-left bg-slate-800 p-2 rounded"
                  onClick={() => toggleDesc(key)}
                >
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </button>
                {openDesc[key] && (
                  <div className="mt-2">
                    {Array.isArray(productData.description[key]) ? (
                      <input
                        type="text"
                        name={key}
                        value={productData.description[key].join(", ")}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-slate-800"
                        placeholder="Comma separated values"
                      />
                    ) : (
                      <textarea
                        name={key}
                        value={productData.description[key]}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-slate-800"
                      />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-red-600 rounded"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-green-600 rounded">
              {productData.id ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
