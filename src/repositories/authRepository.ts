import { User, RegisterUser } from '../../types/User';
import prismaClient from '../prisma';

class AuthRepository {
    async findByEmail(email: string): Promise<User | null> {
        const user = await prismaClient.usuario.findUnique({
            where: {
                email
            }
        })

        return user as User
    }

}

export { AuthRepository }