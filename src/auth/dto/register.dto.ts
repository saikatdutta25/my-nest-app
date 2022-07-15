import { IsEmail, IsString } from 'class-validator';

export class RegisterUserDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
