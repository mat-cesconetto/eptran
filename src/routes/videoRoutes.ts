import { FastifyInstance } from 'fastify';
import { createVideo, getAllVideos, getVideosByEscolaridade, updateVideo, deleteVideo } from '../controllers/videoController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { adminMiddleware } from '../middlewares/adminMiddleware';

export async function videoRoutes(app: FastifyInstance) {
  // Rotas com middleware de autenticação e administração
  app.post('/create', { preHandler: [authMiddleware, adminMiddleware] }, createVideo);
  app.get('/:escolaridade', getVideosByEscolaridade);  // sem middleware
  app.get('/list', { preHandler: [authMiddleware, adminMiddleware] }, getAllVideos);
  app.patch('/update/:id', { preHandler: [authMiddleware, adminMiddleware] }, updateVideo);
  app.delete('/delete/:id', { preHandler: [authMiddleware, adminMiddleware] }, deleteVideo);

}