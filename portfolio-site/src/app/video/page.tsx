import type { Metadata } from 'next';
import VideoContent from '@/components/video/VideoContent';
import PageLayout from '@/components/layout/PageLayout';

export const metadata: Metadata = {
  title: 'Videos | Jeremiah Manzano',
  description: 'Video portfolio featuring After Effects projects and animations by Jeremiah Manzano',
};

export default function VideoPage() {
  return (
    <PageLayout>
      <VideoContent />
    </PageLayout>
  );
}