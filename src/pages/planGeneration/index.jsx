'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProfileSummaryCard from '@/components/ProfileSummary';
import CustomizationCard from '@/components/CustomizationCard';
import AdvancedOptionsPanel from '@/components/AdvancedOption';
import GenerationProgress from '@/components/GenerationProgress';
import PlanPreviewCard from '@/components/PlanPreview';
import ErrorMessage from '@/components/ErrorMessage';
import Icon from '@/components/Icon';
import { useProfile } from "@/contexts/profileContext";
import datajson from '@/assets/data.json'
import TopLineLoader from '@/components/TopLineLoader';
import { set } from 'mongoose';

console.log("data:",datajson)
const workoutDurationOptions = [
  {
    id: 'duration-1',
    label: '30 Minutes',
    value: '30',
    icon: 'ClockIcon',
    description: 'Quick and efficient workouts'
  },
  {
    id: 'duration-2',
    label: '45 Minutes',
    value: '45',
    icon: 'ClockIcon',
    description: 'Balanced workout sessions'
  },
  {
    id: 'duration-3',
    label: '60 Minutes',
    value: '60',
    icon: 'ClockIcon',
    description: 'Comprehensive training'
  }
];

const mealComplexityOptions = [
  {
    id: 'complexity-1',
    label: 'Simple',
    value: 'simple',
    icon: 'SparklesIcon',
    description: 'Easy-to-prepare meals'
  },
  {
    id: 'complexity-2',
    label: 'Moderate',
    value: 'moderate',
    icon: 'FireIcon',
    description: 'Balanced preparation time'
  },
  {
    id: 'complexity-3',
    label: 'Gourmet',
    value: 'gourmet',
    icon: 'StarIcon',
    description: 'Elaborate meal preparations'
  }
];

const focusAreaOptions = [
  {
    id: 'focus-1',
    label: 'Full Body',
    value: 'full-body',
    icon: 'UserIcon',
    description: 'Comprehensive muscle engagement'
  },
  {
    id: 'focus-2',
    label: 'Upper Body',
    value: 'upper-body',
    icon: 'HandRaisedIcon',
    description: 'Arms, chest, and back focus'
  },
  {
    id: 'focus-3',
    label: 'Lower Body',
    value: 'lower-body',
    icon: 'BoltIcon',
    description: 'Legs and glutes emphasis'
  },
  {
    id: 'focus-4',
    label: 'Core',
    value: 'core',
    icon: 'HeartIcon',
    description: 'Abdominal and stability training'
  },
  {
    id: 'focus-5',
    label: 'Cardio',
    value: 'cardio',
    icon: 'FireIcon',
    description: 'Endurance and fat burning'
  },
  {
    id: 'focus-6',
    label: 'Flexibility',
    value: 'flexibility',
    icon: 'SparklesIcon',
    description: 'Stretching and mobility'
  }
];

const advancedOptions = [
  {
    id: 'equipment',
    label: 'Include Equipment-Free Alternatives',
    type: 'toggle',
    value: false
  },
  {
    id: 'intensity',
    label: 'Workout Intensity Level',
    type: 'select',
    options: ['Low', 'Moderate', 'High', 'Variable'],
    value: 'Moderate'
  },
  {
    id: 'rest-days',
    label: 'Include Rest Days',
    type: 'toggle',
    value: true
  },
  {
    id: 'meal-timing',
    label: 'Meal Timing Preference',
    type: 'select',
    options: ['Standard', 'Intermittent Fasting', 'Frequent Small Meals'],
    value: 'Standard'
  },
  {
    id: 'supplements',
    label: 'Include Supplement Recommendations',
    type: 'toggle',
    value: false
  }
];

const generationStages = [
  {
    id: 'stage-1',
    label: 'Analyzing your profile and preferences',
    icon: 'UserIcon',
    status: 'pending'
  },
  {
    id: 'stage-2',
    label: 'Generating personalized workout routines',
    icon: 'FireIcon',
    status: 'pending'
  },
  {
    id: 'stage-3',
    label: 'Creating customized meal plans',
    icon: 'HeartIcon',
    status: 'pending'
  },
  {
    id: 'stage-4',
    label: 'Adding lifestyle tips and recommendations',
    icon: 'SparklesIcon',
    status: 'pending'
  },
  {
    id: 'stage-5',
    label: 'Finalizing your complete fitness plan',
    icon: 'CheckCircleIcon',
    status: 'pending'
  }
];

