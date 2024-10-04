import { EstadoEnum, EscolaridadeEnum, SexoEnum, Conquistas } from '@prisma/client';
import { RegisterUser } from './Auth';

export type User = {
  id: number;
  nome: string;
  email: string;
  senha: string;
  cep: string;
  rua: string;
  cidade: string;
  estado: EstadoEnum;
  escola: string;
  data_nasc: Date;
  escolaridade: EscolaridadeEnum;
  sexo: SexoEnum;
  adm: boolean | null; // Mantenha o null se você realmente precisar
  createdAt: Date;
  updatedAt: Date;
};


export interface UserRepositoryType {
  create(data: RegisterUser): Promise<User>;
}
export { RegisterUser };


declare module 'fastify' {
  interface FastifyRequest {
      user: User; // Adicionando a propriedade user
  }
}