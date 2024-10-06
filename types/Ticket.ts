import { EscolaridadeEnum, StatusEnum as PrismaStatus, SexoEnum } from '@prisma/client';

// Re-exportando o enum de status do Prisma
export { PrismaStatus as Status };

// Tipo para o modelo Usuario (simplificado para associar com TicketUsuario)
export type UsuarioInfo = {
  id: number;
  nome: string;
  email: string;
  escola: string;
  escolaridade: EscolaridadeEnum;
  sexo: SexoEnum;
};

// Tipo para o modelo RepostaTicketUsuario (respostas de um ticket)
export type RepostaTicketUsuario = {
  id: number;
  ticketId: number;
  resposta: string;
  createdAt: Date;
  updatedAt: Date;
  usuario: UsuarioInfo; // Adiciona o usuário que respondeu ao ticket
};

// Tipo para o modelo TicketUsuario (ticket principal)
export type TicketUsuario = {
  id: number;
  userId: number;
  assunto: string;
  descricao: string;
  anexo: string | null;
  status: PrismaStatus; // Status do ticket
  createdAt: Date;
  updatedAt: Date;
  usuario: UsuarioInfo; // Relacionamento com o usuário criador do ticket
  updatedBy?: UsuarioInfo | null; // Usuário que atualizou o ticket (opcional)
  closedBy?: UsuarioInfo | null; // Usuário que fechou o ticket (opcional)
  respostas: RepostaTicketUsuario[]; // Lista de respostas associadas ao ticket
};

// Tipo para requisição de criação de ticket (usado ao criar um ticket)
export type CreateTicket = {
  assunto: string;
  descricao: string;
  anexo?: string | null;
  status?: PrismaStatus; // Status pode ser opcional na criação
  userId: number; // ID do usuário que está criando o ticket
};

// Tipo para a requisição de atualização de ticket
export type UpdateTicket = {
  id: number;
  assunto?: string; // Permite atualizar o assunto (opcional)
  descricao?: string; // Permite atualizar a descrição (opcional)
  anexo?: string | null; // Permite atualizar o anexo (opcional)
  status?: PrismaStatus; // Permite atualizar o status do ticket (opcional)
  updatedBy: number; // ID do usuário que está atualizando o ticket
};

// Tipo para o histórico de mudanças de status
export type TicketStatusHistory = {
  id: number;
  ticketId: number; // Relacionamento com o ticket
  status: PrismaStatus; // Status antigo ou atualizado
  changedBy: UsuarioInfo; // Usuário que alterou o status
  createdAt: Date; // Data da mudança
};

export type PaginatedTickets = {
    tickets: TicketUsuario[]; // Array de tickets
    totalTickets: number; // Total de tickets
    totalPages: number; // Total de páginas
  };