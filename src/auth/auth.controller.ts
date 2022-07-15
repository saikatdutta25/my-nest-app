import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDTO } from './dto/login.dto';
import { RegisterUserDTO } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() body: RegisterUserDTO) {
    return this.authService.register(body);
  }

  @Post('/login')
  login(@Body() body: LoginUserDTO) {
    return this.authService.login(body);
  }
}
