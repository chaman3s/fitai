'use client';

import { useState } from 'react';
import Icon from '@/components/ui/Icon';

export default function AdvancedOptionsPanel({ options, onUpdate }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-card rounded-xl shadow-warm-md border border-border overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 hover:bg-muted/50 transition-smooth focus:outline-none focus:ring-3 focus:ring-primary"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-3">
          <Icon
            name="AdjustmentsHorizontalIcon"
            variant="outline"
            size={24}
            className="text-primary"
          />
          <div className="text-left">
            <h3 className="text-xl font-heading font-semibold text-foreground">
              Advanced Options
            </h3>
            <p className="text-caption text-muted-foreground text-sm">
              Fine-tune your plan generation preferences
            </p>
          </div>
        </div>
        <Icon
          name="ChevronDownIcon"
          variant="outline"
          size={24}
          className={`text-muted-foreground transition-smooth ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>

      {isExpanded && (
        <div className="p-6 pt-0 space-y-4 border-t border-border">
          {options.map((option) => (
            <div key={option.id} className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <label className="text-base font-medium text-foreground block mb-1">
                  {option.label}
                </label>
              </div>

              {option.type === 'toggle' && (
                <button
                  onClick={() => onUpdate(option.id, !option.value)}
                  className={`
                    relative w-12 h-6 rounded-full transition-smooth
                    focus:outline-none focus:ring-3 focus:ring-primary
                    ${option.value ? 'bg-primary' : 'bg-muted'}
                  `}
                  role="switch"
                  aria-checked={option.value}
                >
                  <span
                    className={`
                      absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-smooth shadow-warm-sm
                      ${option.value ? 'translate-x-6' : 'translate-x-0'}
                    `}
                  />
                </button>
              )}

              {option.type === 'select' && option.options && (
                <select
                  value={option.value}
                  onChange={(e) => onUpdate(option.id, e.target.value)}
                  className="px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-3 focus:ring-primary"
                >
                  {option.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
