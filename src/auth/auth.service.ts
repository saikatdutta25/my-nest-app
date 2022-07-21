import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginUserDTO } from './dto/login.dto';
import { RegisterUserDTO } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(body: RegisterUserDTO): Promise<object> {
    const data = await this.usersService.createNewUser(body);
    return data;
  }

  async login(body: LoginUserDTO): Promise<object> {
    const userData = await this.usersService.findByEmailPass(body);
    const { email, _id } = userData;
    // console.log(userData);
    const payload = { username: email, id: _id };
    return { message: 'Sussessfull', token: this.jwtService.sign(payload)};
  }
}
