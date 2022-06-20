import React from "react";
import { MenuList, MenuItem } from "@mui/material";
import "./style.css";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function Menu({ user }) {
  const navigate = useNavigate();
  const navigateLogin = (event) => {
    navigate("/login");
  };
  const { logout } = useAuth();

  return (
    <MenuList id="menu">
      <MenuItem className="menu-item" onClick={navigateLogin}>
        A preencher
      </MenuItem>
      {user.cargo === "Dirigente" && (
        <MenuItem className="menu-item" onClick={navigateLogin}>
          A preencher
        </MenuItem>
      )}
      <MenuItem className="menu-item" onClick={logout}>
        Logout
      </MenuItem>
    </MenuList>
  );
}

export default Menu;
