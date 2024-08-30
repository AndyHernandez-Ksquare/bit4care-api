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
import { config } from 'src/config';
import { UserRole } from '@prisma/client';

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
    CreatePaymentIntentDto: CreatePaymentIntentDto,
    email: string,
  ): Promise<{ client_secret: string }> {
    const { amount } = CreatePaymentIntentDto;
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { stripeAccount: true },
    });

    const paymentIntent = await this.stripeClient.paymentIntents.create({
      amount: amount * 100, // Stripe amount is in cents
      currency: 'mxn',
      automatic_payment_methods: { enabled: true },
      // application_fee_amount: 500
      // transfer_data: {
      //   destination: recipient.stripeAccount.id,
      // },
      // return_url
      // customer: user.stripeAccount.stripe_customer_id,
    });

    return { client_secret: paymentIntent.client_secret };
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
    if (user.stripeAccount) return 'User already has a stripe account';

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

  async createExpressConnectedAccount(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { stripeAccount: true },
    });

    if (user.stripeAccount) {
      const onboardingLink = await this.stripeClient.accountLinks.create({
        account: user.stripeAccount.stripe_connected_account_id,
        refresh_url: config.urls.frontEnd,
        return_url: config.urls.frontEnd,
        type: 'account_onboarding',
      });

      return onboardingLink;
    }

    const account = await this.stripeClient.accounts.create({
      type: 'express',
      email: email,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
    });

    await this.createCustomer(email);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        stripeAccount: { update: { stripe_connected_account_id: account.id } },
      },
    });

    const onboardingLink = await this.stripeClient.accountLinks.create({
      account: account.id,
      refresh_url: config.urls.frontEnd,
      return_url: config.urls.frontEnd,
      type: 'account_onboarding',
    });

    return onboardingLink;
  }

  async getExpressLoginLink(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { stripeAccount: true },
    });

    const loginLink = await this.stripeClient.accounts.createLoginLink(
      user.stripeAccount.stripe_connected_account_id,
    );
    return loginLink;
  }
}
