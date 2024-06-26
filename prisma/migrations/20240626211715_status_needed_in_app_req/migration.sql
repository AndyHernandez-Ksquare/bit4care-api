/*
  Warnings:

  - Made the column `status` on table `ApplicationRequest` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ApplicationRequest" ALTER COLUMN "status" SET NOT NULL;
