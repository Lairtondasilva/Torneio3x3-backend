/*
  Warnings:

  - Added the required column `name` to the `Championship` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Championship" ADD COLUMN     "name" TEXT NOT NULL;
