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

@Controller('application-request')
export class ApplicationRequestController {
  constructor(
    private readonly applicationRequestService: ApplicationRequestService,
  ) {}

  @Post()
  @UseGuards(JwtGuard, RolesGuard)
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
  @UseGuards(JwtGuard, RolesGuard, FilterOwnerGuard)
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
