import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async getUser(id: number, email: string) {
    const user = await this.prisma.user.findUnique({
      where: { id, email },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        stripeAccountId: true,
        carerId: true,
        address: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async register(user: CreateUserDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: user.email },
    });
    if (existingUser) throw new BadRequestException('User already exists');

    // This endpoints initially creates users with lowest role
    const newUser = this.prisma.user.create({
      data: { ...user, role: UserRole.USER },
      select: { id: true, name: true, email: true, role: true },
    });
    return newUser;
  }
}
