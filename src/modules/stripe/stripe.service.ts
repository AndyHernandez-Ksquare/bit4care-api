// stripe.service.ts
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import Stripe from 'stripe';
import { PrismaService } from 'src/prisma.service';
import { STRIPE_CLIENT } from './constants';
import { CreatePaymentIntentDto } from '../payments/dto/create-payment-intent.dto';

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
    // clientId: number,
    // recipientId: number,
    CreatePaymentIntentDto: CreatePaymentIntentDto,
  ): Promise<string> {
    const { amount } = CreatePaymentIntentDto;
    // const client = await this.prisma.user.findUnique({
    //   where: { id: clientId },
    // });
    // const recipient = await this.prisma.user.findUnique({
    //   where: { id: recipientId },
    // });

    // if (!client || !recipient) throw new Error('Client or recipient not found');

    const paymentIntent = await this.stripeClient.paymentIntents.create({
      amount: amount * 100, // Stripe amount is in cents
      currency: 'mxn',
      automatic_payment_methods: { enabled: true },
      // payment_method_types: ['card'],
      // transfer_data: {
      //   destination: recipient.stripeAccount.id,
      // },
    });

    return paymentIntent.client_secret;
  }

  // async connectStripeAccount(code: string, userRole: string, userEmai: string) {
  //   const response = await this.stripeClient.oauth.token({
  //     grant_type: 'authorization_code',
  //     code,
  //   });

  //   const stripeUserId = response.stripe_user_id;

  //   const stripeClient = new Stripe(response.access_token, {
  //     apiVersion: '2023-10-16',
  //   });

  //   const account = await stripeClient.accounts.retrieve(stripeUserId);
  //   console.log(account);
  //   // TODO, check if stripe account email is the same as userEmail param

  //   await this.createStripeAccountInDB(stripeUserId, userRole, userEmai);

  //   return { message: 'Account connected successfully' };
  // }

  async createCustomer(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { stripeAccount: true },
    });
    if (!user) throw new NotFoundException('User not found');
    if (user.stripeAccount)
      throw new BadRequestException(
        'User is already associated to a stripe customer',
      );

    // TODO: Uncomment code below when in production
    // const existingCustomer = await this.stripeClient.customers.list({
    //   email: user.email,
    // });

    // if (existingCustomer.data.length > 0) {
    //   throw new BadRequestException('Customer already exists in stripe');
    // }

    const customer = await this.stripeClient.customers.create({
      email: user.email,
      name: user.name,
    });

    const updatedUser = await this.prisma.user.update({
      data: {
        stripeAccount: { create: { stripe_customer_id: customer.id } },
      },
      where: { id: user.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phone: true,
        stripeAccountId: true,
        stripeAccount: true,
      },
    });

    return updatedUser;
  }

  async createSetupIntent(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { stripeAccount: true },
    });
    if (!user) throw new NotFoundException('User not found');

    return await this.stripeClient.setupIntents.create({
      customer: user.stripeAccount.stripe_customer_id,
    });
  }

  async createConnectedAccount(email: string) {
    const account = await this.stripeClient.accounts.create({
      type: 'express',
      email: email,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
    });
    return account;
  }
}
