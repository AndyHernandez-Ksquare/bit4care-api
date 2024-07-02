import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'src/config';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TwilioService } from './twilio.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: config.jwt.secret,
      signOptions: { expiresIn: config.jwt.expiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    TwilioService,
    LocalStrategy,
    JwtStrategy,
    PrismaService,
  ],
})
export class AuthModule {}
