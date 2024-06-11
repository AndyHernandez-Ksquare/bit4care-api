import { Injectable } from '@nestjs/common';
import { CreateApplicationRequestDto } from './dto/create-application-request.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ApplicationRequestService {
  constructor(private prisma: PrismaService) {}
  async create(
    createApplicationRequestDto: CreateApplicationRequestDto,
    clientId: number,
  ) {
    const applicationRequest = await this.prisma.applicationRequest.create({
      data: { ...createApplicationRequestDto, clientId },
    });

    return applicationRequest;
  }

  async findAll() {
    const applicationRequest = await this.prisma.applicationRequest.findMany();
    return applicationRequest;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} applicationRequest`;
  // }

  // update(id: number, updateApplicationRequestDto: UpdateApplicationRequestDto) {
  //   return `This action updates a #${id} applicationRequest`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} applicationRequest`;
  // }
}
