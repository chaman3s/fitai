'use client';

import { useState } from 'react';
import Icon from '@/components/Icon';

export default function PersonalInfoSection({
  info,
  unitSystem,
  onUpdate,
  onUnitToggle,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState(info);

  const handleSave = () => {
    onUpdate(editedInfo);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedInfo(info);
    setIsEditing(false);
  };

  return (
    <div className="bg-card rounded-xl shadow-warm-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon
              name="UserCircleIcon"
              variant="solid"
              size={24}
              className="text-primary"
            />
          </div>
          <div>
            <h2 className="text-xl font-heading font-semibold text-foreground">
              Personal Information
            </h2>
            <p className="text-caption text-sm text-muted-foreground">
              Manage your basic profile details
            </p>
          </div>
        </div>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-caption font-medium transition-smooth hover:bg-primary/90 focus:outline-none focus:ring-3 focus:ring-primary focus:ring-offset-2"
          >
            <Icon name="PencilIcon" variant="outline" size={18} />
            <span>Edit</span>
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-muted text-foreground rounded-lg font-caption font-medium transition-smooth hover:bg-muted/80"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-success text-success-foreground rounded-lg font-caption font-medium transition-smooth hover:bg-success/90"
            >
              <Icon name="CheckIcon" variant="outline" size={18} />
              <span>Save</span>
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-caption font-medium mb-2">
            Full Name
          </label>
          {isEditing ? (
            <input
              type="text"
              value={editedInfo.name}
              onChange={(e) =>
                setEditedInfo({ ...editedInfo, name: e.target.value })
              }
              className="w-full px-4 py-3 border rounded-lg"
            />
          ) : (
            <div className="px-4 py-3 bg-muted rounded-lg">
              {info.name}
            </div>
          )}
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm font-caption font-medium mb-2">
            Age
          </label>
          {isEditing ? (
            <input
              type="number"
              value={editedInfo.age}
              onChange={(e) =>
                setEditedInfo({
                  ...editedInfo,
                  age: parseInt(e.target.value) || 0,
                })
              }
              className="w-full px-4 py-3 border rounded-lg"
            />
          ) : (
            <div className="px-4 py-3 bg-muted rounded-lg">
              {info.age} years
            </div>
          )}
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-caption font-medium mb-2">
            Gender
          </label>
          {isEditing ? (
            <select
              value={editedInfo.gender}
              onChange={(e) =>
                setEditedInfo({ ...editedInfo, gender: e.target.value })
              }
              className="w-full px-4 py-3 border rounded-lg"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
              <option>Prefer not to say</option>
            </select>
          ) : (
            <div className="px-4 py-3 bg-muted rounded-lg">
              {info.gender}
            </div>
          )}
        </div>

        {/* Height */}
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-caption font-medium">
              Height
            </label>
            <button
              onClick={onUnitToggle}
              className="text-xs text-primary"
            >
              {unitSystem === 'imperial' ? 'ft/in' : 'cm'}
            </button>
          </div>
          {isEditing ? (
            <input
              type="number"
              value={editedInfo.height}
              onChange={(e) =>
                setEditedInfo({
                  ...editedInfo,
                  height: parseFloat(e.target.value) || 0,
                })
              }
              className="w-full px-4 py-3 border rounded-lg"
            />
          ) : (
            <div className="px-4 py-3 bg-muted rounded-lg">
              {unitSystem === 'imperial'
                ? `${Math.floor(info.height / 12)}' ${(info.height % 12).toFixed(0)}"`
                : `${(info.height * 2.54).toFixed(1)} cm`}
            </div>
          )}
        </div>

        {/* Weight */}
        <div>
          <label className="block text-sm font-caption font-medium mb-2">
            Weight ({unitSystem === 'imperial' ? 'lbs' : 'kg'})
          </label>
          {isEditing ? (
            <input
              type="number"
              value={editedInfo.weight}
              onChange={(e) =>
                setEditedInfo({
                  ...editedInfo,
                  weight: parseFloat(e.target.value) || 0,
                })
              }
              className="w-full px-4 py-3 border rounded-lg"
            />
          ) : (
            <div className="px-4 py-3 bg-muted rounded-lg">
              {unitSystem === 'imperial'
                ? `${info.weight} lbs`
                : `${(info.weight * 0.453592).toFixed(1)} kg`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
