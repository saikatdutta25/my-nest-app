import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getRoute() {
    return 'This is users home route';
  }

  @Get('/all-users')
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('/create-new')
  postNewUser(@Req() req: Request) {
    return this.userService.createNewUser(req);
  }
}
