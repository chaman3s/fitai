'use client';

import { useState } from 'react';
import Icon from '@/components/Icon';

const stressLevels = [
  { value: 1, label: 'Very Low', color: 'text-success' },
  { value: 2, label: 'Low', color: 'text-success' },
  { value: 3, label: 'Moderate', color: 'text-warning' },
  { value: 4, label: 'High', color: 'text-error' },
  { value: 5, label: 'Very High', color: 'text-error' }
];

export default function HealthInfoSection({ info, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState(info);
  const [showMedicalHistory, setShowMedicalHistory] = useState(false);

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
          <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-lg">
            <Icon name="HeartIcon" variant="solid" size={24} className="text-success" />
          </div>
          <div>
            <h2 className="text-xl font-heading font-semibold text-foreground">
              Health Information
            </h2>
            <p className="text-caption text-sm text-muted-foreground">
              Optional health metrics for better plans
            </p>
          </div>
        </div>

        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-caption font-medium transition-smooth hover:bg-primary/90 focus:outline-none focus:ring-3 focus:ring-primary focus:ring-offset-2"
          >
            <Icon name="PencilIcon" variant="outline" size={18} />
            Edit
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-muted text-foreground rounded-lg font-caption font-medium transition-smooth hover:bg-muted/80 focus:outline-none focus:ring-3 focus:ring-ring focus:ring-offset-2"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-success text-success-foreground rounded-lg font-caption font-medium transition-smooth hover:bg-success/90 focus:outline-none focus:ring-3 focus:ring-success focus:ring-offset-2"
            >
              <Icon name="CheckIcon" variant="outline" size={18} />
              Save
            </button>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* Medical History */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-caption font-medium text-foreground">
              Medical History
            </label>
            <button
              onClick={() => setShowMedicalHistory(!showMedicalHistory)}
              className="flex items-center gap-1 text-caption text-xs text-primary font-medium hover:text-primary/80"
            >
              <Icon name="ShieldCheckIcon" variant="outline" size={14} />
              Private & Secure
            </button>
          </div>

          {showMedicalHistory && (
            <>
              {isEditing ? (
                <textarea
                  value={editedInfo.medicalHistory}
                  onChange={(e) =>
                    setEditedInfo({ ...editedInfo, medicalHistory: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground font-caption focus:outline-none focus:ring-3 focus:ring-primary resize-none"
                  placeholder="Enter medical history..."
                />
              ) : (
                <div className="px-4 py-3 bg-muted rounded-lg min-h-[100px]">
                  {info.medicalHistory || 'No medical history provided'}
                </div>
              )}
            </>
          )}
        </div>

        {/* Stress Level */}
        <div>
          <label className="block text-sm font-caption font-medium text-foreground mb-3">
            Current Stress Level
          </label>

          {isEditing ? (
            <>
              <input
                type="range"
                min="1"
                max="5"
                value={editedInfo.stressLevel}
                onChange={(e) =>
                  setEditedInfo({
                    ...editedInfo,
                    stressLevel: Number(e.target.value)
                  })
                }
                className="w-full accent-primary"
              />
              <div className="flex justify-between mt-2">
                {stressLevels.map((level) => (
                  <span
                    key={level.value}
                    className={
                      editedInfo.stressLevel === level.value
                        ? level.color
                        : 'text-muted-foreground'
                    }
                  >
                    {level.label}
                  </span>
                ))}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3 px-4 py-3 bg-muted rounded-lg">
              <Icon name="FaceSmileIcon" variant="outline" size={20} />
              <span>
                {stressLevels.find((l) => l.value === info.stressLevel)?.label ||
                  'Not set'}
              </span>
            </div>
          )}
        </div>

        {/* Sleep Hours */}
        <div>
          <label className="block text-sm font-caption font-medium text-foreground mb-3">
            Average Sleep Hours
          </label>

          {isEditing ? (
            <input
              type="number"
              value={editedInfo.sleepHours}
              onChange={(e) =>
                setEditedInfo({
                  ...editedInfo,
                  sleepHours: Number(e.target.value)
                })
              }
              className="w-full px-4 py-3 bg-background border border-border rounded-lg"
            />
          ) : (
            <div className="px-4 py-3 bg-muted rounded-lg">
              {info.sleepHours} hours per night
            </div>
          )}
        </div>

        {/* Water Intake */}
        <div>
          <label className="block text-sm font-caption font-medium text-foreground mb-3">
            Daily Water Intake
          </label>

          {isEditing ? (
            <input
              type="number"
              value={editedInfo.waterIntake}
              onChange={(e) =>
                setEditedInfo({
                  ...editedInfo,
                  waterIntake: Number(e.target.value)
                })
              }
              className="w-full px-4 py-3 bg-background border border-border rounded-lg"
            />
          ) : (
            <div className="px-4 py-3 bg-muted rounded-lg">
              {info.waterIntake} liters per day
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
