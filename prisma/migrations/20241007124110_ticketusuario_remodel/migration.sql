/*
  Warnings:

  - Added the required column `userId` to the `RepostaTicketUsuario` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `TicketUsuario` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "StatusEnum" AS ENUM ('EM_ABERTO', 'EM_ANDAMENTO', 'RESOLVIDO', 'CANCELADO');

-- AlterTable
ALTER TABLE "RepostaTicketUsuario" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "TicketUsuario" ADD COLUMN     "closedById" INTEGER,
ADD COLUMN     "updatedById" INTEGER,
DROP COLUMN "status",
ADD COLUMN     "status" "StatusEnum" NOT NULL;

-- DropEnum
DROP TYPE "Status";

-- CreateTable
CREATE TABLE "TicketStatusHistory" (
    "id" SERIAL NOT NULL,
    "ticketId" INTEGER NOT NULL,
    "status" "StatusEnum" NOT NULL,
    "changedById" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TicketStatusHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TicketUsuario" ADD CONSTRAINT "TicketUsuario_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketUsuario" ADD CONSTRAINT "TicketUsuario_closedById_fkey" FOREIGN KEY ("closedById") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RepostaTicketUsuario" ADD CONSTRAINT "RepostaTicketUsuario_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketStatusHistory" ADD CONSTRAINT "TicketStatusHistory_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "TicketUsuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TicketStatusHistory" ADD CONSTRAINT "TicketStatusHistory_changedById_fkey" FOREIGN KEY ("changedById") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
