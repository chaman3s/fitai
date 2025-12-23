'use client';

import { useState } from 'react';
import Icon from '@/components/Icon';
import AppImage from '@/components/AppImage';

export default function WorkoutDayCard({
  workoutDay,
  isExpanded,
  onToggle,
  onExerciseComplete,
  completedExercises,
}) {
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [restTimer, setRestTimer] = useState(null);

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
                {workoutDay.day}
              </span>
            </div>
            <div className="text-left">
              <h3 className="text-lg font-heading font-semibold">
                {workoutDay.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {workoutDay.focus}
              </p>
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
              {workoutDay.exercises.map((exercise) => {
                const isCompleted = completedExercises.has(
                  `${workoutDay.day}-${exercise.id}`
                );
                const isResting = restTimer?.exerciseId === exercise.id;

                return (
                  <div
                    key={exercise.id}
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
                          onExerciseComplete(workoutDay.day, exercise.id)
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
                          <span
                            className={`px-2 py-1 text-xs rounded border ${getDifficultyColor(
                              exercise.difficulty
                            )}`}
                          >
                            {exercise.difficulty}
                          </span>
                        </div>

                        <div className="text-sm text-muted-foreground mb-3">
                          {exercise.sets} sets • {exercise.reps} reps •{' '}
                          {exercise.restTime}s rest
                        </div>

                        <div className="flex gap-2 flex-wrap mb-3">
                          {exercise.equipment.map((item, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-muted text-xs rounded"
                            >
                              {item}
                            </span>
                          ))}
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedExercise(exercise)}
                            className="px-3 py-1.5 bg-primary/10 text-primary rounded text-sm"
                          >
                            View Details
                          </button>
                          <button
                            disabled={isResting}
                            onClick={() =>
                              startRestTimer(exercise.id, exercise.restTime)
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
      {selectedExercise && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedExercise(null)}
        >
          <div
            className="bg-card rounded-xl max-w-2xl w-full overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 space-y-6">
              <div className="h-64 bg-muted rounded overflow-hidden">
                <AppImage
                  src={selectedExercise.imageUrl}
                  alt={selectedExercise.imageAlt}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h4 className="font-semibold mb-2">Instructions</h4>
                <p className="whitespace-pre-line">
                  {selectedExercise.instructions}
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Target Muscles</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedExercise.targetMuscles.map((m, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-primary/10 text-primary rounded"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Equipment</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedExercise.equipment.map((e, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-muted rounded"
                    >
                      {e}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
