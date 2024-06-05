import { PartialType } from '@nestjs/swagger';
import { CreateCarerReviewDto } from './create-carer-review.dto';

export class UpdateCarerReviewDto extends PartialType(CreateCarerReviewDto) {}
