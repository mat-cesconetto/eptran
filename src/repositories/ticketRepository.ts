import { CreateTicket, TicketUsuario, Status, RepostaTicketUsuario, PaginatedTickets } from "../../types/Ticket";
import prismaClient from "../prisma";

class TicketRepository {
    async create(data: CreateTicket): Promise<TicketUsuario> {
        try {
            // Log para verificar o userId recebido
            console.log("userId recebido:", data.userId);
    
            const usuario = await prismaClient.usuario.findUnique({
                where: { id: data.userId }
            });
            
            if (!usuario) {
                throw new Error("Usuário não encontrado.");
            }
    
            // Criação do ticket
            const result = await prismaClient.ticketUsuario.create({
                data: {
                    assunto: data.assunto,
                    descricao: data.descricao,
                    anexo: data.anexo,
                    status: "EM_ABERTO",
                    userId: data.userId,
                },
                include: {
                    usuario: true,
                    respostas: {
                        include: {
                            usuario: true,
                        },
                    },
                },
            });
    
            const ticketUsuario: TicketUsuario = {
                ...result,
                usuario: result.usuario,
                respostas: result.respostas.map(resposta => ({
                    ...resposta,
                    usuario: resposta.usuario,
                })),
            };
    
            return ticketUsuario;
        } catch (error) {
            console.error("Erro ao criar ticket:", error);
            throw new Error("Erro ao criar ticket.");
        }
    }
    

    async getTicketById(id: number): Promise<TicketUsuario | null> {
        return await prismaClient.ticketUsuario.findUnique({
            where: { id },
            include: {
                usuario: true, // Inclui as informações do usuário do ticket
                respostas: {
                    include: {
                        usuario: true, // Inclui o usuário associado a cada resposta
                    },
                },
            },
        });
    }

    async getAllTickets(page: number, limit: number): Promise<PaginatedTickets> {
        const [tickets, totalTickets] = await prismaClient.$transaction([
            prismaClient.ticketUsuario.findMany({
                skip: (page - 1) * limit,
                take: limit,
                include: {
                    usuario: true, // Inclui informações do usuário associado ao ticket
                    respostas: {
                        include: {
                            usuario: true, // Inclui o usuário associado a cada resposta
                        },
                    },
                },
            }),
            prismaClient.ticketUsuario.count(),
        ]);

        return {
            tickets,
            totalTickets,
            totalPages: Math.ceil(totalTickets / limit),
        };
    }

    async updateTicketStatus(id: number, status: Status): Promise<TicketUsuario> {
        return await prismaClient.ticketUsuario.update({
            where: { id },
            data: { status },
            include: {
                usuario: true, // Inclui as informações do usuário associado ao ticket
                respostas: {
                    include: {
                        usuario: true, // Inclui o usuário associado a cada resposta
                    },
                },
            },
        });
    }

    async addResposta(ticketId: number, resposta: string, userId: number): Promise<RepostaTicketUsuario> {
        // Verifica se o ticket existe
        const ticketExists = await prismaClient.ticketUsuario.findUnique({
            where: { id: ticketId },
        });
    
        if (!ticketExists) {
            throw new Error(`Ticket com id ${ticketId} não encontrado.`);
        }
    
        // Verifica se o usuário existe
        const userExists = await prismaClient.usuario.findUnique({
            where: { id: userId },
        });
    
        if (!userExists) {
            throw new Error(`Usuário com id ${userId} não encontrado.`);
        }
    
        // Se o ticket e o usuário existirem, cria a resposta
        const result = await prismaClient.repostaTicketUsuario.create({
            data: {
                ticketId: ticketId,
                resposta: resposta,
                userId: userId,
            },
            include: {
                usuario: true,
            },
        });
    
        return result;
    }
    
    
    
    

    async getTicketsByUserId(userId: number): Promise<TicketUsuario[]> {
        return await prismaClient.ticketUsuario.findMany({
            where: { userId },
            include: {
                usuario: true, // Inclui as informações do usuário associado ao ticket
                respostas: {
                    include: {
                        usuario: true, // Inclui o usuário associado a cada resposta
                    },
                },
            },
        });
    }
}

export { TicketRepository };
