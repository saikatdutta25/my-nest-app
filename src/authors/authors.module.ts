import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorSchema } from './schema/author.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Author', schema: AuthorSchema }]),
  ],
  controllers: [AuthorsController],
  providers: [AuthorsService],
  exports: [AuthorsService, MongooseModule],
})
export class AuthorsModule {}
