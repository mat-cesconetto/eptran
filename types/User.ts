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
  profilePicture?: string | null
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

import 'fastify';

declare module 'fastify' {
  interface FastifyRequest {
    file: () => Promise<{
      fieldname: string;
      filename: string;
      encoding: string;
      mimetype: string;
      file: NodeJS.ReadableStream;
      toBuffer: () => Promise<Buffer>;
    }>;
  }
}


export interface UserStats {
  id: number;
  escolaridade: 'ENSINO_FUNDAMENTAL_I' | 'ENSINO_FUNDAMENTAL_II' | 'ENSINO_MEDIO' | 'OUTROS';
}

export interface ListUsers {
  users: User[],
  totalUsers: number,
  totalPages: number,
}