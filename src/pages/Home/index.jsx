import React, { useContext } from "react";
//mport { ToastContainer, toast } from "react-toastify";
import { Paper, Typography } from "@mui/material";
import { UserContext } from "../../contexts/UserContext";
import Menu from "../../components/Menu";
import "./style.css";
import "react-toastify/dist/ReactToastify.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function Home() {
  const { user } = useContext(UserContext);
  return (
    <div className="home-page">
      <Paper className="home-paper" elevation={8}>
        <Menu user={user} />
        <div className="home-paper-content">
          <Typography id="home-typo" variant="h4">
            Bem vindo: {user.nome}.
          </Typography>
          <Typography id="home-typo" variant="h5">
            Cargo: {user.cargo}.
          </Typography>
          {user.instituicao && (
            <Typography id="home-typo" variant="h6">
              Instituição: {user.instituicao.nome}.
            </Typography>
          )}
        </div>
      </Paper>
    </div>
  );
}

export default Home;
