'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import AuthorsTable from '@/components/dashboard/authors/AuthorsTable';
import MultimediaTable from '@/components/dashboard/multimedia/MultimediaTable';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Authors', link: '/dashboard/authors' }
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
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading
            title="Manage All The Authors"
            description="Here you can manage all the authors in the system"
          />
          <Button
            variant={'default'}
            onClick={() => router.push('/dashboard/authors/new')}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button>
        </div>
        <AuthorsTable />
      </div>
    </PageContainer>
  );
}
