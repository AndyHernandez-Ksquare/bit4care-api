import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  BadRequestException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { Request } from 'express';
import { JwtPayload } from 'src/interfaces/jwt-payload';
import { FilterOwner } from '../auth/decorators/filter-owner.decorator';
import { FilterOwnerGuard } from '../auth/guards/filter-owner.guard';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('presigned-url')
  @UseGuards(JwtGuard)
  async getPresignedUrl(
    @Body() CreateFile: CreateFileDto,
    @Req() req: Request,
  ) {
    const reqUser = req.user as JwtPayload;
    const { url, file } = await this.filesService.getFileUploadUrl(
      CreateFile,
      reqUser.id,
    );
    return { ...file, url };
  }

  @Get('presigned-url/:id')
  @UseGuards(JwtGuard, FilterOwnerGuard)
  @FilterOwner('userId')
  async getPresignedUrlForGet(@Param('id') id: string, @Req() req: Request) {
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) throw new BadRequestException('Invalid id');
    const { file } = await this.filesService.getFileReadUrl(parsedId, req);
    return file;
  }

  @Get('user/presigned-url/:userId')
  @UseGuards(JwtGuard, FilterOwnerGuard)
  @FilterOwner('userId')
  async getUserPresignedUrlForGet(
    @Param('userId') userId: string,
    @Req() req: Request,
  ) {
    const parsedId = parseInt(userId);
    if (isNaN(parsedId)) throw new BadRequestException('Invalid id');
    const { file } = await this.filesService.getUserFileReadUrl(parsedId, req);
    return file;
  }
}
