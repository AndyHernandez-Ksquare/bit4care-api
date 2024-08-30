import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserHasStripeAccountGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = await this.prisma.user.findUnique({
      where: { id: request.user.id },
      include: { stripeAccount: true },
    });

    if (!user.stripeAccount) {
      throw new ForbiddenException('User does not have a Stripe account');
    }

    return true;
  }
}
