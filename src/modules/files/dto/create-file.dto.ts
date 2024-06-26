import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import {
  FileActionType,
  IsCorrectType,
} from '../validators/file-type.validator';

export class CreateFileDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsCorrectType({ message: 'Invalid mime type received' })
  type: string;

  @IsOptional()
  @IsString()
  @FileActionType()
  action: string;
}
