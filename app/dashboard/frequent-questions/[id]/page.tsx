'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import UpdateFqForm from '@/components/forms/dashboard/frequent-questions/updateForm';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Frequent Questions', link: '/dashboard/frequent-questions' },
  { title: 'Update', link: '/dashboard/frequent-questions/update' }
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

  if (!id) {
    return (
      <div className="error-message">
        Invalid question ID. Please try again.
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-8">
      <Breadcrumbs items={breadcrumbItems} />
      <Heading
        title="Update Frequent Question"
        description="Modify the selected FAQ item using the form below."
      />
      <Separator />
      <UpdateFqForm id={id as string} />
    </div>
  );
}
