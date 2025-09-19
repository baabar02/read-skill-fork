import { User } from "../../models/user-model";

export const getUserById = async (_: unknown, args: { userId: string }) => {
  try {
    const user = await User.findById(args.userId);

    // console.log(user, "user");

    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.error("getUserById error:", error);
    throw new Error("Invalid user ID");
  }
};
