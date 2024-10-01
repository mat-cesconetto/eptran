import { EstadoEnum, EscolaridadeEnum, SexoEnum, Conquistas } from '@prisma/client';

export type User = {
  id?: number;
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
  adm?: boolean; // Made optional as it might have a default value
  conquistas?: Conquistas[]; // Changed to lowercase and made optional
};

export interface RegisterUser {
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
};

export interface LoginUser {
  email: string,
  senha: string
}



export interface UserRepository {
    create(data: RegisterUser): Promise<User>
    findByEmail(email: string): Promise<User | null>
}