const motivationalTips = [
  'Consistency is key! Even small daily efforts compound into major results over time.',
  "Your body can stand almost anything. It's your mind you have to convince.",
  "The only bad workout is the one that didn't happen. Every step counts!",
  'Progress, not perfection. Focus on being better than yesterday.',
  "Your fitness journey is unique. Don't compare your chapter 1 to someone else's chapter 20."
];

export default function GenerationPlan() {
  const { user } = useProfile();
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [workoutDuration, setWorkoutDuration] = useState('45');
  const [mealComplexity, setMealComplexity] = useState('moderate');
  const [focusArea, setFocusArea] = useState('full-body');
  const [advancedSettings, setAdvancedSettings] = useState(advancedOptions);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState(null);
  const [currentStages, setCurrentStages] = useState(generationStages);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [mealPlan, setMealPlan] = useState(null);
  const [obj,setObj ]= useState({});
  
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleAdvancedOptionUpdate = (id, value) => {
    setAdvancedSettings(prev =>
      prev.map(option => (option.id === id ? { ...option, value } : option))
    );
  };

  const handleEditProfile = () => {
    router.push('/userProfileSettings');
  };

const handleGeneratePlans = async (reqFor) => {
  try {
    setIsGenerating(true);
    setGenerationError(null);
    setShowPreview(false);

    let reqObj = {
      userId: user._id,
      profile: user,
      workoutDuration,
      mealComplexity,
      focusArea,
      advancedSettings,
      reqFor,
    };

    if (reqFor === "workout" || reqFor === "diet") {
      reqObj.oldObject = { plan: obj.plan };
    }

    const res = await fetch("/api/planGeneration", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqObj),
    });
    // let data = datajson;
    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error("Plan generation failed");
    }

    setObj(data);

    const plan =
      data.plan.fitnessPlan || data.plan.FitnessPlan;

    if (plan) {
      setWorkoutPlan(
        plan.weeklyWorkoutSchedule ||
        plan.weekly_workout_schedule
      );
      setMealPlan(
        plan.dailyDietPlan ||
        plan.daily_diet_plan
      );
    }

    setShowPreview(true);
  } catch (err) {
    setGenerationError(err.message);
  } finally {
    setIsGenerating(false);
  }
};

  const handleCancelError = () => {
    setGenerationError(null);
  };

  const handleConfirmPlan = () => {
    
    router.push('/');
  };



  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
      <>
    <TopLineLoader loading={isGenerating} />
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isGenerating && !generationError && !showPreview && (
          <div className="space-y-6">

            {user && (
  <ProfileSummaryCard
    profile={user}
    onEdit={handleEditProfile}
  />
)}

            <CustomizationCard
              title="Workout Duration"
              description="Choose your preferred workout session length"
              options={workoutDurationOptions}
              selectedValue={workoutDuration}
              onSelect={setWorkoutDuration}
              icon="ClockIcon"
            />

            <CustomizationCard
              title="Meal Complexity"
              description="Select your cooking and meal preparation preference"
              options={mealComplexityOptions}
              selectedValue={mealComplexity}
              onSelect={setMealComplexity}
              icon="SparklesIcon"
            />

            <CustomizationCard
              title="Focus Area"
              description="Choose your primary training focus for this plan"
              options={focusAreaOptions}
              selectedValue={focusArea}
              onSelect={setFocusArea}
              icon="FireIcon"
            />

            <AdvancedOptionsPanel
              options={advancedSettings}
              onUpdate={handleAdvancedOptionUpdate}
            />

            <div className="flex justify-center pt-4">
              <button
                onClick={() => handleGeneratePlans("all")}
                className="flex items-center gap-3 px-12 py-4 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white rounded-xl transition-smooth focus:outline-none focus:ring-3 focus:ring-primary shadow-warm-lg text-lg font-semibold"
              >
                <Icon name="SparklesIcon" variant="solid" size={24} />
                Generate My Plans
              </button>
            </div>
          </div>
        )}
        {isGenerating && (
          <GenerationProgress
            stages={currentStages}
            currentTip={motivationalTips[currentTipIndex]}
          />
        )}

        {generationError && (
          <ErrorMessage
            message={generationError}
            onRetry={()=>handleGeneratePlans("all")}
            onCancel={handleCancelError}
          />
        )}

        {showPreview && (
          <div className="space-y-6">
            <PlanPreviewCard
              type="workout"
              workoutDays={ workoutPlan}
              onConfirm={handleConfirmPlan}
              onRegenerate={() => handleGeneratePlans("workout")}
            />

            <PlanPreviewCard
              type="diet"
              mealPlans={ mealPlan}
              onConfirm={handleConfirmPlan}
              onRegenerate={() => handleGeneratePlans("diet")}
            />
          </div>
        )}
      </div>
    </div>
  </>
  );
}
