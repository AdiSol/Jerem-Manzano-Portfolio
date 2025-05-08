import { Metadata } from 'next';
import PageLayout from '@/components/layout/PageLayout';
import HomeContent from '../components/home/HomeContent' ;

export const metadata: Metadata = {
  title: 'Jeremiah Manzano | After Effects Specialist and Photographer',
  description: 'Portfolio of Jeremiah Manzano - After Effects Specialist and Photographer',
};

export default function Home() {
  return (
    <PageLayout>
      <HomeContent />
    </PageLayout>
  );
}

