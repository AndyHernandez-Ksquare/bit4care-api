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
  password: string;
}
