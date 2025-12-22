'use client';
import { useState, useEffect } from 'react';
import Icon from '@/components/Icon';
const motivationalQuotes = [
  {
    text: "The only bad workout is the one that didn't happen. Every step forward counts, no matter how small.",
    author: 'FitGenius AI',
  },
  {
    text: "Your body can stand almost anything. It's your mind that you have to convince.",
    author: 'FitGenius AI',
  },
  {
    text: 'Success is the sum of small efforts repeated day in and day out.',
    author: 'FitGenius AI',
  },
  {
    text: "Don't wish for it, work for it. Your future self will thank you.",
    author: 'FitGenius AI',
  },
  {
    text: 'The difference between try and triumph is a little umph!',
    author: 'FitGenius AI',
  },
];

export default function MotivationalQuote() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(motivationalQuotes[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsHydrated(true);

    const savedIndex = localStorage.getItem('dailyQuoteIndex');
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem('dailyQuoteDate');

    if (savedDate !== today) {
      const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
      setCurrentQuote(motivationalQuotes[randomIndex]);
      localStorage.setItem('dailyQuoteIndex', randomIndex.toString());
      localStorage.setItem('dailyQuoteDate', today);
    } else if (savedIndex) {
      setCurrentQuote(motivationalQuotes[parseInt(savedIndex, 10)]);
    }
  }, []);

  const refreshQuote = () => {
    setIsAnimating(true);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
      setCurrentQuote(motivationalQuotes[randomIndex]);

      if (isHydrated) {
        localStorage.setItem('dailyQuoteIndex', randomIndex.toString());
      }

      setIsAnimating(false);
    }, 300);
  };

  if (!isHydrated) {
    return (
      <div className="bg-gradient-to-br from-primary to-secondary rounded-xl p-8 shadow-warm-lg">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-full animate-pulse" />
          <div className="flex-1 space-y-3">
            <div className="h-4 bg-white/20 rounded w-3/4 animate-pulse" />
            <div className="h-4 bg-white/20 rounded w-full animate-pulse" />
            <div className="h-3 bg-white/20 rounded w-1/3 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-gradient-to-br from-primary to-secondary rounded-xl p-8 shadow-warm-lg overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="flex items-center justify-center w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full">
            <Icon
              name="SparklesIcon"
              variant="solid"
              size={24}
              className="text-white"
            />
          </div>

          {/* Quote */}
          <div className="flex-1 space-y-3">
            <div
              className={`transition-smooth ${
                isAnimating
                  ? 'opacity-0 scale-95'
                  : 'opacity-100 scale-100'
              }`}
            >
              <p className="text-lg font-medium text-white leading-relaxed">
                “{currentQuote.text}”
              </p>
              <p className="text-sm text-white/80 mt-3">
                — {currentQuote.author}
              </p>
            </div>
          </div>

          {/* Refresh Button */}
          <button
            onClick={refreshQuote}
            disabled={isAnimating}
            className="
              flex items-center justify-center w-10 h-10
              bg-white/20 backdrop-blur-sm rounded-full
              text-white transition-smooth
              hover:bg-white/30 active:scale-95
              focus:outline-none focus:ring-3 focus:ring-white/50
              disabled:opacity-50 disabled:cursor-not-allowed
            "
            aria-label="Get new motivational quote"
          >
            <Icon
              name="ArrowPathIcon"
              variant="outline"
              size={20}
              className={isAnimating ? 'animate-spin' : ''}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
