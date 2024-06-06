/*
  Warnings:

  - A unique constraint covering the columns `[stripeAccountId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "stripeAccountId" INTEGER;

-- CreateTable
CREATE TABLE "StripeAccount" (
    "id" SERIAL NOT NULL,
    "stripe_customer_id" TEXT NOT NULL,
    "default_payment_method_token" TEXT NOT NULL,
    "additional_payment_methods" INTEGER NOT NULL,

    CONSTRAINT "StripeAccount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StripeAccount_stripe_customer_id_key" ON "StripeAccount"("stripe_customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_stripeAccountId_key" ON "User"("stripeAccountId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_stripeAccountId_fkey" FOREIGN KEY ("stripeAccountId") REFERENCES "StripeAccount"("id") ON DELETE SET NULL ON UPDATE CASCADE;
