'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import WorkoutDayCard from '@/components/WorkoutDayCard';
import WorkoutStats from '@/components/WorkoutStats';
import AudioPlayer from '@/components/AudioPlayer';
import PlanActions from '@/components/PlanAction';
import MotivationalQuote from '@/components/MotivationalQuote';
import { useProfile } from "@/contexts/profileContext";
import { getDayNumber } from '@/lib/utils';

export default function WorkoutPlan() {
  const {
    workoutPlan,
    user,
    refetchPlan,
    refetchProfile
  } = useProfile();

  const router = useRouter();

  const [expandedDay, setExpandedDay] = useState(1);
  const [completedExercises, setCompletedExercises] = useState(new Set());
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    refetchPlan();
    refetchProfile();

    const saved = localStorage.getItem('completedExercises');
    if (saved) {
      setCompletedExercises(new Set(JSON.parse(saved)));
    }

    setIsHydrated(true);
  }, []);


  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(
        'completedExercises',
        JSON.stringify(Array.from(completedExercises))
      );
    }
  }, [completedExercises, isHydrated]);


  const handleToggleDay = (day) => {
    setExpandedDay(prev => (prev === day ? null : day));
  };

  const handleExerciseComplete = (dayId, exerciseId) => {
    const key = `${dayId}-${exerciseId}`;
    setCompletedExercises(prev => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const totalExercises = Object.entries(workoutPlan || {}).reduce(
    (acc, [, value]) => acc + (value?.exercises?.length || 0),
    0
  );

  if (!isHydrated || !workoutPlan || Object.keys(workoutPlan).length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading workout plan...</p>
        </div>
      </div>
    );
  }

  
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-7xl mx-auto px-4 py-8">

        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold">
            Your Workout Plan
          </h1>
        </div>

        <MotivationalQuote />
        <div className="space-y-4">
          {Object.entries(workoutPlan).map(([key, value]) => {
            const dayNumber = getDayNumber(key.toLowerCase());

            return (
              <WorkoutDayCard
                key={dayNumber}
                workoutDay={[key, value]}
                isExpanded={expandedDay === dayNumber}
                onToggle={() => handleToggleDay(dayNumber)}
                onExerciseComplete={handleExerciseComplete}
                completedExercises={completedExercises}
              />
            );
          })}
        </div>

        {/* STATS */}
        <WorkoutStats
          totalDays={7}
          totalExercises={totalExercises}
          currentWeight={`${user?.weight ?? 'N/A'} kg`}
          location={user?.preferredWorkoutLocation ?? "Gym"}
        />

      </div>
    </div>
  );
}
