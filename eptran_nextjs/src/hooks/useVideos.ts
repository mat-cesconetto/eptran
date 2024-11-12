// useVideos.ts (exportação com `default`)
import { useApiBase } from './useApiBase';
import { VideosResponse, UseListVideosReturn } from '@/@types/Video';

export default function useVideos(page: number = 1): UseListVideosReturn {
  const { data, error, mutate, isLoading, isValidating } = useApiBase<VideosResponse>(
    `videos/list?page=${page}`
  );

  return {
    videos: data?.videosInfo || [],
    totalPages: data ? data.totalPages : 0,
    isLoading,
    isError: error,
    mutate,
    isValidating
  };
}
