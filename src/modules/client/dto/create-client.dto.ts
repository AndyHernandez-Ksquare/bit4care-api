import {
  IsInt,
  IsString,
  IsOptional,
  IsEmail,
  IsBoolean,
  IsPhoneNumber,
  IsNotEmpty,
} from 'class-validator';
import { Client } from '@prisma/client';

export class CreateClientDto implements Partial<Client> {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
