'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import AppImage from '@/components/AppImage';

export default function PlanCard({
  type,
  title,
  description,
  todayHighlight,
  progress,
  imageUrl,
  imageAlt,
  detailsPath,
  onPlayAudio,
  onExportPDF,
  onRegenerate,
}) {
  const [isHovered, setIsHovered] = useState(false);

  const iconName = type === 'workout' ? 'FireIcon' : 'HeartIcon';
  const bgGradient =
    type === 'workout'
      ? 'from-primary/10 to-secondary/10'
      : 'from-accent/10 to-primary/10';

  return (
    <div
      className={`
        relative overflow-hidden rounded-xl bg-card shadow-warm-lg
        border border-border transition-smooth hover:shadow-warm-xl
        ${isHovered ? 'scale-[1.02]' : 'scale-100'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header with Image */}
      <div className="relative h-48 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient}`} />
        <AppImage
          src={imageUrl}
          alt={imageAlt}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-card/90 backdrop-blur-sm px-3 py-2 rounded-lg">
          <Icon name={iconName} variant="solid" size={20} className="text-primary" />
          <span className="font-semibold text-sm text-foreground">
            {title}
          </span>
        </div>
      </div>
      <div className="p-6 space-y-4">
        <p className="text-muted-foreground">{description}</p>
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Icon
              name="SparklesIcon"
              variant="solid"
              size={20}
              className="text-accent mt-0.5"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-sm text-foreground mb-1">
                Today's Focus
              </h4>
              <p className="text-sm text-muted-foreground">
                {todayHighlight}
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">
              Weekly Progress
            </span>
            <span className="text-xs font-bold text-primary">
              {progress}%
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-smooth"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={onPlayAudio}
            className="
              flex items-center justify-center gap-2 px-4 py-3 rounded-lg
              bg-primary text-primary-foreground font-medium text-sm
              transition-smooth hover:bg-primary/90 active:scale-97
              focus:outline-none focus:ring-3 focus:ring-primary focus:ring-offset-2
            "
            aria-label={`Play ${title} audio narration`}
          >
            <Icon name="SpeakerWaveIcon" variant="solid" size={18} />
            <span>Play Audio</span>
          </button>

          <button
            onClick={onExportPDF}
            className="
              flex items-center justify-center gap-2 px-4 py-3 rounded-lg
              bg-secondary text-secondary-foreground font-medium text-sm
              transition-smooth hover:bg-secondary/90 active:scale-97
              focus:outline-none focus:ring-3 focus:ring-secondary focus:ring-offset-2
            "
            aria-label={`Export ${title} as PDF`}
          >
            <Icon name="ArrowDownTrayIcon" variant="outline" size={18} />
            <span>Export PDF</span>
          </button>
        </div>
        <div className="flex items-center gap-3 pt-2">
          <Link
            href={detailsPath}
            className="
              flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg
              border border-border bg-background text-foreground
              font-medium text-sm transition-smooth
              hover:bg-muted active:scale-97
              focus:outline-none focus:ring-3 focus:ring-primary focus:ring-offset-2
            "
          >
            <Icon name="EyeIcon" variant="outline" size={18} />
            <span>View Details</span>
          </Link>

          <button
            onClick={onRegenerate}
            className="
              flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg
              border border-border bg-background text-foreground
              font-medium text-sm transition-smooth
              hover:bg-muted active:scale-97
              focus:outline-none focus:ring-3 focus:ring-primary focus:ring-offset-2
            "
            aria-label={`Regenerate ${title}`}
          >
            <Icon name="ArrowPathIcon" variant="outline" size={18} />
            <span>Regenerate</span>
          </button>
        </div>
      </div>
    </div>
  );
}
