import { PaymentHistory, AllowedPaymentMethod } from '@prisma/client';
// src/allowed-payment-methods/dto/create-allowed-payment-method.dto.ts
import { IsInt, IsString, IsArray, IsOptional } from 'class-validator';

export class CreateAllowedPaymentMethodDto implements AllowedPaymentMethod {
  @IsInt()
  id: number;

  @IsString()
  payment_method: string;

  @IsOptional()
  @IsArray()
  PaymentHistory: PaymentHistory[];
}
