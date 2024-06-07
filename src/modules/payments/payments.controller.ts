import { Controller, Get, Inject } from '@nestjs/common';
import { STRIPE_CLIENT } from '../stripe/constants';
import Stripe from 'stripe';

@Controller('payments')
export class PaymentsController {
  constructor(@Inject(STRIPE_CLIENT) private stripe: Stripe) {}

  @Get('/')
  listCustomers() {
    // Test endpoint
    return this.stripe.customers.list();
  }
}
