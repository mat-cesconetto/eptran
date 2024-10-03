import { PrismaClient } from '@prisma/client';

class BlacklistTokenRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient(); // Inicializa o Prisma Client
    }

    // Adiciona um token à blacklist
    async addToBlacklist(token: string) {
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 30); // Expira em 30 dias

        return this.prisma.blacklistedToken.create({
            data: {
                token,
                createdAt: new Date(),
                expiresAt,
            },
        });
    }

    // Verifica se um token está na blacklist
    async isTokenBlacklisted(token: string) {
        return this.prisma.blacklistedToken.findFirst({
            where: {
                token,
            },
        });
    }

    // Remove tokens expirados da blacklist (opcional)
    async removeExpiredTokens() {
        const now = new Date();
        await this.prisma.blacklistedToken.deleteMany({
            where: {
                expiresAt: {
                    lt: now,
                },
            },
        });
    }
}

export { BlacklistTokenRepository };
