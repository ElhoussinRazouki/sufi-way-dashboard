'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import UpdateAdkarAdiaForm from '@/components/forms/dashboard/adkar-adia/AdkarAdiaForm';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const breadcrumbItems = [
  { title: 'لوحة التحكم', link: '/dashboard' },
  { title: 'قائمة الأذكار والأدعية', link: '/dashboard/adkar-adia' },
  { title: 'تحديث', link: '/dashboard/adkar-adia/update' }
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
      <Heading title="تحديث المعلومات" description="لتحديث المعلومات" />
      <Separator />
      <UpdateAdkarAdiaForm adkarAdiaId={id as string} />
    </div>
  );
}
