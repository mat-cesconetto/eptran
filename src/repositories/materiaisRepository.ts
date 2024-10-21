import { EscolaridadeEnum, PrismaClient, Materiais } from "@prisma/client";

import { ListVideos } from "../../types/Videos";
import prismaClient from "../prisma";
import { ListMateriais } from "../../types/Materiais";

const prisma = new PrismaClient();

export class MaterialRepository {
  // Método para criar um vídeo
  async create(
    escolaridade: EscolaridadeEnum,
    materialLink: string,
    descricao: string,
    titulo: string
  ): Promise<Materiais> {
    return prisma.materiais.create({
      data: {
        titulo,
        descricao,
        escolaridade,
        materialLink,
      },
    });
  }

  // Método para buscar vídeos por escolaridade
  async findByEscolaridade(escolaridade: EscolaridadeEnum): Promise<Materiais[]> {
    return prisma.materiais.findMany({
      where: {
        escolaridade,
      },
    });
  }

  // Método para listar vídeos com paginação
  async listMateriais(page: number, limit: number): Promise<ListMateriais> {
    const [materiais, totalMateriais] = await prismaClient.$transaction([
      prismaClient.materiais.findMany({
        skip: (page - 1) * limit,
        take: limit,
      }),
      prismaClient.materiais.count(),
    ]);

    return {
      materiais,
      totalMateriais,
      totalPages: Math.ceil(totalMateriais / limit),
    };
  }

  // Método para atualizar um vídeo pelo ID
  async updateMaterial(
    id: number,
    data: Partial<Materiais> // Recebe os campos a serem atualizados
  ): Promise<Materiais | null> {
    return prisma.materiais.update({
      where: { id },
      data, // Atualiza apenas os campos passados
    });
  }
  async findById(id: number): Promise<Materiais | null> {
    return prisma.materiais.findUnique({
      where: { id },
    });
  }

  // Método para deletar vídeo pelo ID
  async delete(id: number): Promise<void> {
    await prisma.materiais.delete({
      where: { id },
    });
  }
}

