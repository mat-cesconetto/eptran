import { useEffect, useState } from "react";

interface Video {
  id: number;
  titulo: string;
  descricao: string;
  videoLink: string;
  escolaridade: string;
  createdAt: string;
  updatedAt: string;
}

interface VideoResponse {
  success: boolean;
  videos: Video[];
}

export const useVideos = (escolaridade: string) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`http://localhost:3333/videos/${escolaridade}`);
        const data: VideoResponse = await response.json();
        if (data.success) {
          setVideos(data.videos);
        } else {
          throw new Error("Failed to load videos");
        }
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [escolaridade]);

  return { videos, loading, error };
};
