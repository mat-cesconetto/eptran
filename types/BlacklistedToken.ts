export type BlacklistedToken = {
    id: number; // O ID do token blacklisted
    token: string; // O token que foi blacklisted
    userId: number; // ID do usuário associado ao token
    expiresAt: Date; // Data de expiração do token
};

// Interface para operações de Blacklisted Token
export interface BlacklistedTokenRepositoryType {
    create(token: string, userId: number, expiresAt: Date): Promise<BlacklistedToken>;
    findByToken(token: string): Promise<BlacklistedToken | null>;
    revoke(token: string): Promise<BlacklistedToken | null>;
}
