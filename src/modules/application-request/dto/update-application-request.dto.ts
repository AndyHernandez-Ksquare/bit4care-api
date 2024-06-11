import { PartialType } from '@nestjs/swagger';
import { CreateApplicationRequestDto } from './create-application-request.dto';

export class UpdateApplicationRequestDto extends PartialType(CreateApplicationRequestDto) {}
