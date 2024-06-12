import { IsNotEmpty, IsString } from 'class-validator';
import { IsCorrectType } from '../validators/file-type.validator';

export class CreateFileDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsCorrectType({ message: 'Invalid mime type received' })
  type: string;
}
