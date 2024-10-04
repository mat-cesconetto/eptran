import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { UserController } from "../controller/userController";
import { RefreshTokenRepository } from "../repositories/refreshTokenRepository"; // Importa o repositório de tokens
import { authMiddleware } from '../middlewares/authMiddleware'; // Ajuste o caminho conforme sua estrutura de diretórios

export async function userRoutes(fastify: FastifyInstance) {
    const userController = new UserController(fastify); // Instância da classe UserController
    const refreshTokenRepository = new RefreshTokenRepository(); // Instância do repositório

    // Rota para obter informações do usuário
    fastify.get('/info', { onRequest: [authMiddleware] }, async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            // Acesso às informações do usuário
            const user = request.user; // Acesso ao usuário autenticado

            // Organizando os dados do usuário
            const data = {
                id: user.id,
                nome: user.nome,
                email: user.email,
                cep: user.cep,
                rua: user.rua,
                cidade: user.cidade,
                estado: user.estado,
                escola: user.escola,
                data_nasc: user.data_nasc,
                escolaridade: user.escolaridade,
                sexo: user.sexo,
                adm: user.adm,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            };
            
            return reply.send({ message: 'Informações do usuário', data }); // Retorna as informações do usuário
        } catch (error: any) {
            return reply.status(500).send({ error: "Erro ao obter informações do usuário", details: error.message });
        }
    });
}
