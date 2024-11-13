'use client'

import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (isAdmin: boolean) => void;
  logout: () => void;
  checkAuthStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    isAdmin: false,
  });

  const checkAuthStatus = useCallback(async () => {
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
        console.log("Auth status updated:", { isAuthenticated: true, isAdmin: data.data.adm === true });
      } else if (data.error === "Token não fornecido") {
        setAuthState({ isAuthenticated: false, isAdmin: false });
        console.log("Auth status updated: Not authenticated");
      }
    } catch (error) {
      console.error("Erro ao verificar autenticação:", error);
      setAuthState({ isAuthenticated: false, isAdmin: false });
    }
  }, []);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const login = useCallback((isAdmin: boolean) => {
    setAuthState({ isAuthenticated: true, isAdmin });
    console.log("Login successful. Auth state updated:", { isAuthenticated: true, isAdmin });
  }, []);

  const logout = useCallback(() => {
    setAuthState({ isAuthenticated: false, isAdmin: false });
    console.log("Logout successful. Auth state updated:", { isAuthenticated: false, isAdmin: false });
  }, []);

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, checkAuthStatus }}>
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