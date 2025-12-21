import { createContext, useState, useEffect, useContext } from "react";
import { authContext } from "./authContext";
import { fetchWithAuth } from "../utils/auth";

const BACKEND_URL = import.meta.env.VITE_API_URL;

export const cartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });
  const { user } = useContext(authContext);

  // Fetch user cart
  useEffect(() => {
    if (!user) {
      setCart({ items: [] });
      return;
    }

    const fetchCart = async () => {
      try {
        const res = await fetchWithAuth(`${BACKEND_URL}/api/cart`);
        const data = await res.json();
        setCart(data);
      } catch (err) {
        console.log("Cart fetch error:", err);
      }
    };

    fetchCart();
  }, [user]);

  return (
    <cartContext.Provider value={{ cart, setCart }}>
      {children}
    </cartContext.Provider>
  );
};
