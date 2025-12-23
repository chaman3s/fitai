import { connectDB } from "@/lib/db";
import GeneratedPlan from "@/models/GeneratedPlan";
import { generatePlanWithFallback } from "@/lib/aiFallback";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false });
  }

  try {
    await connectDB();

    const {
      userId,
      profile,
      workoutDuration,
      mealComplexity,
      focusArea,
      advancedSettings,
    } = req.body;

    const prompt = `
Return ONLY valid JSON.

{
  "workoutPlan": {
    "weeklyPlan": [
      {
        "day": "Monday",
        "focus": "Chest",
        "duration": "45 minutes",
        "exercises": []
      }
    ]
  },
  "dietPlan": {
    "dailyCalories": 2000,
    "meals": []
  }
}

USER DATA:
${JSON.stringify(
  {
    profile,
    workoutDuration,
    mealComplexity,
    focusArea,
    advancedSettings,
  },
  null,
  2
)}
`;

    const aiText = await generatePlanWithFallback(prompt);

    // 🔹 SAFE JSON EXTRACTION
    const json = JSON.parse(
      aiText.substring(aiText.indexOf("{"), aiText.lastIndexOf("}") + 1)
    );

    const savedPlan = await GeneratedPlan.create({
      userId,
      input: {
        profile,
        workoutDuration,
        mealComplexity,
        focusArea,
        advancedSettings,
      },
      output: json,
      provider: "gemini/openrouter",
    });

    return res.status(200).json({
      success: true,
      planId: savedPlan._id,
      workoutPlan: json.workoutPlan,
      dietPlan: json.dietPlan,
    });
  } catch (err) {
    console.error("Plan generation failed:", err);

    return res.status(500).json({
      success: false,
      message: "AI generation failed",
    });
  }
}
