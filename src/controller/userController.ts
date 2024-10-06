import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { UserRepository } from "../repositories/userRepository";
import { promises as fs } from 'fs'; // Para salvar a imagem localmente
import { SearchQuery } from "../../types/Search";
import { UserUpdate } from "../../types/User";
import path from 'path';

export class UserController {
    private userRepository: UserRepository;

    constructor(fastify: FastifyInstance) {
        this.userRepository = new UserRepository(); // Inicia o repositório de autenticação

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

    async searchUsers (request: FastifyRequest<{ Querystring: SearchQuery }>, reply: FastifyReply){
        const { searchTerm } = request.query;
        if (!searchTerm) {
            return reply.status(400).send({ error: 'searchTerm is required' });
        }
    
        // Aqui você pode chamar seu repositório de usuários e fazer a pesquisa
        const users = await this.userRepository.searchUsers(searchTerm);
        return reply.send(users);
      }
      // Método para atualizar informações do usuário
async updateUserInfo(request: FastifyRequest, reply: FastifyReply) {
    try {
        const userId = request.user.id; // Obtém o ID do usuário autenticado
        const updateData = request.body as Partial<UserUpdate>; // Recebe apenas os campos que serão atualizados
        
        // Valida se há algum dado para atualizar
        if (!Object.keys(updateData).length) {
            return reply.status(400).send({ error: 'Nenhuma informação fornecida para atualização.' });
        }

        // Atualiza as informações do usuário no repositório
        const updatedUser = await this.userRepository.updateUser(userId, updateData);

        // Retorna o usuário atualizado
        return reply.send({ message: 'Informações atualizadas com sucesso' });
    } catch (error: any) {
        return reply.status(500).send({ error: 'Erro ao atualizar informações do usuário', details: error.message });
    }
}

    
}
