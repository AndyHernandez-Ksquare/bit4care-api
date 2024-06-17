/*
  Warnings:

  - You are about to drop the column `isFavorite` on the `CarerProfile` table. All the data in the column will be lost.
  - You are about to drop the column `works_on_weekend` on the `CarerProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ApplicationRequest" ADD COLUMN     "status" TEXT;

-- AlterTable
ALTER TABLE "CarerProfile" DROP COLUMN "isFavorite",
DROP COLUMN "works_on_weekend";

-- CreateTable
CREATE TABLE "FavoriteCarers" (
    "id" SERIAL NOT NULL,
    "carerId" INTEGER NOT NULL,
    "clientId" INTEGER NOT NULL,

    CONSTRAINT "FavoriteCarers_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FavoriteCarers" ADD CONSTRAINT "FavoriteCarers_carerId_fkey" FOREIGN KEY ("carerId") REFERENCES "CarerProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FavoriteCarers" ADD CONSTRAINT "FavoriteCarers_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
