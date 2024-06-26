/*
  Warnings:

  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CarerProfile" ADD COLUMN     "reviewed" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" SET NOT NULL;
