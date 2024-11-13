import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { authRoutes } from "./routes/authRoutes";
import fastifyJwt from "fastify-jwt";
import fastifyCookie from "@fastify/cookie";
import multipart from "@fastify/multipart";
import { registerErrorHandler } from "./middlewares/error";
import { userRoutes } from "./routes/userRoutes";
import { authMiddleware } from "./middlewares/authMiddleware";
import { statsRoutes } from "./routes/statsRoutes";
import ticketRoutes from "./routes/ticketRoutes";
import fastifyStatic from "@fastify/static";
import * as path from "path";
import { resetRoutes } from "./routes/resetRoutes";
import fastifyCors from "@fastify/cors";
import { locationRoutes } from "./routes/locationRoutes";
import * as dotenv from "dotenv";
import videoRoutes from "./routes/videoRoutes";
import materiaisRoutes from "./routes/materiaisRoutes";
import { adminMiddleware } from "./middlewares/adminMiddleware";
import { escolaRoutes } from "./routes/escolasRoutes";

// Carregando variáveis de ambiente
dotenv.config();

const app = fastify();

// Lista de origens permitidas
const allowedOrigins = [
  "http://localhost:3000", // Development
  "http://localhost:3001", // Alternative development port
  "http://127.0.0.1:3000", // Local development alternative
  // Adicione aqui seus domínios de produção
  "https://seu-dominio.com",
  "https://app.seu-dominio.com",
];

// Registra o plugin de CORS com configuração mais específica
app.register(fastifyCors, {
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.includes(origin)) {
      cb(null, true);
      return;
    }
    // Generate error for other origins
    cb(new Error("Not allowed by CORS"), false);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
  ],

  origin: true, // Permitir todas as origens, ou você pode especificar uma lista de origens
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"], // Métodos permitidos
  credentials: true,
  maxAge: 86400, // 24 hours
  preflight: true,
  exposedHeaders: ["set-cookie"],
});

// Hook para adicionar headers de CORS em todas as respostas
app.addHook("onRequest", async (request, reply) => {
  const origin = request.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    reply.header("Access-Control-Allow-Origin", origin);
    reply.header("Access-Control-Allow-Credentials", "true");
  }
});

// Registra o plugin de cookies com configuração segura
app.register(fastifyCookie, {
  secret: process.env.COOKIE_SECRET || "your-secret-key", // Use uma variável de ambiente
  hook: "onRequest",
  parseOptions: {
    secure: process.env.NODE_ENV === "production", // Apenas HTTPS em produção
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    path: "/",
  },
});

// Registra o plugin multipart com opções
app.register(multipart, {
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB
  },
});

// Registra o plugin JWT usando a variável de ambiente
app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET || "fallback-secret",
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  },
});

// Registra o plugin static
app.register(fastifyStatic, {
  root: path.join(__dirname, "../uploads/tickets"),
  prefix: "/anexos/",
});

// Registra o manipulador de erros
registerErrorHandler(app);

// Rotas
app.register(userRoutes, { prefix: "/user", preHandler: authMiddleware });
app.register(ticketRoutes, { prefix: "/ticket" });
app.register(authRoutes, { prefix: "/auth" });
app.register(resetRoutes, { prefix: "/reset" });
app.register(locationRoutes, { prefix: "/location" });
app.register(statsRoutes, { prefix: "/stats", preHandler: authMiddleware });
app.register(videoRoutes, { prefix: "/videos", preHandler: authMiddleware });
app.register(materiaisRoutes, {
  prefix: "/materiais",
  preHandler: adminMiddleware,
});
app.register(escolaRoutes, { prefix: "/escolas" });

// Inicia o servidor
const start = async () => {
  try {
    await app.listen({
      port: 3333,
      host: "0.0.0.0", // Permite conexões de qualquer interface de rede
    });
    console.log("Server is running on port 3333");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
