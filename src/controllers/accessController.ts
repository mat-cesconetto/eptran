import { AccessRepository } from "../repositories/accessRepository";
import { FastifyReply, FastifyRequest } from "fastify";
import { SexoEnum, Prisma, Access, Usuario } from "@prisma/client";


class AccessController {
    private accessRepository: AccessRepository;

    constructor() {
        this.accessRepository = new AccessRepository();
    }

    // Método para obter acessos semanais por escolaridade
    async getWeeklyAccessesByEducation(request: FastifyRequest, reply: FastifyReply) {
        try {
            const weeklyAccesses = await this.accessRepository.getWeeklyAccessesByEducation();
            return reply.send(weeklyAccesses);
        } catch (error) {
            console.error("Erro ao obter acessos semanais por escolaridade:", error);
            return reply.status(500).send({ message: "Erro ao obter acessos semanais por escolaridade" });
        }
    }
        // Função para calcular a idade a partir da data de nascimento
        async getAccessesByAgeGroups(request: FastifyRequest, reply: FastifyReply) {
            try {
                const accessesByAgeGroup = await this.accessRepository.countAccessesByAgeGroups();
                return reply.send(accessesByAgeGroup);
            } catch (error) {
                console.error("Erro ao obter acessos por faixa etária:", error);
                return reply.status(500).send({ message: "Erro ao obter acessos por faixa etária" });
            }
        }
    // Método para obter total de acessos
    async getTotalAccesses(request: FastifyRequest, reply: FastifyReply) {
        try {
            const totalAccesses = await this.accessRepository.getTotalAccesses();
            return reply.send({ totalAcessos: totalAccesses });
        } catch (error) {
            console.error("Erro ao obter total de acessos:", error);
            return reply.status(500).send({ message: "Erro ao obter total de acessos" });
        }
    }

    // Método para obter top 5 escolas com mais acessos
    async getTopSchools(request: FastifyRequest, reply: FastifyReply) {
        try {
            const topSchools = await this.accessRepository.getTopSchoolsByAccess();
            return reply.send(topSchools);
        } catch (error) {
            console.error("Erro ao obter top escolas:", error);
            return reply.status(500).send({ message: "Erro ao obter top escolas" });
        }
    }
    async countAccessByGender(request: FastifyRequest, reply: FastifyReply) {
        try {
            const accessGender = await this.accessRepository.countAccessesByGender();
            return reply.send(accessGender);
        } catch (error) {
            console.error("Erro ao obter acessos por sexo:", error);
            return reply.status(500).send({ message: "Erro ao obter top escolas" });
        }
    }
    async getTopLocations(request: FastifyRequest, reply: FastifyReply) {
        try {
            const topLocations = await this.accessRepository.getTopLocationsByAccess();
            return reply.send(topLocations);
        } catch (error) {
            console.error("Erro ao obter top localizações:", error);
            return reply.status(500).send({ message: "Erro ao obter top localizações" });
        }
    }
}

export { AccessController };