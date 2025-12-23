import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { getUserFromCookie } from "@/lib/auth";

export default async function handler(req, res) {
  try {
    if (req.method !== "GET" && req.method !== "PUT") {
      return res.status(405).json({ message: "Method not allowed" });
    }

    await connectDB();

    const decoded = getUserFromCookie(req);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // -------- GET PROFILE --------
    if (req.method === "GET") {
      const user = await User.findById(decoded.id).select("-password");
      return res.status(200).json(user);
    }

    // -------- UPDATE PROFILE --------
    if (req.method === "PUT") {
      const updatedUser = await User.findByIdAndUpdate(
        decoded.id,
        req.body,
        { new: true, runValidators: true }
      ).select("-password");

      return res.status(200).json(updatedUser);
    }
  } catch (error) {
    console.error("PROFILE API ERROR:", error);
    return res.status(500).json({ error: error.message });
  }
}
