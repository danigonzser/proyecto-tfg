/*
  Warnings:

  - You are about to drop the column `image` on the `Meme` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Meme" DROP COLUMN "image",
ADD COLUMN     "imageJson" TEXT NOT NULL DEFAULT '{}';
