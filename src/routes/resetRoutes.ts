import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import PasswordResetController from '../controllers/passwordResetController';
import { UserRepository } from '../repositories/userRepository';
import EmailResetController from '../controllers/emailResetController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { Static, Type } from '@sinclair/typebox';

export async function resetRoutes(fastify: FastifyInstance) {
  const passwordResetController = new PasswordResetController(
    new UserRepository(),
    fastify
  );
  const emailResetController = new EmailResetController(
    new UserRepository(),
    fastify
  );

  // Password reset routes
  fastify.post(
    '/request-password-reset',
    async (
      request: FastifyRequest<{ Body: { email: string } }>,
      reply: FastifyReply
    ) => {
      return await passwordResetController.requestPasswordReset(request, reply);
    }
  );

  fastify.post(
    '/reset-password',
    async (
      request: FastifyRequest<{ Body: { token: string; newPassword: string } }>,
      reply: FastifyReply
    ) => {
      return await passwordResetController.resetPassword(request, reply);
    }
  );

  // Email reset routes
  const RequestEmailResetBody = Type.Object({
    emailAntigo: Type.String({ format: 'email' }),
    emailNovo: Type.String({ format: 'email' })
  });
  
  type RequestEmailResetBodyType = Static<typeof RequestEmailResetBody>;

  fastify.post<{
    Body: RequestEmailResetBodyType
  }>(
    '/request-email-reset',
    {
      preHandler: authMiddleware,
      schema: {
        body: RequestEmailResetBody
      }
    },
    async (request, reply) => {
      return await emailResetController.requestEmailReset(request, reply);
    }
  );

  fastify.post(
    '/reset-email',
    async (
      request: FastifyRequest<{ Body: { token: string } }>,
      reply: FastifyReply
    ) => {
      return await emailResetController.resetEmail(request, reply);
    }
  );
}