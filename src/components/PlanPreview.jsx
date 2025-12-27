'use client';

import { useState } from 'react';
import Icon from '@/components/Icon';

export default function PlanPreviewCard({
  type,
  workoutDays = {},
  mealPlans = {},
  onConfirm,
  onRegenerate,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [regenerate, setRegenerate] = useState(false);

  const handleRegenerate = async () => {
    try {
      setRegenerate(true);
      await onRegenerate(); // ✅ function call
    } finally {
      setRegenerate(false);
    }
  };

  return (
    <div className="bg-card rounded-xl shadow-warm-md border border-border overflow-hidden">
      {/* HEADER */}
      <div className="p-6 bg-gradient-to-r from-primary/5 to-secondary/5 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg">
              <Icon
                name={type === 'workout' ? 'FireIcon' : 'HeartIcon'}
                variant="solid"
                size={24}
                className="text-white"
              />
            </div>

            <div>
              <h3 className="text-xl font-bold">
                {type === 'workout'
                  ? 'Workout Plan Preview'
                  : 'Diet Plan Preview'}
              </h3>

              <p className="text-sm text-muted-foreground">
                {regenerate
                  ? 'Regenerating...'
                  : type === 'workout'
                  ? `${Object.keys(workoutDays).length} workout days`
                  : `${Object.keys(mealPlans).length} diet days`}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsExpanded(v => !v)}
            className="p-2 hover:bg-muted rounded-lg"
          >
            <Icon
              name={isExpanded ? 'ChevronUpIcon' : 'ChevronDownIcon'}
              variant="outline"
              size={24}
            />
          </button>
        </div>
      </div>

      {/* BODY */}
      {isExpanded && (
        <div className="p-6 space-y-4">
          {regenerate ? (
            <div className="p-4 bg-muted/50 rounded-lg text-center">
              <h4 className="font-medium">🤖 AI is regenerating your plan...</h4>
            </div>
          ) : (
            <>
              {/* WORKOUT PLAN */}
              {type === 'workout' && (
                <div className="space-y-3">
                  {Object.entries(workoutDays).map(([dayKey, day]) => {
                    const exercises =
                      day.main_workout || day.exercises || [];

                    const isRestDay =
                      day.workoutName === 'Rest' ||
                      day.focus === 'Rest' ||
                      exercises.length === 0;

                    return (
                      <div key={dayKey} className="p-4 bg-muted/50 rounded-lg">
                        <div className="flex justify-between mb-2">
                          <h4 className="font-medium capitalize">{dayKey}</h4>
                          <span className="text-sm text-muted-foreground">
                            {day.workoutName || day.focus}
                          </span>
                        </div>

                        {isRestDay ? (
                          <p className="text-sm text-muted-foreground">
                            Rest & recovery day
                          </p>
                        ) : (
                          <ul className="space-y-1">
                            {exercises.map((ex, idx) => (
                              <li
                                key={idx}
                                className="flex items-center gap-2 text-sm text-muted-foreground"
                              >
                                <Icon
                                  name="CheckCircleIcon"
                                  variant="solid"
                                  size={16}
                                  className="text-primary"
                                />
                                <span>
                                  {ex.name || ex.exercise}
                                  {ex.sets && ` • ${ex.sets} sets`}
                                  {ex.reps && ` × ${ex.reps} reps`}
                                  {ex.restTime && ` • Rest ${ex.restTime}`}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* DIET PLAN */}
              {type === 'diet' && (
                <div className="space-y-4">
                  {Object.entries(mealPlans).map(([day, meals]) => (
                    <div key={day} className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold capitalize mb-2">{day}</h4>
                      {Object.entries(meals).map(([mealName, meal]) => (
                        <div
                          key={mealName}
                          className="flex justify-between text-sm"
                        >
                          <span className="font-medium">{mealName}</span>
                          <span className="text-muted-foreground">
                            {meal.name}
                          </span>
                          <span className="text-primary">
                            {meal.calories} kcal
                          </span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              )}

              {/* ACTIONS */}
              <div className="flex gap-3 pt-4 border-t">
                <button
                  onClick={handleRegenerate}
                  disabled={regenerate}
                  className="flex-1 flex justify-center gap-2 px-6 py-3 bg-muted rounded-lg"
                >
                  <Icon name="ArrowPathIcon" size={20} />
                  Regenerate
                </button>

                <button
                  onClick={onConfirm}
                  className="flex-1 flex justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg"
                >
                  <Icon name="CheckIcon" size={20} />
                  Confirm Plan
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
