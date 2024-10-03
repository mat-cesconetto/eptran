
export type RefreshToken = {
  id: number; // ID do refresh token (gerado automaticamente)
  token: string; // O valor do refresh token
  userId: number; // ID do usuário ao qual o refresh token pertence
  createdAt: Date; // Data de criação do refresh token
  updatedAt: Date; // Data da última atualização do refresh token
  expiresAt: Date; // Data de expiração do refresh token
};

export interface RefreshTokenRepositoryType {
  create(userId: number, token: string, expiresAt: Date): Promise<RefreshToken>;
  findByToken(token: string): Promise<RefreshToken | null>;
  delete(token: string): Promise<void>; // Para revogar o token
}
