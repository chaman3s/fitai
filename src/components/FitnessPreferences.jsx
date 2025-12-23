'use client';

import { useState } from 'react';
import Icon from '@/components/Icon';

const goalOptions = [
  { value: 'weight_loss', label: 'Weight Loss', icon: 'ScaleIcon' },
  { value: 'muscle_gain', label: 'Muscle Gain', icon: 'FireIcon' },
  { value: 'maintenance', label: 'Maintenance', icon: 'HeartIcon' },
  { value: 'endurance', label: 'Endurance', icon: 'BoltIcon' },
];

const fitnessLevels = [
  { value: 'beginner', label: 'Beginner', description: 'New to fitness' },
  { value: 'intermediate', label: 'Intermediate', description: 'Regular exercise' },
  { value: 'advanced', label: 'Advanced', description: 'Experienced athlete' },
];

const locationOptions = [
  { value: 'home', label: 'Home', icon: 'HomeIcon' },
  { value: 'gym', label: 'Gym', icon: 'BuildingOfficeIcon' },
  { value: 'outdoor', label: 'Outdoor', icon: 'SunIcon' },
];

const equipmentOptions = [
  'Dumbbells',
  'Barbell',
  'Resistance Bands',
  'Kettlebell',
  'Pull-up Bar',
  'Yoga Mat',
  'Treadmill',
  'Stationary Bike',
];

export default function FitnessPreferencesSection({ preferences, onUpdate }) {
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

  const toggleEquipment = (equipment) => {
    const updated = editedPreferences.equipment.includes(equipment)
      ? editedPreferences.equipment.filter((e) => e !== equipment)
      : [...editedPreferences.equipment, equipment];

    setEditedPreferences({ ...editedPreferences, equipment: updated });
  };

  return (
    <div className="bg-card rounded-xl shadow-warm-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-secondary/10 rounded-lg">
            <Icon name="FireIcon" variant="solid" size={24} className="text-secondary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Fitness Preferences
            </h2>
            <p className="text-sm text-muted-foreground">
              Customize your workout settings
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
        <div>
          <label className="block text-sm font-medium mb-3">
           Main Fitness Goal
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {goalOptions.map((option) => (
              <button
                key={option.value}
                onClick={() =>
                  isEditing &&
                  setEditedPreferences({
                    ...editedPreferences,
                    goal: option.value,
                  })
                }
                disabled={!isEditing}
                className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2
                  ${
                    editedPreferences.goal === option.value
                      ? 'border-primary bg-primary/10'
                      : 'border-border bg-background'
                  }`}
              >
                <Icon
                  name={option.icon}
                  variant={
                    editedPreferences.goal === option.value
                      ? 'solid'
                      : 'outline'
                  }
                  size={24}
                />
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-3">
            Current Fitness Level
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {fitnessLevels.map((level) => (
              <button
                key={level.value}
                onClick={() =>
                  isEditing &&
                  setEditedPreferences({
                    ...editedPreferences,
                    fitnessLevel: level.value,
                  })
                }
                disabled={!isEditing}
                className={`p-4 rounded-lg border-2 text-left
                  ${
                    editedPreferences.fitnessLevel === level.value
                      ? 'border-primary bg-primary/10 '
                      : 'border-border bg-background'
                  }`}
              >
                <div className={`${
                    editedPreferences.fitnessLevel === level.value
                      ? 'font-black' 
                      : 'font-medium'
                  }`} >{level.label}</div>
                <div className={`text-xs text-muted-foreground ${
                    editedPreferences.fitnessLevel === level.value
                      ? 'font-semibold' 
                      : ''
                  }`}>
                  {level.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-3">
            Preferred Workout Location
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {locationOptions.map((option) => (
              <button
                key={option.value}
                onClick={() =>
                  isEditing &&
                  setEditedPreferences({
                    ...editedPreferences,
                    location: option.value,
                  })
                }
                disabled={!isEditing}
                className={`flex items-center gap-3 p-4 rounded-lg border-2
                  ${
                    editedPreferences.location === option.value
                      ? 'border-primary bg-primary/10'
                      : 'border-border bg-background'
                  }`}
              >
                <Icon
                  name={option.icon}
                  variant={
                    editedPreferences.location === option.value
                      ? 'solid'
                      : 'outline'
                  }
                  size={24}
                />
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-3">
            Available Equipment
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {equipmentOptions.map((equipment) => (
              <button
                key={equipment}
                onClick={() => isEditing && toggleEquipment(equipment)}
                disabled={!isEditing}
                className={`px-4 py-3 rounded-lg border-2
                  ${
                    editedPreferences.equipment.includes(equipment)
                      ? 'border-primary bg-primary/10 font-bold'
                      : 'border-border bg-background'
                  }`}
              >
                {equipment}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
