/*
  Warnings:

  - Added the required column `bairro` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `escolaridade` to the `Videos` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BairrosJoinville" AS ENUM ('NOVA_BRASILIA', 'SAO_MARCOS', 'VILA_NOVA', 'GLORIA', 'COSTA_E_SILVA', 'SANTO_ANTONIO', 'AMERICA', 'CENTRO', 'ATIRADORES', 'ANITA_GARIBALDI', 'FLORESTA', 'ITINGA', 'ITAUM', 'JARIVATUBA', 'FATIMA', 'GUANABARA', 'BUCAREIN', 'BOA_VISTA', 'SAGUACU', 'IRIRIU', 'BOM_RETIRO', 'AVENTUREIRO', 'JARDIM_SOFIA', 'MORRO_DO_MEIO', 'ZONA_INDUSTRIAL_1', 'PIRABEIRABA', 'RIO_BONITO', 'JARDIM_IRIRIU', 'COMASA', 'ADHEMAR_GARCIA', 'PARANAGUA_MIRIM', 'JOAO_COSTA', 'BOEHMERWALDT', 'PETROPOLIS', 'ESPINHEIROS', 'JARDIM_PARAISO', 'VILA_CUBATAO', 'ZONA_INDUSTRIAL_2', 'PARQUE_GUARANI', 'ULYSSES_GUIMARAES', 'DONA_FRANCISCA', 'PROFIPO');

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "bairro" VARCHAR(99) NOT NULL;

-- AlterTable
ALTER TABLE "Videos" ADD COLUMN     "escolaridade" "EscolaridadeEnum" NOT NULL;

-- CreateTable
CREATE TABLE "_UsuarioVideos" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UsuarioVideos_AB_unique" ON "_UsuarioVideos"("A", "B");

-- CreateIndex
CREATE INDEX "_UsuarioVideos_B_index" ON "_UsuarioVideos"("B");

-- AddForeignKey
ALTER TABLE "_UsuarioVideos" ADD CONSTRAINT "_UsuarioVideos_A_fkey" FOREIGN KEY ("A") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UsuarioVideos" ADD CONSTRAINT "_UsuarioVideos_B_fkey" FOREIGN KEY ("B") REFERENCES "Videos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
