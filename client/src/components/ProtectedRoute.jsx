import { useAuth } from "../context/user.context.jsx";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="text-center p-4">Loading...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
