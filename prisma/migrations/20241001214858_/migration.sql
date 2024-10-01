/*
  Warnings:

  - You are about to drop the column `assunto_reclamacao` on the `FaleConosco` table. All the data in the column will be lost.
  - You are about to drop the column `email_reclamacao` on the `FaleConosco` table. All the data in the column will be lost.
  - You are about to drop the column `mensagem_reclamacao` on the `FaleConosco` table. All the data in the column will be lost.
  - You are about to drop the column `nome_reclamacao` on the `FaleConosco` table. All the data in the column will be lost.
  - You are about to drop the `Cadastro` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `assunto` to the `FaleConosco` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `FaleConosco` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mensagem` to the `FaleConosco` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `FaleConosco` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Conquistas" DROP CONSTRAINT "Conquistas_fk_id_usuario_fkey";

-- AlterTable
ALTER TABLE "FaleConosco" DROP COLUMN "assunto_reclamacao",
DROP COLUMN "email_reclamacao",
DROP COLUMN "mensagem_reclamacao",
DROP COLUMN "nome_reclamacao",
ADD COLUMN     "assunto" VARCHAR(99) NOT NULL,
ADD COLUMN     "email" VARCHAR(99) NOT NULL,
ADD COLUMN     "mensagem" TEXT NOT NULL,
ADD COLUMN     "nome" VARCHAR(99) NOT NULL;

-- DropTable
DROP TABLE "Cadastro";

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(99) NOT NULL,
    "email" VARCHAR(99) NOT NULL,
    "senha" VARCHAR(99) NOT NULL,
    "cep" VARCHAR(99) NOT NULL,
    "rua" VARCHAR(99) NOT NULL,
    "cidade" VARCHAR(99) NOT NULL,
    "estado" "EstadoEnum" NOT NULL,
    "escola" VARCHAR(100) NOT NULL,
    "data_nasc" TIMESTAMP(3) NOT NULL,
    "escolaridade" "EscolaridadeEnum" NOT NULL,
    "sexo" "SexoEnum" NOT NULL,
    "adm" BOOLEAN DEFAULT false,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Conquistas" ADD CONSTRAINT "Conquistas_fk_id_usuario_fkey" FOREIGN KEY ("fk_id_usuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
