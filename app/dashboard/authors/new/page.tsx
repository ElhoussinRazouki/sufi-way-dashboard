'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import CreateAuthorForm from '@/components/forms/dashboard/authors/CreateForm';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import React, { useEffect, useState } from 'react';

const breadcrumbItems = [
  { title: 'لوحة التحكم', link: '/dashboard' },
  { title: 'المؤلفون', link: '/dashboard/authors' },
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
      <Heading title="إنشاء مؤلف" description="إضافة مؤلف جديد" />
      <Separator />
      <CreateAuthorForm />
    </div>
  );
}
