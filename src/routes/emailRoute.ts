import { FastifyInstance } from 'fastify';
import { sendEmailConfirmation, confirmEmailChange } from '../controllers/emailController';

export async function emailRoutes(server: FastifyInstance) {
  // Rota para enviar o e-mail de confirmação de troca de e-mail
  server.post('/send-email-confirmation', sendEmailConfirmation);

  // Rota para confirmar a troca de e-mail, chamada ao clicar no link enviado
  server.get('/confirm-email', confirmEmailChange);
}
