import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import { TextField, Paper, Typography } from "@mui/material";
import "./style.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function Login() {
  const navigate = useNavigate();
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");

  const submitLogin = async (event) => {
    event.preventDefault();
    try {
      await api
        .post("/acesso/login", { cpf, senha })
        .then((response) => navigate("/home"));
    } catch (e) {
      if (e.response) {
        if (e.response.status === 401) toast.error("CPF ou Senha inválidos!");
        else toast.error("Algum erro ocorreu.");
      } else toast.error("Sistema indisponível. Tente novamente mais tarde.");
    }
  };

  return (
    <div className="auth-page">
      <Paper className="auth-paper" elevation={8}>
        <div className="auth-container">
          <Typography id="auth-typo" variant="h5">
            Login
          </Typography>
          <form className="auth-form" onSubmit={submitLogin}>
            <div className="auth-input-container">
              <TextField
                type="text"
                name="cpf"
                required
                placeholder="CPF"
                value={cpf}
                variant="standard"
                onChange={(e) => setCpf(e.target.value)}
              />
            </div>
            <div className="auth-input-container">
              <TextField
                variant="standard"
                type="password"
                name="senha"
                required
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>
            <div className="auth-button-container">
              <Button type="submit" className="auth-button" variant="contained">
                Entrar
              </Button>
              <ToastContainer />
            </div>
          </form>
        </div>
      </Paper>
    </div>
  );
}

export default Login;
