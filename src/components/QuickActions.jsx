'use client';
import Link from 'next/link';
import Icon from '@/components/Icon';

const quickActions = [
  {
    id: 1,
    title: 'Generate New Plan',
    description: 'Create personalized AI fitness plan',
    icon: 'SparklesIcon',
    href: '/planGeneration',
    color: 'from-primary to-secondary',
  },
  {
    id: 2,
    title: 'View Workout Plan',
    description: 'Access detailed exercise routines',
    icon: 'FireIcon',
    href: '/workoutPlanDetails',
    color: 'from-accent to-primary',
  },
  {
    id: 3,
    title: 'View Diet Plan',
    description: 'Check your nutrition schedule',
    icon: 'HeartIcon',
    href: '/dietPlanDetails',
    color: 'from-secondary to-accent',
  },
  {
    id: 4,
    title: 'Update Profile',
    description: 'Modify your fitness preferences',
    icon: 'UserCircleIcon',
    href: '/userProfileSettings',
    color: 'from-primary to-accent',
  },
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {quickActions.map((action) => (
        <Link
          key={action.id}
          href={action.href}
          className="
            group relative overflow-hidden rounded-xl p-6
            bg-card border border-border shadow-warm-md
            transition-smooth hover:shadow-warm-lg hover:scale-[1.02]
            focus:outline-none focus:ring-3 focus:ring-primary focus:ring-offset-2
          "
        >
          {/* Gradient Background */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${action.color}
            opacity-0 group-hover:opacity-10 transition-smooth`}
          />

          {/* Content */}
          <div className="relative space-y-3">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-smooth">
              <Icon
                name={action.icon}
                variant="outline"
                size={24}
                className="text-primary group-hover:scale-110 transition-smooth"
              />
            </div>

            <div>
              <h4 className="font-semibold text-base text-foreground mb-1">
                {action.title}
              </h4>
              <p className="text-sm text-muted-foreground">
                {action.description}
              </p>
            </div>

            <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-smooth">
              <span className="text-sm font-medium">Get Started</span>
              <Icon name="ArrowRightIcon" variant="outline" size={16} />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
