/*
  Warnings:

  - You are about to drop the `FaleConosco` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Materiais" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Videos" ALTER COLUMN "updatedAt" DROP DEFAULT;

-- DropTable
DROP TABLE "FaleConosco";
