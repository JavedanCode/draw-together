/*
  Warnings:

  - Added the required column `updatedAt` to the `Drawing` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Drawing" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "admin" BOOLEAN NOT NULL DEFAULT false;
