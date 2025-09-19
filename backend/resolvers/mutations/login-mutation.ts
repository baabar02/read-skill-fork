import jwt from "jsonwebtoken";
import { User } from "../../models/user-model";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const loginUser = async (_: unknown, args: { name: string }) => {
  console.log(" Нэвтэрч буй нэр:", args.name);

  const user = await User.findOne({ name: args.name });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
    expiresIn: "30d",
  });

  const decoded = jwt.decode(token);
  console.log("Decoded token:", decoded);

  return {
    token,
    user,
  };
};
