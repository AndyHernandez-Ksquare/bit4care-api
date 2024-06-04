// src/auth/auth.service.ts
import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { AuthPayloadDto } from './dto/auth-payload.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateUser({
    email,
    password,
  }: AuthPayloadDto): Promise<string | null> {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) return null;

    if (password === user.password) {
      return this.jwtService.sign({
        username: user.email,
        role: user.role,
        sub: user.id,
      });
    }
    return null;
  }
}
