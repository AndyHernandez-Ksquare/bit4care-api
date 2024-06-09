/*
  Warnings:

  - Added the required column `isVerified` to the `ConfirmationCode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ConfirmationCode" ADD COLUMN     "expiration" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL;
