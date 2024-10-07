import { FastifyRequest, FastifyReply } from "fastify";

// Middleware para verificar se o usuário é administrador
async function adminMiddleware(request: FastifyRequest, reply: FastifyReply) {
    // Supondo que você armazena as informações do usuário no token ou na sessão
    const user = request.user; // Aqui você deve ter a lógica de autenticação que popula request.user

    if (!user || !user.adm) { // Verifica se o usuário existe e se é admin
        return reply.status(403).send({ message: "Acesso negado. Você não é um administrador.", user }); // Retorna um erro se não for admin
    }

    // Se for admin, continue para a próxima função
    return;
}

export { adminMiddleware };
