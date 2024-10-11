import { FastifyRequest, FastifyReply } from 'fastify';
import path from 'path';
import fs from 'fs';

interface VideoUploadBody {
  escolaridade: string;
  video_url?: string;
}

export const uploadMiddleware = async (req: FastifyRequest<{ Body: VideoUploadBody }>, res: FastifyReply) => {
  try {
    const { escolaridade } = req.body;

    if (!escolaridade) {
      return res.status(400).send({ error: 'Escolaridade é obrigatória.' });
    }

    const data = await req.file();

    if (!data) {
      return res.status(400).send({ error: 'Nenhum arquivo foi enviado.' });
    }

    const fileBuffer = await data.toBuffer();
    const filePath = path.join(__dirname, '../../uploads', data.filename);

    fs.writeFileSync(filePath, fileBuffer);

    // Atualize a URL do vídeo com o caminho correto
    req.body = { ...req.body, video_url: `/uploads/${data.filename}` };

    return res.status(200).send({
      success: true,
      file: data.filename,
      video_url: req.body.video_url,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: 'Erro ao processar o upload' });
  }
};
