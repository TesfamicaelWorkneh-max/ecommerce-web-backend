// import { createContext, useState, useEffect, useContext } from "react";
// import { authContext } from "./authContext";
// import { fetchWithAuth } from "../utils/auth";

// const BACKEND_URL = import.meta.env.VITE_API_URL;

// export const cartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState({ items: [] });
//   const { user } = useContext(authContext);

//   // Fetch user cart
//   useEffect(() => {
//     if (!user) {
//       setCart({ items: [] });
//       return;
//     }

//     const fetchCart = async () => {
//       try {
//         const res = await fetchWithAuth(`${BACKEND_URL}/api/cart`);
//         const data = await res.json();
//         setCart(data);
//       } catch (err) {
//         console.log("Cart fetch error:", err);
//       }
//     };

//     fetchCart();
//   }, [user]);

//   return (
//     <cartContext.Provider value={{ cart, setCart }}>
//       {children}
//     </cartContext.Provider>
//   );
// };
// contexts/CartContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { fetchWithAuth } from "../utils/auth";

const BACKEND_URL = import.meta.env.VITE_API_URL;

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch cart from backend on mount
  useEffect(() => {
    fetchCart();

    // Listen for cart cleared event
    const handleCartCleared = () => {
      setCart({ items: [] });
    };

    window.addEventListener("cartCleared", handleCartCleared);

    return () => {
      window.removeEventListener("cartCleared", handleCartCleared);
    };
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await fetchWithAuth(`${BACKEND_URL}/api/cart`);

      if (response.ok) {
        const data = await response.json();
        setCart(data.cart || { items: [] });
      } else {
        setCart({ items: [] });
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
  };

  const value = {
    cart,
    setCart,
    loading,
    fetchCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
