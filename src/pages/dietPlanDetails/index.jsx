'use client';

import { useState, useEffect } from 'react';
import MealCard from '@/components/MealCard';
import DailyNutritionSummary from '@/components/DailyNutritionSummary';
import ShoppingList from '@/components/ShoppingList';
import DietaryRestrictions from '@/components/DietaryRestrictions';
import MealTimeline from '@/components/MealTimeLine';
import HydrationTracker from '@/components/HydrationTracker';
import Icon from '@/components/Icon';

export default function DietPlan() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const mealCategories = [
    {
      id: 'breakfast',
      name: 'Breakfast',
      icon: 'SunIcon',
      meals: [
        {
          id: 'b1',
          name: 'Protein-Packed Oatmeal Bowl',
          time: '7:00 AM - 8:00 AM',
          image: 'https://images.unsplash.com/photo-1630234674868-404d00118f7e',
          alt: 'Oatmeal bowl',
          ingredients: [],
          instructions: [],
          portionSize: '1 bowl',
          nutritionalInfo: {
            calories: 485,
            protein: 28,
            carbs: 62,
            fats: 16,
            fiber: 12,
          },
          prepTime: 5,
          cookTime: 10,
        },
      ],
    },
    {
      id: 'lunch',
      name: 'Lunch',
      icon: 'FireIcon',
      meals: [],
    },
    {
      id: 'dinner',
      name: 'Dinner',
      icon: 'MoonIcon',
      meals: [],
    },
    {
      id: 'snacks',
      name: 'Snacks',
      icon: 'CakeIcon',
      meals: [],
    },
  ];

  const allMeals = mealCategories.flatMap((cat) => cat.meals);

  const filteredMeals =
    selectedCategory === 'all'
      ? allMeals
      : mealCategories.find((cat) => cat.id === selectedCategory)?.meals || [];

  const totalNutrition = allMeals.reduce(
    (acc, meal) => ({
      calories: acc.calories + meal.nutritionalInfo.calories,
      protein: acc.protein + meal.nutritionalInfo.protein,
      carbs: acc.carbs + meal.nutritionalInfo.carbs,
      fats: acc.fats + meal.nutritionalInfo.fats,
      fiber: acc.fiber + meal.nutritionalInfo.fiber,
    }),
    { calories: 0, protein: 0, carbs: 0, fats: 0, fiber: 0 }
  );

  const dietaryRestrictions = [
    { id: '1', label: 'High Protein', icon: 'BoltIcon', active: true },
    { id: '2', label: 'Low Carb', icon: 'MinusCircleIcon', active: false },
    { id: '3', label: 'Gluten Free', icon: 'ShieldCheckIcon', active: false },
    { id: '4', label: 'Dairy Free', icon: 'XCircleIcon', active: false },
  ];

  const mealTimeline = [
    { id: '1', mealType: 'Breakfast', time: '7:00 AM', calories: 485, icon: 'SunIcon' },
    { id: '2', mealType: 'Lunch', time: '12:30 PM', calories: 620, icon: 'FireIcon' },
    { id: '3', mealType: 'Dinner', time: '7:00 PM', calories: 580, icon: 'MoonIcon' },
  ];

  const handlePlayAudio = () => {
    setIsPlayingAudio(true);
    setTimeout(() => setIsPlayingAudio(false), 3000);
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
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

          <DietaryRestrictions restrictions={dietaryRestrictions} />

          {filteredMeals.map((meal) => (
            <MealCard
              key={meal.id}
              meal={meal}
              onPlayAudio={handlePlayAudio}
              isPlaying={isPlayingAudio}
            />
          ))}
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          <MealTimeline timeline={mealTimeline} />
          <HydrationTracker targetGlasses={8} />
          <ShoppingList />
        </div>
      </div>

      {/* MOBILE EXPORT */}
      <button
        onClick={() => setShowExportModal(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-xl"
      >
        <Icon name="ArrowDownTrayIcon" variant="solid" size={24} />
      </button>
    </div>
  );
}
