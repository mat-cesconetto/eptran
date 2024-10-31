import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { createVideo, getAllVideos, getVideosByEscolaridade, updateVideo, deleteVideo } from '../controllers/videoController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { adminMiddleware } from '../middlewares/adminMiddleware';
import { Videos } from '../../types/Videos';

// Definindo as interfaces para os tipos das requisições
interface CreateVideoBody extends Videos {}

interface UpdateVideoBody extends Partial<Videos> {}

async function videoRoutes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  // Rota pública para listar vídeos por escolaridade
  fastify.get('/:escolaridade', {
    handler: getVideosByEscolaridade
  });

  // Rotas protegidas que requerem autenticação e privilégios de admin
  fastify.post<{
    Body: CreateVideoBody
  }>('/create', {
    preHandler: [ authMiddleware, adminMiddleware],
    handler: createVideo
  });

  fastify.get<{
    Querystring: {
      page?: string;
      limit?: string;
    }
  }>('/list', {
    preHandler: [authMiddleware, adminMiddleware],
    handler: getAllVideos
  });

  fastify.patch<{
    Params: { id: string },
    Body: UpdateVideoBody
  }>('/update/:id', {
    preHandler: [authMiddleware, adminMiddleware],
    handler: updateVideo
  });

  fastify.delete<{
    Params: { id: string }
  }>('/delete/:id', {
    preHandler: [authMiddleware, adminMiddleware],
    handler: deleteVideo
  });
}

export default videoRoutes;