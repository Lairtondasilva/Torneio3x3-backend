/*
  Warnings:

  - You are about to drop the `_RolesToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_RolesToUser" DROP CONSTRAINT "_RolesToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_RolesToUser" DROP CONSTRAINT "_RolesToUser_B_fkey";

-- DropTable
DROP TABLE "_RolesToUser";

-- CreateTable
CREATE TABLE "rolesOnUser" (
    "userId" TEXT NOT NULL,
    "rolesId" TEXT NOT NULL,

    CONSTRAINT "rolesOnUser_pkey" PRIMARY KEY ("userId","rolesId")
);

-- AddForeignKey
ALTER TABLE "rolesOnUser" ADD CONSTRAINT "rolesOnUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rolesOnUser" ADD CONSTRAINT "rolesOnUser_rolesId_fkey" FOREIGN KEY ("rolesId") REFERENCES "Roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
