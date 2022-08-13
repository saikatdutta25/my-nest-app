import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Blog } from 'src/blogs/schema/blog.schema';

export type AuthorDocument = Author & Document;

@Schema()
export class Author {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  mobileNo: number;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }] })
  blogList: Blog[];
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
