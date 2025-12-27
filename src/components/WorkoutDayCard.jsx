'use client';

import { useId, useState } from 'react';
import Icon from '@/components/Icon';
import AppImage from '@/components/AppImage';
import { getDayNumber } from '@/lib/utils';


export default function WorkoutDayCard({
  workoutDay,
  isExpanded,
  onToggle,
  onExerciseComplete,
  completedExercises,

})
 {
  const uID= useId()
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [restTimer, setRestTimer] = useState(null);
console.log("WorkoutDayCard props:", { workoutDay, isExpanded, onToggle, onExerciseComplete, completedExercises });

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function getBodyCategory(muscle) {
  const map = {
    chest: "upper body",
    back: "upper body",
    shoulders: "upper body",
    biceps: "upper body",
    triceps: "upper body",

    legs: "lower body",
    quads: "lower body",
    hamstrings: "lower body",
    calves: "lower body",
    glutes: "lower body",
    rest: "rest day",
    abs:  "core",
  };
  return capitalizeFirstLetter(map[muscle.toLowerCase()]) || "unknown";
}
const startRestTimer = (exerciseId, restTime) => {
    const seconds = parseInt(restTime);
    setRestTimer({ exerciseId, timeLeft: seconds });
    
    const interval = setInterval(() => {
      setRestTimer((prev) => {
        if (!prev || prev.timeLeft <= 1) {
          clearInterval(interval);
          return null;
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-success/10 text-success border-success/20';
      case 'Intermediate':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'Advanced':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <>
      <div className="bg-card rounded-xl shadow-warm-md border border-border overflow-hidden transition-smooth hover:shadow-warm-lg">
        {/* Header */}
        <button
          onClick={onToggle}
          aria-expanded={isExpanded}
          className="w-full px-6 py-5 flex items-center justify-between hover:bg-muted/50 transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-primary to-secondary rounded-lg">
              <span className="text-xl font-heading font-bold text-white">
                {getDayNumber(workoutDay[0].toLowerCase()) + 1}
              </span>
            </div>
            <div className="text-left">
              <h3 className="text-lg font-heading font-semibold">
                {workoutDay[1].workoutName}
              </h3> 
            </div>
          </div>

          <Icon
            name="ChevronDownIcon"
            variant="outline"
            size={24}
            className={`transition-smooth ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </button>

        {/* Content */}
        {isExpanded && (
          <div className="px-6 pb-6 space-y-4">
            <div className="space-y-3">
              {workoutDay[1].exercises.map((exercise,index) => {
                const isCompleted = completedExercises.has(
                  `${getDayNumber(workoutDay[0].toLowerCase())}-${index}`
                );
                const isResting = restTimer?.exerciseId === uID+index;

                return (
                  <div
                    key={index}
                    className={`rounded-lg border p-4 transition ${
                      isCompleted
                        ? 'bg-success/5 border-success/30'
                        : 'border-border hover:border-primary/30'
                    }`}
                  >
                    <div className="flex gap-3">
                      {/* Checkbox */}
                      <button
                        onClick={() =>
                          onExerciseComplete(getDayNumber(workoutDay[0].toLowerCase()), index)
                        }
                        className={`w-6 h-6 border-2 rounded-md flex items-center justify-center ${
                          isCompleted
                            ? 'bg-success border-success'
                            : 'border-muted-foreground'
                        }`}
                      >
                        {isCompleted && (
                          <Icon
                            name="CheckIcon"
                            variant="solid"
                            size={16}
                            className="text-white"
                          />
                        )}
                      </button>

                      {/* Info */}
                      <div className="flex-1">
                        <div className="flex justify-between mb-2">
                          <h4 className="font-semibold">{exercise.name}</h4>
                          
                        </div>

                        <div className="text-sm text-muted-foreground mb-3">
                          {exercise.sets} sets • {exercise.reps} reps •{' '}
                          {exercise.restTime}s rest
                        </div>
                        <div className="flex gap-2">
                          <button
                            disabled={isResting}
                            onClick={() =>
                              startRestTimer(uID+index, exercise.restTime)
                            }
                            className="px-3 py-1.5 bg-secondary/10 text-secondary rounded text-sm disabled:opacity-50"
                          >
                            {isResting
                              ? `${restTimer.timeLeft}s`
                              : 'Start Timer'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
    </>
  );
}
