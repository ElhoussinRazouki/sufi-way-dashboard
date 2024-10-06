'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import CreateFqForm from '@/components/forms/dashboard/frequent-questions/CreateForm';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import React, { useEffect, useState } from 'react';

const breadcrumbItems = [
  { title: 'لوحة القيادة', link: '/dashboard' },
  { title: 'الأسئلة المتكررة', link: '/dashboard/frequent-questions' },
  { title: 'إنشاء', link: '/dashboard/frequent-questions/create' }
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
        title="إنشاء سؤال متكرر جديد"
        description="املأ النموذج أدناه لإضافة عنصر سؤال متكرر جديد إلى لوحة القيادة."
      />
      <Separator />
      <CreateFqForm />
    </div>
  );
}
