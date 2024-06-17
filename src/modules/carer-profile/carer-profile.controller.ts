import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CarerProfileService } from './carer-profile.service';
import { CreateCarerProfileDto } from './dto/create-carer-profile.dto';
import { UpdateCarerProfileDto } from './dto/update-carer-profile.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { UserRole } from '@prisma/client';
import { Roles } from '../auth/decorators/roles.decorator';
import { Request } from 'express';
import { JwtPayload } from 'src/interfaces/jwt-payload';

@Controller('carer-profile')
export class CarerProfileController {
  constructor(private readonly carerProfileService: CarerProfileService) {}

  @Post()
  create(@Body() createCarerProfileDto: CreateCarerProfileDto) {
    return this.carerProfileService.create(createCarerProfileDto);
  }

  @Get()
  @UseGuards(JwtGuard)
  findAll() {
    return this.carerProfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carerProfileService.findOne(+id);
  }

  @Patch('self')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.CARER)
  update(
    @Req() req: Request,
    @Body() updateCarerProfileDto: UpdateCarerProfileDto,
  ) {
    const { id } = req.user as JwtPayload;

    return this.carerProfileService.update(+id, updateCarerProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carerProfileService.remove(+id);
  }
}
