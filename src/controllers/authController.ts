import bcrypt from 'bcrypt'; // Importando bcrypt para criptografar a senha
import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'; // Importando FastifyInstance para o uso do JWT
import { User } from "../../types/User";
import { UserRepository } from "../repositories/userRepository";
import { AuthRepository } from '../repositories/authRepository';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../helpers/apiErrors';
import { RefreshTokenRepository } from '../repositories/refreshTokenRepository';
import { BlacklistTokenRepository } from '../repositories/blackListedTokenRepository';
import { AccessRepository } from '../repositories/accessRepository'; // Importando AccessRepository

class AuthController {
    private blacklistedTokenRepository: BlacklistTokenRepository;
    private refreshTokenRepository: RefreshTokenRepository;
    private authRepository: AuthRepository;
    private userRepository: UserRepository;
    private accessRepository: AccessRepository; // Adicionando AccessRepository
    private fastify: FastifyInstance; // Instância do Fastify para usar o JWT

    constructor(fastify: FastifyInstance) {
        this.blacklistedTokenRepository = new BlacklistTokenRepository();
        this.refreshTokenRepository = new RefreshTokenRepository();
        this.userRepository = new UserRepository();
        this.authRepository = new AuthRepository();
        this.accessRepository = new AccessRepository(); // Instanciando AccessRepository
        this.fastify = fastify; // Injetando a instância do Fastify
    }

    // Função de registro do usuário
    // Função de registro do usuário
    async register({ nome, email, senha, cep, rua, cidade, bairro, estado, escola, data_nasc, escolaridade, sexo }: User): Promise<{ message: string }> {
        try {
            const verifyIfUserExists = await this.authRepository.findByEmail(email);
            
            if (verifyIfUserExists) {
                throw new BadRequestError("Usuário já existe");
            }
    
            const hashedPassword = await bcrypt.hash(senha, 10);
    
            const result = await this.userRepository.create({
                nome,
                email,
                senha: hashedPassword,
                cep,
                bairro,
                rua,
                cidade,
                estado,
                escola,
                data_nasc,
                escolaridade,
                sexo
            });
    
            return { message: "Usuário criado com sucesso!" };
    
        } catch (error) {
            console.error("Erro ao registrar usuário:", error);
            if (error instanceof BadRequestError) {
                throw error;
            }
            throw new BadRequestError("Falha ao registrar usuário");
        }
    }


    // Função de login do usuário
    async login(email: string, senha: string, reply: FastifyReply) {
        try {
            console.log("Iniciando login para o email:", email);

            const user = await this.authRepository.findByEmail(email);
            if (!user) {
                console.log("Usuário não encontrado");
                throw new NotFoundError('Usuário não encontrado');
            }

            // Verificar se a senha está correta
            console.log("Usuário encontrado. Verificando senha...");
            const isPasswordValid = await bcrypt.compare(senha, user.senha);
            
            if (!isPasswordValid) {
                console.log("Senha incorreta");
                throw new UnauthorizedError('Senha incorreta');
            }

            console.log("Senha válida. Registrando acesso...");
            // Registro do acesso
            await this.accessRepository.logAccess(user.id); // Loga o acesso do usuário

            const accessToken = this.fastify.jwt.sign(
                { id: user.id, email: user.email, nome: user.nome },
                { expiresIn: '15m' }
            );

            const refreshToken = this.fastify.jwt.sign(
                {
                    id: user.id,
                    nome: user.nome,
                    email: user.email,
                    senha: user.senha,
                    cep: user.cep,
                    rua: user.rua,
                    cidade: user.cidade,
                    estado: user.estado,
                    escola: user.escola,
                    data_nasc: user.data_nasc,
                    escolaridade: user.escolaridade,
                    sexo: user.sexo,
                    adm: user.adm,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                },
                { expiresIn: '30d' }
            );

            // Usando reply.setCookie para definir o cookie
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

            const addRefreshToken = await this.refreshTokenRepository.saveRefreshToken({
                userId: user.id,
                token: refreshToken,
            });

            console.log("Login realizado com sucesso. Tokens criados.");

            return { accessToken };
        } catch (error) {
            console.error("Houve uma falha ao fazer login:", error);
            if (error instanceof UnauthorizedError) {
                throw error;
            }
            throw new UnauthorizedError("Houve uma falha ao fazer login");
        }
    }

    // Função de logout
    async logout(request: FastifyRequest, reply: FastifyReply) {
        try {
            // Acessa o refresh token diretamente dos cookies
            const refreshToken = request.cookies.refreshToken;

            if (!refreshToken) {
                throw new BadRequestError("Refresh token não encontrado");
            }

            // Adiciona o refresh token à blacklist
            console.log("Adicionando refresh token à blacklist...");
            await this.blacklistedTokenRepository.addToBlacklist(refreshToken);

            // Limpa os cookies
            reply.clearCookie('refreshToken', {
                httpOnly: true,
                secure: true,
                path: '/',
                sameSite: 'strict',
            });

            reply.clearCookie('accessToken', {
                httpOnly: true,
                secure: true,
                path: '/',
                sameSite: 'strict',
            });

            console.log("Logout realizado com sucesso.");

            return reply.send({ message: "Logout realizado com sucesso" });
        } catch (error) {
            console.error("Houve uma falha ao fazer logout:", error);
            throw new BadRequestError("Houve uma falha ao fazer logout");
        }
    }
}

export { AuthController };
