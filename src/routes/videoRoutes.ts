import { FastifyInstance } from 'fastify';
import { createVideo, getVideosByEscolaridade } from '../controllers/videoController';
import uploadMiddleware from '../middlewares/uploadMiddleware';

export async function videoRoutes(app: FastifyInstance) {
  app.register(uploadMiddleware)
  
  app.post('/upload', createVideo);
  app.get('/:escolaridade', getVideosByEscolaridade);
}