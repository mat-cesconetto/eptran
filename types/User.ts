import { EstadoEnum, EscolaridadeEnum, SexoEnum, Conquistas } from '@prisma/client';
import { RegisterUser } from './Auth';

export type User = {
  id: number;
  nome: string;
  email: string;
  senha: string;
  bairro: string; 
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


export type UserInfo = {
  id: number,
  nome: string,
  email: string,
  cep: string,
  bairro: string;
  rua: string,
  cidade: string,
  estado: EstadoEnum,
  escola: string,
  data_nasc: Date,
  escolaridade: EscolaridadeEnum,
  sexo: SexoEnum,
  profilePicture: string,
}

export type UserUpdate = {
 
  nome: string;
  email: string;
  senha: string;
  cep: string;
  rua: string;
  cidade: string;
  bairro: string;
  estado: EstadoEnum;
  escola: string;
  data_nasc: Date;
  escolaridade: EscolaridadeEnum;
  sexo: SexoEnum;
  profilePicture?: string | null

};


export interface UserRepositoryType {
  create(data: RegisterUser): Promise<User>;  // Método para criar um novo usuário
  listUsers(page: number, limit: number): Promise<ListUsers>; // Método para listar usuários com paginação
  updateUserProfilePicture(userId: number, fileName: string): Promise<void>; // Método para atualizar a foto de perfil
  searchUsers(term: string): Promise<User[]>; // Método para pesquisar usuários
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