/*
  Warnings:

  - Added the required column `maxNumberPlayers` to the `Championship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minNumberPlayer` to the `Championship` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Championship" ADD COLUMN     "maxNumberPlayers" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "minNumberPlayer" DECIMAL(65,30) NOT NULL;

-- AlterTable
ALTER TABLE "Player" ALTER COLUMN "shirtNumber" DROP NOT NULL,
ALTER COLUMN "points" DROP NOT NULL;
