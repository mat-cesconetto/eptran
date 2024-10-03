import { EstadoEnum, EscolaridadeEnum, SexoEnum, Conquistas } from '@prisma/client';

export type User = {
  id: number; // Removido o '?' já que o id é sempre gerado
  nome: string;
  email: string;
  senha: string; // Se for armazenada como hash, considere renomear ou ajustar a tipagem
  cep: string;
  rua: string;
  cidade: string;
  estado: EstadoEnum;
  escola: string;
  data_nasc: Date;
  escolaridade: EscolaridadeEnum;
  sexo: SexoEnum;
  adm?: boolean; // Mantido como opcional
  conquistas?: Conquistas | null; // Mudado para ser um único objeto ou null
  createdAt: Date; // Campo para a data de criação
  updatedAt: Date; // Campo para a data de atualização
};

export interface RegisterUser {
  nome: string;
  email: string;
  senha: string; // Considere também o uso de hash para segurança
  cep: string;
  rua: string;
  cidade: string;
  estado: EstadoEnum;
  escola: string;
  data_nasc: Date;
  escolaridade: EscolaridadeEnum;
  sexo: SexoEnum;
}

export interface LoginUser {
  email: string;
  senha: string;
}

export interface UserRepositoryType {
  create(data: RegisterUser): Promise<User>;
}

export interface AuthRepositoryType {
  findByEmail(email: string): Promise<User | null>;
}
