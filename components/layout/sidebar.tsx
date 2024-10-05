'use client';
import React from 'react';
import { DashboardNav } from '@/components/dashboard-nav';
import { navItems } from '@/constants/data';
import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';
import { useSidebar } from '@/hooks/useSidebar';

const backgroundImage = '/images/geomitric_pattern.png';

type SidebarProps = {
  className?: string;
  direction?: 'ltr' | 'rtl'; // Support for direction
};

export default function Sidebar({
  className,
  direction = 'rtl'
}: SidebarProps) {
  const { isMinimized, toggle } = useSidebar();

  const handleToggle = () => {
    toggle();
  };

  return (
    <div className="relative hidden md:block" dir={direction}>
      {/* Background image behind the sidebar */}
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'repeat'
        }}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-50"
      />

      {/* Sidebar with semi-transparent background */}
      <aside
        className={cn(
          `relative z-10 h-screen flex-none border-r bg-white/90 transition-[width] duration-500 dark:bg-black/90 `,
          !isMinimized ? 'w-72' : 'w-[72px]',
          className,
          direction === 'rtl' ? 'border-l' : 'border-r' // Adjust border for RTL
        )}
      >
        <div className="hidden p-5 pt-10 lg:block">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
        </div>
        <ChevronLeft
          className={cn(
            'absolute top-10 z-50 cursor-pointer rounded-full border bg-background text-3xl text-foreground',
            direction === 'rtl' ? '-left-3' : '-right-3', // Flip chevron for RTL
            isMinimized ? 'rotate-360' : 'rotate-180'
          )}
          onClick={handleToggle}
        />
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <div className="mt-3 space-y-1">
              <DashboardNav items={navItems} />
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
