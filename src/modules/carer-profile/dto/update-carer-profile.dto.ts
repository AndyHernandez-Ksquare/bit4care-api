import { PartialType } from '@nestjs/swagger';
import { CreateCarerProfileDto } from './create-carer-profile.dto';
import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class UpdateCarerProfileDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsOptional()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @IsOptional()
  @IsObject()
  @IsNotEmpty()
  availability: string;
}
