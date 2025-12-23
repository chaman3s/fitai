'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import WorkoutDayCard from '@/components/WorkoutDayCard';
import WorkoutStats from '@/components/WorkoutStats';
import AudioPlayer from '@/components/AudioPlayer';
import PlanActions from '@/components/PlanAction';
import MotivationalQuote from '@/components/MotivationalQuote';

const mockWorkoutPlan = [
  {
    day: 1,
    title: 'Upper Body Strength',
    focus: 'Chest, Shoulders, Triceps',
    duration: '45 min',
    caloriesBurned: '320 kcal',
    exercises: [
      {
        id: 'ex1',
        name: 'Push-ups',
        sets: 3,
        reps: '12-15',
        restTime: '60',
        difficulty: 'Beginner',
        instructions:
          'Start in a plank position with hands shoulder-width apart.\nLower your body until chest nearly touches the floor.\nPush back up to starting position.\nKeep your core engaged throughout the movement.\nMaintain a straight line from head to heels.',
        imageUrl:
          'https://img.rocket.new/generatedImages/rocket_gen_img_1d9390292-1764649132607.png',
        imageAlt:
          'Athletic man performing push-ups on yoga mat in bright gym with proper form',
        equipment: ['Yoga Mat'],
        targetMuscles: ['Chest', 'Triceps', 'Shoulders', 'Core']
      },
      {
        id: 'ex2',
        name: 'Dumbbell Shoulder Press',
        sets: 4,
        reps: '10-12',
        restTime: '90',
        difficulty: 'Intermediate',
        instructions:
          'Sit on a bench with back support.\nHold dumbbells at shoulder height with palms facing forward.\nPress weights overhead until arms are fully extended.\nLower back to starting position with control.\nKeep core tight and avoid arching your back.',
        imageUrl:
          'https://img.rocket.new/generatedImages/rocket_gen_img_1d9390292-1764649132607.png',
        imageAlt:
          'Fit woman performing dumbbell shoulder press exercise on bench in modern gym',
        equipment: ['Dumbbells', 'Bench'],
        targetMuscles: ['Shoulders', 'Triceps', 'Upper Chest']
      },
      {
        id: 'ex3',
        name: 'Tricep Dips',
        sets: 3,
        reps: '10-15',
        restTime: '60',
        difficulty: 'Intermediate',
        instructions:
          'Position hands shoulder-width apart on a stable bench or chair.\nExtend legs forward with heels on the ground.\nLower body by bending elbows to 90 degrees.\nPush back up to starting position.\nKeep elbows close to your body.',
        imageUrl:
          'https://img.rocket.new/generatedImages/rocket_gen_img_11596d5de-1764649130144.png',
        imageAlt:
          'Athletic person doing tricep dips on parallel bars outdoors in park setting',
        equipment: ['Bench', 'Chair'],
        targetMuscles: ['Triceps', 'Shoulders', 'Chest']
      }
    ]
  },
  {
    day: 2,
    title: 'Lower Body Power',
    focus: 'Legs, Glutes, Core',
    duration: '50 min',
    caloriesBurned: '380 kcal',
    exercises: [
      {
        id: 'ex4',
        name: 'Squats',
        sets: 4,
        reps: '12-15',
        restTime: '90',
        difficulty: 'Beginner',
        instructions:
          'Stand with feet shoulder-width apart.\nLower your body by bending knees and hips.\nKeep chest up and weight on heels.\nGo down until thighs are parallel to ground.\nPush through heels to return to start.',
        imageUrl:
          'https://img.rocket.new/generatedImages/rocket_gen_img_155b601f9-1765763464893.png',
        imageAlt:
          'Strong woman performing bodyweight squats with perfect form in fitness studio',
        equipment: ['None'],
        targetMuscles: ['Quadriceps', 'Glutes', 'Hamstrings', 'Core']
      }
    ]
  }
];

const mockQuote = {
  quote: "The only bad workout is the one that didn't happen.",
  author: 'Unknown'
};

export default function WorkoutPlan() {
  const router = useRouter();
  const [expandedDay, setExpandedDay] = useState(1);
  const [completedExercises, setCompletedExercises] = useState(new Set());
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

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

  const totalExercises = mockWorkoutPlan.reduce(
    (acc, day) => acc + day.exercises.length,
    0
  );

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

        <MotivationalQuote {...mockQuote} />

        <AudioPlayer
          onPlayWorkout={() => setIsAudioPlaying(!isAudioPlaying)}
          isPlaying={isAudioPlaying}
        />

        <div className="space-y-4">
          {mockWorkoutPlan.map((day) => (
            <WorkoutDayCard
              key={day.day}
              workoutDay={day}
              isExpanded={expandedDay === day.day}
              onToggle={() => handleToggleDay(day.day)}
              onExerciseComplete={handleExerciseComplete}
              completedExercises={completedExercises}
            />
          ))}
        </div>

        <WorkoutStats
          totalDays={mockWorkoutPlan.length}
          totalExercises={totalExercises}
          avgDuration="45 min"
          totalCalories="1,120 kcal"
          difficulty="Intermediate"
          location="Gym"
        />

        <PlanActions
          onRegenerate={() => router.push('/plan-generation')}
          onExportPDF={() => alert('Export PDF')}
          onShare={() => alert('Share plan')}
        />
      </div>
    </div>
  );
}
