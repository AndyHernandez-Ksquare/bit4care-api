import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UsersController {
  constructor(private userService: UserService) {}

  @Get('/:id')
  getUserById(@Query() query: any, @Param('id', ParseIntPipe) param: any) {
    const id = +param.id;
    console.log(query, id);

    const user = this.userService.getUserById();
    return user;
  }

  @Post()
  createUser(@Body() user: CreateUserDto) {
    const createdUser = this.userService.createUser(user);
    return createdUser;
  }
}
