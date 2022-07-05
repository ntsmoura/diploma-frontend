import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
//import { ToastContainer, toast } from "react-toastify";
import {
  Paper,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from "@mui/material";
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
  const params = useParams();

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  //eslint
  useEffect(() => {
    api
      .get("/usuario/obter", {
        headers: { cpf: params.cpf, Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setCargo(response.data.cargo);
        setCpf(response.data.cpf);
        setEmail(response.data.email);
        setSobrenome(response.data.sobrenome);
        setNome(response.data.nome);
        setTelefone(response.data.telefone);
      });
    // eslint-disable-next-line
  }, []);

  const editSelectedUser = async event => {
    event.preventDefault();
    await api
      .patch(
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
    <div className="edit-user-page">
      <Paper className="edit-user-paper" elevation={8}>
        <Menu user={user} />
        <div className="edit-user-paper-content">
          <form className="edit-user-form" onSubmit={editSelectedUser}>
            <div className="edit-user-input-container">
              <TextField
                className="edit-user-textfield"
                type="text"
                name="cpf"
                required
                placeholder="CPF"
                value={cpf}
                variant="standard"
                onChange={e => setCpf(e.target.value)}
              />
              <TextField
                className="edit-user-textfield"
                variant="standard"
                type="text"
                name="nome"
                required
                placeholder="Nome"
                value={nome}
                onChange={e => setNome(e.target.value)}
              />
              <TextField
                className="edit-user-textfield"
                variant="standard"
                type="text"
                name="sobrenome"
                required
                placeholder="Sobrenome"
                value={sobrenome}
                onChange={e => setSobrenome(e.target.value)}
              />
              <TextField
                className="edit-user-textfield"
                variant="standard"
                type="text"
                name="telefone"
                required
                placeholder="Telefone"
                value={telefone}
                onChange={e => setTelefone(e.target.value)}
              />
              <TextField
                className="edit-user-textfield"
                variant="standard"
                type="text"
                name="email"
                disabled={true}
                required
                placeholder="E-mail"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              {user.cargo === "Diretor" && (
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="edit-user-select-label">Cargo</InputLabel>
                  <Select
                    disabled={true}
                    className="edit-user-select"
                    value={cargo}
                    variant="standard"
                    label="Cargo"
                    labelId="edit-user-select-label"
                    onChange={e => setCargo(e.target.value)}
                  >
                    <MenuItem value={"Diretor"}>Diretor</MenuItem>
                    <MenuItem value={"Dirigente"}>Dirigente</MenuItem>
                    <MenuItem value={"Funcionário de Instituição Parceira"}>
                      Funcionário
                    </MenuItem>
                  </Select>
                </FormControl>
              )}
              {user.cargo === "Superintendente" && (
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="edit-user-select-label">Cargo</InputLabel>
                  <Select
                    disabled={true}
                    className="edit-user-select"
                    value={cargo}
                    label="Cargo"
                    onChange={e => setCargo(e.target.value)}
                  >
                    <MenuItem value={"Superintendente"}>
                      Superintendente
                    </MenuItem>
                    <MenuItem value={"Dirigente"}>Dirigente</MenuItem>
                    <MenuItem value={"Coordenador"}>Coordenador CARE</MenuItem>
                    <MenuItem value={"Funcionário de Instituição Validadora"}>
                      Funcionário
                    </MenuItem>
                  </Select>
                </FormControl>
              )}
            </div>
            <div className="edit-user-button-container">
              <Button
                type="submit"
                className="edit-user-button"
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
