import UpcomingWorkout from "@/models/UpcomingWorkout";
import { connectDB } from "@/lib/db";
import cookie from "cookie";
import { verifyToken } from "@/lib/auth";

export default async function handler(req, res) {
  try {
    await connectDB();

    const cookies = cookie.parse(req.headers.cookie || "");
    const token = cookies.token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const { id: userId } = verifyToken(token);
    if (req.method === "GET") {
      const workouts = await UpcomingWorkout.find({ userId }).sort({ date: 1 });
      return res.status(200).json(workouts);
    }
    if (req.method === "POST") {
      const workout = await UpcomingWorkout.create({
        ...req.body,
        userId,
      });
      return res.status(201).json(workout);
    }

    return res.status(405).json({ message: "Method not allowed" });
  } catch (err) {
    console.error("WORKOUT API ERROR:", err);
    return res.status(500).json({ message: "Server error" });
  }
}
