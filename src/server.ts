import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { userRoutes } from './routes/userRoutes';
import fastifyJwt from 'fastify-jwt';
import fastifyCookie from '@fastify/cookie';
import { registerErrorHandler } from './middlewares/error';

const app = fastify();

// Registra o plugin JWT
app.register(fastifyJwt, {
    secret: 'seu-segredo', // Altere para um segredo mais seguro em produção
});

// Registra o plugin de cookies
app.register(fastifyCookie);
registerErrorHandler(app)


// Middleware para autenticação
app.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        await request.jwtVerify();
    } catch (err) {
        reply.send(err);
    }
});


// Registrando as rotas de usuário
app.register(userRoutes, {
  prefix: '/users',
});

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
