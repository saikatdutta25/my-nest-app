import { IsString } from 'class-validator';

export class CreateBlogDTO {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  author: string;

  @IsString()
  link: string;
}
