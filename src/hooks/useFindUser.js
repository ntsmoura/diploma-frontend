import { useState, useEffect } from "react";
import api from "../api";
export default function useFindUser() {
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    async function findUser(token) {
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
    isLoading,
  };
}
