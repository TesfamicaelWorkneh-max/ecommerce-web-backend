// import { Toaster } from "react-hot-toast";
// import { Routes, Route, useLocation, Navigate } from "react-router-dom";
// import { useContext, useEffect } from "react";
// import { authContext } from "./Context/authContext";

// // Pages
// import Home from "./Pages/Home";
// import AboutPage from "./Pages/AboutPage.jsx";
// import ProductsPage from "./Pages/ProductsPage";
// import CategoryPage from "./Pages/CategoryPage";
// import ShippingInfoPage from "./Pages/ShippingInfoPage.jsx";
// import ReturnPolicyPage from "./Pages/ReturnPolicyPage.jsx";
// import SearchResultsPage from "./Pages/SearchResultPage.jsx";
// import ProductDetailPage from "./Components/ProductDetailPage";
// import FAQPage from "./Pages/FAQpage.jsx";
// import ContactPage from "./Pages/Contact.jsx";
// import Navigation from "./Pages/Navigation";
// import Footer from "./Pages/Footer";
// import Login from "./Pages/Login";
// import Register from "./Pages/Register";
// import VerifyEmail from "./Pages/VerifyEmail.jsx";
// import ForgotPassword from "./Pages/ForgotPasswordPage.jsx";
// import ResetPassword from "./Pages/ResetPasswordPage.jsx";
// import CartPage from "./Pages/CartPage";
// import CheckoutPage from "./Pages/CheckoutPage.jsx";
// import OrderHistoryPage from "./Pages/OrderHistoryPage.jsx";
// import ProtectedRoute from "./Components/ProtectedRoute";
// import MyNotifications from "./Pages/MyNotifications.jsx";

// // Admin
// import AdminLayout from "./Admin/AdminLayout.jsx";
// import Dashboard from "./Admin/Dashboard.jsx";
// import AdminUsers from "./Admin/AdminUsers.jsx";
// import AdminProducts from "./Admin/AdminProducts.jsx";
// import AdminAddProduct from "./Admin/AdminAddProduct.jsx";
// import AdminEditProduct from "./Admin/AdminEditProduct.jsx";
// import AdminOrdersPage from "./Admin/AdminOrdersPage.jsx";
// import AdminNotificationsPage from "./Admin/AdminNotificationsPage.jsx";
// import AdminAddCategory from "./Admin/AdminAddCategory.jsx";
// import AdminCategories from "./Admin/AdminCategories.jsx";
// import AdminEditCategory from "./Admin/AdminEditCategory";
// import ReturnRequestsAdminPage from "./Admin/ReturnRequestsAdminPage.jsx";

// function App() {
//   const { user, loading } = useContext(authContext);
//   const location = useLocation();
//   const isAdminPage = location.pathname.startsWith("/admin");

//   // Request notification permission
//   useEffect(() => {
//     if ("Notification" in window && Notification.permission !== "granted") {
//       Notification.requestPermission();
//     }
//   }, []);

//   // Loading state
//   if (loading) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
//         <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
//         <p className="text-gray-400">Loading...</p>
//       </div>
//     );
//   }

//   // Public routes (NO AUTH REQUIRED)
//   const publicRoutes = [
//     "/login",
//     "/register",
//     "/forgot-password",
//     "/verify/",
//     "/reset-password/",
//   ];

//   const isPublicRoute = publicRoutes.some((route) =>
//     location.pathname.startsWith(route)
//   );

//   // Redirect unauthenticated users from protected pages
//   if (!user && !isPublicRoute) {
//     return <Navigate to="/login" replace />;
//   }

//   // Prevent logged-in users from auth pages
//   if (
//     user &&
//     (location.pathname === "/login" ||
//       location.pathname === "/register" ||
//       location.pathname === "/forgot-password")
//   ) {
//     return (
//       <Navigate to={user.role === "admin" ? "/admin/dashboard" : "/"} replace />
//     );
//   }

//   return (
//     <>
//       <Toaster />
//       {!isAdminPage && user && <Navigation />}

//       <Routes>
//         {/* ================= PUBLIC ================= */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/verify/:token" element={<VerifyEmail />} />
//         <Route path="/reset-password/:token" element={<ResetPassword />} />

