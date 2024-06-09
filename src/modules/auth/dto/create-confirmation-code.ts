import { IsEmail, IsOptional, IsString } from 'class-validator';
import { ConfirmationCode } from '@prisma/client';

export class CreateConfirmationCode implements Partial<ConfirmationCode> {
  @IsString()
  recipient: string;

  @IsOptional()
  @IsString()
  code: string;
}
