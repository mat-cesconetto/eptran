/*
  Warnings:

  - Added the required column `titulo` to the `Videos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Videos" ADD COLUMN     "titulo" TEXT NOT NULL;
