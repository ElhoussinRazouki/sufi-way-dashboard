'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import NewsTable from '@/components/dashboard/news/NewsTable';
import DashboardSection from '@/components/dashboardSection';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const breadcrumbItems = [
  { title: 'لوحة القيادة', link: '/dashboard' },
  { title: 'الأخبار', link: '/dashboard/news' }
];

export default function MultiMediaPage() {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <PageContainer scrollable={true}>
      <DashboardSection>
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title="إدارة الأخبار"
            description="قم بإدارة جميع الأخبار المتعلقة بالنظام هنا"
          />
          <Button
            variant={'default'}
            onClick={() => router.push('/dashboard/news/new')}
            className="text-nowrap text-white"
          >
            <Plus className="mr-2 h-4 w-4" /> إضافة خبر جديد
          </Button>
        </div>
        <NewsTable />
      </DashboardSection>
    </PageContainer>
  );
}
