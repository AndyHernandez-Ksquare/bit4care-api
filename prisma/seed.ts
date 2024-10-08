import { PrismaClient, UserRole } from '@prisma/client';
import * as crypto from 'crypto';
require('dotenv').config();

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; // Must be 32 bytes (256 bits)
const IV_LENGTH = 16; // For AES, this is always 16

export const encrypt = (text: string): string => {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY),
    iv,
  );
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex') + ':' + encrypted.toString('hex');
};

const prisma = new PrismaClient();

async function main() {
  if (process.env.NODE_ENV !== 'dev') {
    console.log('Can only execute this on dev mode');
    return;
  }
  // Disable foreign key checks
  await prisma.$executeRaw`SET session_replication_role = 'replica';`;

  // Truncate tables
  await prisma.$executeRaw`TRUNCATE TABLE "PaymentHistory" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "StripeAccount" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "AllowedPaymentMethod" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "CarerProfile" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "Client" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "ApplicationRequest" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "CarerReview" RESTART IDENTITY CASCADE;`;

  // Re-enable foreign key checks
  await prisma.$executeRaw`SET session_replication_role = 'origin';`;

  // Create allowed payment methods
  const allowedPaymentMethod1 = await prisma.allowedPaymentMethod.create({
    data: {
      payment_method: 'Credit Card',
    },
  });

  const allowedPaymentMethod2 = await prisma.allowedPaymentMethod.create({
    data: {
      payment_method: 'PayPal',
    },
  });

  // Create Stripe accounts
  const stripeAccount1 = await prisma.stripeAccount.create({
    data: {
      stripe_customer_id: 'cus_12345',
      default_payment_method_token: 'pm_12345',
      additional_payment_methods: 2,
    },
  });

  const stripeAccount2 = await prisma.stripeAccount.create({
    data: {
      stripe_customer_id: 'cus_67890',
      default_payment_method_token: 'pm_67890',
      additional_payment_methods: 3,
    },
  });

  // Create carer profiles
  const carerProfile1 = await prisma.carerProfile.create({
    data: {
      payment_range: 'High',
      availability: { test: true },
      qualifications: 'Certified',
      residency_status: 'Permanent',
      years_of_experience: 5,
      birth_date: '1990-01-01',
      colony: 'test',
      CURP: 'test',
      gender: 'Male',
      has_driving_license: true,
      license_type: 'Class C',
      marital_status: 'Single',
      nationality: 'Mexican',
      is_approved: false,
      NSS: 'test',
      postal_code: 'test',
      RFC: 'test',
      state: 'test',
      speciality: 'Pediatrics',
      motivation_letter: 'Passionate about caregiving',
      test_score: 90,
      is_active: true,
      worked_hours: 1000,
      description: 'Experienced caregiver',
      completed_services: 50,
    },
  });

  const carerProfile2 = await prisma.carerProfile.create({
    data: {
      payment_range: 'High',
      availability: { test2: true },
      qualifications: 'NOT Certified',
      residency_status: 'Temporal',
      years_of_experience: 15,
      birth_date: '1990-01-01',
      colony: 'test',
      CURP: 'test',
      gender: 'Male',
      has_driving_license: false,
      marital_status: 'Single',
      nationality: 'Mexican',
      is_approved: true,
      NSS: 'test',
      postal_code: 'test',
      RFC: 'test',
      state: 'test',
      speciality: 'Pediatrics',
      motivation_letter: 'Passionate about caregiving',
      test_score: 90,
      is_active: true,
      worked_hours: 1000,
      description: 'Experienced caregiver',
      completed_services: 50,
    },
  });

  const carerReview1 = await prisma.carerReview.create({
    data: {
      carerId: carerProfile1.id,
      stars: 4,
      comment: 'Great experience',
    },
  });

  // Create client
  const client1 = await prisma.client.create({
    data: {
      is_active: true,
    },
  });

  const client2 = await prisma.client.create({
    data: {
      is_active: true,
    },
  });

  const userClient1 = await prisma.user.create({
    data: {
      email: 'client@example.com',
      phone: '555-1234',
      name: 'John Doe',
      password: encrypt('password456'),
      address: 'Some address',
      role: 'CLIENT',
      clientId: client1.id,
    },
  });

  const userClient2 = await prisma.user.create({
    data: {
      email: 'client2@example.com',
      phone: '555-1234',
      name: 'Jane Doe',
      password: encrypt('password456'),
      address: 'Some address',
      role: 'CLIENT',
      clientId: client2.id,
    },
  });

  // Create application request
  const applicationRequest1 = await prisma.applicationRequest.create({
    data: {
      time_range: '9 AM - 5 PM',
      address: 'Some address',
      patient_name: 'Jane Doe',
      patient_phone: '555-5678',
      clientId: client1.id,
      description: 'Assistance with daily tasks',
      comments: 'Prefer morning hours',
      amount: 200,
      carerId: carerProfile1.id,
      status: 'Pending',
    },
  });

  const applicationRequest2 = await prisma.applicationRequest.create({
    data: {
      time_range: '6 AM - 1 PM',
      address: 'Some address 2',
      patient_name: 'John Doe',
      patient_phone: '552345-5678',
      clientId: client2.id,
      description: 'Assistance with weekly tasks',
      comments: 'Prefer morning hours',
      amount: 500,
      carerId: carerProfile1.id,
      status: 'Active',
    },
  });

  // Create users with payment history, carer profiles, and stripe accounts
  const user1 = await prisma.user.create({
    data: {
      name: 'John Doe',
      // email: `john.doe@example.com`,
      email: `andyhernandez5102@gmail.com`,
      phone: '555-1234',
      password: encrypt('password123'),
      role: UserRole.CARER,
      // stripeAccountId: stripeAccount1.id,
      carerId: carerProfile1.id,
      address: 'Some address',
      paymentHistory: {
        create: [
          {
            status: 'Completed',
            amount: '100.00',
            payment_method: allowedPaymentMethod1.payment_method,
            creation_date: new Date(),
            description: 'Payment for order #123',
          },
          {
            status: 'Pending',
            amount: '50.00',
            payment_method: allowedPaymentMethod2.payment_method,
            creation_date: new Date(),
            description: 'Payment for order #124',
          },
        ],
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: `johnadmin.doe@example.com`,
      phone: '555-1234',
      password: encrypt('password123'),
      role: UserRole.ADMIN,
      address: 'Some address',
    },
  });

  console.log('Seed Completed');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
