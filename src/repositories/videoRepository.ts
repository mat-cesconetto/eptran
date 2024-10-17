import { PrismaClient, Videos, EscolaridadeEnum } from '@prisma/client';

const prisma = new PrismaClient();

export class VideoRepository {
  async create(escolaridade: EscolaridadeEnum, video_link: string, descricao:string, titulo: string): Promise<Videos> {
    return prisma.videos.create({
      data: {
        titulo,
        escolaridade,
        descricao,
        video_link,
      },
    });
  }

  async findByEscolaridade(escolaridade: EscolaridadeEnum): Promise<Videos[]> {
    return prisma.videos.findMany({
      where: {
        escolaridade,
      },
    });
  }

  // Adicione outros métodos conforme necessário
}