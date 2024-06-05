// src/payment-history/dto/create-payment-history.dto.ts
import { IsString, IsInt, IsDate } from 'class-validator';
import { PaymentHistory } from '@prisma/client';

export class CreatePaymentHistoryDto implements PaymentHistory {
  @IsInt()
  id: number;

  @IsString()
  status: string;

  @IsString()
  amount: string;

  @IsString()
  payment_method: string;

  @IsInt()
  userId: number;

  @IsDate()
  creation_date: Date;

  @IsString()
  description: string;
}
