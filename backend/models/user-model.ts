import { model, models, Schema } from "mongoose";

type UserRoleEnum = "admin" | "user" | "parent";

type User = {
  _id: Schema.Types.ObjectId;
  name: string;
  //   email: string;
  //   age: number;
  //   role: UserRoleEnum;
  //   isVerified: boolean;
  //   createdAt: Date;
  //   updatedAt: Date;
};

const UserSchema = new Schema<User>(
  {
    name: { type: String, unique: true, required: true },
    // email: { type: String, required: true },
    // age: { type: Number, required: true },
    // role: { type: String, required: false, enum: ["admin", "user", "parent"] },
    // isVerified: { type: Boolean, required: true },
    // createdAt: { type: Date, required: true },
    // updatedAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export const User = model<User>("User", UserSchema);
