import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import useFindUser from "../hooks/useFindUser";
import { UserContext } from "../contexts/UserContext";
import PrivateRoute from "./PrivateRoutes";
import ProtectedRoute from "./ProtectedRoutes";
import Landing from "../pages/Landing";
import EditUser from "../pages/User/EditUser";
import ViewUser from "../pages/User/ViewUser";
import CreateUser from "../pages/User/CreateUser";

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
          <Route
            exact
            path="/user/edit/:cpf"
            element={<ProtectedRoute roles={["Diretor", "Superintendente"]} />}
          >
            <Route exact path="/user/edit/:cpf" element={<EditUser />} />
          </Route>
          <Route
            exact
            path="/user"
            element={<ProtectedRoute roles={["Diretor", "Superintendente"]} />}
          >
            <Route exact path="/user" element={<ViewUser />} />
          </Route>
          <Route
            exact
            path="/user/create"
            element={<ProtectedRoute roles={["Diretor", "Superintendente"]} />}
          >
            <Route exact path="/user/create" element={<CreateUser />} />
          </Route>
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default AppRoutes;
