import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { AuthController } from "../controllers/authController";
import { User } from "../../types/User";
import { LoginUser } from "../../types/Auth";
import { UserController } from "../controllers/userController";
import PasswordResetController from "../controllers/passwordResetController";

export async function authRoutes(fastify: FastifyInstance) {
  const authController = new AuthController(fastify);
  const userController = new UserController(fastify);

  // Rota de registro de usuário
  fastify.post<{ Body: User }>(
    "/register",
    async (request: FastifyRequest<{ Body: User }>, reply: FastifyReply) => {
      const {
        id,
        nome,
        email,
        senha,
        cep,
        rua,
        cidade,
        bairro,
        estado,
        escola,
        data_nasc,
        escolaridade,
        sexo,
        adm,
        createdAt,
        updatedAt,
      } = request.body;

      // Verificação básica de campos obrigatórios
      if (!email || !senha || !nome) {
        return reply
          .status(400)
          .send({ error: "Nome, email e senha são obrigatórios." });
      }

      try {
        const data = await authController.register({
          id,
          nome,
          email,
          senha,
          cep,
          rua,
          cidade,
          bairro,
          estado,
          escola,
          data_nasc,
          escolaridade,
          sexo,
          createdAt,
          updatedAt,
          adm,
        });
        return reply.status(201).send(data); // Retorna 201 Created
      } catch (error: any) {
        return reply
          .status(500)
          .send({ error: "Falha ao registrar", details: error.message });
      }
    }
  );

  // Rota de login
  fastify.post<{ Body: LoginUser }>(
    "/login",
    async (
      request: FastifyRequest<{ Body: LoginUser }>,
      reply: FastifyReply
    ) => {
      const { email, senha } = request.body;

      // Verificação básica de campos obrigatórios
      if (!email || !senha) {
        return reply
          .status(400)
          .send({ error: "Email e senha são obrigatórios." });
      }

      try {
        const result = await authController.login(email, senha, reply);
        return reply.send(result);
      } catch (error: any) {
        return reply.status(400).send({ error: error.message });
      }
    }
  );

  // Rota de logout
  fastify.post(
    "/logout",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        await authController.logout(request, reply);
        return reply.status(204).send(); // Retorna 204 No Content
      } catch (error: any) {
        return reply.status(500).send({
          error: "Houve uma falha ao fazer logout",
          details: error.message,
        });
      }
    }
  );

  // authRoutes.ts


}
