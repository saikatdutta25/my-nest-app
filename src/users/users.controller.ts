import { Body, Controller, Get, Post } from '@nestjs/common';
import { RegisterUserDTO } from 'src/auth/dto/register.dto';
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

  @Post('/create-new')
  postNewUser(@Body() body: RegisterUserDTO) {
    return this.userService.createNewUser(body);
  }
}
