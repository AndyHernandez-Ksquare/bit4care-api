import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { encrypt, decrypt } from './common/utils';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();

    this.$use(async (params, next) => {
      // Encrypt data on create and update
      if (
        params.model === 'User' &&
        (params.action === 'create' || params.action === 'update')
      ) {
        const user = params.args.data;
        if (user.password) {
          user.password = encrypt(user.password);
        }

        params.args.data = user;
      }

      const result = await next(params);

      // Decrypt data on find
      if (
        params.model === 'User' &&
        (params.action === 'findUnique' ||
          params.action === 'findFirst' ||
          params.action === 'findMany')
      ) {
        if (Array.isArray(result)) {
          result.forEach((user) => {
            if (user.password) {
              user.password = decrypt(user.password);
            }
          });
        } else {
          if (result && result.password) {
            result.password = decrypt(result.password);
          }
        }
      }

      return result;
    });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
