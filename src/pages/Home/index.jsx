import React, { useContext } from "react";
//mport { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Paper, Typography, MenuList, MenuItem } from "@mui/material";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../hooks/UserContext";
import useAuth from "../../hooks/useAuth";

function Home() {
  const { user } = useContext(UserContext);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const navigateLogin = (event) => {
    navigate("/login");
  };
  return (
    <div className="home-page">
      <Paper className="home-paper" elevation={8}>
        <MenuList id="home-menu">
          <MenuItem className="home-menu-item" onClick={navigateLogin}>
            A preencher
          </MenuItem>
          {user.cargo === "Dirigente" && (
            <MenuItem className="home-menu-item" onClick={navigateLogin}>
              A preencher
            </MenuItem>
          )}
          <MenuItem className="home-menu-item" onClick={logout}>
            Logout
          </MenuItem>
        </MenuList>
        <div className="home-paper-content">
          <Typography id="home-typo" variant="h4">
            Bem vindo: {user.nome}!
          </Typography>
          <Typography id="home-typo" variant="h5">
            Cargo: {user.cargo}.
          </Typography>
        </div>
      </Paper>
    </div>
  );
}

export default Home;
