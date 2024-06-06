// src/payment-history/dto/create-payment-history.dto.ts
import { IsString, IsInt } from 'class-validator';
import { StripeAccount } from '@prisma/client';

export class CreateStripeAccountDto implements StripeAccount {
  @IsInt()
  id: number;

  @IsString()
  stripe_customer_id: string;

  @IsString()
  default_payment_method_token: string;

  @IsString()
  additional_payment_methods: number;
}
