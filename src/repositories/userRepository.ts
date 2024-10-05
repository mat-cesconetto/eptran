import { User, RegisterUser, ListUsers } from "../../types/User";
import prismaClient from "../prisma";

class UserRepository {
  async create(data: RegisterUser): Promise<User> {
    try {
      // Cria o usuário no banco de dados usando a senha criptografada
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
      throw new Error("Erro ao criar usuário."); // Lança um erro genérico
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
      totalUsers, // Total de usuários na base
      totalPages: Math.ceil(totalUsers / limit), // Total de páginas
    };
  }

  async updateUserProfilePicture(
    userId: number,
    fileName: string
  ): Promise<void> {
    await prismaClient.usuario.update({
      where: { id: userId },
      data: {
        profilePicture: fileName, // Supondo que o campo se chama `fotoPerfil`
      },
    });
  }

  async searchUsers(term: string): Promise<User[]> {
    return prismaClient.usuario.findMany({
      where: {
        OR: [
          { nome: { contains: term, mode: "insensitive" } }, // Pesquisa pelo nome
          { email: { contains: term, mode: "insensitive" } }, // Pesquisa pelo email
          { escola: { contains: term, mode: "insensitive" } }, // Pesquisa pela escola
          { id: Number(term) || undefined }, // Pesquisa pelo ID
        ],
      },
    });
  }
}

export { UserRepository };
