'use client';

import Icon from '@/components/Icon';

export default function PlanActions({
  onRegenerate,
  onExportPDF,
  onShare,
}) {
  return (
    <div className="bg-card rounded-xl shadow-warm-md border border-border p-6">
      <h2 className="text-xl font-heading font-semibold text-foreground mb-6 flex items-center gap-2">
        <Icon
          name="Cog6ToothIcon"
          variant="solid"
          size={24}
          className="text-primary"
        />
        Plan Actions
      </h2>

      <div className="space-y-3">
        <button
          onClick={onRegenerate}
          className="w-full flex items-center justify-between px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-smooth shadow-warm-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <span className="flex items-center gap-3">
            <Icon name="ArrowPathIcon" variant="solid" size={20} />
            <span className="font-caption font-medium">Regenerate Plan</span>
          </span>
          <Icon name="ChevronRightIcon" variant="outline" size={20} />
        </button>

        <button
          onClick={onExportPDF}
          className="w-full flex items-center justify-between px-4 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-smooth shadow-warm-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
        >
          <span className="flex items-center gap-3">
            <Icon name="ArrowDownTrayIcon" variant="solid" size={20} />
            <span className="font-caption font-medium">Export as PDF</span>
          </span>
          <Icon name="ChevronRightIcon" variant="outline" size={20} />
        </button>

        <button
          onClick={onShare}
          className="w-full flex items-center justify-between px-4 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-smooth shadow-warm-sm focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
        >
          <span className="flex items-center gap-3">
            <Icon name="ShareIcon" variant="solid" size={20} />
            <span className="font-caption font-medium">Share Plan</span>
          </span>
          <Icon name="ChevronRightIcon" variant="outline" size={20} />
        </button>

        <div className="pt-3 border-t border-border">
          <button className="w-full flex items-center justify-between px-4 py-3 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-smooth focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
            <span className="flex items-center gap-3">
              <Icon
                name="AdjustmentsHorizontalIcon"
                variant="outline"
                size={20}
              />
              <span className="font-caption font-medium">
                Adjust Difficulty
              </span>
            </span>
            <Icon name="ChevronRightIcon" variant="outline" size={20} />
          </button>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex gap-3">
          <Icon
            name="LightBulbIcon"
            variant="solid"
            size={20}
            className="text-primary flex-shrink-0 mt-0.5"
          />
          <div>
            <h4 className="text-sm font-heading font-semibold text-foreground mb-1">
              Pro Tip
            </h4>
            <p className="text-sm text-caption text-muted-foreground">
              Export your plan as PDF for offline access during workouts. You
              can also regenerate specific days if needed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
