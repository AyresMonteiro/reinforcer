import mongoose from "mongoose";

import { User } from "../../../../domain/types/user";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const MongooseUserModel = mongoose.model<User>("User", UserSchema);
