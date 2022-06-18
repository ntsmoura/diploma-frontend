import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { UserContext } from "./UserContext";

export default function useAuth() {
  let navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  //set user in context and push them home
  const setUserContext = async (token) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return new Promise((resolve, reject) => {
      api
        .get("/usuario", config)
        .then((res) => {
          setUser(res.data);
          navigate("/home");
          resolve();
        })
        .catch(reject());
    });
  };

  const login = async (data) => {
    const { cpf, senha } = data;
    return new Promise((resolve, reject) => {
      api
        .post("/acesso/login", { cpf, senha })
        .then(async (res) => {
          await setUserContext(res.data.acessoToken);
          resolve();
        })
        .catch(reject());
    });
  };

  return login;
}
