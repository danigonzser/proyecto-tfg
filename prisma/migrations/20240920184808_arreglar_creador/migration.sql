/*
  Warnings:

  - You are about to drop the column `creatorId` on the `Meme` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `catalogues` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Meme" DROP COLUMN "creatorId";

-- AlterTable
ALTER TABLE "catalogues" DROP COLUMN "ownerId";
