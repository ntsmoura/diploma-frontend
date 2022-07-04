import React from "react";
import { MenuList, MenuItem } from "@mui/material";
import "./style.css";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function Menu({ user }) {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const handleLogout = event => {
    logout()
      .then(() => {
        navigate("/login");
      })
      .catch(err => {
        console.log(err);
      });
  };

  const render = () => {
    if (user.cargo === "Diretor")
      return (
        <span className="menu-item-container">
          <MenuItem
            className="menu-item"
            onClick={() => {
              navigate("/user");
            }}
          >
            Usuários
          </MenuItem>
          <MenuItem
            className="menu-item"
            onClick={() => {
              navigate("/institution/edit");
            }}
          >
            Instituição
          </MenuItem>
        </span>
      );
    else if (user.cargo === "Dirigente")
      return (
        <MenuItem
          className="menu-item"
          onClick={() => {
            navigate("/institution/create");
          }}
        >
          Instituição
        </MenuItem>
      );
    else if (user.cargo === "Superintendente") {
      return (
        <span className="menu-item-container">
          <MenuItem
            className="menu-item"
            onClick={() => {
              navigate("/user");
            }}
          >
            Usuários
          </MenuItem>
          <MenuItem
            className="menu-item"
            onClick={() => {
              if (user.instituicao) navigate("/institution/edit");
              else navigate("/institution/create");
            }}
          >
            Instituição
          </MenuItem>
          <MenuItem
            className="menu-item"
            onClick={() => {
              navigate("/institution/partner");
            }}
          >
            Parceiras
          </MenuItem>
        </span>
      );
    } else if (user.cargo === "Funcionário de Instituição Parceira") {
      return (
        <MenuItem
          className="menu-item"
          onClick={() => {
            navigate("/class");
          }}
        >
          Cursos
        </MenuItem>
      );
    } else return <div />;
  };

  return (
    <MenuList id="menu">
      <MenuItem
        className="menu-item"
        onClick={() => {
          navigate("/home");
        }}
      >
        Home
      </MenuItem>
      {render()}
      <MenuItem className="menu-item" onClick={handleLogout}>
        Logout
      </MenuItem>
    </MenuList>
  );
}

export default Menu;
