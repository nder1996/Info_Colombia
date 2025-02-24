import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/auth/useAuthStore";

const ProtectedRoute: React.FC = () => {
  const Auth = useAuthStore((state) => state.Auth);
  //console.log('Auth state:', Auth.isAuthenticated);

  if (!Auth.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
