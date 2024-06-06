/*
  Warnings:

  - You are about to drop the column `isActive` on the `CarerProfile` table. All the data in the column will be lost.
  - You are about to drop the column `workedHours` on the `CarerProfile` table. All the data in the column will be lost.
  - You are about to drop the column `worksOnWeekend` on the `CarerProfile` table. All the data in the column will be lost.
  - Added the required column `is_active` to the `CarerProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `worked_hours` to the `CarerProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `works_on_weekend` to the `CarerProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CarerProfile" DROP COLUMN "isActive",
DROP COLUMN "workedHours",
DROP COLUMN "worksOnWeekend",
ADD COLUMN     "is_active" BOOLEAN NOT NULL,
ADD COLUMN     "worked_hours" INTEGER NOT NULL,
ADD COLUMN     "works_on_weekend" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "confirmation_code" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "addressId" INTEGER NOT NULL,
    "stripeAccountId" INTEGER,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationRequest" (
    "id" SERIAL NOT NULL,
    "time_range" TEXT NOT NULL,
    "addressId" INTEGER NOT NULL,
    "patient_name" TEXT NOT NULL,
    "patient_phone" TEXT NOT NULL,
    "clientId" INTEGER,
    "description" TEXT NOT NULL,
    "comments" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "carerId" INTEGER NOT NULL,

    CONSTRAINT "ApplicationRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Client_stripeAccountId_key" ON "Client"("stripeAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationRequest_clientId_key" ON "ApplicationRequest"("clientId");

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_stripeAccountId_fkey" FOREIGN KEY ("stripeAccountId") REFERENCES "StripeAccount"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationRequest" ADD CONSTRAINT "ApplicationRequest_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationRequest" ADD CONSTRAINT "ApplicationRequest_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationRequest" ADD CONSTRAINT "ApplicationRequest_carerId_fkey" FOREIGN KEY ("carerId") REFERENCES "CarerProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
