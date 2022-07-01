import React, { useState, useContext, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
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

function CreateInstitution() {
  //const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [credenciamento, setCredenciamento] = useState("");
  const [mantenedora, setMantenedora] = useState("");
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (user.instituicao) {
      setDisabled(true);
      toast.error("Você já está associado a uma instituição!");
    }
    // eslint-disable-next-line
  }, []);

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const createNewInstitution = async event => {
    event.preventDefault();
    let tipo;
    if (user.cargo === "Dirigente") tipo = "parceira";
    else tipo = "validadora";
    await api
      .post(
        "/instituicao",
        { nome, tipo, endereco, cidade, estado, credenciamento, mantenedora },
        config
      )
      .then(res => {
        toast.success("Cadastro realizado!");
        toast.success("A identificação da sua instituição é: " + res.data.id);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="create-institution-page">
      <Paper className="create-institution-paper" elevation={8}>
        <Menu user={user} />
        <div className="create-institution-paper-content">
          <form
            className="create-institution-form"
            onSubmit={createNewInstitution}
          >
            <div className="create-institution-input-container">
              <TextField
                className="create-institution-textfield"
                variant="standard"
                type="text"
                name="nome"
                requiredtoast
                placeholder="Nome"
                value={nome}
                disabled={disabled}
                onChange={e => setNome(e.target.value)}
              />
              <TextField
                className="create-institution-textfield"
                variant="standard"
                type="text"
                name="endereco"
                required
                placeholder="Endereço"
                value={endereco}
                disabled={disabled}
                onChange={e => setEndereco(e.target.value)}
              />
              <TextField
                className="create-institution-textfield"
                variant="standard"
                type="text"
                name="cidade"
                required
                placeholder="Cidade"
                value={cidade}
                disabled={disabled}
                onChange={e => setCidade(e.target.value)}
              />
              <TextField
                className="create-institution-textfield"
                variant="standard"
                type="text"
                name="estado"
                required
                placeholder="Estado"
                value={estado}
                disabled={disabled}
                onChange={e => setEstado(e.target.value)}
              />
              <TextField
                className="create-institution-textfield"
                variant="standard"
                type="text"
                name="credenciamento"
                required
                placeholder="Credenciamento"
                value={credenciamento}
                disabled={disabled}
                onChange={e => setCredenciamento(e.target.value)}
              />
              <TextField
                className="create-institution-textfield"
                variant="standard"
                type="text"
                name="mantenedora"
                required
                placeholder="Mantenedora"
                value={mantenedora}
                disabled={disabled}
                onChange={e => setMantenedora(e.target.value)}
              />
            </div>
            <div className="create-institution-button-container">
              <Button
                type="submit"
                disabled={disabled}
                className="create-institution-button"
                variant="contained"
              >
                Concluir
              </Button>
            </div>
          </form>
        </div>
      </Paper>
      <ToastContainer />
    </div>
  );
}

export default CreateInstitution;
