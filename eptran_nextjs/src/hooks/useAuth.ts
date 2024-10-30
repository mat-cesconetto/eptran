// src/hooks/useAuth.ts
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:3333/user/info", {
          method: "GET",
          credentials: "include", // Inclui cookies na requisição
        });

        const data = await response.json();

        // Verifica se o usuário está autenticado
        if (response.ok && data?.data) {
          setIsAuthenticated(true);
        } else if (data.error === "Token não fornecido") {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  return isAuthenticated;
};
