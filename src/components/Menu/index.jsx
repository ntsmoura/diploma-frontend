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
    if ((user.cargo === "Diretor") | (user.cargo === "Superintendente"))
      return (
        <MenuItem
          className="menu-item"
          onClick={() => {
            navigate("/user");
          }}
        >
          Usuários
        </MenuItem>
      );
    else if (user.cargo === "Dirigente")
      return (
        <div>
          <MenuItem
            className="menu-item"
            onClick={() => {
              navigate("/institution");
            }}
          >
            Instituição
          </MenuItem>
        </div>
      );
    else return <div />;
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
