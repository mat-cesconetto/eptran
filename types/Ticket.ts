import { EscolaridadeEnum, Status as PrismaStatus, SexoEnum } from '@prisma/client';
import { User } from './User';

// Use Prisma's Status enum
export { PrismaStatus as Status };

// Tipo para o modelo Usuario


// Tipo para o modelo RepostaTicketUsuario
export type RepostaTicketUsuario = {
    id: number;
    ticketId: number;
    resposta: string;
    createdAt: Date;
    updatedAt: Date;
};

// Tipo para o modelo TicketUsuario
export type TicketUsuario = {
    id: number;
    userId: number;
    assunto: string;
    descricao: string;
    anexo: string | null;
    status: PrismaStatus;
    createdAt: Date;
    updatedAt: Date;
    usuario: UsuarioInfo;
    respostas: RepostaTicketUsuario[];
};

export type UsuarioInfo = {
    id: number
    nome: string,
    email: string,
    escola: string,
    escolaridade: EscolaridadeEnum,
    sexo: SexoEnum

}

export type RequestTicket = {
    assunto: string;
    descricao: string;
    anexo?: string | null;
    status?: PrismaStatus;
}

// Tipo para criar um novo ticket
export type CreateTicket = {
    assunto: string;
    descricao: string;
    anexo?: string | null;
    status?: PrismaStatus;
    userId: number;
};