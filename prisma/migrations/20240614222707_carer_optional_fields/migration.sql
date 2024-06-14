-- DropForeignKey
ALTER TABLE "ApplicationRequest" DROP CONSTRAINT "ApplicationRequest_carerId_fkey";

-- DropForeignKey
ALTER TABLE "CarerReview" DROP CONSTRAINT "CarerReview_carerId_fkey";

-- AlterTable
ALTER TABLE "ApplicationRequest" ALTER COLUMN "carerId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "CarerReview" ALTER COLUMN "carerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "CarerReview" ADD CONSTRAINT "CarerReview_carerId_fkey" FOREIGN KEY ("carerId") REFERENCES "CarerProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationRequest" ADD CONSTRAINT "ApplicationRequest_carerId_fkey" FOREIGN KEY ("carerId") REFERENCES "CarerProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
