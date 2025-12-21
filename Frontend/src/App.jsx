// import { Toaster } from "react-hot-toast";
// import { Routes, Route, Navigate, useLocation } from "react-router-dom";
// import { useEffect, useContext } from "react";
// import Home from "./Pages/Home";
// import ProductsPage from "./Pages/ProductsPage";
// import CategoryPage from "./Pages/CategoryPage";
// import ProductDetailPage from "./Components/ProductDetailPage";
// import Navigation from "./Pages/Navigation";
// import Footer from "./Pages/Footer";
// import Login from "./Pages/Login";
// import Register from "./Pages/Register";
// import VerifyEmail from "./Pages/VerifyEmail.jsx";
// import ForgotPassword from "./Pages/ForgotPasswordPage.jsx";
// import ResetPassword from "./Pages/ResetPasswordPage.jsx";
// import CartPage from "./Pages/CartPage";
// import CheckoutPage from "./Pages/CheckoutPage.jsx";
// import OrderSuccessPage from "./Pages/orderSuccessPage.jsx";
// import OrderHistoryPage from "./Pages/OrderHistoryPage.jsx";
// import ProtectedRoute from "./Components/ProtectedRoute";
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
// import { authContext } from "./Context/authContext";
// import { initSocket } from "./utils/socket";
// import PaymentSuccess from "./Pages/PaymentSuccess.jsx";
// import { refreshToken } from "./utils/auth.js";
// import { setAccessToken } from "./utils/auth.js";
// function App() {
//   const { user } = useContext(authContext);
//   const location = useLocation();
//   useEffect(() => {
//     // Load accessToken from localStorage on app start
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (user?.accessToken) {
//       setAccessToken(user.accessToken);
//     }
//   }, []);

//   const isAdminPage = location.pathname.startsWith("/admin");
//   useEffect(() => {
//     refreshToken().catch(() => {});
//   }, []);
//   useEffect(() => {
//     if (Notification.permission !== "granted") {
//       Notification.requestPermission();
//     }
//     initSocket();
//   }, []);

//   // NOT LOGGED IN
//   if (!user) {
//     return (
//       <>
//         <Toaster />
//         <Routes>
//           <Route path="/register" element={<Register />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/verify/:token" element={<VerifyEmail />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/reset-password/:token" element={<ResetPassword />} />
//           <Route path="*" element={<Navigate to="/login" />} />
//         </Routes>
//       </>
//     );
//   }

//   return (
//     <>
//       {!isAdminPage && <Navigation />}
//       <Toaster />
//       <Routes>
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
//           path="/category/:name"
//           element={
//             <ProtectedRoute>
//               <CategoryPage />
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

//         {/* Payment Success Page */}
//         <Route
//           path="/payment-success"
//           element={
//             <ProtectedRoute>
//               <PaymentSuccess />
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

//         <Route
//           path="/order-success/:orderId"
//           element={
//             <ProtectedRoute>
//               <OrderSuccessPage />
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

//         {/* ADMIN ROUTES */}
//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute adminOnly={true}>
//               <AdminLayout />
//             </ProtectedRoute>
//           }
//         >
//           <Route path="dashboard" element={<Dashboard />} />
//           <Route path="users" element={<AdminUsers />} />
//           <Route path="products" element={<AdminProducts />} />
//           <Route path="products/add" element={<AdminAddProduct />} />
//           <Route path="products/edit/:id" element={<AdminEditProduct />} />
//           <Route path="orders" element={<AdminOrdersPage />} />
//           <Route path="notifications" element={<AdminNotificationsPage />} />
//           <Route path="/admin/categories" element={<AdminCategories />} />
//           <Route path="/admin/categories/add" element={<AdminAddCategory />} />
//           <Route
//             path="/admin/categories/edit/:id"
//             element={<AdminEditCategory />}
//           />
//         </Route>

//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>

//       {!isAdminPage && <Footer />}
//     </>
//   );
// }

// // export default App;
// import { Toaster } from "react-hot-toast";
// import { Routes, Route, Navigate, useLocation } from "react-router-dom";
// import { useEffect, useContext } from "react";
// import Home from "./Pages/Home";
// import ProductsPage from "./Pages/ProductsPage";
// import CategoryPage from "./Pages/CategoryPage";
// import ProductDetailPage from "./Components/ProductDetailPage";
// import Navigation from "./Pages/Navigation";
// import Footer from "./Pages/Footer";
// import Login from "./Pages/Login";
// import Register from "./Pages/Register";
// import VerifyEmail from "./Pages/VerifyEmail.jsx";
// import ForgotPassword from "./Pages/ForgotPasswordPage.jsx";
// import ResetPassword from "./Pages/ResetPasswordPage.jsx";
// import CartPage from "./Pages/CartPage";
// import CheckoutPage from "./Pages/CheckoutPage.jsx";
// import OrderSuccessPage from "./Pages/orderSuccessPage.jsx";
// import OrderHistoryPage from "./Pages/OrderHistoryPage.jsx";
// import ProtectedRoute from "./Components/ProtectedRoute";
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
// import { authContext } from "./Context/authContext";
// import { initSocket } from "./utils/socket";
// import PaymentSuccess from "./Pages/PaymentSuccess.jsx";
// import { refreshToken, setAccessToken, logout } from "./utils/auth.js";

// function App() {
//   const { user, setUser } = useContext(authContext);
//   const location = useLocation();
//   const isAdminPage = location.pathname.startsWith("/admin");

//   // Load user & accessToken on app start
//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));

//     if (storedUser?.accessToken) {
//       setAccessToken(storedUser.accessToken); // for fetchWithAuth
//       setUser(storedUser); // sync context
//       initSocket(storedUser._id); // init socket
//     } else {
//       // Try refresh token fallback
//       refreshToken()
//         .then((res) => {
//           setAccessToken(res.accessToken);
//           setUser(res.user); // assuming your refreshToken returns user object
//           initSocket(res.user._id);
//         })
//         .catch(() => {
//           logout(); // redirect to login if refresh fails
//         });
//     }
//   }, []);

//   // Request notification permission
//   useEffect(() => {
//     if (Notification.permission !== "granted") {
//       Notification.requestPermission();
//     }
//   }, []);

//   // Not logged in
//   if (!user) {
//     return (
//       <>
//         <Toaster />
//         <Routes>
//           <Route path="/register" element={<Register />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/verify/:token" element={<VerifyEmail />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/reset-password/:token" element={<ResetPassword />} />
//           <Route path="*" element={<Navigate to="/login" />} />
//         </Routes>
//       </>
//     );
//   }

//   return (
//     <>
//       {!isAdminPage && <Navigation />}
//       <Toaster />
//       <Routes>
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
//           path="/category/:name"
//           element={
//             <ProtectedRoute>
//               <CategoryPage />
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
//           path="/payment-success"
//           element={
//             <ProtectedRoute>
//               <PaymentSuccess />
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
//         <Route
//           path="/order-success/:orderId"
//           element={
//             <ProtectedRoute>
//               <OrderSuccessPage />
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

//         {/* ADMIN ROUTES */}
//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute adminOnly={true}>
//               <AdminLayout />
//             </ProtectedRoute>
//           }
//         >
//           <Route path="dashboard" element={<Dashboard />} />
//           <Route path="users" element={<AdminUsers />} />
//           <Route path="products" element={<AdminProducts />} />
//           <Route path="products/add" element={<AdminAddProduct />} />
//           <Route path="products/edit/:id" element={<AdminEditProduct />} />
//           <Route path="orders" element={<AdminOrdersPage />} />
//           <Route path="notifications" element={<AdminNotificationsPage />} />
//           <Route path="/admin/categories" element={<AdminCategories />} />
//           <Route path="/admin/categories/add" element={<AdminAddCategory />} />
//           <Route
//             path="/admin/categories/edit/:id"
//             element={<AdminEditCategory />}
//           />
//         </Route>

//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>

//       {!isAdminPage && <Footer />}
//     </>
//   );
// }

// export default App;

// import { Toaster } from "react-hot-toast";
// import { Routes, Route, Navigate, useLocation } from "react-router-dom";
// import { useEffect, useContext } from "react";
// import { authContext } from "./Context/authContext";
// import { initSocket } from "./utils/socket";
// import { refreshToken } from "./utils/auth";

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
// import OrderSuccessPage from "./Pages/orderSuccessPage.jsx";
// import OrderHistoryPage from "./Pages/OrderHistoryPage.jsx";
// import ProtectedRoute from "./Components/ProtectedRoute";
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
// import PaymentSuccess from "./Pages/PaymentSuccess.jsx";
// import MyNotifications from "./Pages/MyNotifications.jsx";
// function App() {
//   const { user } = useContext(authContext);
//   const location = useLocation();

//   const isAdminPage = location.pathname.startsWith("/admin");

//   // Request notification permission
//   useEffect(() => {
//     if (Notification.permission !== "granted") Notification.requestPermission();
//   }, []);

//   useEffect(() => {
//     if (user) initSocket(user._id); // make sure socket initializes after refresh
//   }, [user]);

//   // NOT LOGGED IN
//   if (!user) {
//     return (
//       <>
//         <Toaster />
//         <Routes>
//           <Route path="/register" element={<Register />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/verify/:token" element={<VerifyEmail />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/reset-password/:token" element={<ResetPassword />} />
//           <Route path="*" element={<Navigate to="/login" />} />
//         </Routes>
//       </>
//     );
//   }

//   return (
//     <>
//       {!isAdminPage && <Navigation />}
//       <Toaster />

//       <Routes>
//         {/* USER ROUTES */}
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
//               <>
//                 <AboutPage />
//               </>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/shipping"
//           element={
//             <ProtectedRoute>
//               <>
//                 <ShippingInfoPage />
//               </>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/policy"
//           element={
//             <ProtectedRoute>
//               <>
//                 <ReturnPolicyPage />
//               </>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/contact"
//           element={
//             <ProtectedRoute>
//               <>
//                 <ContactPage />
//               </>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/faqs"
//           element={
//             <ProtectedRoute>
//               <>
//                 <FAQPage />
//               </>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/search"
//           element={
//             <ProtectedRoute>
//               <>
//                 <SearchResultsPage />
//               </>
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
//           path="/payment-success"
//           element={
//             <ProtectedRoute>
//               <PaymentSuccess />
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
//           path="/my-order"
//           element={
//             <ProtectedRoute>
//               <OrderHistoryPage />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/order-success/:orderId"
//           element={
//             <ProtectedRoute>
//               <OrderSuccessPage />
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

//         {/* ADMIN ROUTES */}
//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute adminOnly={true}>
//               <AdminLayout />
//             </ProtectedRoute>
//           }
//         >
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
//         </Route>

//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>

//       {!isAdminPage && <Footer />}
//     </>
//   );
// }

// export default App;

// import { Toaster } from "react-hot-toast";
// import { Routes, Route } from "react-router-dom";
// import { useEffect, useContext } from "react";
// import { authContext } from "./Context/authContext";
// import { initSocket } from "./utils/socket";
// // import AuthInitializer from "./components/AuthInitializer";

// // Import all your components
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
// import OrderSuccessPage from "./Pages/orderSuccessPage.jsx";
// import OrderHistoryPage from "./Pages/OrderHistoryPage.jsx";
// import ProtectedRoute from "./Components/ProtectedRoute";
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
// import PaymentSuccess from "./Pages/PaymentSuccess.jsx";
// import MyNotifications from "./Pages/MyNotifications.jsx";
// import AuthInitializer from "./Components/AuthInitializer";
// function App() {
//   const { user } = useContext(authContext);
//   const isAdminPage = window.location.pathname.startsWith("/admin");

//   // Request notification permission
//   useEffect(() => {
//     if (Notification.permission !== "granted") Notification.requestPermission();
//   }, []);

//   useEffect(() => {
//     if (user) initSocket(user._id);
//   }, [user]);

//   return (
//     <>
//       <Toaster />
//       <AuthInitializer>
//         {!isAdminPage && <Navigation />}

//         <Routes>
//           {/* PUBLIC ROUTES */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/verify/:token" element={<VerifyEmail />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/reset-password/:token" element={<ResetPassword />} />

//           {/* PROTECTED USER ROUTES */}
//           <Route
//             path="/"
//             element={
//               <ProtectedRoute>
//                 <>
//                   <Home />
//                   <ProductsPage />
//                 </>
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/about"
//             element={
//               <ProtectedRoute>
//                 <AboutPage />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/shipping"
//             element={
//               <ProtectedRoute>
//                 <ShippingInfoPage />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/policy"
//             element={
//               <ProtectedRoute>
//                 <ReturnPolicyPage />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/contact"
//             element={
//               <ProtectedRoute>
//                 <ContactPage />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/faqs"
//             element={
//               <ProtectedRoute>
//                 <FAQPage />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/search"
//             element={
//               <ProtectedRoute>
//                 <SearchResultsPage />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/category/:name"
//             element={
//               <ProtectedRoute>
//                 <CategoryPage />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/cart"
//             element={
//               <ProtectedRoute>
//                 <CartPage />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/checkout"
//             element={
//               <ProtectedRoute>
//                 <CheckoutPage />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/payment-success"
//             element={
//               <ProtectedRoute>
//                 <PaymentSuccess />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/notifications"
//             element={
//               <ProtectedRoute>
//                 <MyNotifications />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/my-order"
//             element={
//               <ProtectedRoute>
//                 <OrderHistoryPage />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/order-success/:orderId"
//             element={
//               <ProtectedRoute>
//                 <OrderSuccessPage />
//               </ProtectedRoute>
//             }
//           />

//           <Route
//             path="/product/:id"
//             element={
//               <ProtectedRoute>
//                 <ProductDetailPage />
//               </ProtectedRoute>
//             }
//           />

//           {/* ADMIN ROUTES */}
//           <Route
//             path="/admin"
//             element={
//               <ProtectedRoute adminOnly={true}>
//                 <AdminLayout />
//               </ProtectedRoute>
//             }
//           >
//             <Route path="dashboard" element={<Dashboard />} />
//             <Route path="users" element={<AdminUsers />} />
//             <Route path="products" element={<AdminProducts />} />
//             <Route path="products/add" element={<AdminAddProduct />} />
//             <Route path="products/edit/:id" element={<AdminEditProduct />} />
//             <Route path="orders" element={<AdminOrdersPage />} />
//             <Route path="notifications" element={<AdminNotificationsPage />} />
//             <Route path="categories" element={<AdminCategories />} />
//             <Route path="categories/add" element={<AdminAddCategory />} />
//             <Route path="categories/edit/:id" element={<AdminEditCategory />} />
//           </Route>

//           {/* CATCH ALL ROUTE */}
//           <Route
//             path="*"
//             element={
//               <ProtectedRoute>
//                 <Home />
//               </ProtectedRoute>
//             }
//           />
//         </Routes>

//         {!isAdminPage && <Footer />}
//       </AuthInitializer>
//     </>
//   );
// }

// export default App;

// App.jsx
// import { Toaster } from "react-hot-toast";
// import { Routes, Route } from "react-router-dom";
// import { useEffect } from "react";
// import AuthInitializer from "./Components/AuthInitializer";

// // Import all your components
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
// import OrderSuccessPage from "./Pages/orderSuccessPage.jsx";
// import OrderHistoryPage from "./Pages/OrderHistoryPage.jsx";
// import ProtectedRoute from "./Components/ProtectedRoute";
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
// import PaymentSuccess from "./Pages/PaymentSuccess.jsx";
// import MyNotifications from "./Pages/MyNotifications.jsx";

// function App() {
//   // Request notification permission
//   useEffect(() => {
//     if (Notification.permission !== "granted") {
//       Notification.requestPermission();
//     }
//   }, []);

//   return (
//     <>
//       <Toaster />
//       <AuthInitializer>
//         {({ isAdminPage }) => (
//           <>
//             {!isAdminPage && <Navigation />}

//             <Routes>
//               {/* PUBLIC ROUTES */}
//               <Route path="/login" element={<Login />} />
//               <Route path="/register" element={<Register />} />
//               <Route path="/verify/:token" element={<VerifyEmail />} />
//               <Route path="/forgot-password" element={<ForgotPassword />} />
//               <Route
//                 path="/reset-password/:token"
//                 element={<ResetPassword />}
//               />

//               {/* PROTECTED USER ROUTES */}
//               <Route
//                 path="/"
//                 element={
//                   <ProtectedRoute>
//                     <>
//                       <Home />
//                       <ProductsPage />
//                     </>
//                   </ProtectedRoute>
//                 }
//               />

//               <Route
//                 path="/about"
//                 element={
//                   <ProtectedRoute>
//                     <AboutPage />
//                   </ProtectedRoute>
//                 }
//               />

//               <Route
//                 path="/shipping"
//                 element={
//                   <ProtectedRoute>
//                     <ShippingInfoPage />
//                   </ProtectedRoute>
//                 }
//               />

//               <Route
//                 path="/policy"
//                 element={
//                   <ProtectedRoute>
//                     <ReturnPolicyPage />
//                   </ProtectedRoute>
//                 }
//               />

//               <Route
//                 path="/contact"
//                 element={
//                   <ProtectedRoute>
//                     <ContactPage />
//                   </ProtectedRoute>
//                 }
//               />

//               <Route
//                 path="/faqs"
//                 element={
//                   <ProtectedRoute>
//                     <FAQPage />
//                   </ProtectedRoute>
//                 }
//               />

//               <Route
//                 path="/search"
//                 element={
//                   <ProtectedRoute>
//                     <SearchResultsPage />
//                   </ProtectedRoute>
//                 }
//               />

//               <Route
//                 path="/category/:name"
//                 element={
//                   <ProtectedRoute>
//                     <CategoryPage />
//                   </ProtectedRoute>
//                 }
//               />

//               <Route
//                 path="/cart"
//                 element={
//                   <ProtectedRoute>
//                     <CartPage />
//                   </ProtectedRoute>
//                 }
//               />

//               <Route
//                 path="/checkout"
//                 element={
//                   <ProtectedRoute>
//                     <CheckoutPage />
//                   </ProtectedRoute>
//                 }
//               />

//               <Route
//                 path="/payment-success"
//                 element={
//                   <ProtectedRoute>
//                     <PaymentSuccess />
//                   </ProtectedRoute>
//                 }
//               />

//               <Route
//                 path="/notifications"
//                 element={
//                   <ProtectedRoute>
//                     <MyNotifications />
//                   </ProtectedRoute>
//                 }
//               />

//               <Route
//                 path="/my-order"
//                 element={
//                   <ProtectedRoute>
//                     <OrderHistoryPage />
//                   </ProtectedRoute>
//                 }
//               />

//               <Route
//                 path="/order-success/:orderId"
//                 element={
//                   <ProtectedRoute>
//                     <OrderSuccessPage />
//                   </ProtectedRoute>
//                 }
//               />

//               <Route
//                 path="/product/:id"
//                 element={
//                   <ProtectedRoute>
//                     <ProductDetailPage />
//                   </ProtectedRoute>
//                 }
//               />

//               {/* ADMIN ROUTES */}
//               <Route
//                 path="/admin"
//                 element={
//                   <ProtectedRoute adminOnly={true}>
//                     <AdminLayout />
//                   </ProtectedRoute>
//                 }
//               >
//                 <Route index element={<Dashboard />} />
//                 <Route path="dashboard" element={<Dashboard />} />
//                 <Route path="users" element={<AdminUsers />} />
//                 <Route path="products" element={<AdminProducts />} />
//                 <Route path="products/add" element={<AdminAddProduct />} />
//                 <Route
//                   path="products/edit/:id"
//                   element={<AdminEditProduct />}
//                 />
//                 <Route path="orders" element={<AdminOrdersPage />} />
//                 <Route
//                   path="notifications"
//                   element={<AdminNotificationsPage />}
//                 />
//                 <Route path="categories" element={<AdminCategories />} />
//                 <Route path="categories/add" element={<AdminAddCategory />} />
//                 <Route
//                   path="categories/edit/:id"
//                   element={<AdminEditCategory />}
//                 />
//               </Route>

//               {/* CATCH ALL ROUTE - Redirect to home */}
//               <Route
//                 path="*"
//                 element={
//                   <ProtectedRoute>
//                     <Home />
//                   </ProtectedRoute>
//                 }
//               />
//             </Routes>

//             {!isAdminPage && <Footer />}
//           </>
//         )}
//       </AuthInitializer>
//     </>
//   );
// }

// export default App;

// App.jsx - COMPLETE FIXED VERSION
// import { Toaster } from "react-hot-toast";
// import { Routes, Route, useLocation } from "react-router-dom";
// import { useContext, useEffect } from "react";
// import { authContext } from "./Context/authContext";
// import AuthDebugger from "./Components/AuthDebugger";

// // Import all components
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
// import OrderSuccessPage from "./Pages/orderSuccessPage.jsx";
// import OrderHistoryPage from "./Pages/OrderHistoryPage.jsx";
// import ProtectedRoute from "./Components/ProtectedRoute";
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
// import PaymentSuccess from "./Pages/PaymentSuccess.jsx";
// import MyNotifications from "./Pages/MyNotifications.jsx";

// function App() {
//   const { user, loading } = useContext(authContext);
//   const location = useLocation();
//   const isAdminPage = location.pathname.startsWith("/admin");

//   // Request notification permission
//   useEffect(() => {
//     if (Notification.permission !== "granted") {
//       Notification.requestPermission();
//     }
//   }, []);

//   // Show loading while auth is being checked
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-900">
//         <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   // Define public routes that don't require authentication
//   const publicRoutes = [
//     "/login",
//     "/register",
//     "/verify",
//     "/forgot-password",
//     "/reset-password",
//   ];

//   const isPublicRoute = publicRoutes.some((route) =>
//     location.pathname.startsWith(route)
//   );

//   // If user is NOT logged in and trying to access a protected route
//   if (!user && !isPublicRoute) {
//     // Special handling for verify routes - allow access
//     if (location.pathname.startsWith("/verify/")) {
//       // Allow VerifyEmail page to render
//     } else if (location.pathname.startsWith("/reset-password/")) {
//       // Allow ResetPassword page to render
//     } else {
//       // Redirect to login for all other protected routes
//       return (
//         <>
//           <Toaster />
//           <Routes>
//             <Route path="*" element={<Login />} />
//           </Routes>
//         </>
//       );
//     }
//   }

//   // If user IS logged in and trying to access a public route (except verify success)
//   if (user && isPublicRoute) {
//     // Check if we're coming from verification
//     const searchParams = new URLSearchParams(location.search);
//     const fromVerify = searchParams.get("fromVerify");

//     // If coming from verify, allow showing login page with success message
//     if (location.pathname === "/login" && fromVerify === "true") {
//       // Allow login page to show verification success
//     } else {
//       // Otherwise redirect to appropriate dashboard
//       return (
//         <>
//           <Toaster />
//           <Routes>
//             <Route
//               path="*"
//               element={
//                 user.role === "admin" ? (
//                   <AdminLayout>
//                     <Dashboard />
//                   </AdminLayout>
//                 ) : (
//                   <Home />
//                 )
//               }
//             />
//           </Routes>
//         </>
//       );
//     }
//   }

//   // Normal rendering
//   return (
//     <>
//       <Toaster />
//       {!isAdminPage && user && <Navigation />}

//       <Routes>
//         {/* PUBLIC ROUTES */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/verify/:token" element={<VerifyEmail />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/reset-password/:token" element={<ResetPassword />} />

//         {/* PROTECTED USER ROUTES */}
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
//           path="/payment-success"
//           element={
//             <ProtectedRoute>
//               <PaymentSuccess />
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
//           path="/my-order"
//           element={
//             <ProtectedRoute>
//               <OrderHistoryPage />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/order-success/:orderId"
//           element={
//             <ProtectedRoute>
//               <OrderSuccessPage />
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

//         {/* ADMIN ROUTES */}
//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute adminOnly={true}>
//               <AdminLayout />
//             </ProtectedRoute>
//           }
//         >
//           <Route index element={<Dashboard />} />
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
//         </Route>

//         {/* CATCH ALL ROUTE */}
//         <Route
//           path="*"
//           element={
//             <ProtectedRoute>
//               <Home />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>

//       {!isAdminPage && user && <Footer />}
//     </>
//   );
// }

// export default App;
// App.jsx - DEBUG & FIX VERSION
// App.jsx - SIMPLE WORKING VERSION
// import { Toaster } from "react-hot-toast";
// import { Routes, Route, useLocation, Navigate } from "react-router-dom";
// import { useContext } from "react";
// import { authContext } from "./Context/authContext";

// // Import components
// import Login from "./Pages/Login";
// import Register from "./Pages/Register";
// import VerifyEmail from "./Pages/VerifyEmail.jsx";
// import ForgotPassword from "./Pages/ForgotPasswordPage.jsx";
// import ResetPassword from "./Pages/ResetPasswordPage.jsx";
// import Home from "./Pages/Home";
// import ProtectedRoute from "./Components/ProtectedRoute";

// // Debug component
// const DebugAuth = () => {
//   const { user, loading } = useContext(authContext);
//   const location = useLocation();

//   console.log("🔍 AUTH STATE:", {
//     path: location.pathname,
//     user: user ? user.email : "null",
//     loading,
//     time: new Date().toLocaleTimeString(),
//   });

//   return null;
// };

// function App() {
//   const { user, loading } = useContext(authContext);
//   const location = useLocation();

//   // Show loading ONLY for the initial auth check
//   if (loading && !user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-900">
//         <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   // Define public routes
//   const isPublicRoute = [
//     "/login",
//     "/register",
//     "/verify/",
//     "/forgot-password",
//     "/reset-password/",
//   ].some((route) => location.pathname.startsWith(route));

//   // If on verify or reset password page, allow access regardless of auth
//   if (
//     location.pathname.startsWith("/verify/") ||
//     location.pathname.startsWith("/reset-password/")
//   ) {
//     return (
//       <>
//         <DebugAuth />
//         <Toaster />
//         <Routes>
//           <Route path="/verify/:token" element={<VerifyEmail />} />
//           <Route path="/reset-password/:token" element={<ResetPassword />} />
//         </Routes>
//       </>
//     );
//   }

//   // If user is logged in and trying to access public route
//   if (
//     user &&
//     (location.pathname === "/login" || location.pathname === "/register")
//   ) {
//     return <Navigate to="/" replace />;
//   }

//   // If user is not logged in and trying to access protected route
//   if (!user && !isPublicRoute) {
//     return <Navigate to="/login" replace />;
//   }

//   // Normal rendering
//   return (
//     <>
//       <DebugAuth />
//       <Toaster />
//       <Routes>
//         {/* Public Routes */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />

//         {/* Protected Routes - Only show if user exists */}
//         <Route
//           path="/"
//           element={user ? <Home /> : <Navigate to="/login" replace />}
//         />

//         {/* Add other protected routes here */}

//         {/* Catch all */}
//         <Route
//           path="*"
//           element={user ? <Home /> : <Navigate to="/login" replace />}
//         />
//       </Routes>
//     </>
//   );
// }

// export default App;
// App.jsx - COMPLETE WORKING VERSION
// import { Toaster } from "react-hot-toast";
// import { Routes, Route, useLocation, Navigate } from "react-router-dom";
// import { useContext, useEffect } from "react";
// import { authContext } from "./Context/authContext";

// // Import all components
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
// import OrderSuccessPage from "./Pages/orderSuccessPage.jsx";
// import OrderHistoryPage from "./Pages/OrderHistoryPage.jsx";
// import ProtectedRoute from "./Components/ProtectedRoute";
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
// import PaymentSuccess from "./Pages/PaymentSuccess.jsx";
// import MyNotifications from "./Pages/MyNotifications.jsx";

// function App() {
//   const { user, loading } = useContext(authContext);
//   const location = useLocation();
//   const isAdminPage = location.pathname.startsWith("/admin");

//   // Request notification permission
//   useEffect(() => {
//     if (Notification.permission !== "granted") {
//       Notification.requestPermission();
//     }
//   }, []);

//   // Debug logging
//   useEffect(() => {
//     console.log("📍 Current Route:", location.pathname);
//     console.log("👤 User:", user ? user.email : "Not logged in");
//     console.log("⏳ Loading:", loading);
//   }, [location, user, loading]);

//   // Show loading ONLY for initial auth check
//   if (loading) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
//         <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
//         <p className="text-gray-400">Loading your experience...</p>
//       </div>
//     );
//   }

//   // Define public routes that don't require authentication
//   const publicRoutes = [
//     "/login",
//     "/register",
//     "/verify/",
//     "/forgot-password",
//     "/reset-password/",
//   ];

//   const isPublicRoute = publicRoutes.some((route) =>
//     location.pathname.startsWith(route)
//   );

//   // Special handling for verify and reset password pages - allow without auth
//   if (
//     location.pathname.startsWith("/verify/") ||
//     location.pathname.startsWith("/reset-password/")
//   ) {
//     return (
//       <>
//         <Toaster />
//         <Routes>
//           <Route path="/verify/:token" element={<VerifyEmail />} />
//           <Route path="/reset-password/:token" element={<ResetPassword />} />
//         </Routes>
//       </>
//     );
//   }

//   // If user is NOT logged in and trying to access protected route
//   if (!user && !isPublicRoute) {
//     return (
//       <>
//         <Toaster />
//         <Routes>
//           <Route path="*" element={<Login />} />
//         </Routes>
//       </>
//     );
//   }

//   // If user IS logged in and trying to access public route (except login with success message)
//   if (user && isPublicRoute) {
//     // Allow login page if coming from verification (to show success message)
//     const searchParams = new URLSearchParams(location.search);
//     const fromVerify = searchParams.get("fromVerify");

//     if (location.pathname === "/login" && fromVerify === "true") {
//       // Allow showing login page with verification success message
//     } else {
//       // Redirect to appropriate dashboard
//       return (
//         <>
//           <Toaster />
//           <Routes>
//             <Route
//               path="*"
//               element={
//                 user.role === "admin" ? (
//                   <Navigate to="/admin/dashboard" replace />
//                 ) : (
//                   <Navigate to="/" replace />
//                 )
//               }
//             />
//           </Routes>
//         </>
//       );
//     }
//   }

//   // Normal rendering with all routes
//   return (
//     <>
//       <Toaster />

//       {/* Show Navigation only for non-admin pages and when user is logged in */}
//       {!isAdminPage && user && <Navigation />}

//       <Routes>
//         {/* PUBLIC ROUTES */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />

//         {/* PROTECTED USER ROUTES */}
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
//           path="/payment-success"
//           element={
//             <ProtectedRoute>
//               <PaymentSuccess />
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
//           path="/my-order"
//           element={
//             <ProtectedRoute>
//               <OrderHistoryPage />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/order-success/:orderId"
//           element={
//             <ProtectedRoute>
//               <OrderSuccessPage />
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

//         {/* ADMIN ROUTES */}
//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute adminOnly={true}>
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
//         </Route>

//         {/* CATCH ALL ROUTE - Redirect based on user role */}
//         <Route
//           path="*"
//           element={
//             <ProtectedRoute>
//               {user?.role === "admin" ? (
//                 <Navigate to="/admin/dashboard" replace />
//               ) : (
//                 <Navigate to="/" replace />
//               )}
//             </ProtectedRoute>
//           }
//         />
//       </Routes>

//       {/* Show Footer only for non-admin pages and when user is logged in */}
//       {!isAdminPage && user && <Footer />}
//     </>
//   );
// }

// export default App;
// App.jsx - COMPLETE WORKING VERSION WITH PROPER ADMIN PANEL
// import { Toaster } from "react-hot-toast";
// import { Routes, Route, useLocation, Navigate } from "react-router-dom";
// import { useContext, useEffect } from "react";
// import { authContext } from "./Context/authContext";

// // Import all components
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
// import OrderSuccessPage from "./Pages/orderSuccessPage.jsx";
// import OrderHistoryPage from "./Pages/OrderHistoryPage.jsx";
// import ProtectedRoute from "./Components/ProtectedRoute";
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
// import PaymentSuccess from "./Pages/PaymentSuccess.jsx";
// import MyNotifications from "./Pages/MyNotifications.jsx";

// function App() {
//   const { user, loading } = useContext(authContext);
//   const location = useLocation();
//   const isAdminPage = location.pathname.startsWith("/admin");

//   // Request notification permission
//   useEffect(() => {
//     if (Notification.permission !== "granted") {
//       Notification.requestPermission();
//     }
//   }, []);

//   // Debug logging
//   useEffect(() => {
//     console.log("📍 Current Route:", location.pathname);
//     console.log("👤 User:", user ? user.email : "Not logged in");
//     console.log("🎭 Role:", user ? user.role : "N/A");
//     console.log("⏳ Loading:", loading);
//   }, [location, user, loading]);

//   // Show loading ONLY for initial auth check
//   if (loading) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
//         <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
//         <p className="text-gray-400">Loading your experience...</p>
//       </div>
//     );
//   }

//   // Define public routes that don't require authentication
//   const publicRoutes = [
//     "/login",
//     "/register",
//     "/verify/",
//     "/forgot-password",
//     "/reset-password/",
//   ];

//   const isPublicRoute = publicRoutes.some((route) =>
//     location.pathname.startsWith(route)
//   );

//   // Special handling for verify and reset password pages - allow without auth
//   if (
//     location.pathname.startsWith("/verify/") ||
//     location.pathname.startsWith("/reset-password/")
//   ) {
//     return (
//       <>
//         <Toaster />
//         <Routes>
//           <Route path="/verify/:token" element={<VerifyEmail />} />
//           <Route path="/reset-password/:token" element={<ResetPassword />} />
//         </Routes>
//       </>
//     );
//   }

//   // If user is NOT logged in and trying to access protected route
//   if (!user && !isPublicRoute) {
//     return (
//       <>
//         <Toaster />
//         <Routes>
//           <Route path="*" element={<Login />} />
//         </Routes>
//       </>
//     );
//   }

//   // If user IS logged in and trying to access public route (except login with success message)
//   if (user && isPublicRoute) {
//     // Allow login page if coming from verification (to show success message)
//     const searchParams = new URLSearchParams(location.search);
//     const fromVerify = searchParams.get("fromVerify");

//     if (location.pathname === "/login" && fromVerify === "true") {
//       // Allow showing login page with verification success message
//     } else {
//       // Redirect to appropriate dashboard based on role
//       return (
//         <>
//           <Toaster />
//           <Routes>
//             <Route
//               path="*"
//               element={
//                 user.role === "admin" ? (
//                   <Navigate to="/admin/dashboard" replace />
//                 ) : (
//                   <Navigate to="/" replace />
//                 )
//               }
//             />
//           </Routes>
//         </>
//       );
//     }
//   }

//   // Normal rendering with all routes
//   return (
//     <>
//       <Toaster />

//       {/* Show Navigation only for USER pages (not admin) when user is logged in */}
//       {!isAdminPage && user && <Navigation />}

//       <Routes>
//         {/* PUBLIC ROUTES */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />

//         {/* PROTECTED USER ROUTES */}
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
//           path="/payment-success"
//           element={
//             <ProtectedRoute>
//               <PaymentSuccess />
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
//           path="/my-order"
//           element={
//             <ProtectedRoute>
//               <OrderHistoryPage />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/order-success/:orderId"
//           element={
//             <ProtectedRoute>
//               <OrderSuccessPage />
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

//         {/* ADMIN ROUTES - Nested under AdminLayout */}
//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute adminOnly={true}>
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
//         </Route>

//         {/* CATCH ALL ROUTE - Redirect based on user role */}
//         <Route
//           path="*"
//           element={
//             <ProtectedRoute>
//               {user?.role === "admin" ? (
//                 <Navigate to="/admin/dashboard" replace />
//               ) : (
//                 <Navigate to="/" replace />
//               )}
//             </ProtectedRoute>
//           }
//         />
//       </Routes>

//       {/* Show Footer only for USER pages (not admin) when user is logged in */}
//       {!isAdminPage && user && <Footer />}
//     </>
//   );
// }

// export default App;

// App.jsx - SIMPLE NO-LOOP VERSION
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
