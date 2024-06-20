/*
  Warnings:

  - Added the required column `CURP` to the `CarerProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `NSS` to the `CarerProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `RFC` to the `CarerProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birth_date` to the `CarerProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `colony` to the `CarerProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `CarerProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `has_driving_license` to the `CarerProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_approved` to the `CarerProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `marital_status` to the `CarerProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nationality` to the `CarerProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postal_code` to the `CarerProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `CarerProfile` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `years_of_experience` on the `CarerProfile` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "CarerProfile" ADD COLUMN     "CURP" TEXT NOT NULL,
ADD COLUMN     "NSS" TEXT NOT NULL,
ADD COLUMN     "RFC" TEXT NOT NULL,
ADD COLUMN     "birth_date" TEXT NOT NULL,
ADD COLUMN     "colony" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "has_driving_license" BOOLEAN NOT NULL,
ADD COLUMN     "is_approved" BOOLEAN NOT NULL,
ADD COLUMN     "license_type" TEXT,
ADD COLUMN     "marital_status" TEXT NOT NULL,
ADD COLUMN     "nationality" TEXT NOT NULL,
ADD COLUMN     "postal_code" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
DROP COLUMN "years_of_experience",
ADD COLUMN     "years_of_experience" INTEGER NOT NULL;
