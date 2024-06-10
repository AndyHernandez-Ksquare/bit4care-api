import { Module } from '@nestjs/common';
import { ApplicationRequestService } from './application-request.service';
import { ApplicationRequestController } from './application-request.controller';

@Module({
  controllers: [ApplicationRequestController],
  providers: [ApplicationRequestService],
})
export class ApplicationRequestModule {}
