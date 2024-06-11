import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseGuards,
  ForbiddenException,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { Request } from 'express';
import { JwtPayload } from 'src/interfaces/jwt-payload';
import { UserRole } from 'src/common/enums';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get('self')
  @UseGuards(JwtGuard)
  async getSelf(@Req() req: Request) {
    const reqUser = req.user as JwtPayload;
    if (reqUser.role !== UserRole.CLIENT)
      throw new ForbiddenException('Not a client');

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

  // @Get()
  // findAll() {
  //   return this.clientService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.clientService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
  //   return this.clientService.update(+id, updateClientDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.clientService.remove(+id);
  // }
}
