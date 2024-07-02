import { ApplicationRequest } from '@prisma/client';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateApplicationRequestDto
  implements Partial<ApplicationRequest>
{
  @IsString()
  @IsNotEmpty()
  time_range: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsNotEmpty()
  patient_name: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  patient_phone: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  comments: string;

  @IsInt()
  @IsNotEmpty()
  amount: number;

  @IsInt()
  @IsNotEmpty()
  carerId: number;

  @IsString()
  @IsNotEmpty()
  status: string;
}
