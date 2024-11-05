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
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(material),
      });

      if (!response.ok) {
        throw new Error('Erro ao adicionar o material');
      }

      const data = await response.json();
      console.log('Material adicionado:', data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  return { addMaterial, loading, error };
};

export default useAddMaterial;