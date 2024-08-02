import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { CreateConfirmationCode } from './dto/create-confirmation-code';
import { ChangePasswordDto } from './dto/change-password-dto';
import { JwtGuard } from './guards/jwt.guard';
import { JwtPayload } from 'src/interfaces/jwt-payload';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  @UseGuards(LocalGuard)
  async handleLogin(@Req() req: Request) {
    return { token: req.user };
  }

  @Post('client/send-code')
  async handleSendConfirmationCode(
    @Body() confirmationCodeBody: CreateConfirmationCode,
  ): Promise<void> {
    const code = await this.authService.createConfirmationCode(
      confirmationCodeBody.recipient,
    );

    await this.authService.sendSms(confirmationCodeBody.recipient, `${code}`);
  }

  @Put('client/verify-code')
  async handleVerifyCode(@Body() confirmationCodeBody: CreateConfirmationCode) {
    await this.authService.verifyCode(confirmationCodeBody);
  }

  @UseGuards(JwtGuard)
  @Put('change-password')
  async handleChangePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Req() req: Request,
  ) {
    const reqUser = req.user as JwtPayload;

    await this.authService.changePassword(reqUser.id, changePasswordDto);
  }
}
