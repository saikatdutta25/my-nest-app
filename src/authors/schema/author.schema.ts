import { Document, Schema } from 'mongoose';

interface BlogType {
  _id: any;
}
export interface IAuthor extends Document {
  readonly name: string;
  readonly mobileNo: number;
  readonly blogList?: Array<BlogType>;
}

export const AuthorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    blogList: [{ type: [{ type: Schema.Types.ObjectId, ref: 'Blog' }] }],
    mobileNo: Number,
  },
  { timestamps: true },
);
