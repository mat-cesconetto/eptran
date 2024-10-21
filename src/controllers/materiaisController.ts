import { FastifyRequest, FastifyReply } from "fastify";
import { EscolaridadeEnum, Materiais } from "@prisma/client";
import { MaterialRepository } from "../repositories/materiaisRepository";

const materialRepository = new MaterialRepository();

export const createMaterial = async (
  req: FastifyRequest<{ Body: Materiais }>,
  res: FastifyReply
) => {
  try {
    const { escolaridade, titulo, descricao, materialLink } = req.body;

    const validEscolaridade =
      EscolaridadeEnum[
        escolaridade.toUpperCase() as keyof typeof EscolaridadeEnum
      ];

    if (!validEscolaridade) {
      return res.status(400).send({ error: "Escolaridade inválida." });
    }
    await materialRepository.create(
      validEscolaridade,
      materialLink,
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

export const getMateriaisByEscolaridade = async (
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

    const videos = await materialRepository.findByEscolaridade(validEscolaridade);

    return res.status(200).send({
      success: true,
      videos,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Erro ao buscar vídeos." });
  }
};

export const getAllMateriais = async (
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
    const { materiais, totalMateriais, totalPages } =
      await materialRepository.listMateriais(pageNumber, limitNumber);

    const materiaisInfo = materiais.map((material) => ({
      id: material.id,
      titulo: material.titulo,
      descricao: material.descricao,
      escolaridade: material.escolaridade,
    }));

    // Responde com os dados paginados
    return res.send({
        materiaisInfo,
      totalMateriais,
      totalPages,
      currentPage: pageNumber,
    });
  } catch (error) {
    // Trata qualquer erro e responde com status 500
    return res.status(500).send({ error: "Erro ao buscar usuários" });
  }
};

export const updateMaterial = async (
  req: FastifyRequest<{ Params: { id: string }, Body: Partial<Materiais> }>,
  res: FastifyReply
) => {
  try {
    const { id } = req.params;
    const { titulo, descricao, escolaridade, materialLink } = req.body;

    // Chama o método do repositório para atualizar o vídeo
    const updatedVideo = await materialRepository.updateMaterial(Number(id), {
      titulo,
      descricao,
      escolaridade,
      materialLink,
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

export const deleteMaterial = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  res: FastifyReply
) => {
  try {
    const { id } = req.params;

    // Verifica se o vídeo existe antes de tentar excluir
    const videoExists = await materialRepository.findById(Number(id));

    if (!videoExists) {
      return res.status(404).send({ error: "Vídeo não encontrado." });
    }

    // Realiza a exclusão do vídeo
    await materialRepository.delete(Number(id));

    return res.status(200).send({
      success: true,
      message: "Vídeo excluído com sucesso.",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Erro ao excluir vídeo." });
  }
};