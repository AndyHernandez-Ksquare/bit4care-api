import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto implements Partial<User> {
  @ApiProperty({ description: 'The name of the user' })
  @IsString()
  @MinLength(4)
  name: string;

  @ApiProperty({ description: 'The email of the user' })
  @IsEmail()
  @MinLength(4)
  email: string;

  @ApiProperty({ description: 'The email of the user' })
  @IsString()
  @MinLength(4)
  password: string;
}
