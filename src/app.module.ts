import { Module } from '@nestjs/common';
import { UsersModule } from './modules/user/user.module'; // Import your modules here
import { AuthModule } from './modules/auth/auth.module';
import { CarerProfileModule } from './modules/carer-profile/carer-profile.module';
import { ClientModule } from './modules/client/client.module';
import { StripeModule } from '@golevelup/nestjs-stripe';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    StripeModule,
    CarerProfileModule,
    ClientModule,
  ],
  //   controllers: [UsersController], // Add your controllers here
  //   providers: [AppService], // Add your services here
})
export class AppModule {}
