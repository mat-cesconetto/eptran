-- DropForeignKey
ALTER TABLE "RepostaTicketUsuario" DROP CONSTRAINT "RepostaTicketUsuario_statusId_fkey";

-- AlterTable
ALTER TABLE "RepostaTicketUsuario" ALTER COLUMN "statusId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "RepostaTicketUsuario" ADD CONSTRAINT "RepostaTicketUsuario_statusId_fkey" FOREIGN KEY ("statusId") REFERENCES "TicketUsuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;
