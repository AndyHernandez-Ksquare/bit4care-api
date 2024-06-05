import { PrismaClient, UserRole } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.paymentHistory.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.stripeAccount.deleteMany({});
  await prisma.allowedPaymentMethod.deleteMany({});

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

  // Create users with payment history and stripe accounts
  const user1 = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: `${Math.random()}john.doe@example.com`,
      password: 'password123',
      role: UserRole.USER,
      stripeAccountId: stripeAccount1.id,
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
      name: 'Jane Smith',
      email: `${Math.random()}jane.smith@example.com`,
      password: 'password456',
      role: UserRole.ADMIN,
      stripeAccountId: stripeAccount2.id,
      paymentHistory: {
        create: [
          {
            status: 'Completed',
            amount: '200.00',
            payment_method: allowedPaymentMethod1.payment_method,
            creation_date: new Date(),
            description: 'Payment for order #125',
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
