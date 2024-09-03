'use client';

import { useUser } from '@/hooks/auth.hook';
import { useEffect, useState } from 'react';

function EntryPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const { isAuthenticated } = useUser();

  if (!mounted) return null; // Prevent SSR

  if (isAuthenticated) {
    return window.location.replace('/dashboard');
  } else {
    return window.location.replace('/auth/signin');
  }
}

export default EntryPage;
