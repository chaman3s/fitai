import { connectDB } from "@/lib/db";
import Activity from "@/models/Activities";
import { getUserFromCookie } from "@/lib/auth";

export default async function handler(req, res) {
  try {
    await connectDB();

    const decoded = getUserFromCookie(req);
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (req.method === "GET") {
      const activities = await Activity.find({
        user: decoded.id, // ✅ correct query
      }).sort({ createdAt: -1 });

      return res.status(200).json(activities);
    }

    // -------- CREATE ACTIVITY --------
    if (req.method === "POST") {
      const activity = await Activity.create({
        ...req.body,
        user: decoded.id,
      });

      return res.status(201).json(activity);
    }

    // -------- UPDATE ACTIVITY --------
    if (req.method === "PUT") {
      const { id, ...data } = req.body;

      const updated = await Activity.findOneAndUpdate(
        { _id: id, user: decoded.id },
        data,
        { new: true }
      );

      return res.status(200).json(updated);
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error("ACTIVITIES API ERROR:", error);
    return res.status(500).json({ error: error.message });
  }
}
