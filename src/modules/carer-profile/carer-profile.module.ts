import { Module } from '@nestjs/common';
import { CarerProfileService } from './carer-profile.service';
import { CarerProfileController } from './carer-profile.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CarerProfileController],
  providers: [CarerProfileService, PrismaService],
})
export class CarerProfileModule {}
