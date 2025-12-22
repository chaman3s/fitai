import Icon from '@/components/Icon';

export default function DailyNutritionSummary({
  totalCalories,
  totalProtein,
  totalCarbs,
  totalFats,
  totalFiber,
  targetCalories,
  targetProtein,
  targetCarbs,
  targetFats,
}) {
  const calculatePercentage = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  const macros = [
    {
      label: 'Calories',
      current: totalCalories,
      target: targetCalories,
      unit: 'kcal',
      color: 'bg-primary',
      icon: 'FireIcon',
    },
    {
      label: 'Protein',
      current: totalProtein,
      target: targetProtein,
      unit: 'g',
      color: 'bg-secondary',
      icon: 'BoltIcon',
    },
    {
      label: 'Carbs',
      current: totalCarbs,
      target: targetCarbs,
      unit: 'g',
      color: 'bg-accent',
      icon: 'CubeIcon',
    },
    {
      label: 'Fats',
      current: totalFats,
      target: targetFats,
      unit: 'g',
      color: 'bg-warning',
      icon: 'BeakerIcon',
    },
  ];

  return (
    <div className="bg-card rounded-xl shadow-warm-md p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-heading font-bold text-foreground">
          Daily Nutrition Summary
        </h2>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon
            name="ChartBarIcon"
            variant="solid"
            size={18}
            className="text-primary"
          />
          <span>Target Progress</span>
        </div>
      </div>

      {/* MACROS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {macros.map((macro) => {
          const percentage = calculatePercentage(macro.current, macro.target);

          return (
            <div key={macro.label} className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 ${macro.color} rounded-lg flex items-center justify-center`}
                  >
                    <Icon
                      name={macro.icon}
                      variant="solid"
                      size={16}
                      className="text-white"
                    />
                  </div>
                  <span className="text-sm font-medium text-foreground">
                    {macro.label}
                  </span>
                </div>

                <span className="text-xs font-bold text-primary">
                  {percentage.toFixed(0)}%
                </span>
              </div>

              <div className="mb-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-foreground">
                    {macro.current}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    / {macro.target} {macro.unit}
                  </span>
                </div>
              </div>

              <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full ${macro.color} transition-smooth`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* FIBER INFO */}
      <div className="bg-success/10 border border-success/20 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Icon
            name="CheckCircleIcon"
            variant="solid"
            size={20}
            className="text-success flex-shrink-0 mt-0.5"
          />
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-1">
              Additional Nutrients
            </h3>
            <p className="text-sm text-muted-foreground">
              Fiber:{' '}
              <span className="font-bold text-foreground">
                {totalFiber}g
              </span>{' '}
              (Target: 25–30g daily)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
