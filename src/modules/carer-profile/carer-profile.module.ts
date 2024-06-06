import { Module } from '@nestjs/common';
import { CarerProfileService } from './carer-profile.service';
import { CarerProfileController } from './carer-profile.controller';

@Module({
  controllers: [CarerProfileController],
  providers: [CarerProfileService],
})
export class CarerProfileModule {}
