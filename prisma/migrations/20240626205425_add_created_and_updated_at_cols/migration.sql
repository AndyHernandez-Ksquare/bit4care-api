/*
  Warnings:

  - Added the required column `updatedAt` to the `AllowedPaymentMethod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ApplicationRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `CarerProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `CarerReview` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ConfirmationCode` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `FavoriteCarers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `PaymentHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `StripeAccount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AllowedPaymentMethod" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ApplicationRequest" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "CarerProfile" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "is_active" SET DEFAULT true;

-- AlterTable
ALTER TABLE "CarerReview" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "is_active" SET DEFAULT true;

-- AlterTable
ALTER TABLE "ConfirmationCode" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "FavoriteCarers" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "PaymentHistory" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "StripeAccount" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
