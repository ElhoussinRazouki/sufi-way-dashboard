'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import CreateNewsForm from '@/components/forms/dashboard/news/CreateNewsForm';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import React, { useEffect, useState } from 'react';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'News', link: '/dashboard/news' },
  { title: 'Create', link: '/dashboard/news/create' }
];

export default function Page() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="flex-1 space-y-4  p-8">
      <Breadcrumbs items={breadcrumbItems} />
      <Heading
        title="Create News"
        description="form to create a new article or news"
      />
      <Separator />
      <CreateNewsForm />
    </div>
  );
}
