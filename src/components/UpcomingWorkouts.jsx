import Icon from '@/components/Icon';

export default function UpcomingWorkouts({ workouts }) {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'text-success bg-success/10';
      case 'Intermediate':
        return 'text-warning bg-warning/10';
      case 'Advanced':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-warm-md border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-lg text-foreground">
          Upcoming Workouts
        </h3>
        <Icon
          name="CalendarIcon"
          variant="outline"
          size={20}
          className="text-muted-foreground"
        />
      </div>

      <div className="space-y-4">
        {workouts.map((workout, index) => (
          <div key={workout.id} className="relative">
            {/* Timeline Connector */}
            {index < workouts.length - 1 && (
              <div className="absolute left-5 top-12 bottom-0 w-0.5 bg-border" />
            )}

            <div className="flex gap-4">
              {/* Date Badge */}
              <div className="flex-shrink-0 flex flex-col items-center justify-center w-10 h-10 bg-primary text-primary-foreground rounded-lg font-bold text-xs">
                <span>{workout.date.split('/')[1]}</span>
              </div>

              {/* Workout Details */}
              <div className="flex-1 bg-muted/50 rounded-lg p-4 border border-border">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-sm text-foreground">
                      {workout.day}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {workout.focus}
                    </p>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                      workout.difficulty
                    )}`}
                  >
                    {workout.difficulty}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <Icon
                      name="FireIcon"
                      variant="outline"
                      size={14}
                      className="text-muted-foreground"
                    />
                    <span className="text-xs text-muted-foreground">
                      {workout.exercises} exercises
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Icon
                      name="ClockIcon"
                      variant="outline"
                      size={14}
                      className="text-muted-foreground"
                    />
                    <span className="text-xs text-muted-foreground">
                      {workout.duration} min
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
