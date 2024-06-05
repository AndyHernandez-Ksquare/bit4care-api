import {
  IsInt,
  IsString,
  IsOptional,
  IsEmail,
  IsBoolean,
} from 'class-validator';
import { Client } from '@prisma/client';

export class CreateClientDto implements Client {
  @IsInt()
  id: number;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  confirmation_code: string;

  @IsString()
  password: string;

  @IsBoolean()
  is_active: boolean;

  @IsInt()
  addressId: number;

  @IsOptional()
  @IsInt()
  stripeAccountId: number;
}
