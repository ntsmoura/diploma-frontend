import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import { TextField, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./style.css";
import useAuth from "../../hooks/useAuth";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function Login() {
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const { login } = useAuth();

  const submitLogin = async event => {
    event.preventDefault();
    await login({ cpf, senha })
      .then(() => {
        navigate("/home");
      })
      .catch(err => {
        if (err.response) {
          if (err.response.status === 401)
            toast.error("CPF ou Senha inválidos!");
        } else
          toast.error(
            "Algum erro ocorreu. Tente novamente em alguns instantes!"
          );
      });
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
                className="auth-textfield"
                type="text"
                name="cpf"
                required
                placeholder="CPF"
                value={cpf}
                variant="standard"
                onChange={e => setCpf(e.target.value)}
              />
              <TextField
                className="auth-textfield"
                variant="standard"
                type="password"
                name="senha"
                required
                placeholder="Senha"
                value={senha}
                onChange={e => setSenha(e.target.value)}
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
