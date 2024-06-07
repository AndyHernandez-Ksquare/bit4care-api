-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_carerId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "addressId" INTEGER,
ALTER COLUMN "carerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_carerId_fkey" FOREIGN KEY ("carerId") REFERENCES "CarerProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE SET NULL ON UPDATE CASCADE;
