'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import AdkarAdiaTable from '@/components/dashboard/adkar-adia/AdkarAdiaTable';
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
  { title: 'أذكار وأدعية', link: '/dashboard/adkar-adia' }
];

export default function AdkarAdiaPage() {
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
            title="إدارة الأذكار والأدعية"
            description="هنا يمكنك إدارة جميع الأذكار والأدعية"
          />
          <Button
            variant={'default'}
            onClick={() => router.push('/dashboard/adkar-adia/new')}
            className="text-nowrap text-white"
          >
            <Plus className="mr-2 h-4 w-4" /> إضافة جديدة
          </Button>
        </div>
        <AdkarAdiaTable />
      </DashboardSection>
    </PageContainer>
  );
}
