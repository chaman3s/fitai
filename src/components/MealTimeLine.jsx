import Icon from '@/components/Icon';

export default function MealTimeline({ timeline }) {
  return (
    <div className="bg-card rounded-xl shadow-warm-md p-6">
      <div className="flex items-center gap-2 mb-6">
        <Icon name="ClockIcon" variant="solid" size={20} className="text-primary" />
        <h2 className="text-xl font-heading font-bold text-foreground">
          Meal Schedule
        </h2>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border" />

        {/* Timeline Items */}
        <div className="space-y-6">
          {timeline.map((item) => (
            <div key={item.id} className="relative flex items-start gap-4">
              {/* Timeline Dot */}
              <div
                className={`relative z-10 w-10 h-10 ${item.color} rounded-full flex items-center justify-center shadow-warm-md`}
              >
                <Icon
                  name={item.icon}
                  variant="solid"
                  size={18}
                  className="text-white"
                />
              </div>

              {/* Content */}
              <div className="flex-1 pt-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-base font-heading font-semibold text-foreground">
                    {item.mealType}
                  </h3>
                  <span className="text-sm font-bold text-primary">
                    {item.calories} kcal
                  </span>
                </div>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Icon name="ClockIcon" variant="outline" size={14} />
                  {item.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
