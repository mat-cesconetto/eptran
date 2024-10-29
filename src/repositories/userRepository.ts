import { User, RegisterUser, ListUsers, UserInfo, UserUpdate } from "../../types/User";
import prismaClient from "../prisma";
import bcrypt from "bcrypt" ;  // Importando bcrypt para fazer o hash da senha

class UserRepository {
  async create(data: RegisterUser): Promise<{ message: string }> {
    try {
      await prismaClient.usuario.create({
        data: {
          nome: data.nome,
          email: data.email,
          senha: data.senha, // Usa a senha criptografada
          cep: data.cep,
          bairro: data.bairro,
          cidade: data.cidade,
          data_nasc: new Date(data.data_nasc), // Converter a data
          escola: data.escola,
          escolaridade: data.escolaridade,
          estado: data.estado,
          rua: data.rua,
          sexo: data.sexo,
        },
      });

      // Retorna uma mensagem de sucesso
      return { message: "Usuário criado com sucesso!" };
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      throw new Error("Erro ao criar usuário.");
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await prismaClient.usuario.findUnique({
        where: { email: email },
      });
      return user;
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      throw new Error("Erro ao buscar usuário.");
    }
  }
  
  async findById(id: number): Promise<User | null> {
    return prismaClient.usuario.findUnique({
      where: { id },
    });
  }

  async listUsers(page: number, limit: number): Promise<ListUsers> {
    const [users, totalUsers] = await prismaClient.$transaction([
      prismaClient.usuario.findMany({
        skip: (page - 1) * limit,
        take: limit,
      }),
      prismaClient.usuario.count(), // Conta o total de usuários
    ]);

    return {
      users,
      totalUsers,
      totalPages: Math.ceil(totalUsers / limit),
    };
  }

  async updateUserProfilePicture(
    userId: number,
    fileName: string
  ): Promise<void> {
    await prismaClient.usuario.update({
      where: { id: userId },
      data: {
        profilePicture: fileName,
      },
    });
  }

  async searchUsers(term: string): Promise<UserInfo[]> {
    const users = await prismaClient.usuario.findMany({
      where: {
        OR: [
          { nome: { contains: term, mode: "insensitive" } },
          { email: { contains: term, mode: "insensitive" } },
          { escola: { contains: term, mode: "insensitive" } },
          { id: Number(term) || undefined },
        ],
      },
      select: {
        id: true,
        nome: true,
        email: true,
        cep: true,
        rua: true,
        cidade: true,
        estado: true,
        escola: true,
        data_nasc: true,
        escolaridade: true,
        sexo: true,
        profilePicture: true,
        bairro: true,
      },
    });
  
    // Transformar o resultado para garantir compatibilidade com UserInfo
    return users.map(user => ({
      ...user,
      profilePicture: user.profilePicture || "",
    }));
  }
  
  

  async updateUser(userId: number, data: Partial<UserUpdate>): Promise<UserUpdate> {
    try {
      // Remover os campos 'email' e 'senha' da atualização, caso presentes
      const { email, senha, ...allowedData } = data;
  
      const updatedUser = await prismaClient.usuario.update({
        where: { id: userId },
        data: {
          ...allowedData,
          updatedAt: new Date(),
        },
      });
  
      return updatedUser;
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      throw new Error("Erro ao atualizar informações do usuário.");
    }
  }
  
  // Novo método para atualizar a senha do usuário usando o email
  async updatePasswordByEmail(email: string, newPassword: string): Promise<void> {
    try {
      // Atualiza a senha no banco de dados
      await prismaClient.usuario.update({
        where: { email },
        data: {
          senha: newPassword,
          updatedAt: new Date(),
        },
      });

      console.log(`Senha atualizada para o usuário com email: ${email}`);
    } catch (error) {
      console.error("Erro ao atualizar senha:", error);
      throw new Error("Erro ao atualizar a senha.");
    }
  }
  async updateEmailByEmail(email: string, emailNovo: string): Promise<void> {
    try {
      // Atualiza a senha no banco de dados
      await prismaClient.usuario.update({
        where: { email },
        data: {
          email: emailNovo,
          updatedAt: new Date(),
        },
      });

      console.log(`Email atualizado para o usuário com email: ${email}`);
    } catch (error) {
      console.error("Erro ao atualizar email:", error);
      throw new Error("Erro ao atualizar a email.");
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await prismaClient.$transaction(async (prisma) => {
        // Deletar todos os RefreshTokens associados ao usuário
        await prisma.refreshToken.deleteMany({
          where: { userId: id },
        });

        // Deletar todos os Access associados ao usuário
        await prisma.access.deleteMany({
          where: { userId: id },
        });

        // Deletar as Conquistas associadas ao usuário (se existirem)
        await prisma.conquistas.delete({
          where: { fk_id_usuario: id },
        }).catch(() => {
          // Ignora o erro se não existirem conquistas para este usuário
        });

        // Deletar todas as respostas de tickets associadas ao usuário
        await prisma.repostaTicketUsuario.deleteMany({
          where: { userId: id },
        });

        // Atualizar tickets onde o usuário é o criador, atualizador ou fechador
        await prisma.ticketUsuario.updateMany({
          where: {
            OR: [
              { userId: id },
              { updatedById: id },
              { closedById: id },
            ],
          },
          data: {
            updatedById: null,
            closedById: null,
          },
        });

        // Finalmente, deletar o usuário
        await prisma.usuario.delete({
          where: { id },
        });
      });
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      throw new Error("Não foi possível deletar o usuário e seus dados relacionados.");
    }
  }
}


export { UserRepository };
