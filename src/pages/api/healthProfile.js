import { connectDB } from "@/lib/db";
import HealthInformation from "@/models/HealthInformation";
import { getUserFromCookie } from "@/lib/auth";

export default async function handler(req, res) {
  try {
    await connectDB();

    const decoded = getUserFromCookie(req); // ✅ Pages Router
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // ---------- GET HEALTH PROFILE ----------
    if (req.method === "GET") {
      let healthInfo = await HealthInformation.findOne({
        user: decoded.id, // ✅ correct field
      });

      // Auto-create if not exists
      if (!healthInfo) {
        healthInfo = await HealthInformation.create({
          user: decoded.id,
        });
      }

      return res.status(200).json(healthInfo);
    }

    // ---------- UPDATE HEALTH PROFILE ----------
    if (req.method === "PUT") {
      const updatedHealth = await HealthInformation.findOneAndUpdate(
        { user: decoded.id },
        req.body,
        { new: true, upsert: true, runValidators: true }
      );

      return res.status(200).json(updatedHealth);
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error("HEALTH PROFILE API ERROR:", error);
    return res.status(500).json({ error: error.message });
  }
}
