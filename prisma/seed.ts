import { PrismaClient, UserRole } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.paymentHistory.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.stripeAccount.deleteMany({});
  await prisma.allowedPaymentMethod.deleteMany({});
  await prisma.carerProfile.deleteMany({}); // Ensure carer profiles are cleared

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
      availability: 'Full-time',
      qualifications: 'Certified',
      isFavorite: true,
      works_on_weekend: true,
      residency_status: 'Permanent',
      years_of_experience: '5',
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

  // Create users with payment history, carer profiles, and stripe accounts
  const user1 = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: `${Math.random()}john.doe@example.com`,
      password: 'password123',
      role: UserRole.USER,
      stripeAccountId: stripeAccount1.id,
      carerId: carerProfile1.id,
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
