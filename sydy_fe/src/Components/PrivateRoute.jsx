import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children, adminOnly }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  if (isAuthenticated) {
    // If adminOnly is true, check if the user is also an admin
    if (adminOnly && user.is_admin) {
      return <>{children}</>;
    } else if (!adminOnly) {
      // Render the children if not adminOnly or if the user is an admin
      return <>{children}</>;
    } else {
      // User is not an admin, redirect to /unauthorized
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // User is not authenticated, redirect to login
  return (
    <Navigate to="/login" replace state={{ from: window.location.pathname }} />
  );
};

export default PrivateRoute;
