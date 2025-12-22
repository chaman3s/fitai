'use client';

import { useState, useEffect } from 'react';
import PersonalInfoSection from '@/components/PersonalInfoSection';
import FitnessPreferencesSection from '@/components/FitnessPreferences';
import DietaryPreferencesSection from '@/components/DietaryPreferences';
import HealthInfoSection from '@/components/HealthInfoSection';
import AccountSecuritySection from '@/components/AccountSecurity';


export default function ProfileSettings() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [unitSystem, setUnitSystem] = useState('imperial');

  const [personalInfo, setPersonalInfo] = useState({
    name: 'Alex Johnson',
    age: 28,
    gender: 'Male',
    height: 70,
    weight: 175
  });

  const [fitnessPreferences, setFitnessPreferences] = useState({
    goal: 'muscle_gain',
    fitnessLevel: 'intermediate',
    location: 'gym',
    equipment: ['Dumbbells', 'Barbell', 'Pull-up Bar']
  });

  const [dietaryPreferences, setDietaryPreferences] = useState({
    type: 'non_vegetarian',
    allergies: ['Peanuts'],
    restrictions: ['Low Sugar', 'High Protein'],
    mealFrequency: 5
  });

  const [healthInfo, setHealthInfo] = useState({
    medicalHistory:
      'Previous knee injury in 2020, fully recovered. No current medical conditions.',
    stressLevel: 3,
    sleepHours: 7.5,
    waterIntake: 3
  });

  useEffect(() => {
    setIsHydrated(true);
    const savedUnitSystem = localStorage.getItem('unitSystem');
    if (savedUnitSystem) {
      setUnitSystem(savedUnitSystem);
    }
  }, []);

  const handlePersonalInfoUpdate = (info) => {
    setPersonalInfo(info);
    localStorage.setItem('personalInfo', JSON.stringify(info));
  };

  const handleUnitToggle = () => {
    const newSystem = unitSystem === 'imperial' ? 'metric' : 'imperial';
    setUnitSystem(newSystem);
    localStorage.setItem('unitSystem', newSystem);
  };

  const handleFitnessPreferencesUpdate = (preferences) => {
    setFitnessPreferences(preferences);
    localStorage.setItem('fitnessPreferences', JSON.stringify(preferences));
  };

  const handleDietaryPreferencesUpdate = (preferences) => {
    setDietaryPreferences(preferences);
    localStorage.setItem('dietaryPreferences', JSON.stringify(preferences));
  };

  const handleHealthInfoUpdate = (info) => {
    setHealthInfo(info);
    localStorage.setItem('healthInfo', JSON.stringify(info));
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-32 bg-muted rounded-xl" />
            <div className="h-96 bg-muted rounded-xl" />
            <div className="h-96 bg-muted rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
            Profile Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your account preferences and personalize your fitness experience
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          <PersonalInfoSection
            info={personalInfo}
            unitSystem={unitSystem}
            onUpdate={handlePersonalInfoUpdate}
            onUnitToggle={handleUnitToggle}
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
