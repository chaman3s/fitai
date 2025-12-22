'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/Icon';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light'); 
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

    setTheme(initialTheme);
    document.documentElement.classList.toggle(
      'dark',

    );
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle(
      'dark',
      newTheme === 'dark'
    );
  };

  if (!mounted) {
    return (
      <button
        className="p-2 rounded-lg bg-muted"
        aria-label="Toggle theme"
        disabled
      >
        <div className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="
        p-2 rounded-lg
        bg-muted hover:bg-muted/80
        text-foreground
        transition-smooth
        focus:outline-none focus:ring-3 focus:ring-primary focus:ring-offset-2
        active:scale-97
      "
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      aria-pressed={theme === 'dark'}
    >
      {theme === 'light' ? (
        <Icon name="MoonIcon" variant="outline" size={20} />
      ) : (
        <Icon name="SunIcon" variant="solid" size={20} />
      )}
    </button>
  );
}
