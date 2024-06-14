import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  async getClient(id: number, email: string) {
    const client = await this.prisma.client.findUnique({
      where: { id, email },
      select: {
        id: true,
        email: true,
        stripeAccountId: true,
        address: true,
      },
    });

    if (!client) throw new NotFoundException('Client not found');

    return client;
  }

  async create(createClientDto: CreateClientDto) {
    const confirmation_code = await this.prisma.confirmationCode.findUnique({
      where: { recipient: createClientDto.phone, is_verified: true },
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

  async update(id: number, updateClientDto: UpdateClientDto) {
    const client = await this.prisma.client.findUnique({ where: { id } });
    if (!client) throw new NotFoundException('Client not found');

    const updatedClient = await this.prisma.client.update({
      where: { id },
      data: updateClientDto,
      select: {
        id: true,
        address: true,
        email: true,
        phone: true,
        name: true,
      },
    });

    return updatedClient;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
