'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import UpdateNewsForm from '@/components/forms/dashboard/news/UpdateNewsForm';
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
        title="تحديث الأخبار"
        description="قم بإجراء تغييرات على عنصر الأخبار الحالي"
      />
      <Separator />
      <UpdateNewsForm id={id as string} />
    </div>
  );
}
