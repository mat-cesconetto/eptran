// useConteudos.ts
import useSWR from "swr";
import { useUser } from "./useUserData";

const fetcher = async (url: string) => {
  const res = await fetch(url, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data.");
  }

  return res.json();
};

export const useConteudos = () => {
  const { userEscolaridade } = useUser();

  // Construir o endpoint com base na escolaridade do usuário
  const { data, error } = useSWR(
    userEscolaridade ? `http://localhost:3333/materiais/${userEscolaridade}` : null,
    fetcher
  );

  return {
    conteudos: data?.materiais || [],
    isLoading: !error && !data,
    isError: error,
  };
};
