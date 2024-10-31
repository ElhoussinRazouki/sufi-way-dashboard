'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import AuthorsTable from '@/components/dashboard/authors/AuthorsTable';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import DashboardSection from '@/components/dashboardSection';
import SheikhsTable from '@/components/dashboard/sheikhs/SheikhsTable';

const breadcrumbItems = [
  { title: 'لوحة التحكم', link: '/dashboard' },
  { title: 'الشيوخ', link: '/dashboard/sheikhs' }
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
            title="إدارة معلومات الشيوخ"
            description="هنا يمكنك إدارة جميع معلومات الشيوخ"
          />
          <Button
            variant={'default'}
            onClick={() => router.push('/dashboard/sheikhs/new')}
            className="truncate whitespace-nowrap text-white"
          >
            <Plus className="mr-2 h-4 w-4" /> إضافة جديدة
          </Button>
        </div>
        <SheikhsTable />
      </DashboardSection>
    </PageContainer>
  );
}
