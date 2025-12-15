import React from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

//import Loading from "../components/Loading/Loading";

const RoleRoute = ({ allowedRoles, children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();
  const location = useLocation();

  // Wait for auth & role
  if (loading || roleLoading) {
    return <Loading />;
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role not permitted
  if (!allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default RoleRoute;
