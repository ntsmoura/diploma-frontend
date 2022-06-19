import { useState, useEffect } from "react";
import api from "../api";
import Cookies from "universal-cookie";
export default function useFindUser() {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    async function findUser() {
      const cookies = new Cookies();
      const token = cookies.get("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await api
        .get("/usuario", config)
        .then((res) => {
          setUser(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
    findUser();
  }, []);
  return {
    user,
    setUser,
    isLoading,
  };
}
