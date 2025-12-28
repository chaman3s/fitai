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
      {/* Header */}
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
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
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

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-2">Full Name</label>
          {isEditing ? (
            <input
              type="text"
              value={editedInfo.name || ''}
              onChange={(e) =>
                setEditedInfo({ ...editedInfo, name: e.target.value })
              }
              className="w-full px-4 py-3 border rounded-lg"
            />
          ) : (
            <div className="px-4 py-3 bg-muted rounded-lg">{info.name}</div>
          )}
        </div>

        {/* Age */}
        <div>
          <label className="block text-sm font-medium mb-2">Age</label>
          {isEditing ? (
            <input
              type="number"
              min="0"
              value={editedInfo.age ?? ''}
              onChange={(e) =>
                setEditedInfo({
                  ...editedInfo,
                  age: e.target.value === '' ? '' : Number(e.target.value),
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
          <label className="block text-sm font-medium mb-2">Gender</label>
          {isEditing ? (
            <select
              value={editedInfo.gender || ''}
              onChange={(e) =>
                setEditedInfo({ ...editedInfo, gender: e.target.value })
              }
              className="w-full px-4 py-3 border rounded-lg bg-[lab(1.9% .27 -5.4)]"
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
              <option>Prefer not to say</option>
            </select>
          ) : (
            <div className="px-4 py-3 bg-muted rounded-lg">{info.gender}</div>
          )}
        </div>

        {/* Height (STRING) */}
        <div>
          <label className="block text-sm font-medium mb-2">Height</label>
          {isEditing ? (
            <input
              type="text"
              placeholder="e.g. 5'8 or 170cm"
              value={editedInfo.height || ''}
              onChange={(e) =>
                setEditedInfo({ ...editedInfo, height: e.target.value })
              }
              className="w-full px-4 py-3 border rounded-lg"
            />
          ) : (
            <div className="px-4 py-3 bg-muted rounded-lg">
              {info.height || 'Not set'}
            </div>
          )}
        </div>

        {/* Weight */}
        <div>
          <label className="block text-sm font-medium mb-2">Weight (kg)</label>
          {isEditing ? (
            <input
              type="number"
              step="0.1"
              min="0"
              value={editedInfo.weight ?? ''}
              onChange={(e) =>
                setEditedInfo({
                  ...editedInfo,
                  weight:
                    e.target.value === '' ? '' : Number(e.target.value),
                })
              }
              className="w-full px-4 py-3 border rounded-lg"
            />
          ) : (
            <div className="px-4 py-3 bg-muted rounded-lg">
              {info.weight} kg
            </div>
          )}
        </div>

        {/* Body Fat */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Body Fat (%)
          </label>
          {isEditing ? (
            <input
              type="number"
              step="0.1"
              min="0"
              max="60"
              value={editedInfo.bodyFat ?? ''}
              onChange={(e) =>
                setEditedInfo({
                  ...editedInfo,
                  bodyFat:
                    e.target.value === '' ? '' : Number(e.target.value),
                  oldLeanMass: editedInfo.currentLeanMass,
                  currentLeanMass: editedInfo.weight - (editedInfo.weight * (Number(e.target.value) / 100)),
                })
              }
              className="w-full px-4 py-3 border rounded-lg"
            />
          ) : (
            <div className="px-4 py-3 bg-muted rounded-lg">
              {info.bodyFat ? `${info.bodyFat} %` : 'Not set'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
