'use client';
import { useState, useEffect } from 'react';
import PlanCard from '@/components/PlanCard';
import MotivationalQuote from '@/components/MotivationalQuote';
import GoalProgress from '@/components/GoalProgress';
import ActivitySummary from '@/components/ActivitySummary';
import UpcomingWorkouts from '@/components/UpcomingWorkouts';
import QuickActions from '@/components/QuickActions';
import AITipsMotivation from '@/components/AITipsMotivation';


export default function Home() {
  const mockActivities = [
  {
    id: 1,
    type: 'workout',
    title: 'Morning Cardio Session',
    time: '06:00 AM',
    status: 'completed',
    icon: '🏃',
  },
  {
    id: 2,
    type: 'meal',
    title: 'Protein-Rich Breakfast',
    time: '08:00 AM',
    status: 'completed',
    icon: '🍳',
  },
  {
    id: 3,
    type: 'water',
    title: 'Hydration Goal (2L)',
    time: 'Throughout Day',
    status: 'pending',
    icon: '💧',
  },
  {
    id: 4,
    type: 'workout',
    title: 'Strength Training',
    time: '05:00 PM',
    status: 'pending',
    icon: '💪',
  },
  {
    id: 5,
    type: 'meal',
    title: 'Balanced Dinner',
    time: '07:30 PM',
    status: 'pending',
    icon: '🥗',
  },
];

const mockUpcomingWorkouts = [
  {
    id: 1,
    day: 'Tomorrow',
    date: '12/21/2025',
    exercises: 8,
    duration: 45,
    difficulty: 'Intermediate',
    focus: 'Upper Body Strength',
  },
  {
    id: 2,
    day: 'Sunday',
    date: '12/22/2025',
    exercises: 6,
    duration: 30,
    difficulty: 'Beginner',
    focus: 'Active Recovery & Stretching',
  },
  {
    id: 3,
    day: 'Monday',
    date: '12/23/2025',
    exercises: 10,
    duration: 60,
    difficulty: 'Advanced',
    focus: 'Full Body HIIT',
  },
];

  const [isHydrated, setIsHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handlePlayAudio = (type) => {
    setNotification(`Playing ${type} audio narration...`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleExportPDF = (type) => {
    setNotification(`Exporting ${type} as PDF...`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleRegenerate = (type) => {
    setIsLoading(true);
    setNotification(`Regenerating ${type}...`);
    setTimeout(() => {
      setIsLoading(false);
      setNotification(`${type} regenerated successfully!`);
      setTimeout(() => setNotification(null), 3000);
    }, 2000);
  };

  const handleAITipError = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-32 bg-muted rounded-xl" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-96 bg-muted rounded-xl" />
              <div className="h-96 bg-muted rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {notification && (
          <div className="fixed top-24 right-4 z-50 bg-card border border-border shadow-warm-xl rounded-lg p-4 animate-slide-in-right">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <p className="text-sm font-medium text-foreground">{notification}</p>
            </div>
          </div>
        )}
        {isLoading && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 flex items-center justify-center">
            <div className="bg-card rounded-xl p-8 shadow-warm-2xl">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="font-medium text-foreground">
                  Generating your personalized plan...
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="space-y-8">
          <div>
        
            <p className="text-lg text-muted-foreground">
              Here's your fitness journey overview for today
            </p>
          </div>

          <MotivationalQuote />
          <AITipsMotivation onError={handleAITipError} />
          <QuickActions />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PlanCard
              type="workout"
              title="Workout Plan"
              description="Your personalized exercise routine designed to help you achieve your fitness goals efficiently."
              todayHighlight="Full Body Strength Training - 8 exercises, 45 minutes"
              progress={65}
              imageUrl="https://images.pexels.com/photos/416809/pexels-photo-416809.jpeg"
              imageAlt="Workout"
              detailsPath="/workout-plan-details"
              onPlayAudio={() => handlePlayAudio('Workout Plan')}
              onExportPDF={() => handleExportPDF('Workout Plan')}
              onRegenerate={() => handleRegenerate('Workout Plan')}
            />

            <PlanCard
              type="diet"
              title="Diet Plan"
              description="Nutritionally balanced meal plan tailored to your dietary preferences and fitness objectives."
              todayHighlight="High Protein Day - 2,200 calories, 180g protein, 5 meals"
              progress={72}
              imageUrl="https://images.pixabay.com/photo/2017/10/09/19/29/eat-2834549_1280.jpg"
              imageAlt="Diet"
              detailsPath="/diet-plan-details"
              onPlayAudio={() => handlePlayAudio('Diet Plan')}
              onExportPDF={() => handleExportPDF('Diet Plan')}
              onRegenerate={() => handleRegenerate('Diet Plan')}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <GoalProgress goalType="Weight Loss" currentValue={8.5} targetValue={15} unit="kg" icon="⚖️" />
            <GoalProgress goalType="Muscle Gain" currentValue={3.2} targetValue={5} unit="kg" icon="💪" />
            <GoalProgress goalType="Body Fat" currentValue={4.5} targetValue={8} unit="%" icon="📉" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ActivitySummary activities={mockActivities} />
            <UpcomingWorkouts workouts={mockUpcomingWorkouts} />
          </div>
        </div>
      </div>
    </div>
  );
}


