import {
  IsString,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsEmail,
} from 'class-validator';

export class AcceptCarerProfileDto {
  @IsBoolean()
  is_approved: boolean;
}
