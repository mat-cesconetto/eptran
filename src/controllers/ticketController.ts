import { FastifyReply, FastifyRequest } from 'fastify';
import { TicketRepository } from '../repositories/ticketRepository';
import { CreateTicket, Status } from '../../types/Ticket';
import { emailService } from '../services/emailService';
import * as fs from 'fs';
import * as path from 'path';
import { MultipartFile } from '@fastify/multipart';
import { StatusEnum } from '@prisma/client';

class TicketController {
    private ticketRepository: TicketRepository;

    constructor(ticketRepository: TicketRepository) {
        this.ticketRepository = ticketRepository;
    }

    private isFileTypeAllowed(filename: string): boolean {
        const forbiddenExtensions = ['.exe', '.bat', '.cmd', '.sh', '.jar', '.com', '.scr', '.pif', '.cpl', '.dll'];
        const fileExtension = path.extname(filename).toLowerCase();
        return !forbiddenExtensions.includes(fileExtension);
    }

    async createTicket(req: FastifyRequest, reply: FastifyReply) {
        try {
            const userId = req.user.id;
    
            let assunto: string | undefined;
            let descricao: string | undefined;
            let anexo: string | undefined;
            let anexoFilename: string | undefined;
    
            const parts = req.parts();
            const uploadDir = path.join(__dirname, '../../uploads/tickets');
    
            // Certifique-se de que a pasta uploads/tickets existe
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }
    
            for await (const part of parts) {
                if (part.type === 'field') {
                    if (part.fieldname === 'assunto') {
                        assunto = part.value as string;
                    } else if (part.fieldname === 'descricao') {
                        descricao = part.value as string;
                    }
                } else if (part.type === 'file' && part.fieldname === 'anexo') {
                    const file = part as MultipartFile;
    
                    // Valida o tipo de arquivo antes de salvar
                    if (!this.isFileTypeAllowed(file.filename)) {
                        reply.status(400).send({ message: 'Tipo de arquivo não permitido.' });
                        return;
                    }
    
                    anexoFilename = `${Date.now()}-${file.filename}`;
                    const uploadPath = path.join(uploadDir, anexoFilename);
                    const writeStream = fs.createWriteStream(uploadPath);
                    for await (const chunk of file.file) {
                        writeStream.write(chunk);
                    }
                    writeStream.end();
                    anexo = uploadPath; // Caminho do arquivo salvo
                }
            }
    
            if (!assunto || !descricao) {
                reply.status(400).send({ message: 'Assunto e descrição são obrigatórios.' });
                return;
            }
    
            const ticket = await this.ticketRepository.create({ userId, assunto, descricao, anexo });
    
            // Limpa o objeto `usuario` dentro do ticket antes de enviar a resposta
            const sanitizedTicket = {
                ...ticket,
                usuario: {
                    id: ticket.usuario.id,
                    nome: ticket.usuario.nome,
                    email: ticket.usuario.email,
                    escolaridade: ticket.usuario.escolaridade,
                    escola: ticket.usuario.escola,
                    profilePicture: ticket.usuario.profilePicture
                }
            };
    
            reply.send({
                ticket: sanitizedTicket, // Retorna o ticket com `usuario` sanitizado
                anexoUrl: `http://localhost:3333/anexos/${anexoFilename}` // Link do anexo
            });
        } catch (error) {
            console.error("Erro no createTicket:", error); // Log do erro
            reply.status(500).send({ message: 'Internal Server Error' });
        }
    }
    
    

    async getTicketById(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = req.params as { id: string };
            const ticketId = parseInt(id, 10);
    
            if (isNaN(ticketId)) {
                reply.status(400).send({ message: 'Invalid ticket ID' });
                return;
            }
    
            const ticket = await this.ticketRepository.getTicketById(ticketId);
    
            if (!ticket) {
                reply.status(404).send({ message: 'Ticket not found' });
                return;
            }
    
            reply.send(ticket);
        } catch (error) {
            console.error("Error in getTicketById:", error);
            reply.status(500).send({ message: 'Internal Server Error' });
        }
    }

