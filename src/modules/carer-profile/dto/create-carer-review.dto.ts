import { CarerReview } from '@prisma/client';
import { IsString, IsInt } from 'class-validator';

export class CreateCarerReviewDto implements CarerReview {
  @IsInt()
  id: number;

  @IsInt()
  stars: number;

  @IsString()
  comment: string;

  @IsInt()
  carerId: number;
}
