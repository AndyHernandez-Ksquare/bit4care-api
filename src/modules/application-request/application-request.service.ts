import { Injectable } from '@nestjs/common';
import { CreateApplicationRequestDto } from './dto/create-application-request.dto';
import { UpdateApplicationRequestDto } from './dto/update-application-request.dto';

@Injectable()
export class ApplicationRequestService {
  create(createApplicationRequestDto: CreateApplicationRequestDto) {
    return 'This action adds a new applicationRequest';
  }

  findAll() {
    return `This action returns all applicationRequest`;
  }

  findOne(id: number) {
    return `This action returns a #${id} applicationRequest`;
  }

  update(id: number, updateApplicationRequestDto: UpdateApplicationRequestDto) {
    return `This action updates a #${id} applicationRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} applicationRequest`;
  }
}
