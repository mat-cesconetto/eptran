import { FastifyRequest, FastifyReply } from "fastify";
import { UserRepository } from "../repositories/userRepository";
import { emailService } from "../services/emailService";
import bcrypt from "bcrypt";

interface RequestPasswordResetBody {
  email: string;
}

interface ResetPasswordBody {
  token: string;
  newPassword: string;
}

class PasswordResetController {
  constructor(
    private userRepository: UserRepository,
    private fastify: any // Tipo do Fastify
  ) {}

  async requestPasswordReset(
    request: FastifyRequest<{ Body: RequestPasswordResetBody }>,
    reply: FastifyReply
  ) {
    const { email } = request.body;

    try {
      // Verifica se o usuário existe
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        return reply.status(404).send({ error: "Usuário não encontrado!" });
      }

      // Gerar token JWT para redefinição de senha (expira em 10 minutos)
      const resetToken = this.fastify.jwt.sign(
        { email: user.email },
        { expiresIn: "10m" }
      );

      // Enviar o email com o link de redefinição de senha
      const resetLink = `${process.env.FRONTEND_URL}/resetar-senha?token=${resetToken}`;

      const emailSubject = "Redefinição de Senha";
      const emailText = `Clique no link abaixo para redefinir sua senha:\n${resetLink}`;
      const emailHTML = `<p>Clique no link abaixo para redefinir sua senha:</p><a href="${resetLink}">${resetLink}</a>`;

      await emailService.sendEmail(
        user.email,
        emailSubject,
        emailText,
        emailHTML
      );

      return reply.send({ message: "Email de redefinição enviado!" });
    } catch (error) {
      console.error("Erro ao solicitar redefinição de senha:", error);
      return reply
        .status(500)
        .send({ error: "Erro ao enviar email de redefinição de senha" });
    }
  }

  async resetPassword(
    request: FastifyRequest<{ Body: ResetPasswordBody }>,

    reply: FastifyReply
  ) {
    const { token, newPassword } = request.body;

    try {
      // Verificar e decodificar o token
      console.log("Decodificando token...");
      const decodedToken = this.fastify.jwt.verify(token);
      const email = decodedToken.email;
      console.log(`Token decodificado, email: ${email}`);

      // Verificar se o usuário existe
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        return reply.status(404).send({ error: "Usuário não encontrado!" });
      }

      console.log("Usuário encontrado, atualizando senha...");

      // Hash da nova senha
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      console.log("Nova senha hash gerado:", hashedPassword);

      // Atualizar a senha no banco de dados
      await this.userRepository.updatePasswordByEmail(email, hashedPassword);

      return reply.send({ message: "Senha atualizada com sucesso!" });
    } catch (error: any) {
      if (
        error.name === "JsonWebTokenError" ||
        error.name === "TokenExpiredError"
      ) {
        console.log("Token inválido ou expirado");
        return reply.status(400).send({ error: "Token inválido ou expirado" });
      }
      console.error("Erro ao redefinir senha:", error);
      return reply.status(500).send({ error: "Falha ao atualizar a senha" });
    }
  }
}

export default PasswordResetController;
