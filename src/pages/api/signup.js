import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectDB } from "@/lib/db";

export default async function handler(req, res) {
  console.log(" /api/signup ");
  console.log("METHOD:", req.method);
  console.log("BODY:", req.body);

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      console.log(" Missing fields");
      return res.status(400).json({ message: "Missing fields" });
    }

    console.log("🔌 Connecting DB...");
    await connectDB();
    console.log("DB connected");

    console.log("Checking user...");
    const exists = await User.findOne({ email });
    if (exists) {
      console.log("User exists");
      return res.status(409).json({ message: "User already exists" });
    }

    console.log("Hashing password...");
    const hashed = await bcrypt.hash(password, 10);

    console.log("Creating user...");
    await User.create({
      name,
      email,
      password: hashed,
    });

    console.log(" Signup success");
    return res.status(201).json({ message: "Signup successful" });

  } catch (err) {
    console.error("🔥 SIGNUP ERROR:", err);
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
}
