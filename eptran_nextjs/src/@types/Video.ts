// Define a estrutura de um vídeo individual
export interface Video {
  id: number;
  titulo: string;
  descricao: string;
  escolaridade: string;
  video: string;
}

// Define a estrutura da resposta da API
export interface VideosResponse {
  videosInfo: Video[];
  totalVideos: number;
  totalPages: number;
  currentPage: number;
}

// Define a estrutura de retorno do hook `useListVideos`
export interface UseListVideosReturn {
  videos: Video[];
  totalPages: number;
  isLoading: boolean;
  isError: any;
  mutate: () => void;
  isValidating: boolean;
}
