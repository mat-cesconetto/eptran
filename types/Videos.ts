import { EscolaridadeEnum } from "@prisma/client";

export interface Videos {
  id?: number;
  escolaridade: EscolaridadeEnum;
  titulo: string;
  descricao: string;
  videoLink: string;
}

export interface ListVideos {
  videos: Videos[];
  totalVideos: number;
  totalPages: number;
}
