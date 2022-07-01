import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

function EditInstitution() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [credenciamento, setCredenciamento] = useState("");
  const [mantenedora, setMantenedora] = useState("");

  useEffect(() => {
    if (user.instituicao) {
      const instituicao = user.instituicao;
      setNome(instituicao.nome);
      setEndereco(instituicao.endereco);
      setCidade(instituicao.cidade);
      setEstado(instituicao.estado);
      setCredenciamento(instituicao.credenciamento);
      setMantenedora(instituicao.mantenedora);
    }
    // eslint-disable-next-line
  }, []);

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const editInstitution = async event => {
    event.preventDefault();
    await api
      .patch(
        "/instituicao",
        {
          id: user.instituicao.id,
          nome,
          endereco,
          cidade,
          estado,
          credenciamento,
          mantenedora
        },
        config
      )
      .then(res => {
        api.get("/usuario", config).then(res => {
          setUser(res.data);
          navigate("/institution/edit");
          toast.success("Instituição atualizada!");
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="edit-institution-page">
      <Paper className="edit-institution-paper" elevation={8}>
        <Menu user={user} />
        <div className="edit-institution-paper-content">
          <form className="edit-institution-form" onSubmit={editInstitution}>
            <div className="edit-institution-input-container">
              <TextField
                className="edit-institution-textfield"
                variant="standard"
                type="text"
                name="nome"
                requiredtoast
                placeholder="Nome"
                value={nome}
                onChange={e => setNome(e.target.value)}
              />
              <TextField
                className="edit-institution-textfield"
                variant="standard"
                type="text"
                name="endereco"
                required
                placeholder="Endereço"
                value={endereco}
                onChange={e => setEndereco(e.target.value)}
              />
              <TextField
                className="edit-institution-textfield"
                variant="standard"
                type="text"
                name="cidade"
                required
                placeholder="Cidade"
                value={cidade}
                onChange={e => setCidade(e.target.value)}
              />
              <TextField
                className="edit-institution-textfield"
                variant="standard"
                type="text"
                name="estado"
                required
                placeholder="Estado"
                value={estado}
                onChange={e => setEstado(e.target.value)}
              />
              <TextField
                className="edit-institution-textfield"
                variant="standard"
                type="text"
                name="credenciamento"
                required
                placeholder="Credenciamento"
                value={credenciamento}
                onChange={e => setCredenciamento(e.target.value)}
              />
              <TextField
                className="edit-institution-textfield"
                variant="standard"
                type="text"
                name="mantenedora"
                required
                placeholder="Mantenedora"
                value={mantenedora}
                onChange={e => setMantenedora(e.target.value)}
              />
            </div>
            <div className="edit-institution-button-container">
              <Button
                type="submit"
                className="edit-institution-button"
                variant="contained"
              >
                Editar
              </Button>
            </div>
          </form>
        </div>
      </Paper>
      <ToastContainer />
    </div>
  );
}

export default EditInstitution;