// No controlador do seu Ticket
async finalizarTicket(req: FastifyRequest, reply: FastifyReply) {
    try {
        const { id } = req.params as { id: string };
        
        console.log(`Tentando finalizar o ticket com ID: ${id}`);

        if (!id || isNaN(Number(id))) {
            console.log(`ID inválido: ${id}`);
            return reply.status(400).send({ message: 'ID de ticket inválido' });
        }

        const ticketId = Number(id);

        const ticket = await this.ticketRepository.getTicketById(ticketId);
        if (!ticket) {
            console.log(`Ticket não encontrado para o ID: ${ticketId}`);
            return reply.status(404).send({ message: 'Ticket não encontrado' });
        }

        console.log(`Ticket encontrado:`, ticket);

        const ticketAtualizado = await this.ticketRepository.updateTicketStatus(ticketId, StatusEnum.RESOLVIDO);
        
        console.log(`Ticket atualizado:`, ticketAtualizado);

        return reply.status(200).send(ticketAtualizado);
    } catch (error) {
        console.error("Erro ao finalizar o ticket:", error);
        if (error instanceof Error) {
            console.error("Mensagem de erro:", error.message);
            console.error("Stack trace:", error.stack);
        }
        return reply.status(500).send({ message: 'Erro interno do servidor', error: error instanceof Error ? error.message : String(error) });
    }
}

async addResposta(req: FastifyRequest, reply: FastifyReply) {
    try {
        const { ticketId } = req.params as { ticketId: string }; 
        const { resposta } = req.body as { resposta: string };
        const userId = req.user.id;

        const ticketIdNumber = parseInt(ticketId, 10);

        const respostaAdded = await this.ticketRepository.addResposta(ticketIdNumber, resposta, userId);

        const ticket = await this.ticketRepository.getTicketById(ticketIdNumber);

        if (ticket && ticket.usuario) {
            // Sanitiza os dados do usuário antes de enviar qualquer resposta
            const sanitizedTicket = {
                ...ticket,
                usuario: {
                    id: ticket.usuario.id,
                    nome: ticket.usuario.nome,
                    email: ticket.usuario.email,
                }
            };

            await emailService.sendEmail(
                ticket.usuario.email,
                `Resposta ao seu ticket #${ticketId}`,
                resposta,
                `<h1>Nova resposta ao seu ticket #${ticketId}</h1><p>${resposta}</p>`
            );

            reply.send({
                ticket: sanitizedTicket,  // Retorna o ticket com `usuario` sanitizado
                respostaAdded
            });
        } else {
            reply.send({ message: 'Ticket ou usuário não encontrado' });
        }
    } catch (error) {
        console.error("Erro no addResposta:", error);
        reply.status(500).send({ message: 'Internal Server Error' });
    }
}

    
    

    async getTicketsByUserId(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { userId } = req.params as { userId: number };
            const tickets = await this.ticketRepository.getTicketsByUserId(userId);
            reply.send(tickets);
        } catch (error) {
            console.error("Erro no getTicketsByUserId:", error); // Log do erro
            reply.status(500).send({ message: 'Internal Server Error' });
        }
    }

    async getAllTickets(request: FastifyRequest, reply: FastifyReply) {
        try {
            // Extrai os parâmetros `page` e `limit` da query string, com valores padrão
            const { page = '1', limit = '10' } = request.query as { page?: string, limit?: string };
    
            // Converte `page` e `limit` para números
            const pageNumber = parseInt(page, 10);
            const limitNumber = parseInt(limit, 10);
    
            // Chama a função que lista os usuários com paginação
            const { tickets, totalTickets, totalPages } = await this.ticketRepository.getAllTickets(pageNumber, limitNumber);
    
            // Responde com os dados paginados
            return reply.send({
                tickets,
                totalTickets,
                totalPages,
                currentPage: pageNumber,
            });
        } catch (error) {
            // Trata qualquer erro e responde com status 500
            return reply.status(500).send({ error: 'Erro ao buscar usuários' });
        }
    }
}

export { TicketController };
