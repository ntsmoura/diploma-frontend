import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import useFindUser from "../hooks/useFindUser";
import { UserContext } from "../contexts/UserContext";
import PrivateRoute from "./PrivateRoutes";
import ProtectedRoute from "./ProtectedRoutes"
import Landing from "../pages/Landing";
import EditUser from "../pages/User/EditUser"

function AppRoutes() {
  const { user, setUser, isLoading } = useFindUser();
  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/home" element={<PrivateRoute />}>
            <Route exact path="/home" element={<Home />} />
          </Route>
          <Route exact path="/user/edit" element={<ProtectedRoute roles={['Diretor','Superintendente']} />}>
            <Route exact path="/user/edit" element={<EditUser />} />
          </Route>
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default AppRoutes;
