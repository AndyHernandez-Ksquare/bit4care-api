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
import { ApplicationRequestService } from './application-request.service';
import { CreateApplicationRequestDto } from './dto/create-application-request.dto';
import { UpdateApplicationRequestDto } from './dto/update-application-request.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { Request } from 'express';
import { JwtPayload } from 'src/interfaces/jwt-payload';
import { RolesGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/decorators/Roles.decorator';
import { UserRole } from 'src/common/enums';

@Controller('application-request')
export class ApplicationRequestController {
  constructor(
    private readonly applicationRequestService: ApplicationRequestService,
  ) {}
  // TODO: Create guard that checks if the requester is a client or carer. Certain endpoints only apply to one of those

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
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.CLIENT)
  findAll() {
    return this.applicationRequestService.findAll();
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
