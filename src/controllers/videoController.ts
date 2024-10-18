import { FastifyRequest, FastifyReply } from "fastify";
import { EscolaridadeEnum } from "@prisma/client";
import { VideoRepository } from "../repositories/videoRepository";

import { Videos } from "../../types/Videos";

const videoRepository = new VideoRepository();

export const createVideo = async (
  req: FastifyRequest<{ Body: Videos }>,
  res: FastifyReply
) => {
  try {
    const { escolaridade, titulo, descricao, videoLink } = req.body;

    const validEscolaridade =
      EscolaridadeEnum[
        escolaridade.toUpperCase() as keyof typeof EscolaridadeEnum
      ];

    if (!validEscolaridade) {
      return res.status(400).send({ error: "Escolaridade inválida." });
    }
    await videoRepository.create(
      validEscolaridade,
      videoLink,
      titulo,
      descricao
    );

    // Mover o arquivo para um diretório permanente em vez de excluí-lo

    return res.status(201).send({
      success: true,
      message: "Video criado com sucesso!",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Erro ao criar vídeo." });
  }
};

export const getVideosByEscolaridade = async (
  req: FastifyRequest<{ Params: { escolaridade: string } }>,
  res: FastifyReply
) => {
  try {
    const { escolaridade } = req.params;

    const validEscolaridade =
      EscolaridadeEnum[
        escolaridade.toUpperCase() as keyof typeof EscolaridadeEnum
      ];

    if (!validEscolaridade) {
      return res.status(400).send({ error: "Escolaridade inválida." });
    }

    const videos = await videoRepository.findByEscolaridade(validEscolaridade);

    return res.status(200).send({
      success: true,
      videos,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Erro ao buscar vídeos." });
  }
};

export const getAllVideos = async (
  req: FastifyRequest<{ Params: { escolaridade: string } }>,
  res: FastifyReply
) => {
  try {
    // Extrai os parâmetros `page` e `limit` da query string, com valores padrão
    const { page = "1", limit = "10" } = req.query as {
      page?: string;
      limit?: string;
    };

    // Converte `page` e `limit` para números
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    // Chama a função que lista os usuários com paginação
    const { videos, totalVideos, totalPages } =
      await videoRepository.listVideos(pageNumber, limitNumber);

    const videosInfo = videos.map((video) => ({
      id: video.id,
      titulo: video.titulo,
      descricao: video.descricao,
      escolaridade: video.escolaridade,
    }));

    // Responde com os dados paginados
    return res.send({
      videosInfo,
      totalVideos,
      totalPages,
      currentPage: pageNumber,
    });
  } catch (error) {
    // Trata qualquer erro e responde com status 500
    return res.status(500).send({ error: "Erro ao buscar usuários" });
  }
};

export const updateVideo = async (
  req: FastifyRequest<{ Params: { id: string }, Body: Partial<Videos> }>,
  res: FastifyReply
) => {
  try {
    const { id } = req.params;
    const { titulo, descricao, escolaridade, videoLink } = req.body;

    // Chama o método do repositório para atualizar o vídeo
    const updatedVideo = await videoRepository.updateVideo(Number(id), {
      titulo,
      descricao,
      escolaridade,
      videoLink,
    });

    if (!updatedVideo) {
      return res.status(404).send({ error: "Vídeo não encontrado" });
    }

    return res.status(200).send({
      success: true,
      message: "Vídeo atualizado com sucesso",
      updatedVideo,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Erro ao atualizar vídeo" });
  }
};

export const deleteVideo = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  res: FastifyReply
) => {
  try {
    const { id } = req.params;

    // Verifica se o vídeo existe antes de tentar excluir
    const videoExists = await videoRepository.findById(Number(id));

    if (!videoExists) {
      return res.status(404).send({ error: "Vídeo não encontrado." });
    }

    // Realiza a exclusão do vídeo
    await videoRepository.delete(Number(id));

    return res.status(200).send({
      success: true,
      message: "Vídeo excluído com sucesso.",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Erro ao excluir vídeo." });
  }
};