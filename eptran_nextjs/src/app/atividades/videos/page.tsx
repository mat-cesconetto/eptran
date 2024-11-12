"use client"

import * as React from "react";
import { Video as VideoIcon } from "lucide-react";
import Footer from "@/app/components/ui/footer";
import { useVideos } from "@/hooks/useVideosUser";

export default function Component() {
  const escolaridade = "ENSINO_MEDIO"; // Defina conforme necessário
  const { videos, loading, error } = useVideos(escolaridade);

  if (loading) return <div>Carregando vídeos...</div>;
  if (error) return <div>Erro ao carregar vídeos: {error.message}</div>;

  return (
    <main>
      <div className="container mx-auto px-4 pt-10 mb-40">
        {/* Título */}
        <div className="mb-6">
          <div className="text-2xl font-bold text-darkBlue-500 flex items-center">
            <span className="bg-darkBlue-500 text-white p-2 rounded-md mr-2">
              <VideoIcon className="h-6 w-6" />
            </span>
            Vídeos
          </div>
        </div>

        {/* Seção de vídeo principal e lista de vídeos */}
        <div className="flex flex-col md:flex-row gap-16 border-solid">
          {/* Vídeo principal */}
          <div className="w-full md:w-2/3">
            <div className="bg-gray-900 aspect-video rounded-[20px] mb-4">
              <iframe
                src={videos[0]?.videoLink}
                title={videos[0]?.titulo}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full rounded-[20px]"
              ></iframe>
            </div>
            <div className="text-xl font-semibold text-blue-900">
              {videos[0]?.titulo}
            </div>
            <p className="text-sm text-gray-600">
              {videos[0]?.descricao}
            </p>
          </div>

          {/* Lista de vídeos à direita */}
          <div className="w-full h-[470px] md:w-1/2 space-y-4 scroll-m-1 overflow-y-scroll">
            {videos.slice(1).map((video) => (
              <div key={video.id} className="flex items-start space-x-4">
                <div className="w-[270px]">
                  <div className="bg-gray-900 aspect-video rounded-[20px] border-solid"></div>
                </div>
                <div className="w-3/5">
                  <div className="text-base text-darkBlue-400 mb-1 font-bold">
                    {video.escolaridade}
                  </div>
                  <div className="text-[25px] font-bold text-darkBlue-500">
                    {video.titulo}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
