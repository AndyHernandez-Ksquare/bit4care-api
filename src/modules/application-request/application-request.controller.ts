import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { ApplicationRequestService } from './application-request.service';
import { CreateApplicationRequestDto } from './dto/create-application-request.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { Request } from 'express';
import { JwtPayload } from 'src/interfaces/jwt-payload';
import { RolesGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from 'src/common/enums';
import { FilterOwner } from '../auth/decorators/filter-owner.decorator';
import { FilterOwnerGuard } from '../auth/guards/filter-owner.guard';
import { IsClientActiveGuard } from '../client/guards/is-client-active.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Application Requests') // Tag for grouping endpoints in Swagger
@Controller('application-request')
export class ApplicationRequestController {
  constructor(
    private readonly applicationRequestService: ApplicationRequestService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create application request',
    description: 'Endpoint for admins and clients only',
  })
  @ApiResponse({
    status: 200,
    example: {
      time_range: '09:00-12:00',
      patient_name: 'John Doe',
      patient_phone: '+1234567890',
      description: 'Routine check-up for blood pressure and medication review',
      comments: 'Patient prefers morning appointments',
      amount: 150,
      carerId: 25,
      status: 'pending',
    },
  })
  @UseGuards(JwtGuard, RolesGuard, IsClientActiveGuard)
  @Roles(UserRole.ADMIN, UserRole.CLIENT)
  create(
    @Body() createApplicationRequestDto: CreateApplicationRequestDto,
    @Req() req: Request,
  ) {
    const reqUser = req.user as JwtPayload;
    return this.applicationRequestService.create(
      createApplicationRequestDto,
      reqUser.id,
    );
  }

  @Get()
  @ApiOperation({
    summary: 'Create application request',
    description:
      'Endpoint for admins and clients only. A client can only see their own application requests',
  })
  @ApiResponse({
    status: 200,
    example: [
      {
        time_range: '09:00-12:00',
        address: '1234 Elm Street, Springfield', // Optional field
        patient_name: 'John Doe',
        patient_phone: '+1234567890', // Must be a valid phone number
        description:
          'Routine check-up for blood pressure and medication review',
        comments: 'Patient prefers morning appointments',
        amount: 150, // Integer value
        carerId: 25, // Integer value
        status: 'pending', // Example status value
      },
      {
        time_range: '09:00-12:00',
        patient_name: 'John Doe',
        patient_phone: '+1234567890',
        description:
          'Routine check-up for blood pressure and medication review',
        comments: 'Patient prefers morning appointments',
        amount: 150,
        carerId: 25,
        status: 'pending',
      },
    ],
  })
  @UseGuards(JwtGuard, RolesGuard, FilterOwnerGuard, IsClientActiveGuard)
  @Roles(UserRole.ADMIN, UserRole.CLIENT)
  @FilterOwner('clientId')
  findAll(
    @Req() req: Request,
    @Query() query: { date: string; status: string },
  ) {
    const { date, status } = query;

    return this.applicationRequestService.findAll(req, date, status);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.applicationRequestService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateApplicationRequestDto: UpdateApplicationRequestDto) {
  //   return this.applicationRequestService.update(+id, updateApplicationRequestDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.applicationRequestService.remove(+id);
  // }
}
