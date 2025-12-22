import Icon from '@/components/Icon';

export default function GenerationProgress({ stages, currentTip }) {
  return (
    <div className="bg-card rounded-xl shadow-warm-lg p-8 border border-border">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full mb-4 animate-pulse">
          <Icon
            name="SparklesIcon"
            variant="solid"
            size={32}
            className="text-white"
          />
        </div>

        <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
          Generating Your Personalized Plans
        </h2>

        <p className="text-caption text-muted-foreground">
          Our AI is crafting the perfect fitness journey for you
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {stages.map((stage) => {
          const isActive = stage.status === 'active';
          const isCompleted = stage.status === 'completed';

          return (
            <div key={stage.id} className="flex items-center gap-4">
              <div
                className={`
                  flex items-center justify-center w-10 h-10 rounded-full transition-smooth
                  ${isCompleted
                    ? 'bg-success'
                    : isActive
                    ? 'bg-primary animate-pulse'
                    : 'bg-muted'}
                `}
              >
                {isCompleted ? (
                  <Icon
                    name="CheckIcon"
                    variant="solid"
                    size={20}
                    className="text-white"
                  />
                ) : (
                  <Icon
                    name={stage.icon}
                    variant={isActive ? 'solid' : 'outline'}
                    size={20}
                    className={
                      isActive ? 'text-white' : 'text-muted-foreground'
                    }
                  />
                )}
              </div>

              <div className="flex-1">
                <p
                  className={`
                    text-base font-medium
                    ${isCompleted
                      ? 'text-success'
                      : isActive
                      ? 'text-primary'
                      : 'text-muted-foreground'}
                  `}
                >
                  {stage.label}
                </p>
              </div>

              {isActive && (
                <div className="flex gap-1">
                  <span
                    className="w-2 h-2 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: '0ms' }}
                  />
                  <span
                    className="w-2 h-2 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: '150ms' }}
                  />
                  <span
                    className="w-2 h-2 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: '300ms' }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6 border border-primary/20">
        <div className="flex items-start gap-3">
          <Icon
            name="LightBulbIcon"
            variant="solid"
            size={24}
            className="text-primary flex-shrink-0 mt-1"
          />
          <div>
            <p className="text-sm font-medium text-foreground mb-1">
              Pro Tip
            </p>
            <p className="text-caption text-muted-foreground">
              {currentTip}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
