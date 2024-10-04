import { User, RegisterUser } from '../../types/User';
import prismaClient from '../prisma';

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
}

export { UserRepository };
