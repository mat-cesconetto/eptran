import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { AuthRepository } from "../repositories/authRepository";
import { NotFoundError } from '../helpers/apiErrors';
import { UserRepository } from "../repositories/userRepository";
import { promises as fs } from 'fs'; // Para salvar a imagem localmente
import path from 'path';

export class UserController {
    private userRepository: UserRepository;
    private authRepository: AuthRepository;
    private fastify: FastifyInstance;

    constructor(fastify: FastifyInstance) {
        this.userRepository = new UserRepository(); // Inicia o repositório de autenticação
        this.authRepository = new AuthRepository(); // Inicia o repositório de autenticação
        this.fastify = fastify;
    }

    // Método para obter informações do usuário
    async getUserInfo(request: FastifyRequest, reply: FastifyReply) {
        try {
            // O ID do usuário já está disponível em request.user
            const userId = request.user.id;

            // Busca as informações do usuário
            const userInfo = await this.authRepository.getUserById(userId);

            if (!userInfo) {
                throw new NotFoundError("Usuário não encontrado");
            }

            // Retorna as informações do usuário
            return reply.send({
                email: userInfo.email,
                nome: userInfo.nome,
                escolaridade: userInfo.escolaridade,
                isAdmin: userInfo.adm, // Exemplo de campo indicando se é admin
                // Adicione mais campos conforme necessário
            });
        } catch (error: any) {
            if (error instanceof NotFoundError) {
                return reply.status(error.statusCode).send({ error: error.message });
            }

            // Retorna uma mensagem de erro adequada para outros erros
            return reply.status(500).send({ error: "Erro ao buscar informações do usuário", details: error.message });
        }
    }

    async getAllUsers(request: FastifyRequest, reply: FastifyReply) {
        try {
            // Extrai os parâmetros `page` e `limit` da query string, com valores padrão
            const { page = '1', limit = '10' } = request.query as { page?: string, limit?: string };
    
            // Converte `page` e `limit` para números
            const pageNumber = parseInt(page, 10);
            const limitNumber = parseInt(limit, 10);
    
            // Chama a função que lista os usuários com paginação
            const { users, totalUsers, totalPages } = await this.userRepository.listUsers(pageNumber, limitNumber);
    
            // Responde com os dados paginados
            return reply.send({
                users,
                totalUsers,
                totalPages,
                currentPage: pageNumber,
            });
        } catch (error) {
            // Trata qualquer erro e responde com status 500
            return reply.status(500).send({ error: 'Erro ao buscar usuários' });
        }
    }

    async uploadProfilePicture(request: FastifyRequest, reply: FastifyReply) {
        try {
            // Verifica se a requisição contém um arquivo
            const data = await request.file();

            if (!data) {
                return reply.status(400).send({ error: 'Nenhum arquivo enviado' });
            }

            // Verifica o tipo do arquivo
            const mimeType = data.mimetype;
            if (!mimeType.startsWith('image/')) {
                return reply.status(400).send({ error: 'Por favor, envie um arquivo de imagem válido' });
            }

            // Define o caminho para salvar o arquivo
            const uploadDir = path.join(__dirname, '../../uploads/profile-pictures');
            await fs.mkdir(uploadDir, { recursive: true });

            const fileName = `${Date.now()}-${data.filename}`;
            const filePath = path.join(uploadDir, fileName);

            // Salva o arquivo localmente
            await fs.writeFile(filePath, await data.toBuffer());

            // Retorna sucesso
            return reply.send({ message: 'Foto de perfil enviada com sucesso', fileName });
        } catch (error: any) {
            return reply.status(500).send({ error: 'Erro ao fazer upload da foto de perfil', details: error.message });
        }
    }
    
}