//         {/* ================= USER ================= */}
//         <Route
//           path="/"
//           element={
//             <ProtectedRoute>
//               <>
//                 <Home />
//                 <ProductsPage />
//               </>
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/about"
//           element={
//             <ProtectedRoute>
//               <AboutPage />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/shipping"
//           element={
//             <ProtectedRoute>
//               <ShippingInfoPage />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/policy"
//           element={
//             <ProtectedRoute>
//               <ReturnPolicyPage />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/contact"
//           element={
//             <ProtectedRoute>
//               <ContactPage />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/faqs"
//           element={
//             <ProtectedRoute>
//               <FAQPage />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/search"
//           element={
//             <ProtectedRoute>
//               <SearchResultsPage />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/category/:name"
//           element={
//             <ProtectedRoute>
//               <CategoryPage />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/product/:id"
//           element={
//             <ProtectedRoute>
//               <ProductDetailPage />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/cart"
//           element={
//             <ProtectedRoute>
//               <CartPage />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/checkout"
//           element={
//             <ProtectedRoute>
//               <CheckoutPage />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/notifications"
//           element={
//             <ProtectedRoute>
//               <MyNotifications />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/my-orders"
//           element={
//             <ProtectedRoute>
//               <OrderHistoryPage />
//             </ProtectedRoute>
//           }
//         />

//         {/* ================= ADMIN ================= */}
//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute adminOnly>
//               <AdminLayout />
//             </ProtectedRoute>
//           }
//         >
//           <Route index element={<Navigate to="dashboard" replace />} />
//           <Route path="dashboard" element={<Dashboard />} />
//           <Route path="users" element={<AdminUsers />} />
//           <Route path="products" element={<AdminProducts />} />
//           <Route path="products/add" element={<AdminAddProduct />} />
//           <Route path="products/edit/:id" element={<AdminEditProduct />} />
//           <Route path="orders" element={<AdminOrdersPage />} />
//           <Route path="notifications" element={<AdminNotificationsPage />} />
//           <Route path="categories" element={<AdminCategories />} />
//           <Route path="categories/add" element={<AdminAddCategory />} />
//           <Route path="categories/edit/:id" element={<AdminEditCategory />} />
//           <Route path="return-requests" element={<ReturnRequestsAdminPage />} />
//         </Route>

//         {/* ================= FALLBACK ================= */}
//         <Route
//           path="*"
//           element={<Navigate to={user ? "/" : "/login"} replace />}
//         />
//       </Routes>

//       {!isAdminPage && user && <Footer />}
//     </>
//   );
// }

// // export default App;
// import { Toaster } from "react-hot-toast";
// import { Routes, Route, useLocation, Navigate } from "react-router-dom";
// import { useContext, useEffect } from "react";
// import { authContext } from "./Context/authContext";

// // Pages
// import Home from "./Pages/Home";
// import AboutPage from "./Pages/AboutPage.jsx";
// import ProductsPage from "./Pages/ProductsPage";
// import CategoryPage from "./Pages/CategoryPage";
// import ShippingInfoPage from "./Pages/ShippingInfoPage.jsx";
// import ReturnPolicyPage from "./Pages/ReturnPolicyPage.jsx";
// import SearchResultsPage from "./Pages/SearchResultPage.jsx";
// import ProductDetailPage from "./Components/ProductDetailPage";
// import FAQPage from "./Pages/FAQpage.jsx";
// import ContactPage from "./Pages/Contact.jsx";
// import Navigation from "./Pages/Navigation";
// import Footer from "./Pages/Footer";
// import Login from "./Pages/Login";
// import Register from "./Pages/Register";
// import VerifyEmail from "./Pages/VerifyEmail.jsx";
// import ForgotPassword from "./Pages/ForgotPasswordPage.jsx";
// import ResetPassword from "./Pages/ResetPasswordPage.jsx";
// import CartPage from "./Pages/CartPage";
// import CheckoutPage from "./Pages/CheckoutPage.jsx";
// import OrderHistoryPage from "./Pages/OrderHistoryPage.jsx";
// import ProtectedRoute from "./Components/ProtectedRoute";
// import MyNotifications from "./Pages/MyNotifications.jsx";

// // Admin
// import AdminLayout from "./Admin/AdminLayout.jsx";
// import Dashboard from "./Admin/Dashboard.jsx";
// import AdminUsers from "./Admin/AdminUsers.jsx";
// import AdminProducts from "./Admin/AdminProducts.jsx";
// import AdminAddProduct from "./Admin/AdminAddProduct.jsx";
// import AdminEditProduct from "./Admin/AdminEditProduct.jsx";
// import AdminOrdersPage from "./Admin/AdminOrdersPage.jsx";
// import AdminNotificationsPage from "./Admin/AdminNotificationsPage.jsx";
// import AdminAddCategory from "./Admin/AdminAddCategory.jsx";
// import AdminCategories from "./Admin/AdminCategories.jsx";
// import AdminEditCategory from "./Admin/AdminEditCategory";
// import ReturnRequestsAdminPage from "./Admin/ReturnRequestsAdminPage.jsx";

// // Blog Pages (New)
// import BlogPage from "./Pages/BlogPage.jsx";
// import BlogPostPage from "./Pages/BlogPostPage.jsx";

