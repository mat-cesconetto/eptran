/*
  Warnings:

  - Added the required column `statusId` to the `RepostaTicketUsuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RepostaTicketUsuario" ADD COLUMN     "statusId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "RepostaTicketUsuario" ADD CONSTRAINT "RepostaTicketUsuario_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "TicketUsuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
