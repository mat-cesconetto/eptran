import { EstadoEnum, EscolaridadeEnum, SexoEnum, Conquistas } from '@prisma/client';
import { User } from './User'

export interface LogoutRequestBody {
    userId: number;
}

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
  

  
  export interface AuthRepositoryType {
    findByEmail(email: string): Promise<User | null>;
  }
  