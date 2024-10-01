import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from 'fastify'
import { request } from 'http'
import { RegisterUserController } from '../controllers/RegisterUserController'

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    fastify.get('/teste', async (request: FastifyRequest, reply: FastifyReply) => {
        return { ok: true }
    })

    fastify.post("/register", async (request: FastifyRequest, reply: FastifyReply) => {
        return new RegisterUserController().handle(request, reply)
    })
}