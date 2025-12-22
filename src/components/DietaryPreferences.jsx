'use client';

import { useState } from 'react';
import Icon from '@/components/Icon';

const dietTypes = [
  { value: 'vegetarian', label: 'Vegetarian', icon: 'SparklesIcon' },
  { value: 'vegan', label: 'Vegan', icon: 'HeartIcon' },
  { value: 'non_vegetarian', label: 'Non-Vegetarian', icon: 'FireIcon' },
  { value: 'keto', label: 'Keto', icon: 'BoltIcon' },
  { value: 'paleo', label: 'Paleo', icon: 'SunIcon' },
  { value: 'mediterranean', label: 'Mediterranean', icon: 'GlobeAltIcon' }
];

const commonAllergies = [
  'Dairy', 'Eggs', 'Peanuts', 'Tree Nuts', 'Soy',
  'Wheat', 'Fish', 'Shellfish', 'Gluten'
];

const dietaryRestrictions = [
  'Low Sodium', 'Low Sugar', 'Low Carb', 'High Protein',
  'Lactose Free', 'Halal', 'Kosher', 'Organic Only'
];

export default function DietaryPreferencesSection({ preferences, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPreferences, setEditedPreferences] = useState(preferences);

  const handleSave = () => {
    onUpdate(editedPreferences);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedPreferences(preferences);
    setIsEditing(false);
  };

  const toggleAllergy = (allergy) => {
    const updated = editedPreferences.allergies.includes(allergy)
      ? editedPreferences.allergies.filter(a => a !== allergy)
      : [...editedPreferences.allergies, allergy];

    setEditedPreferences({ ...editedPreferences, allergies: updated });
  };

  const toggleRestriction = (restriction) => {
    const updated = editedPreferences.restrictions.includes(restriction)
      ? editedPreferences.restrictions.filter(r => r !== restriction)
      : [...editedPreferences.restrictions, restriction];

    setEditedPreferences({ ...editedPreferences, restrictions: updated });
  };

  return (
    <div className="bg-card rounded-xl shadow-warm-md p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
            <Icon name="HeartIcon" variant="solid" size={24} className="text-accent" />
          </div>
          <div>
            <h2 className="text-xl font-heading font-semibold text-foreground">
              Dietary Preferences
            </h2>
            <p className="text-sm text-muted-foreground">
              Manage your nutrition settings
            </p>
          </div>
        </div>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90"
          >
            <Icon name="PencilIcon" variant="outline" size={18} />
            Edit
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-muted rounded-lg hover:bg-muted/80"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-success text-success-foreground rounded-lg hover:bg-success/90"
            >
              <Icon name="CheckIcon" variant="outline" size={18} />
              Save
            </button>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* Diet Type */}
        <div>
          <label className="block text-sm font-medium mb-3">Diet Type</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {dietTypes.map((diet) => (
              <button
                key={diet.value}
                onClick={() =>
                  isEditing &&
                  setEditedPreferences({ ...editedPreferences, type: diet.value })
                }
                disabled={!isEditing}
                className={`flex items-center gap-3 p-4 rounded-lg border-2
                  ${editedPreferences.type === diet.value
                    ? 'border-primary bg-primary/10'
                    : 'border-border bg-background'}
                `}
              >
                <Icon
                  name={diet.icon}
                  variant={editedPreferences.type === diet.value ? 'solid' : 'outline'}
                  size={20}
                />
                {diet.label}
              </button>
            ))}
          </div>
        </div>

        {/* Allergies */}
        <div>
          <label className="block text-sm font-medium mb-3">Food Allergies</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {commonAllergies.map((allergy) => (
              <button
                key={allergy}
                onClick={() => isEditing && toggleAllergy(allergy)}
                disabled={!isEditing}
                className={`px-4 py-3 rounded-lg border-2
                  ${editedPreferences.allergies.includes(allergy)
                    ? 'border-error bg-error/10 font-bold'
                    : 'border-border'}
                `}
              >
                {allergy}
              </button>
            ))}
          </div>
        </div>

        {/* Restrictions */}
        <div>
          <label className="block text-sm font-medium mb-3">Dietary Restrictions</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {dietaryRestrictions.map((restriction) => (
              <button
                key={restriction}
                onClick={() => isEditing && toggleRestriction(restriction)}
                disabled={!isEditing}
                className={`px-4 py-3 rounded-lg border-2
                  ${editedPreferences.restrictions.includes(restriction)
                    ? 'border-primary bg-primary/10 font-bold'
                    : 'border-border'}
                `}
              >
                {restriction}
              </button>
            ))}
          </div>
        </div>

        {/* Meal Frequency */}
        <div>
          <label className="block text-sm font-medium mb-3">
            Daily Meal Frequency
          </label>
          {isEditing ? (
            <input
              type="range"
              min="3"
              max="6"
              value={editedPreferences.mealFrequency}
              onChange={(e) =>
                setEditedPreferences({
                  ...editedPreferences,
                  mealFrequency: Number(e.target.value)
                })
              }
              className="w-full"
            />
          ) : (
            <div className="px-4 py-3 bg-muted rounded-lg">
              {preferences.mealFrequency} meals per day
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
