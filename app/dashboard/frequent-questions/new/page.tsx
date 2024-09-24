'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import CreateFqForm from '@/components/forms/dashboard/frequent-questions/CreateForm';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import React, { useEffect, useState } from 'react';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Frequent Questions', link: '/dashboard/frequent-questions' },
  { title: 'Create', link: '/dashboard/frequent-questions/create' }
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
        title="Create New Frequent Question"
        description="Fill out the form below to add a new FAQ item to the dashboard."
      />
      <Separator />
      <CreateFqForm />
    </div>
  );
}
