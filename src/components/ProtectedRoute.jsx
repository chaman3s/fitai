'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useAuth } from '@/contexts/authContext';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const redirected = useRef(false);

  useEffect(() => {
    if (!loading && !user && !redirected.current) {
      redirected.current = true;
      router.replace('/login');
    }
  }, [loading, user, router]);

  if (loading) {
    return <div className="p-8">Checking authentication…</div>;
  }

  if (!user) {
    return <div className="p-8">Redirecting to login…</div>;
  }

  return children;
}
