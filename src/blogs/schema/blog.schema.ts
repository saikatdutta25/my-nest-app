import { Document, Schema } from 'mongoose';

export interface IBlog extends Document {
  readonly name: string;
  readonly description: string;
  readonly author: object;
  readonly link: string;
}

export const BlogSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'Author',
    },
    link: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
