import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { UserContext } from "./UserContext";

export default function useAuth() {
  let navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState(null);
  //set user in context and push them home
  const setUserContext = async (token) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return await api
      .get("/usuario", config)
      .then((res) => {
        setUser(res.data);
        navigate("/home");
      })
      .catch((err) => {
        setError(err);
      });
  };

  const login = async (data) => {
    const { cpf, senha } = data;
    return api
      .post("/acesso/login", { cpf, senha })
      .then(async (res) => {
        await setUserContext(res.data.acessoToken);
      })
      .catch((err) => {
        setError(err);
      });
  };

  return {
    login,
    error,
  };
}
