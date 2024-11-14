import { useState } from 'react';

interface EditMaterialType {
  id: number; // ID do material que será editado
  escolaridade: string;
  titulo: string;
  descricao: string;
  materialLink: string;
}

const useEditMaterial = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editMaterial = async (material: EditMaterialType) => {
    setLoading(true);
    setError(null);

    try {
      // Alterei de 'PUT' para 'PATCH' para refletir o método correto
      const response = await fetch(`http://localhost:3333/materiais/update/${material.id}`, {
        method: 'PATCH', // Usando PATCH para atualizar parcialmente os dados
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(material), // Passando os dados no corpo da requisição
      });

      if (!response.ok) {
        throw new Error('Erro ao editar o material');
      }

      const data = await response.json();
      console.log('Material editado:', data);  // Aqui você pode realizar outras ações com o material editado
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  return { editMaterial, loading, error };
};

export default useEditMaterial;