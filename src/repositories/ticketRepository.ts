import { StatusEnum } from "@prisma/client";
import { PrioridadeEnum } from "../../types/PrioridadeEnum";
import { CreateTicket, TicketUsuario, TicketResumido, Status, RepostaTicketUsuario, PaginatedTickets, TicketInfo } from "../../types/Ticket";
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
    

    async getTicketById(id: number): Promise<TicketResumido | null> {
      const ticket = await prismaClient.ticketUsuario.findUnique({
        where: { id },
        include: {
          usuario: {
            select: {
              id: true,
              nome: true,
              email: true,
            },
          },
          respostas: {
            include: {
              usuario: {
                select: {
                  id: true,
                  nome: true,
                },
              },
            },
          },
        },
      });
    
      // Verifica se o ticket existe, caso contrário retorna null
      if (!ticket) {
        return null;
      }
    
      // O retorno agora está tipado corretamente como TicketResumido
      const ticketResumido: TicketResumido = {
        id: ticket.id,
        status: ticket.status,
        prioridade: ticket.prioridade,
        assunto: ticket.assunto, // Certifique-se de que o campo 'titulo' existe no modelo
        descricao: ticket.descricao,
        usuario: {
          id: ticket.usuario.id,
          nome: ticket.usuario.nome,
          email: ticket.usuario.email,
        },
        respostas: ticket.respostas.map(resposta => ({
          id: resposta.id,
          createdAt: resposta.createdAt,
          updatedAt: resposta.updatedAt,
          userId: resposta.userId,
          ticketId: resposta.ticketId,
          resposta: resposta.resposta,
          usuario: {
            id: resposta.usuario.id,
            nome: resposta.usuario.nome,
            email: ticket.usuario.email, // Certifique-se de que o e-mail é preenchido adequadamente
          },
        })),
      };
    
      return ticketResumido;
    }
    


    async getAllTickets(page: number, limit: number): Promise<PaginatedTickets> {
        const [tickets, totalTickets] = await prismaClient.$transaction([
            prismaClient.ticketUsuario.findMany({
                skip: (page - 1) * limit,
                take: limit,
                include: {
                    usuario: {
                        select: {
                            id: true,              // ID do usuário
                            nome: true,            // Nome do usuário
                            profilePicture: true,      // Foto de perfil
                        },
                    },
                },
            }),
            prismaClient.ticketUsuario.count(),
        ]);
    
        // Mapeando os tickets para retornar as informações desejadas
        const formattedTickets: TicketInfo[] = tickets.map(ticket => ({
            usuarioId: ticket.usuario.id,                  // ID do usuário
            usuarioNome: ticket.usuario.nome,              // Nome do usuário
            usuarioFotoPerfil: ticket.usuario.profilePicture,  // Foto de perfil
            assunto: ticket.assunto,                       // Assunto do ticket
            status: ticket.status,                         // Status do ticket
            prioridade: ticket.prioridade as unknown as PrioridadeEnum, // Convertendo para PrioridadeEnum
            createdAt: ticket.createdAt                    // Data de criação
        }));
    
        return {
            tickets: formattedTickets,
            totalTickets,
            totalPages: Math.ceil(totalTickets / limit),
        };
    }
    
    
    


    

    async updateTicketStatus(id: number, status: Status) {
        return await prismaClient.ticketUsuario.update({
            where: { id },
            data: { status },
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
    
        // Atualiza o status do ticket para "EM ANDAMENTO"
        await prismaClient.ticketUsuario.update({
            where: { id: ticketId },
            data: { status: 'EM_ANDAMENTO' }, // Altere 'EM_ANDAMENTO' conforme necessário
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
