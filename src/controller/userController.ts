import bcrypt from 'bcrypt'; // Importando bcrypt para criptografar a senha
import { FastifyInstance, FastifyReply } from 'fastify'; // Importando FastifyInstance para o uso do JWT
import { AuthRepositoryType, User, UserRepositoryType } from "../../types/User";
import { UserRepository } from "../repositories/userRepository";
import { AuthRepository } from '../repositories/authRepository'
import { BadRequestError, NotFoundError, UnauthorizedError } from '../helpers/apiErrors';

class UserController {
    private authRepository: AuthRepository;
    private userRepository: UserRepository;
    private fastify: FastifyInstance; // Instância do Fastify para usar o JWT

    constructor(fastify: FastifyInstance) {
        this.userRepository = new UserRepository();
        this.authRepository = new AuthRepository();
        this.fastify = fastify; // Injetando a instância do Fastify
    }

    // Função de registro do usuário
    async register({ nome, email, senha, cep, rua, cidade, estado, escola, data_nasc, escolaridade, sexo }: User): Promise<User> {
        try {
            const verifyIfUserExists = await this.authRepository.findByEmail(email);
            if (verifyIfUserExists) {
                throw new NotFoundError("Usuário já existe");
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
            console.error("Erro ao registrar usuário:", error);
            throw new BadRequestError("Falha ao registrar usuário");
        }
    }

    // Função de login do usuário
    async login(email: string, senha: string, reply: FastifyReply) { // Adicione o FastifyReply como parâmetro
        try {
            const user = await this.authRepository.findByEmail(email);

            if (!user) {
                throw new NotFoundError('Usuário não encontrado');
            }


            const isPasswordValid = await bcrypt.compare(senha, user.senha);
            if (!isPasswordValid) {
                throw new UnauthorizedError('Senha incorreta');
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
            reply.setCookie('accessToken', accessToken, {
                httpOnly: true,
                secure: true,
                path: '/',
                sameSite: 'strict',
            });

            return { accessToken };
        } catch (error) {
            console.error("Houve uma falha ao fazer login:", error);
            throw new UnauthorizedError("Houve uma falha ao fazer login");
        }
    }
}

export { UserController };
