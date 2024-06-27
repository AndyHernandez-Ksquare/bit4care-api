import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { Request } from 'express';
import { JwtPayload } from 'src/interfaces/jwt-payload';
import { UserRole } from 'src/common/enums';
import { UpdateClientDto } from './dto/update-client.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/role.guard';
import { IsClientActiveGuard } from './guards/is-client-active.guard';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get('self')
  @UseGuards(JwtGuard, RolesGuard, IsClientActiveGuard)
  @Roles(UserRole.CLIENT)
  async getSelf(@Req() req: Request) {
    const reqUser = req.user as JwtPayload;

    const client = await this.clientService.getClient(
      reqUser.id,
      reqUser.email,
    );
    return client;
  }

  @Post()
  async create(@Body() createClientDto: CreateClientDto) {
    return await this.clientService.create(createClientDto);
  }

  @Get('admin')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.clientService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.CARER)
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(+id);
  }

  @Patch('admin/desactivate-client/:clientId')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  handleDesactivateCarer(@Param('clientId') clientId: string) {
    return this.clientService.desactivateClient(+clientId);
  }

  @Patch('self')
  @UseGuards(JwtGuard, RolesGuard, IsClientActiveGuard)
  @Roles(UserRole.CLIENT)
  update(@Req() req: Request, @Body() updateClientDto: UpdateClientDto) {
    const reqUser = req.user as JwtPayload;

    return this.clientService.update(+reqUser.id, updateClientDto);
  }

  @Patch('carer/toggle-favorite-carer/:carerId')
  @UseGuards(JwtGuard, RolesGuard, IsClientActiveGuard)
  @Roles(UserRole.CLIENT)
  toggleFavoriteCarer(@Req() req: Request) {
    const reqUser = req.user as JwtPayload;
    const carerId = +req.params.carerId;

    return this.clientService.toggleFavoriteCarer(+reqUser.id, carerId);
  }

  @Get('carer/get-carers-with-favorites')
  @UseGuards(JwtGuard, RolesGuard, IsClientActiveGuard)
  @Roles(UserRole.CLIENT)
  handleGetCarersWithFavorite(@Req() req: Request) {
    const reqUser = req.user as JwtPayload;

    return this.clientService.getCarersWithFavorite(+reqUser.id);
  }

  @Delete('admin/:userId')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  handleDeleteClient(@Param('userId') userId: string) {
    return this.clientService.deleteClient(+userId);
  }
}
