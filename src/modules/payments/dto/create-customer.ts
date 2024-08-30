import { AllowedPaymentMethod } from '@prisma/client';
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class CreateCustomerDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
