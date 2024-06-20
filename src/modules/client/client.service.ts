import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from 'src/prisma.service';
import { UserRole } from '@prisma/client';

@Injectable()
export class ClientService {
  constructor(private prisma: PrismaService) {}

  async getClient(id: number, email: string) {
    const client = await this.prisma.user.findUnique({
      where: { id, email, role: UserRole.CLIENT },
      select: {
        id: true,
        email: true,
        stripeAccountId: true,
        address: true,
        file: { where: { is_profile_pic: true } },
        client: true,
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

    const client = await this.prisma.user.create({
      data: {
        ...createClientDto,
        role: UserRole.CLIENT,
        client: { create: { is_active: false } },
      },
      select: {
        id: true,
        email: true,
        phone: true,
        role: true,
        stripeAccountId: true,
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
      data: { User: { update: updateClientDto } },
      select: {
        User: {
          select: {
            id: true,
            address: true,
            email: true,
            phone: true,
            name: true,
          },
        },
      },
    });

    return updatedClient;
  }

  async toggleFavoriteCarer(clientId: number, carerId: number) {
    const carerProfile = await this.prisma.carerProfile.findFirst({
      where: { id: carerId },
    });

    if (!carerProfile) throw new NotFoundException('Carer not found');

    const favoriteCarer = await this.prisma.favoriteCarers.findFirst({
      where: { clientId, carerId },
    });

    if (favoriteCarer) {
      await this.prisma.favoriteCarers.delete({
        where: { id: favoriteCarer.id },
      });
    } else {
      await this.prisma.favoriteCarers.create({
        data: { clientId, carerId },
      });
    }
    return;
  }

  async getCarersWithFavorite(clientId: number) {
    const carers = await this.prisma.carerProfile.findMany({
      include: {
        favoriteCarers: {
          where: { clientId },
        },
        carerReviews: true,
      },
    });
    return carers;
  }
  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}
