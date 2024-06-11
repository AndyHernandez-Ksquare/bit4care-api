-- CreateTable
CREATE TABLE "ConfirmationCode" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "recipient" TEXT NOT NULL,

    CONSTRAINT "ConfirmationCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ConfirmationCode_code_key" ON "ConfirmationCode"("code");

-- CreateIndex
CREATE UNIQUE INDEX "ConfirmationCode_recipient_key" ON "ConfirmationCode"("recipient");
