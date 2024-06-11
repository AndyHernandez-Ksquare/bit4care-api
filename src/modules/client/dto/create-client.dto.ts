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
  email: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @IsString()
  password: string;
}
