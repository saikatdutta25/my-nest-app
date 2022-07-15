import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginUserDTO } from 'src/auth/dto/login.dto';
import { RegisterUserDTO } from 'src/auth/dto/register.dto';
import { IUser } from './schema/user.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

  async getAllUsers(): Promise<object> {
    try {
      const users = await this.userModel.find();
      if (!users) throw new Error('Not Found');
      return { message: 'Sussessfull', users };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async createNewUser(body: RegisterUserDTO): Promise<object> {
    try {
      const newUser = new this.userModel(body);
      const createdUser = await newUser.save();
      if (!createdUser) throw new Error('Something Error! User not created');
      return { message: 'Sussessfull', user: createdUser };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findByEmailPass(body: LoginUserDTO): Promise<object> {
    const { email, password } = body;
    try {
      const user = await this.userModel.findOne({ email });
      if (!user) throw new Error('Incorrect Email');
      const isValidUser = await bcrypt.compare(password, user.password);
      if (!isValidUser) throw new Error('Incorrect Password');
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
