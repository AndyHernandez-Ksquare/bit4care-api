// src/auth/auth.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
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
      where: { email },
    });

    if (!user) return null;

    if (password === user.password) {
      return this.jwtService.sign({
        email: user.email,
        role: user.role,
        id: user.id,
      });
    }
    throw new BadRequestException('Invalid credentials');
  }
}
