'use client'

import React, { createContext, useState, useContext, useEffect } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (isAdmin: boolean) => void;
  logout: () => void;
  setAdminStatus: (isAdmin: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState({
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
          setAuthState({
            isAuthenticated: true,
            isAdmin: data.data.adm === true,
          });
        } else if (data.error === "Token não fornecido") {
          setAuthState({ isAuthenticated: false, isAdmin: false });
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        setAuthState({ isAuthenticated: false, isAdmin: false });
      }
    };

    checkAuth();
  }, []);

  const login = (isAdmin: boolean) => {
    setAuthState({ isAuthenticated: true, isAdmin });
  };

  const logout = () => {
    setAuthState({ isAuthenticated: false, isAdmin: false });
  };

  const setAdminStatus = (isAdmin: boolean) => {
    setAuthState(prev => ({ ...prev, isAdmin }));
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, setAdminStatus }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};