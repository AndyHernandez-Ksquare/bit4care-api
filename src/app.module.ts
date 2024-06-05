import { Module } from '@nestjs/common';
import { UsersModule } from './modules/user/user.module'; // Import your modules here
import { AuthModule } from './modules/auth/auth.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { CarerProfileModule } from './modules/carer-profile/carer-profile.module';

@Module({
  imports: [UsersModule, AuthModule, PaymentsModule, CarerProfileModule],
  //   controllers: [UsersController], // Add your controllers here
  //   providers: [AppService], // Add your services here
})
export class AppModule {}
