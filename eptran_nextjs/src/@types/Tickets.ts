import { Status } from "./Status";
import { UserInfo } from "./User";

export type OpenTicket = {
    assunto: string;
    descricao: string;
    anexo: File;
}

export type Ticket = {
    id: number;
    userId: number;
    descricao: string;
    anexo: string;
    status: Status;
    prioridade: string
    createdAt: Date
    updatedAt: Date
    usuario: UserInfo
    respostas: RespostaTicket
}

export type UsuarioTicket = {
    id: number
    nome: string
    email: string
}

export type RespostaTicket = {
    id: number
    createdAt: Date
    updatedAt: Date
    userId: number
    ticketId: number
    resposta: string
    usuario: UsuarioTicket
}
export type ResponderTicket = {
    resposta: string
}

// Tipo de ticket com os campos correspondentes à resposta da API
export type TicketSummary = {
    id: number;
    usuarioId: number;
    usuarioNome: string;
    usuarioFotoPerfil: string | null;
    email: string;
    assunto: string;
    status: Status;
    prioridade: string;
    createdAt: string; // ou `Date` se você preferir fazer a conversão antes de usar
}

// Tipo para resposta de paginação de tickets
export type PaginatedTicketsResponse = {
    tickets: TicketSummary[];
    totalTickets: number;
    totalPages: number;
    currentPage: number;
}