// Define o tipo do BlacklistedToken
export type BlacklistedToken = {
    id: number;          // ID do token na blacklist (gerado automaticamente)
    token: string;       // O valor do token que foi adicionado à blacklist
    createdAt: Date;     // Data de criação do registro do token na blacklist
    expiresAt: Date;     // Data de expiração do token na blacklist
  };
  
  // Tipagem dos métodos no repositório da blacklist
  export interface BlacklistTokenRepositoryType {
    addToBlacklist(userId: number): Promise<BlacklistedToken | null>;
    isTokenBlacklisted(token: string): Promise<BlacklistedToken | null>;
    removeExpiredTokens(): Promise<void>;
  }
  