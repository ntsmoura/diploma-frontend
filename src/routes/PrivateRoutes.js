import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "./../contexts/UserContext";
//import Loading from "./../components/Loading";
export default function PrivateRoute(props) {
  const { user, isLoading } = useContext(UserContext);
  if (isLoading) {
    return <div />;
    //return <Loading />;
  }
  if (user) {
    return <Outlet />;
  }
  //redirect if there is no user
  return <Navigate to="/login" />;
}
