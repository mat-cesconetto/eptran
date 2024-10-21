import { FastifyInstance } from 'fastify';
import { createMaterial, deleteMaterial,getAllMateriais, getMateriaisByEscolaridade, updateMaterial } from '../controllers/materiaisController';

export async function materiaisRoutes(app: FastifyInstance) {  
  app.post('/create', createMaterial);
  app.get('/:escolaridade', getMateriaisByEscolaridade);
  app.get('/list', getAllMateriais);
  app.patch('/update/:id', updateMaterial);
  app.delete('/delete/:id', deleteMaterial);  // Rota DELETE para exclusão
}
