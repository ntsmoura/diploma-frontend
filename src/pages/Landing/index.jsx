import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
//import Loading from "./../components/Loading";
export default function Landing() {
  const { user, isLoading } = useContext(UserContext);
  if (isLoading) {
    return <div />;
  }
  if (user) {
    return <Navigate to="/home" />;
  }
  //redirect if there is no user
  return <Navigate to="/login" />;
}
