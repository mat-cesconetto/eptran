import { FastifyInstance } from "fastify";
import { AccessController } from "../controllers/accessController";
import { adminMiddleware } from "../middlewares/adminMiddleware";
import { authMiddleware } from "../middlewares/authMiddleware";

export async function statsRoutes(fastify: FastifyInstance) {
  const accessController = new AccessController();

  // Rota para obter acessos semanais
  fastify.get(
    "/accesses/weekly",
    { preHandler: [authMiddleware, adminMiddleware] },
    accessController.getWeeklyAccessesByEducation.bind(accessController)
  );
}
