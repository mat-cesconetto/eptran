import { useState } from "react";

interface EditMaterialType {
  id: number;
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
      const response = await fetch(`http://localhost:3333/materiais/update/${material.id}`, {
        method: "PATCH", // Usando PATCH para atualizar parcialmente os dados
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(material),
      });

      if (!response.ok) {
        throw new Error("Erro ao editar o material");
      }

      const data = await response.json();
      console.log("Material editado:", data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  return { editMaterial, loading, error };
};

export default useEditMaterial;