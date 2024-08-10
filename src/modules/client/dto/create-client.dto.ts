import { IsString, IsEmail, IsPhoneNumber, IsNotEmpty } from 'class-validator';
import { User } from '@prisma/client';

export class CreateClientDto implements Partial<User> {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
