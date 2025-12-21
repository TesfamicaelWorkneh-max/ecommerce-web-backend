import { Toaster } from "react-hot-toast";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { authContext } from "./Context/authContext";

// Import components
import Home from "./Pages/Home";
import AboutPage from "./Pages/AboutPage.jsx";
import ProductsPage from "./Pages/ProductsPage";
import CategoryPage from "./Pages/CategoryPage";
import ShippingInfoPage from "./Pages/ShippingInfoPage.jsx";
import ReturnPolicyPage from "./Pages/ReturnPolicyPage.jsx";
import SearchResultsPage from "./Pages/SearchResultPage.jsx";
import ProductDetailPage from "./Components/ProductDetailPage";
import FAQPage from "./Pages/FAQpage.jsx";
import ContactPage from "./Pages/Contact.jsx";
import Navigation from "./Pages/Navigation";
import Footer from "./Pages/Footer";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import VerifyEmail from "./Pages/VerifyEmail.jsx";
import ForgotPassword from "./Pages/ForgotPasswordPage.jsx";
import ResetPassword from "./Pages/ResetPasswordPage.jsx";
import CartPage from "./Pages/CartPage";
import CheckoutPage from "./Pages/CheckoutPage.jsx";
// import OrderSuccessPage from "./Pages/orderSuccessPage.jsx";
import OrderHistoryPage from "./Pages/OrderHistoryPage.jsx";
import ProtectedRoute from "./Components/ProtectedRoute";
import AdminLayout from "./Admin/AdminLayout.jsx";
import Dashboard from "./Admin/Dashboard.jsx";
import AdminUsers from "./Admin/AdminUsers.jsx";
import AdminProducts from "./Admin/AdminProducts.jsx";
import AdminAddProduct from "./Admin/AdminAddProduct.jsx";
import AdminEditProduct from "./Admin/AdminEditProduct.jsx";
import AdminOrdersPage from "./Admin/AdminOrdersPage.jsx";
import AdminNotificationsPage from "./Admin/AdminNotificationsPage.jsx";
import AdminAddCategory from "./Admin/AdminAddCategory.jsx";
import AdminCategories from "./Admin/AdminCategories.jsx";
import AdminEditCategory from "./Admin/AdminEditCategory";
// import PaymentSuccess from "./Pages/PaymentSuccess.jsx";
import MyNotifications from "./Pages/MyNotifications.jsx";

import ReturnRequestsAdminPage from "./Admin/ReturnRequestsAdminPage.jsx";
function App() {
  const { user, loading } = useContext(authContext);
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  // Request notification permission
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  // Define public routes
  const publicRoutes = [
    "/login",
    "/register",
    "/verify/",
    "/forgot-password",
    "/reset-password/",
  ];

  const isPublicRoute = publicRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  // Special routes that don't need auth
  if (
    location.pathname.startsWith("/verify/") ||
    location.pathname.startsWith("/reset-password/")
  ) {
    return (
      <>
        <Toaster />
        <Routes>
          <Route path="/verify/:token" element={<VerifyEmail />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </>
    );
  }

  // If no user and trying to access protected route
  if (!user && !isPublicRoute) {
    return <Navigate to="/login" replace />;
  }

  // If user exists and trying to access login/register
  if (
    user &&
    (location.pathname === "/login" ||
      location.pathname === "/register" ||
      location.pathname === "/forgot-password")
  ) {
    return (
      <Navigate to={user.role === "admin" ? "/admin/dashboard" : "/"} replace />
    );
  }

  // Normal rendering
  return (
    <>
      <Toaster />
      {!isAdminPage && user && <Navigation />}

      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* User Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <>
                <Home />
                <ProductsPage />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <AboutPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/shipping"
          element={
            <ProtectedRoute>
              <ShippingInfoPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/policy"
          element={
            <ProtectedRoute>
              <ReturnPolicyPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <ContactPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/faqs"
          element={
            <ProtectedRoute>
              <FAQPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <SearchResultsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/category/:name"
          element={
            <ProtectedRoute>
              <CategoryPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />

        {/* <Route
          path="/payment-success"
          element={
            <ProtectedRoute>
              <PaymentSuccess />
            </ProtectedRoute>
          }
        /> */}

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <MyNotifications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-orders"
          element={
            <ProtectedRoute>
              <OrderHistoryPage />
            </ProtectedRoute>
          }
        />

        {/* <Route
          path="/order-success/:orderId"
          element={
            <ProtectedRoute>
              <OrderSuccessPage />
            </ProtectedRoute>
          }
        /> */}

        <Route
          path="/product/:id"
          element={
            <ProtectedRoute>
              <ProductDetailPage />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/add" element={<AdminAddProduct />} />
          <Route path="products/edit/:id" element={<AdminEditProduct />} />
          <Route path="orders" element={<AdminOrdersPage />} />
          <Route path="notifications" element={<AdminNotificationsPage />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="categories/add" element={<AdminAddCategory />} />
          <Route path="categories/edit/:id" element={<AdminEditCategory />} />
          <Route
            path="/admin/return-requests"
            element={<ReturnRequestsAdminPage />}
          />
        </Route>

        {/* Catch all */}
        <Route
          path="*"
          element={<Navigate to={user ? "/" : "/login"} replace />}
        />
      </Routes>

      {!isAdminPage && user && <Footer />}
    </>
  );
}

export default App;
