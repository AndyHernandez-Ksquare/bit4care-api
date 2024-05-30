import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  getUserById() {
    return 'User ID';
  }
  createUser(user: any) {
    console.log(user);
    return user;
  }
}
