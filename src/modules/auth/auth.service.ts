// src/auth/auth.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthPayloadDto } from './dto/auth-payload.dto';
import { PrismaService } from 'src/prisma.service';
import * as AWS from 'aws-sdk';
import { config } from 'src/config';

@Injectable()
export class AuthService {
  private sns: AWS.SNS;
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {
    this.sns = new AWS.SNS({
      region: config.aws.region,
      accessKeyId: config.aws.accessKey,
      secretAccessKey: config.aws.secretKey,
    });
  }

  generateCode(length: number = 6): string {
    const digits = '0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
      code += digits.charAt(Math.floor(Math.random() * digits.length));
    }
    return code;
  }

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

  async createConfirmationCode(recipient: string): Promise<string> {
    const existingCode = await this.prisma.confirmationCode.findUnique({
      where: { recipient: recipient },
    });
    if (existingCode)
      await this.prisma.confirmationCode.delete({
        where: { id: existingCode.id },
      });
    const newCode = await this.prisma.confirmationCode.create({
      data: {
        recipient: recipient,
        code: this.generateCode(),
      },
    });
    return newCode.code;
  }

  async sendSms(phoneNumber: string, message: string): Promise<void> {
    const params = { Message: message, PhoneNumber: phoneNumber };
    await this.sns.publish(params).promise();
  }
}
