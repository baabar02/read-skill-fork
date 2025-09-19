import jwt from "jsonwebtoken";
import { User } from "../../models/user-model";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const loginUser = async (
  _: unknown,
  args: { email: string; password: string }
) => {
  const user = await User.findOne({ email: args.email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

 

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
    expiresIn: "30d",
  });

  return {
    token,
    user,
  };
};
