import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  name: string;

  @IsEmail()
  @MinLength(4)
  email: string;
}
