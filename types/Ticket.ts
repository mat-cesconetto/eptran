import { EscolaridadeEnum, StatusEnum as PrismaStatus, RepostaTicketUsuario, SexoEnum, StatusEnum } from '@prisma/client';
import { PrioridadeEnum } from './PrioridadeEnum';

// Re-exportando o enum de status do Prisma
// Re-exportando o enum de status do Prisma
export { PrismaStatus as Status, RepostaTicketUsuario };

// Tipo para o modelo Usuario (simplificado para associar com TicketUsuario)
export type UsuarioInfo = {
  id: number;
  nome: string;
  email: string;
  escola: string;
  escolaridade: EscolaridadeEnum;
  sexo: SexoEnum;
};
// Tipo para o modelo Usuario simplificado para respostas de tickets
export type UsuarioResumido = {
  id: number;
  nome: string;
  email: string;
};

// Tipo para uma resposta de ticket, com o usuário associado à resposta
export type RespostaResumida = {
  id: number;
  createdAt: Date;

  updatedAt: Date;
  userId: number; // ID do usuário que respondeu
  ticketId: number; // ID do ticket ao qual a resposta pertence
  resposta: string; // Conteúdo da resposta
  usuario: UsuarioResumido; // Relacionamento com o usuário que fez a resposta
};

// Tipo resumido para um ticket, sem incluir todos os detalhes do usuário
export type TicketResumido = {
  id: number;
  status: StatusEnum;
  prioridade: string;
  assunto: string;
  descricao: string;
  usuario: UsuarioResumido; // Relacionamento com o criador do ticket (resumido)
  respostas: RespostaResumida[]; // Lista de respostas associadas ao ticket
};

// Ajustando o tipo completo de TicketUsuario (ticket com todas as propriedades)
export type TicketUsuario = {
  id: number;
  userId: number;
  assunto: string;
  descricao: string;
  anexo: string | null;
  status: PrismaStatus; // Status do ticket
  createdAt: Date;
  updatedAt: Date;
  usuario: UsuarioInfo; // Relacionamento com o usuário criador do ticket (completo)
  updatedBy?: UsuarioInfo | null; // Usuário que atualizou o ticket (opcional)
  closedBy?: UsuarioInfo | null; // Usuário que fechou o ticket (opcional)
  respostas: RepostaTicketUsuario[]; // Lista de respostas associadas ao ticket (completo)
};

// Tipo de tickets paginados
export type PaginatedTickets = {
  tickets: TicketInfo[]; // Mudei para TicketInfo
  totalTickets: number; 
  totalPages: number; 
};
// Tipo para histórico de status do ticket
export type TicketStatusHistory = {
  id: number;
  ticketId: number; // Relacionamento com o ticket
  status: PrismaStatus; // Status antigo ou atualizado
  changedBy: UsuarioInfo; // Usuário que alterou o status
  createdAt: Date; // Data da mudança
};

// Tipo para criação de tickets
export type CreateTicket = {
  assunto: string;
  descricao: string;
  anexo?: string | null;
  status?: PrismaStatus; // Status opcional na criação
  userId: number; // ID do usuário que está criando o ticket
};

// Tipo para atualização de tickets
export type UpdateTicket = {
  id: number;
  assunto?: string; // Permite atualizar o assunto (opcional)
  descricao?: string; // Permite atualizar a descrição (opcional)
  anexo?: string | null; // Permite atualizar o anexo (opcional)
  status?: PrismaStatus; // Permite atualizar o status do ticket (opcional)
  updatedBy: number; // ID do usuário que está atualizando o ticket
};

export type TicketInfo = {
  usuarioId: number;
  usuarioNome: string;
  usuarioFotoPerfil: string | null;
  email: string;
  assunto: string;
  status: PrismaStatus;
  prioridade: PrioridadeEnum;
  createdAt: Date;
};

// Atualiza o tipo de PaginatedTickets para usar TicketInfo
