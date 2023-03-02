/*
  Warnings:

  - A unique constraint covering the columns `[role]` on the table `Roles` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Roles_role_key" ON "Roles"("role");
