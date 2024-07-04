-- AlterTable
ALTER TABLE "StripeAccount" ALTER COLUMN "default_payment_method_token" DROP NOT NULL,
ALTER COLUMN "additional_payment_methods" DROP NOT NULL;
