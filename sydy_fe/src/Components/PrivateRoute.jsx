import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isAdmin = useSelector((state) => state.auth.user.is_admin);

  if (isAuthenticated) {
    if (isAdmin) {
      // User is authenticated and is an admin
      return <>{children}</>;
    } else {
      return <Navigate to="/unauthorized" replace />;
    }
  } else {
    // User is not authenticated
    return <Navigate to="/login" replace state={{ from: window.location.pathname }} />;
  }
};

export default PrivateRoute;
