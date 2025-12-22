'use client';

import { useState } from 'react';
import Icon from '@/components/Icon';

export default function HydrationTracker({ targetGlasses }) {
  const [glassesConsumed, setGlassesConsumed] = useState(0);

  const addGlass = () => {
    if (glassesConsumed < targetGlasses) {
      setGlassesConsumed(glassesConsumed + 1);
    }
  };

  const removeGlass = () => {
    if (glassesConsumed > 0) {
      setGlassesConsumed(glassesConsumed - 1);
    }
  };

  const percentage = (glassesConsumed / targetGlasses) * 100;

  return (
    <div className="bg-card rounded-xl shadow-warm-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
            <Icon
              name="BeakerIcon"
              variant="solid"
              size={20}
              className="text-white"
            />
          </div>
          <div>
            <h2 className="text-lg font-heading font-bold text-foreground">
              Hydration Tracker
            </h2>
            <p className="text-sm text-muted-foreground">
              {glassesConsumed} of {targetGlasses} glasses
            </p>
          </div>
        </div>

        <span className="text-2xl font-bold text-primary">
          {percentage.toFixed(0)}%
        </span>
      </div>
      <div className="mb-6">
        <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-smooth"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Glass Icons */}
      <div className="grid grid-cols-4 gap-2 mb-6">
        {Array.from({ length: targetGlasses }).map((_, index) => (
          <div
            key={index}
            className={`aspect-square rounded-lg flex items-center justify-center transition-smooth ${
              index < glassesConsumed
                ? 'bg-blue-500/20 border-2 border-blue-500'
                : 'bg-muted border-2 border-border'
            }`}
          >
            <Icon
              name="BeakerIcon"
              variant={index < glassesConsumed ? 'solid' : 'outline'}
              size={24}
              className={
                index < glassesConsumed
                  ? 'text-blue-600'
                  : 'text-muted-foreground'
              }
            />
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex gap-2">
        <button
          onClick={removeGlass}
          disabled={glassesConsumed === 0}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-muted text-foreground rounded-lg font-medium text-sm transition-smooth hover:bg-muted/80 focus:outline-none focus:ring-3 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Icon name="MinusIcon" variant="solid" size={18} />
          Remove
        </button>

        <button
          onClick={addGlass}
          disabled={glassesConsumed === targetGlasses}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-lg font-medium text-sm transition-smooth hover:bg-blue-600 focus:outline-none focus:ring-3 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Icon name="PlusIcon" variant="solid" size={18} />
          Add Glass
        </button>
      </div>
    </div>
  );
}
