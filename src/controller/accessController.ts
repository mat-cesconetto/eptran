import { AccessRepository } from "../repositories/accessRepository";
import { FastifyReply, FastifyRequest } from "fastify";

class AccessController {
    private accessRepository: AccessRepository;

    constructor() {
        this.accessRepository = new AccessRepository();
    }

    // Método para obter acessos semanais por escolaridade
    async getWeeklyAccessesByEducation(request: FastifyRequest, reply: FastifyReply) {
        try {
            const weeklyAccesses = await this.accessRepository.getWeeklyAccessesByEducation();
            return reply.send(weeklyAccesses); // Envia a resposta com os dados agrupados por escolaridade e dia
        } catch (error) {
            console.error("Erro ao obter acessos semanais por escolaridade:", error);
            return reply.status(500).send({ message: "Erro ao obter acessos semanais por escolaridade" });
        }
    }
}

export { AccessController };
