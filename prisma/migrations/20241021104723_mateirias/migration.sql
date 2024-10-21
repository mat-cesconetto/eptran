/*
  Warnings:

  - You are about to drop the `Livros` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Livros";

-- CreateTable
CREATE TABLE "Materiais" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "materialLink" TEXT NOT NULL,
    "escolaridade" "EscolaridadeEnum" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Materiais_pkey" PRIMARY KEY ("id")
);
