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
    <main className="px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-center sm:items-start mb-8 sm:mb-0">
        <Image
          className="bg-darkBlue-500 rounded-lg h-14 w-14 mb-4 sm:mb-0 sm:mr-4"
          src="/Image/film-camera-svgrepo-com.svg"
          alt="Video Camera"
          width="56"
          height="56"
        />
        <h1 className="text-darkBlue-500 font-bold text-3xl sm:text-4xl lg:text-5xl text-center sm:text-left">
          Gestão de Vídeos
        </h1>
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

      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="default"
            className="font-semibold w-full sm:w-52 h-10 shadow-xl flex items-center justify-center bg-darkBlue-500 text-white px-5 rounded-md text-lg"
          >
            <Image
              className="w-7"
              src="/Image/circulo.svg"
              alt="Adicionar"
              width={28}
              height={28}
            />
            Adicionar Vídeo
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] w-full">
          <DialogHeader>
            <DialogTitle className="text-[40px] font-bold text-darkBlue-500">
              Adicionar Vídeo
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid">
              <Label
                htmlFor="link"
                className="text-xs font-bold text-darkBlue-600"
              >
                LINK DO VÍDEO
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
                NOME DO VÍDEO
              </Label>
              <Input
                id="name"
                className="border-darkBlue-400"
                placeholder="Nome vídeo EPTRAN"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </div>
            <div className="grid">
              <Label
                htmlFor="description"
                className="text-xs font-bold text-darkBlue-600"
              >
                DESCRIÇÃO DO VÍDEO
              </Label>
              <Textarea
                id="description"
                placeholder="Descrição vídeo EPTRAN"
                className="border-darkBlue-400"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="w-full sm:w-[45%]">
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
                  <SelectItem value="ENSINO_MEDIO">Séries Iniciais</SelectItem>
                  <SelectItem value="ENSINO_FUNDAMENTAL">
                  Séries Finais
                  </SelectItem>
                  <SelectItem value="SERIES_INICIAIS">Ensino Médio</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full sm:w-[45%] flex flex-col sm:flex-row justify-end gap-2">
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto border-darkBlue-400 font-bold text-xs hover:bg-slate-200"
                >
                  CANCELAR
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="w-full sm:w-auto bg-darkBlue-500 text-white font-bold text-xs"
                onClick={handleAddVideo}
              >
                ENVIAR
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
