import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Author, AuthorDocument } from 'src/authors/schema/author.schema';
import { CreateBlogDTO } from './dto/blog-create.dto';
import { Blog, BlogDocument } from './schema/blog.schema';
import { Logger } from 'winston';

@Injectable()
export class BlogsService {
  constructor(
    @InjectModel(Blog.name) private readonly blogModel: Model<BlogDocument>,
    @InjectModel(Author.name)
    private readonly authorModel: Model<AuthorDocument>,
    @Inject('winston') private readonly logger: Logger,
  ) {}

  async getAllBlogs() {
    try {
      const allBlogs = await this.blogModel.find();
      if (!allBlogs) throw new Error('Blogs Not found');
      this.logger.info('All blogs');
      return { message: 'Sussessfull', blogs: allBlogs };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async postNewBlog(body: CreateBlogDTO): Promise<object> {
    try {
      const newBlog = new this.blogModel(body);
      const createdBlog = await newBlog.save();
      if (!createdBlog) throw new Error('Something error! Blog Not created');
      const authorById = await this.authorModel.findById(createdBlog.author);
      authorById.blogList.push(createdBlog);
      await authorById.save();
      return { message: 'Sussessfull', blog: createdBlog };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async getBlogByID(id: string): Promise<object> {
    try {
      const getBlog = await this.blogModel
        .findById(id)
        .populate({ path: 'author', select: 'name -_id mobileNo' });
      if (!getBlog) throw new Error('Something error! Blog Not found');
      return { message: 'Sussessfull', blog: getBlog };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async deleteBlogById(id: string): Promise<object> {
    try {
      const isDeleted = await this.blogModel.findByIdAndRemove(id);
      if (!isDeleted) throw new Error('Something error! Blog Not found');
      return { message: 'Sussessfull', blog: isDeleted };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async updateBlogById(id: string, body: CreateBlogDTO): Promise<object> {
    try {
      const isUpdated = await this.blogModel.findByIdAndUpdate(id, body);
      if (!isUpdated) throw new Error('Something error! Blog Not found');
      return { message: 'Sussessfull', blog: isUpdated };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
