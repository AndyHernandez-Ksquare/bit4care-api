/*
  Warnings:

  - A unique constraint covering the columns `[stripe_connected_account_id]` on the table `StripeAccount` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "StripeAccount" ADD COLUMN     "stripe_connected_account_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "StripeAccount_stripe_connected_account_id_key" ON "StripeAccount"("stripe_connected_account_id");
