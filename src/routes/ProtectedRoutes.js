import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function ProtectedRoute(props) {
  const { user, isLoading } = useContext(UserContext);
  if (isLoading) {
    return <div />;

  }
  if (user && props.roles.includes(user.cargo)) {
    return <Outlet />;
  }

  return <Navigate to="/home" />;
}
