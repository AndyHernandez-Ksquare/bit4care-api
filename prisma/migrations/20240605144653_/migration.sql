/*
  Warnings:

  - A unique constraint covering the columns `[carerId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `carerId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'CARER';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "carerId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "CarerProfile" (
    "id" SERIAL NOT NULL,
    "payment_range" TEXT NOT NULL,
    "availability" TEXT NOT NULL,
    "qualifications" TEXT NOT NULL,
    "isFavorite" BOOLEAN NOT NULL,
    "worksOnWeekend" BOOLEAN NOT NULL,
    "residency_status" TEXT NOT NULL,
    "years_of_experience" TEXT NOT NULL,
    "speciality" TEXT NOT NULL,
    "motivation_letter" TEXT NOT NULL,
    "test_score" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "workedHours" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "completed_services" INTEGER NOT NULL,

    CONSTRAINT "CarerProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarerReview" (
    "id" SERIAL NOT NULL,
    "stars" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "carerId" INTEGER NOT NULL,

    CONSTRAINT "CarerReview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_carerId_key" ON "User"("carerId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_carerId_fkey" FOREIGN KEY ("carerId") REFERENCES "CarerProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarerReview" ADD CONSTRAINT "CarerReview_carerId_fkey" FOREIGN KEY ("carerId") REFERENCES "CarerProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
