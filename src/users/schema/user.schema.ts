import { Document, Schema } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { NextFunction } from 'express';

export interface IUser extends Document {
  readonly name: string;
  readonly email: string;
  readonly password: string;
}

export const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

UserSchema.pre('save', async function (next: NextFunction) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});
