import { FastifyInstance } from "fastify";
import { AccessController } from "../controllers/accessController";
import { AccessRepository } from "../repositories/accessRepository";
import { adminMiddleware } from "../middlewares/adminMiddleware";
import { authMiddleware } from "../middlewares/authMiddleware";

export async function statsRoutes(fastify: FastifyInstance) {
    // Instancia o repositório e o controlador
    const accessController = new AccessController();

    // Rota para obter acessos semanais
    fastify.get(
        "/accesses/weekly",
        { preHandler: [authMiddleware, adminMiddleware] },
        accessController.getWeeklyAccessesByEducation.bind(accessController)
    );

    // Rota para obter as escolas com mais acessos
    fastify.get(
        "/accesses/top-escolas",
        { preHandler: [authMiddleware, adminMiddleware] },
        accessController.getTopSchools.bind(accessController)
    );

    // Rota para obter as escolas com mais acessos por sexo
    fastify.get(
        "/accesses/top-escolas-sexo",
        { preHandler: [authMiddleware, adminMiddleware] },
        accessController.getTopSchoolsByAccessAndGender.bind(accessController)
    );

    // Rota para obter o total de acessos
    fastify.get(
        "/accesses/total",
        { preHandler: [authMiddleware, adminMiddleware] },
        accessController.getTotalAccesses.bind(accessController)
    );

    // Rota para contar acessos por gênero
    fastify.get(
        "/accesses/sexo",
        { preHandler: [authMiddleware, adminMiddleware] },
        accessController.countAccessByGender.bind(accessController)
    );

    // Rotas para obter acessos por faixa etária e sexo
    fastify.get(
        "/accesses/idade",
        { preHandler: [authMiddleware, adminMiddleware] },
        accessController.getAccessesByAgeGroupAndGender.bind(accessController)
    );

    fastify.get(
        "/accesses/location",
        { preHandler: [authMiddleware, adminMiddleware] },
        accessController.getTopLocations.bind(accessController)
    );
}