'use client';

import { Toaster } from '@/components/ui/toaster';
import '@uploadthing/react/styles.css';
import NextTopLoader from 'nextjs-toploader';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/components/layout/providers';
import { useEffect, useState } from 'react';
import { useRTLStore } from '@/lib/store';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const { isRTL } = useRTLStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-w-[400px]`}
        suppressHydrationWarning={true}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <NextTopLoader showSpinner={false} />
        <Providers>
          <Toaster />
          {children}
        </Providers>
      </body>
    </html>
  );
}
