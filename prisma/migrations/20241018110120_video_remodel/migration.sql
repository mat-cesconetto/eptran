/*
  Warnings:

  - You are about to drop the `_UsuarioVideos` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `Videos` table without a default value. This is not possible if the table is not empty.
  - Made the column `video_link` on table `Videos` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "_UsuarioVideos" DROP CONSTRAINT "_UsuarioVideos_A_fkey";

-- DropForeignKey
ALTER TABLE "_UsuarioVideos" DROP CONSTRAINT "_UsuarioVideos_B_fkey";

-- AlterTable
ALTER TABLE "Videos" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "video_link" SET NOT NULL;

-- DropTable
DROP TABLE "_UsuarioVideos";
