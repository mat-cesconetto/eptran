-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Em_Aberto', 'Em_Andamento', 'Resolvido', 'Cancelado');

-- CreateTable
CREATE TABLE "TicketUsuario" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "assunto" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "anexo" TEXT,
    "status" "Status" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TicketUsuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RepostaTicketUsuario" (
    "id" SERIAL NOT NULL,
    "ticketId" INTEGER NOT NULL,
    "resposta" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RepostaTicketUsuario_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TicketUsuario" ADD CONSTRAINT "TicketUsuario_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RepostaTicketUsuario" ADD CONSTRAINT "RepostaTicketUsuario_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "TicketUsuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
