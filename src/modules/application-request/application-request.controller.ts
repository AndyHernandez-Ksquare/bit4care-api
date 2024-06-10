import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApplicationRequestService } from './application-request.service';
import { CreateApplicationRequestDto } from './dto/create-application-request.dto';
import { UpdateApplicationRequestDto } from './dto/update-application-request.dto';

@Controller('application-request')
export class ApplicationRequestController {
  constructor(private readonly applicationRequestService: ApplicationRequestService) {}

  @Post()
  create(@Body() createApplicationRequestDto: CreateApplicationRequestDto) {
    return this.applicationRequestService.create(createApplicationRequestDto);
  }

  @Get()
  findAll() {
    return this.applicationRequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.applicationRequestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateApplicationRequestDto: UpdateApplicationRequestDto) {
    return this.applicationRequestService.update(+id, updateApplicationRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.applicationRequestService.remove(+id);
  }
}
