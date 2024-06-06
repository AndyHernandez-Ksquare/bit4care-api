-- CreateTable
CREATE TABLE "PaymentHistory" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "payment_method" TEXT NOT NULL,
    "creation_date" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "PaymentHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AllowedPaymentMethod" (
    "id" SERIAL NOT NULL,
    "payment_method" TEXT NOT NULL,

    CONSTRAINT "AllowedPaymentMethod_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AllowedPaymentMethod_payment_method_key" ON "AllowedPaymentMethod"("payment_method");

-- AddForeignKey
ALTER TABLE "PaymentHistory" ADD CONSTRAINT "PaymentHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentHistory" ADD CONSTRAINT "PaymentHistory_payment_method_fkey" FOREIGN KEY ("payment_method") REFERENCES "AllowedPaymentMethod"("payment_method") ON DELETE RESTRICT ON UPDATE CASCADE;
