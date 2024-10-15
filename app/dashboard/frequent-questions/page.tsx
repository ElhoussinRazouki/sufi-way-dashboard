'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import FrequentQuestionsTable from '@/components/dashboard/frequent-questions/FrequentQuestionsTable';
import DashboardSection from '@/components/dashboardSection';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const breadcrumbItems = [
  { title: 'لوحة التحكم', link: '/dashboard' },
  { title: 'الأسئلة المتكررة', link: '/dashboard/frequent-questions' }
];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default function Page({ searchParams }: paramsProps) {
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
            title="إدارة جميع الأسئلة المتكررة"
            description="هنا يمكنك إدارة جميع الأسئلة المتكررة في النظام"
          />
          <Button
            variant={'default'}
            onClick={() => router.push('/dashboard/frequent-questions/new')}
            className="text-nowrap text-white"
          >
            <Plus className="mr-2 h-4 w-4" /> إضافة جديد
          </Button>
        </div>
        <FrequentQuestionsTable />
      </DashboardSection>
    </PageContainer>
  );
}
