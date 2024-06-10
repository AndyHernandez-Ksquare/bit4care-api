import { Module } from '@nestjs/common';
import { ApplicationRequestService } from './application-request.service';
import { ApplicationRequestController } from './application-request.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ApplicationRequestController],
  providers: [ApplicationRequestService, PrismaService],
})
export class ApplicationRequestModule {}
