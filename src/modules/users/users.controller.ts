import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get('/users')
  getUserById() {
    return 'This is the user';
  }
}
