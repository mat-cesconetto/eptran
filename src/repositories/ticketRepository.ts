import { CreateTicket, TicketUsuario, Status, RepostaTicketUsuario } from "../../types/Ticket";
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
                    usuario: true,
                    respostas: true,
                },
            });

            const usuarioInfo = {
                id: result.usuario.id,
                nome: result.usuario.nome,
                email: result.usuario.email,
                escola: result.usuario.escola,
                escolaridade: result.usuario.escolaridade,
                sexo: result.usuario.sexo,
            }

            const ticketUsuario: TicketUsuario = {
                ...result,
                usuario: usuarioInfo,
                respostas: result.respostas,
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
                usuario: true,
                respostas: true,
            },
        });
    }

    async updateTicketStatus(id: number, status: Status): Promise<TicketUsuario> {
        return await prismaClient.ticketUsuario.update({
            where: { id },
            data: { status },
            include: {
                usuario: true,
                respostas: true,
            },
        });
    }

    async addResposta(ticketId: number, resposta: string): Promise<RepostaTicketUsuario> {
        return await prismaClient.repostaTicketUsuario.create({
            data: { ticketId, resposta },
        });
    }

    async getTicketsByUserId(userId: number): Promise<TicketUsuario[]> {
        return await prismaClient.ticketUsuario.findMany({ 
            where: { userId },
            include: {
                usuario: true,
                respostas: true,
            },
        });
    }
}

export { TicketRepository };
