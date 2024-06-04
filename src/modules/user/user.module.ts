import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersController } from './user.controller';
import { UserService } from './user.service';
import { AuthMiddleware } from '../auth/middlewares/user.middleware';
import { PrismaService } from 'src/prisma.service';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'src/config';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: config.jwt.secret,
      signOptions: { expiresIn: config.jwt.expiresIn },
    }),
  ],
  controllers: [UsersController],
  providers: [UserService, PrismaService, JwtStrategy],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: '/user/:id', method: RequestMethod.GET },
        { path: '/user', method: RequestMethod.POST },
      );
  }
}
