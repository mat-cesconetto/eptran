import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { UserUseCase } from "../usecases/user.usecase";
import { LoginUser, User } from "../../types/User";


export async function userRoutes(fastify: FastifyInstance) {
    const userUseCase = new UserUseCase(fastify); // Passando a instância do Fastify

    // Rota de registro de usuário
    fastify.post<{ Body: User }>("/", async (request: FastifyRequest, reply: FastifyReply) => {
        const { nome, email, senha, cep, rua, cidade, estado, escola, data_nasc, escolaridade, sexo, adm } = request.body as User;
        try {
            const data = await userUseCase.register({
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
                adm
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
            const result = await userUseCase.login(email, senha); // Chamando a função de login
            reply.send(result); // Retornando o token JWT
        } catch (error: any) {
            reply.status(400).send({ error: error.message }); // Retornando erro caso falhe
        }
    });

    // // Rota de exemplo (protegida)
    // fastify.get("/protected", { preHandler: [fastify.authenticate] }, async (request: FastifyRequest, reply: FastifyReply) => {
    //     reply.send({ message: 'Você acessou uma rota protegida!' });
    // });
}
