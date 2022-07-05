import React, { useState, useContext, useEffect } from "react";
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
import { UserContext } from "../../contexts/UserContext";
import Menu from "../../components/Menu";
import api from "../../api";
//import { UserContext } from "../contexts/UserContext";
import Cookies from "universal-cookie";
import "./style.css";
import "react-toastify/dist/ReactToastify.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function Degree() {
  const [selectedDegree, setSelectedDegree] = useState("");
  const [buttonDisable, setButtonDisable] = useState(true);
  const [openDegree, setOpenDegree] = useState(false);
  const [degrees, setDegrees] = useState([]);
  const { user } = useContext(UserContext);
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [refresh, setRefresh] = useState(false);
  const [motivo, setMotivo] = useState("");
  const [status, setStatus] = useState("");

  const validEMecs = [
    "123456",
    "654321",
    "063887",
    "314637",
    "722389",
    "469206",
    "805260",
    "383545",
    "728166"
  ];

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  useEffect(() => {
    getDegrees();
    setRefresh(false);
    // eslint-disable-next-line
  }, [refresh]);

  const returnDegreeObject = item => {
    let value = {};
    value.id = item.id;
    value.date = new Date(item.data).toLocaleDateString();
    value.attachment = item.anexo;
    value.status = item.status;
    value.class = item.curso.eMEC;
    return value;
  };

  const getDegrees = async () => {
    await api
      .get("/diploma/all", config)
      .then(res => {
        const degreeArray = [];
        res.data.forEach(item => {
          degreeArray.push(returnDegreeObject(item));
        });
        setDegrees(degreeArray);
      })
      .catch(err => {
        setDegrees([]);
      });
  };

  const validateDegree = async () => {
    if (motivo !== "") {
      await api
        .patch("/diploma", { id: selectedDegree, status, motivo }, config)
        .then(res => {
          toast.success("Status do diploma alterado!");
          setMotivo("");
          setRefresh(true);
        })
        .catch(err => {
          toast.error("Algo aconteceu, tente novamente mais tarde!");
          setMotivo("");
        });
      setOpenDegree(false);
    } else {
      toast.error("É preciso incluir o motivo!");
    }
  };

  const handleCloseDegree = () => {
    setOpenDegree(false);
  };

  const findDegreeById = id => {
    let result;
    degrees.forEach(item => {
      if (item.id === id) result = item;
    });
    return result;
  };

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "date", headerName: "Data", width: 150 },
    { field: "attachment", headerName: "Anexos", width: 200 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "class", headerName: "eMEC", width: 150 }
  ];

  return (
    <div className="view-degree-page">
      <Paper className="view-degree-paper" elevation={8}>
        <Menu user={user} />
        <div className="view-degree-paper-content">
          <DataGrid
            style={{ height: "100%", width: "100%" }}
            rows={degrees}
            columns={columns}
            /*getRowId={row => row.cpf}*/
            pageSize={4}
            rowsPerPageOptions={[5]}
            onSelectionModelChange={ids => {
              if (ids[0]) {
                setSelectedDegree(ids[0]);
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
                setOpenDegree(true);
                setStatus("Válido");
              }}
              variant="contained"
            >
              Validar Diploma
            </Button>
            <Button
              id="delete-button"
              disabled={buttonDisable}
              onClick={() => {
                setOpenDegree(true);
                setStatus("Inválido");
              }}
              variant="contained"
            >
              Invalidar Diploma
            </Button>
            <Button
              id="degree-button"
              disabled={buttonDisable}
              onClick={() => {
                if (validEMecs.includes(findDegreeById(selectedDegree).class))
                  toast.success("Curso do dimploma tem e-MEC válido.");
                else toast.error("Curso do diploma tem e-MEC inválido.");
              }}
              variant="contained"
            >
              Checar e-MEC
            </Button>
          </div>
        </div>
      </Paper>
      <Dialog open={openDegree} onClose={handleCloseDegree}>
        <DialogTitle>Mudar status do diploma.</DialogTitle>
        <DialogContent>
          <DialogContentText>Digite o motivo:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Motivo"
            type="text"
            fullWidth
            variant="standard"
            value={motivo}
            required
            onChange={e => setMotivo(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDegree}>Cancelar</Button>
          <Button onClick={validateDegree}>Submeter</Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </div>
  );
}

export default Degree;
