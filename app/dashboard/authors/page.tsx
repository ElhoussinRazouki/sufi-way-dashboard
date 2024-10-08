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

const breadcrumbItems = [
  { title: 'لوحة القيادة', link: '/dashboard' },
  { title: 'المؤلفون', link: '/dashboard/authors' }
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
            title="إدارة جميع المؤلفين"
            description="هنا يمكنك إدارة جميع المؤلفين في النظام"
          />
          <Button
            variant={'default'}
            onClick={() => router.push('/dashboard/authors/new')}
            className="text-nowrap text-white"
          >
            <Plus className="mr-2 h-4 w-4" /> إضافة جديد
          </Button>
        </div>
        <AuthorsTable />
      </DashboardSection>
    </PageContainer>
  );
}
