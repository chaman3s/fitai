import mongoose from "mongoose";

const GeneratedPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
     input: {
      profile: Object,
      workoutDuration: String,
      mealComplexity: String,
      focusArea: String,
      advancedSettings: Object,
    },
    output: {
      type: Object,
      required: true,
    },


    model: {
      type: String,
      default: "gemini-1.5-pro",
    },
  },
  { timestamps: true }
);

export default mongoose.models.GeneratedPlan ||
  mongoose.model("GeneratedPlan", GeneratedPlanSchema);
