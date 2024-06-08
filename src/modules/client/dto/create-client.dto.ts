import {
  IsInt,
  IsString,
  IsOptional,
  IsEmail,
  IsBoolean,
} from 'class-validator';
import { Client } from '@prisma/client';

export class CreateClientDto implements Partial<Client> {
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

  @IsOptional()
  @IsInt()
  addressId: number;

  @IsOptional()
  @IsInt()
  stripeAccountId: number;
}
