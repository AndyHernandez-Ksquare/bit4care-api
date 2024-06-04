// src/payment-history/dto/create-payment-history.dto.ts
import { IsString, IsInt, IsDate } from 'class-validator';

export class CreatePaymentHistoryDto {
  @IsInt()
  account_id: number;

  @IsString()
  status: string;

  @IsString()
  amount: string;

  @IsString()
  payment_method: string;

  @IsDate()
  creation_date: Date;

  @IsString()
  description: string;
}
