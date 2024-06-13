import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  BadRequestException,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('presigned-url')
  async getPresignedUrl(@Body() CreateFile: CreateFileDto) {
    const { url, file } = await this.filesService.getFileUploadUrl(CreateFile);
    return { ...file, url };
  }

  @Get('presigned-url/:id')
  async getPresignedUrlForGet(@Param('id') id: string) {
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) throw new BadRequestException('Invalid id');
    const { file, url } = await this.filesService.getFileReadUrl(parsedId);
    return { ...file, url };
  }
}
