import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCarerProfileDto } from './dto/create-carer-profile.dto';
import { UpdateCarerProfileDto } from './dto/update-carer-profile.dto';
import { PrismaService } from 'src/prisma.service';
import { UserRole } from '@prisma/client';
import { AcceptCarerProfileDto } from './dto/accept-carer-profile-dto';

// Keep working on endpoint for admins to approve/reject carers (done). Also check file upload parts of carer creation, I think when uploading sensitive data...
// Such as personal identifications, it should be uploaded following a certain protocol

@Injectable()
export class CarerProfileService {
  constructor(private prisma: PrismaService) {}

  async create(createCarerProfileDto: CreateCarerProfileDto) {
    const carer = await this.prisma.user.create({
      data: {
        address: createCarerProfileDto.address,
        name: createCarerProfileDto.name,
        email: createCarerProfileDto.email,
        password: createCarerProfileDto.password,
        role: UserRole.CARER,
        carer: {
          create: {
            payment_range: createCarerProfileDto.payment_range,
            availability: createCarerProfileDto.availability,
            qualifications: createCarerProfileDto.qualifications,
            residency_status: createCarerProfileDto.residency_status,
            years_of_experience: createCarerProfileDto.years_of_experience,
            birth_date: createCarerProfileDto.birth_date,
            speciality: createCarerProfileDto.speciality,
            motivation_letter: createCarerProfileDto.motivation_letter,
            gender: createCarerProfileDto.gender,
            test_score: createCarerProfileDto.test_score,
            worked_hours: 0,
            description: createCarerProfileDto.description,
            completed_services: 0,
            state: createCarerProfileDto.state,
            nationality: createCarerProfileDto.nationality,
            postal_code: createCarerProfileDto.postal_code,
            marital_status: createCarerProfileDto.marital_status,
            colony: createCarerProfileDto.colony,
            is_approved: false,
            CURP: createCarerProfileDto.CURP,
            RFC: createCarerProfileDto.RFC,
            NSS: createCarerProfileDto.NSS,
            has_driving_license: createCarerProfileDto.has_driving_license,
            is_active: false,
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        role: true,
        carer: true,
      },
    });

    return carer;
  }

  async findAll() {
    const carers = await this.prisma.carerProfile.findMany({
      include: { carerReviews: true, favoriteCarers: true },
    });
    return carers;
  }

  findOne(id: number) {
    return `This action returns a #${id} carerProfile`;
  }

  async update(id: number, updateCarerProfileDto: UpdateCarerProfileDto) {
    const carerProfile = await this.prisma.carerProfile.findFirst({
      where: { User: { id } },
    });

    if (!carerProfile) throw new NotFoundException("Carer doesn't exist");

    // TODO: Keep working on this endpoint. Having the settings view in mind
    const updatedCarerProfile = await this.prisma.carerProfile.update({
      where: { id: carerProfile.id },
      data: updateCarerProfileDto,
    });

    return updatedCarerProfile;
  }

  async approveCarer(id: number, cceptCarerProfileDto: AcceptCarerProfileDto) {
    const carerProfile = await this.prisma.carerProfile.findUnique({
      where: { id },
    });
    if (!carerProfile) throw new NotFoundException("Carer doesn't exist");

    if (carerProfile.reviewed)
      throw new ForbiddenException('Carer has already been reviewed');

    const updatedCarerProfile = await this.prisma.user.update({
      data: {
        carer: {
          update: {
            is_approved: cceptCarerProfileDto.is_approved,
            reviewed: true,
          },
        },
      },
      where: { carerId: id },
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        role: true,
        carer: true,
      },
    });

    return updatedCarerProfile;
  }

  remove(id: number) {
    return `This action removes a #${id} carerProfile`;
  }
}
