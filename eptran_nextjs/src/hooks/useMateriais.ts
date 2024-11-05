import { useEffect, useState } from "react";

interface Material {
  id: number;
  titulo: string;
  descricao: string;
  escolaridade: string;
  material: string;
}

interface MateriaisResponse {
  materiaisInfo: Material[];
  totalMateriais: number;
  totalPages: number;
  currentPage: number;
}

const useMateriais = () => {
  const [materiais, setMateriais] = useState<Material[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMateriais = async () => {
      try {
        const response = await fetch("http://localhost:3333/materiais/list");
        if (!response.ok) {
          throw new Error("Erro ao buscar materiais");
        }
        const data: MateriaisResponse = await response.json();
        setMateriais(data.materiaisInfo);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    };

    fetchMateriais();
  }, []);

  return { materiais, loading, error };
};

export default useMateriais;
