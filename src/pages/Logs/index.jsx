import React, { useState, useContext, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Paper } from "@mui/material";
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

function Logs() {
  const [logs, setLogs] = useState([]);
  const { user } = useContext(UserContext);
  const cookies = new Cookies();
  const token = cookies.get("token");

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  useEffect(() => {
    getLogs();
    // eslint-disable-next-line
  }, []);

  const returnLogObject = item => {
    let value = {};
    value.id = item.id;
    value.date = new Date(item.data).toLocaleString("pt-BR", {
      timeZone: "America/Bahia"
    });
    value.user = item.usuario;
    if (item.tipo === "Criar") value.type = "Solicitação";
    else value.type = "Validação";
    value.status = item.novo.status;
    value.key = item.chave;
    value.info = item.novo.motivo;
    return value;
  };

  const getLogs = async () => {
    await api
      .get("/auditoria/all", config)
      .then(res => {
        const logArray = [];
        res.data.forEach(item => {
          logArray.push(returnLogObject(item));
        });
        setLogs(logArray);
      })
      .catch(err => {
        setLogs([]);
      });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "date", headerName: "Data", width: 180 },
    { field: "user", headerName: "Usuário (CPF)", width: 150 },
    { field: "key", headerName: "e-MEC", width: 150 },
    { field: "type", headerName: "Ação", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "info", headerName: "Motivo", width: 200 }
  ];

  return (
    <div className="view-log-page">
      <Paper className="view-log-paper" elevation={8}>
        <Menu user={user} />
        <div className="view-log-paper-content">
          <DataGrid
            style={{ height: "100%", width: "100%" }}
            rows={logs}
            columns={columns}
            /*getRowId={row => row.cpf}*/
            pageSize={4}
            rowsPerPageOptions={[5]}
          />
        </div>
      </Paper>
      <ToastContainer />
    </div>
  );
}

export default Logs;
