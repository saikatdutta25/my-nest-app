import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAuthorDTO } from './dto/author.create.dto';
import { Author, AuthorDocument } from './schema/author.schema';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectModel(Author.name)
    private readonly authorModel: Model<AuthorDocument>,
  ) {}

  async getAllAuthor() {
    try {
      const authors = await this.authorModel.find();
      if (!authors) throw new Error('Authors Not found');
      return authors;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async createNewAuthor(authorBody: CreateAuthorDTO): Promise<AuthorDocument> {
    try {
      const author = new this.authorModel(authorBody);
      await author.save();
      if (!author) throw new Error('Could not create');
      return author;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_ACCEPTABLE);
    }
  }
}
