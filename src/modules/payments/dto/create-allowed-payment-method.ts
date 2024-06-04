// src/allowed-payment-methods/dto/create-allowed-payment-method.dto.ts
import { IsString } from 'class-validator';

export class CreateAllowedPaymentMethodDto {
  @IsString()
  payment_method: string;
}
