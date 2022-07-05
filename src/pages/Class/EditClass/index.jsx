import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

function EditClass() {
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
  const params = useParams();

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  //eslint
  useEffect(() => {
    api
      .get("/curso", {
        headers: { eMEC: params.eMEC, Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setEMec(response.data.eMEC);
        setNome(response.data.nome);
        setGrau(response.data.grau);
        setAutorização(response.data.autorização);
        setReconhecimento(response.data.reconhecimento);
        setRenovação(response.data.renovação);
        setObservação(response.data.observação);
      });
    // eslint-disable-next-line
  }, []);

  const editSelectedClass = async event => {
    event.preventDefault();
    await api
      .patch(
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
    <div className="edit-class-page">
      <Paper className="edit-class-paper" elevation={8}>
        <Menu user={user} />
        <div className="edit-class-paper-content">
          <form className="edit-class-form" onSubmit={editSelectedClass}>
            <div className="edit-class-input-container">
              <TextField
                className="edit-class-textfield"
                type="text"
                name="eMEC"
                required
                placeholder="eMEC"
                value={eMEC}
                variant="standard"
                disabled
              />
              <TextField
                className="edit-class-textfield"
                variant="standard"
                type="text"
                name="nome"
                required
                placeholder="Nome"
                value={nome}
                onChange={e => setNome(e.target.value)}
              />
              <TextField
                className="edit-class-textfield"
                variant="standard"
                type="text"
                name="grau"
                required
                placeholder="Grau"
                value={grau}
                onChange={e => setGrau(e.target.value)}
              />
              <TextField
                className="edit-class-textfield"
                variant="standard"
                type="text"
                name="autorização"
                required
                placeholder="Autorização"
                value={autorização}
                onChange={e => setAutorização(e.target.value)}
              />
              <TextField
                className="edit-class-textfield"
                variant="standard"
                type="text"
                name="reconhecimento"
                required
                placeholder="Reconhecimento"
                value={reconhecimento}
                onChange={e => setReconhecimento(e.target.value)}
              />
              <TextField
                className="edit-class-textfield"
                variant="standard"
                type="text"
                name="renovação"
                required
                placeholder="Renovação"
                value={renovação}
                onChange={e => setRenovação(e.target.value)}
              />
              <TextField
                className="edit-class-textfield"
                variant="standard"
                type="text"
                name="observação"
                required
                placeholder="observação"
                value={observação}
                onChange={e => setObservação(e.target.value)}
              />
            </div>
            <div className="edit-class-button-container">
              <Button
                type="submit"
                className="edit-class-button"
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

export default EditClass;
