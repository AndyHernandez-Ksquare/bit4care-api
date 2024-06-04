import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRole } from 'src/common/enums';

export class AuthPayloadDto {
  @IsEmail()
  @MinLength(4)
  email: string;

  @IsString()
  @MinLength(4)
  password: string;
}
