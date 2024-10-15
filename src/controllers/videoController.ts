import { FastifyRequest, FastifyReply } from 'fastify';
import { EscolaridadeEnum } from '@prisma/client';
import { VideoRepository } from '../repositories/videoRepository';
import { YouTubeService } from '../services/youtubeService';
import fs from 'fs'

const videoRepository = new VideoRepository();
const youtubeService = new YouTubeService();

interface CreateVideoBody {
  escolaridade: string;
  titulo: string;
  descricao: string;
  videoPath: string;
}

export const createVideo = async (req: FastifyRequest<{ Body: CreateVideoBody }>, res: FastifyReply) => {
  try {
    const { escolaridade, titulo, descricao, videoPath } = req.body;

    const validEscolaridade = EscolaridadeEnum[escolaridade.toUpperCase() as keyof typeof EscolaridadeEnum];

    if (!validEscolaridade) {
      return res.status(400).send({ error: 'Escolaridade inválida.' });
    }

    // Upload para o YouTube
    const youtubeUrl = await youtubeService.uploadVideo(videoPath, titulo, descricao);

    // Salvar no banco de dados
    const video = await videoRepository.create(validEscolaridade, youtubeUrl, titulo);

    // Deletar o arquivo temporário
    await fs.promises.unlink(videoPath);

    return res.status(201).send({
      success: true,
      video,
      youtubeUrl,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: 'Erro ao criar vídeo.' });
  }
};

export const getVideosByEscolaridade = async (req: FastifyRequest<{ Params: { escolaridade: string } }>, res: FastifyReply) => {
  try {
    const { escolaridade } = req.params;

    const validEscolaridade = EscolaridadeEnum[escolaridade.toUpperCase() as keyof typeof EscolaridadeEnum];

    if (!validEscolaridade) {
      return res.status(400).send({ error: 'Escolaridade inválida.' });
    }

    const videos = await videoRepository.findByEscolaridade(validEscolaridade);

    return res.status(200).send({
      success: true,
      videos,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: 'Erro ao buscar vídeos.' });
  }
};