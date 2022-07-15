import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginUserDTO } from './dto/login.dto';
import { RegisterUserDTO } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async register(body: RegisterUserDTO): Promise<object> {
    const data = await this.usersService.createNewUser(body);
    return data;
  }

  async login(body: LoginUserDTO): Promise<object> {
    const data = await this.usersService.findByEmailPass(body);
    return { message: 'Sussessfull', user: data };
  }
}
