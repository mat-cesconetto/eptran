// src/hooks/useLogout.ts
import { useState } from 'react';

export const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const logoutUser = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3333/auth/logout', {
        method: 'POST',
        credentials: 'include', // Inclui cookies de autenticação
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro de logout: ${errorText}`);
      }

      setIsLoading(false);
      return true;
    } catch (err) {
      console.error('Erro completo:', err);
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido ao realizar logout';
      setError(new Error(errorMessage));
      setIsLoading(false);
      throw new Error(errorMessage);
    }
  };

  return { logoutUser, isLoading, error };
};
