import Icon from '@/components/Icon';

export default function ErrorMessage({ message, onRetry, onCancel }) {
  return (
    <div className="bg-card rounded-xl shadow-warm-lg p-8 border-2 border-error/20">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-error/10 rounded-full mb-4">
          <Icon
            name="ExclamationTriangleIcon"
            variant="solid"
            size={32}
            className="text-error"
          />
        </div>

        <h2 className="text-2xl font-heading font-bold text-foreground mb-2">
          Generation Failed
        </h2>

        <p className="text-caption text-muted-foreground max-w-md mx-auto">
          {message}
        </p>
      </div>

      <div className="bg-error/5 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <Icon
            name="InformationCircleIcon"
            variant="solid"
            size={20}
            className="text-error flex-shrink-0 mt-0.5"
          />

          <div className="text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-1">
              Troubleshooting Tips:
            </p>
            <ul className="space-y-1 list-disc list-inside">
              <li>Check your internet connection</li>
              <li>Verify your profile information is complete</li>
              <li>Try adjusting your customization preferences</li>
              <li>Contact support if the issue persists</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 px-6 py-3 bg-muted hover:bg-muted/80 text-foreground rounded-lg transition-smooth focus:outline-none focus:ring-3 focus:ring-primary font-medium"
        >
          Cancel
        </button>

        <button
          onClick={onRetry}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white rounded-lg transition-smooth focus:outline-none focus:ring-3 focus:ring-primary shadow-warm-md font-medium"
        >
          <Icon name="ArrowPathIcon" variant="solid" size={20} />
          Retry Generation
        </button>
      </div>
    </div>
  );
}
