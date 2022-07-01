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

function Partner() {
  const [selectedPartner, setSelectedPartner] = useState(0);
  const [buttonDisable, setButtonDisable] = useState(true);
  const [open, setOpen] = useState(false);
  const [partners, setPartners] = useState([]);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const cookies = new Cookies();
  const token = cookies.get("token");
  const [refresh, setRefresh] = useState(false);

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  useEffect(() => {
    getPartners();
    setRefresh(false);
    // eslint-disable-next-line
  }, [refresh]);

  const returnPartnerObject = item => {
    let value = {};
    value.id = item.id;
    value.name = item.nome;
    value.city = item.cidade;
    value.state = item.estado;
    value.credentials = item.credenciamento;
    if (item.acesso) value.access = "Sim";
    else value.access = "Não";
    return value;
  };

  const getPartners = async () => {
    await api
      .get("/instituicao/all", config)
      .then(res => {
        const partnerArray = [];
        res.data.forEach(item => {
          if (item.tipo) {
            if (item.tipo === "parceira") {
              partnerArray.push(returnPartnerObject(item));
            }
          }
        });
        setPartners(partnerArray);
      })
      .catch(err => {
        console.log(err);
        setPartners([]);
      });
  };

  const validatePartner = async () => {
    await api
      .patch(
        "/instituicao/liberarAcesso",
        {},
        {
          headers: { Authorization: `Bearer ${token}`, id: selectedPartner }
        }
      )
      .then(res => {
        setRefresh(true);
        navigate("/institution/partner");
        toast.success("Parceiro autorizado!");
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    { field: "id", headerName: "Id", width: 100 },
    { field: "name", headerName: "Nome", width: 200 },
    { field: "city", headerName: "Cidade", width: 180 },
    { field: "state", headerName: "Estado", width: 180 },
    { field: "credentials", headerName: "Credenciais", width: 180 },
    { field: "access", headerName: "Autorizado?", width: 100 }
  ];

  return (
    <div className="partner-page">
      <Paper className="partner-paper" elevation={8}>
        <Menu user={user} />
        <div className="partner-paper-content">
          <DataGrid
            style={{ height: "100%", width: "100%" }}
            rows={partners}
            columns={columns}
            pageSize={4}
            rowsPerPageOptions={[5]}
            onSelectionModelChange={ids => {
              if (ids[0]) {
                setSelectedPartner(ids[0]);
                setButtonDisable(false);
              } else {
                setButtonDisable(true);
              }
            }}
          />
          <div className="button-container">
            <Button
              id="validate-button"
              disabled={buttonDisable}
              onClick={() => {
                setOpen(true);
              }}
              variant="contained"
            >
              Autorizar Parceira
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
            Quer realmente autorizar a parceira de identificação:
            {selectedPartner}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
              validatePartner();
            }}
          >
            Sim
          </Button>
          <Button onClick={handleClose} autoFocus>
            Não
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </div>
  );
}

export default Partner;
