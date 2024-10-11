import { PrismaClient } from '@prisma/client';
import { NotFoundError } from '../helpers/apiErrors';
import { RefreshToken, RefreshTokenRepositoryType, saveRefreshToken } from '../../types/RefreshToken';

class RefreshTokenRepository {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient(); // Inicializa o Prisma Client
    }

    // Salva um novo refresh token
    async saveRefreshToken(data: saveRefreshToken): Promise<RefreshToken> {
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 30); // Expira em 30 dias
    
        try {
            // Verifica se já existe um refresh token para o usuário
            const existingToken = await this.prisma.refreshToken.findFirst({
                where: {
                    userId: data.userId, // Procura pelo userId
                },
            });
    
            if (existingToken) {
                // Se já existir, atualiza o refresh token
                const updatedToken = await this.prisma.refreshToken.update({
                    where: {
                        id: existingToken.id, // Atualiza o refresh token existente usando seu id
                    },
                    data: {
                        token: data.token,
                        createdAt: new Date(),
                        expiresAt,
                    },
                });
                return updatedToken;
            } else {
                // Caso contrário, cria um novo refresh token
                const newRefreshToken = await this.prisma.refreshToken.create({
                    data: {
                        userId: data.userId, // Associa ao userId do usuário existente
                        token: data.token,
                        createdAt: new Date(),
                        expiresAt,
                    },
                });
                return newRefreshToken;
            }
        } catch (error) {
            console.error("Erro ao salvar o refresh token:", error);
            throw new Error("Erro ao salvar o refresh token."); // Lança um erro genérico
        }
    }
    
    // Valida um refresh token
    async validateRefreshToken(token: string): Promise<RefreshToken | null> {
        try {
            const refreshToken = await this.prisma.refreshToken.findFirst({
                where: {
                    token: token,
                },
            });
            if (!refreshToken) {
                console.log('Refresh token não encontrado.');
            }
            return refreshToken;
        } catch (error) {
            console.error("Erro ao validar o refresh token:", error);
            throw new Error("Erro ao validar o refresh token.");
        }
    }

    // Revoga um refresh token
    async revokeRefreshToken(token: string): Promise<RefreshToken | void> {
        try {
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

            throw new NotFoundError("Refresh token não encontrado"); // Lida com o caso em que o token não é encontrado
        } catch (error) {
            console.error("Erro ao revogar o refresh token:", error);
            throw new Error("Erro ao revogar o refresh token.");
        }
    }

    // Remove tokens expirados
    async removeExpiredTokens(): Promise<void> {
        try {
            const now = new Date();
            await this.prisma.refreshToken.deleteMany({
                where: {
                    expiresAt: {
                        lt: now,
                    },
                },
            });
        } catch (error) {
            console.error("Erro ao remover tokens expirados:", error);
            throw new Error("Erro ao remover tokens expirados.");
        }
    }

    async getRefreshTokenByUserId(userId: string): Promise<RefreshToken | null> {
        try {
            const userIdAsNumber = parseInt(userId, 10); // Converte o userId para number
    
            const refreshToken = await this.prisma.refreshToken.findFirst({
                where: {
                    userId: userIdAsNumber, // Agora passando o valor como number
                    expiresAt: {
                        gt: new Date(),
                    },
                },
            });
    
            if (!refreshToken) {
                console.log('Refresh token não encontrado ou expirado para o usuário.');
                return null;
            }
    
            return refreshToken;
        } catch (error) {
            console.error("Erro ao buscar o refresh token:", error);
            throw new Error("Erro ao buscar o refresh token.");
        }
    }
    
}

export { RefreshTokenRepository };
