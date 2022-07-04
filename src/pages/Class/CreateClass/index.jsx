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
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function CreateClass() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [eMEC, setEMec] = useState("");
  const [grau, setGrau] = useState("");
  const [nome, setNome] = useState("");
  const [autorização, setAutorização] = useState("");
  const [reconhecimento, setReconhecimento] = useState("");
  const [renovação, setRenovação] = useState("");
  const [observação, setObservação] = useState("");

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const createNewClass = async event => {
    event.preventDefault();
    await api
      .post(
        "/curso",
        {
          eMEC,
          grau,
          nome,
          autorização,
          reconhecimento,
          renovação,
          observação
        },
        config
      )
      .then(res => {
        navigate("/class");
      })
      .catch(err => {
        toast.error(err.response.message);
      });
  };

  return (
    <div className="create-class-page">
      <Paper className="create-class-paper" elevation={8}>
        <Menu user={user} />
        <div className="create-class-paper-content">
          <form className="create-class-form" onSubmit={createNewClass}>
            <div className="create-class-input-container">
              <TextField
                className="create-class-textfield"
                type="text"
                name="eMEC"
                required
                placeholder="eMEC"
                value={eMEC}
                variant="standard"
                onChange={e => setEMec(e.target.value)}
              />
              <TextField
                className="create-class-textfield"
                variant="standard"
                type="text"
                name="nome"
                required
                placeholder="Nome"
                value={nome}
                onChange={e => setNome(e.target.value)}
              />
              <TextField
                className="create-class-textfield"
                variant="standard"
                type="text"
                name="grau"
                required
                placeholder="Grau"
                value={grau}
                onChange={e => setGrau(e.target.value)}
              />
              <TextField
                className="create-class-textfield"
                variant="standard"
                type="text"
                name="autorização"
                required
                placeholder="Autorização"
                value={autorização}
                onChange={e => setAutorização(e.target.value)}
              />
              <TextField
                className="create-class-textfield"
                variant="standard"
                type="text"
                name="reconhecimento"
                required
                placeholder="Reconhecimento"
                value={reconhecimento}
                onChange={e => setReconhecimento(e.target.value)}
              />
              <TextField
                className="create-class-textfield"
                variant="standard"
                type="text"
                name="renovação"
                required
                placeholder="Renovação"
                value={renovação}
                onChange={e => setRenovação(e.target.value)}
              />
              <TextField
                className="create-class-textfield"
                variant="standard"
                type="text"
                name="observação"
                required
                placeholder="observação"
                value={observação}
                onChange={e => setObservação(e.target.value)}
              />
            </div>
            <div className="create-class-button-container">
              <Button
                type="submit"
                className="create-class-button"
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

export default CreateClass;
