import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { Request } from 'express';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { JwtPayload } from 'src/interfaces/jwt-payload';
import { UserHasStripeAccountGuard } from './guards/user-has-stripe-account.guard';
import { CreatePaymentIntentDto } from '../payments/dto/create-payment-intent.dto';
import { config } from 'src/config';

@Controller('stripe')
export class StripeController {
  constructor(private readonly StripeService: StripeService) {}

  @UseGuards(JwtGuard)
  @Get('config')
  handleGetConfig() {
    return { publishableKey: config.stripe.publishableKey };
  }

  @UseGuards(JwtGuard)
  @Post('create-connected-account')
  async createConnectedAccount(@Req() req: Request) {
    const { email } = req.user as JwtPayload;

    return await this.StripeService.createConnectedAccount(email);
  }

  @Post('create-customer')
  @UseGuards(JwtGuard)
  handleCreateCustomer(@Req() req: Request) {
    const { email } = req.user as JwtPayload;

    return this.StripeService.createCustomer(email);
  }

  @Post('create-setup-intent')
  @UseGuards(JwtGuard, UserHasStripeAccountGuard)
  handleCreateSetupIntent(@Req() req: Request) {
    const { email } = req.user as JwtPayload;

    return this.StripeService.createSetupIntent(email);
  }

  @Post('create-payment-intent')
  @UseGuards(JwtGuard, UserHasStripeAccountGuard)
  handleCreatePaymentIntent(
    @Body() CreatePaymentIntentDto: CreatePaymentIntentDto,
    @Req() req: Request,
  ) {
    const { email } = req.user as JwtPayload;

    return this.StripeService.createPaymentIntent(
      CreatePaymentIntentDto,
      email,
    );
  }

  // @Get()
  // findAll() {
  //   return this.StripeService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.StripeService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
  //   return this.StripeService.update(+id, updatePaymentDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.StripeService.remove(+id);
  // }

  // Oauth
  // @Get('connect/:userRole/:userEmail')
  // @Redirect()
  // // Test req: http://localhost:3000/stripe/connect/CLIENT/andyhernandez5102@gmail.com
  // async connectStripeAccount(@Req() req: Request) {
  //   const { userRole, userEmail } = req.params;

  //   const state = `${uuidv4()}/${userRole}/${userEmail}`;
  //   req.session.state = state;

  //   const clientId = config.stripe.clientId;
  //   const redirectUri = config.stripe.redirectUri;

  //   const url = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${clientId}&scope=read_write&state=${state}&redirect_uri=${redirectUri}`;

  //   return { url };
  // }

  // @Get('oauth/callback')
  // async handleStripeCallback(
  //   @Query('code') code: string,
  //   @Query('state') state: string,
  //   @Req() req: Request,
  // ) {
  //   if (state !== req.session.state) {
  //     throw new UnauthorizedException();
  //   }
  //   const [_, userRole, userEmail] = state.split('/');

  //   return this.StripeService.connectStripeAccount(code, userRole, userEmail);
  // }
}
