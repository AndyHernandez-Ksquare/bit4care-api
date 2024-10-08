// src/auth/auth.service.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthPayloadDto } from './dto/auth-payload.dto';
import { PrismaService } from 'src/prisma.service';
import { CreateConfirmationCode } from './dto/create-confirmation-code';
import { ChangePasswordDto } from './dto/change-password-dto';
import { TwilioService } from './twilio.service';

@Injectable()
export class AuthService {
  // private sns: AWS.SNS;
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private twilioService: TwilioService,
  ) {
    // this.sns = new AWS.SNS({
    //   region: config.aws.region,
    //   accessKeyId: config.aws.accessKey,
    //   secretAccessKey: config.aws.secretKey,
    // });
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
      await this.prisma.user.update({
        where: { id: user.id },
        data: { last_login: new Date() },
      });
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

    const expiration = new Date();
    expiration.setMinutes(expiration.getMinutes() + 1);

    const newConfirmationCode = await this.prisma.confirmationCode.create({
      data: {
        recipient: recipient,
        code: this.generateCode(),
        is_verified: false,
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
    if (existingCode.is_verified)
      throw new BadRequestException('Code already used');
    if (existingCode.expiration < new Date())
      throw new BadRequestException('Code expired');

    await this.prisma.confirmationCode.update({
      where: { id: existingCode.id },
      data: { is_verified: true },
    });
  }

  async sendSms(phoneNumber: string, message: string): Promise<void> {
    try {
      await this.twilioService.sendVerificationSms(phoneNumber, message);
    } catch (error) {
      console.error('Error sending SMS:', error);
    }
  }

  async changePassword(
    id: number,
    changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user || user.password !== changePasswordDto.oldPassword)
      throw new BadRequestException(
        'User not found, or current password is incorrect',
      );

    await this.prisma.user.update({
      where: { id },
      data: { password: changePasswordDto.newPassword },
    });
  }
}
