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

@Module({
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
