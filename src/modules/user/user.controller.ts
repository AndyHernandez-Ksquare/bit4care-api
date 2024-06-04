import {
  Body,
  Controller,
  Get,
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
    return req.user;
  }

  @Post()
  createUser(@Body() user: CreateUserDto) {
    const createdUser = this.userService.createUser(user);
    return createdUser;
  }
}
