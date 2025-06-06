import type { Metadata } from 'next';
import PictureContent from '@/components/picture/PictureContent';
import PageLayout from '@/components/layout/PageLayout';

export const metadata: Metadata = {
  title: 'Pictures | Jeremiah Manzano',
  description: 'Photography portfolio showcasing before and after editing work by Jeremiah Manzano',
};

export default function PicturePage() {
  return (
    <PageLayout>
      <PictureContent />
    </PageLayout>
  );
}