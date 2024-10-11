import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { authRoutes } from './routes/authRoutes';
import fastifyJwt from 'fastify-jwt';
import fastifyCookie from '@fastify/cookie';
import multipart from '@fastify/multipart';
import { registerErrorHandler } from './middlewares/error';
import { userRoutes } from './routes/userRoutes';
import { authMiddleware } from './middlewares/authMiddleware';
import { statsRoutes } from './routes/statsRoutes';
import ticketRoutes from './routes/ticketRoutes';
import fastifyStatic from '@fastify/static';
import * as path from 'path';
import { resetRoutes } from './routes/resetRoutes';
import fastifyCors from '@fastify/cors';
import { locationRoutes } from './routes/locationRoutes';
import * as dotenv from 'dotenv';
import { videoRoutes } from './routes/videoRoutes';

// Carregando variáveis de ambiente
dotenv.config();

const app = fastify();

// Registra o plugin de CORS
app.register(fastifyCors, {
  origin: process.env.FRONTEND_URL, // Permitir todas as origens, ou você pode especificar uma lista de origens
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'], // Métodos permitidos
  credentials: true,
});

// Registra o plugin de cookies
app.register(fastifyCookie);

// Registra o plugin multipart com opções
app.register(multipart, {
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB
  },
});

// Registra o plugin JWT usando a variável de ambiente
app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET || 'fallback-secret', // Usando variável de ambiente para segurança
  cookie: {
    cookieName: 'refreshToken', // Nome do cookie onde o token está armazenado
    signed: false, // Altere para true se você estiver usando cookies assinados
  },
});

// Registra o plugin static
app.register(fastifyStatic, {
  root: path.join(__dirname, '../uploads/tickets'),
  prefix: '/anexos/', // Prefixo para acessar arquivos estáticos
});

// Registra o manipulador de erros
registerErrorHandler(app);

// Registrando as rotas de usuário com o middleware de autenticação
app.register(userRoutes, {
  prefix: '/user',
  preHandler: authMiddleware, // Adiciona o middleware de autenticação
});

// Registrando as rotas de ticket com o middleware de autenticação
app.register(ticketRoutes, {
  prefix: '/ticket',
  preHandler: authMiddleware, // Adiciona o middleware de autenticação
});

// Registrando a rota de autenticação sem middleware (sem necessidade de estar autenticado)
app.register(authRoutes, {
  prefix: '/auth',
  preHandler: undefined, // Nenhum middleware de autenticação aqui
});

// Registrando a rota de reset sem middleware (sem necessidade de estar autenticado)
app.register(resetRoutes, {
  prefix: '/reset',
  preHandler: undefined, // Nenhum middleware de autenticação aqui
});

// Registrando a rota de localização sem middleware (sem necessidade de estar autenticado)
app.register(locationRoutes, {
  prefix: '/location',
  preHandler: undefined, // Nenhum middleware de autenticação aqui
});

// Registrando a rota de estatísticas com middleware de autenticação
app.register(statsRoutes, {
  prefix: '/stats',
  preHandler: authMiddleware, // Adiciona o middleware de autenticação
});

app.register(videoRoutes, {
  prefix: '/videos',
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
