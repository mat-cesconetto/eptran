import { useEffect, useState } from "react";

interface AuthData {
  isAuthenticated: boolean;
  isAdmin: boolean;
}

export const useAuth = (): AuthData => {
  const [authData, setAuthData] = useState<AuthData>({
    isAuthenticated: false,
    isAdmin: false,
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:3333/user/info", {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        if (response.ok && data?.data) {
          console.log("login feito")
          setAuthData({
            isAuthenticated: true,
            isAdmin: data.data.adm === true,
          });
        } else if (data.error === "Token não fornecido") {
          console.log("login assa")
          setAuthData({ isAuthenticated: false, isAdmin: false });
        }
      } catch (error) {
                 console.log("login feito")
        console.error("Erro ao verificar autenticação:", error);
        setAuthData({ isAuthenticated: false, isAdmin: false });
      }
    };

    checkAuth();
  }, []);

  return authData;
};
