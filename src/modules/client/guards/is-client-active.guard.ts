import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRole } from 'src/common/enums';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class IsClientActiveGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Filters do not apply when user is admin
    if (user.role === UserRole.ADMIN) return true;

    if (!user?.id) {
      throw new UnauthorizedException('Unauthorized');
    }

    const client = await this.prisma.client.findFirst({
      where: { User: { id: user.id } },
    });

    if (client.is_active === false) {
      throw new UnauthorizedException('Client is not active');
    }

    return true;
  }
}
