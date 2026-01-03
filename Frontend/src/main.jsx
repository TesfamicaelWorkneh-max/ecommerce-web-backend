import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
// import { AuthProvider } from "./Context/AuthContext.jsx";
import { ThemeProvider } from "./Context/ThemeContext.jsx";
import { AuthProvider } from "./Context/authContext.jsx";
import { CartProvider } from "./Context/cartContext.jsx";
import { ProductProvider } from "./Context/ProductContext";
import { initScrollUtilities } from "./utils/scrollUtils";

// Initialize scroll utilities
if (typeof window !== "undefined") {
  initScrollUtilities();
}
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ProductProvider>
      <AuthProvider>
        <ThemeProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </ThemeProvider>
      </AuthProvider>
    </ProductProvider>
  </BrowserRouter>
);
