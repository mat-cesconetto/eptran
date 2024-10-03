import { PrismaClient } from '@prisma/client';
import { NotFoundError } from '../helpers/apiErrors';

class RefreshTokenRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient(); // Inicializa o Prisma Client
    }

    // Salva um novo refresh token
    async saveRefreshToken(userId: number, token: string) {
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 30); // Expira em 30 dias

        return this.prisma.refreshToken.create({
            data: {
                userId,
                token,
                createdAt: new Date(),
                expiresAt,
            },
        });
    }

    // Valida um refresh token
    async validateRefreshToken(token: string) {
        return this.prisma.refreshToken.findFirst({
            where: {
                token: token,
            },
        });
    }

    // Revoga um refresh token
    async revokeRefreshToken(token: string) {
        // Primeiro, encontre o refresh token usando o token
        const refreshToken = await this.prisma.refreshToken.findFirst({
            where: {
                token: token,
            },
        });
    
        // Se encontrar o token, delete usando o ID
        if (refreshToken) {
            return this.prisma.refreshToken.delete({
                where: {
                    id: refreshToken.id, // Usando o ID encontrado
                },
            });
        }
    
        throw new NotFoundError("Refresh token not found"); // Lide com o caso em que o token não é encontrado
    }
    

    // Remove tokens expirados (opcional)
    async removeExpiredTokens() {
        const now = new Date();
        await this.prisma.refreshToken.deleteMany({
            where: {
                expiresAt: {
                    lt: now,
                },
            },
        });
    }
}

export { RefreshTokenRepository };
