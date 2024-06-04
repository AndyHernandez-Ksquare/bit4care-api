import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthPayloadDto {
  @IsEmail()
  @MinLength(4)
  email: string;

  @IsString()
  @MinLength(4)
  password: string;
}
