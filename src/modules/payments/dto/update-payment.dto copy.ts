import { PartialType } from '@nestjs/swagger';
import { CreateStripeAccountDto } from './create-stripe-account.dto';

export class UpdateStripeAccountDto extends PartialType(
  CreateStripeAccountDto,
) {}
