'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import DashboardSection from '@/components/dashboardSection';
import ZawyaTable from '@/components/dashboard/zawya/ZawyaTable';

const breadcrumbItems = [
  { title: 'لوحة التحكم', link: '/dashboard' },
  { title: 'الزوايا', link: '/dashboard/zawya' }
];

export default function Page() {
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
            title="قائمة الزوايا"
            description="هنا يمكنك إدارة معلومات الزوايا"
          />
          <Button
            variant={'default'}
            onClick={() => router.push('/dashboard/zawya/new')}
            className="truncate whitespace-nowrap text-white"
          >
            <Plus className="mr-2 h-4 w-4" /> إضافة جديدة
          </Button>
        </div>
        <ZawyaTable />
      </DashboardSection>
    </PageContainer>
  );
}
