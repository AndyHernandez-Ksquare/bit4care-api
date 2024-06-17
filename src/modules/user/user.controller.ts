import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { Request } from 'express';
import { JwtPayload } from 'src/interfaces/jwt-payload';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsUserGuard } from './guards/is-user.guard';
import { RolesGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('user')
export class UsersController {
  constructor(private userService: UserService) {}

  // @Get('/:id')
  // getUserById(@Query() query: any, @Param('id', ParseIntPipe) param: number) {
  //   const id = param;
  //   // console.log(param);

  //   const user = this.userService.getUserById(id);
  //   return user;
  // }

  @Get('self')
  @UseGuards(JwtGuard, IsUserGuard)
  async getSelf(@Req() req: Request) {
    const reqUser = req.user as JwtPayload;
    const user = await this.userService.getUser(reqUser.id, reqUser.email);
    return user;
  }

  @Post()
  createUser(@Body() user: CreateUserDto) {
    const createdUser = this.userService.register(user);
    return createdUser;
  }

  @Patch('self')
  @UseGuards(JwtGuard, IsUserGuard)
  update(@Req() req: Request, @Body() updateClientDto: UpdateUserDto) {
    const reqUser = req.user as JwtPayload;

    return this.userService.update(+reqUser.id, updateClientDto);
  }
}
