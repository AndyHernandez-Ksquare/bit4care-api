import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true; // If no roles are specified, allow access by default
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user && roles.includes(user.role)) {
      return true;
    } else {
      throw new ForbiddenException(
        'User does not have the required role to access this endpoint',
      );
    }
  }
}
