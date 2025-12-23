import mongoose from "mongoose";

const UpcomingWorkoutSchema = new mongoose.Schema(
  {
    day: {
      type: String,
      required: true,
    },
    date: {
      type: String, 
      required: true,
    },
    exercises: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number, // minutes
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },
    focus: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const UpcomingWorkout =
  mongoose.models.UpcomingWorkout ||
  mongoose.model("UpcomingWorkout", UpcomingWorkoutSchema);

export default UpcomingWorkout;
