import { Body, Controller, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { CreateConfirmationCode } from './dto/create-confirmation-code';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  @UseGuards(LocalGuard)
  async login(@Req() req: Request) {
    return { token: req.user };
  }

  @Post('client/send-code')
  async sendConfirmationCode(
    @Body() confirmationCodeBody: CreateConfirmationCode,
  ): Promise<void> {
    const code = await this.authService.createConfirmationCode(
      confirmationCodeBody.recipient,
    );

    await this.authService.sendSms(confirmationCodeBody.recipient, code);
  }

  @Put('client/verify-code')
  async verifyCode(@Body() confirmationCodeBody: CreateConfirmationCode) {
    await this.authService.verifyCode(confirmationCodeBody);
  }
}
