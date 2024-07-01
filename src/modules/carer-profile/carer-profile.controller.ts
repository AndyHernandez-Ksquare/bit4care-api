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
import { AcceptCarerProfileDto } from './dto/accept-carer-profile-dto';
import { IsCarerActiveGuard } from './guards/is-carer-active.guard';

@Controller('carer-profile')
export class CarerProfileController {
  constructor(private readonly carerProfileService: CarerProfileService) {}

  @Post()
  create(@Body() createCarerProfileDto: CreateCarerProfileDto) {
    return this.carerProfileService.create(createCarerProfileDto);
  }

  @Get()
  @UseGuards(JwtGuard)
  @Roles(UserRole.ADMIN, UserRole.CLIENT)
  findAll() {
    return this.carerProfileService.findAll();
  }

  @Get('test/:carerId')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.CLIENT)
  findOne(@Param('carerId') carerId: string) {
    return this.carerProfileService.findOne(+carerId);
  }

  @Get('admin/list-carers-pedning-to-approve')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  handleFindAllCarersPendingToApprove() {
    return this.carerProfileService.findAllCarersPendingToApprove();
  }

  @Patch('admin/desactivate-carer/:carerId')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  handleDesactivateCarer(@Param('carerId') carerId: string) {
    return this.carerProfileService.desactivateCarer(+carerId);
  }

  @Patch('self')
  @UseGuards(JwtGuard, RolesGuard, IsCarerActiveGuard)
  @Roles(UserRole.CARER)
  update(
    @Req() req: Request,
    @Body() updateCarerProfileDto: UpdateCarerProfileDto,
  ) {
    const { id } = req.user as JwtPayload;

    return this.carerProfileService.update(+id, updateCarerProfileDto);
  }

  @Patch('admin/review-carer/:carerId')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  handleApproveCarer(
    @Param('carerId') carerId: string,
    @Body() cceptCarerProfileDto: AcceptCarerProfileDto,
  ) {
    return this.carerProfileService.approveOrDenyCarer(
      +carerId,
      cceptCarerProfileDto,
    );
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete('admin/:id')
  remove(@Param('id') id: string) {
    return this.carerProfileService.remove(+id);
  }
}
