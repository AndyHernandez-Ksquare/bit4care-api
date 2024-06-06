// import { Module } from '@nestjs/common';
// import { PaymentsService } from './payments.service';
// import { PaymentsController } from './payments.controller';

// @Module({
//   controllers: [PaymentsController],
//   providers: [PaymentsService],
// })
// export class PaymentsModule {}
// stripe.module.ts
import { Module } from '@nestjs/common';
import { StripeModule as NestStripeModule } from '@golevelup/nestjs-stripe';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';

@Module({
  imports: [
    ConfigModule,
    NestStripeModule.forRootAsync(NestStripeModule, {
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        apiKey: configService.get<string>('STRIPE_SECRET_KEY'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [StripeService],
  controllers: [StripeController],
})
export class StripeModule {}
