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
  constructor(private readonly blogService: BlogsService) {}

  @Get()
  getBlogApi() {
    return 'Blog Api Works';
  }

  @Get('/all-blogs')
  getAllBlogs() {
    return this.blogService.getAllBlogs();
  }

  @Get('/:id')
  getBlogById(@Param('id') id: string) {
    return this.blogService.getBlogByID(id);
  }

  @Post('/create-new-blog')
  postNewBlog(@Body() body: CreateBlogDTO) {
    return this.blogService.postNewBlog(body);
  }

  @Delete('/delete/:id')
  deleteBlogById(@Param('id') id: string) {
    return this.blogService.deleteBlogById(id);
  }

  @Patch('/update/:id')
  patchBlogById(@Param('id') id: string, @Body() body: CreateBlogDTO) {
    return this.blogService.updateBlogById(id, body);
  }
}
