"use client";

import { Toaster } from '@/components/ui/toaster';
import '@uploadthing/react/styles.css';
import NextTopLoader from 'nextjs-toploader';
import { Inter } from 'next/font/google';
import './globals.css';
import { useRTLStore } from '@/lib/store';
import Providers from '@/components/layout/providers';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const { isRTL } = useRTLStore()
  return (
    <html lang="en">
      <body
        className={`${inter.className} overflow-hidden `}
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
