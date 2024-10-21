import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { emailService } from "../services/emailService"; // Importando o serviço de envio de email
import { UserRepository } from "../repositories/userRepository";
import { promises as fs } from 'fs'; // Para salvar a imagem localmente
import { SearchQuery } from "../../types/Search";
import { RequestPasswordResetBody, ResetPasswordBody } from "../../types/Auth"; // Importando as interfaces
import { UserUpdate } from "../../types/User";
import path from 'path';

export class UserController {
    private userRepository: UserRepository;

    constructor(fastify: FastifyInstance) {
        this.userRepository = new UserRepository(); // Inicia o repositório de autenticação
    }

    // Método para buscar todos os usuários com paginação
    async getAllUsers(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { page = '1', limit = '10' } = request.query as { page?: string, limit?: string };
            const pageNumber = parseInt(page, 10);
            const limitNumber = parseInt(limit, 10);
    
            const { users, totalUsers, totalPages } = await this.userRepository.listUsers(pageNumber, limitNumber);

            const userInfo = users.map(user => ({
                id: user.id,
                nome: user.nome,
                email: user.email,
                cep: user.cep,
                rua: user.rua,
                cidade: user.cidade,
                estado: user.estado,
                escola: user.escola,
                data_nasc: user.data_nasc,
                escolaridade: user.escolaridade,
                sexo: user.sexo,
                profilePicture: user.profilePicture,
            }));
    
            return reply.send({
                userInfo,
                totalUsers,
                totalPages,
                currentPage: pageNumber,
            });
        } catch (error) {
            return reply.status(500).send({ error: 'Erro ao buscar usuários' });
        }
    }

    // Método para upload de foto de perfil
    async uploadProfilePicture(request: FastifyRequest, reply: FastifyReply) {
        try {
            const data = await request.file();

            if (!data) {
                return reply.status(400).send({ error: 'Nenhum arquivo enviado' });
            }

            const mimeType = data.mimetype;
            if (!mimeType.startsWith('image/')) {
                return reply.status(400).send({ error: 'Por favor, envie um arquivo de imagem válido' });
            }

            const uploadDir = path.join(__dirname, '../../uploads/profile-pictures');
            await fs.mkdir(uploadDir, { recursive: true });

            const fileName = `${Date.now()}-${data.filename}`;
            const filePath = path.join(uploadDir, fileName);

            await fs.writeFile(filePath, await data.toBuffer());

            return reply.send({ message: 'Foto de perfil enviada com sucesso', fileName });
        } catch (error: any) {
            return reply.status(500).send({ error: 'Erro ao fazer upload da foto de perfil', details: error.message });
        }
    }

    // Método para buscar usuários por termo de pesquisa
    async searchUsers(request: FastifyRequest<{ Querystring: SearchQuery }>, reply: FastifyReply) {
        const { searchTerm } = request.query;
        
        if (!searchTerm) {
          return reply.status(400).send({ error: 'searchTerm é obrigatório' });
        }
    
        const users = await this.userRepository.searchUsers(searchTerm);
        return reply.send(users);
    }

    // Método para atualizar informações do usuário
    async updateUserInfo(request: FastifyRequest, reply: FastifyReply) {
        try {
            const userId = request.user.id; // Obtém o ID do usuário autenticado
            const updateData = request.body as Partial<UserUpdate>; 
            
            if (!Object.keys(updateData).length) {
                return reply.status(400).send({ error: 'Nenhuma informação fornecida para atualização.' });
            }

            const updatedUser = await this.userRepository.updateUser(userId, updateData);

            return reply.send({ message: 'Informações atualizadas com sucesso', updatedUser });
        } catch (error: any) {
            return reply.status(500).send({ error: 'Erro ao atualizar informações do usuário', details: error.message });
        }
    }

    // Método para deletar usuário
    async deleteUser(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
        try {
            const { id } = request.params;
    
            // Verifica se o usuário existe antes de tentar excluir
            const usuarioExiste = await this.userRepository.findById(Number(id));
    
            if (!usuarioExiste) {
                return reply.status(404).send({ error: "Usuário não encontrado." });
            }
    
            // Realiza a exclusão do usuário
            await this.userRepository.delete(Number(id));
    
            return reply.status(200).send({
                success: true,
                message: "Usuário excluído com sucesso.",
            });
        } catch (err: any) {
            console.error(err);
            return reply.status(500).send({ error: "Erro ao excluir usuário.", details: err.message });
        }
    }
}
