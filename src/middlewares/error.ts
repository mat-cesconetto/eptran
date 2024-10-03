import { FastifyError, FastifyReply, FastifyRequest, FastifyInstance } from 'fastify'
import { ApiError } from '../helpers/apiErrors'

export const errorHandler = (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const statusCode = (error as ApiError).statusCode ?? 500
  const message = statusCode !== 500 ? error.message : 'Internal Server Error'
  
  request.log.error(error)
  
  reply
    .status(statusCode)
    .send({ message })
}

// Registrar o manipulador de erros
export const registerErrorHandler = (fastify: FastifyInstance) => {
  fastify.setErrorHandler(errorHandler)
}