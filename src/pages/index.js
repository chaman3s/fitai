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
  // 🔹 API DATA STATE
  const [activities, setActivities] = useState([]);
  const [upcomingWorkouts, setUpcomingWorkouts] = useState([]);

  const [isHydrated, setIsHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);
  useEffect(() => {
    if (!isHydrated) return;

    const fetchActivities = async () => {
      try {
        const res = await fetch('/api/activities', {
          credentials: 'include',
        });

        if (!res.ok) throw new Error('Failed to fetch activities');
        const data = await res.json();
        setActivities(data);
      } catch (err) {
        console.error(err);
        setNotification('Failed to load activities');
      }
    };

    fetchActivities();
  }, [isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;

    const fetchWorkouts = async () => {
      try {
        const res = await fetch('/api/upcoming', {
          credentials: 'include',
        });

        if (!res.ok) throw new Error('Failed to fetch workouts');
        const data = await res.json();
        setUpcomingWorkouts(data);
      } catch (err) {
        console.error(err);
        setNotification('Failed to load workouts');
      }
    };

    fetchWorkouts();
  }, [isHydrated]);

  // 🔔 UI HANDLERS (unchanged)
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

  // 🟡 Skeleton during hydration
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse space-y-8">
          <div className="h-32 bg-muted rounded-xl" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-96 bg-muted rounded-xl" />
            <div className="h-96 bg-muted rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 🔔 Notifications */}
        {notification && (
          <div className="fixed top-24 right-4 z-50 bg-card border shadow-xl rounded-lg p-4">
            <p className="text-sm font-medium">{notification}</p>
          </div>
        )}

        {/* ⏳ Loader */}
        {isLoading && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 flex items-center justify-center">
            <div className="bg-card rounded-xl p-8 shadow-2xl">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="font-medium">Generating your personalized plan...</p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-8">
          <p className="text-lg text-muted-foreground">
            Here's your fitness journey overview for today
          </p>

          <MotivationalQuote />
          <AITipsMotivation onError={handleAITipError} />
          <QuickActions />

          {/* 🔹 Plans */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PlanCard
              type="workout"
              title="Workout Plan"
              description="Your personalized exercise routine."
              todayHighlight="Full Body Strength Training"
              progress={65}
              imageUrl="https://images.pexels.com/photos/416809/pexels-photo-416809.jpeg"
              detailsPath="/workout-plan-details"
              onPlayAudio={() => handlePlayAudio('Workout Plan')}
              onExportPDF={() => handleExportPDF('Workout Plan')}
              onRegenerate={() => handleRegenerate('Workout Plan')}
            />

            <PlanCard
              type="diet"
              title="Diet Plan"
              description="Nutritionally balanced meal plan."
              todayHighlight="High Protein Day"
              progress={72}
              imageUrl="https://images.pixabay.com/photo/2017/10/09/19/29/eat-2834549_1280.jpg"
              detailsPath="/diet-plan-details"
              onPlayAudio={() => handlePlayAudio('Diet Plan')}
              onExportPDF={() => handleExportPDF('Diet Plan')}
              onRegenerate={() => handleRegenerate('Diet Plan')}
            />
          </div>

          {/* 🔹 Goals */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <GoalProgress goalType="Weight Loss" currentValue={8.5} targetValue={15} unit="kg" icon="⚖️" />
            <GoalProgress goalType="Muscle Gain" currentValue={3.2} targetValue={5} unit="kg" icon="💪" />
            <GoalProgress goalType="Body Fat" currentValue={4.5} targetValue={8} unit="%" icon="📉" />
          </div>

          {/* 🔹 API DATA */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ActivitySummary activities={activities} />
            <UpcomingWorkouts workouts={upcomingWorkouts} />
          </div>
        </div>
      </div>
    </div>
  );
}
