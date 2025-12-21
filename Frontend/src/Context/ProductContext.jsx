import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchWithAuth } from "../utils/auth";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState({}); // { productId: productData }

  // Fetch all products on load
  const fetchProducts = async () => {
    try {
      const res = await fetchWithAuth(`${BACKEND_URL}/api/products`);
      const data = await res.json();

      // Flatten grouped products
      const flatProducts = {};
      Object.values(data).forEach((group) =>
        group.forEach((p) => {
          flatProducts[p._id] = p;
        })
      );

      setProducts(flatProducts);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Toggle like and update context
  const toggleLike = async (productId) => {
    try {
      const res = await fetchWithAuth(
        `${BACKEND_URL}/api/products/${productId}/like`,
        { method: "POST" }
      );
      const data = await res.json();
      if (res.ok) {
        setProducts((prev) => ({
          ...prev,
          [productId]: {
            ...prev[productId],
            likesCount: data.likesCount,
            isLiked: data.liked,
          },
        }));
      }
    } catch (err) {
      console.error("Like toggle failed", err);
    }
  };

  return (
    <ProductContext.Provider value={{ products, setProducts, toggleLike }}>
      {children}
    </ProductContext.Provider>
  );
};
