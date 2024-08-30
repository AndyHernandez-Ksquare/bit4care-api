import { IsBoolean } from 'class-validator';

export class AcceptCarerProfileDto {
  @IsBoolean()
  is_approved: boolean;
}
