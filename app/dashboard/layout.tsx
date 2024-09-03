'use client'; // Add this at the top

import Header from '@/components/layout/header';
import Sidebar from '@/components/layout/sidebar';
import { useUser } from '@/hooks/auth.hook';

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useUser();

  if (!isAuthenticated) {
    if (typeof window !== 'undefined') {
      window.location.replace('/');
    }
    return null;
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="w-full flex-1 overflow-hidden">
        <Header />
        {children}
      </main>
    </div>
  );
}
