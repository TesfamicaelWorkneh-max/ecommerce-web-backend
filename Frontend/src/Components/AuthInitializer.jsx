// components/AuthInitializer.jsx
import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { authContext } from "../Context/authContext";

const AuthInitializer = ({ children }) => {
  const { user, loading } = useContext(authContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdminPage, setIsAdminPage] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Check if current page is admin page
  useEffect(() => {
    setIsAdminPage(location.pathname.startsWith("/admin"));
  }, [location.pathname]);

  // Handle auth redirections
  useEffect(() => {
    if (!loading && !initialized) {
      const publicRoutes = [
        "/login",
        "/register",
        "/verify",
        "/forgot-password",
        "/reset-password",
      ];

      const isPublicRoute = publicRoutes.some((route) =>
        location.pathname.startsWith(route)
      );

      const isVerifyRoute = location.pathname.startsWith("/verify/");
      const isResetRoute = location.pathname.startsWith("/reset-password/");

      // Special cases - allow these without auth
      if (isVerifyRoute || isResetRoute) {
        setInitialized(true);
        return;
      }

      // If user is logged in but on a public route (except special cases)
      if (user && isPublicRoute) {
        // Don't redirect from verify success
        const searchParams = new URLSearchParams(location.search);
        const fromVerify = searchParams.get("fromVerify");

        if (!fromVerify) {
          navigate(user.role === "admin" ? "/admin/dashboard" : "/", {
            replace: true,
          });
        }
      }
      // If user is not logged in but on a protected route
      else if (!user && !isPublicRoute && !isVerifyRoute && !isResetRoute) {
        navigate("/login", { replace: true });
      }

      setInitialized(true);
    }
  }, [user, loading, location, navigate, initialized]);

  // Show loading only on initial app load
  if (loading && !initialized) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-gray-400">Initializing your session...</p>
      </div>
    );
  }

  // If children is a function (render prop pattern), pass isAdminPage
  if (typeof children === "function") {
    return children({ isAdminPage });
  }

  return children;
};

export default AuthInitializer;
