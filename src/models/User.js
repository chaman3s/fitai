import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    age:{
        type: Number,

    },
    gender:{
        type: String,
    },
    height:{
        type: String,
    },
    weight:{
        type: String,
    },
    fitnessGoals:{
        type: String,
    },
    fitnessLavel:{
        type: String,
    },
    preferredWorkoutLocation:{
        type: String,
  },
  availableEquipment:{
        type: [String],  
       default: [],
  },
  dietType:{
         type: String,  
  },
  foodAllergies:{
        type: [String],  
       default: [],
  },
  dietaryRestrictions:{
        type: [String],  
       default: [],
  },
  MealFrequency: {
    type: Number,
},
themePreference: {
    type: String,
    enum: ['light', 'dark',],
    default: 'dark',
 
},
  },
  { timestamps: true }
);


const User =
  mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
