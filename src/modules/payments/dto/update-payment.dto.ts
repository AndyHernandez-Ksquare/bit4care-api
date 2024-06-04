import { PartialType } from '@nestjs/swagger';
import { CreatePaymentDto } from './create-payment-history.dto';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {}
