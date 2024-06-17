import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { config } from '../../config';
import { PrismaService } from 'src/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { File } from '@prisma/client';
import { ValidActionsEnum, validTypes } from './constants';
import { CreateFileDto } from './dto/create-file.dto';

@Injectable()
export class FilesService implements OnModuleInit {
  private s3: AWS.S3;
  private bucketName: string;

  constructor(
    private prisma: PrismaService, // Inject PrismaService
  ) {
    this.s3 = new AWS.S3({
      accessKeyId: config.aws.accessKey,
      secretAccessKey: config.aws.secretKey,
      region: config.aws.region,
    });
    this.bucketName = config.aws.s3.bucketName;
  }

  async onModuleInit() {
    await this.ensureBucketExists();
  }

  private async ensureBucketExists() {
    try {
      await this.s3.headBucket({ Bucket: this.bucketName }).promise();
    } catch (error) {
      if (error.code === 'NotFound') {
        await this.s3.createBucket({ Bucket: this.bucketName }).promise();
      } else {
        throw error;
      }
    }
  }

  async getFileUploadUrl(
    createFile: CreateFileDto,
  ): Promise<{ url: string; file: File }> {
    const { name, type, action, userId, clientId } = createFile;

    if (!validTypes.includes(type)) {
      throw new BadRequestException('Invalid file type');
    }

    const key = `${type}/${uuidv4()}`;
    // Save file information to database
    let fileData: Partial<File> = {
      key,
      name,
      type,
    };

    if (
      (action === ValidActionsEnum.userProfilePic && userId) ||
      (action === ValidActionsEnum.clientProfilePic && clientId)
    ) {
      const existingProfilePic = await this.prisma.file.findFirst({
        where: {
          AND: [{ OR: [{ userId }, { clientId }] }, { is_profile_pic: true }],
        },
      });
      if (existingProfilePic) {
        await this.deleteFileInDBAndS3(existingProfilePic.id);
      }

      fileData = {
        ...fileData,
        [action === ValidActionsEnum.userProfilePic ? 'userId' : 'clientId']:
          action === ValidActionsEnum.userProfilePic ? userId : clientId,
        is_profile_pic: true,
      };
    }

    const file = await this.prisma.file.create({
      data: fileData as File,
    });

    const uploadParams = {
      Bucket: this.bucketName,
      Key: file.key,
      Expires: 300,
      ContentType: `image/${type}`,
    };

    const url = await this.s3
      .getSignedUrlPromise('putObject', uploadParams)
      .catch((error) => {
        throw new InternalServerErrorException(
          'Error uploading file' + error.message,
        );
      });

    return { url, file };
  }

  async getFileReadUrl(id: number): Promise<{ file: File }> {
    const file = await this.prisma.file.findUnique({
      where: { id },
    });

    if (!file) throw new NotFoundException();

    const getParams = {
      Bucket: this.bucketName,
      Key: file.key,
      Expires: 3600,
    };

    return { file };
  }

  async deleteFileInDBAndS3(id: number) {
    const file = await this.prisma.file.findUnique({ where: { id } });
    if (!file) throw new NotFoundException();
    await this.prisma.file.delete({ where: { id } });
    const deleteParams = {
      Bucket: this.bucketName,
      Key: file.key,
    };
    await this.s3.deleteObject(deleteParams).promise();
  }
}
