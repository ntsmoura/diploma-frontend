import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "./../contexts/UserContext";

export default function PrivateRoute() {
  const { user, isLoading } = useContext(UserContext);
  if (isLoading) {
    return <div />;

  }
  if (user) {
    return <Outlet />;
  }

  return <Navigate to="/login" />;
}
