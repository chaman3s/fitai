'use client';

import { useState, useEffect } from 'react';

export default function AITipsMotivation({ onError }) {
  const [currentTip, setCurrentTip] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('lifestyle');

  // Fetch initial tip on mount
  useEffect(() => {
    fetchTip('lifestyle');
  }, []);

  const fetchTip = async (category) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/tip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch tip');
      }

      const data = await response.json();
      setCurrentTip(data);
      setActiveCategory(category);
    } catch (error) {
      console.error('Error fetching AI tip:', error);
      if (onError) {
        onError(error.message || 'Failed to generate tip. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    if (category !== activeCategory && !isLoading) {
      fetchTip(category);
    }
  };

  const handleRefresh = () => {
    if (!isLoading) {
      fetchTip(activeCategory);
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-warm-lg hover:shadow-warm-xl transition-all">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <span className="text-2xl">{currentTip?.icon || '✨'}</span>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                AI Tips & Motivation
              </h3>
              <p className="text-xs text-muted-foreground">
                Powered by Gemini AI
              </p>
            </div>
          </div>

          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="p-2 hover:bg-muted rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Get new tip"
          >
            <svg
              className={`w-5 h-5 text-muted-foreground ${
                isLoading ? 'animate-spin' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => handleCategoryChange('lifestyle')}
            disabled={isLoading}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
              activeCategory === 'lifestyle'
                ? 'bg-primary text-primary-foreground shadow-warm'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            🌟 Lifestyle
          </button>

          <button
            onClick={() => handleCategoryChange('posture')}
            disabled={isLoading}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
              activeCategory === 'posture'
                ? 'bg-primary text-primary-foreground shadow-warm'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            🧘 Posture
          </button>

          <button
            onClick={() => handleCategoryChange('motivation')}
            disabled={isLoading}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
              activeCategory === 'motivation'
                ? 'bg-primary text-primary-foreground shadow-warm'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            💪 Motivation
          </button>
        </div>

        {/* Tip Content */}
        <div className="relative min-h-[120px]">
          {isLoading ? (
            <div className="flex items-center justify-center h-[120px]">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-muted-foreground">
                  Generating tip...
                </p>
              </div>
            </div>
          ) : currentTip ? (
            <div className="space-y-3">
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-4 border border-primary/20">
                <p className="text-sm text-foreground leading-relaxed">
                  {currentTip.tip}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="capitalize">
                  {currentTip.category} Tip
                </span>
                <span>
                  {new Date(currentTip.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-[120px] text-muted-foreground">
              <p className="text-sm">Click a category to get started!</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            Tips generated by Google Gemini AI • Refresh for new insights
          </p>
        </div>
      </div>
    </div>
  );
}
