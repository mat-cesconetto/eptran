"use client";

import * as React from "react";
import { VideoIcon } from 'lucide-react';
import Footer from "@/app/components/ui/footer";
import { useVideos } from "@/hooks/useVideosUser";

function formatVideoLink(link: string): string {
  const videoIdMatch = link.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^\s&]+)/);
  return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}?autoplay=0` : link;
}

function getYouTubeThumbnail(link: string): string {
  const videoIdMatch = link.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^\s&]+)/);
  return videoIdMatch ? `https://img.youtube.com/vi/${videoIdMatch[1]}/0.jpg` : '';
}

export default function Component() {
  const escolaridade = "ENSINO_MEDIO"; // Change to "SERIES_INICIAIS" or "ENSINO_FUNDAMENTAL" as needed
  const { videos, loading, error } = useVideos(escolaridade);
  const [mainVideoIndex, setMainVideoIndex] = React.useState(0);

  const escolaridadeLabel = {
    "SERIES_INICIAIS": "Séries Iniciais",
    "ENSINO_FUNDAMENTAL": "Ensino Fundamental",
    "ENSINO_MEDIO": "Ensino Médio"
  }[escolaridade] || "Escolaridade Desconhecida";

  if (loading) return <div>Carregando vídeos...</div>;
  if (error) return <div>Erro ao carregar vídeos: {error.message}</div>;
  if (!videos.length) return <div>Nenhum vídeo encontrado.</div>;

  const mainVideo = videos[mainVideoIndex];
  const sidebarVideos = videos.filter((_, index) => index !== mainVideoIndex);

  const handleVideoClick = (index: number) => {
    setMainVideoIndex(index);
  };

  return (
    <main>
      <div className="container mx-auto px-4 pt-10 mb-40">
        <div className="mb-6">
          <div className="text-2xl font-bold text-darkBlue-500 flex items-center">
            <span className="bg-darkBlue-500 text-white p-2 rounded-md mr-2">
              <VideoIcon className="h-6 w-6" />
            </span>
            Vídeos - {escolaridadeLabel}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-16">
          <div className="w-full md:w-2/3">
            <div className="bg-gray-900 aspect-video rounded-[20px] mb-4">
              {mainVideo.videoLink ? (
                <iframe
                  src={formatVideoLink(mainVideo.videoLink)}
                  title={mainVideo.titulo}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-[20px]"
                ></iframe>
              ) : (
                <div>Link do vídeo inválido</div>
              )}
            </div>
            <div className="text-xl font-semibold text-blue-900 mb-1">
              {mainVideo.titulo}
            </div>
            <div className="text-sm text-gray-600 mb-2">
              Escolaridade: {escolaridadeLabel}
            </div>
            <p className="text-sm text-gray-600">
              {mainVideo.descricao}
            </p>
          </div>

          <div className="w-full h-[470px] md:w-1/2 space-y-4 overflow-y-scroll">
            {sidebarVideos.map((video, index) => {
              const sidebarIndex = index >= mainVideoIndex ? index + 1 : index;
              const videoEscolaridadeLabel = {
                "SERIES_INICIAIS": "Séries Iniciais",
                "ENSINO_FUNDAMENTAL": "Ensino Fundamental",
                "ENSINO_MEDIO": "Ensino Médio"
              }[video.escolaridade] || "Escolaridade Desconhecida";

              return (
                <div
                  key={video.id}
                  className="flex items-start space-x-4 cursor-pointer group"
                  onClick={() => handleVideoClick(sidebarIndex)}
                >
                  <div className="w-[270px] relative">
                    <div className="bg-gray-900 aspect-video rounded-[20px] mb-2 overflow-hidden group">
                      {video.videoLink ? (
                        <>
                          <img
                            src={getYouTubeThumbnail(video.videoLink)}
                            alt={video.titulo}
                            className="w-full h-full object-cover rounded-[20px] transition-all duration-300 group-hover:brightness-50"
                          />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-14 h-14 bg-white bg-opacity-90 rounded-full flex items-center justify-center transition-transform duration-300 ease-in-out transform group-hover:scale-110 group-active:scale-95 shadow-lg hover:shadow-2xl hover:bg-opacity-100">
                              <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-black border-b-[12px] border-b-transparent ml-1"></div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div>Thumbnail indisponível</div>
                      )}
                    </div>
                  </div>
                  <div className="w-3/5">
                    <div className="text-base text-darkBlue-400 mb-1 font-bold">
                      {videoEscolaridadeLabel}
                    </div>
                    <div className="text-[20px] font-bold text-darkBlue-500 transition-colors duration-300 group-hover:text-blue-700">
                      {video.titulo}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}