// // Admin Blog Pages (New)
// import AdminBlogPosts from "./Admin/AdminBlogPosts.jsx";
// import AdminCreateBlogPost from "./Admin/AdminCreateBlogPost.jsx";
// import AdminEditBlogPost from "./Admin/AdminEditBlogPost.jsx";
// import AdminBlogAnalytics from "./Admin/AdminBlogAnalytics.jsx";

// function App() {
//   const { user, loading } = useContext(authContext);
//   const location = useLocation();
//   const isAdminPage = location.pathname.startsWith("/admin");
//   const isBlogPage = location.pathname.startsWith("/blog");

//   // Request notification permission
//   useEffect(() => {
//     if ("Notification" in window && Notification.permission !== "granted") {
//       Notification.requestPermission();
//     }
//   }, []);

//   // Loading state
//   if (loading) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
//         <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
//         <p className="text-gray-400">Loading...</p>
//       </div>
//     );
//   }

//   // Public routes (NO AUTH REQUIRED)
//   const publicRoutes = [
//     "/login",
//     "/register",
//     "/forgot-password",
//     "/verify/",
//     "/reset-password/",
//     "/blog", // Blog pages are public
//   ];

//   const isPublicRoute = publicRoutes.some((route) =>
//     location.pathname.startsWith(route)
//   );

//   // Redirect unauthenticated users from protected pages (except blog)
//   if (!user && !isPublicRoute && !isBlogPage) {
//     return <Navigate to="/login" replace />;
//   }

//   // Prevent logged-in users from auth pages
//   if (
//     user &&
//     (location.pathname === "/login" ||
//       location.pathname === "/register" ||
//       location.pathname === "/forgot-password")
//   ) {
//     return (
//       <Navigate to={user.role === "admin" ? "/admin/dashboard" : "/"} replace />
//     );
//   }

//   return (
//     <>
//       <Toaster />
//       {/* Show navigation for all non-admin pages except auth pages */}
//       {!isAdminPage && user && !location.pathname.includes("/blog") && (
//         <Navigation />
//       )}
//       {!isAdminPage && isBlogPage && <Navigation />}{" "}
//       {/* Show nav for blog pages */}
//       <Routes>
//         {/* ================= PUBLIC ================= */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/verify/:token" element={<VerifyEmail />} />
//         <Route path="/reset-password/:token" element={<ResetPassword />} />

//         {/* ================= BLOG (Public) ================= */}
//         <Route path="/blog" element={<BlogPage />} />
//         <Route path="/blog/:slug" element={<BlogPostPage />} />

//         {/* ================= USER (Protected) ================= */}
//         <Route
//           path="/"
//           element={
//             <ProtectedRoute>
//               <>
//                 <Home />
//                 <ProductsPage />
//               </>
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/about"
//           element={
//             <ProtectedRoute>
//               <AboutPage />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/shipping"
//           element={
//             <ProtectedRoute>
//               <ShippingInfoPage />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/policy"
//           element={
//             <ProtectedRoute>
//               <ReturnPolicyPage />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/contact"
//           element={
//             <ProtectedRoute>
//               <ContactPage />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/faqs"
//           element={
//             <ProtectedRoute>
//               <FAQPage />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/search"
//           element={
//             <ProtectedRoute>
//               <SearchResultsPage />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/category/:name"
//           element={
//             <ProtectedRoute>
//               <CategoryPage />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/product/:id"
//           element={
//             <ProtectedRoute>
//               <ProductDetailPage />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/cart"
//           element={
//             <ProtectedRoute>
//               <CartPage />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/checkout"
//           element={
//             <ProtectedRoute>
//               <CheckoutPage />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/notifications"
//           element={
//             <ProtectedRoute>
//               <MyNotifications />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/my-orders"
//           element={
//             <ProtectedRoute>
//               <OrderHistoryPage />
//             </ProtectedRoute>
//           }
//         />

//         {/* ================= ADMIN ================= */}
//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute adminOnly>
//               <AdminLayout />
//             </ProtectedRoute>
//           }
//         >
//           <Route index element={<Navigate to="dashboard" replace />} />
//           <Route path="dashboard" element={<Dashboard />} />
//           <Route path="users" element={<AdminUsers />} />
//           <Route path="products" element={<AdminProducts />} />
//           <Route path="products/add" element={<AdminAddProduct />} />
//           <Route path="products/edit/:id" element={<AdminEditProduct />} />
//           <Route path="orders" element={<AdminOrdersPage />} />
//           <Route path="notifications" element={<AdminNotificationsPage />} />
//           <Route path="categories" element={<AdminCategories />} />
//           <Route path="categories/add" element={<AdminAddCategory />} />
//           <Route path="categories/edit/:id" element={<AdminEditCategory />} />
//           <Route path="return-requests" element={<ReturnRequestsAdminPage />} />

