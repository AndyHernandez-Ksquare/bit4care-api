/*
  Warnings:

  - You are about to drop the column `addressId` on the `ApplicationRequest` table. All the data in the column will be lost.
  - You are about to drop the column `addressId` on the `Client` table. All the data in the column will be lost.
  - You are about to drop the column `addressId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ApplicationRequest" DROP CONSTRAINT "ApplicationRequest_addressId_fkey";

-- DropForeignKey
ALTER TABLE "Client" DROP CONSTRAINT "Client_addressId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_addressId_fkey";

-- AlterTable
ALTER TABLE "ApplicationRequest" DROP COLUMN "addressId",
ADD COLUMN     "address" TEXT;

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "addressId",
ADD COLUMN     "address" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "addressId",
ADD COLUMN     "address" TEXT;

-- DropTable
DROP TABLE "Address";
