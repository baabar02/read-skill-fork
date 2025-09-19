import { User } from "../../models/user-model";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const createUser = async (_: unknown, args: { name: string }) => {
  const existingUser = await User.findOne({ name: args.name });

  if (existingUser) {
    throw new Error("user already exists");
  }

  const user = await User.create({ name: args.name });

  if (!user) {
    throw new Error("User not created");
  }

  const token = jwt.sign({ userId: user._id, name: user.name }, JWT_SECRET, {
    expiresIn: "30d",
  });

  return { user, token };
};
