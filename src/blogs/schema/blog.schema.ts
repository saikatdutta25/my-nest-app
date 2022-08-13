import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Author } from 'src/authors/schema/author.schema';

export type BlogDocument = Blog & Document;

@Schema()
export class Blog {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  link: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Author' })
  author: Author;
}
export const BlogSchema = SchemaFactory.createForClass(Blog);
