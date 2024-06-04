import { Module } from '@nestjs/common';
import { UsersModule } from './modules/user/user.module'; // Import your modules here
import { AuthModule } from './modules/auth/auth.module';
import { PaymentsModule } from './modules/payments/payments.module';

@Module({
  imports: [UsersModule, AuthModule, PaymentsModule],
  //   controllers: [UsersController], // Add your controllers here
  //   providers: [AppService], // Add your services here
})
export class AppModule {}
