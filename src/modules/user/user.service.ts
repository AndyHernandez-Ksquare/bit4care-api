import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  getUserById(id: number) {
    const user = this.prisma.user.findUnique({ where: { id } });
    return user;
  }

  createUser(user: any) {
    const newUser = this.prisma.user.create({ data: user });
    return newUser;
  }
}
