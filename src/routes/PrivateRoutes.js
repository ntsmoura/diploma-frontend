import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { UserContext } from "./../contexts/UserContext";

export default function PrivateRoute() {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const { user, isLoading } = useContext(UserContext);
  if (isLoading) {
    return <div />;
  }
  if (token && user) {
    return <Outlet />;
  }

  return <Navigate to="/login" />;
}
