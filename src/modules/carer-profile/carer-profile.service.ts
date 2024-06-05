import { Injectable } from '@nestjs/common';
import { CreateCarerProfileDto } from './dto/create-carer-profile.dto';
import { UpdateCarerProfileDto } from './dto/update-carer-profile.dto';

@Injectable()
export class CarerProfileService {
  create(createCarerProfileDto: CreateCarerProfileDto) {
    return 'This action adds a new carerProfile';
  }

  findAll() {
    return `This action returns all carerProfile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} carerProfile`;
  }

  update(id: number, updateCarerProfileDto: UpdateCarerProfileDto) {
    return `This action updates a #${id} carerProfile`;
  }

  remove(id: number) {
    return `This action removes a #${id} carerProfile`;
  }
}
