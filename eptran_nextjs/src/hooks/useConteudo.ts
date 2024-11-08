// src/hooks/useMateriais.ts
'use client'
import useSWR from 'swr';
import { useUser } from './useUserData';

interface Material {
  id: number;
  titulo: string;
  descricao: string;
  materialLink: string;
  escolaridade: string;
  createdAt: string;
  updatedAt: string;
}

const fetcher = async (url: string) => {
  const res = await fetch(url, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar materiais");
  }

  return res.json();
};

export const useMateriais = () => {
  const { userEscolaridade } = useUser();
  const { data, error } = useSWR(
    userEscolaridade ? `http://localhost:3333/materiais/${userEscolaridade}` : null,
    fetcher
  );

  return {
    materiais: data?.materiais as Material[] || [],
    isLoading: !error && !data,
    isError: error
  };
};