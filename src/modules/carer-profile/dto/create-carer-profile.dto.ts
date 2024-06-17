import { CarerProfile, CarerReview } from '@prisma/client';
import {
  IsString,
  IsBoolean,
  IsInt,
  IsOptional,
  IsArray,
} from 'class-validator';

export class CreateCarerProfileDto implements Partial<CarerProfile> {
  @IsString()
  payment_range: string;

  @IsString()
  availability: string;

  @IsString()
  qualifications: string;

  @IsBoolean()
  isFavorite: boolean;

  @IsBoolean()
  works_on_weekend: boolean;

  @IsString()
  residency_status: string;

  @IsString()
  years_of_experience: string;

  @IsString()
  speciality: string;

  @IsString()
  motivation_letter: string;

  @IsInt()
  test_score: number;

  @IsBoolean()
  is_active: boolean;

  @IsInt()
  worked_hours: number;

  @IsString()
  description: string;

  @IsInt()
  completed_services: number;

  @IsOptional()
  @IsInt()
  userId: number | null;
}
