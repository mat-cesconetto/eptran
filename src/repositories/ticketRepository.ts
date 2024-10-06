import { CreateTicket, TicketUsuario, Status, RepostaTicketUsuario, PaginatedTickets } from "../../types/Ticket";
import prismaClient from "../prisma";

class TicketRepository {
    async create(data: CreateTicket): Promise<TicketUsuario> {
        try {
            const result = await prismaClient.ticketUsuario.create({
                data: {
                    assunto: data.assunto,
                    descricao: data.descricao,
                    anexo: data.anexo,
                    status: "EM_ABERTO",
                    userId: data.userId,
                },
                include: {
                    usuario: true, // Inclui as informações do usuário associado ao ticket
                    respostas: {
                        include: {
                            usuario: true, // Inclui o usuário em cada resposta
                        },
                    },
                },
            });

            const ticketUsuario: TicketUsuario = {
                ...result,
                usuario: result.usuario,
                respostas: result.respostas.map(resposta => ({
                    ...resposta,
                    usuario: resposta.usuario, // Inclui as informações do usuário na resposta
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
        const result = await prismaClient.repostaTicketUsuario.create({
            data: { ticketId, resposta, userId }, // Adiciona userId aqui
            include: {
                usuario: true, // Inclui o usuário associado à resposta
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
