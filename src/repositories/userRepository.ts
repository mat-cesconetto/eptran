import { User, RegisterUser, ListUsers, UserInfo } from "../../types/User";
import prismaClient from "../prisma";
import bcrypt from "bcrypt" ;  // Importando bcrypt para fazer o hash da senha

class UserRepository {
  async create(data: RegisterUser): Promise<User> {
    try {
      const result = await prismaClient.usuario.create({
        data: {
          nome: data.nome,
          email: data.email,
          senha: data.senha, // Usa a senha criptografada
          cep: data.cep,
          cidade: data.cidade,
          data_nasc: new Date(data.data_nasc), // Converter a data
          escola: data.escola,
          escolaridade: data.escolaridade,
          estado: data.estado,
          rua: data.rua,
          sexo: data.sexo,
        },
      });

      return result as User;
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
      },
    });
  
    // Transformar o resultado para garantir compatibilidade com UserInfo
    return users.map(user => ({
      ...user,
      profilePicture: user.profilePicture || "", // Transformar null para string vazia
    }));
  }
  
  

  async updateUser(userId: number, data: Partial<User>): Promise<User> {
    try {
      const updatedUser = await prismaClient.usuario.update({
        where: { id: userId },
        data: {
          ...data,
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

  
}

export { UserRepository };
