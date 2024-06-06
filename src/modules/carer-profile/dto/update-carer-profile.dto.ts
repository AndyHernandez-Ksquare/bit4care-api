import { PartialType } from '@nestjs/swagger';
import { CreateCarerProfileDto } from './create-carer-profile.dto';

export class UpdateCarerProfileDto extends PartialType(CreateCarerProfileDto) {}
