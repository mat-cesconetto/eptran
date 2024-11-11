import { useState } from "react";
import { Video } from "@/@types/Video";

interface VideoType {
  titulo: string;
  descricao: string;
  escolaridade: string;
  video: string;
}

const useAddVideo = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addVideo = async (video: VideoType) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3333/videos/create", {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(video),
      });

      if (!response.ok) {
        throw new Error('Erro ao adicionar o vídeo');
      }

      const data = await response.json();
      console.log('Vídeo adicionado:', data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  return { addVideo, loading, error };
};

export default useAddVideo;