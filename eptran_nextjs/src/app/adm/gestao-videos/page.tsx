"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import VideoCard from "./card-video"; // Assuming the updated VideoCard is saved here
import useVideos from "@/hooks/useVideos";
import useAddVideo from "@/hooks/useManageVideos";
import { Video } from "@/@types/Video";

interface VideoType {
  titulo: string;
  descricao: string;
  escolaridade: string;
  video: string;
}

export default function VideoManagement() {
  const { videos, loading, error } = useVideos();
  const { addVideo } = useAddVideo();

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [escolaridade, setEscolaridade] = useState("");
  const [videoLink, setVideoLink] = useState("");

  const handleAddVideo = () => {
    const newVideo: VideoType = {
      titulo,
      descricao,
      escolaridade,
      video: videoLink,
    };

    addVideo(newVideo);

    // Clear dialog fields
    setTitulo("");
    setDescricao("");
    setEscolaridade("");
    setVideoLink("");
  };

  return (
    <main className="">
      <div className="flex">
        <Image
          className="bg-darkBlue-500 rounded-lg h-14 w-14 ml-14 mt-10"
          src="/Image/livro.svg"
          alt="Livro"
          width="56"
          height="56"
        />
        <h1 className="text-darkBlue-500 font-bold text-5xl pl-4 pt-10 -mb-96">
          Gestão de Videos
        </h1>
      </div>

      <div className="ml-6 pt-0.5 p-8">
        <div className="w-full flex mt-10 justify-between">
          <div className="relative w-[28vw]">
            <div className="absolute flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 mt-3 text-darkBlue-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="procurar"
              className="font-semibold block items-center h-10 ps-10 min-w-72 w-full text-sm bg-white rounded-lg border-gray-300 border-1 placeholder-darkBlue-300"
              placeholder="Procurar"
            />
          </div>

          <div className="">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="default"
                  className=" font-semibold w-56 h-10 mt-1 shadow-xl flex items-center bg-darkBlue-500 text-white px-5 rounded-md text-lg"
                >
                  <Image
                    className="w-7 mr-1"
                    src="/Image/circulo.svg"
                    alt="Adicionar"
                    width={28}
                    height={28}
                  />
                  Adicionar Material
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] w-full">
                <DialogHeader>
                  <DialogTitle className="text-[40px] font-bold text-darkBlue-500">
                    Adicionar Conteúdo
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid">
                    <Label
                      htmlFor="link"
                      className="text-xs font-bold text-darkBlue-600"
                    >
                      LINK DO CONTEÚDO
                    </Label>
                    <Input
                      id="link"
                      className="border-darkBlue-400"
                      placeholder="http://sia.com.br"
                      value={videoLink}
                      onChange={(e) => setVideoLink(e.target.value)}
                    />
                  </div>
                  <div className="grid">
                    <Label
                      htmlFor="name"
                      className="text-xs font-bold text-darkBlue-600"
                    >
                      NOME DO CONTEÚDO
                    </Label>
                    <Input
                      id="name"
                      className="border-darkBlue-400"
                      placeholder="Nome conteúdo EPTRAN"
                      value={titulo}
                      onChange={(e) => setTitulo(e.target.value)}
                    />
                  </div>
                  <div className="grid">
                    <Label
                      htmlFor="description"
                      className="text-xs font-bold text-darkBlue-600"
                    >
                      DESCRIÇÃO DO CONTEÚDO
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Descrição conteúdo EPTRAN"
                      className="border-darkBlue-400"
                      value={descricao}
                      onChange={(e) => setDescricao(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div className="w-[45%]">
                    <Label
                      htmlFor="classification"
                      className="text-xs font-bold text-darkBlue-600 block"
                    >
                      CLASSIFICAÇÃO
                    </Label>
                    <Select
                      value={escolaridade}
                      onValueChange={setEscolaridade}
                    >
                      <SelectTrigger className="border-darkBlue-400 w-full">
                        <SelectValue placeholder="Selecionar" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="FUNDAMENTAL">
                          Séries Iniciais
                        </SelectItem>
                        <SelectItem value="MEDIO">Séries Finais</SelectItem>
                        <SelectItem value="SUPERIOR">Ensino Médio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-[45%] flex justify-end space-x-2">
                    <DialogClose asChild>
                      <Button
                        variant="outline"
                        className="w-full border-darkBlue-400 font-bold text-xs hover:bg-slate-200"
                      >
                        CANCELAR
                      </Button>
                    </DialogClose>
                    <Button
                      type="submit"
                      className="w-full bg-darkBlue-500 text-white font-bold text-xs"
                      onClick={handleAddVideo}
                    >
                      ENVIAR
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="w-full rounded-xl mt-8 sm:mt-16 flex flex-wrap justify-center sm:justify-center gap-4 sm:gap-6 lg:gap-[70px]">
        {loading && <p>Carregando vídeos...</p>}
        {error && <p>Erro: {error}</p>}
        {!loading &&
          !error &&
          videos.map((video) => (
            <VideoCard
              key={video.id}
              src="/image/carros.png"
              alt="Video Thumbnail"
              conteudo={video.titulo}
              data={new Date().toLocaleDateString()}
              duracao="3:02"
              nivel={video.escolaridade}
              tamanho="207 MB"
            />
          ))}
      </div>
    </main>
  );
}
