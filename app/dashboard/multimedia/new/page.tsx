'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import CreateMultimediaForm from '@/components/forms/dashboard/multimedia/CreateMultimediaForm';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import React, { useEffect, useState } from 'react';

const breadcrumbItems = [
  { title: 'لوحة القيادة', link: '/dashboard' },
  { title: 'مكتبة الوسائط المتعددة', link: '/dashboard/multimedia' },
  { title: 'إنشاء', link: '/dashboard/multimedia/create' }
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
    <div className="flex-1 space-y-4 p-8">
      <Breadcrumbs items={breadcrumbItems} />
      <Heading
        title="إنشاء وسائط متعددة"
        description="قم بإنشاء عنصر وسائط متعددة جديد"
      />
      <Separator />
      <CreateMultimediaForm />
    </div>
  );
}
