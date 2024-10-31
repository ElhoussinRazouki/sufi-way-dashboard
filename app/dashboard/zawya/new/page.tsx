'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import CreateSheikhForm from '@/components/forms/dashboard/sheikhs/CreateForm';
import CreateZawyaForm from '@/components/forms/dashboard/zawya/CreateForm';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import React, { useEffect, useState } from 'react';

const breadcrumbItems = [
  { title: 'لوحة التحكم', link: '/dashboard' },
  { title: 'زاوية', link: '/dashboard/zawya' },
  { title: 'إنشاء', link: '/dashboard/zawya/new' }
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
        title="إضافة معلومات الزاوية الجديدة"
        description="هنا يمكنك إضافة جميع المعلومات ذات الصلة"
      />
      <Separator />
      <CreateZawyaForm />
    </div>
  );
}
