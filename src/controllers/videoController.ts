import { FastifyRequest, FastifyReply } from 'fastify';
import { EscolaridadeEnum } from '@prisma/client';
import { VideoRepository } from '../repositories/videoRepository';

const videoRepository = new VideoRepository();

// Interface para o corpo da requisição
interface CreateVideoBody {
  escolaridade: string;
  video_url: string;  // Renomeado para video_url para se alinhar com o nome esperado do middleware
  titulo: string;
}

// Função para criar vídeo
export const createVideo = async (req: FastifyRequest<{ Body: CreateVideoBody }>, res: FastifyReply) => {
  try {
    const { escolaridade, video_url, titulo } = req.body;

    // Validação da escolaridade
    const validEscolaridade = EscolaridadeEnum[escolaridade.toUpperCase() as keyof typeof EscolaridadeEnum];

    if (!validEscolaridade) {
      return res.status(400).send({ error: 'Escolaridade inválida.' });
    }

    // Verificação se o link do vídeo foi enviado
    if (!video_url) {
      return res.status(400).send({ error: 'URL do vídeo é obrigatória.' });
    }

    // Criação do vídeo no repositório
    const newVideo = await videoRepository.create(validEscolaridade, video_url, titulo);

    // Resposta de sucesso
    return res.status(201).send({
      success: true,
      video: newVideo,
      youtubeLink: video_url,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: 'Erro ao criar vídeo.' });
  }
};

// Função para obter vídeos por escolaridade
export const getVideosByEscolaridade = async (req: FastifyRequest<{ Params: { escolaridade: string } }>, res: FastifyReply) => {
  try {
    const { escolaridade } = req.params;

    // Validação da escolaridade
    const validEscolaridade = EscolaridadeEnum[escolaridade.toUpperCase() as keyof typeof EscolaridadeEnum];

    if (!validEscolaridade) {
      return res.status(400).send({ error: 'Escolaridade inválida.' });
    }

    // Obtenção dos vídeos do repositório
    const videos = await videoRepository.findByEscolaridade(validEscolaridade);

    // Resposta de sucesso
    return res.status(200).send({
      success: true,
      videos,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: 'Erro ao buscar vídeos.' });
  }
};
