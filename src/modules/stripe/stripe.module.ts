// stripe.module.ts
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { StripeService } from './stripe.service';
import Stripe from 'stripe';
import { PrismaService } from 'src/prisma.service';
import { STRIPE_CLIENT } from './constants';

@Module({})
export class StripeModule {
  static forRoot(apiKey: string, config: Stripe.StripeConfig): DynamicModule {
    const stripe = new Stripe(apiKey, config);

    const stripeProvider: Provider = {
      provide: STRIPE_CLIENT,
      useValue: stripe,
    };
    return {
      module: StripeModule,
      providers: [stripeProvider, StripeService, PrismaService],
      exports: [stripeProvider],
      global: true,
    };
  }
}
