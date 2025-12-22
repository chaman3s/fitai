export default function GoalProgress({
  goalType,
  currentValue,
  targetValue,
  unit,
  icon
}) {
  const progress = Math.min((currentValue / targetValue) * 100, 100);
  const remaining = Math.max(targetValue - currentValue, 0);

  return (
    <div className="bg-card rounded-lg p-6 shadow-warm-md border border-border">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <span className="text-2xl">{icon}</span>
          </div>
          <div>
            <h3 className="font-heading font-semibold text-base text-foreground">
              {goalType}
            </h3>
            <p className="text-caption text-xs text-muted-foreground mt-0.5">
              Target: {targetValue} {unit}
            </p>
          </div>
        </div>
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-caption text-xs text-muted-foreground mb-1">
            Current
          </p>
          <p className="text-data text-2xl font-bold text-primary">
            {currentValue}
            <span className="text-sm font-normal text-muted-foreground ml-1">
              {unit}
            </span>
          </p>
        </div>

        <div>
          <p className="text-caption text-xs text-muted-foreground mb-1">
            Remaining
          </p>
          <p className="text-data text-2xl font-bold text-foreground">
            {remaining}
            <span className="text-sm font-normal text-muted-foreground ml-1">
              {unit}
            </span>
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-caption text-xs font-medium text-muted-foreground">
            Progress
          </span>
          <span className="text-caption text-xs font-bold text-primary">
            {progress.toFixed(1)}%
          </span>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-smooth"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
