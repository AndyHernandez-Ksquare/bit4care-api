import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
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
  @UseGuards(JwtGuard)
  async getSelf(@Req() req: Request) {
    const reqUser = req.user as JwtPayload;
    const user = await this.userService.getUser(reqUser.id, reqUser.email);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  @Post()
  createUser(@Body() user: CreateUserDto) {
    const createdUser = this.userService.register(user);
    return createdUser;
  }
}
