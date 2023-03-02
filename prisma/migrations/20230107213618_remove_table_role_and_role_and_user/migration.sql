/*
  Warnings:

  - You are about to drop the `Roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rolesOnUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "rolesOnUser" DROP CONSTRAINT "rolesOnUser_rolesId_fkey";

-- DropForeignKey
ALTER TABLE "rolesOnUser" DROP CONSTRAINT "rolesOnUser_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "roles" TEXT;

-- DropTable
DROP TABLE "Roles";

-- DropTable
DROP TABLE "rolesOnUser";
