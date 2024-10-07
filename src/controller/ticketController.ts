import { FastifyReply, FastifyRequest } from 'fastify';
import { TicketRepository } from '../repositories/ticketRepository';
import { CreateTicket, Status } from '../../types/Ticket';
import { emailService } from '../../services/emailService';
import * as fs from 'fs';
import * as path from 'path';
import { MultipartFile } from '@fastify/multipart';

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
            const userId = req.user.id; // Supondo que o userId está disponível no objeto de request

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
            reply.send({ ticket, anexoUrl: `http://localhost:3333/anexos/${anexoFilename}` }); // Retorna o link do anexo
        } catch (error) {
            console.error("Erro no createTicket:", error); // Log do erro
            reply.status(500).send({ message: 'Internal Server Error' });
        }
    }

    async getTicketById(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = req.params as { id: number };
            const ticket = await this.ticketRepository.getTicketById(id);
            reply.send(ticket);
        } catch (error) {
            console.error("Erro no getTicketById:", error); // Log do erro
            reply.status(500).send({ message: 'Internal Server Error' });
        }
    }

    async updateTicketStatus(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = req.params as { id: number };
            const { status } = req.body as { status: Status };
            const ticket = await this.ticketRepository.updateTicketStatus(id, status);
            reply.send(ticket);
        } catch (error) {
            console.error("Erro no updateTicketStatus:", error); // Log do erro
            reply.status(500).send({ message: 'Internal Server Error' });
        }
    }

    async addResposta(req: FastifyRequest, reply: FastifyReply) {
        try {
            const { ticketId } = req.params as { ticketId: string }; // Ainda vem como string da rota
            const { resposta } = req.body as { resposta: string };
            const userId = req.user.id;
    
            // Converte ticketId para número
            const ticketIdNumber = parseInt(ticketId, 10); // Garante que o ticketId seja um número
    
            // Chama o repositório passando o ticketId como número
            const respostaAdded = await this.ticketRepository.addResposta(ticketIdNumber, resposta, userId);
    
            // Buscar o ticket para obter as informações do usuário
            const ticket = await this.ticketRepository.getTicketById(ticketIdNumber);
    
            if (ticket && ticket.usuario) {
                // Enviar email para o usuário
                await emailService.sendEmail(
                    ticket.usuario.email,
                    `Resposta ao seu ticket #${ticketId}`,
                    resposta,
                    `<h1>Nova resposta ao seu ticket #${ticketId}</h1><p>${resposta}</p>`
                );
            }
    
            reply.send(respostaAdded);
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
