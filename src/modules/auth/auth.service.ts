// src/auth/auth.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthPayloadDto } from './dto/auth-payload.dto';
import { PrismaService } from 'src/prisma.service';
import * as AWS from 'aws-sdk';
import { config } from 'src/config';
import { CreateConfirmationCode } from './dto/create-confirmation-code';
import { UserRole } from 'src/common/enums';

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

  async validateClient({
    email,
    password,
  }: AuthPayloadDto): Promise<string | null> {
    const client = await this.prisma.client.findUnique({
      where: { email },
    });

    if (!client) return null;

    if (password === client.password) {
      return this.jwtService.sign({
        email: client.email,
        id: client.id,
        role: UserRole.CLIENT,
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

    const expiration = new Date();
    expiration.setMinutes(expiration.getMinutes() + 1);

    const newConfirmationCode = await this.prisma.confirmationCode.create({
      data: {
        recipient: recipient,
        code: this.generateCode(),
        isVerified: false,
        expiration,
      },
    });
    return newConfirmationCode.code;
  }

  async verifyCode(
    confirmationCodeBody: CreateConfirmationCode,
  ): Promise<void> {
    const existingCode = await this.prisma.confirmationCode.findUnique({
      where: {
        code: confirmationCodeBody.code,
        recipient: confirmationCodeBody.recipient,
      },
    });

    if (!existingCode) throw new BadRequestException('Invalid code');
    if (existingCode.isVerified)
      throw new BadRequestException('Code already used');
    if (existingCode.expiration < new Date())
      throw new BadRequestException('Code expired');

    await this.prisma.confirmationCode.update({
      where: { id: existingCode.id },
      data: { isVerified: true },
    });
  }

  async sendSms(phoneNumber: string, message: string): Promise<void> {
    const params = { Message: message, PhoneNumber: phoneNumber };
    await this.sns.publish(params).promise();
  }
}
