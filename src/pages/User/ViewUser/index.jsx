import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//import { ToastContainer, toast } from "react-toastify";
import {
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
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

function ViewUser() {
  const [selectedUserCpf, setSelectedUserCpf] = useState("");
  const [buttonDisable, setButtonDisable] = useState(true);
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const cookies = new Cookies();
  const token = cookies.get("token");

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, []);

  const getUsers = async () => {
    await api
      .get("/usuario/all", config)
      .then(res => {
        const userArray = [];
        res.data.forEach((item, index) => {
          let value = {};
          value.id = item.cpf;
          value.name = item.nome;
          value.office = item.cargo;
          value.cnumber = item.telefone;
          value.lastname = item.sobrenome;
          value.email = item.email;
          userArray.push(value);
        });
        setUsers(userArray);
      })
      .catch(() => {
        setUsers(null);
      });
  };

  const deleteUser = async () => {
    await api
      .delete("/usuario", config)
      .then(res => {
        navigate("/user");
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    { field: "id", headerName: "CPF", width: 150 },
    { field: "name", headerName: "Nome", width: 150 },
    { field: "lastname", headerName: "Sobrenome", width: 150 },
    { field: "office", headerName: "Cargo", width: 130 },
    { field: "cnumber", headerName: "Telefone", width: 130 },
    { field: "email", headerName: "E-mail", width: 180 }
  ];

  return (
    <div className="view-user-page">
      <Paper className="view-user-paper" elevation={8}>
        <Menu user={user} />
        <div className="view-user-paper-content">
          <DataGrid
            style={{ height: "100%", width: "100%" }}
            rows={users}
            columns={columns}
            /*getRowId={row => row.cpf}*/
            pageSize={5}
            rowsPerPageOptions={[5]}
            onSelectionModelChange={ids => {
              if (ids[0]) {
                setSelectedUserCpf(ids[0]);
                setButtonDisable(false);
              } else {
                setButtonDisable(true);
              }
            }}
          />
          <div className="button-container">
            <Button
              id="create-button"
              onClick={() => {
                navigate("/user/create");
              }}
              variant="contained"
            >
              Criar Usuário
            </Button>
            <Button
              id="edit-button"
              disabled={buttonDisable}
              onClick={() => {
                console.log("editar");
              }}
              variant="contained"
            >
              Editar Usuário
            </Button>
            <Button
              id="delete-button"
              disabled={buttonDisable}
              onClick={() => {
                setOpen(true);
              }}
              variant="contained"
            >
              Deletar Usuário
            </Button>
          </div>
        </div>
      </Paper>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Tem certeza?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Quer realmente deletar o usuário de CPF: {selectedUserCpf}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
              deleteUser();
            }}
          >
            Sim
          </Button>
          <Button onClick={handleClose} autoFocus>
            Não
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ViewUser;
