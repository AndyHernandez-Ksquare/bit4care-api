import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarerProfileService } from './carer-profile.service';
import { CreateCarerProfileDto } from './dto/create-carer-profile.dto';
import { UpdateCarerProfileDto } from './dto/update-carer-profile.dto';

@Controller('carer-profile')
export class CarerProfileController {
  constructor(private readonly carerProfileService: CarerProfileService) {}

  @Post()
  create(@Body() createCarerProfileDto: CreateCarerProfileDto) {
    return this.carerProfileService.create(createCarerProfileDto);
  }

  @Get()
  findAll() {
    return this.carerProfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carerProfileService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarerProfileDto: UpdateCarerProfileDto) {
    return this.carerProfileService.update(+id, updateCarerProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carerProfileService.remove(+id);
  }
}
