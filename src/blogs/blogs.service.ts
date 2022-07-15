import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBlogDTO } from './dto/blog-create.dto';
import { IBlog } from './schema/blog.schema';

@Injectable()
export class BlogsService {
  constructor(@InjectModel('Blog') private readonly blogModel: Model<IBlog>) {}

  async getAllBlogs() {
    try {
      const allBlogs = await this.blogModel.find();
      if (!allBlogs) throw new Error('Blogs Not found');
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
      return { message: 'Sussessfull', blog: createdBlog };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async getBlogByID(id: string): Promise<object> {
    try {
      const getBlog = await this.blogModel.findById(id);
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
