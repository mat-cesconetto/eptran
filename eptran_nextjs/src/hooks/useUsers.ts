// useUsers.ts

import useSWR from "swr";

interface UserInfo {
  id: number;
  nome: string;
  email: string;
  cidade: string;
  estado: string;
  escola: string;
  data_nasc: string;
  escolaridade: string;
  sexo: string;
  profilePicture: string | null;
}

interface UserResponse {
  userInfo: UserInfo[];
  totalUsers: number;
  totalPages: number;
  currentPage: number;
}

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

export const useUsers = (page: number) => {
  const { data, error } = useSWR<UserResponse>(`http://localhost:3333/user/list?page=${page}`, fetcher);

  return {
    users: data?.userInfo || [],
    totalUsers: data?.totalUsers || 0,
    totalPages: data?.totalPages || 0,
    currentPage: data?.currentPage || page,
    isLoading: !error && !data,
    isLoggedOut: error?.message === "Unauthorized",
  };
};
