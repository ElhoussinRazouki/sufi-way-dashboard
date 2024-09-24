'use client';

import { Breadcrumbs } from '@/components/breadcrumbs';
import MultimediaTable from '@/components/dashboard/multimedia/MultimediaTable';
import NewsTable from '@/components/dashboard/news/NewsTable';
import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'News', link: '/dashboard/news' }
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
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading title="Manage News" description="managing all system news" />
          <Button
            variant={'default'}
            onClick={() => router.push('/dashboard/news/new')}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Button>
        </div>
        <NewsTable />
      </div>
    </PageContainer>
  );
}
