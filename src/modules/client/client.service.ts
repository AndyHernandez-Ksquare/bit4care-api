import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  async create(createClientDto: CreateClientDto) {
    const confirmation_code = await this.prisma.confirmationCode.findUnique({
      where: { recipient: createClientDto.phone, isVerified: true },
    });

    if (!confirmation_code)
      throw new BadRequestException('Phone number not confirmed');

    // Delete confirmation code after verification
    await this.prisma.confirmationCode.delete({
      where: { id: confirmation_code.id },
    });

    const client = await this.prisma.client.create({
      data: {
        ...createClientDto,
        is_active: true,
      },
      select: {
        id: true,
        email: true,
        phone: true,
      },
    });

    return client;
  }

  findAll() {
    return `This action returns all client`;
  }

  findOne(id: number) {
    return `This action returns a #${id} client`;
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
