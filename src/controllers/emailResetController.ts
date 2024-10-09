import { FastifyRequest, FastifyReply } from "fastify";
import { UserRepository } from "../repositories/userRepository";
import { emailService } from "../services/emailService";
import bcrypt from "bcrypt";

interface RequestEmaildResetBody {
  emailAntigo: string;
  emailNovo: string;
}

interface ResetEmailBody {
  token: string;
}

class EmailResetController {
  constructor(
    private userRepository: UserRepository,
    private fastify: any // Tipo do Fastify
  ) {}

  async requestEmailReset(
    request: FastifyRequest<{ Body: RequestEmaildResetBody }>,
    reply: FastifyReply
  ) {
    const user = request.user as { email: string }; // Type assertion based on your JWT payload
    const userEmail = user.email;
  
    const { emailAntigo, emailNovo } = request.body;
  
    if (userEmail !== emailAntigo) {
      return reply.status(400).send({ error: "Email não corresponde com o do usuário" });
    }

    try {
      // Verifica se o usuário existe
      const user = await this.userRepository.findByEmail(emailAntigo);
      if (!user) {
        return reply.status(404).send({ error: "Usuário não encontrado!" });
      }

      // Gerar token JWT para redefinição de email (expira em 10 minutos)
      const resetToken = this.fastify.jwt.sign(
        { email: user.email, emailNovo: emailNovo },
        { expiresIn: "10m" }
      );

      // Enviar o email com o link de redefinição de senha
      const resetLink = `${process.env.FRONTEND_URL}/reset-email?token=${resetToken}`;

      const emailSubject = "Redefinição de Email";
      const emailText = `Clique no link abaixo para confirmar sua redefinição de email:\n${resetLink}`;
      const emailHTML = `<p>Clique no link abaixo para confirmar sua redefinição de email:</p><a href="${resetLink}">${resetLink}</a>`;

      await emailService.sendEmail(
        emailNovo,
        emailSubject,
        emailText,
        emailHTML
      );

      return reply.send({ message: "Email de redefinição enviado!" });
    } catch (error) {
      console.error("Erro ao solicitar redefinição de email:", error);
      return reply
        .status(500)
        .send({ error: "Erro ao enviar email de redefinição de email" });
    }
  }

  async resetEmail(
    request: FastifyRequest<{ Body: ResetEmailBody }>,

    reply: FastifyReply
  ) {
    const { token } = request.body;

    try {
      // Verificar e decodificar o token
      console.log("Decodificando token...");
      const decodedToken = this.fastify.jwt.verify(token);
      const email = decodedToken.email;
      const emailNovo = decodedToken.emailNovo;
      console.log(`Token decodificado, email: ${email} ${emailNovo}`);

      // Verificar se o usuário existe
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        return reply.status(404).send({ error: "Usuário não encontrado!" });
      }

      console.log("Usuário encontrado, atualizando email...");

      // Hash da nova senha
      console.log("Novo email:", emailNovo);

      // Atualizar a senha no banco de dados
      await this.userRepository.updateEmailByEmail(email, emailNovo);

      return reply.send({ message: "Email atualizado com sucesso!" });
    } catch (error: any) {
      if (
        error.name === "JsonWebTokenError" ||
        error.name === "TokenExpiredError"
      ) {
        console.log("Token inválido ou expirado");
        return reply.status(400).send({ error: "Token inválido ou expirado" });
      }
      console.error("Erro ao redefinir email:", error);
      return reply.status(500).send({ error: "Falha ao atualizar a senha" });
    }
  }
}

export default EmailResetController;
