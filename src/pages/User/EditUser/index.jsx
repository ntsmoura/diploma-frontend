import React, { useContext } from "react";
//mport { ToastContainer, toast } from "react-toastify";
import { Paper, Typography } from "@mui/material";
import { UserContext } from "../../../contexts/UserContext";
import Menu from "../../../components/Menu";
import "./style.css";
import "react-toastify/dist/ReactToastify.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function EditUser() {
  const { user } = useContext(UserContext);
  //const [selectedUser, setSelectedUser] = useState({});
  return (
    <div className="edit-user-page">
      <Paper className="edit-user-paper" elevation={8}>
        <Menu user={user} />
        <div className="edit-user-paper-content">
          <Typography id="edit-user-typo" variant="h4">
            EDITAR USUÁRIO
          </Typography>
        </div>
      </Paper>
    </div>
  );
}

export default EditUser;
