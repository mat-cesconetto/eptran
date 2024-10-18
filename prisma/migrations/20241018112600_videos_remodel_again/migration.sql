/*
  Warnings:

  - You are about to drop the column `video_link` on the `Videos` table. All the data in the column will be lost.
  - Added the required column `videoLink` to the `Videos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Videos" DROP COLUMN "video_link",
ADD COLUMN     "videoLink" TEXT NOT NULL;
