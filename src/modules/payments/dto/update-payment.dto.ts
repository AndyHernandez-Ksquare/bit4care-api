import { PartialType } from '@nestjs/swagger';
import { CreatePaymentHistoryDto } from './create-payment-history.dto';

export class UpdatePaymentDto extends PartialType(CreatePaymentHistoryDto) {}
