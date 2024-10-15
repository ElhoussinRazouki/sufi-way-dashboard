'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import MultimediaTable from '@/components/dashboard/multimedia/MultimediaTable';
import DashboardSection from '@/components/dashboardSection';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const breadcrumbItems = [
  { title: 'لوحة التحكم', link: '/dashboard' },
  { title: 'مكتبة الوسائط المتعددة', link: '/dashboard/multimedia' }
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
            title="إدارة الوسائط المتعددة"
            description="إدارة جميع الوسائط المتعددة في النظام"
          />
          <Button
            variant={'default'}
            onClick={() => router.push('/dashboard/multimedia/new')}
            className="text-nowrap text-white"
          >
            <Plus className="mr-2 h-4 w-4" /> إضافة جديدة
          </Button>
        </div>
        <MultimediaTable />
      </DashboardSection>
    </PageContainer>
  );
}
