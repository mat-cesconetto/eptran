import { FastifyInstance } from 'fastify';
import { createVideo, getAllVideos, getVideosByEscolaridade, updateVideo, deleteVideo } from '../controllers/videoController';

export async function videoRoutes(app: FastifyInstance) {  
  app.post('/create', createVideo);
  app.get('/:escolaridade', getVideosByEscolaridade);
  app.get('/list', getAllVideos);
  app.patch('/update/:id', updateVideo);
  app.delete('/delete/:id', deleteVideo);  // Rota DELETE para exclusão
}
