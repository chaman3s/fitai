'use client';

import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/Icon';

export default function AudioPlayer({ onPlayWorkout, isPlaying }) {
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(180); // Mock 3 minutes
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= duration) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            return duration;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, duration]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (progress / duration) * 100;

  return (
    <div className="bg-gradient-to-br from-primary to-secondary rounded-xl shadow-warm-lg p-6 text-white">
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg backdrop-blur-sm">
          <Icon name="SpeakerWaveIcon" variant="solid" size={24} />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-heading font-semibold">
            Audio Narration
          </h3>
          <p className="text-sm text-white/80 text-caption">
            AI-powered workout guidance
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-caption text-white/80 mt-2">
          <span>{formatTime(progress)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => setProgress(Math.max(0, progress - 10))}
          className="p-2 hover:bg-white/10 rounded-lg transition-smooth focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Rewind 10 seconds"
        >
          <Icon name="BackwardIcon" variant="solid" size={20} />
        </button>

        <button
          onClick={onPlayWorkout}
          className="flex items-center justify-center w-14 h-14 bg-white text-primary rounded-full hover:scale-105 transition-smooth shadow-warm-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
          aria-label={isPlaying ? 'Pause narration' : 'Play narration'}
        >
          <Icon
            name={isPlaying ? 'PauseIcon' : 'PlayIcon'}
            variant="solid"
            size={24}
          />
        </button>

        <button
          onClick={() => setProgress(Math.min(duration, progress + 10))}
          className="p-2 hover:bg-white/10 rounded-lg transition-smooth focus:outline-none focus:ring-2 focus:ring-white/50"
          aria-label="Forward 10 seconds"
        >
          <Icon name="ForwardIcon" variant="solid" size={20} />
        </button>
      </div>

      {/* Volume Control */}
      <div className="mt-4 flex items-center gap-3">
        <Icon name="SpeakerWaveIcon" variant="outline" size={18} />
        <input
          type="range"
          min="0"
          max="100"
          defaultValue="70"
          className="flex-1 h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
          aria-label="Volume control"
        />
        <Icon name="SpeakerWaveIcon" variant="solid" size={18} />
      </div>
    </div>
  );
}
