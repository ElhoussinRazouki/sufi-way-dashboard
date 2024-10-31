'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import CreateSheikhForm from '@/components/forms/dashboard/sheikhs/CreateForm';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import React, { useEffect, useState } from 'react';

const breadcrumbItems = [
  { title: 'لوحة التحكم', link: '/dashboard' },
  { title: 'شيوخ', link: '/dashboard/sheikhs' },
  { title: 'إنشاء', link: '/dashboard/authors/create' }
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
        title="إضافة معلومات الشيخ الجديد"
        description="يمكنك إضافة جميع المعلومات المتعلقة هنا"
      />
      <Separator />
      <CreateSheikhForm />
    </div>
  );
}
