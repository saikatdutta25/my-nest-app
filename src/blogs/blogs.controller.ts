import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDTO } from './dto/blog-create.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private blogService: BlogsService) {}

  @Get()
  getBlogApi() {
    return 'Blog Api Works';
  }

  @Get('/all-blogs')
  getAllBlogs() {
    return this.blogService.getAllBlogs();
  }

  @Get('/:id')
  getBlogById(@Param() params: { id: string }) {
    return this.blogService.getBlogByID(params.id);
  }

  @Post('/create-new-blog')
  postNewBlog(@Body() body: CreateBlogDTO) {
    return this.blogService.postNewBlog(body);
  }

  @Delete('/delete/:id')
  deleteBlogById(@Param() params: { id: string }) {
    return this.blogService.deleteBlogById(params.id);
  }

  @Patch('/update/:id')
  patchBlogById(@Param() params: { id: string }, @Body() body: CreateBlogDTO) {
    return this.blogService.updateBlogById(params.id, body);
  }
}
