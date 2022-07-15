import { Document, Schema } from 'mongoose';

export interface IBlog extends Document {
  readonly name: string;
  readonly description: string;
  readonly author: string;
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
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
