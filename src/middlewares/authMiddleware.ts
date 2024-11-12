import { FastifyReply, FastifyRequest } from 'fastify';
import { UnauthorizedError } from '../helpers/apiErrors';

export const authMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        
        // Pega o token do cookie
        const token = request.cookies.accessToken;
        console.log('Token encontrado:', token);
        
        
        if (!token) {
            throw new UnauthorizedError('Token não fornecido');
        }

    } catch (err) {
        console.error('Erro no middleware:', err);
        
        if (err instanceof UnauthorizedError) {
            return reply.status(err.statusCode).send({ error: err.message });
        }

        return reply.status(401).send({ 
            error: 'Token inválido ou expirado',
            details: err instanceof Error ? err.message : 'Erro desconhecido'
        });
    }
};
