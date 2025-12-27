'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/Icon';
import ThemeToggle from '@/components/Theme';

const navigationItems = [
 
  {
    label: 'Workout Plans',
    path: '/workoutPlanDetails',
    icon: 'FireIcon',
    tooltip: 'Access your exercise routines',
  },
  {
    label: 'Diet Plans',
    path: '/dietPlanDetails',
    icon: 'HeartIcon',
    tooltip: 'Manage your nutrition plans',
  },
  {
    label: 'Generate Plans',
    path: '/planGeneration',
    icon: 'SparklesIcon',
    tooltip: 'Create personalized AI plans',
  },
  {
    label: 'Profile',
    path: '/userProfileSettings',
    icon: 'UserCircleIcon',
    tooltip: 'Manage your account settings',
  },
];

export default function Nav() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      {/* Desktop Navbar */}
      <nav
        className="hidden md:flex fixed top-0 left-0 right-0 bg-card shadow-warm-md z-navigation"
        aria-label="Primary navigation"
      >
        <div className="w-full mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link
              href="/"
              className="flex items-center gap-3 transition-smooth hover:opacity-80"
              aria-label="FitGenius AI Home"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl shadow-warm-md">
                <Icon name="BoltIcon" variant="solid" size={28} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-heading font-bold text-foreground leading-none">
                  FitGenius AI
                </span>
                <span className="text-xs text-caption text-muted-foreground mt-0.5">
                  Your Fitness Companion
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-2">
              {navigationItems.map((item) => {
                const isActive = pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`
                      flex items-center gap-2 px-6 py-3 rounded-lg
                      font-caption font-medium text-base
                      transition-smooth
                      focus:outline-none focus:ring-3 focus:ring-primary focus:ring-offset-2
                      ${
                        isActive
                          ? 'bg-primary text-primary-foreground shadow-warm-md'
                          : 'text-foreground hover:bg-muted hover:text-primary'
                      }
                    `}
                    aria-label={item.tooltip}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon
                      name={item.icon}
                      variant={isActive ? 'solid' : 'outline'}
                      size={20}
                    />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              <div className="ml-2 pl-2 border-l border-border hidden">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navbar */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 bg-card shadow-warm-lg z-navigation"
        aria-label="Primary navigation"
      >
        <div className="grid grid-cols-5 gap-1 px-2 py-2">
          {navigationItems.map((item) => {
            const isActive = pathname === item.path;

            return (
              <Link
                key={item.path}
                href={item.path}
                className={`
                  flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-lg
                  transition-smooth
                  focus:outline-none focus:ring-2 focus:ring-primary
                  ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground active:bg-muted'
                  }
                `}
                aria-label={item.tooltip}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon
                  name={item.icon}
                  variant={isActive ? 'solid' : 'outline'}
                  size={24}
                />
                <span className="text-caption text-xs font-medium leading-none">
                  {item.label.split(' ')[0]}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
      <div className="hidden md:block h-20" aria-hidden="true" />
      <div className="md:hidden h-16" aria-hidden="true" />
    </>
  );
}
