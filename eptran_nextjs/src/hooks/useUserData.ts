import useSWR from 'swr';

// Função para buscar dados da API
const fetcher = async (url: string) => {
  const res = await fetch(url, {
    credentials: 'include', // Inclui cookies/credenciais na requisição
  });
  
  if (!res.ok) {
    if (res.status === 401) {
      throw new Error('Unauthorized');
    }
    throw new Error('An error occurred while fetching the data.');
  }

  return res.json();
};

export const useUser = () => {
  const { data, error } = useSWR('http://localhost:3333/user/info', fetcher);

  return {
    userEmail: data?.email || '',
    userName: data?.data?.nome || '',
    isLoading: !error && !data,
    isLoggedOut: error?.message === 'Unauthorized',
  };
};
