'use client';
import { useState } from 'react';
import Icon from '@/components/Icon';

export default function AccountSecuritySection({
  email,
  lastPasswordChange
}) {
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    if (newPassword.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }

    alert('Password changed successfully');
    setShowPasswordChange(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <div className="bg-card rounded-xl shadow-warm-md p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-warning/10 rounded-lg">
          <Icon name="ShieldCheckIcon" variant="solid" size={24} className="text-warning" />
        </div>
        <div>
          <h2 className="text-xl font-heading font-semibold text-foreground">
            Account Security
          </h2>
          <p className="text-caption text-sm text-muted-foreground">
            Manage your account security settings
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Email */}
        <div>
          <label className="block text-sm font-caption font-medium text-foreground mb-2">
            Email Address
          </label>
          <div className="flex items-center gap-3 px-4 py-3 bg-muted rounded-lg">
            <Icon name="EnvelopeIcon" variant="outline" size={20} className="text-muted-foreground" />
            <span className="text-caption font-medium text-foreground">{email}</span>
            <span className="ml-auto flex items-center gap-1 px-2 py-1 bg-success/10 rounded text-caption text-xs font-medium text-success">
              <Icon name="CheckBadgeIcon" variant="solid" size={14} />
              Verified
            </span>
          </div>
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-caption font-medium text-foreground">
              Password
            </label>
            <button
              onClick={() => setShowPasswordChange(!showPasswordChange)}
              className="text-caption text-sm text-primary font-medium transition-smooth hover:text-primary/80"
            >
              {showPasswordChange ? 'Cancel' : 'Change Password'}
            </button>
          </div>

          {!showPasswordChange ? (
            <div className="flex items-center gap-3 px-4 py-3 bg-muted rounded-lg">
              <Icon name="LockClosedIcon" variant="outline" size={20} className="text-muted-foreground" />
              <span className="text-caption font-medium text-foreground">••••••••••••</span>
              <span className="ml-auto text-caption text-xs text-muted-foreground">
                Last changed: {lastPasswordChange}
              </span>
            </div>
          ) : (
            <div className="space-y-4 p-4 bg-background border border-border rounded-lg">
              {/* Current Password */}
              <div>
                <label className="block text-sm font-caption font-medium text-foreground mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 bg-card border border-border rounded-lg"
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <Icon
                      name={showCurrentPassword ? 'EyeSlashIcon' : 'EyeIcon'}
                      variant="outline"
                      size={20}
                    />
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-caption font-medium text-foreground mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 bg-card border border-border rounded-lg"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <Icon
                      name={showNewPassword ? 'EyeSlashIcon' : 'EyeIcon'}
                      variant="outline"
                      size={20}
                    />
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-caption font-medium text-foreground mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 bg-card border border-border rounded-lg"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <Icon
                      name={showConfirmPassword ? 'EyeSlashIcon' : 'EyeIcon'}
                      variant="outline"
                      size={20}
                    />
                  </button>
                </div>
              </div>

              <button
                onClick={handlePasswordChange}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg"
              >
                <Icon name="CheckIcon" variant="outline" size={18} />
                Update Password
              </button>

              <p className="text-caption text-xs text-muted-foreground">
                Password must be at least 8 characters long
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
