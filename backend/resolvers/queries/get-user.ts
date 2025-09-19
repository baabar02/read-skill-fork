import { User } from "../../models/user-model";

export const getUsers = async () => {
  try {
    const users = await User.find({});
    return users;
  } catch (error) {
    console.error("Failed to get users:", error);
    throw new Error("Could not fetch users");
  }
};
