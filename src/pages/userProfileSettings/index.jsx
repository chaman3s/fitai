'use client';

import { useState, useEffect } from 'react';
import PersonalInfoSection from '@/components/PersonalInfoSection';
import FitnessPreferencesSection from '@/components/FitnessPreferences';
import DietaryPreferencesSection from '@/components/DietaryPreferences';
import HealthInfoSection from '@/components/HealthInfoSection';

export default function ProfileSettings() {
  const [loading, setLoading] = useState(true);
  const [unitSystem, setUnitSystem] = useState('imperial');

  const [personalInfo, setPersonalInfo] = useState(null);
  const [fitnessPreferences, setFitnessPreferences] = useState(null);
  const [dietaryPreferences, setDietaryPreferences] = useState(null);
  const [healthInfo, setHealthInfo] = useState(null);


  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true);

        const [profileRes, healthRes] = await Promise.all([
          fetch('/api/profile', { credentials: 'include' }),
          fetch('/api/healthProfile', { credentials: 'include' }),
        ]);

        const profile = await profileRes.json();
        const health = await healthRes.json();

        // ----- MAP BACKEND → UI SHAPE -----
        setPersonalInfo({
          name: profile.name,
          age: profile.age,
          gender: profile.gender,
          height: profile.height,
          weight: profile.weight,
        });

        setFitnessPreferences({
          goal: profile.fitnessGoals,
          fitnessLevel: profile.fitnessLavel,
          location: profile.preferredWorkoutLocation,
          equipment: profile.availableEquipment || [],
        });

        setDietaryPreferences({
          type: profile.dietType,
          allergies: profile.foodAllergies || [],
          restrictions: profile.dietaryRestrictions || [],
          mealFrequency: profile.MealFrequency,
        });

        setHealthInfo({
          stressLevel: health.currentStressLevel,
          sleepHours: health.averageSleepHours,
          waterIntake: health.dailyWaterIntake,
          isPrivate: health.isPrivate,
        });
      } catch (err) {
        console.error('Profile load failed', err);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  // ---------------- UPDATE HANDLERS ----------------
  const handlePersonalInfoUpdate = async (info) => {
    setPersonalInfo(info);

    await fetch('/api/profile', {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(info),
    });
  };

  const handleFitnessPreferencesUpdate = async (preferences) => {
    setFitnessPreferences(preferences);

    await fetch('/api/profile', {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fitnessGoals: preferences.goal,
        fitnessLavel: preferences.fitnessLevel,
        preferredWorkoutLocation: preferences.location,
        availableEquipment: preferences.equipment,
      }),
    });
  };

  const handleDietaryPreferencesUpdate = async (preferences) => {
    setDietaryPreferences(preferences);

    await fetch('/api/profile', {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        dietType: preferences.type,
        foodAllergies: preferences.allergies,
        dietaryRestrictions: preferences.restrictions,
        MealFrequency: preferences.mealFrequency,
      }),
    });
  };

  const handleHealthInfoUpdate = async (info) => {
    setHealthInfo(info);
    console.log("level", info.stressLevel);
    await fetch('/api/healthProfile', {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        currentStressLevel: info.stressLevel,
        averageSleepHours: info.sleepHours,
        dailyWaterIntake: info.waterIntake,
        isPrivate: info.isPrivate,
      }),
    });
  };

  // ---------------- LOADING UI ----------------
  if (loading || !personalInfo) {
    return (
      <div className="min-h-screen bg-background p-8 animate-pulse">
        <div className="h-32 bg-muted rounded-xl mb-6" />
        <div className="h-96 bg-muted rounded-xl mb-6" />
        <div className="h-96 bg-muted rounded-xl" />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Profile Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your account preferences and personalize your fitness experience
          </p>
        </div>

        <div className="space-y-6">
          <PersonalInfoSection
            info={personalInfo}
            unitSystem={unitSystem}
            onUpdate={handlePersonalInfoUpdate}
          />

          <FitnessPreferencesSection
            preferences={fitnessPreferences}
            onUpdate={handleFitnessPreferencesUpdate}
          />

          <DietaryPreferencesSection
            preferences={dietaryPreferences}
            onUpdate={handleDietaryPreferencesUpdate}
          />

          <HealthInfoSection
            info={healthInfo}
            onUpdate={handleHealthInfoUpdate}
          />
        </div>
      </div>
    </div>
  );
}
