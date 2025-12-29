import Icon from '@/components/Icon';

export default function ProfileSummaryCard({ profile, onEdit }) {
  console.log('Profile data in ProfileSummaryCard:', profile);
  return (
    <div className="bg-card rounded-xl shadow-warm-md p-6 border border-border">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-heading font-bold text-foreground mb-1">
            Your Profile Summary
          </h2>
          <p className="text-caption text-muted-foreground">
            Review your current fitness profile before generating plans
          </p>
        </div>
        <button
          onClick={onEdit}
          className="flex items-center gap-2 px-4 py-2 bg-muted hover:bg-muted/80 text-foreground rounded-lg transition-smooth focus:outline-none focus:ring-3 focus:ring-primary"
          aria-label="Edit profile"
        >
          <Icon name="PencilIcon" variant="outline" size={18} />
          <span className="text-caption font-medium">Edit</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="UserIcon" variant="outline" size={20} className="text-primary" />
          </div>
          <div>
            <p className="text-caption text-muted-foreground text-sm">Name</p>
            <p className="text-foreground font-medium">{profile?.name || 'N/A'}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-secondary/10 rounded-lg">
            <Icon name="CalendarIcon" variant="outline" size={20} className="text-secondary" />
          </div>
          <div>
            <p className="text-caption text-muted-foreground text-sm">Age & Gender</p>
            <p className="text-foreground font-medium">
              {profile.age} years • {profile.gender}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
            <Icon name="ScaleIcon" variant="outline" size={20} className="text-accent" />
          </div>
          <div>
            <p className="text-caption text-muted-foreground text-sm">Physical Stats</p>
            <p className="text-foreground font-medium">
              {profile.height} • {profile.weight}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-lg">
            <Icon name="TrophyIcon" variant="outline" size={20} className="text-success" />
          </div>
          <div>
            <p className="text-caption text-muted-foreground text-sm">Fitness Goal</p>
            <p className="text-foreground font-medium">{profile.fitnessGoals}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-warning/10 rounded-lg">
            <Icon name="FireIcon" variant="outline" size={20} className="text-warning" />
          </div>
          <div>
            <p className="text-caption text-muted-foreground text-sm">Fitness Level</p>
            <p className="text-foreground font-medium">{profile.fitnessLavel}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="MapPinIcon" variant="outline" size={20} className="text-primary" />
          </div>
          <div>
            <p className="text-caption text-muted-foreground text-sm">Workout Location</p>
            <p className="text-foreground font-medium">{profile.preferredWorkoutLocation}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-secondary/10 rounded-lg">
            <Icon name="HeartIcon" variant="outline" size={20} className="text-secondary" />
          </div>
          <div>
            <p className="text-caption text-muted-foreground text-sm">Diet Type</p>
            <p className="text-foreground font-medium">{profile.dietType}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
