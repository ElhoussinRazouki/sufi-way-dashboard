'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import UpdateFqForm from '@/components/forms/dashboard/frequent-questions/updateForm';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const breadcrumbItems = [
  { title: 'لوحة القيادة', link: '/dashboard' },
  { title: 'الأسئلة المتكررة', link: '/dashboard/frequent-questions' },
  { title: 'تحديث', link: '/dashboard/frequent-questions/update' }
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

  if (!id) {
    return (
      <div className="error-message">معرف السؤال غير صالح. حاول مرة أخرى.</div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-8">
      <Breadcrumbs items={breadcrumbItems} />
      <Heading
        title="تحديث السؤال المتكرر"
        description="قم بتعديل عنصر الأسئلة الشائعة المحدد باستخدام النموذج أدناه."
      />
      <Separator />
      <UpdateFqForm id={id as string} />
    </div>
  );
}
