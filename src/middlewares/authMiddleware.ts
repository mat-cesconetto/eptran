// middlewares/authMiddleware.ts

import { FastifyReply, FastifyRequest } from 'fastify';
import { UnauthorizedError } from '../helpers/apiErrors'; // Importando a classe de erro

export const authMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        // Pega o token do cookie
        const token = request.cookies.refreshToken;
        const user = request.user

        // Se não houver token, rejeita a requisição
        if (!token) {
            throw new UnauthorizedError('Token não fornecido'); // Lança UnauthorizedError
        }

        // Verifica o token JWT (sem passar argumentos)
        await request.jwtVerify(); // Remove o argumento aqui, pois a chave já está configurada no app.register
    } catch (err) {
        // Verifica se o erro é uma instância de UnauthorizedError
        if (err instanceof UnauthorizedError) {
            return reply.status(err.statusCode).send({ error: err.message });
        }

        // Retorna um erro genérico para outros casos
        return reply.status(401).send({ error: 'Token inválido ou expirado' });
    }
};