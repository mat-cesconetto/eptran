import { User, RegisterUser } from '../../types/User';
import prismaClient from '../prisma';
import bcrypt from 'bcrypt';

class UserRepository {
    async create(data: RegisterUser): Promise<User> {
        // Cria o usuário no banco de dados usando a senha criptografada
        const result = await prismaClient.usuario.create({
            data: {
                nome: data.nome,
                email: data.email,
                senha: data.senha, // Usa o hashedPassword gerado aqui
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
    
}

export { UserRepository };
