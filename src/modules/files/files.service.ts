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
import {
  ValidActionsEnum,
  validImageTypes,
  validVideoTypes,
} from './constants';
import { CreateFileDto } from './dto/create-file.dto';
import { Request } from 'express';

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
    userId: number,
  ): Promise<{ url: string; file: File }> {
    const { name, type, action } = createFile;

    if (![...validImageTypes, ...validVideoTypes].includes(type)) {
      throw new BadRequestException('Invalid file type');
    }

    const isImage = validImageTypes.includes(type);
    const isVideo = validVideoTypes.includes(type);
    const key = `${isImage ? 'image' : 'video'}/${type}/${userId}/${uuidv4()}`;

    // Save file information to database
    const fileData: Partial<File> = {
      key,
      name,
      type,
      userId,
      is_profile_pic: action === ValidActionsEnum.userProfilePic ? true : false,
      is_motivation_vid: isVideo ? true : false,
    };

    if (action === ValidActionsEnum.userProfilePic) {
      const existingProfilePic = await this.prisma.file.findFirst({
        where: { userId, is_profile_pic: true },
      });
      if (existingProfilePic) {
        await this.deleteFileInDBAndS3(existingProfilePic.id);
      }
    } else if (isVideo) {
      const existingVideo = await this.prisma.file.findFirst({
        where: { userId, is_motivation_vid: true },
      });
      if (existingVideo) {
        await this.deleteFileInDBAndS3(existingVideo.id);
      }
    }

    const file = await this.prisma.file.create({
      data: fileData as File,
    });

    const contentType = isImage ? `image/${type}` : `video/${type}`;
    const uploadParams = {
      Bucket: this.bucketName,
      Key: file.key,
      Expires: 300,
      ContentType: contentType,
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

  async getFileReadUrl(id: number, req: Request): Promise<{ file: File }> {
    const file = await this.prisma.file.findUnique({
      where: { id, ...req.where },
    });

    if (!file) throw new NotFoundException();

    return { file };
  }

  async getUserFileReadUrl(
    userId: number,
    req: Request,
  ): Promise<{ file: File[] }> {
    const files = await this.prisma.file.findMany({
      where: { userId, ...req.where },
    });

    if (!files) throw new NotFoundException();

    return { file: files };
  }

  async deleteFileInDBAndS3(id: number) {
    const file = await this.prisma.file.findUnique({ where: { id } });
    await this.prisma.file.delete({ where: { id } });
    const deleteParams = {
      Bucket: this.bucketName,
      Key: file.key,
    };
    await this.s3.deleteObject(deleteParams).promise();
  }
}
