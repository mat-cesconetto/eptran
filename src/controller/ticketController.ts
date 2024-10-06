import { FastifyReply, FastifyRequest } from 'fastify';
import { TicketRepository } from '../repositories/ticketRepository';
import { CreateTicket, Status } from '../../types/Ticket';
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
            const { ticketId, resposta } = req.body as { ticketId: number, resposta: string };
            const respostaAdded = await this.ticketRepository.addResposta(ticketId, resposta);
            reply.send(respostaAdded);
        } catch (error) {
            console.error("Erro no addResposta:", error); // Log do erro
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
}

export { TicketController };
