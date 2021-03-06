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
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getUsers();
    setRefresh(false);
    // eslint-disable-next-line
  }, [refresh]);

  const returnUserObject = item => {
    let value = {};
    value.id = item.cpf;
    value.name = item.nome;
    value.office = item.cargo;
    value.cnumber = item.telefone;
    value.lastname = item.sobrenome;
    value.email = item.email;
    return value;
  };

  const getUsers = async () => {
    await api
      .get("/usuario/instituicaoId", {
        headers: {
          id: user.instituicao.id,
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        const userArray = [];
        res.data.forEach(item => {
          userArray.push(returnUserObject(item));
        });
        setUsers(userArray);
      })
      .catch(err => {
        console.log(err);
        setUsers([]);
      });
  };

  const deleteUser = async () => {
    await api
      .delete("/usuario", {
        headers: { cpf: selectedUserCpf, Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setRefresh(true);
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
    { field: "name", headerName: "Nome", width: 180 },
    { field: "lastname", headerName: "Sobrenome", width: 180 },
    { field: "office", headerName: "Cargo", width: 250 },
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
            pageSize={4}
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
              Criar Usu??rio
            </Button>
            <Button
              id="edit-button"
              disabled={buttonDisable}
              onClick={() => {
                navigate("/user/edit/" + selectedUserCpf);
              }}
              variant="contained"
            >
              Editar Usu??rio
            </Button>
            <Button
              id="delete-button"
              disabled={buttonDisable}
              onClick={() => {
                setOpen(true);
              }}
              variant="contained"
            >
              Deletar Usu??rio
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
            Quer realmente deletar o usu??rio de CPF: {selectedUserCpf}?
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
            N??o
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ViewUser;
