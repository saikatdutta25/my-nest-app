import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema } from './schema/blog.schema';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { TestMiddleware2 } from './middlewares/test.middleware';
import { AuthorSchema } from 'src/authors/schema/author.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Blog', schema: BlogSchema },
      { name: 'Author', schema: AuthorSchema },
    ]),
  ],
  controllers: [BlogsController],
  providers: [BlogsService],
})
export class BlogsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TestMiddleware2).forRoutes('blogs/all-blogs');
  }
}
