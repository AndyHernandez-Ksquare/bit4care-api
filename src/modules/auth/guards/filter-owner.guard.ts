import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/common/enums';

@Injectable()
export class FilterOwnerGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const key = this.reflector.get<string>('key', context.getHandler());
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Filters do not apply when user is admin
    if (user.role === UserRole.ADMIN) return true;

    if (!user?.id) {
      throw new UnauthorizedException('Unauthorized');
    }

    if (!request.where) {
      request.where = {};
    }

    request.where[key] = user.id;

    return true;
  }
}
