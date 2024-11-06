// src/hooks/useUserData.ts
'use client'
import useSWR from 'swr';

const fetcher = async (url: string) => {
  const res = await fetch(url, {
    credentials: "include",
  });

  if (!res.ok) {
    if (res.status === 401) {
      throw new Error("Unauthorized");
    }
    throw new Error("An error occurred while fetching the data.");
  }

  return res.json();
};

export const useUser = () => {
  const { data, error } = useSWR("http://localhost:3333/user/info", fetcher);

  return {
    userName: data?.data?.nome || "",
    userEmail: data?.data?.email || "",
    userCep: data?.data?.cep || "",
    userRua: data?.data?.rua || "",
    userBairro: data?.data?.bairro || "",
    userCidade: data?.data?.cidade || "",
    userEstado: data?.data?.estado || "",
    userEscola: data?.data?.escola || "",
    userDataNasc: data?.data?.data_nasc || "",
    userEscolaridade: data?.data?.escolaridade || "",
    userSexo: data?.data?.sexo || "",
    isLoading: !error && !data,
    isLoggedOut: error?.message === "Unauthorized",
  };
};