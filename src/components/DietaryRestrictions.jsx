import Icon from '@/components/Icon';

export default function DietaryRestrictions({ restrictions }) {
  const activeRestrictions = restrictions.filter(
    (restriction) => restriction.active
  );

  if (activeRestrictions.length === 0) {
    return null;
  }

  return (
    <div className="bg-card rounded-xl shadow-warm-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <Icon
          name="ShieldCheckIcon"
          variant="solid"
          size={20}
          className="text-primary"
        />
        <h2 className="text-xl font-heading font-bold text-foreground">
          Dietary Preferences
        </h2>
      </div>

      <div className="flex flex-wrap gap-2">
        {activeRestrictions.map((restriction) => (
          <div
            key={restriction.id}
            className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-lg"
          >
            <Icon
              name={restriction.icon}
              variant="solid"
              size={16}
              className="text-primary"
            />
            <span className="text-sm font-medium text-foreground">
              {restriction.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-muted/30 rounded-lg">
        <p className="text-sm text-muted-foreground">
          All meals in this plan comply with your selected dietary preferences
          and restrictions.
        </p>
      </div>
    </div>
  );
}
