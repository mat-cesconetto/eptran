/*
  Warnings:

  - Made the column `data_nascimento_usuario` on table `Cadastro` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Cadastro" ALTER COLUMN "data_nascimento_usuario" SET NOT NULL,
ALTER COLUMN "adm" DROP NOT NULL,
ALTER COLUMN "adm" SET DEFAULT false;
