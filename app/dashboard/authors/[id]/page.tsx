'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import UpdateAuthorForm from '@/components/forms/dashboard/authors/updateForm';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Authors', link: '/dashboard/authors' },
  { title: 'Update', link: '/dashboard/authors/update' }
];

export default function Page() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const { id } = useParams();

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex-1 space-y-4 p-8">
      <Breadcrumbs items={breadcrumbItems} />
      <Heading
        title="Update Author"
        description="make changes on a existing author"
      />
      <Separator />
      <UpdateAuthorForm id={id as string} />
    </div>
  );
}