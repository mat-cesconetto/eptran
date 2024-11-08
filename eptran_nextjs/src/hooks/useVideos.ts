import { useEffect, useState } from "react";

interface Video {
  id: number;
  titulo: string;
  descricao: string;
  escolaridade: string;
  video: string;
}

interface VideosResponse {
  videosInfo: Video[];
  totalVideos: number;
  totalPages: number;
  currentPage: number;
}

const useVideos = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("http://localhost:3333/videos/list");
        if (!response.ok) {
          throw new Error("Erro ao buscar vídeos");
        }
        const data: VideosResponse = await response.json();
        setVideos(data.videosInfo);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return { videos, loading, error };
};

export default useVideos;