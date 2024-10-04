import { User, RegisterUser } from '../../types/User';
import prismaClient from '../prisma';
import { NotFoundError } from '../helpers/apiErrors'; // Importando a classe de erro

class AuthRepository {
    async findByEmail(email: string): Promise<User | null> {
        const user = await prismaClient.usuario.findUnique({
            where: {
                email
            }
        });

        return user as User;
    }

    // Método para buscar usuário por ID
    async getUserById(userId: number): Promise<User | null> {
        try {
            // Use await para obter o usuário
            const user = await prismaClient.usuario.findUnique({
                where: {
                    id: userId,
                },
            });

            // Lança NotFoundError se o usuário não for encontrado
            if (!user) {
                throw new NotFoundError('Usuário não encontrado');
            }

            return user; // Retorna o usuário encontrado
        } catch (error) {
            console.error("Erro ao buscar usuário por ID:", error);
            throw new NotFoundError('Erro ao buscar usuário por ID');
        }
    }
}

export { AuthRepository };
