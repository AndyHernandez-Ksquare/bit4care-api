import { IsEmail, IsString } from 'class-validator';
import { ConfirmationCode } from '@prisma/client';

export class CreateConfirmationCode implements Partial<ConfirmationCode> {
  @IsString()
  recipient: string;
}
