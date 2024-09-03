import { Breadcrumbs } from '@/components/breadcrumbs';
import PageContainer from '@/components/layout/page-container';
import { Heading } from '@/components/ui/heading';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileVideo, Text, FileAudio } from 'lucide-react';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Multimedia Library', link: '/dashboard/multimedia' }
];

export default function MultiMediaPage() {
  return (
    <PageContainer scrollable={true}>
      <div className="space-y-2">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="flex items-center justify-between !mb-12">
        <Heading title="Manage Your Multimedia" description="Choose a section below to manage each type of media."/>
        </div>
        <Tabs defaultValue="documents" className="space-y-4">
          <TabsList>
            <TabsTrigger value="documents" className='flex gap-2'><Text size={16}/> Documents</TabsTrigger>
            <TabsTrigger value="videos" className='flex gap-2'><FileVideo size={16}/> Videos</TabsTrigger>
            <TabsTrigger value="audios" className='flex gap-2'><FileAudio size={16}/> Audios</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </PageContainer>
  );
}
