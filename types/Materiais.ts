import { EscolaridadeEnum } from "@prisma/client";

export interface Materiais {
  id?: number;
  escolaridade: EscolaridadeEnum;
  titulo: string;
  descricao: string;
  materialLink: string;
}

export interface ListMateriais {
  materiais: Materiais[];
  totalMateriais: number;
  totalPages: number;
}
