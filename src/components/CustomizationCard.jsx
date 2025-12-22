'use client';

import Icon from '@/components/Icon';

export default function CustomizationCard({
  title,
  description,
  options,
  selectedValue,
  onSelect,
  icon
}) {
  return (
    <div className="bg-card rounded-xl shadow-warm-md p-6 border border-border">
      <div className="flex items-start gap-3 mb-4">
        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg">
          <Icon name={icon} variant="solid" size={24} className="text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-heading font-semibold text-foreground mb-1">
            {title}
          </h3>
          <p className="text-caption text-muted-foreground text-sm">
            {description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {options.map((option) => {
          const isSelected = selectedValue === option.value;
          return (
            <button
              key={option.id}
              onClick={() => onSelect(option.value)}
              className={`
                flex flex-col items-start gap-2 p-4 rounded-lg border-2 transition-smooth
                focus:outline-none focus:ring-3 focus:ring-primary
                ${
                  isSelected
                    ? 'border-primary bg-primary/5 shadow-warm-sm'
                    : 'border-border bg-background hover:border-primary/50 hover:bg-muted/50'
                }
              `}
              aria-pressed={isSelected}
            >
              <div className="flex items-center gap-2 w-full">
                <Icon
                  name={option.icon}
                  variant={isSelected ? 'solid' : 'outline'}
                  size={20}
                  className={isSelected ? 'text-primary' : 'text-muted-foreground'}
                />
                <span
                  className={`text-base font-medium ${
                    isSelected ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  {option.label}
                </span>
                {isSelected && (
                  <Icon
                    name="CheckCircleIcon"
                    variant="solid"
                    size={18}
                    className="text-primary ml-auto"
                  />
                )}
              </div>
              <p className="text-caption text-muted-foreground text-sm text-left">
                {option.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
