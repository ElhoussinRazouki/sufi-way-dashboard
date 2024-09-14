'use client';

import { useUser } from '@/hooks/auth.hook';
import { useEffect, useState } from 'react';
import { appWithTranslation } from 'next-i18next';

export default function EntryPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const { isAuthenticated } = useUser();

  useEffect(() => {
    if (isAuthenticated) {
      window.location.replace('/dashboard');
    } else {
      window.location.replace('/auth/signin');
    }
  }, [isAuthenticated]);

  if (!mounted) return null; // Prevent SSR

  return null;
}

// export default appWithTranslation(EntryPage);
