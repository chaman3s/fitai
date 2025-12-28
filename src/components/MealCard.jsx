'use client';

import { useState } from 'react';
import AppImage from '@/components/AppImage';
import Icon from '@/components/Icon';

export default function MealCard({ meal, onPlayAudio, isPlaying }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // 🔹 Normalize data (AI-safe)
  const calories = Number(meal.calories ?? meal.nutritionalInfo?.calories ?? 0);
  const protein = Number(meal.protein ?? meal.nutritionalInfo?.protein ?? 0);
  const carbs = Number(meal.carbohydrates ?? meal.nutritionalInfo?.carbs ?? 0);
  const fats = Number(meal.fat ?? meal.nutritionalInfo?.fats ?? 0);
  const fiber = Number(meal.fiber ?? meal.nutritionalInfo?.fiber ?? 0);

  const ingredients = meal.ingredients ?? [];
  const instructions = meal.instructions ?? [];

  const handlePlayAudio = () => {
    const audioText = `
      ${meal.name}.
      Calories ${calories}.
      Protein ${protein} grams.
      Carbs ${carbs} grams.
      Fat ${fats} grams.
    `;
    onPlayAudio?.(audioText);
  };

  return (
    <div className="bg-card rounded-xl shadow-warm-md overflow-hidden transition-smooth h-[16%] -mb-[13%]">
      
      {/* HEADER */}
      <div className="relative h-[17%] overflow-hidden bg-muted">
        {meal.image ? (
          <AppImage
            src={meal.image}
            alt={meal.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            {/* <Icon name="PhotoIcon" size={32} /> */}
          </div>
        )}

        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" /> */}
        <div className="absolute bottom-0 p-4">
          <h3 className="text-lg font-bold text-white">{meal.name}</h3>
        </div>
      </div>

      {/* MACROS */}
      <div className="p-4 bg-muted/50 border-b border-border">
        <div className="grid grid-cols-4 gap-2 text-center">
          <Macro label="Cal" value={calories} color="text-primary" />
          <Macro label="Protein" value={protein} unit="g" color="text-secondary" />
          <Macro label="Carbs" value={carbs} unit="g" color="text-accent" />
          <Macro label="Fats" value={fats} unit="g" color="text-warning" />
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4">
        {isExpanded && (
          <>
            {/* INGREDIENTS (OPTIONAL) */}
            {ingredients.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Ingredients</h4>
                <ul className="space-y-1 text-sm">
                  {ingredients.map((i, idx) => (
                    <li key={idx}>• {i}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* INSTRUCTIONS (OPTIONAL) */}
            {instructions.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Instructions</h4>
                <ol className="space-y-1 text-sm">
                  {instructions.map((step, idx) => (
                    <li key={idx}>{idx + 1}. {step}</li>
                  ))}
                </ol>
              </div>
            )}

            {/* FIBER */}
            {fiber > 0 && (
              <div className="text-sm text-muted-foreground">
                Fiber: <b>{fiber}g</b>
              </div>
            )}
          </>
        )}

        {/* ACTIONS */}
        <div className="flex gap-2 mt-4">
          {/* <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex-1 bg-primary text-white py-2 rounded-lg text-sm"
          >
            {isExpanded ? 'Hide Details' : 'View Details'}
          </button> */}

          {/* <button
            onClick={handlePlayAudio}
            disabled={isPlaying}
            className="px-4 py-2 bg-secondary text-white rounded-lg"
          > */}
            {/* <Icon name="SpeakerWaveIcon" size={18} />
          </button> */}
        </div>
      </div>
    </div>
  );
}

/* 🔹 Helper */
function Macro({ label, value, unit = '', color }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`text-lg font-bold ${color}`}>
        {value}{unit}
      </p>
    </div>
  );
}
