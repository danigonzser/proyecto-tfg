/*
  Warnings:

  - You are about to drop the `CatalogueUserRoles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Label` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cover` to the `catalogues` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isPrivate` to the `catalogues` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CatalogueUserRoles" DROP CONSTRAINT "CatalogueUserRoles_catalogueId_fkey";

-- DropForeignKey
ALTER TABLE "CatalogueUserRoles" DROP CONSTRAINT "CatalogueUserRoles_userId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_memeId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Label" DROP CONSTRAINT "Label_memeId_fkey";

-- DropForeignKey
ALTER TABLE "Label" DROP CONSTRAINT "Label_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Meme" DROP CONSTRAINT "Meme_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "Reaction" DROP CONSTRAINT "Reaction_creatorId_fkey";

-- DropForeignKey
ALTER TABLE "Reaction" DROP CONSTRAINT "Reaction_memeId_fkey";

-- DropForeignKey
ALTER TABLE "catalogues" DROP CONSTRAINT "catalogues_ownerId_fkey";

-- AlterTable
ALTER TABLE "catalogues" ADD COLUMN     "cover" BYTEA NOT NULL,
ADD COLUMN     "isPrivate" BOOLEAN NOT NULL;

-- DropTable
DROP TABLE "CatalogueUserRoles";

-- DropTable
DROP TABLE "Comment";

-- DropTable
DROP TABLE "Label";

-- DropTable
DROP TABLE "Reaction";

-- DropTable
DROP TABLE "users";

-- DropEnum
DROP TYPE "Role";
