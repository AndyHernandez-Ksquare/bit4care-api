// stripe.service.ts
import { Injectable } from '@nestjs/common';
import { InjectStripeClient as InjectStripe } from '@golevelup/nestjs-stripe';
import Stripe from 'stripe';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class StripeService {
  constructor(
    @InjectStripe() private readonly stripeClient: Stripe,
    private prisma: PrismaService,
  ) {}

  async createStripeAccount(userId: number): Promise<Stripe.Account> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error('User not found');

    const account = await this.stripeClient.accounts.create({
      type: 'express',
      email: user.email,
    });

    await this.prisma.stripeAccount.create({
      data: {
        userId: user.id,
        id: account.id,
      },
    });

    return account;
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

    const paymentIntent = await this.stripeClient.paymentIntents.create({
      amount: amount * 100, // Stripe amount is in cents
      currency: 'usd',
      payment_method_types: ['card'],
      transfer_data: {
        destination: recipient.stripeAccount.id,
      },
    });

    return paymentIntent;
  }
}
