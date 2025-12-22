'use client';

import { useState } from 'react';
import AppImage from '@/components/AppImage';
import Icon from '@/components/Icon';

export default function MealCard({ meal, onPlayAudio, isPlaying }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handlePlayAudio = () => {
    const audioText = `${meal.name}. Preparation time: ${meal.prepTime} minutes. Cooking time: ${meal.cookTime} minutes. Ingredients: ${meal.ingredients.join(
      ', '
    )}. Instructions: ${meal.instructions.join('. ')}`;
    onPlayAudio(audioText);
  };

  return (
    <div className="bg-card rounded-xl shadow-warm-md overflow-hidden transition-smooth hover:shadow-warm-lg">
      {/* Header */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <AppImage
          src={meal.image}
          alt={meal.alt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-xl md:text-2xl font-heading font-bold text-white mb-1">
            {meal.name}
          </h3>
          <p className="text-sm text-white/90 flex items-center gap-2">
            <Icon name="ClockIcon" variant="outline" size={16} />
            {meal.time}
          </p>
        </div>
      </div>

      {/* Nutritional Summary */}
      <div className="p-4 bg-muted/50 border-b border-border">
        <div className="grid grid-cols-4 gap-2 text-center">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Calories</p>
            <p className="text-lg font-bold text-primary">
              {meal.nutritionalInfo.calories}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Protein</p>
            <p className="text-lg font-bold text-secondary">
              {meal.nutritionalInfo.protein}g
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Carbs</p>
            <p className="text-lg font-bold text-accent">
              {meal.nutritionalInfo.carbs}g
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Fats</p>
            <p className="text-lg font-bold text-warning">
              {meal.nutritionalInfo.fats}g
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Portion & Time */}
        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Icon name="ScaleIcon" variant="outline" size={16} />
            <span>{meal.portionSize}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="FireIcon" variant="outline" size={16} />
            <span>Prep: {meal.prepTime}m</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="ClockIcon" variant="outline" size={16} />
            <span>Cook: {meal.cookTime}m</span>
          </div>
        </div>

        {/* Expandable */}
        <div
          className={`transition-smooth overflow-hidden ${
            isExpanded ? 'max-h-[2000px]' : 'max-h-0'
          }`}
        >
          {/* Ingredients */}
          <div className="mb-4">
            <h4 className="text-base font-heading font-semibold text-foreground mb-2 flex items-center gap-2">
              <Icon
                name="ListBulletIcon"
                variant="solid"
                size={18}
                className="text-primary"
              />
              Ingredients
            </h4>
            <ul className="space-y-1.5">
              {meal.ingredients.map((ingredient, index) => (
                <li
                  key={index}
                  className="text-sm text-foreground flex items-start gap-2"
                >
                  <span className="text-primary mt-1">•</span>
                  <span>{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructions */}
          <div className="mb-4">
            <h4 className="text-base font-heading font-semibold text-foreground mb-2 flex items-center gap-2">
              <Icon
                name="DocumentTextIcon"
                variant="solid"
                size={18}
                className="text-secondary"
              />
              Instructions
            </h4>
            <ol className="space-y-2">
              {meal.instructions.map((instruction, index) => (
                <li
                  key={index}
                  className="text-sm text-foreground flex items-start gap-2"
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-secondary/10 text-secondary flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </span>
                  <span className="pt-0.5">{instruction}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Nutrition */}
          <div className="bg-muted/30 rounded-lg p-3">
            <h4 className="text-sm font-heading font-semibold text-foreground mb-2">
              Nutritional Breakdown
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fiber:</span>
                <span className="font-medium text-foreground">
                  {meal.nutritionalInfo.fiber}g
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium text-sm transition-smooth hover:bg-primary/90 focus:outline-none focus:ring-3 focus:ring-primary focus:ring-offset-2"
          >
            <Icon
              name={isExpanded ? 'ChevronUpIcon' : 'ChevronDownIcon'}
              variant="solid"
              size={18}
            />
            {isExpanded ? 'Show Less' : 'View Details'}
          </button>

          <button
            onClick={handlePlayAudio}
            disabled={isPlaying}
            className="px-4 py-2.5 bg-secondary text-secondary-foreground rounded-lg font-medium text-sm transition-smooth hover:bg-secondary/90 focus:outline-none focus:ring-3 focus:ring-secondary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Play meal audio narration"
          >
            <Icon
              name={isPlaying ? 'PauseIcon' : 'SpeakerWaveIcon'}
              variant="solid"
              size={18}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
