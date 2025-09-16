import { User } from "../../models/user-model";

export const createUser = async (_: unknown, args: { name: string }) => {
  const existingUser = await User.findOne({ name: args.name });

  if (existingUser) {
    throw new Error("user already exists");
  }
  const user = await User.create({ name: args.name });

  if (!user) {
    throw new Error("User not created");
  }

  return user;
};
