import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { UserContext } from "../contexts/UserContext";
import Cookies from "universal-cookie";

export default function useAuth() {
  const cookies = new Cookies();
  const navigate = useNavigate();
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
          const token = res.data.acessoToken;
          cookies.set("token", token, {
            path: "/",
            sameSite: "strict",
            expires: new Date(new Date().getTime() + 15 * 60000),
          });
          await setUserContext(token);
          resolve();
        })
        .catch(reject());
    });
  };

  const logout = async () => {
    return new Promise((resolve, reject) => {
      try {
        cookies.remove("token");
        navigate("/login");
        resolve();
      } catch {
        reject();
      }
    });
  };

  return { login, logout };
}
