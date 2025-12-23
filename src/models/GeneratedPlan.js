
import mongoose from "mongoose";

const GeneratedPlanSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    input: {
      profile: Object,
      preferences: Object,
    },

    output: {
      workoutPlan: Object,
      dietPlan: Object,
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
