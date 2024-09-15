'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import CreateAuthorForm from '@/components/forms/dashboard/authors/CreateForm';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import React, { useEffect, useState } from 'react';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Authors', link: '/dashboard/authors' },
  { title: 'Create', link: '/dashboard/authors/create' }
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
      <Heading title="Create Author" description="Add new Author" />
      <Separator />
      <CreateAuthorForm />
    </div>
  );
}
