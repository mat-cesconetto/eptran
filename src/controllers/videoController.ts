import { FastifyRequest, FastifyReply } from 'fastify';
   import { EscolaridadeEnum } from '@prisma/client';
   import { VideoRepository } from '../repositories/videoRepository';
   import fs from 'fs'
import path from 'path';

   const videoRepository = new VideoRepository();

   interface CreateVideoBody {
     escolaridade: string;
     titulo: string;
     descricao: string;
     videoPath: string;
   }

   export const createVideo = async (req: FastifyRequest<{ Body: CreateVideoBody }>, res: FastifyReply) => {
     try {
       const { escolaridade, titulo, descricao, videoPath } = req.body;

       const validEscolaridade = EscolaridadeEnum[escolaridade.toUpperCase() as keyof typeof EscolaridadeEnum];

       if (!validEscolaridade) {
         return res.status(400).send({ error: 'Escolaridade inválida.' });
       }

       // Simular upload para o YouTube
       const youtubeUrl = `https://www.youtube.com/watch?v=dummyId-${Date.now()}`;

       // Salvar no banco de dados
       const video = await videoRepository.create(validEscolaridade, youtubeUrl, titulo, descricao);

       // Mover o arquivo para um diretório permanente em vez de excluí-lo
       const permanentDir = './permanent_uploads';
       if (!fs.existsSync(permanentDir)) {
         fs.mkdirSync(permanentDir);
       }
       const newPath = `${permanentDir}/${Date.now()}-${path.basename(videoPath)}`;
       fs.renameSync(videoPath, newPath);

       return res.status(201).send({
         success: true,
         video,
         youtubeUrl,
         localVideoPath: newPath
       });
     } catch (err) {
       console.error(err);
       return res.status(500).send({ error: 'Erro ao criar vídeo.' });
     }
   };
   
export const getVideosByEscolaridade = async (req: FastifyRequest<{ Params: { escolaridade: string } }>, res: FastifyReply) => {
  try {
    const { escolaridade } = req.params;

    const validEscolaridade = EscolaridadeEnum[escolaridade.toUpperCase() as keyof typeof EscolaridadeEnum];

    if (!validEscolaridade) {
      return res.status(400).send({ error: 'Escolaridade inválida.' });
    }

    const videos = await videoRepository.findByEscolaridade(validEscolaridade);

    return res.status(200).send({
      success: true,
      videos,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: 'Erro ao buscar vídeos.' });
  }
};