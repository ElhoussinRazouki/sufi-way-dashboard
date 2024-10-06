'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import UpdateMultimediaForm from '@/components/forms/dashboard/multimedia/MultimediaForm';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const breadcrumbItems = [
  { title: 'لوحة القيادة', link: '/dashboard' },
  { title: 'مكتبة الوسائط المتعددة', link: '/dashboard/multimedia' },
  { title: 'تحديث', link: '/dashboard/multimedia/update' }
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
        title="تحديث الوسائط المتعددة"
        description="إجراء تغييرات على عنصر وسائط متعددة موجود"
      />
      <Separator />
      <UpdateMultimediaForm multimediaId={id as string} />
    </div>
  );
}
