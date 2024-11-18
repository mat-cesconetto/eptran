import { useState } from "react";

interface DeleteMaterialType {
  id: number;
}

const useDeleteMaterial = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteMaterial = async (materialId: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:3333/materiais/delete/${materialId}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        // Enviando um corpo vazio
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir o material");
      }

      const data = await response.json();
      console.log("Material excluído:", data);
      return data; // Opcional: retorna os dados do material excluído
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  return { deleteMaterial, loading, error };
};

export default useDeleteMaterial;