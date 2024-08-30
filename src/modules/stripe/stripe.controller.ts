import {
  Controller,
  Get,
  Query,
  Redirect,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { StripeService } from './stripe.service';
import { config } from 'src/config';
import { v4 as uuidv4 } from 'uuid';
import { Request } from 'express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('stripe')
export class StripeController {
  constructor(private readonly StripeService: StripeService) {}

  // @Post()
  // create(@Body() createPaymentDto: CreatePaymentHistoryDto) {
  //   return this.StripeService.create(createPaymentDto);
  // }

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
  @Get('connect/:userRole/:userEmail')
  @ApiOperation({ summary: 'Stripe SSO' })
  @ApiResponse({
    description: 'This is used mainly by the colaborators so they can receive ',
  })
  @Redirect()
  // Test req: http://localhost:3000/stripe/connect/CLIENT/andyhernandez5102@gmail.com
  async connectStripeAccount(@Req() req: Request) {
    const { userRole, userEmail } = req.params;

    const state = `${uuidv4()}/${userRole}/${userEmail}`;
    req.session.state = state;

    const clientId = config.stripe.clientId;
    const redirectUri = config.stripe.redirectUri;

    const url = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${clientId}&scope=read_write&state=${state}&redirect_uri=${redirectUri}`;

    return { url };
  }

  @Get('oauth/callback')
  async handleStripeCallback(
    @Query('code') code: string,
    @Query('state') state: string,
    @Req() req: Request,
  ) {
    if (state !== req.session.state) {
      throw new UnauthorizedException();
    }
    const [_, userRole, userEmail] = state.split('/');

    return this.StripeService.connectStripeAccount(code, userRole, userEmail);
  }
}
