'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import UpdateMultimediaForm from '@/components/forms/dashboard/multimedia/MultimediaForm';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Multimedia Library', link: '/dashboard/multimedia' },
  { title: 'Update', link: '/dashboard/multimedia/update' }
];

export default function Page() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  const { multimediaId } = useParams();

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex-1 space-y-4 p-8">
      <Breadcrumbs items={breadcrumbItems} />
      <Heading
        title="Update Multimedia"
        description="make changes on a existing multimedia item"
      />
      <Separator />
      <UpdateMultimediaForm multimediaId={multimediaId as string} />
    </div>
  );
}
