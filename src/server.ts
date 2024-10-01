import fastify from 'fastify';
import cors from '@fastify/cors';
import fastifyJWT from '@fastify/jwt'; // Importando JWT
import { userRoutes } from './routes/user.routes';

const app = fastify({ logger: true });

app.register(cors, {
  origin: '*', // Configurando CORS se necessário
});

// Configurando o JWT com uma chave secreta
app.register(fastifyJWT, {
  secret: 'your-secret-key', // Substitua por uma chave segura
});

// Decorando o Fastify com a função de autenticação
app.decorate('authenticate', async function (request: any, reply: any) {
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
