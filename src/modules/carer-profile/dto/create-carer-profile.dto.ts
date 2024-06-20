import { CarerProfile } from '@prisma/client';
import {
  IsString,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsEmail,
} from 'class-validator';

export class CreateCarerProfileDto implements Partial<CarerProfile> {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  payment_range: string;

  @IsString()
  @IsNotEmpty()
  availability: string;

  @IsString()
  @IsNotEmpty()
  qualifications: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsBoolean()
  isFavorite: boolean;

  @IsBoolean()
  works_on_weekend: boolean;

  @IsString()
  @IsNotEmpty()
  residency_status: string;

  @IsInt()
  @IsNotEmpty()
  years_of_experience: number;

  @IsString()
  @IsNotEmpty()
  birth_date: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  postal_code: string;

  @IsString()
  @IsNotEmpty()
  colony: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  nationality: string;

  @IsString()
  @IsNotEmpty()
  marital_status: string;

  @IsString()
  @IsNotEmpty()
  speciality: string;

  @IsString()
  @IsNotEmpty()
  motivation_letter: string;

  @IsInt()
  test_score: number;

  @IsBoolean()
  is_active: boolean;

  @IsInt()
  worked_hours: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  completed_services: number;
}
