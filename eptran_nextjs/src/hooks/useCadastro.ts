// useCadastro.ts
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

export const useCadastro = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const registerUser = async (nome: string, email: string, senha: string, cep: string, rua: string, cidade: string, estado: string, escola: string, data_nasc: string, escolaridade: string, sexo: string ) => {
    setIsLoading(true);
    setError(null);

    // Formata os dados conforme esperado pelo backend
    const userData: User = {
      nome: nome,
      email: email,
      senha: senha,
      cep: cep,
      rua: rua,
      cidade: cidade,
      estado: estado,
      escola: escola,
      data_nasc: data_nasc,
      escolaridade: escolaridade,
      sexo: sexo,
    };

    console.log('Dados sendo enviados:', userData);

    try {
      const response = await fetch('http://localhost:3333/auth/register', {
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
    registerUser,
    isLoading,
    error,
  };
};