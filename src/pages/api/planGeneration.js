import { connectDB } from "@/lib/db";
import GeneratedPlan from "@/models/GeneratedPlan";
import { generatePlanWithFallback } from "@/lib/aiFallback";
import { getUserFromCookie } from "@/lib/auth";

export default async function handler(req, res) {
  try {
   await connectDB();
  if (req.method == "GET") {
    const decoded = getUserFromCookie(req);
     if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    
    }
    console.log("Fetching plans for user ID:", decoded);
    const plans = await GeneratedPlan.find({ userId: decoded.id });
    console.log("Retrieved plans:", plans);
    return res.status(200).json({ success: true, plans  });
    
  }
  if (req.method == "POST") {
  
    

    const {
      userId,
      profile,
      workoutDuration,
      mealComplexity,
      focusArea,
      advancedSettings,
      reqFor,
      oldObject,
    } = req.body;
   if (!reqFor ) { return res.status(400).json({ success: false, message: "Missing 'reqFor' field" }); }
const includeWorkout = reqFor === "all" || reqFor === "workout";
const includeDiet = reqFor === "all" || reqFor === "diet";

let  prompt = `
  You are a professional ${(reqFor === "all" ? "fitness and nutrition" : reqFor === "workout" ? "fitness" : "nutrition")} expert.

Generate a comprehensive fitness plan based on the following user data.
The plan MUST include a detailed WEEKLY ${
  reqFor === "all"
    ? "workout schedule and a daily diet plan"
    : reqFor === "workout"
    ? "workout schedule"
    : "diet plan"
}.

CRITICAL OUTPUT RULES (NO EXCEPTIONS):
1. Respond ONLY with VALID JSON.
2. Do NOT include any text, explanation, markdown, or comments.
3. Do NOT rename, add, remove, or reorder any keys.
4. Do NOT invent new sections (no notes, hydration, supplements, tips, etc.).
5. dietPlan MUST be a WEEKLY array of exactly 7 days.
6. Days MUST be exactly:
   Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday
7. meals MUST be an array.
8. mealType MUST be one of:
   Breakfast, Lunch, Snack, Dinner
9. All numeric values MUST be strings.
10. No trailing commas.
11. If you cannot follow the schema EXACTLY, return {}.

OUTPUT SCHEMA (FOLLOW EXACTLY):

{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["success", "planId", "plan"],
  "additionalProperties": false,
  "properties": {
    "success": { "type": "boolean" },
    "planId": { "type": "string" },
    "plan": { "$ref": "#/definitions/Plan" }
  },

  "definitions": {
    "Plan": {
      "type": "object",
      "required": ["fitnessPlan"],
      "additionalProperties": false,
      "properties": {
        "fitnessPlan": { "$ref": "#/definitions/FitnessPlan" }
      }
    },

    "FitnessPlan": {
      "type": "object",
      "required": ${
        reqFor === "workout"
          ? `["weeklyWorkoutSchedule"]`
          : reqFor === "diet"
          ? `["dailyDietPlan"]`
          : `["weeklyWorkoutSchedule","dailyDietPlan"]`
      },
      "additionalProperties": false,
      "properties": {
      ${
         reqFor === "workout"? `"weeklyWorkoutSchedule": {
          "$ref": "#/definitions/WeeklyWorkoutSchedule"
        },`: reqFor === "diet"?` "dailyDietPlan": {
          "$ref": "#/definitions/DailyDietPlan"
        }`:`"weeklyWorkoutSchedule": {
          "$ref": "#/definitions/WeeklyWorkoutSchedule"
        },
        "dailyDietPlan": {
          "$ref": "#/definitions/DailyDietPlan"
        }
        `

      }
       
       
      }
    },

`;
if(includeWorkout){
  prompt+=`
    "WeeklyWorkoutSchedule": {
      "type": "object",
      "required": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "additionalProperties": false,
      "properties": {
        "Monday": { "$ref": "#/definitions/WorkoutDay" },
        "Tuesday": { "$ref": "#/definitions/WorkoutDay" },
        "Wednesday": { "$ref": "#/definitions/WorkoutDay" },
        "Thursday": { "$ref": "#/definitions/WorkoutDay" },
        "Friday": { "$ref": "#/definitions/WorkoutDay" },
        "Saturday": { "$ref": "#/definitions/WorkoutDay" },
        "Sunday": { "$ref": "#/definitions/WorkoutDay" }
      }
    },

    "WorkoutDay": {
      "type": "object",
      "required": ["workoutName"],
      "additionalProperties": false,
      "properties": {
        "workoutName": { "type": "string" },
        "exercises": {
          "type": "array",
          "items": { "$ref": "#/definitions/Exercise" }
        }
      }
    },

    "Exercise": {
      "type": "object",
      "required": ["name", "sets", "reps", "restTime"],
      "additionalProperties": false,
      "properties": {
        "name": { "type": "string" },
        "sets": { "type": "integer", "minimum": 1 },
        "reps": { "type": "integer", "minimum": 1 },
        "restTime": { "type": "integer", "minimum": 0 }
      }
    },
`}
if(includeDiet){
  prompt+=`
    "DailyDietPlan": {
      "type": "object",
      "required": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "additionalProperties": false,
      "properties": {
        "Monday": { "$ref": "#/definitions/DietDay" },
        "Tuesday": { "$ref": "#/definitions/DietDay" },
        "Wednesday": { "$ref": "#/definitions/DietDay" },
        "Thursday": { "$ref": "#/definitions/DietDay" },
        "Friday": { "$ref": "#/definitions/DietDay" },
        "Saturday": { "$ref": "#/definitions/DietDay" },
        "Sunday": { "$ref": "#/definitions/DietDay" }
      }
    },

    "DietDay": {
      "type": "object",
      "required": ["breakfast", "snack", "lunch", "dinner"],
      "additionalProperties": false,
      "properties": {
        "breakfast": { "$ref": "#/definitions/Meal" },
        "snack": { "$ref": "#/definitions/Meal" },
        "lunch": { "$ref": "#/definitions/Meal" },
        "dinner": { "$ref": "#/definitions/Meal" }
      }
    },

    "Meal": {
      "type": "object",
      "required": [
        "name",
        "calories",
        "protein",
        "carbohydrates",
        "fat"
      ],
      "additionalProperties": false,
      "properties": {
        "name": { "type": "string" },
        "calories": { "type": "integer", "minimum": 0 },
        "protein": { "type": "integer", "minimum": 0 },
        "carbohydrates": { "type": "integer", "minimum": 0 },
        "fat": { "type": "integer", "minimum": 0 }
      }
    }
  }
}
`}

prompt+=`
Respond ONLY with the JSON structure.
Return ONLY valid JSON.
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
// console.log("prompt:",prompt)
    const aiText = await generatePlanWithFallback(prompt);
    console.log("AI Response Text:", aiText);
    let json = JSON.parse(
      aiText.substring(aiText.indexOf("{"), aiText.lastIndexOf("}") + 1)
    );
    if (oldObject){
  if(reqFor==="workout"){
    oldObject.plan.fitnessPlan.weeklyWorkoutSchedule = json.plan.fitnessPlan.weeklyWorkoutSchedule;
    json =oldObject;
  }
  else if (reqFor==="diet"){
      oldObject.plan.fitnessPlan.dailyDietPlan = json.plan.fitnessPlan.dailyDietPlan;
    json =oldObject;
  }
}

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
    });
    // return res.status(200)
    return res.status(200).json({
      success:true,
      userId,
      plan:json.plan,
    });
    
  }
  else {
    return res.status(405).json({ success: false });
}
} catch (err) {
    console.error("Plan generation failed:", err);

    return res.status(500).json({
      success: false,
      message: "AI generation failed",
    });
  }
}


