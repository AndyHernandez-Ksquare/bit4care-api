import { Module } from '@nestjs/common';
import { UsersModule } from './modules/user/user.module'; // Import your modules here
import { AuthModule } from './modules/auth/auth.module';
import { CarerProfileModule } from './modules/carer-profile/carer-profile.module';
import { ClientModule } from './modules/client/client.module';
import { StripeModule } from './modules/stripe/stripe.module';
import { config } from './config';
import { PaymentsController } from './modules/payments/payments.controller';
import { APP_FILTER } from '@nestjs/core';
import { PrismaClientExceptionFilter } from './prisma.filter';
import { ApplicationRequestModule } from './modules/application-request/application-request.module';
import { FilesModule } from './modules/files/files.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    CarerProfileModule,
    ClientModule,
    StripeModule.forRoot(config.stripe.secret, {
      apiVersion: '2023-10-16',
    }),
    ApplicationRequestModule,
    FilesModule,
  ],
  controllers: [PaymentsController],
  //   controllers: [UsersController], // Add your controllers here
  providers: [
    {
      provide: APP_FILTER,
      useClass: PrismaClientExceptionFilter,
    },
  ],
})
export class AppModule {}
