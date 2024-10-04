import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { AuthRepository } from "../repositories/authRepository";
import { NotFoundError } from '../helpers/apiErrors';

export class UserController {
    private authRepository: AuthRepository;
    private fastify: FastifyInstance;

    constructor(fastify: FastifyInstance) {
        this.authRepository = new AuthRepository(); // Inicia o repositório de autenticação
        this.fastify = fastify;
    }

    // Método para obter informações do usuário
    async getUserInfo(request: FastifyRequest, reply: FastifyReply) {
        try {
            // O ID do usuário já está disponível em request.user
            const userId = request.user.id;

            // Busca as informações do usuário
            const userInfo = await this.authRepository.getUserById(userId);

            if (!userInfo) {
                throw new NotFoundError("Usuário não encontrado");
            }

            // Retorna as informações do usuário
            return reply.send({
                email: userInfo.email,
                nome: userInfo.nome,
                escolaridade: userInfo.escolaridade,
                isAdmin: userInfo.adm, // Exemplo de campo indicando se é admin
                // Adicione mais campos conforme necessário
            });
        } catch (error: any) {
            if (error instanceof NotFoundError) {
                return reply.status(error.statusCode).send({ error: error.message });
            }

            // Retorna uma mensagem de erro adequada para outros erros
            return reply.status(500).send({ error: "Erro ao buscar informações do usuário", details: error.message });
        }
    }
}
