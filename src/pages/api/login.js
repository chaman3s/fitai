import bcrypt from "bcryptjs";
import cookie from "cookie";
import User from "@/models/User";
import { connectDB } from "@/lib/db";
import { signToken } from "@/lib/auth";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).end();

  const { email, password } = req.body;

  await connectDB();

  const user = await User.findOne({ email });
  if (!user)
    return res.status(401).json({ message: "Invalid credentials" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid)
    return res.status(401).json({ message: "Invalid credentials" });

  const token = signToken(user);

  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })
  );

  res.status(200).json({
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
}
