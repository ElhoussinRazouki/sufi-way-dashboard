'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import MultimediaTable from '@/components/dashboard/multimedia/MultimediaTable';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Multimedia Library', link: '/dashboard/multimedia' }
];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default function MultiMediaPage({ searchParams }: paramsProps) {
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
            title="Manage Your Multimedia"
            description="Choose a section below to manage each type of media."
          />
          <Button
            variant={'default'}
            onClick={() => router.push('/dashboard/multimedia/new')}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button>
        </div>
        <MultimediaTable />
      </div>
    </PageContainer>
  );
}
