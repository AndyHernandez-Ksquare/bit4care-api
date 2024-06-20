import {
  Injectable,
  InternalServerErrorException,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { encrypt, decrypt } from './common/utils';
import { config } from './config';
import * as AWS from 'aws-sdk';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private s3: AWS.S3;
  private bucketName: string;

  constructor() {
    super();
    this.s3 = new AWS.S3({
      accessKeyId: config.aws.accessKey,
      secretAccessKey: config.aws.secretKey,
      region: config.aws.region,
    });
    this.bucketName = config.aws.s3.bucketName;
  }
  async getFileReadUrl(getParams: unknown) {
    const url = await this.s3
      .getSignedUrlPromise('getObject', getParams)
      .catch((error) => {
        throw new InternalServerErrorException(
          'Error getting file' + error.message,
        );
      });
    return url;
  }
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
      if (params.model === 'User' && params.action === 'findUnique') {
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

      // Populate file url
      if (
        params.model === 'File' &&
        (params.action === 'findUnique' ||
          params.action === 'findMany' ||
          params.action === 'findFirst')
      ) {
        const getParams = {
          Bucket: this.bucketName,
          Key: '',
          Expires: 3600,
        };
        if (Array.isArray(result)) {
          result.forEach(async (file) => {
            getParams.Key = file.key;

            const url = await this.getFileReadUrl(getParams);
            file.url = url;
          });
        } else {
          getParams.Key = result.key;

          const url = await this.getFileReadUrl(getParams);
          result.url = url;
        }
      }

      return result;
    });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
