import Icon from '@/components/Icon';

export default function WorkoutStats({
  totalDays,
  totalExercises,
  avgDuration,
  totalCalories,
  difficulty,
  location
}) {
  const stats = [
    {
      icon: 'CalendarDaysIcon',
      label: 'Total Days',
      value: totalDays.toString(),
      color: 'text-primary'
    },
    {
      icon: 'FireIcon',
      label: 'Total Exercises',
      value: totalExercises.toString(),
      color: 'text-secondary'
    },
    {
      icon: 'ClockIcon',
      label: 'Avg Duration',
      value: avgDuration,
      color: 'text-accent'
    },
    {
      icon: 'BoltIcon',
      label: 'Total Calories',
      value: totalCalories,
      color: 'text-warning'
    },
    {
      icon: 'ChartBarIcon',
      label: 'Difficulty',
      value: difficulty,
      color: 'text-success'
    },
    {
      icon: 'MapPinIcon',
      label: 'Location',
      value: location,
      color: 'text-error'
    }
  ];

  return (
    <div className="bg-card rounded-xl shadow-warm-md border border-border p-6">
      <h2 className="text-xl font-heading font-semibold text-foreground mb-6 flex items-center gap-2">
        <Icon name="ChartBarIcon" variant="solid" size={24} className="text-primary" />
        Workout Statistics
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-background rounded-lg p-4 border border-border hover:border-primary/30 transition-smooth"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={stat.color}>
                <Icon name={stat.icon} variant="outline" size={20} />
              </div>
              <span className="text-sm text-caption text-muted-foreground">
                {stat.label}
              </span>
            </div>
            <div className="text-2xl font-heading font-bold text-foreground">
              {stat.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
