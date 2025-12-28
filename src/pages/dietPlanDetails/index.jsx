'use client';

import { useState, useMemo } from 'react';
import MealCard from '@/components/MealCard';
import DailyNutritionSummary from '@/components/DailyNutritionSummary';
import ShoppingList from '@/components/ShoppingList';
import MealTimeline from '@/components/MealTimeLine';
import HydrationTracker from '@/components/HydrationTracker';
import Icon from '@/components/Icon';
import { useProfile } from "@/contexts/profileContext";

const DAYS = [
  "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"
];

export default function DietPlan() {
  const { mealPlan } = useProfile();
  const [selectedDay, setSelectedDay] = useState("Monday");

  const mealsForDay = useMemo(() => {
    if (!mealPlan) return [];
    const dayMeals = mealPlan[selectedDay];
    if (!dayMeals) return [];
    return Object.entries(dayMeals).map(([mealType, meal]) => ({
      id: `${selectedDay}-${mealType}`,
      mealType,
      ...meal,
    }));
  }, [mealPlan, selectedDay]);

  const totalNutrition = useMemo(() => {
    return mealsForDay.reduce(
      (acc, meal) => ({
        calories: acc.calories + Number(meal.calories || 0),
        protein: acc.protein + Number(meal.protein || 0),
        carbs: acc.carbs + Number(meal.carbohydrates || 0),
        fats: acc.fats + Number(meal.fat || 0),
        fiber: acc.fiber,
      }),
      { calories: 0, protein: 0, carbs: 0, fats: 0, fiber: 0 }
    );
  }, [mealsForDay]);

  const mealTimeline = useMemo(() => {
    return mealsForDay.map((meal, index) => ({
      id: index,
      mealType: meal.mealType,
      time:
        meal.mealType === "breakfast"
          ? "7:00 AM"
          : meal.mealType === "lunch"
          ? "1:00 PM"
          : meal.mealType === "snack"
          ? "5:00 PM"
          : "8:00 PM",
      calories: meal.calories,
      icon:
        meal.mealType === "breakfast"
          ? "SunIcon"
          : meal.mealType === "lunch"
          ? "FireIcon"
          : meal.mealType === "snack"
          ? "CakeIcon"
          : "MoonIcon",
    }));
  }, [mealsForDay]);

  if (!mealPlan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2 space-y-6">
          <div className="flex gap-2 overflow-x-auto">
            {DAYS.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  selectedDay === day
                    ? "bg-primary text-white"
                    : "bg-muted text-foreground"
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          <DailyNutritionSummary
            totalCalories={totalNutrition.calories}
            totalProtein={totalNutrition.protein}
            totalCarbs={totalNutrition.carbs}
            totalFats={totalNutrition.fats}
            totalFiber={totalNutrition.fiber}
            targetCalories={2200}
            targetProtein={165}
            targetCarbs={220}
            targetFats={73}
          />

          {mealsForDay.map((meal) => (
            <MealCard
              key={meal.id}
              meal={{
                name: meal.name,
                nutritionalInfo: {
                  calories: meal.calories,
                  protein: meal.protein,
                  carbs: meal.carbohydrates,
                  fats: meal.fat,
                  fiber: 0,
                },
                mealType: meal.mealType,
              }}
            />
          ))}
        </div>

        <div className="space-y-6">
          <MealTimeline timeline={mealTimeline} />
          <HydrationTracker targetGlasses={8} />
          <ShoppingList />
        </div>
      </div>

      <button className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-xl">
        <Icon name="ArrowDownTrayIcon" variant="solid" size={24} />
      </button>
    </div>
  );
}
