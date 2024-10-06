/*
  Warnings:

  - The values [Em_Aberto,Em_Andamento,Resolvido,Cancelado] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('EM_ABRTO', 'EM_ANDAMENTO', 'RESOLVIDO', 'CANCELADO');
ALTER TABLE "TicketUsuario" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
COMMIT;
