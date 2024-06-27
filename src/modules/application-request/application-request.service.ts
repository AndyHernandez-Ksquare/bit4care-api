import { Injectable } from '@nestjs/common';
import { CreateApplicationRequestDto } from './dto/create-application-request.dto';
import { PrismaService } from 'src/prisma.service';
import { Request } from 'express';

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

  async findAll(req: Request, date: string, status: string) {
    const applicationRequest = await this.prisma.applicationRequest.findMany({
      where: {
        ...req.where,
        createdAt: date ? { gte: new Date(date) } : undefined,
        status: status ? { equals: status, mode: 'insensitive' } : undefined,
      },
    });
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
