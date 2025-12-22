import Icon from '@/components/Icon';

export default function ActivitySummary({ activities }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success bg-success/10';
      case 'pending':
        return 'text-warning bg-warning/10';
      case 'skipped':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircleIcon';
      case 'pending':
        return 'ClockIcon';
      case 'skipped':
        return 'XCircleIcon';
      default:
        return 'QuestionMarkCircleIcon';
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-warm-md border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-lg text-foreground">
          Today&apos;s Activities
        </h3>
        <span className="text-xs font-medium text-muted-foreground">
          {activities.filter(a => a.status === 'completed').length} / {activities.length} completed
        </span>
      </div>

      <div className="space-y-3">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 border border-border transition-smooth hover:bg-muted"
          >
            {/* Activity Icon */}
            <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
              <span className="text-xl">{activity.icon}</span>
            </div>

            {/* Activity Details */}
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm text-foreground truncate">
                {activity.title}
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                {activity.time}
              </p>
            </div>

            {/* Status Badge */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${getStatusColor(
                activity.status
              )}`}
            >
              <Icon
                name={getStatusIcon(activity.status)}
                variant="solid"
                size={14}
              />
              <span className="text-xs font-medium capitalize">
                {activity.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
