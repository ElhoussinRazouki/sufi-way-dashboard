'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import UpdateSheikhForm from '@/components/forms/dashboard/sheikhs/updateForm';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const breadcrumbItems = [
  { title: 'لوحة التحكم', link: '/dashboard' },
  { title: 'الشيوخ', link: '/dashboard/sheikhs' },
  { title: 'تحديث', link: '/dashboard/sheikhs/update' }
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
        title="تحديث معلومات الشيخ"
        description="هنا يمكنك تحديث جميع المعلومات المتعلقة بالشيخ"
      />
      <Separator />
      <UpdateSheikhForm id={id as string} />
    </div>
  );
}
