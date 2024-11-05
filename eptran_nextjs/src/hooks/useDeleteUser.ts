import { useState } from "react";

export const useDeleteUser = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteUser = async (userId: string) => {
    setIsDeleting(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:3333/user/delete/${userId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao excluir o usuário.");
      }

      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido.");
      console.error("Erro completo:", err);
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteUser, isDeleting, error };
};
