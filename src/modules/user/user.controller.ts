import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
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
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Users') // Tag for grouping endpoints in Swagger
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
  @ApiOperation({ summary: 'Get user info of logged in user' })
  @ApiResponse({
    status: 200,
    description: 'Info of logged in user',
    type: CreateUserDto,
    example: {
      id: 1,
      name: 'John Doe',
      email: '2lqy5@example.com',
      role: 'USER',
      stripeAccountId: 2,
      carerId: 3,
      address: '123 Main St, City, State 12345',
      createdAt: '2020-01-01T00:00:00.000Z',
      updatedAt: '2020-01-01T00:00:00.000Z',
    },
  })
  @UseGuards(JwtGuard, IsUserGuard)
  async getSelf(@Req() req: Request) {
    const reqUser = req.user as JwtPayload;
    const user = await this.userService.getUser(reqUser.id, reqUser.email);
    return user;
  }

  @Post()
  @ApiOperation({ summary: 'Create new User with default role of USER' })
  @ApiResponse({
    status: 201,
    description: 'Info of created in user',
    type: CreateUserDto,
    example: {
      id: 6,
      name: 'Hello user',
      email: 'test2@aaasd.cim',
      role: 'USER',
    },
  })
  @ApiBody({ type: CreateUserDto })
  createUser(@Body() user: CreateUserDto) {
    const createdUser = this.userService.register(user);
    return createdUser;
  }

  @Patch('self')
  @ApiOperation({
    summary:
      'Patch the logged in User, works with the JWT token, same as GET self',
  })
  @ApiResponse({
    status: 200,
    description: 'Update info of logged in user',
    type: UpdateUserDto,
    example: {
      id: 1,
      name: 'John Doe',
      email: '2lqy5@example.com',
      role: 'USER',
      phone: '123-456-7890',
      stripeAccountId: 2,
      carerId: 3,
      address: '123 Main St, City, State 12345',
    },
  })
  @ApiBody({ type: CreateUserDto })
  @UseGuards(JwtGuard, IsUserGuard)
  update(@Req() req: Request, @Body() updateClientDto: UpdateUserDto) {
    const reqUser = req.user as JwtPayload;

    return this.userService.update(+reqUser.id, updateClientDto);
  }
}
