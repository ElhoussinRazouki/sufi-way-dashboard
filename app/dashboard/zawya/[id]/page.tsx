'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import UpdateZawyaForm from '@/components/forms/dashboard/zawya/updateForm';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const breadcrumbItems = [
  { title: 'لوحة التحكم', link: '/dashboard' },
  { title: 'زوايا', link: '/dashboard/zawya' },
  { title: 'تحديث', link: '/dashboard/zawya/update' }
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
        title="تحديث معلومات الزاوية"
        description="هنا يمكنك تحديث جميع المعلومات المتعلقة بالزاوية"
      />
      <Separator />
      <UpdateZawyaForm id={id as string} />
    </div>
  );
}
