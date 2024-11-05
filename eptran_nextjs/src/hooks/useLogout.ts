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
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include',
      });

      console.log('Status da resposta:', response.status);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Erro ao realizar logout');
      }

      return true;
    } catch (err) {
      console.error('Erro completo:', err);
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido ao realizar logout';
      setError(new Error(errorMessage));
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    logoutUser,
    isLoading,
    error,
  };
};
