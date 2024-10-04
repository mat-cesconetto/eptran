import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { authRoutes } from './routes/authRoutes';
import fastifyJwt from 'fastify-jwt';
import fastifyCookie from '@fastify/cookie';
import { registerErrorHandler } from './middlewares/error';
import { userRoutes } from './routes/userRoutes';
import { authMiddleware } from './middlewares/authMiddleware'; // Importa o middleware de autenticação

const app = fastify();

// Registra o plugin de cookies
app.register(fastifyCookie);

// Registra o plugin JWT
app.register(fastifyJwt, {
    secret: 'seu-segredo', // Altere para um segredo mais seguro em produção
    cookie: {
        cookieName: 'refreshToken', // Nome do cookie onde o token está armazenado
        signed: false, // Altere para true se você estiver usando cookies assinados
    },
});

// Registra o manipulador de erros
registerErrorHandler(app);

// Registrando as rotas de autenticação
app.register(authRoutes, {
    prefix: '/auth',
});

// Registrando as rotas de usuário com o middleware de autenticação
app.register(userRoutes, {
    prefix: '/user',
    preHandler: authMiddleware, // Adiciona o middleware de autenticação
});

// Inicia o servidor
const start = async () => {
    try {
        await app.listen({ port: 3333 });
        console.log('Server is running on port 3333');
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

start();
