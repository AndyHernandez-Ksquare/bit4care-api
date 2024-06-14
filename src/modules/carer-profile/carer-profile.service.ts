import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarerProfileDto } from './dto/create-carer-profile.dto';
import { UpdateCarerProfileDto } from './dto/update-carer-profile.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CarerProfileService {
  constructor(private prisma: PrismaService) {}

  create(createCarerProfileDto: CreateCarerProfileDto) {
    return 'This action adds a new carerProfile';
  }

  findAll() {
    return `This action returns all carerProfile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} carerProfile`;
  }

  async update(id: number, updateCarerProfileDto: UpdateCarerProfileDto) {
    const carerProfile = await this.prisma.carerProfile.findFirst({
      where: { User: { id } },
    });

    if (!carerProfile) throw new NotFoundException("Carer doesn't exist");

    // TODO: Keep working on this endpoint. Habing the settings view in mind
    const updatedCarerProfile = await this.prisma.carerProfile.update({
      where: { id: carerProfile.id },
      data: updateCarerProfileDto,
    });

    return `This action updates a #${id} carerProfile`;
  }

  remove(id: number) {
    return `This action removes a #${id} carerProfile`;
  }
}
