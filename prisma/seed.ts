import { PrismaClient, UserRole } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const allowedPaymentMethod1 = await prisma.allowedPaymentMethod.create({
    data: {
      payment_method: 'Credit Card2',
    },
  });

  const allowedPaymentMethod2 = await prisma.allowedPaymentMethod.create({
    data: {
      payment_method: 'PayPal2',
    },
  });

  const user1 = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: `${Math.random()}john.doe@example.com`,
      password: 'password123',
      role: UserRole.USER,
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

  console.log({ user1, user2, allowedPaymentMethod1, allowedPaymentMethod2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
