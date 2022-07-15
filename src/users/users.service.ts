import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model } from 'mongoose';
import { IUser } from './schema/user.schema';

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

  async createNewUser(req: Request): Promise<object> {
    const { name, email, password } = req.body;
    try {
      const newUser = new this.userModel({ name, email, password });
      const createdUser = await newUser.save();
      if (!createdUser) throw new Error('Something Error! User not created');
      return { message: 'Sussessfull', user: createdUser };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
