import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../Context/authContext";

export default function AdminRoute({ children }) {
  const { role } = useContext(authContext);

  if (role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}
