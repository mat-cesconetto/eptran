import { useApiBase } from './useApiBase';
import { MateriaisResponse, Material } from '@/@types/Material';

interface UseMateriaisReturn {
  materiais: Material[];
  totalPages: number;
  isLoading: boolean;
  isError: boolean | null;
  mutate: () => void;
}

export function useMateriais(page: number = 1): UseMateriaisReturn {
  const { data, error, mutate, isLoading, isValidating } = useApiBase<MateriaisResponse>(
    `materiais/list?page=${page}`
  );

  return {
    materiais: data?.materiaisInfo || [],
    totalPages: data ? data.totalPages : 0,
    isLoading,
    isError: error,
    mutate,
  };
}
