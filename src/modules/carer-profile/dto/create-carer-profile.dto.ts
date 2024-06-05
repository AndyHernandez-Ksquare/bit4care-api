import { CarerProfile, CarerReview } from '@prisma/client';
import {
  IsString,
  IsBoolean,
  IsInt,
  IsOptional,
  IsArray,
} from 'class-validator';

export class CreateCarerProfileDto implements CarerProfile {
  @IsInt()
  id: number;

  @IsString()
  payment_range: string;

  @IsString()
  availability: string;

  @IsString()
  qualifications: string;

  @IsBoolean()
  isFavorite: boolean;

  @IsBoolean()
  worksOnWeekend: boolean;

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
  isActive: boolean;

  @IsInt()
  workedHours: number;

  @IsString()
  description: string;

  @IsInt()
  completed_services: number;

  @IsOptional()
  @IsInt()
  userId: number | null;

  @IsOptional()
  @IsArray()
  carerReviews: CarerReview[];
}
