// stripe.service.ts
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { PrismaService } from 'src/prisma.service';
import { STRIPE_CLIENT } from './constants';
import { Client, User, UserRole } from '@prisma/client';

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

  async connectStripeAccount(code: string, userRole: string, userEmai: string) {
    const response = await this.stripeClient.oauth.token({
      grant_type: 'authorization_code',
      code,
    });

    const stripeUserId = response.stripe_user_id;

    const stripeClient = new Stripe(response.access_token, {
      apiVersion: '2023-10-16',
    });

    const account = await stripeClient.accounts.retrieve(stripeUserId);
    // TODO, check if stripe account email is the same as userEmail param

    await this.createStripeAccountInDB(stripeUserId, userRole, userEmai);

    return { message: 'Account connected successfully' };
  }

  private async createStripeAccountInDB(
    stripeUserId: string,
    userRole: string,
    userEmail: string,
  ) {
    const user =
      userRole === UserRole.CLIENT
        ? await this.prisma.client.findUnique({
            where: { email: userEmail },
          })
        : await this.prisma.user.findUnique({
            where: { email: userEmail, role: UserRole.CARER },
          });

    if (!user) throw new BadRequestException("User doesn't exist");

    const stripeAccount = await this.prisma.stripeAccount.create({
      data: {
        stripe_customer_id: stripeUserId,
        default_payment_method_token: '',
        additional_payment_methods: 0,
      },
    });

    const updateData = { stripeAccountId: stripeAccount.id };
    const updatePromise =
      userRole === UserRole.CLIENT
        ? this.prisma.client.update({
            where: { id: user.id },
            data: updateData,
          })
        : this.prisma.user.update({
            where: { id: user.id },
            data: updateData,
          });

    await updatePromise;
  }
}
