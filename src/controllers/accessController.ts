import { AccessRepository } from "../repositories/accessRepository";
import { FastifyReply, FastifyRequest } from "fastify";
import { SexoEnum, Prisma, Access, Usuario } from "@prisma/client";

class AccessController {
    private accessRepository: AccessRepository;

    constructor() {
        this.accessRepository = new AccessRepository();
    }

    async getWeeklyAccessesByEducation(request: FastifyRequest, reply: FastifyReply) {
        try {
            const weeklyAccesses = await this.accessRepository.getWeeklyAccessesByEducation();
            return reply.send(weeklyAccesses);
        } catch (error) {
            console.error("Erro ao obter acessos semanais por escolaridade:", error);
            return reply.status(500).send({ message: "Erro ao obter acessos semanais por escolaridade" });
        }
    }

    async getAccessesByAgeGroupAndGender(request: FastifyRequest, reply: FastifyReply) {
        try {
            const accessesByAgeGroupAndGender = await this.accessRepository.countAccessesByAgeGroups();
            return reply.send(accessesByAgeGroupAndGender);
        } catch (error) {
            console.error("Erro ao obter acessos por faixa etária e sexo:", error);
            return reply.status(500).send({ message: "Erro ao obter acessos por faixa etária e sexo" });
        }
    }

    async getTotalAccesses(request: FastifyRequest, reply: FastifyReply) {
        try {
            const totalAccesses = await this.accessRepository.getTotalAccesses();
            return reply.send({ totalAcessos: totalAccesses });
        } catch (error) {
            console.error("Erro ao obter total de acessos:", error);
            return reply.status(500).send({ message: "Erro ao obter total de acessos" });
        }
    }

    async getTopSchools(request: FastifyRequest, reply: FastifyReply) {
        try {
            const topSchools = await this.accessRepository.getTopSchoolsByAccess();
            return reply.send(topSchools);
        } catch (error) {
            console.error("Erro ao obter top escolas:", error);
            return reply.status(500).send({ message: "Erro ao obter top escolas" });
        }
    }

    async getTopSchoolsByAccessAndGender(request: FastifyRequest, reply: FastifyReply) {
        try {
            const topSchoolsByGender = await this.accessRepository.getTopSchoolsByAccessAndGender();
            return reply.send(topSchoolsByGender);
        } catch (error) {
            console.error("Erro ao obter top escolas por sexo:", error);
            return reply.status(500).send({ message: "Erro ao obter top escolas por sexo" });
        }
    }

    async countAccessByGender(request: FastifyRequest, reply: FastifyReply) {
        try {
            const accessGender = await this.accessRepository.countAccessesByGender();
            return reply.send(accessGender);
        } catch (error) {
            console.error("Erro ao obter acessos por sexo:", error);
            return reply.status(500).send({ message: "Erro ao obter acessos por sexo" });
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