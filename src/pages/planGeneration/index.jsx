import AdvancedOptionsPanel from "@/components/AdvancedOption";

export default function GenerationPlan() {
const [advancedSettings, setAdvancedSettings] = useState(advancedOptions);
const advancedOptions= [
  {
    id: "equipment",
    label: "Include Equipment-Free Alternatives",
    type: "toggle",
    value: false
  },
  {
    id: "intensity",
    label: "Workout Intensity Level",
    type: "select",
    options: ["Low", "Moderate", "High", "Variable"],
    value: "Moderate"
  },
  {
    id: "rest-days",
    label: "Include Rest Days",
    type: "toggle",
    value: true
  },
  {
    id: "meal-timing",
    label: "Meal Timing Preference",
    type: "select",
    options: ["Standard", "Intermittent Fasting", "Frequent Small Meals"],
    value: "Standard"
  },
  {
    id: "supplements",
    label: "Include Supplement Recommendations",
    type: "toggle",
    value: false
  }
];

const generationStages= [
  {
    id: "stage-1",
    label: "Analyzing your profile and preferences",
    icon: "UserIcon",
    status: "pending"
  },
  {
    id: "stage-2",
    label: "Generating personalized workout routines",
    icon: "FireIcon",
    status: "pending"
  },
  {
    id: "stage-3",
    label: "Creating customized meal plans",
    icon: "HeartIcon",
    status: "pending"
  },
  {
    id: "stage-4",
    label: "Adding lifestyle tips and recommendations",
    icon: "SparklesIcon",
    status: "pending"
  },
  {
    id: "stage-5",
    label: "Finalizing your complete fitness plan",
    icon: "CheckCircleIcon",
    status: "pending"
  }
];

const motivationalTips = [
  "Consistency is key! Even small daily efforts compound into major results over time.",
  "Your body can stand almost anything. It's your mind you have to convince.",
  "The only bad workout is the one that didn't happen. Every step counts!",
  "Progress, not perfection. Focus on being better than yesterday.",
  "Your fitness journey is unique. Don't compare your chapter 1 to someone else's chapter 20."
];

const WorkoutDay = [
  {
    day: "Monday - Chest & Triceps",
    exercises: ["Bench Press - 4 sets x 10 reps", "Incline Dumbbell Press - 3 sets x 12 reps", "Tricep Dips - 3 sets x 15 reps"],
    duration: "45 minutes"
  },
  {
    day: "Tuesday - Back & Biceps",
    exercises: ["Pull-ups - 4 sets x 8 reps", "Barbell Rows - 4 sets x 10 reps", "Bicep Curls - 3 sets x 12 reps"],
    duration: "45 minutes"
  },
  {
    day: "Wednesday - Legs & Core",
    exercises: ["Squats - 4 sets x 12 reps", "Lunges - 3 sets x 10 reps each leg", "Plank - 3 sets x 60 seconds"],
    duration: "50 minutes"
  }
];

const mockMealPlans = [
  {
    meal: "Breakfast",
    items: ["Oatmeal with berries and almonds", "Greek yogurt", "Green tea"],
    calories: "450 kcal"
  },
  {
    meal: "Lunch",
    items: ["Grilled chicken salad with quinoa", "Mixed vegetables", "Olive oil dressing"],
    calories: "550 kcal"
  },
  {
    meal: "Dinner",
    items: ["Baked salmon with sweet potato", "Steamed broccoli", "Brown rice"],
    calories: "600 kcal"
  },
  {
    meal: "Snacks",
    items: ["Apple with peanut butter", "Protein shake", "Mixed nuts"],
    calories: "300 kcal"
  }
]

 const handleAdvancedOptionUpdate = (id, value) => {
    setAdvancedSettings(prev =>
      prev.map(option =>
        option.id === id ? { ...option, value } : option
      )
    );
  };
return (
<AdvancedOptionsPanel options={advancedSettings} onUpdate={handleAdvancedOptionUpdate}/>
);    
}