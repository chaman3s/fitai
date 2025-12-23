import mongoose from "mongoose";

const HealthInformationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, 
    },
    currentStressLevel: {
      type: String,
      enum: ["no stress","very low", "low","moderate", "high","very high"],
      default: "no stress",
    },
    averageSleepHours: {
      type: Number,
      min: 0,
      max: 24,
      default: 7.5,
    },
    dailyWaterIntake: {
      type: Number,
      min: 0,
      max: 15,
      default: 3,
    },


    isPrivate: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

export default mongoose.model(
  "HealthInformation",
  HealthInformationSchema
);
