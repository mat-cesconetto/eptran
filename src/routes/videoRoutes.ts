import { FastifyInstance } from 'fastify';
import { uploadMiddleware } from '../middlewares/uploadMiddleware';
import { createVideo, getVideosByEscolaridade } from '../controllers/videoController';

export async function videoRoutes(app: FastifyInstance) {
  app.post('/upload', { preHandler: uploadMiddleware }, createVideo);
  app.get('/:escolaridade', getVideosByEscolaridade); // Rota para pegar vídeos por escolaridade
}
