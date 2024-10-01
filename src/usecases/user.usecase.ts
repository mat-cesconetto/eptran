import bcrypt from 'bcrypt'; // Importando bcrypt para criptografar a senha
import { FastifyInstance } from 'fastify'; // Importando FastifyInstance para o uso do JWT
import { User, UserRepository } from "../../types/User";
import { UserRepositoryPrisma } from "../repositories/user.repository";

class UserUseCase {
    private userRepository: UserRepository;
    private fastify: FastifyInstance; // Instância do Fastify para usar o JWT

    constructor(fastify: FastifyInstance) {
        this.userRepository = new UserRepositoryPrisma();
        this.fastify = fastify; // Injetando a instância do Fastify
    }

    // Função de registro do usuário
    async register({ nome, email, senha, cep, rua, cidade, estado, escola, data_nasc, escolaridade, sexo }: User): Promise<User> {
        try {
            // Criptografar a senha antes de salvar no banco
            const verifyIfUserExists = await this.userRepository.findByEmail(email)
            if(verifyIfUserExists) {
                throw new Error("User already exists")
            }
            const hashedPassword = await bcrypt.hash(senha, 10);
            const result = await this.userRepository.create({
                nome,
                email,
                senha: hashedPassword, // Salvando a senha criptografada
                cep,
                rua,
                cidade,
                estado,
                escola,
                data_nasc,
                escolaridade,
                sexo
            });
            return result;
        } catch (error) {
            console.error("Error registering user:", error);
            throw new Error("Failed to register user");
        }
    }

    // Função de login do usuário
    async login(email: string, senha: string) {
        try {
            const user = await this.userRepository.findByEmail(email); // Busca o usuário pelo e-mail

            if (!user) {
                throw new Error('Usuário não encontrado');
            }

            // Gerar token JWT com a informação do usuário
            const token = this.fastify.jwt.sign(
                { id: user.id, email: user.email, nome: user.nome }, // Dados do token
                { expiresIn: '1h' } // Duração do token
            );

            // Retornar o token gerado
            return { token };
        } catch (error) {
            console.error("Login failed:", error);
            throw new Error("Failed to login");
        }
    }
}

export { UserUseCase };
