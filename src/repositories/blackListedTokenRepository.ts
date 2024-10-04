import { PrismaClient } from '@prisma/client';
import { BlacklistedToken } from '../../types/BlacklistedToken';
import { NotFoundError } from '../helpers/apiErrors'; // Importando a classe de erro

class BlacklistTokenRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient(); // Inicializa o Prisma Client
    }

    // Adiciona um refresh token à blacklist
    async addToBlacklist(token: string): Promise<BlacklistedToken | null> {
        try {
            // Busca o refresh token no banco de dados
            const refreshToken = await this.prisma.refreshToken.findFirst({
                where: {
                    token: token, // Modificado para buscar pelo token recebido
                },
            });

            // Verifica se o refresh token foi encontrado
            if (!refreshToken) {
                console.log('Nenhum refresh token encontrado para o token fornecido');
                throw new NotFoundError('Refresh token não encontrado'); // Lança um erro se não encontrado
            }

            // Define a data de expiração para o token na blacklist
            const expiresAt = refreshToken.expiresAt;

            // Adiciona o token à blacklist
            const blacklistedToken = await this.prisma.blacklistedToken.create({
                data: {
                    token: refreshToken.token, // Move o token do refresh para a blacklist
                    createdAt: new Date(),
                    expiresAt: expiresAt, // Mantém a data de expiração do refresh token
                },
            });

            // Opcional: Apaga o refresh token após movê-lo para a blacklist
            await this.prisma.refreshToken.delete({
                where: {
                    id: refreshToken.id,
                },
            });

            return blacklistedToken;
        } catch (error) {
            console.error("Erro ao adicionar à blacklist:", error);
            throw new Error('Erro ao adicionar o token à blacklist');
        }
    }

    // Verifica se um token está na blacklist
    async isTokenBlacklisted(token: string): Promise<BlacklistedToken | null> {
        try {
            const blacklistedToken = await this.prisma.blacklistedToken.findFirst({
                where: {
                    token,
                },
            });

            if (!blacklistedToken) {
                console.log('Token não encontrado na blacklist');
            }

            return blacklistedToken;
        } catch (error) {
            console.error("Erro ao verificar blacklist:", error);
            throw new Error('Erro ao verificar se o token está na blacklist');
        }
    }

    // Remove tokens expirados da blacklist
    async removeExpiredTokens(): Promise<void> {
        try {
            const now = new Date();
            await this.prisma.blacklistedToken.deleteMany({
                where: {
                    expiresAt: {
                        lt: now,
                    },
                },
            });
        } catch (error) {
            console.error("Erro ao remover tokens expirados:", error);
            throw new Error('Erro ao remover tokens expirados da blacklist');
        }
    }
}

export { BlacklistTokenRepository };
