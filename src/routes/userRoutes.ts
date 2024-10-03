import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { UserController } from "../controller/userController";
import { LoginUser, RegisterUser, User } from "../../types/User";
import { AuthRepository } from "../repositories/authRepository";


export async function userRoutes(fastify: FastifyInstance) {
    const userController = new UserController(fastify); // Passando a instância do Fastify

    // Rota de registro de usuário
    fastify.post<{ Body: User }>("/register", async (request: FastifyRequest, reply: FastifyReply) => {
        const { id, nome, email, senha, cep, rua, cidade, estado, escola, data_nasc, escolaridade, sexo, createdAt, updatedAt } = request.body as User;
        try {
            const data = await userController.register({
                id,
                nome,
                email,
                senha,
                cep,
                rua,
                cidade,
                estado,
                escola,
                data_nasc,
                escolaridade,
                sexo,
                createdAt,
                updatedAt
            });
            return reply.send(data);
        } catch (error) {
            return reply.status(500).send({ error: "Registration failed", details: error });
        }
    });

    // Rota de login
    fastify.post<{ Body: { email: string; senha: string } }>("/login", async (request: FastifyRequest, reply: FastifyReply) => {
        const { email, senha } = request.body as LoginUser;
        try {
            const result = await userController.login(email, senha, reply); // Passando o reply
            reply.send(result);
        } catch (error: any) {
            reply.status(400).send({ error: error.message });
        }
    });

    fastify.post
}
