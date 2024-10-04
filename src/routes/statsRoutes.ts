import { FastifyInstance } from "fastify";
import { AccessController } from "../controller/accessController";
import { adminMiddleware } from "../middlewares/adminMiddleware";
import { authMiddleware } from "../middlewares/authMiddleware";

const statsRoutes = async (fastify: FastifyInstance) => {
    const accessController = new AccessController();

    // Rota para obter acessos semanais
    fastify.get('/accesses/weekly',accessController.getWeeklyAccessesByEducation.bind(accessController));
};

export { statsRoutes };