//           {/* Admin Blog Routes */}
//           <Route path="blog" element={<AdminBlogPosts />} />
//           <Route path="blog/create" element={<AdminCreateBlogPost />} />
//           <Route path="blog/edit/:id" element={<AdminEditBlogPost />} />
//           <Route path="blog/analytics" element={<AdminBlogAnalytics />} />
//         </Route>

//         {/* ================= FALLBACK ================= */}
//         <Route
//           path="*"
//           element={<Navigate to={user ? "/" : "/login"} replace />}
//         />
//       </Routes>
//       {/* Show footer for all non-admin pages except auth pages */}
//       {!isAdminPage && user && !location.pathname.includes("/blog") && (
//         <Footer />
//       )}
//       {!isAdminPage && isBlogPage && <Footer />}{" "}
//       {/* Show footer for blog pages */}
//     </>
//   );
// }

// export default App;
import { Toaster } from "react-hot-toast";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { authContext } from "./Context/authContext";

// Pages
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
import OrderHistoryPage from "./Pages/OrderHistoryPage.jsx";
import ProtectedRoute from "./Components/ProtectedRoute";
import MyNotifications from "./Pages/MyNotifications.jsx";

// Payment Pages (NEW)
import PaymentSuccess from "./Pages/PaymentSuccess.jsx"; // You need to create this
import PaymentFailed from "./Pages/PaymentFailed.jsx"; // You need to create this

// Admin
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
import ReturnRequestsAdminPage from "./Admin/ReturnRequestsAdminPage.jsx";

// Blog Pages
import BlogPage from "./Pages/BlogPage.jsx";
import BlogPostPage from "./Pages/BlogPostPage.jsx";

// Admin Blog Pages
import AdminBlogPosts from "./Admin/AdminBlogPosts.jsx";
import AdminCreateBlogPost from "./Admin/AdminCreateBlogPost.jsx";
import AdminEditBlogPost from "./Admin/AdminEditBlogPost.jsx";
import AdminBlogAnalytics from "./Admin/AdminBlogAnalytics.jsx";

function App() {
  const { user, loading } = useContext(authContext);
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");
  const isBlogPage = location.pathname.startsWith("/blog");
  const isPaymentPage = location.pathname.startsWith("/payment-"); // NEW

  // Request notification permission
  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  // Public routes (NO AUTH REQUIRED)
  const publicRoutes = [
    "/login",
    "/register",
    "/forgot-password",
    "/verify/",
    "/reset-password/",
    "/blog", // Blog pages are public
    "/payment-success", // NEW: Payment success page
    "/payment-failed", // NEW: Payment failure page
  ];

  const isPublicRoute = publicRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  // Redirect unauthenticated users from protected pages (except blog and payment pages)
  if (!user && !isPublicRoute && !isBlogPage && !isPaymentPage) {
    return <Navigate to="/login" replace />;
  }

  // Prevent logged-in users from auth pages
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

  return (
    <>
      <Toaster />
      {/* Show navigation for all non-admin pages except auth pages and payment pages */}
      {!isAdminPage &&
        user &&
        !location.pathname.includes("/blog") &&
        !isPaymentPage && <Navigation />}
      {!isAdminPage && isBlogPage && <Navigation />}{" "}
      {/* Show nav for blog pages */}
      <Routes>
        {/* ================= PUBLIC ================= */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify/:token" element={<VerifyEmail />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        {/* ================= PAYMENT PAGES (Public) ================= */}
        <Route path="/payment-success" element={<PaymentSuccess />} />{" "}
        {/* NEW */}
        <Route path="/payment-failed" element={<PaymentFailed />} /> {/* NEW */}
        {/* ================= BLOG (Public) ================= */}
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        {/* ================= USER (Protected) ================= */}
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
          path="/product/:id"
          element={
            <ProtectedRoute>
              <ProductDetailPage />
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
        {/* ================= ADMIN ================= */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
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
          <Route path="return-requests" element={<ReturnRequestsAdminPage />} />

          {/* Admin Blog Routes */}
          <Route path="blog" element={<AdminBlogPosts />} />
          <Route path="blog/create" element={<AdminCreateBlogPost />} />
          <Route path="blog/edit/:id" element={<AdminEditBlogPost />} />
          <Route path="blog/analytics" element={<AdminBlogAnalytics />} />
        </Route>
        {/* ================= FALLBACK ================= */}
        <Route
          path="*"
          element={<Navigate to={user ? "/" : "/login"} replace />}
        />
      </Routes>
      {/* Show footer for all non-admin pages except auth pages and payment pages */}
      {!isAdminPage &&
        user &&
        !location.pathname.includes("/blog") &&
        !isPaymentPage && <Footer />}
      {!isAdminPage && isBlogPage && <Footer />}{" "}
      {/* Show footer for blog pages */}
    </>
  );
}

export default App;
