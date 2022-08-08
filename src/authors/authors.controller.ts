import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDTO } from './dto/author.create.dto';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Get('/all-authors')
  getAllBlogs() {
    return this.authorsService.getAllAuthor();
  }

  @Post('/create-new')
  createNew(@Body() body: CreateAuthorDTO) {
    return this.authorsService.createNewAuthor(body);
  }
}
