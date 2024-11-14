import { useState } from 'react';
import { Material } from "@/@types/Material"

interface MaterialType {
  escolaridade: string;
  titulo: string;
  descricao: string;
  materialLink: string;
}

const useAddMaterial = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addMaterial = async (material: MaterialType) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3333/materiais/create', {
        method: 'POST',
        credentials: 'include',  // Para enviar cookies se necessário
        headers: {
          'Content-Type': 'application/json',  // Certificando-se que está enviando JSON
        },
        body: JSON.stringify(material),  // Enviando o material no formato JSON
      });

      if (!response.ok) {
        // Caso o servidor retorne um erro, tente pegar a mensagem de erro do backend
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao adicionar o material');
      }

      const data = await response.json();
      console.log('Material adicionado:', data);

      // Você pode adicionar mais ações aqui após o sucesso, como limpar campos ou exibir notificações
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  return { addMaterial, loading, error };
};

export default useAddMaterial;