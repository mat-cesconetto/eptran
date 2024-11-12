import { FastifyInstance, FastifyPluginOptions } from "fastify";
import { TicketController } from "../controllers/ticketController";
import { TicketRepository } from "../repositories/ticketRepository";
import { authMiddleware } from "../middlewares/authMiddleware";
import * as path from "path";
import { adminMiddleware } from "../middlewares/adminMiddleware";

async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  const ticketRepository = new TicketRepository();
  const ticketController = new TicketController(ticketRepository);

  fastify.post(
    "/open",
    { preHandler: [authMiddleware] },
    ticketController.createTicket.bind(ticketController)
  );
  fastify.get(
    "/list",
    // { preHandler: authMiddleware },
    ticketController.getAllTickets.bind(ticketController)
  );
  fastify.post(
    "/:ticketId/responder",
    { preHandler: adminMiddleware},
    ticketController.addResposta.bind(ticketController)
  );
  fastify.get(
    "/:id",
    { preHandler: adminMiddleware },
    ticketController.getTicketById.bind(ticketController)
  );
  fastify.patch(
    "/:id/finalizar",
    { preHandler: [authMiddleware, adminMiddleware] },
    ticketController.finalizarTicket.bind(ticketController)
  );
  // fastify.post('/:id/respostas', { preHandler: authMiddleware }, ticketController.addResposta.bind(ticketController));
  // fastify.get('/users/:userId/tickets', { preHandler: authMiddleware }, ticketController.getTicketsByUserId.bind(ticketController));

  // Serve arquivos estáticos
  fastify.get("/anexos/:filename", (req, reply) => {
    const { filename } = req.params as { filename: string }; // Ajusta o tipo de filename
    const filePath = path.join(__dirname, "../../uploads/tickets", filename);
    reply.sendFile(filePath);
  });
}

export default routes;
