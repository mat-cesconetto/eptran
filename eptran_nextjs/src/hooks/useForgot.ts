// useCadastro.ts
import { useState } from 'react';

interface User {
  email: string;
}

export const useForgot = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    setError(null);

    // Formata os dados conforme esperado pelo backend
    const userData: User = {
      email: email,
    };

    console.log('Dados sendo enviados:', userData);

    try {
      const response = await fetch('http://localhost:3333/reset/request-password-reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      console.log('Status da resposta:', response.status);
      const data = await response.json();
      console.log('Resposta do servidor:', data);

      if (!response.ok) {
        throw new Error(data.error || data.details || 'Erro ao cadastrar usuário');
      }

      return data;
    } catch (err) {
      console.error('Erro completo:', err);
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido ao cadastrar';
      setError(new Error(errorMessage));
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    forgotPassword,
    isLoading,
    error,
  };
};