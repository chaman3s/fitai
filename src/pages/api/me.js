import cookie from "cookie";
import User from "@/models/User";
import { connectDB } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export default async function handler(req, res) {
  // Allow only GET
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
  
    const cookies = cookie.parse(req.headers.cookie || "");
    const token = cookies.token;

    if (!token) {
      return res.status(401).json({ user: null });
    }


    const decoded = verifyToken(token);

   
    await connectDB();

    // 4️⃣ Get user (without password)
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ user: null });
    }


    return res.status(200).json({ user });
  } catch (error) {
    return res.status(401).json({ user: null });
  }
}
