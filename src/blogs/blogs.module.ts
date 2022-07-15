import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema } from './schema/blog.schema';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Blog', schema: BlogSchema }])],
  controllers: [BlogsController],
  providers: [BlogsService],
})
export class BlogsModule {}
