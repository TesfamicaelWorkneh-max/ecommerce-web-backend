import React, { createContext, useState, useContext, useEffect } from "react";
import { fetchWithAuth } from "../utils/auth";
import { authContext } from "./authContext";

const BACKEND_URL = import.meta.env.VITE_API_URL;

export const cartContext = createContext();

export const useCart = () => {
  const context = useContext(cartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { user } = useContext(authContext);
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch cart from backend on mount
  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      // If no user, try to get cart from localStorage
      const localCart = localStorage.getItem("cart");
      if (localCart) {
        setCart(JSON.parse(localCart));
      } else {
        setCart({ items: [] });
      }
      setLoading(false);
    }

    // Listen for cart cleared events
    const handleCartCleared = () => {
      setCart({ items: [] });
      localStorage.removeItem("cart");
    };

    const handlePaymentSuccess = () => {
      setCart({ items: [] });
      localStorage.removeItem("cart");
    };

    window.addEventListener("cartCleared", handleCartCleared);
    window.addEventListener("paymentSuccess", handlePaymentSuccess);

    return () => {
      window.removeEventListener("cartCleared", handleCartCleared);
      window.removeEventListener("paymentSuccess", handlePaymentSuccess);
    };
  }, [user]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await fetchWithAuth(`${BACKEND_URL}/api/cart`);

      if (response.ok) {
        const data = await response.json();
        const cartData = data.cart || { items: [] };
        setCart(cartData);
        // Also sync with localStorage
        localStorage.setItem("cart", JSON.stringify(cartData));
      } else {
        setCart({ items: [] });
        localStorage.removeItem("cart");
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCart({ items: [] });
    } finally {
      setLoading(false);
    }
  };

  const clearCart = () => {
    setCart({ items: [] });
    localStorage.removeItem("cart");
    // Dispatch event for other components
    window.dispatchEvent(new Event("cartCleared"));
  };

  const value = {
    cart,
    setCart,
    loading,
    fetchCart,
    clearCart,
  };

  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
};
