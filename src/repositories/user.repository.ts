import { UserRepository, User, RegisterUser } from '../../types/User';
import prismaClient from '../prisma';
import bcrypt from 'bcrypt';

class UserRepositoryPrisma implements UserRepository {
    async create(data: RegisterUser): Promise<User> {
        // Gera o hash da senha
        const hashedPassword = await bcrypt.hash(data.senha, 10);

        // Cria o usuário no banco de dados usando a senha criptografada
        const result = await prismaClient.usuario.create({
            data: {
                nome: data.nome,
                email: data.email,
                senha: hashedPassword, // Usa o hashedPassword gerado aqui
                cep: data.cep,
                cidade: data.cidade,
                data_nasc: new Date(data.data_nasc), // Converter a data
                escola: data.escola,
                escolaridade: data.escolaridade,
                estado: data.estado,
                rua: data.rua,
                sexo: data.sexo,
            }
        });

        return result as User;
    }

    async findByEmail(email: string): Promise<User | null> {
        // Busca um usuário pelo email
        const user = await prismaClient.usuario.findFirst({
            where: {
                email
            }
        });
    
        return user as User | null; // Retorna o usuário encontrado ou null
    }
    
}

export { UserRepositoryPrisma };
