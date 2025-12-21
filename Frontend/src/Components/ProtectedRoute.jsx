import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../Context/authContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useContext(authContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
