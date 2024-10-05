import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { authMiddleware } from '../middlewares/authMiddleware'; // Ajuste o caminho conforme sua estrutura de diretórios
import { adminMiddleware } from "../middlewares/adminMiddleware";
import { request } from "http";
import { UserController } from "../controller/userController";

export async function userRoutes(fastify: FastifyInstance) {
    const userController = new UserController(fastify);


    // Rota para obter informações do usuário
    fastify.get('/info', { preHandler: [authMiddleware, adminMiddleware] }, async (request: FastifyRequest, reply: FastifyReply) => {
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
    fastify.get('/list', {preHandler: [authMiddleware, adminMiddleware]}, userController.getAllUsers.bind(userController));

    fastify.post('/upload-profile-picture', 
        { 
            preHandler: [authMiddleware],
            // Add multipart handler options
            config: {
                multipart: {
                    limits: {
                        fileSize: 5 * 1024 * 1024 // 5MB
                    }
                }
            }
        }, 
        async (request: FastifyRequest, reply: FastifyReply) => {
            return userController.uploadProfilePicture(request, reply);
        }
    );

    fastify.get("/search", {
        handler: userController.searchUsers.bind(userController),
    });
    

}
