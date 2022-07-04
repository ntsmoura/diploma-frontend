import { useContext } from "react";
///import { useNavigate } from "react-router-dom";
import api from "../api";
import { UserContext } from "../contexts/UserContext";
import Cookies from "universal-cookie";

export default function useAuth() {
  const cookies = new Cookies();
  const { setUser } = useContext(UserContext);
  //const navigate = useNavigate();

  /*const setUserContext = async token => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    api.get("/usuario", config).then(res => {
      setUser(res.data);
    });
  };*/

  const login = async data => {
    const { cpf, senha } = data;
    return new Promise((resolve, reject) => {
      api
        .post("/acesso/login", { cpf, senha })
        .then(async res => {
          const token = res.data.acessoToken;
          cookies.set("token", token, {
            path: "/",
            sameSite: "strict",
            expires: new Date(new Date().getTime() + 60 * 60000)
          });
          await api
            .get("/usuario", { headers: { Authorization: `Bearer ${token}` } })
            .then(res => {
              setUser(res.data);
            });
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  const logout = async () => {
    return new Promise((resolve, reject) => {
      try {
        cookies.remove("token");
        setUser(undefined);
        resolve();
      } catch {
        reject();
      }
    });
  };

  return { login, logout };
}
