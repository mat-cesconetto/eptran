import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import PasswordResetController from '../controllers/passwordResetController';  // Importa o controlador
import { UserRepository } from '../repositories/userRepository';  // Importa o repositório de usuário

export async function resetRoutes(fastify: FastifyInstance) {
  // Instanciando o PasswordResetController com o repositório de usuário e o fastify
  const passwordResetController = new PasswordResetController(
    new UserRepository(),
    fastify
  );

  // Rota para solicitar a redefinição de senha
  fastify.post(
    '/request-password-reset',
    async (
      request: FastifyRequest<{ Body: { email: string } }>, // Tipo do corpo da requisição
      reply: FastifyReply
    ) => {
      return await passwordResetController.requestPasswordReset(request, reply);
    }
  );

  // Rota para redefinir a senha
  fastify.post(
    '/reset-password',
    async (
      request: FastifyRequest<{ Body: { token: string; newPassword: string } }>, // Tipo do corpo da requisição
      reply: FastifyReply
    ) => {
      return await passwordResetController.resetPassword(request, reply);
    }
  );
}
