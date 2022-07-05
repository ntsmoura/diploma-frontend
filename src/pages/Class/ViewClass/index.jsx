import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField
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

function ViewClass() {
  const [selectedClass, setSelectedClass] = useState("");
  const [buttonDisable, setButtonDisable] = useState(true);
  const [open, setOpen] = useState(false);
  const [openDegree, setOpenDegree] = useState(false);
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [refresh, setRefresh] = useState(false);
  const [anexo, setAnexo] = useState("");

  useEffect(() => {
    getClasses();
    setRefresh(false);
    // eslint-disable-next-line
  }, [refresh]);

  const returnClassObject = item => {
    let value = {};
    value.id = item.eMEC;
    value.name = item.nome;
    value.grade = item.grau;
    value.auth = item.autorização;
    value.rec = item.reconhecimento;
    value.ren = item.renovação;
    value.obs = item.observação;
    return value;
  };

  const getClasses = async () => {
    await api
      .get("/curso/instituicaoId", {
        headers: {
          id: user.instituicao.id,
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        const classArray = [];
        res.data.forEach(item => {
          classArray.push(returnClassObject(item));
        });
        setClasses(classArray);
      })
      .catch(err => {
        console.log(err);
        setClasses([]);
      });
  };

  const deleteClass = async () => {
    await api
      .delete("/curso", {
        headers: { eMEC: selectedClass, Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setRefresh(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const submitDegree = async () => {
    if (anexo !== "") {
      await api
        .post(
          "/diploma",
          { eMEC: selectedClass, anexo },
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )
        .then(res => {
          toast.success(`Diploma do curso ${selectedClass} solicitado!`);
        })
        .catch(err => {
          toast.error("Algo aconteceu, tente novamente mais tarde!");
        });
      setOpenDegree(false);
    } else {
      toast.error("É preciso incluir os anexos.");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseDegree = () => {
    setOpenDegree(false);
  };

  const columns = [
    { field: "id", headerName: "eMEC", width: 150 },
    { field: "name", headerName: "Nome", width: 150 },
    { field: "grade", headerName: "Grau", width: 150 },
    { field: "auth", headerName: "Autorização", width: 150 },
    { field: "rec", headerName: "Reconhecimento", width: 150 },
    { field: "ren", headerName: "Renovação", width: 150 },
    { field: "obs", headerName: "Observação", width: 150 }
  ];

  return (
    <div className="view-class-page">
      <Paper className="view-class-paper" elevation={8}>
        <Menu user={user} />
        <div className="view-class-paper-content">
          <DataGrid
            style={{ height: "100%", width: "100%" }}
            rows={classes}
            columns={columns}
            /*getRowId={row => row.cpf}*/
            pageSize={4}
            rowsPerPageOptions={[5]}
            onSelectionModelChange={ids => {
              if (ids[0]) {
                setSelectedClass(ids[0]);
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
                navigate("/class/create");
              }}
              variant="contained"
            >
              Criar Curso
            </Button>
            <Button
              id="edit-button"
              disabled={buttonDisable}
              onClick={() => {
                navigate("/class/edit/" + selectedClass);
              }}
              variant="contained"
            >
              Editar Curso
            </Button>
            <Button
              id="delete-button"
              disabled={buttonDisable}
              onClick={() => {
                setOpen(true);
              }}
              variant="contained"
            >
              Deletar Curso
            </Button>
            <Button
              id="degree-button"
              disabled={buttonDisable}
              onClick={() => {
                setOpenDegree(true);
              }}
              variant="contained"
            >
              Solicitar Diploma
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
            Quer realmente deletar o curso: {selectedClass}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
              deleteClass();
            }}
          >
            Sim
          </Button>
          <Button onClick={handleClose} autoFocus>
            Não
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDegree} onClose={handleCloseDegree}>
        <DialogTitle>Solicitar diploma</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Anexe os arquivos necessários para a validação do diploma.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Anexos"
            type="text"
            fullWidth
            variant="standard"
            value={anexo}
            required
            onChange={e => setAnexo(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDegree}>Cancelar</Button>
          <Button onClick={submitDegree}>Submeter</Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </div>
  );
}

export default ViewClass;
