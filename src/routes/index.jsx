import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import useFindUser from "../hooks/useFindUser";
import { UserContext } from "../hooks/UserContext";

function AppRoutes() {
  const { user, setUser, isLoading } = useFindUser();
  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
      <Router>
        <Routes>
          <Route path="/login" exact element={<Login />} />
          <Route path="/home" exact element={<Home />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default AppRoutes;
