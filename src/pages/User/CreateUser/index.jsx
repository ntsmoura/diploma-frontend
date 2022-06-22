import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
//import { ToastContainer, toast } from "react-toastify";
import { Paper, TextField, Button } from "@mui/material";
import { UserContext } from "../../../contexts/UserContext";
import Menu from "../../../components/Menu";
import api from "../../../api";
//import { UserContext } from "../contexts/UserContext";
import Cookies from "universal-cookie";
import "./style.css";
import "react-toastify/dist/ReactToastify.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function CreateUser() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [cpf, setCpf] = useState("");
  const [cargo, setCargo] = useState("");
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const createNewUser = async () => {
    await api
      .post(
        "/usuario",
        { cpf, cargo, nome, sobrenome, telefone, email },
        config
      )
      .then(res => {
        navigate("/user");
      })
      .catch(err => {
        toast.error(err.response.message);
      });
  };

  return (
    <div className="create-user-page">
      <Paper className="create-user-paper" elevation={8}>
        <Menu user={user} />
        <div className="create-user-paper-content">
          <form className="create-user-form" onSubmit={createNewUser}>
            <div className="create-user-input-container">
              <TextField
                className="create-user-textfield"
                type="text"
                name="cpf"
                required
                placeholder="CPF"
                value={cpf}
                variant="standard"
                onChange={e => setCpf(e.target.value)}
              />
              <TextField
                className="create-user-textfield"
                variant="standard"
                type="text"
                name="nome"
                required
                placeholder="Nome"
                value={nome}
                onChange={e => setNome(e.target.value)}
              />
              <TextField
                className="create-user-textfield"
                variant="standard"
                type="text"
                name="sobrenome"
                required
                placeholder="Sobrenome"
                value={nome}
                onChange={e => setSobrenome(e.target.value)}
              />
              <TextField
                className="create-user-textfield"
                variant="standard"
                type="text"
                name="telefone"
                required
                placeholder="Telefone"
                value={nome}
                onChange={e => setTelefone(e.target.value)}
              />
              <TextField
                className="create-user-textfield"
                variant="standard"
                type="text"
                name="email"
                required
                placeholder="E-mail"
                value={nome}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="create-user-button-container">
              <Button
                type="submit"
                className="create-user-button"
                variant="contained"
              >
                Concluir
              </Button>
              <ToastContainer />
            </div>
          </form>
        </div>
      </Paper>
      <ToastContainer />
    </div>
  );
}

export default CreateUser;
