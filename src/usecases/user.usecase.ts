import bcrypt from 'bcrypt'; // Importando bcrypt para criptografar a senha
import { FastifyInstance, FastifyReply } from 'fastify'; // Importando FastifyInstance para o uso do JWT
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
            const verifyIfUserExists = await this.userRepository.findByEmail(email);
            if (verifyIfUserExists) {
                throw new Error("User already exists");
            }
            const hashedPassword = await bcrypt.hash(senha, 10);
            const result = await this.userRepository.create({
                nome,
                email,
                senha: hashedPassword,
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
    async login(email: string, senha: string, reply: FastifyReply) { // Adicione o FastifyReply como parâmetro
        try {
            const user = await this.userRepository.findByEmail(email);

            if (!user) {
                throw new Error('Usuário não encontrado');
            }

            // Certifique-se de que user.senha contém o hash correto
            console.log("Stored Hashed Password:", user.senha); // Verifique se o hash está correto
            console.log("Password Provided:", senha); // Verifique a senha que está sendo comparada

            const bcrypt = require('bcrypt');

            const storedHashedPassword = '$2b$10$3X/Ff5Thyvb9VhOBtQMmlO/0TRhvV3b03ZJ8VAxSM4TomG3LvYebW';
            const providedPassword = '123';

            bcrypt.compare(providedPassword, storedHashedPassword, (err: any, result: any) => {
                if (err) {
                    throw err;
                }
                if (result) {
                    console.log('Senha correta');
                } else {
                    console.log('Senha incorreta');
                }
            });


            const isPasswordValid = await bcrypt.compare(senha, user.senha);
            if (!isPasswordValid) {
                throw new Error('Senha incorreta');
            }


            const accessToken = this.fastify.jwt.sign(
                { id: user.id, email: user.email, nome: user.nome },
                { expiresIn: '15m' }
            );

            const refreshToken = this.fastify.jwt.sign(
                { id: user.id },
                { expiresIn: '30d' }
            );

            // Use reply.setCookie para definir o cookie
            reply.setCookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                path: '/',
                sameSite: 'strict',
            });

            return { accessToken };
        } catch (error) {
            console.error("Login failed:", error);
            throw new Error("Failed to login");
        }
    }
}

export { UserUseCase };
