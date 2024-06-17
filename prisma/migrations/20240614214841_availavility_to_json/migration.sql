/*
  Warnings:

  - Changed the type of `availability` on the `CarerProfile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "CarerProfile" DROP COLUMN "availability",
ADD COLUMN     "availability" JSONB NOT NULL;
