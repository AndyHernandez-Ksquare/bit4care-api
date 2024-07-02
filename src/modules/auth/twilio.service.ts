import { config } from 'src/config';
import { Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';

@Injectable()
export class TwilioService {
  private twilioClient: Twilio;

  constructor() {
    this.twilioClient = new Twilio(
      config.twilio.accountSid,
      config.twilio.authToken,
    );
  }

  async sendVerificationSms(to: string, code: string): Promise<void> {
    await this.twilioClient.messages.create({
      body: `Your verification code is ${code}`,
      from: config.twilio.phoneNumber,
      to,
    });
  }
}
