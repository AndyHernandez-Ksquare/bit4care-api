import { User } from '@prisma/client';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto implements Partial<User> {
  @IsString()
  @MinLength(4)
  name: string;

  @IsEmail()
  @MinLength(4)
  email: string;

  @IsString()
  @MinLength(4)
  password: string;
}
