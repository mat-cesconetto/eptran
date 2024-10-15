import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import fp from 'fastify-plugin'
import multipart, { MultipartFile } from '@fastify/multipart'
import fs from 'fs'
import path from 'path'
import { pipeline } from 'stream/promises'

interface UploadFields {
  titulo: string;
  descricao: string;
  escolaridade: string;
  videoPath: string;
}

const uploadMiddleware = (fastify: FastifyInstance, opts: any, done: () => void) => {

  fastify.addHook('preHandler', async (request: FastifyRequest, reply: FastifyReply) => {
    if (!request.isMultipart()) {
      return
    }

    const uploadDir = path.resolve(__dirname, '..', '..', 'uploads')
    
    try {
      await fs.promises.access(uploadDir)
    } catch (error) {
      await fs.promises.mkdir(uploadDir, { recursive: true })
    }

    const parts = request.parts()
    const fields: Partial<UploadFields> = {}
    let videoFile: MultipartFile | null = null

    for await (const part of parts) {
      if (part.type === 'file') {
        videoFile = part
      } else {
        // Aqui fazemos uma verificação de tipo mais explícita
        if (typeof part.value === 'string') {
          fields[part.fieldname as keyof UploadFields] = part.value
        }
      }
    }

    if (videoFile) {
      const fileName = `${Date.now()}-${videoFile.filename}`
      const filePath = path.join(uploadDir, fileName)
      await pipeline(videoFile.file, fs.createWriteStream(filePath))
      fields.videoPath = filePath
    }

    request.body = fields as UploadFields
  })

  done()
}

export default fp(uploadMiddleware)