/*
  Warnings:

  - You are about to drop the `TicketStatusHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "PrioridadeEnum" AS ENUM ('NENHUMA', 'ALTA', 'MEDIA', 'BAIXA');

-- DropForeignKey
ALTER TABLE "TicketStatusHistory" DROP CONSTRAINT "TicketStatusHistory_changedById_fkey";

-- DropForeignKey
ALTER TABLE "TicketStatusHistory" DROP CONSTRAINT "TicketStatusHistory_ticketId_fkey";

-- AlterTable
ALTER TABLE "TicketUsuario" ADD COLUMN     "prioridade" "PrioridadeEnum" NOT NULL DEFAULT 'NENHUMA',
ALTER COLUMN "status" SET DEFAULT 'EM_ABERTO';

-- DropTable
DROP TABLE "TicketStatusHistory";
