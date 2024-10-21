import { useState } from 'react';

interface User {
  nome: string;
  email: string;
  senha: string;
  cep: string;
  rua: string;
  cidade: string;
  estado: string;
  escola: string;
  data_nasc: string;
  escolaridade: string;
  sexo: string;
}

export const useAlter = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Agora usando Partial<User> para enviar apenas os dados que foram alterados
  const alterUser = async (updates: Partial<User>) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3333/user/update-info', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          credentials: 'include'
        },
        body: JSON.stringify(updates), // Enviando apenas os dados modificados
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.details || 'Erro ao alterar os dados do usuário');
      }

      return data;
    } catch (err) {
      console.error('Erro completo:', err);
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido ao alterar os dados do usuário';
      setError(new Error(errorMessage));
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    alterUser,
    isLoading,
    error,
  };
};
