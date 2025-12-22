'use client';

import { useState } from 'react';
import Icon from '@/components/Icon';

export default function PlanPreviewCard({
  type,
  workoutDays,
  mealPlans,
  onConfirm,
  onRegenerate
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-card rounded-xl shadow-warm-md border border-border overflow-hidden">
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
              <h3 className="text-xl font-heading font-bold text-foreground">
                {type === 'workout' ? 'Workout Plan Preview' : 'Diet Plan Preview'}
              </h3>
              <p className="text-caption text-muted-foreground text-sm">
                {type === 'workout'
                  ? `${workoutDays?.length || 0} days of customized exercises`
                  : `${mealPlans?.length || 0} meals per day with calorie tracking`}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-muted rounded-lg transition-smooth focus:outline-none focus:ring-3 focus:ring-primary"
            aria-expanded={isExpanded}
          >
            <Icon
              name={isExpanded ? 'ChevronUpIcon' : 'ChevronDownIcon'}
              variant="outline"
              size={24}
              className="text-muted-foreground"
            />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="p-6 space-y-4">
          {type === 'workout' && workoutDays && (
            <div className="space-y-3">
              {workoutDays.slice(0, 3).map((day, index) => (
                <div key={index} className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground">{day.day}</h4>
                    <span className="text-caption text-muted-foreground text-sm">
                      {day.duration}
                    </span>
                  </div>
                  <ul className="space-y-1">
                    {day.exercises.map((exercise, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-caption text-muted-foreground text-sm"
                      >
                        <Icon
                          name="CheckCircleIcon"
                          variant="solid"
                          size={16}
                          className="text-primary"
                        />
                        {exercise}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {type === 'diet' && mealPlans && (
            <div className="space-y-3">
              {mealPlans.map((meal, index) => (
                <div key={index} className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-foreground">{meal.meal}</h4>
                    <span className="text-caption text-primary text-sm font-medium">
                      {meal.calories}
                    </span>
                  </div>
                  <ul className="space-y-1">
                    {meal.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-caption text-muted-foreground text-sm"
                      >
                        <Icon
                          name="CheckCircleIcon"
                          variant="solid"
                          size={16}
                          className="text-secondary"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          <div className="flex gap-3 pt-4 border-t border-border">
            <button
              onClick={onRegenerate}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-muted hover:bg-muted/80 text-foreground rounded-lg transition-smooth focus:outline-none focus:ring-3 focus:ring-primary"
            >
              <Icon name="ArrowPathIcon" variant="outline" size={20} />
              <span className="font-medium">Regenerate</span>
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white rounded-lg transition-smooth focus:outline-none focus:ring-3 focus:ring-primary shadow-warm-md"
            >
              <Icon name="CheckIcon" variant="solid" size={20} />
              <span className="font-medium">Confirm Plan</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
