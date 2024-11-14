import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { createMaterial, deleteMaterial, getAllMateriais, getMateriaisByEscolaridade, updateMaterial } from '../controllers/materiaisController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { adminMiddleware } from '../middlewares/adminMiddleware';
import { EscolaridadeEnum } from '@prisma/client';

// Definindo as interfaces para os tipos das requisições
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

async function materiaisRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  // Rota pública para listar materiais por escolaridade
  fastify.get('/:escolaridade', {
    handler: getMateriaisByEscolaridade
  });
  
  // Rota pública para listar todos os materiais
  fastify.get('/list', {
    handler: getAllMateriais
  });
  
  // Rotas protegidas que requerem autenticação e privilégios de admin
  fastify.post<{
    Body: CreateMaterialBody
  }>('/create', {
    preHandler: [authMiddleware],
    handler: createMaterial
  });

  fastify.patch<{
    Params: { id: string },
    Body: UpdateMaterialBody
  }>('/update/:id', {
    preHandler: [authMiddleware, adminMiddleware],
    handler: updateMaterial
  });

  fastify.delete<{
    Params: { id: string }
  }>('/delete/:id', {
    preHandler: [authMiddleware, adminMiddleware],
    handler: deleteMaterial
  });
}

export default materiaisRoutes;