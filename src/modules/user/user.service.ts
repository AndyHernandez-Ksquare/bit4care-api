import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRole } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  getUser(id: number, email: string) {
    const user = this.prisma.user.findUnique({
      where: { id, email },
      select: {
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
