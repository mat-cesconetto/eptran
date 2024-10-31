import { FastifyRequest, FastifyReply } from "fastify";
import { EscolaridadeEnum, Materiais } from "@prisma/client";
import { MaterialRepository } from "../repositories/materiaisRepository";

const materialRepository = new MaterialRepository();

interface CreateMaterialBody {
  titulo: string;
  descricao: string;
  materialLink: string;
  escolaridade: EscolaridadeEnum;
}

interface UpdateMaterialBody {
  titulo?: string;
  descricao?: string;
  materialLink?: string;
  escolaridade?: EscolaridadeEnum;
}

export const createMaterial = async (
  request: FastifyRequest<{
    Body: CreateMaterialBody;
  }>,
  reply: FastifyReply
) => {
  try {
    const { escolaridade, titulo, descricao, materialLink } = request.body;

    const validEscolaridade =
      EscolaridadeEnum[
        escolaridade.toUpperCase() as keyof typeof EscolaridadeEnum
      ];

    if (!validEscolaridade) {
      return reply.status(400).send({ error: "Escolaridade inválida." });
    }
    
    await materialRepository.create(
      validEscolaridade,
      materialLink,
      titulo,
      descricao
    );

    return reply.status(201).send({
      success: true,
      message: "Material criado com sucesso!",
    });
  } catch (err) {
    console.error(err);
    return reply.status(500).send({ error: "Erro ao criar material." });
  }
};

export const getMateriaisByEscolaridade = async (
  request: FastifyRequest<{
    Params: { escolaridade: string };
  }>,
  reply: FastifyReply
) => {
  try {
    const { escolaridade } = request.params;

    const validEscolaridade =
      EscolaridadeEnum[
        escolaridade.toUpperCase() as keyof typeof EscolaridadeEnum
      ];

    if (!validEscolaridade) {
      return reply.status(400).send({ error: "Escolaridade inválida." });
    }

    const materiais = await materialRepository.findByEscolaridade(validEscolaridade);

    return reply.status(200).send({
      success: true,
      materiais,
    });
  } catch (err) {
    console.error(err);
    return reply.status(500).send({ error: "Erro ao buscar materiais." });
  }
};

export const getAllMateriais = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { page = "1", limit = "10" } = request.query as {
      page?: string;
      limit?: string;
    };

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    const { materiais, totalMateriais, totalPages } =
      await materialRepository.listMateriais(pageNumber, limitNumber);

    const materiaisInfo = materiais.map((material) => ({
      id: material.id,
      titulo: material.titulo,
      descricao: material.descricao,
      escolaridade: material.escolaridade,
      material: material.materialLink
    }));

    return reply.send({
      materiaisInfo,
      totalMateriais,
      totalPages,
      currentPage: pageNumber,
    });
  } catch (error) {
    return reply.status(500).send({ error: "Erro ao buscar materiais" });
  }
};

export const updateMaterial = async (
  request: FastifyRequest<{
    Params: { id: string };
    Body: UpdateMaterialBody;
  }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;
    const { titulo, descricao, escolaridade, materialLink } = request.body;

    const updatedMaterial = await materialRepository.updateMaterial(Number(id), {
      titulo,
      descricao,
      escolaridade,
      materialLink,
    });

    if (!updatedMaterial) {
      return reply.status(404).send({ error: "Material não encontrado" });
    }

    return reply.status(200).send({
      success: true,
      message: "Material atualizado com sucesso",
      updatedMaterial,
    });
  } catch (err) {
    console.error(err);
    return reply.status(500).send({ error: "Erro ao atualizar material" });
  }
};

export const deleteMaterial = async (
  request: FastifyRequest<{
    Params: { id: string };
  }>,
  reply: FastifyReply
) => {
  try {
    const { id } = request.params;

    const materialExists = await materialRepository.findById(Number(id));

    if (!materialExists) {
      return reply.status(404).send({ error: "Material não encontrado." });
    }

    await materialRepository.delete(Number(id));

    return reply.status(200).send({
      success: true,
      message: "Material excluído com sucesso.",
    });
  } catch (err) {
    console.error(err);
    return reply.status(500).send({ error: "Erro ao excluir material." });
  }
};