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
  const { workoutPlan, user} = useProfile();

  const router = useRouter();
  const [expandedDay, setExpandedDay] = useState(1);
  const [completedExercises, setCompletedExercises] = useState(new Set());
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  console.log("Workout Plan from Context:", workoutPlan);
  console.log("User from Context:", user);
  useEffect(() => {
    setIsHydrated(true);
    const saved = localStorage.getItem('completedExercises');
    if (saved) {
      setCompletedExercises(new Set(JSON.parse(saved)));
    }
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
    setExpandedDay(expandedDay === day ? null : day);
  };

  const handleExerciseComplete = (dayId, exerciseId) => {
    const key = `${dayId}-${exerciseId}`;
    setCompletedExercises((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const totalExercises = Object.entries(workoutPlan).reduce(
  (acc, [, value]) => acc + (value.exercises?.length || 0),
  0
);
console.log("total excersice:",totalExercises)
  if (!isHydrated) {
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
          <div className="flex items-center gap-3 mb-4">
            
            <h1 className="text-3xl font-heading font-bold">
              Your Workout Plan
            </h1>
          </div>
        </div>

        <MotivationalQuote/>

        <div className="space-y-4">
          {Object.entries(workoutPlan).map(([key,value]) => (
            <WorkoutDayCard
              key={getDayNumber(key.toLowerCase())}
              workoutDay={[key,value]}
              isExpanded={expandedDay === getDayNumber(key.toLowerCase())}
              onToggle={() => handleToggleDay(getDayNumber(key.toLowerCase()))}
              onExerciseComplete={handleExerciseComplete}
              completedExercises={completedExercises}
            />
          ))}
        </div>

        <WorkoutStats
          totalDays={7}
          totalExercises={totalExercises}
          currentWeight={`${user?.weight || 'N/A'} kg`}
          location={user?.preferredWorkoutLocation || "Gym"}
        />
      </div>
    </div>
  );
}
