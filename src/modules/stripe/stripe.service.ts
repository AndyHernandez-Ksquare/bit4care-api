// stripe.service.ts
import { Inject, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { PrismaService } from 'src/prisma.service';
import { STRIPE_CLIENT } from './constants';

@Injectable()
export class StripeService {
  constructor(
    private prisma: PrismaService,
    @Inject(STRIPE_CLIENT) private stripeClient: Stripe,
  ) {}

  async createStripeAccount(userId: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    // const account = await this.stripeClient.accounts.create({
    //   type: 'express',
    //   email: user.email,
    // });

    // await this.prisma.stripeAccount.create({
    //   data: {
    //     userId: user.id,
    //     id: account.id,
    //   },
    // });

    // return account;
  }

  async createPaymentIntent(
    clientId: number,
    recipientId: number,
    amount: number,
  ): Promise<Stripe.PaymentIntent> {
    const client = await this.prisma.user.findUnique({
      where: { id: clientId },
    });
    const recipient = await this.prisma.user.findUnique({
      where: { id: recipientId },
    });

    if (!client || !recipient) throw new Error('Client or recipient not found');

    // const paymentIntent = await this.stripeClient.paymentIntents.create({
    //   amount: amount * 100, // Stripe amount is in cents
    //   currency: 'usd',
    //   payment_method_types: ['card'],
    //   transfer_data: {
    //     destination: recipient.stripeAccount.id,
    //   },
    // });

    // return paymentIntent;
    return;
  }

  async connectStripeAccount(code: string) {
    const response = await this.stripeClient.oauth.token({
      grant_type: 'authorization_code',
      code,
    });

    const stripeUserId = response.stripe_user_id;

    console.log(response);

    return { message: 'Account connected successfully' };
  }
}
