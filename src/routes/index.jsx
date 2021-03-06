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
import EditInstitution from "../pages/Institution/EditInstitution";
import CreateInstitution from "../pages/Institution/CreateInstitution";
import Partner from "../pages/Institution/Partner";
import CreateClass from "../pages/Class/CreateClass";
import ViewClass from "../pages/Class/ViewClass";
import EditClass from "../pages/Class/EditClass";
import Degree from "../pages/Degree";
import Logs from "../pages/Logs";

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
          <Route
            exact
            path="/institution/create"
            element={
              <ProtectedRoute roles={["Dirigente", "Superintendente"]} />
            }
          >
            <Route
              exact
              path="/institution/create"
              element={<CreateInstitution />}
            />
          </Route>
          <Route
            exact
            path="/institution/edit"
            element={<ProtectedRoute roles={["Diretor", "Superintendente"]} />}
          >
            <Route
              exact
              path="/institution/edit"
              element={<EditInstitution />}
            />
          </Route>
          <Route
            exact
            path="/institution/partner"
            element={<ProtectedRoute roles={["Superintendente"]} />}
          >
            <Route exact path="/institution/partner" element={<Partner />} />
          </Route>
          <Route
            exact
            path="/class/create"
            element={
              <ProtectedRoute roles={["Funcion??rio de Institui????o Parceira"]} />
            }
          >
            <Route exact path="/class/create" element={<CreateClass />} />
          </Route>
          <Route
            exact
            path="/class"
            element={
              <ProtectedRoute roles={["Funcion??rio de Institui????o Parceira"]} />
            }
          >
            <Route exact path="/class" element={<ViewClass />} />
          </Route>
          <Route
            exact
            path="/class/edit/:eMEC"
            element={
              <ProtectedRoute roles={["Funcion??rio de Institui????o Parceira"]} />
            }
          >
            <Route exact path="/class/edit/:eMEC" element={<EditClass />} />
          </Route>
          <Route
            exact
            path="/degree"
            element={
              <ProtectedRoute
                roles={["Funcion??rio de Institui????o Validadora"]}
              />
            }
          >
            <Route exact path="/degree" element={<Degree />} />
          </Route>
          <Route
            exact
            path="/log"
            element={<ProtectedRoute roles={["Coordenador"]} />}
          >
            <Route exact path="/log" element={<Logs />} />
          </Route>
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default AppRoutes;
